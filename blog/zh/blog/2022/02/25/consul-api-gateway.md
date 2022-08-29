---
title: "API 网关 Apache APISIX 集成 Consul KV，服务发现能力再升级"
authors:
  - name: "杨陶"
    title: "Author"
    url: "https://github.com/SkyeYoung"
    image_url: "https://github.com/SkyeYoung.png"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://github.com/yzeng25.png"
keywords: 
- API Gateway
- Consul
- 服务发现
- 服务注册
description: 云原生 API 网关 Apache APISIX 支持基于 Consul KV 的服务发现。本文讲述了在 Apache APISIX 中实现服务发现和服务注册的全过程及 consul_kv 的相关原理。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/HashiCorp%20Consul.png
---

> Apache APISIX 支持基于 Consul KV 的服务发现注册表。这篇文章讲述了在 Apache APISIX 中实现服务发现和服务注册的全过程。

<!--truncate-->

## 背景信息

Apache APISIX 是一个动态、实时、高性能的 API 网关。

作为 API 网关，Apache APISIX 提供了负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。

Consul 是一个服务网格解决方案，其核心之一的 Consul KV 是一个分布式键值数据库，主要用途是存储配置参数和元数据，同时也允许用户存储索引对象。

在微服务架构模式下，当扩容、硬件故障等导致上游服务发生变动的情况出现时，通过手动撰写配置，维护上游服务信息的方式，会导致维护成本陡增。对此，Apache APISIX 提供了服务发现注册中心的功能，实现动态获取最新的服务实例信息，以降低用户的维护成本。

目前，Apache APISIX 借由社区贡献的 `consul_kv` 模块，支持了基于 Consul KV 的服务发现注册中心。

## 插件工作原理

Apache APISIX 利用 Consul KV 分布式键值存储能力的 `consul_kv` 模块，解耦了服务的提供者和消费者，实现了服务发现注册中心的两大核心功能。

1. 服务注册：服务提供者向注册中心注册服务。
2. 服务发现：服务消费者通过注册中心查找服务提供者的路由信息。

在此基础上构建的 Apache APISIX 将更灵活地适应现有的微服务架构，更好地满足用户需求。

