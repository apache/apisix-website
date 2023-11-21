---
title: "Apache APISIX 3.7.0 正式发布"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
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
description: Apache APISIX 3.7.0 版本于 2023 年 11 月 21 日发布。该版本带来了一系列变更，新功能，和修复。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.7.0 版本已经发布，带来了一系列新功能、Bug 修复和相关用户体验优化。

<!--truncate-->

该新版本添加了许多新功能，包括对 Consul 服务发现的 ACL 令牌的支持、`openid-connect` 插件中的授权参数、Nacos AK/SK 身份验证等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 限制修改核心资源的创建时间和更新时间

在早期版本中，使用 Admin API 修改资源的 `create_time` 和 `update_time` 不受限制。这种行为是不必要的，而且容易产生风险。从 3.7.0 开始，用户将无法修改这些时间戳。

有关更多信息，请参阅[更改提案](https://lists.apache.org/thread/968kp7hd6zcg7ty2clomkbshmd53v71d) 和 [PR #10232](https://github.com/apache/apisix/pull/10232)。

### 从 SSL 模式中删除 `exptime`、`validity_start` 和 `validity_end` 属性

从 SSL 架构中删除 `exptime`、`validity_start` 和 `validity_end` 属性，因为这些信息现已存在于证书中。

有关更多信息，请参阅[更改提案](https://lists.apache.org/thread/8l4h8f6wcv482s0b7vt17do5z3g1y3o3) 和 [PR #10323](https://github.com/apache/apisix/pull/10323)。

### 更新 `opentelemetry` 插件属性以更好地遵循规范

将 `opentelemetry` 插件中的属性 `route` 替换为 `apisix.route_name`，将 `service` 替换为 `apisix.service_name`，以遵循 Span 名称的 OpenTelemetry 规范。

有关更多信息，请参阅 [PR #10393](https://github.com/apache/apisix/pull/10393)。

## 新功能

### 支持 Consul 发现的 ACL 令牌

使用 Consul 或 Consul KV 服务发现时支持 ACL 令牌。有关更多信息，请参阅 [PR #10278](https://github.com/apache/apisix/pull/10278)。

### 支持为流路由配置服务

支持在流路由中引用服务来配置上游。有关更多信息，请参阅 [PR #10298](https://github.com/apache/apisix/pull/10298)。

### 在 `openid-connect` 插件中支持授权参数

在 `openid-connect` 插件的 `authorization_params` 属性中支持额外的授权参数。有关更多信息，请参阅 [PR #10058](https://github.com/apache/apisix/pull/10058)。

### 支持在 `zipkin` 插件中设置变量

支持在 `zipkin` 插件中设置变量以在重写阶段公开span信息。有关更多信息，请参阅[文档](https://github.com/wizhuo/apisix/blob/master/docs/zh/latest/plugins/zipkin.md#如何使用变量) 和 [PR #10361](https://github.com/apache/apisix/pull/10361)。

### 支持 Nacos AK/SK 认证

支持 Nacos AK/SK 认证。访问密钥和秘密密钥可以在配置文件中配置如下：

```yaml title="config.yaml"
discovery:
  nacos:
    ...
    access_key: ""    # Nacos AccessKey ID
    secret_key: ""    # Nacos AccessKey Secret
```

有关更多信息，请参阅 [PR #10445](https://github.com/apache/apisix/pull/10445)。

## 其他更新

- 修复 POST 表单 `Content-Type` 附加字符集时 `post_arg_*` 变量匹配失败的问题 ([PR #10372](https://github.com/apache/apisix/pull/10372))
- 使用 `apisix-runtime` 作为默认 APISIX runtime（[PR #10415](https://github.com/apache/apisix/pull/10415) 和 [PR #10427](https://github.com/apache/apisix/pull/10427)）
- 使用 apisix secrets 添加 `authz-keycloak` 测试（[PR #10353](https://github.com/apache/apisix/pull/10353)）
- 当上游更改时保持运行状况检查目标状态（[PR #10312](https://github.com/apache/apisix/pull/10312) 和 [PR #10307](https://github.com/apache/apisix/pull/10307)）
- 修复由于 `log-rotate` 插件超时而导致的不完整日志压缩（[PR #8620](https://github.com/apache/apisix/pull/8620))

## 变更日志

有关此版本中更改的完整列表，请参阅 [变更日志](https://github.com/apache/apisix/blob/master/CHANGELOG.md#370)。
