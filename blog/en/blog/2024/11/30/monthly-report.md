---
title: "Monthly Report (October 01 - November 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/11/29/skKTqZaH_nov-cover-en.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The main improvements include the addition of `ai-content-moderation` and `ai-rag` plugins, and a total request panel in the Grafana dashboard among other enhancements. For detailed information, please read the monthly report.
<!--truncate-->
## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From October 1 to November 30, 9 contributors made 29 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2024/11/29/7z0d7q0r_contributors-nov.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2024/11/29/53aNHiqa_nov-new-contributors.png)

## Recent Feature Highlights

1. [Refactor `google-cloud-logging` Plugin](https://github.com/apache/apisix/pull/11596) (Contributor: [HuanXin-Chen](https://github.com/HuanXin-Chen))

This PR changed `scope` into `scopes` according to OAuth2/OIDC rules. It also replaced `google-cloud-logging/oauth.lua` with `utils/google-cloud-oauth.lua`.

2. [Add `ai-content-moderation` Plugin](https://github.com/apache/apisix/pull/11541) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

The `ai-prompt-decorator` plugin simplifies access to LLM providers, such as OpenAI and Anthropic, and their models by appending or prepending prompts into the request.

3. [Add `ai-rag` Plugin](https://github.com/apache/apisix/pull/11568)（Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

Implement the ai-rag plugin that uses RAG (Retrieval Augmented Generation), to return information about untrained events/facts from LLMs.

4. [Add Total Request Panel in Grafana Dashboard](https://github.com/apache/apisix/pull/11692) (Contributor: [Revolyssup](https://github.com/Revolyssup))

As the Grafana dashboard only has panels for RPS per status code and RPS per service/route, this PR also adds a total RPS panel for the overview of RPS changes.

5. [Use `setmetatable` to Set Hidden Variables without Effecting Serialisation in `body-transformer` Plugin](https://github.com/apache/apisix/pull/11770) (Contributor: [Revolyssup](https://github.com/Revolyssup))

Users hope to directly use the decoded body in the template of `body-transformer` plugin, modify its fields, and then encode it again.

6. [Support configuring `key_claim_name` in `jwt-auth` Plugin](https://github.com/apache/apisix/pull/11772) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

Configuring key_claim_name in the JWT plugin is essential for specifying which claim in the JWT contains the key that identifies the secret used for validating the token.

7. [Suppress Error Log in Multi-Authentication When One Authentication Succeeds](https://github.com/apache/apisix/pull/11775) (Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

When using multiple authentication plugins, even if one authentication plugin passes verification while others fail, an error log is still recorded, which can confuse the user. This PR fixes the logic so that if any one of the authentication plugins passes, no error log will be recorded.

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
