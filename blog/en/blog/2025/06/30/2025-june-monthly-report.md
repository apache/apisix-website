---
title: "2025 Monthly Report (June 01 - June 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/06/30/hNrgfyse_june-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including adding devcontainer support, enhancing Admin API filter, adding `headers` attribute for `loki-logger` plugin, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From June 1st to June 30, 17 contributors made 86 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/06/30/ctN7FHKp_june-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/06/30/VDMkGEcj_june-new-contributors.webp)

## Feature Highlights

### 1. Add devcontainer support

PR: https://github.com/apache/apisix/pull/11765

Contributor: [bzp2010](https://github.com/bzp2010)

This PR adds devcontainer support for Linux, Windows (WSL2), and macOS across amd64/arm64 architectures, enabling seamless integration with mainstream development environments and ready-to-use functionality. Additionally, etcd is maintained using docker-compose and accessible on the local loopback.

### 2. Add `headers` attribute for `loki-logger` plugin

PR: https://github.com/apache/apisix/pull/11420

Contributor: [slow-groovin](https://github.com/slow-groovin)

This PR adds a new headers attribute `authorization` for the `loki-logger` plugin to provide an HTTP authorization header when using non-local Loki services.

### 3. Add `max_pending_entries` attribute to batch processor

PR: https://github.com/apache/apisix/pull/12338

Contributor: [Revolyssup](https://github.com/Revolyssup)

This feature introduces a new `max_pending_entries` option to the batch processor to prevent memory spikes when the log server is slow or unresponsive. This option allows dropping new entries if too many pending callbacks are waiting to be processed.

### 4. Enhance Admin API filtering

PR: https://github.com/apache/apisix/pull/12291

Contributor: [bzp2010](https://github.com/bzp2010)

The Admin API now supports filtering routes and stream routes by `service_id` and `upstream_id`, making it easier to query and manage related resources, especially for the APISIX Dashboard project.

### 5. Add apisix dashboard to dev image

PR: https://github.com/apache/apisix/pull/12369

Contributor: [bzp2010](https://github.com/bzp2010)

This PR builds the APISIX dashboard and puts it into the dev image.

### 6. Add embedded APISIX dashboard UI

PR: https://github.com/apache/apisix/pull/12276

Contributor: [bzp2010](https://github.com/bzp2010)

This PR adds a new embedded UI to APISIX as part of the Apache APISIX Dashboard Enhancement Plan.

### 7. Add `apisix:dev` docker image triggering workflow

PR: https://github.com/apache/apisix/pull/12369

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

As a part of the APISIX Dashboard Enhancement plan, this PR adds a workflow, which triggers the building and pushing (to the master branch only) of the `apisix:dev` Docker image.

Moving image-building files from apisix-docker to the main apisix repo improves maintenance and ensures the latest code is readily available for development and testing.

### 8. Support JSON format in Standalone mode

PR: https://github.com/apache/apisix/pull/12333

Contributor: [SkyeYoung](https://github.com/SkyeYoung)

This update introduces JSON format support for configuration in standalone file mode. It extends `apisix/core/config_yaml.lua`, enabling JSON compatibility without modifying the existing YAML configuration provider. This approach lays the groundwork for supporting additional formats like TOML in the future. JSON is also faster to parse compared to YAML.

### 9. Allow more characters in `credential_id` for Standalone mode

PR: https://github.com/apache/apisix/pull/12295

Contributor: [AlinsRan](https://github.com/AlinsRan)

This update expands the allowed characters in credential_id for the API-driven mode in standalone deployments. Now, credential_id can include underscores (_), periods (.), and short hyphens (-), enhancing flexibility for credential naming.

### 10. Support dash (-) in consumer usernames

PR: https://github.com/apache/apisix/pull/12296

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds support in APISIX for the same naming rules, aligning with the APISIX Ingress Controller's approach of isolating resources via namespace, such as using a namespace-username format for consumer names.

### 11. Expose APISIX version in Prometheus `node_info` metric

PR: https://github.com/apache/apisix/pull/12369

Contributor: [flearc](https://github.com/flearc)

This PR enhances the Prometheus `node_info` metric by adding a version label to expose the current APISIX version, improving observability and version tracking.

### 12. Warn on etcd write operations in decoupled `data_plane` mode

PR: https://github.com/apache/apisix/pull/12241

Contributor: [LiteSun](https://github.com/LiteSun)

When APISIX is running in the decoupled mode as the data plane instance, it now logs warnings if the data plane instance performs etcd write operations via `core.etcd` functions or the CLI. Writes will be deprecated in future releases, where such operations will be disallowed.

### 13. Replace events library with shdict

PR: https://github.com/apache/apisix/pull/12353

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR switches the Nacos discovery mechanism from the `lua-resty-events` library to a shared dictionary (shdict). This change addresses previous issues where not all workers received events reliably, causing inconsistencies. Now, a privileged agent solely handles data fetching from Nacos and writing to the shdict, while all workers read from the shdict, ensuring consistent data access.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blogs

- [APISIX Gateway Practices in Tencent Games](https://apisix.apache.org/blog/2025/05/07/apisix-gateway-practice-in-tencent-timi/)

  This article details how Tencent Games' Timi Studio Group customized its API gateway based on APISIX. It played a critical role in meeting strict compliance requirements for overseas operations, reducing development and operations costs, and improving system flexibility and reliability.

- [APISIX Gateway Practices in Honor's Massive Business](https://apisix.apache.org/blog/2025/04/27/apisix-honor-gateway-practice-in-massive-business/)

  This article explains in detail how Honor adopted APISIX as its API gateway. Since introducing APISIX in 2021, Honor has continuously optimized and extended the platform to build a high-performance, scalable, and reliable gateway that effectively supports its rapidly growing business at scale.

- [From stdio to HTTP SSE: Host Your MCP Server with APISIX API Gateway](https://apisix.apache.org/blog/2025/04/21/host-mcp-server-with-api-gateway/)

  Discover how the Apache APISIX `mcp-bridge` plugin seamlessly converts stdio-based MCP servers to scalable HTTP SSE services.
