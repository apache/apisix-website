---
title: "2025 社区月报 (08.01 - 08.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/08/29/IH1SUVsc_aug-monthly-report-cover-cn.webp
---

> 最近，我们新增并优化了一些功能，如新增 ai-aliyun-content-moderation 插件、在 openid-connect 插件中支持使用环境变量、ai-proxy-multi 插件新增健康检查支持等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.08.01 至 2025.08.31，有 16 名开发者提交了 56 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/08/29/SWsZprNc_aug-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/08/29/7SSxLwiC_aug-new-contributors.webp)

## 近期亮点功能

### 1. 新增 `ai-aliyun-content-moderation` 插件

相关 PR：https://github.com/apache/apisix/pull/12530

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 引入 `ai-aliyun-content-moderation` 插件，用于通过阿里云对 LLM 返回的请求/响应内容进行内容审核。

### 2. 使用 sse.lua 重构 Chunk 解码

相关 PR：https://github.com/apache/apisix/pull/12530

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 还将 LLM 后端的 chunk 解码逻辑重构并迁移到独立的 `sse.lua` 中。由于 AI 响应由 APISIX 直接管理，无法直接触发原有的 `lua_body_filter` 逻辑，因而新增 `lua_response_filter` 阶段；同时更新 `ai-request-rewrite` 插件，以利用 `lua_body_filter` 机制写入响应。

### 3. 在 `openid-connect` 插件中支持使用环境变量

相关 PR：https://github.com/apache/apisix/pull/11451

贡献者：[darkSheep404](https://github.com/darkSheep404)

### 4. `ai-proxy-multi` 插件新增健康检查支持

相关 PR：https://github.com/apache/apisix/pull/12509

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 为 `ai-proxy-multi` 插件引入健康检查功能，确保流量仅被转发到健康可用的 AI 后端。同时，Healthcheck Manager 经过改造，现已支持通过 resource key 直接引用运行时动态创建的 upstream。

### 5. 增强 `ai-proxy` 插件可观测性

相关 PR：https://github.com/apache/apisix/pull/12518

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 在访问日志中新增记录 `ai-proxy` 插件请求的延迟及 Token 信息，方便排查问题；同时为 AI 相关请求新增 Prometheus 指标，并引入两个标签：`request_type`（区分普通请求与 AI 请求）和 `llm_model`（标识所用大模型）。

### 6. Standalone API 元数据中新增 `last_modified` 与 `digest` 字段

相关 PR：https://github.com/apache/apisix/pull/12526

贡献者：[bzp2010p](https://github.com/bzp2010)

本 PR 为 Standalone API 新增了元数据响应头，包含 `X-Last-Modified` 和 `X-Digest` 字段。这些字段用于追踪多节点 APISIX 集群中最近更新的实例节点，并标识当前生效的配置摘要。同时新增了对 `HEAD` 方法的支持，该方法仅返回元数据而不返回具体配置内容。

### 7. 在 Workflow 插件中支持 `limit-conn` 插件

相关 PR：https://github.com/apache/apisix/pull/12465

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 把 `limit-conn` 插件加入到 workflow 插件内使用范畴中，为工作流扩展了基于连接的流量控制能力。

### 8. 引入 Healthcheck Manager，解耦上游与健康检查

相关 PR：https://github.com/apache/apisix/pull/12426

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 解耦上游与健康检查器之间的强耦合，改由全新的 Healthcheck Manager 维护一个轻量级索引，该索引以 `resource_path` 和 `resource_version` 作为键值。后台定时器会异步从“待检池”中创建探活器；用户请求仅需将上游加入队列，不再直接创建健康检查器，从而将健康检查器的生命周期与请求路径完全隔离。

### 9. `ai-proxy` 插件支持日志上报

相关 PR：https://github.com/apache/apisix/pull/12515

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 为 `ai-proxy` 插件定义了标准日志结构，并支持将 `ai-proxy` 请求/响应以日志形式推送至任何记录器。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
