#!/usr/bin/env bash
# ---------------------------------------------------------------
# Builds the static export for shared cPanel hosting (LiteSpeed/
# Apache, no Node.js) and packages download/nexgen-static-deploy.zip
#
# Usage:  bash scripts/build_static.sh
# ---------------------------------------------------------------
set -euo pipefail
cd "$(dirname "$0")/.."

API_DIR="src/app/api"
STASH="/tmp/nexgen-api-stash-$$"

# 1. The Node API routes cannot be exported — stash them for this build.
if [ -d "$API_DIR" ]; then
  mv "$API_DIR" "$STASH"
fi
restore() { [ -d "$STASH" ] && mv "$STASH" "$API_DIR" || true; }
trap restore EXIT

# 2. Static export (trailingSlash → folder/index.html served natively).
#    The contact form posts to /contact.php in this mode.
NEXT_PUBLIC_CONTACT_ENDPOINT=/contact.php npm run build:static

# 3. Restore the API routes in the source tree.
restore
trap - EXIT

# 4. Add the server-side pieces for shared hosting.
cp deploy/contact.php out/
cp deploy/.htaccess out/

# 5. Sanity checks.
test -f out/index.html
test -f out/404.html
test -d out/services
test -f out/contact.php
test -f out/.htaccess

# 6. Package.
mkdir -p download
rm -f download/nexgen-static-deploy.zip
( cd out && zip -qr "../download/nexgen-static-deploy.zip" . )
FILES=$(unzip -l download/nexgen-static-deploy.zip | tail -1 | awk '{print $2}')
SIZE=$(du -h download/nexgen-static-deploy.zip | cut -f1)
echo "✓ packaged: download/nexgen-static-deploy.zip ($SIZE, $FILES files)"
