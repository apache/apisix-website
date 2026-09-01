---
title: "2026 Monthly Report (August 01 - August 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2026/09/01/fnMEaJFl_2026-aug-monthly-report-cover-en.webp
---

> Recently, we've introduced and updated some new features, including advanced LDAP and OIDC authentication, stronger encryption and upstream TLS verification, faster and more resilient AI traffic, and richer traffic governance and observability. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From August 1st to August 31st, 13 contributors made 117 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2026/09/01/N8c2DgwP_2026-aug-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2026/09/01/xxM9t0jy_2026-aug-new-contributors.webp)

## Feature Highlights

Here are the key updates from this month, grouped by capability area.

### Authentication and Credential Protection

#### 1. Add the `ldap-auth-advanced` Plugin for Core Authentication

PR: https://github.com/apache/apisix/pull/13762

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR adds the `ldap-auth-advanced` plugin with LDAP search-then-bind, service-account or anonymous search, `user_dn` Consumer association, LDAPS/StartTLS, and protection against LDAP filter injection. It also upgrades `lua-resty-ldap` so `tls_verify: true` performs actual certificate verification and separates authentication failures from directory or transport errors.

#### 2. Support PAR and DPoP Client Options in `openid-connect`

PR: https://github.com/apache/apisix/pull/13649

Contributor: [kevinlzw](https://github.com/kevinlzw)

This PR exposes OAuth 2.0 Pushed Authorization Requests, DPoP proof generation for token and userinfo requests, and client assertion algorithm and audience options through the `openid-connect` plugin. The new settings are opt-in, DPoP private keys are encrypted in etcd, and existing configurations retain their previous behavior.

#### 3. Hide LDAP Credentials from Upstreams

PR: https://github.com/apache/apisix/pull/13832

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds a `hide_credentials` option to `ldap-auth`, allowing APISIX to remove the LDAP Basic Authentication header before proxying a request upstream. The option defaults to `false` for backward compatibility while helping operators avoid exposing reusable organization-wide credentials to backend services.

### Encryption and Upstream Security

#### 4. Support AES-256 Keys in the Encryption Keyring

PR: https://github.com/apache/apisix/pull/13756

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR lets APISIX data encryption use either 16-byte AES-128 keys or 32-byte AES-256 keys and rejects unsupported key lengths. A keyring can contain both sizes, enabling operators to rotate from AES-128 to AES-256 without losing access to data encrypted with an older key.

#### 5. Verify Upstream Certificates Against Configurable CAs

PR: https://github.com/apache/apisix/pull/13863

Contributor: [nic-6443](https://github.com/nic-6443)

This PR makes `upstream.tls.verify` enforce certificate verification for HTTPS and gRPCS upstreams and introduces `upstream.tls.ca_certs` for per-upstream trust anchors. Leaving `verify` unset preserves the existing NGINX configuration behavior, while operators can now explicitly validate private or custom-CA upstreams.

### AI Gateway Efficiency and Resilience

#### 6. Select Which Request Content AWS Moderation Checks

PR: https://github.com/apache/apisix/pull/13773

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds `request_check_roles` and `request_check_mode` to `ai-aws-content-moderation`, so operators can choose which user, tool, and system content to moderate and whether to inspect all turns or only the latest relevant block. The defaults preserve the previous coverage for user, tool, and system messages, but assistant messages previously included by the generic extractor are no longer moderated. Selective checks can avoid repeatedly scoring and billing for conversation history.

#### 7. Send LLM Requests Through `ngx_http_ffi_client`

PR: https://github.com/apache/apisix/pull/13778

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR makes the NGINX C-based `ngx_http_ffi_client` the default transport for outbound requests from `ai-proxy`, `ai-proxy-multi`, and `ai-request-rewrite`, reducing HTTP client CPU overhead. Operators can explicitly select the previous `lua-resty-http` transport, and both clients continue to honor APISIX's resolver, streaming, keepalive, and error-handling behavior.

#### 8. Configure Status-Based AI Fallbacks

PR: https://github.com/apache/apisix/pull/13852

Contributor: [nic-6443](https://github.com/nic-6443)

This PR lets operators configure additional upstream HTTP statuses, such as 401 for an expired API key or 402 for exhausted quota, to trigger an in-flight `ai-proxy-multi` fallback. Retries remain bounded by the existing retry settings, and responses keep their previous behavior when no additional status is configured.

### Traffic Governance and Observability

#### 9. Add Stream Connection and Bandwidth Metrics

PR: https://github.com/apache/apisix/pull/13796

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds Prometheus metrics for active TCP and UDP connections, stream session outcomes, and bandwidth in both directions. Shared-memory counters update while sessions remain open, while a new session reason distinguishes clean closes from timeouts, resets, and plugin rejections that previously appeared as the same status.

#### 10. Rate Limit GraphQL Requests by Query Cost

PR: https://github.com/apache/apisix/pull/13840

Contributor: [AlinsRan](https://github.com/AlinsRan)

This PR adds `complexity` and `node_quantifier` cost strategies to `graphql-limit-count`, allowing quotas to reflect query width, fan-out, pagination arguments, and per-field weights instead of only nesting depth. Service-scoped cost decorations, schema introspection, `max_cost`, and `score_factor` provide a configurable cost model, while `depth` remains the backward-compatible default.

#### 11. Report Responses to Chaitin SafeLine WAF

PR: https://github.com/apache/apisix/pull/13763

Contributor: [blaisewang](https://github.com/blaisewang)

This PR allows `chaitin-waf` to report response status, headers, and a configurable amount of body content to SafeLine for detecting data leaks and successful exploit output. Reporting runs asynchronously after the client response, remains advisory rather than blocking, and skips responses whose content types are configured as binary or otherwise ignored.

## Conclusion

The Apache APISIX [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) offer extensive documentation, tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
