---
title: "Apache APISIX 3.21.0 正式发布"
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
description: Apache APISIX 3.21.0 于 2026 年 11 月 19 日发布。该版本以安全为重点，包含 10 项 NGINX 安全修复，并加强 Admin API 密钥校验，避免配置校验和插件执行日志记录敏感值，同时提升上游恢复和日志投递的可靠性。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.21.0 正式发布。该版本集成 NGINX 安全修复，收紧 Admin API 密钥校验，提升配置日志安全性，并修复上游恢复与日志投递中的可靠性问题。

<!--truncate-->

本次发布将 APISIX Runtime 升级至 1.4.3，其中集成 NGINX 1.31.9 核心及 2026 年 11 月 18 日发布的 10 项安全修复。该版本还修复工作进程健康检查状态收敛问题，在节点不可用后重新执行慢启动，并修复多条批量日志投递路径。

该版本包含不向后兼容的 Runtime 解析行为和 Admin API 配置变更。发布新版本前，请完成适用于当前部署的升级计划。

## 破坏性变更

Apache APISIX 3.21.0 更新了受支持的 Runtime，并收紧 Admin API 密钥配置。请检查以下两项升级计划，包括源码安装方式和已关闭 Admin API 监听器的部署。

### Runtime 1.4.3 集成 10 项 NGINX 安全修复

APISIX Runtime 1.4.3 将 OpenResty 1.31.8.1 构建使用的 NGINX 核心更新至 1.31.9。该更新包含 10 项安全修复；各问题是否影响当前部署，取决于实际启用的模块和配置。

| 范围 | 包含的修复 |
| --- | --- |
| HTTP/2 | CVE-2026-123007 和 CVE-2026-123633 |
| HTTPS 和 HTTP/3 | CVE-2026-118899 和 CVE-2026-121810 |
| DNS 和 Stream TLS | CVE-2026-123634、CVE-2026-123640、CVE-2026-120967 和 CVE-2026-120993 |
| 静态文件和邮件代理 | CVE-2026-125283 和 CVE-2026-113425 |

标准 Runtime 构建未启用邮件代理协议。使用 HTTP/2、HTTP/3、TLS 请求体、NGINX DNS 解析器、Stream TLS 或 PROXY 协议，以及使用相关静态文件配置的部署，应评估对应安全公告。

NGINX 1.31.9 还收紧了请求和响应解析。客户端请求头行缺少冒号时返回 400；格式错误的上游响应头可能返回 502；包含过多分块编码开销的请求体也会被拒绝。

**升级计划：** 将所有网关升级至包含 APISIX Runtime 1.4.3 的镜像或软件包。若通过源码包安装 APISIX，请单独安装 Runtime 1.4.3，再执行 `make deps APISIX_RUNTIME=1.4.3` 安装匹配的 Lua 依赖。若自行维护 Runtime，请在部署 APISIX 3.21.0 前确认已包含完整的 NGINX 1.31.9 补丁集。请测试当前部署启用的 HTTP/2、HTTP/3、TLS、DNS 解析器和 Stream 路径，并确认客户端与上游可正确处理更严格的请求头和分块请求体解析。没有可在应用这些安全修复的同时保留旧解析行为的兼容选项。

