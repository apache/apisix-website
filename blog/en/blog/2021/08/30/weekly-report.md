---
title: Weekly Report (Aug 23 - Aug 29)
keywords:
- APISIX
- API Gateway
- Community Weekly
- Contributor
- Good first issue
description: The Apache APISIX Community Weekly Newsletter hopes to help community members better understand the weekly progress of the Apache APISIX community.
tags: [Community]
---

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"The Apache APISIX Community Weekly Newsletter hopes to help community members better grasp the weekly progress of the Apache APISIX community and facilitate your participation in the Apache APISIX community.

We've also put together some issues for those new to the community! If you are interested, don't miss them!

## Contributor statistics

![Number of new contributors](https://static.apiseven.com/202108/1630393952402-4965d35c-6b05-4f71-9966-2fea7f7939d3.JPG)

![New contributors this week](https://static.apiseven.com/202108/1630393952406-9f61c39b-ea9e-4451-bd26-ab845a32a222.JPG)

## Good first issue

### Issue #4241

**Link**: https://github.com/apache/apisix/issues/4241

**Problem Description**: Now when adding the jwt-auth plugin to a service/route, the jwt token does not contain a "key" declaration.

```shell
{
  "iss": "http://127.0.0.1",
  "client_id": "application1",
  "sub": "1234567890",
  "iat": 1516239022
}
```

![Screenshot of issue description](https://static.apiseven.com/202108/1630393952407-b6a26364-6c36-47f6-82c2-81514c31f20b.PNG)

### Issue #4441

**Link**: [Issue #4441](https://github.com/apache/apisix/issues/4441)

**Issue Description**: Now APISIX stream_routes parameter "remote_addr" only support single ip, need to support multiple ip or match rule like "192.168.0.0/16", like http routing parameter "remote_addr".

### Issue #3601

**Link**: [Issue #3601](https://github.com/apache/apisix/issues/3601)

**Issue Description**: Currently APISIX only has unit tests for request-response gRPC proxies, and no tests related to streaming gRPC. Need to add test cases for streaming gRPC to it.

### Issue #3931

**Link**: [Issue #3931](https://github.com/apache/apisix/issues/3931)

**Issue Description**: http_to_https in the redirect plugin lacks curl tests, need to add curl tests for http_to_https in the redirect plugin and update the documentation [Apache APISIX redirect plugin](http://apisix.apache.org/docs/apisix/plugins/redirect).

## Feature highlights of the week

- uri-blocker support for ignoring case when matching request URIs
  - **Related PR**: https://github.com/apache/apisix/pull/4868
  - **Contributor**: [okaybase](https://github.com/okaybase)

- kafka-logger Support for configuring acks parameters for kafka producers
  - **Related PR**: https://github.com/apache/apisix/pull/4878
  - **Contributors**: [okaybase](https://github.com/okaybase)

- kafka-logger supports configuring the cluster name parameter
  - **Related PR**: https://github.com/apache/apisix/pull/4876
  - **contributor**: [tzssangglass](https://github.com/tzssangglass)

- referer-restriction Support for configuring blacklist
  - **Related PR**: https://github.com/apache/apisix/pull/4916
  - **Contributor**: [okaybase](https://github.com/okaybase)

## Recommended blog posts of the week

- [Centralized Authentication with the OpenID Connect Plugin for Apache APISIX](https://apisix.apache.org/blog/2021/08/25/Using-the-Apache-APISIX-OpenID-Connect-Plugin-for-Centralized-Authentication/): Apache APISIX is a dynamic, real-time, high-performance API gateway that provides rich traffic management features such as load balancing, dynamic upstream, canary release, service meltdown, authentication, observability, etc. Apache APISIX not only supports plug-in dynamic changes and Apache APISIX's OpenID Connect plug-in supports OpenID, which allows users to replace authentication from traditional authentication mode to centralized authentication mode.

- [Why did APISIX choose the Nginx + Lua technology stack?](https://apisix.apache.org/blog/2021/08/25/Why-Apache-APISIX-chose-Nginx-and-Lua): Provides the historical background and advantages of the Nginx + Lua technology stack chosen by APISIX, noting that " High performance + flexibility" is what makes APISIX stand out from other gateways.

- [Apache APISIX 2.9 Released with More New Features!](https://apisix.apache.org/blog/2021/08/27/release-apache-apisix-2.9/): Apache APISIX version 2.9 is released! With 30+ developers, 100+ PR submissions, 2 new features, and improved support for plugins, find out what's new in Apache APISIX 2.9!
