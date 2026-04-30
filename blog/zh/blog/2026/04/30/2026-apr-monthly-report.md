---
title: "2026 社区月报 (04.01 - 04.30)"
keywords: ["Apache APISIX", "API 网关", "社区月报", "贡献者"]
description: Apache APISIX 社区的月报旨在帮助社区成员更全面地了解社区的最新动态，方便大家参与到 Apache APISIX 社区中来。
tags: [Community]
image: TODO_COVER_IMAGE_ZH
---

> 最近，我们引入并更新了一些新功能，包括在 `ai-proxy` 插件中支持 AWS Bedrock、原生支持 Anthropic Messages API 协议，以及支持 OpenAI Responses API（`/v1/responses`）等。有关更多细节，请阅读本期月报。

<!--truncate-->

## 导语

Apache APISIX 项目始终秉承着开源社区协作的精神，自问世起便崭露头角，如今已经成为全球最活跃的开源 API 网关项目之一。正如谚语所言，"众人拾柴火焰高"，这一辉煌成就，得益于整个社区伙伴的协同努力。

从 2026.04.01 至 2026.04.30，有 17 名开发者提交了 129 个 commits，为 Apache APISIX 做出了重要贡献。感谢这些伙伴们对 Apache APISIX 的无私支持！正是因为你们的付出，才能让 Apache APISIX 项目不断改进、提升和壮大。

## 贡献者统计

![贡献者名单](TODO_CONTRIBUTOR_LIST_IMAGE)

![新晋贡献者](TODO_NEW_CONTRIBUTORS_IMAGE)

## 近期亮点功能

### 1. `ai-proxy` 插件支持 AWS Bedrock

相关 PR：https://github.com/apache/apisix/pull/13249

贡献者：[shreemaan-abhishek](https://github.com/shreemaan-abhishek)

本 PR 为 `ai-proxy` 插件新增了对 AWS Bedrock 的支持。用户现在可以使用 `ai-proxy` 插件提供的统一接口，将 AI 请求路由到托管在 AWS Bedrock 上的模型，进一步扩展了所支持的 AI 平台范围（现已包含 OpenAI、Anthropic 等主流提供商）。

### 2. 原生支持 Anthropic Messages API 协议

相关 PR：https://github.com/apache/apisix/pull/13181

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-proxy` 插件新增了对 Anthropic Messages API 协议的原生支持。此前，Anthropic 请求需要通过 OpenAI 兼容格式进行转换。现在用户可以直接使用原生 Anthropic Messages API 格式发送请求，提供了更大的灵活性和对 Anthropic 特有功能更好的兼容性。

### 3. 支持 OpenAI Responses API（`/v1/responses`）

相关 PR：https://github.com/apache/apisix/pull/13186

贡献者：[nic-6443](https://github.com/nic-6443)

本 PR 为 `ai-proxy` 插件新增了对 OpenAI Responses API 端点（`/v1/responses`）的支持。用户现在可以通过 APISIX 代理发送到最新 OpenAI Responses API 的请求，该 API 提供有状态的多轮对话能力，使 APISIX 能够及时跟进 OpenAI 最新的 API 接口。

## 结语

Apache APISIX 的项目[官网](https://apisix.apache.org/zh/)和 GitHub 上的 [Issues](https://github.com/apache/apisix/issues) 上已经积累了比较丰富的文档教程和使用经验，如果您遇到问题可以翻阅文档，用关键词在 Issues 中搜索，也可以参与 Issues 上的讨论，提出自己的想法和实践经验。
