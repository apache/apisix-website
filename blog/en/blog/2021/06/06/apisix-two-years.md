---
title: Apache APISIX Open Source 2 Year Anniversary!
author: Ruofei Zhao
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
keywords:
- APISIX
- opensource
description: API gateway Apache APISIX has been open source for two years, during which time health checks, service interruption, service discovery, etc. have been implemented.
tags: [Community]
---

> Apache APISIX is open for 2 years!

<!--truncate-->

Today is June 6, 2021, and on this 666th day [Apache APISIX](https://github.com/apache/apisix) is 2 years old! 🎉

Apache APISIX was open sourced on June 6, 2019, and entered the Apache Incubator in October of the same year, and has become an **Apache top project** in just two years!

Before entering the Apache Incubator, Apache APISIX had just over 20 contributors, and now there are 249 contributors to projects related to Apache APISIX, a 10-fold increase in **contributors** in a year and a half! The Apache APISIX community is also very active, with **249 contributors submitting 2303 PRs as of today, and a new release every month**.

![2019.6.6 ~ 2021.6.6 contributor growth curve](https://static.apiseven.com/202108/1630116210945-cdf0888f-c823-4eae-b404-3b1d6cb1b1e6.png)

In life, when you go to buy airline tickets, swipe Weibo, or buy milk tea, the critical traffic behind it is handled by Apache APISIX. In the past two years, Apache APISIX has been widely used by many enterprises, covering finance, Internet, manufacturing, retail, operators, etc., such as NASA in the US, Digital Factory in the EU, China Airlines, Tencent, Huawei, Weibo, Shell House, China Mobile, Taikang, 360, Nespresso Tea, etc. Click to view [list of users of Apache APISIX](https://github.com/apache/apisix).

**In August 2019, Apache APISIX released its first version 0.6.0**. This release brought many new features: health checks, service fusion, debug mode, distributed tracing, JWT authentication, etc., and a built-in dashboard.

Version **1.0 was released in January 2020 and was the first production release of Apache APISIX.** This version not only supports new features - matching to different upstream services based on header, args, priority, etc. with the same URI - but also improves code stability and documentation, such as adding documentation for custom development plugins, documentation for using the Oauth plugin, documentation for documentation for dashboard compilation, documentation on how to perform a/b testing, documentation on how to enable the MQTT plugin, etc., indicating that Apache APISIX is starting to be used in more and more environments.

**A new release every month, and we mean it!** In October 2020, we released version 2.0. 2.0 migrates from etcd v2 protocol to v3, supports only etcd 3.4 and later, supports adding tags to upstream objects, adds more fields to upstream, routing and other resources, uses interceptors to protect the plugin's routes, supports http and https listening on multiple ports, adds AK/SK (HMAC) authentication plugin, referer-restriction plugin.

**16 days ago, we released APISIX version 2.6!** In this version, new features that have been highly requested are supported, such as: **Writing custom plugins in other languages, custom plugins in Java are now supported, and custom plugins in Go will be supported at the end of this month!** In addition, version 2.6 of ecology has full support for Nacos service discovery, support for configuring DNS resolver for IPv6, and support for modifying the Prometheus default port so that it is no longer exposed to the data-plane port.

Apache APISIX aims to be more than just an API gateway, **Apache APISIX wants to be a Layer 4 and 7 traffic handler and connector in the cloud-native era.** All configurations in Apache APISIX are dynamic, which is important for elastic scaling and multi-cloud deployments in the cloud-native era. We believe that Apache APISIX is the best choice for the cloud-native era. Welcome to the Apache APISIX open source community, and welcome to Apache APISIX!

The development of Apache APISIX cannot be achieved without each and every one of the community members, **Special thanks to the contributors and users of the Apache APISIX community for their contributions to the development of Apache APISIX.**!

![apisix contributors](https://static.apiseven.com/202108/1630468565074-c7e83b82-c40d-4c56-bc66-d1be2acc645b.jpeg)

Apache APISIX is 2 years old now, happy birthday!
