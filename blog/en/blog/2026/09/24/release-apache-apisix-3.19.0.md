---
title: "Release Apache APISIX 3.19.0"
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
description: Apache APISIX 3.19.0 is planned for release on Sep 24, 2026. This release adds native WebSocket processing, TLS stream passthrough, OpenAPI-to-MCP conversion, upstream slow start, GraphQL cost-based rate limiting, and important upgrade considerations.
tags: [Community]
---

We are glad to present Apache APISIX 3.19.0 with new WebSocket and stream-proxy capabilities, safer authentication and TLS behavior, richer traffic controls, and reliability improvements across the gateway.

<!--truncate-->

This release introduces native WebSocket frame processing, TLS passthrough for stream routes, an `openapi-to-mcp` plugin, upstream slow start, GraphQL query-cost rate limiting, stronger standalone configuration updates, and expanded SAML validation.

The release also contains backward-incompatible changes. Review the following migration notes before upgrading.

## Breaking Changes

The following changes affect existing configuration, authentication flows, client input, or observability contracts. Use the upgrade plan under each item to identify affected deployments and prepare the necessary changes before rollout.

### HTTPS and gRPCS upstream certificate verification is now effective

`upstream.tls.verify` now controls certificate verification for `https` and `grpcs` upstreams, rather than being read only by the `kafka` scheme. Existing HTTPS or gRPCS upstreams that already set `tls.verify: true` will therefore start verifying the certificate chain and hostname. An untrusted certificate or hostname mismatch causes the TLS connection to fail, typically with a 502 response.

The new `tls.ca_certs` array can provide trust anchors for one upstream. When it is absent, verification uses `ssl_trusted_certificate` from `config.yaml`. Leaving `tls.verify` unset follows the NGINX verification setting, while explicitly setting it to `false` disables verification for that upstream.

APISIX 3.19.0 pins APISIX Runtime 1.3.18, which provides the required upstream verification APIs. A custom or older Runtime without `set_ssl_verify` or `set_ssl_trusted_store` returns 503 when the corresponding option is used.

**Upgrade plan:** If an `https` or `grpcs` upstream already sets `tls.verify: true`, first identify the hostname APISIX verifies: the incoming Host for the default `pass_host: pass`, `upstream_host` for `pass_host: rewrite`, or the selected node host for `pass_host: node`. Validate the certificate chain and subject alternative name against that hostname. Add the required PEM certificates to `upstream.tls.ca_certs` or the shared `ssl_trusted_certificate`, and confirm that custom Runtime builds provide the two upstream TLS APIs. Test one valid connection and the expected 502 for an untrusted or mismatched certificate. Set `tls.verify: false` only when preserving the previous non-verifying behavior is an intentional, risk-accepted compatibility measure.