![APISIX Consul 工作原理](https://static.apiseven.com/202108/1645769130815-f23e9e11-ca57-4262-9083-aab5509aa178.png)

## 如何使用

本文中的测试环境均使用 docker-compose 在 Docker 中搭建。

1. 下载 Apache APISIX。

  ```shell
  # 拉取 apisix-docker 的 Git 仓库
  git clone https://github.com/apache/apisix-docker.git
  ```

2. 创建 Consul 文件夹和配置文件。

  ```shell
  # 创建 consul 文件夹
  mkdir -p ~/docker-things/consul/ && cd "$_"
  # 创建配置文件
  touch docker-compose.yml server1.json
  ```

3. 修改 `docker-compose.yml` 文件。

  ```yaml
  version: '3.8'

  services:
    consul-server1:
      image: consul:1.9.3
      container_name: consul-server1
      restart: always
      volumes:
        - ./server1.json:/consul/config/server1.json:ro
      networks:
        - apisix
      ports:
        - '8500:8500'
      command: 'agent -bootstrap-expect=1'

  networks:
    apisix:
      external: true
      name: example_apisix
  ```

4. 修改 `server1.json` 文件。

  ```json
  {
    "node_name": "consul-server1",
    "server": true,
    "addresses": {
      "http": "0.0.0.0"
    }
  }
  ```

5. 在 Apache APISIX 中的配置文件 `apisix_conf/config.yaml` 添加 Consul 的相关配置信息。

  ```yaml
  # config.yml
  # ...other config
  discovery:
    consul_kv:
      servers:
        - "http://consul-server1:8500"
      prefix: "upstreams"
  ```

6. 启动 Apache APISIX 和 Consul。

  ```shell
  # 进入 example 和 consul 文件夹，依次启动 APISIX 和 Consul
  docker-compose up -d
  ```

7. 将测试服务注册到 Consul。`example` 包含了两个 Web 服务，你可以直接使用这两个服务进行测试。

  ```shell
  # 检查 example 的 docker-compose.yml 就可以看到两个 Web 服务
  $ cat docker-compose.yml | grep web
  # 输出
  web1:
    - ./upstream/web1.conf:/etc/nginx/nginx.conf
  web2:
    - ./upstream/web2.conf:/etc/nginx/nginx.conf
  ```

8. 确认 Web 服务的 IP 地址。

  ```shell
  $ sudo docker inspect -f='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(sudo docker ps -aq) | grep web
  # 输出
  /example-web1-1 - 172.26.0.7
  /example-web2-1 - 172.26.0.2
  ```

9. 在终端中对 Consul 的 HTTP API 进行请求以注册测试服务。
  
  ```shell
  # 使用对应的 IP 进行注册
  curl \
    -X PUT \
    -d ' {"weight": 1, "max_fails": 2, "fail_timeout": 1}' \
    http://127.0.0.1:8500/v1/kv/upstreams/webpages/172.26.0.7:80

  curl \
    -X PUT \
    -d ' {"weight": 1, "max_fails": 2, "fail_timeout": 1}' \
    http://127.0.0.1:8500/v1/kv/upstreams/webpages/172.26.0.2:80
  ```

  其中，`/v1/kv/` 后的路径按照 `{Prefix}/{Service Name}/{IP}:{Port}` 的格式构成。
  
  `{Prefix}` 是在 APISIX 中配置 Consul 时写入的 prefix，`{Service Name}` 和 `{IP}:{Port}` 则需要根据上游服务，由用户自行确定。
  
  而数据的格式则为 `{"weight": <Num>, "max_fails": <Num>, "fail_timeout": <Num>}`。

10. 查看测试服务是否注册成功。

  ```shell
  $ curl "http://127.0.0.1:8500/v1/kv/upstreams/webpages?keys"
  ```

  返回消息如下则表示注册成功。

  ```shell
  ["upstreams/webpages/172.26.0.2:80","upstreams/webpages/172.26.0.7:80"]%
  ```

### 创建路由并为其启用 Consul

使用 Apache APISIX 提供的 Admin API 将 Consul 添加到路由中。

在添加之前需要先确定 `X-API-KEY` 和 `upstream.service_name` 两个数据。

- `X-API-KEY`：Admin API 的访问 Token，在此示例中，我们使用默认的 `edd1c9f034335f136f87ad84b625c8f1` 即可。
- `upstream.service_name`：上游服务的名称，它指定了将与某个路由绑定的某个注册中心中的服务（Service），使用 Consul 时需要设置为注册测试服务时的 URL，并去掉最后的 `{IP}:{Port}` 部分。我们也可以通过 Apache APISIX 提供的 Memory Dump API 获取服务的 URL，同时确认是否能正常发现上游服务。

```shell
$ curl http://127.0.0.1:9092/v1/discovery/consul_kv/dump | jq
# 输出
{
  "services": {
    # 这个 key 就是需要的 URL
    "http://consul-server1:8500/v1/kv/upstreams/webpages/": [
      {
        "port": 80,
        "host": "172.26.0.7",
        "weight": 1
      },
      {
        "port": 80,
        "host": "172.26.0.2",
        "weight": 1
      }
    ]
  },
  "config": {
    # ...configs
  }
}
```

### 添加路由

这里将 URL 为 `/consul/*` 的请求路由分配到 `http://consul-server1:8500/v1/kv/upstreams/webpages/`。同时， `discovery_type` 必须设置为 `consul_kv` 以启动对应模块。

```shell
curl http://127.0.0.1:9080/apisix/admin/routes -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X POST -d '
{
    "uri": "/consul/*",
    "upstream": {
        "service_name": "http://consul-server1:8500/v1/kv/upstreams/webpages/",
        "type": "roundrobin",
        "discovery_type": "consul_kv"
    }
}'
```

### 测试配置结果

通过请求结果可以看到， Apache APISIX 中新增的路由已经可以通过 Consul 找到正确的服务地址，并根据负载均衡策略请求到两个节点上。

```shell
# 第一次请求
curl -s http://127.0.0.1:9080/consul/
# 输出
hello web1%

# 第二次请求
curl -s http://127.0.0.1:9080/consul/
# 输出
hello web2%

# 注意：也有可能两次请求获取的都是 web1 或者 web2。
#      这是由负载均衡的特性造成的，您可以尝试进行更多次请求。
```

## 总结

本文的前半部分介绍了 Apache APISIX 如何配合 Consul 实现基于 Consul KV 的服务发现注册中心，解决服务信息管理维护的问题。而在后半部分则着重介绍了如何在 Docker 中搭配 Consul 使用 Apache APISIX 的操作流程。当然，在实际场景中的应用，还需要各位读者根据业务使用场景和已有的系统架构具体分析。关于在 Apache APISIX 中使用 Consul 注册中心的更多说明，可以在[官方文档](https://apisix.apache.org/zh/docs/apisix/discovery/consul_kv/)中找到。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果您对此有兴趣，您可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join)进行交流.
