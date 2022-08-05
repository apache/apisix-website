---
title: "Apache APISIX Extensions Guide"
slug: 2021/10/29/extension-guide
author: "Zexuan Luo"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords: 
- Apache APISIX
- API Gateway
- Plugin
- HTTP
- Apache
description: This article introduces the expansion direction of Rewrite or Access, configuring service discovery, configuring load balancing, and processing responses.
tags: [Ecosystem]
---

> This article provides an extension guide for Apache APISIX, aiming to provide users with some ideas for extending Apache APISIX.

<!--truncate-->

Apache APISIX provides more than 50 plugins, several commonly used load balancing selectors, and support for mainstream service discovery (such as Nacos and DNS). The API gateway is closely related to the internal business of the enterprise. In order to meet the business needs of the enterprise, users usually need to add some code on the basis of Apache APISIX to realize the functions required by the business. How to expand Apache APISIX has become a common pain point for many users: on the premise of ensuring the smooth operation of Apache APISIX, how to add business code to meet actual needs?

This article provides an extension guide for Apache APISIX, aiming to provide users with some ideas for extending Apache APISIX. Since Apache APISIX is in a stage of rapid development and the frequency of version iterations is relatively high, this article will be based on the first LTS version v2.10.0 of Apache APISIX. If your Apache APISIX version is lower than 2.10.0, you may need to make some modifications based on actual conditions. In addition, although this article only explains the HTTP-related logic, the TCP-related parts are generally similar.

## Expansion Direction 1: Rewrite or Access?

Let's start with the life cycle of the request: when a request enters Apache APISIX, it will first be processed by the method `http_access_phase`. Readers who are familiar with the concept of OpenResty phases may be a little confused: OpenResty has a total of 6 phases, which are arranged in order of execution: `rewrite`, `access`, `before_proxy`, `header_filter`, `body_filter` and `log`, why is `access` at the beginning, and where is `rewrite`?

The phases concept of the Apache APISIX plug-in is slightly different from the OpenResty phases concept. In order to improve the performance of Apache APISIX, the rewrite method of the APISIX plugin will run in the access phase of OpenResty. Users can still customize the logic of `rewrite` at the plugin level, but at the code level, `rewrite` is actually executed in `access`.

Although both the logic of `rewrite` and the logic of `access` run in the access phase, the logic of `rewrite` will still be executed before the logic of `access`. In order to avoid the failure of subsequent plugins to execute `rewrite` and fail to execute `access`, which will cause trace omissions, trace logic must be added to `rewrite`.

In addition to the order of execution, there is another difference between `rewrite` and `access`, that is, there is a logic for processing `consumer` between them:

```Lua
 plugin.run_plugin("rewrite", plugins, api_ctx)
        if api_ctx.consumer then
            ...
        end
        plugin.run_plugin("access", plugins, api_ctx)
```

`consumer` represents an identity. You can control permissions for different consumers. For example, use the plugin `consumer-restriction` to implement role-based permission control, which is what everyone calls RBAC. In addition, you can also set corresponding current limiting strategies for different `consumer`.

The authentication plugin in Apache APISIX (with `type = "auth"` in the plugin definition), you need to select the `consumer` in the `rewrite` stage. Here we use the `key-auth` plugin as an example:

```Lua
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

The execution logic of the authentication plugins is similar: first obtain a certain set of parameters from the input of the users, then find the corresponding `consumer` according to the parameters, and finally append the `consumer_conf` corresponding to the plugin to `ctx`.

In summary, for plugins that do not need to be executed in the early stage of the request and do not need to find the `consumer`, it is recommended to write the logic in the `access`.

## Extension Direction 2: Configure Service Discovery

After executing the `access`, we are about to deal with the Upstream. Normally, the Upstream node is hard-coded on the Upstream configuration. However, it is also possible to obtain nodes from the service discovery to implement discovery.

Next, we will take Nacos as an example to talk about how to implement it.

An Upstream configuration that dynamically acquires a node managed by Nacos is as follows.

```JSON
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

We can see three of these important variables:

1. `discovery_type`: Types of Service Discovery,`"discovery_type": "nacos"` indicates service discovery using Nacos.
2. `service_name`: Service Name。
3. `discovery_args`: different discovery-specific parameters, specific parameters of Nacos include: `namespace_id` and `group_name`.

The Lua code corresponding to Nacos discovery is located in `discovery/nacos.lua`. Open the file `nacos.lua`, we can see that several required methods are implemented in it.

A discovery needs to implement at least two methods: `nodes` and `init_worker`.

```Lua
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

The function signature of `nodes` has already explicitly shown the query parameters used to get new nodes: `service_name` and `discovery_args`. For each request, Apache APISIX will use this set to query for the latest node. The method returns an array:

```Bash
{
    {host = "xxx", port = 12100, weight = 100, priority = 0, metadata = ...},
    # priority and metadata are optional
    ...
}
```

And `init_worker` is responsible for starting a timer in the background to ensure that the local node data is consistent with the data discovered by the service.

## Expansion Direction 3: Configure Load Balancing

After obtaining a set of nodes, we have to decide which node to try first in accordance with the rules of load balancing. If several commonly used load balancing algorithms cannot meet your needs, you can also implement a load balancing by yourself.

Let's take load balancing with the least number of connections as an example. The corresponding Lua code is located in `balancer/least_conn.lua`. Open the file `least_conn.lua`, we can see that it implements several required methods: `new`, `get`, `after_balance` and `before_retry_next_priority`.

- `new` is responsible for doing some initialization work.

- `get` is responsible for executing the logic of the selected node.

- `after_balance` will run in the following two situations:

  - Before each retry (when before_retry is true)
  - After the last try

- `before_retry_next_priority` runs before preparing to try the next set of nodes with the same priority, while the current set has been tried.

```Lua
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

If there is no internal state to maintain, you can directly borrow the fixed template code (in the above code, outside the ellipsis) to fill in the two methods of `after_balance` and `before_retry_next_priority`.

After selecting the node, we can also add additional logic in the form of a plugin. The plugin can implement the `before_proxy` method. This method will be called after the node is selected, and we can record the information of the currently selected node in this method, which will be useful in trace.

## Extension Direction 4: Handling Response

We can process the responses returned from upstream in `header_filter` and `body_filter` through the `response-rewrite` plugin. The former method modifies the response header, the latter modifies the response body. Note that Apache APISIX response processing is streaming, so if the response header is not modified inside `header_filter`, the response header will be sent out first and there will be no way to modify the response body when it reaches `body_filter`.

This means that if you want to modify the body later, but there are body-related response headers like Content-Length in the header, you have to change those headers in the `header_filter` in advance. We provide a helper method: `core.response.clear_header_as_body_modified`, which can be called in `header_filter`.

The `body_filter` is also streaming and will be called multiple times. So if you want to get the full response body, you need to put together the partial response body provided by each `body_filter`. On the Apache APISIX master branch, we provide a method called `core.response.hold_body_chunk` to simplify the operation. Interested readers can take a look at the code.

## Extension Direction 5: Reporting Logs and Monitoring Parameters

After the request is finished, we can also do some cleanup work with the `log` method. This type of work can be divided into two categories:

1. Record metrics, such as the `prometheus` plugin.
2. Record the access log, and then report it regularly, such as the `http-logger` plugin.

If you are interested, you can take a look at how the `log` method of these two plugins is implemented:

- [`prometheus` plugin documentation](https://apisix.apache.org/docs/apisix/plugins/prometheus/)
- [`http-logger` plugin documentation](https://apisix.apache.org/docs/apisix/plugins/http-logger/)
