#!/usr/bin/env bash
set -euo pipefail

LAB_ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
COMPOSE_FILE="$LAB_ROOT/compose.yaml"
ENV_FILE="$LAB_ROOT/.env"

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "required command not found: $1"
}

require_env_file() {
  local env_mode lab_instance_id
  [[ -f "$ENV_FILE" ]] || fail "missing $ENV_FILE; run scripts/setup.sh"
  [[ ! -L "$ENV_FILE" ]] || fail "refusing symlinked environment file: $ENV_FILE"
  case "$(uname -s)" in
    Darwin) env_mode=$(stat -f '%Lp' "$ENV_FILE") ;;
    *) env_mode=$(stat -c '%a' "$ENV_FILE") ;;
  esac
  [[ "$env_mode" == '600' ]] || fail "$ENV_FILE must have mode 600; run scripts/setup.sh"
  lab_instance_id=$(sed -n 's/^LAB_INSTANCE_ID=//p' "$ENV_FILE" | tail -n 1)
  [[ "$lab_instance_id" =~ ^[a-f0-9]{16}$ ]] \
    || fail "LAB_INSTANCE_ID in $ENV_FILE must be 16 lowercase hexadecimal characters; run scripts/setup.sh"
}

compose() {
  local lab_instance_id
  require_env_file
  lab_instance_id=$(env_value LAB_INSTANCE_ID)
  docker compose --project-name "apisix-redis-ai-gateway-$lab_instance_id" \
    --project-directory "$LAB_ROOT" --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"
}

env_value() {
  local key=$1
  sed -n "s/^${key}=//p" "$ENV_FILE" | tail -n 1
}

require_provider() {
  local key
  key=$(env_value OPENAI_API_KEY)
  [[ -n "$key" ]] || fail "OPENAI_API_KEY is empty; infrastructure can be checked, but real cache/quota tests require provider credentials"
}

redis_cli() {
  compose exec -T redis sh -c 'REDISCLI_AUTH="$REDIS_PASSWORD" exec redis-cli -e "$@"' sh "$@"
}

header_value() {
  local name=$1 file=$2
  awk -v wanted="$name" '
    tolower($1) == tolower(wanted ":") { sub(/^[^:]+:[[:space:]]*/, ""); sub(/\r$/, ""); value = $0 }
    END { print value }
  ' "$file"
}

curl_with_consumer_key() {
  local consumer_key=$1
  shift
  [[ "$consumer_key" =~ ^[a-f0-9]{48}$ ]] || fail 'Consumer key must be 48 lowercase hexadecimal characters'
  curl --config <(printf 'header = "apikey: %s"\n' "$consumer_key") "$@"
}

post_chat() {
  local port=$1 path=$2 consumer_key=$3 payload=$4 headers=$5 body=$6
  curl_with_consumer_key "$consumer_key" \
    --silent --show-error --connect-timeout 5 --max-time 90 \
    --dump-header "$headers" --output "$body" --write-out '%{http_code}' \
    "http://127.0.0.1:${port}${path}" \
    --request POST \
    --header 'Content-Type: application/json' \
    --data "$payload"
}

safe_tmpdir() {
  local dir
  dir=$(mktemp -d "${TMPDIR:-/tmp}/apisix-redis-lab.XXXXXX")
  case "$dir" in
    /tmp/apisix-redis-lab.*|/var/folders/*/apisix-redis-lab.*|/private/var/*/apisix-redis-lab.*) printf '%s\n' "$dir" ;;
    *) fail "refusing unexpected temporary directory: $dir" ;;
  esac
}
