---
title: "社区双周报 (8.28 - 9.10)"
keywords: 
- Apache APISIX
- API 网关
- 社区周报
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/09/11/Co3naagN_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E4%B8%AD%E6%96%87-0911.png
---

> 我们近期对 Apache APISIX 和 APISIX Ingress Controller 的部分功能进行了修复或改善，包括为 wasm 插件提供原生 json 数据结构入参支持，为 `chaitin-waf` 插件增加 UNIX sock 监听支持，以及支持在 APISIX Ingress Controller 中移除 APISIX 自身需要的 etcd，减少架构复杂度。详情请阅读本期双周报。

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

从 2023.8.28 - 2023.9.10，有 16 位开发者为 Apache APISIX 提交了 47 个 commit。感谢这些小伙伴为 Apache APISIX 添砖加瓦，是你们的无私付出，让 Apache APISIX 项目变得更好！

我们近期对部分功能进行了修复或改善，更新内容汇总如下：

1. 为 wasm 插件提供原生 json 数据结构入参支持

2. 为 `chaitin-waf` 插件增加 UNIX sock 监听支持

3. 支持在 APISIX Ingress 中移除 APISIX 自身需要的 etcd，减少架构复杂度（实验特性）

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/09/26/afJdz8VA_Group%204.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/09/26/KLSzp6dh_0910.png)

## 近期亮点功能

### Apache APISIX

- [为 wasm 插件提供原生 json 数据结构入参支持](https://github.com/apache/apisix/pull/10072)（贡献者：[Sn0rt](https://github.com/Sn0rt))

- [为 `chaitin-waf` 插件增加 UNIX sock 监听支持](https://github.com/apache/apisix/pull/10161)（贡献者：[zclaiqcc](https://github.com/zclaiqcc))

### APISIX Ingress Controller

- [支持在 APISIX Ingress 中移除 APISIX 自身需要的 etcd，减少架构复杂度](https://github.com/apache/apisix-ingress-controller/pull/1803)（贡献者：[AlinsRan](https://github.com/AlinsRan))

## 最新博客速览

- [APISIX 新特性之 WAF 解决方案：Coraza](https://apisix.apache.org/zh/blog/2023/09/08/apisix-integrates-with-coraza/)

  APISIX 与 Coraza 的集成为企业提供了可靠的安全防护，确保 API 服务的完整性和可靠性。

- [Apache APISIX 3.5.0 正式发布](https://apisix.apache.org/zh/blog/2023/09/01/release-apache-apisix-3.5.0/)

  我们很高兴地宣布 Apache APISIX 3.5.0 版本已经发布，带来了振奋人心的新功能和改进的用户体验。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
