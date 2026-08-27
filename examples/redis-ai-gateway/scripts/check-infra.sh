#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd curl
require_cmd docker
require_env_file

[[ "$(redis_cli --raw PING)" == 'PONG' ]] || fail 'Redis PING failed'
redis_cli --raw INFO server | tr -d '\r' | grep -q '^redis_version:8\.10\.1$' \
  || fail 'Redis version is not the pinned 8.10.1 release'
redis_cli --raw FT._LIST >/dev/null

for port in 9080 9081; do
  status=$(curl --silent --show-error --connect-timeout 3 --max-time 5 \
    --output /dev/null --write-out '%{http_code}' "http://127.0.0.1:${port}/labs/not-found")
  [[ "$status" == '404' ]] || fail "APISIX on port $port is not ready (HTTP $status)"
done

unauthenticated_status=$(curl --silent --show-error --connect-timeout 3 --max-time 5 \
  --output /dev/null --write-out '%{http_code}' \
  --request POST --header 'Content-Type: application/json' --data '{}' \
  'http://127.0.0.1:9080/labs/shared-quota')
[[ "$unauthenticated_status" == '401' ]] \
  || fail "missing Consumer key expected HTTP 401, got $unauthenticated_status"
consumer_a=$(env_value CONSUMER_A_KEY)
authenticated_status=$(curl_with_consumer_key "$consumer_a" \
  --silent --show-error --connect-timeout 3 --max-time 5 \
  --output /dev/null --write-out '%{http_code}' \
  --request POST --header 'Content-Type: application/json' \
  --data '{' \
  'http://127.0.0.1:9080/labs/shared-quota')
[[ "$authenticated_status" == '400' ]] \
  || fail "valid Consumer key with malformed JSON expected HTTP 400, got $authenticated_status"

redis_container=$(compose ps -q redis)
[[ "$redis_container" =~ ^[a-f0-9]{12,64}$ ]] || fail 'could not resolve the isolated Redis container ID'
redis_published_ports=$(docker inspect --format \
  '{{range $port, $bindings := .NetworkSettings.Ports}}{{if $bindings}}{{$port}}{{end}}{{end}}' \
  "$redis_container")
[[ -z "$redis_published_ports" ]] || fail "Redis ports must not be published to the host: $redis_published_ports"
[[ "$(compose port apisix-a 9080)" == '127.0.0.1:9080' ]] || fail 'apisix-a must bind only to 127.0.0.1:9080'
[[ "$(compose port apisix-b 9080)" == '127.0.0.1:9081' ]] || fail 'apisix-b must bind only to 127.0.0.1:9081'

images=$(compose config --images)
grep -Fqx 'apache/apisix:3.18.0-debian@sha256:84e6b5e787e9f889ebff88161cb9a16599bafcffa236c6b54c7f779a0655940d' <<<"$images"
grep -Fqx 'redis:8-alpine@sha256:becdda6c7f4b3fb42e42fd7f120bbf5c54c4caaaf16f26da24e4563d2c1f0576' <<<"$images"

printf 'PASS: pinned APISIX nodes, private Redis 8.10.1, authentication, and Redis Search are ready.\n'
printf 'NOTE: this is infrastructure evidence only; it does not verify cache or quota behavior.\n'
