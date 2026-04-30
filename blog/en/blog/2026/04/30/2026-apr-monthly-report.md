---
title: "2026 Monthly Report (April 01 - April 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2026/04/30/eNntRfyu_2026-apr-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including AWS Bedrock support in `ai-proxy`, native Anthropic Messages API protocol support, OpenAI Responses API support, expression-based rate limiting in `ai-rate-limiting`, UUID v7 generation in `request-id`, and more. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From April 1st to April 30th, 17 contributors made 129 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2026/04/30/hcKyxF8v_2026-apr-contributors.webp)

![New Contributors List](https://static.api7.ai/uploads/2026/04/30/JEF7CpIj_2026-apr-new-contributors.webp)

## Feature Highlights

### 1. Support AWS Bedrock in `ai-proxy` Plugin

PR: https://github.com/apache/apisix/pull/13249

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds AWS Bedrock as a supported provider in the `ai-proxy` plugin. Users can now route AI requests to models hosted on AWS Bedrock using the same unified interface, expanding the range of supported AI platforms alongside existing providers like OpenAI and Anthropic.

### 2. Add Per-Protocol `request_body` Override and Rename `max_tokens` Mapping to `llm_options`

PR: https://github.com/apache/apisix/pull/13269

Contributor: [nic-6443](https://github.com/nic-6443)

This PR allows users to override the request body on a per-protocol basis in the `ai-proxy` plugin, providing finer-grained control over how requests are sent to different AI providers. It also renames the `max_tokens` mapping field to `llm_options` for improved clarity and extensibility.

### 3. Add Provider-Aware `max_tokens` Override with Priority Control

PR: https://github.com/apache/apisix/pull/13251

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds provider-aware `max_tokens` override support to the `ai-proxy` plugin, with explicit priority control so that plugin-level settings can be properly overridden by request-level values. This gives users more predictable behavior when capping token usage across different AI providers.

### 4. Abort Upstream Read on Client Disconnect During Streaming

PR: https://github.com/apache/apisix/pull/13254

Contributor: [nic-6443](https://github.com/nic-6443)

This PR improves the streaming behavior of the `ai-proxy` plugin by aborting the upstream read when the client disconnects mid-stream. Previously, APISIX would continue reading from the upstream AI provider even after the client had gone away, wasting resources. Now the connection is cleanly terminated.

### 5. Add `max_stream_duration_ms` and `max_response_bytes` Safeguards

PR: https://github.com/apache/apisix/pull/13250

Contributor: [nic-6443](https://github.com/nic-6443)

This PR introduces two new safety limits to the `ai-proxy` plugin: `max_stream_duration_ms` caps the total duration of a streaming response, and `max_response_bytes` limits the total bytes read from the upstream AI provider. These safeguards help protect against runaway AI responses consuming excessive time or memory.

### 6. Add `core.response.get_response_source()` API for Response Origin Classification

PR: https://github.com/apache/apisix/pull/13224

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds a new core API `core.response.get_response_source()` that allows plugins to determine whether the current response originated from the upstream, a plugin (e.g., via `ngx.exit()`), or the APISIX core itself. This is useful for plugins that need to apply different logic depending on the response origin.

### 7. Make `/configs/validate` Available in All Modes

PR: https://github.com/apache/apisix/pull/13220

Contributor: [nic-6443](https://github.com/nic-6443)

This PR makes the `/configs/validate` Admin API endpoint available in all deployment modes (including standalone mode), not just etcd-backed mode. Users can now validate their configuration files regardless of how APISIX is deployed.

### 8. Upgrade `lua-resty-limit-traffic` to v1.2.0 in `limit-count`

PR: https://github.com/apache/apisix/pull/13212

Contributor: [nic-6443](https://github.com/nic-6443)

This PR upgrades the underlying `lua-resty-limit-traffic` library used by the `limit-count` plugin to v1.2.0, bringing in upstream bug fixes and performance improvements.

### 9. Add Expression-Based Limit Strategy in `ai-rate-limiting`

PR: https://github.com/apache/apisix/pull/13191

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds expression-based limit strategy support to the `ai-rate-limiting` plugin. Users can now define dynamic rate limit keys using APISIX expressions (e.g., based on request headers, consumer names, or other variables), enabling more flexible and fine-grained AI token rate limiting policies.

### 10. Add OpenAI Responses API (`/v1/responses`) Support

PR: https://github.com/apache/apisix/pull/13186

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds support for the OpenAI Responses API endpoint (`/v1/responses`) in the `ai-proxy` plugin. This allows users to proxy requests to the newer OpenAI Responses API, which provides stateful, multi-turn conversation capabilities.

### 11. Enhance `encrypt_fields` to Support Nested Structures

PR: https://github.com/apache/apisix/pull/13192

Contributor: [nic-6443](https://github.com/nic-6443)

This PR enhances the `encrypt_fields` mechanism to support nested field structures, allowing sensitive credentials stored in deeply nested plugin configurations to be properly encrypted and decrypted. This improves security coverage for plugins that use nested configuration objects.

### 12. Add `rate-limiting-info` Variable

PR: https://github.com/apache/apisix/pull/13155

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds a new built-in variable `rate-limiting-info` that exposes rate limiting metadata (such as remaining quota and reset time) as an APISIX variable. Plugins and logging configurations can now reference this variable to include rate limit context in logs or responses.

### 13. Add Native Anthropic Messages API Protocol Support

PR: https://github.com/apache/apisix/pull/13181

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds native support for the Anthropic Messages API protocol in the `ai-proxy` plugin. Users can now send requests using the native Anthropic Messages API format directly, providing better compatibility with Anthropic-specific features without requiring OpenAI-compatible translation.

### 14. Add UUID v7 Generation Support in `request-id`

PR: https://github.com/apache/apisix/pull/13152

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds UUID v7 generation support to the `request-id` plugin. Unlike UUID v4 (random), UUID v7 is time-ordered, making it more suitable for distributed tracing and log correlation where chronological ordering of request IDs is desirable.

### 15. Support Batch TCP/UDP Port Ranges in `stream_proxy` Config

PR: https://github.com/apache/apisix/pull/13153

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds support for specifying batch TCP/UDP port ranges in the `stream_proxy` configuration, allowing users to listen on a range of ports (e.g., `9000-9010`) instead of listing each port individually. This simplifies configuration for services that require multiple consecutive ports.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
