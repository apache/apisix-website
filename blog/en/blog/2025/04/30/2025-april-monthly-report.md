---
title: "2025 Monthly Report (April 01 - April 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/04/28/vsUkfrYC_april-monthly-report-cover-en.webp
---

> We have recently added a new plugin, `mcp-bridge`, to Apache APISIX. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From April 1st to April 30, 14 contributors made 54 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/04/30/jAxKhTpu_2025-april-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/04/30/mrYsDF6W_april-new-contributors.webp)

## Good First Issue

### Translate English Documentation into Chinese for AI Plugins

Issue: https://github.com/apache/apisix/issues/12161

The AI plugin category only has English documentation. To ensure developers from diverse backgrounds can effectively use and contribute to the project, Chinese documentation needs to be added.

## Feature Highlights

### Add `mcp-bridge` Plugin

PR: https://github.com/apache/apisix/pull/12151

Contributor: [bzp2010](https://github.com/bzp2010)

This PR introduces a new plugin called `mcp-bridge`, enabling users to convert any stdio-based mcp server to HTTP SSE-based. It consists of two parts, one for stdio handling and subprocess lifecycle management, and a submodule for MCP session management.

This PR also includes a lightweight MCP session management module. It assigns session IDs and manages queues and ping timers for sessions. Using a shared dictionary, it ensures proper functionality even when SSE connections and RPC calls are handled by different NGINX workers.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blogs

- [From stdio to HTTP SSE: Host Your MCP Server with APISIX API Gateway](https://apisix.apache.org/blog/2025/04/21/host-mcp-server-with-api-gateway/)

  Discover how the Apache APISIX mcp-bridge plugin seamlessly converts stdio-based MCP servers to scalable HTTP SSE services.

- [Introducing APISIX AI Gateway](https://apisix.apache.org/blog/2025/04/08/introducing-apisix-ai-gateway/)

  In Apache APISIX version 3.12.0, we have further enhanced its AI support capabilities as a modern API gateway. Through a rich plugin ecosystem and flexible architectural design, we provide developers with a complete AI gateway product.

- [APISIX-MCP: Embracing Intelligent API Management with AI + MCP](https://apisix.apache.org/blog/2025/04/01/embrace-intelligent-api-management-with-ai-and-mcp/)

  This article introduces the MCP protocol and its application in APISIX-MCP. APISIX-MCP simplifies API management through natural language interaction, supporting the creation, updating, and deletion of resources.
