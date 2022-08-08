---
title: "社区双周报（3.1-3.14）"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: API 网关 Apache APISIX 社区近两周新增了 authz-keycloak 插件支持重定向非授权用户、csrf 插件支持检查令牌是否过期、proxy-mirror 插件支持设置超时时间等功能。
tags: [Community]
---

> 从 3.1 到 3.14， 有 44 位开发者为 Apache APISIX 提交了 131 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1647397912423-73900fe5-8155-4a3f-b609-79bf224ad7e1.jpg)

![本周新晋贡献者](https://static.apiseven.com/202108/1647397912442-b726a867-fc81-45a6-bea1-c45beb71068f.png)

## Good first issue

### Issue #6344

**链接**: https://github.com/apache/apisix/issues/6344

**问题描述**：作为一个用户，我想使用 `forward-auth` 插件，但该插件不支持将请求体发送到授权服务器上的认证表单请求体，有办法支持吗？

### Issue #6197

**链接**: https://github.com/apache/apisix/issues/6197

**问题描述**：目前，`limit-count` 插件只设置了一种流量限制模式：秒或分钟。但是，该插件不支持同时设置秒和分钟，因为用户后面设置的内容会覆盖前面设置的内容，是否有办法可以解决这个问题？

## 近期功能特性亮点

- [`open-connect` 插件支持调用登出接口后想要跳转的地址](https://github.com/apache/apisix/pull/6455)（贡献者：[starsz](https://github.com/starsz)）

- [`ext-plugin` 支持重写 response headers](https://github.com/apache/apisix/pull/6426)（贡献者：[rampagecong](https://github.com/rampagecong)）

- [`proxy-mirror` 插件支持自定义路径](https://github.com/apache/apisix/pull/6506)（贡献者：[spacewander](https://github.com/spacewander)）

- [WASM 支持获取 response body](https://github.com/apache/apisix/pull/6514)（贡献者：[spacewander](https://github.com/spacewander)）

- [支持运行绑定在 cousumer 上插件的 rewrite 阶段](https://github.com/apache/apisix/pull/6502)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持从 `yaml` 配置文件中读取环境变量](https://github.com/apache/apisix/pull/6505)（贡献者：[wilson-1024](https://github.com/wilson-1024)）

- [`authz-keycloak` 插件支持重定向非授权用户](https://github.com/apache/apisix/pull/6485)（贡献者：[oil-oil](https://github.com/oil-oil)）

- [`cors` 插件支持设置在 plugin metadata 中设置 allow origins](https://github.com/apache/apisix/pull/6546)（贡献者：[Gary-Airwallex](https://github.com/Gary-Airwallex)）

- [`csrf` 插件支持检查令牌是否过期](https://github.com/apache/apisix/pull/6201)（贡献者：[Baoyuantop](https://github.com/Baoyuantop)）

- [`jwt-auth` 插件支持指定获取 token 的位置](https://github.com/apache/apisix/pull/6561)（贡献者：[liangliang4ward](https://github.com/liangliang4ward)）

- [`proxy-mirror` 插件支持设置超时时间](https://github.com/apache/apisix/pull/6562)（贡献者：[Gerrard-YNWA](https://github.com/Gerrard-YNWA)）

- [APISIX Dashboard 支持通过环境变量加载指定配置文件](https://github.com/apache/apisix-dashboard/pull/2293)（贡献者：[bzp2010](https://github.com/bzp2010) 和 [kevinw66](https://github.com/kevinw66)）

- [APISIX Dashboard `limit` 系列插件 UI 添加欠缺字段](https://github.com/apache/apisix-dashboard/pull/2312)（贡献者：[oil-oil](https://github.com/oil-oil)）

- [APISIX Dashboard 支持 UI 配置 Protocol Buffers](https://github.com/apache/apisix-dashboard/pull/2320)（贡献者：[oil-oil](https://github.com/oil-oil)）

- [APISIX Dashboard 路由高级匹配支持处理 “!” 取反操作符](https://github.com/apache/apisix-dashboard/pull/2364)（贡献者：[SkyeYoung](https://github.com/SkyeYoung)）

- [APISIX Dashboard 支持 cors 详细配置](https://github.com/apache/apisix-dashboard/pull/2341)（贡献者：[zaunist](https://github.com/zaunist)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [API 网关 Apache APISIX 集成 Eureka 作为服务发现](https://apisix.apache.org/zh/blog/2022/03/05/apisix-integration-eureka-service-discovery/)：

  本文介绍了如何在 API 网关 Apache APISIX 中启用 Eureka 作为服务发现以及如何使用诊断工具发现链路中出现的问题。

- [化繁为简，Apache APISIX 集成 ClickHouse 插件提升全链路日志效率](https://apisix.apache.org/zh/blog/2022/03/04/apigateway-clickhouse-makes-logging-easier)：

  本文讲述了社区贡献者祁振东为 Apache APISIX 贡献 `clickhouse-logger` 的历程，以及如何使用该插件简化业务架构，提升全链路日志效率。

- [API 网关 Apache APISIX 携手 CoreDNS 打开服务发现新大门](https://apisix.apache.org/zh/blog/2022/03/04/apisix-uses-coredns-enable-service-discovery)：

  作为云原生 API 网关，Apache APISIX 也集成了多种服务发现的能力，本文将为您展示在 Apache APISIX 中如何配置 CoreDNS。

- [开源云 IDE 产品新宠儿，如何使用 Gitpod 开发 API 网关 Apache APISIX？](https://apisix.apache.org/zh/blog/2022/03/03/develop-apisix-with-gitpod)：

  本文介绍了开源的云原生 API 网关 Apache APISIX 和云 IDE 产品 Gitpod，并为大家演示了如何使用 Gitpod 对 API 网关 Apache APISIX 进行开发及常见问题的解决方案。
