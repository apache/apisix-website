---
title: "2026 Monthly Report (June 01 - June 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2026/06/30/fx3aed6D_2026-06-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including SAML authentication, GraphQL caching, route-level proxy buffering, richer AI observability, new LLM security and cache plugins, safer request-body handling, and enhanced rate limiting backends. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From June 1st to June 30th, 16 contributors made 137 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2026/06/30/dyTaYX1z_2026-06-contributors.webp)

![New Contributors List](https://static.api7.ai/uploads/2026/06/30/JQ0VNnHX_2026-06-new-contributors.webp)

## Feature Highlights

To make this month's updates easier to navigate, the 24 feature highlights are grouped below by theme before the detailed descriptions:

- **Authentication and identity:** `saml-auth`, `openid-connect`, `jwe-decrypt`, and `hmac-auth` improvements.
- **Traffic handling and request safety:** GraphQL caching, route-level proxy buffering, bounded request body reads, batch request limits, per-port PROXY protocol, and safer `post_arg.*` matching.
- **AI Gateway:** fallback control, LLM observability, Consumer-bound AI plugin handling, Lakera Guard, Aliyun content moderation, AI response caching, and response scanning.
- **Observability and logging:** Prometheus label cardinality controls and additive logger formatting.
- **Rate limiting and credential protection:** Redis Sentinel/sliding-window support and encrypted Redis credentials for rate limiting plugins.

### 1. Add `saml-auth` Plugin

PR: https://github.com/apache/apisix/pull/13346

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `saml-auth` plugin, bringing SAML 2.0 authentication to the APISIX gateway layer. Organizations that rely on SAML identity providers can now protect upstream services through APISIX without implementing SAML handling in each application.

### 2. Add `graphql-proxy-cache` Plugin

PR: https://github.com/apache/apisix/pull/13435

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR introduces the `graphql-proxy-cache` plugin, which caches GraphQL query responses using APISIX's existing `proxy-cache` infrastructure. It helps reduce repeated upstream work for cacheable GraphQL operations while supporting both disk and memory cache strategies.

### 3. Add `proxy-buffering` Plugin

PR: https://github.com/apache/apisix/pull/13446

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `proxy-buffering` plugin to control NGINX proxy buffering behavior per route. Disabling buffering allows APISIX to stream responses directly to clients, which is important for Server-Sent Events, streaming APIs, and other real-time delivery scenarios.

### 4. Make `client_secret` Optional for Local JWT Verification in `openid-connect`

PR: https://github.com/apache/apisix/pull/13472

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR makes `client_secret` optional in `openid-connect` modes where APISIX only validates bearer tokens locally, such as public-key or JWKS-based JWT verification. Users no longer need to provide dummy secrets for flows that never call the identity provider's token or introspection endpoints.

### 5. Remove Server-Side Token Generation Endpoint from `jwe-decrypt`

PR: https://github.com/apache/apisix/pull/13464

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR removes the unfinished `/apisix/plugin/jwe/encrypt` helper endpoint from the `jwe-decrypt` plugin. APISIX now focuses on decrypting JWEs at the gateway, while token generation remains the responsibility of the service that owns the consumer secret.

### 6. Add `max_req_body_size` to `hmac-auth`

PR: https://github.com/apache/apisix/pull/13478

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds a `max_req_body_size` option to `hmac-auth` for routes that enable request body validation. Oversized bodies can now be rejected before APISIX buffers them into memory, improving protection for deployments where the global NGINX body size limit is raised or disabled.

### 7. Update `openid-connect` Session Configuration for `lua-resty-session` 4.x

PR: https://github.com/apache/apisix/pull/13178

Contributor: [francescodedomenico](https://github.com/francescodedomenico)

This PR updates the `openid-connect` session configuration schema to match `lua-resty-session` 4.x. Session options are now exposed under their real names and validated explicitly, so settings such as session expiry actually take effect instead of being silently ignored.

### 8. Add Fallback Retry Controls to `ai-proxy-multi`

PR: https://github.com/apache/apisix/pull/13495

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds `max_retries` and `retry_on_failure_within_ms` to `ai-proxy-multi` fallback behavior. Operators can bound how many alternate LLM instances a request tries and avoid retrying slow failures that would only increase latency and provider cost.

### 9. Bound Request Body Reads in `forward-auth` and `ai-proxy`

PR: https://github.com/apache/apisix/pull/13466

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds `max_req_body_size` to `forward-auth`, `ai-proxy`, and `ai-proxy-multi`. The new limit prevents these plugins from buffering arbitrarily large client bodies into worker memory and returns `413` for oversized requests before parsing.

### 10. Bound Pipeline Item Count and Schema in `batch-requests`

PR: https://github.com/apache/apisix/pull/13492

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR hardens the `batch-requests` plugin by adding a configurable `max_pipeline_items` limit, requiring positive timeout values, and rejecting undocumented fields in pipeline entries. A single batch request can no longer fan out into an unbounded number of internal requests.

### 11. Add Built-In LLM Histograms to Prometheus Metrics

PR: https://github.com/apache/apisix/pull/13487

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR enriches Prometheus metrics for AI Gateway traffic with clearer latency and token distribution data. APISIX now distinguishes total LLM latency from streaming time to first token and exposes prompt and completion token histograms for quantile-based monitoring.

### 12. Add Built-In NGINX Variables for LLM Observability

PR: https://github.com/apache/apisix/pull/13477

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds eight built-in `$llm_*` NGINX variables populated automatically by `ai-proxy`. These variables expose LLM request and response metadata in access logs and logger plugins without requiring custom parsing or additional plugin configuration.

### 13. Add `fail_mode` for Consumer-Bound AI Plugin Handling

PR: https://github.com/apache/apisix/pull/13489

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds a shared `fail_mode` mechanism for AI security plugins bound at the Consumer or Service level. Plugins can now consistently skip, warn, or fail closed when they receive plain HTTP, non-JSON, or non-AI requests that cannot be inspected.

### 14. Add Redis Sentinel, Sliding Window, and Delayed Sync to `limit-count`

PR: https://github.com/apache/apisix/pull/13443

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR expands `limit-count` with a Redis Sentinel backend, sliding window support, and delayed sync for Redis-based policies. These options improve high availability, reduce fixed-window burstiness, and lower per-request Redis overhead on high-traffic routes.

### 15. Support Disabling Prometheus Labels to Reduce Cardinality

PR: https://github.com/apache/apisix/pull/13202

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR adds a `disabled_labels` option to Prometheus plugin metadata. Operators can collapse selected built-in label values to reduce metric cardinality while keeping the metric schema stable for dashboards, alerts, and recording rules.

### 16. Support Per-Port PROXY Protocol for Stream TCP Proxy

PR: https://github.com/apache/apisix/pull/13561

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds per-port PROXY protocol controls for stream TCP proxy entries. Instead of applying PROXY protocol globally to every stream TCP port, users can enable accepting or sending it on specific ports while preserving the existing global defaults.

### 17. Add `log_format_extra` to Enrich Default Logger Output

PR: https://github.com/apache/apisix/pull/13568

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds `log_format_extra`, an additive logging format that preserves APISIX's default rich log entry and overlays user-defined fields. It also exposes `upstream_unresolved_host`, making it easier to log the configured upstream hostname alongside the resolved upstream address.

### 18. Add `ai-lakera-guard` Plugin

PR: https://github.com/apache/apisix/pull/13570

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR adds the `ai-lakera-guard` plugin, integrating APISIX with Lakera Guard to scan LLM requests at the gateway. It helps protect AI applications from prompt injection, jailbreaks, PII leakage, policy violations, and malicious links before traffic reaches backend LLM services.

### 19. Improve `ai-aliyun-content-moderation` Performance and Request Scope

PR: https://github.com/apache/apisix/pull/13598

Contributor: [nic-6443](https://github.com/nic-6443)

This PR optimizes `ai-aliyun-content-moderation` by replacing O(n²) content chunking with an O(n) approach, reducing signing overhead, and reusing HTTP connections within a request. It also adds role-aware `request_check_mode`, allowing moderation to focus on the latest user input instead of rechecking the full conversation every turn.

### 20. Include AI Observability Variables in `llm_summary`

PR: https://github.com/apache/apisix/pull/13609

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds AI observability fields such as stream mode, tool-call metadata, cache token counts, reasoning tokens, and content risk level to `llm_summary`. Logger plugins can now receive a fuller AI request summary automatically instead of requiring every `$llm_*` variable to be added manually.

### 21. Add `ai-cache` Plugin

PR: https://github.com/apache/apisix/pull/13578

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR adds the `ai-cache` plugin, which caches LLM responses for repeated requests that resolve to the same prompt and AI instance. It can reduce upstream token cost and latency for repetitive AI workloads such as FAQ bots, document Q&A, and translation.

### 22. Add Response Scanning to `ai-lakera-guard`

PR: https://github.com/apache/apisix/pull/13606

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR extends `ai-lakera-guard` with response scanning for both non-streaming and streaming LLM traffic. Users can configure the plugin to inspect input, output, or both, and flagged responses are replaced with provider-compatible denial messages.

### 23. Add `max_post_args_readable_size` for `post_arg.*` Matching

PR: https://github.com/apache/apisix/pull/13601

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds `apisix.max_post_args_readable_size` to bound request body reads during `post_arg.*` route matching. Large JSON or multipart bodies are no longer parsed into worker memory for route predicates; instead, oversized bodies simply do not match those predicates.

### 24. Encrypt Redis Passwords in Rate Limiting Plugins

PR: https://github.com/apache/apisix/pull/13624

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds `redis_password` and `sentinel_password` fields to `encrypt_fields` for `limit-count`, `limit-req`, and `limit-conn`. When data encryption is enabled, Redis credentials used by rate limiting plugins are now encrypted at rest in etcd and decrypted transparently at runtime.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
