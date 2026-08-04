#!/usr/bin/env bash
# Re-render public/img/architecture.png from arch.html.
#
# Usage: bash scripts/architecture/render.sh
# Requires: Google Chrome (override with CHROME=/path/to/chrome)
#
# arch.html is authored at 1200x738 CSS px and shot at 2x, so the PNG is
# 2400x1476. Keep that in sync with the width/height on the <img> in
# src/components/HomePage.astro if you change the canvas size.
#
# The diagram uses the system sans stack, so text metrics follow whatever the
# rendering machine has installed. Re-render on macOS to match the committed
# PNG; elsewhere expect small label-width shifts.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/scripts/architecture/arch.html"
OUT="$ROOT/public/img/architecture.png"

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME (set CHROME=/path/to/chrome)" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

SHOT="$TMP/shot.png"

# A throwaway profile plus the no-networking flags keep Chrome off the network,
# which it otherwise hits on startup for first-run and component-update chores.
"$CHROME" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --no-first-run \
  --no-default-browser-check \
  --disable-background-networking \
  --disable-component-update \
  --disable-extensions \
  --user-data-dir="$TMP/profile" \
  --force-device-scale-factor=2 \
  --window-size=1200,738 \
  --virtual-time-budget=3000 \
  --default-background-color=ffffffff \
  --screenshot="$SHOT" \
  "file://$SRC" </dev/null >/dev/null 2>&1 &
CHROME_PID=$!

# Chrome writes the shot and then can sit there instead of exiting (seen under
# sandboxed shells), so wait on the file rather than on the process.
for _ in $(seq 1 60); do
  if [ -s "$SHOT" ]; then
    sleep 1   # let the last write land before we read it
    break
  fi
  kill -0 "$CHROME_PID" 2>/dev/null || break
  sleep 1
done
kill "$CHROME_PID" 2>/dev/null || true
wait "$CHROME_PID" 2>/dev/null || true

if [ ! -s "$SHOT" ]; then
  echo "Chrome produced no screenshot" >&2
  exit 1
fi

# Flat fills and text palette-reduce cleanly: the raw shot is ~200 KB, 256-color
# ~70 KB. Either optimizer is fine; without one the raw shot still works.
# magick's -quality 95 is zlib level 9 + adaptive filtering, worth ~50 KB here.
if command -v pngquant >/dev/null 2>&1; then
  pngquant --quality 80-98 --speed 1 --force --output "$OUT" "$SHOT"
elif command -v magick >/dev/null 2>&1; then
  magick "$SHOT" -strip -colors 256 -depth 8 -quality 95 "PNG8:$OUT"
else
  echo "no pngquant/magick, writing the unoptimized shot" >&2
  cp "$SHOT" "$OUT"
fi

echo "wrote $OUT ($(wc -c <"$OUT" | tr -d ' ') bytes)"
