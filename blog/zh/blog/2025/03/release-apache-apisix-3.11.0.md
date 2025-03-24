---
title: "Apache APISIX 3.12.0 正式发布"
authors:
  - name: "Abhishek Choudhary"
    title: "Author"
    url: "https://github.com/shreemaan-abhishek"
    image_url: "https://github.com/shreemaan-abhishek.png"
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
description: Apache APISIX 3.12.0 版本于 2025 年 3 月 25 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.12.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

本次新版本增加了许多新功能，包括几个 AI 插件、`openid-connect` 插件中对有效发行者的支持、速率限制响应头名称自定义的支持等等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 重构 `ai-proxy` 插件

`ai-proxy` 插件已重构，以提高可维护性和性能。更改包括不需要上游配置、删除架构中的最大超时以及支持各种提供商，包括 `openai`、`deepseek` 和 `openai-compatible`。

有关更多信息，请参阅 PR [#12030](https://github.com/apache/apisix/pull/12030)、[#12055](https://github.com/apache/apisix/pull/12055) 和 [#12004](https://github.com/apache/apisix/pull/12004)。

### 在 `opentelemetry` 插件中用插件元数据替换插件属性

插件属性 `batch_span_processor`、`collector` 和 `trace_id_source` 配置现已从配置文件迁移到插件元数据。

有关详细信息，请参阅 PR [#11940](https://github.com/apache/apisix/pull/11940)。

### 为 Prometheus 指标添加过期时间

在之前的版本中，Prometheus 指标不会过期。APISIX 现在确保所有 Prometheus 指标都有过期时间，以防止陈旧数据累积。您可以在配置文件中自定义指标过期时间。依赖 Prometheus 的用户应该会看到更高效的存储使用率。

有关更多信息，请参阅 PR [#11838](https://github.com/apache/apisix/pull/11838)。

### 删除 `workflow` 插件中 `case` 的要求

`workflow` 插件现在不强制将 `case` 作为必需属性。

有关更多信息，请参阅 PR [#11787](https://github.com/apache/apisix/pull/11787)。

## 新功能

### 在 `ai-proxy` 插件中支持代理到嵌入模型

APISIX 现在除了代理到 LLM 模型外，还支持代理到嵌入模型。

有关更多信息，请参阅 PR [#12062](https://github.com/apache/apisix/pull/12062)。

### 添加 `ai-proxy-multi` 插件

引入了 `ai-proxy-multi` 插件，以支持多个 LLM 实例之间的负载平衡，增强容错能力。该插件可与 `ai-rate-limiting` 一起使用，以实现特定实例的速率限制。

有关更多信息，请参阅 PR [#11986](https://github.com/apache/apisix/pull/11986)。

### 添加 `ai-rate-limiting` 插件

`ai-rate-limiting` 插件引入了 LLM 实例特定的速率限制策略，允许根据工作负载需求对 API 使用进行细粒度控制。这有助于防止过度资源消耗，同时保持最佳模型性能。

有关更多信息，请参阅 PR [#12037](https://github.com/apache/apisix/pull/12037) 和 [#12047](https://github.com/apache/apisix/pull/12047)。

### 添加 `ai-prompt-guard` 插件

新的 `ai-prompt-guard` 插件通过过滤有害或不需要的提示，为 LLM 生成的响应提供安全性和内容审核。此功能在需要输入清理以防止滥用 LLM 的应用程序中很有用。

有关更多信息，请参阅 PR [#12008](https://github.com/apache/apisix/pull/12008)。

### 添加 `ai-rag` 插件

`ai-rag` 插件通过将外部知识检索与 LLM 响应集成，支持检索增强生成 (RAG) 工作流。这通过合并相关事实数据来增强 LLM 生成的内容。

有关更多信息，请参阅 PR [#11568](https://github.com/apache/apisix/pull/11568)。

### 添加 `ai-content-moderation` 插件

`ai-content-moderation` 插件与 AWS Comprehend 集成，通过过滤有害或不适当的 LLM 生成内容来帮助实施内容策略。这对于合规性和内容安全应用程序非常有用。

有关更多信息，请参阅 PR [#11541](https://github.com/apache/apisix/pull/11541)。

### 支持在 `ssl_trusted_certificate` 中使用系统提供的证书

APISIX 现在允许通过在配置文件中将 `ssl_trusted_certificate` 设置为系统来使用系统提供的 SSL 证书。这简化了使用系统提供的 CA 包的环境的证书管理。

有关更多信息，请参阅 PR [#11809](https://github.com/apache/apisix/pull/11809)。

### 支持在插件中执行自定义逻辑

插件中引入了新的 `_meta.pre_function` 属性，允许在每个请求处理阶段之前执行自定义逻辑。此功能提供了对请求处理的更大控制，支持变量注册等预处理任务。

有关更多信息，请参阅 PR [#11793](https://github.com/apache/apisix/pull/11793)。

### 支持匿名消费者

APISIX 现在支持“匿名”消费者，可以在身份验证期间将其分配给与任何现有消费者都不匹配的请求。这对于某些端点需要允许未经身份验证的访问同时仍应用基于消费者的策略的场景特别有用。

有关更多信息，请参阅 PR [#11917](https://github.com/apache/apisix/pull/11917)。

### 在 `openid-connect` 插件中添加 `valid_issuers` 属性

`openid-connect` 插件现在支持 `valid_issuers` 属性，用于将受信任的 JWT 发行者列入白名单。如果未配置，插件将使用发现文档中返回的发行者进行验证。如果两者都缺失，则不会验证发行者。

有关更多信息，请参阅 PR [#12002](https://github.com/apache/apisix/pull/12002)。

### 在 `jwt-auth` 插件中将 JWT 存储在请求上下文中

APISIX 现在支持在请求上下文中存储 JWT 令牌，允许其他插件访问令牌详细信息而无需重新解析它们。这提高了使用身份验证和授权插件时的效率。

有关更多信息，请参阅 PR [#11675](https://github.com/apache/apisix/pull/11675)。

### 支持在 `jwt-auth` 插件中配置 `key_claim_name`

JWT 身份验证插件现在允许自定义 `key_claim_name`，从而可以灵活地从 JWT 声明中提取用户标识符。

有关更多信息，请参阅 PR [#11772](https://github.com/apache/apisix/pull/11772)。

### 自定义速率限制响应标头名称

用户现在可以自定义速率限制响应标头名称，从而可以灵活地向客户端公开速率限制信息。此更改有助于定制响应以满足特定的应用程序需求。

有关更多信息，请参阅 PR [#11831](https://github.com/apache/apisix/pull/11831)。

### 在 `body-transformer` 插件中支持多部分内容类型

`body-transformer` 插件现在支持多部分请求，从而可以转换文件上传和其他多部分有效负载。

有关详细信息，请参阅 PR [#11767](https://github.com/apache/apisix/pull/11767)。

## 其他变更

- 在 `multi-auth` 插件中，身份验证失败时返回错误而不是登录 (PR [#11775](https://github.com/apache/apisix/pull/11775))
- 将每秒总请求数 (TPS) 面板添加到 Grafana 仪表板 (PR [#11692](https://github.com/apache/apisix/pull/11692))
- 当检测到较低版本时重新同步 etcd 以确保数据一致性 (PR [#12015](https://github.com/apache/apisix/pull/12015))
- 删除 `ai-proxy` 中的 `stream` 默认值以防止意外行为 (PR [#12013](https://github.com/apache/apisix/pull/12013))
- 修复 `gRPC-web` 响应的两个尾部块，确保响应格式正确 (PR [#11988](https://github.com/apache/apisix/pull/11988))
- 解决 `chaitin-waf` 插件中 `event_id` 为 nil 的问题，提高日志记录准确性 (PR [#11651](https://github.com/apache/apisix/pull/11651))
- 修复更新 `upstream.nodes` 时的竞争条件，以防止出现意外行为 (PR [#11916](https://github.com/apache/apisix/pull/11916))
- 确保 `upstream_obj.upstream` 不是字符串，以保持数据完整性 (PR [#11932](https://github.com/apache/apisix/pull/11932))

## 变更日志

有关此版本的完整变更列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3120)。