更多信息，请参阅 [NGINX 安全公告](https://nginx.org/en/security_advisories.html) 和 [PR #14223](https://github.com/apache/apisix/pull/14223)。

### Admin API 密钥条目必须显式配置角色

启用 `deployment.admin.admin_key_required` 时，`deployment.admin.admin_key` 中的每个条目现在必须是对象，且 `role` 必须为 `admin` 或 `viewer`。如果配置 `key`，其值必须是字符串或 YAML `null`。缺少角色、使用其他角色值、使用标量条目，或者将密钥配置为数值、布尔值、对象或数组，都会导致配置加载失败。

该校验适用于传统部署和控制面配置，包括已关闭 Admin API 监听器的传统部署。请求携带空 Admin API 凭证时，不再匹配配置中的空密钥。启动时，APISIX 只会为 `key` 显式设置为空字符串的 `admin` 条目生成密钥。`viewer` 条目的密钥为空、缺失或为 `null` 时，不会匹配任何请求。

**升级计划：** 升级前，请检查传统部署和控制面配置中的每个 `deployment.admin.admin_key` 条目。为其添加显式的 `admin` 或 `viewer` 角色，将每个条目调整为对象，并为可能被 YAML 解析为数值或布尔值的密钥添加引号。如果依赖启动时生成密钥，请仅在预期的 `admin` 条目上保留显式空字符串，并在启动后记录生成的值。请分别测试管理员请求、只读 viewer 请求，以及使用 viewer 密钥执行写操作被拒绝的场景。设置 `admin_key_required: false` 会关闭 Admin API 密钥身份验证并跳过这些条目校验；请勿仅为保留无效密钥配置而关闭验证。

更多信息，请参阅 [PR #14203](https://github.com/apache/apisix/pull/14203)。

## 安全修复

除 NGINX 安全更新外，APISIX 还降低了运行时日志和配置校验日志泄露配置敏感信息的风险。

### 配置校验与插件执行日志不再记录敏感值

APISIX 现在会在配置校验与合并路径中记录资源 ID，而不是完整的 Route、Service、Consumer、插件和 Stream 插件配置。插件配置哈希计算和配置不一致诊断也不再打印配置内容。

插件顶层配置类型无效时，Admin API 仅返回该类型，不再回显提交的值。若现有错误监控匹配旧的含配置值消息，请更新为新的仅类型消息。

更多信息，请参阅 [PR #14157](https://github.com/apache/apisix/pull/14157)。

## 缺陷修复

Apache APISIX 3.21.0 改进了上游节点与工作进程的恢复行为，并修复多项日志批处理和投递故障。

### 上游恢复与慢启动

- 使用 `warm_up_conf` 的轮询节点被健康检查移出选择器，或从 Upstream 删除后重新加入时，现在都会重新执行慢启动。即使中断时间很短，也会从 `min_weight_percent` 开始，因为该地址后方的进程可能已经重启。修改节点权重（包括设置为 `0`）不视为不可用。[PR #14188](https://github.com/apache/apisix/pull/14188)
- `lua-resty-healthcheck-api7` 升级至 3.2.4。新建健康检查器会在首次轮询前订阅健康事件，因此初始化期间发生的状态变化能够到达该检查器，避免相应工作进程保留过期的健康状态并继续向故障目标转发请求。该修复仅覆盖检查器构造窗口；运行期间丢失事件后的恢复仍属于独立工作。[PR #14215](https://github.com/apache/apisix/pull/14215)

### 日志批处理与投递

- 批处理器现在会统计因定时器创建失败、回调异常和重试耗尽而丢弃的条目。清理过期批处理器前，会等待所有已推送条目完成统计。因日志过滤条件不匹配或请求体无法读取而跳过的条目，不再占用待处理容量。回调异常会按配置的重试和丢弃策略处理，不再提前终止定时器。如果回调在部分投递批次后抛出异常，APISIX 会重试整个批次，日志接收端可能收到重复条目。[PR #14192](https://github.com/apache/apisix/pull/14192)
- `elasticsearch-logger` 现在按插件配置隔离批处理器，使用不同端点、凭证或请求头的 Route 不会再通过其他 Route 的批处理器发送日志。Elasticsearch 版本探测改由批处理路径执行，Elasticsearch Bulk API 操作行会根据相应批处理器所连接的集群版本生成。[PR #14192](https://github.com/apache/apisix/pull/14192)
- 日志插件配置哈希现支持 JSON `null`，请求体和响应体过滤表达式也改为在插件配置外缓存，从而避免包含 JSON `null` 的配置及编译 IPv6 `ipmatch` 值的表达式在日志阶段失败。[PR #14192](https://github.com/apache/apisix/pull/14192)
- `tcp-logger` 会将 JSON 序列化失败返回给批处理器，使其可按配置的重试和丢弃策略处理。[PR #14004](https://github.com/apache/apisix/pull/14004)
- `splunk-hec-logging` 可安全处理 JSON 响应体缺少 `text` 或将其设置为 `null` 的非 200 响应。投递错误日志现在会保留 HTTP 状态码与响应体，不再触发二次字符串拼接异常。[PR #14012](https://github.com/apache/apisix/pull/14012)

## 更新日志

完整变更列表请参阅 [3.21.0 更新日志](https://github.com/apache/apisix/blob/3.21.0/CHANGELOG.md#3210)。
