# Website Sitemap & Information Architecture — Final

**Implemented in this build.** 20 indexable URLs + 2 utility endpoints. All legacy URLs preserved or redirected (301).

```
/                                   Home (ProfessionalService schema)
├── /about                          About Us
├── /services                       Services hub (12 service cards)
│   ├── /services/cpa-services
│   ├── /services/business-accounting-bookkeeping
│   ├── /services/tax-advisory-planning-services
│   ├── /services/business-tax-filing-preparation
│   ├── /services/llc-s-corp-tax-structuring
│   ├── /services/crypto-tax-advisory-services
│   ├── /services/real-estate-accounting-bookkeeping
│   ├── /services/ecommerce-tax-accounting
│   ├── /services/startup-fractional-cfo-services
│   ├── /services/financial-advisory-for-startups
│   ├── /services/audit-services            (expanded from original home content)
│   ├── /services/payroll-services          (expanded from original home content)
│   └── /services/tax-accounting            (Fort Lauderdale local landing page)
├── /insights                       Insights & Updates (blog hub)
│   ├── /insights/small-business-bookkeeping-foundation
│   ├── /insights/cash-flow-forecasting-basics
│   └── /insights/preparing-for-a-business-audit
├── /contact                        Contact (form + NAP + map)
├── /privacy-policy
├── /terms-of-use
└── 404 (custom, with recovery links)

Endpoints:  /sitemap.xml (auto)  ·  /robots.txt (auto, disallows /api/)
Redirects:  301 /aboutus→/about  ·  301 /blog→/insights  ·  301 /home→/  ·  301 /sample-page→/
Excluded:   /api/contact (POST endpoint, noindex via robots)
```

## URL Mapping — Original WordPress → Rebuilt

| Original URL | New URL | Note |
|---|---|---|
| `/` | `/` | Same |
| `/aboutus/` | `/about` + 301 | Cleaner slug |
| `/contact/` | `/contact` | Same |
| `/blog/` | `/insights` + 301 | Matches original page title "Insights & Updates" |
| `/cpa-services/` | `/services/cpa-services` | Same slug, nested under hub |
| `/business-accounting-bookkeeping/` | `/services/business-accounting-bookkeeping` | 1:1 |
| `/tax-advisory-planning-services/` | `/services/tax-advisory-planning-services` | 1:1 |
| `/business-tax-filing-preparation/` | `/services/business-tax-filing-preparation` | 1:1 |
| `/llc-s-corp-tax-structuring/` | `/services/llc-s-corp-tax-structuring` | 1:1 |
| `/crypto-tax-advisory-services/` | `/services/crypto-tax-advisory-services` | 1:1 |
| `/real-estate-accounting-bookkeeping/` | `/services/real-estate-accounting-bookkeeping` | 1:1 |
| `/ecommerce-tax-accounting/` | `/services/ecommerce-tax-accounting` | 1:1 |
| `/startup-fractional-cfo-services/` | `/services/startup-fractional-cfo-services` | 1:1 |
| `/financial-advisory-for-startups/` | `/services/financial-advisory-for-startups` | 1:1 |
| `/tax-accounting/` | `/services/tax-accounting` | 1:1 |
| `/sample-page/` | `/` + 301 | WP default, no value |
| Spam post URLs (`/connection-check-…`) | none → 404/410 | Intentionally NOT redirected; request de-index in Search Console |

## Internal-Linking Plan (implemented)

- Header: Services dropdown lists all 12 services (desktop + mobile).
- Home → each service category card → service page; featured 3; industries row.
- Every service page → 3 related services + CTA + phone/WhatsApp.
- Every article → related service page ("Related service" card).
- Footer → all key pages + top-8 services.
- Breadcrumbs (visual + BreadcrumbList schema) on all subpages.

## Future Expansion Slots (only with distinct, accurate content)

- `/services/vat-services` — **only if** the firm confirms UK/EU VAT work (recovered homepage mentioned VAT; excluded from US-facing build for accuracy).
- `/services/healthcare-advisory` — if healthcare/NHS-adjacent work is confirmed, with US-appropriate copy.
- City pages (e.g., `/areas/las-olas`, `/areas/victoria-park`) — only after core pages establish traction; each must carry unique, locally true content.
