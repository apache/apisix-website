---
title: "Installation and performance testing of API Gateway Apache APISIX on AWS Graviton3"
authors:
  - name: "Shirui Zhao"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://avatars.githubusercontent.com/u/11553520?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- APISIX
- API Gateway
- AWS
- AWS Graviton3
- ARM64
description: This article uses APISIX to compare the performance of AWS Graviton3 and AWS Graviton2. AWS Graviton3 shows the power performance in the API gateway.
tags: [Ecosystem]
---

> Apache APISIX has carried out regression tests under the ARM64 platform, and fixed some compatibility issues of the build scripts under the ARM64 platform. Through a brief deployment test description, this article shows that in the AWS Graviton environment, both in terms of stability and traffic processing, APISIX's performance is very dazzling.

<!--truncate-->

## Background

AWS released the latest ARM-based AWS Graviton family of processors at the end of May 2022 - [AWS Graviton3](https://aws.amazon.com/cn/blogs/aws/new-amazon-ec2-c7g-instances-powered-by-aws-graviton3-processors/). According to AWS official data, compared with Graviton2 processor, based on leading DDR5 memory technology, Graviton3 processor can provide up to 25% performance improvement, up to 2x floating point performance and 50% faster memory access speed; Graviton3 also uses 60% less energy on the same EC2 instance of the same type.

So what about the actual data? Let's take a network IO dense API Gateway as an example to see how AWS Graviton3 performs. Here we use Apache APISIX to perform performance comparison tests on AWS Graviton2 (C6g) and AWS Graviton3 (C7g) server environments.

[Apache APISIX](https://github.com/apache/apisix) is a cloud-native, high-performance, scalable API gateway. Based on NGNIX+LuaJIT and etcd, compared with traditional API gateways, APISIX has dynamic routing and plug-in hot loading features, which is especially suitable for API management under cloud native architecture.

![Apache APISIX](https://user-images.githubusercontent.com/39793568/172329936-774992c0-070b-48d0-be8b-33abbd6a4f78.png)

## Installation and Deployment

Prepare a server with an ARM64 chip, here we choose Amazon EC2 C7g(Only this model now has AWS Graviton3), and the operating system chooses Ubuntu 20.04.

![Amazon EC2](https://user-images.githubusercontent.com/39793568/172340229-caf59d9c-cba2-4c95-a892-ef7cf29a0436.png)

Don't forget to install Docker:

```shell
sudo apt-get update && sudo apt-get install docker.io
```

Apache APISIX has released the latest version of the ARM64 image, which can be deployed with one click using Docker. The detailed process can be found below.

1. Start etcd

```shell
sudo docker run -d \
--name etcd -p 2379:2379 -e ETCD_UNSUPPORTED_ARCH=arm64 \
-e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
-e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
rancher/coreos-etcd:v3.4.16-arm64
```

2. Start APISIX

```
sudo docker run --net=host -d apache/apisix:2.14.1-alpine
```

3. Register Route

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

4. Test

```shell
curl -i http://127.0.0.1:9080/anything/das
```

```shell
HTTP/1.1 200 OK
.....
```

## Performance Comparison of AWS Graviton2 and AWS Graviton3

According to the previous operations, based on the official [script](https://github.com/apache/apisix/blob/master/benchmark/run.sh), the installation and compatibility test of APISIX on the AWS Graviton3 processor was successfully completed. Let's take a look at the performance of Apache APISIX on AWS Graviton2 (C6g) and AWS Graviton3 (C7g).

For the sake of simplicity, only one Worker is enabled in APISIX in this test, and the following performance test data are all run on a single-core CPU.

### Scenario 1: Single upstream

Use a single upstream, without any plugins. It mainly tests the performance of APISIX in pure proxy back-to-origin mode.

```shell
# apisix: 1 worker + 1 upstream + no plugin

# register route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
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

### Scenario 2: Single upstream + Two plugins

Using a single upstream, two plugins. It mainly tests the performance of APISIX when the two core performance-consuming plugins, `limit-count` and `prometheus`, are enabled.

```shell
# apisix: 1 worker + 1 upstream + 2 plugins (limit-count + prometheus)

# register route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
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

### Data Comparison

In the above two scenarios, related testing and comparison were performed from the two levels of request processing and delay time. The results are as follows:

1. QPS comparison

![QPS](https://user-images.githubusercontent.com/39793568/172341634-464f06bc-67cd-4b5a-8671-7c476eaed7d4.png)

2. Latency comparison

![Latency](https://user-images.githubusercontent.com/39793568/172341805-aee6e3ef-bfd8-4053-824c-af0ba2809592.png)

<table>
    <tr>
        <td><b>  </b></td>
        <td colspan="2">Single Upstream</td>
        <td colspan="2">Single Upstream+Two Plugins</td>
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
        <td><b>23000(Increase 76%)</b></td>
        <td><b>11000</b></td>
        <td><b>18000(Increase 63%)</b></td>
    </tr>
    <tr>
        <td><b>Latency(ms)</b></td>
        <td><b>1.11</b></td>
        <td><b>0.68(Reduce 38%)</b></td>
        <td><b>1.39</b></td>
        <td><b>0.88(Reduce 37%)</b></td>
    </tr>
    </table>

It can also be seen from the above data that in a network IO dense computing scenario such as API Gateway, AWS Graviton3 improves the performance by 76% compared to AWS Graviton2, while reducing latency by 38%. This data is even better than the official data given by AWS mentioned at the beginning (25% performance improvement).

## Summarize

This article mainly uses Apache APISIX to compare the performance of AWS Graviton3 and AWS Graviton2. It can be seen that in the network IO dense computing scenario of API gateway, AWS Graviton3 can be said to show the properties of a performance monster. Of course, it is also recommended that you practice a lot, and look forward to more test data for computing-intensive projects in the future.
