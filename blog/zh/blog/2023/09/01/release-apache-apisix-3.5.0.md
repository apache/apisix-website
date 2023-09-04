---
title: "Apache APISIX 3.5.0 正式发布"
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
description: Apache APISIX 3.5.0 版本于 2023 年 9 月 1 日发布。该版本带来了振奋人心的新功能和改进的用户体验。
tags: [Community]
---

我们很高兴地宣布 Apache APISIX 3.5.0 版本已经发布，带来了振奋人心的新功能和改进的用户体验。

<!--truncate-->

这个新版本添加了许多新功能，包括在主机级别动态配置TLS版本、与 Chaitin WAF 的集成、强制删除资源、在独立模式下部署 APISIX 时在配置文件中使用环境变量等。

这个版本包含了一些重要的变化。如果您发现这些变化对您的操作产生影响，强烈建议您进行相应的计划，以实现无缝升级。

## 重大变更

### 在 `request-id` 插件中移除雪花算法支持

移除 `request-id` 插件中的雪花算法支持。该算法引入了对 etcd 的不必要依赖，当 etcd 不可用时，可能会显著影响 APISIX 的性能。请考虑在算法中使用 `uuid` 选项。

有关更多背景信息，请参阅邮件列表中的[提案](https://lists.apache.org/thread/p4wwwwmtf024pnbccs5psncxg8yqvh9c) 。

相关 PR 请见 [#9715](https://github.com/apache/apisix/pull/9715)。

### 删除对 OpenResty 1.19 的支持

如果您当前正在使用此版本，请计划升级到 OpenResty 版本 1.21 及更高版本。

相关 PR 请见 [#9913](https://github.com/apache/apisix/pull/9913)。

### 改善 L4 和 L7 代理的可用性并删除 `apisix.stream_proxy.only`

提高 L4 和 L7 代理的可用性。 此更改删除了 `apisix.stream_proxy.only` 选项，并简化了启用和禁用 L4 和 L7 代理的用法。

L4 和 L7 代理可在 `config.yaml` 文件中如下所示启用：

- 启用 L7 代理（默认启用）：`apisix.proxy_mode: http`
- 启用 L4 代理：`apisix.proxy_mode:stream`
- 启用 L7 和 L4 代理：`apisix.proxy_mode: http&stream`

有关更改后如何使用 stream 代理的更多信息，请参阅[如何启用 stream 代理](https://apisix.apache.org/zh/docs/apisix/next/stream-proxy/#如何开启-stream-代理)。

相关 PR 请见 [#9607](https://github.com/apache/apisix/pull/9607)。

### 在 `ua-restriction` 插件中不允许同时使用 `allowlist` 和 `denylist`

在 `ua-restriction` 插件中，不再允许同时使用 `allowlist` 和 `denylist`。您应该只配置其中之一的选项。

相关 PR 请见 [#9841](https://github.com/apache/apisix/pull/9841)。

### 重构并改进 Admin API 中的插件接口

通过 `/apisix/admin/plugins?all=true` 获取所有插件属性的接口即将被弃用。 未来 Admin API 将仅支持一次获取一个插件的属性。 建议您使用以下端点和参数来满足您的要求：

```text
/apisix/admin/plugins/{plugin_name}?subsystem={subsystem}
```

其中 `subsystem` 参数为可选。若未配置，则默认为 `http`。该值可以设置为 `http`、`stream` 或 `http&stream`，对应于 L7 和/或 L4 上可用的插件。

或者，您可以使用 `/v1/schema` 获取并解析 [Control API](https://apisix.apache.org/zh/docs/apisix/control-api/#get-v1schema) 中所有插件的架构。

如果您只想获取插件名称列表，可以使用以下命令：

```
/apisix/admin/plugins/list?subsystem={subsystem}
```

有关更多详细信息，请参阅管理 API 中的[插件](https://apisix.apache.org/zh/docs/apisix/next/admin-api/#plugin)。

相关 PR 请见 [#9580](https://github.com/apache/apisix/pull/9580)。

## 新功能

### 支持主机级别动态配置TLS版本

支持运行时为各个 SNI 配置 TLS 版本。该配置优先于 `config-default.yaml` 或 `config.yaml` 中的 `ssl_protocols` 静态配置，并且不需要重新加载 APISIX，从而提供了一种更细粒度的方法来与您的基础设施集成。

例如，您可以使用以下命令将域 `test.com` 配置为接受 TLS 版本 1.2 和 1.3 的 TLS 连接：

```shell
curl http://127.0.0.1:9180/apisix/admin/ssls/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "cert": "$cert",
    "key": "$key",
    "snis": ["test.com"],
    "ssl_protocols": [
        "TLSv1.2",
        "TLSv1.3"
    ]
  }'
```

有关该功能和示例的更多信息，请参阅 [SSL 协议](https://apisix.apache.org/zh/docs/apisix/next/ssl-protocol/)。

相关 PR 请见 [#9903](https://github.com/apache/apisix/pull/9903)。

### 支持强制删除资源

支持使用 Admin API 强制删除资源。 默认情况下，管理 API 检查资源之间的引用，并且不允许删除正在使用的资源。

借助此新功能，您可以通过发送带有 URL 参数 `force=true` 的 DELETE 请求来强制删除，如下所示：

```shell
curl "http://127.0.0.1:9180/apisix/admin/upstreams/1?force=true" -X DELETE \
  -H "X-API-KEY: ${ADMIN_API_KEY}"
```

有关该功能和示例的更多信息，请参阅[强制删除](https://apisix.apache.org/zh/docs/apisix/next/admin-api/#force-delete)。

相关 PR 请见 [#9810](https://github.com/apache/apisix/pull/9810)。

### 支持 `apisix.yaml` 中的环境变量

支持在 `apisix.yaml` 中使用环境变量。

例如，您可以将上游服务的主机 IP 和端口设置为环境变量，并使用 `apisix.yaml` 中的变量，如下所示：

```shell
routes:
  -
    uri: "/test"
    upstream:
      nodes:
        "${{HOST_IP}}:${{PORT}}": 1
      type: roundrobin
#END
```

有关该功能和示例的更多信息，请参阅管理 API 中的[使用环境变量](https://apisix.apache.org/zh/docs/apisix/next/admin-api/#using-environment-variables)。

相关 PR 请见 [#9855](https://github.com/apache/apisix/pull/9855)。

### 在 Admin API 中添加架构验证端点

将 `/apisix/admin/schema/validate/{resource}` 端点添加到 Admin API 以验证配置的架构。 您现在可以验证配置的正确性，而无需向端点发送资源创建请求。

例如，您可以使用以下命令验证路由的架构：

```shell
curl http://127.0.0.1:9180/apisix/admin/schema/validate/routes -i -X POST \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
    "uri": 1980,
    "upstream": {
        "scheme": "https",
        "type": "roundrobin",
        "nodes": {
          "nghttp2.org": 1
        }
     }
  }'
```

由于此架构不正确，您应该会看到类似于以下内容的响应：

```text
HTTP/1.1 400 Bad Request
...
{"error_msg":"property \"uri\" validation failed: wrong type: expected string, got number"}
```

有关该功能和示例的更多信息，请参阅 Admin API 中的[架构验证](https://apisix.apache.org/docs/apisix/next/admin-api/#schema-validation)。

相关 PR 请见 [#10065](https://github.com/apache/apisix/pull/10065)。

### 通过 `chaitin-waf` 插件支持与 Chaitin WAF 集成

通过 `chaitin-waf` 插件支持与长亭 WAF 集成，将网关流量转发到长亭 WAF 进行恶意流量的检查和检测。

例如，您可以在插件元数据上配置长亭 WAF 的地址，所有 `chaitin-waf` 插件实例都会引用该地址。 配置 `host` 为长亭 SafeLine WAF 检测服务主机、unix 域套接字、IP 或域； 以及 `port`，如下所示：

```shell
curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/chaitin-waf -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
  "nodes":[
      {
        "host": "unix:/path/to/safeline/resources/detector/snserver.sock",
        "port": 8000
      }
    ]
  }'
```

然后，您可以在路由上启用该插件，并仅将符合指定条件的流量转发到 WAF：

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -X PUT \
  -H "X-API-KEY: ${ADMIN_API_KEY}" \
  -d '{
   "uri": "/*",
   "plugins": {
       "chaitin-waf": {
           "match": [
                {
                  "vars": [
                    ["http_waf","==","true"]
                  ]
                }
            ]
        }
    },
   "upstream": {
       "type": "roundrobin",
       "nodes": {
          "httpbun.org:80": 1
        }
     }
  }'
```

如果检测到潜在的恶意请求，例如以下请求，它会尝试注入攻击：

```shell
curl -i "http://127.0.0.1:9080/getid=1%20AND%201=1" \
  -H "Host: httpbun.org" \
  -H "waf: true"
```

您应该看到类似于以下内容的响应：

```text
HTTP/1.1 403 Forbidden
...
X-APISIX-CHAITIN-WAF: yes
X-APISIX-CHAITIN-WAF-TIME: 2
X-APISIX-CHAITIN-WAF-ACTION: reject
X-APISIX-CHAITIN-WAF-STATUS: 403
...
{"code": 403, "success":false, "message": "blocked by Chaitin SafeLine Web Application Firewall", "event_id": "51a268653f2c4189bfa3ec66afbcb26d"}
```

有关该功能和示例的更多信息，请参阅 [`chaitin-waf`](https://apisix.apache.org/zh/docs/apisix/next/plugins/chaitin-waf/) 插件文档。

相关 PR 请见 [#9838](https://github.com/apache/apisix/pull/9838)。

## 其他更新

- 支持在 `openid-connect` 插件中配置代理服务器（[PR #9948](https://github.com/apache/apisix/pull/9948)）
- 支持将响应标头从 OPA 服务器发送到 `opa` 插件中的上游服务 ([PR #9710](https://github.com/apache/apisix/pull/9710))
- 支持在 `file-logger` 插件中使用变量以允许条件日志记录（[PR #9712](https://github.com/apache/apisix/pull/9712)）
- 支持 `mocking` 插件中响应头的配置（[PR #9720](https://github.com/apache/apisix/pull/9720)）

## 变更日志

有关此版本中更改的完整列表，请参阅 [CHANGELOG](https://github.com/apache/apisix/blob/release/3.5/CHANGELOG.md#350)。
