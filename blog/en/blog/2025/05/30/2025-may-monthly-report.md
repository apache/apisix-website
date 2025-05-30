---
title: "2025 Monthly Report (May 01 - May 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/05/30/cQZIKC0l_2025-may-monthly-report-cover-en.webp
---

> Recently, we've introduced several new features, including adding the `lago` plugin, adding the support for incremental API configuration updates in Standalone mode, a health checker for the stream subsystem, and a new Standalone Admin API. For more details, please read this month’s newsletter.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From May 1st to May 30, 8 contributors made 38 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/05/30/0OnqOGTo_may-contributor-list.webp)

## Feature Highlights

### Add Metadata to Resource Schema

PR: https://github.com/apache/apisix/pull/12224

Contributor: [bzp2010](https://github.com/bzp2010)

This PR refactors the resource schema to ensure that user-facing resources include a standardized `metadata` section with `name`, `desc`, and `labels` fields. This improves consistency and helps resolve issues in downstream projects like the embedded dashboard and APISIX's declarative configuration tool (ADC).

### Add `lago` Plugin

PR: https://github.com/apache/apisix/pull/12196

Contributor: [bzp2010](https://github.com/bzp2010)

Add `lago` plugin to allow users to use APISIX as a monetization gateway, allowing them to charge subscribers based on API consumption. This can be applied in AI cloud platforms to charge by consumed tokens—similar to OpenAI and Deepseek—or to charge for access to specific APIs, such as monetized weather data services.

### Support Revision in API-Driven Standalone Mode like etcd

PR: https://github.com/apache/apisix/pull/12200

Contributor: [bzp2010](https://github.com/bzp2010)

In standalone mode, APISIX's Admin API requires clients to fetch the entire configuration on every sync. As configurations grow or change frequently, this full-sync mechanism causes excessive network traffic and latency when applying updates. Additionally, frequent resource changes trigger a complete rebuild of the internal radixtree, degrading route lookup performance under high churn. In service discovery scenarios where upstreams are frequently updated, we aim to update only upstream data without impacting other resources.

### Support Revision in API-Driven Standalone Mode like etcd

PR: https://github.com/apache/apisix/pull/12200

Contributor: [AlinsRan](https://github.com/AlinsRan)

In standalone mode, APISIX's Admin API requires clients to fetch the entire configuration on every sync. As configurations grow or change frequently, this full-sync mechanism causes excessive network traffic and latency when applying updates. Additionally, frequent resource changes trigger a complete rebuild of the internal radixtree, degrading route lookup performance under high churn. In service discovery scenarios where upstreams are frequently updated, we aim to update only upstream data without impacting other resources.

### Support Health Checker for Stream Subsystem

PR: https://github.com/apache/apisix/pull/12180

Contributor: [nic-6443](https://github.com/nic-6443)

This PR added support for the health checker for the stream subsystem.

### Add Standalone Admin API

PR: https://github.com/apache/apisix/pull/12179

Contributor: [bzp2010](https://github.com/bzp2010)

This PR introduces a dedicated Admin API for Standalone mode, enabling users to update in-memory configurations without relying on the file system, further enhancing statelessness. Configurations can be submitted via HTTP PUT in JSON or YAML format. This feature supports use cases like the Ingress Controller by removing the dependency on static configuration files.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blogs

- [APISIX Gateway Practices in Tencent Games](https://apisix.apache.org/blog/2025/05/07/apisix-gateway-practice-in-tencent-timi/)

  This article details how Tencent Games' Timi Studio Group customized its API gateway based on APISIX. It played a critical role in meeting strict compliance requirements for overseas operations, reducing development and operations costs, and improving system flexibility and reliability.

- [APISIX Gateway Practices in Honor's Massive Business](https://apisix.apache.org/blog/2025/04/27/apisix-honor-gateway-practice-in-massive-business/)

  This article explains in detail how Honor adopted APISIX as its API gateway. Since introducing APISIX in 2021, Honor has continuously optimized and extended the platform to build a high-performance, scalable, and reliable gateway that effectively supports its rapidly growing business at scale.

- [From stdio to HTTP SSE: Host Your MCP Server with APISIX API Gateway](https://apisix.apache.org/blog/2025/04/21/host-mcp-server-with-api-gateway/)

  Discover how the Apache APISIX `mcp-bridge` plugin seamlessly converts stdio-based MCP servers to scalable HTTP SSE services.
