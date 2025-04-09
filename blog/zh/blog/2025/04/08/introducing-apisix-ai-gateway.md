---
title: "APISIX AI 网关介绍"
authors:
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - AI 网关
  - APISIX AI 网关
  - API 网关
  - AI 插件
  - API 管理
  - AI 驱动应用
description: 在 Apache APISIX 3.12.0 版本中，我们进一步强化了其作为现代 API 网关的 AI 支持能力。通过丰富的插件生态和灵活的架构设计，为开发者提供了完整的 AI 网关产品。
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/03/07/Qs4WrU0I_apisix-ai-gateway.webp
---

在 Apache APISIX 3.12.0 版本中，我们进一步强化了其作为现代 API 网关的 AI 支持能力。通过丰富的插件生态和灵活的架构设计，为开发者提供了完整的 AI 网关产品。

<!--truncate-->

本文将从以下几个维度解析 APISIX 在 AI 网关领域的创新实践。

## AI 网关的核心功能

APISIX 的插件生态为 AI 场景提供了开箱即用的能力，以下是核心插件及其功能。

### 一、代理与请求管理

1. **ai-proxy**

[`ai-proxy`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-proxy/) 插件通过将插件配置转换为指定的请求格式，简化了对大语言模型（LLM）和嵌入模型的访问。它支持与 OpenAI、DeepSeek 以及其他兼容 OpenAI API 的服务进行集成。

此外，该插件还支持将大语言模型的请求信息记录到访问日志中，例如令牌使用量、模型、首次响应时间等信息。

2. **ai-proxy-multi**

[`ai-proxy-multi`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-proxy-multi/) 插件通过将插件配置转换为 OpenAI、DeepSeek 以及其他兼容 OpenAI API 的服务所需的请求格式，简化了对大语言模型（LLM）和嵌入模型的访问。它扩展了 `ai-proxy` 的功能，增加了负载均衡、重试、回退和健康检查等功能。

此外，该插件还支持将大语言模型的请求信息记录到访问日志中，例如令牌使用量、模型、首次响应时间等信息。

**示例：负载均衡实例**：

以下示例展示了如何配置两个模型以实现负载均衡，将 80% 的流量转发到一个实例，20% 的流量转发到另一个实例。

为了便于演示和区分，我们将配置一个 OpenAI 实例和一个 DeepSeek 实例作为上游 LLM 服务。
创建一个路由，并根据需要更新 LLM 服务提供商、模型、API 密钥和端点，将 `openai-instance` 的权重配置为 `8`，将 `deepseek-instance` 的权重配置为 `2`。

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

[`ai-request-rewrite`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-request-rewrite) 插件通过将客户端请求转发至大语言模型（LLM）服务进行转换，然后将请求传递至后端服务，从而实现对请求的处理。这使得插件能够利用 LLM 实现数据屏蔽、内容丰富或格式重组等修改功能。此外，该插件支持与 OpenAI、DeepSeek 以及其他与 OpenAI 兼容的 API 进行集成。

**示例：屏蔽敏感信息**：

### 屏蔽敏感信息

以下示例展示了如何使用 `ai-request-rewrite` 插件在请求到达后端服务之前屏蔽敏感信息。

