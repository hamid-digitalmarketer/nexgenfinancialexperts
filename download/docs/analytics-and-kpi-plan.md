# Analytics & KPI Plan — NexGen Financial Experts

## 1. Principles

- Privacy-first: no third-party trackers until the owner approves; when GA4 is added, pair with a consent mechanism and honor opt-outs.
- Measure what maps to money: qualified inquiries and their sources — not vanity counts.
- Every KPI below is verifiable from free tools (GA4, Search Console, GBP insights, call logs). No invented baselines: collect 30 days of data before judging trends.

## 2. Tooling Setup (at deployment)

| Tool | Purpose | Setup |
|---|---|---|
| Google Analytics 4 | Traffic + conversion events | Property for nexgenfinancialexperts.com; GA4 script gated behind consent; mark `contact_form_submit` as key event |
| Google Search Console | Queries, index coverage, security status | Domain property via DNS; submit sitemap |
| Google Business Profile | Local visibility, calls, direction requests | UTM the website link; weekly post cadence |
| Call tracking (optional, later) | Phone attribution | Simple first: unique forwarded number for the site if owner approves |
| Server logs / DB | Form submissions, spam rate | `ContactSubmission` table is the lead source of truth |

## 3. Event Taxonomy (implement in GA4)

| Event | Trigger | Why it matters |
|---|---|---|
| `contact_form_submit` | Successful POST /api/contact response | Primary conversion |
| `phone_click` | Click any `tel:` link | Call intent |
| `whatsapp_click` | Click `wa.me` links | Chat intent |
| `email_click` | Click `mailto:` | Email intent |
| `service_page_view_75` | 75% scroll on service pages | Engagement quality |
| `article_read_75` | 75% scroll on articles | Content value |
| `faq_open` | FAQ accordion open | Objection research |

Parameters: `service_slug`, `page_path`. Keep PII out of events (no names/emails in URLs or params).

## 4. KPI Framework

### North-star (monthly)
- **Qualified inquiries** (form submissions + calls + WhatsApp that pass owner triage) — reviewed and tagged monthly in the DB/admin workflow.

### Acquisition
| KPI | Source | 6-month target (to validate, not a promise) |
|---|---|---|
| Organic sessions | GA4 | Trend up vs. month 1 baseline |
| Branded searches ("nexgen financial experts") | GSC | Grow with GBP + reviews |
| Non-branded impressions (service keywords) | GSC | Indexing + content cadence effect |
| GBP actions (calls, directions, website) | GBP | Steady growth after review velocity |
| Local pack presence for "accounting fort lauderdale" | Manual check | Top-3 by month 6 is a stretch goal; treat as hypothesis |

### Conversion
| KPI | Definition | Target to validate |
|---|---|---|
| Site → inquiry rate | Inquiry events ÷ sessions | 2–5% on service pages |
| Form completion rate | Submits ÷ form views | ≥ 50% |
| Response time to inquiry | First response lag (owner workflow) | < 4 business hours |

### Content & SEO health
| KPI | Source | Cadence |
|---|---|---|
| Indexed pages vs. sitemap (20 URLs) | GSC | Weekly |
| Spam-URL remnants in index | `site:` + GSC | Weekly until zero |
| Core Web Vitals (LCP ≤2.5s, INP <200ms, CLS <0.1) | PageSpeed/CrUX | At launch, then quarterly |
| 404s / broken links | Crawler or logs | Monthly |

### Security-adjacent KPIs (post-incident)
| KPI | Target |
|---|---|
| Casino/spam strings in site HTML | 0 (monitoring script or visual check) |
| Search Console security issues | none |
| Form spam rate | < 5% of submissions |

## 5. Reporting Rhythm

- **Weekly (15 min):** GSC coverage + security, form submissions count/spam rate, GBP actions.
- **Monthly (1 hr):** KPI dashboard review; annotate deployments/articles; triage leads → tagged outcomes in DB.
- **Quarterly:** strategy re-prioritization (content topics, ads decision), CWV re-test, backup-restore drill.

## 6. Dashboard Sketch (build when GA4 is live)

- Scorecards: inquiries, form conversion %, top 5 landing pages, top queries, GBP actions.
- Time series: organic sessions vs. inquiry events; annotated with article publishes and seasonal tax events.
- Table: service-page engagement → which service attracts the most attention (guides content priorities).
