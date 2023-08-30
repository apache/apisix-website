---
title: "Biweekly Report (August 14 - August 27)"
keywords: 
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/08/28/riVgERes_%E8%8B%B1%E6%96%87%E5%A4%B4%E5%9B%BE.png
---

> We have recently made fixes and improvements to certain features of Apache APISIX and APISIX Ingress Controller. These include adding proxy configuration item for `openid-connect` plugin, fixing DNS resolution issue for tencent-cloud-cls, adding pass host configuration capability for ApisixUpstream resource, upgrading Go toolchain to v1.20, etc. For more details, please refer to the biweekly report.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

From 8.14 to 8.27, 15 contributors submitted 32 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

We have recently fixed and improved some features, and the summary of the updates is as follows:

1. Add proxy configuration item for `openid-connect` plugin

2. Fix DNS resolution issue for tencent-cloud-cls

3. Admin-API supports api schema validation

4. `WASM` plugin supports passing native JSON data structure

5. Add pass host configuration capability for ApisixUpstream resource

6. Upgrade Go toolchain to v1.20

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/08/28/tdXTURvu_%E5%85%A8%E9%83%A8%E8%B4%A1%E7%8C%AE%E8%80%85.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/08/28/J0at5ZSF_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85.png)

## Highlights of Recent Features

### Apache APISIX

- [Add proxy configuration item for `openid-connect` plugin](https://github.com/apache/apisix/pull/9948) (Contributor: [darkSheep404](https://github.com/darkSheep404))

- [Fix DNS resolution issue for tencent-cloud-cls](https://github.com/apache/apisix/pull/9843) (Contributor: [jiangfucheng]((https://github.com/jiangfucheng))

- [Admin-API supports api schema validation](https://github.com/apache/apisix/pull/10065) (Contributor: [kingluo](https://github.com/kingluo))

- [`WASM` plugin supports passing native JSON data structure](https://github.com/apache/apisix/pull/10072) (Contributor: [Sn0rt](https://github.com/Sn0rt))

### APISIX Ingress Controller

- [Add pass host configuration capability for ApisixUpstream resource](https://github.com/apache/apisix-ingress-controller/pull/1889) (Contributor: [ikatlinsky](https://github.com/ikatlinsky))

- [Upgrade Go toolchain to v1.20](https://github.com/apache/apisix-ingress-controller/pull/1788) (Contributor: [WVenus](https://github.com/WVenus))

## Recent Blog Recommendations

- [Rate Limit Your APIs With Apache APISIX](https://apisix.apache.org/blog/2023/08/14/rate-limit/)
  
  In this article, we will look at examples of how we can use the rate limiting plugins in APISIX. You can find the complete configuration files and instructions to deploy for this article in this repository.

- [Release Apache APISIX 3.2.2](https://apisix.apache.org/blog/2023/07/23/release-apache-apisix-3.2.2/)

  We are pleased to present Apache APISIX 3.2.2 with a list of fixes and optimizations.
  
- [Creating a Custom Data Mask Plugin](https://apisix.apache.org/blog/2023/07/20/data-mask-plugin/)

  In this article, we will look at how you can create and run this plugin from the ground up while learning some basics of APISIX plugin development in Lua.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
