---
title: "Monthly Report (January 27 - February 28)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/02/28/83pU2BtD_feb-monthly-report-cover-en.png
---

> We have recently added some new features within Apache APISIX, which supports the `ai-proxy-multi` plugin and `_meta.pre_function` to execute custom logic before the execution of each phase. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From January 27 to February 28, 14 contributors made 39 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/02/28/JaHy54nf_feb-contributors.png)

![New Contributors List](https://static.api7.ai/uploads/2025/02/28/0jejWHGZ_feb-new-contributors.jpg)

## Recent Feature Highlight

1. [Support `_meta.pre_function` to execute custom logic before execution of each phase](https://github.com/apache/apisix/pull/11793) (Contributor: [Revolyssup](https://github.com/Revolyssup))

Add `pre_function` to the meta of the plugin to allow some personalized code to run before all plugins run. For example, register personalized variables so that these temporary variables can be referenced and used in the plugin.

2. [Support `ai-proxy-multi` Plugin](https://github.com/apache/apisix/pull/11986) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

The `ai-proxy-multi` plugin allows configuring multiple LLM targets for load balancing and retries.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
