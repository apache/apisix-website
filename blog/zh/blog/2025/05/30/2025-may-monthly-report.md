---
title: "2025 社区月报 (05.01 - 05.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/05/30/ss67zkrY_2025-may-monthly-report-cover-cn.webp
---

> 最近，我们新增了一些功能，如新增了 `lago` 插件，在 Standalone 模式下支持 API 配置增量更新，为 stream 子系统添加健康检查器，新增 Standalone Admin API 等。有关更多细节，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.05.01 至 2025.05.30，有 8 名开发者提交了 39 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/05/30/0OnqOGTo_may-contributor-list.webp)

## 近期亮点功能

### 完善资源 schema 的元数据

相关 PR：https://github.com/apache/apisix/pull/12224

贡献者：[bzp2010](https://github.com/bzp2010)

此 PR 整理了资源的 schema，并确保主要由用户操作的资源包含一个 metadata 部分，其中包括 name、desc 和 labels 字段。这有助于解决一些下游项目中的问题，例如新的嵌入式仪表盘或 APISIX 的 API 声明式配置工具（ADC）中的相关问题。

### 新增 `lago` 插件

相关 PR：https://github.com/apache/apisix/pull/12196

贡献者：[bzp2010](https://github.com/bzp2010)

新增对 `lago` 插件的支持，使用户可以将 APISIX 用作计费网关，根据 API 使用量向订阅者收费。该插件适用于多种场景，例如在 AI 云平台中按消耗的 token 数量计费（如 OpenAI 和 DeepSeek），或对特定 API 调用进行计费（例如销售天气类 API）。

### Standalone 模式下支持 API 配置增量更新

相关 PR：https://github.com/apache/apisix/pull/12200

贡献者：[AlinsRan](https://github.com/AlinsRan)

在 Standalone 模式下，APISIX 的 Admin API 要求客户端每次同步时都拉取整个配置。随着配置规模的增长或频繁变动，这种全量同步方式会带来不必要的网络开销，并增加更新延迟。此外，频繁的资源变更会触发内部 radixtree 的完全重建，在高频变更场景下严重影响路由查找性能。在服务发现场景中，上游配置经常变动，我们希望只更新上游数据，而不影响其他资源的使用。

### 支持 L4 健康检查

相关 PR：https://github.com/apache/apisix/pull/12180

贡献者：[nic-6443](https://github.com/nic-6443)

该 PR 为 APISIX 在作为 L4 代理运行时增加了健康检查支持。

### 新增 Standalone Admin API

相关 PR：https://github.com/apache/apisix/pull/12179

贡献者：[bzp2010](https://github.com/bzp2010)

该 PR 引入了一个专用于 Standalone 模式的 Admin API，使用户能够更新内存中的配置，而无需依赖文件系统，从而进一步增强无状态特性。用户可通过 HTTP PUT 请求以 JSON 或 YAML 格式提交配置。该特性消除了对静态配置文件的依赖，有助于支持 Ingress Controller 等使用场景。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 最新博客速览

- [游戏业务出海：TAPISIX 稳定运营实践](https://apisix.apache.org/zh/blog/2025/05/07/apisix-gateway-practice-in-tencent-timi/)

  本文详细介绍了腾讯游戏旗下的天美工作室群使用基于开源 APISIX 定制开发的业务网关 TAPISIX，在满足海外业务的高合规性要求、降低开发和运维门槛、提高系统灵活性和可靠性等方面发挥了关键作用。

- [APISIX 在荣耀海量业务下的网关实践](https://apisix.apache.org/zh/blog/2025/04/27/apisix-honor-gateway-practice-in-massive-business/)

  本文将详细阐述荣耀基于 APISIX 的网关实践。荣耀自 2021 年引入 APISIX 以来，通过持续的优化与扩展，构建了一个高性能、高扩展性且可靠的网关平台，成功支持了海量业务的快速发展。

- [从 stdio 到 HTTP SSE：使用 APISIX 托管 MCP Server](https://apisix.apache.org/zh/blog/2025/04/21/host-mcp-server-with-api-gateway/)

  探索 Apache APISIX 的 `mcp-bridge` 插件如何无缝地将基于 stdio 的 MCP Server 转换为可扩展的 HTTP SSE 服务。
