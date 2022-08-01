---
title: Biweekly Report (Jan 1 - Jan 16)
keywords:
- Apache APISIX
- Weekly Report
- Contributor
- APISIX
- API Gateway
- Apache
description: The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX.
tags: [Community]
---

> From 1.1 to 1.16, 29 contributors submitted 81 commits for Apache APISIX. Thank you all for your contributions to Apache APISIX.

<!--truncate-->

## Introduction

Apache APISIX has grown as a community from the first day of open source and has quickly become the most active open source API gateway project in the world. These achievements cannot be achieved without the joint efforts of our community partners.

"If you want to go fast, go alone.If you want to go far, go together." The Apache APISIX Community Weekly Report hopes to help community members better understand the weekly progress of the Apache APISIX community and and facilitate everyone to participate in the Apache APISIX community.

We have also compiled some issues suitable for newcomers to the community to participate in! If you are interested, don't miss it!

## Contributor Statistics

![Contributors List](https://static.apiseven.com/202108/1642497489518-269539d9-69d3-4613-90a1-5e4f272918e9.png)

![New Contributors](https://static.apiseven.com/202108/1642497489537-a7a736dd-fadd-4d67-a9d2-ad22b9d3c090.png)

## Good first issue

### Issue #6078

**Link**: https://github.com/apache/apisix/issues/6078

**Issue description**:

Use plugin redirect for http_to_https,the browser access unlimited 301.The reason I found is that our APISIX behind a proxy that responsed for decrypted the TLS and proxied always HTTP scheme to APISIX. Let's see the redirect plugin code:

```Lua
if conf.http_to_https and ctx.var.scheme == "http" then
-- ignore
end
```

It will makes the redirect loop apparently. The resolution is patching this plugin just like:

```Lua
local proxy_proto = core.request.header(ctx, "x-forwarded-proto")
local _scheme = proxy_proto and proxy_proto or ctx.var.scheme
if conf.http_to_https and _scheme == "http" then
-- ignore
end
```

### Issue #5915

**Link**: https://github.com/apache/apisix/issues/5915

**Issue description**:

Suppose I have two fields, `include_resp_body` as the switch, `resp_limit_size` as the limit size. After configuring these two parameters, if resp_body exceeds the size of resp_limit_size, resp_body will not be recorded in the log. The same is true for req_body.

We can truncate oversized request and response bodies based on limit size.

## Highlights of Recent Features

- [Support TLS over TCP upstream](https://github.com/apache/apisix/pull/6030)（Contributor: [spacewander](https://github.com/spacewander)）

- [Support hide the authentication header in basic-auth with a config](https://github.com/apache/apisix/pull/6039)（Contributor: [mangoGoForward](https://github.com/mangoGoForward)）

- [Set proxy_request_buffering dynamically](https://github.com/apache/apisix/pull/6075)（Contributor: [spacewander](https://github.com/spacewander)）

- [Mqtt supports load balancing by client id](https://github.com/apache/apisix/pull/6079)（Contributor: [spacewander](https://github.com/spacewander)）

- [Add forward-auth plugin](https://github.com/apache/apisix/pull/6037)（Contributor: [bzp2010](https://github.com/bzp2010)）

- [Support gRPC-Web Proxy](https://github.com/apache/apisix/pull/5964)（Contributor: [shuaijinchao](https://github.com/shuaijinchao)）

- [limit-count supports sharing counters between requests](https://github.com/apache/apisix/pull/5984)（Contributor: [spacewander](https://github.com/spacewander)）

The Apache APISIX project website and the Github issue have accumulated a wealth of documentation and experience, so if you encounter problems, you can read the documentation, search the issue with keywords, or participate in the discussion on the issue to put forward your own ideas and practical experience.

## Recent Blog Recommendations

- [Apache APISIX Integration with Kafka for Efficient Real-Time Log Monitoring](https://apisix.apache.org/blog/2022/01/17/apisix-kafka-integration)：

  Apache APISIX has been providing support for Apache Kafka since version 1.2 with the `kafka-logger` plugin release. `kafka-logger` has been enhanced several times since then to provide very mature and complete functionality. It supports pushing API request logs, request bodies, and response bodies, to a Kafka cluster in JSON format.

- [Makes it More Convenient for You to Proxy Dubbo Services in Apache APISIX](https://apisix.apache.org/blog/2022/01/13/how-to-proxy-dubbo-in-apache-apisix)：

  In this article, we introduced how to use Apache APISIX to implement a proxy for Dubbo Service. By introducing the dubbo-proxy plugin, you can build a simpler and more efficient traffic link for the back-end system of Dubbo framework.

- [How to build Apache APISIX in ARM Ubuntu](https://apisix.apache.org/blog/2022/01/11/building-apisix-in-ubuntu-for-arm)：

  By reading this article you will learn how to build Apache APISIX (M1 chip environment) in ARM Ubuntu from source code. The ARM Ubuntu system is installed with the help of https://multipass.run/.
  
- [Using the Apache APISIX proxy gRPC service](https://apisix.apache.org/blog/2021/12/30/apisix-proxy-grpc-service)：

  This article shows you how to proxy client HTTP traffic to the back-end gRPC service via the grpc-transcode plugin in Apache APISIX.
