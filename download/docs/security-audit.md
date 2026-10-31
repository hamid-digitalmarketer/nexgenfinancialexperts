# Security Audit — NexGen Financial Experts

**Date:** October 31, 2026
**Scope:** Public, read-only inspection of https://nexgenfinancialexperts.com and its WordPress REST API. No intrusive testing, no credential use, no modification of the live site.

---

## 1. Verdict

**The live website is actively compromised with SEO spam injection.** Evidence shows hidden casino-gambling links injected into WordPress footer widgets and automated spam posts created as recently as **October 30–31, 2026** — one day before this audit. The attack is ongoing or was re-executed very recently.

Severity: **HIGH** (active compromise, public brand damage, search-index contamination risk, ongoing since at least mid-2025 based on asset dates).

## 2. Confirmed Indicators of Compromise (IoCs)

### 2.1 Hidden spam link widgets (footer) — HIGH confidence

Present in the live homepage HTML (preserved at `evidence/live-homepage.html`):

```html
<section id="block-16" class="widget widget_block">
  <div style="position: absolute; left: -9966px;">
    <a href="https://truecorebehavioral.com/">NV Casino PL</a>
  </div>
</section>
```

Five such hidden widgets were extracted:

| Anchor text | Target domain |
|---|---|
| NV Casino PL | truecorebehavioral.com |
| vox casino | www.sp14.pl |
| Casino zonder cruks met Klarna | (Dutch-language casino affiliate) |
| Fontan Casino PL | fontankasynopl.com |
| Mostbet | (betting brand) |

Technique: **cloaked link injection** — links positioned off-screen (`left: -9966px`) so human visitors never see them, while search-engine crawlers index them. This is a classic WordPress "hidden link spam" hack, typically deployed via a compromised admin account, vulnerable plugin/theme, theme-editor file write, or database (widget) write.

### 2.2 Spam blog posts — HIGH confidence (active)

`/blog/` ("Insights & Updates") lists machine-generated posts:

- "Connection check qgwg4moi" — dated **October 31, 2026**
- "Connection check 3f2we5gq" — dated **October 30, 2026**
- "Connection check e1pqiei4" — (additional)

Naming pattern ("connection check" + random suffix) indicates automated backlink-verification posts, i.e., **the attacker (or a link network) is still using the site**.

### 2.3 Spam links inside page content — HIGH confidence

The homepage "Audit" service card contains injected text `chanze uk` (linking to `chanze.me.uk`) — content-level injection proving database `wp_posts`/widget contamination, not just theme modification.

### 2.4 Other spam external links observed in the homepage HTML

`chanze.me.uk`, `fontankasynopl.com`, `hotel-olsztyn.com.pl`, `stichtingrecap.nl`, `truecorebehavioral.com`, `www.sp14.pl` — all unrelated to financial services; multiple Polish/Dutch casino-affiliate patterns.

### 2.5 Publicly visible damage

A Google search result for the Contact page renders the casino footer links ("NV Casino PL", "vox casino", "Casino zonder cruks met Klarna", "Fontan Casino PL", "Mostbet") in the indexed snippet context — i.e., **search engines have already crawled and cached the spam**.

### 2.6 Secondary findings

| Finding | Severity | Notes |
|---|---|---|
| Empty `<title>` on homepage | Medium | SEO defect; may be caused by the compromise or theme misconfiguration |
| WordPress REST API open to unauthenticated enumeration | Medium | `/wp-json/wp/v2/pages` and `/users` are readable; user slugs aid credential-stuffing |
| `xmlrpc.php` advertised (RSD link) | Medium | Common brute-force/pingback abuse vector; disable if unused |
| Intermittent 406 responses from WAF | Info | A WAF (Wordfence-like) is partially active; it did not prevent the injection |
| No visible site icon/favicon configured | Low | Cosmetic |
| Testimonial photos hosted as `testimonial-skip-*.jpg` | Info | Naming suggests template placeholder images; verify authenticity |

**Not observable without authorized access** (listed as required checks, not conclusions): malware files in `wp-content`, admin-account list, plugin/theme versions, database dumps, hosting logs, Search Console manual actions, DNS/mailbox compromises.

## 3. Risk Assessment

| Risk | Likelihood | Impact | Overall |
|---|---|---|---|
| Search-index contamination (spam URLs ranked under the domain) | High (spam posts already published) | High — manual-action/penalty risk, brand damage | Critical |
| Google "Deceptive site"/security flag | Medium | High — browser warnings kill traffic | High |
| Guest-post backlink farm association | High | Medium — spammy outbound links harm trust | High |
| Continued attacker access (persisted backdoor) | Unknown, plausible | High — reinfection after cleanup | High |
| Data exposure of site visitors | Low (brochure site; contact form only) | Medium | Medium |
| Outbound reputation/blacklist (email deliverability) | Medium | Medium | Medium |

## 4. Evidence Preservation

| Artifact | Location |
|---|---|
| Full homepage HTML (2026-10-31) | `evidence/live-homepage.html` |
| REST API page JSON ×15 | `evidence/page-*.json` |
| Scraped blog listing showing spam posts | `evidence/front-blog.html` / `recovered-blog.txt` |
| Hidden-widget extracts | `evidence/` (rg output documented in §2.1) |
| Official logo + hero (clean assets) | `evidence/nexgen-logo.png`, `evidence/hero-finance.jpg` |

Recommended: owner/host additionally preserves server snapshots, `wp_users`, `wp_options`, access logs, and `wp-content` file mtimes **before** remediation (see `website-recovery-checklist.md`).

## 5. Likely Attack Vector (hypothesis, clearly labeled)

Most probable paths for this class of compromise, in order of frequency:
1. **Vulnerable or nulled plugin/theme** (incl. Elementor add-ons) with a file-write or upload flaw.
2. **Credential compromise** (weak/reused admin password; REST API + xmlrpc enabled assist brute force).
3. **Abandoned admin account** or an exposed hosting panel.

The 2026-05 logo filename (`cropped-Screenshot-…`) and June-2025 service-page publication indicate the site was actively maintained by its owner — i.e., the injection arrived through some component the owner did not manually author.

## 6. Remediation Plan (summary)

Full step-by-step: `website-recovery-checklist.md`. Outline:
1. Freeze & snapshot (host-level backup, database dump, log export).
2. Rotate all credentials (WP admins, SFTP, DB, hosting panel, salts).
3. Remove hidden widgets + spam posts; diff theme/plugin files against clean sources.
4. Rebuild clean (this project's Next.js rebuild removes the WordPress attack surface entirely — recommended path).
5. Search-engine cleanup: Search Console security review, remove spam URLs from index (410/460), validate sitemap.
6. Harden: close REST user enumeration, disable xmlrpc, 2FA, WAF rules, least-privilege, file-integrity monitoring, backups.
7. Monitor for 30 days (index coverage, referral spam, file integrity).

## 7. What This Audit Does NOT Claim

- No claim about *how* the attacker entered (no host access — vector remains a hypothesis, §5).
- No claim that the site is "clean" anywhere beyond the artifacts inspected.
- No claim about Search Console status (no authorized access).
- The rebuilt site in this workspace contains **none** of the spam artifacts (verified by code review and browser testing).
