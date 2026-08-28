#!/bin/bash
set -e
cd ~/Projects/veloce_website
ZIP="${1:-$HOME/Downloads/veloce-upload.zip}"

echo "→ Wiping regenerated folders…"
rm -rf app components hooks store public README.md package.json package-lock.json next.config.mjs jsconfig.json .gitignore

echo "→ Extracting $ZIP …"
rm -rf /tmp/veloce-upload
unzip -oq "$ZIP" -d /tmp
cp -R /tmp/veloce-upload/. .

echo "→ Committing and pushing…"
git add -A
git commit -m "Sync $(date +%Y-%m-%d-%H%M)" || echo "  (nothing to commit)"
git push
echo "✓ Done."
