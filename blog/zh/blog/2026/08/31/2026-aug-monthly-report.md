---
title: "2026 社区月报 (08.01 - 08.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2026/09/01/rWYKjvhI_2026-aug-monthly-report-cover-cn.webp
---

> 最近，我们引入并更新了一些新功能，包括增强 LDAP 与 OIDC 身份认证、强化数据加密与上游 TLS 校验、提升 AI 流量处理效率与容错能力，以及完善流量治理和可观测性等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.08.01 至 2026.08.31，有 13 名开发者提交了 117 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2026/09/01/N8c2DgwP_2026-aug-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2026/09/01/xxM9t0jy_2026-aug-new-contributors.webp)

## 近期亮点功能

以下是本月的重点更新，并按功能方向进行归类。

### 身份认证与凭据保护

#### 1. 新增 `ldap-auth-advanced` 核心认证能力

相关 PR：https://github.com/apache/apisix/pull/13762

贡献者：[janiussyafiq](https://github.com/janiussyafiq)

该 PR 新增 `ldap-auth-advanced` 插件，支持 LDAP 先搜索后绑定、服务账号或匿名搜索、通过 `user_dn` 关联 Consumer、LDAPS/StartTLS，并防范 LDAP 过滤器注入。此次更新还升级了 `lua-resty-ldap`，使 `tls_verify: true` 真正执行证书校验，并将认证失败与目录服务或传输异常明确区分。

#### 2. 为 `openid-connect` 支持 PAR 与 DPoP 客户端选项

相关 PR：https://github.com/apache/apisix/pull/13649

贡献者：[kevinlzw](https://github.com/kevinlzw)

该 PR 在 `openid-connect` 插件中开放 OAuth 2.0 推送授权请求（PAR）、针对令牌和用户信息请求的 DPoP 证明生成，以及客户端断言算法和受众选项。新能力均需显式启用，DPoP 私钥会在 etcd 中加密存储，现有配置的行为保持不变。

#### 3. 避免将 LDAP 凭据转发给上游

相关 PR：https://github.com/apache/apisix/pull/13832

贡献者：[nic-6443](https://github.com/nic-6443)

该 PR 为 `ldap-auth` 增加 `hide_credentials` 选项，可在请求转发至上游前移除携带 LDAP 用户名和密码的 Basic Authentication 请求头。该选项默认关闭以保持向后兼容，同时帮助用户避免将可在组织内复用的凭据暴露给后端服务。

### 数据加密与上游安全

#### 4. 加密密钥环支持 AES-256 密钥

相关 PR：https://github.com/apache/apisix/pull/13756

贡献者：[AlinsRan](https://github.com/AlinsRan)

该 PR 让 APISIX 数据加密同时支持 16 字节的 AES-128 密钥和 32 字节的 AES-256 密钥，并拒绝其他不受支持的密钥长度。一个密钥环可混合使用两种长度，便于用户从 AES-128 平滑轮换至 AES-256，同时继续解密使用旧密钥保护的数据。

#### 5. 使用可配置 CA 校验上游证书

相关 PR：https://github.com/apache/apisix/pull/13863

贡献者：[nic-6443](https://github.com/nic-6443)

该 PR 让 `upstream.tls.verify` 对 HTTPS 和 gRPCS 上游真正执行证书校验，并新增 `upstream.tls.ca_certs`，支持为每个上游单独配置可信 CA。未设置 `verify` 时仍沿用现有 NGINX 配置行为，显式启用后则可校验使用私有 CA 或自定义 CA 的上游服务。

### AI 网关效率与容错

#### 6. 精细选择 AWS 内容审核的请求范围

相关 PR：https://github.com/apache/apisix/pull/13773

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

该 PR 为 `ai-aws-content-moderation` 新增 `request_check_roles` 和 `request_check_mode`，可选择审核用户、工具及系统消息，并决定检查全部历史还是最近一组相关消息。默认配置保留对用户、工具和系统消息的原有审核范围，但此前由通用提取逻辑覆盖的 assistant 消息不再接受审核。按需选择内容可避免在每轮对话中重复审核历史消息并产生额外费用。

#### 7. 通过 `ngx_http_ffi_client` 发送 LLM 请求

相关 PR：https://github.com/apache/apisix/pull/13778

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

该 PR 将基于 NGINX C 模块的 `ngx_http_ffi_client` 设为 `ai-proxy`、`ai-proxy-multi` 和 `ai-request-rewrite` 发起上游请求时的默认传输实现，以降低 HTTP 客户端的 CPU 开销。用户仍可显式选择原有的 `lua-resty-http`，两种实现都会继续遵循 APISIX 的域名解析、流式传输、连接复用与错误处理逻辑。

#### 8. 按配置的 HTTP 状态码触发 `ai-proxy-multi` 回退

相关 PR：https://github.com/apache/apisix/pull/13852

贡献者：[nic-6443](https://github.com/nic-6443)

该 PR 支持配置更多上游 HTTP 状态码来触发 `ai-proxy-multi` 的请求内回退，例如密钥过期时的 401 或配额耗尽时的 402。回退次数仍受现有重试配置约束；若未配置额外状态码，响应处理行为保持不变。

### 流量治理与可观测性

#### 9. 监控 Stream 活跃连接、会话状态与带宽

相关 PR：https://github.com/apache/apisix/pull/13796

贡献者：[AlinsRan](https://github.com/AlinsRan)

该 PR 新增 Prometheus 指标，用于统计 TCP 和 UDP 活跃连接、Stream 会话结果以及双向带宽。共享内存中的计数器会在长连接存续期间持续更新，新增的会话结束原因还能区分正常关闭、超时、连接重置和插件拒绝，解决这些情况此前显示为相同状态的问题。

#### 10. 按 GraphQL 查询成本执行限流

相关 PR：https://github.com/apache/apisix/pull/13840

贡献者：[AlinsRan](https://github.com/AlinsRan)

该 PR 为 `graphql-limit-count` 新增 `complexity` 和 `node_quantifier` 两种成本策略，使限额能够反映查询宽度、扇出规模、分页参数及字段权重，而不再只依据嵌套深度。基于 Service 的成本规则、Schema 内省、`max_cost` 与 `score_factor` 可共同构建灵活的成本模型，同时 `depth` 仍是向后兼容的默认策略。

#### 11. 将响应信息上报至长亭雷池 WAF

相关 PR：https://github.com/apache/apisix/pull/13763

贡献者：[blaisewang](https://github.com/blaisewang)

该 PR 支持 `chaitin-waf` 将响应状态、响应头和指定大小的响应体上报至长亭雷池，用于发现数据泄露或成功攻击产生的异常输出。上报会在客户端收到响应后异步执行，仅用于检测而不会拦截或修改响应，并会跳过配置为二进制或其他忽略类型的内容。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
