---
title: Biweekly Report (Jun 16 - Jun 30)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.
tags: [Community]
---

> From Jun 16th to Jun 30th, 29 contributors submitted 98 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/2022/blog/0707/4.jpg)

![New Contributors](https://static.apiseven.com/2022/blog/0707/2.png)

## Good first issue

### Issue #1075

**Link**: https://github.com/apache/apisix-ingress-controller/issues/1075

**Description**: Currently, we will use the latest version of APISIX for e2e testing to ensure the compatibility of APISIX Ingress and APISIX.

But we don't know about some of the latest changes in APISIX. I suggest we add a scheduled job to use `apisix:dev` image for regression testing.

We used to use `apisix:dev` for e2e testing by default, but this way would affect our development experience, and sometimes we found that e2e failed, but it was actually just due to some changes in APISIX.

## Highlights of Recent Features

- [Export some importent params for kafka-client](https://github.com/apache/apisix/pull/7266)（Contributor: [mikawudi](https://github.com/mikawudi)）

- [Allow users to specify plugin execution priority](https://github.com/apache/apisix/pull/7273)（Contributor: [tzssangglass](https://github.com/tzssangglass)）

- [Support for checking the plugin_metadata in the configuration file](https://github.com/apache/apisix/pull/7315)（Contributor: [fesily](https://github.com/fesily)）

## Recent Blog Recommendations

- [Getting Started with APISIX Test Cases](https://apisix.apache.org/blog/2022/06/27/getting-start-with-apisix-test-cases)

This article mainly introduces how to write test cases for Apache APISIX API Gateway.

- [APISIX integrates with Ory Hydra](https://apisix.apache.org/blog/2022/07/04/apisix-integrates-with-hydra)

This article describes how Apache APISIX integrates with Ory Hydra to implement centralized authentication.

- [Use Keycloak with API Gateway to secure APIs](https://apisix.apache.org/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis)

This article describes how Apache APISIX integrates with Keycloak (OpenID Connect Provider) to secure your APIs.

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.
