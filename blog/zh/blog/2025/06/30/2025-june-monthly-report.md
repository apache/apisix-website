---
title: "2025 社区月报 (06.01 - 06.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/06/30/aYysTnJw_june-monthly-report-cover-cn.webp
---

> 最近，我们新增并优化了一些功能，如新增 devcontainer 支持、增强 Admin API 过滤功能、为 `loki-logger` 插件添加 `headers` 属性等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.06.01 至 2025.06.30，有 17 名开发者提交了 86 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/06/30/ctN7FHKp_june-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/06/30/VDMkGEcj_june-new-contributors.webp)

## 近期亮点功能

### 1. 新增 devcontainer 支持

相关 PR：https://github.com/apache/apisix/pull/11765

贡献者：[bzp2010](https://github.com/bzp2010)

本 PR 新增 devcontainer 支持，覆盖 Linux、Windows (WSL2)、macOS 操作系统及 amd64/arm64 CPU 架构，适配主流开发环境，开箱即用。另外，通过 docker-compose 维护 etcd，可在本地回环地址中对它进行访问。

### 2. 为 `loki-logger` 插件添加 `headers` 属性

相关 PR：https://github.com/apache/apisix/pull/11420

贡献者：[slow-groovin](https://github.com/slow-groovin)

为 `loki-logger` 插件新增了 `headers` 属性 `authorization`。通过此功能，用户可以在将日志发送到远程 Loki 服务时，设置授权等自定义请求头。

### 3. 为批处理器新增 `max_pending_entries` 配置项

相关 PR：https://github.com/apache/apisix/pull/12338

贡献者：[Revolyssup](https://github.com/Revolyssup)

此 PR 为批处理器新增了 `max_pending_entries` 配置项，用于防止在日志服务器响应缓慢或无响应时引发内存激增。该配置允许在等待处理的回调数量过多时丢弃新的日志条目。

### 4. 增强 Admin API 过滤功能

相关 PR：https://github.com/apache/apisix/pull/12291

贡献者：[bzp2010](https://github.com/bzp2010)

Admin API 支持通过 `service_id` 和 `upstream_id` 过滤 routes 和 stream routes，使用户更容易查询和管理相关资源，特别是对 APISIX Dashboard 项目更为友好。

### 5. 将 APISIX Dashboard 集成到开发镜像

相关 PR：https://github.com/apache/apisix/pull/12369

贡献者：[bzp2010](https://github.com/bzp2010)

此 PR 将 APISIX Dashboard 集成到开发镜像。

### 6. 为 APISIX Dashboard 新增嵌入式仪表盘

相关 PR：https://github.com/apache/apisix/pull/12276

贡献者：[bzp2010](https://github.com/bzp2010)

作为 APISIX Dashboard 优化计划的一部分，本 PR 在 APISIX 中支持了嵌入式仪表盘的基础架构。

### 7. 将 APISIX Dashboard 构建到 `apisix:dev` Docker 镜像中

相关 PR：https://github.com/apache/apisix/pull/12300

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

此特性为 APISIX Dashboard 优化计划的一部分。该 PR 引入了一个工作流，仅 master 主分支上提交代码时，会触发 APISIX Dashboard `apisix:dev` Docker 镜像的构建与推送。将镜像构建文件从 `apisix-docker` 移至主 `apisix` 仓库，便于维护管理，并确保开发测试能及时用上最新代码。

### 8. 为 Standalone 模式引入 JSON 格式支持

相关 PR：https://github.com/apache/apisix/pull/12296

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

此 PR 为 Standalone 模式下的配置引入了 JSON 格式支持。通过扩展 `apisix/core/config_yaml.lua`，实现了对 JSON 的兼容，而无需修改现有的 YAML 配置提供程序。JSON 的解析速度比 YAML 更快，并且便于在未来支持 TOML 等其他格式。

### 9. 为 Standalone 模式中 `credential_id` 增加对更多字符的支持

相关 PR：https://github.com/apache/apisix/pull/12295

贡献者：[AlinsRan](https://github.com/AlinsRan)

为 APISIX 的 Standalone 模式中的 `credential_id` 增加了对更多字符的支持，包括下划线（_）、点（.）和短横线（-），提升了凭证命名的灵活性。

### 10. 支持在 consumer 用户名中使用连字符 (-)

相关 PR：https://github.com/apache/apisix/pull/12296

贡献者：[AlinsRan](https://github.com/AlinsRan)

APISIX Ingress Controller 通过 namespace 来隔离资源，例如，为 consumer 设置 `namespace-username` 格式的名称。本 PR 为 APISIX 增加对相同命名规则的支持，允许在 consumer 用户名中使用连字符，从而与 APISIX Ingress Controller 相一致。

### 11. 在 Prometheus `node_info` 指标中暴露 APISIX 版本

相关 PR：https://github.com/apache/apisix/pull/12367

贡献者：[flearc](https://github.com/flearc)

此 PR 增强了 Prometheus 的 `node_info` 指标，增加了 `version` 标签用于暴露当前 APISIX 版本，从而提升可观测性和版本追踪能力。

### 12. 在解耦 `data_plane` 模式下对执行 etcd 写操作进行警告

相关 PR：https://github.com/apache/apisix/pull/12241

贡献者：[LiteSun](https://github.com/LiteSun)

当 APISIX 以数据面实例运行在解耦模式时，如果通过 `core.etcd` 函数或 CLI 执行 etcd 写操作，将记录警告日志。未来版本中将弃用并禁止此类操作。

### 13. 将 Nacos 发现机制的事件库替换为共享字典

相关 PR：https://github.com/apache/apisix/pull/12353

贡献者：[Revolyssup](https://github.com/Revolyssup)

此 PR 将 Nacos 发现机制从 `lua-resty-events` 库改为使用共享字典（shdict）。此前使用 `lua-resty-events` 时，部分工作进程无法可靠接收事件，导致数据不一致。现在由特权代理负责从 Nacos 获取数据并写入 shdict，所有工作进程均从 shdict 读取数据，确保数据访问一致性。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 最新博客速览

- [游戏业务出海：TAPISIX 稳定运营实践](https://apisix.apache.org/zh/blog/2025/05/07/apisix-gateway-practice-in-tencent-timi/)

  本文详细介绍了腾讯游戏旗下的天美工作室群使用基于开源 APISIX 定制开发的业务网关 TAPISIX，在满足海外业务的高合规性要求、降低开发和运维门槛、提高系统灵活性和可靠性等方面发挥了关键作用。

- [APISIX 在荣耀海量业务下的网关实践](https://apisix.apache.org/zh/blog/2025/04/27/apisix-honor-gateway-practice-in-massive-business/)

  本文将详细阐述荣耀基于 APISIX 的网关实践。荣耀自 2021 年引入 APISIX 以来，通过持续的优化与扩展，构建了一个高性能、高扩展性且可靠的网关平台，成功支持了海量业务的快速发展。

- [从 stdio 到 HTTP SSE：使用 APISIX 托管 MCP Server](https://apisix.apache.org/zh/blog/2025/04/21/host-mcp-server-with-api-gateway/)

  探索 Apache APISIX 的 `mcp-bridge` 插件如何无缝地将基于 stdio 的 MCP Server 转换为可扩展的 HTTP SSE 服务。
