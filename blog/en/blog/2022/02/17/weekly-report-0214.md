---
title: Biweekly Report (Feb 1 - Feb 14)
keywords:
- Apache APISIX
- API Gateway
- Weekly Report
- Contributor
- OpenTelemetry
- Apache
description: The cloud-native API gateway Apache APISIX has supported plugins such as csrf, file-logger, public-api, opentelemetry, and logging in the past two weeks.
tags: [Community]
---

> From 2.1 to 2.14, 25 contributors submitted 55 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX. It is your selfless contribution to make the Apache APISIX project better!

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1644998110059-61e68900-b2cc-442d-a20e-a3b5dfbd072d.png)

![New Contributors](https://static.apiseven.com/202108/1644998110081-153dca10-ef36-47c7-8f99-e603af4a274d.png)

## Good first issue

### Issue #6197

**Link**: https://github.com/apache/apisix/issues/6197

**Issue description**:

How to current limit both in minutes and day by using plugin limit-count?

Current, the plugin `limit-count` only Set a traffic limiting mode, second or minute. If I want to set seconds and minutes at the same time, plugin not support because what you set later will overwrite what you set earlier. Is there a better solution to this problem?

### Issue #6265

**Link**: https://github.com/apache/apisix/issues/6265

**Issue description**:

The test case in [t/core/utils.t](https://github.com/apache/apisix/blob/ec0fc2ceaf04a20b0bd0ebdaad67296a1d3f621c/t/core/utils.t) currently has some code errors, such as:

```Lua
         content_by_lua_block {
             local core = require("apisix.core")
             local resolvers = {"8.8.8.8"}
             core.utils.set_resolver(resolvers)
             local ip_info, err = core.utils.dns_parse("github.com")
             if not ip_info then
                 core.log.error("failed to parse domain: ", host, ", error: ",err)
             end
             ngx.say(require("toolkit.json").encode(ip_info))
         }
```

The variable `host` is a `nil` when the code is executed here (which may never happened).

## Highlights of Recent Features

- [Supports to logging apisix_latency and upstream_latency](https://github.com/apache/apisix/pull/6063)（Contributor: [jagerzhang](https://github.com/jagerzhang)）

- [Add CSRF plugin](https://github.com/apache/apisix/pull/5727)（Contributor: [Baoyuantop](https://github.com/Baoyuantop)）

- [Add file-logger plugin](https://github.com/apache/apisix/pull/5831)（Contributor: [guoqqqi](https://github.com/guoqqqi)）

- [Add public-api plugin](https://github.com/apache/apisix/pull/6145)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [Add opentelemetry plugin](https://github.com/apache/apisix/pull/6119)（Contributor: [yangxikun](https://github.com/yangxikun)）

- [Add loggly plugin](https://github.com/apache/apisix/pull/6113)（Contributor: [bisakhmondal](https://github.com/bisakhmondal)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Integrating Splunk HTTP Event Collector with Apache APISIX](https://apisix.apache.org/blog/2022/02/10/apisix-splunk-integration)：

  This article explains how to configure and use the Splunk HEC service in Apache APISIX.

- [Forward-auth, Another Choice for Authentication Function](https://apisix.apache.org/blog/2022/01/26/apisix-integrate-forward-auth-plugin)：

  This article describes the use of `forward-auth`, a new plugin in Apache APISIX, and provides detailed instructions on how to use this cleanly designed authentication model.

- [Integrating Apache APISIX with gRPC-Web](https://apisix.apache.org/blog/2022/01/25/apisix-grpc-web-integration)：

  Apache APISIX already supports gRPC protocol proxies, as well as HTTP(s) to gRPC Server proxies via the gRPC Transcode plugin. Through active community discussion and contributions, Apache APISIX has broadened the scope of support for the gRPC ecosystem: support for the gRPC Web Protocol Request Proxy.
  
- [HashiCorp Vault Secure Storage Backend in Apache APISIX Ecosystem](https://apisix.apache.org/blog/2022/01/21/apisix-hashicorp-vault-integration)：

  This article brings you the upcoming release of the Vault-Apache APISIX integration and related details.

- [xRPC Will Be Released, Get More Details About APISIX Ecosystem](https://apisix.apache.org/blog/2022/01/21/apisix-xrpc-details-and-miltilingual)：

  This article brings you Apache APISIX's upcoming xRPC framework and related details, as well as a detailed presentation of Apache APISIX in multi-language development support.

- [The Practice of Public Gateway in CDN Scenario from UPYUN](https://apisix.apache.org/blog/2022/01/20/upyun-public-gateway-usecase)：

  In the previous sharing, we brought you the application of cloud at the Ingress level. This time, we will introduce you to the current cloud application examples under the public network gateway scenario, hoping to bring you some practical Apache APISIX scenarios to share in the cloud storage industry.
