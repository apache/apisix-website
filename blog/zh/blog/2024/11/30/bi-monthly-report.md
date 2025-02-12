---
title: "社区双月报 (10.01 - 11.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: https://static.apiseven.com/uploads/2024/11/29/69Av0Gu3_nov-cover-cn.png
---

> 最近，我们新增并改进了 Apache APISIX 的部分功能，包括新增 `ai-content-moderation` 和 `ai-rag` 插件，在 Grafana 仪表盘中新增总请求变化面板等。有关更多功能新亮点，请阅读本期双月报。
<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，“众人拾柴火焰高”，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2024.10.01 至 2024.11.30，有 9 名开发者提交了 29 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](https://static.apiseven.com/uploads/2024/11/29/7z0d7q0r_contributors-nov.png)

![新晋贡献者](https://static.apiseven.com/uploads/2024/11/29/WZfXkBqp_nov-new-contributors.png)

## 近期亮点功能

1. [重构 `google-cloud-logging` 文档](https://github.com/apache/apisix/pull/11596)（贡献者：[HuanXin-Chen](https://github.com/HuanXin-Chen))

此 PR 将 `scope` 更改为符合 OAuth2/OIDC 规则的 `scopes`，同时，替换 `google-cloud-logging/oauth.lua` 为 `utils/google-cloud-oauth.lua`。

2. [新增 `ai-content-moderation` 插件](https://github.com/apache/apisix/pull/11541)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

`ai-content-moderation` 插件处理请求体以检查是否存在有害内容，并在其超过配置的阈值时拒绝该请求。

3. [新增 `ai-rag` 插件](https://github.com/apache/apisix/pull/11568)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

`ai-rag` 插件使用 RAG，即检索增强生成技术 ，通过从外部知识库中检索相关信息，将这些信息与大型语言模型结合，生成更加准确和可靠的回答。

4. [在 Grafana 仪表盘中新增总请求变化面板](https://github.com/apache/apisix/pull/11692)（贡献者：[Revolyssup](https://github.com/Revolyssup))

由于 Grafana 仪表板仅包含按状态码和按服务/路由的 RPS 面板，因此此 PR 还添加了一个总 RPS 面板，用于概览 RPS 的变化情况。

5. [在 `body-transformer` 插件中使用 `setmetatable` 设置隐藏变量而不影响序列化](https://github.com/apache/apisix/pull/11770)（贡献者：[Revolyssup](https://github.com/Revolyssup))

此 PR 能让用户直接在 `body-transformer` 的模板中使用解码后的body，修改其字段，然后再次进行编码。

6. [支持在 `jwt-auth` 插件中配置 `key_claim_name`](https://github.com/apache/apisix/pull/11772)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

支持在 `jwt-auth` 插件中配置 `key_claim_name`，用于指定 `jwt-auth` 中的哪个声明包含用于验证令牌的密钥，从而识别所使用的 secret。

7. [多重认证中任一验证通过则不记录错误日志](https://github.com/apache/apisix/pull/11775)（贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek))

在使用多个认证插件时，即使某个认证插件验证通过，而其他插件验证失败，仍然会记录错误日志，这可能会让用户感到困惑。这个 PR 修正了该逻辑，确保如果任何一个认证插件通过验证，则不会记录错误日志。

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 Github 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
