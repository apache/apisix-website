---
title: "社区双周报（4.15-4.30）"
keywords: 
- Apache APISIX
- API 网关
- Kubernetes
- TiDB
- 贡献者
description: “独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的每周进展，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
---

> 从 4.15 到 4.30， 有 28 位开发者为 Apache APISIX 提交了 88 个 commits。感谢这些小伙伴为 Apache APISIX 添砖加瓦！

<!--truncate-->

## 导语

Apache APISIX 从开源第一天就以社区方式成长，迅速成为全世界最活跃的开源 API 网关项目。这些成就，离不开社区小伙伴们的共同奋斗。

“独行者速，众行者远”。Apache APISIX 社区周报希望可以帮助社区小伙伴们更好地掌握 Apache APISIX 社区的进展，方便大家参与到 Apache APISIX 社区中来。

我们还整理了一些适合新来社区的小伙伴们参加的 issue！感兴趣的同学们，走过路过不要错过！

## 贡献者统计

![本周贡献者名单](https://static.apiseven.com/202108/1652147147763-4ffa507f-e206-4197-bad3-35d7b0b3dc25.png)

![本周新晋贡献者](https://static.apiseven.com/202108/1652147147751-a2cca84b-cff6-4993-bbc7-9199d1352b6d.png)

## Good first issue

### Issue #6923

**链接**: https://github.com/apache/apisix/issues/6923

**问题描述**：当上游处于不健康状态时，`api-breaker` 仅返回 `unhealthy.http_statuses`，为了更兼容客户端，是否可以添加字段，返回默认响应体。参考文档 [api-breaker](https://apisix.apache.org/docs/apisix/plugins/api-breaker/) 。

## 近期功能特性亮点

- [Kubernetes 服务发现模式支持从环境变量读取配置](https://github.com/apache/apisix/pull/6869)（贡献者：[zhixiongdu027](https://github.com/zhixiongdu027)）

- [xRPC 支持基础的 Redis 功能](https://github.com/apache/apisix/pull/6873)（贡献者：[spacewander](https://github.com/spacewander)）

- [xRPC 支持基础的 Stream 代理](https://github.com/apache/apisix/pull/6885)（贡献者：[spacewander](https://github.com/spacewander)）

- [xRPC 支持动态上游](https://github.com/apache/apisix/pull/6901)（贡献者：[spacewander](https://github.com/spacewander)）

- [xRPC 支持根据 upstream_id 动态选择上游](https://github.com/apache/apisix/pull/6919)（贡献者：[spacewander](https://github.com/spacewander)）

Apache APISIX 的项目官网和 Github 上的 issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 issue 中搜索，也可以参与 issue 上的讨论，提出自己的想法和实践经验。

## 近期博文推荐

- [基于 TiDB 的 Apache APISIX 高可用配置中心的最佳实践](https://apisix.apache.org/zh/blog/2022/04/22/apisix-with-tidb-practice)：

在 TiDB Hackathon 2021 的比赛中，APISIX 参赛团队以四人组队方式（队长：张超，队员：白泽平、屠正松、陈婧晗）呈现了 TiDB 与 Apache APISIX 对接实现通用配置中心的能力。本文将为大家带来该项目背后的一些故事以及未来展望，如果您对该项目感兴趣，也欢迎随时参与到项目中来。
