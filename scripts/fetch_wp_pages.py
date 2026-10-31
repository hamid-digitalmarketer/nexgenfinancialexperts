#!/usr/bin/env python3
"""Fetch all NexGen WP pages via REST API with retries/delays; fallback to HTML scrape."""
import json, os, re, time, subprocess, html

EV = "/home/z/my-project/evidence"
os.makedirs(EV, exist_ok=True)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"

PAGES = [
    (764, "home"), (1807, "aboutus"), (768, "contact"), (767, "blog"),
    (1692, "cpa-services"), (1686, "financial-advisory-for-startups"),
    (1677, "llc-s-corp-tax-structuring"), (1671, "crypto-tax-advisory-services"),
    (1665, "real-estate-accounting-bookkeeping"), (1659, "ecommerce-tax-accounting"),
    (1653, "startup-fractional-cfo-services"), (1646, "business-tax-filing-preparation"),
    (1640, "tax-advisory-planning-services"), (1633, "business-accounting-bookkeeping"),
    (1619, "tax-accounting"),
]

def curl(url, out, retries=3):
    for attempt in range(retries):
        r = subprocess.run(
            ["curl", "-sL", "-m", "40", "--compressed", "-A", UA,
             "-H", "Accept: text/html,application/json", url, "-o", out],
            capture_output=True, text=True)
        if os.path.exists(out) and os.path.getsize(out) > 200:
            return True
        time.sleep(3 * (attempt + 1))
    return False

def clean_html(raw):
    """Strip tags to readable text."""
    raw = re.sub(r'<script[\s\S]*?</script>', ' ', raw)
    raw = re.sub(r'<style[\s\S]*?</style>', ' ', raw)
    raw = re.sub(r'<!--.*?-->', ' ', raw, flags=re.S)
    raw = re.sub(r'<br\s*/?>', '\n', raw)
    raw = re.sub(r'</(p|div|h1|h2|h3|h4|h5|h6|li|tr|section)>', '\n', raw)
    raw = re.sub(r'<[^>]+>', ' ', raw)
    raw = html.unescape(raw)
    lines = [re.sub(r'\s+', ' ', ln).strip() for ln in raw.split('\n')]
    return "\n".join(ln for ln in lines if ln)

summary = []
for pid, slug in PAGES:
    # 1) Try REST API rendered content
    api = f"https://nexgenfinancialexperts.com/wp-json/wp/v2/pages/{pid}"
    ok = curl(api, f"{EV}/page-{pid}.json")
    title, content = "", ""
    if ok:
        try:
            d = json.load(open(f"{EV}/page-{pid}.json"))
            title = html.unescape(d.get("title", {}).get("rendered", ""))
            content = d.get("content", {}).get("rendered", "")
        except Exception:
            ok = False
    # 2) Fallback: scrape the front-end page
    if not ok or len(content) < 200:
        front = f"https://nexgenfinancialexperts.com/{slug}/"
        ok2 = curl(front, f"{EV}/front-{slug}.html")
        if ok2:
            raw = open(f"{EV}/front-{slug}.html", encoding="utf-8", errors="ignore").read()
            m = re.search(r'<title[^>]*>([^<]*)</title>', raw)
            if m and not title:
                title = html.unescape(m.group(1))
            m2 = re.search(r'<main[\s\S]*?</main>|<article[\s\S]*?</article>|class="entry-content[\s\S]*?(<footer|</main|$)', raw)
            body = m2.group(0) if m2 else raw
            content = body
            text = clean_html(content)
            with open(f"{EV}/recovered-{slug}.txt", "w", encoding="utf-8") as fh:
                fh.write(f"SOURCE: front-end scrape {front}\nTITLE: {title}\n\n{text}")
            summary.append(f"[SCRAPE] {slug}: title={title!r} text_len={len(text)}")
        else:
            summary.append(f"[FAIL] {slug} (id={pid})")
        time.sleep(1.5)
        continue
    text = clean_html(content)
    with open(f"{EV}/recovered-{slug}.txt", "w", encoding="utf-8") as fh:
        fh.write(f"SOURCE: WP REST API page id={pid}\nTITLE: {title}\n\n{text}")
    summary.append(f"[OK-API] {slug}: title={title!r} text_len={len(text)}")
    time.sleep(1.2)

print("\n".join(summary))
