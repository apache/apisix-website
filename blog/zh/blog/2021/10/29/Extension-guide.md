---
title: "Apache APISIX 扩展指南"
slug: 2021/10/26/extension-guide
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords: 
- Apache APISIX
- Plugin
- API 网关
- HTTP
- Apache
description: 本文提供了 Apache APISIX 的拓展指南，并且介绍了 Rewrite 还是 Access、配置服务发现、配置负载均衡、处理响应以及上报日志和监控参数等六个拓展方向。
tags: [Ecosystem]
---

> 本文提供了 Apache APISIX 的拓展指南，旨在为用户提供拓展 Apache APISIX 的一些思路。

<!--truncate-->

Apache APISIX 提供了 50 多个插件、常用的几个负载均衡选择器，以及对主流服务发现（如 Nacos 和 DNS）的支持。API 网关和企业内部的业务紧密相关，为了满足企业的业务需求，用户通常需要在 Apache APISIX 的基础上添加一些代码，以实现业务所需的功能。如何拓展 Apache APISIX 成了许多用户的共同痛点：在保证 Apache APISIX 平稳运行的前提下，如何添加业务代码，满足实际需求？

本文提供了 Apache APISIX 的拓展指南，旨在为用户提供拓展 Apache APISIX 的一些思路。由于 Apache APISIX 处于高速发展阶段，版本迭代的频率比较高，所以本文会以 Apache APISIX 的首个 LTS 版本 v2.10.0 为基础进行说明。如果你使用的 Apache APISIX 版本低于 2.10.0，可能需要结合实际情况做一些变通。另外，虽然本文只讲解了 HTTP 相关的逻辑，但是 TCP 相关的部分，大体上也较为相似。

## 扩展方向1：Rewrite 还是 Access？

我们从请求的生命周期说起：当一个请求进入到 Apache APISIX 时，首先会由 `http_access_phase` 这个方法进行处理。熟悉 OpenResty phases 概念的读者可能会有些疑惑：OpenResty 一共有 6 个 phases，按照执行的先后顺序排列，分别是： `rewrite`、 `access`、 `before_proxy`、 `header_filter`、 `body_filter` 和 `log`，为什么一上来就是 `access`，`rewrite` 怎么不见了？

Apache APISIX 插件的 phases 概念和 OpenResty 的 phases 概念略有不同。为了提升 Apache APISIX 的性能，APISIX 插件的 rewrite 方法会在 OpenResty 的 access 阶段中运行。用户依然能够在插件层面自定义 `rewrite` 的逻辑，但是在代码层面，`rewrite` 实际上也是在 `access` 里面执行。

虽然说 `rewrite` 的逻辑和 `access` 的逻辑都在 access phase 里面运行，但是 `rewrite` 的逻辑还是会比 `access` 的逻辑先执行。为了避免后续插件执行 `rewrite` 失败后，没有继续执行 `access`，导致 trace 遗漏的问题，必须在`rewrite`里面添加 trace 的逻辑。

除了执行的先后顺序外，`rewrite` 和 `access` 之间还有一个差别，就是它们之间有一个处理 `consumer` 的逻辑：

```
 plugin.run_plugin("rewrite", plugins, api_ctx)
        if api_ctx.consumer then
            ...
        end
        plugin.run_plugin("access", plugins, api_ctx)
```

`consumer` 代表一种身份。你可以针对不同的 `consumer` 进行权限控制，比如使用 `consumer-restriction` 这个插件实现基于角色的权限控制，也就是大家所说的 RBAC。另外，你也可以给不同的 `consumer` 设置对应的限流策略。

Apache APISIX 里面的鉴权插件（在插件定义里面有 `type = "auth"`），需要在 `rewrite` 阶段选好 `consumer`。这里我们用 `key-auth` 插件举个例子：

```
local _M = {
    version = 0.1,
    priority = 2500,
    type = 'auth',
    name = plugin_name,
    schema = schema,
    consumer_schema = consumer_schema,
}

...
function _M.rewrite(conf, ctx)
    ...
    local consumer_conf = consumer_mod.plugin(plugin_name)
    if not consumer_conf then
        return 401, {message = "Missing related consumer"}
    end

    local consumers = lrucache("consumers_key", consumer_conf.conf_version,
        create_consume_cache, consumer_conf)

    local consumer = consumers[key]
    if not consumer then
        return 401, {message = "Invalid API key in request"}
    end

    consumer_mod.attach_consumer(ctx, consumer, consumer_conf)
end
```

鉴权插件的执行逻辑都是相似的：首先从用户输入中获取某组参数，然后根据参数查找对应的 `consumer`，最后连同该插件对应的 `consumer_conf` 附加到 `ctx` 中。

综上，对于无需在请求早期阶段执行，且不需要查找 `consumer` 的插件，建议把逻辑写到 `access` 里面。

## 扩展方向2：配置服务发现

在执行完 `access` 之后，我们就要跟上游（Upstream）打交道了。通常情况下，上游节点是写死在 Upstream 配置上的。不过也可以从服务发现上获取节点来实现 discovery。

接下来我们会以 Nacos 为例，讲讲怎么实现。

一个动态获取 Nacos 管理的节点的 Upstream 配置如下：

```
{
    "service_name": "APISIX-NACOS",
    "type": "roundrobin",
    "discovery_type": "nacos",
    "discovery_args": {
        "namespace_id": "test_ns",
        "group_name": "test_group"
    }
}
```

