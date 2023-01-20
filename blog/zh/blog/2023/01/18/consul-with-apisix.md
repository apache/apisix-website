---
title: "Apache APISIX 集成原生 Consul 的服务发现能力"
authors:
  - name: "李奕浩"
    title: "Author"
    url: "https://github.com/Fabriceli"
    image_url: "https://github.com/Fabriceli.png"
keywords:
- API Gateway
- Consul
- 服务发现
- 服务注册
description: 云原生 API 网关 Apache APISIX 支持原生 Consul 的服务发现能力。本文讲述了在 Apache APISIX 中实现服务发现和服务注册的全过程及 Consul 的相关原理。
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/HashiCorp%20Consul.png
---

> Apache APISIX 支持原生 Consul 的服务发现能力。本文讲述了在 Apache APISIX 中实现服务发现和服务注册的全过程及 Consul 的相关原理。

<!--truncate-->

## 背景

### 关于 Apache APISIX

Apache APISIX 是 Apache 软件基金会下的云原生 API 网关，它兼具动态、实时、高性能等特点，提供了负载均衡、动态上游、灰度发布（金丝雀发布）、服务熔断、身份认证、可观测性等丰富的流量管理功能。我们可以使用 Apache APISIX 来处理传统的南北向流量，也可以处理服务间的东西向流量。

### 关于 Consul

Consul 是 HashiCorp 公司推出的开源工具，用于实现分布式系统的服务发现与配置，提供了服务注册与发现、健康检查、Key/Value 存储、多数据中心的能力。

## 准备阶段

本文中的测试环境使用 docker-compose 搭建

1. 下载 Apache APISIX

   ```sh
   git clone https://github.com/apache/apisix-docker.git
   ```

2. 创建并运行 Consul

   ```sh
   docker run --rm --name consul_1 -d -p 8500:8500 consul:1.8 consul agent -server -bootstrap-expect=1 -node=agent-one -client 0.0.0.0 -log-level info -data-dir=/consul/data -enable-script-checks
   ```

3. 更新 Apache APISIX 中的配置文件 `apisix_conf/config.yaml`

   ```yaml
   # config.yml
   # ... other config
   discovery:
     consul:
       servers:
         - "http://127.0.0.1:8500"
   ```

4. 启动 Apache APISIX

   ```sh
   # 进 example 文件夹，启动 APISIX
   docker-compose -f docker-compose.yml -p apisix-docker  up -d
   ```

5. 测试服务已经包含了两个 Web 服务，确认 Web 服务的 IP 地址

   ```sh
   $ sudo docker inspect -f='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(sudo docker ps -aq) | grep web
   # 输出
   /apisix-docker-web1-1 - 172.21.0.5
   /apisix-docker-web2-1 - 172.21.0.6
   ```

6. 请求 Consul HTTP API 将 Web 服务注册到 Consul

   ```sh
   # 使用 Web 对应的 IP 和 port 进行注册
   $ curl --location --request PUT 'http://127.0.0.1:8500/v1/agent/service/register' \
   --header 'Content-Type: application/json' \
   --data '{
      "ID": "service_a1",
      "Name": "service_a",
      "Tags": ["primary", "v1"],
      "Address": "172.21.0.5",
      "Port": 9081,
      "Weights": {
         "Passing": 10,
         "Warning": 1
      }
   }'

   $ curl --location --request PUT 'http://127.0.0.1:8500/v1/agent/service/register' \
   --header 'Content-Type: application/json' \
   --data '{
      "ID": "service_a2",
      "Name": "service_a",
      "Tags": ["primary", "v1"],
      "Address": "172.21.0.6",
      "Port": 9082,
      "Weights": {
         "Passing": 10,
         "Warning": 1
      }
   }'
   ```

