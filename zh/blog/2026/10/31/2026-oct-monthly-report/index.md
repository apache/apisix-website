# 2026 社区月报 (10.01 - 10.31)

> Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。

Source: https://apisix.apache.org/zh/blog/2026/10/31/2026-oct-monthly-report/

> 最近，我们引入并更新了多项功能，涵盖 Prometheus 可观测性、多集群服务发现、压缩请求处理、可信身份传递和 WAF 弹性等方向。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.10.01 至 2026.10.31，有 19 名开发者提交了 77 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2026/11/02/2zw9Jdk7_2026-oct-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2026/11/02/pBr2CWUZ_2026-oct-new-contributors.webp)

## 近期亮点功能

以下是本月的重点更新，并按功能方向进行归类。

### 可观测性与流量治理

#### 1. 按服务归属统计 Stream 指标

相关 PR：https://github.com/apache/apisix/pull/13992

贡献者：[AlinsRan](https://github.com/AlinsRan)

APISIX 为四项 Stream Prometheus 指标新增了 `service` 和 `service_id` 标签，即使多个服务共用端口，也能按服务观察流量。现有时序会增加这两个空值标签，因此直接选择单个未聚合时序的告警可能需要调整。对于在 Stream Prometheus 插件运行前就被拒绝的会话，活跃连接数和带宽仍计入未标记总量，但 `apisix_stream_status` 仍会按服务记录该会话。

#### 2. 导出 OpenResty 进程级资源指标

相关 PR：https://github.com/apache/apisix/pull/14034

贡献者：[nic-6443](https://github.com/nic-6443)

新的 Prometheus Gauge 指标可按 Worker 和特权代理进程展示定时器使用量、连接槽占用量及 Lua 内存，帮助运维人员在资源耗尽引发错误之前发现风险。只有启用 Prometheus 插件时才会执行采集；如果运行时结构校验失败，APISIX 会停止导出连接指标，而不会发布可能错误的数据。

#### 3. 配置 Prometheus 过期指标清理周期

相关 PR：https://github.com/apache/apisix/pull/13981

贡献者：[AlinsRan](https://github.com/AlinsRan)

运维人员现在可以通过 `plugin_attr.prometheus.remove_expired_keys_interval` 分别为 HTTP 和 Stream 指标配置清理周期，不再只能使用固定的库默认值。默认值仍为 3600 秒，超过 3600 秒的值会被库限制，非正数会关闭清理；重新加载后缩短周期时，下一次清理仍可能要等上一周期结束。

#### 4. 在日志中解释限流决策

相关 PR：https://github.com/apache/apisix/pull/13996

贡献者：[nic-6443](https://github.com/nic-6443)

`$rate_limiting_info` 变量现在会输出固定窗口或滑动窗口的时间戳、请求成本、决策、计数器及延迟同步详情，方便从访问日志判断请求为何被放行、拒绝或处理失败。该变更只增强可观测性，不会新增 Redis 调用或改变限流决策；变量采用 JSON 编码，使用方不应依赖字段顺序，并应兼容特定路径缺少数据时出现的 `null` 值。

### 服务集成与请求处理

#### 5. 选择多个 Kubernetes 服务发现集群

相关 PR：https://github.com/apache/apisix/pull/13991

贡献者：[AlinsRan](https://github.com/AlinsRan)

Kubernetes 服务发现新增 `discovery_args.cluster_ids`，上游可以显式选择多个集群，并使用这些集群端点去重后的并集。未列出的集群不会提供节点，所有选中集群都没有匹配端点时也不会回退到其他集群；Admin API 会校验集群 ID，而进入数据面的过期或未知 ID 会被跳过并记录警告。

#### 6. 通过 HTTPS 连接 Consul

相关 PR：https://github.com/apache/apisix/pull/14018

贡献者：[nic-6443](https://github.com/nic-6443)

Consul 服务发现现在允许在同一个服务器列表中混用 HTTP 与 HTTPS 地址，HTTPS 地址未指定端口时默认使用 443。证书默认根据 `apisix.ssl.ssl_trusted_certificate` 进行校验；自签名环境可设置 `discovery.consul.ssl_verify: false`，其他不受支持的协议仍会被拒绝。

#### 7. 为后续插件解压请求体

相关 PR：https://github.com/apache/apisix/pull/14016

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

新的 `request-decompress` 插件会在校验、WAF 检测、内容转换及其他读取请求体的插件运行前，解压使用 `gzip` 或 `deflate` 编码的请求体。插件会在流式解压过程中执行 `max_req_body_size` 限制，并可在代理前恢复或重新压缩请求体；默认情况下解压发生在身份验证之前，因此应合理设置请求体限制，以约束未认证请求带来的处理开销。

#### 8. 移除已弃用的 MCP Bridge 插件

相关 PR：https://github.com/apache/apisix/pull/14019

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

APISIX 已移除弃用的 `mcp-bridge` 插件及其传输模块、文档、测试和相关 CI 配置；启用 `openapi-to-mcp` 时，仍会保留该插件所需的 `mcp-session` 共享字典。这是一项不向后兼容的变更：仍在 `plugins` 配置中列出 `mcp-bridge` 的用户必须将其删除，后续 MCP 集成应使用 `openapi-to-mcp`。

### 身份认证与安全弹性

#### 9. 将经过验证的 OpenID Connect 声明映射为请求头

相关 PR：https://github.com/apache/apisix/pull/14030

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

`openid-connect` 插件新增 `upstream_headers`，可把选定且已经验证的声明映射到上游请求头，并支持嵌套声明以及名称中包含特殊符号的声明。所有认证结果都会先清除声明过的请求头，再按验证结果写入值，从而防止客户端伪造；数组和对象会以 Base64 编码的 JSON 传递，而缺失值、`null`、`false` 和空字符串不会生成请求头。

#### 10. 区分无效令牌与内省服务故障

相关 PR：https://github.com/apache/apisix/pull/14088

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

`lua-resty-openidc` 升级至 1.9.3 后，APISIX 会针对确认无效的令牌返回 `401`，针对内省端点或传输故障返回 `503`，针对配置错误返回 `500`。并发缓存未命中可共享进行中的内省结果，但协调机制为尽力而为，等待超时后仍会直接执行内省；缺失或非布尔类型的 `active` 声明现在会被视为无效的上游响应。

#### 11. 支持长亭 WAF 故障时放行请求

相关 PR：https://github.com/apache/apisix/pull/13311

贡献者：[jlongWang](https://github.com/jlongWang)

长亭 WAF 插件新增 `allow_degradation` 选项，在 WAF 服务不可用时允许请求继续通过，覆盖连接超时、没有健康节点和检测错误等情况。该选项默认值为 `false`，只有运维人员明确选择在 WAF 故障期间优先保障可用性时，才会从故障关闭切换为故障开放。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 已经积累了丰富的文档教程和使用经验。如果您遇到问题，可以翻阅文档、用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，分享自己的想法和实践经验。
