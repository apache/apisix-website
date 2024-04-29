---
title: "Apache APISIX 3.8.1 正式发布"
authors:
  - name: "Yuansheng Wang"
    title: "Author"
    url: "https://github.com/membphis"
    image_url: "https://github.com/membphis.png"
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
description: Apache APISIX 3.8.1 版本于 2024 年 4 月 29 日发布。该版本带来一则修复。
tags: [Community]
---

我们很高兴发布 Apache APISIX 3.8.1。该版本带来一则修复以改善用户体验。

<!--truncate-->

## 修复

### 修复 `forward-auth` 插件超时

当客户端请求使用 POST 并且身份验证服务 API 需要 GET 时，修复 `forward-auth` 插件超时。该错误是由于 APISIX 将带有 `Content-Type` 和 `Expect` 等标头的 POST 请求转发到需要 GET 的身份验证服务 API 引起的。

在最新的修复中，如果插件的 `request_method` 配置设置为 POST，APISIX 仅添加 POST 请求标头。

详情请见 [PR #11021](https://github.com/apache/apisix/pull/11021)。

## 变更日志

点击[这里](https://github.com/apache/apisix/blob/release/3.9/CHANGELOG.md#391)查看变更日志。
