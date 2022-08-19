---
title: Licensing with Casbin in Apache APISIX
slug: 2021/08/18/auth-with-casbin-in-apache-apisix
author: Casbin & Apache APISIX
keywords:
- API Gateway
- APISIX
- Apache APISIX
- Casbin
- RBAC
description: When we are using API Gateway Apache APISIX, we may need to add complex authorization logic. we can implement RBAC using APISIX's built-in Casbin plugin (authz-casbin).
tags: [Ecosystem, Plugins]
image: https://static.apiseven.com/2022/blog/0818/plugins/casbin.png
---

> When we are using Apache APISIX, we may want to add complex authorization logic to our application. In this post, we will use the built-in Casbin plugin (authz-casbin) for Apache APISIX to implement a role-based access control (RBAC) model.

<!--truncate-->

## Introduction

### Apache APISIX

[Apache APISIX](https://github.com/apache/apisix) is a dynamic, real-time, high-performance API gateway that provides load balancing, dynamic upstream, canary release, fine-grained routing, flow and speed limiting, service degradation, service meltdown, authentication, observability, and hundreds of other features. You can use Apache APISIX for traditional north-south traffic, as well as east-west traffic between services, or as a [k8s ingress controller](https://github.com/apache/apisix-ingress-controller).

### Casbin

[Casbin](https://casbin.org/zh-CN/) is a powerful and efficient open source access control framework with a permission management mechanism that supports multiple access control models.

### authz-casbin plugin introduction

In the use of Apache APISIX, there is an implicit tension between route matching and request authorization: for higher granularity access control, higher granularity routes need to be configured to accurately identify requests and authorize them. In complex authorization model scenarios, this leads to an exponential increase in the number of routes, which increases the complexity of operations and maintenance.
[authz-casbin](https://github.com/apache/apisix/blob/d9b928321fcdd12eef024df8c7c410424c1e0c8b/docs/en/latest/plugins/authz-casbin.md) is a lua-casbin based Apache APISIX plugin that supports powerful authorization based on various access models. casbin is a powerful and efficient open source access control framework that supports ACL, RBAC, ABAC and other access control models. lua-casbin is a Lua version implementation of the Casbin access control framework.
The authz-casbin plugin can decouple the two functions of route matching and request authorization very well. You can load various authorization access models into Apache APISIX and implement efficient and complex authorization models with the help of lua-casbin.

**Note**: If you want to implement authentication, you need to use other plugins or configure yourself to complete the authentication of the user's identity, for example [jwt-auth](https://github.com/apache/apisix/blob/master/docs/zh/latest/plugins/jwt-auth.md) plugin.

## authz-casbin Usage Guide

### Create a model

The authz-casbin plugin uses three parameters for authorization: subject, object and action. subject is the user name, which refers to the user in the request; object is the URL link that will be accessed, i.e. the resource that will be accessed; action is the action that is requested for authorization, such as read or write. (write).
If we want to create a model to access three resources: /, /res1, /res2, we want a model like this

![authz-casbin example](https://static.apiseven.com/202108/1639467795044-8676c5cb-00e0-48e1-b7b1-929e37c87b75.png)

In this model, all users, such as Jack, have access to the main page (/). And users like Alice and Bob with admin rights have access to all pages and resources (/res1, /res2, /). Thus, we need to restrict users without administrator privileges to access specific resources using the GET request method. The required model is as follows.

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

### Create a policy

From the above example, the policy should look like this.

```shell
p, *, /, GET
p, admin, *, *
g, alice, admin
g, bob,admin
```

The matcher in the model indicates that.

1. `(g(r.sub, p.sub) || keyMatch(r.sub, p.sub))`: The subject in the request and the subject in the policy have the same role or the subject in the request and the subject in the policy can be matched by the built-in method `keyMatch`. `keyMatch` is a built-in function of Lua Casbin, a description of which and more can be found at [lua-casbin](https://github.com/casbin/lua-casbin/blob/master/src/util/BuiltInFunctions.lua).
2. `keyMatch(r.obj, p.obj)`: the object in the request and the object in the policy can match each other (proxy for URL links).
3. `keyMatch(r.act, p.act)`: the action in the request and the action in the policy match each other (proxy for the HTTP request method).

### Using plugins on routes

Once you have created a model and a policy, you can use it on a route using the APISIX Admin API. To use it, you can model and policy file paths to.

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

In this case, username is the username passed into the subject. For example, you can set `"username": "user"` to pass the `"user": "alice"` you defined to the username, making the username Alice.
Similarly, you can put models and policies directly into

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

### Using plugins with global models/policies

In some cases where you may want to use the same model and policy in multiple routes, you can first send a PUT request to send the model and policy configuration to the plugin's metadata at

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

You then need to use the Admin API to send a request to make multiple routes use the same model/policy configuration; the

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

This will add the plugin's configuration to the route dynamically. You can easily update the plugin's configuration by sending a request to update the model and policy in the plugin's configuration data.

## Finally

Thanks to the developers of Casbin and Apache APISIX communities, from the Casbin community developers rushitote to raise issues and submit PRs, to the Apache APISIX community developers to actively review PRs, this cross-community collaboration is moving forward in a friendly and orderly way, responding to open source makes the world better.

Source: [authorization-in-apisix-using-casbin](https://medium.com/@rushitote/authorization-in-apisix-using-casbin-59b693669d6d)
