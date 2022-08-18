---
title: "Nacos 在 API 网关中的服务发现实践"
authors:
  - name: "林志煌"
    title: "Author"
    url: "https://github.com/oil-oil"
    image_url: "https://avatars.githubusercontent.com/u/57465570?v=4"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://avatars.githubusercontent.com/u/97138894?v=4"
keywords: 
- Apache APISIX
- Nacos
- API gateway
- Service Discovery
- Service Registry
- Ecosystem
description: 本文为你介绍了云原生 API 网关 Apache APISIX 基本概念以及注册中心的作用，并为您展示了 APISIX 基于 Nacos 实现服务发现的具体操作。
tags: [Ecosystem]
---

> 本文为您介绍 Apache APISIX 基本概念以及注册中心的作用，并为您展示了 API 网关基于 Nacos 实现服务发现的具体操作。

<!--truncate-->

## 背景信息

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。它不仅拥有众多实用的插件，而且支持插件动态变更和热插拔。同时在使用服务发现组件时，不仅可以利用 etcd，也可以将 Eureka、Consul 和 Nacos 作为服务发现组件。本文将详细为您介绍如何在 Apache APISIX 中配置 Nacos 作为 Apache APISIX API 网关中的服务发现组件。

![error/Apache APISIX API Getway.png](https://static.apiseven.com/202108/1646038041730-3d9bfdd8-d2f0-41a2-84f5-cb1e1d567a86.png)

注册中心是服务要实现服务化管理的核心组件，类似于目录服务的作用，也是微服务架构中最基础的设施之一，主要用来存储服务信息，譬如服务提供者 URL 、路由信息等。注册中心的实现是通过一种映射的方式，将复杂的服务端信息映射为简单易懂的信息提供给客户端。

注册中心的核心功能为以下三点：

- 服务注册：**服务提供方**向**注册中心**进行注册。
- 服务发现：**服务消费方**可以通过注册中心寻找到服务提供方的调用路由信息。
- 健康检测：确保注册到注册中心的服务节点是可以被正常调用的，避免无效节点导致的调用资源浪费等问题。

注册中心本质上是为了**解耦服务提供者和服务消费者**，在微服务体系中，各个业务服务之间会频繁互相调用，并且需要对各个服务的 IP、port 等路由信息进行统一的管理。但是要如何进行管理呢？我们可以通过注册中心的**服务注册**功能将已有服务的相关信息提供到统一的注册中心进行管理。

通过上述描述，您可以了解到注册中心可以帮助用户通过映射快速找到服务和服务地址。随着业务更新迭代，服务会频繁发生变化，在服务端中注册了新的服务或者服务宕机后，客户端仍然可以通过注册中心的**服务发现**功能拉取服务列表，如果注册中心的服务节点发生变更，注册中心会发送请求通知客户端重新拉取。

如果服务端的服务突然宕机，并且没有向注册中心反馈，客户端可以通过注册中心的**健康检查**功能，进行固定时间间隔的主动上报心跳方式向服务端表明自己的服务状态。如果服务状态异常，则会通知注册中心，注册中心可以及时把已经宕机的服务节点进行剔除，避免资源的浪费。

Apache APISIX + Nacos 可以将各个微服务节点中与业务无关的各项控制，集中在 Apache APISIX 中进行统一管理，即**通过 Apache APISIX 实现接口服务的代理和路由转发的能力**。在 Nacos 上注册各个微服务后，Apache APISIX 可以通过 Nacos 的服务发现功能获取服务列表，查找对应的服务地址从而实现动态代理。

![error/Principle Introduction.png](https://static.apiseven.com/202108/1645433492822-5218e923-97ae-4d04-863b-3b3f901de84f.png)

## API 网关基于 Nacos 实现服务发现

### 前提条件

本文操作基于以下环境进行。

- 操作系统 Centos 7.9。
- 已安装 Apache APISIX 2.12.1，详情请参考：[如何构建 Apache APISIX](https://apisix.apache.org/zh/docs/apisix/how-to-build)。
- 已安装 Nacos 2.0.4，详情请参考：[Nacos 快速入门](https://nacos.io/zh-cn/docs/quick-start.html)。
- 已安装 Node.js，详情请参考：[Node.js 安装指南](https://github.com/nodejs/help/wiki/Installation)。

### 步骤一：服务注册

1. 使用 Node.js 的 Koa 框架在 `3005` 端口启动一个简单的测试服务作为[上游（Upstream）](https://apisix.apache.org/zh/docs/apisix/admin-api#upstream)。

  ```JavaScript
  const Koa = require('koa');
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

  app.listen(3005);
  ```

2. 在命令行中通过请求 Nacos Open API 的方式进行服务注册。

  ```Shell
  curl -X POST 'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=APISIX-NACOS&ip=127.0.0.1&port=3005&ephemeral=false'
  ```

3. 执行服务注册后使用以下命令查询当前服务情况。

  ```Shell
  curl -X GET 'http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=APISIX-NACOS'
  ```

正确返回结果示例如下：

  ```JSON
  {
    "name": "DEFAULT_GROUP@@APISIX-NACOS",
    "groupName": "DEFAULT_GROUP",
    "clusters": "",
    "cacheMillis": 10000,
    "hosts": [
      {
        "instanceId": "127.0.0.1#3005#DEFAULT#DEFAULT_GROUP@@APISIX-NACOS",
        "ip": "127.0.0.1",
        "port": 3005,
        "weight": 1.0,
        "healthy": true,
        "enabled": true,
        "ephemeral": true,
        "clusterName": "DEFAULT",
        "serviceName": "DEFAULT_GROUP@@APISIX-NACOS",
        "metadata": {},
        "instanceHeartBeatInterval": 5000,
        "instanceHeartBeatTimeOut": 15000,
        "ipDeleteTimeout": 30000,
        "instanceIdGenerator": "simple"
      }
    ],
    "lastRefTime": 1643191399694,
    "checksum": "",
    "allIPs": false,
    "reachProtectionThreshold": false,
    "valid": true
  }
  ```

### 步骤二：新增 Nacos 路由

使用 Apache APISIX 提供的 Admin API 创建一个新的[路由（Route）](https://apisix.apache.org/zh/docs/apisix/admin-api#route)，APISIX 通过 `upstream.discovery_type` 字段选择使用的服务发现类型，`upstream.service_name` 需要与注册中心的对应服务名进行关联，因此创建路由时指定服务发现类型为 `nacos`。

  ```Shell
  curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
  {
      "uri": "/nacos/*",
      "upstream": {
          "service_name": "APISIX-NACOS",
          "type": "roundrobin",
          "discovery_type": "nacos"
      }
  }'
  ```

在上述命令中，请求头 `X-API-KEY` 是 Admin API 的访问 token，可以在 `conf/config.yaml` 文件中的 `apisix.admin_key.key` 查看。

添加成功后，正确返回结果示例如下：

  ```JSON
  {
    "action": "set",
    "node": {
      "key": "\/apisix\/routes\/1",
      "value": {
        "update_time": 1643191044,
        "create_time": 1643176603,
        "priority": 0,
        "uri": "\/nacos\/*",
        "upstream": {
          "hash_on": "vars",
          "discovery_type": "nacos",
          "scheme": "http",
          "pass_host": "pass",
          "type": "roundrobin",
          "service_name": "APISIX-NACOS"
        },
        "id": "1",
        "status": 1
      }
    }
  }
  ```

除此之外，您还可以在 `upstream.discovery_args` 中传递其他服务相关参数用于指定服务所在的命名空间或组别，具体内容可参考[官方文档](https://apisix.apache.org/zh/docs/apisix/next/discovery/nacos/#%E5%8F%82%E6%95%B0)。

### 步骤三：验证配置结果

使用以下命令发送请求至需要配置的路由。

  ```Shell
  curl -i http://127.0.0.1:9080/nacos/
  ```

正常返回结果示例如下：

  ```Shell
  HTTP/1.1 200 OK
  Content-Type: text/plain; charset=utf-8
  Content-Length: 11
  Connection: keep-alive
  Date: Thu, 27 Jan 2022 00:48:26 GMT
  Server: APISIX/2.12.0

  Hello World
  ```

通过示例看到，Apache APISIX 中新增的路由已经可以通过 Nacos 服务发现找到正确的服务地址，并正常响应。

## 总结

本文为大家介绍了注册中心的概念以及 Apache APISIX 如何配合 Nacos 实现基于服务发现的路由代理。用户可以根据自身的业务需求和过往技术架构使用 Apache APISIX 与 Nacos，以实现接口服务的代理和路由转发的能力。

关于 `nacos` 插件的更多说明和完整配置信息，可参考 [Apache APISIX 官方文档](https://apisix.apache.org/zh/docs/apisix/discovery/nacos)。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果您对此有兴趣，您可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join)进行交流.
