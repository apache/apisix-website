# 什么是 AI 网关？概念与核心功能

> 了解什么是 AI 网关，以及 Apache APISIX 如何管理 LLM API 流量、模型路由、Token 限制、提示词控制和可观测性。

Source: https://apisix.apache.org/zh/blog/2025/03/06/what-is-an-ai-gateway/

AI 网关是位于应用和模型供应商之间的流量控制层。它为大语言模型（LLM）请求提供统一入口，用于实施供应商访问、路由、Token 限制、提示词处理和遥测策略。[Apache APISIX AI 网关](/zh/ai-gateway/)通过开源网关插件实现这些控制。

<!--truncate-->

## 为什么 AI 流量需要网关控制

AI 应用经常需要调用多个托管或自建模型。它们可能返回流式响应、按 Token 计算用量，并且需要不同于普通 Web API 的路由或重试策略。如果没有网关，每个应用都需要分别实现供应商凭证、端点选择、用量限制和日志记录。

AI 网关位于已授权应用和一个或多个模型端点之间，将这些通用流量问题放在统一的请求路径上处理。它不会取代应用或模型，而是根据明确配置的策略转发请求，并记录网关层能够获取的信息。

![APISIX AI 网关架构](https://static.api7.ai/uploads/2025/08/01/KvjMKKx2_apisix-ai-gateway-architecture.webp)

## AI 网关的核心能力

### 供应商访问与请求转换

不同模型供应商使用不同的端点、身份认证方式和请求格式。网关可以为应用提供稳定入口，并为受支持的供应商转换请求。

Apache APISIX 的 [`ai-proxy`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-proxy/) 插件支持文档列出的供应商和 OpenAI 兼容端点。应用可以通过 APISIX 发送模型请求，无需在应用代码中直接写入每个供应商的端点。实际兼容性仍取决于插件配置和所选上游服务。

### 多模型路由、重试与 Fallback

当应用使用多个模型实例时，网关可以按照配置策略分配流量。[`ai-proxy-multi`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-proxy-multi/) 插件支持加权轮询、一致性哈希、有限重试、fallback 策略和可选健康检查。

这些控制可以减少应用中的供应商特定故障处理逻辑，但不能保证服务永不中断。可用性仍取决于健康的上游模型、合理的重试上限、网络条件和选定的 fallback 策略。

![AI Proxy Multi 工作流](https://static.api7.ai/uploads/2025/08/01/TmTsNypy_ai-proxy-multi-workflow.webp)

### 基于 Token 的用量限制

仅统计请求数无法准确描述 LLM 用量。短响应和长响应消耗的 Token 数量可能相差很大。Token 感知的限制可以在模型供应商前设置用量边界。

[`ai-rate-limiting`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-rate-limiting/) 插件跟踪 Token 消耗，并支持本地或 Redis 计数器。它执行运维人员配置的限制；定价、预算和账单核对仍由外部系统负责。

### 提示词与内容处理

AI 网关可以通过职责不同的控制修改或检查请求与响应内容：

- [`ai-prompt-template`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-prompt-template/) 应用预定义的提示词模板。
- [`ai-prompt-decorator`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-prompt-decorator/) 在提示词前后添加配置内容。
- [`ai-prompt-guard`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-prompt-guard/) 根据配置的正则表达式允许或拒绝提示词。
- [`ai-aws-content-moderation`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-aws-content-moderation/) 和 [`ai-aliyun-content-moderation`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-aliyun-content-moderation/) 分别集成其文档所述的供应商审核服务。

这些插件提供具体控制，而不是完整的安全或合规保证。团队仍需实施应用授权、数据分类、密钥管理、供应商治理，并在需要时安排人工审核。

### 检索增强生成

检索增强生成（RAG）会把检索到的上下文添加到模型请求中。[`ai-rag`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-rag/) 插件记录了使用 Azure OpenAI Embeddings 和 Azure AI Search 的流程。它可以在网关集中执行受支持的检索步骤，但不能单独评估事实准确性或消除模型幻觉。

### 网关层可观测性

启用 AI 代理日志后，如果上游响应提供相应信息，APISIX 可以记录模型、请求耗时、输入和输出 Token 数量，以及首个 Token 返回时间。现有日志和可观测性插件可以将网关数据导出到团队的监控系统。

网关遥测只覆盖经过 APISIX 的流量。它补充而非替代应用链路追踪、模型质量评估、用户反馈和供应商侧监控。

## AI 网关不负责什么

明确边界很重要，因为一些相邻职责经常被笼统归入 “AI 网关”。网关可以保护和路由网络流量，但外围应用系统仍负责：

- 认证最终用户并执行业务级授权；
- 选择工具并决定 Agent 何时调用工具；
- 保存对话和工作流状态；
- 编排多步骤 Agent 行为；
- 评估回答质量、安全性和事实准确性；
- 定义预算、成本分摊规则和业务审批。

明确这些职责可以避免把网关策略误解为应用或模型保证。

## 什么时候需要 AI 网关

当多个应用共享模型供应商，或团队需要在 AI 工作负载之间实施一致流量控制时，AI 网关最有价值。常见信号包括：

- 供应商凭证和端点在多个应用中重复配置；
- 多个团队需要相同的 Token 限制或日志规则；
- 应用需要在模型实例之间配置 fallback 路径；
- 托管端点和 OpenAI 兼容的自建端点需要共享访问层；
- API 与 AI 流量需要共用网关运维和可观测体系。

只调用单个供应商的原型应用未必需要立即部署专用网关。随着应用、供应商、环境和共享策略增加，网关的价值会更加明显。

## AI 网关与 API 网关的关系

AI 网关与 API 网关在路由、身份认证、限流、故障处理和可观测性上存在重叠。AI 网关进一步增加适用于模型流量的控制，例如 Token 限制、模型供应商请求转换、提示词处理和 LLM 用量摘要。

Apache APISIX 使用同一个开源网关处理普通 API 流量和已配置的 AI 流量。团队可以增加 AI 专用插件，而不必只为模型调用引入另一层网络基础设施。更直接的能力对比请参阅 [AI 网关 vs API 网关](/zh/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/)。

## 总结

AI 网关集中管理应用和模型供应商之间的网络层控制。它的实际价值不是自主决策，而是一致的供应商访问、路由、Token 限制、提示词处理、故障处理策略和网关遥测。

Apache APISIX 通过有明确文档的开源插件提供这些控制，并把业务授权、Agent 编排、工作流状态和模型评估留给真正负责这些职责的系统。
