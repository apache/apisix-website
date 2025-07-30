---
title: "Announcing APISIX Integration with AI/ML API"
authors:
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://github.com/Yilialinn.png"
keywords: 
- API gateway
- Apache APISIX
- AI
- AI/ML API
- AI plugins
description: "Apache APISIX supports 300+ LLMs through the integration with AI/ML API. Get your secure, single-endpoint access to AI models like GPT-4 and Claude, and more."
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/07/23/d1O3mllW_apisix-ai-ml-api.webp
---

> We're thrilled to announce that **AI/ML API** has become a supported provider to the `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` plugins in **Apache APISIX**.
<!--truncate-->

## Introduction

[AI/ML API](https://aimlapi.com/) is a single endpoint that gives you access to more than 300 ready-to-use AI models—large language models, embeddings, image and audio tools—through one standard REST interface. It is used by over 150,000 developers and organizations as a centralized LLM API gateway.

We're thrilled to announce that **AI/ML API** has become a supported provider to the `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite` plugins in **Apache APISIX**.

AI/ML API provides a unified OpenAI-compatible API with access to **300+ LLMs** such as GPT-4, Claude, Gemini, DeepSeek, and others. This integration bridges the gap between your API infrastructure and leading AI services, enabling you to deploy intelligent features—like chatbots, real-time translations, and data analysis—faster than ever.

## Proxy to OpenAI via AI/ML API

### Prerequisites

1. [Install APISIX](https://apisix.apache.org/docs/apisix/installation-guide/).
2. Generate AI/ML API Key [OpenAI API key](https://platform.openai.com/api-keys).
  ![Generate AI/ML API Key](https://static.api7.ai/uploads/2025/07/30/dGXA7d0r_ai-ml-api-key.webp)

### Configure the Route

Create a route and configure the `ai-proxy` plugin as such:

```yaml
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "ai-proxy-route",
    "uri": "/anything",
    "methods": ["POST"],
    "plugins": {
      "ai-proxy": {
        "provider": "aimlapi",
        "auth": {
          "header": {
            "Authorization": "Bearer '"$OPENAI_API_KEY"'" # Generated openai key from AI/ML API dashboard
          }
        },
        "options":{
          "model": "gpt-4"
        }
      }
    }
  }'
```

### Test the Integration

Send a POST request to the route with a system prompt and a sample user question in the request body:

```bash
curl "http://127.0.0.1:9080/anything" -X POST \
  -H "Content-Type: application/json" \
  -H "Host: api.openai.com" \
  -d '{
    "messages": [
      { "role": "system", "content": "You are a mathematician" },
      { "role": "user", "content": "What is 1+1?" }
    ]
  }'
```

### Verify Response

You should receive a response similar to the following:

```json
{
  ...,
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null,
      "message": {
        "role": "assistant",
        "content": "1 + 1 equals 2.",
        "refusal": null,
        "annotations": []
      }
    }
  ],
  "created": 1753845968,
  "model": "gpt-4-0613",
  "usage": {
    "prompt_tokens": 1449,
    "completion_tokens": 1008,
    "total_tokens": 2457
  ...
}
```

## Core Use Cases

1. **Unified AI Service Management**

   - **Multi-Model Proxy and Load Balancing**: Replace hardcoded vendor endpoints with a single APISIX interface, dynamically routing requests to models from OpenAI, Claude, DeepSeek, Gemini, Mistral, etc., based on cost, latency, or performance needs.
   - **Vendor-Agnostic Workflows**: Seamlessly switch between models (e.g., GPT-4 for creative tasks, Claude for document analysis) without code changes.

2. **Cost-Optimized Token Governance**

   - **Token-Based Budget Enforcement**: Set per-team/monthly spending limits; auto-throttle requests when thresholds are exceeded.
   - **Caching & Fallbacks**: Cache frequent LLM responses (e.g., FAQ answers) or reroute to cheaper models during provider outages.

3. **Real-Time AI Application Scaling**

   - **Chatbots & Virtual Agents**: Power low-latency conversational interfaces with streaming support for token-by-token responses.
   - **Data Enrichment Pipelines**: Augment APIs with AI—e.g., auto-summarize user reviews or translate product descriptions on-the-fly.

4. **Hybrid/Multi-Cloud AI Deployment**

   - **Unified Control Plane**: Manage on-prem LLMs (e.g., Llama 3) alongside cloud APIs (OpenAI, Azure) with consistent policy enforcement.
   - **High Availability & Fault Tolerance**: Built-in health-checks, automatic retries and failover; if one LLM fails, traffic is rerouted within seconds to keep services alive.

5. **Enterprise AI Security & Compliance**

   - **Data Security and Compliance**: Prompt Guard, content moderation, PII redaction and full audit logs in a single place.
   - **One Auth Layer for 300+ LLMs**: Unified authentication (JWT/OAuth2/OIDC) and authorization for 300+ LLM keys and policies.

## Conclusion

With AI/ML API now natively supported in Apache APISIX, you no longer have to choose between **speed**, **security**, or **scale**—you get all three.

- **One line of YAML** turns your gateway into a 300-model AI powerhouse.
- **Zero code changes** let you hot-swap GPT-4 for Claude, or route 10 % of traffic to a cheaper model for instant cost savings.
- **Built-in guardrails** (PII redaction, token budgets, content moderation) keep compliance teams happy while your product team ships faster.

### More Resources

- Related APISIX AI Plugins
  - [ai-proxy](https://apisix.apache.org/docs/apisix/plugins/ai-proxy/)
  - [ai-proxy-multi](https://apisix.apache.org/docs/apisix/plugins/ai-proxy-multi/)
  - [ai-request-rewrite](https://apisix.apache.org/docs/apisix/plugins/ai-request-rewrite/)
- [AI/ML API Community](https://aimlapi.com/community)
