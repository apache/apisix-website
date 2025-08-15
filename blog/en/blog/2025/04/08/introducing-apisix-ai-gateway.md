---
title: "Introducing APISIX AI Gateway"
authors:
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://github.com/Yilialinn.png
keywords:
  - AI Gateway
  - APISIX AI Gateway
  - API Gateway
  - AI Plugins
  - API Management
  - AI-Driven Applications
description: In Apache APISIX version 3.12.0, we have further enhanced its AI support capabilities as a modern API gateway.
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/03/07/Qs4WrU0I_apisix-ai-gateway.webp
---

>In Apache APISIX version 3.12.0, we have further enhanced its AI support capabilities as a modern API gateway. Through a rich plugin ecosystem and flexible architectural design, we provide developers with a complete AI gateway product.

<!--truncate-->

This article delves into APISIX's innovative practices in the AI gateway domain from the following perspectives.

## Core Functions of the AI Gateway

APISIX's plugin ecosystem offers out-of-the-box capabilities for AI scenarios. Below are the core plugins and their functions:

### Proxy and Request Management

#### 1. ai-proxy

The [`ai-proxy`](https://apisix.apache.org/docs/apisix/plugins/ai-proxy/) plugin simplifies access to large language models (LLMs) and embedding models by transforming plugin configurations into the designated request format. It supports integration with OpenAI, DeepSeek, and other OpenAI-compatible services.

Additionally, the plugin supports logging LLM request information in the access log, such as token usage, model, time to first response, and more.

#### 2. ai-proxy-multi

The [`ai-proxy-multi`](https://apisix.apache.org/docs/apisix/plugins/ai-proxy-multi/) plugin simplifies access to large language models (LLMs) and embedding models by transforming plugin configurations into the request format required by OpenAI, DeepSeek, and other OpenAI-compatible services. It extends the capabilities of `ai-proxy` with load balancing, retries, fallbacks, and health checks.

Additionally, the plugin supports logging LLM request information in the access log, such as token usage, model, time to first response, and more.

![AI Proxy](https://static.api7.ai/uploads/2025/08/01/TmTsNypy_ai-proxy-multi-workflow.webp)

**Example: Load Balancing**:

The following example demonstrates how to configure two models for load balancing, forwarding 80% of the traffic to one instance and 20% to another.

For demonstration and easier differentiation, you will configure one OpenAI instance and one DeepSeek instance as the upstream LLM services. Create a route and update with your LLM providers, models, API keys, and endpoints if applicable, setting the weight of the `openai-instance` to `8` and the weight of the `deepseek-instance` to `2`.

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

#### 3. ai-request-rewrite

The [`ai-request-rewrite`](https://apisix.apache.org/docs/apisix/plugins/ai-request-rewrite) plugin processes client requests by forwarding them to large language model (LLM) services for transformation before relaying them to upstream services. This enables AI-driven redaction, enrichment, and reformatting of requests. The plugin supports integration with OpenAI, DeepSeek, and other OpenAI-compatible APIs.

**Example: Redacting Sensitive Information**:

The following example demonstrates how you can use the `ai-request-rewrite` plugin to redact sensitive information before the request reaches the upstream service.

Create a route and configure the `ai-request-rewrite` plugin as follows, specifying the provider as `openai`, attaching the OpenAI API key in the `Authorization` header, specifying the model name, and indicating the information to redact before the request reaches the upstream service.

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
        "prompt": "Given a JSON request body, identify and mask any sensitive information such as credit card numbers, social security numbers, and personal identification numbers (e.g., passport or driver's license numbers). Replace detected sensitive values with a masked format (e.g., \"*** **** **** 1234\") for credit card numbers. Ensure the JSON structure remains unchanged."
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

Send a POST request to the route with some personally identifiable information:

```shell
curl "http://127.0.0.1:9080/anything" -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "content": "John said his debit card number is 4111 1111 1111 1111 and SIN is 123-45-6789."
  }'
```

Example response:

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

### Traffic Control

#### 4. ai-rate-limiting

The [`ai-rate-limiting`](https://apisix.apache.org/docs/apisix/plugins/ai-rate-limiting/) plugin enforces token-based rate limiting for requests sent to large language model (LLM) services. It helps manage API usage by controlling the number of tokens consumed within a specified time frame, ensuring fair resource allocation and preventing excessive load on the service. It is often used in conjunction with the ai-proxy-multi plugin.

**Example: Rate Limiting a Single Instance**:

The following example demonstrates how to use ai-proxy-multi to configure two models for load balancing, forwarding 80% of the traffic to one instance and 20% to another. Additionally, use `ai-rate-limiting` to configure token-based rate limiting on the instance that receives 80% of the traffic, so that when the configured quota is fully consumed, the additional traffic will be forwarded to the other instance.

Create a route and update with your LLM providers, models, API keys, and endpoints as needed:

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

Send a POST request to the route with a system prompt and a sample user question in the request body:

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

Example response:

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

If the `deepseek-instance-1` instance's rate limiting quota of 100 tokens has been consumed within a 30-second window, additional requests will be forwarded to the `deepseek-instance-2` instance, which is not rate limited.

### Prompt Processing

#### 5. ai-prompt-decorator

The [`ai-prompt-decorator`](https://apisix.apache.org/docs/apisix/plugins/ai-prompt-decorator/) plugin sets the context for content generation by adding pre-designed prompts before and after user input. This practice helps the model operate according to the intended guidelines during interactions.

#### 6. ai-prompt-template

The [`ai-prompt-template`](https://apisix.apache.org/docs/apisix/plugins/ai-prompt-template/) plugin supports pre-configured prompt templates that only accept user input in specified template variables, operating in a "fill-in-the-blank" manner.

#### 7. ai-prompt-guard

The [`ai-prompt-guard`](https://apisix.apache.org/docs/apisix/plugins/ai-prompt-guard/) plugin protects your large language model (LLM) endpoints by inspecting and validating incoming prompt messages. It checks the request content against user-defined allow and deny patterns, ensuring only approved input is forwarded to the upstream LLM. Depending on its configuration, the plugin can check either the latest message or the entire conversation history and can be set to inspect prompts from all roles or only from the end user.

![ai-prompt-guard](https://static.api7.ai/uploads/2025/08/01/6Dl4AQGL_ai-prompt-guard-workflow.webp)

### Content Moderation

#### 8. ai-aws-content-moderation

The [`ai-aws-content-moderation`](https://apisix.apache.org/docs/apisix/plugins/ai-aws-content-moderation/) plugin integrates with AWS Comprehend to check for toxic content in the request body when proxying to large language models (LLMs), such as profanity, hate speech, insults, harassment, and violence, and rejects requests when the evaluation result exceeds the configured threshold.

### Data Enhancement

#### 9. ai-rag

The [`ai-rag`](https://apisix.apache.org/docs/apisix/plugins/ai-rag/) plugin provides retrieval-augmented generation (RAG) capabilities for large language models (LLMs). It efficiently retrieves relevant documents or information from external data sources to enhance LLM responses, improving the accuracy and context relevance of the generated output. The plugin supports using Azure OpenAI and Azure AI Search services to generate embeddings and perform vector searches.

## Observability

APISIX has enhanced observability for AI applications, enabling real-time monitoring of key metrics such as time to first generated token (TTFT), token usage, and error rates. These capabilities help teams optimize costs, promptly identify performance issues, and ensure transparency through detailed logs and auditing mechanisms. Additionally, APISIX tracks token usage through access logs and observability components, effectively preventing API abuse and avoiding overbilling issues.

## Summary

In the [Apache APISIX 3.12.0](https://apisix.apache.org/blog/2025/04/01/release-apache-apisix-3.12.0/), the APISIX AI Gateway has strengthened its AI support capabilities as a modern API gateway through a rich plugin ecosystem and flexible architectural design.

It offers features such as proxy and request management, traffic control, prompt processing, content moderation, and data enhancement, with support for integration with services like OpenAI and DeepSeek. Performance and security are optimized through mechanisms like load balancing, rate limiting, and content filtering.

Moreover, APISIX has enhanced observability, enabling real-time monitoring of key metrics to help teams optimize costs, identify performance issues, and ensure transparency. This release provides developers with a powerful, flexible, and secure platform for building and managing AI-driven applications.
