---
title: "在 APISIX 中使用 Casbin 授权"
slug: 2021/08/18/auth-with-casbin-in-apache-apisix
author: "Casbin 社区 & Apache APISIX 社区"
keywords:
- API 网关
- APISIX
- Apache APISIX
- Casbin
- RBAC
description: 当你在使用 API 网关 Apache APISIX 时，可能需要添加复杂的授权逻辑。你可以使用 APISIX 的内置 Casbin 插件（authz-casbin）来实现基于角色的访问控制（RBAC）模型。
tags: [Ecosystem, Plugins]
image: https://static.apiseven.com/2022/blog/0818/plugins/casbin.png
---

> 当我们在使用 Apache APISIX 时，可能想要在应用里添加复杂的授权逻辑。在此篇文章中，我们将使用 Apache APISIX 的内置 Casbin 插件（authz-casbin）来实现基于角色的访问控制（RBAC）模型。

<!--truncate-->

## 介绍

### Apache APISIX

[Apache APISIX](https://github.com/apache/apisix) 是一个动态、实时、高性能的 API 网关， 提供负载均衡、动态上游、灰度发布、精细化路由、限流限速、服务降级、服务熔断、身份认证、可观测性等数百项功能。你可以使用 Apache APISIX 来处理传统的南北向流量，以及服务间的东西向流量， 也可以当做 [k8s ingress controller](https://github.com/apache/apisix-ingress-controller) 来使用。

### Casbin

[Casbin](https://casbin.org/zh-CN/) 是一个强大的、高效的开源访问控制框架，其权限管理机制支持多种访问控制模型。

### authz-casbin 插件介绍

在 Apache APISIX 的使用中，路由匹配和请求授权之间有个隐含的矛盾点：为了更高细粒度的权限控制，需要配置更高细粒度的路由，来精准识别请求并对请求进行授权。在复杂的授权模型场景下，这将导致路由数量成倍增加，加剧了运维复杂度。
[authz-casbin](https://github.com/apache/apisix/blob/d9b928321fcdd12eef024df8c7c410424c1e0c8b/docs/en/latest/plugins/authz-casbin.md) 是一个基于 lua-casbin 的 Apache APISIX 插件，支持基于各种访问模型的强大授权。Casbin 是一个强大的、高效的开源访问控制框架，支持 ACL、RBAC、ABAC 等访问控制模型，lua-casbin 是 Casbin 访问控制框架的 Lua 版本实现。
authz-casbin 插件可以把路由匹配和请求授权这两个功能很好地进行解耦，你可以将各种授权访问模型加载到 Apache APISIX 中，借助 lua-casbin 实现高效复杂的授权模式。

**注意**：如果你想要实现身份验证（authentication），你需要使用其他插件或者自己来配置完成验证用户身份，比如 [jwt-auth](https://github.com/apache/apisix/blob/master/docs/zh/latest/plugins/jwt-auth.md) 插件。

## authz-casbin 使用指南

### 创建一个模型

authz-casbin 插件使用三个参数来进行授权：subject、object 和 action。subject 是用户名，代指请求中的用户；object 是将要被访问的 URL 链接也就是将被访问的资源；action 是请求授权的行为，比如读操作（read）或者是写操作（write）。
假如，我们想要创建一个模型来访问三个资源：/，/res1，/res2，我们想要一个类似于这样的模型：

![authz-casbin example](https://static.apiseven.com/202108/1639467795044-8676c5cb-00e0-48e1-b7b1-929e37c87b75.png)

在这个模型中，所有的用户，例如 Jack，可以访问主页面（/）。而像 Alice 和 Bob 具有管理员权限的用户则可以访问所有的页面和资源（/res1，/res2，/）。这样，我们就需要来限制没有管理员权限的用户只能使用 GET 请求方法访问特定的资源。所需要的模型如下：

```shell
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = (g(r.sub, p.sub) || keyMatch(r.sub, p.sub)) && keyMatch(r.obj, p.obj) && keyMatch(r.act, p.act)
```

### 创建一条策略

从上述的例子来看，策略应该像是这样的：

```shell
p, *, /, GET
p, admin, *, *
g, alice, admin
g, bob,admin
```

模型里的 matcher 表明：

1. `(g(r.sub, p.sub) || keyMatch(r.sub, p.sub))`：请求里的 subject 和策略里的 subject 有着相同的角色或者请求里的 subject 和策略里的 subject 可以通过内置的方法 `keyMatch` 匹配。`keyMatch` 作为 Lua Casbin 的内置函数，相关的描述以及更多的函数可跳转 [lua-casbin](https://github.com/casbin/lua-casbin/blob/master/src/util/BuiltInFunctions.lua)。
2. `keyMatch(r.obj, p.obj)`：请求里的 object 和策略里的 object 可相互匹配（代指 URL 链接）。
3. `keyMatch(r.act, p.act)`：请求里的 action 和策略里的 action 可相互匹配（代指 HTTP 请求方法）。

### 在路由上使用插件

一旦你创建了模型和策略，你可以使用 APISIX Admin API 在路由上使用。若想使用，你可以模型和策略的文件路径：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "authz-casbin": {
            "model_path": "/path/to/model.conf",
            "policy_path": "/path/to/policy.csv",
            "username": "user"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/*"
}'
```

在这里，username 是传递到 subject 里的用户名。例如，你可以设置`"username":"user"`来把你定义的`"user":"alice"`传递到 username ，让 username 成为 Alice。
同样，你可以将模型和策略直接放到里面：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "authz-casbin": {
            "model": "[request_definition]
            r = sub, obj, act

            [policy_definition]
            p = sub, obj, act

            [role_definition]
            g = _, _

            [policy_effect]
            e = some(where (p.eft == allow))

            [matchers]
            m = (g(r.sub, p.sub) || keyMatch(r.sub, p.sub)) && keyMatch(r.obj, p.obj) && keyMatch(r.act, p.act)",

            "policy": "p, *, /, GET
            p, admin, *, *
            g, alice, admin",

            "username": "user"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/*"
}'
```

### 利用全局模型/策略使用插件

在一些情形中，你可能想要在多个路由中使用相同的模型和策略，你可以首先发送一个 PUT 请求将模型和策略的配置发送到插件的元数据：

```shell
curl <http://127.0.0.1:9080/apisix/admin/plugin_metadata/authz-casbin> -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -i -X PUT -d '
{
"model": "[request_definition]
r = sub, obj, act
[policy_definition]
p = sub, obj, act
[role_definition]
g = _, _
[policy_effect]
e = some(where (p.eft == allow))
[matchers]
m = (g(r.sub, p.sub) || keyMatch(r.sub, p.sub)) && keyMatch(r.obj, p.obj) && keyMatch(r.act, p.act)",
"policy": "p, *, /, GET
p, admin, *, *
g, alice, admin
g, bob, admin"
}'
```

然后，你需要使用 Admin API 来发送请求使得多个路由使用相同的模型/策略配置；

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "authz-casbin": {
            "username": "user"
        }
    },
    "upstream": {
        "nodes": {
            "127.0.0.1:1980": 1
        },
        "type": "roundrobin"
    },
    "uri": "/*"
}'
```

这将会将插件的配置动态地添加到路由中。通过向插件的配置数据中发送更新模型和策略的请求，你可以轻松地更新插件的配置。

## 最后

感谢 Casbin 和 Apache APISIX 社区的开发者们，从 Casbin 社区的开发者 rushitote 提出 issue，提交 PR，到 Apache APISIX 社区的开发者们积极地 review PR，这个跨社区的合作友好而有序地向前推进，响应 open source makes world better。

来源：[authorization-in-apisix-using-casbin](https://medium.com/@rushitote/authorization-in-apisix-using-casbin-59b693669d6d)
