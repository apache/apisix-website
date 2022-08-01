---
title: "Apache APISIX 2.9 正式发布"
author: "罗泽轩"
authorURL: "https://github.com/spacewander"
authorImageURL: "https://avatars.githubusercontent.com/u/4161644?v=4"
keywords:
- API 网关
- APISIX
- Release
- Lua
- Nginx
- APISIX 2.9
description: 云原生 API 网关 Apache APISIX 2.9 版本正式发布！该版本新增了 authz-casbin 插件、路由级别上 real-ip 的动态配置以及完善外部插件机制。
tags: [Community]
---

> Apache APISIX 2.9 版本正式发布！

<!--truncate-->

Apache APISIX 2.9 版本正式发布！🎉 该版本有 30+ 开发者参与，共提交了 100+ PR，新增了 2 个新功能，进一步完善了对插件的支持，快来了解 Apache APISIX 2.9 版本的新特性吧！

👇👇👇

## 新功能：新增 authz-casbin 插件

Casbin 社区向 APISIX 贡献了 [authz-casbin](https://github.com/apache/apisix/blob/d9b928321fcdd12eef024df8c7c410424c1e0c8b/docs/en/latest/plugins/authz-casbin.md) 插件，在 APISIX 2.9 新版本中，APISIX 可以结合 Casbin 做路由级别上的精细化权限管理。

Casbin 是一个开源的访问控制框架，支持通过配置来决定是否允许某个访问操作。通过 authz-casbin 插件，我们可以在一个路由里同时做多种角色的访问控制。

这一控制既可以通过配置文件设置，也可以通过 APISIX Control Plane 配置；既可以针对给定路由生效，又可以设置全局的默认值。可以说非常地灵活。

如果您对这一插件感兴趣，欢迎您移步阅读 [在 Apache APISIX 中使用 Casbin 进行授权](https://apisix.apache.org/blog/2021/08/18/Auth-with-Casbin-in-Apache-APISIX) 。

## 新功能： 路由级别上 real-ip 的动态配置

APISIX 2.9 版本现在支持在路由级别上动态配置 real-ip 了！

新版本新增了 [real-ip](https://apisix.apache.org/zh/docs/apisix/plugins/real-ip/) 插件，real-ip 插件可以动态地改变 APISIX 看到的客户端的 IP 和端口。

我们可以使用这个插件动态设置 real-ip 参数.

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

## 完善：外部插件机制

APISIX 2.9 版本进一步完善了对外部插件的支持，做出了两个较大的改动：

1. 向 Plugin Runner 发送插件配置时，会发送一个唯一 key。由于 APISIX 是多进程架构，过去发送插件配置时会出现一个配置被发送几次的情况，导致 Plugin Runner 重复更新插件配置。如今，凭借这个唯一 key，Plugin Runner 可以识别重复的配置。这使得在 Plugin Runner 里面实现限流一类的插件变得可能！

2. 增加从 Plugin Runner 反向获取 APISIX 信息的机制。除了 APISIX 向 Plugin Runner 发送的请求头、请求路径等信息外，Plugin Runner 也可以反向从 APISIX 查询信息。目前已经在 Go Plugin Runner 的实现中，借助这一机制实现了 Var API，可以得到请求的 request_time 等跟 Nginx 变量相关的信息。

包含了这一改动的 [Go Plugin Runner](https://github.com/apache/apisix-go-plugin-runner/tree/6f249010b83a124bc30e940635db7fa0838e2c4a) 将会在下周发布 0.2.0 版本，敬请期待！

## 完善：现有插件功能更为丰富

APISIX 2.9 版本完善了现有插件的功能，做出了两个较大的改动：

1. [request-id](https://apisix.apache.org/zh/docs/apisix/plugins/request-id/) 插件支持通过 snowflake 算法生成 ID。snowflake ID 生成算法是一套分布式的 ID 生成机制，其生成的 ID 结合了 machine ID、时间戳和生成序列。我们通过 etcd 来保证每个 worker 都能分配到一个唯一的 machine ID。

2. [error-log-logger](https://apisix.apache.org/zh/docs/apisix/plugins/error-log-logger/) 插件支持上报 error log 给 skywalking，让 APISIX 的可观测性锦上添花。

## 下载

您可以通过以下页面下载 Apache APISIX 2.9：

- 源代码：请访问[下载页面](https://apisix.apache.org/downloads/)
- 二进制安装包：请访问[安装指南](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
