---
title: "2026 社区月报 (05.01 - 05.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://api7-website-1301662268.cos.ap-guangzhou.myqcloud.com/uploads/2026/06/01/THfXIpPv_monthly-report-cover-cn.webp
---

> 最近，我们引入并更新了一些新功能，包括新增飞书与钉钉认证插件、GraphQL 请求成本限制、OpenAPI 请求校验、更安全的代理缓存，以及更丰富的 AI 代理协议支持等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.05.01 至 2026.05.31，有 16 名开发者提交了 74 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://api7-website-1301662268.cos.ap-guangzhou.myqcloud.com/uploads/2026/06/01/bzwKQ6n1_2026-june-contributor-list.webp)

![新晋贡献者](https://api7-website-1301662268.cos.ap-guangzhou.myqcloud.com/uploads/2026/06/01/8FBAfGMh_Group%20427320348.webp)

## 近期亮点功能

### 1. `hmac-auth` 默认将 `date` 加入签名请求头

相关 PR：https://github.com/apache/apisix/pull/13388

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 将 `hmac-auth` 插件的 `signed_headers` 默认值调整为 `["date"]`。除非用户显式关闭，否则请求中的 `Date` 头会被纳入 HMAC 签名，从而让默认行为更好地配合时钟偏移保护，降低过期签名请求被复用的风险。

### 2. 新增 `feishu-auth` 插件

相关 PR：https://github.com/apache/apisix/pull/13382

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `feishu-auth` 插件，支持通过飞书（Lark）OAuth 2.0 授权码流程对浏览器访问的 API 进行认证。使用飞书作为企业身份系统的团队，可以直接在 APISIX 层保护内部 API 和开发者门户，而无需在每个上游服务中重复实现认证逻辑。

### 3. 新增 `graphql-limit-count` 插件

相关 PR：https://github.com/apache/apisix/pull/13372

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 引入 `graphql-limit-count` 插件，可在指定时间窗口内基于 GraphQL 查询 AST 深度进行限流。对于执行成本会随查询复杂度显著变化的 GraphQL API，这比单纯按请求次数限流更贴近实际资源消耗。

### 4. 新增 `error-page` 插件

相关 PR：https://github.com/apache/apisix/pull/13380

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `error-page` 插件，用于自定义 APISIX 自身生成的 HTTP 错误响应，例如未匹配到路由或上游不可用等场景。运维人员可以通过插件元数据配置响应体和内容类型，改善网关层错误的用户体验。

### 5. 新增 `dingtalk-auth` 插件

相关 PR：https://github.com/apache/apisix/pull/13381

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `dingtalk-auth` 插件，将钉钉 OAuth 2.0 认证集成到 APISIX 路由中。插件会通过钉钉验证用户身份，并将结果保存在加密 Cookie 会话中，从而减少同一会话内对钉钉 API 的重复调用。

### 6. `cas-auth` 支持配置绝对回调 URL

相关 PR：https://github.com/apache/apisix/pull/13413

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 允许 `cas-auth` 用户将 `cas_callback_uri` 配置为绝对 URL。对于 APISIX 部署在代理或外部域名之后的场景，CAS `service` URL 可以被显式指定，不再只能从传入请求的 Host 等信息推导。

### 7. `proxy-cache` 内存策略支持遵循 `Vary` 响应头

相关 PR：https://github.com/apache/apisix/pull/13376

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 让 `proxy-cache` 的内存缓存策略能够识别并遵循上游返回的 `Vary` 响应头。对于只在 `Accept-Encoding` 等头部上不同的请求，APISIX 现在可以存储不同缓存变体，避免缓存键冲突，并让内存策略更接近磁盘缓存策略的行为。

### 8. `cas-auth` 签名请求 URI Cookie 并强化 Cookie 属性

相关 PR：https://github.com/apache/apisix/pull/13331

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 使用 HMAC-SHA256 对 `cas-auth` 中的 `CAS_REQUEST_URI` Cookie 进行签名，并在回调阶段使用常量时间比较进行校验。同时，恢复出的跳转目标会被校验为同源路径，当 Cookie 缺失、格式错误或被篡改时会回退到 `/`，降低不安全跳转风险。

### 9. 支持配置请求 JSON 解析库

相关 PR：https://github.com/apache/apisix/pull/13386

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 新增 APISIX 级别的 JSON 库选择能力，用于请求体解析和 AI 上游请求体编码。用户可以在 `cjson`、`simdjson` 和实验性的 `qjson` 之间选择，从而在大 JSON 请求体场景下更灵活地平衡兼容性与性能。

### 10. 新增 `acl` 插件

相关 PR：https://github.com/apache/apisix/pull/13349

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 引入 `acl` 插件，为 API 路由提供基于标签的访问控制能力。团队可以根据消费者标签或外部属性（如角色、团队、订阅等级等）执行访问策略，无需编写自定义插件。

### 11. 新增 `data-mask` 插件

相关 PR：https://github.com/apache/apisix/pull/13347

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `data-mask` 插件，可在请求查询参数、请求头和请求体中的敏感字段进入访问日志或日志插件输出前进行掩码或脱敏处理。这有助于减少凭证、Token、个人信息和支付信息在可观测链路中的暴露。

### 12. `proxy-cache` 新增更安全的缓存选项

相关 PR：https://github.com/apache/apisix/pull/13350

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `proxy-cache` 插件新增 `consumer_isolation` 和 `cache_set_cookie` 选项。默认按消费者隔离缓存项，并在未显式开启时拒绝缓存带有 `Set-Cookie` 的响应，让认证流量或个性化响应的共享缓存更安全。

### 13. 新增 `exit-transformer` 插件

相关 PR：https://github.com/apache/apisix/pull/13343

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 引入 `exit-transformer` 插件，并为 APISIX 响应处理扩展 exit 回调机制。用户可以在插件拒绝、未匹配路由等 APISIX 生成的退出响应返回给客户端之前，通过自定义 Lua 函数对其进行转换。

### 14. 新增 `traffic-label` 插件

相关 PR：https://github.com/apache/apisix/pull/13342

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 新增 `traffic-label` 插件，可根据加权随机分布规则为请求分配标签。标签可以写入请求头或 APISIX 变量，适用于实验分流、路由提示、策略化打标等流量分组场景。

### 15. 新增 `oas-validator` 插件

相关 PR：https://github.com/apache/apisix/pull/13344

贡献者：[AlinsRan](https://github.com/AlinsRan)

本 PR 引入 `oas-validator` 插件，可在请求转发到上游之前，根据 OpenAPI Specification 3.x 文档校验入站 HTTP 请求。对于不符合规范的请求，插件可以返回可配置的错误状态码，帮助 API 提供方在网关层执行契约校验。

### 16. `ai-proxy` 插件支持 Bedrock ConverseStream 流式响应

相关 PR：https://github.com/apache/apisix/pull/13307

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `ai-proxy` 的 Bedrock provider 增加 ConverseStream 支持。APISIX 现在可以路由 Bedrock 流式请求，解析 AWS EventStream 帧，并通过与其他 AI 协议一致的 provider 抽象转发模型流式响应。

### 17. `elasticsearch-logger` 插件支持动态索引

相关 PR：https://github.com/apache/apisix/pull/13334

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 允许 `elasticsearch-logger` 插件使用日期时间占位符和 APISIX 变量配置动态索引模式。索引名称会在每个请求中解析，且不会修改插件配置对象，支持按日期轮转索引或按 Host 拆分日志等场景。

### 18. 使用白名单方式重写 Anthropic 到 OpenAI 的请求体转换

相关 PR：https://github.com/apache/apisix/pull/13321

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 将 `ai-proxy` 中 Anthropic Messages 到 OpenAI Chat Completions 的转换逻辑改为基于显式白名单构造请求体。新的方式可以避免未支持的 Anthropic 专有字段泄漏到 OpenAI 兼容上游，使协议转换更可预测。

### 19. 为未识别的 AI API 格式新增透传协议

相关 PR：https://github.com/apache/apisix/pull/13320

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `ai-proxy` 新增 passthrough 协议适配器，用于处理无法匹配已知 AI 协议但包含非空 JSON 请求体的场景。这样 APISIX 可以代理 OpenAI 兼容或自定义端点，例如图像生成 API，而不必为每种请求体格式都实现专门解析器。

## Good First Issue

### Issue #13395

链接：https://github.com/apache/apisix/issues/13395

描述：`hmac-auth` 插件文档中的请求体验证示例会计算并发送 `Digest` 请求头，但该请求头没有被加入 HMAC 签名请求头列表，也没有出现在签名字符串中。这会让示例略显误导：它看起来是在演示端到端的请求体完整性校验，但实际请求体摘要并没有被签名绑定。

预期行为：更新 `hmac-auth` 文档示例，先计算请求体的 SHA-256 digest，再将其以 `digest: SHA-256=<base64 body digest>` 的形式加入签名字符串。同时，`Authorization` 请求头中的签名头列表也应加入 `digest`，例如 `headers="@request-target date digest"`。此外，可以补充一小段说明：`validate_request_body` 会校验 `Digest` 请求头与请求体是否匹配；如果用户希望请求体被签名绑定，也应将 `Digest` 加入 signed headers。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
