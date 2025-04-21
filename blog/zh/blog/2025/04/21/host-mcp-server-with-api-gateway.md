---
title: "从 stdio 到 HTTP SSE：使用 APISIX 托管 MCP Server"
authors:
  - name: Ming Wen
    title: author
    url: https://www.linkedin.com/in/ming-wen-api7/
    image_url: https://github.com/moonming.png
  - name: Zeping Bai
    title: author
    url: https://github.com/bzp2010
    image_url: https://github.com/bzp2010.png
keywords:
  - HTTP
  - SSE
  - API 网关
  - MCP
  - MCP Server
  - mcp-bridge
description: 探索 Apache APISIX 的 mcp-bridge 插件如何将基于标准输入输出的 MCP Server 无缝转换为可扩展的 HTTP Server 发送事件服务。了解如何通过身份认证增强 API 安全性，通过限流提高系统可靠性，同时为云原生架构优化 MCP 服务。
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/04/21/yR6mkJHI_0-apisix-mcp-server-cover.webp
---

>探索 Apache APISIX 的 mcp-bridge 插件如何将基于标准输入输出的 MCP Server 无缝转换为可扩展的 HTTP Server 发送事件服务。

<!--truncate-->

## 引言

在现代 API 基础设施中，HTTP 协议和流式通信（如 SSE、WebSocket）已成为构建实时、交互式应用的主流方式。最近几个月， Model Context Protocol (MCP) 变得越来越流行，不过大部分 MCP Server 都是通过 stdio 实现，用于本地环境使用，不能让外部服务和开发者调用。

为了打通这类服务与现代 API 架构的桥梁，Apache APISIX 新推出了 `mcp-bridge` 插件，助你将 基于 stdio 的 MCP 服务无缝转换为基于 HTTP SSE 流式接口，并通过 API 网关进行托管、路由和流量管理。

## Model Context Protocol (MCP) 协议介绍

MCP 是一种开放的协议，旨在标准化 AI 应用如何为大语言模型（LLMs）提供上下文信息。它允许开发者在不同 LLM 提供商之间进行切换，同时确保数据安全，便于与本地或远程数据源进行集成。MCP 支持客户端-服务器架构，MCP Server 暴露特定功能，客户端可以通过它访问所需的数据源。

## `mcp-bridge` 插件是什么

Apache APISIX `mcp-bridge` 插件通过启动子进程托管 MCP Server，接管其 stdio 通道，将客户端 HTTP SSE 请求转化为 MCP 协议调用，再将响应通过 SSE 推送给客户端。

**核心功能：**

- 📡 将 MCP RPC 调用包装成 SSE 消息流
- 🔄 子进程 stdio 生命周期与队列式 RPC 调度
- 🗂️ 轻量 MCP Session 管理（含 session id、ping 保活、队列）
- 🧰 支持多 worker 间共享 session，保障 APISIX 多 worker 环境稳定

## 工作机制与架构图

以下是 `mcp-bridge` 插件工作机制的顺序图，帮助理解 stdio 到 SSE 的数据流转过程：

![MCP-Bridge Architecture Diagram](https://static.api7.ai/uploads/2025/04/21/7gnb0QrW_1-mcp-bridge-sequence-diagram.webp)

**✅ 亮点：**

- APISIX 托管 SSE 长连接
- `mcp-bridge` 插件管理子进程 + stdio + 调度队列
- 客户端实时接收子进程输出，构成流式 SSE 响应

## 应用场景与优势

**✅ 典型应用场景**

- 🛠️ 旧有 MCP / stdio 服务接入 Web 平台
- 🖥️ 跨语言、跨平台子进程服务托管

**✅ 优势**

- 🌐 现代化： stdio 服务秒变 HTTP SSE API
- 🕹️ 托管式： 子进程启动、IO 生命周期统一托管
- 📈 扩展性： 多 worker 环境 session 共享，支持大规模部署
- 🔄 流控集成： 配合 APISIX 流量控制、认证、限速插件，无缝融入 API 管理体系

## 使用 Apache APISIX 的身份认证与限流限速插件

Apache APISIX 提供了强大的身份认证插件（如 OAuth 2.0、JWT 和 OIDC）和限流限速插件（如速率限制和熔断机制），可以进一步增强 `mcp-bridge` 插件的功能。使用这些插件，您可以确保对接的 MCP 服务得到安全认证并控制流量，保证系统的可靠性和稳定性。

### 身份认证插件

- OAuth 2.0、JWT 和 OIDC 插件支持，帮助保护 API 和 MCP 服务。
- 在请求通过 API 网关时自动验证客户端身份，防止未经授权的访问。

### 限流限速插件

- 速率限制：限制每个客户端的请求速率，避免系统过载。
- 熔断器：自动切换或返回错误，当流量过大或系统出现故障时避免系统崩溃。

## 为 MCP Server 增加身份认证与限流限速

![Add Authentication and Rate Limiting to MCP Servers](https://static.api7.ai/uploads/2025/04/21/ffwep58W_2-add-auth-and-rate-limiting-to-mcp-server.webp)

通过将身份认证和限流限速插件与 `mcp-bridge` 插件结合，您可以增强 API 安全性，并确保高并发环境下的系统稳定性。

## 路线图

当前版本仍是 prototype，未来将新增以下功能：

- 现在，MCP 会话不会在多个 APISIX 实例之间共享，如果你的 APISIX 集群由多个节点组成，你必须在前端 LB 上正确配置会话粘性，以确保来自同一客户端的请求始终转发到同一个 APISIX 实例，只有这样它才能正常工作。

- 当前的 MCP SSE 连接是循环驱动的，虽然循环不会占用太多资源（读取和写入 stdio 将是同步的非阻塞调用），但这效率不高，我们需要连接到一些消息队列，使其以集群的方式由事件驱动和可扩展。

- MCP 会话管理模块只是一个原型，我们还应该抽象出另一个 MCP 代理服务器模块，以支持在 APISIX 内启动 MCP Server，以支持高级场景。代理服务器模块应该是事件驱动的，而不是循环驱动的。

## 总结

Apache APISIX `mcp-bridge` 插件极大简化了 Model Context Protocol (MCP) 服务与 HTTP API 世界的对接，为传统服务提供了现代流式接口托管方式。
