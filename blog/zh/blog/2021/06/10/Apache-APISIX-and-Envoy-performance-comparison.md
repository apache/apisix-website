---
title: "Apache APISIX 和 Envoy 性能大比拼"
slug: 2021/06/10/apache-apisix-and-envoy-performance-comparison
author: "艾菲"
keywords: 
- APISIX
- Envoy
- Apache APISIX
- Service Mesh
- API 网关
- 性能
description: 云原生 API 网关 Apache APISIX 的性能在开启多个 worker 进行时，性能比 Envoy强大。APISIX 在性能和延迟上的表现使它在处理南北向流量上具有海量的吞吐能力。
tags: [Community]
---

> 本文介绍了在一定条件下，Apache APISIX 和 Envoy 的性能对比，总体来说 Apache APISIX 在响应延迟和 QPS 层面都略优于 Envoy，Apache APISIX 在开启多个 worker 进程后性能提升较 Enovy 更为明显；而且 Apache APISIX 在性能和延迟上的表现使它在处理南北向流量上具有海量的吞吐能力。

<!--truncate-->

> Source: https://www.apiseven.com/zh/blog/Apache-APISIX-and-Envoy-performance-comparison

在 CNCF 组织的一场技术分享会上，第一次听到了 Envoy 这么一个东西，分享的嘉宾巴拉巴拉讲了一大堆，啥都没记住，就记住了一个特别新颖的概念“通信总线”，后面 google 了下 Envoy 这个东西到底是什么，发现官网上如是描述：

“Envoy 是专为大型现代 SOA（面向服务架构）架构设计的 L7 代理和通信总线”

也就是说， Envoy 是为了解决 Service Mesh 领域而诞生一款 L7 代理软件，这里我网上找了一张图，我理解的 Envoy 大概是如下的部署架构。（如果错了请大佬指教）

