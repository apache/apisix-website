---
title: "用 AI 编码 Agent 管理 Apache APISIX"
authors:
  - name: "Ming Wen"
    title: "Author"
    url: "https://github.com/moonming"
    image_url: "https://github.com/moonming.png"
keywords:
  - Apache APISIX
  - API Gateway
  - AI Agent
  - Agent Skills
  - Claude Code
  - AI Gateway
description: 通过开源的 Agent Skills，从你的 AI 编码 Agent 管理 Apache APISIX——描述你想要的结果，Agent 就会执行真实的网关命令。
tags: [Ecosystem]
---

想用自然语言管理 Apache APISIX？开源 Agent Skills 让 AI 编码 Agent 理解你的意图，生成并执行真实的网关配置。

<!--truncate-->

## 什么是 Agent Skills？

一个 Agent Skill，本质上就是一个纯 Markdown 文件：`SKILL.md`。文件开头是一小段 YAML frontmatter，后面则是针对具体任务的说明。它可以教会 AI 编码智能体完成一件明确的事情，比如配置某个插件、执行某项运维流程，或者从特定角色的角度做出决策。

这种格式刻意保持简单，也方便迁移。任何理解 Agent Skills 约定的 Agent 都能加载它们，包括 Claude Code、Cursor、GitHub Copilot、Windsurf 和 OpenCode。它不需要运行时，也没有插件 API 或锁定，skill 只是 Agent 按需读取的知识。

针对 Apache APISIX 的这些 skills，已经发布在开源的 [api7/a6](https://github.com/api7/a6) 仓库中。`a6` 是一个开源、采用 Apache-2.0 许可的命令行工具，用于封装 APISIX Admin API；它不是 Apache 软件基金会官方发行版的一部分。这些 skills 会告诉智能体如何使用 `a6` 配置正在运行的网关。当然，智能体也可以直接调用 APISIX 的 Admin API。`a6` 加上这些 skills，只是让这条路径更顺手，也是众多可行方案中的一种。

## 描述结果，而不是记住命令

我们来看一个具体例子。你只需要告诉智能体想要的结果：

> *“给 `/orders` 路由加上 key-auth，并限流到每分钟 100 次。”*

智能体识别出你的意图，加载 `a6-plugin-key-auth` 和 `a6-plugin-limit-count` 两个 skill，生成路由配置，再通过基于文件的 `a6` 命令将配置应用到网关：

```yaml
# route.yaml
uri: /orders
upstream_id: orders-upstream
plugins:
  key-auth: {}
  limit-count:
    count: 100
    time_window: 60
    key: remote_addr
    rejected_code: 429
```

这个示例假设 `orders` 路由和 `orders-upstream` 已经存在。在把任何由智能体生成的变更应用到运行中的网关之前，请先检查 diff（变更对比）或生成的配置，确认它确实指向预期的路由和上游。

```bash
a6 route update orders -f route.yaml
```

在真实工作流中，正确的顺序仍然是先审查变更、确认结果，再执行应用。区别在于，你不再需要手动查阅每一个 schema 字段。

## 覆盖了哪些内容

这套 skills 覆盖了 APISIX 中许多常见的日常工作，主要分为四类：

- **Plugins（插件）**——每个插件对应一个 skill，涵盖 `key-auth`、`jwt-auth`、`limit-count`、`ai-proxy`、`prometheus`、`zipkin` 等。每个 skill 都包含配置方式、示例和常见用法。
- **Recipes（方案）**——面向多步骤运维任务，例如金丝雀发布、蓝绿部署、熔断、健康检查和 mTLS。
- **Personas（角色）**——面向 API 开发者和平台运维人员的使用指引，包括如何选择路由或服务，以及针对具体任务应加载哪些 skill。
- **Core（核心）**——使用 `a6` CLI 时需要遵循的通用约定。

## 试试看

Skills 就是文件。克隆仓库，再把它们放入智能体的 skills 目录即可：

```bash
git clone https://github.com/api7/a6.git
mkdir -p ~/.claude/skills
cp -r a6/skills/* ~/.claude/skills/
```

完成安装后，你就可以用自然语言描述希望网关完成的工作。

你可以在 [AI Agent Skills 页面](https://docs.api7.ai/apisix/ai-agent-skills) 浏览完整且可搜索的目录，查看每个插件、方案和角色 skill，以及它们对应的命令。这些 skills 采用 Apache-2.0 许可，在 [api7/a6](https://github.com/api7/a6) 仓库中开放开发，也欢迎社区贡献。

AI 智能体正在成为操作基础设施的一种重要交互界面。用开放的方式，通过任何人都能阅读、修改和改进的纯 Markdown，让智能体能够流利地“说” APISIX，正是这个项目生态自然延伸出的下一步。

## 延伸阅读

- [Apache APISIX AI Gateway](https://apisix.apache.org/ai-gateway/)——LLM 代理、负载均衡、基于 token 的限流，以及 MCP 支持
- [Apache APISIX 的 AI Agent Skills](https://docs.api7.ai/apisix/ai-agent-skills)——完整的、可搜索的 skills 目录
