---
title: LocalAI
slug: localai
description: Route OpenAI-compatible chat traffic from APISIX 3.18 to a private LocalAI deployment, with separate client and upstream authentication.
category: ai-runtime
method: ai-proxy openai-compatible provider
verification: validation-in-progress
owner: Apache APISIX community
apisix_version: 3.18.0
external_version: LocalAI 4.7.1
protocols:
  - HTTP
  - SSE
reviewed_at: "2026-08-28"
evidence_url: https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-providers/openai-compatible.lua
---

LocalAI serves models on your own infrastructure through OpenAI-compatible APIs. Apache APISIX 3.18 can send Chat Completions requests to LocalAI with the `ai-proxy` plugin while keeping client authentication, upstream credentials, limits, and logging at the gateway.

<div class="architecture-flow" aria-label="APISIX and LocalAI architecture">
  <span>OpenAI-compatible client</span><span>→</span><span>Apache APISIX</span><span>→</span><span>LocalAI</span>
</div>

LocalAI now includes an [Apache APISIX reverse-proxy example](https://github.com/mudler/LocalAI/blob/d85577ff5c6f7cbc5a49c13ab5013a1ecfabf26c/docs/content/advanced/reverse-proxy-tls.md#apache-apisix-configuration). That example is a transparent proxy. The related Cookbook on this site uses the APISIX 3.18 `openai-compatible` provider instead.

## How the connection works

| Setting | Behavior |
|---|---|
| Endpoint | Set `override.endpoint` to the LocalAI origin, for example `http://localai:8080`. APISIX selects `/v1/chat/completions` for a Chat Completions body. Do not set the endpoint to `http://localai:8080/v1`: an endpoint path is used as-is and would suppress the provider path. |
| Model | Set `options.model` to pin one installed LocalAI model and override the client's value. Omit it when clients may select among allowed LocalAI model aliases. |
| Authentication | Authenticate clients separately, for example with `key-auth`. Configure the LocalAI credential in `ai-proxy.auth.header.Authorization`; that configured value replaces a client `Authorization` header before the upstream request. |
| Streaming | A request with `stream: true` is handled as SSE. APISIX adds the OpenAI usage-stream option and forwards the LocalAI stream to the client. |

The `openai-compatible` provider also defines OpenAI Responses and Embeddings paths. This page only covers Chat Completions; test the other LocalAI endpoints separately before enabling them.

## Keep the surface small

Expose only the Chat Completions Route needed by applications. `ai-proxy` does not turn the Route into a general LocalAI proxy, so `/v1/models`, the Web UI, model installation, and LocalAI management endpoints remain unavailable unless you create separate Routes for them.

Keep LocalAI on a private network reachable by APISIX. Store its authorization value in an APISIX-supported secret reference, keep payload logging disabled unless you have a reviewed data-handling policy, and use TLS with certificate verification when LocalAI is reached across an untrusted network. Because `ai-proxy` forwards other client headers, remove `Cookie`, `x-api-key`, and `xi-api-key` on Routes that use a dedicated LocalAI identity. LocalAI's legacy `LOCALAI_API_KEY` grants full administrative access without role separation; prefer a least-privilege user API key when LocalAI authentication is enabled.

## Verification status

The merged LocalAI guide and [APISIX documentation PR #13770](https://github.com/apache/apisix/pull/13770) cover a transparent APISIX proxy. The latter records a real run with APISIX 3.17.0 and LocalAI 4.7.1. The APISIX 3.18 `openai-compatible` configuration on this site has been checked against the [3.18.0 provider source](https://github.com/apache/apisix/blob/0796d9c2cbedb1f8bf8194292ff526599f4fde20/apisix/plugins/ai-providers/openai-compatible.lua), but it has not yet completed the same clean runtime test. The status therefore remains **Validation in progress**.

## References

- [APISIX `ai-proxy` documentation](/docs/apisix/plugins/ai-proxy/)
- [LocalAI 4.7.1 quickstart](https://github.com/mudler/LocalAI/blob/b224c96db6f4b87306a33a808650bfce63b12588/docs/content/getting-started/quickstart.md)
- [LocalAI 4.7.1 authentication](https://github.com/mudler/LocalAI/blob/b224c96db6f4b87306a33a808650bfce63b12588/docs/content/features/authentication.md)
- [Merged LocalAI APISIX documentation PR](https://github.com/mudler/LocalAI/pull/11294)
