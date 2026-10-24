# What Is an AI Gateway? Concept and Core Features

> Learn how an AI gateway manages LLM traffic with provider integrations, model routing, token limits, security, semantic caching, and observability.

Source: https://apisix.apache.org/blog/2025/03/06/what-is-an-ai-gateway/

An AI gateway is a traffic control layer between applications and model providers. It gives teams a shared endpoint for applying provider access, routing, token limits, prompt processing, and telemetry to large language model (LLM) requests. The [Apache APISIX AI Gateway](/ai-gateway/) implements these controls with open-source gateway plugins.

<!--truncate-->

## Why AI Traffic Needs Gateway Controls

AI applications often call more than one hosted or self-managed model. They may stream responses, consume usage measured in tokens, and need different routing or retry policies from ordinary web APIs. Without a gateway, each application must implement provider credentials, endpoint selection, limits, and logging independently.

An AI gateway places these common traffic concerns on the request path between an authorized application and one or more model endpoints. It does not replace the application or the model. Instead, it applies explicitly configured policies before forwarding a request and records information available at the gateway layer.

![APISIX AI gateway architecture](https://static.api7.ai/uploads/2025/08/01/KvjMKKx2_apisix-ai-gateway-architecture.webp)

## Core AI Gateway Capabilities

### Provider Access and Request Transformation

Different model providers expose different endpoints, authentication methods, and request formats. A gateway can present a stable application-facing endpoint while adapting requests for supported providers.

The Apache APISIX [`ai-proxy`](https://apisix.apache.org/docs/apisix/plugins/ai-proxy/) plugin supports documented providers and OpenAI-compatible endpoints. This lets applications send model requests through APISIX without embedding every provider endpoint in application code. Provider support still depends on the plugin configuration and the compatibility of the selected upstream service.

### Multi-Model Routing, Retries, and Fallback

When an application uses multiple model instances, the gateway can distribute traffic according to a configured policy. The APISIX [`ai-proxy-multi`](https://apisix.apache.org/docs/apisix/plugins/ai-proxy-multi/) plugin supports weighted round robin, consistent hashing, bounded retries, fallback strategies, and optional health checks.

These controls can reduce the amount of provider-specific failover logic in applications. They do not guarantee uninterrupted service: availability still depends on healthy upstream models, correct retry limits, network conditions, and the chosen fallback policy.

![AI Proxy](https://static.api7.ai/uploads/2025/08/01/TmTsNypy_ai-proxy-multi-workflow.webp)

### Token-Based Usage Limits

Request counts alone do not describe LLM usage. A short completion and a long completion can have very different token consumption. Token-aware limits allow teams to place a usage boundary in front of model providers.

The APISIX [`ai-rate-limiting`](https://apisix.apache.org/docs/apisix/plugins/ai-rate-limiting/) plugin tracks token consumption and can use local or Redis-backed counters. Provider-reported usage may be recorded after the response, so concurrent requests can overshoot a fixed window; treat this as a usage limit rather than a prepaid hard budget. Pricing, budgets, and billing reconciliation remain responsibilities of external systems. See the [shared Redis token quota cookbook](/cookbooks/redis-shared-token-quota/) for the documented behavior.

Semantic caching is an optional, release- and provider-specific optimization rather than a universal gateway capability. In current Apache APISIX documentation, semantic matching is limited to plain-text OpenAI Chat requests; tool calls and multimodal inputs are not supported. See the [Redis AI cache cookbook](/cookbooks/redis-ai-cache/) for the supported flow and isolation considerations.

### Prompt and Content Processing

AI gateways can modify or inspect request and response content through separate, purpose-specific controls:

- [`ai-prompt-template`](https://apisix.apache.org/docs/apisix/plugins/ai-prompt-template/) applies predefined prompt templates.
- [`ai-prompt-decorator`](https://apisix.apache.org/docs/apisix/plugins/ai-prompt-decorator/) adds configured content before or after a prompt.
- [`ai-prompt-guard`](https://apisix.apache.org/docs/apisix/plugins/ai-prompt-guard/) allows or denies prompts using configured regular-expression patterns.
- [`ai-aws-content-moderation`](https://apisix.apache.org/docs/apisix/plugins/ai-aws-content-moderation/) and [`ai-aliyun-content-moderation`](https://apisix.apache.org/docs/apisix/plugins/ai-aliyun-content-moderation/) integrate with their documented provider-specific moderation services.

These plugins provide specific controls, not a complete security or compliance guarantee. Teams still need application authorization, data classification, secrets management, provider governance, and human review where required. For a broader defense-in-depth checklist, see [API gateway security best practices](/learning-center/api-gateway-security/).

### Retrieval-Augmented Generation

Retrieval-augmented generation (RAG) adds retrieved context to a model request. The APISIX [`ai-rag`](https://apisix.apache.org/docs/apisix/plugins/ai-rag/) plugin documents a flow using Azure OpenAI embeddings and Azure AI Search. It can centralize that supported retrieval step at the gateway, but it does not by itself evaluate factual accuracy or eliminate hallucinations.

### Gateway-Level Observability

When AI proxy logging is enabled, APISIX can record model, request duration, prompt and response token counts, and time to first token. Existing logging and observability plugins can then export gateway data to the team's monitoring stack.

Gateway telemetry covers traffic that passes through APISIX. It complements rather than replaces application traces, model-quality evaluation, user feedback, and provider-side monitoring.

## What an AI Gateway Does Not Own

The boundary matters because several adjacent responsibilities are often grouped under the term "AI gateway." A gateway can protect and route network traffic, but the surrounding application stack remains responsible for:

- authenticating end users and enforcing business-level authorization;
- selecting tools and deciding when an agent should call them;
- storing conversation and workflow state;
- orchestrating multi-step agent behavior;
- evaluating answer quality, safety, or factual correctness;
- defining budgets, chargeback rules, and business approvals.

Keeping these responsibilities explicit prevents a gateway policy from being mistaken for an application or model guarantee.

## When to Use an AI Gateway

An AI gateway is most useful when several applications share model providers or when teams need consistent traffic controls across AI workloads. Common signals include:

- provider credentials and endpoints are duplicated across applications;
- the same token limits or logging rules must be applied to multiple teams;
- applications need a configured fallback path across model instances;
- hosted and OpenAI-compatible self-managed endpoints must share one access layer;
- API and AI traffic should use the same gateway operations and observability stack.

A single prototype that calls one provider may not need a dedicated gateway immediately. The value grows as the number of applications, providers, environments, and shared policies increases.

## AI Gateway and API Gateway Relationship

An AI gateway and an API gateway overlap in routing, authentication, rate limiting, resilience, and observability. AI gateways add controls that reflect model traffic, such as token-based limits, model-provider request transformation, prompt processing, and LLM usage summaries.

Apache APISIX uses the same open-source gateway to handle general API traffic and configured AI traffic. Teams can therefore add AI-specific plugins without introducing a separate network layer solely for model calls. For a direct capability comparison, see [AI Gateway vs API Gateway](/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/).

## Conclusion

An AI gateway centralizes network-level controls for traffic between applications and model providers. Its practical value is not autonomous decision-making, but consistent provider access, routing, token limits, prompt processing, resilience policies, and gateway telemetry.

Apache APISIX provides these controls through documented open-source plugins while leaving application authorization, agent orchestration, workflow state, and model evaluation in the systems designed to own them.
