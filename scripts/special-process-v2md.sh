#!/usr/bin/env bash
# Remove the `markdown-link-check-disable` / `markdown-link-check-enable`
# comment pairs from every apisix-ingress-controller `references/v2.mdx` that
# exists after the docs sync — the current/master copy plus whatever versioned
# copies were built.
#
# The built version set is not fixed (see SUBPROJECT_VERSIONS_TO_KEEP in
# sync-docs.js), so glob for the files that actually exist instead of
# hardcoding version numbers, which previously broke the build whenever the
# referenced versions were no longer published.
set -e

BASEDIR=$(dirname "$0")/..

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  sed_inplace() { sed -i "$@"; }
elif [[ "$OSTYPE" == "darwin"* ]]; then
  sed_inplace() { sed -i '' "$@"; }
else
  echo "Unsupported OS: $OSTYPE"
  exit 1
fi

shopt -s nullglob
files=(
  "$BASEDIR"/doc/docs/apisix-ingress-controller/references/v2.mdx
  "$BASEDIR"/doc/docs-apisix-ingress-controller_versioned_docs/version-*/references/v2.mdx
)
shopt -u nullglob

processed=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  sed_inplace '/<!--\s*markdown-link-check-disable\s*-->/I,+1d; /<!--\s*markdown-link-check-enable\s*-->/I,+1d;' "$f"
  echo "special-process-v2md: processed $f"
  processed=$((processed + 1))
done

echo "special-process-v2md: processed ${processed} file(s)"
