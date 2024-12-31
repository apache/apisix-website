---
title: "社区月报 (12.01 - 12.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/12/31/xuAagbRY_monthly-report-cover-cn.png
---

> 最近，我们新增并改进了 Apache APISIX 的部分功能，包括支持 `limit-count` 插件使用 `metadata` 配置速率限制响应头和支持将 `system` 设置为值并引用 `ca_certs` 等。有关更多功能新亮点，请阅读本期月报。
<!--truncate-->
## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.12.01 至 2024.12.31，有 11 名开发者提交了 27 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/12/31/npwFTjZH_dec-monthly-report-en.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/12/31/LWGfMhY3_dec-new-contributors.jpg)

## 近期亮点功能

1. [支持 `limit-count` 插件使用 `metadata` 配置速率限制响应头](https://github.com/apache/apisix/pull/11831) (贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

此 PR 允许用户使用插件元数据来配置速率限制响应头的名称。

2. [新增插件 `workflow.lua` 修改逻辑](https://github.com/apache/apisix/pull/11832) (贡献者：[Revolyssup](https://github.com/Revolyssup))

当前逻辑要求在向工作流插件中添加任何新插件时，必须更改在 `workflow.lua` 中定义的 `supported_actions` 表。通过此更改，表中的注册工作将通过实现 `workflow_handler()` 函数转移到新添加的插件。

3. [支持将 `system` 设置为值并引用 `ca_certs`](https://github.com/apache/apisix/pull/11597) (贡献者：[Revolyssup](https://github.com/Revolyssup))

通过此功能，用户可以将系统设置为值，以便在使用系统定义的 CA 证书时使用 `ca_certs`。

4. [插件 workflow 中的 `case` 设为非必填字段](https://github.com/apache/apisix/pull/11436) (贡献者：[Revolyssup](https://github.com/Revolyssup))

此更改将 `case` 设置为非必填字段，缺少 `case` 将被视为默认匹配。

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
