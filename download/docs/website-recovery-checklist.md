# Website Recovery Checklist — NexGen Financial Experts

Use this for: (1) cleaning/remediating the compromised WordPress site, (2) de-contaminating search indexes after the relaunch, (3) preventing reinfection. Steps requiring hosting/admin access are marked 🔒 (blocked until credentials are provided). Steps doable from public/Search-Console access are unmarked.

## Phase 1 — Preserve Evidence (before touching anything)

- [ ] 🔒 Full server snapshot / hosting backup (files + database)
- [ ] 🔒 Export access logs (last 90 days), PHP mail logs, FTP/SFTP logs
- [ ] 🔒 Export `wp_users`, `wp_usermeta`, `wp_options` (siteurl, active_plugins, widgets), `wp_posts` revisions
- [ ] 🔒 Record file modification times under `wp-content/` (find suspicious recent mtimes)
- [ ] Save public evidence copies (already done: `evidence/live-homepage.html`, page JSON, blog scrape)
- [ ] Note current sitemap contents and indexed-page sample (`site:nexgenfinancialexperts.com` on Google/Bing)

## Phase 2 — Access & Credentials Rotation 🔒

- [ ] Rotate: WordPress admin passwords (all accounts), hosting panel, SFTP/SSH, database user, Cloudflare API tokens, any SMTP/mailbox passwords, plugin service keys
- [ ] Create a NEW admin account; delete/rename unknown or unused admin accounts (check `wp_users` for unexpected users)
- [ ] Regenerate WordPress salts/auth keys (`wp config shuffle-keys`)
- [ ] Enable 2FA for all admins; enforce strong passwords
- [ ] Review email forwarding rules on the mailbox used by the site (attacker persistence check)

## Phase 3 — Remove the Malicious Artifacts 🔒

- [ ] Delete the 5 hidden footer widgets containing casino links (Appearance → Widgets / `wp_options` widget_block entries): "NV Casino PL", "vox casino", "Casino zonder cruks met Klarna", "Fontan Casino PL", "Mostbet"
- [ ] Remove the injected `chanze uk` link text in the homepage Audit card content
- [ ] Delete ALL "Connection check *" posts and any post revisions referencing them (search `wp_posts` for "connection check", casino terms, the 6 spam domains)
- [ ] Search the database for `left: -99` (hidden-position CSS), `base64_decode`, `eval(`, `str_rot13`, `assert(` in posts/options/widgets
- [ ] Diff theme and plugin files against clean copies from wordpress.org / vendor source; restore or reinstall anything modified (Elementor, theme functions.php, header/footer templates are prime targets)
- [ ] Delete: unused themes, unused plugins, any plugin obtained from non-official sources
- [ ] Check uploads folder for PHP files (`find wp-content/uploads -name "*.php"`) and remove
- [ ] Verify `wp-config.php`, `.htaccess`, `index.php` unmodified; check for rogue cron entries (`wp cron event list`) and `wp_options` → `active_plugins`
- [ ] Run a reputable scanner (Wordfence scan / Imam / manual grep) and quarantine hits after review
- [ ] Review registered users for spam accounts; check comment spam mass

## Phase 4 — Search Index Decontamination

- [ ] Google Search Console (verify domain property): read Security Issues / Manual Actions; request review if any flag exists
- [ ] Request removal (temp hide) of spam post URLs via Search Console Removals
- [ ] Ensure spam URLs return 404/410 (never redirect to homepage)
- [ ] Submit fresh sitemap (rebuilt site) / validate old one removed
- [ ] Inspect cached snippets for remaining casino text; use "Refresh Outdated Content" where needed
- [ ] Bing Webmaster Tools: mirror the above
- [ ] Check backlink profile for spammy inbound links (leave disavow as last resort, per brief guidance — only with evidence of an unnatural-links penalty)

## Phase 5 — Prevention Hardening

Choose ONE:
- **Path A (recommended):** retire WordPress; deploy the rebuilt Next.js site (see `deployment-guide.md`). Remaining WP hardening steps then don't apply.
- **Path B (keep WordPress):**
  - [ ] Update core, themes, all plugins from official sources
  - [ ] Remove abandoned plugins (no updates in 12+ months)
  - [ ] `DISALLOW_FILE_EDIT=true` in wp-config
  - [ ] Disable XML-RPC if unused; close REST `/wp/v2/users` enumeration (usernames leak)
  - [ ] WAF: enable/keep Wordfence or Cloudflare WAF with WordPress ruleset; add rate limits on wp-login and xmlrpc
  - [ ] Least-privilege DB user; move `wp-admin` behind an extra auth layer if practical
  - [ ] Daily off-site backups (retain 30 days) + test restore
  - [ ] File-integrity monitoring with alerts (Wordfence scan scheduling or OS-level)
  - [ ] Uptime + content-change alerts (e.g., Visualping on footer) to catch reinjection early

## Phase 6 — Verification & Monitoring (30 days)

- [ ] Weekly: `site:nexgenfinancialexperts.com` review — spam URLs dropping out of index
- [ ] Weekly: Search Console → Pages/Coverage + Security reports clean
- [ ] Weekly: footer/widget spot-check (public HTML) for reinjected links
- [ ] Confirm analytics baseline: organic impressions/clicks trend after cleanup
- [ ] Review form submissions for spam rate; tune rate limits if needed
- [ ] After 30 clean days: document closure in a short incident report (what happened, what was done, evidence references)

## Quick Reference — Confirmed IoCs (for grep/filter lists)

Domains: truecorebehavioral.com · sp14.pl · fontankasynopl.com · chanze.me.uk · hotel-olsztyn.com.pl · stichtingrecap.nl
Anchors: "NV Casino PL" · "vox casino" · "Casino zonder cruks" · "Fontan Casino" · "Mostbet"
Posts: "Connection check <random>"
CSS signature: `position: absolute; left: -99`
