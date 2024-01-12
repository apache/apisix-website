---
title: "Apache APISIX 3.8.0 正式发布"
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
description: Apache APISIX 3.8.0 版本于 2024 年 1 月 15 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.8.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

该版本添加了许多新功能，包括支持 JWE 解密、brotli 压缩、路由和服务上的多种身份验证方法、`openid-connect` 插件中所需的范围等等。

## 新功能

### 支持使用 `jwe-decrypt` 插件解密请求中的 JWE

支持使用新的 `jwe-decrypt` 插件对请求中的 [JWE](https://datatracker.ietf.org/doc/html/rfc7516) 授权标头进行解密。

该插件为 JWE 加密创建一个内部端点 `/apisix/plugin/jwe/encrypt`，可以使用 `public-api` 插件公开该端点。您还将在 Consumers 中配置解密密钥。

有关更多信息，请参阅 [PR #10252](https://github.com/apache/apisix/pull/10252) 和 [插件文档](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/jwe-decrypt.md)。

### 支持路由和服务多种认证方式

新插件 `multi-auth` 插件支持路由和服务的多种身份验证方法。该插件迭代在 `auth_plugins` 属性中配置的身份验证插件列表。它允许使用不同身份验证方法的消费者共享相同的路由或服务。

例如，您可以让一个消费者使用基本身份验证：

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "username": "consumer1",
    "plugins": {
      "basic-auth": {
        "username": "consumer1",
        "password": "consumer1_pwd"
      }
    }
  }'
```

另一个使用密钥身份验证的消费者：

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "username": "consumer2",
    "plugins": {
      "key-auth": {
        "key": "consumer2_s3cr3t"
      }
    }
  }'
```

两个消费者使用各自的身份验证方法成功身份验证后都可以访问以下路由：

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "methods": ["GET"],
    "uri": "/get",
    "plugins": {
      "multi-auth":{
        "auth_plugins":[
          {
            "basic-auth":{ }
          },
          {
            "key-auth":{
              "query":"apikey",
              "hide_credentials":true,
              "header":"apikey"
             }
          }
        ]
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "httpbin.org": 1
      }
    }
  }'
```

有关更多信息，请参阅 [PR #10482](https://github.com/apache/apisix/pull/10482) 和 [插件文档](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/multi-auth.md)。

### 支持在 `response-rewrite` 插件中 `filters.regex` 和压缩数据配合使用

支持在 `response-rewrite` 插件中 `filters.regex` 与 brotli 或 gzip 压缩的数据数据配合使用。

有关更多信息，请参阅 [PR #10588](https://github.com/apache/apisix/pull/10588) 和 [PR #10637](https://github.com/apache/apisix/pull/10637)。

### 支持在 `openid-connect` 插件中指定所需的 scopes

支持在 `required_scopes` 属性中指定 `openid-connect` 插件中所需的 scopes。配置后，插件将检查内省端点返回的范围中是否存在所有必需的 scopes。

有关更多信息，请参阅 [PR #10493](https://github.com/apache/apisix/pull/10493)。

### 在 `cors` 插件中支持 `Timing-Allow-Origin` 标头

`cors` 插件中提供了新属性 `timing_allow_origins` 和 `timing_allow_origins_by_regex` ，以支持按来源选择性查看计时。

有关更多信息，请参阅 [PR #9365](https://github.com/apache/apisix/pull/9365)。

### 支持 brotli 压缩算法

新插件 `brotli` 支持 brotli 压缩算法。该插件动态设置 [NGINX 中的 brotli](https://github.com/google/ngx_brotli) 的行为。在使用该插件之前，您应该首先构建并安装 brotli 共享库。

有关更多信息，请参阅 [PR #10515](https://github.com/apache/apisix/pull/10515) 和 [插件文档](https://github.com/apache/apisix/blob/master/docs/en/latest/plugins/brotli.md)。

### 扩展 `body-transformer` 插件中的参数解析能力

支持解析 `application/x-www-form-urlencoded` 内容类型的 POST 请求参数和 `body-transformer` 插件中的 GET 请求的 URI 参数。

有关更多信息，请参阅 [PR #10496](https://github.com/apache/apisix/pull/10496)。

### 支持在 `limit-count` 插件属性中使用变量来敏感信息

支持在 `limit-count` 插件属性中使用变量来配置敏感信息。例如，您可以将 `redis_password` 保存到环境变量中，并将插件中的值配置为 `$ENV://REDIS_PASSWORD`。

有关更多信息，请参阅 [PR #10597](https://github.com/apache/apisix/pull/10597)。

## 其他更新

- 使用 lua-resty-events 模块提高性能（[PR #10550](https://github.com/apache/apisix/pull/10550) 和 [PR #10558](https://github.com/apache/apisix/pull/10558)）
- 将 OpenSSL 1.1.1 升级到 OpenSSL 3（[PR #10724](https://github.com/apache/apisix/pull/10724)）
- 将 `limit-count` 插件中所要求的 `redis_cluster_nodes` 数量从 2 个减少到 1 个（[PR #10612](https://github.com/apache/apisix/pull/10612)）
- 当上游节点为数组类型时，允许端口为可选字段（[PR #10477](https://github.com/apache/apisix/pull/10477)）
- 修复使用 `limit-count` 插件时消费者之间的计数器共享（[PR #10540](https://github.com/apache/apisix/pull/10540)）
- 为 `openid-connect` 插件添加 `redirect_after_logout_uri` 属性，在未提供 `end_session_endpoint` 时使用（[PR #10653](https://github.com/apache/apisix/pull/10653)）
- 修复使用 `limit-count` 插件时消费者之间的计数器共享（[PR #10540](https://github.com/apache/apisix/pull/10540)）
- 修复 POST 请求正文太大时的 `forward-auth` 插件 403 错误 ([PR #10589](https://github.com/apache/apisix/pull/10589))

## 变更日志

有关此版本中更改的完整列表，请参阅 [变更日志](https://github.com/apache/apisix/blob/master/CHANGELOG.md#380)。
