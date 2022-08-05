---
title: Weekly Report (Sep 1 - Sep 14)
keywords:
- Apache APISIX
- Weekly Report
- Contributor
- APISIX
- API Gateway
- Apache
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community.
tags: [Community]
---

> From 11.1 to 11.14, 28 contributors submitted 114 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1636940255460-0c2ab16c-93f9-490a-ab89-89f057b2fa1c.png)

![New Contributors](https://static.apiseven.com/202108/1636942793677-0f64e00c-248c-4fd1-9cb4-ba059591e205.png)

## Good first issue

### Issue #5400

**Link**: https://github.com/apache/apisix/issues/5400

**Issue description**: The HTTP logs for Layer 7 are stored in acccess.log, so how does the Layer 4 proxy stream route enable logging and customize the log path? Traditionally, OpenResty can be implemented.

### Issue #5417

**Link**: https://github.com/apache/apisix/issues/5417

**Issue description**:

Currently, Apache APISIX will generate an id while initializing if the user doesn't specify one, and it relies on the [lua-resty-jit-uuid](https://github.com/thibaultcha/lua-resty-jit-uuid) library but without an explicit seed.

```Lua
uuid.seed()
 apisix_uid = uuid.generate_v4()
 log.notice("not found apisix uid, generate a new one: ", apisix_uid)
```

While the jit-uuid library creates the seed by the process id and the time in ngx_lua context.

```Lua
        if ngx then
            seed = ngx.time() + ngx.worker.pid()
```

However, in a containerized environment, the process id (the master process) might be the same, i.e. the No. 1 process, also, if users try to deploy Apache APISIX clusters on Kubernetes through the Deployment resource, the time might be the same for several Pods, since ngx.time doesn't have enough precisions (only at milliseconds level). so the generated apisix id might be duplicated, and if the id is critical, this may cause some fatal problems in the business scenarios.

## Highlights of Recent Features

- [APISIX support for installation on Arch Linux](https://github.com/apache/apisix/pull/5350)（Contributor: [rapiz1](https://github.com/rapiz1)）

- [The APISIX limit-conn plugin supports multiple variables as key](https://github.com/apache/apisix/pull/5354)（Contributor: [Xunzhuo](https://github.com/Xunzhuo)）

- [The APISIX limit-count plugin supports multiple variables as key](https://github.com/apache/apisix/pull/5378)（Contributor: [Xunzhuo](https://github.com/Xunzhuo)）

- [APISIX Support for POST form as matching conditions in advanced matching](https://github.com/apache/apisix/pull/5409)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [APISIX adds datadog plugin for metrics collection](https://github.com/apache/apisix/pull/5372)（Contributor: [bisakhmondal](https://github.com/bisakhmondal)）

- [APISIX adds skywalking logger plugin to push access Log data to SkyWalking OAP server](https://github.com/apache/apisix/pull/5478)（Contributor: [dmsolr](https://github.com/dmsolr)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [How Apache APISIX protects Airwallex data sovereignty through the gateway layer](https://apisix.apache.org/blog/2021/11/03/airwallex-usercase)：

  This article will bring you about how Airwallex uses Apache APISIX for gateway layer deployment to strengthen the construction of data sovereignty.

- [The observability of Apache APISIX](https://apisix.apache.org/blog/2021/11/04/skywalking)：

  This article introduces the observability capabilities of Apache APISIX and how to improve the observability capabilities of Apache APISIX through Apache SkyWalking.

- [Cloud Monitoring with Datadog in Apache APISIX](https://apisix.apache.org/blog/2021/11/12/apisix-datadog)：

  Apache APISIX recently released a new plugin: [APISIX-Datadog](https://apisix.apache.org/docs/apisix/next/plugins/datadog/), to provide a deeper integration with Datadog. This article introduces the APISIX-Datadog Plugin and its capabilities.
