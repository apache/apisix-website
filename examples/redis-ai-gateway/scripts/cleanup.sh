#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

require_cmd docker
require_env_file
compose down --remove-orphans --volumes
printf 'Removed only this isolated apisix-redis-ai-gateway lab instance.\n'
