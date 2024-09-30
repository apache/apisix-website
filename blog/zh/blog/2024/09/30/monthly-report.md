---
title: "社区月报 (09.01 - 09.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/09/30/InojHYaL_sep-cover-cn.png
---

> 最近，我们新增并改进了 Apache APISIX 的部分功能，包括新增 `ai-proxy`、`ai-prompt-decorator`、`attach-consumer-label` 插件和支持 GCP Secret Manager 等。有关更多功能新亮点，请阅读本期月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.09.01 至 2024.09.30，有 10 名开发者提交了 21 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/09/30/LeOeANHk_Group%20427319848.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/09/30/BjHKV34C_sep-new-contributors.png)

## 近期亮点功能

1. [新增 `attach-consumer-label` 插件](https://github.com/apache/apisix/pull/11604)（贡献者：[dspo](https://github.com/dspo))

`attach-consumer-label` 插件在认证请求中附加自定义消费者相关标签，便于上游服务区分消费者并实现额外的逻辑。

2. [新增 `ai-prompt-decorator` 插件](https://github.com/apache/apisix/pull/11597)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

`ai-prompt-decorator` 插件通过在请求中添加或预置提示，简化了对 LLM 提供商（如 OpenAI 和 Anthropic）及其模型的访问。

3. [新增 `ai-proxy` 插件](https://github.com/apache/apisix/pull/11499)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

`ai-proxy` 插件通过定义标准请求格式，允许在插件配置中嵌入关键字段到请求中，简化了对 LLM 提供商和模型的访问。

4. [支持 GCP Secret Manager](https://github.com/apache/apisix/pull/11436)（贡献者：[HuanXin-Chen](https://github.com/HuanXin-Chen))

此 PR 向原有的 Secret 模块添加了 `gcp.lua` 文件，使用户能够保持与之前相同的引用方式，将其 Secret 信息存储在 GCP 上。

5. [新增 credential 概念及用法](https://github.com/apache/apisix/pull/11601)（贡献者：[dspo](https://github.com/dspo))

凭证是持有消费者凭证配置的对象。消费者可以使用多种不同类型的凭证，包括 `basic-auth`、`hmac-auth`、`jwt-auth` 和 `key-auth`。

6. [重构 `hmac-auth` 插件](https://github.com/apache/apisix/pull/11581)（贡献者：[Revolyssup](https://github.com/Revolyssup))

`hmac-auth` 插件有许多需要配置的请求头，这使得使用该插件变得复杂。此 PR 对 HMAC 认证插件进行了重构，以提高其可用性并遵循 RFC 标准。

7. [取消发放 JWT 令牌以增强安全性](https://github.com/apache/apisix/pull/11597)（贡献者：[dspo](https://github.com/dspo))

出于安全原因，API 网关不应接受用户私钥的上传以发放 JWT 令牌，并且不再提供发放 JWT 令牌的 API。此 PR 移除了 `/apisix/plugin/jwt/sign` API。

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
