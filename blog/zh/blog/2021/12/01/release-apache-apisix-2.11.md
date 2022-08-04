---
title: "Apache APISIX 2.11.0 正式发布"
authors:
  - name: "罗泽轩"
    title: "Author"
    url: "https://github.com/spacewander"
    image_url: "https://avatars.githubusercontent.com/u/4161644?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API 网关
- WASM
- Azure
- LDAP
description: API 网关 Apache APISIX 2.11.0 版本正式发布，该版本支持了 LDAP 认证插件，datadog 监控插件，通过网关暴露 Azure 的 FaaS 函数以及提供 WASM 相关支持等功能。
tags: [Community]
---

> Apache APISIX 2.11.0 版本正式发布，这是继 2.10.0 LTS 版本后第一版带有新功能的版本。

<!--truncate-->

Apache APISIX 2.11.0 版本是继上次 2.10.0 LTS 版本发布后，第一个带有新功能的版本。不仅丰富了插件库，还带来了新鲜的生态支持。

## 新功能：新增基于 LDAP 的认证插件

Apache APISIX 长长的认证插件名单上又添加了新成员——基于 LDAP 的 `ldap-auth` 插件。通过该插件我们可以打通 LDAP 的账户体系和 Apache APISIX 的 Consumer 机制。

我们通过代码端简单进行示例展示：

```shell
curl http://127.0.0.1:9080/apisix/admin/consumers -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "user01",
    "plugins": {
        "ldap-auth": {
            "user_dn": "cn=user01,ou=users,dc=example,dc=org"
        }
    }
}'
```

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "methods": ["GET"],
    "uri": "/hello",
    "plugins": {
        "ldap-auth": {
            "base_dn": "ou=users,dc=example,dc=org",
            "ldap_uri": "localhost:1389",
            "uid": "cn"
        },
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

在上述配置中，我们把 `user01` 绑定到 `route 1` 上。这样我们在访问 `route 1` 时就带上了 `user01` 的密码，就可以通过 LDAP 的身份认证了。

运行结果就像这样：

```shell
curl -i -uuser01:password1 http://127.0.0.1:9080/hello
HTTP/1.1 200 OK
...
hello, world
```

## 新功能：可观测性层面对接更多监控体系

新版本的 Apache APISIX 丰富了对外部监控服务的支持。在这方面，我们新增了两个插件：

* 上报指标到 datadog 的 `datadog` 插件
* 上报访问日志到 Apache Skywalking 的 `skywalking-logger` 插件

Datadog 是海外广泛使用的 SaaS 监控服务，而 Apache Skywalking 是享誉全球的开源监控软件。如今用户只需在路由上简单配置一下，就能实现与它们的对接。

Datadog 示例：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
      "plugins": {
            "datadog": {}
       },
      "upstream": {
           "type": "roundrobin",
           "nodes": {
               "127.0.0.1:1980": 1
           }
      },
      "uri": "/hello"
}'
```

Apache SkyWalking 示例：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins":{
        "skywalking-logger":{
            "endpoint_addr":"http://127.0.0.1:12800"
        }
    },
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "127.0.0.1:1980":1
        }
    },
    "uri":"/hello"
}'
```

## 新功能：通过网关暴露 Azure 的 FaaS 函数

网关能做的不仅仅是代理内部服务，我们也可以用它来连接外部的系统。

现在通过 `azure-functions` 插件，就可以利用 HTTP 请求触发 Azure functions 服务上的函数了。

接下来我们将通过下方示例来展示如何把 Azure 上配置好的函数，跟 Apache APISIX 上 `/azure_HttpTrigger` 路由连接起来。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins":{
        "azure-functions":{
            "function_uri":"http://test-apisix.azurewebsites.net/api/HttpTrigger",
            "authorization":{
                "apikey":"<Generated API key to access the Azure-Function>"
            }
        }
    },
    "uri":"/azure_HttpTrigger"
}'
```

对该路由的访问，等价于对 FaaS 平台上的函数调用。与此同时，我们也可以在此过程中加入鉴权、限流等对应的限制。

## 新功能：提供 WASM 相关支持

目前 Apache APISIX 已开始提供对 WASM 的初步支持。凭借 Proxy WASM SDK，我们可以采用 Lua 以外的语言，编写运行在 Apache APISIX 内部的插件。

有别于之前的外部插件功能，这一机制是运行在 Apache APISIX 内部的，所以在性能上相比之前会更加出色。

在 Apache APISIX 里使用 WASM 插件，就像采用 Lua 插件一样，两者都支持在路由和全局范围上生效。我们在 Apache APISIX 代码仓库里放置了一个基于 WASM 实现的 `fault-injection` 插件，感兴趣的读者可以看一下它跟 Lua 版本的同名插件的区别。

更多关于 Apache APISIX 支持 WASM 的技术细节可以参考[这篇文章](https://apisix.apache.org/zh/blog/2021/11/19/apisix-supports-wasm)。

目前 Apache APISIX 对 WASM 的支持还处于早期阶段，我们会在接下来的几个版本中逐渐去完善与丰富相关细节。

## 完善：现有插件功能更为丰富

当然，除了上述新增的多项功能，我们还完善了 Apache APISIX 现有插件功能，比如：

* limit-req/conn/count 等插件现已支持采用一组变量作为限制时的 key
* proxy-cache 引入基于内存的后端

更多插件新功能与新增组件细节，可参考本次发布对应的 [Change log](https://github.com/apache/apisix/blob/release/2.11/CHANGELOG.md#2110)。

## 下载

获取最新版本的 Apache APISIX 2.11.0，可通过以下方式进行下载安装：

* [源代码](https://apisix.apache.org/downloads/)
* [二进制安装包](https://apisix.apache.org/zh/docs/apisix/how-to-build/)
