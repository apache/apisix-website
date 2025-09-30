---
title: "2025 Monthly Report (September 01 - September 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/09/29/APa3g8ZM_sep-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including adding fallback mechanism for specific error codes in `ai-proxy-multi` plugin and adding KSUID algorithm in `request-id` plugin, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From September 1st to September 30th, 17 contributors made 76 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/09/29/8AmFT8hp_2025-sep-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/09/29/ukKJS7E3_2025-sep-new-contributors.webp)

## Feature Highlights

### 1. Admin API No Longer Overwrites User Data with Defaults

PR: https://github.com/apache/apisix/pull/12603

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This PR removes the logic of populating default values before writing to the admin API. By leaving the copy in etcd untouched and applying the new defaults only inside APISIX, the PR keeps the user's config identical to what was posted, removing surprise diffs and letting the ingress controller's ADC diff logic keep working with older versions.

### 2. Add the KSUID algorithm in the `request-id` Plugin

PR: https://github.com/apache/apisix/pull/12573

Contributor: [Crazy-xyr](https://github.com/Crazy-xyr)

This PR replaces the previous request-id generation method with the KSUID (K-Sortable Unique IDentifier) algorithm. KSUIDs are always 27 characters long and are encoded in base62, making them URL-safe. Their key advantage is that they are lexicographically sortable, ensuring they remain in time order even when treated as strings. With 128 bits of randomness, they also provide stronger collision resistance than standard UUIDs.

### 3. Add Fallback Mechanism for Specific Error Codes in `ai-proxy-multi` Plugin

PR: https://github.com/apache/apisix/pull/12571

Contributor: [Revolyssup](https://github.com/Revolyssup)

The `ai-proxy-multi` plugin now retries any request that returns `429` or `5xx`, automatically failing over to the next healthy model endpoint until one succeeds, so more calls finish without surfacing an error to the client.

### 4. Add Latency and Usage in Access log of `ai-proxy` Plugin and Prometheus Metrics

PR: https://github.com/apache/apisix/pull/12518

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR adds latency and token info for the `ai-proxy` plugin in the access log for easy debugging. It also adds Prometheus metrics for AI-related requests and adds two more labels: `request_type` to distinguish between regular requests and AI-related requests; and `llm_model` for the LLM model name forwarded to the upstream LLM service.

### 5. Add New ctx Variable for Requesting LLM Model

PR: https://github.com/apache/apisix/pull/12518

Contributor: [Revolyssup](https://github.com/Revolyssup)

When logging AI requests, the user needs to record the LLM model of client requests that are not modified by the API gateway, so add a new context variable to record this.

## Recommended Blogs

- [360 Built Unified L7 Load Balancer Using Apache APISIX](https://apisix.apache.org/blog/2025/09/03/360-built-unified-l7-load-balancer-with-apisix/)

  360 unifies Layer 7 load balancing using APISIX, gaining VPC, cloud-native, and fine-grained routing in one seamless upgrade.

- [Load Balancing AI/ML API with Apache APISIX](https://apisix.apache.org/blog/2025/07/31/load-balancing-between-ai-ml-api-with-apisix/)

  This blog provides a step-by-step guide to configure Apache APISIX for AI traffic splitting and load balancing between API versions, covering security setup, canary testing, and deployment monitoring.
