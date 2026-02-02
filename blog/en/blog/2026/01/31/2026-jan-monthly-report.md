---
title: "2026 Monthly Report (January 01 - January 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2026/01/30/BhvatY9K_2026-jan-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including supporting Redis Keepalive for rate limiting plugins, and supporting Google Vertex AI, Gemini, Anthropic, and OpenRouter, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From January 1st to January 31st, 13 contributors made 48 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2026/01/30/Qtvol0me_2026-jan-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2026/01/30/knUmnrVN_2026-jan-new-contributors.webp)

## Good First Issue

### Issue #12932

**Link**: https://github.com/apache/apisix/issues/12932

**Description**: In APISIX's standalone mode, when an environment variable is set in the `apisix.yaml` file, if the value is numeric, it is automatically converted to a number. This can cause errors when the number exceeds Lua's double precision limits. Even with double quotes, such values are not treated as strings.

**Expected Behavior**: Values passed as `${{VAR}}` in `apisix.yaml` should be treated as strings, preserving the exact value even if it looks numeric.

## Feature Highlights

### 1. Support Redis Keepalive for Rate Limiting Plugins

PR: https://github.com/apache/apisix/pull/12861

Contributor: [ChuanFF](https://github.com/ChuanFF)

This PR adds support for Redis connection keepalive settings in the `limit-count`, `limit-conn`, and `limit-req` plugins, improving connection reuse and performance. It improves timeout handling in the redis-cluster policy by aligning `connect_timeout` and `send_timeout` with the `redis_timeout` configuration, ensuring consistent timeout behavior.

### 2. Support `apisix_request_id` Variable in `request-id` Plugin

PR: https://github.com/apache/apisix/pull/12931

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds support for the `apisix_request_id` variable when using the `request-id` plugin, and records the generated `request_id` in error logs to help users quickly locate and diagnose request-related issues.

### 3. Support Google Vertex AI

PR: https://github.com/apache/apisix/pull/12933

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This PR adds support for Google Vertex AI by aligning with and extending the implementation introduced in [#12565](https://github.com/apache/apisix/pull/12565), allowing users to route requests to Vertex AI through APISIX.

### 4. Support Gemini OpenAI API

PR: https://github.com/apache/apisix/pull/12883

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This PR adds support for Gemini OpenAI API by aligning with and extending the implementation introduced in [#12565](https://github.com/apache/apisix/pull/12565), allowing users to route requests to Gemini through APISIX.

### 5. Support Anthropic OpenAI API

PR: https://github.com/apache/apisix/pull/12881

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This PR adds support for Anthropic by aligning with and extending the implementation introduced in [#12565](https://github.com/apache/apisix/pull/12565), allowing users to route requests to Anthropic through APISIX.

### 6. Support OpenRouter

PR: https://github.com/apache/apisix/pull/12878

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This PR adds support for OpenRouter by aligning with and extending the implementation introduced in [#12565](https://github.com/apache/apisix/pull/12565), allowing users to route requests to OpenRouter through APISIX.

### 7. Add `Realm` in `WWW-Authenticate` Response Headers for Auth Plugins

PR: https://github.com/apache/apisix/pull/12864

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds a `realm` configuration option to to the following authentication plugins: `basic-auth`, `key-auth`, `hmac-auth`, `jwt-auth`, and `ldap-auth`. This allows users to customize the realm value returned in the `WWW-Authenticate` response header for `401 Unauthorized` failures.

This aligns with the HTTP authentication protocol (RFC 7235), helping clients identify the "protection area" of the requested resource and determine which credentials to use for retrying the request.

### 8. Allow Non-Prefix-Based Routes in `grpc-web` Plugin

PR: https://github.com/apache/apisix/pull/12830

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

Previously, APISIX only allowed `grpc-web` on routes that matched the URI by prefix. This prevented valid use cases where the client uses the exact route path. This PR removes that restriction, allowing `grpc-web` to work on routes that match the full path, improving compatibility and flexibility.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
