---
title: "社区月报 (07.01 - 07.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/07/31/3H1GYuE4_report-july-cn.png
---
> 最近，我们新增并改进了 Apache APISIX 的部分功能，即删除 `config-default.yaml` 并将其内容移动到 Lua 文件中。有关更多功能新亮点，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.07.01 至 2024.07.31，有 13 名开发者提交了 21 个 commit，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/07/31/Uk3y8OVm_july-contributors.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/07/31/x59QmPpL_new-contributors-july.png)

## 近期亮点功能

- [删除 config-default.yaml 并将其内容移动到 Lua 文件中](https://github.com/apache/apisix/pull/11343)（贡献者：[bzp2010](https://github.com/bzp2010))
  
  Apache APISIX 有两个配置文件：`config.yaml`（用户可以修改）和 `config-default.yaml`（默认配置文件，用户不应修改）。当 APISIX 启动时，它会读取这两个文件并合并配置，用户配置文件中的设置会覆盖默认配置文件中的设置，最终生成在运行时实际使用的配置文件。

  然而，在实际使用过程中，用户往往对如何修改自定义配置不够明确。为了简化配置过程并避免因修改默认文件而导致的意外问题，我们将默认配置值移动到硬编码的 Lua 文件中。这样用户可以专注于自定义 `config.yaml` 文件，而不会有意外更改核心默认设置的风险。

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
