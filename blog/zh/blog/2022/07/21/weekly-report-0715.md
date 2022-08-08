---
title: "社区双周报 (7.1 - 7.15)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: 云原生 API 网关 Apache APISIX 近两周新增了 openid-connect 插件中支持 PKCE、Ingress 资源可以直接使用 APISIX 的插件等功能。
tags: [Community]
---

> 从 7.1 - 7.15，有 28 位开发者为 Apache APISIX 提交了 99 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/2022/weeklyreport/0721/3.jpg)

![本周新晋贡献者](https://static.apiseven.com/2022/weeklyreport/0721/6.png)

## Good first issue

### Issue #1146

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1146

**问题描述**：应该在 Makefile 中添加一个新的 `make dev env`，以启动开发环境。

它需要完成：

- 使用 kind 创建新集群
- 部署 APISIX + etcd
- 构建 `apisix-ingress-controller` 的镜像
- 部署 `apisix-ingress-controller`

其中大多数已经包含在当前的 Makefile 中，需要对其进行组织。

### Issue #1129

**链接**：https://github.com/apache/apisix-ingress-controller/issues/1129

**问题描述**：当前项目的 `e2e` 中使用了大量的 `time.sleep`，这无疑会增加 CI 的整体耗时。

https://pkg.go.dev/k8s.io/apimachinery/pkg/util/wait 包提供了轮询（Polling）或监听条件变化的工具。

可以用 `wait` 代替当前的 `time.sleep`，以一种更好的方式来确定是否已经达到我们所期望的状态。

## 近期功能特性亮点

- [新增在 Ingress 资源中可以通过 annotation 绑定 ApisixPluginConfig 的能力，让 Ingress 资源可以直接使用 APISIX 的插件能力](https://github.com/apache/apisix-ingress-controller/pull/1139)（贡献者：[dickens7](https://github.com/dickens7)）

- [修复 APISIX Dashboard 中路由复制时的 ID 冲突问题](https://github.com/apache/apisix-dashboard/pull/2501)（贡献者：[SkyeYoung](https://github.com/SkyeYoung)）

- [`openid-connect` 插件中支持 PKCE](https://github.com/apache/apisix/pull/7370)（贡献者：[qihaiyan](https://github.com/qihaiyan)）

- [支持自定义插件优先级](https://github.com/apache/apisix/pull/7391)（贡献者：[tzssangglass](https://github.com/tzssangglass)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。
