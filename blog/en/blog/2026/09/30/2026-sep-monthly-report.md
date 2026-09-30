---
title: "2026 Monthly Report (September 01 - September 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: /TODO_COVER_IMAGE_EN
---

> Recently, we've introduced and updated some new features, including OpenAPI-to-MCP conversion, frame-aware WebSocket proxying, TLS stream passthrough, more reliable standalone updates, and slow start for new upstream nodes. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From September 1st to September 30th, 13 contributors made 90 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

<img src="/TODO_CONTRIBUTOR_LIST_IMAGE" alt="Apache APISIX Contributors List" />

<img src="/TODO_NEW_CONTRIBUTORS_IMAGE" alt="New Contributors List" />

## Feature Highlights

Here are the key updates from this month, grouped by capability area.

### AI and MCP Operations

#### 1. Expose Plugin-Owned Health Checks Through the Control API

PR: https://github.com/apache/apisix/pull/13899

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR lets plugins declare their own health-check targets, enabling the Control API to report directly configured `ai-proxy-multi` instances whose request path creates a checker. A new `/v1/healthcheck/{src_type}/{src_id}/checkers` endpoint returns every upstream- and plugin-owned checker for a resource, while the existing single-checker endpoint remains unchanged. The single-instance fast path does not create a checker, and plugins inherited through `plugin_config` are not discovered by this endpoint.

#### 2. Generate MCP Tools from OpenAPI Documents

PR: https://github.com/apache/apisix/pull/13942

Contributor: [AlinsRan](https://github.com/AlinsRan)

The new `openapi-to-mcp` plugin turns operations from an OpenAPI document into MCP tools and serves them over Streamable HTTP or HTTP+SSE without requiring a separate MCP server. Authentication, rate limiting, response, and logging plugins on the route still apply, while operators should note that SSE sessions are local to one APISIX instance and outbound document and tool requests do not use APISIX upstream load balancing or health checks.

#### 3. Price Nested AI Usage Fields

PR: https://github.com/apache/apisix/pull/13984

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR exposes nested numeric usage fields to `ai-rate-limiting` cost expressions by joining each path with `__`, such as `input_tokens_details__cached_tokens`. Existing top-level expressions keep their current behavior, sibling fields remain distinct, arrays are skipped, and missing fields continue to evaluate as zero.

### WebSocket Observability and Extensibility

#### 4. Distinguish WebSocket Sessions in Metrics

PR: https://github.com/apache/apisix/pull/13909

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

APISIX now labels requests that complete a `101 Switching Protocols` handshake with `request_type="websocket"`, allowing operators to separate long-lived sessions from ordinary HTTP latency, status, and bandwidth metrics. The classification is based on the response rather than route configuration or request headers, so refused upgrades remain labeled as `traditional_http`.

#### 5. Add Frame-Aware WebSocket Proxying and Plugin Hooks

PR: https://github.com/apache/apisix/pull/13939

Contributor: [bzp2010](https://github.com/bzp2010)

This PR adds `ws` and `wss` upstream schemes that let APISIX proxy WebSocket connections itself and expose handshake, client-frame, upstream-frame, and close phases to plugins. Plugins can inspect or rewrite individual frames, while connection failures can be retried before the client handshake; after a `101` response has been sent, a later upstream failure can only close the connection rather than return another HTTP response.

#### 6. Configure WebSocket Payload Limits per Route

PR: https://github.com/apache/apisix/pull/13972

Contributor: [bzp2010](https://github.com/bzp2010)

The new `websocket-proxy` plugin configures client- and upstream-facing `max_payload_len` values for routes that use the frame-aware `ws` or `wss` proxy path. Leaving the settings unset preserves the 65,535-byte default, while timeout and protocol-correctness options remain deliberately controlled by the existing upstream behavior rather than exposed through this plugin.

### TLS, Stream Routing, and Identity

#### 7. Route TLS Streams Without Terminating Encryption

PR: https://github.com/apache/apisix/pull/13912

Contributor: [AlinsRan](https://github.com/AlinsRan)

APISIX stream listeners can now select an upstream from the ClientHello SNI and pass the encrypted TLS session through without terminating it, including mixed listeners where each stream route chooses passthrough or termination. Passthrough is explicit and keeps certificates at the backend, but gateway mTLS and payload-inspecting stream plugins do not apply; an upstream using `scheme: tls` is rejected to prevent accidental double encryption. Because a mixed listener uses an internal hop, `apisix_stream_metrics_zone` counts each client connection on that listener twice.

#### 8. Match Stream Routes Against Multiple SNIs

PR: https://github.com/apache/apisix/pull/13911

Contributor: [AlinsRan](https://github.com/AlinsRan)

The new `snis` field lets one stream route match several SNI hostnames, including the existing wildcard suffix behavior, so one Gateway API TLSRoute rule no longer needs to be duplicated for every hostname. `sni` and `snis` are mutually exclusive, and a bare `*` or the absence of both fields keeps SNI unrestricted.

#### 9. Strengthen SAML Response Validation and Replay Protection

PR: https://github.com/apache/apisix/pull/13964

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

The `saml-auth` plugin now exposes `lua-resty-saml` 0.2.6 options for accepted issuers and audiences, an externally visible ACS URL, clock skew, and optional assertion replay protection. Existing configurations retain their previous defaults; replay records are stored in a configured shared dictionary and prevent reuse on the same APISIX node rather than across a distributed cluster.

### Platform Reliability and Traffic Readiness

#### 10. Make API-Driven Standalone Updates Observable

PR: https://github.com/apache/apisix/pull/13904

Contributor: [bzp2010](https://github.com/bzp2010)

API-driven standalone mode now reports per-worker configuration digests by subsystem and entity type, and `PUT /apisix/admin/configs` accepts a `wait` duration for collecting the applied status. A `200` response means every worker accepted and loaded the configuration, while `202` means it was accepted but full loading could not be guaranteed within the wait period; clients that omit `wait` retain the previous behavior.

#### 11. Ramp Up Traffic to Newly Added Upstream Nodes

PR: https://github.com/apache/apisix/pull/13941

Contributor: [AlinsRan](https://github.com/AlinsRan)

The new `warm_up_conf` gradually increases the effective weight of newly observed HTTP round-robin upstream nodes, helping cold services warm caches, connection pools, and runtimes before receiving their full traffic share. The first implementation applies to single-priority HTTP round-robin upstreams, leaves existing behavior unchanged when disabled, and fails open to configured weights when runtime state cannot safely support the ramp. Slow start only redistributes traffic among available nodes, so a single-node upstream or an upstream where all nodes are new still sends every request to those nodes.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX offer extensive documentation, tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
