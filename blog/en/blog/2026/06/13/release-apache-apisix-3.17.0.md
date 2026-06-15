---
title: "Release Apache APISIX 3.17.0"
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
description: The Apache APISIX 3.17.0 version is released on June 13, 2026. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.17.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This release introduces new AI Gateway capabilities, authentication and access control plugins, GraphQL traffic management, data protection features, and platform improvements for validation, secret handling, and stream proxy configuration.

This release also includes compatibility-impacting changes in authentication, TLS verification, caching, request validation, and standalone configuration parsing behavior. Many of these changes are security or validation hardening updates that only affect specific configurations. Please review the changes that apply to your deployment and plan your upgrade accordingly.

## Breaking Changes

### Stricter authentication defaults

This release tightens several authentication plugins to enforce safer defaults.

The `jwt-auth` plugin now treats configured `claims_to_verify` values as required claims, and an empty `claims_to_verify: []` no longer disables the default `exp` and `nbf` checks. It also enforces algorithm matching before signature verification. The `key-auth` plugin now strips invalid credentials from both headers and query arguments before falling back to an anonymous consumer when `hide_credentials` is enabled. The `hmac-auth` plugin now defaults `signed_headers` to `["date"]`, so clients must sign the `Date` header unless the configuration explicitly overrides this behavior.

