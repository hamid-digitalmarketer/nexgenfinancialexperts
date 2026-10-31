# Deploying to nexgenfinancialexperts.com (cPanel static package)

The hosting server (`s26.hosterpk.com`) blocks datacenter IPs on cPanel/FTP/SSH,
so automated deployment is not possible from a build sandbox. This package makes
deployment a **5-minute manual job in cPanel** — no Node.js is needed on the
server. Cloudflare already proxies the domain and can reach the origin, so the
site goes live the moment files are in place.

## Package

`deploy/nexgen-static-deploy.zip` (≈2.1 MB) — the full website as static HTML
plus two server-side helpers:

| File | Purpose |
| --- | --- |
| `*.html` + `_next/` | All 20+ pages pre-rendered (home, 13 services, 3 insights, about, contact, legal) |
| `contact.php` | Contact endpoint — same validation/spam rules as the Node API; saves every submission to `~/contact-submissions.json` (outside the web root) and emails `info@nexgenfinancialexperts.com` |
| `.htaccess` | Security headers (same CSP as the app), legacy-URL 301 redirects (`/aboutus`, `/blog`, …), 404 handling, long-cache assets |
| `robots.txt`, `sitemap.xml` | SEO endpoints |

## Deploy (cPanel File Manager, from your own browser)

1. Log in at `https://s26.hosterpk.com:2083` (account `nexgenf1`).
2. Open **Files → File Manager** → `public_html`.
3. Delete the placeholder default page (usually `index.html` or `default.html`).
   Keep nothing else unless you know you need it.
4. **Upload** `deploy/nexgen-static-deploy.zip` into `public_html`.
5. Right-click the zip → **Extract** → extract into `public_html` (overwrite if asked).
6. Confirm you now see `index.html`, `contact.php`, `.htaccess`, `about/`,
   `services/`, `_next/` in `public_html`.
7. Visit `https://nexgenfinancialexperts.com` — the site is live.

## Post-deploy checklist

- **Contact mailbox:** cPanel → *Email Accounts* → create
  `info@nexgenfinancialexperts.com` (or edit `CONTACT_TO_EMAIL` in
  `contact.php` first, then re-upload that one file). Submissions are ALWAYS
  saved to `~/contact-submissions.json` in the home directory even if email
  fails — check that file with File Manager (it is one level above
  `public_html`).
- **HTTPS:** Cloudflare terminates TLS. In the Cloudflare dashboard enable
  *SSL/TLS → Edge Certificates → Always Use HTTPS*. Do **not** add origin-side
  HTTPS redirects (loop risk with Flexible SSL).
- **Origin SSL (optional, recommended):** cPanel → *SSL/TLS Status* → Run
  AutoSSL, then set Cloudflare SSL mode to *Full*.
- **Smoke test:** submit the contact form once and verify an entry appears in
  `~/contact-submissions.json`.

## Updating later

```bash
npm install          # or: bun install
bash scripts/build_static.sh   # rebuilds out/ and re-packages the zip
```

Re-upload the regenerated zip and extract again (step 4–5).

## Full Node.js deployment (future upgrade)

The complete Next.js 16 source in this repo still builds as a standalone Node
app (`npm run build && npm start`) with the SQLite-backed `/api/contact` route.
Use it on any Node-capable host (VPS, CloudLinux Node selector, Vercel).
`next.config.ts` switches modes automatically via `NEXT_EXPORT=1`.
