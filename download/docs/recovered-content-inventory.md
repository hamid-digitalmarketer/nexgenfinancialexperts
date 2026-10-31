# Recovered Content Inventory — NexGen Financial Experts

**Recovery method:** Live-site WordPress REST API (public, read-only) + front-end scrape, October 31, 2026.
**Status legend:** ✔ Verified original (recovered verbatim from live site) · ✎ Edited (readability only, meaning preserved) · ✘ Excluded (spam/injected/unverified) · ⚠ Requires owner confirmation.

> Note: `raw data nextgen.txt` was not present in the upload folder. The inventory below was recovered directly from the live website and supersedes the summary embedded in the brief (which it fully corroborates: same brand, services, address, phones, email).

---

## 1. Business Information (NAP)

| Field | Value | Status |
|---|---|---|
| Brand | NexGen Financial Experts | ✔ (live site, Yelp, LinkedIn) |
| Website | https://nexgenfinancialexperts.com | ✔ |
| Address | 1975 East Sunrise Blvd, Suite 705, Fort Lauderdale, FL 33304, USA | ✔ live site + LinkedIn; ⚠ confirm suite number before launch |
| Phone | +1 (954) 306-3823 | ✔ live site + Yelp |
| WhatsApp | +1 (954) 770-1568 | ✔ live site (`wa.me/19547701568`) |
| Email | paudalus@nexgenfinancialexperts.com | ✔ live site |
| Social | Facebook, Instagram, LinkedIn, TikTok, Yelp (`nexgen-fort-lauderdale-3`) | ✔ links on live site |
| Yelp rating | 5.0★ (3 reviews) | ✔ observed on public Yelp page; ⚠ use only with permission/verified widgets |

## 2. Page-by-Page Inventory

### HOME (WP id 764 → rebuilt `/`)
- ✔ Hero: "Transforming Your Financial Future / Expert Financial Guidance for Every Business" + intro copy
- ✔ Services We Provide intro paragraph + 6 categories: **Accounting, Audit, Taxation, Startups, Business Advisory, Healthcare** (full card copy recovered)
- ✘ "chanze uk" — injected spam link inside the Audit card → **removed**
- ✔ "Focused Solutions / Swift and Efficient Financial Assistance" + phone CTAs
- ✔ "Why People Choose Us" (original typo "wHY" fixed) — 3 reasons
- ✔ Featured services: Audit Services, Tax Advisory, Business Consulting + "All services"
- ✔ "What Our Clients Say — Based on Google Reviews / Based on Yelp Reviews" + 3 testimonials → kept (as on original) but ⚠ pending owner verification (see §4)
- ✔ "Who We Are — Discover Our Journey…" + Read More
- ✔ "Ready to Start?" CTA + both phone numbers
- ⚠ Original homepage had empty `<title>` → new SEO title written

### ABOUT US (id 1807 → rebuilt `/about`)
- ✔ "Your Partner in Financial Growth / Professional Financial Strategies Built for You"
- ✔ Firm intro ("financial clarity is the foundation…"), Our Story (2 paragraphs), Why Choose NexGen (5 bullets), Our Mission (recovered twice on original — deduplicated), CTA

### CONTACT (id 768 → rebuilt `/contact`)
- ✔ Phone, WhatsApp, email, address, "Follow Us"
- ✘ `[forminator_form id="1879"]` shortcode — original plugin form not recoverable → replaced with new secure form (server validation, spam protection, DB storage)
- ✔ "Explore Our Services / What We Can Do for You" section

### BLOG — "Insights & Updates" (id 767 → rebuilt `/insights`)
- ✘ All listed posts were spam ("Connection check …") → excluded entirely
- ➕ 3 new educational articles written for launch (bookkeeping habits, 13-week cash flow forecast, audit-preparation checklist) — clearly marked as educational content

