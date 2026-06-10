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

This release introduces new authentication, access control, GraphQL, and data protection capabilities, along with reliability improvements for AI, caching, and rate limiting workflows.

This release also includes several breaking changes in authentication, caching, and request validation behavior. Please review the changes carefully and plan your upgrade accordingly.

## Breaking Changes

### Authentication validation and signing behavior are stricter by default

This release tightens several authentication plugins to enforce safer defaults.

The `jwt-auth` plugin now treats configured `claims_to_verify` values as required claims, and an empty `claims_to_verify: []` no longer disables the default `exp` and `nbf` checks. The `hmac-auth` plugin now defaults `signed_headers` to `["date"]`, so clients must sign the `Date` header unless the configuration explicitly overrides this behavior.

For more information, see [PR #13468](https://github.com/apache/apisix/pull/13468) and [PR #13388](https://github.com/apache/apisix/pull/13388).

### `cas-auth` requires the new `cookie.secret` configuration

The `cas-auth` plugin now uses a nested `cookie` configuration and requires `cookie.secret`. It also signs the login redirect cookie and tightens cookie handling.

Existing `cas-auth` configurations that still use the previous top-level cookie secret field must be updated before they will validate and work correctly on 3.17.0.

For more information, see [PR #13331](https://github.com/apache/apisix/pull/13331).

### `jwe-decrypt` no longer provides a token generation endpoint

This release removes the server-side `/apisix/plugin/jwe/encrypt` endpoint from the `jwe-decrypt` plugin. APISIX now only decrypts JWE tokens, and token generation must be handled outside APISIX.

For more information, see [PR #13464](https://github.com/apache/apisix/pull/13464).

### `proxy-cache` uses safer cache defaults

The `proxy-cache` plugin now isolates cache entries by authenticated consumer by default and avoids caching `Set-Cookie` responses in memory unless explicitly enabled.

Deployments that previously relied on shared authenticated caches or permissive cookie caching may see different cache hit behavior after upgrading.

For more information, see [PR #13350](https://github.com/apache/apisix/pull/13350).

### `batch-requests` enforces stricter request validation and limits

The `batch-requests` plugin now requires each pipeline item to include `path`, rejects unknown fields, requires `timeout` to be at least `1`, and limits the number of pipeline items with `max_pipeline_items`.

Requests that previously relied on tolerated invalid payloads or oversized pipelines must be updated.

For more information, see [PR #13492](https://github.com/apache/apisix/pull/13492).

## New Features

### New authentication and access control plugins

This release adds several new plugins for browser-based authentication and policy enforcement.

The new `saml-auth` plugin allows APISIX to act as a SAML 2.0 service provider. The new `dingtalk-auth` and `feishu-auth` plugins add DingTalk and Feishu/Lark OAuth authentication flows. The new `acl` plugin enables label-based access control using consumer labels or claims from authentication plugins.

For more information, see [PR #13346](https://github.com/apache/apisix/pull/13346), [PR #13381](https://github.com/apache/apisix/pull/13381), [PR #13382](https://github.com/apache/apisix/pull/13382), and [PR #13349](https://github.com/apache/apisix/pull/13349).

### New GraphQL traffic management plugins

APISIX 3.17.0 introduces two new plugins for GraphQL workloads.

The `graphql-limit-count` plugin rate limits requests based on GraphQL query depth, while the `graphql-proxy-cache` plugin caches GraphQL query responses and automatically bypasses cache for mutations.

For more information, see [PR #13372](https://github.com/apache/apisix/pull/13372) and [PR #13435](https://github.com/apache/apisix/pull/13435).

### New data protection and response customization plugins

This release adds the `data-mask`, `error-page`, and `proxy-buffering` plugins.

The `data-mask` plugin redacts sensitive fields before they are written by logging plugins. The `error-page` plugin customizes APISIX-generated error responses such as `404`, `500`, `502`, and `503`. The `proxy-buffering` plugin allows proxy buffering to be disabled per route for SSE and other streaming responses.

For more information, see [PR #13347](https://github.com/apache/apisix/pull/13347), [PR #13380](https://github.com/apache/apisix/pull/13380), and [PR #13446](https://github.com/apache/apisix/pull/13446).

### Better fallback control for `ai-proxy-multi`

The `ai-proxy-multi` plugin now supports `max_retries` and `retry_on_failure_within_ms` to give users finer control over fallback behavior across multiple AI providers.

For more information, see [PR #13495](https://github.com/apache/apisix/pull/13495).

## Bug Fixes

### `proxy-cache` correctness and cache safety improvements

This release improves correctness in the `proxy-cache` plugin by honoring upstream `Vary` headers in memory mode, avoiding `Vary: *` caching, and making `PURGE` work correctly with expired and variant cache entries.

For more information, see [PR #13376](https://github.com/apache/apisix/pull/13376).

### AI proxy reliability improvements

This release fixes multiple reliability issues across AI proxying workflows.

The `ai-proxy-multi` plugin now handles domain-based upstreams more reliably for multi-IP endpoints, preserving the original host information for `Host`, SNI, and AWS SigV4 signing. AI request JSON encoding is now deterministic to improve prompt cache hit rates with compatible providers, and upstream AI timeouts now return `504 Gateway Timeout` instead of `500`.

For more information, see [PR #13441](https://github.com/apache/apisix/pull/13441), [PR #13461](https://github.com/apache/apisix/pull/13461), and [PR #13481](https://github.com/apache/apisix/pull/13481).

### Rate limiting fixes for Redis-backed workflows

This release fixes a Redis race in `limit-req` by making leaky-bucket state updates atomic, and corrects dynamic `conn` and `burst` validation in `limit-conn`, including support for dynamic `burst: 0`.

For more information, see [PR #13467](https://github.com/apache/apisix/pull/13467).

### Authentication and session isolation fixes

This release fixes several authentication and session handling issues.

`authz-keycloak` no longer mutates shared permissions while appending request method scopes. `authz-casdoor` now scopes sessions by `client_id`. The `cas-auth` plugin hardens callback and session handling to prevent invalid callback sessions and cross-route session reuse.

For more information, see [PR #13410](https://github.com/apache/apisix/pull/13410), [PR #13387](https://github.com/apache/apisix/pull/13387), and [PR #13427](https://github.com/apache/apisix/pull/13427).

### Better secret handling and token validation

This release expands at-rest encryption coverage for sensitive plugin fields when field encryption is enabled. It also prevents raw Google Cloud credential file contents from appearing in parse errors, and ensures `jwe-decrypt` rejects undecryptable tokens instead of forwarding them upstream.

For more information, see [PR #13389](https://github.com/apache/apisix/pull/13389), [PR #13409](https://github.com/apache/apisix/pull/13409), and [PR #13404](https://github.com/apache/apisix/pull/13404).

### Fixes for OPA, gRPC mirroring, and response-body logging

The `opa` plugin now clears headers that are absent from OPA responses when `send_headers_upstream` is enabled. The `proxy-mirror` plugin now preserves the original gRPC method path when mirroring gRPC and `grpc-web` requests. In addition, response-body logging works correctly when multiple loggers are enabled across global rules and routes.

For more information, see [PR #13433](https://github.com/apache/apisix/pull/13433), [PR #13499](https://github.com/apache/apisix/pull/13499), and [PR #13450](https://github.com/apache/apisix/pull/13450).

## Other Updates

- Improve request body processing performance by caching parsed JSON, form, and multipart bodies within a request (PR [#13377](https://github.com/apache/apisix/pull/13377))
- Improve AI streaming performance and behavior with faster SSE decoding, better disconnect handling, and reuse of the original request body when no rewrite is needed (PR [#13391](https://github.com/apache/apisix/pull/13391) and PR [#13406](https://github.com/apache/apisix/pull/13406))
- Add `max_req_body_size` safeguards to `hmac-auth`, `forward-auth`, `ai-proxy`, and `ai-proxy-multi` to reject oversized request bodies with `413` (PR [#13478](https://github.com/apache/apisix/pull/13478) and PR [#13466](https://github.com/apache/apisix/pull/13466))
- Improve `openid-connect` compatibility by supporting newer `lua-resty-session` configuration options and making `client_secret` optional for local JWT verification, PKCE, and `private_key_jwt` modes (PR [#13178](https://github.com/apache/apisix/pull/13178) and PR [#13472](https://github.com/apache/apisix/pull/13472))
- Improve concurrency safety by replacing shared mutable tables with per-request allocation in several request-processing paths (PR [#13369](https://github.com/apache/apisix/pull/13369))
- Ensure stream routes that reference services preserve the correct service-level plugin context after updates (PR [#13402](https://github.com/apache/apisix/pull/13402))
- Fix HTTP/2 and HTTP/3 request body handling when requests do not include `Content-Length` (PR [#13428](https://github.com/apache/apisix/pull/13428))
- Optimize Redis-backed `limit-count` by using `EVALSHA` with `NOSCRIPT` fallback (PR [#13363](https://github.com/apache/apisix/pull/13363))
- Harden Redis xRPC request parsing by rejecting malformed RESP lengths and bounding command preallocation (PR [#13483](https://github.com/apache/apisix/pull/13483))
- Harden plugin handling for malformed inputs in `cors`, `multi-auth`, and `body-transformer`, and clear client-supplied `X-Userinfo` before DingTalk authentication (PR [#13469](https://github.com/apache/apisix/pull/13469) and PR [#13491](https://github.com/apache/apisix/pull/13491))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/release/3.17/CHANGELOG.md#3170).
