# Project Audit — NexGen Financial Experts Website Rebuild

**Date of audit:** October 31, 2026
**Auditor role:** Senior full-stack / migration / security / SEO team (AI-assisted)
**Scope:** Original domain, uploaded project files, available assets, and hosting constraints.

---

## 1. Executive Summary

The master project brief reported that https://nexgenfinancialexperts.com was "hacked or not working properly" and referenced a recovered-content file, `raw data nextgen.txt`.

Key findings:

1. **The website is online.** The domain resolves (Cloudflare, 172.67.211.176 / 104.21.23.153), serves HTTPS with proper 301 redirects from the `www` and HTTP variants, and responds HTTP 200.
2. **The site is compromised — actively, not historically.** Hidden casino-gambling links are injected into WordPress footer widgets (positioned off-screen at `left: -9966px`), spam backlink posts ("Connection check …") were created as recently as **October 30–31, 2026** (the day before this audit), and the Google-indexed version of the Contact page publicly displays casino footer links ("NV Casino PL", "vox casino", "Mostbet", …).
3. **The referenced `raw data nextgen.txt` file was NOT present** in the upload folder. Only the master prompt was provided. Content recovery was therefore performed directly against the live site using authorized, read-only methods — which proved *more* complete than the summary embedded in the brief.
4. **Recovery was highly successful.** Via the open WordPress REST API, all 15 published pages were recovered, including 11 service pages not mentioned in the brief (Crypto Tax, LLC/S-Corp, Real Estate, eCommerce, Fractional CFO, etc.).
5. **The official logo was recovered from the official domain itself** (`/wp-content/uploads/2026/05/cropped-Screenshot-2026-05-10-070324-1.png`, `class="custom-logo"`). The Google Sites URL supplied in the brief returns HTTP 403 from this environment; the live-site copy is the authoritative same asset.
6. **A complete rebuild was implemented** (Next.js 16 + TypeScript), with all original URLs preserved, plus 12 of the 20 required planning/handover deliverables in `download/docs/`.

---

## 2. Workspace Inventory

| Path | Contents | Relevance | Security concern |
|---|---|---|---|
| `upload/Rebuild NexGen Financial Experts Website.txt` | Master project brief (34,684 bytes, complete) | Governs scope and acceptance criteria | None |
| *(expected)* `raw data nextgen.txt` | Recovered page content | **Missing from upload** — see §4 | Unknown provenance; treat as untrusted if it appears later |
| `evidence/` (created during this project) | Live homepage HTML, REST API JSON for all 15 pages, scraped blog page, downloaded official logo + hero image, spam-link context extracts | Primary recovery evidence; preserved for forensics | Downloaded copies only; never executed or deployed |
| `scripts/` | Recovery scripts (`fetch_wp_pages.py`, `install_assets.py`) | Reproducible evidence gathering | Reviewed, benign |
| Pre-existing project scaffold | Next.js 16 + TypeScript + Tailwind + shadcn/ui + Prisma (SQLite) | Base stack for the rebuild | Standard scaffold, no anomalies |

**Distinguishing content status (per brief §3):**
- **Verified original content** — all text recovered from the live WordPress REST API (pages listed in §4).
- **Recovered content requiring confirmation** — testimonials (James Smith, Emily Johnson, Michael Brown), phone/WhatsApp/email/address details (verified against Yelp + LinkedIn listings, but require owner sign-off), business-hours text.
- **Suspicious / injected content** — hidden casino widgets, 6 spam external links, "chanze uk" text injected inside the homepage Audit card, "Connection check" spam posts. **All excluded from the rebuild.**
- **New content proposed for the rebuilt website** — FAQs, 3 educational articles, engagement-process copy, privacy/terms drafts. All clearly educational, no fabricated claims.

---

## 3. Live Domain Inspection (read-only, authorized)

| Check | Result |
|---|---|
| DNS | Cloudflare-proxied A records (172.67.211.176, 104.21.23.153) + AAAA |
| HTTPS | Active; HTTP→HTTPS and www→apex 301 redirects configured |
| Homepage | HTTP 200, WordPress 7.1.4, Elementor-based theme |
| `<title>` | **Empty string** — SEO defect (possibly from compromise or misconfiguration) |
| Generator meta | WordPress 7.1.4 |
| Internal pages found | `/aboutus/`, `/blog/`, `/contact/`, `/?page_id=765` |
| Social profiles | Facebook, Instagram, LinkedIn, TikTok, Yelp (`nexgen-fort-lauderdale-3`) |
| WhatsApp link | `wa.me/19547701568` (matches recovered contact data) |
| robots.txt | Default WordPress; sitemap declared |
| wp-sitemap.xml | Returned **406 Not Acceptable** on audit day (WAF interplay) |
| WordPress REST API | **Open to unauthenticated reads** (`/wp-json/wp/v2/pages`, `/users` risk) — information disclosure issue |
| Observed WAF | Intermittent 406 responses suggest a WAF (e.g., Wordfence-style) is present and rate-limiting |
| Yelp listing | "NEXGEN – Financial Advising", **5.0★ (3 reviews)**, (954) 306-3823, Fort Lauderdale FL 33304 |
| LinkedIn | "NexGen Financial Experts", 1,109 followers, address matches recovered data |

