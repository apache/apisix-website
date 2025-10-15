---
title: "Apache APISIX 3.14.0 正式发布"
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
description: Apache APISIX 3.14.0 版本于 2025 年 10 月 10 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.14.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

此版本引入了多项新功能，包括用于日志记录的新 AI 插件变量、AI 插件中对 AI/ML API 提供程序的支持、基于请求正文的路由匹配、`request-id` 插件中对 KSUID 算法的支持等等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### Admin API 不再填充默认值

Admin API 在写入配置时将不再自动填充默认值。以前，当用户通过 Admin API 提交配置时，APISIX 会在存储可选字段之前自动填充默认值。此行为已被移除，以避免用户混淆，并提高与 APISIX Ingress Controller 等工具的兼容性。

此变更会影响配置的写入方式，但不会影响配置的读取方式——通过 GET 请求检索配置时，默认值仍会显示在响应中，因为它们是在读取操作期间填充的。

用户应确保其配置在 Admin API 负载中提供所有必要值，因为在写入操作期间将不再自动添加默认值。

更多信息，请参阅 [PR #12603](https://github.com/apache/apisix/pull/12603)。

### `jwt-auth` 插件需要为非 RS/ES 算法提供 `secret`

如果未为 RS256 和 ES256 以外的算法提供密钥，`jwt-auth` 插件将不再自动生成密钥值。以前，如果用户配置 `jwt-auth` 插件时未为 HS256 或 HS512 等算法提供密钥，APISIX 会自动生成一个密钥。

现在，当用户使用 RS256 和 ES256 以外的算法时，必须明确配置密钥字段。如果未提供密钥，插件将返回错误消息，要求用户手动设置此值。

此更改提高了配置透明度，并避免了自动生成的值可能造成的混淆。用户应检查其 `jwt-auth` 插件配置，并确保在需要时明确设置密钥字段。

更多信息，请参阅 [PR #12611](https://github.com/apache/apisix/pull/12611)。

### `openid-connect` 插件需要显式配置会话密钥

在此版本中，当 `bearer_only` 设置为 `false` 且未提供 `session.secret` 时，`openid-connect` 插件不再自动生成 `session.secret`。相反，当 `bearer_only` 设置为 `false` 时，用户必须显式指定 `session.secret`。

更多信息，请参阅 [PR #12609](https://github.com/apache/apisix/pull/12609)。

## 新功能

### 支持基于请求体匹配路由

现在，您可以在路由的 `vars` 中使用 `post_arg.*`，根据请求体值匹配请求。`post_arg` 支持 JSON、multipart 和 URL 编码的请求体，从而实现基于消息负载的灵活动态路由逻辑。

更多信息，请参阅 [PR #12388](https://github.com/apache/apisix/pull/12388)。

### 添加全局开关以禁用所有上游健康检查

此版本在 `config.yaml` 中引入了一个新的配置选项 `apisix.disable_upstream_healthcheck`，允许您一次性关闭所有上游健康检查。这在紧急情况下非常有用，因为健康检查可能会干扰路由回退。

更多信息，请参阅 [PR #12407](https://github.com/apache/apisix/pull/12407)。

### 支持单个日志中的多个对象

此版本增强了 `json.delay_encode` 日志功能的灵活性：现在单个日志条目中最多可以包含 16 个不同的 `delay_encode` 对象。这可以更精细地控制日志负载的延迟或编码方式以及部分内容。

更多信息，请参阅 [PR #12395](https://github.com/apache/apisix/pull/12395)。

### 在 `openid-connect` 插件中添加自定义声明验证

此版本引入了在 `openid-connect` 插件中配置自定义声明验证的功能。此增强功能允许用户为特定声明定义验证规则，例如确保声明与一组预定义值中的某个值匹配。如果声明未通过验证，则请求将被拒绝。

更多信息，请参阅 [PR #11824](https://github.com/apache/apisix/pull/11824)。

### 在 `openid-connect` 插件中支持环境变量

此版本在 `openid-connect` 插件的配置中添加了对环境变量的支持。用户现在可以将敏感字段（例如 `client_secret`）存储在环境变量中，从而增强部署期间的安全性和灵活性。

更多信息，请参阅 [PR #11451](https://github.com/apache/apisix/pull/11451)。

### 为 stream 路由引入 `traffic-split` 插件

此版本为 stream 路由 (L4) 引入了 `traffic-split` 插件，支持跨多个上游的加权流量分配。此增强功能允许在基于流的应用程序中更精细地控制流量路由。

更多信息，请参阅 [PR #12630](https://github.com/apache/apisix/pull/12630)。

### 在 `request-id` 插件中添加 KSUID 算法

此版本支持在 `request-id` 插件中使用 KSUID（K 排序全局唯一标识符）算法生成请求 ID。

更多信息，请参阅 [PR #12573](https://github.com/apache/apisix/pull/12573)。

### 在 `ai-proxy-multi` 插件中引入回退机制

此版本增强了 `ai-proxy-multi` 插件的功能，添加了针对特定错误代码的回退机制。此改进允许在满足特定错误条件时执行预定义的回退行为，从而确保 AI 代理更具弹性。

更多信息，请参阅 [PR #12571](https://github.com/apache/apisix/pull/12571)。

### 在独立 API 中支持元数据标头和 HEAD 方法

独立 API 新增了两个响应元数据标头：`X-Last-Modified` 和 `X-Digest`，它们允许客户端检测哪个实例的最后更新，并检查客户端传递的配置摘要。

此外，现在支持 HEAD 请求（仅返回元数据，不返回完整配置），从而可以进行轻量级轮询或元数据检查。

更多信息，请参阅 [PR #12526](https://github.com/apache/apisix/pull/12526)。

### 添加新的 AI 代理变量用于日志记录

此版本在 `ai-proxy` 和 `ai-proxy-multi` 插件中添加了以下变量：

* `apisix_upstream_response_time`：APISIX 将请求发送到上游服务并接收完整响应所需的时间。
* `request_type`：请求类型，其值可以是 `traditional_http`、`ai_chat` 或 `ai_stream`。
* `llm_time_to_first_token`：从请求发送到从 LLM 服务收到第一个令牌的时长，以毫秒为单位。
* `llm_model`：转发到上游 LLM 服务的 LLM 模型名称。
* `request_llm_model`：请求中指定的 LLM 模型名称。
* `llm_prompt_tokens`：提示中的令牌数量。
* `llm_completion_tokens`：提示中的聊天完成令牌数量。

这些变量可以记录在访问日志中，与日志插件一起使用，或导出为 Prometheus 指标。此增强功能通过提供 AI 代理期间上游服务响应时间的洞察，改进了监控和调试功能。

更多信息，请参阅 [PR #12555](https://github.com/apache/apisix/pull/12555)、[PR #12554](https://github.com/apache/apisix/pull/12554)、[PR #12515](https://github.com/apache/apisix/pull/12515) 和 [PR #12518](https://github.com/apache/apisix/pull/12518)。

### 新增 `ai-aliyun-content-moderation` 插件

此版本引入了全新的 `ai-aliyun-content-moderation` 插件，可与阿里云的 Machine-Assisted Moderation Plus 集成，进行内容审核。该插件会评估请求主体中是否存在亵渎、仇恨言论、侮辱、骚扰、暴力等内容。任何超过指定阈值的请求都将被拒绝。

更多信息，请参阅 [PR #12530](https://github.com/apache/apisix/pull/12530)。

### 将 Azure AI 和 AI/ML API 提供程序添加到 AI 插件

`ai-proxy`、`ai-proxy-multi` 和 `ai-request-rewrite` 插件现在支持 Azure AI 和 AI/ML API 作为提供程序。

当 `provider` 设置为 `azure-openai` 时，该插件会将请求代理到 `override` 中配置的自定义端点，并从用户请求中移除模型参数。

AI/ML API 提供统一的 OpenAI 兼容 API，可访问 300 多个 LLM，例如 GPT-4、Claude、Gemini、DeepSeek 等。当 `provider` 设置为 `aimlapi` 时，该插件允许用户将 AI 请求路由到兼容 AIMLAPI 的端点，从而扩大了 APISIX 生态系统中可使用的 AI 提供程序范围。

更多信息，请参阅 [PR #12565](https://github.com/apache/apisix/pull/12565) 和 [PR #12379](https://github.com/apache/apisix/pull/12379)。

### 在 `ai-proxy-multi` 插件中支持健康检查

`ai-proxy-multi` 插件现在支持对上游 AI 服务的健康检查。每个后端端点的可用性都可以监控，并且请求可以动态路由到健康的端点。这确保了高可用性，并防止请求发送到响应迟钝的 AI 服务器，从而提高了生产环境中的可靠性。

更多信息，请参阅 [PR #12509](https://github.com/apache/apisix/pull/12509)。

### 在 `workflow` 插件规则中支持 `limit-conn`

此版本增强了 `workflow` 插件的功能，允许其将 `limit-conn` 插件作为 `workflow` 规则的一部分。

更多信息，请参阅 [PR #12465](https://github.com/apache/apisix/pull/12465)。

### 改进 `datadog` 插件标签

`datadog` 插件现在提供增强的指标和标签，以支持更广泛的可观察性需求。此更新引入了几个新标签：

* `response_status_class`：HTTP 响应状态代码的类别（例如，“2xx”、“4xx”、“5xx”）。
* `path`：HTTP 路径模式，仅当 `include_path` 属性设置为 `true` 时可用。
* `method`：HTTP 方法，仅当 `include_method` 属性设置为 `true` 时可用。

更多信息，请参阅 [PR #11943](https://github.com/apache/apisix/pull/11943)。

### 在 `forward-auth` 插件中添加对 `extra_headers` 的支持

`forward-auth` 插件现在可以从请求正文中提取字段，并使用 `extra_headers` 和 `$post_arg.*` 将它们作为标头注入上游服务。例如，如果身份验证在响应正文中返回用户角色或令牌，您现在可以将该正文的一部分映射到下游服务可以使用的标头中。

更多信息，请参阅 [PR #12405](https://github.com/apache/apisix/pull/12405)。

## 其他更新

* 添加健康检查管理器以解耦上游 (PR [#12426](https://github.com/apache/apisix/pull/12426))
* 解耦 Prometheus 导出器的计算和输出 (PR [#12383](https://github.com/apache/apisix/pull/12383))
* 删除错误日志中的加密字段，以防止敏感数据泄露 (PR [#12629](https://github.com/apache/apisix/pull/12629))
* 修复 `ai-proxy-multi` 插件中健康检查解析节点不一致的问题 (PR [#12594](https://github.com/apache/apisix/pull/12594))
* 仅信任已配置 `trusted_addresses` 中的 `X-Forwarded-*` 标头 (PR [#12551](https://github.com/apache/apisix/pull/12551))
* 确保当协议不是 HTTPS 时重定向能够正常工作 (PR [#12561](https://github.com/apache/apisix/pull/12561))
* 修复在代理后运行时 UI 重定向错误 (PR [#12566](https://github.com/apache/apisix/pull/12566))
* 在后台刷新过期的 LRU 缓存项以获取机密信息 (PR [#12614](https://github.com/apache/apisix/pull/12614))
* 恢复健康检查管理器中丢失的运行时信息 (PR [#12607](https://github.com/apache/apisix/pull/12607))
* 支持在独立管理 API 模式下配置 stream 路由 (PR [#12604](https://github.com/apache/apisix/pull/12604))
* 仅在启用 `include_resp_body` 时记录响应正文 (PR [#12599](https://github.com/apache/apisix/pull/12599))
* 更正 `get_healthcheck_events_module` 函数名称的拼写 (PR [#12587](https://github.com/apache/apisix/pull/12587))
* 防止 `ai-proxy-multi` 实例缺少自定义端点时出现崩溃 (PR [#12584](https://github.com/apache/apisix/pull/12584))
* 防止 AI Prompt Decorator 插件中跨请求的消息累积 (PR [#12582](https://github.com/apache/apisix/pull/12582))
* 删除过时的消息Docker 入口点中的 `stream_worker_events.sock` 文件 (PR [#12546](https://github.com/apache/apisix/pull/12546))
* 为 EWMA 共享字典项添加过期时间 (`exptime`) (PR [#12557](https://github.com/apache/apisix/pull/12557))
* 在 `ai-proxy` 模式验证中捕获格式错误的覆盖端点 (PR [#12563](https://github.com/apache/apisix/pull/12563))
* 修复非 stream 模式下缺失 `ctx.llm_raw_usage` 值的问题 (PR [#12564](https://github.com/apache/apisix/pull/12564))
* 使用前检查 `ai-proxy` 中 `choices`、`usage` 和 `content` 字段的类型 (PR [#12548](https://github.com/apache/apisix/pull/12548))
* 调整 Kubernetes 服务发现的 ID 长度 (PR [#12536](https://github.com/apache/apisix/pull/12536))
* 使 `basic-auth` 方案不区分大小写 (PR [#12539](https://github.com/apache/apisix/pull/12539))
* 仅配置 `tls.verify` 时跳过客户端证书验证 (PR [#12527](https://github.com/apache/apisix/pull/12527))
* 工作进程重启时从 etcd 加载完整数据 (PR [#12523](https://github.com/apache/apisix/pull/12523))
* 升级 etcd 版本以应对监视请求超时问题 (PR [#12514](https://github.com/apache/apisix/pull/12514))
* 为 Kubernetes 发现启用 EndpointSlices 支持 (PR [#11654](https://github.com/apache/apisix/pull/11654))
* 即使 `grpc-web` 中的响应正文为空，也包含 gRPC 尾部 (PR [#12490](https://github.com/apache/apisix/pull/12490))
* 修复 Red Hat 系统上的主机名检索问题 (PR [#12267](https://github.com/apache/apisix/pull/12267))
* 修复在服务级别配置插件时批处理器缓存不工作的问题 (PR [#12474](https://github.com/apache/apisix/pull/12474))
* 解析 `$post_arg` 中的变量引用Forward Auth 插件的 `extra_headers` (PR [#12435](https://github.com/apache/apisix/pull/12435))
* 修复 `api-breaker` 插件中 `breaker_time` 过早递增导致的熔断不一致问题 (PR [#12451](https://github.com/apache/apisix/pull/12451))
* 为 Standalone Admin API 模式添加缺失的配置验证 (PR [#12424](https://github.com/apache/apisix/pull/12424))
* 当 `enable_access_log` 设置为 false 时，跳过写入访问日志 (PR [#11310](https://github.com/apache/apisix/pull/11310))
* 从 OpenTelemetry 插件中移除未使用的 `set_ngx_var` 属性 (PR [#12411](https://github.com/apache/apisix/pull/12411))
* 在请求验证插件中，支持 URL 编码数据的 `Content-Type` 标头及其字符集 (PR [#12406](https://github.com/apache/apisix/pull/12406))
* 修复 Zipkin 在 `ngx_var` 中 `trace_id` 和 `span_id` 格式的问题 (PR [#12403](https://github.com/apache/apisix/pull/12403))
* 修复由于缓存版本控制不正确导致的消费者更新丢失问题 (PR [#12413](https://github.com/apache/apisix/pull/12413))
* 确保 `get_keys` 返回共享字典中超出默认 1024 个限制的所有项 (PR [#12380](https://github.com/apache/apisix/pull/12380))

## 变更日志

有关此版本的完整变更列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3140)。
