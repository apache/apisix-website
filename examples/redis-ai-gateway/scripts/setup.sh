#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd docker
require_cmd openssl

[[ -z "${DOCKER_DEFAULT_PLATFORM:-}" ]] \
  || fail 'unset DOCKER_DEFAULT_PLATFORM; this lab must use the Docker Server native architecture'
docker_platform=$(docker version --format '{{.Server.Os}}/{{.Server.Arch}}')
case "$docker_platform" in
  linux/amd64|linux/arm64) ;;
  *) fail "Redis Search modules in the pinned image support only linux/amd64 and linux/arm64 (Docker Server platform: $docker_platform)" ;;
esac

[[ ! -L "$ENV_FILE" ]] || fail "refusing symlinked environment file: $ENV_FILE"

if [[ ! -f "$ENV_FILE" ]]; then
  umask 077
  lab_instance_id=$(openssl rand -hex 8)
  redis_password=$(openssl rand -hex 24)
  consumer_a_key=$(openssl rand -hex 24)
  consumer_b_key=$(openssl rand -hex 24)
  printf '%s\n' \
    "LAB_INSTANCE_ID=$lab_instance_id" \
    "REDIS_PASSWORD=$redis_password" \
    "CONSUMER_A_KEY=$consumer_a_key" \
    "CONSUMER_B_KEY=$consumer_b_key" \
    'OPENAI_API_KEY=' \
    'OPENAI_CHAT_MODEL=gpt-4o-mini' \
    'OPENAI_EMBEDDING_MODEL=text-embedding-3-small' >"$ENV_FILE"
  chmod 600 "$ENV_FILE"
  current_lab_id=$lab_instance_id
  printf 'Created %s with local Redis and Consumer secrets.\n' "$ENV_FILE"
  printf 'Add OPENAI_API_KEY there before running functional tests.\n'
else
  current_lab_id=$(sed -n 's/^LAB_INSTANCE_ID=//p' "$ENV_FILE" | tail -n 1)
fi

if [[ -f "$ENV_FILE" && ! "${current_lab_id:-}" =~ ^[a-f0-9]{16}$ ]]; then
  umask 077
  lab_instance_id=$(openssl rand -hex 8)
  printf 'LAB_INSTANCE_ID=%s\n' "$lab_instance_id" >>"$ENV_FILE"
  chmod 600 "$ENV_FILE"
  printf 'Added an isolated Compose instance ID to %s.\n' "$ENV_FILE"
fi

chmod 600 "$ENV_FILE"

compose config --quiet
compose up --detach --wait --force-recreate
"$SCRIPT_DIR/check-infra.sh"
