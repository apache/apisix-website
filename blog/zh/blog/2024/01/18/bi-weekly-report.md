---
title: "社区双周报 (01.01 - 01.14)"
keywords: ["Apache APISIX", "API 网关", "社区周报", "贡献者"]
description: Apache APISIX 社区的双周报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/01/18/bQr92a4V_Cover_CHN.png
---
> 最近，我们新增并改进了 Apache APISIX 的部分功能，如日志相关插件新增 include_req_body 相关选项、支持从源代码一键编译安装 apisix 和 apisix-runtime、`response-rewrite` 插件在使用 filters.regex 选项时支持 Brotli 压缩，以及当使用 radixtree_uri_with_parameter 路由引擎时支持 uri_param_ 变量。详情请阅读本期双周报。
<!--truncate-->
## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.01.01 至 2024.01.14，有 20 名开发者提交了 32 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

最近，我们对一些功能进行了新增和改进，更新内容总结如下：

1. 日志相关插件新增 include_req_body 相关选项

2. 支持从源代码一键编译安装 apisix 和 apisix-runtime

3. `response-rewrite` 插件在使用 filters.regex 选项时支持 Brotli 压缩

4. 当使用 radixtree_uri_with_parameter 路由引擎时支持 uri_param_ 变量

Apache APISIX 社区的双周报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/01/18/2DEKfgEm_List_Cons.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/01/18/XLn0OLo4_List_New.png)

## 近期亮点功能

- [日志相关插件新增 include_req_body 相关选项](https://github.com/apache/apisix/pull/10738)（贡献者：[smileby](https://github.com/smileby))

- [支持从源代码一键编译安装 apisix 和 apisix-runtime](https://github.com/apache/apisix/pull/10729)（贡献者：[Vacant2333](https://github.com/Vacant2333))

- [`response-rewrite` 插件在使用 filters.regex 选项时支持 Brotli 压缩](https://github.com/apache/apisix/pull/10733)（贡献者：[yuweizzz](https://github.com/yuweizzz))

- [当使用 radixtree_uri_with_parameter 路由引擎时支持 uri_param_ 变量](https://github.com/apache/apisix/pull/10645)（贡献者：[boekkooi-lengoo](https://github.com/boekkooi-lengoo))

## 最新博客速览

- [Apache APISIX 3.8.0 正式发布](https://apisix.apache.org/zh/blog/2024/01/15/release-apache-apisix-3.8.0/)

  我们很高兴地宣布 Apache APISIX 3.8.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

- [借力 APISIX 的高可用，实现企业亿级流量](https://apisix.apache.org/zh/blog/2023/12/15/high-availability-of-apisix-and-api7/)

  作者：王院生，支流科技联合创始人兼 CTO，Apache APISIX PMC 成员，《Apache APISIX 实战》作者。本文整理自 2023 年 11 月王院生在 APISIX 上海 Meetup 的演讲。

- [政采云 APISIX 优化跨网 RPC 性能实践](https://apisix.apache.org/zh/blog/2023/12/08/zhengcaiyun-uses-apisix/)

  为解决数据跨网问题，政采云搭建了一条基于 Dubbo 的“高速公路”，同时采用了 APISIX 作为中心网关，为网络路由、公共特性提供支持。本文将重点介绍政采云“高速公路”工程建设中如何优化网关和协议的性能以应对挑战。

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
