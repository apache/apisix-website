---
title: "2026 Monthly Report (April 01 - April 30)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: TODO_COVER_IMAGE_EN
---

> Recently, we've introduced and updated some new features, including support for AWS Bedrock in the `ai-proxy` plugin, native Anthropic Messages API protocol support, and OpenAI Responses API (`/v1/responses`) support. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From April 1st to April 30th, 17 contributors made 129 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](TODO_CONTRIBUTOR_LIST_IMAGE)

![New Contributors List](TODO_NEW_CONTRIBUTORS_IMAGE)

## Feature Highlights

### 1. Support AWS Bedrock in `ai-proxy` Plugin

PR: https://github.com/apache/apisix/pull/13249

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds AWS Bedrock as a supported provider in the `ai-proxy` plugin. Users can now route AI requests to models hosted on AWS Bedrock using the same unified interface provided by the `ai-proxy` plugin, expanding the range of supported AI platforms alongside existing providers like OpenAI and Anthropic.

### 2. Add Native Anthropic Messages API Protocol Support

PR: https://github.com/apache/apisix/pull/13181

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds native support for the Anthropic Messages API protocol in the `ai-proxy` plugin. Previously, Anthropic requests were translated through an OpenAI-compatible format. Now users can send requests using the native Anthropic Messages API format directly, giving more flexibility and better compatibility with Anthropic-specific features.

### 3. Add OpenAI Responses API (`/v1/responses`) Support

PR: https://github.com/apache/apisix/pull/13186

Contributor: [nic-6443](https://github.com/nic-6443)

This PR adds support for the OpenAI Responses API endpoint (`/v1/responses`) in the `ai-proxy` plugin. This allows users to proxy requests to the newer OpenAI Responses API, which provides stateful, multi-turn conversation capabilities, keeping APISIX up to date with the latest OpenAI API offerings.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
