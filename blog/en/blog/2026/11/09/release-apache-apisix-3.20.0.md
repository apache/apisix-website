---
title: "Release Apache APISIX 3.20.0"
authors:
  - name: "Abhishek Choudhary"
    title: "Author"
    url: "https://github.com/shreemaan-abhishek"
    image_url: "https://github.com/shreemaan-abhishek.png"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://github.com/kayx23.png"
keywords:
  - Apache APISIX
  - API Gateway
  - API Management Platform
  - New Release
  - Cloud Native
description: Apache APISIX 3.20.0 was released on Nov 9, 2026. This release adds request decompression, multi-cluster Kubernetes discovery, OIDC claim forwarding, new process metrics, and important security and upgrade changes.
tags: [Community]
---

We are glad to present Apache APISIX 3.20.0 with new request-processing, service-discovery, authentication, rate-limiting, and observability capabilities.

<!--truncate-->

This release adds request decompression, explicit multi-cluster Kubernetes discovery, HTTPS Consul discovery, verified OIDC claim forwarding, richer rate-limit diagnostics, and per-process NGINX metrics. It also upgrades APISIX Runtime to 1.4.2.

The release contains backward-incompatible security and behavior changes. Review every applicable upgrade plan before rollout.

## Breaking Changes

The following changes affect existing plugins, authentication flows, request handling, metrics, or deployment behavior. Each item identifies the affected configuration and the action required before upgrading.

### The deprecated `mcp-bridge` plugin has been removed

APISIX no longer ships or loads `mcp-bridge`, its local-process transport, or its supporting MCP broker modules. A configuration that still enables the plugin fails to load it. `openapi-to-mcp` remains available for exposing HTTP APIs described by OpenAPI as MCP tools, but it is not a drop-in replacement for a bridge to an arbitrary stdio MCP server.

**Upgrade plan:** If `mcp-bridge` is listed in `plugins`, remove it and delete every Route or Service configuration that uses it before upgrading. If the bridged process exposes an HTTP API with an OpenAPI document, redesign the integration with `openapi-to-mcp`; otherwise run the MCP server outside APISIX and choose a supported network integration. There is no compatibility switch that restores `mcp-bridge`.

