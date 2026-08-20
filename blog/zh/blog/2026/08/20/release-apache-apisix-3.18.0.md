---
title: "Apache APISIX 3.18.0 正式发布"
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
description: Apache APISIX 3.18.0 版本于 2026 年 8 月 20 日发布。该版本新增 AI 响应缓存、语义模型路由、安全插件、L4 增强与可观测性能力，并包含需要注意的升级变更。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.18.0 正式发布。该版本带来了新的 AI Gateway 能力、更严格的安全默认值、L4 代理增强、可观测性改进，以及覆盖网关各模块的可靠性修复。

<!--truncate-->

本版本新增了 LLM 精确、语义与流式响应缓存、语义模型路由、Lakera Guard 集成、高级 LDAP 身份验证插件、更丰富的 Prometheus 指标，以及多项流代理、健康检查、日志和加密能力。

该版本也包含不向后兼容的变更。升级前请阅读以下迁移说明。

## 重大变更

以下变更会影响现有行为、默认值、配置或可观测性约定。请根据每项变更下的升级计划确认部署是否受影响，并在发布前完成必要调整。

### 调试插件报告包含阶段与执行顺序

`Apisix-Plugins` 响应头不再返回去重后的插件名称列表，而是按执行顺序返回 `plugin-name#phase`。依赖该响应头的解析工具需要相应更新。

**升级计划：** 如果系统会读取 `Apisix-Plugins`，请让解析逻辑支持 `plugin-name#phase`、同一插件出现在多个阶段以及有序条目。`body_filter`、`log` 等响应头发送后的阶段是提前推算的，不能作为阶段实际执行的依据；如果工具会根据该响应头作出判断，请使用代表性路由验证结果。

