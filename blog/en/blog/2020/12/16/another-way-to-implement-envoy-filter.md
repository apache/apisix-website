---
title: "Envoy and Apache APISIX: Another way to implement the Envoy filter"
author: "Junxu Chen"
authorURL: "https://github.com/nic-chen"
authorImageURL: "https://avatars.githubusercontent.com/u/33000667?v=4"
keywords:
- API Gateway
- APISIX
- Apache APISIX
- Envoy
- Envoy filter
description: This article describes extending Envoy with new functionality and concrete examples using the base library of the cloud-native API gateway Apache APISIX.
tags: [Ecosystem]
---

> This article explains how to run Apache APISIX plugins in Envoy.

<!--truncate-->

> Source: https://www.apiseven.com/en/blog/another-way-to-implement-envoy-filter

## Ways to implement Envoy filter

### Envoy filter

Envoy is an L7 proxy and communication bus designed for large modern service oriented architectures.
A pluggable filter chain mechanism allows filters to be written to perform different tasks and inserted into the main server.

![Envoy filter](https://static.apiseven.com/filters.png)

### Expansion method

The existing filters may not meet the user's custom requirements. In this case, Envoy needs to be extended. Customize new filters according to the existing filter chain to achieve customization requirements.

Developers can extend Envoy in three ways:

|       | Getting Started difficulty |  stability   | development efficiency |          Deploy and compile          |
| :---: | :------------------------: | :----------: | :--------------------: | :----------------------------------: |
|  C++  |            high            |    stable    |          low           |         long time to compile         |
|  Lua  |            low             |    stable    |          High          | no need to compile, deploy directly  |
| WASM  |        high-medium         | on the fence |  depends on language   | compilation time depends on language |

1. Using C++ to extend

In this way, C++ code is written directly on the basis of Envoy for functional enhancement. After implementing a custom filter, the new binary file is recompiled to complete the upgrade. There are two problems with this way:

- Limited by the C++ language, difficulty of getting started, scarcity of developers.

- Increasing the complexity of deployment, operation and maintenance, and upgrades. Envoy will become heavier and heavier, and every change requires recompiling the binary file, which is not conducive to iteration and management.

2. Using Lua to extend

Lua is born to be embedded in the application, so as to provide flexible extension and customization features for application, and is widely used.

Lua Filter allows Lua scripts to be run in the request and response process. The main features currently supported include: inspection of headers, body, and trailers while streaming in either the request flow, response flow;modification of headers and trailers;blocking and buffering the full request/response body for inspection;performing an outbound async HTTP call to an upstream host;performing a direct response and skipping further filter iteration, etc.

At present, many people directly distribute Lua code in configuration, which is not conducive to code organization and management, and it is difficult to share with others to form an ecosystem.

3. Using WASM extension

Developers can write filters in their own programming language, compile them into WASM format using tools, and embed them into Envoy to run.

It currently supports few languages, and using these languages ​​to extend is still not that simple. On the other hand, many people still have reservations about WASM and may not directly use it.

## Apache APISIX solution

Based on the above analysis, we could see that Lua is very suitable for extending Envoy, and it is easy to learn, and the development efficiency is extremely high. Because it is embedded in Envoy, there is no additional network overhead, and the performance is good.

[Apache APISIX](https://github.com/apache/apisix) community proposes its own solution based on Lua, which is to provide a powerful and flexible basic library to implement all plugins of Apache APISIX and plugins that will be developed in the future to run on Envoy. Developers could also develop their own customized plugins based on this basic library.

Apache APISIX is a dynamic, real-time, high-performance API gateway, based on the Nginx library and Lua. Apache APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

### Example

Please check the repo for specific code and how to run: [https://github.com/api7/envoy-apisix](https://github.com/api7/envoy-apisix)

The relevant configuration of Envoy is as follows:

Define a Filter:

```yaml
http_filters:
- name: entry.lua
  typed_config:
    "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.Lua
    source_codes:
      entry.lua:
        filename: /apisix/entry.lua
```

Enable the Filter for a route and configure it with metadata:

```yaml
routes:
- match:
    prefix: "/foo"
  route:
    cluster: web_service
  typed_per_filter_config:
    envoy.filters.http.lua:
      "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.LuaPerRoute
      name: entry.lua
  metadata:
    filter_metadata:
      envoy.filters.http.lua:
        plugins:
        - name: uri-blocker
          conf:
            rejected_code: 403
            block_rules:
            - root.exe
            - root.m+
```

### How does it work

We don't need to make major changes to Envoy, only some optimizations that are suitable for public needs.

We shield platform differences for the plugin layer. All interfaces that need to be used are abstracted in the underlying framework, which we call apisix.core, so that all plugins can run on Envoy and Apache APISIX at the same time.

![Architecture diagram](https://static.apiseven.com/main.png)

We use the previous example to show how the plugin runs:

![Plugin workflow](https://static.apiseven.com/workflow.png)

#### First step, read configuration

We configure through metadata to determine what plugins need to run on each route and what configuration is for each plugin.
In the example, we configured plugin `uri-blocker` for the route whose prefix is ​​`/foo`, as well as the block rule of the plugin and the response status when a block is required.

#### Second step, parse request

We encapsulated the client request data into `ctx` so that it can be used directly in the entire process.

#### Third step, run the plugin

We determine whether we need to block this request by matching the configured rules and the obtained uri. If a block is needed, we call `respond` to directly respond, otherwise we let it go.

## Future outlook

More and more APISIX plugins are available to run on Envoy, and finally all APISIX plugins (Even that will be developed in the future) will be available to run on Envoy.

At the same time, we hope that we could work with the Envoy community in the direction of Lua Filter, optimize and improve Lua Filter, enhance the expansion capabilities of Envoy, and reduce the difficulty of Envoy expansion.
