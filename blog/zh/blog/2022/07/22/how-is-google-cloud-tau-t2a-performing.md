---
title: "API 网关 APISIX 在谷歌云 T2A 和 T2D 的性能测试"
authors:
  - name: "赵士瑞"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
keywords:
    - APISIX
    - API 网关
    - Google Cloud
    - Google Cloud T2A
    - ARM64
description: 本文主要使用云原生 API 网关 Apache APISIX 分别在 Google Cloud T2A 和 Google Cloud T2D 进行性能测试，并且进行对比两者的性能。
tags: [Ecosystem]
---

> 本文主要使用 Apache APISIX 来对比 Google Cloud T2A 和 Google Cloud T2D 的性能。

<!--truncate-->

## 背景

2022 年 7 月 13 日 Google Cloud 发布了第一个基于 Arm® 架构的 Tau T2A 的 VM 系列预览版。T2A VM 由基于 Ampere® Altra® Arm 的处理器提供支持，谷歌宣称其拥有极具吸引力的价格和卓越的单线程性能。

值得注意的是，Ampere® Altra® Arm 是一款云原生处理器，基于 Ampere® Altra® Arm 处理器的 Tau T2A 虚拟机也因此能以高效的方式运行横向扩展的云原生应用程序。

那么具体实际体验和性能如何呢？我们以一个云原生的 API 网关为例，带大家一起看看 Google Cloud Tau T2A 虚拟机的表现。这里，我们选择了 Apache APISIX 在  Google Cloud Tau T2A 服务器环境上进行安装测试。

Apache APISIX 是一个云原生、高性能、可扩展的 API 网关。基于 NGNIX + LuaJIT 和 etcd，APISIX 与传统 API 网关相比，具有动态路由和插件热加载特性，特别适合云原生架构下的 API 管理。

![network error/APISIX Architecture.png](https://static.apiseven.com/2022/blog/0722/1.PNG)

## 前期准备

首先需要在 Google Cloud 上启动一个 T2A 实例，操作系统选择 Ubuntu 20.04。

![network error/Google Cloud T2A.png](https://static.apiseven.com/2022/blog/0722/2.png)

然后安装 Docker，方便后续使用容器化的方式来安装部署 Apache APISIX。

```shell
sudo apt-get update && sudo apt-get install docker.io
```

## 部署 Apache APISIX

Apache APISIX 使用 etcd 作为配置中心，所以这里需要先启动一个 etcd 实例。

```shell
sudo docker run -d --name etcd \
    -p 2379:2379 \
    -e ETCD_UNSUPPORTED_ARCH=arm64 \
    -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    rancher/coreos-etcd:v3.4.16-arm64
```

启动 Apache APISIX 实例:

```shell
sudo docker run --net=host -d apache/apisix:2.14.1-alpine
```

注册路由。

```shell
curl "http://127.0.0.1:9080/apisix/admin/routes/1" \
-H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d '
{  
    "uri": "/anything/*",
    "upstream": {
        "type": "roundrobin",
        "nodes": {
              "httpbin.org:80": 1
        }
    }
}'
```

访问测试。

```shell
curl -i http://127.0.0.1:9080/anything/das
```

```shell
HTTP/1.1 200 OK
.....
```

## Google Cloud T2D vs Google Cloud T2A

从上述操作来看，Apache APISIX 在 Google Cloud Tau T2A 上的安装和兼容性测试都能顺利完成。那么 Google Cloud T2A 的实际性能到底如何呢？接下来我们将使用 Apache APISIX 分别在 Google Cloud T2A 和 Google Cloud T2D 上做性能测试对比，来看看其实际表现。

Google Cloud T2D 是 Google Cloud Tau 系列的另一款机型，是基于 AMD x86 架构的，所以上述 etcd 安装步骤略有不同：

````shell
sudo docker run -d --name etcd \
    -p 2379:2379 \
    -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    -e ALLOW_NONE_AUTHENTICATION=yes \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    bitnami/etcd:3.4.16
````

为简单起见，本次测试 APISIX 中只启用了一个 Worker，以下性能测试数据均在单核 CPU 上运行。

### 场景一：单上游

该场景下将使用单个上游（不包含任何插件），主要测试 APISIX 在纯代理回源模式下的性能表现。在本地环境中进行测试：

```shell
# apisix: 1 worker + 1 upstream + no plugin

# 注册路由
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/hello",
    "plugins": {
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980":1
        }
    }
}'
```

### 场景 2：单个上游 + 两个插件

该场景下将使用单个上游与两个插件进行，主要测试 APISIX 在开启 `limit-count` 和 `prometheus` 两个核心性能消耗插件时的表现。

```shell
# apisix: 1 worker + 1 upstream + 2 plugins (limit-count + prometheus)

# 注册路由
curl http://127.0.0.1:9080/apisix/admin/routes/1 \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "uri": "/hello",
    "plugins": {
        "limit-count": {
            "count": 2000000000000,
            "time_window": 60,
            "rejected_code": 503,
            "key": "remote_addr"
        },
        "prometheus": {}
    },
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:1980":1
        }
    }
}'
```

### 数据比较

上述两个场景中，分别从请求 QPS（每秒查询数） 和延迟时间两个层面进行了相关的测试对比。结果如下：

- QPS 比较

![network error/QPS comparison.png](https://static.apiseven.com/2022/blog/0722/3.png)

- 请求延迟比较

![network error/Latency comparison.png](https://static.apiseven.com/2022/blog/0722/4.png)

<table>
    <tr>
        <td><b>  </b></td>
        <td colspan="2">单个上游</td>
        <td colspan="2">单个上游 + 两个插件</td>
    </tr>
    <tr>
        <td><b>  </b></td>
        <td><b>Google Cloud T2D</b></td>
        <td><b>Google Cloud T2A</b></td>
        <td><b>Google Cloud T2D</b></td>
        <td><b>Google Cloud T2A</b></td>
    </tr>
    <tr>
        <td><b>QPS(request/s)</b></td>
        <td><b>12500</b></td>
        <td><b>11300</b></td>
        <td><b>10600</b></td>
        <td><b>9900</b></td>
    </tr>
    <tr>
        <td><b>Latency(ms)</b></td>
        <td><b>1.26</b></td>
        <td><b>1.39</b></td>
        <td><b>1.45</b></td>
        <td><b>1.60</b></td>
    </tr>
    </table>

从以上数据也可以看出，在 API Gateway 等网络 IO 密集计算场景下，T2A 相比同系列的 T2D 虚拟机，在性能上仍然有差距。不过另一个好消息是，在同等配置情况下，T2A 的价格要比 T2D 便宜 10% 左右。在实际机器选型时，用户可以根据自己的业务体量来灵活决策。

## 总结

本文主要使用 Apache APISIX 对比 Google Cloud T2A 和 Google Cloud T2D 的性能。可以看出，在 API 网关等网络 IO 密集计算场景中，Google Cloud T2A 相比 T2D，表现虽然不是那么亮眼，但是作为 Google Cloud 在 ARM 架构下的第一次尝试，相信其会在 ARM 架构的虚拟机上持续发力，也期待它的后续迭代表现。