For more information, see [PR #13863](https://github.com/apache/apisix/pull/13863).

### OpenID Connect introspection enforces the configured issuer allowlist

When `openid-connect` uses remote introspection and `claim_validator.issuer.valid_issuers` is configured, a successful introspection response must now contain a string `iss` claim matching the allowlist. A missing, non-string, or unlisted issuer is rejected with 401 and an `invalid_token` challenge. Previously, this allowlist was not applied to the introspection response.

**Upgrade plan:** If an introspection-based route configures `claim_validator.issuer.valid_issuers`, confirm that the authorization server returns `iss` and that its exact value is listed. Test a valid token and a token from another issuer before rollout. Fixing the introspection response or allowlist is preferred. Omit `valid_issuers` only after a security review of an introspection-only configuration; the same field also constrains public-key and JWKS validation, where omission falls back to the issuer from discovery. Routes that do not configure the allowlist are unchanged.

For more information, see [PR #13916](https://github.com/apache/apisix/pull/13916).

### Batch response aggregation has default size limits

The `batch-requests` plugin now limits each subresponse body to 1 MiB and the combined response bodies of one pipeline to 10 MiB. A pipeline that exceeds either limit returns 502 instead of returning the full aggregate. The limits apply whether the upstream sends `Content-Length`, chunked data, or a close-delimited response.

The global plugin metadata fields `max_response_body_size` and `max_response_body_size_total` control the per-item and aggregate limits in bytes. Both must be positive integers. For example:

```shell
curl "http://127.0.0.1:9180/apisix/admin/plugin_metadata/batch-requests" \
  -H "X-API-KEY: <admin-key>" \
  -X PUT \
  -d '{
    "max_response_body_size": 4194304,
    "max_response_body_size_total": 41943040
  }'
```

**Upgrade plan:** If clients use `batch-requests`, measure the largest expected subresponse and aggregate. Configure both metadata fields above those bounds before upgrading when the defaults are insufficient, and test a request at and just above each limit. The metadata applies to every batch request handled by the APISIX instance. There is no unlimited setting; choose explicit values that also fit each worker's memory budget.

For more information, see [PR #13906](https://github.com/apache/apisix/pull/13906).

### Basic authentication rejects empty Consumer passwords

The `basic-auth` Consumer and credential schema now requires `password` to contain at least one character. Admin API writes with an empty literal password return 400, and a stored literal empty value fails schema validation when configurations are loaded. An environment or Secret reference can pass schema validation before resolution, but authentication returns 401 if the resolved value is empty instead of accepting `username:`.

**Upgrade plan:** If you use `basic-auth`, audit Consumer and credential passwords, including referenced environment variables and Secrets, and replace every empty value before upgrading. Verify that each affected identity can authenticate with its new non-empty password. There is no compatibility option that restores empty-password authentication.

For more information, see [PR #13884](https://github.com/apache/apisix/pull/13884).

### `ai-proxy-multi` instance names must be unique

Each `instances[].name` now has to be unique within an `ai-proxy-multi` configuration. APISIX uses this name as the identity of the balancer node, health checker, `ai-rate-limiting` target, and `semantic_opts.fallback`; duplicate names previously collapsed distinct instances into ambiguous runtime state. A duplicate configuration is rejected on write and is not loaded from an existing configuration source.

**Upgrade plan:** If you use `ai-proxy-multi`, inspect every Route, Service, and Plugin Config that carries the plugin, then assign a distinct name to each entry in `instances`. Update `semantic_opts.fallback` and matching `ai-rate-limiting.instances[].name` references in the same configuration change. Re-submit the parent resource through the Admin API to validate it, send representative requests to each target, and, when instance-level `checks` are configured, verify the corresponding Control API health checkers. There is no compatibility option for duplicate names.

For more information, see [PR #13851](https://github.com/apache/apisix/pull/13851).

### `workflow` rejects malformed expressions and action lists

The `workflow` plugin now rejects a `case` expression that cannot be compiled. Such an expression could previously pass validation and then match every request. Each rule's `actions` must also contain exactly one two-element `[name, conf]` pair. Configurations with several actions, an absent action configuration, or extra tuple elements are rejected rather than silently executing only the first action.

Each rule must have this shape:

```json
{
  "plugins": {
    "workflow": {
      "rules": [
        {
          "case": [["uri", "==", "/hello"]],
          "actions": [["return", {"code": 403}]]
        }
      ]
    }
  }
}
```

**Upgrade plan:** If you use `workflow`, validate every `case` expression and reshape each rule to contain exactly one `[name, conf]` action. There is no equivalent multi-action workflow: APISIX stops at the first matching rule, so duplicating a condition across rules does not execute actions sequentially. Keep one workflow action and move additional behavior into normal plugin composition or a custom combined action. Test one matching and one non-matching request for every corrected rule. There is no legacy mode for malformed expressions or multiple actions.

For more information, see [PR #13862](https://github.com/apache/apisix/pull/13862).

### WebSocket sessions use a new Prometheus `request_type` value

Successful WebSocket upgrades on the existing NGINX proxy path, typically Routes using `enable_websocket`, are now labeled `request_type="websocket"` instead of `request_type="traditional_http"` in `apisix_http_status`, `apisix_http_latency`, and `apisix_bandwidth`. This keeps long-lived WebSocket sessions out of conventional HTTP latency analysis, but changes existing metric series and selectors. The new `ws` and `wss` content path assigns the same label when it completes the downstream handshake.

**Upgrade plan:** If dashboards, alerts, or recording rules filter these metric families by `request_type="traditional_http"`, decide whether WebSocket traffic should remain included. Before a mixed-version rollout, add `request_type=~"traditional_http|websocket"` to preserve combined coverage, or create separate WebSocket panels and alerts. Validate all three metric families with a successful and a refused upgrade on a representative `enable_websocket` Route; if you adopt the new `ws` or `wss` scheme, verify that path separately. There is no setting that restores the old label value.

For more information, see [PR #13909](https://github.com/apache/apisix/pull/13909) and [PR #13915](https://github.com/apache/apisix/pull/13915).

### Empty health-check collections use JSON arrays

The Control API now consistently returns `[]` for an empty top-level `/v1/healthcheck` result and for an empty `nodes` collection. Previous releases encoded these empty collections as `{}`, even though non-empty values and the documented contract use arrays. Strict clients that deserialize the empty form as an object can fail when its JSON type changes.

**Upgrade plan:** If a client consumes `/v1/healthcheck` or `/v1/healthcheck/{src_type}/{src_id}`, update its schema to require arrays for the top-level collection and `nodes`, including when empty. Test a configured checker before its first upstream request and an installation with no checkers. There is no setting that restores the object-shaped empty value.

For more information, see [PR #13891](https://github.com/apache/apisix/pull/13891).

### Verified Redis TLS connections now check the server name

For the single-node `policy: redis` path, Redis-backed plugins now send TLS SNI and, when `redis_ssl_verify` is `true`, verify the certificate against `redis_server_name` or `redis_host`. A deployment whose `redis_host` is a DNS alias not covered by the certificate can therefore start failing Redis operations with a certificate-host mismatch. The change applies to the shared single-node Redis configuration used by `ai-cache`, `ai-rate-limiting`, `graphql-limit-count`, `limit-count`, `limit-conn`, and `limit-req`; it does not change the Redis Cluster or Sentinel paths.

The new `redis_server_name` field lets the connection address remain an IP or alias while naming the certificate identity and SNI explicitly. APISIX does not send SNI or perform a hostname check when the configured `redis_server_name` or `redis_host` value itself is an IP literal.

For example, a `limit-count` configuration can connect by IP while verifying the certificate for `redis.example.com`:

```json
{
  "plugins": {
    "limit-count": {
      "count": 100,
      "time_window": 60,
      "key": "remote_addr",
      "policy": "redis",
      "redis_host": "10.0.0.20",
      "redis_port": 6379,
      "redis_ssl": true,
      "redis_ssl_verify": true,
      "redis_server_name": "redis.example.com"
    }
  }
}
```

**Upgrade plan:** If a plugin uses `redis_ssl: true` and `redis_ssl_verify: true`, compare its certificate SANs with `redis_host`. Set `redis_server_name` to the certificate's DNS name when they differ, or replace the certificate so it covers the configured host. Test a new TLS connection rather than relying on an existing keepalive connection. Setting `redis_ssl_verify: false` preserves a non-verifying connection but should be used only as a temporary, explicitly accepted fallback.

For more information, see [PR #13938](https://github.com/apache/apisix/pull/13938).

### Feishu and DingTalk browser login callbacks require `state`

`feishu-auth` and `dingtalk-auth` now bind browser authorization codes to the session that started the login. APISIX appends a random `state` to `redirect_uri`, stores it in the encrypted session, and requires the same value beside the query-string authorization code. A callback that omits or changes `state` returns 401 `Invalid state`.

The non-browser header paths, `X-Feishu-Code` and `X-DingTalk-Code` by default, remain exempt.

**Upgrade plan:** If your application serves either plugin's `redirect_uri`, update it to forward the received `state` to the identity provider and preserve the provider's returned `state` on the callback to APISIX. Test the complete browser flow with cookies enabled, plus missing and mismatched state failures. Header-based integrations require no change, and there is no option to disable state validation for query-string callbacks.

For more information, see [PR #13806](https://github.com/apache/apisix/pull/13806).

### `jwe-decrypt` validates declared algorithms

`jwe-decrypt` now interoperates with RFC 7516 tokens whose protected header is authenticated as AES-GCM additional authenticated data (AAD). It still accepts APISIX's legacy no-AAD token format, including a legacy header that omits `alg` or `enc`. However, a token that declares an `alg` other than `dir` or an `enc` other than `A256GCM` is now rejected with 400 instead of being decrypted as if those values were supported.

New tokens should use this protected header:

```json
{"alg": "dir", "enc": "A256GCM", "kid": "consumer-key"}
```

**Upgrade plan:** If you generate tokens for `jwe-decrypt`, inspect the protected header and ensure it declares `{"alg":"dir","enc":"A256GCM","kid":"..."}`. Prefer a standard JWE library that authenticates the protected header. Regenerate tokens that carry misleading algorithm values and test a tampered header as well as a valid token. There is no option to accept an explicitly unsupported algorithm; older no-AAD tokens remain a compatibility path while they are migrated.

For more information, see [PR #13889](https://github.com/apache/apisix/pull/13889).

## New Features

APISIX 3.19.0 expands stream proxying, WebSocket processing, traffic management, MCP integration, authentication, and operational visibility. The following sections explain the behavior and key rollout choices for the major additions.

### Pass TLS through the stream proxy and match several SNIs

Stream listeners can now forward an encrypted TLS session to the upstream without terminating it in APISIX. A listener with `tls_passthrough: true` reads the SNI from the preread ClientHello, selects a stream route, and forwards the original bytes so the upstream performs the handshake. A mixed listener can set both `tls: true` and `tls_passthrough: true`, then use each stream route's `tls_passthrough` boolean to choose termination or passthrough.

```yaml
apisix:
  proxy_mode: http&stream
  stream_proxy:
    tcp:
      - addr: 9100
        tls: true
        tls_passthrough: true
```

The new `snis` array lets one stream route match several exact or wildcard server names and is mutually exclusive with the existing `sni` field. On a passthrough path, gateway mTLS and payload-inspecting stream plugins cannot inspect the encrypted session, and an upstream with `scheme: tls` is rejected because it would attempt a second handshake. Mixed listeners also cannot use `proxy_protocol_to_upstream` and count each client connection twice in `apisix_stream_metrics_zone` because of their internal hop.

For more information, see [PR #13912](https://github.com/apache/apisix/pull/13912) and [PR #13911](https://github.com/apache/apisix/pull/13911).

### Process WebSocket frames in APISIX

The new `ws` and `wss` upstream schemes let APISIX parse and proxy WebSocket frames itself. Custom plugins can run `ws_handshake`, `ws_client_frame`, `ws_upstream_frame`, and `ws_close` phases to inspect or rewrite messages in either direction. This mode preserves the normal `rewrite`, `access`, `before_proxy`, and `log` phases, but does not run `header_filter`, `body_filter`, or `delayed_body_filter` for the upgraded session.

The final proxy path follows the effective scheme selected at runtime, including an inline `ws` or `wss` upstream selected by `traffic-split`. It sends the same Host that the normal proxy path would send, uses that host without its port as the TLS SNI, returns only the subprotocol selected by the upstream, and can retry another node after a non-101 handshake response before committing the downstream 101. Connection failure logs omit the request URI so query-string credentials are not exposed.

This is distinct from `enable_websocket` on an `http` or `https` upstream, which continues to let NGINX relay the upgraded connection as opaque bytes. Choose `ws` or `wss` only when frame-level plugin logic is required. The new `websocket-proxy` plugin configures the largest accepted frame from each side; the enhanced proxy defaults to 65,535 bytes per frame unless `client_max_payload_len` or `upstream_max_payload_len` raises the applicable limit.

```json
{
  "plugins": {
    "websocket-proxy": {
      "client_max_payload_len": 1048576,
      "upstream_max_payload_len": 1048576
    }
  },
  "upstream": {
    "scheme": "wss",
    "pass_host": "rewrite",
    "upstream_host": "ws.example.com",
    "tls": {"verify": true},
    "type": "roundrobin",
    "nodes": {"ws.example.com:443": 1}
  }
}
```

For `wss`, `tls.verify` and upstream client certificates are supported, but per-upstream `tls.ca_certs` is rejected because the WebSocket client cannot apply it. Configure the required trust anchors through the shared `ssl_trusted_certificate` instead.

For more information, see [PR #13939](https://github.com/apache/apisix/pull/13939), [PR #13972](https://github.com/apache/apisix/pull/13972), and [PR #13977](https://github.com/apache/apisix/pull/13977).

### Ramp newly observed upstream nodes with slow start

Round-robin upstreams can now use `warm_up_conf` to introduce newly observed nodes at a reduced effective weight and ramp them to their configured weight. This protects cold application instances from receiving their full traffic share before caches, connection pools, and runtimes are ready.

Start with the node that should be treated as mature:

```json
{
  "type": "roundrobin",
  "nodes": {"10.0.0.10:8080": 100},
  "warm_up_conf": {
    "slow_start_time_seconds": 300,
    "min_weight_percent": 10,
    "interval": 5,
    "aggression": 1
  }
}
```

In a later update, add the new node while retaining `warm_up_conf`:

```json
{
  "type": "roundrobin",
  "nodes": {
    "10.0.0.10:8080": 100,
    "10.0.0.11:8080": 100
  },
  "warm_up_conf": {
    "slow_start_time_seconds": 300,
    "min_weight_percent": 10,
    "interval": 5,
    "aggression": 1
  }
}
```

Each APISIX instance tracks ramps locally. The initially observed node set is considered mature, while `10.0.0.11` starts at 10% of its configured weight and ramps up over five minutes. A node excluded by health checking starts its ramp when it becomes eligible. `startup_grace_period_seconds` can treat nodes first observed soon after APISIX starts as mature, preventing a whole node set from ramping again after a restart. Slow start supports only single-priority `roundrobin` HTTP upstreams; it is rejected inside `traffic-split` and ignored for stream routes.

For more information, see [PR #13941](https://github.com/apache/apisix/pull/13941).

### Turn an OpenAPI document into an MCP server

The new `openapi-to-mcp` plugin exposes operations from an OpenAPI document as Model Context Protocol tools without a separate MCP process. It supports stateless Streamable HTTP and session-based HTTP+SSE, generates tool schemas from OpenAPI 3.x or supported Swagger 2.0 constructs, validates tool arguments, and calls the configured API on behalf of the MCP client.

```json
{
  "uri": "/mcp",
  "plugins": {
    "openapi-to-mcp": {
      "transport": "streamable_http",
      "openapi_url": "https://api.example.com/openapi.json",
      "base_url": "https://api.example.com",
      "headers": {
        "Authorization": "Bearer ${http_x_api_token}"
      }
    }
  }
}
```

`base_url` and header values can use APISIX variables. For SSE, resolved values are frozen for the session so later message requests use the same upstream context. SSE sessions live in shared memory on one APISIX instance, so a multi-instance deployment needs session affinity; Streamable HTTP is stateless. OpenAPI documents are cached for one hour, internal and HTTP(S) references are resolved, schema defaults are applied before validation, and a non-OpenAPI document is reported as an error rather than an empty tool list.

For more information, see [PR #13942](https://github.com/apache/apisix/pull/13942) and [PR #13956](https://github.com/apache/apisix/pull/13956).

### Rate limit GraphQL by query cost

`graphql-limit-count` now supports `complexity` and `node_quantifier` cost strategies in addition to the existing `depth` default. Operators can attach `graphql_cost_decorations` to a Service to weight fields and pagination arguments, introspect the upstream schema, scale the resulting score, and reject a query above `max_cost` before it reaches the backend.

For example, configure cost-based limiting on a Service:

```json
{
  "plugins": {
    "graphql-limit-count": {
      "count": 10000,
      "time_window": 60,
      "key": "remote_addr",
      "rejected_code": 429,
      "cost_strategy": "node_quantifier",
      "max_cost": 5000,
      "resolve_variables": true,
      "show_limit_quota_header": true
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {"127.0.0.1:1980": 1}
  }
}
```

Then create a decoration at `/apisix/admin/services/{service_id}/graphql_cost_decorations/products`:

```json
{
  "field_path": "Query.products",
  "mul_arguments": ["first"],
  "add_value": 1
}
```

This makes `products(first: 1000)` cost more than `products(first: 10)`, even though both queries have the same depth. `resolve_variables` defaults to `true`, so values passed through GraphQL variables and schema defaults are included. The computed score is returned in `X-Graphql-Query-Cost` when quota headers are enabled. APISIX charges the rate-limit quota before enforcing `max_cost`, so a query rejected with 403 for excessive cost still consumes quota.

The original `depth` strategy remains the default and preserves existing quota behavior. The two new strategies need a Service to own their decorations. Without decorations, `complexity` charges by node count, while `node_quantifier` falls back to the minimum charge of 1; schema introspection is skipped in both cases.

For more information, see [PR #13840](https://github.com/apache/apisix/pull/13840).

### Confirm standalone configuration application across workers

API-driven standalone mode now accepts `wait=<milliseconds>` on `PUT /apisix/admin/configs`. Without it, APISIX returns 202 once the configuration is accepted. With a value up to 60,000, the request waits until every HTTP and enabled stream worker reports the target digest for every tracked resource type, returning 200 when all workers applied it or 202 when the deadline expires.

```shell
curl "http://127.0.0.1:9180/apisix/admin/configs?wait=3000" \
  -H "X-API-KEY: <admin-key>" \
  -H "Content-Type: application/json" \
  -H "X-Digest: release-3.19-config-1" \
  -X PUT \
  -d '{}'
```

The wait does not compute a separate digest for every resource object. It gives configuration controllers a bounded readiness signal without turning a timeout into a failed update: 202 still means the update was accepted but not confirmed everywhere. A request skipped with 204 because its `X-Digest` already matches is unchanged.

For more information, see [PR #13904](https://github.com/apache/apisix/pull/13904).

### Inspect plugin-owned health checks

The Control API now reports active health checkers created by plugins as well as upstreams. `ai-proxy-multi` uses this capability to expose one checker per LLM instance that configures `checks`, including the plugin name and instance metadata. The new `/v1/healthcheck/{src_type}/{src_id}/checkers` endpoint returns every checker owned by one resource and returns an empty array when the resource has none.

For more information, see [PR #13899](https://github.com/apache/apisix/pull/13899).

### Strengthen SAML response validation

`saml-auth` now exposes the validation controls provided by `lua-resty-saml` 0.2.6: accepted IdP issuers, an externally visible ACS URL, accepted SP audiences, clock skew, and optional per-node assertion replay protection. Omitting the new fields preserves the previous plugin configuration behavior.

Add the applicable controls to an existing `saml-auth` configuration:

```json
{
  "idp_issuers": ["https://idp.example.com/realms/example"],
  "sp_acs_url": "https://sp.example.com/login/callback",
  "sp_audiences": ["https://sp.example.com"],
  "clock_skew": 60,
  "replay_dict": "plugin-saml-auth-replay",
  "replay_ttl": 600
}
```

Set `sp_acs_url` when APISIX sees a different scheme or host from the browser, such as behind a TLS-terminating load balancer. `replay_dict` provides best-effort protection against accepting the same assertion twice on one APISIX node. Size and monitor the shared dictionary for the login rate and assertion lifetime: if it is full, the assertion is accepted without being recorded and APISIX logs an error. Replay records are not shared between APISIX nodes.

For more information, see [PR #13964](https://github.com/apache/apisix/pull/13964).

### Retry selected AI upstream responses

`ai-proxy-multi` can now retry another instance for explicitly selected 400–599 responses through `fallback_http_statuses`. This supports provider-specific conditions such as an expired credential or exhausted account while avoiding automatic retries for every client error.

Add the fields to an existing `ai-proxy-multi` configuration:

```json
{
  "fallback_http_statuses": [401, 402],
  "max_retries": 1,
  "retry_on_failure_within_ms": 1000
}
```

Existing `max_retries` and `retry_on_failure_within_ms` limits apply to these fallbacks. The `semantic` balancing algorithm does not participate in health-check or upstream-failure retry, so `fallback_http_statuses` does not add this retry behavior to semantic routing.

For more information, see [PR #13852](https://github.com/apache/apisix/pull/13852).

### Log responses to Chaitin WAF

`chaitin-waf` can now report response status, headers, and a bounded portion of the body to the SafeLine service after the client response completes:

```json
{
  "config": {
    "log_resp": true,
    "resp_body_size": 4,
    "extra_ignored_content_types": "text/csv,application/pdf"
  }
}
```

`config.log_resp` enables reporting, `resp_body_size` caps buffering in KiB, and `extra_ignored_content_types` excludes additional response types. Reporting is asynchronous and observational: it does not block or rewrite the response. Buffering consumes memory per in-flight applicable response, so increase `resp_body_size` only after accounting for concurrency and worker memory. Responses with ignored content types are not buffered for reporting.

For more information, see [PR #13763](https://github.com/apache/apisix/pull/13763).

## Bug Fixes

This release also corrects reliability, protocol, security, and observability defects. Fixes are grouped by affected subsystem so operators can focus on the paths used by their deployments.

### AI Gateway

- Streaming AI responses now return 502 when the upstream produces no output, while a read error after partial output no longer attempts an unsafe retry or overwrites the already committed status. Empty periodic flushes also no longer abort a buffered stream. See [PR #13870](https://github.com/apache/apisix/pull/13870), [PR #13876](https://github.com/apache/apisix/pull/13876), and [PR #13947](https://github.com/apache/apisix/pull/13947).
- Vertex AI embedding model names are URI-encoded as one path segment, and `ai-cache` includes the effective method, path, and query in passthrough-protocol cache keys so different endpoints cannot collide. See [PR #13872](https://github.com/apache/apisix/pull/13872) and [PR #13887](https://github.com/apache/apisix/pull/13887).
- `ai-aliyun-content-moderation` now emits a final moderation result even when a streaming provider omits usage data, while preserving incomplete or aborted stream semantics. See [PR #13922](https://github.com/apache/apisix/pull/13922).

### Authentication and request security

- `jwe-decrypt` now rejects malformed headers, Base64URL fields, IVs, tags, and invalid encoded secrets with 400 instead of allowing Lua errors to become 500 responses. See [PR #13844](https://github.com/apache/apisix/pull/13844).
- `basic-auth` splits credentials on the first colon, allowing RFC 7617 passwords that contain additional colons. See [PR #13836](https://github.com/apache/apisix/pull/13836).
- `data-mask` keeps masked request-header values visible to loggers even when a 400 response made the underlying NGINX header mutation ineffective. See [PR #13839](https://github.com/apache/apisix/pull/13839).
- `redirect` treats `X-Forwarded-Proto` case-insensitively, preventing an upstream proxy that sends `HTTPS` from causing an HTTP-to-HTTPS redirect loop. `ua-restriction` now denies a request when any repeated User-Agent header matches its deny list. See [PR #13865](https://github.com/apache/apisix/pull/13865) and [PR #13869](https://github.com/apache/apisix/pull/13869).

### Configuration, etcd, and health checks

- The etcd watcher now starts from the revision used for the startup snapshot and waits for etcd availability before config objects rely on it, preventing writes during startup from being missed or left waiting on a watcher that never connected. See [PR #13917](https://github.com/apache/apisix/pull/13917) and [PR #13934](https://github.com/apache/apisix/pull/13934).
- A transient failure to read the deployment role no longer blocks etcd writes more strictly than a confirmed data-plane role. See [PR #13885](https://github.com/apache/apisix/pull/13885).
- API-driven standalone mode now tolerates stream connections before the first configuration arrives, detects multiple pushes within one second by digest, rejects malformed declarative resource shapes without clearing the prior configuration, and avoids logging configuration bodies that may contain credentials or private keys. See [PR #13855](https://github.com/apache/apisix/pull/13855) and [PR #13886](https://github.com/apache/apisix/pull/13886).
- Unknown-plugin validation is consistent across control-plane writes and data-plane loading: writes are rejected before persistence, while a data plane can skip an unavailable plugin and logs a warning. See [PR #13928](https://github.com/apache/apisix/pull/13928).
- `traffic-label` now keeps compiled match expressions outside the serializable plugin configuration, preventing IP match rules from making the Route fail JSON encoding. See [PR #13901](https://github.com/apache/apisix/pull/13901).

### Proxying, integrations, and dependencies

- Servlet-style upstream URI handling now safely encodes the original path while preserving path-parameter boundaries. See [PR #13914](https://github.com/apache/apisix/pull/13914).
- `aws-lambda` sends `/` when `function_uri` has no path and records function error responses in the error log. See [PR #13908](https://github.com/apache/apisix/pull/13908).
- `ext-plugin-post-resp` now sets `upstream_addr` and measures upstream response time, including lazy body reads, so logger plugins receive meaningful upstream fields. See [PR #13940](https://github.com/apache/apisix/pull/13940).
- `api7-lua-resty-dns-client` is upgraded to 7.1.2, fixing CNAME resolution with EDNS(0) OPT records or answer records returned out of chain order. See [PR #13875](https://github.com/apache/apisix/pull/13875).
