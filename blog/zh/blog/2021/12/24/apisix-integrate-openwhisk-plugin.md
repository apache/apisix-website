---
title: "API 网关 APISIX 集成 OpenWhisk 丰富认证场景"
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
- Apache OpenWhisk
- Serverless
- 插件
description: 本文为大家介绍了关于 `openwhisk` 插件的功能前瞻与使用步骤，结合 API 网关 Apache APISIX 提供的多种身份认证插件来实现认证与授权等功能。
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/openwhish.png
---

> 本文为大家介绍了关于 `openwhisk` 插件的功能前瞻与使用步骤，结合 Apache APISIX 提供的多种身份认证插件来实现认证与授权等功能。

<!--truncate-->

本文将介绍 Apache APISIX 中新增插件——`openwhisk`，并通过详细步骤向大家展示如何将 OpenWhisk 服务与 Apache APISIX 进行集成，来享受无服务器计算的优势。此插件预计在 Apache APISIX 2.12 版本中正式上线，敬请期待！

![APISIX&OpenWhisk](https://static.apiseven.com/202108/1640313816872-b2c018be-5433-4baf-ba6a-8330e160866a.png)

## 项目介绍

### Apache APISIX

[Apache APISIX](https://apisix.apache.org/) 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 不仅支持插件动态变更和热插拔，而且拥有众多实用的插件。

### Apache OpenWhisk

[Apache OpenWhisk](https://openwhisk.apache.org/) 是一个开源的分布式无服务器平台，可以通过执行函数响应任何规模的时间。它使用 Docker 容器管理基础设施、服务器和规模扩展，助力用户构建出色且高效的应用程序。

在 OpenWhisk 中开发者可以使用多种编程语言来编写函数（称为 Action），这些函数将由 OpenWhisk 负责动态调度并处理来自事件（通过 trigger）或外部请求（通过 HTTP 请求）的响应。

## 集成原理

Apache APISIX 为便捷集成 Apache OpenWhisk 提供了插件支持，用户可以定义一个包含无服务器插件的路由，并结合 Apache APISIX 提供的多种身份认证插件来实现认证与授权功能。

大体操作原理如下：用户可以使用openwhisk插件在路由中定义一个“动态上游”，当路由匹配到请求时，它将中止到原上游的请求，并向 OpenWhisk 的 API Host 端点发送请求。

> 请求中将包含用户为插件配置的 Namespace、Action、Service Token 以及原始 HTTP 请求体数据，并将从 OpenWhisk 中获取到的响应内容返回至客户端。

## 如何使用

### 步骤一：搭建 Apache OpenWhisk 测试环境

1. 首先，您需要确保使用 Linux 系统，并且系统中已经安装了 Docker 软件。执行以下命令：

```shell
docker run --rm -d \
  -h openwhisk --name openwhisk \
  -p 3233:3233 -p 3232:3232 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  openwhisk/standalone:nightly

docker exec openwhisk waitready
```

2. 等待命令执行完成后，将输出以下内容：

```
ok: whisk auth set. Run 'wsk property get --auth' to see the new value.
ok: whisk API host set to http://openwhisk:3233
ok: updated action testme
server initializing...
server initializing...
    "ready": true
ok: deleted action testme
```

3. 创建以下文件 `test.js` 用作测试函数。

```java
function main(args) {
    return {
        "hello": args.name || "",
    };
}
```

4. 在 OpenWhisk 中注册以上函数。

```shell
# 为 OpenWhisk CLI 工具设置 API Host 和鉴权信息，您可以从这里 https://s.apache.org/openwhisk-cli-download 下载它
wsk property set \
  --apihost 'http://localhost:3233' \
  --auth '23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP'

# 创建测试函数
wsk action create test test.js
```

### 步骤二：创建路由并开启 `openwhisk` 插件

下面我们将创建一个路由，并为其添加 `openwhisk` 插件。执行以下命令：

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "plugins": {
        "openwhisk": {
            "api_host": "http://localhost:3233",
            "service_token": "23bc46b1-71f6-4ed5-8c54-816aa4f8c502:123zO3xZCLrMN6v2BKK1dXYFpXlPkccOFqm12CdAsMgRU4VrNZ9lyGVCGuMDGIwP",
            "namespace": "guest",
            "action": "test"
        }
    },
    "uri": "/openwhisk"
}'
```

### 步骤三：测试请求

下面我们将使用 cURL 进行测试。

```shell
# 使用 POST 请求并发送数据
curl http://127.0.0.1:9080/openwhisk -i -X POST -d '{
    "name": "world"
}'

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 17
Server: APISIX/2.10.2

{"hello":"world"}

# 使用 GET 请求
curl http://127.0.0.1:9080/openwhisk -i

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 12
Server: APISIX/2.10.2

{"hello":""}
```

### 步骤四：测试复杂响应

1. 创建并更新 `test.js` 测试函数

```java
function main(args) {
    return {
        "status": "403",
        "headers": {
            "test": "header"
        },
        "body": "A test body"
    };
}

2. 进行测试请求

```shell
# 使用 GET 请求
curl http://127.0.0.1:9080/openwhisk -i

HTTP/1.1 403 FORBIDDEN
Content-Type: application/json
Content-Length: 12
test: header
Server: APISIX/2.10.2

A test body
```

### 补充：关闭插件

如使用完毕，只需移除路由配置中 OpenWhisk 相关配置并保存，即可关闭路由上的 OpenWhisk 插件。此时您可以开启其他 Serverless 类插件或添加上游等后续操作。

得益于 Apache APISIX 的动态化优势，开启关闭插件的过程都不需要重启 Apache APISIX，十分方便。

## 总结

本文为大家介绍了关于 `openwhisk` 插件的功能前瞻与使用步骤，更多关于 `openwhisk` 插件说明和完整配置列表，可以参考[官方文档](https://apisix.apache.org/docs/apisix/next/plugins/openwhisk)。

目前，我们也在开发其他 Serverless 插件以便与更多云服务进行集成。如果您对此类集成项目感兴趣，也欢迎随时在 [GitHub Discussions](https://github.com/apache/apisix/discussions) 中发起讨论，或通过[邮件列表](https://apisix.apache.org/zh/docs/general/join)进行交流。
