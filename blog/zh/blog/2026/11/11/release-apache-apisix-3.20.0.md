---
title: "Apache APISIX 3.20.0 正式发布"
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
description: Apache APISIX 3.20.0 于 2026 年 11 月 11 日发布。该版本新增请求解压缩、多集群 Kubernetes 服务发现、OIDC 声明转发和进程级指标，并包含重要的安全与升级变更。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.20.0 正式发布。该版本增强了请求处理、服务发现、身份验证、限流和可观测性能力。

<!--truncate-->

本次发布新增请求解压缩、显式选择多个 Kubernetes 集群、Consul HTTPS 服务发现、OIDC 已验证声明转发、更丰富的限流诊断信息和 NGINX 进程级指标，并将 APISIX Runtime 升级至 1.4.2。

该版本包含不向后兼容的安全与行为变更。升级前，请阅读并执行所有与当前部署相关的升级计划。

## 破坏性变更

以下变更会影响现有插件、身份验证流程、请求处理、指标或部署行为。每项均说明受影响的配置以及升级前需要完成的操作。

### 已移除弃用的 `mcp-bridge` 插件

APISIX 不再包含或加载 `mcp-bridge`、其本地进程传输层及相关 MCP broker 模块。仍启用该插件的配置将无法加载。`openapi-to-mcp` 可继续将 OpenAPI 描述的 HTTP API 暴露为 MCP 工具，但它不能直接替代连接任意 stdio MCP 服务的桥接功能。

**升级计划：** 如果 `plugins` 中仍有 `mcp-bridge`，请在升级前移除该条目，并删除所有使用它的 Route 或 Service 配置。如果被桥接进程提供带 OpenAPI 文档的 HTTP API，可重新设计为 `openapi-to-mcp`；否则应在 APISIX 外部运行 MCP 服务并采用受支持的网络集成方式。没有可恢复 `mcp-bridge` 的兼容选项。

