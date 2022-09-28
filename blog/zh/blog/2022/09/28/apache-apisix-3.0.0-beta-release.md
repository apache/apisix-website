---
title: "APISIX 3.0.0 预览版现已发布！带来丰富功能与迭代细节"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://github.com/spacewander.png"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords:
  - Apache APISIX
  - API 网关
  - API 管理平台
  - 版本发布
  - 新功能
description: Apache APISIX 3.0.0 预览版现已发布，为你整理了此次预览版上线的一些功能与调整细节。
tags: [Community]
---

> Apache APISIX 3.0.0 预览版现已发布，为你整理了此次预览版上线的一些功能与调整细节。

<!--truncate-->

本次发布的新版本，是 3.0.0 的 Beta 预览版。作为 3.0 正式版的探路先锋，预览版已经包含了 3.0 大版本中带来的多项新功能。如果你想提前感受 APISIX 3.0 版本的功能盛宴，欢迎尝鲜此次预览版，也期待你在使用中向社区反馈相关体验。

正因为 3.0.0-beta 版本新增了很多不向下兼容的改动，本次发版公告会一一列出这些改动，让各位用户在迁移配置时有所准备。

## 新变化

### 移动 config_center、etcd 和 Admin API 配置到 deployment 中

在 3.0 版本中，调整了静态配置文件中的配置，所以你需要同步更新下 `config.yaml` 文件内的配置。

