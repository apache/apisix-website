---
title: "社区双周报（1.1-1.16）"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API Gateway
- 开源
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 1.1 到 1.16, 有 29 位开发者为 Apache APISIX 提交了 81 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1642497489523-6ecc24de-b678-40cb-9211-f6b7c4a042af.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1642497489549-c7a58466-2819-424f-a6db-416ecdb96f7c.png)

## Good first issue

### Issue #6078

**链接**: https://github.com/apache/apisix/issues/6078

**问题描述**：对 http_to_https 使用插件重定向，浏览器访问无限301。

这可能是因为 APISIX 在一个代理后面，该代理响应解密 TLS 并始终将 HTTP 方案代理到 APISIX。

先看看重定向插件代码：

```Lua
if conf.http_to_https and ctx.var.scheme == "http" then
-- ignore
end
```

这显然会使重定向一直循环。

解决的办法是给这个插件打补丁，就像：

```Lua
local proxy_proto = core.request.header(ctx, "x-forwarded-proto")
local _scheme = proxy_proto and proxy_proto or ctx.var.scheme
if conf.http_to_https and _scheme == "http" then
-- ignore
end
```

### Issue #5915

**链接**: https://github.com/apache/apisix/issues/5915

**问题描述**：假设有两个字段，`include_resp_body` 作为开关，`resp_limit_size` 作为限制大小。配置这两个参数后，如果 resp_body 超过 resp_limit_size 的大小，resp_body 将不会被记录在日志中。对于 req_body 也是如此。

或许我们可以根据限制大小截断过大的请求和响应主体。

## 近期功能特性亮点

- [支持 TLS over TCP upstream](https://github.com/apache/apisix/pull/6030)（贡献者：[spacewander](https://github.com/spacewander)）

- [支持在 basic-auth 中隐藏 Authorization 请求头](https://github.com/apache/apisix/pull/6039)（贡献者：[mangoGoForward](https://github.com/mangoGoForward)）

- [支持动态设置 proxy_request_buffering](https://github.com/apache/apisix/pull/6075)（贡献者：[spacewander](https://github.com/spacewander)）

- [mqtt 支持通过 client id 负载均衡](https://github.com/apache/apisix/pull/6079)（贡献者：[https://github.com/apache/apisix/pull/6079](https://github.com/https://github.com/apache/apisix/pull/6079)）

- [添加 forward-auth 插件](https://github.com/apache/apisix/pull/6037)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [支持 gRPC-Web 代理](https://github.com/apache/apisix/pull/5964)（贡献者：[shuaijinchao](https://github.com/shuaijinchao)）

- [limit-count 支持请求间共享计数器](https://github.com/apache/apisix/pull/5984)（贡献者：[spacewander](https://github.com/spacewander)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [Apache APISIX 集成 Kafka 实现高效率实时日志监控](https://apisix.apache.org/zh/blog/2022/01/17/apisix-kafka-integration/)：

  Apache APISIX 早在 1.2 版本开始就已经提供了 `kafka-logger` 插件的支持，其后又经过多次功能强化，目前已具备非常成熟且完善的功能。支持将 API 请求日志，甚至请求体和响应体以 JSON 格式推送至 Kafka 集群中。

- [从原理到操作，让你在 Apache APISIX 中代理 Dubbo 服务更便捷](https://apisix.apache.org/zh/blog/2022/01/13/how-to-proxy-dubbo-in-apache-apisix)：

  本文为大家介绍了如何借助 Apache APISIX 实现 Dubbo Service 的代理，通过引入 dubbo-proxy 插件便可为 Dubbo 框架的后端系统构建更简单更高效的流量链路。

- [如何在 ARM Ubuntu 中构建 Apache APISIX](https://apisix.apache.org/zh/blog/2022/01/11/building-apisix-in-ubuntu-for-arm)：

  通过阅读本文，您将了解如何在 ARM Ubuntu 中通过源码构建 Apache APISIX（M1 芯片环境）。ARM Ubuntu 系统借助了 https://multipass.run/ 安装。
