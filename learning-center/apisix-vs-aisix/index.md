# Apache APISIX vs AISIX: General-Purpose vs AI-Native Gateway

> Compare Apache APISIX and AISIX across architecture, API and AI traffic, model routing, guardrails, observability, deployment, and when to use one or both.

Source: https://apisix.apache.org/learning-center/apisix-vs-aisix/

Apache APISIX and AISIX can both govern LLM traffic, but they are designed around different operating models. **Apache APISIX is a general-purpose API gateway that extends to AI traffic through plugins. AISIX is an AI-native gateway built around models, provider credentials, caller keys, MCP servers, agents, and AI policies.** APISIX is the more natural fit for a unified API platform; AISIX is the more focused fit for a dedicated AI platform.

AISIX is a separate open-source project maintained by API7.ai. It is not an Apache Software Foundation project or an official successor to Apache APISIX. This comparison covers the open-source capabilities of [Apache APISIX 3.17.0](https://apisix.apache.org/blog/2026/06/15/release-apache-apisix-3.17.0/) and [AISIX v0.5.0](https://github.com/api7/aisix/releases/tag/v0.5.0), verified on **July 27, 2026**. AISIX Cloud is an optional managed control plane; its organization UI, governance, and budget-management capabilities are not included in this open-source comparison.

## Overview

[Apache APISIX AI Gateway](/ai-gateway/) adds LLM proxying, token-aware limits, prompt processing, content moderation, and other AI features to a mature gateway for HTTP, gRPC, WebSocket, TCP/UDP, and microservice traffic. It can also serve Kubernetes ingress traffic through [Apache APISIX Ingress Controller](https://apisix.apache.org/docs/ingress-controller/overview/). Teams operate AI routes through the same Routes, Services, Consumers, Upstreams, plugins, and observability stack used for the rest of their APIs.

[AISIX](https://github.com/api7/aisix) is a dedicated AI gateway written in Rust and distributed as a single static binary. Its [resource model](https://docs.api7.ai/ai-gateway/models/resource-model) starts with providers, provider credentials, model aliases, caller API keys, routing models, and AI policies. Applications call stable model-facing APIs while platform teams can change the underlying provider, routing, limits, guardrails, caching, and telemetry.

The choice is therefore less about which gateway has more features overall and more about where AI traffic belongs operationally:

- Choose **APISIX** when one gateway should manage traditional APIs, microservices, and AI traffic.
- Choose **AISIX** when model, MCP, and agent traffic needs a dedicated platform boundary and AI-specific resources.
- Choose **both** only when separating the public API edge from the internal AI platform justifies another hop and operational layer.

## Architecture Comparison

### Apache APISIX Architecture

APISIX uses an NGINX and LuaJIT data plane with a plugin-based architecture. Its [deployment modes](https://apisix.apache.org/docs/apisix/deployment-modes/) include etcd-backed dynamic configuration and standalone YAML or JSON configuration. More than 100 plugins cover authentication, security, traffic control, transformations, logging, tracing, service discovery, serverless integrations, and AI workloads.

AI functions compose with these existing gateway resources. A single route can combine [`ai-proxy-multi`](https://apisix.apache.org/docs/apisix/plugins/ai-proxy-multi/) with consumer authentication, token rate limiting, prompt guards, request transformation, and OpenTelemetry. This keeps the operating model consistent when AI is one part of a larger API estate.

The tradeoff is that AI behavior is assembled through routes and plugins. Semantic routers, ensemble models, and a central inventory of model aliases are not documented as first-class APISIX resources in 3.17.0.

### AISIX Architecture

AISIX uses a Rust data plane and an AI-specific configuration model. Provider credentials are separated from client-facing model aliases, allowing application teams to use stable model names while platform owners change backends and failover behavior.

For dynamic self-hosted operation, AISIX stores gateway resources in etcd and manages them through its Admin API. It can also load the complete resource set from a standalone `resources.yaml` file without Admin API writes, as documented in the [v0.4.0 standalone release](https://github.com/api7/aisix/releases/tag/v0.4.0). The single binary simplifies packaging, but it should not be read as meaning every deployment is dependency-free.

AISIX exposes OpenAI-compatible APIs and a first-class Anthropic Messages API. Its [adapter reference](https://docs.api7.ai/ai-gateway/providers/adapters) documents five upstream protocol families: OpenAI-compatible services, Anthropic, Amazon Bedrock, Google Vertex AI, and Azure OpenAI. The OpenAI-compatible adapter also connects to services such as DeepSeek, Mistral, vLLM, and Ollama; this is not the same as 100+ separate native provider implementations.

Its narrower scope makes model routing, usage policy, caching, and GenAI telemetry more direct to operate. The tradeoff is that AISIX is newer and does not aim to cover APISIX's broader ingress, general API, service discovery, or multi-protocol responsibilities.

## AI Routing and Traffic Governance

APISIX approaches AI routing as an extension of general gateway traffic management. The `ai-proxy-multi` plugin can balance requests across multiple LLM targets, perform health checks, retry failed requests, and fall back between providers. [`ai-rate-limiting`](https://apisix.apache.org/docs/apisix/plugins/ai-rate-limiting/) governs token usage by route, service, consumer, consumer group, or custom variables. Prompt guards, templates, decorators, content moderation, AI RAG, and LLM-powered request rewriting can be added as separate plugins.

AISIX makes model selection and AI governance first-class. In addition to weighted routing, retry budgets, timeouts, cooldowns, and failover, it provides [semantic routing](https://docs.api7.ai/ai-gateway/routing/semantic-routing) that selects a model by matching a request to route examples. [Ensemble models](https://docs.api7.ai/ai-gateway/routing/ensemble-models) can query multiple panel models and use a judge model to synthesize one answer. In self-hosted AISIX, [request, token, and concurrency limits](https://docs.api7.ai/ai-gateway/traffic-controls/rate-limits) can apply to caller keys and models.

AISIX also covers traffic beyond model inference. Its [MCP Gateway](https://docs.api7.ai/ai-gateway/mcp-gateway/overview) keeps upstream tool credentials behind the gateway and applies caller access, limits, guardrails, and telemetry. Its [Agent Gateway](https://docs.api7.ai/ai-gateway/agent-gateway/overview) fronts registered A2A agents with caller access controls and usage reporting. AISIX v0.5.0 adds a typed `/v1/videos` flow, automatic Anthropic prompt caching, local token estimation when providers omit usage, and fixes that make streaming retries and per-target traffic controls apply consistently. AISIX also documents [exact response caching](https://docs.api7.ai/ai-gateway/traffic-controls/caching) backed by memory or Redis and [AI-oriented metrics, logs, and usage exporters](https://docs.api7.ai/ai-gateway/observability/metrics-and-logs).

These specialized options have real costs. Semantic routing adds an embedding step, while ensembles multiply provider usage and usually increase latency. APISIX's composable plugin model is broader, but teams may need to coordinate several resources to implement one AI governance workflow.

## Feature Comparison

| Feature | Apache APISIX | AISIX |
|---------|---------------|-------|
| Category | General-purpose API and AI gateway | AI-native gateway for model, MCP, and A2A traffic |
| Primary resources | Routes, Services, Consumers, Upstreams, and plugins | Providers, provider keys, model aliases, caller keys, MCP servers, A2A agents, and AI policies |
| Traffic scope | HTTP, gRPC, WebSocket, TCP/UDP, microservices, ingress through APISIX Ingress Controller, and LLMs | OpenAI-compatible and Anthropic APIs, multimodal model endpoints, MCP tools, and A2A agents |
| Deployment | NGINX/LuaJIT; etcd-backed dynamic mode or standalone YAML/JSON | Rust single binary; etcd-backed dynamic mode or standalone `resources.yaml` |
| Provider access | Multi-provider proxying through AI plugins | Five native adapter families plus OpenAI-compatible providers |
| Resilience | Multi-LLM balancing, health checks, retries, and fallback | Weighted routing, retry budgets, timeouts, cooldowns, and failover |
| Specialized routing | Extensible route and traffic plugins; semantic routing is not documented as a first-class resource | Semantic routes and ensemble models are first-class model types |
| Guardrails and processing | Prompt guards, templates, decorators, moderation, RAG, and request rewriting | [Built-in and external input/output guardrails](https://docs.api7.ai/ai-gateway/traffic-controls/guardrails/behavior) for model and MCP traffic |
| Usage governance | Token limits by route, service, consumer, group, or variable | Request, token, and concurrency limits for caller keys and models |
| Caching and observability | General caching and observability plugins with LLM token and timing fields | Exact-match memory or Redis caching, cost-saved telemetry, Prometheus, and GenAI-oriented OTLP spans |
| Extensibility | 100+ plugins across API, security, observability, and AI use cases | Focused AI policy and model resource surface |
| License and governance | Apache License 2.0; Apache Software Foundation top-level project | Apache License 2.0; independent project maintained by API7.ai |

## When to Choose Apache APISIX

- **You already operate APISIX.** Adding AI plugins avoids another data plane, deployment lifecycle, failure domain, and telemetry path.
- **One gateway should govern API and AI traffic.** The same platform can apply identity, rate limits, observability, and traffic policy to REST, gRPC, WebSocket, TCP/UDP, and LLM workloads.
- **Protocol and plugin breadth matter.** APISIX covers far more than model proxying, including authentication, security, transformations, logging, service discovery, and Kubernetes ingress through its Ingress Controller.
- **A longer project history and vendor-neutral governance matter.** APISIX has a broader production and contributor history under the Apache Software Foundation than the newer AISIX project.
- **Gateway-side prompt processing is important.** APISIX documents prompt templates and decorators, prompt guards, content moderation, request rewriting, and RAG plugins.

APISIX remains a full gateway platform even if the immediate workload is LLM inference. Its model-facing configuration can also span multiple routes, consumers, and plugins rather than one AI-specific administrative surface.

## When to Choose AISIX

- **AI is the primary workload.** The gateway and administrative resources use model, provider, MCP, and agent concepts directly instead of generic routes.
- **Applications need stable model aliases.** Platform owners can change providers, credentials, routing, and failover without changing the client-facing model name.
- **Routing by intent is required.** Semantic routing can select a model from examples and a fallback.
- **Multi-model synthesis is useful.** Ensemble models can call several models concurrently and return a judge model's synthesized answer.
- **AI needs its own governance boundary.** Provider keys, caller keys, limits, guardrails, caching, and GenAI telemetry remain separate from the general API edge.
- **MCP tools or A2A agents need gateway controls.** AISIX can keep upstream credentials private while applying caller access and telemetry to these AI-native protocols.

AISIX has a smaller community and shorter deployment history. It also does not provide APISIX's general API plugin breadth or full ingress and multi-protocol scope. Its most specialized routing modes add provider cost and latency that should be benchmarked with real prompts and streaming behavior.

## Working Together

The gateways can be layered when separate teams own the public API edge and internal AI platform:

`Clients → Apache APISIX → AISIX → model providers`

In this design, APISIX owns TLS termination, external authentication, WAF and network policy, traditional APIs, and coarse tenant controls. AISIX owns provider credentials, model aliases, semantic or ensemble routing, model-level limits, exact response caching, and AI-specific usage telemetry.

The boundary must be explicit. Avoid unbounded retries at both layers because one failed request can expand into a larger retry tree. Assign one gateway as the authority for hard token quotas, guardrails, and prompt logging to prevent conflicting errors, double-counted usage, or unnecessary prompt exposure.

Two gateways add a network hop, another component to upgrade, and another failure surface. Use both only when team separation, credential isolation, or AI-specific governance justifies that operational cost. Benchmark with production-like streaming, time to first token, concurrency, provider failure, and the complete guardrail and plugin chain rather than comparing unrelated published throughput numbers.

## Conclusion

Choose Apache APISIX when AI calls belong inside a broader API platform and the team values protocol coverage, plugin extensibility, and established ASF governance. Choose AISIX when AI is the platform boundary and model aliases, provider credentials, specialized routing, MCP/A2A access, and GenAI telemetry should be first-class resources. Use both when those responsibilities belong to different teams and the separation is worth the additional hop.

To evaluate APISIX, explore the [APISIX AI Gateway](/ai-gateway/) and [Getting Started guide](https://apisix.apache.org/docs/apisix/getting-started/README/). To evaluate AISIX, use its [open-source repository](https://github.com/api7/aisix) and [product documentation](https://docs.api7.ai/ai-gateway/).
