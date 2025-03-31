---
title: "March Report (March 01 - March 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.api7.ai/uploads/2025/03/28/226yQ3dc_march-monthly-report-cover-en.webp
---

> We have recently added some new features within Apache APISIX, including adding supports for `ai-prompt-guard`, `ai-rate-limiting`, and `ai-request-rewrite` plugins, and some new/enhanced features like adding JWT Audience Validator in `openid-connect` Plugin. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From March 1st to March 31, 14 contributors made 50 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.api7.ai/uploads/2025/03/31/fDYTi9Vu_march-contributor-list.webp)

![New Contributors List](https://static.api7.ai/uploads/2025/03/31/NB9qpu7Q_mar-new-contributors.webp)

## Good First Issue

### Improve Schema of `chaitin-waf` Plugin

Issue: https://github.com/apache/apisix/issues/12098

Consider the comments of [PR #12029](https://github.com/apache/apisix/pull/12029#discussion_r2018012041) for `chaitin-waf` plugin. The value `nil` of `enum` can be removed since default value is already set to `nil`.

## Feature Highlights

### 1. Add `ai-prompt-guard` Plugin

PR: https://github.com/apache/apisix/pull/12008

Contributor: [Revolyssup](https://github.com/Revolyssup)

The `ai-prompt-guard` plugin safeguards your AI endpoints by inspecting and validating incoming prompt messages. It checks the content of requests against user-defined allowed and denied patterns to ensure that only approved inputs are processed. Based on its configuration, the plugin can either examine just the latest message or the entire conversation history, and it can be set to check prompts from all roles or only from end users.

### 2. Add `ai-rate-limiting` Plugin

PR: https://github.com/apache/apisix/pull/12037

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

The `ai-rate-limiting` plugin enforces token-based rate limiting for requests sent to LLM services. It helps manage API usage by controlling the number of tokens consumed within a specified time frame, ensuring fair resource allocation and preventing excessive load on the service. It is often used with `ai-proxy-multi` plugin.

### 3. Add `ai-request-rewrite` Plugin

PR: https://github.com/apache/apisix/pull/12036

Contributor: [LiteSun](https://github.com/LiteSun)

The `ai-request-rewrite` plugin leverages predefined prompts and AI services to intelligently modify client requests, enabling AI-powered content transformation before forwarding to upstream services.

### 4. Support Proxying OpenAI-Compatible LLMs

PR: https://github.com/apache/apisix/pull/12004

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR introduces a new provider, `openai-compatible`, that can proxy requests to OpenAI-compatible LLMs.

### 5. Store JWT in the Request Context in `jwt-auth` Plugin

PR: https://github.com/apache/apisix/pull/11675

Contributor: [mikyll](https://github.com/mikyll)

The `jwt-auth` plugin now has a new parameter: `store_in_ctx`. It allows the configuration of when enabled (default is false), it stores the validated JWT object in the request context.

This feature is especially beneficial for two reasons:

- The JWT can be removed from request attributes when `hide_credential = true`, this offers a secure alternative for token passing without exposure.

- It prevents custom plugins from duplicated code, for example, retrieve and parse JWT objects.

### 6. Add JWT Audience Validator in `openid-connect` Plugin

PR: https://github.com/apache/apisix/pull/11987

Contributor: [bzp2010](https://github.com/bzp2010)

Add JWT audience authentication to the `openid-connect` plugin to:

- Allow the configuration of audience claim to enforce validation of JWT Audience Validator.

- Asserts that it should be equal to or contain the `client_id`  when the `client_id` is a string or an array respectively, to comply with the OIDC specification requirements; otherwise, rejects the request.

- Allows customization of the claim name.

Directly implemented in plugin code since jwt-validators only supports local verification, not the Introspection API. Features are disabled by default for compatibility. Users can enable them as needed.

### 7. Set Default Value of `ssl_trusted_certificate` to `system`

PR: https://github.com/apache/apisix/pull/11993

Contributor: [Revolyssup](https://github.com/Revolyssup)

When testing AI plugins, we found that `ssl_trusted_certificate` must be set to `system`; otherwise, APISIX reports "unable to get local issuer certificate" when accessing external AI services.

This PR:

- Moves schema validation into `read_yaml_conf` for consistency, with `local_conf` now just calling `read_yaml_conf` internally and adding caching.

- Ensures schema validation happens first when reading YAML files, setting the default trusted certificate value to `system` before overrides (including replacing `system` with certificate paths).

- Removes support for combining multiple certificates.

### 8. Add `valid_issuers` Field in `openid-connect` Plugin

PR: https://github.com/apache/apisix/pull/12002

Contributor: [Revolyssup](https://github.com/Revolyssup)

Adds a field `valid_issuers` when JWKs is used to verify the issuer of the JWT, which whitelists the vetted issuers of the JWT. When not passed by the user, the issuer returned by the discovery endpoint will be used. If both are missing, the issuer will not be validated.

### 9. Implement Rate-Limiting based on Fallback Strategy in `ai-proxy-multi` Plugin

PR: https://github.com/apache/apisix/pull/12047

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

In a previous refactor PR, the fallback strategy was removed to accommodate the `ai-rate-limiting` plugin. This PR introduces a fallback strategy that fits well with the rate-limiting construction in the `ai-proxy-multi` plugin.

### 10. Support Embeddings API in `ai-proxy` Plugin

PR: https://github.com/apache/apisix/pull/12062

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds support for proxying to the embedding models in the `ai-proxy` and `ai-proxy-multi` Plugins.

### 11. Support `404` Response Code in `ip-restriction` Plugin

PR: https://github.com/apache/apisix/pull/12076

Contributor: [papdaniel](https://github.com/papdaniel)

Support 404 response code to hide the route from blacklisted/whitelisted sources.

### 12. Extend `chaitin-waf` Plugin Functionalities

PR: https://github.com/apache/apisix/pull/12029

Contributor: [AlyHKafoury](https://github.com/AlyHKafoury)

This PR adds a configuration for the `mode` attribute, adds a configuration to enable/disable the real client IP, and uses `lrucache` to cache the var expression result.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.

## Recommended Blogs

- [Comprehensive Overview of APISIX AI Gateway Features](https://apisix.apache.org/blog/2025/02/24/apisix-ai-gateway-features/)
  
  This article will provide an in-depth look at the AI gateway features of the current and upcoming versions of APISIX. As a multifunctional API and AI gateway, Apache APISIX offers efficient and secure LLM API calls for AI applications.
  
- [What Is an AI Gateway? Concept and Core Features](https://apisix.apache.org/blog/2025/03/06/what-is-an-ai-gateway/)

  This article will explore how AI gateway address pressing API gateway concerns. Let's discover how AI gateways unlock the full potential of AI, turning challenges into opportunities for growth.

- [What Is an AI Gateway: Differences from API Gateway](https://apisix.apache.org/blog/2025/03/21/ai-gateway-vs-api-gateway-differences-explained/)

  *"The future isn't AI gateways—it's API gateways that speak AI."* This blog explores AI gateways, their differences from API gateways, and why evolved solutions like Apache APISIX AI Gateway are shaping the future.
