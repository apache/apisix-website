---
title: "社区月报 (01.27 - 02.28)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/02/28/b84ROEay_feb-monthly-report-cover-cn.png
---

> 最近，我们新增了 Apache APISIX 的部分功能，如支持 `ai-proxy-multi` 插件，以及支持 `_meta.pre_function` 在各个阶段前执行自定义逻辑。有关更多细节，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.01.27 至 2025.02.28，有 14 名开发者提交了 39 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/02/28/JaHy54nf_feb-contributors.png)

![新晋贡献者](https://static.api7.ai/uploads/2025/02/28/0jejWHGZ_feb-new-contributors.jpg)

## 近期亮点功能

1. [支持 `_meta.pre_function` 在各个阶段前执行自定义逻辑](https://github.com/apache/apisix/pull/11793) (贡献者：[Revolyssup](https://github.com/Revolyssup))

将 `pre_function` 添加到插件元数据中，以允许一些个性化代码在所有插件运行之前运行。比如注册个性化变量，以便插件中可以引用和使用这些临时变量。

2. [支持 `ai-proxy-multi` 插件](https://github.com/apache/apisix/pull/11986)(贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

`ai-proxy-multi` 插件允许配置多个 LLM 目标以实现负载均衡和重试。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
