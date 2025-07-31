---
title: "2025 Monthly Report (July 01 - July 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/07/31/t62Fx9Uu_2025-july-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including adding AIMLAPI as a new provider to AI plugins, improving metrics support for Datadog plugin, and supporting custom Claim Validator in OIDC, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From July 1st to July 31, 20 contributors made 96 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/07/31/QnqX7l1o_2025-july-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/07/31/7dQAgNIT_2025-july-new-contributors.webp)

## Feature Highlights

### 1. Improve Metrics Support for Datadog Plugin

PR: https://github.com/apache/apisix/pull/11943

Contributor: [deiwin](https://github.com/deiwin)

The Datadog plugin previously lacked critical metrics such as rate-limited response counts, gateway errors when services were unreachable, and network delays between the gateway and the service.

This PR addresses these limitations by providing more comprehensive and compatible metrics, ensuring backward compatibility and cost-effectiveness.

### 2. Decouple Calculation and Output of Prometheus Exporter

PR: https://github.com/apache/apisix/pull/12383

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This PR decouples the calculation and output processes of the Prometheus exporter. The calculation process now runs periodically in the privileged agent process, by default every 15 seconds, storing data in a shared dictionary. The `/apisix/prometheus/metrics` API is moved to the worker process, which only reads and returns the cached data in the shared dictionary.

### 3. Support Custom Claim Validator in OIDC

PR: https://github.com/apache/apisix/pull/11824

Contributor: [beardnick](https://github.com/beardnick)

Enable validation of custom claims in OpenID Connect authentication. Users can configure `claim_validators` to define allowed values for specific claims. If the claim does not match the expected values (e.g., `foo`, `bar`), access is denied with a `401` response, enhancing fine-grained access control to backend services.

### 4. Add Support for `extra_headers` in `forward-auth` Plugin

PR: https://github.com/apache/apisix/pull/12405

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR fixes [#11200](https://github.com/apache/apisix/issues/11200) and is a follow-up for [#12404](https://github.com/apache/apisix/pull/12404). It adds `extra_headers` support to the `forward-auth` plugin, enabling selective extraction of fields from the request body into headers.

### 5. Add a Global Switch to Disable Upstream Health Check

PR: https://github.com/apache/apisix/pull/12407

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR introduces a global configuration field `apisix.disable_upstream_healthcheck` to disable all upstream health checks instantly. This feature allows users to quickly start APISIX services when production services are unavailable, ensuring faster recovery and simplified troubleshooting during outages.

### 6. Support Multiple `json.delay_encode` Objects in Single Log

PR: https://github.com/apache/apisix/pull/12395

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR enables logging up to 16 unique `json.delay_encode` objects within a single log entry, enhancing flexibility for structured data logging in Apache APISIX.

### 7. Add AIMLAPI Provider Support to AI Plugins

PR: https://github.com/apache/apisix/pull/12379

Contributor: [D1m7asis](https://github.com/D1m7asis)

This PR adds AIMLAPI as a supported provider to the `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` plugins in Apache APISIX. AIMLAPI provides a unified OpenAI-compatible API with access to 300+ LLMs. This change enables APISIX users to easily route and proxy requests through AIMLAPI without needing custom drivers or overrides.

### 8. Support `ctx.var.post_arg` for vars-based Route Matching on Request Body

PR: https://github.com/apache/apisix/pull/12388

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR adds supporting `ctx.var.post_arg` in route matching based on the request body. `ctx.var.post_arg` can be used to match based on the request body for three formats - JSON, multipart, and URL-encoded.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blogs

- [Announcing APISIX Integration with AI/ML API](https://apisix.apache.org/blog/2025/07/29/announcing-integration-of-apisix-and-ai-ml-api/)

  We're thrilled to announce that AI/ML API has become a supported provider to the `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` plugins in Apache APISIX. All the AI/ML APIs will be supported in the next APISIX version.

- [Load Balancing AI/ML API with Apache APISIX](https://apisix.apache.org/blog/2025/07/31/load-balancing-between-ai-ml-api-with-apisix/)

  This blog provides a step-by-step guide to configure Apache APISIX for AI traffic splitting and load balancing between API versions, covering security setup, canary testing, and deployment monitoring.

- [AI Gateways: The Future Trend of AI Infrastructure](https://apisix.apache.org/blog/2025/06/18/ai-gateway-future-trend-of-ai-infrastructure/)

  Discover how AI gateways are revolutionizing enterprise AI infrastructure, offering centralized control, security, cost management, and governance for AI models and services.
