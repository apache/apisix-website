---
title: "Release Apache APISIX 3.16.0"
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
description: The Apache APISIX 3.16.0 version is released on Apr 2, 2026. This release includes a few changes, new features, bug fixes, and other improvements to user experiences.
tags: [Community]
---

We are glad to present Apache APISIX 3.16.0 with exciting new features, bug fixes, and other improvements to user experiences.

<!--truncate-->

This release introduces expanded rate limiting capabilities, enhanced observability with OpenTelemetry, new plugin features for authentication, logging, and service discovery, along with multiple bug fixes and stability improvements.

This release introduces one breaking change that may impact existing deployments. Please review the change and plan your upgrade accordingly.

## Breaking Change

### `openid-connect` plugin `ssl_verify` default changed to `true`

The default value of the `ssl_verify` option in the `openid-connect` plugin has been changed from `false` to `true`. This improves security by enforcing TLS certificate verification when communicating with the identity provider.

If you are using self-signed certificates or certificates from a private CA, you must now explicitly set `ssl_verify: false` in your plugin configuration to preserve the previous behavior.

For more information, see [PR #13010](https://github.com/apache/apisix/pull/13010).

## New Features

### Advanced multi-rule rate limiting

The `limit-count`, `limit-conn`, and `ai-rate-limiting` plugins now support a `rules` array, allowing multiple rate limiting rules to be defined within a single plugin configuration. Each rule can specify its own `count`, `time_window`, and `key`, making it possible to enforce multiple rate limits simultaneously on a single route or consumer.

In addition, all three plugins now support APISIX variables (e.g., `$http_x_custom_header`) in the `key` and rate fields, enabling dynamic, per-request rate limiting based on arbitrary request attributes.

For `limit-count`, a per-rule `header_prefix` field is also supported, allowing response headers for each rule to be namespaced independently so clients can distinguish which rule's quota information is being reported.

For more information, see the following pull requests:

- [PR #12977 (multi-rule support in `limit-count`)](https://github.com/apache/apisix/pull/12977)
- [PR #12967 (variable support in `limit-count`, `limit-conn`, and `ai-rate-limiting`)](https://github.com/apache/apisix/pull/12967)
- [PR #13000 (multi-rule support in `limit-conn` and `ai-rate-limiting`)](https://github.com/apache/apisix/pull/13000)
- [PR #13004 (`header_prefix` per rule in `limit-count`)](https://github.com/apache/apisix/pull/13004)

### Richer OpenTelemetry tracing spans

The OpenTelemetry plugin now emits significantly more spans, covering individual NGINX phases, per-plugin execution, DNS resolution, secret fetching, SSL client hello handling, and route matching. This provides much deeper visibility into request processing.

A new global `tracing: false` configuration flag is also available to disable tracing selectively. Additionally, OTel semantic convention attributes have been updated to align with the latest specification.

For more information, see [PR #12686](https://github.com/apache/apisix/pull/12686).

### Standalone mode rejects unknown plugins

In standalone mode (both YAML and JSON config providers), APISIX now returns an error and rejects configurations that reference unknown or unloaded plugins. Previously, such configurations would be silently accepted and the unknown plugins would be skipped at runtime, making misconfiguration difficult to detect.

For more information, see [PR #13046](https://github.com/apache/apisix/pull/13046).

### Stream route health check data via control API

Health check status data for stream routes can now be retrieved through the control API, in the same way as for HTTP routes. This provides a consistent interface for monitoring upstream health across both HTTP and stream proxying.

For more information, see [PR #12996](https://github.com/apache/apisix/pull/12996).

### `resolve_var` supports default value

The `resolve_var` utility now accepts an optional default value parameter. When a requested variable is not found or is empty, the specified default is returned instead of an empty result. This is particularly useful in plugin configurations that depend on variables which may not always be present.

For more information, see [PR #12963](https://github.com/apache/apisix/pull/12963).

### Eureka service discovery supports hostname-based nodes

The Eureka service discovery module now supports nodes registered with hostnames (domain names) in addition to IP addresses. Previously, only IP-addressed nodes were correctly handled. This enables APISIX to integrate with Eureka deployments where services register using DNS names.

For more information, see [PR #12993](https://github.com/apache/apisix/pull/12993).

### `tencent-cloud-cls` plugin scheme is now configurable

The `tencent-cloud-cls` plugin now allows the request scheme (`http` or `https`) to be configured. The default has been changed from `http` to `https`, aligning with security best practices. Users who require plain HTTP must now explicitly set the scheme.

For more information, see [PR #13009](https://github.com/apache/apisix/pull/13009).

### `clickhouse-logger` plugin supports secrets for credentials

The `clickhouse-logger` plugin now supports storing user credentials (username and password) as secrets using `$ENV://` or `$secret://` references. This avoids embedding plaintext credentials in plugin configuration and enables centralized secret management.

For more information, see [PR #12951](https://github.com/apache/apisix/pull/12951).

### Logger plugins support configurable max body size

Thirteen logger plugins now support `max_req_body_bytes` and `max_resp_body_bytes` attributes, which control the maximum number of bytes captured from request and response bodies in log entries. The default is 524288 bytes (512 KB). This provides fine-grained control over log volume and helps avoid overly large log entries.

For more information, see [PR #13034](https://github.com/apache/apisix/pull/13034).

### `jwt-auth` plugin supports additional signing algorithms

The `jwt-auth` plugin now supports a broader set of JWT signing algorithms, including RS256, ES256, and others, through a new `jwt-auth/parser.lua` module. Previously, only HS256 was well-supported. This enables integration with identity providers that issue tokens signed with asymmetric keys.

For more information, see [PR #12944](https://github.com/apache/apisix/pull/12944).

### `openid-connect` plugin supports Redis session storage

The `openid-connect` plugin now supports using Redis as a session storage backend, in addition to the existing cookie-based storage. This enables stateless deployments and session sharing across multiple APISIX instances.

For more information, see [PR #12986](https://github.com/apache/apisix/pull/12986).

### `elasticsearch-logger` plugin supports custom request headers

The `elasticsearch-logger` plugin now supports configuring arbitrary custom request headers (key-value pairs) to be sent with log requests to Elasticsearch. This can be used in addition to or as an alternative to the existing `auth` configuration, enabling compatibility with Elasticsearch deployments that use custom header-based authentication.

For more information, see [PR #12994](https://github.com/apache/apisix/pull/12994).

## Other Updates

- Fix Admin API PATCH to correctly handle bidirectional conversion of `upstream.nodes` between array and hash-table formats (PR [#13065](https://github.com/apache/apisix/pull/13065))
- Fix Consul service discovery intermittent 503s after restarts by switching from the events module to `ngx.shared` dict and LRU cache (PR [#13066](https://github.com/apache/apisix/pull/13066))
- Fix `ext-plugin` dropping query string arguments when rewriting the request path (PR [#13080](https://github.com/apache/apisix/pull/13080))
- Prevent stream plugins from being initialized in the HTTP subsystem (PR [#13064](https://github.com/apache/apisix/pull/13064))
- Fix anonymous consumer `minLength` schema type (was incorrectly set to string, now integer) (PR [#13022](https://github.com/apache/apisix/pull/13022))
- Remove `apisix_request_id` variable from stream access log format where it is not applicable (PR [#13006](https://github.com/apache/apisix/pull/13006))
- Treat a rate limiting rule variable as resolved when a configured default value is present, even if the underlying variable is absent (PR [#13007](https://github.com/apache/apisix/pull/13007))
- Fix consumer group plugins not being applied when the consumer authenticates via the credentials endpoint and has no direct plugins configured (PR [#12998](https://github.com/apache/apisix/pull/12998))
- Fix control API returning incorrect status data for passive health checks by upgrading `lua-resty-healthcheck` (PR [#12975](https://github.com/apache/apisix/pull/12975))
- Fix re-added Prometheus metrics disappearing after expiration by upgrading `nginx-lua-prometheus` (PR [#13058](https://github.com/apache/apisix/pull/13058))
- Fix Casbin enforcer overwrite bug by upgrading `lua-casbin` to 1.46.0 (PR [#12985](https://github.com/apache/apisix/pull/12985))
- Add `ngx.flush` after `ngx.print` to improve SSE (server-sent events) response delivery (PR [#12988](https://github.com/apache/apisix/pull/12988))
- Block CRLF injection in `forward-auth` plugin header values by upgrading `api7-lua-resty-http` to 0.2.3-0 (PR [#13057](https://github.com/apache/apisix/pull/13057))
- Fix `limit-req` consumer isolation by using `parent.resource_key` so consumers share the correct counter across routes (PR [#13019](https://github.com/apache/apisix/pull/13019))
- Remove incorrect `sync_interval` field from `ai-rate-limiting` plugin schema (PR [#12959](https://github.com/apache/apisix/pull/12959))
- Move Docker standalone mode YAML config validation from a shell script to Lua for more robust handling of all valid YAML variations (PR [#12949](https://github.com/apache/apisix/pull/12949))
- Correct AI plugin priority ordering in `config.yaml.example` (PR [#12926](https://github.com/apache/apisix/pull/12926))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3160).
