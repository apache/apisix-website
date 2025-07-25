---
title: "Announcing APISIX Integration with AI/ML API"
authors:
  - name: "Sergey Nuzhnyy"
    title: "Author"
    url: "https://github.com/OctavianTheI"
    image_url: "https://github.com/OctavianTheI.png"
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

## Get Started in 5 Minutes: Connect APISIX to OpenAI

### Prerequisites

1. [Install APISIX](https://apisix.apache.org/docs/apisix/installation-guide/).
2. Get your [OpenAI API key](https://platform.openai.com/api-keys).

### Configure the Route

Add this configuration to your `conf/config.yaml`:

```yaml
routes:
  - uri: /chat
    # Enable the AI plugin
    plugins:
      ai:
        # OpenAI provider configuration
        openai:
          api_key: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # Replace with your key
          model: gpt-4-turbo          # Choose model: gpt-4, gpt-3.5-turbo, etc.
          timeout: 10000              # Timeout in ms (optional)
          max_retries: 2              # Auto-retry failed requests (optional)
    # Optional upstream for hybrid workflows
    upstream:
      nodes:
        "http://your-ai-app:3000": 1  # Forward to your app after AI processing
```

### Apply Configuration

Reload APISIX to activate the route:

```bash
apisix reload
# Verify with
curl http://127.0.0.1:9080/apisix/admin/routes -i
```

### Test the Integration

Send a chat request using OpenAI's message format:

```bash
curl http://127.0.0.1:9080/chat -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant"},
      {"role": "user", "content": "What is APISIX?"}
    ]
  }'
```

### Verify Response

You should receive a structured OpenAI response:

```json
{
  "id": "chatcmpl-9abc...",
  "model": "gpt-4-turbo",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Apache APISIX is an open-source API gateway..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 27,
    "completion_tokens": 89,
    "total_tokens": 116
  }
}
```

## Core Use Cases

1. **Unified AI Service Management**

   - **Multi-Model Abstraction**: Replace hardcoded vendor endpoints with a single APISIX interface, dynamically routing requests to models from OpenAI, Anthropic, Mistral, etc., based on cost, latency, or performance needs.
   - **Vendor-Agnostic Workflows**: Seamlessly switch between models (e.g., GPT-4 for creative tasks, Claude for document analysis) without code changes.

2. **Enterprise AI Security & Compliance**

   - **PII Masking**: Automatically redact sensitive data (e.g., credit card numbers) in prompts before sending to LLMs.
   - **Content Moderation**: Scan inputs/outputs for toxicity, bias, or prompt injection attacks using integrated plugins like `ai-request-rewrite`.

3. **Cost-Optimized AI Operations**

   - **Token-Based Budget Enforcement**: Set per-team/monthly spending limits; auto-throttle requests when thresholds are exceeded.
   - **Caching & Fallbacks**: Cache frequent LLM responses (e.g., FAQ answers) or reroute to cheaper models during provider outages.

4. **Real-Time AI Application Scaling**

   - **Chatbots & Virtual Agents**: Power low-latency conversational interfaces with streaming support for token-by-token responses.
   - **Data Enrichment Pipelines**: Augment APIs with AI—e.g., auto-summarize user reviews or translate product descriptions on-the-fly.

5. **Hybrid/Multi-Cloud AI Deployment**

   - **Unified Control Plane**: Manage on-prem LLMs (e.g., Llama 3) alongside cloud APIs (OpenAI, Azure) with consistent policy enforcement.

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