![Envoy arch](https://static.apiseven.com/202108/20210617001.png)

既然是 L7 的代理软件嘛，作为常年混迹 OpenResty 社区的老司机，自然忍不住把它拿来搞一搞，对比对比。

我们选择的比试对象是 Apache APISIX，它是基于 OpenResty 实现的 API 网关。（其实也就是 L7 代理然后加了路由、认证，限流、动态上游等等之类的功能）

为什么选择它呢，因为有一次社区分享的时候听说这货的路由实现非常棒，正好我们的现在业务的路由系统乱七八糟，扒拉了下 APISIX 的源码，发现确实是 6 到飞起，吊打我看到过的同类产品， 所以印象深刻，就它了！

这里附上一张在 APISIX 官网扒拉的图，真是一图胜千言，一看就知道这玩意儿是怎么工作的。

![APISIX arch](https://static.apiseven.com/202108/20210617002.png)

开搞吧，首先我们去官网找到两个产品的最版本：

Apache APISIX 1.5 和 Envoy 1.14

（笔者在写这篇文章时的最新版）

#### 构建环境准备

- 压力测试客户端：wrk；
- 测试主要指标包括：网关延迟、QPS 和是否线性扩展；
- 测试环境：微软云 Linux (ubuntu 18.04)， Standard D13 v2 (8 vcpus, 56 GiB memory)；
- 测试方式 1：采用单核运行横向对比（因为它们都是基于 epoll 的 IO 模型，所以用单核压测验证它们的处理能力）；
- 测试方式 2：采用多核运行横向对比，主要是为了验证两者在添加多（进程|线程）的场景下其整体处理能力是否能够线性增长；

#### 测试场景

这里我们用 NGINX 搭建了一个上游服务器，配置 2 个 worker，接收到请求直接应答 4k 内容，参考配置如下:

```text
server {
  listen 1980;

  access_log off;
  location = /hello {
    echo_duplicate 400 "1234567890";
  }
}
```

- 网络架构示意图如下：（绿色正常负载，未跑满。红色为高压负载，要把进程资源跑满，主要是 CPU）

![test result](https://static.apiseven.com/202108/20210617003.png)

#### 路由配置

首先我们找到 APISIX 的入门配置指南，我们添加一条到 /hello 的路由，配置如下：

```text
curl http://127.0.0.1:9080/apisix/admin/routes/1 -X PUT -d '{、
    "uri": "/hello",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980": 1
        }
    }}'
```

需要注意的是，这里没并没有开始 proxy_cache 和 proxy_mirror 插件，因为 Enovy 并没有类似的功能；

然后我们参考 Envoy 官方压测指导 为 Envoy 添加一条路由：

```text
static_resources:
  listeners:
  - name: listener_0
    address:
      socket_address: { address: "0.0.0.0", port_value: 10000 }

    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
          generate_request_id: false,
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: local_service
              domains: ["*"]
              routes:
              - match: { prefix: "/hello" }
                route: { cluster: service_test }
          http_filters:
          - name: envoy.router
            config:
              dynamic_stats: false
  clusters:
  - name: service_test
    connect_timeout: 0.25s
    type: LOGICAL_DNS
    dns_lookup_family: V4_ONLY
    lb_policy: ROUND_ROBIN
    hosts: [{ socket_address: { address: "127.0.0.1", port_value: 1980 }}]
    circuit_breakers:
      thresholds:
        - priority: DEFAULT
          max_connections: 1000000000
          max_pending_requests: 1000000000
          max_requests: 1000000000
          max_retries: 1000000000
        - priority: HIGH
        max_connections: 1000000000
        max_pending_requests: 1000000000
        max_requests: 1000000000
        max_retries: 1000000000
```

上面的 generate*request_id、dynamic_stats 和 circuit_breakers 部分，在 Envoy 内部是默认开启，但本次压测用不到，需要显式关闭或设置超大阈值从而提升性能。（谁能给我解释下为什么这玩意儿配置这么复杂 -*-!）

#### 压测结果

单条路由，不开启任何插件。开启不同 CPU 数量，进行满载压力测试。说明：对于 NGINX 叫 worker 数量，Envoy 是 concurrent ，为了统一后面都叫 worker 数量。

| **进程数**    | **APISIX QPS** | **APISIX Latency** | **Envoy QPS** | **Envoy Latency** |
| :------------ | :------------- | :----------------- | :------------ | :---------------- |
| **1 worker**  | 18608.4        | 0.96               | 15625.56      | 1.02              |
| **2 workers** | 34975.8        | 1.01               | 29058.135     | 1.09              |
| **3 workers** | 52334.8        | 1.02               | 42561.125     | 1.12              |

注：原始数据公开在 [gist](https://gist.github.com/aifeiasdf/9fc4585f6404e3a0a70c568c2a14b9c9) 预览。

![test result](https://static.apiseven.com/202108/20210617004.png)

QPS：每秒钟完成的请求数，数量越多越好，数值越大代表单位时间内可以完成的请求数量越多。从 QPS 结果看，APISIX 性能是 Envoy 的 120% 左右，核心数越多 QPS 差距越大。

Latency：每请求的延迟时间，数值越小越好。它代表每请求从发出后需要经过多长时间可以接收到应答。对于反向代理场景，该数值越小，对请求的影响也就最小。从结果上看，Envoy 的每请求延迟要比 APISIX 多 6-10% ，核心数量越多延迟越大。

可以看到两者在单工作线程|进程的模式下，QPS 和 Latency 两个指标差距不大，但是随着工作线程|进程的增加他们的差距逐渐放大，这里我分析可能有以下两方面的原因，NGINX 在高并发场景下用多 worker 和系统的 IO 模型进行交互是不是会更有优势，另外一方面，也可能是 NGINX 自身在实现上面对内存和 CPU 的使用比较“抠门”，这样累积起来的性能优势，以后详细评估评估。

#### 总结

总体来说 APISIX 在响应延迟和 QPS 层面都略优于 Envoy， 由于 NGINX 的多 worker 的协作方式在高并发场景下更有优势，得益于此，APISIX 在开启多个 worker 进程后性能提升较 Enovy 更为明显；但是两者并不冲突， Envoy 的总线设计使它在处理东西向流量上有独特的优势， APISIX 在性能和延迟上的表现使它在处理南北向流量上具有海量的吞吐能力，根据自己的业务场景来选择合理的组件配合插件构建自己的服务才是正解。
