# Deployment Guide — NexGen Financial Experts Rebuild

## 0. Two Recovery Paths — Decision First

| Path | When to choose | Effort | Security posture |
|---|---|---|---|
| **A. Deploy this Next.js rebuild (recommended)** | Owner wants a clean, fast, maintainable site now | Low-Medium (host + DNS) | Removes the entire WordPress attack surface; spam cannot return through WP plugins |
| B. Clean the existing WordPress in place | Owner must keep WP (e.g., complex existing workflows) | High | Requires full remediation (`website-recovery-checklist.md`) and ongoing hardening |

This guide covers Path A in detail; Path B's checklist is separate.

## 1. What You Are Deploying

- Next.js 16 App Router site (TypeScript), statically-rendered pages + one API route (`/api/contact`)
- SQLite via Prisma for contact submissions (swap to hosted Postgres/MySQL if preferred — schema is portable)
- No third-party tracking by default; CSP-enabled; secrets via environment variables only

## 2. Prerequisites Checklist

- [ ] Domain DNS access (Cloudflare already fronts the domain)
- [ ] Hosting choice: any Node 20+ host (Vercel, Railway, Render, Hetzner VPS with PM2/systemd, or the existing host if it supports Node)
- [ ] SMTP credentials for contact-form email (or run without email delivery initially — submissions still store in DB)
- [ ] Owner approvals: address/hours confirmation, testimonial permission, privacy/terms legal review

## 3. Environment Variables

Copy `.env.example` → `.env` and set:

```bash
DATABASE_URL="file:./db/custom.db"        # or a hosted DB URL
SMTP_HOST="smtp.yourprovider.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="notifications@nexgenfinancialexperts.com"
SMTP_PASS="********"                      # never commit
CONTACT_TO_EMAIL="paudalus@nexgenfinancialexperts.com"
NEXT_PUBLIC_SITE_URL="https://nexgenfinancialexperts.com"
```

Rules: never commit `.env`; rotate any credential that ever touched the compromised WordPress host.

## 4. Build & Run (production)

```bash
bun install                # or npm ci
bun run db:push            # create/update schema
bun run build              # next build (standalone output)
bun run start              # runs standalone server on port 3000 (see package.json)
```

Host-specific notes:
- **Vercel:** import repo, set env vars, deploy; consider swapping SQLite → hosted Postgres (Neon/Supabase) since Vercel filesystem is ephemeral.
- **VPS:** run behind Caddy/Nginx with HTTPS; `pm2 start` the standalone server; keep `db/` on persistent disk and add it to backups.
- Keep the web server reverse-proxying only the app; set real-IP headers so the contact rate-limiter sees client IPs.

## 5. DNS / Cloudflare Cutover

1. Lower TTL (e.g., 300s) a day before.
2. Point DNS to the new host (or change the origin behind Cloudflare).
3. Verify before/after: `https://nexgenfinancialexperts.com` → new site; `http://` and `www` still 301 → HTTPS apex.
4. Enable Cloudflare: Always Use HTTPS, Full (strict) SSL, Brotli, Auto Minify off (deprecated), bot fight mode ON.

## 6. Pre-Launch Verification (on production)

- [ ] All 20 URLs from `website-sitemap.md` return 200
- [ ] Legacy URLs 301 correctly (`/aboutus`, `/blog`, `/home`, `/sample-page`)
- [ ] Contact form: submit a real test → DB record + email received
- [ ] Phone/WhatsApp/email links correct on mobile
- [ ] `sitemap.xml` + `robots.txt` reachable
- [ ] Security headers present (`curl -I`)
- [ ] Lighthouse/PageSpeed run recorded (LCP/INP/CLS targets in `analytics-and-kpi-plan.md`)
- [ ] Backup of the production DB configured before going live
- [ ] Rollback tested (see §8)

## 7. Post-Launch — Search Engine Recovery (critical after the hack)

1. **Google Search Console:** verify the domain property.
2. Review Security Issues / Manual Actions reports; request review if flagged.
3. Submit the new sitemap; use URL Inspection → Request indexing for the key pages.
4. Spam posts: confirm their URLs 404; if indexed, request removal (Removals tool) and let 404s age out. Do NOT redirect spam URLs anywhere.
5. Monitor index coverage weekly for re-crawled spam (see recovery checklist §7).
6. Bing Webmaster Tools: mirror the above.

## 8. Rollback Procedure

- **Before cutover:** keep the old host untouched (do not cancel) for 30 days. The old WordPress site remains reachable if DNS is pointed back — with the caveat that it is compromised; use only as a last resort and warn users.
- **New host rollback:** redeploy previous build artifact (`git revert` + rebuild, or previous container image); restore DB from the latest backup; DNS TTL is 300s so rollback propagates fast.
- Document who executes (owner + developer) and keep credentials in the owner's password manager.

## 9. WordPress-In-Place Alternative (Path B) — Minimum Hardening if Chosen

Full steps: `website-recovery-checklist.md`. Non-negotiables: fresh core/plugins from source, delete unused plugins (incl. any nulled ones), new admin accounts with 2FA, remove hidden widgets + spam posts + injected content, new salts, disable file editing (`DISALLOW_FILE_EDIT`), disable xmlrpc if unused, close REST `/users` enumeration, WAF rules, daily off-site backups, file-integrity monitoring, and re-request indexing cleanup.

## 10. Ongoing Maintenance (Path A)

- Monthly: `bun install`/deploy dependency updates (Dependabot), DB backup verification, form-submission review (spam rate), Search Console check.
- Quarterly: full-site link check, content refresh of 1–2 pages, credential rotation review.
