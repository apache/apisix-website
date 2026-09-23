---
title: "Apache APISIX 3.19.0 正式发布"
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
description: Apache APISIX 3.19.0 计划于 2026 年 9 月 24 日发布。该版本新增原生 WebSocket 处理、TLS 流量透传、OpenAPI 转 MCP、上游慢启动和基于 GraphQL 查询成本的限流能力，并包含需要注意的升级变更。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.19.0 正式发布。该版本带来了新的 WebSocket 与流代理能力、更安全的身份验证和 TLS 行为、更丰富的流量控制，以及覆盖网关各模块的可靠性改进。

<!--truncate-->

本版本新增了原生 WebSocket 帧处理、流路由 TLS 透传、`openapi-to-mcp` 插件、上游慢启动、基于 GraphQL 查询成本的限流、更可靠的独立部署配置更新，以及更完善的 SAML 验证能力。

该版本也包含不向后兼容的变更。升级前请阅读以下迁移说明。

## 重大变更

以下变更会影响现有配置、身份验证流程、客户端输入或可观测性约定。请根据每项变更下的升级计划确认部署是否受影响，并在发布前完成必要调整。

### HTTPS 和 gRPCS 上游证书验证开始生效

`upstream.tls.verify` 现在会控制 `https` 和 `grpcs` 上游的证书验证，而不再仅由 `kafka` 协议读取。已有 HTTPS 或 gRPCS 上游如果已经设置 `tls.verify: true`，升级后将开始验证证书链和主机名。证书不受信任或主机名不匹配时，TLS 连接会失败，通常返回 502。

新增的 `tls.ca_certs` 数组可以为单个上游提供信任锚。未配置该字段时，验证会使用 `config.yaml` 中的 `ssl_trusted_certificate`。不设置 `tls.verify` 时会遵循 NGINX 的验证配置；显式设置为 `false` 则会关闭该上游的验证。

Apache APISIX 3.19.0 固定使用 APISIX Runtime 1.3.18，其中包含所需的上游证书验证 API。自定义或旧版 Runtime 如果缺少 `set_ssl_verify` 或 `set_ssl_trusted_store`，使用对应选项时会返回 503。

**升级计划：** 如果 `https` 或 `grpcs` 上游已经设置 `tls.verify: true`，请先确定 APISIX 验证的主机名：默认 `pass_host: pass` 使用请求 Host，`pass_host: rewrite` 使用 `upstream_host`，`pass_host: node` 使用选中的节点主机名。根据该主机名检查证书链和使用者可选名称。将所需 PEM 证书加入 `upstream.tls.ca_certs` 或共享的 `ssl_trusted_certificate`，并确认自定义 Runtime 提供上述两个上游 TLS API。请分别测试有效连接，以及证书不受信任或主机名不匹配时应返回的 502。只有在明确接受风险并需要保留原有不验证行为时，才将 `tls.verify` 设置为 `false` 作为兼容措施。

