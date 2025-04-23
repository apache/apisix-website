---
title: "From stdio to HTTP SSE: Host Your MCP Server with APISIX API Gateway"
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
  - API Gateway
  - MCP
  - MCP Server
  - mcp-bridge
description: Discover APISIX-MCP, leveraging AI for effortless API management. Simplify resource operations with natural language in Apache APISIX.
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/04/21/yR6mkJHI_0-apisix-mcp-server-cover.webp
---

>Discover how the Apache APISIX mcp-bridge plugin seamlessly converts stdio-based MCP servers to scalable HTTP SSE services.

<!--truncate-->

## Introduction

In contemporary API infrastructure, HTTP protocols and streaming communications (like SSE, WebSocket) have become mainstream for building real-time, interactive applications. Over the past few months, the Model Context Protocol (MCP) has gained popularity. However, most MCP Servers are implemented via stdio for local environments and cannot be invoked by external services and developers.

To bridge these services with modern API architectures, Apache APISIX has introduced the `mcp-bridge` plugin. It seamlessly converts stdio-based MCP services into HTTP SSE streaming interfaces and manages them through an API gateway for routing and traffic management.

## Model Context Protocol (MCP) Overview

MCP is an open protocol that standardizes how AI applications provide context information to large language models (LLMs). It allows developers to switch between different LLM providers while ensuring data security and facilitating integration with local or remote data sources. Supporting a client-server architecture, MCP servers expose specific functionalities that are accessible to clients via these servers.

## What Is the `mcp-bridge` Plugin?

The Apache APISIX `mcp-bridge` plugin launches a subprocess to manage the MCP Server, takes over its stdio channel, transforms client HTTP SSE requests into MCP protocol calls, and pushes responses back to the client via SSE.

**Key features:**

- 📡 Wraps MCP RPC calls into SSE message streams
- 🔄 Manages subprocess stdio lifecycle with queued RPC scheduling
- 🗂️ Lightweight MCP session management (including session ID, ping keep-alive, and queuing)
- 🧰 Supports session sharing across multiple workers for stability in APISIX multi-worker environments

## How It Works and Architecture Diagram

Below is a sequence diagram illustrating the working mechanism of the `mcp-bridge` plugin, helping you to understand the data flow from stdio to SSE:

![MCP-Bridge Architecture Diagram](https://static.api7.ai/uploads/2025/04/21/7gnb0QrW_1-mcp-bridge-sequence-diagram.webp)

**✅ Highlights:**

- APISIX manages SSE long-lived connections
- The `mcp-bridge` plugin handles subprocesses, stdio, and scheduling queues
- Clients receive real-time subprocess outputs, forming streaming SSE responses

## Application Scenarios and Benefits

**✅ Typical Application Scenarios**

- 🛠️ Integrating existing MCP/stdio services with web platforms
- 🖥️ Cross-language and cross-platform subprocess service management

**✅ Benefits**

- 🌐 Modernization: Instantly transform stdio services into HTTP SSE APIs
- 🕹️ Managed: Unified management of subprocess launch and IO lifecycle
- 📈 Scalability: Session sharing in multi-worker environments for large-scale deployment support
- 🔄 Traffic Control Integration: Seamless API management system integration with APISIX traffic control, authentication, and rate-limiting plugins

## Authentication and Rate Limiting with Apache APISIX Plugins

Apache APISIX provides robust authentication plugins (like OAuth 2.0, JWT, and OIDC) and rate-limiting plugins (such as rate limiting and circuit breakers). These enhance the `mcp-bridge` plugin, ensuring secure authentication and traffic control for connected MCP services.

### Authentication Plugins

- Support for OAuth 2.0, JWT, and OIDC plugins to protect APIs and MCP services.
- Automatic client identity verification during API gateway requests to prevent unauthorized access.

### Rate-Limiting Plugins

- Rate Limiting: Restricts each client's request rate to prevent system overload.
- Circuit Breaker: Automatically switches or returns errors to avoid system crashes during high traffic or failures.

## Adding Authentication and Rate Limiting to MCP Servers

![Add Authentication and Rate Limiting to MCP Servers](https://static.api7.ai/uploads/2025/04/21/ffwep58W_2-add-auth-and-rate-limiting-to-mcp-server.webp)

By integrating authentication and rate-limiting plugins with the `mcp-bridge` plugin, you can enhance API security and ensure system stability in high-concurrency environments.

## Roadmap

The current version is a prototype. Future enhancements include:

- Currently, MCP sessions are not shared across multiple APISIX instances. For multi-node APISIX clusters, proper session persistence configuration on the front-end load balancer is essential to ensure requests from the same client always go to the same APISIX instance.

- The current MCP SSE connection is loop-driven. While the loop doesn't consume many resources (stdio read/write will be synchronous non-blocking calls), it's not efficient. We plan to connect to a message queue for an event-driven, scalable cluster approach.

- The MCP session management module is just a prototype. We intend to abstract an MCP proxy server module to support launching MCP servers within APISIX for advanced scenarios. This proxy server module will be event-driven rather than loop-driven.

## Summary

The Apache APISIX `mcp-bridge` plugin significantly simplifies the integration of Model Context Protocol (MCP) services with the HTTP API world. It offers a modern streaming interface management approach for traditional services.
