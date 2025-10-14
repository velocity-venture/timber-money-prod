set -e

APP_NAME="Timber Money"
PKG_NAME="timber-money"

echo "==> 1) Ensure .replit has title and description"
# Create or update .replit with title/description that Replit surfaces in metadata
if [ -f .replit ]; then
  # Normalize line endings just in case
  awk '{ sub("\r$", ""); print }' .replit > .replit.tmp && mv .replit.tmp .replit

  # Set or add title
  if grep -qi '^title *= *' .replit; then
    perl -0777 -pe 's/^title *= *.*$/title = "Timber Money"/mi' -i .replit
  else
    printf '\n# App metadata\ntitle = "%s"\n' "$APP_NAME" >> .replit
  fi

  # Set or add description (optional, improves surface consistency)
  if grep -qi '^description *= *' .replit; then
    perl -0777 -pe 's/^description *= *.*$/description = "Timber Money"/mi' -i .replit
  else
    printf 'description = "%s"\n' "$APP_NAME" >> .replit
  fi
else
  printf '# Replit config\ntitle = "%s"\ndescription = "%s"\n' "$APP_NAME" "$APP_NAME" > .replit
fi

echo "==> 2) Update package.json (name/productName) if present"
if [ -f package.json ]; then
  if command -v jq >/dev/null 2>&1; then
    TMP=$(mktemp)
    jq --arg n "$PKG_NAME" --arg p "$APP_NAME" '
      .name = $n
      | (if has("productName") then .productName = $p else . end)
    ' package.json > "$TMP" && mv "$TMP" package.json
  else
    perl -0777 -pe 's/"name"\s*:\s*".*?"/"name": "timber-money"/' -i package.json || true
    perl -0777 -pe 's/"productName"\s*:\s*".*?"/"productName": "Timber Money"/' -i package.json || true
  fi
fi

echo "==> 3) Update any client index.html <title> if it exists"
if [ -f client/index.html ]; then
  perl -0777 -pe 's|<title>.*?</title>|<title>Timber Money</title>|is' -i client/index.html
fi

echo "==> 4) Update vite config title injections if used"
if [ -f vite.config.ts ]; then
  perl -0777 -pe 's/title:\s*".*?"/title: "Timber Money"/' -i vite.config.ts || true
  perl -0777 -pe "s/process\.env\.VITE_APP_TITLE\s*\|\|\s*'[^']*'/process.env.VITE_APP_TITLE || 'Timber Money'/" -i vite.config.ts || true
fi

echo "==> 5) Hard replace any residual display strings in code (safety net)"
grep -RIl --exclude-dir=node_modules --exclude-dir=.git --include='*.{ts,tsx,js,jsx,html,md,json}' 'DebtZero' . \
  | xargs -r perl -0777 -pe 's/DebtZero/Timber Money/g' -i

echo "==> 6) Print summary so you can verify"
echo "-- .replit title:"
grep -i '^title *= *' .replit || true
echo "-- .replit description:"
grep -i '^description *= *' .replit || true
echo "-- package.json name/productName (if file exists):"
grep -E '"(name|productName)"' package.json 2>/dev/null || echo "package.json not present or fields missing (ok)."

echo "==> 7) Restart app so Replit re-reads metadata"
# Try to touch a file to trigger rebuild if needed
date > .rebuild_touch

echo "All set. If the Auth modal still shows the old name, do a full hard refresh (Ctrl/Cmd+Shift+R), then Stop → Run again."
