---
title: "How to Integrate API Gateway and Consul?"
authors:
  - name: "Tao Yang"
    title: "Author"
    url: "https://github.com/SkyeYoung"
    image_url: "https://github.com/SkyeYoung.png"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://github.com/yzeng25.png"
keywords: 
- API Gateway
- Consul
- Service Discovery
- Servici Register
description: Apache APISIX supports the Consul KV-based service discovery registry. This article will walk you through the process of implementing service discovery and service registry in APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/HashiCorp%20Consul.png
---

> Apache APISIX supports the Consul KV-based service discovery registry. This article will walk you through the process of implementing service discovery and service registry in Apache APISIX.

<!--truncate-->

## Background Information

Apache APISIX is a dynamic, real-time, high-performance API gateway.

APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

Consul is a service mesh solution. One of its cores, Consul KV, is a distributed key-value database whose primary purpose is to store configuration parameters and metadata, while also allowing users to store indexed objects.

In the microservice architecture model, when the upstream services change due to capacity expansion, hardware failure, etc., the way to maintain the upstream service information by manually writing the configuration can lead to a steep increase in maintenance cost. In response, Apache APISIX provides a service discovery registry to dynamically obtain the latest service instance information to reduce the maintenance cost for users.

Currently, Apache APISIX supports the Consul KV-based service discovery registry with the `consul_kv` module contributed by the community.

## How It Works

Apache APISIX leverages the `consul_kv` module of the Consul KV distributed key-value storage capability to decouple the provider and consumer of a service and implement the two core functions of a service discovery registry.

1. Service registration: Service providers register their services with the registry.
2. Service Discovery: Service consumers find the routing information of service providers through the registry.

Built on this foundation, Apache APISIX will be more flexible and adaptable to existing microservice architectures to better meet user needs.

![APISIX Consul Integration](https://static.apiseven.com/202108/1645769130815-f23e9e11-ca57-4262-9083-aab5509aa178.png)

## How to Enable Consul in Apache APISIX

The test environments in this article are built in Docker using docker-compose.

1. Download Apache APISIX.

  ```shell
  # Pull the Git repository of apisix-docker
  git clone https://github.com/apache/apisix-docker.git
  ```

2. Create Consul folder and configuration files.

  ```shell
  # Create Consul folder
  mkdir -p ~/docker-things/consul/ && cd "$_"
  # Create configuration files
  touch docker-compose.yml server1.json
  ```

3. Edit the `docker-compose.yml` file.

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

4. Edit the `server1.json` file.

  ```json
  {
    "node_name": "consul-server1",
    "server": true,
    "addresses": {
      "http": "0.0.0.0"
    }
  }
  ```

5. Add Consul-related configuration information to the Apache APISIX configuration file `apisix_conf/config.yaml`.

  ```yaml
  # config.yml
  # ...other config
  discovery:
    consul_kv:
      servers:
        - "http://consul-server1:8500"
      prefix: "upstreams"
  ```

6. Start Apache APISIX and Consul.

  ```shell
  # Go to the example, consul folder, start APISIX and Consul
  docker-compose up -d
  ```

7. Register the test service to Consul. example contains two web services that you can use directly to test.

  ```shell
  # Check the docker-compose.yml of the example
  # You can see two Web services
  $ cat docker-compose.yml | grep web
  # Outputs
  web1:
    - ./upstream/web1.conf:/etc/nginx/nginx.conf
  web2:
    - ./upstream/web2.conf:/etc/nginx/nginx.conf
  ```

8. Confirm the IP addresses of these Web services.

  ```shell
  $ sudo docker inspect -f='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(sudo docker ps -aq) | grep web
  # Outputs
  /example-web1-1 - 172.26.0.7
  /example-web2-1 - 172.26.0.2
  ```

9. Make a request to Consul's HTTP API in the terminal to register the test service.
  
  ```shell
  # Register with the corresponding IP
  curl \
    -X PUT \
    -d ' {"weight": 1, "max_fails": 2, "fail_timeout": 1}' \
    http://127.0.0.1:8500/v1/kv/upstreams/webpages/172.26.0.7:80

  curl \
    -X PUT \
    -d ' {"weight": 1, "max_fails": 2, "fail_timeout": 1}' \
    http://127.0.0.1:8500/v1/kv/upstreams/webpages/172.26.0.2:80
  ```
  
  The path after `/v1/kv/` follows the format `{Prefix}/{Service Name}/{IP}:{Port}`.
  
  `{Prefix}` is the prefix written when configuring Consul in APISIX, while `{Service Name}` and `{IP}:{Port}` need to be determined by the user according to the upstream service.
  
  The format of the data is `{"weight": <Num>, "max_fails": <Num>, "fail_timeout": <Num>}`.

10. Check whether the test service is registered successfully.

  ```shell
  $ curl "http://127.0.0.1:8500/v1/kv/upstreams/webpages?keys"
  ```

  The following return message indicates successful registration.

  ```shell
  ["upstreams/webpages/172.26.0.2:80","upstreams/webpages/172.26.0.7:80"]%
  ```

### Create a Route and Enable Consul

Add Consul to the route using the Admin API provided by Apache APISIX.

The `X-API-KEY` and `upstream.service_name` need to be determined before adding them.

- `X-API-KEY`: For the Admin API access token, in this example, we use the default `edd1c9f034335f136f87ad84b625c8f1`.
- `upstream.service_name`: The name of the upstream service, which specifies the service in a registry that will be bound to a route, should be set to the URL used to register the test service when using Consul, and the `{IP}:{Port}` part should be removed at the end. We can also use the Memory Dump API provided by Apache APISIX to get the URL of the service and confirm whether the upstream service is discovered properly.

```shell
$ curl http://127.0.0.1:9092/v1/discovery/consul_kv/dump | jq
# Output
{
  "services": {
    # This key is the required URL
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

### Add a Route

Here the request with URL `/consul/*` is routed to `http://consul-server1:8500/v1/kv/upstreams/webpages/`. Also, the `discovery_type` must be set to `consul_kv` to start the corresponding module.

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

### Test and Verify the Result

The request results show that the new route in Apache APISIX has been able to find the correct service address through Consul and request it to both nodes based on the load balancing policy.

```shell
# the first request
curl -s http://127.0.0.1:9080/consul/
# Output
hello web1%

# the second request
curl -s http://127.0.0.1:9080/consul/
# Output
hello web2%

# Note: It is also possible that both requests will return
#       the same result as web1 or web2.
#       This is caused by the nature of load balancing and
#       you can try to make more requests.
```

## Summary

The first half of this article describes how Apache APISIX works with Consul to implement the Consul KV-based service discovery registry to solve the problem of service information management and maintenance. The second half of this article focuses on how to use Apache APISIX in Docker with Consul. Of course, the application in the actual scenario needs to be analyzed according to the business scenario and the existing system architecture.

More instructions on using the Consul registry in Apache APISIX can be found in the [official documentation](https://apisix.apache.org/docs/apisix/discovery/consul_kv/).

Apache APISIX is also currently working on additional plugins to support the integration of additional services, so if you are interested, feel free to start a discussion in [GitHub Discussion](https://github.com/apache/apisix/discussions), or via the [mailing list](https://apisix.apache.org/docs/general/join) to communicate.
