---
title: "Biweekly Report (June 19 - July 05)"
keywords: 
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/03/o1PFlwn0_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E8%8B%B1%E6%96%87.png
---

> We have recently fixed or improved some features, and the summary of the updates is as follows:
> 1. APISIX allows customizing prometheus default bucket
> 2. Fix the problem that body-transformer plugin cannot convert empty tables properly
> 3. Fix the issue that max_kept configuration of the log-rotate plugin does not work when using a custom name
> 4. APISIX Ingress adds annotation to allow rewriting of response headers.
<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

From 6.19 to 7.02, 22 contributors submitted 35 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

We have recently fixed and improved some features, and the summary of the updates is as follows:

1. APISIX now allows customizing Prometheus default bucket.

2. Fixed the problem that `body-transformer` plugin cannot convert empty tables properly.

3. Fixed the issue that `max_kept` configuration of the `log-rotate` plugin does not work when using a custom name.

4. With recently added `annotation`, APISIX Ingress now allows rewriting of response headers.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/07/03/NmhS4JKj_%E8%B4%A1%E7%8C%AE%E8%80%85%E5%90%8D%E5%8D%95.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/07/03/KCxDtAOZ_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5.png)

## Highlights of Recent Features

### Apache APISIX

- [APISIX allows customizing prometheus default bucket](https://github.com/apache/apisix/pull/9673) (Contributor: [jiangfucheng](https://github.com/jiangfucheng))

- [Fix the problem that body-transformer plugin cannot convert empty tables properly](https://github.com/apache/apisix/pull/9669) (Contributor: [kingluo](https://github.com/kingluo))

- [Fix the issue that max_kept configuration of the log-rotate plugin does not work when using a custom name](https://github.com/apache/apisix/pull/9749) (Contributor: [monkeyDluffy6017](https://github.com/monkeyDluffy6017))

### Apache APISIX Ingress

- [APISIX Ingress adds annotation to allow rewriting of response headers](https://github.com/apache/apisix-ingress-controller/pull/1861) (Contributor: [Revolyssup](https://github.com/Revolyssup))

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
