---
title: "Apache APISIX 3.17.0 正式发布"
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
description: Apache APISIX 3.17.0 版本于 2026 年 6 月 15 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.17.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

此版本引入了新的 AI Gateway 能力、身份认证和访问控制插件、GraphQL 流量治理、数据保护功能，以及面向配置校验、Secret 处理和 stream proxy 配置的平台能力改进。

此版本还包含多项与身份认证、TLS 校验、缓存、请求校验和 standalone 配置解析行为相关的兼容性影响变更。其中许多变更属于安全性或校验逻辑强化，仅影响特定配置。请根据您的部署情况审阅相关变更，并提前规划升级。

## 重大变更

### 默认的身份认证校验和签名行为更加严格

此版本收紧了多个身份认证插件的默认行为，以提供更安全的默认配置。

`jwt-auth` 插件现在会将 `claims_to_verify` 中显式配置的声明视为必填声明，而空的 `claims_to_verify: []` 也不再禁用默认的 `exp` 和 `nbf` 校验。同时，它会在签名校验前强制检查算法是否匹配。当启用 `hide_credentials` 且无效 key 回退到匿名 consumer 时，`key-auth` 插件现在会在转发到上游前从标头和查询参数中移除该无效凭证。`hmac-auth` 插件现在默认将 `signed_headers` 设置为 `["date"]`，因此除非显式覆盖配置，否则客户端必须对 `Date` 标头进行签名。

