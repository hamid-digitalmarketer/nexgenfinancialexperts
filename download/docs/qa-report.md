# QA Report — NexGen Financial Experts Rebuild

**Environment:** Next.js 16.1.3 (Turbopack dev), TypeScript 5, Tailwind 4 + shadcn/ui, Prisma/SQLite. Node via bun. Tested October 31, 2026, in-browser via Playwright-based agent-browser.

## 1. Automated Checks

| Check | Result |
|---|---|
| ESLint (`bun run lint`) | ✅ 0 errors, 0 warnings |
| TypeScript | ✅ Dev compile clean (build errors non-blocking config retained from scaffold; no TS errors observed in dev compile of all routes) |
| All routes HTTP | ✅ See matrix §2 |
| Legacy redirects | ✅ `/aboutus`, `/blog` → 308/301 to new paths (Next dev issues 308; production `permanent: true` → 301) |
| 404 handling | ✅ `/nonexistent-page` → 404 with custom page |
| `sitemap.xml` | ✅ 20 URLs, correct base URL |
| `robots.txt` | ✅ Allow `/`, Disallow `/api/`, sitemap declared (fixed conflict: removed scaffold's static robots.txt) |
| Security headers | ✅ CSP, X-Frame-Options SAMEORIGIN, nosniff, Referrer-Policy, Permissions-Policy, `poweredByHeader: false` |
| DB persistence | ✅ Valid submissions stored (2 records verified in SQLite); honeypot submissions NOT stored |

## 2. Route Matrix (HTTP status)

```
200  /                                   200  /services/real-estate-accounting-bookkeeping
200  /about                              200  /services/ecommerce-tax-accounting
200  /services                           200  /services/startup-fractional-cfo-services
200  /services/cpa-services              200  /services/financial-advisory-for-startups
200  /services/business-accounting-      200  /services/audit-services
     bookkeeping                         200  /services/payroll-services
200  /services/tax-advisory-planning-    200  /services/tax-accounting
     services                            200  /insights
200  /services/business-tax-filing-      200  /insights/small-business-bookkeeping-foundation
     preparation                         200  /insights/cash-flow-forecasting-basics
200  /services/llc-s-corp-tax-           200  /insights/preparing-for-a-business-audit
     structuring                         200  /privacy-policy
200  /services/crypto-tax-advisory-      200  /terms-of-use
     services                            200  /sitemap.xml   200  /robots.txt
                                         404  /nonexistent-page (custom 404 ✔)
308  /aboutus → /about                   308  /blog → /insights
```

## 3. Contact Form API Tests (curl, layered security)

| Case | Payload | Result |
|---|---|---|
| Valid submission | Full fields, realistic | ✅ 201 `{ok:true,id:…}` — stored |
| Honeypot (bot fills hidden `website`) | filled | ✅ 200 `{ok:true}` — **silent drop, nothing stored** |
| Time trap | `elapsedMs:100` | ✅ 400 "submitted too quickly" |
| Validation errors | bad name/email/message | ✅ 422 with per-field messages |
| Rate limit | >5/10min per IP | ✅ Implemented (429); observed during browser test sequence |
| SMTP not configured | — | ✅ Graceful: logged, submission still stored, no user-facing failure |

## 4. Browser E2E Verification (agent-browser)

| Scenario | Result |
|---|---|
| Home renders desktop 1280×800 | ✅ Official logo in header, hero, trust bar, service cards, industries, testimonials, FAQ accordion, CTA |
| Title tag | ✅ "Accounting, Tax & Advisory Services in Fort Lauderdale \| NexGen Financial Experts" |
| Service page (`/services/cpa-services`) | ✅ Hero, offerings, audience, FAQs, related services |
| **Contact form golden path** | ✅ Fill name/email/message → Send → **toast "Message sent"** → **DB record verified** |
| Contact page extras | ✅ Channel cards, business hours, OpenStreetMap iframe with marker at office area |
| Mobile 390×844 | ✅ Logo, phone + menu buttons (44px+ touch targets), stacked hero, full-width CTAs |
| Mobile Sheet menu | ✅ Opens, lists all 12 services + pages, closes |
| 404 page | ✅ Logo, recovery links to popular pages, phone number |
| Footer (desktop) | ✅ Sticky-bottom on short pages (flex layout), white logo card, all links, NAP, social icons, copyright |
| Console errors | ✅ None observed (only dev-mode HMR/Fast-Refresh info logs) |
| Layout shift / hydration | ✅ No hydration mismatch warnings in dev.log |

## 5. SEO / A11y Spot Checks

- JSON-LD present: ProfessionalService (home), Service (each service page), Article (posts), FAQPage (FAQs visible on-page), BreadcrumbList (subpages) ✅
- Images: descriptive alt text everywhere; logo alt "NexGen Financial Experts logo"; `priority` on hero ✅
- Skip-to-content link, semantic landmarks (`header/main/footer/nav`), labelled form fields, aria-labels on icon links ✅
- `prefers-reduced-motion` respected via CSS ✅
- Single H1 per page; logical H2/H3 ✅
- Canonical URLs + Open Graph on all pages ✅

## 6. Content QA

- ✅ No casino/spam artifacts anywhere in the rebuild (code + rendered pages checked)
- ✅ No fabricated credentials, counters, or stats; testimonials = the three carried from the original site
- ✅ Placeholder scan: no `XXX`, `TODO`, `【…】`, `undefined`, `NaN` in rendered output
- ✅ Educational disclaimer on all articles; no "guaranteed results" language

## 7. Not Verified / Known Limitations (honest list)

1. **Lighthouse/CWV numbers not measured** — dev-mode overlay + sandbox noise make dev measurements unrepresentative; measure on the production build post-deploy (targets documented).
2. **Email delivery** — code path exists (nodemailer) but requires real SMTP credentials; untested end-to-end by necessity.
3. **Production build (`next build`)** — not run per sandbox constraints (dev server is the allowed runtime); deployment guide covers the production checklist.
4. **Cross-browser matrix** — Chromium verified; Firefox/Safari expected-safe (standard Tailwind/shadcn stack) but not individually tested.
5. **Dark mode** — tokenized in CSS but the site intentionally ships light-only for brand consistency (decision documented in `content-strategy.md` §1).
6. **Testimonial authenticity** — carried over from the original live site; still requires owner confirmation (flagged in content inventory).

## 8. Defects Found & Fixed During QA

| # | Defect | Fix |
|---|---|---|
| 1 | `/robots.txt` 500 — conflict between scaffold static file and dynamic route | Removed `public/robots.txt` → dynamic route serves correctly |
| 2 | Stray non-ASCII character in a dark-theme CSS token | Fixed in `globals.css` |
| 3 | First browser form submission not stored (rate-limit interaction from earlier same-IP curl test batch) | Confirmed expected behavior of rate limiter; second clean run stored successfully — no code change needed |
