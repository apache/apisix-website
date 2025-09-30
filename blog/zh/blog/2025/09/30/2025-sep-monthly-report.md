---
title: "2025 社区月报 (09.01 - 09.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/09/29/qUyHsgwA_sep-monthly-report-cover-cn.webp
---

> 最近，我们新增并优化了一些功能，如 `request-id` 插件支持 KSUID 算法、`ai-proxy-multi` 插件针对 `429`/`5xx` 状态码增加自动重试与节点降级等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.09.01 至 2025.09.30，有 17 名开发者提交了 76 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/09/29/8AmFT8hp_2025-sep-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/09/29/ukKJS7E3_2025-sep-new-contributors.webp)

## 近期亮点功能

### 1. Admin API 在写入时不再自动填充默认值

相关 PR：https://github.com/apache/apisix/pull/12603

贡献者：[SkyeYoung](https://github.com/SkyeYoung)

Admin API 不再用默认值覆盖用户数据。写入 etcd 时保持原样，默认值只在 APISIX 内部补齐，既避免用户配置被悄悄改动，也保证 Ingress Controller 的 ADC 比对逻辑与旧版本兼容。

### 2. `request-id` 插件支持 KSUID 算法

相关 PR：https://github.com/apache/apisix/pull/12573

贡献者：[Revolyssup](https://github.com/Revolyssup)

本 PR 将原有的 `request-id` 生成方式替换为 KSUID（可排序唯一标识符）算法。KSUID 始终为 27 位字符，采用 base62 编码，确保其可用于 URL 场景。其核心优势在于支持字典序排序，即使作为字符串处理也能保持时间顺序。该算法还包含 128 位随机数，相比标准 UUID 具有更强的防冲突能力。

### 3. `ai-proxy-multi` 插件针对 429/5xx 状态码增加自动重试与节点降级

相关 PR：https://github.com/apache/apisix/pull/12571

贡献者：[Revolyssup](https://github.com/Revolyssup)

`ai-proxy-multi` 插件现对 `429`/`5xx` 错误自动重试，并依次切换到下一个健康模型节点，直到请求成功，减少客户端感知到的失败。

### 4. `ai-proxy` 插件的访问日志与 Prometheus 指标中新增延迟和用量

相关 PR：https://github.com/apache/apisix/pull/12518

贡献者：[Revolyssup](https://github.com/Revolyssup)

`ai-proxy` 插件在访问日志里输出每次 AI 请求的延迟和 token 用量，方便排障；同时把 AI 请求纳入 Prometheus 指标，并新增 `request_type`（用于区分普通请求与 AI 请求）和 `llm_model` 两个标签。

### 5. 日志新增 ctx 变量保留客户端原始 LLM 模型

相关 PR：https://github.com/apache/apisix/pull/12554

贡献者：[bzp2010](https://github.com/bzp2010)

新增 ctx 变量保存客户端原始请求的 LLM 模型，即使网关后续改写参数，日志仍能记录用户最初选择的模型。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
