---
title: "Apache APISIX 3.6.1 正式发布"
authors:
  - name: "Ashish Tiwari"
    title: "Author"
    url: "https://github.com/Revolyssup"
    image_url: "https://avatars.githubusercontent.com/u/43276904?v=4"
  - name: "Traky Deng"
    title: "Technical Writer"
    url: "https://github.com/kayx23"
    image_url: "https://avatars.githubusercontent.com/u/39619599?v=4"
keywords:
- Apache APISIX
- API Gateway
- API Management Platform
- New Release
- Cloud Native
description: Apache APISIX 3.6.1 版本于 2023 年 10 月 17 日发布。该版本带来了一系列修复。
tags: [Community]
---

> 我们很高兴地宣布 Apache APISIX 3.6.1 版本已经发布，带来一系列修复，持续优化用户体验。

<!--truncate-->

## 修复

- 当上游更改时保持运行状况检查目标状态（[PR #10312](https://github.com/apache/apisix/pull/10312)）
- 修复并优化上游模式中的 TLS ([PR #10269](https://github.com/apache/apisix/pull/10269))
- 在 `plugin_config` 架构中添加名称字段以保持一致性（[PR #10315](https://github.com/apache/apisix/pull/10315)）
- 更新 `cors` 插件的架构描述（[PR #10314](https://github.com/apache/apisix/pull/10314)）
- 对 `get_target_status` 失败使用警告日志记录级别（[PR #10156](https://github.com/apache/apisix/pull/10156)）

## 变更日志

有关此版本中更改的完整列表，请参阅 [变更日志](https://github.com/apache/apisix/blob/master/CHANGELOG.md#361)。