7. 查看测试服务是否注册成功

   ```sh
   $ curl --location --request GET 'http://127.0.0.1:8500/v1/catalog/service/service_a'
   ```

   其中，`/v1/catalog/service/` 后的路径是服务名称，即服务注册时候的 `name` 。
   返回消息体如下则表示成功注册。

  ```json
   [{
      "ID": "7a36c6f1-f701-9c67-8db8-7b8551d36b4a",
      "Node": "agent-one",
      "Address": "172.23.0.2",
      "Datacenter": "dc1",
      "TaggedAddresses": {
         "lan": "172.23.0.2",
         "lan_ipv4": "172.23.0.2",
         "wan": "172.23.0.2",
         "wan_ipv4": "172.23.0.2"
      },
      "NodeMeta": {
         "consul-network-segment": ""
      },
      "ServiceKind": "",
      "ServiceID": "service_a1",
      "ServiceName": "service_a",
      "ServiceTags": ["primary", "v1"],
      "ServiceAddress": "172.20.10.2",
      "ServiceTaggedAddresses": {
         "lan_ipv4": {
            "Address": "172.20.10.2",
            "Port": 9082
         },
         "wan_ipv4": {
            "Address": "172.20.10.2",
            "Port": 9082
         }
      },
      "ServiceWeights": {
         "Passing": 10,
         "Warning": 1
      },
      "ServiceMeta": {},
      "ServicePort": 9082,
      "ServiceEnableTagOverride": false,
      "ServiceProxy": {
         "MeshGateway": {},
         "Expose": {}
      },
      "ServiceConnect": {},
      "CreateIndex": 46,
      "ModifyIndex": 124
   }, {
      "ID": "7a36c6f1-f701-9c67-8db8-7b8551d36b4a",
      "Node": "agent-one",
      "Address": "172.23.0.2",
      "Datacenter": "dc1",
      "TaggedAddresses": {
         "lan": "172.23.0.2",
         "lan_ipv4": "172.23.0.2",
         "wan": "172.23.0.2",
         "wan_ipv4": "172.23.0.2"
      },
      "NodeMeta": {
         "consul-network-segment": ""
      },
      "ServiceKind": "",
      "ServiceID": "service_a2",
      "ServiceName": "service_a",
      "ServiceTags": ["primary", "v1"],
      "ServiceAddress": "172.20.10.2",
      "ServiceTaggedAddresses": {
         "lan_ipv4": {
            "Address": "172.20.10.2",
            "Port": 9081
         },
         "wan_ipv4": {
            "Address": "172.20.10.2",
            "Port": 9081
         }
      },
      "ServiceWeights": {
         "Passing": 10,
         "Warning": 1
      },
      "ServiceMeta": {},
      "ServicePort": 9081,
      "ServiceEnableTagOverride": false,
      "ServiceProxy": {
         "MeshGateway": {},
         "Expose": {}
      },
      "ServiceConnect": {},
      "CreateIndex": 47,
      "ModifyIndex": 125
   }]
  ```

## 创建路由

### 添加路由

在添加之前需要确认 `X-API-KEY`，属于 APISIX Admin API 的访问 Token，在该示例中，使用默认的即可：`edd1c9f034335f136f87ad84b625c8f1`，这里将 URL 为 `/consul/web/*` 的请求路由分配到 Consul 的 service_a。

```sh
$ curl http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "/consul/web/*",
    "upstream": {
        "service_name": "service_a",
        "type": "roundrobin",
        "discovery_type": "consul"
    }
}'
```

返回如下结构体表示成功添加：

```json
{
   "value": {
      "status": 1,
      "uri": "\/*",
      "update_time": 1674029322,
      "id": "1",
      "upstream": {
         "hash_on": "vars",
         "discovery_type": "consul",
         "pass_host": "pass",
         "scheme": "http",
         "service_name": "service_a",
         "type": "roundrobin"
      },
      "create_time": 1674029322,
      "priority": 0
   },
   "key": "\/apisix\/routes\/1"
}
```

## 验证配置结果

通过请求结果可以看到，Apache APISIX 中新增的路由通过 Consul 命中了正确的服务地址，并根据 `roundrobin` 负载均衡策略请求到两个节点上。

```sh
# 第一次请求
curl -s http://127.0.0.1:9080/consul/web/
# 输出
hello web2%

# 第二次请求
curl -s http://127.0.0.1:9080/consul/web/
# 输出
hello web1%

# 注意：两次请求获取的都可能是 web1 或者 web2
```

## 总结

本文的前半部分介绍了 Apache APISIX 如何配合 Consul 实现基于 Consul 的服务发现注册中心，解决服务信息管理维护的问题。而在后半部分则着重介绍了如何在 Docker 中搭配 Consul 使用 Apache APISIX 的操作流程。当然，在实际场景中的应用，还需要各位读者根据业务使用场景和已有的系统架构具体分析。关于在 Apache APISIX 中使用 Consul 注册中心的更多说明，可以在[官方文档](https://apisix.apache.org/zh/docs/apisix/discovery/consul/)中找到。

Apache APISIX 项目目前正在开发其他插件以支持集成更多服务，如果您对此有兴趣，您可以通过 [GitHub Discussions](https://github.com/apache/apisix/discussions) 发起讨论，或通过[邮件列表](https://apisix.apache.org/docs/general/join)进行交流.
