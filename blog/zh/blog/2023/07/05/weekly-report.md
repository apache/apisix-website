---
title: "社区双周报 (6.19 - 7.02)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/07/03/eFGYTgLd_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E4%B8%AD%E6%96%87.png
---

> 我们近期对 Apache APISIX 和 Apache APISIX Ingress Controller 的部分功能进行了修复或改善，包括优化 Prometheus、修复 body-transformer 和 log-rotate 插件、新增 annotation 允许重写 response header，详情请阅读本期双周报。与此同时，我们还发布了 Apache APISIX 3.4.0。它的功能更加强大，性能更加优越。

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

从 2023.6.19 - 2023.7.02，有 22 位开发者为 Apache APISIX 提交了 35 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

我们近期对部分功能进行了修复或改善，更新内容汇总如下：

1. APISIX 允许自定义 Prometheus 默认 bucket。

2. 修复 body-transformer 插件无法正常转换空的 table 问题。

3. 修复使用自定义名称时 log-rotate 插件的 max_kept 配置无法生效问题。

4. APISIX Ingress Controller 新增 annotation 允许重写 response header。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/07/21/V68ySc8U_0619-0702.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/07/07/M3P3D5AP_%E6%96%B0%E6%99%8B%E8%B4%A1%E7%8C%AE%E8%80%85%E6%B5%B7%E6%8A%A5.png)

## 近期亮点功能

### Apache APISIX

- [APISIX 允许自定义 prometheus 默认 bucket](https://github.com/apache/apisix/pull/9673)（贡献者：[jiangfucheng](https://github.com/jiangfucheng)）

- [修复 body-transformer 插件无法正常转换空的 table 问题](https://github.com/apache/apisix/pull/9669)（贡献者：[kingluo](https://github.com/kingluo)）

- [修复使用自定义名称时 log-rotate 插件的 max_kept 配置无法生效问题](https://github.com/apache/apisix/pull/9749)（贡献者：[monkeyDluffy6017](https://github.com/monkeyDluffy6017)）

### Apache APISIX Ingress Controller

- [APISIX Ingress Controller 新增 annotation 允许重写 response header](https://github.com/apache/apisix-ingress-controller/pull/1861)（贡献者：[Revolyssup](https://github.com/Revolyssup )）

## 最新博客速览

- [Release Apache APISIX 3.4.0](https://apisix.apache.org/zh/blog/2023/06/30/release-apache-apisix-3.4.0/)
  
  此版本提供了一个新的插件 loki-logger，可将日志转发到 Grafana Loki，并允许在路由级别上建立 mTLS 连接。此外，此版本还还引入了许多新的特性，旨在优化对 APISIX 的使用体验。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
