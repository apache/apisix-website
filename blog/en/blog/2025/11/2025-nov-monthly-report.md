---
title: "2025 Monthly Report (November 01 - November 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/12/05/wal292Og_2025-nov-monthly-report-cover-en.webp
---

> Recently, we've introduced a new feature, which is adding a validate API to standalone mode. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From November 1st to November 30th, 15 contributors made 41 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/12/05/SWnnfZpg_2025-nov--contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/12/05/ksDzwGaH_2025-nov-new-contributors.webp)

## Feature Highlight

### Add Validate API to Standalone Mode

PR: https://github.com/apache/apisix/pull/12718

Contributor: [Revolyssup](https://github.com/Revolyssup)

This PR introduces a validate API to standalone mode. The validate API only validates configuration input, but does not save it to memory. It allows the APISIX Ingress Controller to verify the CRD-converted plugin configurations before applying them, preventing runtime failures.

## Recommended Blogs

- [Release Apache APISIX 3.14.1](https://apisix.apache.org/blog/2025/10/17/release-apache-apisix-3.14.1/)

  We are glad to release Apache APISIX 3.14.1 with a bug fix to improve user experiences.

- [Release Apache APISIX 3.14.0](https://apisix.apache.org/blog/2025/10/10/release-apache-apisix-3.14.0/)

  This release introduces several new features, including new AI proxy variables for logging, support for AI/ML API providers in AI plugins, route matching based on the request body, support for the KSUID algorithm in the request-id plugin, and more.
