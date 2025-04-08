---
title: "深度解析 APISIX AI 网关"
authors:
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - AI 网关
  - AI 服务管理
  - AI 安全与合规
  - AI 网关用户案例
  - 可扩展性
  - AI 性能监控
description: Apache APISIX 3.12.0 版本于 2025 年 4 月 1 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布，在 Apache APISIX 3.12.0 版本中，我们进一步强化了其作为现代 API 网关的 AI 支持能力。通过丰富的插件生态和灵活的架构设计，为开发者提供了完整的 AI 网关产品。

本文将从以下几个维度解析 APISIX 在 AI 网关领域的创新实践：

## AI 网关的核心功能

APISIX 的插件生态为 AI 场景提供了开箱即用的能力，以下是核心插件及其功能：

### 一、代理与请求管理

1. **ai-proxy**

   - **功能**：通过将插件配置转换为指定的请求格式，简化了对大语言模型（LLM）和嵌入模型的访问。支持与 OpenAI、DeepSeek 以及其他兼容 OpenAI API 的服务进行集成。
   - **日志记录**：支持将大语言模型的请求信息（如令牌使用量、模型、首次响应时间等）记录到访问日志中。

2. **ai-proxy-multi**

   - **功能**：扩展了 ai-proxy 的功能，增加了负载均衡、重试、回退和健康检查等功能。
   - **日志记录**：同样支持将大语言模型的请求信息记录到访问日志中。

**负载均衡实例**：

以下示例展示了如何配置两个模型以实现负载均衡，将 80% 的流量转发到一个实例，20% 的流量转发到另一个实例。我们将配置一个 OpenAI 实例和一个 DeepSeek 实例作为上游 LLM 服务。

```bash
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "ai-proxy-multi-route",
    "uri": "/anything",
    "methods": ["POST"],
    "plugins": {
      "ai-proxy-multi": {
        "instances": [
          {
            "name": "openai-instance",
            "provider": "openai",
            "weight": 8,
            "auth": {
              "header": {
                "Authorization": "Bearer '"$OPENAI_API_KEY"'"
              }
            },
            "options": {
              "model": "gpt-4"
            }
          },
          {
            "name": "deepseek-instance",
            "provider": "deepseek",
            "weight": 2,
            "auth": {
              "header": {
                "Authorization": "Bearer '"$DEEPSEEK_API_KEY"'"
              }
            },
            "options": {
              "model": "deepseek-chat"
            }
          }
        ]
      }
    }
  }'
```

3. **ai-request-rewrite**

   - **功能**：利用预定义的提示和 AI 服务，智能地修改客户端请求，实现在转发至上游服务之前借助 AI 完成内容转换。

**示例**：

创建一个带有 ai-request-rewrite 插件的路由，将 provider 设置为 openai-compatible，并将模型的端点设置为 override.endpoint。

```bash
curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "uri": "/anything",
    "plugins": {
      "ai-request-rewrite": {
        "prompt": "Given a JSON request body, identify and mask any sensitive information such as credit card numbers, social security numbers, and personal identification numbers (e.g., passport or driver\'s license numbers). Replace detected sensitive values with a masked format (e.g., \'*** **** **** 1234\') for credit card numbers). Ensure the JSON structure remains unchanged.",
        "provider": "openai-compatible",
        "auth": {
          "header": {
            "Authorization": "Bearer <some-token>"
          }
        },
        "options": {
          "model": "qwen-plus",
          "max_tokens": 1024,
          "temperature": 1
        },
        "override": {
          "endpoint": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
        }
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "httpbin.org:80": 1
      }
    }
  }'
```

### 二、流量控制

4. **ai-rate-limiting**

   - **功能**：通过基于令牌的速率限制机制，对发送到大语言模型（LLM）服务的请求进行限制，帮助管理 API 使用量，确保资源分配公平，并防止服务过载。通常与 ai-proxy-multi 插件配合使用。

**速率限制单个实例**：