我们可以看到其中三个重要的变量：

1. `discovery_type`: 服务发现的类型，`"discovery_type": "nacos"`表示使用 Nacos 实现服务发现。
2. `service_name`: 服务名称。
3. `discovery_args`: 不同的 discovery 特定的参数，Nacos 的特定参数包括：`namespace_id` 和  `group_name`。

Nacos discovery 对应的 Lua 代码位于 `discovery/nacos.lua`。打开 `nacos.lua` 这个文件，我们可以看到它里面实现了几个所需的方法。

一个 discovery 需要实现至少两个方法：`nodes` 和 `init_worker` 。

```
function _M.nodes(service_name, discovery_args)
    local namespace_id = discovery_args and
            discovery_args.namespace_id or default_namespace_id
    local group_name = discovery_args
            and discovery_args.group_name or default_group_name

    ...
end

function _M.init_worker()
    ...
end
```

其中 `nodes` 的函数签名已经明了地展示获取新节点所用的查询参数：`service_name` 和 `discovery_args`。每次请求时，Apache APISIX 都会用这一组查询最新的节点。该方法返回的是一个数组：

```
{
    {host = "xxx", port = 12100, weight = 100, priority = 0, metadata = ...},
    # priority 和 metadata 是可选的
    ...
}
```

而 `init_worker` 负责在后台启动一个 timer，确保本地的节点数据能跟服务发现的数据保持一致。

## 扩展方向3：配置负载均衡

获取到一组节点后，我们要按照负载均衡的规则来决定接下来要先尝试哪个节点。如果常用的几种负载均衡算法满足不了需求，你也可以自己实现一个负载均衡。

让我们以最少连接数负载均衡为例。对应的 Lua 代码位于 `balancer/least_conn.lua`。打开`least_conn.lua` 这个文件，我们可以看到它里面实现了几个所需的方法：`new`、`get`、`after_balance` 和 `before_retry_next_priority`。

- `new` 负责做一些初始化工作。

- `get` 负责执行选中节点的逻辑。

- `after_balance` 在下面两种情况下会运行：

  - 每次重试之前（此时 before_retry 为 true）
  - 最后一次尝试之后

- `before_retry_next_priority` 则是在每次尝试完当前一组同 priority 的节点，准备尝试下一组之前运行。

```
function _M.new(up_nodes, upstream)
    ...

    return {
        upstream = upstream,
        get = function (ctx)
            ...
        end,
        after_balance = function (ctx, before_retry)
            ...
            if not before_retry then
                if ctx.balancer_tried_servers then
                    core.tablepool.release("balancer_tried_servers", ctx.balancer_tried_servers)
                    ctx.balancer_tried_servers = nil
                end

                return nil
            end

            if not ctx.balancer_tried_servers then
                ctx.balancer_tried_servers = core.tablepool.fetch("balancer_tried_servers", 0, 2)
            end

            ctx.balancer_tried_servers[server] = true
        end,
        before_retry_next_priority = function (ctx)
            if ctx.balancer_tried_servers then
                core.tablepool.release("balancer_tried_servers", ctx.balancer_tried_servers)
                ctx.balancer_tried_servers = nil
            end
        end,
    }
end
```

如果没有内部状态需要维护，可以直接借用固定的模板代码（上述代码中，位于省略号以外的内容）来填充 `after_balance` 和 `before_retry_next_priority` 这两个方法。

选中节点之后，我们也可以通过插件的形式添加额外的逻辑。插件可以实现 `before_proxy` 方法。该方法会在选中节点之后调用，我们可以在该方法里面记录当前选中的节点信息，这在 trace 里面会有用。

## 扩展方向4：处理响应

我们可以通过 `response-rewrite` 插件，在 `header_filter` 和 `body_filter` 处理上游返回的响应。前一个方法是修改响应头，后一个方法修改响应体。注意 Apache APISIX 的响应处理是流式的，如果`header_filter`里面没有修改响应头，响应头就会被先发送出去，到了`body_filter`就没办法修改响应体了。

这意味着如果你后续想要修改body，但是 header 里面又有 Content-Length 之类跟 body 相关的响应头，那么就要提前在 `header_filter` 里面把这些头改掉。我们提供了一个辅助方法：`core.response.clear_header_as_body_modified`，只需要在 `header_filter` 调用它就行。

`body_filter` 也是流式的，而且还会被多次调用。所以如果你想要获取完整的响应体，你需要把每次 `body_filter` 提供的部分响应体给拼起来。在 Apache APISIX master 分支上，我们提供了一个叫做 `core.response.hold_body_chunk` 的方法来简化操作，感兴趣的读者可以看看代码。

## 扩展方向5：上报日志和监控参数

在请求结束之后，我们还可以通过 `log` 方法来做一些清场工作。这一类工作可以分成两类：

1. 记录 metrics 指标，比如 `prometheus` 插件。
2. 记录 access log，然后定期上报，比如 `http-logger` 插件。

如果你感兴趣的话，可以看看这两个插件的 `log` 方法是怎么实现的：

- [`prometheus` 插件文档](https://apisix.apache.org/zh/docs/apisix/plugins/prometheus/)
- [`http-logger` 插件文档](https://apisix.apache.org/zh/docs/apisix/plugins/http-logger/)
