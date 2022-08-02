---
title: "API 网关 Apache APISIX 在 AWS Graviton3 上的安装与性能测试"
authors:
  - name: "赵士瑞"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://avatars.githubusercontent.com/u/11553520?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- APISIX
- API Gateway
- AWS
- AWS Graviton3
- ARM64
description: 本文使用 APISIX 进行了 AWS Graviton3 与 AWS Graviton2 的性能对比，在 API 网关这种网络 IO 密集型的计算场景下，AWS Graviton3 可谓展示了性能怪兽的属性。
tags: [Ecosystem]
---

> 目前 Apache APISIX 进行了 ARM64 平台下的完整回归测试，修复了构建脚本在 ARM64 平台下的一些兼容性问题。本文通过简要的部署测试描述，呈现了在 AWS Graviton 环境下，无论是稳定性还是流量处理层面，APISIX 的表现都十分亮眼。

<!--truncate-->

## 背景

AWS 在 2022 年 5 月底发布了最新的基于 ARM 架构的 AWS Graviton 系列处理器——[AWS Graviton3](https://aws.amazon.com/cn/blogs/aws/new-amazon-ec2-c7g-instances-powered-by-aws-graviton3-processors/)。据 AWS 官方数据显示，与 Graviton2 处理器相比，基于领先的 DDR5 内存技术，Graviton3 处理器可提供高达 25% 的性能提升、高达 2 倍的浮点性能以及 50% 的内存访问速度；在性能与同类 EC2 实例相同的情况下，Graviton3 还可减少 60% 的能源。

那么实际数据会怎样呢？让我们以网络 IO 密集型的 API 网关为例，来看看 AWS Graviton3 的表现如何。在这里我们使用 Apache APISIX 在 AWS Graviton2（C6g）和 AWS Graviton3（C7g） 两种服务器环境下进行性能对比测试。

[Apache APISIX](https://github.com/apache/apisix) 是一个云原生、高性能、可扩展的 API 网关。基于 NGNIX+LuaJIT 和 etcd 来实现，和传统 API 网关相比，APISIX 具备动态路由和插件热加载的特点，特别适合云原生架构下的 API 管理。

![Apache APISIX](https://user-images.githubusercontent.com/39793568/172329936-774992c0-070b-48d0-be8b-33abbd6a4f78.png)

## 准备：安装部署

在进行测试前，需要准备一台搭载 ARM64 芯片的服务器，这里我们选用了 Amazon EC2 C7g（现在只有这个型号才搭载 AWS Graviton3），操作系统选择了 Ubuntu 20.04。

![Amazon EC2](https://user-images.githubusercontent.com/39793568/172340229-caf59d9c-cba2-4c95-a892-ef7cf29a0436.png)

同时安装 Docker。

```shell
sudo apt-get update && sudo apt-get install docker.io
```

目前，APISIX 已经发布了最新版本的 ARM64 镜像，可以使用 Docker 方式进行一键部署。具体过程可参考下方：

1. 启动 etcd

```shell
sudo docker run -d \
--name etcd -p 2379:2379 -e ETCD_UNSUPPORTED_ARCH=arm64 \
-e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
-e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
rancher/coreos-etcd:v3.4.16-arm64
```

2. 启动 APISIX

```
sudo docker run --net=host -d apache/apisix:2.14.1-alpine
```

3. 注册路由

```
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

4. 访问测试

```shell
curl -i http://127.0.0.1:9080/anything/das
```

```shell
HTTP/1.1 200 OK
.....
```

## AWS Graviton2 和 AWS Graviton3 的性能对比

根据前文的操作，基于[官方脚本](https://github.com/apache/apisix/blob/master/benchmark/run.sh)成功完成了 APISIX 在 AWS Graviton3 处理器上安装和兼容性测试。下面让我们来看看 Apache APISIX 在 AWS Graviton2（C6g）和 AWS Graviton3（C7g）上的性能表现。

为了方便测试，本示例中 APISIX 只开启了一个 Worker，下面的性能测试数据都是在单核 CPU 上运行的。

### 场景一：单个上游

该场景下使用单个上游（不包含任何插件），主要测试 APISIX 在纯代理回源模式下的性能表现。在本地环境中进行测试：

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

### 场景二：单上游+多插件

另一场景则使用单上游与多插件配合，在这里使用了两个插件。主要测试 APISIX 在开启 `limit-count` 和 `prometheus` 两个核心消耗性能插件时的性能表现。

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

### 数据对比

在上述两种场景下，分别从请求处理和延迟时间两个层面进行了相关测试与对比。结果如下：

1. QPS 对比

![QPS](https://user-images.githubusercontent.com/39793568/172340965-625d00b4-a97e-4f88-a1bc-fdfded5e9921.png)

2. Latency 对比

![Latency](https://user-images.githubusercontent.com/39793568/172341233-797008d5-6287-41a1-86bb-dfaaed3d1589.png)

<table>
    <tr>
        <td><b>  </b></td>
        <td colspan="2">单个上游</td>
        <td colspan="2">单个上游+两个插件</td>
    </tr>
    <tr>
        <td><b>  </b></td>
        <td><b>AWS Graviton2</b></td>
        <td><b>AWS Graviton3</b></td>
        <td><b>AWS Graviton2</b></td>
        <td><b>AWS Graviton3</b></td>
    </tr>
    <tr>
        <td><b>QPS(request/s)</b></td>
        <td><b>13000</b></td>
        <td><b>23000（提升76%）</b></td>
        <td><b>11000</b></td>
        <td><b>18000（提升63%）</b></td>
    </tr>
    <tr>
        <td><b>Latency(ms)</b></td>
        <td><b>1.11</b></td>
        <td><b>0.68（降低38%）</b></td>
        <td><b>1.39</b></td>
        <td><b>0.88（降低37%）</b></td>
    </tr>
    </table>

从上方数据可以看到，在 API 网关这样网络 IO 密集型的计算场景下，AWS Graviton3 比 AWS Graviton2 的性能提升了 76%，同时延迟还降低了 38%。这个数据比开头提到的 AWS 官方给出的数据（25%性能提升）还要优异。

## 总结

本文主要通过使用 Apache APISIX 进行了 AWS Graviton3 与 AWS Graviton2 的性能对比，可以看到在 API 网关这种网络 IO 密集型的计算场景下，AWS Graviton3 可谓展示了性能怪兽的属性。当然，也推荐大家多多进行实践，期待后续更多计算密集型项目的测试数据。
