---
title: "社区月报 (04.01 - 04.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/04/30/0133BTQL_monthly-report-apr-cn.png
---
> 最近，我们新增并改进了 Apache APISIX 的部分功能，包含新增 Kubernetes 服务的转存数据接口、在 `kafka-logger` 插件中引入新属性 `max_resp_body_bytes` 和 `max_req_body_bytes` 以降低 CPU 使用率，和自动生成 Admin API 密钥以删除 API 密钥的硬编码等。有关更多功能新亮点，请阅读本期月报。
<!--truncate-->
## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.04.01 至 2024.04.30，有 16 名开发者提交了 43 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/04/30/txD3ooma_contributor-listi-apr.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/04/30/b01wMlfs_new-contributors-apr.png)

## 近期亮点功能

- [新增 Kubernetes 服务的转存数据接口](https://github.com/apache/apisix/pull/11111)（贡献者：[hanqingwu](https://github.com/hanqingwu))

- [在 `kafka-logger` 插件中引入新属性 `max_resp_body_bytes` 和 `max_req_body_bytes` 以降低 CPU 使用率](https://github.com/apache/apisix/pull/11133)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

- [自动生成 Admin API 密钥，以删除硬编码的 API 密钥](https://github.com/apache/apisix/pull/11080)（贡献者：[Revolyssup](https://github.com/Revolyssup))

## 最新博客速览

- [Apache APISIX 3.8.1 正式发布](https://apisix.apache.org/zh/blog/2024/04/29/release-apache-apisix-3.8.1/)

- [Apache APISIX 3.9.1 正式发布](https://apisix.apache.org/zh/blog/2024/04/29/release-apache-apisix-3.9.1/)

Apache APISIX 的项目官网和 Github 上的 Issue 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issue 中搜索，也可以参与 Issue 上的讨论，提出自己的想法和实践经验。
