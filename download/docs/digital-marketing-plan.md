# Digital Marketing & Lead-Generation Plan — NexGen Financial Experts

**Ground rules (from the brief):** no paid campaigns or marketing emails launch without authorization; no fake listings or reviews; budgets are proposed, not spent.

---

## 1. Situation

- Brand equity exists: verified Yelp profile (5.0★/3), 1,109 LinkedIn followers, active social links — but the live site is actively damaged by SEO-spam compromise (see `security-audit.md`).
- Rebuilt site ships with: 12 service landing pages, local landing page, 3 educational articles, FAQ schema, sitemap/robots, hardened form.
- Market: Fort Lauderdale + Broward; competitive middle tier (see `competitor-analysis.md`); strong regional players; no observed local specialist in crypto/e-commerce accounting.

## 2. Organic Acquisition

### Technical & on-page SEO (shipped)
- Unique titles/descriptions per page (keyword map: `keyword-map.csv`)
- Semantic H1→H3, breadcrumbs, canonical URLs, Open Graph
- `sitemap.xml` + `robots.txt` + 301s from legacy URLs
- Core Web Vitals targets: LCP ≤ 2.5s, INP < 200ms, CLS < 0.1 (static-first architecture; measure after deploy)

### Local SEO (30-day sprint)
1. **Google Business Profile:** claim/verify; category "Accounting firm"; services list mirroring site; photos of real office; hours; UTM-tagged website link.
2. **NAP consistency:** exact match across site footer, GBP, Yelp, LinkedIn, Facebook (all already match — keep them locked).
3. **Citations:** Bing Places, Apple Business Connect; FL Institute of CPAs directory *only if* membership is verified.
4. **Reviews engine:** after each completed engagement, send a 2-click review request (SMS/WhatsApp) rotating Google ↔ Yelp; respond to every review within 48h. Target: 10→25 Google reviews in 6 months. No incentives (Google policy).
5. **Local links:** Fort Lauderdale Chamber of Commerce, Broward business journals (contributed pieces), local CPAs networking groups, sponsorships with genuine local orgs.

### Content & link earning
- 2 articles/month (roadmap in `content-strategy.md`).
- Repurpose each article: 3–5 LinkedIn posts, 1 short video script, 1 Instagram carousel.
- Pitch 1 guest piece/quarter to a Florida business publication (e.g., tax-deadline explainer).

## 3. Paid Acquisition (proposal only — requires approval)

| Campaign | Keywords (exact/phrase) | Landing page | Est. economics to validate first |
|---|---|---|---|
| Core local | "accounting services fort lauderdale", "cpa fort lauderdale", "bookkeeping services fort lauderdale" | `/services/tax-accounting`, `/services/business-accounting-bookkeeping` | Local CPA CPCs commonly run ~$5–$15; validate with a $300–500/mo test before scaling — treat as estimate, not data |
| Tax season (Jan–Apr) | "business tax preparation fort lauderdale", "file business taxes" | `/services/business-tax-filing-preparation` | Seasonal budget burst |
| Specialist | "crypto tax accountant", "ecommerce accountant" | matching pages | Lower volume, high differentiation |

- Tracking: GA4 + Google Ads conversion import; conversions = form submit, call click, WhatsApp click.
- Never run without: owner approval, conversion tracking verified, and a landing page with a clear offer.

## 4. Social Media

Channels (all already real): **LinkedIn (primary)**, Instagram, Facebook, TikTok, Yelp.
- Cadence: 3 posts/week — 1 educational (article excerpt), 1 firm insight (deadline reminders, FL business news with source), 1 credibility (team, office, client-education topics).
- LinkedIn: founder-voice posts on LLC/S-Corp, cash flow, crypto tax changes.
- TikTok/Reels: 60-second "tax question of the week" — educational only, no client specifics.
- Strictly no: client results without written permission, "guaranteed refund" language, fabricated stats.

## 5. Lead Generation & Conversion Assets (shipped on site)

- Consultation request form (server-validated, spam-protected, DB-backed; email delivery activates with SMTP env).
- Click-to-call in header, hero, CTA banners, footer.
- WhatsApp deep link (`wa.me/19547701568`) — mobile-first audience.
- Per-service CTAs + related-service cross-links.
- Response expectation set on Contact page ("respond promptly; urgent → call").

**Future offers (build when value is real):** "Free 20-minute discovery call" framing; downloadable "Florida small-business tax calendar" (gated, email = lead); entity-structure calculator (later phase).

## 6. Conversion Measurement Plan

GA4 events (implement at deploy — see `analytics-and-kpi-plan.md`):
- `contact_form_submit` (primary) · `phone_click` · `whatsapp_click` · `email_click` · `service_page_engagement` (75% scroll)
- KPIs: form conversion rate (target 2–5% of service-page sessions), phone/WhatsApp click share, qualified-lead rate after triage, cost per lead if ads run.

## 7. Consent & Privacy

- Site ships with no advertising cookies; if GA4/Ads are added, add consent banner (e.g., Cookiefirst/Tartiflette-class or simple accept/decline) and honor signals per applicable US state privacy laws (Florida Digital Bill of Rights applies at 175k consumers threshold — likely not immediate, but design for it).
- Contact form collects minimum data; documented in privacy policy.

## 8. 90-Day Marketing Sequence (summary)

| Days | Focus |
|---|---|
| 0–30 | Deploy clean site → GBP + citations + review engine → GA4/Search Console → first 2 articles |
| 31–60 | Review velocity push; LinkedIn cadence; internal-link refresh; first guest pitch; approve/launch test ads if authorized |
| 61–90 | Evaluate lead sources; double down on converting channel; publish seasonal tax-deadline piece; add 1 gated resource if lead flow justifies |
