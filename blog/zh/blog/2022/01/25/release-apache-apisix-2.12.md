---
title: "Apache APISIX 2.12.0 正式发布"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- 2.12.0
- 版本发布
- Serverless
- API 网关
description: APISIX 在即将到来的新春佳节，带来 2022 年第一个带有新功能的版本。支持更多鉴权插件和 Serverless 集成，丰富日志功能及多语言插件等细节。
tags: [Community]
---

> 继 2.11.0 版本发布之后，Apache APISIX 也在即将到来的新春佳节，为大家带来 2022 年第一个带有新功能的版本。

<!--truncate-->

## 新功能：更多的 Serverless 集成

还记得在上个版本里，Apache APISIX 增加了对 Azure Function 的支持。而这次新版本中也是用意满满，在功能上又加入了对更多 Serverless 厂商的支持。

如今用户也可以在 Apache APISIX 中结合 AWS Lambda 和 Apache OpenWhisk，在网关上进行特定函数的暴露。

## 新功能：更多的鉴权插件

此次的新版本，还将带来两个众人翘首以盼的新插件：`forward-auth` 和 `opa`。

- forward-auth 插件跟 Traefik 的同名插件功能类似，该插件可以允许把当前请求的信息发送给外部服务进行鉴权。
- opa 插件则整合了著名的 Open Policy Agent，该插件可以通过 OPA 来完成复杂的鉴权功能。

通过上述两个插件，将为 Apache APISIX 的鉴权功能锦上添花，给用户带来更多丰富和上手简单的鉴权操作。

## 新功能：更多的日志功能

除了上边提到的鉴权插件，本次新版本还将带来三个新的日志插件：`google-cloud-logging`、`splunk-hec-logging` 以及 `rocketmq-logger`。

从插件名称上也很容易理解，通过上述三个插件可以把日志分别发送到 Google Cloud、Splunk 和 Apache RocketMQ。未来，Apache APISIX 将会对接越来越多的日志服务商和开源 Broker，让日志处理变得更加轻松。

### 支持记录响应体

同时，此次 2.12.0 版本还在日志层面支持记录响应体。与 Apache APISIX 其他功能一样，该功能也可以通过表达式进行动态开启。这样在使用中，就可以实现仅在上游返回特定的 Content-Type 和 Content-Length 时进行日志记录，不用再去顾虑全量采集响应体而带来的问题了。

具体示例可参考下方：

```json
{
    "plugins": {
        "kafka-logger": {
            "broker_list" : {
                "127.0.0.1":9092
            },
            "kafka_topic" : "test2",
            "include_resp_body": true,
            "include_resp_body_expr": [
                [
                    "sent_http_content_length",
                    "<",
                    "4096"
                ],
                [
                    "sent_http_content_type",
                    "==",
                    "application/json"
                ],
            ]
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/hello"
}
```

> 上述配置会仅在 Content-Length < 4096 且 Content-Type 为 "application/json" 才记录日志。

### 支持注册自定义变量

另一个跟日志紧密相关的功能，就是新版本的 Apache APISIX 已支持注册自定义变量。同时结合 APISIX 的自定义日志格式，就可以实现完全自定义上报的日志内容。即无需修改具体的日志插件，就能实现日志生成和上报的解耦合。这里我们通过一个示例进行简单演示一下。

比如我们可以在自己的插件中注册一个 a6_route_labels 的变量：

```c
local core = require "apisix.core"

core.ctx.register_var("a6_route_labels", function(ctx)
    local route = ctx.matched_route and ctx.matched_route.value
    if route and route.labels then
        return route.labels
    end
    return nil
end)
```

并在自定义日志格式中使用它：

```json
{
    "log_format": {
        "host": "$host",
        "labels": "$a6_route_labels",
        "client_ip": "$remote_addr"
    }
}
```

假设我们的 Route 长这样：

```json
{
    "plugins": {
        "http-logger": {
            "uri": "http://127.0.0.1:1980/log",
            "batch_max_size": 1,
            "concat_method": "json"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1982": 1
        },
        "type": "roundrobin"
    },
    "labels": {
        "k": "v"
    },
    "uri": "/hello"
}
```

最终就会收到如下所示的日志：

```
{"client_ip":"127.0.0.1","host":"localhost","labels":{"k":"v"},"route_id":"1"}
```

## 新功能：L4 代理支持 TLS over TCP 上游

在 2.12.0 版本中还引入了新的 Upstream Scheme，现在 Apache APISIX 已支持代理到 TLS over TCP 上游了。

具体做法可参考下方，只需在 Upstream 配置中指明 Scheme 为 TLS 即可。

```json
{
    "scheme": "tls",
    "nodes": {
        "127.0.0.1:1995": 1
    },
    "type": "roundrobin"
}
```

至此 Apache APISIX 的 TCP 代理功能得到了 TLS 全方位的支持。此外，我们还支持在静态文件中配置 L4 代理的 Access Log：

```
stream:
    enable_access_log: false         # enable access log or not, default false
    access_log: logs/access_stream.log
    access_log_format: "$remote_addr [$time_local] $protocol $status $bytes_sent $bytes_received $session_time"
                                            # create your custom log format by visiting http://nginx.org/en/docs/varindex.html
    access_log_format_escape: default       # allows setting json or default characters escaping in variables
```

## 更新：多语言插件持续完善

### WASM 生态功能更加丰富

在之前版本中，Apache APISIX 已开放了对 WASM 生态的支持。而在 2.12.0 版本中，针对 WASM 生态又做了不少的更新细节。

目前 Apache APISIX 已经支持在 header_filter 的阶段运行 WASM 代码，弥补了现有外部插件无法修改响应的不足。

此外，我们还支持在 WASM 里面通过 Apache APISIX 这个宿主进行 HTTP 通讯。借助这一功能，我们用 WASM 也重新实现了 forward-auth 插件。该插件的功能几乎和 Lua 版本一模一样，甚至连测试用例也是在 Lua 版本上改了下名字就能通过了。

### Java Plugin Runner 最新版本发布

当然，我们也没有忘记针对现有的外部插件进行更新，本次 2.12.0 版本中，Apache APISIX 已允许外部插件获取请求体。

比如最近发布的 Java Plugin Runner 第二版就包含了这一功能。新版本的 Java Plugin Runner 还支持在运行时动态获取 APISIX 变量。

## 更多细节

除了上述新功能和组件外，Apache APISIX 2.12.0 版本还更新了如下功能：

- gRPC-Web 的支持：继 gRPC 代理、HTTP 转 gRPC 之后，我们迎来了 gRPC 家族的第三个成员。现在 Apache APISIX 也支持代理 gRPC Web 协议了。
- limit-count 的增强：如今 limit-count 插件的计数器已经支持在请求间、路由间进行共享，可以说是相当灵活了。

更多关于 Apache APISIX 2.12.0 的更新细节，可以查看本次发布对应的 [Change log](https://github.com/apache/apisix/blob/release/2.12/CHANGELOG.md#2120)。

## 下载

想要获取最新的 Apache APISIX 2.12.0 版本，可通过以下路径下载：

- 源代码：请访问[下载页面](https://apisix.apache.org/downloads/)
- 二进制安装包：请访问[安装指南](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
