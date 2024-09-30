---
title: "Monthly Report (September 01 - September 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/09/30/VW6dlYsu_sep-cover-en.png
---

> We have recently made some additions and improvements to specific features within Apache APISIX. The main improvements include the addition of `attach-consumer-label`, `ai-prompt-decorator`, and `ai-proxy` plugins, as well as support for GCP Secret Manager, among other enhancements. For detailed information, please read the monthly report.
<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From September 1 to September 30, 10 contributors made 21 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](https://static.apiseven.com/uploads/2024/09/30/LeOeANHk_Group%20427319848.png)

![Apache APISIX New Contributors](https://static.apiseven.com/uploads/2024/09/30/BjHKV34C_sep-new-contributors.png)

## Recent Feature Highlights

1. [Add `attach-consumer-label` Plugin](https://github.com/apache/apisix/pull/11604)（Contributor: [dspo](https://github.com/dspo))

The `attach-consumer-label` plugin attaches custom consumer-related labels for upstream services to differentiate between consumers and implement additional logic.

2. [Add `ai-prompt-decorator` Plugin](https://github.com/apache/apisix/pull/11515)（Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

The `ai-prompt-decorator` plugin simplifies access to LLM providers, such as OpenAI and Anthropic, and their models by appending or prepending prompts into the request.

3. [Add `ai-proxy` Plugin](https://github.com/apache/apisix/pull/11499)（Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek))

The `ai-proxy` plugin simplifies access to LLM providers and models by defining a standard request format that allows key fields in plugin configuration to be embedded into the request.

4. [Add Support of GCP Secret Manager](https://github.com/apache/apisix/pull/11436)（Contributor: [HuanXin-Chen](https://github.com/HuanXin-Chen))

This PR added the `gcp.lua` file to the original secret module, allowing users to store their secret information on GCP using the same reference method as before.

5. [Add credential and Related Admin APIs](https://github.com/apache/apisix/pull/11601)（Contributor: [dspo](https://github.com/dspo))

Credential is an entity used to store authentication configurations associated with consumers. A consumer can be associated with one or more credentials from a list of authentication plugins, including `basic-auth`, `hmac-auth`, `jwt-auth`, and `key-auth`.

6. [Refactor hmac-auth Plugin](https://github.com/apache/apisix/pull/11581)（Contributor: [Revolyssup](https://github.com/Revolyssup))

This PR refactors the HMAC authentication plugin to improve its usability and compliance with RFC standards.

7. [Remove JWT Token Issuing](https://github.com/apache/apisix/pull/11597)（Contributor: [dspo](https://github.com/dspo))

Removing the capability for the API gateway to issue JWT tokens enhances security by centralizing token management within dedicated authentication servers.

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
