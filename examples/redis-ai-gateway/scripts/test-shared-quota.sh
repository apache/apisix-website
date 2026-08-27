#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd curl
require_cmd docker
require_cmd jq
require_env_file
require_provider
compose up --detach --wait

tmp_dir=$(safe_tmpdir)
cleanup() { rm -rf -- "$tmp_dir"; }
trap cleanup EXIT

consumer_key=$(env_value CONSUMER_A_KEY)
payload='{"messages":[{"role":"user","content":"Reply with only the number two: one plus one."}]}'
redis_cli -n 1 FLUSHDB >/dev/null

status=$(post_chat 9080 /labs/shared-quota "$consumer_key" "$payload" "$tmp_dir/a.headers" "$tmp_dir/a.json")
[[ "$status" == '200' ]] || fail "node A expected HTTP 200, got $status"
tokens=$(jq -er '.usage.total_tokens | select(type == "number" and . > 1)' "$tmp_dir/a.json") \
  || fail 'provider response did not contain usage.total_tokens > 1'

counter_value=''
for _ in {1..40}; do
  counter_key=$(redis_cli -n 1 --raw --scan --pattern '*ai-rate-limiting*' | sed -n '1p')
  if [[ -n "$counter_key" ]]; then
    counter_value=$(redis_cli -n 1 --raw GET "$counter_key")
    [[ "$counter_value" =~ ^[0-9]+$ ]] && (( counter_value == tokens )) && break
  fi
  sleep 0.25
done
[[ "$counter_value" =~ ^[0-9]+$ ]] && (( counter_value == tokens )) \
  || fail "Redis counter $counter_value did not equal provider usage.total_tokens $tokens in time"

status=$(post_chat 9081 /labs/shared-quota "$consumer_key" "$payload" "$tmp_dir/b.headers" "$tmp_dir/b.json")
[[ "$status" == '429' ]] || fail "node B expected HTTP 429, got $status"
grep -Fq 'shared token quota exhausted' "$tmp_dir/b.json" || fail 'node B rejection body did not match the configured message'
tr -d '\r' <"$tmp_dir/b.headers" | grep -Eiq '^X-AI-RateLimit-Remaining-[^:]*:[[:space:]]*0$' \
  || fail 'node B did not expose a zero remaining-quota header'

printf 'PASS: node A committed %s provider tokens; node B enforced the same Redis counter with HTTP 429.\n' "$tokens"
printf 'BOUNDARY: the crossing response succeeded; this is post-response accounting, not prepaid reservation.\n'
