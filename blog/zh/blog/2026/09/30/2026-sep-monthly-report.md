---
title: "2026 社区月报 (09.01 - 09.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: /TODO_COVER_IMAGE_ZH
---

> 最近，我们引入并更新了一些新功能，包括将 OpenAPI 转换为 MCP 工具、面向消息帧的 WebSocket 代理、TLS 流量透传、更可靠的 Standalone 配置更新，以及新增上游节点的慢启动等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.09.01 至 2026.09.30，有 13 名开发者提交了 90 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

<img src="/TODO_CONTRIBUTOR_LIST_IMAGE" alt="贡献者名单" />

<img src="/TODO_NEW_CONTRIBUTORS_IMAGE" alt="新晋贡献者" />

## 近期亮点功能

以下是本月的重点更新，并按功能方向进行归类。

### AI 与 MCP 运维能力

#### 1. 通过 Control API 暴露插件持有的健康检查

相关 PR：https://github.com/apache/apisix/pull/13899

贡献者：[AlinsRan](https://github.com/AlinsRan)

该 PR 支持插件声明自身持有的健康检查目标，使 Control API 能够展示直接配置且在请求路径中创建了检查器的 `ai-proxy-multi` 实例。新增的 `/v1/healthcheck/{src_type}/{src_id}/checkers` 接口会返回资源下全部由上游和插件持有的检查器，同时保持原有单检查器接口不变。单实例快捷路径不会创建检查器，该接口也不会发现通过 `plugin_config` 继承的插件。

#### 2. 根据 OpenAPI 文档生成 MCP 工具

相关 PR：https://github.com/apache/apisix/pull/13942

贡献者：[AlinsRan](https://github.com/AlinsRan)

新增的 `openapi-to-mcp` 插件可将 OpenAPI 文档中的操作转换为 MCP 工具，并通过 Streamable HTTP 或 HTTP+SSE 对外提供，无需另行部署 MCP Server。路由上的身份认证、限流、响应处理和日志插件仍然生效；需要注意的是，SSE 会话仅在单个 APISIX 实例内共享，文档获取和工具调用也不会经过 APISIX 上游的负载均衡与健康检查。

#### 3. 根据嵌套的 AI 用量字段计费

相关 PR：https://github.com/apache/apisix/pull/13984

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

该 PR 通过 `__` 拼接字段路径，将嵌套的数值型用量数据暴露给 `ai-rate-limiting` 的成本表达式，例如 `input_tokens_details__cached_tokens`。现有顶层字段表达式保持原有行为，同名的兄弟字段不会冲突，数组会被跳过，缺失字段仍按零处理。

### WebSocket 可观测性与扩展能力

#### 4. 在指标中区分 WebSocket 会话

相关 PR：https://github.com/apache/apisix/pull/13909

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

APISIX 现在会将成功返回 `101 Switching Protocols` 的请求标记为 `request_type="websocket"`，便于从延迟、状态码和带宽指标中区分长连接会话与普通 HTTP 请求。该分类依据实际响应，而不是路由配置或请求头，因此升级失败的请求仍会标记为 `traditional_http`。

#### 5. 新增面向消息帧的 WebSocket 代理与插件钩子

相关 PR：https://github.com/apache/apisix/pull/13939

贡献者：[bzp2010](https://github.com/bzp2010)

该 PR 新增 `ws` 和 `wss` 上游协议，使 APISIX 能够自行代理 WebSocket 连接，并向插件开放握手、客户端消息帧、上游消息帧和连接关闭阶段。插件可以逐帧检查或改写内容；客户端握手完成前的连接失败可以触发上游重试，但在 `101` 响应发出后发生的故障只能关闭连接，无法再返回新的 HTTP 响应。

#### 6. 按路由配置 WebSocket 负载大小限制

相关 PR：https://github.com/apache/apisix/pull/13972

贡献者：[bzp2010](https://github.com/bzp2010)

新增的 `websocket-proxy` 插件可为使用消息帧代理路径的 `ws` 或 `wss` 路由分别配置客户端侧和上游侧的 `max_payload_len`。未配置时继续使用 65,535 字节的默认值；超时和协议正确性相关选项仍由现有上游行为管理，不通过该插件开放。

### TLS、Stream 路由与身份安全

#### 7. 在不终止加密的情况下路由 TLS 流量

相关 PR：https://github.com/apache/apisix/pull/13912

贡献者：[AlinsRan](https://github.com/AlinsRan)

APISIX Stream 监听器现在可以根据 ClientHello 中的 SNI 选择上游，并在不终止 TLS 的情况下透传加密会话；混合监听端口还可由各条 Stream Route 决定执行透传还是终止 TLS。透传模式需要显式启用，并将证书保留在后端，但网关侧 mTLS 和需要检查负载内容的 Stream 插件不会生效；为避免意外的二次加密，使用 `scheme: tls` 的上游会被拒绝。由于混合监听端口需要经过内部跳转，`apisix_stream_metrics_zone` 会对该端口上的每个客户端连接计数两次。

#### 8. 使用多个 SNI 匹配一条 Stream Route

相关 PR：https://github.com/apache/apisix/pull/13911

贡献者：[AlinsRan](https://github.com/AlinsRan)

新增的 `snis` 字段允许一条 Stream Route 匹配多个 SNI 主机名，并沿用现有的通配符后缀语义，因此无需再为 Gateway API TLSRoute 的每个主机名复制路由。`sni` 与 `snis` 不能同时使用；配置单独的 `*` 或不配置这两个字段时，SNI 不受限制。

#### 9. 增强 SAML 响应校验与重放保护

相关 PR：https://github.com/apache/apisix/pull/13964

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

`saml-auth` 插件现已开放 `lua-resty-saml` 0.2.6 中的发行方、受众、外部 ACS URL、时钟偏差和可选断言重放保护配置。现有配置继续沿用原有默认行为；重放记录保存在指定的共享字典中，只能阻止同一 APISIX 节点上的重复使用，而不是跨分布式集群共享。

### 平台可靠性与流量就绪

#### 10. 提升 API 驱动 Standalone 配置更新的可观测性

相关 PR：https://github.com/apache/apisix/pull/13904

贡献者：[bzp2010](https://github.com/bzp2010)

API 驱动的 Standalone 模式现在会按子系统和实体类型上报各 Worker 的配置摘要，`PUT /apisix/admin/configs` 也可通过 `wait` 参数收集配置应用状态。返回 `200` 表示所有 Worker 都已接受并加载配置，返回 `202` 表示配置已被接受，但无法保证在等待期内全部加载完成；未传入 `wait` 的客户端保持原有行为。

#### 11. 为新加入的上游节点逐步增加流量

相关 PR：https://github.com/apache/apisix/pull/13941

贡献者：[AlinsRan](https://github.com/AlinsRan)

新增的 `warm_up_conf` 会逐步提高新识别到的 HTTP Round Robin 上游节点的有效权重，使冷启动服务能先预热缓存、连接池和运行时，再接收完整流量份额。首个版本适用于单优先级的 HTTP Round Robin 上游；未启用时保持现有行为，在运行时状态无法安全支持慢启动时则回退到配置权重。慢启动只会在可用节点之间重新分配流量，因此单节点上游或全部节点都是新节点的上游仍会把所有请求发送给这些节点。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
