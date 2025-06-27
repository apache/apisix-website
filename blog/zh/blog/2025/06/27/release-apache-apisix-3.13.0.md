---
title: "Apache APISIX 3.13.0 正式发布"
authors:
  - name: "Ashish Tiwari"
    title: "Author"
    url: "https://github.com/Revolyssup"
    image_url: "https://github.com/Revolyssup.png"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://github.com/kayx23.png"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: Apache APISIX 3.13.0 版本于 2025 年 6 月 27 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.13.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

此版本引入了多项新功能，包括 `mcp-bridge` 和 `lago` 插件、独立的 Admin API、状态健康检查端点、L4 代理健康检查等等。

虽然本次更新没有引入任何重大变更，但部分功能已被标记为未来版本中将废弃。请查阅下方的弃用说明，以便及时了解未来的变化。

## 弃用说明

### 标记 `server-info` 插件为弃用

`server-info` 插件已被标记为弃用，并将在未来的版本中被移除。该插件会定期将服务器信息写入 etcd，在大型集群中可能会由于启动时过多的 etcd 写入操作而导致性能问题。

更多信息请参见 [邮件列表讨论](https://lists.apache.org/thread/nrwqo1gbc0z4z48fkb8dd4rn0trnfnz9) 和 [PR #12244](https://github.com/apache/apisix/pull/12244)。

### 在 decoupled 的 `data_plane` 模式中对 etcd 写操作进行警告

当 APISIX 以 data plane 实例运行在解耦模式下时，如果通过 core.etcd 函数或 CLI 执行 etcd 写操作，现在将记录警告日志。未来版本中将弃用这些写操作，届时此类操作将被禁止。

更多信息请参见 [邮件列表讨论](https://lists.apache.org/thread/gfsooqm4cz6cx2sh7htmqgwlml5kggm2)，该讨论说明了未来的限制计划，以及本次变更的 [PR #12241](https://github.com/apache/apisix/pull/12241)。

## 新功能

### 新增 standalone 模式 Admin API

本次版本为 standalone 模式引入了新的 Admin API，允许用户通过 HTTP PUT（更新）和 GET（获取）来管理内存中的配置。配置支持以 JSON 或 YAML 格式提交，会在验证后广播至同一 APISIX 实例中的所有 worker 进程，实现完全无状态的运行模式。该功能提升了对 Ingress Controller 等场景的支持能力。

更多信息请参见相关 PR [#12179](https://github.com/apache/apisix/pull/12179)、[#12214](https://github.com/apache/apisix/pull/12214)、[#12256](https://github.com/apache/apisix/pull/12256)、[#12295](https://github.com/apache/apisix/pull/12295)、[#12317](https://github.com/apache/apisix/pull/12317)、[#12333](https://github.com/apache/apisix/pull/12333)。

### 支持 L4 代理的健康检查

APISIX 现已支持作为 L4 代理运行时对上游目标进行健康检查，从而提升 TCP/UDP 流量的可靠性并实现自动故障转移。

更多信息请参见 [PR #12180](https://github.com/apache/apisix/pull/12180)。

### 新增状态健康检查端点

本次版本引入了一个健康检查 status 端点，用于指示 APISIX 是否已准备好接收流量。在 standalone 模式下，该端点在从外部客户端（如 Ingress Controller）加载配置后报告就绪状态；在使用 etcd 时，该端点会在所有工作进程完成初始配置加载之前一直处于非就绪状态。该功能有助于外部系统准确执行就绪性检查。

更多信息请参见 [#12200](https://github.com/apache/apisix/pull/12200)。

### 新增 `mcp-bridge` 插件

本次版本引入了 `mcp-bridge` 插件，用于将基于 stdio 的 MCP 服务器转换为基于 HTTP SSE 的接口，并支持子进程管理和跨 NGINX worker 的会话原型处理。为支持更广泛的使用场景，MCP 服务器已重构为独立模块，替换了原始的 `mcp-bridge` 实现，采用更灵活的框架，同时通过现有测试保持向后兼容。

更多信息请参见 [#12168](https://github.com/apache/apisix/pull/12168) 和 [#12151](https://github.com/apache/apisix/pull/12151)。

### 新增 `lago` 插件

本次版本引入了 `lago` 插件，支持与 Lago 集成实现 API 商业化。该插件记录 API 调用，并基于配置的计费指标和订阅对消费者进行计费。它支持灵活的使用场景，例如面向 AI 服务的基于令牌的计费或基于调用次数的 API 计费，并允许将多个路由链接到不同的定价模型，以支持按需付费模式。

更多信息请参见 [#12196](https://github.com/apache/apisix/pull/12196)。

### 为 `loki-logger` 插件添加 `headers` 属性

本次版本为 `loki-logger` 插件新增了 `headers` 属性。通过此功能，用户可以在将日志发送到远程 Loki 服务时设置授权等自定义请求头。

更多信息请参见 [#12243](https://github.com/apache/apisix/pull/12243)。

### 为核心资源 schema 添加 metadata 字段

本次版本为核心资源 schema 添加了标准化的 metadata 字段，包括名称、描述和标签。此增强提升了资源的一致性，并解决了下游项目中的相关问题。

更多信息请参见 [#12224](https://github.com/apache/apisix/pull/12224)。

### 为批处理器新增 `max_pending_entries` 属性

本次版本为批处理器新增了 `max_pending_entries` 配置项，用于防止在日志服务器响应缓慢或无响应时引发内存激增。该配置允许在等待处理的回调数量过多时丢弃新的日志条目。

更多信息请参见 PR [#12338](https://github.com/apache/apisix/pull/12338)。

### 增强 Admin API 过滤功能

Admin API 现在支持通过 `service_id` 和 `upstream_id` 过滤 routes 和 stream routes，使用户更容易查询和管理相关资源，特别是对 APISIX Dashboard 项目更为友好。

更多信息请参见 PR [#12291](https://github.com/apache/apisix/pull/12291)。

### 在 Prometheus `node_info` 指标中暴露 APISIX 版本

本次版本增强了 Prometheus 的 `node_info` 指标，增加了 `version` 标签用于暴露当前 APISIX 版本，从而提升可观测性和版本追踪能力。

更多信息请参见 PR [#12367](https://github.com/apache/apisix/pull/12367)。

### 支持在 consumer 用户名中使用连字符 (-)

本次版本允许在 consumer 的用户名中使用连字符（`-`）。该功能适用于 Kubernetes 等场景，可以通过类似 `namespace-username` 的格式实现资源隔离。

更多信息请参见 PR [#12296](https://github.com/apache/apisix/pull/12296)。

## 依赖项更新

为提升稳定性、兼容性以及修复已知问题，本次版本升级了核心依赖项：

- 升级 OpenResty 至 v1.27.1.2（PR [#12307](https://github.com/apache/apisix/pull/12307)）
- 升级 LuaRocks 至 v3.12.0（PR [#12305](https://github.com/apache/apisix/pull/12305)）

## 其他更新

- 通过比较服务发现节点的地址来提升性能（PR [#12258](https://github.com/apache/apisix/pull/12258)）
- 将日志级别调整为 `debug`，以减少不必要的日志输出（PR [#12361](https://github.com/apache/apisix/pull/12361)）
- 移除过期批处理器时，将日志级别从 `warn` 调整为 `info`（PR [#12297](https://github.com/apache/apisix/pull/12297)）
- 重构 `ai-proxy` 插件，将 `read_response` 移动到 `ai_driver.request` 函数中（PR [#12101](https://github.com/apache/apisix/pull/12101)）
- 当新增节点数量小于或等于 1 时，避免启动过期的健康检查器（PR [#12118](https://github.com/apache/apisix/pull/12118)）
- 在节点数量为 0 时释放健康检查器资源（PR [#12126](https://github.com/apache/apisix/pull/12126)）
- CLI 工具仅在启动时解析并验证 `apisix.yaml` 文件（PR [#12216](https://github.com/apache/apisix/pull/12216)）
- 限制 TLSv1.3 的跨 SNI 会话恢复（PR [#12366](https://github.com/apache/apisix/pull/12366)）
- 修复 Kubernetes 服务发现单节点模式下的数据导出问题（PR [#12284](https://github.com/apache/apisix/pull/12284)）
- 在 Consul 中处理 `nil` 端口的情况，默认使用端口 80（PR [#12304](https://github.com/apache/apisix/pull/12304)）

## 变更日志

有关此版本的完整变更列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3130)。
