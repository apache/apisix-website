---
title: "Release Apache APISIX 2.8.0"
author: "Ruofei Zhao"
authorURL: "https://github.com/Serendipity96"
authorImageURL: "https://avatars.githubusercontent.com/u/23514812?v=4"
keywords:
- APISIX
- Release Notes
- API Gateway
- Apache APISIX 
description: API Gateway Apache APISIX 2.8 version released independent keepalive connection pool, stream proxy enhancement, support for custom balancer and other functions.
tags: [Community]
---

> Apache APISIX version 2.8 is released!

<!--truncate-->

Apache APISIX version 2.8 is released! 🎉 This version has 30+ developers participated, more than 100 PRs had been submitted, and supports **1 new feature, 1 new experience, 2 new plugins, and 2 new ways to develop**. Read and learn about the new features in version 2.8!
👇👇👇

## Release Notes

### New feature: Independent Keepalive connection pool

Starting with [version 2.7](https://apisix.apache.org/blog/2021/06/29/release-apache-apisix-2.7), we have added Apache APISIX's own patches and the Nginx C module to enhance the native Nginx, allowing dynamic setup of increasing number of Nginx configurations. In version 2.8, Apache APISIX supports the configuration of independent Keepalive connection pools at the Upstream level.

The following features are currently included:

- Dynamically set mTLS
- Dynamically set client_max_body_size
- Upstream Keepalive (2.8 new feature)
- gzip (2.8 new Plug-in)

In future releases, we will continue to allow the following Nginx configurations to be set dynamically:

- real_ip
- proxy_max_temp_file_size
- ……

An example of Upstream configuration:

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

### New experience: Enhance stream proxy

In version 2.8, the [ip-restriction](http://apisix.apache.org/docs/apisix/plugins/ip-restriction/) and [limit-conn](http://apisix.apache.org/docs /apisix/plugins/limit-conn/) had been duplicated from the HTTP section to the stream section. The benefit of this way is to enhance gateway capabilities in the stream proxy and to increase the security of the upstream services.

ip-restriction can be used to filter IP black and white list to ensure that only requests from a specific IP can access the backend service.

limit-conn can be used to limit the number of simultaneous connections on a route, limiting the number of concurrent client accesses.

### New plug-in: gzip

Apache APISIX version 2.8 contains the gzip plug-in. Using the gzip plug-in, you can **dynamically set route-level gzip parameters**.

An example of gzip configuration:

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

### New plug-in: ua-restriction

The `ua-restriction` plugin is used to check if the User-Agent is in the black and white list, which is a very common requirement and can be enabled by way of a plugin.

An example of `ua-restriction` configuration:

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

### New way to develop: Support for executing specific logic by plug-ins

Based on Apache APISIX architecture, many features are implemented by plug-ins. Starting from version 2.8, **Apache APISIX supports executing specific logic by plug-ins after selecting an upstream node.**

Define the following method in the plug-in:

```Lua
function _M.balancer(conf, ctx)
    core.log.notice("IP: ", ctx.balancer_ip, ", Port: ", ctx.balancer_port)
end
```

In this example, the log will output the IP and Port of the upstream.

**Which scenario does the above method apply to?**

1. After selecting the upstream node and before accessing the upstream
2. Before each retry

For the best performance, the above method first runs in the access phase of OpenResty (APISIX actually selects the upstream node in the access phase) and the method does not overlap with the OpenResty phase of the same name.

### New way to develop: Support for custom balancer

In version 2.8, users can customize the balancer. **The balancer is loading with minimum number of connections, polling, consistency hash, etc.**

Although Apache APISIX already provides a set of balancers, users may need to use balancers that are closely related to the business, such as: need to consider the server room, availability zone, etc. Supporting for custom balancer, users can develop their own balancer and load it via `require("apisix.balancer.your_balancer")`.

Usually a custom balancer requires node to provide data which is from other than the host/port, you can put data in the metadata, for example:

```JSON
{
    "nodes": [
        { "host": "0.0.0.0", "port": 1980, "weight": 1, "metadata": {"b": 1} }
    ]
}
```

## Download

Download Apache APISIX 2.8.0

- Source code: please visit [download page](https://apisix.apache.org/downloads/)
- Binary installation package: please visit [Installation Guide](https://apisix.apache.org/docs/apisix/how-to-build/)