创建一个路由并按以下方式配置 `ai-request-rewrite` 插件，指定提供者为`openai`，在 `Authorization` 标头中附加 OpenAI API 密钥，指定模型名称，并指定在请求到达后端服务之前要屏蔽的信息。

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "ai-request-rewrite-route",
    "uri": "/anything",
    "methods": ["POST"],
    "plugins": {
      "ai-request-rewrite": {
        "provider": "openai",
        "auth": {
          "header": {
            "Authorization": "Bearer '"$OPENAI_API_KEY"'"
          }
        },
        "options":{
          "model": "gpt-4"
        },
        "prompt": "Given a JSON request body, identify and mask any sensitive information such as credit card numbers, social security numbers, and personal identification numbers (e.g., passport or driver'\''s license numbers). Replace detected sensitive values with a masked format (e.g., \"*** **** **** 1234\") for credit card numbers. Ensure the JSON structure remains unchanged."
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

向该路由发送一个包含一些个人身份识别信息的 POST 请求：

```shell
curl "http://127.0.0.1:9080/anything" -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "content": "John said his debit card number is 4111 1111 1111 1111 and SIN is 123-45-6789."
  }'
```

响应示例：

```json
{
  "args": {},
  # highlight-next-line
  "data": "{\n    \"content\": \"John said his debit card number is **** **** **** 1111 and SIN is ***-**-****.\"\n  }"
  ...,
  "json": {
    "messages": [
      {
        "content": "Client information from customer service calls",
        "role": "system"
      }, 
      {
        # highlight-next-line
        "content": "John said his debit card number is **** **** **** 1111 and SIN is ***-**-****."
        "role": "user"
      }
    ], 
    "model": "openai"
  }, 
  "method": "POST", 
  "origin": "192.168.97.1, 103.97.2.170", 
  "url": "http://127.0.0.1/anything"
}
```

### 二、流量控制

4. **ai-rate-limiting**

[ai-rate-limiting](https://apisix.apache.org/zh/docs/apisix/plugins/ai-rate-limiting/) 插件通过基于令牌的速率限制机制，对发送到大语言模型（LLM）服务的请求进行限制。它通过控制在指定时间范围内消耗的令牌数量，帮助管理 API 使用量，确保资源分配公平，并防止服务过载。该插件通常与 `ai-proxy-multi` 插件配合使用。

**示例：速率限制单个实例**：

以下示例展示了如何使用 `ai-proxy-multi` 配置两个模型以实现负载均衡，将 80% 的流量转发到一个实例，20% 的流量转发到另一个实例。此外，使用 `ai-rate-limiting` 在接收 80% 流量的实例上配置基于令牌的速率限制，以便在配置的配额完全消耗时，额外的流量将被转发到另一个实例。

创建一个路由，并根据需要更新您的 LLM 服务提供商、模型、API 密钥和端点：

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

向路由发送一个 POST 请求，并在请求正文中包含系统提示和示例用户问题：

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

如果 `deepseek-instance-1` 实例在 30 秒时间窗口内消耗了 100 个令牌的速率限制配额，那么额外的请求将全部转发到未进行速率限制的 `deepseek-instance-2` 实例。

### 三、提示词处理

5. **ai-prompt-decorator**

[`ai-prompt-decorator`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-prompt-decorator/) 插件通过在用户输入的提示前后添加预设计的提示来设置内容生成的上下文。这种做法有助于模型在交互过程中按照期望的指导方针运行。

6. **ai-prompt-template**

[`ai-prompt-template`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-prompt-template/) 插件支持预配置提示模板，这些模板仅接受用户在指定模板变量中的输入，以“填空”的方式运行。

7. **ai-prompt-guard**

[`ai-prompt-guard`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-prompt-guard/) 插件通过检查和验证传入的提示消息来保护您的大语言模型（LLM）端点。它会根据用户定义的允许和拒绝模式检查请求内容，确保只有经过批准的输入才会被转发到上游的 LLM。根据其配置，该插件可以仅检查最新消息或整个对话历史，并且可以设置为检查所有角色的提示或仅检查最终用户的提示。

### 四、内容审核

8. **ai-aws-content-moderation**

[`ai-aws-content-moderation`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-aws-content-moderation/) 插件支持与 AWS Comprehend 集成，在代理到大语言模型（LLM）时检查请求正文中的毒性内容，例如脏话、仇恨言论、侮辱、骚扰、暴力等，并在评估结果超过配置的阈值时拒绝请求。

### 五、数据增强

9. **ai-rag**

[`ai-rag`](https://apisix.apache.org/zh/docs/apisix/plugins/ai-rag/) 插件为大语言模型（LLM）提供了检索增强生成（Retrieval-Augmented Generation, RAG）功能。它能够从外部数据源高效检索相关的文档或信息，并将其用于增强 LLM 的响应，从而提高生成输出的准确性和上下文相关性。该插件支持使用 Azure OpenAI 和 Azure AI Search 服务来生成嵌入并执行向量搜索。

## 可观测性

APISIX 在可观测性方面针对 AI 应用进行了增强，能够实现实时监控关键指标，如首次生成令牌时间（TTFT）、令牌使用量和错误率。这些功能帮助团队优化成本、及时发现性能问题，并通过详细的日志和审计机制确保透明度。此外，APISIX 通过访问日志和可观测性组件，追踪令牌使用情况，有效防止 API 滥用并避免过度计费问题。

## 总结

在 [Apache APISIX 3.12.0](https://apisix.apache.org/zh/blog/2025/04/01/release-apache-apisix-3.12.0/) 版本中，APISIX AI 网关通过丰富的插件生态和灵活的架构设计，强化了其作为现代 API 网关的 AI 支持能力。它提供了代理与请求管理、流量控制、提示词处理、内容审核和数据增强等功能，支持与 OpenAI、DeepSeek 等服务集成，并通过负载均衡、速率限制和内容过滤等机制优化性能和安全性。

此外，APISIX 在可观测性方面进行了增强，实现实时监控关键指标，帮助团队优化成本、发现性能问题，并确保透明度。这一版本为开发者提供了一个强大、灵活且安全的平台，用于构建和管理 AI 驱动的应用程序。
