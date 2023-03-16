---
title: "社区双周报 (2.27 - 3.12)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/03/14/zSVpVOqk_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%A4%B4%E5%9B%BE-05%E6%9C%9F.png
---

> 从 2023.2.27 - 2023.3.12，有 29 位开发者为 Apache APISIX 提交了 74 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/03/14/0rjys38r_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5-05%E6%9C%9F.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/03/14/WZpcYrG7_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E6%96%B0%E6%99%8B%E6%B5%B7%E6%8A%A5-05%E6%9C%9F.png)

## 近期亮点功能

### Apache APISIX

- [`clickhouse-logger` 插件添加记录请求体响应体特性支持](https://github.com/apache/apisix/pull/8722)（贡献者：[pixeldin](https://github.com/pixeldin)）

- [Cli 启动模式添加从 `APISIX_DEPLOYMENT_ETCD_HOST` 环境变量中获取 etcd 主机支持](https://github.com/apache/apisix/pull/8898)（贡献者：[An-DJ](https://github.com/An-DJ)）

- [增加 `degraphql` 插件，允许用户通过配置将请求映射至固定的 GraphQL 查询](https://github.com/apache/apisix/pull/8959)（贡献者：[spacewander](https://github.com/spacewander)）

### Apache APISIX Ingress Controller

- 为 APISIX Ingress 的自定义资源增加 IngressClass 支持，允许同一集群中同时部署多套 Ingress controller 并使用自定义资源。贡献者：[AlinsRan](https://github.com/AlinsRan)，[lingsamuel](https://github.com/lingsamuel)，[Donghui0](https://github.com/Donghui0)，相关 PR：

- [feat: make multiple controllers handle different ApisixRoute CRDs](https://github.com/apache/apisix-ingress-controller/pull/593)
- [feat: ApisixUpstream support IngressClass](https://github.com/apache/apisix-ingress-controller/pull/1674)
- [feat: ApisixTls suuport ingressClass](https://github.com/apache/apisix-ingress-controller/pull/1714)
- [feat: support ingressClass for ApisixPluginConfig](https://github.com/apache/apisix-ingress-controller/pull/1716)
- [feat: ApisixConsumer support ingressClass](https://github.com/apache/apisix-ingress-controller/pull/1717)
- [feat: support ingressClass for ApisixGlobalRule](https://github.com/apache/apisix-ingress-controller/pull/1718)
- [feat: ApisixClusterConfig support IngressClass](https://github.com/apache/apisix-ingress-controller/pull/1720)

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
