---
title: "新插件 forward-auth 已上线，认证功能又多一项选择"
authors:
  - name: "白泽平"
    title: "Author"
    url: "https://github.com/bzp2010"
    image_url: "https://avatars.githubusercontent.com/u/8078418?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API 网关
- 认证
- 生态
description: 本文将介绍 Apache APISIX 中新增插件 `forward-auth` 的使用方法，为大家详细说明如何使用这款设计简洁的认证模型。
tags: [Authentication,Plugins]
---

> 本文将介绍 Apache APISIX 中新增插件 `forward-auth` 的使用方法，为大家详细说明如何使用这款设计简洁的认证模型。

<!--truncate-->

Forward Auth 能巧妙地将认证与授权逻辑转移至专门的外部服务中，网关会将用户的请求转发至认证服务中，并在认证服务响应非 20x 状态时，阻止原有请求并替换结果。通过这样的方式，就可以实现认证未通过时，返回自定义报错或用户重定向至认证页面。接下来将为大家介绍 Apache APISIX 中新增插件 `forward-auth` 的使用方法。

## 原理

![插件原理图](https://static.apiseven.com/202108/1643096414141-ccbc33c0-7899-445a-a2f8-b6d5341c44df.jpg)

关于 `forward-auth` 插件在 Apache APISIX 中的运行原理与流程如上图所示，具体总结为以下几步：

- 第一步：由客户端向 APISIX 发起请求
- 第二步：由 APISIX 向用户配置的认证服务发起请求
- 第三步：认证服务响应（2xx 或异常状态）
- 第四步：APISIX 会根据认证服务响应，决定向上游转发请求或直接向客户端发送拒绝响应

## 如何使用

### 步骤一：设置认证服务

假设有这样一项认证服务，用户向其发送带有 Authorization 请求头的请求。如果这个数据通过验证则返回 200 状态码和一个名为 `X-User-ID` 的响应头；如果没有通过验证则认为认证状态过期，返回 302 状态码和 `Location` 响应头将客户端重定向至登录页面。

### 步骤二：创建路由并开启 `forward-auth` 插件

接下来，我们将配置一个路由并开启 `forward-auth` 插件，将上述的认证服务和上游应用对接起来。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "forward-auth": {
            "address": "http://127.0.0.1:9080/auth",
            "request_headers": ["Authorization"],
            "upstream_headers": ["X-User-ID"],
            "client_headers": ["Location"]
        }
    },
    "uri": "/user"
}'
```

上述配置细节释义：

- 当有请求匹配到当前路由时，发送一个请求至 `address` 中的地址，其中将附带`request_headers` 中定义的请求头 `Authorization`（即配置需要由客户端转发至认证服务的请求头，如果不设置则不转发任何请求头），认证服务可以据此进行用户身份确认。
- 如果认证通过，状态码为 200 并返回一个 `upstream_headers` 中定义的 `X-User-ID`（即认证通过时由认证服务转发至上游的请求头，如果不设置则不转发任何请求头）。
- 如果认证失败，状态码为 302 并返回一个在 `client_headers` 中定义的 `Location`（即认证失败时由认证服务向客户端发送的响应头，如果不设置则不转发任何响应头）。

### 步骤三：测试请求

```shell
# 使用 POST 请求并发送数据
curl http://127.0.0.1:9080/user \
    --header 'Authorization: true'

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 28
Server: APISIX/2.11.0

{"user_id":"i-am-real-user"}

# 使用 GET 请求
curl -i http://127.0.0.1:9080/user \
    --header 'Authorization: false'

HTTP/1.1 302 FOUND
Server: APISIX/2.11.0
Location: https://example.com/auth
```

### 补充：关闭插件

如已使用完毕，只需移除路由配置中 `forward-auth` 插件相关配置并保存，即可关闭路由上的 Forward Auth 插件。得益于 Apache APISIX 的动态化特性，开启关闭插件的过程都不需要重启 Apache APISIX。

## 总结

想要获取更多关于 `forward-auth` 插件说明和完整配置列表，可参考[官方文档](https://apisix.apache.org/docs/apisix/next/plugins/forward-auth)。同时，如果您有更加复杂的认证或授权应用场景，也可以尝试使用 `opa` 插件，该插件允许以可编程的方式提供更强大的功能。

目前，Apache APISIX 也在开发其他插件以支持集成更多服务，如果您对此感兴趣，欢迎随时在 [GitHub Discussion](https://github.com/apache/apisix/discussions) 中发起讨论，也可通过[邮件列表](https://apisix.apache.org/zh/docs/general/join)进行交流。
