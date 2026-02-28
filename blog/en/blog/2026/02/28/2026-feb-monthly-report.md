---
title: "2026 Monthly Report (February 01 - February 28)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2026/02/28/wFO4NRZJ_2026-feb-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including support for retrieving stream health check data via the Control API, and support for configuring the header prefix in `limit-count` plugin rules, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From February 1st to February 28th, 11 contributors made 45 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2026/02/28/iQbt1dLQ_2026-feb-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2026/02/28/aetNLUjx_2026-feb-new-contributors.webp)

## Good First Issue

### Issue #13043

**Link**: https://github.com/apache/apisix/issues/13043

**Description**: Fix incorrect parameter names in the Chinese documentation for the `limit-count`, `limit-req`, and `limit-conn` plugins.

## Feature Highlights

### 1. Make CLS Scheme Configurable and Default to `https`

PR: https://github.com/apache/apisix/pull/13009

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR makes the scheme for accessing CLS (Cloud Log Service) configurable, addressing the security risk of using `http` by default. The default scheme is now set to `https` to enhance data transmission security.

### 2. Throw Panic Error When Parent Node Is Invalid in `limit-count` Plugin

PR: https://github.com/apache/apisix/pull/13030

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR refactors the `limit-count` plugin to throw a panic error when an invalid parent is detected, preventing error states from propagating.

### 3. Support Stream Health Check Data Retrieval via Control API

PR: https://github.com/apache/apisix/pull/12996

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR fixes the issue where upstream health check status in stream mode could not be obtained via the Control API. Previously, the `/v1/healthcheck` endpoint only returned health check status for HTTP upstreams, leaving stream route health checks invisible. The endpoint now also returns health check information for stream upstreams, ensuring complete visibility.

### 4. Support Configuring Header Prefix in `limit-count` Plugin Rules

PR: https://github.com/apache/apisix/pull/13004

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds the ability to configure a `header_prefix` prefix in the `limit-count` plugin to differentiate rate-limiting response headers when multiple rules are triggered simultaneously. Users can customize the prefix via `header_prefix` (defaults to the index of the currently executed rule), allowing isolation of response headers across multiple rate-limiting rules and avoiding status information confusion.

### 5. Support Request Header-Based Authentication in `elasticsearch-logger` Plugin

PR: https://github.com/apache/apisix/pull/12994

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds request header-based authentication support to the `elasticsearch-logger` plugin, allowing token-based mechanisms (such as API keys) as an alternative to basic authentication.

### 6. Support `rules` Configuration in `limit-conn` and `ai-rate-limiting` Plugins

PR: https://github.com/apache/apisix/pull/13000

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds `rules` configuration support to the `limit-conn` and `ai-rate-limiting` plugins, enabling flexible rate-limiting strategies through multiple rules, aligning with the rule mechanism of the `limit-count` plugin.

### 7. Support Domain-Format Nodes in Eureka Service Discovery

PR: https://github.com/apache/apisix/pull/12993

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR fixes the issue where domain-format nodes in Eureka service discovery could not be accessed. Previously, when Eureka registered an address as a domain name instead of an IP, APISIX would throw an error "no host allowed while connecting to upstream". This PR enables correct domain resolution and request forwarding.

### 8. Support Redis Session Storage in `openid-connect` Plugin

PR: https://github.com/apache/apisix/pull/12986

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds Redis session storage support to the `openid-connect` plugin. In scenarios where multiple routes share authentication state (e.g., protecting both frontend SPA and backend API), using Redis enables cross-route token refresh and session sharing, resolving refresh failures or login loops caused by session isolation.

### 9. Support Multiple Rules in `limit-count` Plugin

PR: https://github.com/apache/apisix/pull/12977

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds support for multiple rule configurations in the `limit-count` plugin. Building on PR #12967, which introduced dynamic rule construction based on variables, it now allows multiple rate-limiting rules to achieve more complex rate-limiting strategies.

### 10. Add More Spans to `opentelemetry` Plugin

PR: https://github.com/apache/apisix/pull/12686

Contributor: [nic-6443](https://github.com/nic-6443)

This PR enhances the opentelemetry plugin with comprehensive distributed tracing across the request lifecycle (SSL/SNI, access, header/body filter, upstream, and logging phases). It improves span propagation, context management, and per-request span lifecycle for better observability.

### 11. Support More Algorithms in `jwt-auth` Plugin

PR: https://github.com/apache/apisix/pull/12944

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR extends the supported signing algorithms for the `jwt-auth` plugin, adding support for HS384, HS512, RS256, RS384, RS512, ES256, ES384, ES512, PS256, PS384, PS512, and EdDSA. This provides more flexibility in JWT token generation and validation.

### 12. Support Variables in Configurations of `limit-conn`, `limit-count`, and `ai-rate-limiting` Plugins

PR: https://github.com/apache/apisix/pull/12967

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds variable support to the `limit-conn`, `limit-count`, and `ai-rate-limiting` plugins, allowing the use of variables in rate-limiting configurations to implement dynamic rate-limiting policies.

### 13. Support Default Values in `resolve_var`

PR: https://github.com/apache/apisix/pull/12963

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR enhances the `resolve_var` function by supporting default values when a variable does not exist, preventing parsing failures due to missing variables.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
