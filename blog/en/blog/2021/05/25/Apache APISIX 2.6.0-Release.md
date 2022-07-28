---
title: Apache APISIX Release 2.6.0
slug: 2021/05/25/apache-apisix-2.6.0-release
author: Zexuan Luo
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- API gateway
- APISIX
- Apache APISIX
- Release Notes
description: Cloud native API gateway Apache APISIX 2.6.0-Release is officially released! Support more new functions, welcome to download and use.
tags: [Community]
---

> Apache APISIX 2.6.0-Release is officially released! Welcome to download and use.

<!--truncate-->

## Release Notes

### New feature: APISIX now supports writing custom plugins in other languages

APISIX now supports writing plug-ins in Lua to perform custom logic during proxy requests, such as calling webhook to notify external systems, performing special authentication logic, and so on. However, there are cases where developers may want to write plugins in languages other than Lua.

For example, developers are not familiar with Lua and want to write plugins in a language they are familiar with, or third-party teams only provide the Java SDK and there is no way to use it inside Lua plugins.

Starting from version 2.6, APISIX supports running plugins written in languages other than Lua with the help of plugin runner. The architecture diagram is as follows.

![2021-05-25-1](https://static.apiseven.com/202108/1639462480260-86431748-7dcd-4643-816b-92104ec5a666.png)

APISIX will run the plugin runner as a sidecar.

They communicate with each other using RPC, with APISIX sending the request data and configuration and plugin runner loading the user's custom plugin, processing that data and telling APISIX what to do with the requests. Currently, it supports executing logic written in non-Lua languages before the proxy request goes upstream. Later on there will be support for rewriting responses in non-Lua languages.

APISIX now places two entry points for the plugin runner to send RPCs: ext-plugin-pre-req, which runs before the Lua plugin logic is executed, and ext-plugin-post-req, which runs after the Lua plugin is executed and before the proxy request goes upstream. Both entries can be dynamically switched on and off at the route level.

Assuming we have ext-plugin-pre-req enabled for some requests, and the plugin runner has the validator and rewrite plugins loaded, then for each matching request, it will trigger an RPC call to the plugin runner, first executing the Based on the result, APISIX can determine whether to continue executing the request or reject it. If the request continues, it will run the Lua plugins built into APISIX, such as the flow and speed limiting plugins. If ext-plugin-post-req is enabled, the opposite is true.

The plugin runner for Java and Go is already in development. The Java version of the plugin runner is expected to be available within this week, and the Go version of the plugin runner will be completed in June.

### Security enhancement: change the Prometheus default port to no longer expose the port to the data plane

Previously, by default, Prometheus data would be exposed to the port on the data plane, and although you could restrict IP access by configuring the plugin interceptor, there was still the problem of insecurity by default. So starting with 2.6, a new port is dedicated to exposing metrics and by default only listens to 127.0.0.1 .

Prior to 2.6, Prometheus collected APISIX metrics on the data side of the port (default port 9080).

The new port is port 9091 and only listens to 127.0.0.1. You need to change the listening address to your server's intranet address and add a firewall rule to ensure that only Prometheus can access it.

### Support: Ecological full support for Nacos service discovery

APISIX adds support for the Nacos service discovery feature.

Users only need to enable the Nacos service discovery function and set the service name in the upstream configuration, and APISIX will periodically get the instance address of the corresponding service in Nacos based on the service name in the background. In this way, there is no need to configure the specific upstream node address inside APISIX, only inside Nacos.
Currently, the following external services are supported by APISIX built-in service discovery function.

1. DNS
2. Consul KV mode
3. Eureka
4. Nacos

### Support: Configuring DNS resolver for IPv6

Previously, when configuring DNS resolver for APISIX, only IPv4 servers could be configured. Since version 2.6, we have added support for IPv6 DNS servers.

Now when configuring DNS resolver, you can write IPv6 server address.

## Download

To download the Apache APISIX 2.6.0-Release source code and binary installation package, please visit the download page: `https://apisix.apache.org/downloads/`.

## Documentation Update

During this release, we are also continuously updating and releasing new documentation for use, and welcome your valuable comments.

`https://apisix.apache.org/docs/apisix/getting-started/`

For more details, see the Changelog for version 2.6 and the Apache APISIX commits on GitHub.
