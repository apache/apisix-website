---
title: "API 网关 APISIX 携手 CoreDNS 打开服务发现新大门"
authors:
  - name: "陈梓杰"
    title: "Author"
    url: "https://github.com/CP3cham"
    image_url: "https://avatars.githubusercontent.com/u/87352162?v=4"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://avatars.githubusercontent.com/u/97138894?v=4"
keywords: 
- Apache APISIX
- API 网关
- CoreDNS
- 服务发现
- 服务注册
- Ecosystem
description: 云原生 API 网关 Apache APISIX 集成了多种服务发现的能力，本文将为您展示如何在 APISIX 中配置 CoreDNS 并且为你介绍了服务发现的模式以及使用 CoreDNS 的优势。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/CoreDNS.png
---

> Apache APISIX 是一个动态、实时、高性能的云原生 API 网关，提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。作为云原生 API 网关，Apache APISIX 也集成了多种服务发现的能力，本文将为您展示在 Apache APISIX 中如何配置 CoreDNS。

<!--truncate-->

## 背景信息

在传统的物理机和虚拟机部署中，各个服务之间的调用可以通过固定 **IP + 端口**的方式进行。随着云原生时代的到来，企业业务的部署更倾向于云原生容器化。但是在容器化环境中，服务实例的启动和销毁是非常频繁的，如果通过运维人员手动维护不仅工作量大，而且效果也欠佳。因此需要一种机制可以自动检测服务状态，当服务地址出现变更时，动态绑定新的地址。服务发现机制应运而生。

## 服务发现简介

服务发现机制可以分为两部分：

- 服务注册中心：存储服务的主机和端口信息。

假如某个容器对外提供计算平均值的服务，我们使用 `average` 的服务名作为唯一标识符，那么在服务注册中心就会以键值对（`average:192.168.1.21`）的方式存储。

- 服务发现：允许其他用户发现服务注册阶段存储的信息。分为客户端发现模式和服务端发现模式。

### 客户端服务发现模式

在使用客户端发现模式时，客户端通过查询服务注册中心的存储信息，获取可用服务的实际网络地址后，通过负载均衡算法选择一个可用的服务实例，并将请求发送至该服务。

- 优点：架构简单，扩展灵活，方便实现负载均衡功能。
- 缺点：重客户端，强耦合，有一定开发成本。

