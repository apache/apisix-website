---
title: "社区双周报｜2.1-2.14 功能亮点更新进行中"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API Gateway
- 贡献者
description: API 网关 Apache APISIX 近两周新增了 csrf、file-logger、public-api、opentelemetry、loggly 等插件，并且也支持记录 apisix_latency 和 upstream_latency。
tags: [Community]
---

> 从 2.1 到 2.14, 有 25 位开发者为 Apache APISIX 提交了 55 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1644998110046-9b57e72b-95e0-4288-978a-2d8db16f11c8.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1644998110070-5b7b0085-0673-455d-adaa-727dc9e8a1ed.png)

## Good first issue

### Issue #6197

**链接**: https://github.com/apache/apisix/issues/6197

**问题描述**：目前，`limit-count` 插件只设置了一种流量限制模式：秒或分钟。但是，该插件不支持同时设置秒和分钟，因为用户后面设置的内容会覆盖前面设置的内容，是否有办法可以解决这个问题？

### Issue #6265

**链接**: https://github.com/apache/apisix/issues/6265

**问题描述**：[t/core/utils.t](https://github.com/apache/apisix/blob/ec0fc2ceaf04a20b0bd0ebdaad67296a1d3f621c/t/core/utils.t) 中的测试案例目前有一些代码错误，比如：

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

在这里执行代码时，变量 `host` 是一个 `nil`（可能永远不会触发）。

## 近期功能特性亮点

- [支持记录 apisix_latency 和 upstream_latency](https://github.com/apache/apisix/pull/6030)（贡献者：[jagerzhang](https://github.com/jagerzhang)）

- [新增 CSRF 插件](https://github.com/apache/apisix/pull/5727)（贡献者：[Baoyuantop](https://github.com/Baoyuantop)）

- [新增 file-logger 插件](https://github.com/apache/apisix/pull/5831)（贡献者：[guoqqqi](https://github.com/guoqqqi)）

- [新增 public-api 插件](https://github.com/apache/apisix/pull/6145)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [新增 opentelemetry 插件](https://github.com/apache/apisix/pull/6119)（贡献者：[yangxikun](https://github.com/yangxikun)）

- [新增 loggly 插件](https://github.com/apache/apisix/pull/6113)（贡献者：[bisakhmondal](https://github.com/bisakhmondal)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [生态扩大进行中！Apache APISIX 集成 Splunk HTTP Event Collector](https://apisix.apache.org/zh/blog/2022/02/10/apisix-splunk-integration)：

  本文将为大家介绍如何在 Apache APISIX 中配置和使用 Splunk HEC 服务。

- [新插件 forward-auth 已上线，认证功能又多一项选择](https://apisix.apache.org/zh/blog/2022/01/26/apisix-integrate-forward-auth-plugin)：

  本文将介绍 Apache APISIX 中新增插件 `forward-auth` 的使用方法，为大家详细说明如何使用这款设计简洁的认证模型。

- [Apache APISIX 新技能，代理 gRPC-Web 请求](https://apisix.apache.org/zh/blog/2022/01/25/apisix-grpc-web-integration)：

  Apache APISIX 已经支持了 gRPC 协议代理，以及通过 gRPC Transcode 插件支持了 HTTP(s) 到 gRPC Server 的代理。通过社区的积极讨论和贡献，Apache APISIX 又拓宽了 gRPC 生态的支持范围：支持 gRPC Web 协议请求代理。

- [Apache APISIX 集成 HashiCorp Vault，生态系统再添一员](https://apisix.apache.org/zh/blog/2022/01/21/apisix-hashicorp-vault-integration)：

  本文为大家带来了 Apache APISIX 即将发布的 Vault 插件以及相关细节。在为服务提供高并发低延迟的卓越性能的同时，为服务的安全保驾护航。

- [多协议接入框架 xRPC 发布在即，为你解读更多 APISIX 生态细节](https://apisix.apache.org/zh/blog/2022/01/21/apisix-xrpc-details-and-miltilingual)：

  本文为大家带来了 Apache APISIX 即将发布的 xRPC 框架以及相关细节，同时介绍了 Apache APISIX 在多语言开发支持中的细节展示。

- [CDN 业务场景下，又拍云的公网网关场景实践](https://apisix.apache.org/zh/blog/2022/01/20/upyun-public-gateway-usecase)：

  在之前的分享中，我们为大家带来了又拍云在 Ingress 层面的应用。而这次我们会在公网网关场景下，给大家介绍目前又拍云的应用实例，希望能在云存储行业领域，给大家带来一些实用的 Apache APISIX 场景分享。
