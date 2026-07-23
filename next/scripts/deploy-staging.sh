#!/usr/bin/env bash
# Deploy dist/ to ASF staging via the autostage mechanism:
# pushing branch preview/astro to apache/apisix-website publishes the tree at
#   https://apisix-astro.staged.apache.org/
# (.asf.yaml on master already has `staging.autostage: preview/*`.)
#
# Usage: npm run deploy:staging   (or: bash scripts/deploy-staging.sh)
# Requires: a fresh dist/ (npm run sync && npm run build && npm run check)
# and push access to apache/apisix-website (any APISIX committer).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# ssh over 443: this network blocks ssh:22, and the https transport drops
# multi-MB packs (curl 16/52). The URL form below dodges both AND the global
# insteadOf rewrites (which only match git@github.com: / https://github.com/).
REMOTE="${STAGING_REMOTE:-ssh://git@ssh.github.com:443/apache/apisix-website.git}"
# ASF autostage contract (infrastructure-asfyaml README): `autostage: preview/*`
# matches branches named preview/<x>-staging and stages them at
# <project>-<x>.staged.apache.org — the "-staging" suffix is mandatory.
BRANCH="${STAGING_BRANCH:-preview/astro-staging}"

if [ ! -f "$ROOT/dist/index.html" ]; then
  echo "dist/ is missing or incomplete — run: npm run sync && npm run build" >&2
  exit 1
fi

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp -R "$ROOT/dist/." "$TMP/"

# ASF processes .asf.yaml from the branch being pushed (the production
# asf-site branch carries its own copy for the same reason). Without this
# file in the branch, the staging config on master is never consulted and
# the push is silently ignored.
cat > "$TMP/.asf.yaml" <<'YAML'
# Staging config for this preview branch — see .asf.yaml on master and
# https://github.com/apache/infrastructure-asfyaml (autostage section).
staging:
  profile: ~
  whoami: asf-staging
  autostage: preview/*
YAML

git -C "$TMP" init -q
git -C "$TMP" checkout -q -b "$BRANCH"
git -C "$TMP" add -A
git -C "$TMP" -c user.email=wenming@apache.org -c user.name="Ming Wen" \
  commit -qm "preview: static Astro rebuild of apisix.apache.org (1294/1294 URL parity)

Built from https://github.com/moonming/apisix-website-astro"

# Force-push: the preview branch is a throwaway artifact, history is noise.
# HTTP/1.1 + big postBuffer: the ~3.5k-object site pack reliably trips curl's
# "HTTP2 framing layer" bug on this machine's https transport (insteadOf
# rewrites git@ URLs to https).
git -C "$TMP" -c http.version=HTTP/1.1 -c http.postBuffer=157286400 \
  push --force "$REMOTE" "$BRANCH:$BRANCH"

# Remove the earlier misnamed branch if it is still around (harmless if not).
git -C "$TMP" push "$REMOTE" ":preview/astro" 2>/dev/null || true

echo
echo "Pushed. ASF infra will stage it shortly (usually within a few minutes) at:"
echo "  https://apisix-astro.staged.apache.org/"