- `config_center` 功能改由 `deployment` 中的 `config_provider` 实现（[#7901](https://github.com/apache/apisix/pull/7901)）
- `etcd` 字段整体搬迁到 `deployment` 中（[#7860](https://github.com/apache/apisix/pull/7860)）
- 以下 Admin API 配置移动到 `deployment` 中的 `admin` 字段（[#7823](https://github.com/apache/apisix/pull/7823)）：
  - admin_key
  - enable_admin_cors
  - allow_admin
  - admin_listen
  - https_admin
  - admin_api_mtls
  - admin_api_version

更多详情可参考最新的 `[config-default.yaml](https://github.com/apache/apisix/blob/master/conf/config-default.yaml)` 文件。

### 移除多个已废弃配置

在 3.0 新版本中，我们把许多之前标记为 `deprecated` 的配置进行了清理。

在静态配置中，移除了以下若干字段：

- 移除 `apisix.ssl` 中的 `enable_http2` 和 `listen_port`（[#7717](https://github.com/apache/apisix/pull/7717)）
- 移除 `apisix.port_admin`（[#7716](https://github.com/apache/apisix/pull/7716)）
- 移除 `etcd.health_check_retry`（[#7676](https://github.com/apache/apisix/pull/7676)）
- 移除 `nginx_config.http.lua_shared_dicts`（[#7677](https://github.com/apache/apisix/pull/7677)）
- 移除 `nginx_config.http.real_ip_header`（[#7696](https://github.com/apache/apisix/pull/7696)）

在动态配置中，进行了以下调整：

- 将插件配置的 `disable` 移到 `_meta` 中（[#7707](https://github.com/apache/apisix/pull/7707)）
- 从 Route 中移除了 `service_protocol`（[#7701](https://github.com/apache/apisix/pull/7701)）

此外还有具体插件级别上的改动：

- authz-keycloak 中移除了 `audience` 字段（[#7683](https://github.com/apache/apisix/pull/7683)）
- mqtt-proxy 中移除了 `upstream` 字段（[#7694](https://github.com/apache/apisix/pull/7694)）
- error-log-logger 中把 TCP 相关配置放到 `tcp` 字段中（[#7700](https://github.com/apache/apisix/pull/7700)）
- syslog 中移除了 `max_retry_times` 和 `retry_interval` 字段（[#7699](https://github.com/apache/apisix/pull/7699)）
- proxy-rewrite 中移除了 `scheme` 字段（[#7695](https://github.com/apache/apisix/pull/7695)）

### 调整 Admin API 响应格式

我们在以下两个 PR 中调整了 Admin API 的响应格式：

- [#7630](https://github.com/apache/apisix/pull/7630)
- [#7622](https://github.com/apache/apisix/pull/7622)

新的响应格式调整为以下类型。

返回单个配置：

```yaml
{
  "modifiedIndex": 2685183,
  "value": {
    "id": "1",
    ...
  },
  "key": "/apisix/routes/1",
  "createdIndex": 2684956
}
```

返回多个配置：

```yaml
{
  "list": [
    {
      "modifiedIndex": 2685183,
      "value": {
        "id": "1",
        ...
      },
      "key": "/apisix/routes/1",
      "createdIndex": 2684956
    },
    {
      "modifiedIndex": 2685163,
      "value": {
        "id": "2",
        ...
      },
      "key": "/apisix/routes/2",
      "createdIndex": 2685163
    }
  ],
  "total": 2
}
```

### 其他

- Admin API 的端口改为 9180（[#7806](https://github.com/apache/apisix/pull/7806)）
- APISIX 将只支持 OpenResty 1.19.3.2 及以上版本（[#7625](https://github.com/apache/apisix/pull/7625)）
- 调整了 Plugin Config 对象的优先级，同名插件配置的优先级由 Consumer > Plugin Config > Route > Service 修改为 **Consumer > Route > Plugin Config > Service**（[#7614](https://github.com/apache/apisix/pull/7614)）

## 新功能

### 新玩法：直接从 APISIX 发起 gRPC 请求

从 3.0.0-beta 版本开始，APISIX 集成了 `grpc-client-nginx-module`，这是一个支持在 NGINX 中发起 gRPC 请求的模块。只需寥寥数十行 Lua 代码，即可完成跟 gRPC 服务的直接交互。

在下方代码中，我们连接了监听 50051 端口的 gRPC 服务，发送一次 `{ name = "apisix" }` 来创建对应的 stream，然后发送三次请求，最后接收到了五次响应。

```lua
local core = require "apisix.core"
local gcli = core.grpc
assert(gcli.load("t/grpc_server_example/proto/helloworld.proto"))
local conn = assert(gcli.connect("127.0.0.1:50051"))
local st, err = conn:new_bidirectional_stream("helloworld.Greeter",
    "SayHelloBidirectionalStream", { name = "apisix" })
if not st then
    ngx.status = 503
    ngx.say(err)
    return
end

for i = 1, 3 do
    local ok, err = st:send({ name = "apisix" })
    if not ok then
        ngx.status = 503
        ngx.say(err)
        return
    end
end

assert(st:close_send())
for i = 1, 5 do
    local res, err = st:recv()
    if not res then
        ngx.status = 503
        ngx.say(err)
        return
    end
    ngx.say(res.message)
end
```

更多详细细节可参考[相关文档](https://github.com/api7/grpc-client-nginx-module)。

目前 APISIX 对 `grpc-client-nginx-module` 的整合只是个开始，后续将会在 APISIX 中进行更多改造工作，比如直接使用 gRPC 来连接 APISIX 的控制面。

### 新插件：elasticsearch-logger 和 tencent-cloud-cls

APISIX 几乎每个新版本的发布都会引入新的日志插件，此次也不例外，引入了两个新的日志插件。

`elasticsearch-logger` 插件是写入到 Elasticsearch 的日志插件。通过配置该插件，你可以把日志批量传输到 Elasticsearch。如下述配置，会将日志发送到 9200 端口的 Elasticsearch 上：

```json
    "plugins":{
        "elasticsearch-logger":{
            "endpoint_addr":"http://127.0.0.1:9200",
            "field":{
                "index":"services"
            }
        },
        ...
    },
    ...
```

`tencent-cloud-cls` 插件则是对接[腾讯云日志服务](https://cloud.tencent.com/document/product/614)的插件。

跟 `elasticsearch-logger` 类似，也需要配置相关服务器的地址，同时还需要配置用户的身份信息：

```json
    "plugins": {
        "tencent-cloud-cls": {
            "cls_host": "ap-guangzhou.cls.tencentyun.com",
            "cls_topic": "${your CLS topic name}",
            "global_tag": {
                "module": "cls-logger",
                "server_name": "YourApiGateWay"
            },
            "include_req_body": true,
            "include_resp_body": true,
            "secret_id": "${your secret id}",
            "secret_key": "${your secret key}"
        },
        ...
    },

```

### 现有功能拓展

除了上面提到的几个大的新变化外，此次版本发布也包含很多值得一提的特性：

- K8s 服务发现支持配置多个集群；
- log-rotate 时支持限制日志文件的上限大小；
- 新增 `openfunction` 插件，可以调用 OpenFunction 平台的 FaaS 函数；
- 新增 `workflow` 插件，可以灵活执行更多逻辑。

如果你对此次发版的完整内容感兴趣，请参考 3.0.0-beta 发布的 [changelog](https://github.com/apache/apisix/blob/release/2.99/docs/zh/latest/CHANGELOG.md#300-beta)。
