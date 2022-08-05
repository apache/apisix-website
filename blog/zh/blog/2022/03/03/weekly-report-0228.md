---
title: "社区双周报（2.15-2.28）"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了 mocking 插件，支持将 access log 推送到 ClickHouse，添加 Kubernetes 作为服务发现等功能。
tags: [Community]
---

> 从 2.15 到 2.28, 有 43 位开发者为 Apache APISIX 提交了 101 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1646206544073-3e8b3bc8-b941-447e-af00-fb1273f1cfbf.jpg)

![本周新晋贡献者](https://static.apiseven.com/202108/1646206544057-52a28a3f-7bc5-43be-9f21-5a0cd78a4863.jpg)

## Good first issue

### Issue #920

**链接**: https://github.com/apache/apisix-website/issues/920

**问题描述**：目前，在官网博客提交新博文的 pull request 时，必须同时提交中文和英文两个版本的文档。

然而随着社区的发展，两种语言的博客变得比以前更加多样化。因此今后提交的博客更多可能只有一种语言。但实际上，如果只提交英文博客，而没有中文博客，当用户点击右上角的语言转换按钮时，会跳转到默认的 404 页面。

所以需要对官网结构进行修改，保证在单语言的博客页面点击语言转换后，依旧停留在原来的页面，避免跳转至 404 页面。

### Issue #6460

**链接**: https://github.com/apache/apisix/issues/6460

**问题描述**：当使用 `authz-keycloak` 插件，且访问不被允许时，将在请求的 URL 正文中收到一个拒绝访问的信息：

```Json
{"error":"access_denied","error_description":"not_authorized"}
```

当访问被拒绝时，是否可以指定一个重定向的 URL，使用户看到预定义的页面而不是信息？

## 近期功能特性亮点

- [支持将 access log 推送到 ClickHouse](https://github.com/apache/apisix/pull/6215)（贡献者：[zhendongcmss](https://github.com/zhendongcmss)）

- [添加 Kubernetes 作为服务发现](https://github.com/apache/apisix/pull/4880)（贡献者：[zhixiongdu027](https://github.com/zhixiongdu027)）

- [支持配置 X-APISIX-Upstream-Status 返回所有上游状态](https://github.com/apache/apisix/pull/6392)（贡献者：[liangliang4ward](https://github.com/liangliang4ward)）

- [新增 `mocking` 插件](https://github.com/apache/apisix/pull/5940)（贡献者：[Drery](https://github.com/Drery)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [如何使用 Apache APISIX CSRF 安全插件拦截跨站点伪造攻击](https://apisix.apache.org/zh/blog/2022/02/23/csrf-api-gateway)：

  本文介绍了 Apache APISIX 的 CSRF 安全插件 `csrf`，并详细说明如何在 Apache APISIX 中借助 `csrf` 插件来保护您的 API 信息安全。

- [可观测性能力升级，API 网关 Apache APISIX 集成 OpenTelemetry](https://apisix.apache.org/zh/blog/2022/02/28/apisix-integration-opentelemetry-plugin)：

  本文为您介绍了 API 网关 Apache APISIX 中的 `opentelemetry` 插件的概念以及如何部署 `opentelemetry` 插件。

- [API 网关 Apache APISIX 集成 Consul KV，服务发现能力再升级](https://apisix.apache.org/zh/blog/2022/02/25/consul-api-gateway)：

  Apache APISIX 支持基于 Consul KV 的服务发现注册表。这篇文章讲述了在 Apache APISIX 中实现服务发现和服务注册的全过程。

- [Nacos 在 API 网关中的服务发现实践](https://apisix.apache.org/zh/blog/2022/02/21/nacos-api-gateway)：

  本文为您介绍 Apache APISIX 基本概念以及注册中心的作用，并为您展示了 API 网关基于 Nacos 实现服务发现的具体操作。
