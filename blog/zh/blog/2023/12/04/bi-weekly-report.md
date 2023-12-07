---
title: "社区双周报 (11.20 - 12.03)"
keywords: ["Apache APISIX", "API 网关", "社区周报", "贡献者"]
description: Apache APISIX 社区的双周报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2023/12/04/ZgiF2B5y_1204-ZH.png
---
> 最近，我们新增并改进了 Apache APISIX 的部分功能，如新增 `multi-auth` 插件、`openid-connect` 新增配置项 "required scopes"、增强 `body-transformer` 插件。详情请阅读本期双周报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2023.11.20 至 2023.12.03，有 22 名开发者提交了 45 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

最近，我们对一些功能进行了新增和改进，更新内容总结如下：

1. 新增 `multi-auth` 插件

2. `openid-connect` 新增配置项 "required scopes"

3. 增强 `body-transformer` 插件

Apache APISIX 社区的双周报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2023/12/04/PnNWmVdX_1204-Con.png)

![新晋贡献者](https://static.apiseven.com/uploads/2023/12/04/vrpTk1y4_1204-New.png)

## 近期亮点功能

- [新增 `multi-auth` 插件](https://github.com/apache/apisix/pull/10482)（贡献者：[madhawa-gunasekara](https://github.com/madhawa-gunasekara))

- [`openid-connect` 新增配置项 "required scopes"](https://github.com/apache/apisix/pull/10493)（贡献者：[csotiriou](https://github.com/csotiriou))

- [增强 `body-transformer` 插件](https://github.com/apache/apisix/pull/10496)（贡献者：[yongxiaodong](https://github.com/yongxiaodong))

## 最新博客速览

- [分布式网关 APISIX 在大规模视频类业务中的落地实践](https://apisix.apache.org/zh/blog/2023/11/30/migu-video-utilizes-apisix/)

  作者：夏煜，咪咕视讯建设运行中心-高级应用运维工程师。本文整理自 2023 年 11 月夏煜在 APISIX 上海 Meetup 的演讲。

- [Apache APISIX 3.7.0 正式发布](https://apisix.apache.org/zh/blog/2023/11/21/release-apache-apisix-3.7.0/)

  我们很高兴地宣布 Apache APISIX 3.7.0 版本已经发布，带来了一系列新功能、Bug 修复和相关用户体验优化。

- [APISIX Ingress Controller：一种无需 etcd 的轻量级部署方式](https://apisix.apache.org/zh/blog/2023/10/18/ingress-apisix/)

  APISIX Ingress Controller 创新架构，摆脱对 etcd 集群的依赖，极大简化维护成本和系统复杂性。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