## 4. Page Inventory Recovered from Live Site

REST API (`/wp-json/wp/v2/pages?per_page=50`), 16 published pages:

| ID | Slug | Title | Recovered |
|---|---|---|---|
| 764 | home | Home | ✔ (4,610 chars) |
| 1807 | aboutus | About us | ✔ (2,622) |
| 768 | contact | Contact | ✔ (619) |
| 767 | blog | Insights & Updates | ✔ (scrape, 1,826) |
| 1692 | cpa-services | CPA Services | ✔ (2,098) |
| 1686 | financial-advisory-for-startups | Financial Advisory for Startups | ✔ (2,100) |
| 1677 | llc-s-corp-tax-structuring | LLC & S-Corp Tax Structuring | ✔ (2,314) |
| 1671 | crypto-tax-advisory-services | Crypto Tax Advisory Services | ✔ (2,159) |
| 1665 | real-estate-accounting-bookkeeping | Real Estate Accounting & Bookkeeping | ✔ (2,346) |
| 1659 | ecommerce-tax-accounting | eCommerce Tax & Accounting | ✔ (2,342) |
| 1653 | startup-fractional-cfo-services | Startup & Fractional CFO Services | ✔ (2,831) |
| 1646 | business-tax-filing-preparation | Business Tax Filing & Preparation | ✔ (2,674) |
| 1640 | tax-advisory-planning-services | Tax Advisory & Planning Services | ✔ (1,981) |
| 1633 | business-accounting-bookkeeping | Business Accounting & Bookkeeping | ✔ (2,056) |
| 1619 | tax-accounting | Tax & Accounting (Fort Lauderdale landing page) | ✔ (1,964) |
| 2 | sample-page | Sample Page (WordPress default) | Not carried over |

Spam posts observed on `/blog/`: "Connection check qgwg4moi" (2026-10-31), "Connection check 3f2we5gq" (2026-10-30), "Connection check e1pqiei4" (…) — see `security-audit.md`.

## 5. Assets Recovered

| Asset | Source | Status |
|---|---|---|
| Official logo (PNG 176×56, RGBA) | Official domain, `class="custom-logo"` img | ✔ Downloaded, verified visually, installed at `public/images/nexgen-logo.png` |
| Favicon/app icon | Derived by cropping the logo's geometric mark (magenta/blue) | ✔ Generated 32/64/192/512 px + `src/app/icon.png` |
| Hero image (Pexels-licensed photo, 1280×853) | Original site upload (pexels-photo-265087) | ✔ Reused (Pexels license permits use) |
| Logo URL supplied in brief (Google Sites) | `sites.google.com/sitesv-images-rt/…` | ✘ HTTP 403 from this environment (Google block page). Same asset recovered from official domain instead; documented, not silently substituted |

## 6. Hosting / Technology Constraints & Stack Decision

- No hosting, DNS, WordPress admin, or Search Console credentials were supplied; production deployment is therefore **not possible and not attempted** (per the brief's authorization rules).
- The available sandbox provides a Next.js 16 environment. Decision (documented in `deployment-guide.md`): rebuild as **Next.js 16 + TypeScript + Tailwind + shadcn/ui + Prisma/SQLite**, which:
  - eliminates the entire WordPress plugin attack surface that enabled the compromise,
  - preserves every legacy URL 1:1 (plus 301 redirects for renamed paths),
  - is statically renderable for speed and low maintenance.
- WordPress remains a viable alternative for the owner if content editing by non-technical staff is the priority; trade-offs and hardening requirements are in `deployment-guide.md`.

## 7. Items Blocked Pending Authorization

| Item | Why blocked |
|---|---|
| Production deployment / DNS changes | No hosting/domain credentials; brief requires approval |
| Search Console / analytics access | No authorized access provided |
| Google Business Profile audit & edits | No owner access |
| Contact-form email delivery (SMTP) | Requires owner's mail credentials; `.env.example` prepared, code ready |
| Removal of malware from the live WordPress host | Live-site remediation requires hosting access and owner authorization; checklist provided in `website-recovery-checklist.md` |
| Publishing testimonials | Pending owner verification/permission (kept on rebuilt site as on the original, flagged in QA) |

## 8. Conclusion

Discovery contradicted the brief's assumption of an offline site: the site is live, compromised, and its open REST API enabled a near-complete recovery of legitimate content and the official brand assets. All prerequisites for a secure relaunch now exist in this workspace, pending owner authorization for deployment and remediation access.
