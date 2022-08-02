---
title: "Release Apache APISIX 2.9"
author: "Zexuan Luo"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- APISIX
- API Gateway
- Apache APISIX
- Release Notes
description: The Apache APISIX 2.9 version of the cloud native API gateway adds the authz-casbin plugin and the dynamic configuration of real-ip at the routing level.
tags: [Community]
---

> Apache APISIX version 2.9 is released!

<!--truncate-->

Apache APISIX version 2.9 is officially released! 🎉 This release has 30+ developers, 100+ PR submissions, 2 new features, and further improved support for plugins, come and learn about the new features in Apache APISIX 2.9!

## New Plugin: authz-casbin

The Casbin community has contributed [authz-casbin](https://github.com/apache/apisix/blob/d9b928321fcdd12eef024df8c7c410424c1e0c8b/docs/en/latest/) to APISIX plugins/authz-casbin.md) plugin to APISIX, and in the new APISIX 2.9 release, APISIX can combine Casbin to do granular permission management at the route level.

Casbin is an open source access control framework that supports configuration to decide whether to allow a certain access operation. With the authz-casbin plugin, we can do multiple roles of access control in one route at the same time.

This control can be set either through a configuration file or through the APISIX Control Plane; it can take effect for a given route or set global defaults. It is very flexible.

If you are interested in this plugin, you are welcome to read [Authorization with Casbin in Apache APISIX](https://apisix.apache.org/blog/2021/08/25/Auth-with-Casbin-in-Apache-APISIX).

## New Feature: Dynamic Configuration of real-ip at Route Level

Apache APISIX version 2.9 now supports dynamic configuration of real-ip at the route level!

The new version adds the [real-ip](https://apisix.apache.org/zh/docs/apisix/plugins/real-ip/) plugin, which dynamically changes the IP and port of the client seen by APISIX.

We can use this plugin to dynamically set real-ip parameters.

```JSON
{
    "plugins": {
        "real-ip": {
            "source": "http_x_forwarded_for",
            "trusted_addresses": ["127.0.0.0/24"]
        }
    }
}
```

## Improvement: External Plug-in Mechanism

Apache APISIX version 2.9 further improves the support for external plugins with two major changes:

1. When sending a plugin configuration to Plugin Runner, a unique key is sent. because APISIX is a multi-process architecture, in the past, a plugin configuration was sent several times, causing Plugin Runner to update the plugin configuration repeatedly. Now, with this unique key, Plugin Runner can identify duplicate configurations. This makes it possible to implement a plug-in inside Plugin Runner that limits flow!

2. Add a mechanism to get APISIX information from Plugin Runner in the reverse direction. In addition to the request header and request path information sent from APISIX to Plugin Runner, Plugin Runner can also query information from APISIX in the reverse direction. The Var API has been implemented in the Go Plugin Runner implementation to use this mechanism to get information about Nginx variables such as the request_time of the request.

The [Go Plugin Runner](https://github.com/apache/apisix-go-plugin-runner/tree/6f249010b83a124bc30e940635db7fa0838e2c4a), which includes this change, will be released next week Version 0.2.0 will be released next week, so stay tuned!

## Improvement: Existing Plug-ins Enhancement

APISIX version 2.9 improves the functionality of existing plugins with two major changes:

1. the [request-id](https://apisix.apache.org/docs/apisix/plugins/request-id/) plugin supports ID generation via the snowflake algorithm. the snowflake ID generation algorithm is a distributed ID generation mechanism, which generates The snowflake ID generation algorithm is a distributed ID generation mechanism that combines machine IDs, timestamps, and generation sequences. We use etcd to ensure that each worker is assigned a unique machine ID.

2. The [error-log-logger](https://apisix.apache.org/docs/apisix/plugins/error-log-logger/) plugin supports reporting error logs to skywalking, adding to the observability of APISIX. This adds to the observability of APISIX.

## Download

Download Apache APISIX 2.9

- Source code: please visit [download page](https://apisix.apache.org/downloads/)
- Binary installation package: please visit [Installation Guide](https://apisix.apache.org/docs/apisix/how-to-build/)
