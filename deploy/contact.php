<?php
/**
 * NexGen Financial Experts — contact endpoint for static shared hosting.
 *
 * Drop-in replacement for the Next.js /api/contact route on cPanel shared
 * hosting (LiteSpeed/Apache + PHP). Same validation rules, same spam
 * protections and the same JSON contract the React form expects.
 *
 * Storage & email:
 *  - Every valid submission is appended to contact-submissions.json ONE
 *    LEVEL ABOVE the web root (not publicly downloadable).
 *  - A notification email is sent via PHP mail() to CONTACT_TO_EMAIL.
 *    Create that mailbox in cPanel (Email Accounts) or edit the constant.
 */

declare(strict_types=1);

// ── Configuration ────────────────────────────────────────────────────────────
const CONTACT_TO_EMAIL = 'info@nexgenfinancialexperts.com';
const LOG_FILE         = __DIR__ . '/../contact-submissions.json';
const RATE_FILE        = __DIR__ . '/../contact-rate-limits.json';

const RATE_LIMIT_MAX    = 5;    // submissions…
const RATE_LIMIT_WINDOW = 600;  // …per 10 minutes, per IP
const MIN_FILL_TIME_MS  = 2500; // humans need ~2.5s to fill the form
// ─────────────────────────────────────────────────────────────────────────────

function respond(array $payload, int $status): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload);
    exit;
}

function client_ip(): string
{
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        return (string) $_SERVER['HTTP_CF_CONNECTING_IP']; // Cloudflare
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $parts = explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR']);
        return trim($parts[0]);
    }
    return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
}

function load_json(string $path): array
{
    if (!is_file($path)) {
        return [];
    }
    $fp = fopen($path, 'r');
    if (!$fp) {
        return [];
    }
    flock($fp, LOCK_SH);
    $raw = stream_get_contents($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
    $data = json_decode((string) $raw, true);
    return is_array($data) ? $data : [];
}

function save_json(string $path, array $data): void
{
    $fp = fopen($path, 'c');
    if (!$fp) {
        return;
    }
    flock($fp, LOCK_EX);
    ftruncate($fp, 0);
    fwrite($fp, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);
}

header('Referrer-Policy: strict-origin-when-cross-origin');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(['message' => 'Method not allowed.'], 405);
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(['message' => 'Invalid request.'], 400);
}

$ip = client_ip();

// 1. Rate limit (per IP, file-backed)
$rate  = load_json(RATE_FILE);
$nowMs = (int) round(microtime(true) * 1000);
foreach ($rate as $k => $v) { // prune stale entries
    $rate[$k] = array_values(array_filter(
        is_array($v) ? $v : [],
        static fn($t): bool => is_numeric($t) && ($nowMs - (int) $t) < RATE_LIMIT_WINDOW * 1000
    ));
    if (!$rate[$k]) {
        unset($rate[$k]);
    }
}
$hits = array_values(array_filter(
    $rate[$ip] ?? [],
    static fn($t): bool => is_numeric($t) && ($nowMs - (int) $t) < RATE_LIMIT_WINDOW * 1000
));
$hits   = $hits ?: [];
$hits[] = $nowMs;
$rate[$ip] = $hits;
save_json(RATE_FILE, $rate);
if (count($hits) > RATE_LIMIT_MAX) {
    respond([
        'message' => 'Too many submissions from this connection. Please try again later or call us.',
    ], 429);
}

// 2. Honeypot — bots that fill the hidden field get a silent success
if (trim((string) ($body['website'] ?? '')) !== '') {
    respond(['ok' => true], 200);
}

// 3. Time trap — submissions faster than a human can type are rejected
$elapsed = (int) ($body['elapsedMs'] ?? 0);
if ($elapsed < MIN_FILL_TIME_MS) {
    respond([
        'message' => 'The form was submitted too quickly. Please take a moment and try again.',
    ], 400);
}

// 4. Validation (mirrors the Next.js API exactly)
$values = [
    'name'    => trim((string) ($body['name'] ?? '')),
    'email'   => trim((string) ($body['email'] ?? '')),
    'phone'   => trim((string) ($body['phone'] ?? '')),
    'company' => trim((string) ($body['company'] ?? '')),
    'service' => trim((string) ($body['service'] ?? '')),
    'message' => trim((string) ($body['message'] ?? '')),
];
$errors = [];
if (mb_strlen($values['name']) < 2 || mb_strlen($values['name']) > 120) {
    $errors['name'] = 'Please enter your name (2–120 characters).';
}
if (!preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/', $values['email']) || strlen($values['email']) > 200) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($values['phone'] !== '' && !preg_match('/^[+()\-.\s\d]{7,25}$/', $values['phone'])) {
    $errors['phone'] = 'Please enter a valid phone number or leave it empty.';
}
if (mb_strlen($values['company']) > 160) {
    $errors['company'] = 'Company name is too long.';
}
if (mb_strlen($values['service']) > 80) {
    $errors['service'] = 'Invalid service selection.';
}
if (mb_strlen($values['message']) < 10 || mb_strlen($values['message']) > 4000) {
    $errors['message'] = 'Please describe your request (10–4000 characters).';
}
if ($errors) {
    respond(['message' => 'Please correct the highlighted fields.', 'errors' => $errors], 422);
}

// 5. Persist (always) + notify by email (best effort — never fails the request)
$id     = uniqid('c', true);
$record = $values + [
    'id'         => $id,
    'sourceIp'   => $ip,
    'userAgent'  => substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    'receivedAt' => gmdate('c'),
];
$log = load_json(LOG_FILE);
$log[] = $record;
save_json(LOG_FILE, $log);

$replyTo = str_replace(["\r", "\n", '%0a', '%0d'], '', $values['email']); // header injection guard
$subject = 'New website inquiry — ' . $values['name']
    . ($values['service'] !== '' ? ' (' . $values['service'] . ')' : '');
$lines = [
    'Name: ' . $values['name'],
    'Email: ' . $values['email'],
    'Phone: ' . ($values['phone'] !== '' ? $values['phone'] : '—'),
    'Company: ' . ($values['company'] !== '' ? $values['company'] : '—'),
    'Service: ' . ($values['service'] !== '' ? $values['service'] : '—'),
    '',
    $values['message'],
];
$headers = implode("\r\n", [
    'From: ' . CONTACT_TO_EMAIL,
    'Reply-To: ' . $replyTo,
    'X-Mailer: NexGen-Website',
    'Content-Type: text/plain; charset=utf-8',
]);
@mail(CONTACT_TO_EMAIL, $subject, implode("\n", $lines), $headers);

respond(['ok' => true, 'id' => $id], 201);
