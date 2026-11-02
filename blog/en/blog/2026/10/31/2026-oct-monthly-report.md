---
title: "2026 Monthly Report (October 01 - October 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: TODO_COVER_IMAGE_EN
---

> Recently, we've introduced and updated features for Prometheus observability, multi-cluster service discovery, compressed request handling, verified identity propagation, and WAF resilience. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From October 1st to October 31st, 19 contributors made 77 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

The contributor statistics were supplied by the community; their collection scope and time zone are to be confirmed. Feature highlights were selected separately from the `apache/apisix` default branch for October in UTC, at snapshot `5300993973a455d5f11ab360bcd3d5af6714a70f`.

## Contributor Statistics

![Apache APISIX Contributors List](TODO_CONTRIBUTOR_LIST_IMAGE)

![New Contributors List](TODO_NEW_CONTRIBUTORS_IMAGE)

## Feature Highlights

Here are the key updates from this month, grouped by capability area.

### Observability and Traffic Governance

#### 1. Attribute Stream Metrics to Services

PR: https://github.com/apache/apisix/pull/13992

Contributor: [AlinsRan](https://github.com/AlinsRan)

APISIX now adds `service` and `service_id` labels to its four stream Prometheus metrics, making per-service traffic visible even when services share ports. Existing series gain empty versions of both labels, so alerts that select a single unaggregated series may need updated selectors. For sessions rejected before the stream Prometheus plugin runs, active-connection and bandwidth data remain in unlabelled totals, while `apisix_stream_status` still attributes the session to its service.

#### 2. Export Per-Process OpenResty Resource Metrics

PR: https://github.com/apache/apisix/pull/14034

Contributor: [nic-6443](https://github.com/nic-6443)

New Prometheus gauges expose timer usage, connection-slot consumption, and Lua memory for each worker and the privileged agent, helping operators detect process-local exhaustion before it causes errors. Collection runs only when the Prometheus plugin is enabled, and runtime layout guards suppress connection gauges rather than publish incorrect values when the expected NGINX structure is not detected.

#### 3. Configure Expired Prometheus Metric Cleanup

PR: https://github.com/apache/apisix/pull/13981

Contributor: [AlinsRan](https://github.com/AlinsRan)

Operators can now set `plugin_attr.prometheus.remove_expired_keys_interval` for HTTP and stream metrics instead of relying on a fixed library default. The default remains 3,600 seconds, values above that are capped by the library, and non-positive values disable cleanup; after a reload, a shorter interval may not take effect until the previously scheduled interval expires.

#### 4. Explain Rate-Limiting Decisions in Logs

PR: https://github.com/apache/apisix/pull/13996

Contributor: [nic-6443](https://github.com/nic-6443)

The `$rate_limiting_info` variable now reports fixed- or sliding-window timestamps, request cost, decision, counters, and delayed-sync details so access logs can explain why a request was allowed, rejected, or failed. This is an observability-only change with no additional Redis call or decision change; the variable is JSON-encoded, so consumers must not depend on field order and should allow documented `null` values when a code path lacks a value.

### Service Integration and Request Handling

#### 5. Select Multiple Kubernetes Discovery Clusters

PR: https://github.com/apache/apisix/pull/13991

Contributor: [AlinsRan](https://github.com/AlinsRan)

Kubernetes discovery now accepts `discovery_args.cluster_ids`, allowing an upstream to use the deduplicated union of endpoints from an explicit set of clusters. Unlisted clusters never contribute nodes and there is no fallback when none of the selected clusters has matching endpoints; the Admin API validates cluster IDs, while stale or unknown IDs that reach the data plane are skipped with a warning.

#### 6. Connect to Consul over HTTPS

PR: https://github.com/apache/apisix/pull/14018

Contributor: [nic-6443](https://github.com/nic-6443)

Consul discovery can now connect to HTTP and HTTPS server addresses in the same server list, using port 443 when an HTTPS address omits its port. Certificate verification is enabled by default against `apisix.ssl.ssl_trusted_certificate`; operators may set `discovery.consul.ssl_verify: false` for self-signed environments, while unsupported schemes continue to be rejected.

#### 7. Decompress Request Bodies for Downstream Plugins

PR: https://github.com/apache/apisix/pull/14016

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

The new `request-decompress` plugin inflates `gzip` and `deflate` request bodies before validation, WAF inspection, transformation, and other body-reading plugins run. It enforces `max_req_body_size` while streaming decompressed output and can optionally restore or recompress the body before proxying; decompression happens before authentication by default, so operators should size both body limits to bound unauthenticated work.

#### 8. Remove the Deprecated MCP Bridge Plugin

PR: https://github.com/apache/apisix/pull/14019

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

APISIX has removed the deprecated `mcp-bridge` plugin, its transports, documentation, tests, and related CI setup, while retaining the `mcp-session` shared dictionary for `openapi-to-mcp` when that plugin is enabled. This is a breaking change: users who still list `mcp-bridge` in their `plugins` configuration must remove it and should use `openapi-to-mcp` for MCP integration going forward.

### Identity and Security Resilience

#### 9. Map Verified OpenID Connect Claims to Headers

PR: https://github.com/apache/apisix/pull/14030

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

The `openid-connect` plugin can now map selected verified claims to upstream request headers through `upstream_headers`, including nested claims and claim names containing punctuation. Every declared header is cleared on all authentication outcomes before a verified value is set, preventing client spoofing; arrays and objects are forwarded as base64-encoded JSON, while missing, `null`, `false`, and empty-string values produce no header.

#### 10. Distinguish Token Failures from Introspection Outages

PR: https://github.com/apache/apisix/pull/14088

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

Upgrading `lua-resty-openidc` to 1.9.3 lets APISIX return `401` for confirmed inactive tokens, `503` for introspection endpoint or transport failures, and `500` for configuration errors. Concurrent misses can share an in-flight result, but coordination remains best effort and falls back to direct introspection on timeout; missing or non-boolean `active` claims are now rejected as invalid upstream responses.

#### 11. Allow Chaitin WAF to Fail Open

PR: https://github.com/apache/apisix/pull/13311

Contributor: [jlongWang](https://github.com/jlongWang)

The Chaitin WAF plugin adds an `allow_degradation` option that lets requests proceed when the WAF service is unavailable, including connection timeouts, missing healthy nodes, and detection errors. The option defaults to `false`, preserving fail-closed behavior unless operators explicitly choose availability over enforcement during a WAF outage.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation, tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
