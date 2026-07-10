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

配置 API 网关通常意味着要记住很多东西：Admin API 的确切路径、某个插件的 schema 结构、一条路由需要哪些字段。对 Apache APISIX 来说，这些知识都有完善的文档——但你仍然得把它记在脑子里，或者一边干活一边开着浏览器查。

AI 编码 Agent 改变了这种体验。如果你不用去查 `limit-count` 的 schema，而是直接说一句：*“给我的 `/orders` 路由加上 key-auth，并限流到每分钟 100 次请求”*——然后你的 Agent 就生成正确的配置并应用上去，会怎么样？

这正是 APISIX 的 **Agent Skills** 所要实现的。

<!--truncate-->

## 什么是 Agent Skills？

一个 Agent Skill 就是一个纯 Markdown 文件——`SKILL.md`——带一小段 YAML frontmatter，以及一段针对具体任务的说明正文。它教会 AI 编码 Agent 完成一件聚焦的事：配置某个特定插件、执行某个特定的运维流程，或围绕某个特定角色进行决策。

这个格式刻意保持简单和可移植。任何理解 Agent Skills 约定的 Agent 都能加载它们——包括 Claude Code、Cursor、GitHub Copilot、Windsurf 和 OpenCode。没有运行时、没有插件 API、没有锁定：skill 只是 Agent 按需读取的知识。

针对 Apache APISIX，这些 skills 发布在开源的 [api7/a6](https://github.com/api7/a6) 仓库中。`a6` 是一个开源的、Apache-2.0 许可的命令行工具，它封装了 APISIX 的 Admin API；它不是 Apache 软件基金会官方发行版的一部分。这些 skills 教会 Agent 如何驱动 `a6` 来配置一个运行中的网关。Agent 本就可以直接调用 APISIX 的 Admin API——`a6` 和这些 skills 只是让这件事更顺手，它是众多可行方式中的一种。

## 描述结果，而不是命令

来看实际的循环。你告诉 Agent 你想要什么：

> *“给 `/orders` 路由加上 key-auth，并限流到每分钟 100 次。”*

Agent 识别出意图，加载 `a6-plugin-key-auth` 和 `a6-plugin-limit-count` 两个 skill，生成路由配置，并用基于文件的 `a6` 命令应用它：

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

```bash
a6 route update orders -f route.yaml
```

你审查了一份 diff、确认了一个结果；而你没有去查任何一个 schema 字段。

## 覆盖了哪些内容

这套 skill 覆盖了日常 APISIX 工作的完整面，分为四类：

- **Plugins（插件）**——每个插件一个 skill，从 `key-auth`、`jwt-auth`、`limit-count` 到 `ai-proxy`、`prometheus`、`zipkin`。每个都涵盖配置、示例和常见模式。
- **Recipes（方案）**——多步运维任务，如金丝雀发布、蓝绿部署、熔断、健康检查和 mTLS。
- **Personas（角色）**——面向 API 开发者和平台运维的角色化指引，包含选择路由还是服务、以及针对某个任务加载哪些 skill 的决策框架。
- **Core（核心）**——使用 `a6` CLI 的共享约定。

## 试试看

Skills 就是文件。克隆仓库，把它们放进你 Agent 的 skills 目录即可：

```bash
git clone https://github.com/api7/a6.git
mkdir -p ~/.claude/skills
cp -r a6/skills/* ~/.claude/skills/
```

然后用自然语言描述你希望网关做什么。

你可以在 [AI Agent Skills 页面](https://docs.api7.ai/apisix/ai-agent-skills) 浏览完整的、可搜索的目录——每一个插件、方案和角色 skill，以及它们各自运行的命令。这些 skills 采用 Apache-2.0 许可，在 [api7/a6](https://github.com/api7/a6) 仓库中开放开发，欢迎贡献。

AI Agent 正在成为基础设施的主要交互界面。用开放的方式——用任何人都能阅读和改进的纯 Markdown——教会它们流利地“说” APISIX，是这个项目生态自然的下一步。

## 延伸阅读

- [Apache APISIX AI Gateway](https://apisix.apache.org/ai-gateway/)——LLM 代理、负载均衡、基于 token 的限流,以及 MCP 支持
- [Apache APISIX 的 AI Agent Skills](https://docs.api7.ai/apisix/ai-agent-skills)——完整的、可搜索的 skills 目录