### SERVICE PAGES (all recovered; all rebuilt under `/services/<same-slug>`)
| Original page | Rebuilt URL | Key content preserved |
|---|---|---|
| CPA Services | `/services/cpa-services` | Hero, 3 offerings, 8 audience types, 5 "why" points |
| Business Accounting & Bookkeeping | `/services/business-accounting-bookkeeping` | 8 offerings, 8 audiences |
| Tax Advisory & Planning Services | `/services/tax-advisory-planning-services` | 4 core services, audience |
| Business Tax Filing & Preparation | `/services/business-tax-filing-preparation` | 4 offerings incl. 1099/amended returns |
| LLC & S-Corp Tax Structuring | `/services/llc-s-corp-tax-structuring` | 4 offerings incl. Form 2553 |
| Crypto Tax Advisory Services | `/services/crypto-tax-advisory-services` | Gains, DeFi/staking, NFT, mining/airdrops |
| Real Estate Accounting & Bookkeeping | `/services/real-estate-accounting-bookkeeping` | Property reporting, tax prep, flips & rentals |
| eCommerce Tax & Accounting | `/services/ecommerce-tax-accounting` | Multi-state sales tax, COGS, marketplace accounting |
| Startup & Fractional CFO Services | `/services/startup-fractional-cfo-services` | Forecasting, cash flow, investor reporting |
| Financial Advisory for Startups | `/services/financial-advisory-for-startups` | Budgeting, cash flow, structure & registration |
| Tax & Accounting (Fort Lauderdale) | `/services/tax-accounting` | Local landing page ("Simplified Finances / Tax Compliance Made Easy / Clear Reporting") |

### NEW PAGES (not on the original; built from original homepage content or required by the brief)
- `/services/audit-services` — expanded from the original homepage Audit category text
- `/services/payroll-services` — expanded from the original homepage Taxation card (payroll management)
- `/privacy-policy`, `/terms-of-use` — drafts flagged for legal review
- Custom 404 — new

## 3. Metadata & URLs

- Original SEO titles/descriptions were **not recoverable** (homepage title was empty; REST API does not expose SEO plugin fields without auth). New unique titles + meta descriptions were written for every page (see `keyword-map.csv`).
- **All original page slugs preserved 1:1** under `/services/...`, plus 301 redirects for `/aboutus → /about`, `/blog → /insights`, `/home → /`, `/sample-page → /`.
- Structured data added where content supports it: `ProfessionalService` (home), `BreadcrumbList` (subpages), `Service` (service pages), `Article` (insights), `FAQPage` (visible FAQs only). No review-star schema (no verified ratings data to publish).

## 4. Items Requiring Owner Confirmation Before/After Launch

1. Address & suite number; business hours ("Mon–Fri 9–5 ET" was added by us — confirm).
2. Email mailbox `paudalus@…` remains monitored (contact routing).
3. WhatsApp number +1 (954) 770-1568 is business-active.
4. Testimonials (James Smith, Emily Johnson, Michael Brown): authenticity + permission to publish (they appear on the firm's live site; kept for continuity but flagged).
5. Any credential claims: the brief forbids claiming licensed-CPA status without evidence; site copy describes *services*, not licensure. Owner should confirm how to present credentials.
6. VAT / NHS references from the original homepage (UK-context services) were **not carried over** as standalone pages — the US-facing rebuild mentions healthcare advisory instead. If the firm truly serves UK clients, add a dedicated page.

## 5. Raw Evidence Map

| Evidence file | Contents |
|---|---|
| `evidence/page-764.json` … `page-1619.json` | Verbatim WP REST payloads per page |
| `evidence/recovered-*.txt` | Cleaned text per page |
| `evidence/front-blog.html` | Blog listing showing spam posts |
| `evidence/live-homepage.html` | Full homepage HTML incl. spam widgets |
| `evidence/nexgen-logo.png` | Official logo (176×56 RGBA) |
| `evidence/hero-finance.jpg` | Original licensed hero photo |
