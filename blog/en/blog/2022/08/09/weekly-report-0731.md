---
title: Biweekly Report (Jul 16 - Jul 31)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
description: The cloud native API gateway Apache APISIX has added functions such as supporting custom plugin priorities and checking plugin_metadata in configuration files in the past two weeks.
tags: [Community]
image: https://static.apiseven.com/2022/weeklyreport/0809/biweekly-2022.7.16-2022.7.31-en.png
---

> From Jul 16th to Jul 31th, 28 contributors submitted 93 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/2022/weeklyreport/0809/4.png)

![New Contributors](https://static.apiseven.com/2022/weeklyreport/0809/3.png)

## Good first issue

### Issue #7538

**Link**: https://github.com/apache/apisix/issues/7538

**Description**: We currently hardcore the APISIX version in the blog or doc, which has misled some newcomers when they read an old blog version. This also makes updating the latest APISIX version in the doc harder, because we need to change several places.

Let's add a static file containing the version numbers, and provide a simple one-liner command to get the version number in the doc. The one-liner should be very simple so that we can copy & paste it everywhere.

## Highlights of Recent Features

- [Create use_real_request_uri_unsafe option in `proxy-rewrite` plugin](https://github.com/apache/apisix/pull/7401)（Contributor: [ilteriseroglu-ty](https://github.com/ilteriseroglu-ty)）

- [Add ngx.shared.DICT status in `prometheus` plugin](https://github.com/apache/apisix/pull/7412)（Contributor: [ccxhwmy](https://github.com/ccxhwmy)）

- [Supports dynamic control of whether plugins are running](https://github.com/apache/apisix/pull/7453)（Contributor: [soulbird](https://github.com/soulbird)）

- [Support setting clock skew for verifying in `jwt-auth` plugin](https://github.com/apache/apisix/pull/7500)（Contributor: [tzssangglass](https://github.com/tzssangglass)）

- [Add plugin_metadata into control API](https://github.com/apache/apisix/pull/7514)（Contributor: [kingluo](https://github.com/kingluo)）

- [Support multi clickhouse endpoints in `clickhouse-logger` plugin](https://github.com/apache/apisix/pull/7517)（Contributor: [zhendongcmss](https://github.com/zhendongcmss)）

## Recent Blog Recommendations

- [Release Apache APISIX Ingress v1.5-rc1](https://apisix.apache.org/blog/2022/08/05/apisix-ingress-1.5rc1-release/)

    Apache APISIX Ingress Controller v1.5-rc1 is officially released. Bring API Version upgrades, Gateway API support, and updates to Ingress resources.

- [Release Apache APISIX 2.15](https://apisix.apache.org/blog/2022/07/29/release-apache-apisix-2.15/)

    Apache APISIX 2.15 is officially released! You can customize plugin priority and whether the plugin is executed, custom error response, and indicators to support the monitoring of four layers of traffic.

- [Why do you need Apache APISIX when you have NGINX and Kong?](https://apisix.apache.org/blog/2022/07/30/why-we-need-apache-apisix/)

    This article describes the history of the open source API Gateway Apache APISIX architecture's evolution and compares the advantages of the two frameworks, Apache APISIX and NGINX.
