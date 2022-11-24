---
title: "社区双周报 (10.16 - 11.4)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增上游轮询规则策略，支持 etcd 地址为 IPv6，处理上游 header 时自定义 X-Forwarded-Pord 参数。APISIX Dashboard 修正连接中断时数据不同步的问题。
tags: [Community]
image: https://static.apiseven.com/2022/11/24/637ed736a343e.png
---

> 从 10.16 - 11.4，有 44 位开发者为 Apache APISIX 提交了 98 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/11/24/637ed74d4be75.png)

![本周新晋贡献者](https://static.apiseven.com/2022/11/24/637ed7650c400.jpg)

## Good first issue

### Issue #8164

**链接**：https://github.com/apache/apisix/issues/8164

**问题描述**：为插件添加分类标签。

### Issue #8122

**链接**：https://github.com/apache/apisix/8122

**问题描述**：为 `jwt-auth` 插件隐藏凭证，可避免在上游泄露 Token。

### Issue #1416

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1416

**问题描述**：在某些情况下，5000 端口可能会被其它进程占用，是否可以支持自定义端口。

## 近期功能特性亮点

- [添加上游轮询策略默认类型 roundrobin](https://github.com/apache/apisix/pull/8180)（贡献者：[Hazel6869](https://github.com/Hazel6869)）

- [支持设置 etcd 地址为 IPv6 格式](https://github.com/apache/apisix/pull/8245)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

- [支持处理上游 header 时自定义 `X-Forwarded-Port` 参数](https://github.com/apache/apisix/pull/8266)（贡献者：[biakecw](https://github.com/biakecw)）

- [修正 Dashboard etcd 连接中断时数据不同步问题](https://github.com/apache/apisix-dashboard/pull/2650)（贡献者：[bzp2010](https://github.com/bzp2010)）

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [腾讯蓝鲸 API 网关如何借助 APISIX 实现产品升级与业务完善](https://apisix.apache.org/zh/blog/2022/11/05/tencent-blueking-with-apisix/)

    本文从蓝鲸网关的迭代过程和应用 APISIX 后的产品实践角度，为大家呈现了基于 APISIX 的网关应用实例。

- [从 Traefik 到 APISIX，汽车智能计算平台公司「地平线」在 Ingress Controller 的探索和实践](https://apisix.apache.org/zh/blog/2022/10/28/apisix-ingress-with-horizon-ai/)

    地平线作为一家致力于汽车自动驾驶芯片的公司，在业务迭代中为何从 Traefik 切换到了 APISIX Ingress 去支撑业务？

- [APISIX 3.0.0 预览版现已发布！带来丰富功能与迭代细节](https://apisix.apache.org/zh/blog/2022/09/28/apache-apisix-3.0.0-beta-release/)

    Apache APISIX 3.0.0 预览版现已发布，为你整理了此次预览版上线的一些功能与调整细节。

- [为什么说 Apache APISIX 是最好的 API 网关？](https://apisix.apache.org/zh/blog/2022/09/27/why-apache-apisix-is-best-apigateway/)

    本文首发于 [API7.ai](https://www.apiseven.com/blog/why-is-apache-apisix-the-best-api-gateway)，从多个角度（在开发人员中的受欢迎程度、开源许可证、性能和整个生态系统）对比多个 API 网关（Kong、Tyk、Gloo）。
