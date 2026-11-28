# Apache APISIX 3.19.0 正式发布

> Apache APISIX 3.19.0 版本于 2026 年 9 月 28 日发布。该版本新增原生 WebSocket 处理、TLS 流量透传、OpenAPI 到 MCP 的转换、上游慢启动和基于 GraphQL 查询成本的限流能力，并包含需要注意的升级变更。

Source: https://apisix.apache.org/zh/blog/2026/09/28/release-apache-apisix-3.19.0/

我们很高兴地宣布 Apache APISIX 3.19.0 正式发布。该版本带来了新的 WebSocket 与流代理能力、更严格的身份验证与 TLS 安全策略、更丰富的流量控制，以及覆盖网关各模块的可靠性改进。

<!--truncate-->

本版本新增了原生 WebSocket 帧处理、流路由 TLS 透传、`openapi-to-mcp` 插件、上游慢启动、基于 GraphQL 查询成本的限流、独立部署模式下更可靠的配置更新，以及更完善的 SAML 验证能力。

该版本也包含不向后兼容的变更。升级前请阅读以下迁移说明。

## 重大变更

以下变更会影响现有配置、身份验证流程、客户端输入或可观测性约定。请根据每项变更下的升级计划确认部署是否受影响，并在发布前完成必要调整。

### HTTPS 和 gRPCS 上游证书验证开始生效

`upstream.tls.verify` 现在会控制 `https` 和 `grpcs` 上游的证书验证；此前只有 `kafka` 类型的上游会读取该配置。已有 HTTPS 或 gRPCS 上游如果已经启用验证，升级后将开始验证证书链和主机名。证书不受信任或主机名不匹配时，TLS 连接会失败，通常返回 502。

以下示例使用私有 CA 验证 HTTPS 上游：

```json
{
  "type": "roundrobin",
  "scheme": "https",
  "pass_host": "rewrite",
  "upstream_host": "backend.example.com",
  "nodes": {"10.0.0.10:443": 1},
  "tls": {
    "verify": true,
    "ca_certs": ["<PEM-encoded CA certificate>"]
  }
}
```

用于证书验证的主机名取决于 `pass_host`：

- `pass`（默认值）使用请求中的 `Host` 头。
- `rewrite` 使用 `upstream_host`。
- `node` 使用选中的节点主机名。

未配置 `tls.ca_certs` 时，验证会使用 `config.yaml` 中共享的 `ssl_trusted_certificate`。不设置 `tls.verify` 时会遵循 NGINX 的验证配置；将其设置为 `false` 则会关闭该上游的验证。

**升级计划：** 如果 `https` 或 `grpcs` 上游已经启用验证，请先按照上述映射确定主机名，再检查证书链和证书 SAN。配置所需的信任锚；如果从源码构建 APISIX，请使用 `.requirements` 中指定的 APISIX Runtime 1.3.18。请分别测试有效连接，以及证书不受信任或主机名不匹配时应返回的 502。只有在明确接受风险并需要保留原有不验证行为时，才将 `tls.verify` 设置为 `false` 作为兼容措施。