For more information, see [PR #14019](https://github.com/apache/apisix/pull/14019).

### `wolf-rbac` moves `header_prefix` from Consumer to Route or Service

`wolf-rbac` now configures `header_prefix` on the Route or Service, including inside `multi-auth`, so the authentication boundary owns and clears its identity-header namespace. The default remains `X-`. `appid` is now required on the Consumer, while `server` and `ssl_verify` remain Consumer fields.

A Consumer with a custom `header_prefix` is rejected. A stored Consumer value equal to the old default `X-` is removed during validation for compatibility, but it no longer controls the emitted headers.

**Upgrade plan:** If you use `wolf-rbac`, move each custom Consumer `header_prefix` to every Route or Service that authenticates with that Consumer, including `multi-auth` entries. Remove the field from the Consumer and ensure `appid` is present. Test both successful authentication and a fallback authentication path with client-supplied identity headers. Routes that relied on the default can omit the field and continue using `X-`.

For more information, see [PR #13929](https://github.com/apache/apisix/pull/13929).

### `oas-validator` verifies remote specification certificates by default

When `oas-validator` fetches an HTTPS `spec_url`, `ssl_verify` now defaults to `true`. A certificate outside the configured trust store, or a hostname mismatch, prevents the specification from loading and the Route returns 500. This also prevents credentials in `spec_url_request_headers` from being exposed to an impersonated specification host.

**Upgrade plan:** If you use an HTTPS `spec_url`, verify that its certificate chain and hostname are trusted by APISIX before upgrading. Add the issuing CA to the trust store when necessary and test a fresh fetch after the cache expires. Set `ssl_verify: false` only as an explicit, risk-accepted compatibility option; APISIX logs that opt-out.

For more information, see [PR #14146](https://github.com/apache/apisix/pull/14146).

### Shared gRPC trust anchors can replace an HTTP-level custom CA

For gRPCS upstreams with `tls.verify: true` and no per-Upstream `tls.ca_certs`, APISIX now renders `grpc_ssl_trusted_certificate` from `apisix.ssl.ssl_trusted_certificate`. This fixes verification against an empty trust store. However, the generated server-level directive takes precedence over a different `grpc_ssl_trusted_certificate` previously injected at the HTTP level with `http_configuration_snippet`. Adding the directive again through `http_server_configuration_snippet` is not a fallback because NGINX rejects duplicate values in the same context.

**Upgrade plan:** If you set a custom gRPC trust file through `http_configuration_snippet` and also configure `apisix.ssl.ssl_trusted_certificate`, add the required gRPC CA to the shared trust file before upgrading, or configure the distinct CA with the affected Upstream's `tls.ca_certs`. Validate one trusted and one untrusted gRPCS connection. Deployments without this custom directive require no migration.

For more information, see [PR #14113](https://github.com/apache/apisix/pull/14113).

### `authz-keycloak` requires every requested permission and scope

The plugin now requests Keycloak's `permissions` response and checks every configured resource and scope. A request is rejected with 403 when any requested permission is absent. This corrects cases where a route listing several permissions, several scopes, or `http_method_as_scope` could be accepted without the complete grant. Scopes are trimmed before they are sent, so `res#view, delete` now requests and enforces `delete`; a token-endpoint response that is not a permissions list returns 503.

**Upgrade plan:** If a Route uses `authz-keycloak`, compare its `permissions` and `http_method_as_scope` settings with the Keycloak authorization policies. Grant every required resource and scope or narrow the Route's requested set, then test a fully authorized token and tokens missing each permission. There is no option to restore partial-grant acceptance.

For more information, see [PR #14098](https://github.com/apache/apisix/pull/14098).

### OpenID Connect introspection distinguishes invalid tokens from service failures

The `openid-connect` plugin now uses `lua-resty-openidc` 1.9.3 and `lua-resty-session` 4.2.0. An explicitly inactive token returns 401 with an `invalid_token` challenge. An unavailable endpoint, transport failure, timeout, or malformed response returns 503 without that challenge, while a configuration failure returns 500. The `active` claim must be a boolean; a missing or non-boolean value is treated as an invalid introspection response.

The dependency upgrade also propagates session-destroy and closed-mode revocation-store failures that were previously ignored. In an authorization-code flow, such a failure can stop session initialization or access-token retrieval, and a failed session destroy prevents the logout redirect.

**Upgrade plan:** If clients or monitors consume introspection errors, update them to distinguish 401, 503, and 500. Ensure the authorization server returns a boolean `active` claim and verify one inactive-token case, one endpoint-failure case, and one valid token. If the authorization-code flow uses a server-side revocation store in closed fail mode, verify its availability and test login, token refresh, and logout before upgrading. There is no setting that restores the previous all-401 mapping or silently ignores a closed-mode revocation-store failure.

For more information, see [PR #14088](https://github.com/apache/apisix/pull/14088).

### Stream Prometheus metrics gain `service` and `service_id` labels

`apisix_stream_connection_total`, `apisix_stream_active_connections`, `apisix_stream_status`, and `apisix_stream_bandwidth` now include `service` and `service_id`. Both are empty when a session never reaches a Stream Route with a Service. With `prefer_name: true`, `service` contains the Service name while `service_id` retains the ID.

**Upgrade plan:** If you query these four metrics, update exact label sets, recording rules, alerts, dashboards, and remote-write consumers before a mixed-version rollout. Use an aggregation such as `sum without (service, service_id) (...)` when you need the pre-3.20 series shape, or retain the labels for per-Service visibility. Test sessions with a Service and unmatched or early-failing sessions. There is no option to remove the new labels.

For more information, see [PR #13992](https://github.com/apache/apisix/pull/13992).

### `apisix start` no longer blocks while capturing OpenResty stdout

The CLI now starts OpenResty without capturing its stdout. This prevents `apisix start` from waiting forever and buffering logs when `access_log` points to `/dev/stdout`. As a consequence, a container whose only foreground command is `apisix start` exits after OpenResty daemonizes.

**Upgrade plan:** If a container or process supervisor relies on `apisix start` remaining in the foreground, run OpenResty with `daemon off;`, following the official image entrypoint, or supervise the daemon explicitly. If stdout logging is enabled, verify that the supervisor still collects the inherited stream. There is no CLI option to restore the accidental blocking behavior.

For more information, see [PR #14087](https://github.com/apache/apisix/pull/14087).

### mTLS SNI and Host mismatches return 421

For mTLS-enabled SSL configurations, APISIX checks the request Host against the TLS SNI before evaluating the client certificate. A mismatch now returns `421 Misdirected Request`, allowing HTTP/2 clients to open a new connection for the intended origin, instead of returning 400.

**Upgrade plan:** If clients, tests, or monitoring expect 400 for an mTLS SNI/Host mismatch, accept 421 and allow the client to retry on a new connection with the target origin's SNI and certificate. Other client-certificate failures continue to return 400. There is no setting that restores the old status.

For more information, see [PR #14013](https://github.com/apache/apisix/pull/14013).

### Upstreams receive the normalized path used for routing

When NGINX normalizes a path beyond percent-decoding or merging repeated slashes, APISIX now forwards the path the router matched instead of the raw request line. This prevents a request containing dot segments or equivalent normalization from being authorized on one path and forwarded as another. Because the forwarded `$uri` is decoded, `/a/./b%2Fc` reaches the upstream as `/a/b/c`. A plugin-set `$upstream_uri` still takes precedence, and encoding-only or repeated-slash differences continue to preserve the original request line.

**Upgrade plan:** If an upstream intentionally depends on raw dot segments or other NGINX-normalized path syntax, test those requests against 3.20 and move any required transformation into an explicit rewrite. Security and routing policies should use the normalized path. There is no compatibility option for forwarding a materially different raw path after routing.

For more information, see [PR #14035](https://github.com/apache/apisix/pull/14035).

### Encoded-slash routes tighten mTLS exemptions

When `apisix.match_uri_encoded_slash` is enabled, `client.skip_mtls_uri_regex` must match both the decoded URI and the route URI that retains `%2F` within a segment. An exemption written only for the decoded form no longer lets an encoded-slash request bypass client-certificate verification.

**Upgrade plan:** If both settings are used, audit each exemption against decoded and `%2F`-preserving forms. Extend only the patterns that are intended to exempt the encoded-slash route, then test the plain path, an encoded-slash path without a certificate, and a certified request. Disabling `match_uri_encoded_slash` restores the older routing model but changes route matching globally.

For more information, see [PR #14108](https://github.com/apache/apisix/pull/14108).

### Authentication plugins clear untrusted forwarded headers on skip paths

`jwe-decrypt` now removes its `forward_header` before processing, including when `strict: false` lets a tokenless request continue. `forward-auth` removes every configured `upstream_headers` value when the authorization service is unavailable and `allow_degradation: true`. Client-supplied values therefore no longer reach the upstream on paths where APISIX has no trusted value.

**Upgrade plan:** If an upstream intentionally consumed a client-provided header with one of these protected names during a skip or degradation path, move that input to a different, explicitly untrusted header. Test missing-JWE and unavailable-auth-service cases. There is no option to preserve the spoofable header behavior.

For more information, see [PR #14096](https://github.com/apache/apisix/pull/14096).

### `ai-prompt-guard` inspects string-array Embeddings input

For OpenAI Embeddings requests, the plugin now joins every string in an `input` array and checks the combined text. `allow_patterns` applies to that combined value and any `deny_patterns` match rejects the batch. Arrays of token IDs remain uninspected because APISIX does not decode them.

**Upgrade plan:** If `ai-prompt-guard` protects an Embeddings endpoint, test representative batched string inputs and adjust the allow and deny expressions to the combined-text behavior. Split a batch when each item needs an independent policy decision. There is no option to restore the previous omission for string arrays.

For more information, see [PR #14073](https://github.com/apache/apisix/pull/14073).

### `openapi-to-mcp` applies stricter trust boundaries and size limits

Tool arguments are now filtered to parameters declared by the operation. Route-configured headers take precedence, unsafe or connection-level headers are dropped, and undeclared query keys no longer reach the API. A stored Route is rejected if a configured header name contains `:`, whitespace, or a value containing CR or LF. When `allowed_origins` is set, it governs MCP browser requests; otherwise, an Origin must match a literal Route host with the same scheme and effective port, or both sides must use loopback. External `$ref` documents are limited to the `openapi_url` origin plus `allowed_ref_hosts`; SSE sessions are bound to their Route and Consumer.

The plugin also defaults to a 1 MiB `max_response_body_size`, a 4 MiB `max_document_size`, and a 50,000-node `max_expanded_nodes` budget. Path parameters cannot contain `/` or `\` unless `allow_encoded_path_separators: true`; empty and dot components remain forbidden.

**Upgrade plan:** If you use `openapi-to-mcp`, test every tool whose caller previously supplied undeclared parameters or special headers and declare legitimate parameters in the OpenAPI document. Configure trusted browser origins and external reference hosts explicitly. Raise the three size limits only after measuring worker-memory impact. If an API deliberately accepts encoded separators as data, enable `allow_encoded_path_separators` and verify that the upstream does not decode them into path syntax. There is no broad legacy mode; each trust boundary must be configured deliberately.

For more information, see [PR #13959](https://github.com/apache/apisix/pull/13959) and [PR #14154](https://github.com/apache/apisix/pull/14154).

### `forward-auth` uses the FFI HTTP client by default

Authorization requests now use `ngx_http_ffi_client` by default. Compared with `lua-resty-http`, the request carries a `Connection` header, a GET carries `Content-Length: 0`, no default `User-Agent` is added, and the timeout bounds the complete response read. A runtime without the FFI module fails the authorization request instead of silently switching clients.

**Upgrade plan:** If the authorization service validates exact request framing, update it for the new headers and test GET, POST, keepalive, timeout, and TLS behavior. Custom builds must include the FFI client module. Set `plugin_attr.forward-auth.http_client: lua-resty-http` in `config.yaml` to preserve the previous client during migration.

For more information, see [PR #14144](https://github.com/apache/apisix/pull/14144).

## New Features

APISIX 3.20.0 adds new controls for request bodies, discovery, identity propagation, rate-limit diagnostics, and process-level capacity monitoring.

### Decompress request bodies before plugin processing

The new `request-decompress` plugin inflates `gzip` and `deflate` request bodies so validation, transformation, WAF, and logging plugins can inspect plaintext. It rejects unsupported encodings with 415, malformed compressed data with 400, and raw or inflated bodies above `max_req_body_size` with 413. Concatenated gzip members are supported and bounded cumulatively.

By default the upstream receives the decompressed body. Set `forward_compressed: true` when plugins should inspect plaintext but the upstream should retain a compressed representation. The plugin then restores the original bytes when no earlier plugin changed the body, or recompresses the modified body before proxying.

The default `max_req_body_size` is 1 MiB. `request-decompress` runs at priority 2850, before `hmac-auth` at its default priority, so `hmac-auth.validate_request_body` hashes the decompressed body. If clients sign the compressed bytes, raise the `hmac-auth` priority above 2850. Decompression also occurs before authentication at the default order; keep both the APISIX client-body limit and the plugin limit bounded for untrusted clients. With `forward_compressed: true`, log-phase plugins read the body in the form sent upstream.

```json
{
  "plugins": {
    "request-decompress": {
      "max_req_body_size": 4194304,
      "forward_compressed": false
    },
    "request-validation": {
      "body_schema": {"type": "object"}
    }
  }
}
```

For more information, see [PR #14016](https://github.com/apache/apisix/pull/14016).

### Select several Kubernetes discovery clusters per upstream

In multi-cluster mode, `discovery_args.cluster_ids` selects the exact clusters whose endpoints form an upstream. The `service_name` then uses `namespace/name:port_name`, and APISIX returns the union of matching endpoints while deduplicating identical `host:port` values. Unknown clusters are rejected by the Admin API; if stale standalone configuration reaches a data plane, unknown IDs are skipped and logged.

```json
{
  "type": "roundrobin",
  "discovery_type": "kubernetes",
  "service_name": "default/orders:http",
  "discovery_args": {
    "cluster_ids": ["production-a", "production-b"]
  }
}
```

For more information, see [PR #13991](https://github.com/apache/apisix/pull/13991).

### Connect to Consul over HTTPS

Consul discovery accepts both `http` and `https` server addresses in one list. HTTPS certificates are verified by default against `apisix.ssl.ssl_trusted_certificate`, with SNI derived from each address. `discovery.consul.ssl_verify: false` disables verification for HTTPS entries and has no effect on HTTP entries.

For more information, see [PR #14018](https://github.com/apache/apisix/pull/14018).

### Forward verified OIDC claims as upstream headers

`openid-connect.upstream_headers` maps a verified claim path to an upstream request header. APISIX clears each declared header on every outcome, preventing a client from supplying a spoofed value when authentication fails open. Authorization-code flows prefer ID-token claims and fall back to user info; bearer flows use the verified token or introspection result. Strings and numbers are written as text, while arrays and objects are base64-encoded JSON.

```json
{
  "upstream_headers": [
    {"header": "X-Profile-Id", "path": ["profile", "id"]},
    {"header": "X-Scopes", "path": ["scope"]}
  ]
}
```

For more information, see [PR #14030](https://github.com/apache/apisix/pull/14030).

### Observe NGINX process capacity with Prometheus

The Prometheus plugin now exports per-process Lua timers, connection-slot usage, and Lua VM memory through `apisix_nginx_timers`, `apisix_nginx_timers_max`, `apisix_nginx_process_connections`, `apisix_nginx_process_connections_max`, and `apisix_nginx_lua_memory_bytes`. These gauges distinguish workers, the privileged agent, and HTTP or stream subsystems, helping operators alert before timer, connection, or memory exhaustion becomes request failure.

For more information, see [PR #14034](https://github.com/apache/apisix/pull/14034).

### Configure expired Prometheus metric cleanup

`plugin_attr.prometheus.remove_expired_keys_interval` controls how often expired metric entries are reclaimed. It defaults to 3600 seconds, values above 3600 are capped, and non-positive values disable automatic cleanup. It is independent of `refresh_interval`. Shorter intervals reclaim shared-dictionary space sooner at the cost of more frequent scans; after shortening the value on reload, the next cleanup can still wait for the previous interval because workers share the cleanup marker.

For more information, see [PR #13981](https://github.com/apache/apisix/pull/13981).

### Choose fail-open behavior for `chaitin-waf`

`allow_degradation` lets requests continue when Chaitin WAF metadata is missing, no healthy WAF node is available, or the detection request fails. The effective default is `false`. A Route-level value overrides plugin metadata, including an explicit `false`; successful WAF decisions still follow the configured mode.

Use this option only when availability takes precedence over inspection during WAF failure, and monitor the response debug headers and warnings because requests can still wait for the configured timeout before continuing.

For more information, see [PR #13311](https://github.com/apache/apisix/pull/13311).

### Inspect rate-limit decisions and windows

`limit-count` expands `$rate_limiting_info` with the window type and size, evaluated timestamp, decision, request cost, current window, previous sliding window, and delayed-sync snapshot. Existing quota fields retain their names, but JSON field order is not fixed. Keys containing quotes or backslashes are now encoded as valid JSON. The same change keeps the local fixed-window end time stable, so an `ai-rate-limiting` zero-cost check no longer pushes `X-AI-RateLimit-Reset` later than the counter's actual TTL.

For more information, see [PR #13996](https://github.com/apache/apisix/pull/13996).

### Use nested AI usage fields in rate-limit expressions

`ai-rate-limiting.cost_expr` can reference nested numeric usage fields by joining path components with `__`, such as `input_tokens_details__cached_tokens`. Top-level variables keep their existing names, and missing values continue to evaluate as zero.

For more information, see [PR #13984](https://github.com/apache/apisix/pull/13984).

### Read more request headers in plugins

`apisix.max_request_headers_readable` controls how many request headers plugins can read through `core.request.headers()`. The default remains 100, while `0` removes the limit. Headers beyond the readable count are still forwarded to the upstream; raise the value only for plugins that must inspect them and account for the extra per-request work.

For more information, see [PR #14136](https://github.com/apache/apisix/pull/14136).

## Bug Fixes

The fixes below are grouped by the subsystem users are most likely to recognize: discovery, routing and upstream transport, rate limiting, AI Gateway, security, validation, and logging.

### Service discovery and configuration lifecycle

- Consul catalog and health watches now run as independent timers, avoiding a race where one watcher was killed while reading a response and a simultaneous index change could fail the whole refresh. [PR #14032](https://github.com/apache/apisix/pull/14032)
- `lua-resty-consul` 0.4.0 separates connection pools by scheme, SNI, and `ssl_verify`, preventing reuse across incompatible TLS settings. [PR #14118](https://github.com/apache/apisix/pull/14118)
- Kubernetes discovery now fails an incomplete paginated list instead of deleting endpoints from pages that were never loaded. [PR #14053](https://github.com/apache/apisix/pull/14053)
- Nacos discovery retains the last successful node snapshot when one service refresh fails, while still removing a service after its APISIX configuration is deleted. [PR #13971](https://github.com/apache/apisix/pull/13971)
- Resource-version helpers now tolerate a configuration deleted during an update instead of indexing a missing value. [PR #13986](https://github.com/apache/apisix/pull/13986)

### Routing, request limits, and upstream TLS

- `normalize_uri_like_servlet` now preserves the query string for the primary upstream and `proxy-mirror`. [PR #13982](https://github.com/apache/apisix/pull/13982)
- `client-control` body limits survive the internal redirect to a gRPC upstream, including chunked HTTP/2 request bodies. [PR #14036](https://github.com/apache/apisix/pull/14036)
- Inline `traffic-split` upstreams now apply their `tls` and `keepalive_pool` settings, including client certificates, verification, CA certificates, certificate references, and pool sizing. [PR #14054](https://github.com/apache/apisix/pull/14054)

### Rate limiting

- Every `limit-count.rules` entry now owns its delayed-sync queue, timer, and limiter, so one rule cannot flush another rule's keys with the wrong quota or window. [PR #14064](https://github.com/apache/apisix/pull/14064)
- A delayed-sync node that only rejects requests now refreshes a quota after its local delta expires instead of continuing to reject against stale sliding-window state. [PR #14015](https://github.com/apache/apisix/pull/14015)

### AI Gateway usage accounting

- Bedrock cache-read and cache-write tokens now contribute to normalized prompt usage and reach the logging variables in streaming and non-streaming responses. [PR #14044](https://github.com/apache/apisix/pull/14044)
- Anthropic prompt usage now includes cache-read and cache-creation tokens, and streaming usage is accumulated across `message_start` and `message_delta`. This corrects token-based rate limits, metrics, and cache-hit ratios. When an Anthropic client uses an OpenAI-compatible upstream, buffered and streaming responses now calculate `input_tokens` as `max(0, prompt_tokens - cache_read - cache_write)`, avoiding a double-counted cache write. [PR #14028](https://github.com/apache/apisix/pull/14028)

### Security, validation, and memory safety

- AWS and Vault Secret errors no longer include provider response bodies; logs retain only the identifiers needed to locate the failed reference. [PR #14049](https://github.com/apache/apisix/pull/14049)
- Malformed CSRF token shapes and fields return 401 instead of causing a Lua error and 500. [PR #14025](https://github.com/apache/apisix/pull/14025)
- Remote `oas-validator` specifications unused for `spec_url_ttl` seconds are released, preventing obsolete Route URLs from accumulating compiled specifications in worker memory. Rebuilding the cache after `spec_url_ttl` metadata changes also releases the previous cache instead of retaining it for the worker lifetime. [PR #14061](https://github.com/apache/apisix/pull/14061)

### Syslog reliability

- A syslog logger initialization failure now returns to the batch processor instead of continuing with a missing logger and raising a Lua error. [PR #13970](https://github.com/apache/apisix/pull/13970)
- Syslog error messages now separate the operation from its cause, making failures readable and searchable. [PR #13974](https://github.com/apache/apisix/pull/13974)

## Other Changes

The release also updates the supported runtime and reduces per-request allocation in several hot paths.

- APISIX Runtime is upgraded to 1.4.2, based on OpenResty 1.31.8.1, NGINX 1.31.8, and OpenSSL 3.5.9. It includes current NGINX and OpenSSL security fixes, the `X25519MLKEM768` TLS 1.3 hybrid group, restored upstream keepalive integration, a `gzip` small-buffer fix, and fixes for multiplexed Dubbo upstream connections. [PR #14041](https://github.com/apache/apisix/pull/14041) [PR #14126](https://github.com/apache/apisix/pull/14126)
- Brotli build and development scripts now use Brotli 1.2.1. [PR #14138](https://github.com/apache/apisix/pull/14138)
- `nginx-lua-prometheus-api7` 1.1.1 updates pending increments in place, reducing short-lived table allocation for histograms. [PR #14150](https://github.com/apache/apisix/pull/14150)
- `limit-count` caches parsed variable templates, local limiters, and generated quota-header names; `proxy-rewrite` avoids caching templates created per request. [PR #14141](https://github.com/apache/apisix/pull/14141)
- `request-id` reads only its configured header and generates UUIDv4 values through a precomputed hex table. Header setters without an explicit context now keep the request-header cache coherent. [PR #14140](https://github.com/apache/apisix/pull/14140)

## Download

To download Apache APISIX 3.20.0, visit the [official release page](https://apisix.apache.org/downloads/).

## Feedback

If you have questions or encounter problems, open an issue in the [Apache APISIX repository](https://github.com/apache/apisix/issues).
