#!/usr/bin/env bash
# Regenerates public/cv.pdf from the /full-cv page, which combines every CV
# section (including Projects, Research, and Publications) into one document.
#
# It builds the site, serves the production build, renders /full-cv with
# headless Chrome (which respects the @media print rules in
# src/styles/global.css), and saves the result as public/cv.pdf.
#
# Usage: ./scripts/generate-cv-pdf.sh

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=4322
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome not found at: $CHROME"
  echo "Install Chrome, or edit CHROME in this script to point to another Chromium-based browser."
  exit 1
fi

cd "$ROOT_DIR"

echo "Building production site..."
npm run build

echo "Starting preview server on port $PORT..."
npm run preview -- --port "$PORT" &
PREVIEW_PID=$!
trap 'kill $PREVIEW_PID 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  if curl -s -o /dev/null "http://localhost:$PORT/"; then
    break
  fi
  sleep 0.5
done

echo "Rendering CV page to PDF..."
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$ROOT_DIR/public/cv.pdf" \
  --virtual-time-budget=5000 \
  "http://localhost:$PORT/full-cv"

echo "Done: public/cv.pdf"
