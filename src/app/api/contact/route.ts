import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// ---------------------------------------------------------------
// POST /api/contact — server-side validated contact endpoint.
// Spam protection layers: in-memory rate limit + honeypot + time trap.
// Delivery: saves to database always; sends email when SMTP env vars
// are configured (see .env.example). No credentials are ever hardcoded.
// ---------------------------------------------------------------

const RATE_LIMIT_MAX = 5; // submissions
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const MIN_FILL_TIME_MS = 2500; // humans need at least ~2.5s to fill the form

const buckets = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (buckets.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  hits.push(now);
  buckets.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(body: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const company = String(body.company ?? "").trim();
  const service = String(body.service ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (name.length < 2 || name.length > 120) errors.name = "Please enter your name (2–120 characters).";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Please enter a valid email address.";
  if (phone && !/^[+()\-.\s\d]{7,25}$/.test(phone)) errors.phone = "Please enter a valid phone number or leave it empty.";
  if (company.length > 160) errors.company = "Company name is too long.";
  if (service.length > 80) errors.service = "Invalid service selection.";
  if (message.length < 10 || message.length > 4000) errors.message = "Please describe your request (10–4000 characters).";

  return { errors, values: { name, email, phone, company, service, message } };
}

// Basic SMTP sender (nodemailer) used only when SMTP_HOST is configured.
async function sendEmail(fields: Record<string, string>): Promise<void> {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info("[contact] SMTP not configured — submission stored in database only.");
    return;
  }
  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    const to = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER;
    if (!to) {
      console.warn("[contact] CONTACT_TO_EMAIL not set — skipping email delivery.");
      return;
    }
    await transport.sendMail({
      from: process.env.SMTP_FROM ?? to,
      to,
      replyTo: fields.email,
      subject: `New website inquiry — ${fields.name}${fields.service ? ` (${fields.service})` : ""}`,
      text: [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone || "—"}`,
        `Company: ${fields.company || "—"}`,
        `Service: ${fields.service || "—"}`,
        "",
        fields.message,
      ].join("\n"),
    });
    console.info("[contact] notification email sent");
  } catch (err) {
    // Never fail the request because of email delivery problems.
    console.error("[contact] email delivery failed:", err);
  }
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  // 1. Rate limit
  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many submissions from this connection. Please try again later or call us." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // 2. Honeypot — bots that fill the hidden field get a silent success.
  const website = String(body.website ?? "");
  if (website !== "") {
    console.info(`[contact] honeypot triggered from ${ip}`);
    return NextResponse.json({ ok: true });
  }

  // 3. Time trap — submissions faster than a human can type are rejected.
  const elapsed = Number(body.elapsedMs ?? 0);
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { message: "The form was submitted too quickly. Please take a moment and try again." },
      { status: 400 }
    );
  }

  // 4. Validation
  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: "Please correct the highlighted fields.", errors },
      { status: 422 }
    );
  }

  // 5. Persist + notify
  try {
    const record = await db.contactSubmission.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        company: values.company || null,
        service: values.service || null,
        message: values.message,
        sourceIp: ip,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });
    await sendEmail({ ...values, email: values.email });
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("[contact] failed to store submission:", err);
    return NextResponse.json(
      { message: "We couldn't process your message right now. Please try again or call us at +1 (954) 306-3823." },
      { status: 500 }
    );
  }
}
