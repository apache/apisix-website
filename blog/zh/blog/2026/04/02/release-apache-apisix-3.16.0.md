---
title: "Apache APISIX 3.16.0 正式发布"
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
description: Apache APISIX 3.16.0 版本于 2026 年 4 月 2 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.16.0 版本已经发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

本次版本扩展了速率限制能力，增强了 OpenTelemetry 可观测性，新增了认证、日志记录和服务发现等方面的插件功能，同时包含多项缺陷修复和稳定性改进。

此外，该版本还包含了两项重大变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### `openid-connect` 插件 `ssl_verify` 默认值更改为 `true`

`openid-connect` 插件中 `ssl_verify` 选项的默认值已从 `false` 更改为 `true`。此变更通过强制在与身份提供商通信时进行 TLS 证书验证来提升安全性。

如果您使用的是自签名证书或私有 CA 颁发的证书，现在必须在插件配置中显式设置 `ssl_verify: false` 以保留原有行为。

更多信息，请参阅 [PR #13010](https://github.com/apache/apisix/pull/13010)。

### `tencent-cloud-cls` 插件默认 scheme 更改为 `https`

`tencent-cloud-cls` 插件发送日志请求所使用的默认协议已从 `http` 更改为 `https`，与安全最佳实践保持一致，确保日志数据在传输过程中被加密。

如果您的腾讯云 CLS 端点只能通过明文 HTTP 访问，现在必须在插件配置中显式将 scheme 设置为 `http` 以保留原有行为。

更多信息，请参阅 [PR #13009](https://github.com/apache/apisix/pull/13009)。

## 新功能

### 高级多规则速率限制

`limit-count`、`limit-conn` 和 `ai-rate-limiting` 插件现在支持 `rules` 数组，允许在单个插件配置中定义多条速率限制规则。每条规则可以指定各自的 `count`、`time_window` 和 `key`，从而可以在单个路由或消费者上同时执行多个速率限制。

此外，这三个插件的 `key` 和速率字段现在均支持 APISIX 变量（例如 `$http_x_custom_header`），可基于任意请求属性实现动态的、按请求粒度的速率限制。

对于 `limit-count`，还支持每条规则配置 `header_prefix` 字段，使每条规则的响应标头可以独立命名，便于客户端区分不同规则的配额信息。

更多信息，请参阅以下 PRs：

- [PR #12977（`limit-count` 多规则支持）](https://github.com/apache/apisix/pull/12977)
- [PR #12967（`limit-count`、`limit-conn` 和 `ai-rate-limiting` 变量支持）](https://github.com/apache/apisix/pull/12967)
- [PR #13000（`limit-conn` 和 `ai-rate-limiting` 多规则支持）](https://github.com/apache/apisix/pull/13000)
- [PR #13004（`limit-count` 每规则 `header_prefix`）](https://github.com/apache/apisix/pull/13004)

### 更丰富的 OpenTelemetry 追踪 span

OpenTelemetry 插件现在可以生成更多 span，覆盖各个 NGINX 阶段、每个插件的执行过程、DNS 解析、密钥获取、SSL client hello 处理以及路由匹配。这为请求处理提供了更深入的可观测性。

同时新增了全局 `tracing: false` 配置项，可用于选择性地禁用追踪。此外，OTel 语义规范属性已更新，与最新规范保持一致。

更多信息，请参阅 [PR #12686](https://github.com/apache/apisix/pull/12686)。

### 独立模式拒绝未知插件

在独立模式下（YAML 和 JSON 配置提供程序），APISIX 现在会对引用未知或未加载插件的配置返回错误并拒绝该配置。此前，此类配置会被静默接受，未知插件会在运行时被跳过，导致配置错误难以发现。

更多信息，请参阅 [PR #13046](https://github.com/apache/apisix/pull/13046)。

### 通过 control API 获取流路由健康检查数据

现在可以通过 control API 获取流路由的健康检查状态数据，与 HTTP 路由的方式完全一致。这为 HTTP 和流代理的上游健康监控提供了统一的接口。

更多信息，请参阅 [PR #12996](https://github.com/apache/apisix/pull/12996)。

### `resolve_var` 支持默认值

`resolve_var` 工具函数现在接受可选的默认值参数。当请求的变量不存在或为空时，将返回指定的默认值，而不是返回空结果。这对于依赖可能并不总是存在的变量的插件配置尤为有用。

更多信息，请参阅 [PR #12963](https://github.com/apache/apisix/pull/12963)。

### Eureka 服务发现支持基于主机名的节点

Eureka 服务发现模块现在除了支持 IP 地址节点外，还支持以主机名（域名）注册的节点。此前，只有使用 IP 地址的节点才能被正确处理。这使 APISIX 能够与服务使用 DNS 名称注册的 Eureka 部署集成。

更多信息，请参阅 [PR #12993](https://github.com/apache/apisix/pull/12993)。

### `clickhouse-logger` 插件支持密钥存储凭证

`clickhouse-logger` 插件现在支持使用 `$ENV://` 或 `$secret://` 引用方式存储用户凭证（用户名和密码）。这避免了在插件配置中明文嵌入凭证，并支持集中化的密钥管理。

更多信息，请参阅 [PR #12951](https://github.com/apache/apisix/pull/12951)。

### 日志插件支持配置最大请求/响应体大小

13 个日志插件新增了 `max_req_body_bytes` 和 `max_resp_body_bytes` 属性，用于控制日志条目中捕获的请求体和响应体的最大字节数。默认值为 524288 字节（512 KB）。这提供了对日志体量的精细控制，有助于避免产生过大的日志条目。

更多信息，请参阅 [PR #13034](https://github.com/apache/apisix/pull/13034)。

### `jwt-auth` 插件支持更多签名算法

`jwt-auth` 插件现在通过新增的 `jwt-auth/parser.lua` 模块支持更多 JWT 签名算法，包括 RS256、ES256 等。此前仅较好地支持 HS256。这使 APISIX 能够与使用非对称密钥签发 Token 的身份提供商集成。

更多信息，请参阅 [PR #12944](https://github.com/apache/apisix/pull/12944)。

### `openid-connect` 插件支持 Redis 会话存储

`openid-connect` 插件现在支持使用 Redis 作为会话存储后端，作为现有基于 Cookie 的存储方式的补充。这支持无状态部署以及多个 APISIX 实例之间的会话共享。

更多信息，请参阅 [PR #12986](https://github.com/apache/apisix/pull/12986)。

### `elasticsearch-logger` 插件支持自定义请求标头

`elasticsearch-logger` 插件现在支持配置任意自定义请求标头（键值对），这些标头会随日志请求一并发送到 Elasticsearch。可以作为现有 `auth` 配置的补充或替代方案，从而兼容使用自定义标头进行身份验证的 Elasticsearch 部署。

更多信息，请参阅 [PR #12994](https://github.com/apache/apisix/pull/12994)。

## 其他更新

- 修复 Admin API PATCH 对 `upstream.nodes` 在数组和哈希表格式之间双向转换的处理逻辑 (PR [#13065](https://github.com/apache/apisix/pull/13065))
- 修复 Consul 服务发现重启后间歇性 503 问题，将事件模块替换为 `ngx.shared` 字典和 LRU 缓存 (PR [#13066](https://github.com/apache/apisix/pull/13066))
- 修复 `ext-plugin` 在重写请求路径时丢失 query string 参数的问题 (PR [#13080](https://github.com/apache/apisix/pull/13080))
- 防止流插件在 HTTP 子系统中被初始化 (PR [#13064](https://github.com/apache/apisix/pull/13064))
- 修复匿名消费者 `minLength` schema 类型错误（原为 string，现更正为 integer）(PR [#13022](https://github.com/apache/apisix/pull/13022))
- 从流访问日志格式中移除不适用的 `apisix_request_id` 变量 (PR [#13006](https://github.com/apache/apisix/pull/13006))
- 在速率限制规则中，若变量配置了默认值，即使底层变量不存在也视为已解析 (PR [#13007](https://github.com/apache/apisix/pull/13007))
- 修复消费者通过凭证端点认证且未直接配置插件时，消费者组插件未生效的问题 (PR [#12998](https://github.com/apache/apisix/pull/12998))
- 修复 control API 返回被动健康检查状态数据不正确的问题，同步升级 `lua-resty-healthcheck` (PR [#12975](https://github.com/apache/apisix/pull/12975))
- 修复 Prometheus 指标过期后重新添加时消失的问题，升级 `nginx-lua-prometheus` (PR [#13058](https://github.com/apache/apisix/pull/13058))
- 升级 `lua-casbin` 至 1.46.0，修复 Casbin enforcer 覆写缺陷 (PR [#12985](https://github.com/apache/apisix/pull/12985))
- 在 `ngx.print` 后添加 `ngx.flush` 以改善 SSE（服务器推送事件）响应的传输 (PR [#12988](https://github.com/apache/apisix/pull/12988))
- 升级 `api7-lua-resty-http` 至 0.2.3-0，修复 `forward-auth` 插件标头值中的 CRLF 注入问题 (PR [#13057](https://github.com/apache/apisix/pull/13057))
- 修复 `limit-req` 消费者隔离问题，使用 `parent.resource_key` 确保消费者在不同路由间共享正确的计数器 (PR [#13019](https://github.com/apache/apisix/pull/13019))
- 移除 `ai-rate-limiting` 插件 schema 中错误存在的 `sync_interval` 字段 (PR [#12959](https://github.com/apache/apisix/pull/12959))
- 将 Docker 独立模式的 YAML 配置校验从 Shell 脚本迁移至 Lua，以更稳健地处理所有合法 YAML 变体 (PR [#12949](https://github.com/apache/apisix/pull/12949))
- 修正 `config.yaml.example` 中 AI 插件优先级注释和排序 (PR [#12926](https://github.com/apache/apisix/pull/12926))

## 更新日志

此版本的完整更新列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3160)。
