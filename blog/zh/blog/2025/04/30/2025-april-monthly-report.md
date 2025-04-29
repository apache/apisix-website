---
title: "社区月报 (04.01 - 04.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/04/28/d6UbcQN4_april-monthly-report-cover-cn.webp
---

> 最近，我们新增了 Apache APISIX 的部分功能，即新增了 mcp-bridge 插件。有关更多细节，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.04.01 至 2025.04.30，有 13 名开发者提交了 53 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/04/28/7DZQnq0l_april-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/04/28/khDhj3Jw_april-new-contributors.webp)

## Good First Issue

### 为 AI 插件编写中文文档

相关 RP：[https://github.com/apache/apisix/issues/12161](https://github.com/apache/apisix/issues/12161)

Issue 描述：目前 AI 插件分类下的插件文档仅有英文版，需要新增中文版。提供多语言的全面文档可以确保不同背景的开发者能够有效地使用和贡献项目。

## 近期亮点功能

### 1. 新增 `mcp-bridge` 插件

相关 PR：https://github.com/apache/apisix/pull/12151

贡献者：[bzp2010](https://github.com/bzp2010)

此 PR 引入了一个名为 mcp-bridge 的新插件，使用户能够将任何基于 stdio 的 MCP Server 转换为基于 HTTP SSE 的 Server。该插件由两部分组成：一部分用于处理标准输入输出和管理子进程生命周期，另一子模块用于支持 MCP 会话管理。

此 PR 还包括一个轻量级的 MCP 会话管理模块。它负责分配会话 ID 并管理会话的队列和心跳定时器。通过使用共享字典，即使在不同的 NGINX 工作进程处理 SSE 连接和 RPC 调用时，也能确保其正常运行。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 最新博客速览

- [APISIX 在荣耀海量业务下的网关实践](https://apisix.apache.org/zh/blog/2025/04/27/apisix-honor-gateway-practice-in-massive-business/)

  本文将详细阐述荣耀基于 APISIX 的网关实践。荣耀自 2021 年引入 APISIX 以来，通过持续的优化与扩展，构建了一个高性能、高扩展性且可靠的网关平台，成功支持了海量业务的快速发展。

- [从 stdio 到 HTTP SSE：使用 APISIX 托管 MCP Server](https://apisix.apache.org/zh/blog/2025/04/21/host-mcp-server-with-api-gateway/)

  探索 Apache APISIX 的 mcp-bridge 插件如何无缝地将基于 stdio 的 MCP Server 转换为可扩展的 HTTP SSE 服务。

- [APISIX AI 网关介绍](https://apisix.apache.org/zh/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/)

  在 Apache APISIX 3.12.0 版本中，我们进一步强化了其作为现代 API 网关的 AI 支持能力。通过丰富的插件生态和灵活的架构设计，为开发者提供了完整的 AI 网关产品。
  
