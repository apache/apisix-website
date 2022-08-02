---
title: "Apache APISIX 2.8 正式发布"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- APISIX
- Release Notes
- Apache APISIX 
- API 网关
description: Apache APISIX 2.8 版本发布了以下功能：独立的 Keepalive 连接池、stream 代理功能增强、gzip 插件、支持通过插件的方式执行特定逻辑、支持自定义 balancer。
tags: [Community]
---

> Apache APISIX 2.8 版本正式发布！

<!--truncate-->

Apache APISIX 2.8 版本正式发布！🎉 这个版本有 30+ 开发者参与，共提交了 100+ PR，支持了 **1 个新功能、1 个新体验、2 个新插件、2 个新玩法**，快去阅读了解 2.8 版本的新特性吧！

👇👇👇

## Release Notes

### 新功能：独立的 Keepalive 连接池

从[2.7 版本](https://apisix.apache.org/blog/2021/06/29/release-apache-apisix-2.7)开始添加 Apache APISIX 自己的补丁和 Nginx C 模块，增强原生 Nginx 的功能，希望能够动态设置越来越多的 Nginx 配置。在发布的最新版本中，Apache APISIX 已经支持在 Upstream 级别上配置独立的 Keepalive 连接池。

目前包含了以下功能：

- 动态设置 mTLS
- 动态设置 client_max_body_size
- Upstream 的 keepalive（2.8 新功能）
- gzip (2.8 新插件)

在 Apache APISIX 后续版本中，我们也会陆续允许下面的 Nginx 配置能够被动态设置：

- real_ip
- proxy_max_temp_file_size
- ……

Upstream 的配置举例：

```JSON
{
    "id": "backend",
    "nodes": {"host:80": 100},
    "type":"roundrobin",
    "keepalive_pool": {
        "size": 4,
        "idle_timeout": 8,
        "requests": 16
    }
}
```

### 新体验：stream 代理功能增强

在 2.8 版本中，把 [ip-restriction](http://apisix.apache.org/docs/apisix/plugins/ip-restriction/) 和 [limit-conn](http://apisix.apache.org/docs/apisix/plugins/limit-conn/) 两个插件从 HTTP 部分的移植到了 stream 部分，这么做的好处是丰富网关在 stream 代理的功能，增加对上游服务的安全性保障。

ip-restriction 可以用来做 IP 黑白名单过滤，保证只有来自特定 IP 的请求才能访问到后端服务。

limit-conn 可以用来限制特定路由上同时存在的连接个数，限制客户端的并发访问量。

### 新插件：gzip 插件

2.8 版本中新增了 gzip 插件，使用 gzip 插件可以**动态设置路由级别的 gzip 参数**。

gzip 配置举例：

```JSON
{
    "plugins": {
        "gzip": {
            "min_length": 20,
            "http_version": 1.1,
            "buffers": {
                "number": 32,
                "size": 4096
            },
            "types": [
                "text/html"
            ],
            "comp_level": 1,
            "vary": false
        }
    }
}
```

### 新插件：ua-restriction

`ua-restriction` 插件用于校验 User-Agent 是否处于黑白名单中，黑白名单是一个非常常见的需求，现在可以通过插件的方式启用了。

`ua-restriction` 配置举例：

```JSON
{
    "plugins": {
        "ua-restriction": {
            "denylist": [
                "my-bot1",
                "(Baiduspider)/(\\d+)\\.(\\d+)"
            ]
        }
    }
}
```

### 新玩法：支持通过插件的方式执行特定逻辑

得益于 Apache APISIX 架构，许多功能都是通过插件的方式实现的。从 2.8 版本开始，插件又添加了新玩法。**现在 Apache APISIX 支持在选择上游节点之后，通过插件的方式执行特定逻辑。**  

只需要在插件里定义下面的方法：

```Lua
function _M.balancer(conf, ctx)
    core.log.notice("IP: ", ctx.balancer_ip, ", Port: ", ctx.balancer_port)
end
```

在这个示例里，日志会输出上游的 IP 和 Port。

**什么场景下会运行上述方法？**

1. 选择上游节点之后，访问上游之前
2. 每次重试之前

出于性能考虑，上述方法首次运行在 OpenResty 的 access 阶段（实际上 APISIX 在 access 阶段就选好了上游节点），该方法并不与 OpenResty 的同名阶段重合。

### 新玩法：支持自定义 balancer

从 2.8 版本开始，用户可以自定义 balancer。**这里的 balancer，是指最少连接数、轮询、一致性哈希等负载均衡器。**

虽然 Apache APISIX 已经提供了丰富的 balancer，但是用户可能需要用的 balancer 是和业务紧密相关的 balancer，比如：需要考虑机房、可用区等等。支持自定义 balancer，用户可以编写自己的 balancer，并通过 `require("apisix.balancer.your_balancer")`  加载到程序中。

通常自定义的 balancer 需要 node 提供 host/port 以外的数据，可以把数据放到 metadata 里面，举个例子：

```JSON
{
    "nodes": [
        { "host": "0.0.0.0", "port": 1980, "weight": 1, "metadata": {"b": 1} }
    ]
}
```

## 下载

下载 Apache APISIX 2.8

- 源代码：请访问[下载页面](https://apisix.apache.org/downloads/)
- 二进制安装包：请访问[安装指南](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