更多信息，请参阅 [PR #13863](https://github.com/apache/apisix/pull/13863)。

### OpenID Connect 令牌内省开始校验颁发者允许列表

当 `openid-connect` 使用令牌内省并配置 `claim_validator.issuer.valid_issuers` 时，内省端点返回成功响应后，其中必须包含字符串类型的 `iss`，且该值必须位于允许列表中。缺少 `iss`、类型不是字符串或值不在列表中时，APISIX 会返回 401 和 `invalid_token` 认证质询。此前，该允许列表不会用于校验内省响应。

**升级计划：** 如果使用令牌内省的路由配置了 `claim_validator.issuer.valid_issuers`，请确认授权服务器会返回 `iss`，并将其准确值加入列表。发布前分别测试有效令牌和来自其他颁发者的令牌。应优先修正内省响应或允许列表。只有在对仅使用令牌内省的配置完成安全评估后才移除 `valid_issuers`；该字段同样用于公钥和 JWKS 验证，移除后这两条路径会改用发现文档中的颁发者。未配置该允许列表的路由不受影响。

更多信息，请参阅 [PR #13916](https://github.com/apache/apisix/pull/13916)。

### 批量请求的聚合响应默认受大小限制

`batch-requests` 插件现在将单个子响应体限制为 1 MiB，并将单个 pipeline 内所有响应体的总大小限制为 10 MiB。超过任一限制时，pipeline 将返回 502，而不再返回完整的聚合结果。无论上游使用 `Content-Length`、分块传输还是以连接关闭表示响应结束，这些限制都会生效。

全局插件元数据字段 `max_response_body_size` 和 `max_response_body_size_total` 分别控制单个子响应体和总响应体的大小上限，单位为字节。两个字段都必须是正整数。例如：

```shell
curl "http://127.0.0.1:9180/apisix/admin/plugin_metadata/batch-requests" \
  -H "X-API-KEY: <admin-key>" \
  -X PUT \
  -d '{
    "max_response_body_size": 4194304,
    "max_response_body_size_total": 41943040
  }'
```

**升级计划：** 如果客户端使用 `batch-requests`，请测量预期的最大单个子响应体和总响应体。当默认值不足时，在升级前将两个元数据字段都设置为高于实际边界的值，并分别测试恰好达到和刚刚超过限制的请求。该元数据会影响 APISIX 实例处理的所有批量请求。该功能没有无限制选项；所选值还必须符合每个工作进程的内存预算。

更多信息，请参阅 [PR #13906](https://github.com/apache/apisix/pull/13906)。

### `basic-auth` 拒绝消费者使用空密码

`basic-auth` 的消费者和凭据 Schema 现在要求 `password` 至少包含一个字符。通过 Admin API 写入空字符串密码时会返回 400；加载配置时，已存储的空字符串也无法通过 Schema 验证。环境变量或 Secret 引用在解析前可以通过 Schema 验证，但解析结果为空时，身份验证会返回 401，而不再接受 `username:`。

**升级计划：** 如果使用 `basic-auth`，请检查消费者和凭据密码，包括其引用的环境变量与 Secret，并在升级前替换所有空值。随后验证每个受影响身份都能使用新的非空密码完成认证。没有兼容选项可以恢复空密码认证。

更多信息，请参阅 [PR #13884](https://github.com/apache/apisix/pull/13884)。

### `ai-proxy-multi` 实例名称必须唯一

同一份 `ai-proxy-multi` 配置中的每个 `instances[].name` 现在必须唯一。APISIX 会将该名称用作负载均衡节点、健康检查器、`ai-rate-limiting` 目标和 `semantic_opts.fallback` 的实例标识；重复名称此前会导致不同实例错误地共用同一运行时状态。包含重复名称的配置在写入时会被拒绝，从现有配置源重新加载时也会被丢弃。

**升级计划：** 如果使用 `ai-proxy-multi`，请检查所有包含该插件的路由、服务和 Plugin Config，并为每个 `instances` 条目设置不同名称。在同一次配置变更中更新 `semantic_opts.fallback` 和对应的 `ai-rate-limiting.instances[].name` 引用。通过 Admin API 重新提交承载该插件的资源以验证配置，再分别向各实例发送典型请求；如果实例配置了 `checks`，还应通过 Control API 验证对应的健康检查器。重复名称没有兼容选项。

更多信息，请参阅 [PR #13851](https://github.com/apache/apisix/pull/13851)。

### `workflow` 拒绝无效表达式和操作列表

`workflow` 插件现在会拒绝无法编译的 `case` 表达式。此前这类表达式可能通过验证，并在运行时匹配所有请求。每条规则的 `actions` 还必须只包含一个恰好由 `[name, conf]` 两项组成的操作。包含多个操作、缺少操作配置或存在多余元素的配置会被拒绝，不再静默地只执行第一个操作。

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

**升级计划：** 如果使用 `workflow`，请验证每个 `case` 表达式，并将每条规则调整为只包含一个 `[name, conf]` 操作。`workflow` 没有等效的多操作模式：APISIX 会在第一条匹配规则处停止，因此把同一条件拆成多条规则也不会按顺序执行多个操作。请保留一个 `workflow` 操作，并将其他行为改为常规插件组合或自定义的组合操作。请为每条修正后的规则分别测试一个匹配请求和一个不匹配请求。无法通过兼容开关保留无效表达式或多操作列表的旧行为。

更多信息，请参阅 [PR #13862](https://github.com/apache/apisix/pull/13862)。

### WebSocket 会话使用新的 Prometheus `request_type` 值

通过原有 NGINX 代理路径成功完成 WebSocket 升级的请求（通常是使用 `enable_websocket` 的路由），现在会在 `apisix_http_status`、`apisix_http_latency` 和 `apisix_bandwidth` 中标记为 `request_type="websocket"`，而不再是 `request_type="traditional_http"`。这样可以避免传统 HTTP 延迟分析混入长连接 WebSocket 会话，但也会改变现有指标序列和查询条件。新增的 `ws` 和 `wss` 内容处理路径在完成下游握手时也会设置相同标签。

**升级计划：** 如果仪表盘、告警或记录规则通过 `request_type="traditional_http"` 筛选这些指标，请确定是否仍要包含 WebSocket 流量。在开始混合版本滚动升级前，若要保留合并统计，请改用 `request_type=~"traditional_http|websocket"`；也可以单独创建 WebSocket 面板和告警。请在典型的 `enable_websocket` 路由上分别验证握手成功和握手被拒绝时的这三类指标；如果采用新增的 `ws` 或 `wss` 协议，还应单独验证该路径。没有配置可以恢复旧的标签值。

更多信息，请参阅 [PR #13909](https://github.com/apache/apisix/pull/13909) 和 [PR #13915](https://github.com/apache/apisix/pull/13915)。

### 空健康检查集合改用 JSON 数组

Control API 现在会在 `/v1/healthcheck` 的顶层结果为空，或 `nodes` 为空时统一返回 `[]`。此前，即使非空结果和文档约定都使用数组，空集合仍会编码为 `{}`。依赖旧对象类型的客户端可能因此解析失败。

**升级计划：** 如果客户端会读取 `/v1/healthcheck` 或 `/v1/healthcheck/{src_type}/{src_id}`，请调整解析逻辑，确保顶层集合和 `nodes` 即使为空也始终按数组处理。请分别测试尚未处理首个上游请求的已配置检查器，以及完全没有检查器的部署。没有配置可以恢复对象形式的空值。

更多信息，请参阅 [PR #13891](https://github.com/apache/apisix/pull/13891)。

### 启用验证的 Redis TLS 连接开始检查服务器名称

使用单节点 `redis` policy 时，依赖 Redis 的插件现在会发送 TLS SNI；当 `redis_ssl_verify` 为 `true` 时，还会根据 `redis_server_name` 或 `redis_host` 验证证书。已有部署如果将证书未覆盖的 DNS 别名用作 `redis_host`，升级后 Redis 操作可能因证书主机名不匹配而失败。该变更适用于 `ai-cache`、`ai-rate-limiting`、`graphql-limit-count`、`limit-count`、`limit-conn` 和 `limit-req` 共用的单节点 Redis 配置，不影响 Redis Cluster 或 Redis Sentinel。

新增字段 `redis_server_name` 允许连接地址继续使用 IP 或别名，同时显式指定证书中的主机名和 SNI。如果 `redis_server_name` 或 `redis_host` 直接配置为 IP 地址，APISIX 不会发送 SNI，也不会执行主机名检查。

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

**升级计划：** 如果插件配置了 `redis_ssl: true` 和 `redis_ssl_verify: true`，请比较证书 SAN 与 `redis_host`。两者不同时，将 `redis_server_name` 设置为证书中的 DNS 名称，或更换为覆盖配置主机名的证书。测试时请建立新的 TLS 连接，不要依赖已有的保活连接。将 `redis_ssl_verify` 设置为 `false` 可以保留不验证的连接，但只能作为明确接受风险的临时回退方案。

更多信息，请参阅 [PR #13938](https://github.com/apache/apisix/pull/13938)。

### 飞书和钉钉浏览器登录回调必须携带 `state`

`feishu-auth` 和 `dingtalk-auth` 现在会将浏览器授权码绑定到发起登录的会话。APISIX 会在 `redirect_uri` 后附加随机 `state`，将其保存在加密会话中，并要求回调请求在查询参数中同时携带相同的 `state`。回调缺少 `state` 或值不一致时会返回 401 `Invalid state`。

非浏览器客户端通过请求头传递授权码时，默认使用 `X-Feishu-Code` 或 `X-DingTalk-Code`，不受此要求影响。

**升级计划：** 如果应用负责提供任一插件的 `redirect_uri`，请让它把接收到的 `state` 转发给身份提供商，并确保身份提供商回调 APISIX 时原样带回该值。请在浏览器正常携带 Cookie 的情况下测试完整登录流程，并验证缺少或篡改 `state` 时会失败。使用请求头传递授权码的集成无需修改；查询参数回调无法关闭 `state` 验证。

更多信息，请参阅 [PR #13806](https://github.com/apache/apisix/pull/13806)。

### `jwe-decrypt` 验证令牌声明的算法

`jwe-decrypt` 现在可以处理符合 RFC 7516、将受保护头（protected header）作为 AES-GCM 附加认证数据（AAD）的令牌。它仍兼容 APISIX 原有的不带 AAD 的令牌格式，包括省略 `alg` 或 `enc` 的旧版头。但是，如果令牌声明了 `dir` 之外的 `alg` 或 `A256GCM` 之外的 `enc`，现在会返回 400，不再按实际支持的算法尝试解密。

新令牌应使用以下受保护头：

```json
{"alg": "dir", "enc": "A256GCM", "kid": "consumer-key"}
```

**升级计划：** 如果系统会为 `jwe-decrypt` 生成令牌，请检查受保护头，确保其声明 `{"alg":"dir","enc":"A256GCM","kid":"..."}`。建议使用会对受保护头执行认证的标准 JWE 库。重新生成声明了错误算法的令牌，并同时测试受保护头被篡改的令牌和有效令牌。无法通过配置接受显式声明的不支持算法；迁移期间仍可继续使用原有不带 AAD 的令牌。

更多信息，请参阅 [PR #13889](https://github.com/apache/apisix/pull/13889)。

## 新功能

Apache APISIX 3.19.0 扩展了流代理、WebSocket 处理、流量管理、MCP 集成、身份验证以及运维与可观测性能力。以下小节介绍主要新增功能的行为和关键上线注意事项。

### 在流代理中透传 TLS 并匹配多个 SNI

流监听器现在可以把加密的 TLS 会话原样转发给上游，而不再由 APISIX 终止 TLS。配置 `tls_passthrough: true` 后，监听器会从预读的 ClientHello 中提取 SNI、选择流路由，并将原始字节转发给上游完成握手。同一监听器同时设置 `tls: true` 和 `tls_passthrough: true` 时会进入混合模式，再根据匹配到的流路由中 `tls_passthrough` 的值决定终止还是透传 TLS。

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

最终代理路径会遵循运行时实际选中的协议，包括由 `traffic-split` 选择的内联 `ws` 或 `wss` 上游。它会发送与常规代理路径一致的 `Host` 请求头，将去除端口后的主机名用作 TLS SNI，并只向客户端返回上游实际选择的子协议。如果上游返回的不是 101，APISIX 会在向下游发送 101 之前改试其他节点。连接失败日志不会包含请求 URI，从而避免泄露查询参数中的凭据。

这与在 `http` 或 `https` 上游上使用 `enable_websocket` 不同；后者仍由 NGINX 将升级后的连接作为不透明字节流转发。只有在需要帧级插件逻辑时才应选择 `ws` 或 `wss`。默认情况下，该代理模式会拒绝单个超过 65,535 字节的接收帧。新增的 `websocket-proxy` 插件会同时提高相应方向的接收上限和反向转发时的发送上限；由于分片会在插件处理和转发前聚合，该发送上限也会约束聚合后的消息载荷。

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

对于 `wss`，可以使用 `tls.verify` 和上游客户端证书，但 WebSocket 客户端无法使用上游级别的 `tls.ca_certs`，因此配置该字段会被拒绝。请改用共享的 `ssl_trusted_certificate` 配置所需信任锚。

更多信息，请参阅 [PR #13939](https://github.com/apache/apisix/pull/13939)、[PR #13972](https://github.com/apache/apisix/pull/13972) 和 [PR #13977](https://github.com/apache/apisix/pull/13977)。

### 通过慢启动逐步增加新上游节点的流量

`roundrobin` 类型的上游现在可以使用 `warm_up_conf`，让新发现的节点从较低有效权重开始，并逐步提升到配置权重。这样可以避免冷启动实例在缓存、连接池和运行时尚未就绪时立即承接完整流量。

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

新增的 `openapi-to-mcp` 插件可以将 OpenAPI 文档中的操作转换为 MCP 工具并对外提供，无需部署单独的 MCP 进程。它支持无状态的 Streamable HTTP 和基于会话的 HTTP+SSE，可以从 OpenAPI 3.x 或受支持的 Swagger 2.0 结构生成工具输入 Schema、验证工具参数，并代替 MCP 客户端调用配置的 API。

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

`base_url` 和请求头值可以使用 APISIX 变量。对于 SSE，会话建立时解析出的值会在整个会话内固定，后续消息请求会使用相同的上游上下文。SSE 会话存放在单个 APISIX 实例的共享内存中，因此多实例部署中的负载均衡器必须配置会话保持；Streamable HTTP 则是无状态的，没有这一限制。OpenAPI 文档会缓存一小时，支持解析内部引用和 HTTP(S) `$ref`，在验证前应用 Schema 默认值；如果获取到的内容不是 OpenAPI 文档，插件会返回错误，而不是空工具列表。

更多信息，请参阅 [PR #13942](https://github.com/apache/apisix/pull/13942) 和 [PR #13956](https://github.com/apache/apisix/pull/13956)。

### 按 GraphQL 查询成本限流

`graphql-limit-count` 除原有默认的 `depth` 策略外，现在还支持 `complexity` 和 `node_quantifier` 成本策略。运维人员可以在 Service 资源下配置 `graphql_cost_decorations`，为字段和分页参数设置权重，通过内省获取上游 Schema，按比例调整计算结果，并在请求到达后端前拒绝成本超过 `max_cost` 的查询。

例如，先在 Service 资源上配置基于查询成本的限流：

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

原有 `depth` 策略仍是默认值，并保留现有配额行为。两种新策略的装饰项都必须挂载在 Service 资源下。未配置装饰项时，`complexity` 会按节点数计费，`node_quantifier` 则回退到最小成本 1；两种情况都会跳过 Schema 内省。

更多信息，请参阅 [PR #13840](https://github.com/apache/apisix/pull/13840)。

### 确认独立部署配置已在所有工作进程生效

由 API 驱动的独立部署模式现在支持在 `PUT /apisix/admin/configs` 上使用 `wait=<milliseconds>`。未设置时，APISIX 会在接受配置后返回 202。设置不超过 60,000 的值后，请求会等待所有 HTTP 工作进程和已启用的 stream 子系统工作进程，直到它们为每个纳入跟踪的资源类型上报目标配置摘要。全部生效时返回 200，超过等待时间则返回 202。

```shell
curl "http://127.0.0.1:9180/apisix/admin/configs?wait=3000" \
  -H "X-API-KEY: <admin-key>" \
  -H "Content-Type: application/json" \
  -H "X-Digest: release-3.19-config-1" \
  -X PUT \
  -d '{}'
```

该等待机制不会为每个资源对象分别计算摘要。配置控制器可以借此在限定时间内确认配置是否已在所有工作进程生效；等待超时不会把已接受的更新误判为失败。返回 202 仍表示更新已接受，只是尚未确认所有工作进程均已应用。由于 `X-Digest` 已匹配而返回 204 的请求不受影响。

更多信息，请参阅 [PR #13904](https://github.com/apache/apisix/pull/13904)。

### 查看插件创建的健康检查器

Control API 现在不仅会报告上游健康检查器，也会报告插件自行创建的主动健康检查器。`ai-proxy-multi` 借此在 Control API 中展示每个配置了 `checks` 的 LLM 实例对应的检查器，并包含插件名称和实例元数据。新增端点 `/v1/healthcheck/{src_type}/{src_id}/checkers` 会返回与指定资源关联的所有检查器；没有关联检查器时返回空数组。

更多信息，请参阅 [PR #13899](https://github.com/apache/apisix/pull/13899)。

### 增强 SAML 响应验证

`saml-auth` 现在新增了 `lua-resty-saml` 0.2.6 提供的验证选项，包括允许的 IdP 颁发者、对外提供的 ACS URL、允许的 SP 受众、时钟偏差，以及可选的节点级断言重放防护。不设置这些新增字段时，插件会保留原有行为。

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

当 APISIX 看到的协议或主机名与浏览器不同，例如位于终止 TLS 的负载均衡器之后时，请设置 `sp_acs_url`。`replay_dict` 提供尽力而为的防重放保护，避免同一断言在一个 APISIX 节点上被接受两次。请根据登录速率和断言有效期规划并监控共享字典容量：字典已满时，APISIX 会接受断言但不记录，并写入错误日志。重放记录不会在不同 APISIX 节点之间共享。

更多信息，请参阅 [PR #13964](https://github.com/apache/apisix/pull/13964)。

### 按指定 HTTP 状态码重试 AI 上游

`ai-proxy-multi` 现在可以通过 `fallback_http_statuses`，在上游返回配置指定的 400–599 状态码时重试其他实例。这适用于凭据过期、账户配额耗尽等不同提供商的特定场景，同时避免对所有客户端错误自动重试。

将以下字段加入现有 `ai-proxy-multi` 配置：

```json
{
  "fallback_http_statuses": [401, 402],
  "max_retries": 1,
  "retry_on_failure_within_ms": 1000
}
```

原有 `max_retries` 和 `retry_on_failure_within_ms` 同样会限制这类重试。`semantic` 负载均衡算法不参与健康检查或上游失败重试，因此 `fallback_http_statuses` 不会为语义路由新增这类重试行为。

更多信息，请参阅 [PR #13852](https://github.com/apache/apisix/pull/13852)。

### 向雷池 WAF 上报响应

`chaitin-waf` 现在可以在客户端响应完成后，将响应状态、响应头和指定大小以内的响应体上报给雷池 WAF 服务：

```json
{
  "config": {
    "log_resp": true,
    "resp_body_size": 4,
    "extra_ignored_content_types": "text/csv,application/pdf"
  }
}
```

`config.log_resp` 用于启用上报，`resp_body_size` 以 KiB 为单位限制缓冲大小，`extra_ignored_content_types` 用于排除其他响应类型。插件会在响应返回客户端后异步上报，因此不会阻塞或改写响应。每个需要上报的并发响应都会占用缓冲内存，因此只有在评估并发量和工作进程内存后才应提高 `resp_body_size`。内容类型被忽略的响应不会为了上报而缓冲。

更多信息，请参阅 [PR #13763](https://github.com/apache/apisix/pull/13763)。

## 问题修复

本版本还修复了可靠性、协议、安全性和可观测性相关问题。以下内容按受影响的子系统分组，便于运维人员快速定位与自身部署相关的内容。

### AI Gateway

- 当上游未产生任何输出时，流式 AI 响应现在会返回 502；如果读取错误发生时已有部分内容发送给客户端，APISIX 不会再次重试，也不会覆盖已经提交的状态码。没有数据的定时刷新也不再中止被缓冲的流。请参阅 [PR #13870](https://github.com/apache/apisix/pull/13870)、[PR #13876](https://github.com/apache/apisix/pull/13876) 和 [PR #13947](https://github.com/apache/apisix/pull/13947)。
- Vertex AI 嵌入模型名称现在会被编码为单个 URI 路径段；`ai-cache` 也会在 `passthrough` 协议的缓存键中包含实际方法、路径和查询参数，避免不同端点发生缓存冲突。请参阅 [PR #13872](https://github.com/apache/apisix/pull/13872) 和 [PR #13887](https://github.com/apache/apisix/pull/13887)。
- 即使流式提供商没有返回用量数据，`ai-aliyun-content-moderation` 现在也会输出最终审核结果，并能正确处理未完成或已中止的流。请参阅 [PR #13922](https://github.com/apache/apisix/pull/13922)。

### 身份验证与请求安全

- `jwe-decrypt` 现在会以 400 拒绝无效头、Base64URL 字段、IV、认证 `tag` 和编码无效的 Secret，避免 Lua 错误转化为 500 响应。请参阅 [PR #13844](https://github.com/apache/apisix/pull/13844)。
- `basic-auth` 现在会在第一个冒号处分隔凭据，从而支持 RFC 7617 允许的、密码中包含冒号的情况。请参阅 [PR #13836](https://github.com/apache/apisix/pull/13836)。
- 即使 400 响应导致底层 NGINX 请求头修改失效，`data-mask` 现在也会让日志插件读取到已脱敏的请求头。请参阅 [PR #13839](https://github.com/apache/apisix/pull/13839)。
- `redirect` 现在以不区分大小写的方式处理 `X-Forwarded-Proto`，避免上游代理发送 `HTTPS` 时产生 HTTP 到 HTTPS 的重定向循环。存在多个 User-Agent 请求头时，只要其中任意一个匹配拒绝列表，`ua-restriction` 就会拒绝请求。请参阅 [PR #13865](https://github.com/apache/apisix/pull/13865) 和 [PR #13869](https://github.com/apache/apisix/pull/13869)。

### 配置、etcd 与健康检查

- etcd 监听器现在从读取启动快照时的修订版本开始监听，并会在各配置对象依赖该监听器之前等待 etcd 可用，从而避免遗漏 APISIX 启动期间的写入，也避免配置一直等待尚未建立连接的监听器。请参阅 [PR #13917](https://github.com/apache/apisix/pull/13917) 和 [PR #13934](https://github.com/apache/apisix/pull/13934)。
- 临时无法读取部署角色时，不再误阻止 etcd 写入。请参阅 [PR #13885](https://github.com/apache/apisix/pull/13885)。
- API 驱动的独立部署模式现在可以处理首份配置到达前建立的流连接，通过摘要识别一秒内的多次推送，在不清空旧配置的前提下拒绝错误的声明式资源结构，并避免将可能包含凭据或私钥的配置体写入日志。请参阅 [PR #13855](https://github.com/apache/apisix/pull/13855) 和 [PR #13886](https://github.com/apache/apisix/pull/13886)。
- 控制面写入和数据面加载现在以一致方式处理未知插件：写入会在持久化前被拒绝，数据面可以跳过不可用插件并记录警告。请参阅 [PR #13928](https://github.com/apache/apisix/pull/13928)。
- `traffic-label` 现在会将编译后的匹配表达式保存在可序列化的插件配置之外，避免 IP 匹配规则导致路由无法编码为 JSON。请参阅 [PR #13901](https://github.com/apache/apisix/pull/13901)。

### 代理、集成与依赖

- Servlet 风格的上游 URI 处理现在会安全编码原始路径，同时保留路径参数边界。请参阅 [PR #13914](https://github.com/apache/apisix/pull/13914)。
- 当 `function_uri` 没有路径时，`aws-lambda` 会请求 `/`，并在错误日志中记录函数错误响应。请参阅 [PR #13908](https://github.com/apache/apisix/pull/13908)。
- `ext-plugin-post-resp` 现在会设置 `upstream_addr` 并统计上游响应时间，包括按需读取响应体的耗时，使日志插件能够获得有意义的上游字段。请参阅 [PR #13940](https://github.com/apache/apisix/pull/13940)。
- `api7-lua-resty-dns-client` 升级到 7.1.2，修复 CNAME 响应包含 EDNS(0) OPT 记录或响应记录未按链顺序返回时的解析问题。请参阅 [PR #13875](https://github.com/apache/apisix/pull/13875)。
