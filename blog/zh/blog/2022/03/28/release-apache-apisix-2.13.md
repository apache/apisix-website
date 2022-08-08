---
title: "Apache APISIX 2.13.0 正式发布"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://github.com/yzeng25.png"
keywords: 
- Apache APISIX
- API 网关
- 服务发现
- 可观测性
- 版本发布
- LTS version
description: 全新的 LTS 版本 Apache APISIX 2.13.0 正式发布。该 LTS 版本不仅性能更加稳定，而且支持了更多的可观测性、服务发现插件和更完善的多语言开发体系。
tags: [Community]
---

> 全新的 LTS 版本 Apache APISIX 2.13.0 正式发布。该 LTS 版本不仅性能更加稳定，而且支持了更多的可观测性、服务发现插件和更完善的多语言开发体系。

<!--truncate-->

距离 Apache APISIX 上一次发布 LTS 版本已经过去了大半年的时间，今天，Apache APISIX 社区带来了一个全新的 LTS 版本——2.13.0。该 LTS 版本不仅性能更加稳定，而且支持了更多的可观测性、服务发现插件和更完善的多语言开发体系。

如果你在追求整体稳定性的同时，也想尝试一下新功能，不妨考虑将现有的 Apache APISIX 升级到 2.13.0。后续社区也会在 2.13.0 版本的基础上发布一系列 patch 版本。

![Apache APISIX 2.13.0 更新概览](https://static.apiseven.com/202108/1648439024629-e286bd1f-ce1d-424e-a4c0-7ded1ab3d17e.png)

## 功能更新

### 新变化：不再默认暴露 API

在 2.13.0 之前的版本中，我们允许插件注册可供客户端调用的 API。例如，`jwt-auth` 插件会注册一个 JWT 签名的接口，客户端可以访问该接口，以生成用于校验的签名。但这个设计有一个潜在的缺陷——由于暴露出来的是接口而不是路由，因此无法像对待路由一样为其加强安全防护。虽然现有的机制允许用户通过编写对应的 plugin interceptor 来拦截接口访问，但这种方式仍然存在安全隐患。

**所以从 2.13.0 版本开始，我们决定做出重大变更，不再默认暴露 API。**如果用户需要暴露接口，则需要通过 `public-api` 插件将接口绑定到对应的路由上。这种方式会带来两个好处：

1. 注册的 API 会有更高的能见度，目前注册的 API 只有通过显示配置才会生效，访问方式也是由用户自定义。
2. 允许采用更多的安全防护选项，注册的 API 和路由拥有同样的权限控制。

当然，2.13.0 版本还有其他的新变化，比如修复了历史版本的不合理行为。如需了解具体优化信息，请查阅 [2.13.0 Changelog](https://github.com/apache/apisix/blob/release/2.13/docs/zh/latest/CHANGELOG.md#2130)。

### 新功能：可观测性层面对接更多的监控体系

作为 API 网关，Apache APISIX 一直致力于连接更多的服务，打通更多的可观测性上下游。我们在每个版本都会为此添砖加瓦，2.13.0 版本也不例外。

**这次我们新增了一个 tracing 插件：`opentelemetry`，允许发送 OpenTelemetry tracing 数据到配置的 collector。**下面简单通过一个示例来看一下。

在静态配置里面设置了 collector：

```yaml
plugin_attr:
  opentelemetry:
    resource:
      service.name: APISIX
      tenant.id: business_id
    collector:
      address: "127.0.0.1:4317"
    batch_span_processor:
      drop_on_queue_full: false
      max_queue_size: 6
      batch_timeout: 2
      inactive_timeout: 1
      max_export_batch_size: 2
```

之后就可以在特定的路由上开启 tracing：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uris": [
        "/uid/*"
    ],
    "plugins": {
        "opentelemetry": {
            "sampler": {
                "name": "always_on"
            }
        }
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:8089": 1
        }
    }
}'
```

命中该路由的请求将会上报 OpenTelemetry 的数据到对应的 collector。

此外，我们还新增了两个日志插件，支持把日志上报到 ClickHouse 和 Loggly 中。

ClickHouse 是地表最快的 OLAP 数据库之一。Apache APISIX 支持发送 access log 和 error log 到 ClickHouse，示例如下：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
      "plugins": {
            "clickhouse-logger": {
                "user": "default",
                "password": "a",
                "database": "default",
                "logtable": "test",
                "endpoint_addr": "http://127.0.0.1:8123"
            }
       },
      "upstream": {
           "type": "roundrobin",
           "nodes": {
               "127.0.0.1:1980": 1
           }
      },
      "uri": "/hello"
}'
```

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/error-log-logger  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "clickhouse": {
      "user": "default",
      "password": "a",
      "database": "error_log",
      "logtable": "t",
      "endpoint_addr": "http://127.0.0.1:8123"
  }
}'
```

Loggly 是 SolarWinds 旗下的日志处理 SaaS 平台，我们支持通过 syslog 或 HTTP/HTTPS 的方式发送 access log。示例如下：

配置上报方式

```shell
curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/loggly  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
   "protocol": "http"
}'
```

配置需要上报的路由

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1  \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins":{
        "loggly":{
            "customer_token":"xxx",
        }
    },
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:80":1
        }
    },
    "uri":"/index.html"
}'
```

### 更完善的多语言开发体系

Apache APISIX 自 2.11 版本起开始支持 Wasm（Proxy Wasm SDK），但 LTS 版本一直没有提供相应支持。在此次发布的 Apache APISIX 2.13.0 版本中，我们新增并完善了该功能。

在经过半年超过 10000 行代码（包括测试和文档）的开发后，APISIX 现已全面支持在**处理请求头、请求体、响应头、响应体四个阶段运行 Wasm 代码**。2.13.0 版本是第一个支持 Wasm 的 LTS 版本，可以说是一个新的里程碑。

除了 Wasm 之外，我们也正在开发传统的、基于 RPC 的多语言插件体系。不久之前，我们发布了 Python Runner 0.2.0 版本。几天后，我们也会发布 Go Runner 0.3.0 版本。

## Bug 修复

- SkyWalking 和 OpenTelemetry 没有追踪认证失败。
- `log-rotate` 切割日志不支持按整点完成。
- `deepcopy` 没有复制 `metatable`。
- `request-validate` 对 JSON 里面重复键的处理 。
- `prometheus` 重复计算指标。
- 当 `conf.headers` 缺失时，`proxy-rewrite` 中的 `conf.method` 不生效 。
- `traffic-split` 首条规则失败时无法匹配。
- etcd 超时触发 `resync_delay` 。
- `proto` 定义冲突。
- `limit-count` 配置不变，重置计数器。
- Admin API 的 `plugin-metadata` 和 `global-rule` 计数有误。
- 合并 route 和 service 时 labels 丢失。

## 更多细节

除了上述功能和组件外，Apache APISIX 2.13.0 版本还更新了如下功能：

- grpc-transcode 支持通过 `.pb` 文件处理带 import 的 proto 定义。
- 支持从 K8s 配置中获取上游节点。
- 新增 `csrf` 插件，提供跨站请求伪造防护。
- 新增 `mocking` 插件，方便生成测试数据。