更多信息，请参阅 [PR #13468](https://github.com/apache/apisix/pull/13468)、[PR #13182](https://github.com/apache/apisix/pull/13182) 和 [PR #13388](https://github.com/apache/apisix/pull/13388)。

### Admin Schema 校验端点现在需要认证

Schema 校验端点现在需要 Admin API key。此前未携带认证信息调用该端点的客户端，在升级后必须提供有效的 Admin API 凭证。

更多信息，请参阅 [PR #13328](https://github.com/apache/apisix/pull/13328)。

### TLS 校验默认值更加严格

`tencent-cloud-cls` 插件现在支持 `ssl_verify`，且默认值为 `true`。此外，TLS 校验强化也使 `ai-rag` 的 `ssl_verify` 默认值变为 `true`。

如果部署需要连接使用自签名或不受信任证书的服务，请在升级前配置受信任证书，或显式检查相关 TLS 校验设置。

更多信息，请参阅 [PR #13194](https://github.com/apache/apisix/pull/13194) 和 [PR #13203](https://github.com/apache/apisix/pull/13203)。

### `cas-auth` 需要新的 `cookie.secret` 配置

`cas-auth` 插件现在使用嵌套的 `cookie` 配置，并要求提供 `cookie.secret`。该插件还会对登录重定向 Cookie 进行签名，并收紧 Cookie 处理逻辑。

现有 `cas-auth` 配置在升级到 3.17.0 前必须添加新的必填项 `cookie.secret`。请在所有 APISIX 节点上使用相同的 secret；对于仅使用 HTTP 的部署，需要将 `cookie.secure` 设置为 `false`。

更多信息，请参阅 [PR #13331](https://github.com/apache/apisix/pull/13331)。

### `jwe-decrypt` 不再提供令牌生成端点

此版本从 `jwe-decrypt` 插件中移除了服务端 `/apisix/plugin/jwe/encrypt` 端点。APISIX 现在只负责解密 JWE 令牌，令牌生成需要在 APISIX 之外完成。

更多信息，请参阅 [PR #13464](https://github.com/apache/apisix/pull/13464)。

### `proxy-cache` 采用了更安全的缓存默认值

`proxy-cache` 插件现在默认按照已认证 consumer 隔离缓存条目，除非显式启用，否则不会在内存模式中缓存带有 `Set-Cookie` 的响应，并且在内存模式中始终遵循上游 `Cache-Control: private`、`no-store` 和 `no-cache` 响应指令。

此前依赖共享认证缓存或较宽松 Cookie 缓存行为的部署，在升级后可能会看到不同的缓存命中表现。

更多信息，请参阅 [PR #13350](https://github.com/apache/apisix/pull/13350)。

### `batch-requests` 强化了请求校验和限制

`batch-requests` 插件现在要求每个 pipeline 条目都必须包含 `path`，会拒绝未知字段，要求 `timeout` 至少为 `1`，并通过 `max_pipeline_items` 限制每个请求中的 pipeline 条目数量。该值默认是 `1000`，可以通过 plugin metadata 配置。

此前依赖宽松校验或超大 pipeline 的请求，需要在升级后进行调整。

更多信息，请参阅 [PR #13492](https://github.com/apache/apisix/pull/13492)。

### Standalone 模式会在 YAML 解析前解析环境变量

Standalone 模式现在会在 YAML 解析前解析环境变量。因此，未加引号的 `${VAR}` 占位符现在可能会被解析为数字或布尔值，而不再总是字符串。

请检查使用环境变量替换的 standalone 配置文件，并为必须保持字符串类型的值添加引号。

更多信息，请参阅 [PR #13078](https://github.com/apache/apisix/pull/13078)。

## 新功能

### 扩展 AI Gateway 支持

此版本带来了多项 AI Gateway 改进，包括支持 Amazon Bedrock 提供商、Bedrock ConverseStream 流式能力、原生 Anthropic Messages API 协议、OpenAI Responses API，以及对未识别 AI API 格式的 passthrough 处理。

AI 代理也新增了 provider-aware `max_tokens` 覆盖、按协议配置请求体覆盖、`max_stream_duration_ms` 和 `max_response_bytes` 等保护机制、客户端断连时中止上游读取，以及在 cosocket transport 中填充上游 NGINX 变量的能力。

更多信息，请参阅 [PR #13249](https://github.com/apache/apisix/pull/13249)、[PR #13307](https://github.com/apache/apisix/pull/13307)、[PR #13181](https://github.com/apache/apisix/pull/13181)、[PR #13186](https://github.com/apache/apisix/pull/13186)、[PR #13320](https://github.com/apache/apisix/pull/13320)、[PR #13251](https://github.com/apache/apisix/pull/13251)、[PR #13269](https://github.com/apache/apisix/pull/13269)、[PR #13250](https://github.com/apache/apisix/pull/13250)、[PR #13254](https://github.com/apache/apisix/pull/13254) 和 [PR #13317](https://github.com/apache/apisix/pull/13317)。

### 核心校验、可观测性和 Secret 管理增强

APISIX 现在支持在 `stream_proxy` 配置中批量设置 TCP/UDP 端口范围，并在所有部署模式下提供 `/configs/validate`。此版本还新增了 `core.response.get_response_source()`，用于识别响应来源，并新增 `rate_limiting_info` 变量以增强限流可观测性。

Secret 处理也得到增强，包括支持嵌套结构的 `encrypt_fields`，以及为所有插件提供集中式 Secret 引用解析。

更多信息，请参阅 [PR #13153](https://github.com/apache/apisix/pull/13153)、[PR #13220](https://github.com/apache/apisix/pull/13220)、[PR #13224](https://github.com/apache/apisix/pull/13224)、[PR #13155](https://github.com/apache/apisix/pull/13155)、[PR #13192](https://github.com/apache/apisix/pull/13192) 和 [PR #13312](https://github.com/apache/apisix/pull/13312)。

### 新增身份认证和访问控制插件

此版本新增了多个面向浏览器认证和策略控制的插件。

新的 `saml-auth` 插件让 APISIX 可以作为 SAML 2.0 服务提供方。新的 `dingtalk-auth` 和 `feishu-auth` 插件分别支持 DingTalk 和 Feishu/Lark OAuth 认证流程。新的 `acl` 插件则支持基于 consumer 标签或认证插件声明的标签化访问控制。

更多信息，请参阅 [PR #13346](https://github.com/apache/apisix/pull/13346)、[PR #13381](https://github.com/apache/apisix/pull/13381)、[PR #13382](https://github.com/apache/apisix/pull/13382) 和 [PR #13349](https://github.com/apache/apisix/pull/13349)。

### 新增 GraphQL 流量治理插件

Apache APISIX 3.17.0 为 GraphQL 工作负载引入了两个新插件。

`graphql-limit-count` 插件支持基于 GraphQL 查询深度进行限流，而 `graphql-proxy-cache` 插件支持使用磁盘或内存缓存策略缓存 GET 和 POST GraphQL 查询响应。它默认按已认证身份隔离缓存条目，会自动绕过对 mutation 请求的缓存，并提供 PURGE API 用于缓存失效。

更多信息，请参阅 [PR #13372](https://github.com/apache/apisix/pull/13372) 和 [PR #13435](https://github.com/apache/apisix/pull/13435)。

### 新增数据保护和响应定制插件

此版本新增了 `data-mask`、`error-page`、`proxy-buffering`、`oas-validator`、`traffic-label` 和 `exit-transformer` 插件。

`data-mask` 插件会在访问日志或日志插件写入前，对敏感查询参数、标头以及 JSON 或 URL 编码请求体进行脱敏或掩码处理。`error-page` 插件通过 plugin metadata 支持自定义 APISIX 生成的 `404`、`500`、`502` 和 `503` 等错误响应；上游生成的响应不会被修改。`proxy-buffering` 插件则支持在路由级别关闭代理缓冲，以更好地处理 SSE 和其他流式响应。`oas-validator`、`traffic-label` 和 `exit-transformer` 插件分别提供 OpenAPI 请求校验、流量标签和响应转换能力。

更多信息，请参阅 [PR #13347](https://github.com/apache/apisix/pull/13347)、[PR #13380](https://github.com/apache/apisix/pull/13380)、[PR #13446](https://github.com/apache/apisix/pull/13446)、[PR #13344](https://github.com/apache/apisix/pull/13344)、[PR #13342](https://github.com/apache/apisix/pull/13342) 和 [PR #13343](https://github.com/apache/apisix/pull/13343)。

### `ai-proxy-multi` 提供更细粒度的回退控制

`ai-proxy-multi` 插件现在支持 `max_retries` 和 `retry_on_failure_within_ms`，让用户能够更精细地控制多 AI 提供商之间的回退行为。

更多信息，请参阅 [PR #13495](https://github.com/apache/apisix/pull/13495)。

### 其他插件增强

`request-id` 插件现在支持生成 UUID v7。`ai-rate-limiting` 插件新增了基于表达式的限流策略，`elasticsearch-logger` 则支持使用时间和变量解析生成动态索引名称。

更多信息，请参阅 [PR #13152](https://github.com/apache/apisix/pull/13152)、[PR #13191](https://github.com/apache/apisix/pull/13191) 和 [PR #13334](https://github.com/apache/apisix/pull/13334)。

## 修复

### `proxy-cache` 的正确性和缓存安全性改进

此版本改进了 `proxy-cache` 插件的正确性表现，包括在内存模式中遵循上游 `Vary` 标头、避免缓存 `Vary: *` 响应，以及让 `PURGE` 能够正确处理过期和多变体缓存条目。此外，除非显式启用 Cookie 缓存，否则内存缓存不会存储由上游或其他插件添加了 `Set-Cookie` 标头的响应。

更多信息，请参阅 [PR #13376](https://github.com/apache/apisix/pull/13376)。

### AI 代理可靠性改进

此版本修复了多个与 AI 代理工作流相关的稳定性问题。

`ai-proxy-multi` 插件现在可以更稳定地处理多 IP 域名上游，并在 `Host`、SNI 以及 AWS SigV4 签名中保留原始主机信息。AI 请求 JSON 编码现在是确定性的，可提升兼容提供商上的 prompt cache 命中率。AI 流式处理也支持通过 `streaming_flush_interval_ms` 控制延迟并改进断连处理；上游 AI 超时现在会返回 `504 Gateway Timeout`，而不再是 `500`。

更多信息，请参阅 [PR #13441](https://github.com/apache/apisix/pull/13441)、[PR #13461](https://github.com/apache/apisix/pull/13461)、[PR #13391](https://github.com/apache/apisix/pull/13391) 和 [PR #13481](https://github.com/apache/apisix/pull/13481)。

### 面向 Redis 工作流的限流修复

此版本修复了 `limit-req` 在 Redis 场景下的竞态问题，通过原子化漏桶状态更新来提升正确性。同时，它也收紧了 `limit-conn` 中动态 `conn` 和 `burst` 的校验逻辑：解析后的值必须是安全整数，`conn` 必须为正数，`burst` 可以为 `0` 但不能为负数。

更多信息，请参阅 [PR #13467](https://github.com/apache/apisix/pull/13467)。

### 身份认证和会话隔离相关修复

此版本修复了多个身份认证和会话处理问题。

`authz-keycloak` 在追加请求方法作用域时不再修改共享权限配置。`authz-casdoor` 现在会按 `client_id` 隔离会话。`cas-auth` 插件也强化了回调和会话处理逻辑，以防止无效回调会话以及跨路由会话复用；同时支持绝对 URL 形式的 `cas_callback_uri`，并在 CAS 单点登出回调格式错误时返回 `400`，避免返回 `500` 或接受空 ticket。

更多信息，请参阅 [PR #13410](https://github.com/apache/apisix/pull/13410)、[PR #13387](https://github.com/apache/apisix/pull/13387)、[PR #13427](https://github.com/apache/apisix/pull/13427)、[PR #13413](https://github.com/apache/apisix/pull/13413) 和 [PR #13471](https://github.com/apache/apisix/pull/13471)。

### 更好的敏感信息处理和令牌校验

此版本在启用字段加密时，扩展了对敏感插件字段的静态加密覆盖范围，包括 session secret、Redis 密码、日志插件凭证、serverless token 和 AI 提供商凭证。同时，它还避免在解析错误中暴露原始 Google Cloud 凭证文件内容，并确保 `jwe-decrypt` 会拒绝无法解密的令牌，而不是继续将其转发到上游。

更多信息，请参阅 [PR #13389](https://github.com/apache/apisix/pull/13389)、[PR #13409](https://github.com/apache/apisix/pull/13409) 和 [PR #13404](https://github.com/apache/apisix/pull/13404)。

### 修复 OPA、gRPC 镜像和响应体日志相关问题

当启用 `send_headers_upstream` 时，`opa` 插件现在会主动清理 OPA 响应中不存在的标头。`proxy-mirror` 插件现在会在镜像 gRPC 和 `grpc-web` 请求时保留原始的 gRPC 方法路径。此外，在 global rules 和 routes 同时启用多个日志插件时，响应体日志记录也能正确工作。

更多信息，请参阅 [PR #13433](https://github.com/apache/apisix/pull/13433)、[PR #13499](https://github.com/apache/apisix/pull/13499) 和 [PR #13450](https://github.com/apache/apisix/pull/13450)。

## 其他更新

- 通过在单次请求内缓存已解析的 JSON、form 和 multipart 请求体，提升请求体处理性能（PR [#13377](https://github.com/apache/apisix/pull/13377) 和 PR [#13356](https://github.com/apache/apisix/pull/13356)）
- 通过更快的 SSE 解码、更好的断连处理，以及在无需重写时复用原始请求体，提升 AI 流式处理性能和行为表现（PR [#13391](https://github.com/apache/apisix/pull/13391)、PR [#13254](https://github.com/apache/apisix/pull/13254) 和 PR [#13406](https://github.com/apache/apisix/pull/13406)）
- 为 `hmac-auth`、`forward-auth`、`ai-proxy` 和 `ai-proxy-multi` 添加 `max_req_body_size` 保护，以 `413` 拒绝过大的请求体（PR [#13478](https://github.com/apache/apisix/pull/13478) 和 PR [#13466](https://github.com/apache/apisix/pull/13466)）
- 改进 `openid-connect` 兼容性，支持更新版 `lua-resty-session` 配置项，在本地 JWT 校验、PKCE 和 `private_key_jwt` 模式下将 `client_secret` 设为可选，并对 bearer-token JWT 或 introspection 响应应用 `claim_schema` 校验（PR [#13178](https://github.com/apache/apisix/pull/13178) 和 PR [#13472](https://github.com/apache/apisix/pull/13472)）
- 通过在多个请求处理路径中使用按请求分配替代共享可变表，提升并发安全性（PR [#13369](https://github.com/apache/apisix/pull/13369)）
- 确保引用 service 的 stream routes 在更新后仍能保留正确的 service 级插件上下文（PR [#13402](https://github.com/apache/apisix/pull/13402)）
- 修复未包含 `Content-Length` 的 HTTP/2 和 HTTP/3 请求体处理问题（PR [#13428](https://github.com/apache/apisix/pull/13428)）
- 通过使用 `EVALSHA` 和 `NOSCRIPT` 回退机制优化基于 Redis 的 `limit-count`（PR [#13363](https://github.com/apache/apisix/pull/13363)）
- 通过拒绝畸形 RESP 长度并限制命令预分配大小，强化 Redis xRPC 请求解析（PR [#13483](https://github.com/apache/apisix/pull/13483)）
- 强化 `cors`、`multi-auth` 和 `body-transformer` 对畸形输入的处理，包括缺失的 `Origin` 标头、返回状态码但不返回错误消息的认证插件、格式错误的 multipart 请求体，以及会覆盖保留模板辅助函数的请求字段。DingTalk 认证现在也会在认证前清理客户端自行传入的 `X-Userinfo` 标头（PR [#13469](https://github.com/apache/apisix/pull/13469) 和 PR [#13491](https://github.com/apache/apisix/pull/13491)）

## 变更日志

有关此版本的完整变更列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/release/3.17/CHANGELOG.md#3170)。
