---
title: "社区月报 (03.01 - 03.31)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.api7.ai/uploads/2025/03/28/FQ1r3FvO_march-monthly-report-cover-cn.webp
---

> 最近，我们新增了 Apache APISIX 的部分功能，如支持 `ai-prompt-guard`、`ai-request-rewrite` 和 `ai-rate-limiting` 插件，以及在 `openid-connect` 插件中新增 JWT 受众认证等等。有关更多细节，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2025.03.01 至 2025.03.31，有 14 名开发者提交了 50 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.api7.ai/uploads/2025/03/31/fDYTi9Vu_march-contributor-list.webp)

![新晋贡献者](https://static.api7.ai/uploads/2025/03/31/NB9qpu7Q_mar-new-contributors.webp)

## Good First Issue

### Issue #12098

相关 RP：https://github.com/apache/apisix/issues/12098

Issue 描述：优化 `chaitin-waf` 插件配置码。

## 近期亮点功能

### 新增插件

1. [新增 `ai-prompt-guard` 插件](https://github.com/apache/apisix/pull/12008) (贡献者：[Revolyssup](https://github.com/Revolyssup))

`ai-prompt-guard` 插件通过检查和验证传入的提示消息来保护你的 AI 端点。它会根据用户定义的允许和拒绝模式检查请求内容，以确保只有经过批准的输入才会被处理。根据其配置，该插件可以检查最新消息或整个对话历史，并且可以设置为检查所有角色或仅最终用户的提示。

2. [新增 `ai-rate-limiting` 插件](https://github.com/apache/apisix/pull/12037) (贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

`ai-rate-limiting` 插件通过基于令牌的方式对发送至 LLM（大型语言模型）服务的请求进行限流。它通过控制在指定时间范围内消耗的令牌数量来管理 API 的使用情况，从而确保资源的公平分配并防止服务过载。该插件常常与 `ai-proxy-multi` 插件配合使用。

3. [新增 `ai-request-rewrite` 插件](https://github.com/apache/apisix/pull/12036) (贡献者：[LiteSun](https://github.com/LiteSun))

`ai-request-rewrite` 插件利用预定义的提示和 AI 服务，能够智能地修改客户端请求，从而实现在转发至上游服务之前借助 AI 完成内容转换。

### 功能增强/改进

1. [支持代理 OpenAI 兼容的大型语言模型](https://github.com/apache/apisix/pull/12004) (贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

此 PR 引入了一个新的提供者 `openai-compatible`，能够代理请求到与 OpenAI 兼容的大型语言模型。

2. [在 `jwt-auth` 插件中将 JWT 存储到请求上下文中](https://github.com/apache/apisix/pull/11675) (贡献者：[mikyll](https://github.com/mikyll))

在 `jwt-auth` 插件中新增参数：`store_in_ctx`。开启后（默认关闭），验证成功的 JWT 对象将被存入请求上下文。这一功能对自定义插件意义重大：

- 当配置 `hide_credential = true` 时，JWT 会从请求属性中移除，此时 `store_in_ctx` 提供了安全的令牌传递替代方案，避免直接暴露。
- 防止自定义插件重复编写获取与解析 JWT 的代码，因为 `jwt-auth` 插件已实现这些功能。

3. [在 `openid-connect` 插件中新增 JWT 受众认证](https://github.com/apache/apisix/pull/11987) (贡献者：[bzp2010](https://github.com/bzp2010))

向 `openid-connect` 插件添加 JWT 受众认证，支持以下功能：

- 断言该声明必须存在，否则请求将被拒绝。
- 断言其值应等于或包含 `client_id`，以符合 OIDC 规范要求，否则请求将被拒绝。
- 该声明可自定义。

由于 `lua-resty-openidc` 适用于使用公钥的本地验证，因而不适合使用 `jwt-validators` 中的某些 API 来实现 JWT 验证，我们选择直接在插件代码中实现该功能。为保持兼容性，这些功能默认未启用，是否开启由用户自行决定。

4. [将 `ssl_trusted_certificate` 中的默认值设置为 `system`](https://github.com/apache/apisix/pull/11993)(贡献者：[Revolyssup](https://github.com/Revolyssup))

在测试 AI 插件时，我们发现 `ssl_trusted_certificate` 应该设置为 `system`，否则 APISIX 在访问外部 AI 服务时会不断报告“无法验证服务器的 SSL 证书”的错误。此 PR 将 schema 验证移到 `read_yaml_conf` 中，以保持一致性，`local_conf` 内部只是调用 `read_yaml_conf` 并添加缓存。从而确保首先进行 schema 验证，再将受信任证书的默认值设置为 `system`，然后进行覆盖操作，包括将 `system` 替换为证书路径的操作。此 PR 还移除了对合并多个证书的支持。

5. [在 `openid-connect` 插件中增加 `valid_issuers` 字段](https://github.com/apache/apisix/pull/11993)(贡献者：[Revolyssup](https://github.com/Revolyssup))

在使用 JWKs 验证 JWT 的颁发者时，添加了一个 `valid_issuers` 字段。将经过审查的 JWT 颁发者列入白名单。如果用户未指定，则使用发现端点返回的颁发者。如果两者都缺失，则不验证颁发者。

6. [在 `ai-proxy-multi` 插件中引入与 `ai-rate-limiting` 插件相匹配的回退策略](https://github.com/apache/apisix/pull/11993) (贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

之前为了适应 `ai-rate-limiting` 插件，移除了回退策略。此 PR 在 `ai-proxy-multi` 插件中引入了与`ai-rate-limiting` 限流限速插件相匹配的回退策略。

7. [在 `ai-proxy` 插件中支持代理嵌入式 API](https://github.com/apache/apisix/pull/12062) (贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

此 PR 为 `ai-proxy` 插件增加了对代理嵌入式 API 的支持。

8. [在 ip-restriction 插件中支持 404 响应码](https://github.com/apache/apisix/pull/12076) (贡献者：[papdaniel](https://github.com/papdaniel))

在 `ip-restriction` 插件中支持 404 响应码，以便对黑名单或未列入白名单的来源隐藏路由。

9. [扩展 `chaitin-waf` 插件的功能](https://github.com/apache/apisix/pull/12029) (贡献者：[papdaniel](https://github.com/AlyHKafoury))

此 PR 在 `chaitin-waf` 插件中添加了对 `mode` 属性的配置，添加了启用/禁用真实客户端 IP 的配置，并使用 `lrucache` 来缓存变量表达式的结果。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。

## 最新博客速览

- [APISIX 的 AI Gateway 功能一览：LLM 代理、Token 限流、安全防护](https://apisix.apache.org/zh/blog/2025/02/24/apisix-ai-gateway-features/)

  本文将详细介绍当前及未来几个版本 APISIX 的 AI 网关功能。作为一个多功能的 API 和 AI 网关，Apache APISIX 将为 AI 应用提供了高效且安全的 LLM API 调用。

- [什么是 AI 网关？概念与核心功能](https://apisix.apache.org/zh/blog/2025/03/06/what-is-an-ai-gateway/)

  本文探讨 AI 网关如何应对 API 网关领域的关键挑战，揭示其如何释放人工智能的全部潜能，将技术瓶颈转化为发展机遇。

- [AI 网关解析：与传统 API 网关的核心差异](https://apisix.apache.org/zh/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/)

  “未来的方向不是独立的 AI 网关，而是具备 AI 交互能力的 API 网关。” 本文深入解析 AI 网关的技术特性，探讨其与传统 API 网关的本质区别，并阐述为何 Apache APISIX AI Gateway 等演进式解决方案代表未来趋势。
