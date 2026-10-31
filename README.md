# NexGen Financial Experts — Website

Production rebuild of https://nexgenfinancialexperts.com after an SEO-spam compromise of the original WordPress site. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui + Prisma (SQLite).

**Business:** NexGen Financial Experts — accounting, tax, audit & business advisory, Fort Lauderdale, FL.
**Contact:** +1 (954) 306-3823 · WhatsApp +1 (954) 770-1568 · paudalus@nexgenfinancialexperts.com · 1975 East Sunrise Blvd, Suite 705, Fort Lauderdale, FL 33304

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, 6 service pillars, industries, why-us, featured services, about teaser, testimonials, FAQs, CTA |
| `/about` | Firm story, mission, values |
| `/services` | Services hub (12 cards) |
| `/services/[slug]` | 12 service landing pages (all original WP slugs preserved) |
| `/insights` + `/insights/[slug]` | Blog hub + 3 educational articles |
| `/contact` | Working form + NAP + map |
| `/privacy-policy`, `/terms-of-use` | Legal drafts (flagged for review) |
| 404 | Custom recovery page |
| `/sitemap.xml`, `/robots.txt` | Auto-generated; 301s from legacy URLs (`/aboutus`, `/blog`, `/home`) |
| `POST /api/contact` | Validated contact endpoint (rate limit + honeypot + time trap; stores to DB; optional SMTP email) |

## Quick Start

```bash
bun install          # or npm install
cp .env.example .env # adjust if needed (SMTP optional)
bun run db:push      # create SQLite schema
bun run dev          # http://localhost:3000
```

Production:

```bash
bun run build && bun run start
```

## Environment

See `.env.example`. Only `DATABASE_URL` is required; SMTP variables enable contact-form email delivery. Never commit real secrets.

## Key Files

```
src/lib/site.ts        — NAP config, nav, redirects (single source of truth)
src/lib/services.ts    — all 12 service definitions + SEO metadata
src/lib/articles.ts    — educational articles
src/components/site/   — header, footer, forms, shared blocks
src/app/api/contact/   — secure contact endpoint
prisma/schema.prisma   — ContactSubmission model
public/images/         — official logo, favicon set, hero image
```

## Design System

- Brand colors sampled from the official logo: magenta `#C01040`, blue `#4090D0`, navy `#0B1F3A`, white.
- Fonts: Inter (body), Source Serif 4 (display headings) via `next/font`.
- Logo: `public/images/nexgen-logo.png` (recovered from the official domain). Favicon derived from the logo mark at `src/app/icon.png`.

## Security Notes

- Original WordPress site was compromised (hidden casino-link widgets + spam posts — see `download/docs/security-audit.md`). This rebuild contains no WordPress code path.
- Contact form: server-side validation, per-IP rate limiting (5/10 min), honeypot + time-trap, no PII in URLs, data stored only in the DB (email optional via SMTP).
- Security headers configured in `next.config.ts` (CSP, frame-options, nosniff, referrer/permissions policy).

## Documentation

Full project deliverables (audit, security, competitor research, keyword map, content & marketing strategy, QA, deployment, recovery checklist, analytics, 90-day roadmap) live in **`download/docs/`**.
