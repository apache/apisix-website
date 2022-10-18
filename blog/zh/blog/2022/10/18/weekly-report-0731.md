---
title: "社区双周报 (10.1 - 10.15)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了 `proxy-mirror` 插件支持解析 host 域名、`kafka-logger` 插件新增 brokers 属性，支持不同 broker 设置相同 host 等功能。
tags: [Community]
image: https://static.apiseven.com/2022/10/18/634e520868415.jpg
---

> 从 10.1 - 10.15，有 19 位开发者为 Apache APISIX 提交了 32 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/10/18/634e520810ea5.png)

![本周新晋贡献者](https://static.apiseven.com/2022/10/18/634e5208ed0b4.png)

## Good first issue

### Issue #7990

**链接**：https://github.com/apache/apisix/issues/7990

**问题描述**：应该在测试案例中合并 `extra_init_by_lua_start` 和 `extra_init_by_lua` 指令，它们只是在位置上有所不同。

### Issue #1339

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1339

**问题描述**：Apache APISIX v3 版本即将发布，在这个版本中，Admin API 做了很多调整（这是目前 APISIX Ingress Controller 与 APISIX 之间通信的主要方式）。

因此，APISIX Ingress Controller 也需要与 APISIX v3 中的 Admin API 兼容：

1. 为 e2e 测试添加 APISIX v3 镜像。(可以使用 apache/apisix:dev)
2. 修改代码中 Admin API 返回结果的处理逻辑。

## 近期功能特性亮点

- [`proxy-mirror` 插件支持解析 host 域名](https://github.com/apache/apisix/pull/7861)（贡献者：[Strangevy](https://github.com/Strangevy)）

- [`kafka-logger` 插件新增 brokers 属性，支持不同 broker 设置相同 host](https://github.com/apache/apisix/pull/7999)（贡献者：[starsz](https://github.com/starsz)）

- [新增 consumer group](https://github.com/apache/apisix/pull/7980)（贡献者：[kingluo](https://github.com/kingluo)）

- [`kafka-logger` 支持设置 sasl 相关配置](https://github.com/apache/apisix/pull/8050)（贡献者：[starsz](https://github.com/starsz)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [APISIX 3.0.0 预览版现已发布！带来丰富功能与迭代细节](https://apisix.apache.org/zh/blog/2022/09/28/apache-apisix-3.0.0-beta-release/)

    Apache APISIX 3.0.0 预览版现已发布，为你整理了此次预览版上线的一些功能与调整细节。

- [为什么说 Apache APISIX 是最好的 API 网关？](https://apisix.apache.org/zh/blog/2022/09/27/why-apache-apisix-is-best-apigateway/)

    本文首发于 [API7.ai](https://www.apiseven.com/blog/why-is-apache-apisix-the-best-api-gateway)，从多个角度（在开发人员中的受欢迎程度、开源许可证、性能和整个生态系统）对比多个 API 网关（Kong、Tyk、Gloo）。

- [API 网关 Apache APISIX 集成 CNCF OpenFunction](https://apisix.apache.org/zh/blog/2022/09/20/apisix-integrate-cncf-openfunction/)

    本文作者李从旺，开源爱好者与云原生技术爱好者，目前于佐治亚理工学院深圳校区进修硕士学位。本篇文章是在参与 APISIX 开源之夏项目「集成 OpenFunction 至 Apache APISIX」的功能呈现，希望此功能可以让你在使用 APISIX 进行扩展时更加便捷。
