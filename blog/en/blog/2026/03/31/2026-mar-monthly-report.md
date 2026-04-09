---
title: "2026 Monthly Report (March 01 - March 31)"
keywords: ["Apache APISIX", "API Gateway", "Monthly Report", "Contributor"]
description: Our monthly Apache APISIX community report generates insights into the project's monthly developments. The reports provide a pathway into the Apache APISIX community, ensuring that you stay well-informed and actively involved.
tags: [Community]
image: TODO_COVER_IMAGE_EN
---

> Recently, we've introduced and updated some new features, including rejecting unknown plugin configurations in standalone mode, adding max/resp_body_bytes attributes to logger plugins, and supporting secrets in the clickhouse-logger plugin. For more details, please read this month's newsletter.

<!--truncate-->

## Introduction

From its inception, the Apache APISIX project has embraced the ethos of open-source community collaboration, propelling it into the ranks of the most active global open-source API gateway projects. The proverbial wisdom of 'teamwork makes the dream work' rings true in our way and is made possible by the collective effort of our community.

From March 1st to March 31st, 14 contributors made 32 commits to Apache APISIX. We sincerely appreciate your contributions to Apache APISIX.

## Contributor Statistics

![Apache APISIX Contributors List](TODO_CONTRIBUTOR_LIST_IMAGE)

![New Contributors List](TODO_NEW_CONTRIBUTORS_IMAGE)

## Good First Issue

### Issue #13108

**Link**: https://github.com/apache/apisix/issues/13108

**Description**: The `config.yaml.example` file is missing some AI plugins (`ai-request-rewrite` and `ai-aliyun-content-moderation`) and has incorrect priority ordering in the AI plugins section. For example, `ai-prompt-guard` (priority 1072) is listed after `ai-prompt-template` (priority 1071), which breaks the expected descending priority order.

**Expected Behavior**: All AI plugins registered in `apisix/cli/config.lua` should be listed in `config.yaml.example`, and they should be sorted in descending order by priority.

## Feature Highlights

### 1. Reject Configurations with Unknown Plugins in Standalone Mode

PR: https://github.com/apache/apisix/pull/13046

Contributor: [shreemaan-abhishek](https://github.com/shreemaan-abhishek)

This PR adds validation in APISIX's standalone mode to reject configurations that reference unknown or unregistered plugins. Previously, configuring an unknown plugin in `apisix.yaml` would not trigger any error, potentially leading to silent misconfigurations. Now APISIX will explicitly reject such configurations, helping users catch typos or misconfigured plugin names early.

### 2. Add `max_body_bytes` and `resp_body_bytes` Attributes to Logger Plugins

PR: https://github.com/apache/apisix/pull/13034

Contributor: [janiussyafiq](https://github.com/janiussyafiq)

This PR synchronizes the `max_body_bytes` and `resp_body_bytes` attributes across multiple logger plugins, including `http-logger`, `skywalking-logger`, `tcp-logger`, `rocketmq-logger`, `udp-logger`, `clickhouse-logger`, `syslog`, `sls-logger`, `file-logger`, `loggly`, `elasticsearch-logger`, `tencent-cloud-cls`, and `loki-logger`. These attributes allow users to control the maximum size of request and response bodies captured in logs, improving consistency across all logger plugins.

### 3. Support Secrets in `clickhouse-logger` Plugin

PR: https://github.com/apache/apisix/pull/12951

Contributor: [vlad-vinogradov-47](https://github.com/vlad-vinogradov-47)

This PR adds secrets management support to the `clickhouse-logger` plugin, allowing users to store sensitive credential information (such as username and password) in environment variables or HashiCorp Vault instead of hardcoding them in the plugin configuration. This enhances security by keeping credentials out of configuration files.

## Conclusion

The [official website](https://apisix.apache.org/) and [GitHub Issues](https://github.com/apache/apisix/issues) of Apache APISIX provide a wealth of documentation of tutorials, and real-world use cases. If you encounter any issues, you can refer to the documentation, search for keywords in Issues, or participate in discussions on Issues to share your ideas and practical experiences.
