---
title: "2025 Monthly Report (August 01 - August 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/08/29/dfR8DC8m_aug-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including adding the `ai-aliyun-content-moderation` plugin and allowing environment variables in the `openid-connect` plugin, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From August 1st to August 31st, 16 contributors made 56 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/08/29/SWsZprNc_aug-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/08/29/7SSxLwiC_aug-new-contributors.webp)

## Feature Highlights

### 1. Add `ai-aliyun-content-moderation` Plugin

PR: https://github.com/apache/apisix/pull/12530

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR introduces `ai-aliyun-content-moderation` plugin to perform content moderation on request and responses returned by LLM backends via aliyun.

### 2. Refactor Chunk Decoding with `sse.lua`

PR: https://github.com/apache/apisix/pull/12530

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR also refactors and improves the chunk decoding from the LLM backend into a separate `sse.lua`. It introduces `lua_response_filter` to run `lua_body_filter` as defined by each plugin, because `lua_body_filter` can't be processed directly in AI responses, which are managed by APISIX. It also modifies the `ai-request-rewrite` plugin to leverage the `lua_body_filter` for writing the response.

### 3. Allow Environment Variables in `openid-connect` Plugin

PR: https://github.com/apache/apisix/pull/11451

Contributor: [darkSheep404](https://github.com/darkSheep404)

This PR adds the feature of using environment variables in the `openid-connect` plugin.

### 4. Add Healthcheck Support for `ai-proxy-multi` Plugin

PR: https://github.com/apache/apisix/pull/12509

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR introduces health check support for the `ai-proxy-multi` plugin, ensuring traffic is routed to live, healthy AI backends. Healthcheck manager has been modified with the capability to use dynamically created upstreams via the resource key.

### 5. Add Latency and Token Usage in Access Log and Prometheus Metrics in `ai-proxy` Plugin

PR: https://github.com/apache/apisix/pull/12518

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR adds latency and token info for `ai-proxy` plugin in the access log for easy debugging. It also adds Prometheus metrics for AI-related requests and adds two more labels, `request_type` to distinguish between normal requests and AI-related requests & `llm_model`.

### 6. Add last_modified and digest Metadata to the Standalone API

PR: https://github.com/apache/apisix/pull/12526

Contributor: [bzp2010](https://github.com/bzp2010)

### 7. Support `limit-conn` in `workflow` Plugin

PR: https://github.com/apache/apisix/pull/12465

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR enhances the `workflow` plugin by adding support for the `limit-conn` plugin within workflow rules.

### 8. Add Healthcheck Manager to Decouple from Upstream

PR: https://github.com/apache/apisix/pull/12426

Contributor: [Revolyssup](https://github.com/Revolyssup)

The tight coupling between upstreams and health checkers is replaced with a lightweight index—keyed on `resource_path` and `resource_version`—managed by the new Healthcheck Manager. Besides, a background timer asynchronously creates checkers from a "waiting pool". The requests no longer directly create health checkers; therefore, the health checker lifecycle is decoupled from requests.

### 9. Add Support for Pushing Logs in `ai-proxy` Plugin

PR: https://github.com/apache/apisix/pull/12515

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR defines the log format and adds support for pushing `ai-proxy` request/response logs to any logger.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blogs

- [Announcing APISIX Integration with AI/ML API](https://apisix.apache.org/blog/2025/07/29/announcing-integration-of-apisix-and-ai-ml-api/)

  We're thrilled to announce that AI/ML API has become a supported provider to the `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` plugins in Apache APISIX. All the AI/ML APIs will be supported in the next APISIX version.

- [Load Balancing AI/ML API with Apache APISIX](https://apisix.apache.org/blog/2025/07/31/load-balancing-between-ai-ml-api-with-apisix/)

  This blog provides a step-by-step guide to configure Apache APISIX for AI traffic splitting and load balancing between API versions, covering security setup, canary testing, and deployment monitoring.

- [AI Gateways: The Future Trend of AI Infrastructure](https://apisix.apache.org/blog/2025/06/18/ai-gateway-future-trend-of-ai-infrastructure/)

  Discover how AI gateways are revolutionizing enterprise AI infrastructure, offering centralized control, security, cost management, and governance for AI models and services.
