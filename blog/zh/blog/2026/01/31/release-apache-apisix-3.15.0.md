---
title: "Apache APISIX 3.15.0 正式发布"
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
description: Apache APISIX 3.15.0 版本于 2026 年 1 月 31 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.15.0 版本已经发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

本次版本新增了对多种 AI 提供商的支持，增强了日志记录能力，并在服务发现、安全性和插件功能等方面进行了多项改进。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 禁止在 global rules 中创建重复插件

此版本禁止在多个 global rules 中配置同一个插件。此前，这可能导致执行顺序未定义和不可预测的行为。

依赖于同一插件出现在多个 global rules 中的配置需要进行重构。现在，该插件只会从它出现的第一个全局规则开始执行，后续出现的插件将被记录为错误。

更多信息，请参阅 [PR #12800](https://github.com/apache/apisix/pull/12800)。

## 新功能

### AI 插件新增提供商

本次更新扩展了 `ai-proxy`、`ai-proxy-multi` 和 `ai-request-rewrite` 的提供商支持。这些插件现在支持 Google Cloud Vertex AI、Google Gemini、Anthropic 和 OpenRouter。

更多信息，请参阅以下 PRs：

- [PR #12933 (Google Cloud Vertex AI)](https://github.com/apache/apisix/pull/12933)
- [PR #12883 (Google Gemini)](https://github.com/apache/apisix/pull/12883)
- [PR #12881 (Anthropic)](https://github.com/apache/apisix/pull/12881) 
- [PR #12878 (OpenRouter)](https://github.com/apache/apisix/pull/12878) 

### Kubernetes 服务发现就绪状态检查

Kubernetes 服务发现现在通过 `/status/ready` 接口提供就绪状态查询，从而实现更完善的健康状况监控并与其他服务发现类型更好地集成。

更多信息，请参阅 [PR #12852](https://github.com/apache/apisix/pull/12852)。

### 身份验证插件自定义带有 realm 的 `www-authenticate` 标头

身份验证插件 `basic-auth`、`key-auth`、`hmac-auth`、`jwt-auth` 和 `ldap-auth` 现在支持在 401 响应中自定义 `WWW-Authenticate` 标头中的 realm 值，从而实现 HTTP 身份验证的 RFC 7235 标准。

更多信息，请参阅 [PR #12864](https://github.com/apache/apisix/pull/12864)。

### `request-id` 插件支持 `apisix_request_id` 变量

`request-id` 插件现在支持 `apisix_request_id` 变量，并将请求 ID 记录到错误日志中，从而显著提升调试和追踪能力。

更多信息，请参阅 [PR #12931](https://github.com/apache/apisix/pull/12931)。

### 速率限制插件支持配置 Redis keepalive

`limit-count`、`limit-conn` 和 `limit-req` 插件现在支持 Redis 连接 keepalive 设置，从而提升连接稳定性并降低系统开销。

更多信息，请参阅 [PR #12861](https://github.com/apache/apisix/pull/12861)。

### 日志插件支持最大待处理条目数

所有日志插件现在都支持 `max_pending_entries` 参数，该参数用于设置批处理处理器中允许的最大未处理条目数。当达到此限制时，新条目将被丢弃，直到积压的条目减少为止。这有助于防止日志记录器运行缓慢或不可用时出现内存峰值。

更多信息，请参阅 [PR #12709](https://github.com/apache/apisix/pull/12709)。

### 日志插件支持嵌套日志格式

日志插件现在支持最大深度为 5 层的分层/嵌套日志结构，从而实现更清晰易读的日志格式，便于分析。

更多信息，请参阅 [PR #12697](https://github.com/apache/apisix/pull/12697)。

### `file-logger` 插件元数据支持路径属性

`file-logger` 插件现在支持全局配置默认日志文件路径，无需在每个插件配置中单独指定路径。

更多信息，请参阅 [PR #12825](https://github.com/apache/apisix/pull/12825)。

### `kafka-logger` 插件支持 SCRAM 身份验证

`kafka-logger` 插件现在支持 SCRAM（加盐质询响应身份验证机制），用于与 Kafka 集群进行安全身份验证，从而扩展了安全性兼容性。

更多信息，请参阅 [PR #12693](https://github.com/apache/apisix/pull/12693)。

### SSL 证书 SNI 匹配支持通配符

SSL 证书匹配现在除了支持精确域名和部分通配符外，还支持完整的通配符 `*` 值。

更多信息，请参阅 [PR #12668](https://github.com/apache/apisix/pull/12668)。

### `grpc-web` 插件支持非前缀路由

`grpc-web` 插件现在可以处理不使用前缀匹配的路由，从而增强了 gRPC-Web 部署的灵活性。

更多信息，请参阅 [PR #12830](https://github.com/apache/apisix/pull/12830)。

### 为 API 驱动的独立模式添加验证 API

API 驱动的独立模式（主要用于 Ingress 控制器）现在支持新的验证端点 `/validate`，允许在不持久化配置的情况下测试配置。

更多信息，请参阅 [PR #12718](https://github.com/apache/apisix/pull/12718)。

## 其他更新

- 支持 file-driven standalone 模式下的状态 API (PR [#12810](https://github.com/apache/apisix/pull/12810))
- 正确处理 Kubernetes 服务发现中的 EndpointSlices (PR [#12634](https://github.com/apache/apisix/pull/12634))
- 将资源名称长度从 100 个字符放宽至 256 个字符，以更好地支持入口控制器名称生成模式 (PR [#11822](https://github.com/apache/apisix/pull/11822))
- 为流路由添加验证和删除保护 (PR [#12794](https://github.com/apache/apisix/pull/12794))
- 通过在 `limit-conn` 插件中配置 Redis 密钥过期时间来防止永久配额阻塞 (PR [#12872](https://github.com/apache/apisix/pull/12872))
- 通过在 SkyWalking 集成中路由命中时启动计时器来提高计时精度 (PR [#12855](https://github.com/apache/apisix/pull/12855))
- 通过在销毁 Prometheus 时移除不必要的深拷贝来提高性能 (PR [#12905](https://github.com/apache/apisix/pull/12905))
- 通过在 `limit-req` 插件中确保安全的 Redis 键驱逐来防止数据损坏 (PR [#12911](https://github.com/apache/apisix/pull/12911))
- 通过在 `limit-count` 插件中使用元父级来识别插件源来改进调试 (PR [#12900](https://github.com/apache/apisix/pull/12900))
- 在 MQTT 插件中，将 `protocol_name` 设置为可选，并将其默认值设为 `MQTT` (PR [#12831](https://github.com/apache/apisix/pull/12831))
- 在 `batch-requests` 插件中，确保子响应的数量与子请求的数量匹配 (PR [#12779](https://github.com/apache/apisix/pull/12779))
- 修正 `ai-proxy-multi` 插件中的日志模式键 (PR [#12795](https://github.com/apache/apisix/pull/12795))
- 修复插件元数据中 `enable_data_encryption` 的初始化和查询问题 (PR [#12624](https://github.com/apache/apisix/pull/12624))
- 当传入请求包含空值时，添加 `X-Request-Id` 标头 (PR [#12837](https://github.com/apache/apisix/pull/12837))
- 调整目录权限，允许 APISIX 在 OpenShift 上运行而无需使用 `anyuid` 命令 (PR [#12824](https://github.com/apache/apisix/pull/12824))
- 修复 Kubernetes 服务发现中的前置和后置钩子拼写错误，并提高清理安全性 (PR [#12288](https://github.com/apache/apisix/pull/12288))
- 通过将 IPv6 检查移至模式验证来提高性能 (PR [#12714](https://github.com/apache/apisix/pull/12714))
- 重构缓存逻辑，使用密钥 URI 作为缓存键，并改进 LRU 缓存实现 (PR [#12682](https://github.com/apache/apisix/pull/12682))
- 确保独立上游的 `node_version` 得到维护 (PR [#12856](https://github.com/apache/apisix/pull/12856))
- 修复当任何 Eureka 节点不可用时，重新加载期间的请求失败问题 (PR [#12906](https://github.com/apache/apisix/pull/12906))
- 为 Nacos 服务发现请求失败后添加重试逻辑 (PR [#12734](https://github.com/apache/apisix/pull/12734))
- 移除从核心依赖项中移除 `lua-resty-worker-events`（PR [#12930](https://github.com/apache/apisix/pull/12930)）
- 升级 `lua-resty-logger-socket` 依赖项（PR [#12898](https://github.com/apache/apisix/pull/12898)）
- 升级 `lua-resty-dns-client` 依赖项（PR [#12851](https://github.com/apache/apisix/pull/12851)）

## 更新日志

此版本的完整更新列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3150)。
