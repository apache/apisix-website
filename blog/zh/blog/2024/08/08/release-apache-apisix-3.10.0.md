---
title: "Apache APISIX 3.10.0 正式发布"
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
description: Apache APISIX 3.10.0 版本于 2024 年 8 月 8 日发布。该版本带来了一系列新功能、修复、以及相关用户体验优化。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.10.0 版本已经发布，带来了一系列新功能、修复、以及相关用户体验优化。

<!--truncate-->

这个新版本增加了许多新功能，包括对 `openid-connect` 插件中的附加标头的支持、在 secrets manager 中存储 SSL 证书和密钥、自动生成 Admin API 密钥等。

此外，该版本还包含了一些重要的变更。如果您发现这些变更会对您的使用产生影响，请进行相应的计划升级。

## 重大变更

### 如未配置 Admin API 密钥则自动生成

默认 Admin API 密钥 `edd1c9f034335f136f87ad84b625c8f1` 现已删除。如果未配置自定义 Admin API 密钥，APISIX 将自动生成 Admin API 密钥，以提高安全性。

有关更多信息，请参阅 [PR #11080](https://github.com/apache/apisix/pull/11080)。

### 默认启用数据加密

`data_encryption.enable_encrypt_fields` 选项此前默认为 `true`，现在默认为 `true`，以增强数据安全性。这意味着默认情况下，敏感插件字段（在插件架构的 `encrypt_fields` 属性中定义）和 TLS 证书私钥现在已默认加密。

该配置仅适用于配置中心为 etcd 的情况。当配置中心为 YAML（即 standalone 模式）时，不会进行加密，以避免意外报错。

有关更多信息，请参阅 [PR #11076](https://github.com/apache/apisix/pull/11076)。

### 对更多敏感的插件字段进行加密

在 `encrypt_fields` 属性下对更多敏感的插件数据字段进行加密，当 `data_encryption.enable_encrypt_fields` 选项设置为 `true` 时生效。

有关更多信息，请参阅 [PR #11095](https://github.com/apache/apisix/pull/11095)。

### `kafka-logger` 插件设置默认最大请求和响应主体大小

`kafka-logger` 插件引入了最大请求和响应主体大小属性 `max_req_body_bytes` 和 `max_resp_body_bytes`。默认值设置为 524288 字节，即 512 KiB。

这有助于缓解启用 `include_req_body` 或 `include_resp_body` 且请求或响应主体非常大而导致 CPU 使用率过高的情况。

有关更多信息，请参阅 [PR #11133](https://github.com/apache/apisix/pull/11133)。

### 删除 `core.grpc` 模块

由于 `core.grpc` 模块在生产中不稳定，并且 APISIX 不再依赖它，因此此版本删除了该模块。

对于依赖 gRPC 模块实现自定义功能的用户，请相应规划。

有关更多信息，请参阅 [proposal](https://lists.apache.org/thread/05xvcbvty1txr1owx61vyktsmgs2pdd5) 和 [PR #11427](https://github.com/apache/apisix/pull/11427)。

## 新功能

### 在 `openid-connect` 插件中支持附加标头

在使用 `openid-connect` 插件时，您可以在 `introspection_addon_headers` 字段中将其他标头值附加到自省请求。

有关更多信息，请参阅 [PR #11090](https://github.com/apache/apisix/pull/11090)。

### 在没有 TLS 的情况下请求外部服务时在日志中打印警告消息

如果您在没有 TLS 的情况下请求外部服务，例如使用 `authz-casdoor` 插件，您现在应该会在错误日志中看到类似以下内容的警告消息：

```text
Using authz-casdoor endpoint_addr with no TLS is a security risk
Using authz-casdoor callback_url with no TLS is a security risk
```

有关更多信息，请参阅 [PR #11403](https://github.com/apache/apisix/pull/11403)。

### 支持在 secrets manager 中存储 SSL 证书和密钥

支持在机密管理器中的 SSL 资源上存储证书 `certs` 和私钥 `keys`。在早期版本中，只有 `cert` 和 `key` 支持机密管理器。

您现在可以配置 SSL 资源，如下所示：

```shell
curl "http://127.0.0.1:9180/apisix/admin/ssls" -X PUT -d '
{
  "id": "sample-ssl",
  "sni": "test.com",
  "cert": "$secret://vault/test/ssl/test.com.crt",
  "key": "$secret://vault/test/ssl/test.com.key",
  "certs": ["$secret://vault/test/ssl/test.com.crt"],
  "keys": ["$secret://vault/test/ssl/test.com.key"]
}'
```

有关更多信息，请参阅 [PR #11339](https://github.com/apache/apisix/pull/11339)。

### 支持 HashiCorp Vault namespace

支持在 SSL 资源中指定 HashiCorp Vault namespace，例如：

```shell
curl "http://127.0.0.1:9180/apisix/admin/ssls" -X PUT -d '
{
  "id": "sample-ssl",
  "sni": "test.com",
  "certs": "$secret://vault/test/ssl/test.com.crt",
  "keys": "$secret://vault/test/ssl/test.com.key"],
  "namespace": "apisix"
}'
```

有关更多信息，请参阅 [PR #11277](https://github.com/apache/apisix/pull/11277)。

### Control API 支持查看 K8s 服务发现的节点

Control API 现在提供了一个新端点 `/v1/discovery/kubernetes/dump`，用于查看 K8s 发现发现的节点。例如：

```shell
curl http://127.0.0.1:9090/v1/discovery/kubernetes/dump | jq
```

您将看到发现的节点信息：

```
{
  "endpoints": [
    {
      "endpoints": [
        {
          "value": "{\"https\":[{\"host\":\"172.18.164.170\",\"port\":6443,\"weight\":50},{\"host\":\"172.18.164.171\",\"port\":6443,\"weight\":50},{\"host\":\"172.18.164.172\",\"port\":6443,\"weight\":50}]}",
          "name": "default/kubernetes"
        },
        {
          "value": "{\"metrics\":[{\"host\":\"172.18.164.170\",\"port\":2379,\"weight\":50},{\"host\":\"172.18.164.171\",\"port\":2379,\"weight\":50},{\"host\":\"172.18.164.172\",\"port\":2379,\"weight\":50}]}",
          "name": "kube-system/etcd"
        },
        {
          "value": "{\"http-85\":[{\"host\":\"172.64.89.2\",\"port\":85,\"weight\":50}]}",
          "name": "test-ws/testing"
        }
      ],
      "id": "first"
    }
  ],
  "config": [
    {
      "default_weight": 50,
      "id": "first",
      "client": {
        "token": "xxx"
      },
      "service": {
        "host": "172.18.164.170",
        "port": "6443",
        "schema": "https"
      },
      "shared_size": "1m"
    }
  ]
}
```

有关更多信息，请参阅 [PR #11111](https://github.com/apache/apisix/pull/11111)。

## 其他更新

- 在秘密获取中使用 LRU 缓存来提高性能 ([PR #11201](https://github.com/apache/apisix/pull/11201))
- 将 `config-default.yaml` 中的默认配置移动到硬编码的 Lua 文件 ([PR #11343](https://github.com/apache/apisix/pull/11343))
- 修复 etcd 同步数据检查器 ([PR #11457](https://github.com/apache/apisix/pull/11457))
- 添加插件元数据 ID 以避免 etcd 检查器失败 ([PR #11452](https://github.com/apache/apisix/pull/11452))
- 允许在 SSL 的 SNI 和 CN 中使用尾随句点 ([PR #11414](https://github.com/apache/apisix/pull/11414))
- 升级 `lua-protobuf` 依赖版本，以过滤 `grpc-transcode` 插件中非法的 `INT(string)` 格式 ([PR #11367](https://github.com/apache/apisix/pull/11367))
- 纠正 API 密钥缺失时的错误消息 ([PR #11370](https://github.com/apache/apisix/pull/11370))
- 修复使用 `datadog` 插件报告消费者用户名标签失败的问题 ([PR #11354](https://github.com/apache/apisix/pull/11354))
- 修复 SSL 密钥轮换导致的请求错误 ([PR #11305](https://github.com/apache/apisix/pull/11305))
- 确保所有 etcd 事件均已正确处理 ([PR #11268](https://github.com/apache/apisix/pull/11268))
- 修复流路由匹配器在第一次匹配后为 `nil` 的问题 ([PR #11269](https://github.com/apache/apisix/pull/11269))
- 纠正通过 ID 获取机密资源的方式 ([PR #11164](https://github.com/apache/apisix/pull/11164))
- 修复在 `multi-auth` 插件中使用默认配置时抛出的 500 错误 ([PR #11145](https://github.com/apache/apisix/pull/11145))
- 避免覆盖 `cors` 插件中的 `Access-Control-Expose-Headers` 响应标头 ([PR #11136](https://github.com/apache/apisix/pull/11136))
- 发生错误时关闭会话以避免会话被阻塞 ([PR #11089](https://github.com/apache/apisix/pull/11089))
- 在 kafka pubsub 模块中执行其他操作之前恢复 pb 状态 ([PR #11135](https://github.com/apache/apisix/pull/11135))
- 为请求标头添加 100 的默认限制以限制安全风险 ([PR #11140](https://github.com/apache/apisix/pull/11140))
- 允许在关闭 `prometheus` 插件时禁用 prometheus 指标导出服务器 ([PR #11117](https://github.com/apache/apisix/pull/11117))
- 添加仅当 `forward-auth` 插件中的 `request_method` 设置为 POST 时，才使用 POST 请求标头 ([PR #11021](https://github.com/apache/apisix/pull/11021))
- 修复使用重复签名标头时 `hmac-auth` 插件中的 500 错误 ([PR #11127](https://github.com/apache/apisix/pull/11127))
- 修复 brotli 部分响应 ([PR #11087](https://github.com/apache/apisix/pull/11087))
- 更新上游架构以禁止端口值大于 65535 ([PR #11043](https://github.com/apache/apisix/pull/11043))

## 变更日志

有关此版本的完整变更列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3100)。
