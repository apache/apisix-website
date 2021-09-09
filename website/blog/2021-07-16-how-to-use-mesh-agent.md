---
title: "深度剖析 Apache APISIX Mesh Agent"
author: "张超"
authorURL: "https://github.com/tokers"
authorImageURL: "https://avatars.githubusercontent.com/u/10428333?v=4"
keywords: 
- APISIX
- 服务网格
- Service Mesh
- 开源,Sidecar
description: 本文介绍了基于 Apache APISIX 的服务网格方案，将对 apisix-mesh-agent 进行分析，介绍其使用定位及其实现的功能
tags: technology
---

> [@tokers](https://github.com/tokers), Apache APISIX committer from [API7.AI](https://www.apiseven.com/)
>
<!--truncate-->

今年 6 月，支流科技推出了[基于 Apache APISIX 的服务网格方案](https://www.apiseven.com/zh/blog/apisix-mesh-agent-release)，其中 Apache APISIX 将作为服务网格的数据面，与支持 xDS 协议的控制面配合，进而托管服务间的流量。在该方案中有一个不可或缺的组件 [apisix-mesh-agent](https://github.com/api7/apisix-mesh-agent)，它作为数据面与控制面的中间层，完成了很多适配性的工作，进而让 Apache APISIX 在接近零改造的情况下即可完美地工作在服务网格中。

本文将对 apisix-mesh-agent 进行分析，介绍其使用定位及其实现的功能。

## 使用定位

从使用角度上讲，apisix-mesh-agent 将和 Apache APISIX 共同运行在同一个（sidecar）容器内，事实上 Apache APISIX 也是由 apisix-mesh-agent fork 得到，这有点类似于 Istio 中 pilot-agent 与 Envoy 之间的关系。另外，它也负责在 Pod 启动后注入 iptables 规则（拦截服务实例的出入流量）。

![apisix-mesh-agent](https://static.apiseven.com/202108/1630639686171-133e72d8-fcd1-4436-9be5-bc1d9b6ebb32.png)


从图中可以看到，apisix-mesh-agent 负责和控制面交互（获取配置变更），Apache APISIX 负责实际的流量处理和转发。

## 获取配置变更

前面我们提到，apisix-mesh-agent 将和实现了 xDS 协议的控制面进行交互，从控制面处获取最新的配置变更，具体来说，apisix-mesh-agent 会通过 CDS （Cluster Disocvery Service）来获取集群列表，并进一步通过 EDS（Endpoint Discovery Service）获取这些集群的最新实例列表；集群列表和集群对应的实例列表将在 apisix-mesh-agent 内部转换为 Apache APISIX 的 [Upstream](https://apisix.apache.org/docs/apisix/architecture-design/upstream/) 对象（EDS 的数据则是转换为 Upstream 的节点信息）。

此外，apisix-mesh-agent 通过 LDS（Listener Discovery Service）获取动态监听器，apisix-mesh-agent 获取监听器后，主要的目的是获取其中的 HTTP Connection Manager 内的 RDS 名称表，进而能够发起 RDS 请求（Route Discovery Service），获取到具体的路由配置，这部分路由配置将被映射到 Apache APISIX 的 [Route](https://apisix.apache.org/docs/apisix/architecture-design/route/) 对象。至于监听器本身，并不会为 Apache APISIX 所用。

细心的读者可能会发现，这些监听器本身就是一个路由匹配条件，即目标服务的地址和端口信息，如果 Apache APISIX 忽略了这些监听器，那么是否会出现串路由的情况？事实上，我们通过在 Nginx 核心中添加了一个新的变量 $connection_original_dst，这个变量的值是流量原始的地址和端口信息（没有被 iptables 劫持的情况下），有了这一层判断以后，路由之间则不会出现乱串的情况。（感兴趣的同学可以[点此](https://github.com/api7/apisix-mesh-agent/blob/main/nginx/patches/nginx-1.19.3-connection-original-dst.patch)了解这个变量的实现。）

```json
# 10.0.5.113:8000 监听器下的某路由配置
{
  "name": "vhost1",
  "domains": [
    "apisix.apache.org"
  ],
  "routes": [
    {
      "name": "route1",
      "match": {
        "path_specifier": {
          "prefix": "/foo/baz"
        }
      },
      "action": {
        "route": {
          "cluster_specifier": {
            "cluster": "httpbin.default.svc.cluster.local"
          }
        }
      }
    }
  ]
}

# 转换成 Apache APISIX 的配置后：
{
  "uris": [
    "/foo/baz*"
  ],
  "hosts": [
    "apisix.apache.org"
  ],

  # 该路由匹配时需要判断对应连接原始的目标地址是否是 "10.0.5.113:8000"，即
  # httpbin.default.svc.cluster.local 这一服务的 ClusterIP（只考虑 Kubernetes
  # 场景）。
  "vars": [
    ["connection_original_dst", "==", "10.0.5.113:8000"]
  ]

  # upstream_id 定义了 httpbin.default.svc.cluster.local 这一服务，
  # 包含其最新的实例地址和其他相关的负载均衡、健康检查等配置。
  "upstream_id": "90ba12b92e2d417f6802536696431724d59856ea"
}
```
转换后的配置将被缓存在 apisix-mesh-agent 的内存中。那么数据又该怎么传递给 Apache APISIX 呢？

## 模拟 ETCD

Apache APISIX 使用 ETCD 作为其配置中心，通过 ETCD 的 watch 机制不断获取最新的配置从而保证其处理正确性。为了能让 Apache APISIX 在不做任何改变的情况下就能工作于服务网格场景中，我们让 apisix-mesh-agent 模拟了 ETCD V3 APIs，从而能够将其从控制面获取到的配置（加以转换后）传递到本地的 Apache APISIX 进程。

目前 apisix-mesh-agent 主要实现的 API 有 Range （获取指定配置）和 Watch （监听指定配置变更）两个只读的 ETCD API 接口，并且支持了根据键值来获取不同的资源（如路由和上游资源）。对于 Watch 接口，我们需要推送增量更新事件，而类似 Istio 这样的控制面使用的是 xDS 协议中的 SotW（State of the World）变种，即每次都是推送全量数据，为了能够获取到更新事件，apisix-mesh-agent 会将当前获取到的数据与上一次的数据状态进行对比，从而对比得到增量更新事件然后传递到 Apache APISIX。

## 总结

通过引入 apisix-mesh-agent 这一中间层，我们成功地将 Apache APISIX 部署在服务网格中，未来 apisix-mesh-agent 也将支持 xDS 协议中更多的功能以及可观测性和证书管理等方面的能力，从而让 APISIX Mesh 变得更加成熟与强大。
