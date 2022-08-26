---
title: "Apache APISIX 在 Azure Ddsv5 和 Dpdsv5 上的性能测试"
authors:
  - name: "赵士瑞"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
  - name: "韩飞"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- API 网关
- Azure
- 微软云
- ARM
- Apache APISIX
description: 本文使用 API 网关 Apache APISIX 来对比 Azure Ddsv5 和 Azure Dpdsv5 在网络 IO 密集型场景下的性能。
tags: [Ecosystem]
---

> 本文使用 API 网关 Apache APISIX 来对比 Azure Ddsv5 和 Azure Dpdsv5 在网络 IO 密集型场景下的性能。

<!--truncate-->

## 背景

今年 4 月，微软宣布推出基于 Ampere® Altra® Arm 处理器的 Azure 虚拟机系列预览版。新的 VM 系列包括通用 Dpsv5 和内存优化的 Epsv5 VM，具体信息参考下图：

![VM 系列](https://static.apiseven.com/2022/blog/0808/1.png)

值得注意的是，Ampere® Altra® Arm 是一款云原生处理器，基于 Ampere® Altra® Arm 处理器的 Azure 虚拟机也因此能以高效的方式运行横向扩展的云原生应用程序。

那么实际体验和性能如何呢？接下来我们将以一个云原生的 API 网关为例，带大家一起看看基于 ARM 架构的 Azure 虚拟机的表现。这里，我们选择了 Apache APISIX 在通用型 Dpdsv5 系列虚拟机上进行安装测试。

Apache APISIX 是一个云原生、高性能、可扩展的 API 网关。基于 NGNIX + LuaJIT 和 etcd，APISIX 与传统 API 网关相比，具有动态路由和插件热加载特性，特别适合云原生架构下的 API 管理。

![Apache APISIX](https://static.apiseven.com/2022/blog/0808/2.png)

## 前期准备

首先，我们在 Azure 上启动一个 Dpdsv5 系列的实例，操作系统选择 Ubuntu 20.04。

![Dpdsv5](https://static.apiseven.com/2022/blog/0808/3.jpeg)

然后安装 Docker，方便后续使用容器化的方式来部署 Apache APISIX。

```shell
sudo apt-get update && sudo apt-get install docker.io
```

## 部署 Apache APISIX

Apache APISIX 使用 etcd 作为配置中心，因此需要先启动一个 etcd 实例。

```shell
sudo docker run -d --name etcd \
    -p 2379:2379 \
    -e ETCD_UNSUPPORTED_ARCH=arm64 \
    -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    rancher/coreos-etcd:v3.4.16-arm64
```

启动 Apache APISIX 实例。

```shell
sudo docker run --net=host -d apache/apisix:2.14.1-alpine
```

创建路由。

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

进行访问测试。

```shell
curl -i http://127.0.0.1:9080/anything/das
```

返回以下结果则表示安装成功：

```shell
HTTP/1.1 200 OK
.....
```

## Azure Ddsv5 vs Azure Dpdsv5

从上述操作来看，Apache APISIX 在 Azure Dpdsv5 上的安装和兼容性测试都能顺利完成。那么 Azure Dpdsv5 的实际性能到底如何呢？接下来我们将使用 Apache APISIX 分别在 Azure Dpdsv5 和  Azure Ddsv5 上做性能测试对比，看看实际表现。

Azure Ddsv5 是 Azure D 系列的另一款机型，是基于 Intel® x86 架构的， 所以上述 etcd 安装步骤略有不同：

```shell
sudo docker run -d --name etcd \
    -p 2379:2379 \
    -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    -e ALLOW_NONE_AUTHENTICATION=yes \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    bitnami/etcd:3.4.16
```

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

1. QPS 比较

    ![QPS](https://static.apiseven.com/2022/blog/0808/4.png)

2. 请求延迟比较

    ![Latency](https://static.apiseven.com/2022/blog/0808/5.png)

<table>
    <tr>
        <td><b>  </b></td>
        <td colspan="2">单个上游</td>
        <td colspan="2">单个上游+两个插件</td>
    </tr>
    <tr>
        <td><b>  </b></td>
        <td><b>Azure Ddsv5</b></td>
        <td><b>Azure Dpdsv5</b></td>
        <td><b>Azure Ddsv5</b></td>
        <td><b>Azure Dpdsv5</b></td>
    </tr>
    <tr>
        <td><b>QPS(request/s)</b></td>
        <td><b>14900</b></td>
        <td><b>13400</b></td>
        <td><b>13100</b></td>
        <td><b>11000</b></td>
    </tr>
    <tr>
        <td><b>Latency(ms)</b></td>
        <td><b>1.07</b></td>
        <td><b>1.21</b></td>
        <td><b>1.21</b></td>
        <td><b>1.43</b></td>
    </tr>
    </table>

从以上数据也可以看出，在 API 网关等网络 IO 密集计算场景下，Dpdsv5 相比同系列 Ddsv5 在性能上仍然有差距。不过另一个好消息是，在同等配置的情况下，Dpdsv5 的价格要比 Ddsv5 便宜 20% 左右。在实际机器选型时，用户可以根据自己的业务体量来灵活决策。

## 总结

本文主要使用 Apache APISIX 来对比 Azure Ddsv5 和 Azure Dpdsv5 的性能。从结果可以看出 Azure Dpdsv5 相比 Ddsv5，表现虽然不是那么亮眼，但是由于该系列的机型尚处于预览版，微软正在进行持续的改进和优化，我们也非常期待它的后续表现。

## 参考链接

[Now in preview: Azure Virtual Machines with Ampere Altra Arm-based processors](https://azure.microsoft.com/en-us/blog/now-in-preview-azure-virtual-machines-with-ampere-altra-armbased-processors/)
