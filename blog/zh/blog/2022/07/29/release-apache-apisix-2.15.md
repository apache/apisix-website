---
title: "Apache APISIX 2.15 正式发布"
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
- 版本发布
- 插件配置
- 自定义插件
- 灵活性
description: API 网关 Apache APISIX 2.15 版本正式发布！此版本新增插件相关的自定义优先级、执行策略、错误响应及支持监控四层流量的指标等功能。
tags: [Community]
---

> Apache APISIX 2.15 版本正式发布！用户可以自定义插件优先级和执行策略、自定义错误响应以及支持监控四层流量的指标等功能。

<!--truncate-->

从两年前发布第一个 2.0 版本开始，APISIX 已经发布了 15 个 minor 版本和许多个 patch 版本。作为 2.x 系列最后的一个 minor 版本，2.15 版本可以说是个承上启下的版本。

「承上」是因为该版本继续引入了更多的功能，使得插件配置更加灵活；「启下」则是因为该版本将会是 2.x 版本的最后一个 LTS 版本，后续 APISIX 就要向 3.0 版本进发了。更多细节一起来看下文吧！

![更新汇总](https://static.apiseven.com/2022/blog/0729/blog-1.png)

## 自定义插件优先级

新版本支持用户自定义插件的优先级，而非直接应用插件默认的优先级属性。

有了这个功能，我们可以在某个特定的路由上调整某几个插件的执行顺序，从而打破之前插件优先级属性的束缚。

例如，在默认情况下，`serverless-post-function` 插件是在 `serverless-pre-function` 插件之后执行的。但是通过此功能，可以让 `serverless-post-function` 插件优先执行。配置示例如下：

```json
 {
    "serverless-post-function": {
        "_meta": {
            "priority": 10000
        },
        "phase": "rewrite",
        "functions" : ["return function(conf, ctx)
                    ngx.say(\"serverless-post-function\");
                    end"]
    },
    "serverless-pre-function": {
        "_meta": {
            "priority": -2000
        },
        "phase": "rewrite",
        "functions": ["return function(conf, ctx)
                    ngx.say(\"serverless-pre-function\");
                    end"]
    }
}
```

:::note 注意

如果一个插件配置中没有注明优先级，则会根据插件代码中的优先级属性值进行排序。

如果你在 Service 或者 Plugin Config 的插件配置中指定了插件的优先级，那么在合并到路由后依然生效。

:::

## 自定义插件是否执行

除了能够调整执行顺序外，还可以动态决定插件是否需要执行。2.15 版本中引入了插件配置级别的过滤器，由过滤器的执行结果控制插件执行与否。

下方配置中，只有变量 `$status` 大于或等于 400 时，才会执行 `http-logger` 插件。这么一来，只有 4xx 和 5xx 的请求才会被报告到远端的 HTTP 日志服务器上。

```json
{
    "http-logger": {
        "_meta": {
            "filter": {
                {"status", "!", "<", "400"}
            }
        },
        ...
    }
}
```

同时，借助 APISIX 的另一个功能[自定义变量](https://apisix.apache.org/zh/docs/apisix/next/plugin-develop/#%E6%B3%A8%E5%86%8C%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8F%98%E9%87%8F)，则可以玩出更多花样。比如客户端地址为内网地址，则跳过某个 Logger 之类的场景。

## 自定义错误响应

该功能也是在具体插件层面配置的新功能，属于插件配置级别上的错误信息。

如果需求方对特定路由上的错误响应有所要求，那么这一功能就能派上用场了。无论是什么插件，通过该配置都能设置一个固定的响应结果，避免因为插件内置的错误响应信息而带来困扰。

如下述配置所示，不管 `jwt-auth` 插件返回了什么错误信息，都会被改写成 "Missing credential in request" 返回给客户端。

```json
{
    "jwt-auth": {
        "_meta": {
            "error_response": {
                "message": "Missing credential in request"
            }
        }
    }
}
```

## 允许采集 Stream Route 上的指标

本版本中还进行了一个较大的改动，就是允许在 Stream Route 上采集 metrics 的指标，并通过 Prometheus 的接口暴露出来。

该功能默认为关闭状态，如果需要启用，请在 [APISIX-Base](https://apisix.apache.org/zh/docs/apisix/FAQ/#%E5%A6%82%E4%BD%95%E6%9E%84%E5%BB%BA-apisix-base-%E7%8E%AF%E5%A2%83) 版本上构建 APISIX，并在 `config.yaml` 中启用 `prometheus` 插件，示例如下：

```yaml  title="./conf/config.yaml"
stream_plugins:
  - ...
  - prometheus
```

在启用该插件后，即使只用 APISIX 来代理四层上的 TCP 流量，也会专门监听 9091 的端口，响应 Prometheus 发来的 HTTP 请求。

跟 HTTP 代理子系统部分的 `prometheus` 插件一样，下一步则是在需要采集指标的 Stream Route 上配置该插件：

```shell
curl http://127.0.0.1:9080/apisix/admin/stream_routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "prometheus":{}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:80": 1
        }
    }
}'
```

在对该 Stream Route 发起连接之后，访问 http://127.0.0.1:9091/apisix/prometheus/metrics 就会看到如下 TCP 代理统计数据：

```shell
...
# HELP apisix_node_info Info of APISIX node
# TYPE apisix_node_info gauge
apisix_node_info{hostname="desktop-2022q8f-wsl"} 1
# HELP apisix_stream_connection_total Total number of connections handled per stream route in APISIX
# TYPE apisix_stream_connection_total counter
apisix_stream_connection_total{route="1"} 1
```

目前该功能只实现了统计连接数，后续还会按需加入更多的统计指标。

除了普通的 Stream Route 外，该版本中还给 xRPC 下的 Redis 代理功能提供了统计指标。如按照路由和 Command 细分的命令计数指标 `apisix_redis_commands_total` 和延迟时间指标 `apisix_redis_commands_latency_seconds_bucket`。

## 更多功能

在新增功能层面，除了上述提到的几个功能外，此版本也包含很多细节改动：

* 支持 Upstream 对象从 SSL 对象中引用证书
* `prometheus` 指标中提供 `ngx.shared.dict` 统计信息
* `openid-connect` 插件支持 PKCE 拓展

更多具体发版细节，请参考 [2.15 Changelog](https://github.com/apache/apisix/blob/release/2.15/docs/zh/latest/CHANGELOG.md#2150)。
