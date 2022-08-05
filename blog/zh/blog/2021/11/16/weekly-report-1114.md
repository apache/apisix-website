---
title: "社区周报（11.1-11.14）"
keywords: 
- Apache APISIX
- 社区周报
- APISIX
- API Gateway
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增支持在 Arch Linux 上安装 APISIX，limit-conn 和 limit-count 插件支持变量作为限流 key 以及 datadog 插件等功能。
tags: [Community]
---

> 从 11.1 到 11.14, 有 28 位开发者为 Apache APISIX 提交了 114 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1636942852485-0effd8be-552e-4871-ba3e-356772016a18.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1636940503842-fc52a349-443e-4f4b-9787-f743299870f3.png)

## Good first issue

### Issue #5400

**链接**: https://github.com/apache/apisix/issues/5400

**问题描述**：七层的 HTTP 日志是存储在 acccess.log 中的，那么四层代理 stream route 如何启用日志并自定义日志路径呢？传统的 OpenResty 是可以实现的。

### Issue #5417

**链接**: https://github.com/apache/apisix/issues/5417

**问题描述**：目前，如果用户没有指定一个 ID，Apache APISIX 会在初始化时生成一个 ID，它依赖于 [lua-resty-jit-uuid](https://github.com/thibaultcha/lua-resty-jit-uuid) 库，但没有一个明确的 seed。[如下](https://github.com/apache/apisix/blob/4dafab5afa3293b3d72007517246e01da385f8ef/apisix/core/id.lua#L76-L78)：

```Lua
uuid.seed()
 apisix_uid = uuid.generate_v4()
 log.notice("not found apisix uid, generate a new one: ", apisix_uid)
```

而 jit-uuid 库通过 ngx_lua 环境中的进程 ID 和时间创建 seed，[如下](https://github.com/thibaultcha/lua-resty-jit-uuid/blob/82538049040ae85ff880b79886f21d8593140c7d/lib/resty/jit-uuid.lua#L53-L54):

```Lua
        if ngx then
            seed = ngx.time() + ngx.worker.pid()
```

然而，在容器化环境中，进程 ID（主进程）可能是相同的，即 1 号进程，另外，如果用户试图通过部署资源在 Kubernetes 上部署 Apache APISIX 集群，几个 Pod 的时间可能是相同的，因为 ngx.time 没有足够的精确性（只有毫秒级别）。所以生成的 APISIX ID 可能是重复的，如果这个 ID 是关键的，这可能会在业务场景中造成严重的后果。

## 近期功能特性亮点

- [APISIX 支持在 Arch Linux 上安装](https://github.com/apache/apisix/pull/5350)（贡献者：[rapiz1](https://github.com/rapiz1)）

- [APISIX limit-conn 插件支持变量作为限流 key](https://github.com/apache/apisix/pull/5354)（贡献者：[Xunzhuo](https://github.com/Xunzhuo)）

- [APISIX limit-count 插件支持变量作为限流 key](https://github.com/apache/apisix/pull/5378)（贡献者：[Xunzhuo](https://github.com/Xunzhuo)）

- [APISIX 支持通过 POST 表单属性进行高级路由匹配](https://github.com/apache/apisix/pull/5409)（贡献者：[bzp2010](https://github.com/bzp2010)）

- [APISIX 新增用于指标收集的 datadog 插件](https://github.com/apache/apisix/pull/5372)（贡献者：[bisakhmondal](https://github.com/bisakhmondal)）

- [APISIX 新增 skywalking-logger 插件，可将 Access Log 数据推送到 SkyWalking OAP 服务器](https://github.com/apache/apisix/pull/5478)（贡献者：[dmsolr](https://github.com/dmsolr)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [Apache APISIX 如何通过网关层为 Airwallex 数据主权保驾护航](https://apisix.apache.org/zh/blog/2021/11/03/airwallex-usercase)：

  本文将为大家带来关于 Airwallex 空中云汇是如何使用 Apache APISIX 进行网关层部署来加固数据主权方面的建设。

- [浅谈 Apache APISIX 的可观测性](https://apisix.apache.org/zh/blog/2021/11/04/skywalking)：

  本文介绍了 Apache APISIX 的可观测性能力以及如何通过 Apache SkyWalking 提升Apache APISIX 的可观测性能力。

- [APISIX-Datadog 插件发布，助力用户提高系统的可观测性](https://apisix.apache.org/zh/blog/2021/11/12/apisix-datadog)：

  Apache APISIX 最近发布了一个新的插件：[APISIX-Datadog](https://apisix.apache.org/docs/apisix/next/plugins/datadog/)，以提供与 Datadog 监控平台的集成。这篇文章介绍了 APISIX-Datadog 插件的实现原理及功能。
