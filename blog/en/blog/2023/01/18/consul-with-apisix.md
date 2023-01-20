---
title: "How to Integrate API Gateway and Consul? Not Consul K/V"
authors:
  - name: "Yihao LI"
    title: "Author"
    url: "https://github.com/Fabriceli"
    image_url: "https://github.com/Fabriceli.png"
keywords:
- API Gateway
- Consul
- Service Discovery
- Service Register
description: Apache APISIX supports the Consul service discovery registry. This article will walk you through the process of implementing service discovery and service registry in APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/HashiCorp%20Consul.png
---

> Apache APISIX supports the Consul service discovery registry. This article will walk you through the process of implementing service discovery and service registry in Apache APISIX.

<!--truncate-->

## Background

### About Apache APISIX

Apache APISIX is an open source, dynamic, scalable, and high-performance cloud native API gateway for all your APIs and microservices.

APISIX facilitates interface traffic handling for websites, mobile and IoT applications by providing services such as load balancing, dynamic upstream, canary release, fine-grained routing, rate limiting, and many more.

### About Consul

Consul is a distributed, highly available, and data center aware solution to connect and configure applications across dynamic, distributed infrastructure. Consul provides several key features: Multi-Datacenter, Service Mesh, Service Discovery, Health Checking, Key/Value Storage

## Preparation Phase

The test environments in this article are built in Docker using docker-compose.

1. Download Apache APISIX

  ```sh
  git clone https://github.com/apache/apisix-docker.git
  ```

2. Create and run Consul

  ```sh
  docker run --rm --name consul_1 -d -p 8500:8500 consul:1.8 consul agent -server -bootstrap-expect=1 -node=agent-one -client 0.0.0.0 -log-level info -data-dir=/consul/data -enable-script-checks
   ```

3. Update Apache APISIX config file `apisix_conf/config.yaml`

  ```yaml
  # config.yml
  # ... other config
  discovery:
    consul:
      servers:
        - "http://127.0.0.1:8500"
  ```

4. Start Apache APISIX

  ```sh
  # cd example folder，and start APISIX
  docker-compose -f docker-compose.yml -p apisix-docker  up -d
  ```

5. Example contains two web services that you can use directly to test.

  ```sh
  sudo docker inspect -f='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(sudo docker ps -aq) | grep web
  # Outputs
  /apisix-docker-web1-1 - 172.21.0.5
  /apisix-docker-web2-1 - 172.21.0.6
  ```

6. Register the test service to Consul via Consul HTTP API.

  ```shell
  # Register with the corresponding IP and port
  curl --location --request PUT 'http://127.0.0.1:8500/v1/agent/service/register' \
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

  curl --location --request PUT 'http://127.0.0.1:8500/v1/agent/service/register' \
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

7. Check whether the test service is registered successfully.

  ```shell
  curl --location --request GET 'http://127.0.0.1:8500/v1/catalog/service/service_a'
  ```

   The URL `/v1/catalog/service/:service_name` end with the path parameters which specifies the name of the service.
   The following return message indicates successful registration.

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

## Add a Route

The `X-API-KEY` need to be determined before adding them. `X-API-KEY`: For the Admin API access token, in this example, we use the default `edd1c9f034335f136f87ad84b625c8f1`.
Here the request with URL `/consul/web/*` is routed to Consul service `service_a`. Also, the `discovery_type` must be set to `consul` to start the corresponding module.
Add Consul to the route using the Admin API provided by Apache APISIX.

```sh
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "uri": "/consul/web/*",
    "upstream": {
        "service_name": "service_a",
        "type": "roundrobin",
        "discovery_type": "consul"
    }
}'
```

The following return message indicates successful addition.

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

## Test and Verify the Result

The request results show that the new route in Apache APISIX has been able to find the correct service address through Consul and request it to both nodes based on the load balancing policy.

```sh
# the first request
curl -s http://127.0.0.1:9080/consul/web/
# Output
hello web2%

# the second request
curl -s http://127.0.0.1:9080/consul/web/
# Output
hello web1%

# Note: It is also possible that both requests will return
#       the same result as web1 or web2.
#       This is caused by the nature of load balancing and
#       you can try to make more requests.
```

## Summary

The first half of this article describes how Apache APISIX works with Consul to implement the Consul service discovery registry to solve the problem of service information management and maintenance. The second half of this article focuses on how to use Apache APISIX in Docker with Consul. Of course, the application in the actual scenario needs to be analyzed according to the business scenario and the existing system architecture.

More instructions on using the Consul registry in Apache APISIX can be found in the [official documentation](https://apisix.apache.org/docs/apisix/discovery/consul_kv/).

Apache APISIX is also currently working on additional plugins to support the integration of additional services, so if you are interested, feel free to start a discussion in [GitHub Discussion](https://github.com/apache/apisix/discussions), or via the [mailing list](https://apisix.apache.org/docs/general/join) to communicate.
