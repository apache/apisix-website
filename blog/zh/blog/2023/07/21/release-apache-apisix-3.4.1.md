---
title: "Apache APISIX 3.4.1 正式发布"
authors:
  - name: "Guohao Wang"
    title: "Author"
    url: "https://github.com/Sn0rt"
    image_url: "https://avatars.githubusercontent.com/u/2706161?v=4"
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
description: Apache APISIX 3.4.0 版本于 2023 年 7 月 21 日发布。该版本修复了 JWT 中一个安全漏洞。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.4.1 版本已经发布，其中包含了针对 JWT 的安全补丁。

<!--truncate-->

## 修复

### 升级 `lua-resty-jwt` 依赖版本

为了解决 APISIX `jwt-auth` 插件中身份验证绕过的安全风险，将 `lua-resty-jwt` 的依赖版本从 `0.2.4` 升级到 `0.2.5`。

该问题在 [issue #9809](https://github.com/apache/apisix/issues/9809) 中进行了报告，并在 [PR #9837](https://github.com/apache/apisix/pull/9837) 中得到修复。

## 更新日志

完整的更新日志请参见[这里](https://github.com/apache/apisix/blob/release/3.4/CHANGELOG.md#341)。