For more information, see [PR #13468](https://github.com/apache/apisix/pull/13468), [PR #13182](https://github.com/apache/apisix/pull/13182), and [PR #13388](https://github.com/apache/apisix/pull/13388).

### Admin schema validation now requires authentication

The schema validation endpoint now requires an Admin API key. Clients that previously called the endpoint without authentication must include valid Admin API credentials after upgrading.

For more information, see [PR #13328](https://github.com/apache/apisix/pull/13328).

### TLS verification defaults are stricter

The `tencent-cloud-cls` plugin now supports `ssl_verify`, which defaults to `true`. In addition, TLS verification hardening changes make `ai-rag` default `ssl_verify` to `true`.

Deployments that connect to services with self-signed or otherwise untrusted certificates should configure trusted certificates or explicitly review their TLS verification settings before upgrading.

For more information, see [PR #13194](https://github.com/apache/apisix/pull/13194) and [PR #13203](https://github.com/apache/apisix/pull/13203).

### `cas-auth` requires the new `cookie.secret` configuration

The `cas-auth` plugin now uses a nested `cookie` configuration and requires `cookie.secret`. It also signs the login redirect cookie and tightens cookie handling.

Existing `cas-auth` configurations must add the new required `cookie.secret` value before upgrading to 3.17.0. Use the same secret on every APISIX node, and set `cookie.secure` to `false` for HTTP-only deployments.

For more information, see [PR #13331](https://github.com/apache/apisix/pull/13331).

### `jwe-decrypt` no longer provides a token generation endpoint

This release removes the server-side `/apisix/plugin/jwe/encrypt` endpoint from the `jwe-decrypt` plugin. APISIX now only decrypts JWE tokens, and token generation must be handled outside APISIX.

For more information, see [PR #13464](https://github.com/apache/apisix/pull/13464).

### `proxy-cache` uses safer cache defaults

The `proxy-cache` plugin now isolates cache entries by authenticated consumer by default, avoids caching `Set-Cookie` responses in memory unless explicitly enabled, and always honors upstream `Cache-Control: private`, `no-store`, and `no-cache` response directives in memory mode.

Deployments that previously relied on shared authenticated caches or permissive cookie caching may see different cache hit behavior after upgrading.

For more information, see [PR #13350](https://github.com/apache/apisix/pull/13350).

### Stricter `batch-requests` validation

The `batch-requests` plugin now requires each pipeline item to include `path`, rejects unknown fields, requires `timeout` to be at least `1`, and limits each request to `max_pipeline_items` pipeline items, which defaults to `1000` and can be configured in plugin metadata.

Requests that previously relied on tolerated invalid payloads or oversized pipelines must be updated.

For more information, see [PR #13492](https://github.com/apache/apisix/pull/13492).

### Standalone env var parsing changed

Standalone mode now resolves environment variables before YAML parsing. As a result, unquoted `${VAR}` placeholders can now be interpreted as numbers or booleans instead of always being strings.

Review standalone configuration files that rely on environment-variable substitution and quote values that must remain strings.

For more information, see [PR #13078](https://github.com/apache/apisix/pull/13078).

## New Features

### Expanded AI Gateway support

This release adds broad AI Gateway improvements, including Amazon Bedrock provider support, Bedrock ConverseStream streaming, native Anthropic Messages API protocol support, OpenAI Responses API support, and passthrough handling for unrecognized AI API formats.

AI proxying also gains provider-aware `max_tokens` overrides, per-protocol request body overrides, safeguards such as `max_stream_duration_ms` and `max_response_bytes`, upstream read cancellation on client disconnect, and upstream NGINX variable population for cosocket transport.

For more information, see [PR #13249](https://github.com/apache/apisix/pull/13249), [PR #13307](https://github.com/apache/apisix/pull/13307), [PR #13181](https://github.com/apache/apisix/pull/13181), [PR #13186](https://github.com/apache/apisix/pull/13186), [PR #13320](https://github.com/apache/apisix/pull/13320), [PR #13251](https://github.com/apache/apisix/pull/13251), [PR #13269](https://github.com/apache/apisix/pull/13269), [PR #13250](https://github.com/apache/apisix/pull/13250), [PR #13254](https://github.com/apache/apisix/pull/13254), and [PR #13317](https://github.com/apache/apisix/pull/13317).

### Core platform enhancements

APISIX now supports batch TCP/UDP port ranges in `stream_proxy` configuration and makes `/configs/validate` available in all deployment modes. This release also adds `core.response.get_response_source()` for classifying response origins and a `rate_limiting_info` variable for rate limit observability.

Secret handling is also improved with nested `encrypt_fields` support and centralized secret reference resolution across all plugins.

For more information, see [PR #13153](https://github.com/apache/apisix/pull/13153), [PR #13220](https://github.com/apache/apisix/pull/13220), [PR #13224](https://github.com/apache/apisix/pull/13224), [PR #13155](https://github.com/apache/apisix/pull/13155), [PR #13192](https://github.com/apache/apisix/pull/13192), and [PR #13312](https://github.com/apache/apisix/pull/13312).

### New authentication and access control plugins

This release adds several new plugins for browser-based authentication and policy enforcement.

The new `saml-auth` plugin allows APISIX to act as a SAML 2.0 service provider. The new `dingtalk-auth` and `feishu-auth` plugins add DingTalk and Feishu/Lark OAuth authentication flows. The new `acl` plugin enables label-based access control using consumer labels or claims from authentication plugins.

For more information, see [PR #13346](https://github.com/apache/apisix/pull/13346), [PR #13381](https://github.com/apache/apisix/pull/13381), [PR #13382](https://github.com/apache/apisix/pull/13382), and [PR #13349](https://github.com/apache/apisix/pull/13349).

### New GraphQL traffic management plugins

APISIX 3.17.0 introduces two new plugins for GraphQL workloads.

The `graphql-limit-count` plugin rate limits requests based on GraphQL query depth, while the `graphql-proxy-cache` plugin caches GraphQL query responses for GET and POST requests using disk or memory cache strategies. It isolates cache entries by authenticated identity by default, automatically bypasses cache for mutations, and exposes a PURGE API for invalidation.

For more information, see [PR #13372](https://github.com/apache/apisix/pull/13372) and [PR #13435](https://github.com/apache/apisix/pull/13435).

### New data protection and response customization plugins

This release adds the `data-mask`, `error-page`, `proxy-buffering`, `oas-validator`, `traffic-label`, and `exit-transformer` plugins.

The `data-mask` plugin masks or redacts sensitive query parameters, headers, and JSON or URL-encoded request bodies before they are written to access logs or logger plugins. The `error-page` plugin customizes APISIX-generated error responses such as `404`, `500`, `502`, and `503` through plugin metadata; upstream-generated responses are not modified. The `proxy-buffering` plugin allows proxy buffering to be disabled per route for SSE and other streaming responses. The `oas-validator`, `traffic-label`, and `exit-transformer` plugins add OpenAPI request validation, traffic labeling, and response transformation capabilities.

For more information, see [PR #13347](https://github.com/apache/apisix/pull/13347), [PR #13380](https://github.com/apache/apisix/pull/13380), [PR #13446](https://github.com/apache/apisix/pull/13446), [PR #13344](https://github.com/apache/apisix/pull/13344), [PR #13342](https://github.com/apache/apisix/pull/13342), and [PR #13343](https://github.com/apache/apisix/pull/13343).

### Better fallback control for `ai-proxy-multi`

The `ai-proxy-multi` plugin now supports `max_retries` and `retry_on_failure_within_ms` to give users finer control over fallback behavior across multiple AI providers.

For more information, see [PR #13495](https://github.com/apache/apisix/pull/13495).

### Additional plugin enhancements

The `request-id` plugin now supports UUID v7 generation. The `ai-rate-limiting` plugin adds an expression-based limit strategy, and `elasticsearch-logger` supports dynamic index names with time and variable resolution.

For more information, see [PR #13152](https://github.com/apache/apisix/pull/13152), [PR #13191](https://github.com/apache/apisix/pull/13191), and [PR #13334](https://github.com/apache/apisix/pull/13334).

## Bug Fixes

### `proxy-cache` correctness and cache safety improvements

This release improves correctness in the `proxy-cache` plugin by honoring upstream `Vary` headers in memory mode, avoiding `Vary: *` caching, and making `PURGE` work correctly with expired and variant cache entries. It also prevents memory cache from storing responses with `Set-Cookie` headers added by upstreams or other plugins unless cookie caching is explicitly enabled.

For more information, see [PR #13376](https://github.com/apache/apisix/pull/13376).

### AI proxy reliability improvements

This release fixes multiple reliability issues across AI proxying workflows.

The `ai-proxy-multi` plugin now handles domain-based upstreams more reliably for multi-IP endpoints, preserving the original host information for `Host`, SNI, and AWS SigV4 signing. AI request JSON encoding is now deterministic to improve prompt cache hit rates with compatible providers. AI streaming also supports `streaming_flush_interval_ms` for latency control and better disconnect handling, and upstream AI timeouts now return `504 Gateway Timeout` instead of `500`.

For more information, see [PR #13441](https://github.com/apache/apisix/pull/13441), [PR #13461](https://github.com/apache/apisix/pull/13461), and [PR #13481](https://github.com/apache/apisix/pull/13481).

### Rate limiting fixes for Redis-backed workflows

This release fixes a Redis race in `limit-req` by making leaky-bucket state updates atomic. It also tightens dynamic `conn` and `burst` validation in `limit-conn`: resolved values must be safe integers, `conn` must be positive, and `burst` may be `0` but cannot be negative.

For more information, see [PR #13467](https://github.com/apache/apisix/pull/13467).

### Authentication and session isolation fixes

This release fixes several authentication and session handling issues.

`authz-keycloak` no longer mutates shared permissions while appending request method scopes. `authz-casdoor` now scopes sessions by `client_id`. The `cas-auth` plugin hardens callback and session handling to prevent invalid callback sessions and cross-route session reuse, supports absolute `cas_callback_uri` values, and returns `400` for malformed CAS single logout callbacks instead of failing with `500` or accepting empty tickets.

For more information, see [PR #13410](https://github.com/apache/apisix/pull/13410), [PR #13387](https://github.com/apache/apisix/pull/13387), and [PR #13427](https://github.com/apache/apisix/pull/13427).

### Better secret handling and token validation

This release expands at-rest encryption coverage for sensitive plugin fields when field encryption is enabled, including session secrets, Redis passwords, logger credentials, serverless tokens, and AI-provider credentials. It also prevents raw Google Cloud credential file contents from appearing in parse errors, and ensures `jwe-decrypt` rejects undecryptable tokens instead of forwarding them upstream.

For more information, see [PR #13389](https://github.com/apache/apisix/pull/13389), [PR #13409](https://github.com/apache/apisix/pull/13409), and [PR #13404](https://github.com/apache/apisix/pull/13404).

### Fixes for OPA, gRPC mirroring, and response-body logging

The `opa` plugin now clears headers that are absent from OPA responses when `send_headers_upstream` is enabled. The `proxy-mirror` plugin now preserves the original gRPC method path when mirroring gRPC and `grpc-web` requests. In addition, response-body logging works correctly when multiple loggers are enabled across global rules and routes.

For more information, see [PR #13433](https://github.com/apache/apisix/pull/13433), [PR #13499](https://github.com/apache/apisix/pull/13499), and [PR #13450](https://github.com/apache/apisix/pull/13450).

## Other Updates

- Improve request body processing performance by caching parsed JSON, form, and multipart bodies within a request (PR [#13377](https://github.com/apache/apisix/pull/13377))
- Improve AI streaming performance and behavior with faster SSE decoding, better disconnect handling, and reuse of the original request body when no rewrite is needed (PR [#13391](https://github.com/apache/apisix/pull/13391) and PR [#13406](https://github.com/apache/apisix/pull/13406))
- Add `max_req_body_size` safeguards to `hmac-auth`, `forward-auth`, `ai-proxy`, and `ai-proxy-multi` to reject oversized request bodies with `413` (PR [#13478](https://github.com/apache/apisix/pull/13478) and PR [#13466](https://github.com/apache/apisix/pull/13466))
- Improve `openid-connect` compatibility by supporting newer `lua-resty-session` configuration options, making `client_secret` optional for local JWT verification, PKCE, and `private_key_jwt` modes, and applying `claim_schema` validation to bearer-token JWT or introspection responses (PR [#13178](https://github.com/apache/apisix/pull/13178) and PR [#13472](https://github.com/apache/apisix/pull/13472))
- Improve concurrency safety by replacing shared mutable tables with per-request allocation in several request-processing paths (PR [#13369](https://github.com/apache/apisix/pull/13369))
- Ensure stream routes that reference services preserve the correct service-level plugin context after updates (PR [#13402](https://github.com/apache/apisix/pull/13402))
- Fix HTTP/2 and HTTP/3 request body handling when requests do not include `Content-Length` (PR [#13428](https://github.com/apache/apisix/pull/13428))
- Optimize Redis-backed `limit-count` by using `EVALSHA` with `NOSCRIPT` fallback (PR [#13363](https://github.com/apache/apisix/pull/13363))
- Harden Redis xRPC request parsing by rejecting malformed RESP lengths and bounding command preallocation (PR [#13483](https://github.com/apache/apisix/pull/13483))
- Harden malformed-input handling in `cors`, `multi-auth`, and `body-transformer`, including missing `Origin` headers, auth plugins that return a status without an error message, malformed multipart bodies, and request fields that shadow reserved template helpers. DingTalk authentication now also clears client-supplied `X-Userinfo` before authentication (PR [#13469](https://github.com/apache/apisix/pull/13469) and PR [#13491](https://github.com/apache/apisix/pull/13491))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/release/3.17/CHANGELOG.md#3170).