更多信息，请参阅 [PR #13710](https://github.com/apache/apisix/pull/13710)。

### 默认限制请求与响应缓冲大小

多个需要缓冲请求体或响应体的插件现在默认使用 64 MiB 上限。超出限制的请求体可能被拒绝；超出限制的响应则会根据插件行为被截断或直接转发而不缓存。若受影响插件需要处理更大的报文，请配置 `max_req_body_size` 或 `max_resp_body_size`。

**升级计划：** 如果使用受影响的报文缓冲插件，请找出可能超过 64 MiB 的路由，并在升级前设置对应的 `max_req_body_size` 或 `max_resp_body_size`。只需验证适用的处理路径：超大请求会被拒绝；响应转换插件可能截断响应；内存 `proxy-cache` 会直接转发超大响应而不缓存。

更多信息，请参阅 [PR #13705](https://github.com/apache/apisix/pull/13705)。

### 日志积压默认丢弃超额条目

使用批处理器的日志插件现在默认将 `max_pending_entries` 设为 `8192`。当日志后端无法及时处理时，超出限制的新条目会被丢弃，以保护工作进程的内存。调高该值前应评估日志体大小与可用内存。

**升级计划：** 如果使用基于批处理器的日志插件，请结合预期积压量、`batch_max_size`、日志体大小和单个工作进程的内存预算评估默认值。当 `8192` 不合适时显式设置 `max_pending_entries`，为丢弃日志配置告警，并使用缓慢或不可用的日志后端进行测试；记录较大报文时可能需要降低该值。

更多信息，请参阅 [PR #13826](https://github.com/apache/apisix/pull/13826)。

### AWS 内容审核改为审核解码后的 AI 内容

`ai-aws-content-moderation` 现在运行在 `ai-proxy` 或 `ai-proxy-multi` 之后，审核协议解码后的提示词，并返回与提供商兼容的拒绝响应。该插件现在依赖 AI 代理上下文，优先级从 `1050` 调整为 `1031`，默认拒绝状态码改为 `200`。

**升级计划：** 如果使用 `ai-aws-content-moderation`，请在必须实际执行审核的位置将其与 `ai-proxy` 或 `ai-proxy-multi` 配合使用。如果客户端依赖原有 HTTP 错误约定，请固定 `deny_code: 400`；对于 AI 代理无法识别的流量，还应显式选择 `fail_mode`。请分别测试允许、拒绝以及无法识别的请求。

更多信息，请参阅 [PR #13647](https://github.com/apache/apisix/pull/13647)。

### 阿里云请求审核默认仅检查最新用户轮次

`ai-aliyun-content-moderation` 默认只审核最后一段连续的 `user` 消息。后续新增的 `request_check_roles` 可以选择 `user`、`tool` 和 `system`；`request_check_mode` 作用于 `user` 和 `tool`，选中的 `system` 内容则会在每个请求中检查。该插件无法选择 `assistant` 历史消息，因此没有配置可以完全恢复原有的全消息审核行为。

**升级计划：** 如果使用请求审核，请同时显式选择这两个字段。若要近似保留原有范围，可设置 `request_check_mode: all` 和 `request_check_roles: ["user", "tool", "system"]`；但这仍不会检查 `assistant` 历史消息，tool 结果能否抽取也取决于 AI 协议。如果原有策略依赖这些未覆盖消息，请增加其他控制措施或调整策略。请针对支持的每种协议测试较早和最新的用户轮次、选中的 system 内容以及 tool 输出。

更多信息，请参阅 [PR #13598](https://github.com/apache/apisix/pull/13598)。

### SLS 日志插件默认验证 TLS 证书

`sls-logger` 的 `ssl_verify` 现在默认为 `true`，并发送 SNI。自定义或自签名日志端点必须使用受信任证书，或显式设置 `ssl_verify: false`。

**升级计划：** 如果使用 `sls-logger`，请使用 APISIX 信任库和配置中的准确主机名测试每个 TLS 端点。自定义或自签名端点需要受信任的证书链和主机名匹配证书；评估凭证泄露风险后，才能将 `ssl_verify: false` 作为明确且临时的例外。

更多信息，请参阅 [PR #13785](https://github.com/apache/apisix/pull/13785)。

### OpenID Connect 验证失败时拒绝请求

`openid-connect` 现在会在无法确定受信任签发者时拒绝令牌；`claim_validator.audience.match_with_client_id` 会隐式要求 audience 声明；授权码会话也会执行 `required_scopes`。请检查使用不透明访问令牌或缺少 scope 声明的身份提供商。

**升级计划：** 只需测试实际启用的 OIDC 校验。使用 `match_with_client_id` 时，确认签发的令牌包含匹配的 audience；本地校验 JWT 且 Discovery 文档可能不可用时，配置 `claim_validator.issuer.valid_issuers`；授权码路由配置 `required_scopes` 时，确认访问令牌是带字符串 `scope` 声明的 JWT，或 ID 令牌包含该声明。不透明访问令牌且两者都没有 `scope` 时，会话将被拒绝。请覆盖部署实际使用的 Bearer Token 和会话流程。

更多信息，请参阅 [PR #13829](https://github.com/apache/apisix/pull/13829)。

### 写入时检查重复的 Consumer 身份验证键

Admin API 现在会在写入时检查 `key-auth`、`basic-auth`、`jwt-auth`、`hmac-auth` 与 LDAP 身份验证中跨 Consumer 或凭证重复的查找键，并以 400 拒绝检测到的冲突。该保护是尽力而为：本地监听到的 Consumer 数据可能滞后于快速或并发写入，传入的 Secret 或环境变量引用也无法在此检查中解析。

**升级计划：** 上线前应独立审计现有 Consumer 与凭证中的重复身份验证键，包括通过 Secret 或环境变量引用提供的值，并先解决冲突。不要将新的 Admin API 检查作为唯一的唯一性保障；可行时应串行执行敏感迁移，随后更新每个受影响的 Consumer，并实际发起认证以确认身份归属正确。

更多信息，请参阅 [PR #13529](https://github.com/apache/apisix/pull/13529)。

### 转发请求头处理行为变更

`$var_x_forwarded_proto` 已移除，`$var_x_forwarded_host` 与 `$var_x_forwarded_port` 不再可由 Lua 写入。插件应使用 `core.request.set_header` 修改发往上游的转发请求头。受信任对端未提供 `X-Forwarded-Host` 或 `X-Forwarded-Port` 时，现在会使用 APISIX 观测到的值；日志负载也会包含清洗后的转发请求头。

**升级计划：** 如果自定义插件、NGINX 片段或日志格式引用了三个 `$var_x_forwarded_*` 变量，请将 Lua 写入改为 `core.request.set_header`，并移除对已删除 `$var_x_forwarded_proto` 的读取。采用固定请求头结构的日志消费者需要允许新增的三个清洗后请求头。配置了 `trusted_addresses` 的部署还应测试未提供 forwarded host 或 port 的受信任对端；默认未配置信任边界的请求路径则保持原有上游行为。

更多信息，请参阅 [PR #13803](https://github.com/apache/apisix/pull/13803)。

### 限制大型 `post_arg.*` 路由匹配读取

用于 `post_arg.*` 路由条件的 JSON 和 multipart 请求体现在默认限制为 64 MiB。更大的请求体将无法命中该条件，并可能返回 404。如需保留无限制读取，请调高 `apisix.max_post_args_readable_size`，或将其设为 `0`。

**升级计划：** 如果路由使用 `post_arg.*` 匹配 JSON 或 multipart 请求体，请确认预期最大请求体；需要超过 64 MiB 时，显式设置 `apisix.max_post_args_readable_size`。将其设为 `0` 会恢复无限制读取，但也会恢复内存耗尽风险。请发送超出限制的请求，确认它应命中其他路由还是返回 404。

更多信息，请参阅 [PR #13601](https://github.com/apache/apisix/pull/13601)。

### 现有 LDAP TLS 验证开始真正生效

LDAP 客户端依赖升级后，`ldap-auth.tls_verify: true` 会真正执行证书验证，而不再是无效配置。使用自签名证书或证书主机名不匹配的部署，需要安装受信任且匹配的证书，或在适当场景显式关闭验证。

**升级计划：** 如果现有 `ldap-auth` 部署启用了 `tls_verify`，请在上线前根据 `ldap_uri` 验证证书链和 SAN，并配置所需的受信任 CA。只需测试实际使用的加密连接模式，例如 LDAPS 或 StartTLS；关闭证书验证的配置不会新增此失败路径。

更多信息，请参阅 [PR #13762](https://github.com/apache/apisix/pull/13762)。

### LDAP Consumer DN 使用 RFC 4514 转义

`ldap-auth` 现在使用 LDAP 客户端返回的已转义 bind DN 查找 Consumer。用户名包含逗号、加号等特殊字符时，Consumer 的 `user_dn` 必须使用 RFC 4514 转义形式。

**升级计划：** 如果 LDAP 用户名可能包含 DN 特殊字符，请使用支持 LDAP 的工具生成符合 RFC 4514 的转义 bind DN，并在升级前更新对应 Consumer 的 `user_dn`。不含这些字符的用户名不受影响。请同时测试 LDAP bind 成功以及请求关联到预期 Consumer。

更多信息，请参阅 [PR #13805](https://github.com/apache/apisix/pull/13805)。

### Prometheus LLM 延迟指标新增 `type` 标签

`apisix_llm_latency` 现在使用 `type="total"` 与 `type="ttft"` 区分总延迟和首个 Token 延迟（TTFT）；流式请求会同时记录两类样本。若需保持原有总延迟语义，请更新仪表盘、告警和记录规则，添加 `type="total"` 选择条件。

**升级计划：** 如果仪表盘、告警或记录规则使用 `apisix_llm_latency`，请在需要原有总延迟语义的位置添加 `type="total"`，或有意识地按 `type` 聚合。流式请求现在分别产生一条 `total` 与一条 `ttft` 观测，非流式请求只产生 `total`；请据此验证基数和样本数量。

更多信息，请参阅 [PR #13487](https://github.com/apache/apisix/pull/13487)。

### AI 安全插件默认跳过无法识别的流量

`ai-aliyun-content-moderation`、`ai-aws-content-moderation` 与 `ai-prompt-guard` 新增的 `fail_mode` 均默认为 `skip`。无论插件通过 Route、Service 还是 Consumer 生效，无法识别的流量现在都会未经检查直接放行。该行为取代了阿里云审核原有的 500 和 AWS 的原始请求体审核，同时保留 `ai-prompt-guard` 原本的放行结果。

**升级计划：** 如果使用以上任一插件，请根据是否可能收到混合或无法识别的流量，逐一评估 Route、Service 和 Consumer 绑定。无法接受绕过时显式设置 `fail_mode: error`；混合流量需要放行时，应有意识地选择 `skip` 或 `warn`。请测试非 JSON 请求体、不支持的 AI 协议，以及未经过 `ai-proxy` 的请求。

更多信息，请参阅 [PR #13489](https://github.com/apache/apisix/pull/13489)。

## 新功能

APISIX 3.18.0 扩展了 AI Gateway、身份验证、L4 代理、可观测性、限流、日志和流量管理能力。以下内容将分别介绍各项主要功能的适用场景、工作方式和关键配置选择。

### 使用 FFI HTTP 客户端发送 AI 上游请求

`ai-proxy`、`ai-proxy-multi` 与 `ai-request-rewrite` 现在默认通过 `ngx_http_ffi_client` 向上游 LLM 发送请求。该客户端基于 C 实现，可降低出站 HTTP 开销，同时支持与 `lua-resty-http` 相同的缓冲、流式、TLS 和连接复用路径。

APISIX 3.18.0 固定的 APISIX-Runtime 已包含兼容的 v0.1.3 客户端及其 APISIX 域名解析钩子。该钩子可保持网关原有的 DNS 行为，包括 `dns_resolver`、`/etc/hosts` 和搜索域处理，同时为 `Host` 请求头与 SNI 保留原始主机名。

使用自行构建或旧版 APISIX-Runtime 的运维人员可以显式保留 Lua 客户端：

```yaml
plugin_attr:
  ai-proxy:
    http_client: lua-resty-http
```

配置的客户端不可用时，传输层不会静默切换到另一客户端。本版本固定的 APISIX-Runtime 无需兼容性调整；自定义 APISIX-Runtime 用户应确认客户端版本，或选择 `lua-resty-http`，随后测试实际提供商使用的 DNS、TLS、缓冲响应和流式路径。

更多信息，请参阅 [PR #13778](https://github.com/apache/apisix/pull/13778)。

### 使用 `ai-cache` 缓存 LLM 响应

新的 `ai-cache` 插件可降低客服助手、文档问答、翻译和基于提示词的自动化等包含大量重复请求的 LLM 工作负载的延迟与上游 Token 成本。它提供三类互补能力：

- 使用 Redis 存储的精确 L1 缓存，用于请求语义完全一致的场景。
- 可选的语义 L2 缓存，使用 OpenAI 或 Azure OpenAI 生成嵌入向量，并通过 RediSearch 进行余弦相似度检索。
- 对受支持流式提供商进行完整 SSE 捕获与重放，JSON 与 SSE 条目分别存储。

缓存键包含客户端协议、实际模型和提供商、决定响应的参数，以及最终选中的 AI 实例；还可以按路由、Consumer 或指定 NGINX 变量进行隔离。Redis 或嵌入向量生成失败时，请求会按普通 MISS 继续转发，因此缓存不会成为可用性依赖。

以下示例同时启用精确缓存和语义缓存。第一个请求会填充两层缓存；后续改写后的相似问题在超过阈值时可由 L2 直接返回。

```json
{
  "ai-cache": {
    "redis_host": "127.0.0.1",
    "redis_port": 6379,
    "layers": ["exact", "semantic"],
    "semantic": {
      "similarity_threshold": 0.9,
      "embedding": {
        "openai": {
          "model": "text-embedding-3-small",
          "api_key": "$env://OPENAI_API_KEY"
        }
      },
      "vector_search": {
        "redis": {}
      }
    }
  }
}
```

更多信息，请参阅 [PR #13578](https://github.com/apache/apisix/pull/13578)、[PR #13632](https://github.com/apache/apisix/pull/13632) 和 [PR #13644](https://github.com/apache/apisix/pull/13644)。

### 根据语义将提示词路由到不同模型

`ai-proxy-multi` 新增 `semantic` 负载均衡算法，适用于多个模型能力、成本和延迟并不相同的部署。一个统一端点可以将编程问题路由到能力更强的模型，将翻译请求路由到低成本模型，并将无法归类的流量交给通用回退实例，而无需向客户端暴露提供商拓扑。

APISIX 会为每个实例的自然语言示例生成一次嵌入向量，并按配置版本缓存参考向量。每个请求只需生成一次提示词嵌入向量，随后在进程内完成余弦相似度比较，不需要向量数据库。如果嵌入向量生成失败或没有分数超过阈值，请求会交给配置的回退实例。

```json
{
  "ai-proxy-multi": {
    "balancer": {
      "algorithm": "semantic",
      "threshold": 0.6
    },
    "semantic_opts": {
      "fallback": "general",
      "embeddings": {
        "provider": "openai",
        "model": "text-embedding-3-small",
        "auth": {
          "header": {
            "Authorization": "Bearer $env://EMBEDDING_API_KEY"
          }
        }
      }
    },
    "instances": [
      {
        "name": "code",
        "provider": "openai",
        "weight": 1,
        "auth": {"header": {"Authorization": "Bearer $env://OPENAI_API_KEY"}},
        "options": {"model": "gpt-4o"},
        "override": {"endpoint": "https://api.openai.com/v1/chat/completions"},
        "examples": ["debug this stack trace", "write a Python function"]
      },
      {
        "name": "general",
        "provider": "openai",
        "weight": 1,
        "auth": {"header": {"Authorization": "Bearer $env://OPENAI_API_KEY"}},
        "options": {"model": "gpt-4o-mini"},
        "override": {"endpoint": "https://api.openai.com/v1/chat/completions"},
        "examples": ["answer a general question"]
      }
    ]
  }
}
```

语义选择是尽力而为的路由能力，并非内容安全控制；实例选定后目前也不提供基于健康状态的重试。

更多信息，请参阅 [PR #13676](https://github.com/apache/apisix/pull/13676)。

### 使用 Lakera Guard 保护 LLM 请求与响应

新的 `ai-lakera-guard` 插件在网关层与 Lakera Guard v2 API 集成，可检测提示词注入、敏感信息、策略违规和恶意链接。它可以扫描请求、响应或双向流量，应用无需分别实现同一套安全集成。

在 `block` 模式下，被标记的流量会被替换为与提供商兼容的拒绝响应。流式输出会先缓冲再释放，避免有风险的输出内容到达客户端。在 `alert` 模式下，运维人员可以先观察判定结果，再启用拦截。Lakera API 故障由独立的 `fail_open` 控制，使可用性与强制执行之间的选择保持明确。

```json
{
  "ai-lakera-guard": {
    "api_key": "$env://LAKERA_API_KEY",
    "direction": "both",
    "action": "alert",
    "fail_open": true,
    "reveal_failure_categories": false
  }
}
```

建议先使用 `action: alert` 和 `fail_open: true` 上线，观察检测结果与误报，再将选定路由切换为 `block`。若需要严格的响应侧强制执行，请使用 `fail_open: false`；此时流式响应会被缓冲，扫描服务不可用时也不会泄漏未经检查的输出。

更多信息，请参阅 [PR #13570](https://github.com/apache/apisix/pull/13570) 和 [PR #13606](https://github.com/apache/apisix/pull/13606)。

### 扩展 AWS 与阿里云 AI 内容审核能力

AWS 审核除了请求外，现在也可以检查非流式和流式响应。`realtime` 模式会在响应流动时分批检查，并可立即替换后续内容；`final_packet` 模式会对完整输出评分并记录风险等级。长内容会在 UTF-8 字符边界处拆分，并按 AWS Comprehend 的分段限制批量发送。

两种提供商的角色控制略有不同：AWS 可以选择 `user`、`tool`、`assistant` 和 `system`，阿里云可以选择 `user`、`tool` 和 `system`。选中的轮次角色可以按最新轮次或完整历史处理；选中的 system 内容则会在每个请求中检查。OpenAI 的 `developer` 角色会作为 system 级内容处理。

```json
{
  "ai-aws-content-moderation": {
    "comprehend": {
      "access_key_id": "$env://AWS_ACCESS_KEY_ID",
      "secret_access_key": "$env://AWS_SECRET_ACCESS_KEY",
      "region": "us-east-1"
    },
    "request_check_roles": ["user", "tool", "system"],
    "request_check_mode": "last",
    "check_response": true,
    "stream_check_mode": "realtime"
  }
}
```

这些配置可帮助 Agent 和 MCP 工作负载审核工具输出及可能被污染的系统指令，而无需在每个请求中把整个对话历史重复发送给审核提供商。

更多信息，请参阅 [PR #13735](https://github.com/apache/apisix/pull/13735)、[PR #13773](https://github.com/apache/apisix/pull/13773)、[PR #13767](https://github.com/apache/apisix/pull/13767)、[PR #13646](https://github.com/apache/apisix/pull/13646) 和 [PR #13780](https://github.com/apache/apisix/pull/13780)。

### 新增高级 LDAP 身份验证

新的 `ldap-auth-advanced` 插件适用于无法从用户名直接构造 bind DN 的目录。插件会先搜索用户，再使用解析出的 DN 进行绑定，覆盖通过 `sAMAccountName` 等属性进行身份验证的常见 Active Directory 部署。

搜索可以使用服务账号或匿名绑定。插件支持 LDAPS、StartTLS、证书验证、连接池、LDAP 过滤器转义、受限搜索，以及通过 `user_dn` 关联 Consumer。身份验证失败返回 401，而目录服务连接或配置故障仍会明确返回服务端错误。

```json
{
  "ldap-auth-advanced": {
    "ldap_uri": "ldap.example.com:636",
    "use_ldaps": true,
    "ssl_verify": true,
    "base_dn": "ou=users,dc=example,dc=org",
    "attribute": "sAMAccountName",
    "bind_dn": "cn=apisix,ou=services,dc=example,dc=org",
    "ldap_password": "$env://LDAP_BIND_PASSWORD"
  }
}
```

默认情况下，成功认证的身份必须映射到 APISIX Consumer。如果目录身份无需 Consumer 级策略即可通过认证，应明确配置 `consumer_required`。

更多信息，请参阅 [PR #13762](https://github.com/apache/apisix/pull/13762)。

### 增强 Stream 与 L4 代理

Stream 监听端口现在可以针对每个 TCP 端口分别启用或关闭入站和出站 PROXY 协议，不再受限于原有的全局开关。一个 APISIX 实例因此可以同时服务具有不同协议要求的客户端与上游。

当 APISIX 位于受信任的负载均衡器之后时，`nginx_config.stream.real_ip_from` 可以信任并使用入站 PROXY 头中的客户端地址。该地址随后可供 Stream 插件使用，并可重新写入发往上游的 PROXY 头。L4 TLS 上游也可以接收来自内联配置或 `tls.client_cert_id` 的客户端证书。

```yaml
apisix:
  proxy_mode: http&stream
  stream_proxy:
    tcp:
      - addr: 9100
        proxy_protocol: true
        proxy_protocol_to_upstream: true
nginx_config:
  stream:
    real_ip_from:
      - 10.0.0.0/8
```

Prometheus 还提供活跃连接 Gauge 指标、终止状态，以及按监听地址统计的下游/上游入站与出站带宽。这些指标需要本版本包含的 APISIX Runtime；在旧版 Runtime 上会自动停用相关采集，不影响网关继续运行。

更多信息，请参阅 [PR #13561](https://github.com/apache/apisix/pull/13561)、[PR #13700](https://github.com/apache/apisix/pull/13700)、[PR #13596](https://github.com/apache/apisix/pull/13596) 和 [PR #13796](https://github.com/apache/apisix/pull/13796)。

### 扩展 Prometheus 控制与 AI 指标

Prometheus 新增 AI 缓存命中、未命中和绕过计数器、嵌入向量生成延迟直方图、LLM 提示词与补全 Token 分布，以及总延迟和 TTFT 的独立观测。借助这些指标，可以直接从网关衡量缓存效果、嵌入向量生成开销、提示词大小分位数和流式响应速度。

高基数部署可以通过插件元数据折叠指定内置标签的值，而不改变指标的标签结构。客户端提供的模型标签值也会限制为 128 字节。依赖升级修复了重复时间序列、指标字典满时的 100% CPU 忙循环，以及过期条目无法回收的问题。

```json
{
  "disabled_labels": {
    "http_status": ["node", "consumer"],
    "http_latency": ["node"],
    "llm_prompt_tokens": ["request_llm_model"]
  }
}
```

通过 `/apisix/admin/plugin_metadata/prometheus` 应用 `disabled_labels`。HTTP 状态码和延迟类型等结构性标签不能被禁用，因为折叠这些标签会合并语义不同的测量值。

更多信息，请参阅 [PR #13659](https://github.com/apache/apisix/pull/13659)、[PR #13202](https://github.com/apache/apisix/pull/13202)、[PR #13637](https://github.com/apache/apisix/pull/13637)、[PR #13602](https://github.com/apache/apisix/pull/13602)、[PR #13708](https://github.com/apache/apisix/pull/13708) 和 [PR #13754](https://github.com/apache/apisix/pull/13754)。

### 通过 Redis 共享限流计数器

`ai-rate-limiting` 现在可以将 Token 用量计数器存储在 Redis、Redis Cluster 或 Redis Sentinel 中，使多个 APISIX 节点共同执行一个配额。现有 `local` 策略仍是默认值，并继续为每个网关节点维护独立计数器。

`limit-count` 新增三项可独立使用的控制：用于高可用的 Sentinel 后端、平滑窗口边界突发的滑动窗口计数器，以及为高吞吐工作负载批量更新 Redis 的延迟同步。延迟同步以短时间内的全局精度换取更少的网络往返；如果需要每个请求精确写入 Redis，请不要配置 `sync_interval`。

```json
{
  "limit-count": {
    "count": 5000,
    "time_window": 60,
    "key": "consumer_name",
    "key_type": "var",
    "window_type": "sliding",
    "policy": "redis-sentinel",
    "redis_sentinels": [
      {"host": "10.0.0.1", "port": 26379},
      {"host": "10.0.0.2", "port": 26379}
    ],
    "redis_master_name": "mymaster",
    "sync_interval": 1
  }
}
```

本版本还修复了滑动窗口和延迟同步实现中的原子性与配额计算问题，因此采用新模式时应使用完整的 3.18.0 补丁集。

更多信息，请参阅 [PR #13670](https://github.com/apache/apisix/pull/13670) 和 [PR #13443](https://github.com/apache/apisix/pull/13443)。

### 增强 OpenID Connect 客户端流程

`openid-connect` 新增 Pushed Authorization Requests（PAR）、用于令牌端点和 UserInfo 请求的 DPoP 证明生成，以及客户端断言算法与 audience 控制。PAR 与 DPoP 均为可选能力，并使用嵌套配置对象；DPoP 私钥会加密存储。

需要原始签名 ID 令牌的应用可以启用 `set_raw_id_token_header`，在授权码会话流程中通过 `X-Raw-ID-Token` 转发。它不同于 `X-ID-Token`：后者包含编码后的已解码声明，而不是身份提供商签名的 JWT。

```json
{
  "openid-connect": {
    "client_id": "apisix",
    "client_secret": "$env://OIDC_CLIENT_SECRET",
    "discovery": "https://idp.example.com/.well-known/openid-configuration",
    "redirect_uri": "https://gateway.example.com/callback",
    "par": {
      "enabled": true
    },
    "set_raw_id_token_header": true,
    "session": {
      "secret": "$env://OIDC_SESSION_SECRET"
    }
  }
}
```

浏览器流程故障也会得到更友好的恢复。过期回调或 `temporarily_unavailable` 响应可以从原始 URL 重新启动认证，并通过受限重试计数器避免重定向循环。`access_denied` 等明确拒绝结果不会重试。

更多信息，请参阅 [PR #13649](https://github.com/apache/apisix/pull/13649)、[PR #13616](https://github.com/apache/apisix/pull/13616)、[PR #13712](https://github.com/apache/apisix/pull/13712) 和 [PR #13825](https://github.com/apache/apisix/pull/13825)。

### 增强日志格式并保护存储的凭证

日志插件支持 `log_format_extra`，可以在默认结构化日志上覆盖或添加指定字段，而不是替换整条日志。这样可以添加租户、上游或业务上下文，同时保留请求头、响应数据、延迟字段、APISIX 版本与资源标识。

```json
{
  "log_format_extra": {
    "upstream_host": "$upstream_unresolved_host",
    "tenant": "$http_x_tenant_id"
  }
}
```

Kafka 日志可以连接启用 TLS 的 Broker；当需要 Broker 端消息时间戳时，可以选择 Produce API 版本 `2`。`error-log-logger` 的 Kafka 输出也获得同样的 TLS 能力。

凭证存储也得到强化：启用数据加密后，Elasticsearch 与 Loki 自定义请求头、限流插件中的 Redis 密码、Sentinel 密码，以及内联 Stream 上游客户端私钥都会加密存储。可能暴露序列化日志内容或 Kafka SASL 凭证的调试日志已被移除。

更多信息，请参阅 [PR #13568](https://github.com/apache/apisix/pull/13568)、[PR #13607](https://github.com/apache/apisix/pull/13607)、[PR #13521](https://github.com/apache/apisix/pull/13521)、[PR #13612](https://github.com/apache/apisix/pull/13612)、[PR #13784](https://github.com/apache/apisix/pull/13784) 和 [PR #13624](https://github.com/apache/apisix/pull/13624)。

### 新增路由、健康检查和加密配置

APISIX 可以在匹配参数化路由时保留 `%2F` 编码，使 `cat%2Fdog` 等值继续作为一个路径参数，而不是被拆成两个路径段。该全局选项默认关闭，只影响匹配与捕获的参数；后续阶段仍会看到规范化后的 URI。

主动健康检查可以发送自定义 HTTP 方法和请求体，适用于无法通过无请求体 GET 进行有效检查的上游，例如要求最小 Chat Completion POST 的 LLM 端点。

```json
{
  "checks": {
    "active": {
      "type": "https",
      "http_method": "POST",
      "http_path": "/v1/chat/completions",
      "http_req_body": "{\"model\":\"health-check\",\"messages\":[{\"role\":\"user\",\"content\":\"ping\"}]}"
    }
  }
}
```

数据加密 keyring 现在可以在同一轮换集合中同时使用 16 字节 AES-128 与 32 字节 AES-256 密钥。运维人员可以将新的 AES-256 密钥放在首位，同时保留旧 AES-128 密钥用于解密。Prometheus、服务发现和链路追踪中无法安全淘汰的数据也使用了更大的默认共享字典。

更多信息，请参阅 [PR #13626](https://github.com/apache/apisix/pull/13626)、[PR #13726](https://github.com/apache/apisix/pull/13726)、[PR #13756](https://github.com/apache/apisix/pull/13756) 和 [PR #13688](https://github.com/apache/apisix/pull/13688)。

## Bug 修复

本版本还修复了网关多个核心子系统中的正确性、安全性与可靠性问题。以下内容按受影响的功能领域归类，便于运维人员快速找到与其部署相关的修复。

### AI Gateway 正确性与协议兼容性

AI 代理现在能够保留更多上游提供商的原始语义，并使重试与前一次尝试相互隔离。请求未重试时，客户端会收到原始 429/5xx 错误体和 Content-Type；发生回退时，每个实例都从未被修改的客户端请求体重新构造请求，避免模型选项在实例之间泄漏。AI 延迟变量在成功和错误响应上也统一使用毫秒。参阅 [PR #13565](https://github.com/apache/apisix/pull/13565)、[PR #13793](https://github.com/apache/apisix/pull/13793) 和 [PR #13711](https://github.com/apache/apisix/pull/13711)。

协议转换变得更加可靠和忠实：

- 上游流在打开内容块前结束时，Anthropic 客户端不再挂起；无效的 `tool_call` 参数也不会丢弃原本可用的响应。参阅 [PR #13583](https://github.com/apache/apisix/pull/13583) 和 [PR #13599](https://github.com/apache/apisix/pull/13599)。
- Anthropic 工具结果顺序、工具名称映射、推理强度、结构化输出和消息形态现在更符合 OpenAI 兼容上游的预期。参阅 [PR #13674](https://github.com/apache/apisix/pull/13674)。
- 结构化与多模态消息内容会为文本消费者进行一致展开，同时在精确缓存键中保持区别；包含非文本状态的提示词会绕过语义缓存。参阅 [PR #13634](https://github.com/apache/apisix/pull/13634) 和 [PR #13654](https://github.com/apache/apisix/pull/13654)。
- 协议转换将一个上游数据块展开为多个客户端事件时，实时审核不再重复计算同一数据块。参阅 [PR #13765](https://github.com/apache/apisix/pull/13765)。

`ai-request-rewrite` 的内部请求现在只携带插件中配置的提供商凭证，不再转发下游客户端的 `Cookie` 及其他请求头；当提供商通过查询参数、`api-key` 或 SigV4 进行身份验证，而不会覆盖 `Authorization` 请求头时，客户端的 `Authorization` 也不会再被转发。透明代理的 `ai-proxy` 路径仍会按文档转发客户端请求头。参阅 [PR #13699](https://github.com/apache/apisix/pull/13699)。

### 身份验证与身份安全

身份验证插件现在可以干净地拒绝异常输入，并防止客户端控制的身份数据到达上游服务：

- 异常 JWT 签名返回 401，而不再触发 500；`jwe-decrypt` 在关闭 `strict` 时也会正确允许缺少令牌的请求。参阅 [PR #13518](https://github.com/apache/apisix/pull/13518) 和 [PR #13822](https://github.com/apache/apisix/pull/13822)。
- `wolf-rbac` 与 `attach-consumer-label` 会在应用受信任身份数据前始终删除客户端传入的身份请求头。参阅 [PR #13696](https://github.com/apache/apisix/pull/13696) 和 [PR #13590](https://github.com/apache/apisix/pull/13590)。
- `key-auth` 会通过 `multi-auth` 报告真实失败原因，`basic-auth` 会验证 `anonymous_consumer`，`hmac-auth` 也能在要求时可靠移除凭证。参阅 [PR #13693](https://github.com/apache/apisix/pull/13693)、[PR #13682](https://github.com/apache/apisix/pull/13682) 和 [PR #13820](https://github.com/apache/apisix/pull/13820)。

CAS 单点登出回调现在会在插件处终止，不再转发到上游；Casdoor 会话会随访问令牌一起过期。`request-id` 的 `nanoid` 算法现在使用 CSPRNG，不再出现重复 ID、异常输出或文件描述符泄漏。参阅 [PR #13610](https://github.com/apache/apisix/pull/13610)、[PR #13500](https://github.com/apache/apisix/pull/13500) 和 [PR #13508](https://github.com/apache/apisix/pull/13508)。

### 健康检查与负载均衡

一致性哈希环现在与配置的节点和权重保持绑定，并在选择时跳过不健康目标，避免原本落到健康节点的哈希键发生不必要迁移。最少连接负载均衡会在扩缩容时保留实时负载，并正确释放 Stream 连接，因此新加入的空闲节点会优先于已有负载的节点。参阅 [PR #13532](https://github.com/apache/apisix/pull/13532) 和 [PR #13666](https://github.com/apache/apisix/pull/13666)。

主动健康检查获得多项可靠性修复：

- 仅节点变化的上游会原地协调目标，而不是销毁检查器，从而保留健康状态，并避免不健康节点重新接收流量的窗口。参阅 [PR #13629](https://github.com/apache/apisix/pull/13629)。
- 域名节点使用配置的域名作为 Host 与 TLS SNI，而不是使用解析后的 IP 进行探测。参阅 [PR #13743](https://github.com/apache/apisix/pull/13743)。
- 所有检查器都会清除过期目标，周期锁会正确释放，AI 上游构造失败也不会中断其他资源的定时任务。参阅 [PR #13627](https://github.com/apache/apisix/pull/13627) 和 [PR #13592](https://github.com/apache/apisix/pull/13592)。
- `ai-proxy-multi` 会在异步健康检查器建立后刷新服务选择器，并保留健康检查路径已有的查询参数。参阅 [PR #13505](https://github.com/apache/apisix/pull/13505) 和 [PR #13506](https://github.com/apache/apisix/pull/13506)。

使用不同引用客户端证书的 HTTPS 上游不再共享同一个 keepalive 连接池。参阅 [PR #13587](https://github.com/apache/apisix/pull/13587)。

### 限流

滑动窗口现在会在 Redis 后端原子地完成允许/拒绝判断和计数器递增。延迟同步会正确计算上一窗口的加权贡献，避免每个窗口边界都出现一份新的完整配额。参阅 [PR #13574](https://github.com/apache/apisix/pull/13574) 和 [PR #13704](https://github.com/apache/apisix/pull/13704)。

通过变量解析出的 `count` 与 `time_window` 现在必须是正的安全整数。客户端控制的异常值会被拒绝，而不再使限流器崩溃或静默跳过规则。参阅 [PR #13573](https://github.com/apache/apisix/pull/13573)。

`workflow`、Consumer 和 Redis 后端之间的计数器与连接隔离得到修复：

- 每个 `limit-conn` `workflow` 动作使用独立计数器；Consumer 级计数器会在该 Consumer 的所有路由之间共享，而不再按路由拆分。参阅 [PR #13591](https://github.com/apache/apisix/pull/13591) 和 [PR #13600](https://github.com/apache/apisix/pull/13600)。
- Redis 与 Sentinel keepalive 连接池会按数据库、凭证和 TLS 设置隔离，避免计数器落入另一份配置的连接上下文。参阅 [PR #13516](https://github.com/apache/apisix/pull/13516) 和 [PR #13553](https://github.com/apache/apisix/pull/13553)。
- Redis 策略 schema 会先复制再扩展；Redis Cluster 脚本缓存未命中也不会再触发不必要的拓扑刷新。参阅 [PR #13555](https://github.com/apache/apisix/pull/13555) 和 [PR #13579](https://github.com/apache/apisix/pull/13579)。

### 缓存与请求处理

内存 `proxy-cache` 策略现在使用具有唯一映射关系的存储键格式，使构造请求无法读取或覆盖其他请求的 Vary 变体。布局版本也已升级，因此升级前的内存缓存条目在过期前将无法命中。`graphql-proxy-cache` 的 PURGE 也会删除索引中的所有 Vary 变体，而不再只删除旧的基础条目。参阅 [PR #13831](https://github.com/apache/apisix/pull/13831) 和 [PR #13523](https://github.com/apache/apisix/pull/13523)。

缓冲后的请求体现在会在内部 HTTP 调用前重新生成正确的消息边界信息。`forward-auth`、AWS Lambda、Azure Functions 与 OpenFunction 会移除已经不再适用的客户端 `Transfer-Encoding` 和 `Content-Length`，由 HTTP 客户端根据实际缓冲请求体重新生成 `Content-Length`。参阅 [PR #13642](https://github.com/apache/apisix/pull/13642) 和 [PR #13798](https://github.com/apache/apisix/pull/13798)。

其他数据处理修复包括：

- GraphQL 片段深度计算从指数复杂度降为线性复杂度，并会显式拒绝片段循环。参阅 [PR #13809](https://github.com/apache/apisix/pull/13809)。
- XML 命名空间移除不再在遍历期间修改同一张表，从而可靠保留命名空间键与重复元素。参阅 [PR #13522](https://github.com/apache/apisix/pull/13522)。
- AWS Lambda SigV4 会对实际发送的同一份规范化、编码、多值查询字符串进行签名。参阅 [PR #13520](https://github.com/apache/apisix/pull/13520)。
- 空的 repeated protobuf 字段会编码为 JSON 数组；移除 JSON 数组元素后也会压紧数组，不再留下空洞。参阅 [PR #13678](https://github.com/apache/apisix/pull/13678) 和 [PR #13818](https://github.com/apache/apisix/pull/13818)。
- 重复的 `Content-Type` 请求头会被干净拒绝，`$upstream_uri` 中的控制字符会被转义，不安全 URI 重写也会保留客户端查询字符串。参阅 [PR #13691](https://github.com/apache/apisix/pull/13691)、[PR #13787](https://github.com/apache/apisix/pull/13787) 和 [PR #12843](https://github.com/apache/apisix/pull/12843)。

### 日志与可观测性

日志负载和凭证更不容易泄漏或跨配置串用：

- Elasticsearch、Kafka、RocketMQ、SLS 与 Syslog 不再把序列化日志负载写入错误日志；Kafka SASL 凭证也会在错误路径中脱敏。参阅 [PR #13502](https://github.com/apache/apisix/pull/13502) 和 [PR #13786](https://github.com/apache/apisix/pull/13786)。
- Loki 会按请求解析动态标签，并按解析后的标签集合对批次中的条目分组，避免一个服务的标签泄漏到另一个服务。参阅 [PR #13562](https://github.com/apache/apisix/pull/13562)。
- Loggly 会将每个批处理器绑定到自己的配置，避免一条路由的端点、令牌或标签被另一条路由的日志批次使用。参阅 [PR #13648](https://github.com/apache/apisix/pull/13648)。
- 合并后的 DogStatsD 数据包超过 Agent 默认接收缓冲区时，Datadog 会回退为逐指标数据报。参阅 [PR #13665](https://github.com/apache/apisix/pull/13665)。
- 部分日志文件轮转成功时仍会发送 reopen 信号。参阅 [PR #13375](https://github.com/apache/apisix/pull/13375)。

OpenTelemetry Tracer 会在元数据变更后重建，核心 Span 注入也会使用独立缓存条目，从而保留 always-on 采样行为。无效、重复或非十六进制的 `X-Request-Id` 会回退到自动生成的 Trace ID，而不再导致导出崩溃；元数据值类型也会被正确验证。参阅 [PR #13618](https://github.com/apache/apisix/pull/13618)、[PR #13633](https://github.com/apache/apisix/pull/13633)、[PR #12990](https://github.com/apache/apisix/pull/12990) 和 [PR #13690](https://github.com/apache/apisix/pull/13690)。

### 配置、服务发现与 Secret

配置更新与服务发现现在能够更可预测地恢复：

- 短暂 DNS 故障后，相同地址恢复可解析时，上游不再持续返回 503。Consul 会跳过单个异常节点，而不丢弃服务中的其他节点；Stream 子系统中的 Nacos 服务发现也获得所需的共享字典。参阅 [PR #13137](https://github.com/apache/apisix/pull/13137)、[PR #13513](https://github.com/apache/apisix/pull/13513) 和 [PR #13541](https://github.com/apache/apisix/pull/13541)。
- Service 中的 Host 会按大小写不敏感方式规范化；Stream 路由需要 xRPC schema 时会正确初始化；启用 IPv6 后，PROXY 协议监听器也可以绑定 IPv6。参阅 [PR #13781](https://github.com/apache/apisix/pull/13781)、[PR #13515](https://github.com/apache/apisix/pull/13515) 和 [PR #12859](https://github.com/apache/apisix/pull/12859)。
- etcd 全量重载遇到新数据无效时会保留之前的有效值；Watch 超时不再跳过 Revision；未变化条目会被复用以避免不必要的路由器重建。参阅 [PR #13717](https://github.com/apache/apisix/pull/13717) 和 [PR #13721](https://github.com/apache/apisix/pull/13721)。

环境变量与 Secret 处理也获得多项修复：

- 精确键环境变量查找可避免前缀冲突；配置键替换会移除未解析旧键；`nginx_config.envs` 也会安全引用包含空格的值。参阅 [PR #13595](https://github.com/apache/apisix/pull/13595)、[PR #12885](https://github.com/apache/apisix/pull/12885) 和 [PR #13713](https://github.com/apache/apisix/pull/13713)。
- `/secrets` 变化时 Secret 缓存会失效；未解析引用会生成包含字段信息的错误，而不再静默失败。参阅 [PR #13668](https://github.com/apache/apisix/pull/13668) 和 [PR #13737](https://github.com/apache/apisix/pull/13737)。
- Secret 引用仍未解析时，Consumer 身份验证会拒绝请求，而不再使用引用字符串继续认证。Stream TLS 与引用的上游 SSL 对象也会正确初始化和解析由环境变量或 Secret 提供的证书材料。参阅 [PR #13667](https://github.com/apache/apisix/pull/13667)、[PR #12935](https://github.com/apache/apisix/pull/12935) 和 [PR #13062](https://github.com/apache/apisix/pull/13062)。

合并 Consumer 与 Route 配置后，插件状态会被保留；父资源查找也支持所有可携带插件的资源类型。参阅 [PR #13757](https://github.com/apache/apisix/pull/13757) 和 [PR #13663](https://github.com/apache/apisix/pull/13663)。

## 其他更新

以下性能优化、代码重构与维护性变更减少了运行时开销，并简化了内部行为，但不会引入新的用户功能。

- 通过跨阶段缓存全局规则插件集合、跳过未采样请求的 Zipkin 标签构建，以及在一个 Datadog 批次内复用 UDP 套接字，减少热路径工作。参阅 [PR #13779](https://github.com/apache/apisix/pull/13779)、[PR #13656](https://github.com/apache/apisix/pull/13656) 和 [PR #13653](https://github.com/apache/apisix/pull/13653)。
- 移除未使用的 `clean_handlers` 机制，将通用数据加密与 SSL 专用代码分离，并移除多余的 CAS 原始 Cookie 回退。参阅 [PR #13761](https://github.com/apache/apisix/pull/13761)、[PR #13564](https://github.com/apache/apisix/pull/13564) 和 [PR #13635](https://github.com/apache/apisix/pull/13635)。
- 对已禁用或跨子系统插件的元数据不再输出预期警告，并统一使用 `description` 记录字段级 schema 文档。参阅 [PR #13514](https://github.com/apache/apisix/pull/13514) 和 [PR #13547](https://github.com/apache/apisix/pull/13547)。

## 更新日志

此版本的完整更新列表，请参阅 [3.18.0 CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3180)。