![error/client service discovery.png](https://static.apiseven.com/202108/1646299482001-9bba7b28-1780-44c8-869d-b75bc993c021.png)

客户端发现模式实现逻辑如下：

1. 新服务启动时，主动向注册中心注册，服务注册中心会存储新服务的服务名和地址；
2. 当客户端需要这个服务时，会使用服务名向服务注册中心发起查询；
3. 服务注册中心返回可用的地址，客户端再根据具体的算法选择其中一个发起调用。

在这个过程中，除了服务注册，服务发现的工作基本由客户端独立完成，注册中心和服务端的地址对客户端也是完全可见的。

### 服务端服务发现模式

客户端向 Load Balancer 发送请求，Load Balancer 根据客户端的请求查询服务注册中心，找到可用的服务后转发请求到该服务上，和客户端服务发现模式一样，服务都需要在注册中心进行服务注册和注销。

- 优点：服务的发现逻辑对客户端是透明的。
- 缺点：需要额外部署和维护负载均衡器。

![error/server service discovery.png](https://static.apiseven.com/202108/1646299531288-3ff99279-3ab6-49d7-8abf-68461f50c5c0.png)

服务端发现模式实现逻辑如下：

1. 新服务启动时，主动向注册中心注册，服务注册中心会存储新服务的服务名和地址；
2. 当客户端需要某个服务时，会使用服务名向负载均衡器发起查询；
3. 负载均衡器根据客户端请求的服务名，代理客户端向服务注册中心发起请求；
4. 负载均衡器获得返回的地址后，根据具体的算法选择其中一个发起调用。

## 使用 CoreDNS 的优势

CoreDNS 是一个用 `Go` 语言编写的开源 DNS 服务器，由于它的灵活性和可扩展性，常用于多容器环境中的 DNS 服务和服务发现。CoreDNS 建立在 Caddy 这个 HTTP/2 Web 服务器之上，实现了一个插件链的架构，将很多 DNS 相关的逻辑都抽象成了一层一层的插件，实现起来更灵活和易扩展，用户选择的插件会被编译到最终的可执行文件中，运行效率也非常高。CoreDNS 是首批加入 CNCF（云原生计算基金会）并且是已经毕业的云原生开源项目，也是 Kuberneters 中默认的 DNS 服务。

相比于常见的服务发现框架（Apache ZooKeeper 和 Consul），CoreDNS 实现服务发现有哪些优势呢？

服务发现的原理和计算机网络中重要的基础设施—— DNS 域名系统比较相似，DNS 域名系统把很少变动的域名与经常变动的服务器 IP 地址进行绑定，而服务发现机制则是把很少变动的服务名与服务地址绑定。由此我们可以借由 DNS 实现类似服务注册中心的功能，只需要将 DNS 中存储的域名转换为服务名即可。由于许多计算机内置了 DNS 功能，所以我们只需要在原有 DNS 系统上修改配置就可以了，不需要做太多额外的事情。

## 原理架构

整体架构如下：

1. 客户端向 APISIX 发起请求调用服务。
2. APISIX 根据设置好的路由来访问上游服务节点（具体配置可见下文），在 APISIX 中可以设置上游信息通过 DNS 方式获取，只要正确设置了 DNS 服务器的 IP 地址，APISIX 会自动向该地址发起请求，获取 DNS 中对应服务的地址。
3. CoreDNS 根据请求的服务名返回可用的地址列表。
4. APISIX 根据可用地址和配置的算法，从其中选择一个发起调用。

![error/architecture.png](https://static.apiseven.com/202108/1646299586044-3b44e6a8-b7a9-4ba6-a69c-8d08772b6065.png)

## 如何使用

### 前提条件

本文操作基于以下环境进行。

- 操作系统 Centos 7.9。
- Apache APISIX 2.12.1，详情请参考：[如何构建 Apache APISIX](https://apisix.apache.org/zh/docs/apisix/how-to-build)。
- CoreDNS 1.9.0，详情请参考：[CoreDNS 安装指南](https://coredns.io/manual/toc/#installation)。
- Node.js 10.15.0，详情请参考：[Node.js 安装指南](https://github.com/nodejs/help/wiki/Installation)。

### 操作步骤

1. 使用 Node.js 的 `Koa` 框架在 `3005` 端口启动一个简单的测试服务。

访问此服务会返回 `Hello World` 的字串，稍后我们将通过 CoreDNS 获取这个服务的地址。

```Shell
  // 使用 Koa 框架搭建服务
  const Koa = require('koa');
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = 'Hello World';
  });

  app.listen(3005);
```

2. 配置 CoreDNS。

CoreDNS 默认监听 `53` 端口，并且会读取在相同目录中的 `Corefile` 配置文件。初始条件下，同目录中并没有 `Corefile` 文件，因此我们需要创建并完成配置。

`Corefile` 主要是通过配置插件来实现功能，因此我们需要配置三个插件：

- `hosts`：可以通过此参数将服务名和 IP 地址绑定，`fallthrough` 表示在当前插件无法返回正常数据时可以把请求转发给下一个插件处理（如果存在）。
- `forward`：表示将请求代理到指定的地址，一般是权威 DNS 服务器地址。
- `log`：不配置任何参数代表将日志信息打印到控制台界面，以便进行调试。

```Shell
  .:1053 {              # 监听在1053端口
      hosts {
          10.10.10.10 hello
          # 将服务名 “coredns” 和IP地址绑定
          fallthrough
      }
      forward . 114.114.114.114:53
      log
  }
```

3. 配置 Apache APISIX。

在 `conf/config.yaml` 文件中添加相关配置并重新加载 Apache APISIX。

```Shell
  # config.yml
  # ...other config
  discovery:
     dns:
       servers:
          - "127.0.0.1:1053"  # 使用 DNS 服务器的真实地址
                              # 此处为本机的1053端口
```

4. 配置 Apache APISIX 中的路由信息。

接下来我们通过请求 `Admin API` 配置相关路由信息

```Shell
  curl http://127.0.0.1:9080/apisix/admin/routes/1 \
  -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
  {
      "uri": "/core/*",
      "upstream": {
          "service_name": "hello:3005",
          # 将服务名命名为coredns，与CoreDNS中hosts插件的配置保持一致
          "type": "roundrobin",
          "discovery_type": "dns" # 将服务发现类型设置为DNS
      }
  }'
```

5. 验证。

- 在本机上验证

```Shell
  curl 127.0.0.1:9080/core/hello -i

  HTTP/1.1 200 OK
  Content-Type: text/plain; charset=utf-8
  Content-Length: 11
  Connection: keep-alive
  Date: Wed, 16 Feb 2022 08:44:08 GMT
  Server: APISIX/2.12.1

  Hello World
```

- 在其他主机上验证

```Shell
  curl 10.10.10.10:9080/core/hello -i

  HTTP/1.1 200 OK
  Content-Type: text/plain; charset=utf-8
  Content-Length: 11
  Connection: keep-alive
  Date: Wed, 16 Feb 2022 08:43:32 GMT
  Server: APISIX/2.12.0

  Hello World
```

通过上述返回结果可以看到，服务是可以正常运行的。

6. 模拟容器因各种原因无法提供服务，导致 IP 地址发生变更。

我们需要在另一台服务器上搭建相同的服务，同样运行在 `3005` 端口，但是 IP 地址发生变化，返回字符串改为 `Hello, Apache APISIX`。

```Shell
// 使用 Koa 框架搭建服务
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello, Apache APISIX';
});

app.listen(3005);
````

修改 `Corefile` 配置并重启 CoreDNS，其他配置不作修改。配置示例如下：

```Shell
.:1053 {                           # 监听在1053端口
    hosts {
        10.10.10.11 hello        # 修改服务IP地址
        # 将服务名 “coredns” 和IP地址绑定
        fallthrough
    }
    forward . 114.114.114.114:53  
    log
}
```

> DNS 存在缓存机制，当我们用 `dig` 命令请求解析新的域名时，在返回的 `DNS record` 中会看到一个数字字段，即 `TTL` 字段，一般是 `3600`，即一个小时。在 `TTL` 时间段内发往该域名的请求不会再向 DNS 服务器请求解析地址，而是直接在本地缓存中获取该域名对应的地址。

通过验证我们可以发现，请求已经重新指向新的地址。验证如下：

```Shell
  curl 127.0.0.1:9080/core/hello -i

  HTTP/1.1 200 OK
  Content-Type: text/plain; charset=utf-8
  Content-Length: 11
  Connection: keep-alive
  Date: Wed, 16 Feb 2022 08:44:08 GMT
  Server: APISIX/2.12.0

  Hello, Apache APISIX
```

## 总结

本文主要介绍了服务发现的类型以及在 Apache APISIX 中如何使用 CoreDNS。您可以根据自身的业务需求和过往技术架构使用 Apache APISIX 与 CoreDNS。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果您对此有兴趣，您可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join)进行交流。
