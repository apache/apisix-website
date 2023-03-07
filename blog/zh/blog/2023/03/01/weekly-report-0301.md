---
title: "社区双周报 (2.13 - 2.26)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/02/27/GgmyRHBB_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%A4%B4%E5%9B%BE-04%E6%9C%9F.png
---

> 从 2023.2.13 - 2023.2.26，有 23 位开发者为 Apache APISIX 提交了 51 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合社区的新手们参加的 Issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/02/28/gOoFu4SE_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-04%E6%9C%9F.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/02/27/KGpNS2ST_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-04%E6%9C%9F.png)

## Good First Issue

### Issue #8772

**链接**：https://github.com/apache/apisix/issues/8772

**问题描述**：对 OIDC 认证相关的自定义配置进行验证，以便用户对不合规配置限制其向后端访问。

### Issue #1075

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1075

**问题描述**：为 APISIX Ingress 增加使用 apisix:dev 的回归测试，以便尽早发现与 APISIX 最新修改的兼容问题。

## 近期功能特性亮点

- [`opentelemetry` 插件提供 HTTPS 上游支持。](https://github.com/apache/apisix/pull/8823)（贡献者：[yangxikun](https://github.com/yangxikun)）

- [Admin API 提供 head 方法支持。](https://github.com/apache/apisix/pull/8752)（贡献者：[An-DJ](https://github.com/An-DJ)）

- [Stream 代理模式提供 tars 服务发现支持。](https://github.com/apache/apisix/pull/8826)（贡献者：[ronething](https://github.com/ronething)）

- [`request-id` 插件添加 `range_id` 算法生成 UniqueID 支持。](https://github.com/apache/apisix/pull/8826)（贡献者：[jiangfucheng](https://github.com/jiangfucheng)）

- [提供从环境变量中获取 `VAULT_TOKEN` 的支持。](https://github.com/apache/apisix/pull/8866)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [RESTful API 为何成为顶流 API 架构风格？](https://apisix.apache.org/zh/blog/2023/02/08/what-is-restful-api/)

    本文将介绍什么是 RESTful API 以及我们如何使用它。

- [APISIX Ingress 如何使用 Cert Manager 管理证书](https://apisix.apache.org/zh/blog/2023/02/07/apisix-ingress-with-cert-mamager/)

    Cert Manager 解决了 Kubernetes 中证书的默认存储方式的痛点，并逐步成为了 Kubernetes 生态中证书签发和管理领域中的事实标准。

- [API 网关策略的二三事](https://apisix.apache.org/zh/blog/2023/01/30/something-about-api-gateway-policy/)

    这篇文章介绍了什么是 API 网关策略，并针对认证授权、安全、流量处理与可观测性这四类 API 网关中常用的策略进行描述。