以下示例展示了如何使用 ai-proxy-multi 配置两个模型以实现负载均衡，并在接收 80% 流量的实例上配置基于令牌的速率限制。

```bash
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "ai-rate-limiting-route",
    "uri": "/anything",
    "methods": ["POST"],
    "plugins": {
      "ai-rate-limiting": {
        "instances": [
          {
            "name": "deepseek-instance-1",
            "provider": "deepseek",
            "weight": 8,
            "auth": {
              "header": {
                "Authorization": "Bearer '"$DEEPSEEK_API_KEY"'"
              }
            },
            "options": {
              "model": "deepseek-chat"
            }
          },
          {
            "name": "deepseek-instance-2",
            "provider": "deepseek",
            "weight": 2,
            "auth": {
              "header": {
                "Authorization": "Bearer '"$DEEPSEEK_API_KEY"'"
              }
            },
            "options": {
              "model": "deepseek-chat"
            }
          }
        ]
      },
      "ai-rate-limiting": {
        "instances": [
          {
            "name": "deepseek-instance-1",
            "limit_strategy": "total_tokens",
            "limit": 100,
            "time_window": 30
          }
        ]
      }
    }
  }'
```

向路由发送一个 POST 请求：

```bash
curl "http://127.0.0.1:9080/anything" -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "system", "content": "You are a mathematician" },
      { "role": "user", "content": "What is 1+1?" }
    ]
  }'
```

响应示例：

```json
{
  ...
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "1 + 1 equals 2. This is a fundamental arithmetic operation where adding one unit to another results in a total of two units."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  ...
}
```

### 三、提示词处理

5. **ai-prompt-decorator**

   - **功能**：通过在用户输入的提示前后添加预设计的提示来设置内容生成的上下文，帮助模型按照期望的指导方针运行。

6. **ai-prompt-template**

   - **功能**：支持预配置提示模板，仅接受用户在指定模板变量中的输入，以“填空”的方式运行。

7. **ai-prompt-guard**

   - **功能**：通过检查和验证传入的提示消息来保护 LLM 端点，确保只有经过批准的输入才会被转发到上游的 LLM。可以配置为检查最新消息或整个对话历史，以及检查所有角色的提示或仅检查最终用户的提示。

### 四、内容审核

8. **ai-aws-content-moderation**

   - **功能**：支持与 AWS Comprehend 集成，在代理到 LLM 时检查请求正文中的毒性内容（如脏话、仇恨言论等），并在评估结果超过配置的阈值时拒绝请求。

### 五、数据增强

9. **ai-rag**

   - **功能**：为 LLM 提供检索增强生成（RAG）功能，从外部数据源高效检索相关文档或信息，增强 LLM 的响应，提高生成输出的准确性和上下文相关性。支持使用 Azure OpenAI 和 Azure AI Search 服务。

## 可观测性

APISIX 在可观测性方面针对 AI 应用进行了增强，能够实现实时监控关键指标（如首次生成令牌时间、令牌使用量和错误率）。这些功能帮助团队优化成本、及时发现性能问题，并通过详细的日志和审计机制确保透明度。此外，APISIX 通过访问日志和可观测性组件，追踪令牌使用情况，有效防止 API 滥用并避免过度计费问题。

## 总结

在 Apache APISIX 3.12.0 版本中，APISIX AI 网关通过丰富的插件生态和灵活的架构设计，强化了其作为现代 API 网关的 AI 支持能力。它提供了代理与请求管理、流量控制、提示词处理、内容审核和数据增强等功能，支持与 OpenAI、DeepSeek 等服务集成，并通过负载均衡、速率限制和内容过滤等机制优化性能和安全性。此外，APISIX 在可观测性方面进行了增强，实现实时监控关键指标，帮助团队优化成本、发现性能问题，并确保透明度。这一版本为开发者提供了一个强大、灵活且安全的平台，用于构建和管理 AI 驱动的应用程序。