更多信息，请参阅 [PR #13863](https://github.com/apache/apisix/pull/13863)。

### OpenID Connect 内省开始执行已配置的颁发者允许列表

当 `openid-connect` 使用远程内省并配置 `claim_validator.issuer.valid_issuers` 时，成功的内省响应现在必须包含字符串类型的 `iss`，且其值必须位于允许列表中。缺少 `iss`、类型不是字符串或值不在列表中时，APISIX 会返回 401 和 `invalid_token` 质询。此前，该允许列表不会用于验证内省响应。

**升级计划：** 如果基于内省的路由配置了 `claim_validator.issuer.valid_issuers`，请确认授权服务器会返回 `iss`，并将其准确值加入列表。发布前分别测试有效令牌和来自其他颁发者的令牌。应优先修正内省响应或允许列表。只有在对仅使用内省的配置完成安全评估后才移除 `valid_issuers`；该字段也会限制公钥和 JWKS 验证，移除后这两条路径会改用发现文档中的颁发者。未配置该允许列表的路由不受影响。

更多信息，请参阅 [PR #13916](https://github.com/apache/apisix/pull/13916)。

### 批量请求的聚合响应默认受大小限制

`batch-requests` 插件现在将单个子响应体限制为 1 MiB，并将单条流水线内所有响应体的总大小限制为 10 MiB。超过任一限制时，流水线将返回 502，而不再返回完整聚合结果。无论上游使用 `Content-Length`、分块传输还是以连接关闭表示响应结束，这些限制都会生效。

全局插件元数据字段 `max_response_body_size` 和 `max_response_body_size_total` 分别控制单项和聚合限制，单位为字节。两个字段都必须是正整数。例如：

```shell
curl "http://127.0.0.1:9180/apisix/admin/plugin_metadata/batch-requests" \
  -H "X-API-KEY: <admin-key>" \
  -X PUT \
  -d '{
    "max_response_body_size": 4194304,
    "max_response_body_size_total": 41943040
  }'
```

**升级计划：** 如果客户端使用 `batch-requests`，请测量预期的最大子响应和聚合响应。当默认值不足时，在升级前将两个元数据字段都设置为高于实际边界的值，并分别测试恰好达到和刚刚超过限制的请求。该元数据会影响 APISIX 实例处理的所有批量请求。该功能没有无限制选项；所选值还必须符合每个工作进程的内存预算。

更多信息，请参阅 [PR #13906](https://github.com/apache/apisix/pull/13906)。

### Basic Auth 拒绝消费者使用空密码

`basic-auth` 的消费者和凭据 Schema 现在要求 `password` 至少包含一个字符。通过 Admin API 写入空的字面量密码时会返回 400；配置加载时，已存储的空字面量也无法通过 Schema 验证。环境变量或 Secret 引用在解析前可以通过 Schema 验证，但解析结果为空时，身份验证会返回 401，而不再接受 `username:`。

**升级计划：** 如果使用 `basic-auth`，请检查消费者和凭据密码，包括其引用的环境变量与 Secret，并在升级前替换所有空值。随后验证每个受影响身份都能使用新的非空密码完成认证。没有兼容选项可以恢复空密码认证。

更多信息，请参阅 [PR #13884](https://github.com/apache/apisix/pull/13884)。

### `ai-proxy-multi` 实例名称必须唯一

同一份 `ai-proxy-multi` 配置中的每个 `instances[].name` 现在必须唯一。APISIX 会将该名称用作负载均衡节点、健康检查器、`ai-rate-limiting` 目标和 `semantic_opts.fallback` 的实例标识；重复名称此前会让不同实例合并为含义不明确的运行时状态。包含重复名称的配置在写入时会被拒绝，通过现有配置源重新加载时也不会生效。

**升级计划：** 如果使用 `ai-proxy-multi`，请检查所有包含该插件的路由、服务和 Plugin Config，并为每个 `instances` 条目设置不同名称。在同一次配置变更中更新 `semantic_opts.fallback` 和对应的 `ai-rate-limiting.instances[].name` 引用。通过 Admin API 重新提交父资源以验证配置，再向各目标发送代表性请求；如果实例配置了 `checks`，还应通过 Control API 验证对应的健康检查器。重复名称没有兼容选项。

更多信息，请参阅 [PR #13851](https://github.com/apache/apisix/pull/13851)。

### `workflow` 拒绝无效表达式和动作列表

`workflow` 插件现在会拒绝无法编译的 `case` 表达式。此前这类表达式可能通过验证，并在运行时匹配所有请求。每条规则的 `actions` 还必须只包含一个双元素 `[name, conf]` 条目。包含多个动作、缺少动作配置或元组中存在多余元素的配置会被拒绝，不再静默地只执行第一个动作。

每条规则必须使用以下结构：

```json
{
  "plugins": {
    "workflow": {
      "rules": [
        {
          "case": [["uri", "==", "/hello"]],
          "actions": [["return", {"code": 403}]]
        }
      ]
    }
  }
}
```

**升级计划：** 如果使用 `workflow`，请验证每个 `case` 表达式，并将每条规则调整为只包含一个 `[name, conf]` 动作。`workflow` 没有等效的多动作模式：APISIX 会在第一条匹配规则处停止，因此把同一条件拆成多条规则也不会按顺序执行多个动作。请保留一个 workflow 动作，并将其他行为改为常规插件组合或自定义的组合动作。请为每条修正后的规则分别测试一个匹配请求和一个不匹配请求。无效表达式和多动作列表没有旧行为兼容模式。

更多信息，请参阅 [PR #13862](https://github.com/apache/apisix/pull/13862)。

### WebSocket 会话使用新的 Prometheus `request_type` 值

通过原有 NGINX 代理路径成功完成 WebSocket 升级的请求（通常是使用 `enable_websocket` 的路由），现在会在 `apisix_http_status`、`apisix_http_latency` 和 `apisix_bandwidth` 中标记为 `request_type="websocket"`，而不再是 `request_type="traditional_http"`。这样可以避免传统 HTTP 延迟分析混入长连接 WebSocket 会话，但也会改变现有指标序列和查询条件。新增的 `ws` 和 `wss` 内容处理路径在完成下游握手时也会设置相同标签。

**升级计划：** 如果仪表盘、告警或记录规则通过 `request_type="traditional_http"` 筛选这些指标，请确定是否仍要包含 WebSocket 流量。在开始混合版本滚动升级前，若要保留合并统计，请改用 `request_type=~"traditional_http|websocket"`；也可以单独创建 WebSocket 面板和告警。请在代表性的 `enable_websocket` 路由上分别使用成功和被拒绝的升级请求验证这三类指标；如果采用新增的 `ws` 或 `wss` 协议，还应单独验证该路径。没有配置可以恢复旧的标签值。

更多信息，请参阅 [PR #13909](https://github.com/apache/apisix/pull/13909) 和 [PR #13915](https://github.com/apache/apisix/pull/13915)。

### 空健康检查集合改用 JSON 数组

Control API 现在会为 `/v1/healthcheck` 的空顶层结果和空 `nodes` 集合统一返回 `[]`。此前，即使非空结果和文档约定都使用数组，空集合仍会编码为 `{}`。如果严格类型客户端将空值反序列化为对象，JSON 类型变化可能导致其失败。

**升级计划：** 如果客户端会读取 `/v1/healthcheck` 或 `/v1/healthcheck/{src_type}/{src_id}`，请更新其 Schema，要求顶层集合和 `nodes` 始终为数组，包括空值。请分别测试尚未处理首个上游请求的已配置检查器，以及完全没有检查器的部署。没有配置可以恢复对象形式的空值。

更多信息，请参阅 [PR #13891](https://github.com/apache/apisix/pull/13891)。

### 启用验证的 Redis TLS 连接开始检查服务器名称

对于单节点 `policy: redis` 路径，使用 Redis 的插件现在会发送 TLS SNI；当 `redis_ssl_verify` 为 `true` 时，还会根据 `redis_server_name` 或 `redis_host` 验证证书。已有部署如果将证书未覆盖的 DNS 别名用作 `redis_host`，升级后 Redis 操作可能因证书主机名不匹配而失败。该变更适用于 `ai-cache`、`ai-rate-limiting`、`graphql-limit-count`、`limit-count`、`limit-conn` 和 `limit-req` 共用的单节点 Redis 配置，不影响 Redis Cluster 或 Sentinel 路径。

新增字段 `redis_server_name` 允许连接地址继续使用 IP 或别名，同时显式指定证书身份和 SNI。如果配置的 `redis_server_name` 或 `redis_host` 值本身是 IP 字面量，APISIX 不会发送 SNI，也不会执行主机名检查。

例如，以下 `limit-count` 配置通过 IP 建立连接，同时按 `redis.example.com` 验证证书：

```json
{
  "plugins": {
    "limit-count": {
      "count": 100,
      "time_window": 60,
      "key": "remote_addr",
      "policy": "redis",
      "redis_host": "10.0.0.20",
      "redis_port": 6379,
      "redis_ssl": true,
      "redis_ssl_verify": true,
      "redis_server_name": "redis.example.com"
    }
  }
}
```

**升级计划：** 如果插件配置了 `redis_ssl: true` 和 `redis_ssl_verify: true`，请比较证书 SAN 与 `redis_host`。两者不同时，将 `redis_server_name` 设置为证书中的 DNS 名称，或更换为覆盖配置主机名的证书。测试时请建立新 TLS 连接，不要依赖已有保活连接。将 `redis_ssl_verify` 设置为 `false` 可以保留不验证的连接，但只能作为明确接受风险的临时回退方案。

更多信息，请参阅 [PR #13938](https://github.com/apache/apisix/pull/13938)。

### 飞书和钉钉浏览器登录回调必须携带 `state`

`feishu-auth` 和 `dingtalk-auth` 现在会将浏览器授权码绑定到发起登录的会话。APISIX 会在 `redirect_uri` 后附加随机 `state`，将其保存在加密会话中，并要求查询参数中的授权码携带相同值。回调缺少 `state` 或值不一致时会返回 401 `Invalid state`。

非浏览器的请求头方式默认使用 `X-Feishu-Code` 或 `X-DingTalk-Code`，不受此要求影响。

**升级计划：** 如果应用负责提供任一插件的 `redirect_uri`，请让它把接收到的 `state` 转发给身份提供商，并在回调 APISIX 时保留身份提供商返回的 `state`。请在启用 Cookie 的情况下测试完整浏览器流程，并验证缺少或篡改 `state` 时会失败。使用请求头传递授权码的集成无需修改；查询参数回调无法关闭 `state` 验证。

更多信息，请参阅 [PR #13806](https://github.com/apache/apisix/pull/13806)。

### `jwe-decrypt` 验证令牌声明的算法

`jwe-decrypt` 现在可以处理符合 RFC 7516、将受保护头部作为 AES-GCM 附加认证数据（AAD）的令牌。它仍兼容 APISIX 原有的不带 AAD 的令牌格式，包括省略 `alg` 或 `enc` 的旧头部。但是，如果令牌声明了 `dir` 之外的 `alg` 或 `A256GCM` 之外的 `enc`，现在会返回 400，不再按实际支持的算法尝试解密。

新令牌应使用以下受保护头部：

```json
{"alg": "dir", "enc": "A256GCM", "kid": "consumer-key"}
```

**升级计划：** 如果系统会为 `jwe-decrypt` 生成令牌，请检查受保护头部，确保其声明 `{"alg":"dir","enc":"A256GCM","kid":"..."}`。建议使用会对受保护头部执行认证的标准 JWE 库。重新生成携带错误算法值的令牌，并同时测试被篡改头部和有效令牌。无法通过配置接受显式声明的不支持算法；迁移期间仍可继续使用原有不带 AAD 的令牌。

更多信息，请参阅 [PR #13889](https://github.com/apache/apisix/pull/13889)。

## 新功能

Apache APISIX 3.19.0 扩展了流代理、WebSocket 处理、流量管理、MCP 集成、身份验证和运行可观测性能力。以下小节介绍主要新增功能的行为和关键上线注意事项。

### 在流代理中透传 TLS 并匹配多个 SNI

流监听器现在可以把加密 TLS 会话原样转发给上游，而不在 APISIX 终止 TLS。配置 `tls_passthrough: true` 后，监听器会从预读的 ClientHello 中提取 SNI、选择流路由，并转发原始字节，由上游完成握手。同一监听器同时设置 `tls: true` 和 `tls_passthrough: true` 时会进入混合模式，再通过各流路由的 `tls_passthrough` 布尔值选择终止或透传。

```yaml
apisix:
  proxy_mode: http&stream
  stream_proxy:
    tcp:
      - addr: 9100
        tls: true
        tls_passthrough: true
```

新增的 `snis` 数组允许一条流路由匹配多个精确或通配服务器名称，并且不能与原有 `sni` 同时使用。在透传路径中，网关 mTLS 和需要读取载荷的流插件无法检查加密会话；上游也不能设置 `scheme: tls`，否则会尝试第二次握手。混合监听器还不能使用 `proxy_protocol_to_upstream`，并且由于内部多一跳，每个客户端连接会在 `apisix_stream_metrics_zone` 中计数两次。

更多信息，请参阅 [PR #13912](https://github.com/apache/apisix/pull/13912) 和 [PR #13911](https://github.com/apache/apisix/pull/13911)。

### 在 APISIX 中处理 WebSocket 帧

新增的 `ws` 和 `wss` 上游协议允许 APISIX 自行解析和代理 WebSocket 帧。自定义插件可以在 `ws_handshake`、`ws_client_frame`、`ws_upstream_frame` 和 `ws_close` 阶段运行，从两个方向检查或改写消息。该模式仍会执行常规的 `rewrite`、`access`、`before_proxy` 和 `log` 阶段，但升级后的会话不会执行 `header_filter`、`body_filter` 或 `delayed_body_filter`。

最终代理路径会遵循运行时实际选中的协议，包括由 `traffic-split` 选择的内联 `ws` 或 `wss` 上游。它会发送常规代理路径应发送的 Host，将去除端口后的该主机名用作 TLS SNI，只向客户端返回上游实际选择的子协议，并能在上游以非 101 响应拒绝握手后、提交下游 101 之前重试其他节点。连接失败日志不会包含请求 URI，从而避免泄露查询参数中的凭据。

这与在 `http` 或 `https` 上游上使用 `enable_websocket` 不同；后者仍由 NGINX 将升级后的连接作为不透明字节流转发。只有在需要帧级插件逻辑时才应选择 `ws` 或 `wss`。默认情况下，增强代理会拒绝单个超过 65,535 字节的接收帧。新增的 `websocket-proxy` 插件会提高配置侧的接收限制，以及另一侧对应的转发发送限制；由于分片会在插件处理和转发前聚合，该发送限制也会约束聚合后的消息载荷。

```json
{
  "plugins": {
    "websocket-proxy": {
      "client_max_payload_len": 1048576,
      "upstream_max_payload_len": 1048576
    }
  },
  "upstream": {
    "scheme": "wss",
    "pass_host": "rewrite",
    "upstream_host": "ws.example.com",
    "tls": {"verify": true},
    "type": "roundrobin",
    "nodes": {"ws.example.com:443": 1}
  }
}
```

对于 `wss`，可以使用 `tls.verify` 和上游客户端证书，但 WebSocket 客户端无法应用单个上游的 `tls.ca_certs`，因此配置该字段会被拒绝。请改用共享的 `ssl_trusted_certificate` 配置所需信任锚。

更多信息，请参阅 [PR #13939](https://github.com/apache/apisix/pull/13939)、[PR #13972](https://github.com/apache/apisix/pull/13972) 和 [PR #13977](https://github.com/apache/apisix/pull/13977)。

### 通过慢启动逐步增加新上游节点的流量

轮询上游现在可以使用 `warm_up_conf`，让新发现节点从较低有效权重开始，并逐步提升到配置权重。这样可以避免冷启动应用实例在缓存、连接池和运行时尚未就绪时立即承接完整流量份额。

首先只配置应视为已经预热的节点：

```json
{
  "type": "roundrobin",
  "nodes": {"10.0.0.10:8080": 100},
  "warm_up_conf": {
    "slow_start_time_seconds": 300,
    "min_weight_percent": 10,
    "interval": 5,
    "aggression": 1
  }
}
```

之后更新配置，在保留 `warm_up_conf` 的同时加入新节点：

```json
{
  "type": "roundrobin",
  "nodes": {
    "10.0.0.10:8080": 100,
    "10.0.0.11:8080": 100
  },
  "warm_up_conf": {
    "slow_start_time_seconds": 300,
    "min_weight_percent": 10,
    "interval": 5,
    "aggression": 1
  }
}
```

每个 APISIX 实例都会在本地独立记录爬坡过程。首次观察到的节点集合会被视为已经预热，`10.0.0.11` 则从配置权重的 10% 开始，并在五分钟内逐步恢复到完整权重。因健康检查而暂时不可用的节点会在首次恢复可选时开始爬坡。`startup_grace_period_seconds` 可以将 APISIX 启动后不久首次观察到的节点直接视为已经预热，避免重启后整组节点重新爬坡。慢启动仅支持单优先级的 `roundrobin` HTTP 上游；在 `traffic-split` 中会被拒绝，对流路由则会被忽略。

更多信息，请参阅 [PR #13941](https://github.com/apache/apisix/pull/13941)。

### 将 OpenAPI 文档转换为 MCP 服务器

新增的 `openapi-to-mcp` 插件可以将 OpenAPI 文档中的操作公开为模型上下文协议工具，无需部署单独的 MCP 进程。它支持无状态 Streamable HTTP 和基于会话的 HTTP+SSE，可以从 OpenAPI 3.x 或受支持的 Swagger 2.0 结构生成工具 Schema、验证工具参数，并代表 MCP 客户端调用配置的 API。

```json
{
  "uri": "/mcp",
  "plugins": {
    "openapi-to-mcp": {
      "transport": "streamable_http",
      "openapi_url": "https://api.example.com/openapi.json",
      "base_url": "https://api.example.com",
      "headers": {
        "Authorization": "Bearer ${http_x_api_token}"
      }
    }
  }
}
```

`base_url` 和请求头值可以使用 APISIX 变量。对于 SSE，会话建立时解析出的值会在整个会话内固定，后续消息请求会使用相同的上游上下文。SSE 会话存放在单个 APISIX 实例的共享内存中，因此多实例部署需要会话亲和性；Streamable HTTP 则是无状态的。OpenAPI 文档会缓存一小时，支持解析内部和 HTTP(S) 引用，在验证前应用 Schema 默认值，并会将非 OpenAPI 文档报告为错误，而不是返回空工具列表。

更多信息，请参阅 [PR #13942](https://github.com/apache/apisix/pull/13942) 和 [PR #13956](https://github.com/apache/apisix/pull/13956)。

### 按 GraphQL 查询成本限流

`graphql-limit-count` 除原有默认的 `depth` 策略外，现在还支持 `complexity` 和 `node_quantifier` 成本策略。运维人员可以在 Service 下配置 `graphql_cost_decorations`，为字段和分页参数设置权重，内省上游 Schema，缩放最终分数，并在查询成本超过 `max_cost` 时于请求到达后端前拒绝它。

例如，先在 Service 上配置基于查询成本的限流：

```json
{
  "plugins": {
    "graphql-limit-count": {
      "count": 10000,
      "time_window": 60,
      "key": "remote_addr",
      "rejected_code": 429,
      "cost_strategy": "node_quantifier",
      "max_cost": 5000,
      "resolve_variables": true,
      "show_limit_quota_header": true
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {"127.0.0.1:1980": 1}
  }
}
```

然后在 `/apisix/admin/services/{service_id}/graphql_cost_decorations/products` 创建装饰项：

```json
{
  "field_path": "Query.products",
  "mul_arguments": ["first"],
  "add_value": 1
}
```

这样，即使查询深度相同，`products(first: 1000)` 的成本也会高于 `products(first: 10)`。`resolve_variables` 默认为 `true`，因此通过 GraphQL 变量传入的值以及 Schema 默认值也会计入成本。启用配额响应头时，计算结果会通过 `X-Graphql-Query-Cost` 返回。APISIX 会先扣减限流配额，再执行 `max_cost` 检查，因此因成本过高而返回 403 的查询仍会消耗配额。

原有 `depth` 策略仍是默认值，并保留现有配额行为。两种新策略都需要由 Service 持有装饰项。没有装饰项时，`complexity` 会按节点数计费，`node_quantifier` 则回退到最小成本 1；两种情况都会跳过 Schema 内省。

更多信息，请参阅 [PR #13840](https://github.com/apache/apisix/pull/13840)。

### 确认独立部署配置已在所有工作进程生效

API 驱动的独立部署模式现在支持在 `PUT /apisix/admin/configs` 上使用 `wait=<milliseconds>`。未设置时，APISIX 会在接受配置后返回 202。设置不超过 60,000 的值后，请求会等待所有 HTTP 工作进程以及已启用的 stream 工作进程，为每个受跟踪的资源类型报告目标摘要；全部生效时返回 200，超过截止时间则返回 202。

```shell
curl "http://127.0.0.1:9180/apisix/admin/configs?wait=3000" \
  -H "X-API-KEY: <admin-key>" \
  -H "Content-Type: application/json" \
  -H "X-Digest: release-3.19-config-1" \
  -X PUT \
  -d '{}'
```

该等待机制不会为每个资源对象分别计算摘要。它为配置控制器提供了有界的就绪信号，同时不会把等待超时误报为更新失败：202 仍表示更新已接受，只是尚未确认在所有工作进程完成应用。由于 `X-Digest` 已匹配而返回 204 的请求不受影响。

更多信息，请参阅 [PR #13904](https://github.com/apache/apisix/pull/13904)。

### 查看插件拥有的健康检查器

Control API 现在不仅会报告上游健康检查器，也会报告插件自行创建的主动健康检查器。`ai-proxy-multi` 利用该能力公开每个配置了 `checks` 的 LLM 实例对应的检查器，并包含插件名称和实例元数据。新增端点 `/v1/healthcheck/{src_type}/{src_id}/checkers` 会返回一个资源拥有的所有检查器；资源没有检查器时返回空数组。

更多信息，请参阅 [PR #13899](https://github.com/apache/apisix/pull/13899)。

### 增强 SAML 响应验证

`saml-auth` 现在公开 `lua-resty-saml` 0.2.6 提供的验证控制项，包括允许的 IdP 颁发者、外部可见 ACS URL、允许的 SP 受众、时钟偏差，以及可选的单节点断言重放防护。不设置这些新增字段时，插件会保留原有配置行为。

将适用的控制项加入现有 `saml-auth` 配置：

```json
{
  "idp_issuers": ["https://idp.example.com/realms/example"],
  "sp_acs_url": "https://sp.example.com/login/callback",
  "sp_audiences": ["https://sp.example.com"],
  "clock_skew": 60,
  "replay_dict": "plugin-saml-auth-replay",
  "replay_ttl": 600
}
```

当 APISIX 看到的协议或主机名与浏览器不同，例如位于终止 TLS 的负载均衡器之后时，请设置 `sp_acs_url`。`replay_dict` 可以尽力防止同一断言在一个 APISIX 节点上被接受两次。请根据登录速率和断言有效期规划并监控共享字典容量：字典已满时，APISIX 会接受断言但不记录，并写入错误日志。重放记录不会在不同 APISIX 节点之间共享。

更多信息，请参阅 [PR #13964](https://github.com/apache/apisix/pull/13964)。

### 为指定的 AI 上游响应执行重试

`ai-proxy-multi` 现在可以通过 `fallback_http_statuses` 为明确选择的 400–599 响应重试其他实例。这适用于凭据过期、账户配额耗尽等提供商特定场景，同时避免对所有客户端错误自动重试。

将以下字段加入现有 `ai-proxy-multi` 配置：

```json
{
  "fallback_http_statuses": [401, 402],
  "max_retries": 1,
  "retry_on_failure_within_ms": 1000
}
```

原有 `max_retries` 和 `retry_on_failure_within_ms` 同样会限制这些回退。`semantic` 负载均衡算法不参与健康检查或上游失败重试，因此 `fallback_http_statuses` 不会为语义路由新增这类重试行为。

更多信息，请参阅 [PR #13852](https://github.com/apache/apisix/pull/13852)。

### 将响应记录到 Chaitin WAF

`chaitin-waf` 现在可以在客户端响应完成后，将响应状态、响应头和一段受限长度的响应体报告给 SafeLine 服务：

```json
{
  "config": {
    "log_resp": true,
    "resp_body_size": 4,
    "extra_ignored_content_types": "text/csv,application/pdf"
  }
}
```

`config.log_resp` 用于启用报告，`resp_body_size` 以 KiB 为单位限制缓冲大小，`extra_ignored_content_types` 用于排除其他响应类型。报告是异步观测行为，不会阻止或改写响应。每个适用的并发响应都会占用缓冲内存，因此只有在评估并发量和工作进程内存后才应提高 `resp_body_size`。内容类型被忽略的响应不会为报告而缓冲。

更多信息，请参阅 [PR #13763](https://github.com/apache/apisix/pull/13763)。

## 问题修复

本版本还修复了可靠性、协议、安全性和可观测性相关问题。以下内容按受影响子系统分组，便于运维人员聚焦于自身部署实际使用的路径。

### AI Gateway

- 当上游未产生任何输出时，流式 AI 响应现在会返回 502；已经向客户端发送部分输出后发生读取错误时，不再进行不安全的重试，也不会覆盖已经提交的状态码。空的定时刷新也不再中止被缓冲的流。请参阅 [PR #13870](https://github.com/apache/apisix/pull/13870)、[PR #13876](https://github.com/apache/apisix/pull/13876) 和 [PR #13947](https://github.com/apache/apisix/pull/13947)。
- Vertex AI 嵌入模型名称现在会被编码为单个 URI 路径段；`ai-cache` 也会在 passthrough 协议的缓存键中包含实际方法、路径和查询参数，避免不同端点发生缓存冲突。请参阅 [PR #13872](https://github.com/apache/apisix/pull/13872) 和 [PR #13887](https://github.com/apache/apisix/pull/13887)。
- 即使流式提供商没有返回用量数据，`ai-aliyun-content-moderation` 现在也会输出最终审核结果，同时保留未完成或中止流的语义。请参阅 [PR #13922](https://github.com/apache/apisix/pull/13922)。

### 身份验证与请求安全

- `jwe-decrypt` 现在会以 400 拒绝无效头部、Base64URL 字段、IV、标签和无效编码 Secret，避免 Lua 错误转化为 500 响应。请参阅 [PR #13844](https://github.com/apache/apisix/pull/13844)。
- `basic-auth` 现在会在第一个冒号处分隔凭据，从而支持 RFC 7617 允许的、包含额外冒号的密码。请参阅 [PR #13836](https://github.com/apache/apisix/pull/13836)。
- 即使 400 响应导致底层 NGINX 请求头修改失效，`data-mask` 现在也会让日志插件读取到已脱敏的请求头。请参阅 [PR #13839](https://github.com/apache/apisix/pull/13839)。
- `redirect` 现在以不区分大小写的方式处理 `X-Forwarded-Proto`，避免上游代理发送 `HTTPS` 时产生 HTTP 到 HTTPS 的重定向循环。`ua-restriction` 现在会在任意一个重复 User-Agent 请求头匹配拒绝列表时拒绝请求。请参阅 [PR #13865](https://github.com/apache/apisix/pull/13865) 和 [PR #13869](https://github.com/apache/apisix/pull/13869)。

### 配置、etcd 与健康检查

- etcd 监听器现在从启动快照所使用的修订版本开始监听，并会在配置对象依赖它之前等待 etcd 可用，避免遗漏 APISIX 启动期间的写入，也避免配置一直等待从未连通的监听器。请参阅 [PR #13917](https://github.com/apache/apisix/pull/13917) 和 [PR #13934](https://github.com/apache/apisix/pull/13934)。
- 临时无法读取部署角色时，不再以比已确认数据面角色更严格的方式阻止 etcd 写入。请参阅 [PR #13885](https://github.com/apache/apisix/pull/13885)。
- API 驱动的独立部署模式现在可以处理首份配置到达前建立的流连接，通过摘要识别一秒内的多次推送，在不清空旧配置的前提下拒绝错误的声明式资源结构，并避免将可能包含凭据或私钥的配置体写入日志。请参阅 [PR #13855](https://github.com/apache/apisix/pull/13855) 和 [PR #13886](https://github.com/apache/apisix/pull/13886)。
- 控制面写入和数据面加载现在以一致方式处理未知插件：写入会在持久化前被拒绝，数据面可以跳过不可用插件并记录警告。请参阅 [PR #13928](https://github.com/apache/apisix/pull/13928)。
- `traffic-label` 现在会将编译后的匹配表达式保存在可序列化的插件配置之外，避免 IP 匹配规则导致路由无法编码为 JSON。请参阅 [PR #13901](https://github.com/apache/apisix/pull/13901)。

### 代理、集成与依赖

- Servlet 风格的上游 URI 处理现在会安全编码原始路径，同时保留路径参数边界。请参阅 [PR #13914](https://github.com/apache/apisix/pull/13914)。
- 当 `function_uri` 没有路径时，`aws-lambda` 会请求 `/`，并在错误日志中记录函数错误响应。请参阅 [PR #13908](https://github.com/apache/apisix/pull/13908)。
- `ext-plugin-post-resp` 现在会设置 `upstream_addr` 并统计上游响应时间，包括延迟读取响应体的耗时，使日志插件能够获得有意义的上游字段。请参阅 [PR #13940](https://github.com/apache/apisix/pull/13940)。
- `api7-lua-resty-dns-client` 升级到 7.1.2，修复 CNAME 响应包含 EDNS(0) OPT 记录或响应记录未按链顺序返回时的解析问题。请参阅 [PR #13875](https://github.com/apache/apisix/pull/13875)。
