---
title: "2026 Monthly Report (May 01 - May 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: TODO_COVER_IMAGE_EN
---

> Recently, we've introduced and updated some new features, including new authentication plugins for Feishu and DingTalk, GraphQL request cost limiting, OpenAPI request validation, safer proxy caching, and expanded AI proxy protocol support. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From May 1st to May 31st, 16 contributors made 74 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](TODO_CONTRIBUTOR_LIST_IMAGE)

![New Contributors List](TODO_NEW_CONTRIBUTORS_IMAGE)

## Feature Highlights

### 1. Default `hmac-auth` Signed Headers to `date`

PR: https://github.com/apache/apisix/pull/13388

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR updates the `hmac-auth` plugin so `signed_headers` defaults to `["date"]`. By binding the request `Date` header into the HMAC signature unless users explicitly opt out, APISIX better aligns the default behavior with its clock-skew protection and reduces the risk of stale signed requests.

### 2. Add `feishu-auth` Plugin

PR: https://github.com/apache/apisix/pull/13382

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `feishu-auth` plugin, enabling browser-based API authentication through the Feishu (Lark) OAuth 2.0 authorization code flow. It helps teams protect internal APIs and developer portals with their existing Feishu identity system instead of building a custom authentication layer in each upstream service.

### 3. Add `graphql-limit-count` Plugin

PR: https://github.com/apache/apisix/pull/13372

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR introduces the `graphql-limit-count` plugin, which limits GraphQL traffic based on query AST depth within a configured time window. It gives operators a better control surface for GraphQL APIs, where deeply nested queries can be much more expensive than ordinary request-count based rate limiting suggests.

### 4. Add `error-page` Plugin

PR: https://github.com/apache/apisix/pull/13380

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `error-page` plugin for customizing APISIX-generated HTTP error responses, such as route-not-found or upstream-unavailable responses. Operators can configure response bodies and content types through plugin metadata, improving the user-facing experience for gateway-level failures.

### 5. Add `dingtalk-auth` Plugin

PR: https://github.com/apache/apisix/pull/13381

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `dingtalk-auth` plugin, integrating DingTalk OAuth 2.0 authentication into APISIX routes. The plugin verifies users through DingTalk and stores the result in an encrypted cookie session, reducing repeated calls to DingTalk APIs during a user's session.

### 6. Support Absolute Callback URLs in `cas-auth`

PR: https://github.com/apache/apisix/pull/13413

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR allows `cas-auth` users to configure `cas_callback_uri` as an absolute URL. This is useful in deployments where APISIX sits behind proxies or external hostnames, because the CAS `service` URL can now be set explicitly instead of being derived from the incoming request host.

### 7. Honor `Vary` Header in `proxy-cache` Memory Strategy

PR: https://github.com/apache/apisix/pull/13376

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR teaches the in-memory `proxy-cache` strategy to respect upstream `Vary` response headers. Requests that differ by headers such as `Accept-Encoding` can now be cached as separate variants, bringing memory-cache behavior closer to the disk strategy and preventing accidental cache collisions.

### 8. Sign Request URI Cookie and Tighten Cookie Attributes in `cas-auth`

PR: https://github.com/apache/apisix/pull/13331

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR strengthens `cas-auth` by signing the `CAS_REQUEST_URI` cookie with HMAC-SHA256 and validating it on callback with a constant-time comparison. It also validates the recovered redirect target as a same-origin path, helping prevent unsafe redirects when the cookie is missing, malformed, or tampered with.

### 9. Support Configurable Request JSON Library

PR: https://github.com/apache/apisix/pull/13386

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds an APISIX-level JSON library selector for request body parsing and AI upstream request body encoding. Users can choose between `cjson`, `simdjson`, and experimental `qjson`, making it easier to balance compatibility and performance for large JSON request bodies.

### 10. Add `acl` Plugin

PR: https://github.com/apache/apisix/pull/13349

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR introduces the `acl` plugin, which provides label-based access control for API routes. Teams can use consumer labels or external attributes such as roles, teams, or subscription tiers to enforce access policies without writing custom plugins.

### 11. Add `data-mask` Plugin

PR: https://github.com/apache/apisix/pull/13347

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `data-mask` plugin to mask or redact sensitive fields from request query parameters, headers, and bodies before they appear in access logs or logger plugin outputs. It helps reduce exposure of credentials, tokens, personal data, and payment information in observability pipelines.

### 12. Add Safer `proxy-cache` Options

PR: https://github.com/apache/apisix/pull/13350

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds `consumer_isolation` and `cache_set_cookie` options to the `proxy-cache` plugin. By isolating cache entries per consumer by default and refusing to cache `Set-Cookie` responses unless explicitly enabled, APISIX makes shared caching safer for authenticated or personalized traffic.

### 13. Add `exit-transformer` Plugin

PR: https://github.com/apache/apisix/pull/13343

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR introduces the `exit-transformer` plugin and extends APISIX response handling with an exit callback mechanism. Users can transform APISIX-generated exit responses, such as plugin rejections or route-not-found responses, using custom Lua functions before the response reaches the client.

### 14. Add `traffic-label` Plugin

PR: https://github.com/apache/apisix/pull/13342

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds the `traffic-label` plugin, which assigns configurable labels to requests using weighted random distribution rules. Labels can be written to request headers or APISIX variables, enabling traffic segmentation patterns such as experiments, routing hints, or policy-driven tagging.

### 15. Add `oas-validator` Plugin

PR: https://github.com/apache/apisix/pull/13344

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR introduces the `oas-validator` plugin for validating inbound HTTP requests against an OpenAPI Specification 3.x document before forwarding them upstream. Invalid requests can be rejected with a configurable status code, helping API providers enforce contracts at the gateway layer.

### 16. Support Bedrock ConverseStream Streaming in `ai-proxy`

PR: https://github.com/apache/apisix/pull/13307

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR extends the Bedrock provider in `ai-proxy` with ConverseStream support. APISIX can now route streaming Bedrock requests, parse AWS EventStream framing, and forward streaming model responses through the same provider abstraction used by other AI protocols.

### 17. Support Dynamic Indexes in `elasticsearch-logger`

PR: https://github.com/apache/apisix/pull/13334

Contributor: [nic-6443](https://github.com/nic-6443)

This PR enables dynamic index patterns in the `elasticsearch-logger` plugin using date/time placeholders and APISIX variables. Index names are resolved per request without mutating plugin configuration, allowing use cases such as daily index rotation or host-based log separation.

### 18. Rewrite Anthropic-to-OpenAI Converter with Whitelist Body Construction

PR: https://github.com/apache/apisix/pull/13321

Contributor: [nic-6443](https://github.com/nic-6443)

This PR rewrites the Anthropic Messages to OpenAI Chat Completions converter in `ai-proxy` to build outgoing request bodies from an explicit whitelist. The new approach avoids leaking unsupported Anthropic-specific fields to OpenAI-compatible upstreams and makes protocol translation more predictable.

### 19. Add Passthrough Protocol for Unrecognized AI API Formats

PR: https://github.com/apache/apisix/pull/13320

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds a passthrough protocol adapter to `ai-proxy` for non-empty JSON request bodies that do not match a known AI protocol. It allows APISIX to proxy OpenAI-compatible or custom endpoints such as image generation APIs without forcing every payload shape through a specialized parser.

## Good First Issues

The following open issue was labeled as `good first issue` in May. New contributors are welcome to take a look and join the Apache APISIX community:

- [docs: hmac-auth body validation example should sign the Digest header](https://github.com/apache/apisix/issues/13395)

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
