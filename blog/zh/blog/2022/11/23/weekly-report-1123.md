---
title: "社区双周报 (11.5 - 11.20)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了 `proxy-mirror` 插件支持解析 host 域名、`kafka-logger` 插件新增 brokers 属性，支持不同 broker 设置相同 host 等功能。
tags: [Community]
image: https://static.apiseven.com/2022/11/24/637ed683ec3e0.png
---

> 从 11.5 - 11.20，有 31 位开发者为 Apache APISIX 提交了 69 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/11/24/637ed683c50d5.png)

![本周新晋贡献者](https://static.apiseven.com/2022/11/24/637ed68473f14.png)

## Good first issue

### Issue #8354

**链接**：https://github.com/apache/apisix/issues/8354

**问题描述**：为避免主机匹配争议，将默认 HTTP 路由器从 `radixtree_uri` 更改为 `radixtree_host_uri`。

### Issue #8311

**链接**：https://github.com/apache/apisix/8311

**问题描述**：希望 Kubernetes 的服务发现可以支持更多的配置项，用以应对不同的验证场景。

## 近期功能特性亮点

- [`jwt-auth` 支持隐藏客户端认证凭据](https://github.com/apache/apisix/pull/8206)（贡献者：[pixeldin](https://github.com/pixeldin)）

- [APISIX 兼容运行 OpenSSL 3.0 并开启 FIPS 特性](https://github.com/apache/apisix/pull/8298)（贡献者：[kingluo](https://github.com/kingluo)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [微服务中的服务发现是什么](https://apisix.apache.org/zh/blog/2022/11/10/what-is-service-in-microservice-discovery/)

    本文通过服务发现的相关背景和 APISIX 对于服务发现的应用与实践，来介绍微服务中的服务发现内容。
- [实践一年之久，vivo 如何基于 APISIX 进行业务基础架构的演进](https://apisix.apache.org/zh/blog/2022/11/13/vivo-with-apache-apisix/)

    本文从应用 APISIX 后的调整与实践困难角度入手，为大家带来了 vivo 基于 APISIX 的企业实践细节。

- [腾讯蓝鲸 API 网关如何借助 APISIX 实现产品升级与业务完善](https://apisix.apache.org/zh/blog/2022/11/05/tencent-blueking-with-apisix/)

    本文从蓝鲸网关的迭代过程和应用 APISIX 后的产品实践角度，为大家呈现了基于 APISIX 的网关应用实例。

- [从 Traefik 到 APISIX，汽车智能计算平台公司「地平线」在 Ingress Controller 的探索和实践](https://apisix.apache.org/zh/blog/2022/10/28/apisix-ingress-with-horizon-ai/)

    地平线作为一家致力于汽车自动驾驶芯片的公司，在业务迭代中为何从 Traefik 切换到了 APISIX Ingress 去支撑业务？
