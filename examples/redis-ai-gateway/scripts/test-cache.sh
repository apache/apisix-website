#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd awk
require_cmd cmp
require_cmd curl
require_cmd docker
require_env_file
require_provider
compose up --detach --wait

tmp_dir=$(safe_tmpdir)
cleanup() { rm -rf -- "$tmp_dir"; }
trap cleanup EXIT

consumer_a=$(env_value CONSUMER_A_KEY)
consumer_b=$(env_value CONSUMER_B_KEY)
exact_payload='{"messages":[{"role":"user","content":"In one sentence, what is Apache APISIX?"}]}'

redis_cli -n 2 FLUSHDB >/dev/null
status=$(post_chat 9080 /labs/cache/exact "$consumer_a" "$exact_payload" "$tmp_dir/exact-miss.headers" "$tmp_dir/exact-miss.json")
[[ "$status" == '200' ]] || fail "exact miss expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/exact-miss.headers")" == 'MISS' ]] || fail 'first exact request was not MISS'

for _ in {1..40}; do
  [[ "$(redis_cli -n 2 --raw DBSIZE)" == '1' ]] && break
  sleep 0.25
done
[[ "$(redis_cli -n 2 --raw DBSIZE)" == '1' ]] || fail 'exact cache entry was not written in time'

status=$(post_chat 9081 /labs/cache/exact "$consumer_a" "$exact_payload" "$tmp_dir/exact-hit.headers" "$tmp_dir/exact-hit.json")
[[ "$status" == '200' ]] || fail "exact hit expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/exact-hit.headers")" == 'HIT' ]] || fail 'second exact request was not HIT'
[[ -z "$(header_value X-AI-Cache-Similarity "$tmp_dir/exact-hit.headers")" ]] || fail 'exact HIT unexpectedly exposed a similarity score'
[[ "$(header_value X-AI-Cache-Age "$tmp_dir/exact-hit.headers")" =~ ^[0-9]+$ ]] || fail 'exact HIT age is not a non-negative integer'
cmp --silent "$tmp_dir/exact-miss.json" "$tmp_dir/exact-hit.json" || fail 'exact HIT body differs from the stored response'

status=$(post_chat 9081 /labs/cache/exact "$consumer_b" "$exact_payload" "$tmp_dir/tenant-b.headers" "$tmp_dir/tenant-b.json")
[[ "$status" == '200' ]] || fail "Consumer B request expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/tenant-b.headers")" == 'MISS' ]] || fail 'Consumer B reused Consumer A cache entry'

while IFS= read -r index; do
  [[ "$index" == apisix-cookbook-semantic* ]] || continue
  redis_cli -n 0 FT.DROPINDEX "$index" DD >/dev/null
done < <(redis_cli -n 0 --raw FT._LIST)
redis_cli -n 0 FLUSHDB >/dev/null

anchor='{"messages":[{"role":"user","content":"What is Apache APISIX?"}]}'
paraphrase='{"messages":[{"role":"user","content":"Can you explain what Apache APISIX is?"}]}'
unrelated='{"messages":[{"role":"user","content":"Name the capital of Japan."}]}'

status=$(post_chat 9080 /labs/cache/semantic "$consumer_a" "$anchor" "$tmp_dir/semantic-anchor.headers" "$tmp_dir/semantic-anchor.json")
[[ "$status" == '200' ]] || fail "semantic anchor expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/semantic-anchor.headers")" == 'MISS' ]] || fail 'semantic anchor was not MISS'

semantic_index=''
semantic_docs=0
for _ in {1..80}; do
  semantic_index=$(redis_cli -n 0 --raw FT._LIST | sed -n '/^apisix-cookbook-semantic/{p;q;}')
  if [[ -n "$semantic_index" ]]; then
    semantic_docs=$(redis_cli -n 0 --raw FT.INFO "$semantic_index" \
      | awk '$0 == "num_docs" { getline; print; exit }')
    [[ "$semantic_docs" =~ ^[0-9]+$ ]] && (( semantic_docs > 0 )) && break
  fi
  sleep 0.25
done
[[ -n "$semantic_index" && "$semantic_docs" =~ ^[0-9]+$ ]] && (( semantic_docs > 0 )) \
  || fail 'semantic Redis Search index did not receive the anchor document in time'

status=$(post_chat 9081 /labs/cache/semantic "$consumer_a" "$paraphrase" "$tmp_dir/semantic-hit.headers" "$tmp_dir/semantic-hit.json")
[[ "$status" == '200' ]] || fail "semantic paraphrase expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/semantic-hit.headers")" == 'HIT' ]] || fail 'paraphrase did not hit semantic cache'
similarity=$(header_value X-AI-Cache-Similarity "$tmp_dir/semantic-hit.headers")
awk -v score="$similarity" 'BEGIN { exit !(score >= 0.80 && score <= 1) }' \
  || fail "semantic similarity is outside [0.80, 1]: $similarity"
cmp --silent "$tmp_dir/semantic-anchor.json" "$tmp_dir/semantic-hit.json" || fail 'semantic HIT body differs from the anchor response'

status=$(post_chat 9080 /labs/cache/semantic "$consumer_a" "$paraphrase" "$tmp_dir/backfill.headers" "$tmp_dir/backfill.json")
[[ "$status" == '200' ]] || fail "semantic backfill request expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/backfill.headers")" == 'HIT' ]] || fail 'semantic result was not backfilled to exact cache'
[[ -z "$(header_value X-AI-Cache-Similarity "$tmp_dir/backfill.headers")" ]] || fail 'backfilled exact HIT still exposed semantic similarity'

status=$(post_chat 9081 /labs/cache/semantic "$consumer_a" "$unrelated" "$tmp_dir/unrelated.headers" "$tmp_dir/unrelated.json")
[[ "$status" == '200' ]] || fail "unrelated prompt expected HTTP 200, got $status"
[[ "$(header_value X-AI-Cache-Status "$tmp_dir/unrelated.headers")" == 'MISS' ]] || fail 'unrelated prompt incorrectly hit semantic cache'

printf 'PASS: exact cross-node HIT, Consumer isolation, semantic HIT, L2-to-L1 backfill, and unrelated MISS.\n'
printf 'BOUNDARY: provider-side call counters and interrupted SSE still require separate evidence.\n'
