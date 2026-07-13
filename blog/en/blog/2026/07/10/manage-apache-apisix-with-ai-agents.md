---
title: "Manage Apache APISIX with AI Coding Agents"
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
description: A walkthrough of managing Apache APISIX from your AI coding agent using open-source Agent Skills — describe the outcome you want, and the agent runs the real gateway commands.
tags: [Ecosystem]
---

Want to manage Apache APISIX using natural language? Open-source Agent Skills let AI coding agents understand your intent, generate gateway configuration, and apply it to a live gateway.

<!--truncate-->

## What are Agent Skills?

An Agent Skill is a plain Markdown file, `SKILL.md`, with a bit of YAML frontmatter and a body of task-specific instructions. It teaches an AI coding agent how to accomplish one focused job: configure a specific plugin, run a specific operational recipe, or reason about a specific role.

The format is deliberately simple and portable. Any agent that understands the Agent Skills convention can load them, including Claude Code, Cursor, GitHub Copilot, Windsurf, and OpenCode. There is no runtime, no plugin API, and no lock-in: the skill is simply knowledge the agent reads on demand.

For Apache APISIX, these skills are published in the open-source [api7/a6](https://github.com/api7/a6) repository. `a6` is an open-source, Apache-2.0 licensed command-line tool that wraps the APISIX Admin API; it is not part of an official Apache Software Foundation release. The skills teach an agent how to drive `a6` to configure a live gateway. Agents can already call the APISIX Admin API directly; `a6` and these skills simply make that ergonomic, and they are one approach among several.

## Describe the outcome, not the commands

Here is the loop in practice. You tell your agent what you want:

> *"Add key-auth to my `/orders` route and rate-limit it to 100 rpm."*

The agent recognizes the intent, loads the `a6-plugin-key-auth` and `a6-plugin-limit-count` skills, generates the route configuration, and applies it with the file-based `a6` command:

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

The example assumes that the `orders` route and `orders-upstream` already exist. Before applying any generated change to a live gateway, inspect the diff or generated configuration and confirm that it targets the intended route and upstream.

```bash
a6 route update orders -f route.yaml
```

In a real workflow, you review the proposed change and confirm the outcome before applying it; you do not need to look up every schema field yourself.

## What's covered

The skill set covers common day-to-day APISIX work, organized into four kinds:

- **Plugins** - one skill per plugin, from `key-auth`, `jwt-auth`, and `limit-count` to `ai-proxy`, `prometheus`, and `zipkin`. Each covers configuration, examples, and common patterns.
- **Recipes** - multi-step operational tasks like canary releases, blue-green deployments, circuit breaking, health checks, and mTLS.
- **Personas** - role-oriented guidance for API developers and platform operators, with decision frameworks for choosing routes versus services and which skills to load for a task.
- **Core** - shared conventions for working with the `a6` CLI.

## Try it

Skills are just files. Clone the repository and drop them into your agent's skills directory:

```bash
git clone https://github.com/api7/a6.git
mkdir -p ~/.claude/skills
cp -r a6/skills/* ~/.claude/skills/
```

Then describe what you want your gateway to do, in plain language.

You can browse the full, searchable catalog, every plugin, recipe, and persona skill, with the commands each one runs, on the [AI Agent Skills page](https://docs.api7.ai/apisix/ai-agent-skills). The skills are Apache-2.0 licensed and openly developed in the [api7/a6](https://github.com/api7/a6) repository, where contributions are welcome.

AI agents are becoming a primary interface for infrastructure. Teaching them to speak APISIX fluently, in the open, with plain Markdown anyone can read and improve, is a natural next step for the project's ecosystem.

## Further reading

- [Apache APISIX AI Gateway](https://apisix.apache.org/ai-gateway/) — LLM proxying, load balancing, token-based rate limiting, and MCP support
- [AI Agent Skills for Apache APISIX](https://docs.api7.ai/apisix/ai-agent-skills) — the full, searchable skills catalog
