---
title: "Apache APISIX 3.9.0 正式发布"
authors:
  - name: "Abhishek Choudhary"
    title: "Author"
    url: "https://github.com/shreemaan-abhishek"
    image_url: "https://github.com/shreemaan-abhishek.png"
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
description: Apache APISIX 3.9.0 版本于 2024 年 3 月 29 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.9.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

这个新版本添加了许多新功能，包括客户端和 APISIX 之间对 HTTP/3 的支持、向 Control API 添加插件重新加载端点、Prometheus 指标过期的配置等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 开启 HTTP/2

在早期版本中，可以通过在配置文件中将 `apisix.node_listen.enable_http2` 和 `apisix.ssl.listen.enable_http2` 设置为 `true` 来启用 HTTP/2。 这些选项在此版本中已被弃用。 从 3.9.0 开始，应当使用 `apisix.enable_http2` 启用 HTTP/2：

```yaml title="config.yaml"
apisix:
  enable_http2: true
```

详情请参考 [PR #11032](https://github.com/apache/apisix/pull/11032)。

### 整合 `keyring` 和 `key_encrypt_salt` 配置项

在早期版本中，`key_encrypt_salt` 和 `keyring` 是两个分开的配置选项，都以类似的方式用于数据加密和解密。 此版本删除了`key_encrypt_salt`，只需配置 `keyring`：

```yaml title="config.yaml"
apisix:
  data_encryption:
    keyring:
      - qeddd145sfvddff3
```

详情请参考 [PR #10771](https://github.com/apache/apisix/pull/10771)。

## 新功能

### 支持客户端和 APISIX 之间的 HTTP/3

支持客户端和 APISIX 之间的 HTTP/3 作为实验性功能。尚不支持具有上游服务的 HTTP/3。

HTTP/3 需要 TLS v1.3。要在 APISIX 中的给定端口上启用 HTTP/3，请更新配置文件，如下所示：

```yaml title="config.yaml"
apisix:
  ssl:
    listen:
      - port: 9443
        enable_http3: true
```

接下来，在客户端和 APISIX 之间配置 TLS 证书：

```shell
curl "http://127.0.0.1:9180/apisix/admin/ssls" -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "id": "tls-client-ssl",
    "sni": "example.com",
    "cert": "'"${server_cert}"'",
    "key": "'"${server_key}"'"
  }'
 ```

详情请参考 [PR #10989](https://github.com/apache/apisix/pull/10989)，[PR #11010](https://github.com/apache/apisix/pull/11010)，和 [PR #11027](https://github.com/apache/apisix/pull/11027)。

### 将插件重新加载端点添加到 Control API

插件重新加载端点以前存在于 Admin API 中，用于热重新加载所有插件，现在已添加到 [Control API](https://apisix.apache.org/docs/apisix/next/control-api/#put-v1pluginsreload)，这样可以从控制平面调用插件重新加载：

```shell
curl "http://127.0.0.1:9090/v1/plugins/reload" -X PUT
```

为了兼容，Admin API 中的插件重新加载端点被保留。

详情请参考 [PR #10905](https://github.com/apache/apisix/pull/10905)。

### 支持在 `openid-connect` 插件中设置 session cookie 生命周期

您现在可以在 `openid-connect` 插件中配置 session cookie 生命周期，如下所示：

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT -d '
{
  "id": "auth-with-oidc",
  "uri":"/anything/*",
  "plugins": {
    "openid-connect": {
      "client_id": "'"$OIDC_CLIENT_ID"'",
      "client_secret": "'"$OIDC_CLIENT_SECRET"'",
      "discovery": "'"$OIDC_DISCOVERY"'",
      "session": {
        "secret": "6S8IO+Pydgb33LIor8T9ClER0T/sglFAjClFeAF3RsY=",
        "cookie" : {
          "lifetime": 86400
        }
      },
      "redirect_uri": "http://localhost:9080/anything/callback"
    }
  },
  "upstream":{
    "type":"roundrobin",
    "nodes":{
      "httpbin.org:80":1
    }
  }
}'
```

这是为了解决 access token 的生命周期长于 session cookie 生命周期的问题。

详情请参考 [PR #10919](https://github.com/apache/apisix/pull/10919)。

### 支持设置 Prometheus 指标的过期时间

现在，您可以在 Prometheus 指标变为非活动状态后设置过期时间（以秒为单位），以减少资源消耗：

```yaml title="config.yaml"
plugin_attr:
  prometheus:
    expire: 0    # time in seconds. 0 means the metrics will not expire.
```

详情请参考 [PR #10869](https://github.com/apache/apisix/pull/10869)。

### 在 `limit-req` 和 `limit-conn` 插件中支持 `redis` 和 `redis-cluster`

在 `limit-req` 和 `limit-conn` 插件中支持 `redis` 和 `redis-cluster` 策略，以便速率限制计数器可以在 APISIX 实例之间共享。

详情请参考 [PR #10874](https://github.com/apache/apisix/pull/10874) 和 [PR #10866](https://github.com/apache/apisix/pull/10866)。

### 支持 OCSP Stapling

新增 `ocsp-stapling` 插件，以支持 OCSP stapling。

详情请参考 [插件文档](https://github.com/apache/apisix/blob/master/docs/zh/latest/plugins/ocsp-stapling.md) 和 [PR #10817](https://github.com/apache/apisix/pull/10817)。

### 支持 HTTP 与 Dubbo 的转换

新增 `http-dubbo` 插件，以支持 HTTP 与 Dubbo 之间的转换。

详情请参考 [PR #10703](https://github.com/apache/apisix/pull/10703)。

## 其他更新

- 在 Kubernetes 服务发现中支持 EndpointSlice ([PR #10916](https://github.com/apache/apisix/pull/10916))
- 在 `grpc-web` 插件中支持 `cors_allow_headers` 属性，以允许跨域资源访问（[PR #10904](https://github.com/apache/apisix/pull/10904)）
- 允许在 `forward-auth` 插件中自定义错误响应代码（[PR #10898](https://github.com/apache/apisix/pull/10898)）
- 支持在日志插件中包含请求和响应主体（[PR #10888](https://github.com/apache/apisix/pull/10888)）
- 支持日志插件中的压缩响应（[PR #10884](https://github.com/apache/apisix/pull/10884)）
- 在 `mocking` 插件中 `response_headers` 支持内置变量（[PR #10872](https://github.com/apache/apisix/pull/10872)）
- 修复了不必要的 YAML 配置重新加载（[PR #9065](https://github.com/apache/apisix/pull/9065)）
- 修复 `jwt-auth` 插件中 payload 被恶意篡改的可能性（[PR #10982](https://github.com/apache/apisix/pull/10982)）

## 变更日志

有关此版本中更改的完整列表，请参阅 [变更日志](https://github.com/apache/apisix/blob/master/CHANGELOG.md#390)。
