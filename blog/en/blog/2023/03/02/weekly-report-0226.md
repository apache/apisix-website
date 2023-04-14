---
title: Biweekly Report (Feb 13 - Feb 26)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The cloud-native API gateway Apache APISIX has added functions such as enabling opentelemetry plugin to support https upstream and adding 'range_id' algorithm for 'request-id' plugin.
tags: [Community]
image: https://static.apiseven.com/uploads/2023/03/01/8dHeqsLZ_%E9%A3%9E%E4%B9%A620230301-134627.png
---

> From 2.13 to 2.26, 23 contributors submitted 51 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.

We have also sorted out some issues for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2023/03/02/EKeV5LO5_1280X1280.PNG)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2023/03/02/Gs550zSG_06b436c4-d10b-47d0-b610-cc9325a913.png)

## Good First Issues

### Issue #8772

**Link:** [https://github.com/apache/apisix/issues/8772](https://github.com/apache/apisix/issues/8772)

**Description:** Set validation on custom claims in OIDC auth, so that users can restrict access to the backend based on that rule.

### Issue #1075

**Link:** [https://github.com/apache/apisix-ingress-controller/issues/1075](https://github.com/apache/apisix-ingress-controller/issues/1075)

**Description:** Add regression tests using `apisix:dev` for APISIX Ingress to detect compatibility issues with the latest APISIX changes as early as possible.

## Highlights of Recent Features

- [`opentelemetry` plugin supports https upstream](https://github.com/apache/apisix/pull/8823) (Contributor: [yangxikun](https://github.com/yangxikun))

- [Add head method support to Admin API](https://github.com/apache/apisix/pull/8752) (Contributor: [An-DJ](https://github.com/An-DJ))

- [Stream subsystem support tars service discovery](https://github.com/apache/apisix/pull/8826) (Contributor: [ronething](https://github.com/ronething))

- [Add 'range_id' algorithm for 'request-id' plugin](https://github.com/apache/apisix/pull/8790) (Contributor: [jiangfucheng](https://github.com/jiangfucheng))

- [Use env var for `vault token`](https://github.com/apache/apisix/pull/8866) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

## Recent Blog Recommendations

- [Accessing APISIX-Dashboard from Everywhere with Keycloak Authentication](https://apisix.apache.org/blog/2023/01/02/accessing_apisix-dashboard_from_everywhere_with_keycloak_authentication/)
This guest blog describes how to setup an external access to apisix-dashboard protecting the URL with authentication managed by a keycloak server.

- [How to Integrate API Gateway and Consul? Not Consul K/V](https://apisix.apache.org/blog/2023/01/18/consul-with-apisix/)
Apache APISIX supports the Consul service discovery registry. This article will walk you through the process of implementing service discovery and service registry in Apache APISIX.

- [Securing Admin Access to Apache APISIX](https://apisix.apache.org/blog/2023/02/09/secure-apisix-admin/)
In this short blog post, a couple of ways is listed to secure your Apache APISIX admin access.

A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience.
