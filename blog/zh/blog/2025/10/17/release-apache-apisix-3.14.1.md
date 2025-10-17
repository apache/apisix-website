---
title: "Apache APISIX 3.14.1 正式发布"
authors:
  - name: "Ashish Tiwari"
    title: "Author"
    url: "https://github.com/Revolyssup"
    image_url: "https://github.com/Revolyssup.png"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://github.com/kayx23.png"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: Apache APISIX 3.14.1 版本于 2025 年 10 月 17 日发布。该版本带来一则修复。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.14.1 版本已经发布。该版本带来一则修复以改善用户体验。

<!--truncate-->

## 修复

### Prometheus 工作进程中的端口冲突

修复了 Prometheus 服务器在工作进程中运行时，有时由于端口冲突而无法启动的问题。此修复启用了 Prometheus 服务器的端口复用功能，即使在重启期间也能确保可靠启动。

更多信息，请参阅 [PR #12667](https://github.com/apache/apisix/pull/12667)。

## 其他更新

* 添加跳过已禁用插件的架构检查时的警告日志 (PR [#12655](https://github.com/apache/apisix/pull/12655))

## 更新日志

此版本的完整更新列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3141)。
