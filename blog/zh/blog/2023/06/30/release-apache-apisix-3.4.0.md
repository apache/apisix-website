---
title: "Release Apache APISIX 3.4.0"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://avatars.githubusercontent.com/u/79972061?v=4"
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
description: Apache APISIX 3.4.0 版本于 2023 年 6 月 30 日发布。此版本新增了一个适用于 Grafana Loki 的插件，允许在路由级别上建立 mTLS 连接，并进行性能优化，不断提升 APISIX 的用户体验。
tags: [Community]
---

我们很高兴地介绍 Apache APISIX 3.4.0，它带来了令人兴奋的新功能和性能改进。

<!--truncate-->

此版本提供了一个新的插件 `loki-logger`，可将日志转发到 [Grafana Loki](https://grafana.com/oss/loki/)，并允许在路由级别上建立 mTLS 连接。此外，此版本还还引入了许多新的特性，旨在优化对 APISIX 的使用体验。

## 新功能

### 使用 `loki-logger` 插件支持与 Grafana Loki 集成

`loki-logger` 插件被用于将日志转发到 [Grafana Loki](https://grafana.com/oss/loki/) 进行分析和存储。

启用插件后，APISIX 会将请求上下文信息序列化为[JSON 格式的 Log 条目](https://grafana.com/docs/loki/latest/api/#push-log-entries-to-loki)，并将其提交到批处理队列。当队列条件满足时数据将被推送到 Grafana Loki。

例如，您可以在特定路由上启用 `loki-logger` 插件：

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "loki-logger": {
            "endpoint_addrs" : ["http://127.0.0.1:3100"]
        }
    },
    "upstream": {
       "nodes": {
           "127.0.0.1:1980": 1
       },
       "type": "roundrobin"
    },
    "uri": "/hello"
}'
```

如果成功，APISIX 日志将被转发到运行在 `http://127.0.0.1:3100` 上的 Loki。

有关该插件的更多信息，请参见 `loki-logger` [插件文档](https://github.com/apache/apisix/blob/release/3.4/docs/en/latest/plugins/loki-logger.md)。

有关此功能的 PR 请参见 [#9399](https://github.com/apache/apisix/pull/9399)。

### 支持路由级别的 mTLS

支持在路由级别配置 mTLS。Admin API SSL 对象现提供一个新的配置选项 `client.skip_mtls_uri_regex`。用户可以在此选项中指定一个 URI 列表白名单（支持正则表达式）。对于这些 URI，APISIX 跳过客户端证书的验证。

例如，您可以配置如下的路由级别的 mTLS：

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/*",
    "upstream": {
        "nodes": {
            "httpbin.org": 1
        }
    }
}'
```

```shell
curl http://127.0.0.1:9180/apisix/admin/ssls/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "cert": "'"$(path/to/certs/mtls_server.crt)"'",
    "key": "'"$(path/to/certs/mtls_server.key)"'",
    "snis": [
        "*.apisix.dev"
    ],
    "client": {
        "ca": "'"$(path/to/certs/mtls_ca.crt)"'",
        "depth": 10,
        "skip_mtls_uri_regex": [
            "/anything.*"
        ]
    }
}'
```

如果请求的 URI 在 `skip_mtls_uri_regex` 列表中，则不会检查客户端证书。请注意，如果客户端证书丢失或无效，则关联的 SNI 的其他 URI 将在 SSL 握手阶段得到 HTTP 400 响应而不是警报错误。

有关详细示例，请参见 [教程：基于 URI 的正则表达式匹配来绕过 mTLS](https://github.com/apache/apisix/blob/release/3.4/docs/zh/latest/tutorials/client-to-apisix-mtls.md#基于对-uri-正则表达式匹配绕过-mtls)。

有关此功能的 PR 请参见 [#9322](https://github.com/apache/apisix/pull/9322)。

## 其他更新

* 支持单个 HTTP 长连接 watch etcd 的全部资源，该优化降低了访问 etcd 的资源损耗，使 watch 性能可达到 与 gRPC 一样的效果（[PR ＃9456](https://github.com/apache/apisix/pull/9456)）。
* 支持在 `proxy_rewrite` 插件中使用多个正则表达式模式（[PR ＃9194](https://github.com/apache/apisix/pull/9194)）。
* 允许用户在 `prometheus` 插件中自定义配置 `DEFAULT_BUCKETS（`[PR #9673](https://github.com/apache/apisix/pull/9673)）。

## 更新日志

有关此版本中包含的所有新功能和错误修复的完整列表，请参见 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md).
