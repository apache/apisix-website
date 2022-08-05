---
title: Biweekly Report (Mar 1st - Mar 14th)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: In the past two weeks, the Apache APISIX community has added many functions about plugins such as openid-connect, authz-keycloak, cors, csrf, and jwt-auth.
tags: [Community]
---

> From March 1st to  March 14th, 44 contributors submitted 131 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1647397912415-95b2e4c4-02f1-4cd7-8cfa-c53346e8eb42.jpg)

![New Contributors](https://static.apiseven.com/202108/1647397912458-f3a7d62e-0b03-45ef-a492-7bc59ac8cf33.png)

## Good first issue

### Issue #6344

**Link**: https://github.com/apache/apisix/issues/6344

**Issue description**:

As a User, I want to use `forward-auth` plugin but the plugin cann't support request body sent to authorization server to authentication form request body so that can you plan to do it?

### Issue #6197

**Link**: https://github.com/apache/apisix/issues/6197

**Issue description**:

How to current limit both in minutes and day by using plugin `limit-count`?

Currently, the plugin `limit-count` only Set a traffic limiting mode, Second or minute,If I want to set seconds and minutes at the same time,plugin not support,Because what you set later overwrites what you set earlier,Is there a better solution to this problem?thank you

## Highlights of Recent Features

- [Support post_logout_redirect_uri config in `openid-connect` plugin](https://github.com/apache/apisix/pull/6455)(Contributor: [starsz](https://github.com/starsz))

- [`ext-plugin` supports rewriting response headers](https://github.com/apache/apisix/pull/6426)(Contributor: [rampagecong](https://github.com/rampagecong))

- [`proxy-mirror` plugin supports custom paths](https://github.com/apache/apisix/pull/6506)（Contributor: [spacewander](https://github.com/spacewander))

- [Wasm supports getting response body](https://github.com/apache/apisix/pull/6514)(Contributor: [spacewander](https://github.com/spacewander))

- [Support to run the rewrite phase for newly added plugins in consumer](https://github.com/apache/apisix/pull/6502)(Contributor: [tzssangglass](https://github.com/tzssangglass))

- [Support for reading environment variables from yaml configuration files](https://github.com/apache/apisix/pull/6505)(Contributor: [wilson-1024](https://github.com/wilson-1024))

- [`authz-keycloak` plugin supports redirect not authorized user](https://github.com/apache/apisix/pull/6485)（Contributor: [oil-oil](https://github.com/oil-oil))

- [`cors` plugin supports setting allow origins by plugin metadata](https://github.com/apache/apisix/pull/6546)(Contributor: [Gary-Airwallex](https://github.com/Gary-Airwallex))

- [`CSRF` plugin supports checking whether the token has expired](https://github.com/apache/apisix/pull/6201)(Contributor: [Baoyuantop](https://github.com/Baoyuantop))

- [`jwt-auth` plugin supports custom parameters](https://github.com/apache/apisix/pull/6561)(Contributor: [liangliang4ward](https://github.com/liangliang4ward))

- [`proxy mirror` plugin supports setting the timeout](https://github.com/apache/apisix/pull/6562)（Contributor: [Gerrard-YNWA](https://github.com/Gerrard-YNWA))

- [APISIX Dashboard supports loading specified configuration files through environment variables](https://github.com/apache/apisix-dashboard/pull/2293)(Contributor: [bzp2010](https://github.com/bzp2010) and [kevinw66](https://github.com/kevinw66))

- [APISIX Dashboard supports UI configuration protocol buffers](https://github.com/apache/apisix-dashboard/pull/2320)(Contributor: [oil-oil](https://github.com/oil-oil))

- [APISIX Dashboard routing advanced matching support processing "!" inverse operator](https://github.com/apache/apisix-dashboard/pull/2364)(Contributor: [SkyeYoung](https://github.com/SkyeYoung))

- [APISIX Dashboard supports detailed configuration of `cors`](https://github.com/apache/apisix-dashboard/pull/2341)（Contributor: [zaunist](https://github.com/zaunist))

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [How to Integrate API Gateway with Eureka?](https://apisix.apache.org/blog/2022/03/05/apisix-integration-eureka-service-discovery)

  This article describes how to enable Eureka as a service discovery in the API gateway Apache APISIX and how to use diagnostic tools to find problems in the link.

- [Making It Simple, Apache APISIX Integrates ClickHouse to Improve Logging Efficiency](https://apisix.apache.org/blog/2022/03/04/apigateway-clickhouse-makes-logging-easier)

  This article describes how community contributor Zhendong Qi contributed clickhouse-logger to Apache APISIX and how he used the plugin to simplify the business architecture and improve the efficiency of logging.

- [Apache APISIX and CoreDNS open new doors for service discovery](https://apisix.apache.org/blog/2022/03/04/apisix-uses-coredns-enable-service-discovery)

  As a cloud native API gateway, Apache APISIX also integrates multiple service discovery capabilities. This article will show you how to configure CoreDNS in Apache APISIX.

- [How to Use Gitpod to Develop API Gateway?](https://apisix.apache.org/blog/2022/03/03/develop-apisix-with-gitpod)

  This article introduces the open source cloud IDE product - Gitpod, and demonstrates how to use Gitpod to develop API gateway Apache APISIX and solutions of common problems.
