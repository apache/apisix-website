---
title: "2025 Monthly Report (December 01 - December 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/12/31/dfvpJ7gF_2025-dec-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including adding nested log format support for logger plugins, and adding protocol validation and deletion protection for stream routes, etc. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From December 1st to December 31st, 18 contributors made 45 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/12/31/JYHrOHwr_2025-dec-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/12/31/BoMJKqrs_2025-dec-new-contributors.webp)

## Feature Highlight

### 1. Add Global Default `path` Property to `file-logger` Plugin Metadata

PR: https://github.com/apache/apisix/pull/12825

Contributor: [TaeyeongKwak](https://github.com/TaeyeongKwak)

This PR introduces a path property to the `file-logger` plugin's metadata, allowing a default log file path to be configured globally via `plugin_metadata`. This default will be used by `file-logger` instances that do not explicitly define their own path in their configuration.

### 2. Add Nested Log Format Support for Logger Plugins

PR: https://github.com/apache/apisix/pull/12697

Contributor: [TaeyeongKwak](https://github.com/TaeyeongKwak)

This PR adds support for nested (hierarchical) data structures in the `log_format` configuration of logger plugins. Previously limited to flat key-value pairs, users can now organize and group log fields more efficiently by defining hierarchical log structures.

### 3. Add Protocol Validation and Deletion Protection for Stream Routes

PR: https://github.com/apache/apisix/pull/12794

Contributor: [yixianOu](https://github.com/yixianOu)

This PR introduces dependency validation and deletion protection for stream routes.

- When creating a subordinate route referencing a `superior_id`, the system now verifies that the superior route exists and that protocols match.
- Implements a `delete_checker` that prevents the removal of any stream route that is currently referenced as a `superior_id` by other routes.
- Adds a new test file `t/admin/stream-routes-subordinate.t` covering creation, protocol mismatch, and deletion‑protection scenarios.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blog

- [Release Apache APISIX Ingress Controller 2.0](https://apisix.apache.org/blog/2025/12/19/apisix-ingress-controller-2-0-release/)

  Apache APISIX Ingress Controller 2.0 is officially released. It delivers comprehensive Gateway API support, flexible multi-data-plane deployment, and etcd-free operation for robust, scalable Kubernetes traffic management.
