---
title: "API 网关 Apache APISIX 集成 CNCF OpenFunction"
authors:
  - name: 李从旺
    title: Author
    url: https://github.com/jackkkkklee
    image_url: https://github.com/jackkkkklee.png
keywords: 
- API 网关
- Apache APISIX
- Kubernetes
- CNCF
- OpenFunction
- Serverless
description: 本文介绍了 Apache APISIX openfunction 插件的功能与使用步骤，为 APISIX 的无服务领域功能再添一员。
tags: [Plugins,Ecosystem]
image: https://static.apiseven.com/2022/09/20/63296a9c05e59.png
---

> 本文作者李从旺，开源爱好者与云原生技术爱好者，目前于佐治亚理工学院深圳校区进修硕士学位。本篇文章是在参与 APISIX 开源之夏项目「集成 OpenFunction 至 Apache APISIX」的功能呈现，希望此功能可以让你在使用 APISIX 进行扩展时更加便捷。

<!--truncate-->

在无服务时代，API 网关依旧是管理和充分利用无服务器平台的关键。因此，Apache APISIX 社区也紧跟趋势，在过去的一年多时间内集成了无服务器提供商，如 [AWS Lambda](https://aws.amazon.com/lambda/) 和 [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview)，以及开源的无服务平台 [Apache OpenWhisk](https://openwhisk.apache.org/) 等。

本月，APISIX 又新增了不少生态插件，其中就包括与 [OpenFunction](https://openfunction.dev/) 集成的无服务插件 `openfunction`。本文将介绍 Apache APISIX 新的无服务插件 `openfunction`，并带来更多集成细节。

## Apache APISIX

[Apache APISIX](https://apisix.apache.org/) 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 不仅支持插件动态变更和热插拔，而且拥有众多实用的插件。

## OpenFunction

OpenFunction 是一个云原生的开源 FaaS 平台，旨在让用户专注于自己的业务逻辑，而不必维护底层运行时环境和基础设施。

核心功能包括：

- 与云提供商的 BaaS 解耦
- 可插入的架构，允许多个函数运行时
- 同时支持同步和异步函数
- 独特的异步函数支持，可以直接使用来自事件源的事件
- 支持直接从函数源代码生成兼容 OCI 的容器镜像。
- 灵活的从 0 到 n 的自动缩放
- 支持基于事件源的特定指标的高级异步功能自动缩放
- 通过引入 [Dapr](https://dapr.io/) 简化同步和异步功能的 BaaS 集成
- [K8s Gateway API](https://gateway-api.sigs.k8s.io/) 提供的高级函数入口和流量管理（进行中）
- 灵活易用的事件管理框架

## 集成原理

该插件会将正在进行的请求转发到用户定义的特定 URI，并提供相关的授权细节、请求头、请求正文和查询字符串，然后将响应返回给原始的客户端。

无服务具有高度可扩展和成本低等优势，使用这种方式部署业务服务能够极大降低资源使用和投入成本。如果你正在使用 OpenFunction 作为无服务平台，你就可以使用 Apache APISIX 去代理这些函数的请求，为函数请求追加服务治理的能力。

正如前文提到的 OpenFunction 核心功能，[K8s Gateway API](https://gateway-api.sigs.k8s.io/) 提供了函数的入口。OpenFunction 的认证方式取决于 K8s 网关，且随网关的选择而变化。因此该插件只支持标准的 Basic Auth 认证方式。

## 如何使用插件

### 步骤一：安装与运行 APISIX

在这里，我们推荐使用 Docker 快速安装 APISIX，因此你需要预先安装 [Docker](https://www.docker.com/) 和 [Docker Compose](https://docs.docker.com/compose/)。

安装详情以及更多安装方式请参考[APISIX 安装指南](https://apisix.apache.org/zh/docs/apisix/installation-guide/)，后续的使用步骤请参考 [快速入门指南](https://apisix.apache.org/zh/docs/apisix/getting-started/)。

### 步骤二： 通过 Helm Chart 安装 OpenFunction

请确保当前环境中已经安装对应版本的 Kubernetes 集群。详情可参考 [OpenFunction 安装指南](https://openfunction.dev/docs/getting-started/installation/) 。

```shell
# 添加 OpenFunction 到 Chart 存储库
helm repo add openfunction https://openfunction.github.io/charts/
helm repo update
```

```shell
# 安装 OpenFunction chart
kubectl create namespace openfunction
helm install openfunction openfunction/openfunction -n openfunction
```

你可以通过以下命令来验证 OpenFunction 是否已经安装成功：

```shell
kubectl get pods --namespace openfunction
```

### 步骤三：创建并推送函数

你可以参考 [OpenFunction 官方示例](https://github.com/OpenFunction/samples) 创建函数。构建函数时，你需要使用以下命令为容器仓库生成一个密钥，才可以将函数容器镜像推送到容器仓库 ( 例如 Docker Hub 或 Quay.io）。

```shell
REGISTRY_SERVER=https://index.docker.io/v1/ REGISTRY_USER=${your_registry_user} REGISTRY_PASSWORD=${your_registry_password}
kubectl create secret docker-registry push-secret \
    --docker-server=$REGISTRY_SERVER \
    --docker-username=$REGISTRY_USER \
    --docker-password=$REGISTRY_PASSWORD
```

### 步骤四：启用插件

你可以通过以下命令在指定路由中启用该插件：

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/hello",
    "plugins": {
        "openfunction": {
            "function_uri": "http://localhost:30583/default/function-sample/test",
            "authorization": {
                "service_token": "test:test"
            }
        }
    }
}'
```

其中 `9180`是 APISIX admin API 暴露的端口 ，而 `localhost:30583` 是假设本次通过 NodePort 方式映射的网关入口。

更多关于 OpenFunction 函数入口以及如何设置请参考 [Function Entrypoints | OpenFunction](https://openfunction.dev/docs/concepts/networking/function-entrypoints/)。

### 步骤五：发送请求

插件配置完成后，你可以向路由发送一个请求，它会调用配置好的函数。官方的示例函数 hello-world 会输出 “Hello, {函数 uri 中的后缀部分}!\n”。

```shell
# 9080 是 APISIX 除 admin API 以外暴露的端口
curl -i http://127.0.0.1:9080/hello
```

函数返回的响应如下：

```text
hello, test!
```

## 关闭插件

当你不需要再使用该插件时，可以通过从路由配置中去除 `openfunction` 插件来禁用它的功能（注意，按照 Apache APISIX 路由 Schema 要求，在去除该插件后，如果该路由没有其他插件，你必须为该路由配置一个上游对象）。

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{

    "uri": "/hello",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }
}'
```

## 总结

本文为大家介绍了 Apache APISIX `openfunction` 插件的功能与使用步骤，更多关于 `openfunction` 插件说明和完整配置列表，可以参考[官方文档](https://apisix.apache.org/zh/docs/apisix/next/plugins/openfunction/)。

目前，APISIX 社区也在开发其他 Serverless 插件以便与更多云服务进行集成。如果你对此类集成项目感兴趣，也欢迎随时在 [GitHub Discussions](https://github.com/apache/apisix/discussions) 中发起讨论，或通过[邮件列表](https://apisix.apache.org/zh/docs/general/join)进行交流。
