---
title: "Monthly Report (December 01 - December 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/12/31/edSe3URN_monthly-report-cover-en.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The main improvements include the addition of supporting configuring response headers when using the `limit-count` plugin and supporting "system" `ssl_trusted_certificate`, among other enhancements. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From December 1 to December 31, 11 contributors made 27 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2024/12/31/npwFTjZH_dec-monthly-report-en.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2024/12/31/SDOtuLWf_dec-new-contributors.jpg)

## Recent Feature Highlights/Improvements

1. [Make Rate-Limiting Response Headers Configurable in `limit-count` Plugin](https://github.com/apache/apisix/pull/11831) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

This PR allows users to configure the names of rate-limiting response headers using plugin metadata when using the `limit-count` plugin.

2. [Support the Configuration of `system` in `ssl_trusted_certificate`](https://github.com/apache/apisix/pull/11809) (Contributor: [Revolyssup](https://github.com/Revolyssup))

With this feature, users can set `system` as the value when configuring `ssl_trusted_certificate`, to use the system-defined CA certificated.

3. [Refactor `workflow` Plugin Registration](https://github.com/apache/apisix/pull/11832) (Contributor: [Revolyssup](https://github.com/Revolyssup))

Current logic requires the table `supported_actions` defined in `workflow.lua` to be changed when any new plugin is added to the `workflow` plugin. With this change, the registration in the table is offloaded to the newly added plugin by implementing the function `workflow_handler()`.

4. [Allow Workflow Configuration without `case`](https://github.com/apache/apisix/pull/11787) (Contributor: [Revolyssup](https://github.com/Revolyssup))

This change makes `case` a non-required field and an absence of `case` will be deemed a default match.

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
