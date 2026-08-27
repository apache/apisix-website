#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd curl
require_cmd docker
require_env_file
require_provider
compose up --detach --wait

tmp_dir=$(safe_tmpdir)
cleanup() {
  local exit_status=$?
  trap - EXIT
  if ! rm -rf -- "$tmp_dir"; then
    printf 'ERROR: failed to remove temporary test files: %s\n' "$tmp_dir" >&2
    (( exit_status != 0 )) || exit_status=1
  fi
  if ! compose up --detach --wait --wait-timeout 60 redis >/dev/null; then
    printf 'ERROR: failed to restore the isolated Redis service after the failure-mode test\n' >&2
    (( exit_status != 0 )) || exit_status=1
  fi
  exit "$exit_status"
}
trap cleanup EXIT

consumer_key=$(env_value CONSUMER_A_KEY)
payload='{"messages":[{"role":"user","content":"Reply with exactly: healthy"}]}'
compose stop redis >/dev/null

status=$(post_chat 9080 /labs/cache/exact "$consumer_key" "$payload" "$tmp_dir/cache.headers" "$tmp_dir/cache.json")
[[ "$status" == '200' ]] || fail "cache Redis outage should continue to the provider, got HTTP $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/cache.headers")" == 'MISS' ]] || fail 'cache Redis outage did not report MISS'

status=$(post_chat 9080 /labs/shared-quota "$consumer_key" "$payload" "$tmp_dir/closed.headers" "$tmp_dir/closed.json")
[[ "$status" == '500' ]] || fail "quota fail-closed route expected HTTP 500, got $status"

status=$(post_chat 9081 /labs/shared-quota-degraded "$consumer_key" "$payload" "$tmp_dir/open.headers" "$tmp_dir/open.json")
[[ "$status" == '200' ]] || fail "quota degradation route expected provider HTTP 200, got $status"

printf 'PASS: cache failed open to MISS; shared quota failed closed or explicitly degraded as configured.\n'
printf 'WARNING: allow_degradation=true traffic is available but not quota-protected.\n'