更多信息，请参阅 [PR #14019](https://github.com/apache/apisix/pull/14019)。

### `wolf-rbac` 将 `header_prefix` 从 Consumer 移至 Route 或 Service

`wolf-rbac` 现在在 Route 或 Service（包括 `multi-auth` 内部）配置 `header_prefix`，使身份验证边界负责其身份请求头命名空间并在鉴权前清理同名请求头。默认值仍为 `X-`。Consumer 上的 `appid` 现为必填字段，`server` 和 `ssl_verify` 仍属于 Consumer 配置。

带自定义 `header_prefix` 的 Consumer 将被拒绝。为了兼容旧数据，若 Consumer 中保存的是旧默认值 `X-`，校验时会将其移除，但它不再控制输出的请求头。

**升级计划：** 如果使用 `wolf-rbac`，请将每个 Consumer 的自定义 `header_prefix` 移至所有使用该 Consumer 的 Route 或 Service，包括 `multi-auth` 条目；随后从 Consumer 删除该字段并确认存在 `appid`。请测试鉴权成功路径以及带客户端伪造身份请求头的回退鉴权路径。使用默认值的 Route 可省略该字段并继续使用 `X-`。

更多信息，请参阅 [PR #13929](https://github.com/apache/apisix/pull/13929)。

### `oas-validator` 默认校验远程规范的证书

当 `oas-validator` 从 HTTPS `spec_url` 获取规范时，`ssl_verify` 现在默认为 `true`。若证书不受信任或主机名不匹配，规范将无法加载，Route 返回 500。该行为也可避免 `spec_url_request_headers` 中的凭证被发送给伪造的规范服务。

**升级计划：** 如果使用 HTTPS `spec_url`，请在升级前确认其证书链和主机名受 APISIX 信任，必要时将签发 CA 加入信任存储，并在缓存过期后测试一次全新获取。仅应在明确接受风险的兼容场景中设置 `ssl_verify: false`；APISIX 会记录该退出安全校验的配置。

更多信息，请参阅 [PR #14146](https://github.com/apache/apisix/pull/14146)。

### 加密插件值现包含自描述标记

Admin API 现在会在新加密的插件配置和插件元数据值前添加 `$ENC$v1$`，使存储值可自行标识为密文。启用 `enable_encrypt_fields` 时，APISIX 会在插件使用或 Admin API 返回带标记的字符串前对其解密。已有的无标记密文仍按插件 Schema 中的 `encrypt_fields` 声明处理。

较早版本的 APISIX 无法识别该标记，会将完整的带标记字符串作为普通值使用。因此，APISIX 3.20.0 保存带标记的资源后，若未恢复旧数据便降级，插件可能收到密文。

**升级计划：** 如果使用插件加密字段，请在升级前备份 etcd。滚动升级期间，在所有实例均运行可识别 `$ENC$v1$` 的版本之前，请避免通过 Admin API 写入配置，并保留完整的 keyring。如果 APISIX 3.20.0 已保存带标记的值后必须降级，请恢复升级前的备份。没有能让旧版本识别该标记的兼容开关。

更多信息，请参阅 [PR #14162](https://github.com/apache/apisix/pull/14162)。

### 共享 gRPC 信任锚可能替换 HTTP 级自定义 CA

对于设置 `tls.verify: true` 且未配置每上游 `tls.ca_certs` 的 gRPCS 上游，APISIX 现在会根据 `apisix.ssl.ssl_trusted_certificate` 渲染 `grpc_ssl_trusted_certificate`，从而修复使用空信任存储校验的问题。但新生成的 server 级指令会覆盖此前通过 `http_configuration_snippet` 在 HTTP 级注入并继承的不同 `grpc_ssl_trusted_certificate`。通过 `http_server_configuration_snippet` 再次添加该指令也不能作为回退方案，因为 NGINX 会拒绝同一上下文中的重复值。

**升级计划：** 如果同时配置了 `apisix.ssl.ssl_trusted_certificate`，并通过 `http_configuration_snippet` 设置了自定义 gRPC 信任文件，请在升级前将所需 gRPC CA 加入共享信任文件；如果相关上游需要独立的信任集合，则在该 Upstream 中配置 `tls.ca_certs`。请分别验证一次受信任和不受信任的 gRPCS 连接。未使用该自定义指令的部署无需迁移。

更多信息，请参阅 [PR #14113](https://github.com/apache/apisix/pull/14113)。

### `authz-keycloak` 要求授予全部请求的权限和作用域

插件现在请求 Keycloak 返回 `permissions`，并逐一校验配置的资源及作用域。只要缺少任意一项，请求就会返回 403。这修复了 Route 配置多个权限、多个作用域或使用 `http_method_as_scope` 时，未获得完整授权仍可能通过的问题。发送前会去除每个作用域两端的空格，因此 `res#view, delete` 现在会请求并强制校验 `delete`；若令牌端点返回的不是权限列表，则返回 503。

**升级计划：** 如果 Route 使用 `authz-keycloak`，请对照 Keycloak 授权策略检查 `permissions` 和 `http_method_as_scope`。授予所有必需资源和作用域，或缩小 Route 请求的权限集合；随后测试完整授权令牌以及分别缺失各权限的令牌。无法恢复仅部分授权即可通过的旧行为。

更多信息，请参阅 [PR #14098](https://github.com/apache/apisix/pull/14098)。

### OpenID Connect 令牌内省会区分无效令牌与服务故障

`openid-connect` 插件升级至 `lua-resty-openidc` 1.9.3 和 `lua-resty-session` 4.2.0。确认不活跃的令牌返回 401 及 `invalid_token` 质询；端点不可用、传输失败、超时或响应格式错误返回 503 且不带该质询；配置错误返回 500。`active` 必须是布尔值，缺失或类型错误会被视为无效的内省响应。

依赖升级还会向上传递此前被忽略的会话销毁错误和关闭失败模式下的撤销存储故障。在授权码流程中，这类故障可能阻止会话初始化或访问令牌获取；会话销毁失败时也不会继续执行登出重定向。

**升级计划：** 如果客户端或监控系统处理内省错误，请使其区分 401、503 和 500。确认授权服务器返回布尔类型的 `active`，并分别测试不活跃令牌、端点故障和有效令牌。如果授权码流程使用关闭失败模式的服务端撤销存储，请在升级前确认其可用性，并测试登录、令牌刷新和登出。没有配置项可恢复所有错误均返回 401，或继续静默忽略关闭失败模式下的撤销存储故障。

更多信息，请参阅 [PR #14088](https://github.com/apache/apisix/pull/14088)。

### Stream Prometheus 指标新增 `service` 和 `service_id` 标签

`apisix_stream_connection_total`、`apisix_stream_active_connections`、`apisix_stream_status` 和 `apisix_stream_bandwidth` 现包含 `service` 与 `service_id`。会话未到达绑定 Service 的 Stream Route 时，两者均为空。启用 `prefer_name: true` 时，`service` 为 Service 名称，`service_id` 仍为 ID。按 Service 统计的活动连接数和带宽从首个会话开始计入，包括在下一次 `refresh_interval` 前已结束的会话。

**升级计划：** 如果查询上述四项指标，请在混合版本发布前更新精确标签集合、记录规则、告警、仪表盘和远程写入消费者。如需恢复 3.20 之前的序列形状，可使用 `sum without (service, service_id) (...)` 聚合；也可保留标签以获得按 Service 的可见性。请测试绑定 Service 的会话，以及未匹配或提前失败的会话。无法通过配置移除新标签。

更多信息，请参阅 [PR #13992](https://github.com/apache/apisix/pull/13992) 和 [PR #14101](https://github.com/apache/apisix/pull/14101)。

### `apisix start` 不再因捕获 OpenResty 标准输出而阻塞

CLI 启动 OpenResty 时不再捕获标准输出，避免 `access_log` 指向 `/dev/stdout` 时 `apisix start` 永久等待并缓存日志。因此，仅以 `apisix start` 作为前台命令的容器会在 OpenResty 守护进程化后退出。

**升级计划：** 如果容器或进程管理器依赖 `apisix start` 保持前台运行，请按照官方镜像入口使用 `daemon off;` 启动 OpenResty，或显式管理守护进程。启用标准输出日志时，请验证管理器仍能收集继承的输出流。没有恢复意外阻塞行为的 CLI 选项。

更多信息，请参阅 [PR #14087](https://github.com/apache/apisix/pull/14087)。

### mTLS SNI 与 Host 不匹配时返回 421

对于启用 mTLS 的主机，当请求 Host 与 TLS SNI 不同时，APISIX 现在返回 `421 Misdirected Request`，使 HTTP/2 客户端可为目标源重新建立连接。在通常的 access 阶段路径中，APISIX 会先比较 Host 与 SNI，再检查客户端证书。如果当前连接的 SSL 对象配置了 `skip_mtls_uri_regex`，且 URI 未被豁免，APISIX 会先检查证书，并可能在比较 Host 与 SNI 前返回 400。TLS 握手失败时，请求会在这两项 access 阶段检查前结束。

**升级计划：** 如果客户端、测试或监控预期 mTLS SNI/Host 不匹配返回 400，请改为接受 421，并允许客户端以目标源的 SNI 和证书重试新连接。请继续单独处理证书错误：此类错误仍可能导致 TLS 握手失败或返回 400；使用 `skip_mtls_uri_regex` 时，未豁免的 URI 也可能在 Host/SNI 比较前被拒绝。没有恢复旧不匹配状态码的配置项。

更多信息，请参阅 [PR #14013](https://github.com/apache/apisix/pull/14013)。

### 上游会收到路由匹配所使用的规范化路径

当 NGINX 对路径执行了超过百分号解码或合并重复斜杠的规范化时，APISIX 现在会向上游转发路由器实际匹配的路径，而不是原始请求行。这可避免请求在一个路径上通过鉴权，却以另一条路径转发。由于转发的 `$uri` 已解码，`/a/./b%2Fc` 到达上游时会变为 `/a/b/c`。插件设置的 `$upstream_uri` 仍优先；仅编码形式或重复斜杠不同的请求仍保留原始请求行。

**升级计划：** 如果上游有意依赖原始点路径段或其他会被 NGINX 规范化的语法，请在 3.20 上测试这些请求，并将确有需要的转换改为显式重写。安全与路由策略应基于规范化路径。无法恢复路由后转发实质不同原始路径的旧行为。

更多信息，请参阅 [PR #14035](https://github.com/apache/apisix/pull/14035)。

### 带编码斜杠的路由会收紧 mTLS 豁免条件

启用 `apisix.match_uri_encoded_slash` 时，`client.skip_mtls_uri_regex` 必须同时匹配解码后的 URI 和在路径段中保留 `%2F` 的路由 URI。仅匹配解码形式的规则，不再允许带编码斜杠的请求跳过客户端证书校验。

**升级计划：** 如果同时使用这两项配置，请针对解码形式和保留 `%2F` 的形式审核每条豁免规则。仅为确实需要豁免的编码斜杠路由扩展表达式，并测试普通路径、无证书编码斜杠路径和带有效证书的请求。关闭 `match_uri_encoded_slash` 可恢复旧路由模型，但会全局改变路由匹配方式。

更多信息，请参阅 [PR #14108](https://github.com/apache/apisix/pull/14108)。

### 身份验证插件会在跳过路径中清理不可信转发请求头

`jwe-decrypt` 现在会在处理前移除 `forward_header`，包括 `strict: false` 放行无令牌请求时。`forward-auth` 在授权服务不可用且 `allow_degradation: true` 时，会移除所有配置的 `upstream_headers`。因此，当 APISIX 没有可信值时，客户端传入的同名值不会再到达上游。

**升级计划：** 如果上游曾在跳过或降级路径中有意读取这些受保护名称的客户端请求头，请将该输入迁移到另一个明确标记为不可信的请求头。请测试缺少 JWE 和授权服务不可用两种场景。无法保留可伪造的旧请求头行为。

更多信息，请参阅 [PR #14096](https://github.com/apache/apisix/pull/14096)。

### `ai-prompt-guard` 会检查 Embeddings 字符串数组输入

对于 OpenAI Embeddings 请求，插件会拼接 `input` 数组中的所有字符串并检查组合文本。`allow_patterns` 针对组合值生效，任意 `deny_patterns` 命中都会拒绝整批请求。由于 APISIX 不解码 token ID，token ID 数组仍不会被检查。

**升级计划：** 如果 `ai-prompt-guard` 保护 Embeddings 端点，请测试具有代表性的批量字符串输入，并根据组合文本行为调整允许与拒绝表达式。如需逐项独立判断策略，请拆分批次。没有恢复忽略字符串数组旧行为的配置项。

更多信息，请参阅 [PR #14073](https://github.com/apache/apisix/pull/14073)。

### `openapi-to-mcp` 采用更严格的信任边界和大小限制

工具参数现在只会保留操作声明的参数；Route 配置的请求头优先，不安全或连接级请求头会被丢弃，未声明的查询参数也不会传给 API。若已保存 Route 的请求头名称包含 `:` 或空白，或者请求头值包含 CR 或 LF，该 Route 会被拒绝。设置 `allowed_origins` 时，浏览器 MCP 请求按该列表校验。未设置时，Origin 必须以相同 scheme 和有效端口匹配 Route 的固定主机名；仅当 Route 没有固定主机名时（通配符主机名不算固定主机名），才会接受回环请求上的回环 Origin。外部 `$ref` 仅允许访问 `openapi_url` 同源地址和 `allowed_ref_hosts`；SSE 会话绑定至创建它的 Route 和 Consumer。

插件默认将 `max_response_body_size` 设为 1 MiB、`max_document_size` 设为 4 MiB、`max_expanded_nodes` 设为 50,000。路径参数默认不能包含 `/` 或 `\`；仅在设置 `allow_encoded_path_separators: true` 时允许，空路径段及 `.`、`..` 路径段始终被拒绝。

**升级计划：** 如果使用 `openapi-to-mcp`，请测试所有曾由调用方传入未声明参数或特殊请求头的工具，并在 OpenAPI 文档中声明合法参数。请显式配置可信浏览器来源和外部引用主机。只有在评估 worker 内存影响后才提高三项大小限制。如果 API 确实将编码分隔符作为数据处理，请启用 `allow_encoded_path_separators`，并确认上游不会将其解码为路径语法。没有统一的旧版兼容模式，必须逐项配置各信任边界。

更多信息，请参阅 [PR #13959](https://github.com/apache/apisix/pull/13959) 和 [PR #14154](https://github.com/apache/apisix/pull/14154)。

### `forward-auth` 默认使用 FFI HTTP 客户端

授权请求现在默认使用 `ngx_http_ffi_client`。与 `lua-resty-http` 相比，请求会携带 `Connection` 请求头，GET 会携带 `Content-Length: 0`，不会添加默认 `User-Agent`，且超时覆盖完整响应读取过程。缺少 FFI 模块的自定义运行时会使授权请求失败，不会静默回退客户端。

**升级计划：** 如果授权服务严格校验请求格式，请适配新请求头，并测试 GET、POST、长连接、超时和 TLS 行为。自定义构建必须包含 FFI 客户端模块。迁移期间可在 `config.yaml` 中设置 `plugin_attr.forward-auth.http_client: lua-resty-http` 保留旧客户端。

更多信息，请参阅 [PR #14144](https://github.com/apache/apisix/pull/14144)。

## 新功能

Apache APISIX 3.20.0 为请求体、服务发现、身份信息转发、限流诊断和进程容量监控增加了新的控制能力。

### 在插件处理前解压缩请求体

新的 `request-decompress` 插件会解压 `gzip` 和 `deflate` 请求体，使校验、转换、WAF 和日志插件能够检查明文。插件对不支持的编码返回 415，对损坏的压缩数据返回 400，对原始或解压后超过 `max_req_body_size` 的请求体返回 413；多个连续 gzip member 也会按总大小限制。

默认情况下，上游接收解压后的请求体。设置 `forward_compressed: true` 后，插件仍检查明文，但向上游发送压缩形式；若其他插件未修改请求体，则恢复原始字节，否则在代理前重新压缩修改后的内容。

`max_req_body_size` 默认为 1 MiB。`request-decompress` 的优先级为 2850，默认早于 `hmac-auth` 执行，因此 `hmac-auth.validate_request_body` 会对解压后的请求体计算摘要。如果客户端对压缩字节签名，请将 `hmac-auth` 的优先级提高到 2850 以上。按默认顺序，解压也发生在身份验证之前；对于不可信客户端，应同时限制 APISIX 客户端请求体大小和插件限制。启用 `forward_compressed: true` 时，日志阶段插件读取的是实际发送给上游的请求体形式。

```json
{
  "plugins": {
    "request-decompress": {
      "max_req_body_size": 4194304,
      "forward_compressed": false
    },
    "request-validation": {
      "body_schema": {"type": "object"}
    }
  }
}
```

更多信息，请参阅 [PR #14016](https://github.com/apache/apisix/pull/14016)。

### 为一个上游选择多个 Kubernetes 服务发现集群

在多集群模式下，`discovery_args.cluster_ids` 可精确选择参与上游节点合并的集群。此时 `service_name` 使用 `namespace/name:port_name`，APISIX 返回各集群匹配端点的并集，并去重相同的 `host:port`。Admin API 会拒绝未知集群；若陈旧的独立配置到达数据面，则跳过未知 ID 并记录警告。

```json
{
  "type": "roundrobin",
  "discovery_type": "kubernetes",
  "service_name": "default/orders:http",
  "discovery_args": {
    "cluster_ids": ["production-a", "production-b"]
  }
}
```

更多信息，请参阅 [PR #13991](https://github.com/apache/apisix/pull/13991)。

### 通过 HTTPS 连接 Consul

Consul 服务发现的同一 `servers` 列表可同时包含 `http` 和 `https` 地址。默认使用 `apisix.ssl.ssl_trusted_certificate` 验证 HTTPS 证书，并从各地址得到 SNI。`discovery.consul.ssl_verify: false` 会关闭 HTTPS 条目的证书校验，对 HTTP 条目无影响。

更多信息，请参阅 [PR #14018](https://github.com/apache/apisix/pull/14018)。

### 将已验证的 OIDC 声明转发为上游请求头

`openid-connect.upstream_headers` 可把已验证的声明路径映射为上游请求头。APISIX 在每种结果下都会先清理所有已声明请求头，避免鉴权失败开放时客户端伪造值。授权码流程优先使用 ID Token 声明，并以用户信息补充；Bearer 流程使用已验证令牌或内省响应。字符串和数字以文本写入，数组与对象编码为 Base64 JSON。

```json
{
  "upstream_headers": [
    {"header": "X-Profile-Id", "path": ["profile", "id"]},
    {"header": "X-Scopes", "path": ["scope"]}
  ]
}
```

更多信息，请参阅 [PR #14030](https://github.com/apache/apisix/pull/14030)。

### 使用 Prometheus 观察 NGINX 进程容量

Prometheus 插件新增 `apisix_nginx_timers`、`apisix_nginx_timers_max`、`apisix_nginx_process_connections`、`apisix_nginx_process_connections_max` 和 `apisix_nginx_lua_memory_bytes`，用于导出各进程的 Lua 定时器、连接槽用量和 Lua 虚拟机内存。这些指标可区分 worker、特权 agent 以及 HTTP/Stream 子系统，便于在容量耗尽导致请求错误前告警。

更多信息，请参阅 [PR #14034](https://github.com/apache/apisix/pull/14034)。

### 配置过期 Prometheus 指标清理周期

`plugin_attr.prometheus.remove_expired_keys_interval` 控制清理过期指标条目的周期，默认 3600 秒，大于 3600 的值会被限制为 3600，非正值会关闭自动清理。该配置与 `refresh_interval` 相互独立。缩短周期可更快回收共享字典空间，但会增加扫描频率；重新加载配置并缩短该值后，由于各 worker 共享清理标记，下一次清理仍可能等待原有周期结束。

更多信息，请参阅 [PR #13981](https://github.com/apache/apisix/pull/13981)。

### 为 `chaitin-waf` 选择故障开放行为

`allow_degradation` 可在缺少 Chaitin WAF 元数据、无健康 WAF 节点或检测请求失败时继续处理请求。有效默认值为 `false`。Route 级配置会覆盖插件元数据，包括显式的 `false`；成功获得的 WAF 判定仍按 `mode` 执行。

仅当可用性优先于 WAF 故障期间的检查时才应启用该选项，并监控响应调试头和警告日志，因为请求仍可能等待到配置的 WAF 超时时间后才继续。

更多信息，请参阅 [PR #13311](https://github.com/apache/apisix/pull/13311)。

### 查看限流判定和窗口信息

`limit-count` 在 `$rate_limiting_info` 中新增窗口类型与大小、评估时间、判定结果、请求成本、当前窗口、前一个滑动窗口和延迟同步快照。原有配额字段名称保持不变，但 JSON 字段顺序不固定。包含引号或反斜杠的键现在也会编码为有效 JSON。同一变更还会保持本地固定窗口结束时间稳定，因此 `ai-rate-limiting` 的零成本检查不再使 `X-AI-RateLimit-Reset` 晚于计数器实际 TTL。

更多信息，请参阅 [PR #13996](https://github.com/apache/apisix/pull/13996)。

### 在 AI 限流表达式中使用嵌套用量字段

`ai-rate-limiting.cost_expr` 可使用 `__` 连接路径各部分来引用嵌套数字用量字段，例如 `input_tokens_details__cached_tokens`。顶层变量名称不变，缺失值仍按零处理。

更多信息，请参阅 [PR #13984](https://github.com/apache/apisix/pull/13984)。

### 允许插件读取更多请求头

`apisix.max_request_headers_readable` 控制插件通过 `core.request.headers()` 可读取的请求头数量。默认仍为 100，设置为 `0` 可取消限制。超过可读数量的请求头仍会转发至上游；仅应在插件确需检查时提高该值，并评估额外的单请求开销。

更多信息，请参阅 [PR #14136](https://github.com/apache/apisix/pull/14136)。

## 缺陷修复

以下修复按用户最容易识别的子系统分组，包括服务发现、路由与上游传输、限流、AI Gateway、安全、校验和日志。

### 服务发现和配置生命周期

- Consul catalog 与 health watch 现在使用独立定时器，避免一个 watcher 在读取响应时被终止，以及两个索引同时变化导致整轮刷新失败。[PR #14032](https://github.com/apache/apisix/pull/14032)
- `lua-resty-consul` 0.4.0 按 scheme、SNI 和 `ssl_verify` 隔离连接池，避免在不兼容的 TLS 配置之间复用连接。[PR #14118](https://github.com/apache/apisix/pull/14118)
- Kubernetes 和 Tars 服务发现现在会用单个共享字典键保存每个服务的快照。每个 worker 读取后会将该值或未知服务结果缓存 1 秒，并在缓存过期后的下一次查询中重新读取共享内存。该变更移除了可能使 worker 读取到不一致或陈旧数据的独立版本键；这 1 秒并非从服务发现更新时开始计算。[PR #14167](https://github.com/apache/apisix/pull/14167)
- Kubernetes 服务发现现在会在分页列表未完整加载时使整次 list 失败，不再删除未加载页面中的端点。[PR #14053](https://github.com/apache/apisix/pull/14053)
- Nacos 单个服务刷新失败时会保留最近一次成功的节点快照，同时在 APISIX 配置删除服务后仍会清理缓存。[PR #13971](https://github.com/apache/apisix/pull/13971)
- 资源版本辅助函数现在可处理更新过程中已被删除的配置，不再索引空值。[PR #13986](https://github.com/apache/apisix/pull/13986)

### 路由、请求限制和上游 TLS

- 启用 `normalize_uri_like_servlet` 时，APISIX 仅从用于路由匹配的路径中移除分号参数。除非插件写入 `$upstream_uri`，否则上游会收到经过 URI 编码的 servlet 规范化前路径和当前查询字符串；插件写入的值是完整覆盖值，APISIX 不会在其后追加查询字符串。[PR #13982](https://github.com/apache/apisix/pull/13982) 和 [PR #14163](https://github.com/apache/apisix/pull/14163)
- `client-control` 的请求体限制在内部跳转至 gRPC 上游后仍然有效，包括不含 `Content-Length` 的请求体。[PR #14036](https://github.com/apache/apisix/pull/14036)
- `traffic-split` 内联上游现在会应用 `tls` 和 `keepalive_pool`，包括客户端证书、证书校验、CA、证书引用和连接池大小。[PR #14054](https://github.com/apache/apisix/pull/14054)

### 限流

- 每个 `limit-count.rules` 条目现在独立拥有延迟同步队列、定时器和 limiter，避免一个规则使用错误的配额或窗口刷新另一个规则的键。[PR #14064](https://github.com/apache/apisix/pull/14064)
- 仅产生拒绝请求的延迟同步节点，会在本地增量过期后刷新配额，不再持续使用陈旧的滑动窗口状态拒绝请求。[PR #14015](https://github.com/apache/apisix/pull/14015)

### AI Gateway 用量统计

- Bedrock 缓存读取和写入 token 现计入标准化 prompt 用量，并在流式及非流式响应中写入日志变量。[PR #14044](https://github.com/apache/apisix/pull/14044)
- Anthropic prompt 用量现包含缓存读取和创建 token，流式用量会在 `message_start` 与 `message_delta` 之间累积，从而修正基于 token 的限流、指标和缓存命中率。当 Anthropic 客户端使用 OpenAI 兼容上游时，缓冲响应和流式响应现在都会以 `max(0, prompt_tokens - cache_read - cache_write)` 计算 `input_tokens`，避免重复计算缓存写入量。[PR #14028](https://github.com/apache/apisix/pull/14028)

### 安全、校验和内存安全

- AWS 和 Vault Secret 错误不再包含提供方响应体，日志仅保留定位失败引用所需的标识符。[PR #14049](https://github.com/apache/apisix/pull/14049)
- 格式错误的 CSRF token 结构和字段现在返回 401，而不是触发 Lua 错误并返回 500。[PR #14025](https://github.com/apache/apisix/pull/14025)
- 在 `spec_url_ttl` 时间内未使用的远程 `oas-validator` 规范会被释放，避免已删除或已更改 Route 的编译规范持续占用 worker 内存。修改 `spec_url_ttl` 元数据并重建缓存时，也会释放旧缓存，不再使其在整个 worker 生命周期内保持可达。[PR #14061](https://github.com/apache/apisix/pull/14061)

### Syslog 可靠性

- Syslog logger 初始化失败时会返回 batch processor，不再继续使用不存在的 logger 并触发 Lua 错误。[PR #13970](https://github.com/apache/apisix/pull/13970)
- Syslog 错误信息现在会分隔操作描述和错误原因，便于阅读与检索。[PR #13974](https://github.com/apache/apisix/pull/13974)

## 其他变更

该版本还更新了受支持的运行时，并减少多个热点路径中的单请求内存分配。

- APISIX Runtime 升级至 1.4.2，包含 OpenResty 1.31.8.1、NGINX 1.31.8 和 OpenSSL 3.5.9。该版本包含新的 NGINX 与 OpenSSL 安全修复、TLS 1.3 混合组 `X25519MLKEM768`、上游长连接集成修复、`gzip` 小 buffer 修复和多路复用 Dubbo 上游连接修复。[PR #14041](https://github.com/apache/apisix/pull/14041) [PR #14126](https://github.com/apache/apisix/pull/14126)
- Brotli 构建和开发脚本升级至 Brotli 1.2.1。[PR #14138](https://github.com/apache/apisix/pull/14138)
- `nginx-lua-prometheus-api7` 1.1.1 会原地更新待同步增量，减少直方图产生的短生命周期 table 分配。[PR #14150](https://github.com/apache/apisix/pull/14150)
- `limit-count` 会缓存解析后的变量模板、本地 limiter 和生成的配额请求头名称；`proxy-rewrite` 不会缓存每个请求动态生成的模板。[PR #14141](https://github.com/apache/apisix/pull/14141)
- `request-id` 仅读取配置的请求头，并通过预计算十六进制表生成 UUIDv4。未显式传入上下文的请求头设置函数现在也会保持请求头缓存一致。[PR #14140](https://github.com/apache/apisix/pull/14140)

## 下载

如需下载 Apache APISIX 3.20.0，请访问[官方下载页面](https://apisix.apache.org/zh/downloads/)。

## 反馈

如有疑问或遇到问题，请在 [Apache APISIX 仓库](https://github.com/apache/apisix/issues)中提交 issue。
