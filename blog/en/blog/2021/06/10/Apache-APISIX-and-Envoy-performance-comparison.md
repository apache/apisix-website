---
title: "Apache APISIX v.s Envoy: Which Has the Better Performance?"
slug: 2021/06/10/apache-apisix-and-envoy-performance-comparison
author: "Yuansheng Wang"
authorURL: "https://github.com/membphis"
authorImageURL: "https://avatars.githubusercontent.com/u/6814606?v=4"
keywords: 
- APISIX
- Envoy
- Apache APISIX
- Service Mesh
- API Gateway
- Performance
description: The performance of the cloud native API gateway Apache APISIX is stronger than that of Envoy when multiple workers are enabled. 
tags: [Ecosystem]
---

> This article introduces the performance comparison between Apache APISIX and Envoy under certain conditions. In general, APISIX is slightly better than Envoy in terms of response latency and QPS, and APISIX has more advantages than Enovy when multiple worker processes are enabled due to the collaborative approach of NGINX in high concurrency scenarios. The performance and latency of APISIX makes it a massive throughput capability in handling north-south traffic.

<!--truncate-->

I learned about Envoy at the CNCF technology sharing session and did performance tests on Apache APISIX and Envoy after the session.

At a technical sharing session organized by CNCF, I heard about Envoy for the first time, and the guest speaker talked a lot about it, but all I can recall is a particularly novel concept “communication bus”. This is how the official website describes it.

“Envoy is an L7 proxy and communication bus designed for large modern SOA (Service Oriented Architecture) architectures”

In other words, Envoy is to solve the Server Mesh field and the birth of L7 proxy software. I found a diagram online. My understanding of Envoy is probably the following deployment architecture (please correct me if I am wrong).

Since it is a proxy software for L7, as an experienced user in the OpenResty community for many years, naturally I can’t help but use it to engage in comparison.

The object we chose to test is Apache APISIX, which is an API gateway based on OpenResty implementation. (In fact, it is also an L7 proxy and then added routing, authentication, flow restriction, dynamic upstream, and other features)

Why did I choose it? Because once I heard about the great routing implementation of this product during a community share. Since our business routing system is in a mess, I downloaded the source code of Apache APISIX and found that it is an awesome API gateway, beating all similar products I’ve seen, so I was impressed by it!

Here is a diagram from the Apache APISIX official website, a diagram explains things better than words, you can see how Apache APISIX works.

![APISIX architechture](https://static.apiseven.com/202108/20210617002.png)

Let’s get started, first we go to the official website to find the most versions of two products: Apache APISIX 1.5 and Envoy 1.14 (the latest version at the time of writing this article).

## Build Environment Preparation

- Stress test client: wrk.
- Testing main metrics including: gateway latency, QPS and whether it scales linearly.
- Test environment: Microsoft Cloud Linux (ubuntu 18.04), Standard D13 v2 (8 vcpus, 56 GiB memory).
- Test method 1: single-core run for side-by-side comparison (since they are both based on epoll IO model, single-core crush test is used to verify their processing power).
- Test method 2: using multicore to run a side-by-side comparison, mainly to verify whether their overall processing power can grow linearly under the scenario of adding more (processes|threads).

## Test Scenarios

We built an upstream server with NGINX, configured it with 2 workers, and received a request to directly answer 4k content, with the following reference configuration:

```text
server {
  listen 1980;

  access_log off;
  location = /hello {
    echo_duplicate 400 "1234567890";
  }
}
```

- The network architecture schematic is as follows: (green normal load, not run full. Red is a high pressure load, to run the process resources full, mainly CPU)
是 CPU）

![test result](https://static.apiseven.com/202108/20210617003.png)

## Route Configuration

First we find the Apache APISIX Getting Started configuration guide and we add a route to /hello with the following configuration:

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

Note that the proxy_cache and proxy_mirror plugins are not started here, as Envoy does not have similar functionality.

Then we add a route to Envoy by referring to the official Envoy pressure test guide:

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

The `generate_request_id`, `dynamic_stats` and `circuit_breakers` sections above are turned on by default inside Envoy, but they are not used in this compression test and need to be turned off explicitly or set to oversize thresholds to improve performance (Can someone explain to me why this is so complicated to configure...).

## Results

Single route without any plugins turned on. Turn on different CPU counts for full load stress test.

Note: For NGINX called worker number, Envoy is concurrent, in order to unify the number of workers called after.

| **Workers**    | **APISIX QPS** | **APISIX Latency** | **Envoy QPS** | **Envoy Latency** |
| :------------ | :------------- | :----------------- | :------------ | :---------------- |
| **1 worker**  | 18608.4        | 0.96               | 15625.56      | 1.02              |
| **2 workers** | 34975.8        | 1.01               | 29058.135     | 1.09              |
| **3 workers** | 52334.8        | 1.02               | 42561.125     | 1.12              |

Note: The raw data is publicly available at [gist](https://gist.github.com/aifeiasdf/9fc4585f6404e3a0a70c568c2a14b9c9) preview.

![test result](https://static.apiseven.com/202108/20210617004.png)

QPS: The number of requests completed per second, the higher the number the better, the higher the value means the more requests can be completed per unit time. From the QPS results, Apache APISIX performance is about 120% of Envoy’s, and the higher the number of cores, the bigger the QPS difference.

Latency: Latency per request, the smaller the value the better. It represents how long it takes to receive an answer per request from the time it is sent. For reverse proxy scenarios, the smaller the value, the smaller the impact on the request will be. From the results, Envoy’s per-request latency is 6–10% more than Apache APISIX, and the higher the number of cores the higher the latency.

We can see that the difference between the two metrics in the single-worker thread|process mode, QPS and Latency is not large, but with the increase in the number of threads|processes their gap is gradually enlarged, here I analyze that there may be two reasons, NGINX in the high concurrency scenario with multiple workers and the system IO model for interaction is not more advantageous, on the other hand, also On the other hand, NGINX itself may be more “stingy” in terms of memory and CPU usage in its implementation, so that the cumulative performance advantage can be evaluated in detail later.

## Conclusion

In general, Apache APISIX is slightly better than Envoy in terms of response latency and QPS, and due to NGINX’s multi-worker collaboration method, which is more advantageous in high concurrency scenarios, Apache APISIX’s performance improvement is more obvious than Envoy’s after opening multiple worker processes. The bus design of Envoy gives it a unique advantage in handling east-west traffic, while the performance and latency of Apache APISIX gives it a massive throughput capability in handling north-south traffic.
Apache APISIX
