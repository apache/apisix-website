---
title: "How is the Azure ARM architecture server perform?"
authors:
  - name: "Shirui Zhao"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
  - name: "Fei Han"
    title: "Technical Writer"
    url: "https://github.com/hf400159"
    image_url: "https://github.com/hf400159.png"
keywords: 
- API gateway
- Azure
- Microsoft
- Apache APISIX
- Arm
description: This article uses API Gateway Apache APISIX to compare the performance of Azure Ddsv5 and Azure Dpdsv5 in network IO-intensive scenarios.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/28/635b53794f32a.png
---

> This article uses API Gateway Apache APISIX to compare the performance of Azure Ddsv5 and Azure Dpdsv5 in network IO-intensive scenarios.

<!--truncate-->

<head>
    <link rel="canonical" href="https://api7.ai/2022/08/08/apache-apisix-performance-test-in-azure/" />
</head>

## Background

In April, Microsoft announced a preview of its family of Azure virtual machines based on Ampere® Altra® Arm processors. The new VM series includes general-purpose Dpsv5 and memory-optimized Epsv5 VMs. For details, refer to the following figure:

![VM series](https://static.apiseven.com/2022/blog/0808/1.png)

Notably, Ampere® Altra® Arm is a cloud-native processor, and Azure virtual machines based on Ampere® Altra® Arm processors can therefore run scale-out cloud-native applications in an efficient manner.

So what is the actual experience and performance? Let's take a cloud-native API gateway as an example to show you the performance of an Azure virtual machine based on the Arm architecture. Here, we choose Apache APISIX for installation and testing on the general-purpose Dpdsv5 series virtual machine environment.

Apache APISIX is a cloud-native, high-performance, scalable API gateway. Based on NGNIX + LuaJIT and etcd, APISIX has the characteristics of dynamic routing and plug-in hot loading compared with traditional API gateways, which is especially suitable for API management under cloud-native architecture.

![Apache APISIX](https://static.apiseven.com/2022/blog/0808/2.png)

## Preliminary preparation

First, you need to start a Dpdsv5 series instance on Azure, and choose Ubuntu 20.04 as the operating system.

![Dpdsv5](https://static.apiseven.com/2022/blog/0808/3.jpeg)

Then install Docker to facilitate subsequent use of containerized methods to install and deploy Apache APISIX.

```shell
sudo apt-get update && sudo apt-get install docker.io
```

## Deploy Apache APISIX

Apache APISIX uses etcd as the configuration center, so you need to start an etcd instance first.

```shell
sudo docker run -d --name etcd \
    -p 2379:2379 \
    -e ETCD_UNSUPPORTED_ARCH=arm64 \
    -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    rancher/coreos-etcd:v3.4.16-arm64
```

Then start an instance of Apache APISIX.

```shell
sudo docker run --net=host -d apache/apisix:2.14.1-alpine
```

Create routes.

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

Access the test.

```shell
curl -i http://127.0.0.1:9080/anything/das
```

The installation is successful if the following results are returned:

```shell
HTTP/1.1 200 OK
.....
```

## Azure Ddsv5 vs Azure Dpdsv5

From the above operations, the installation and compatibility test of Apache APISIX on Azure Dpdsv5 can be successfully completed. So what is the actual performance of Azure Dpdsv5? Next, we will use Apache APISIX to do performance test comparisons on Azure Dpdsv5 and Azure Ddsv5 to see their actual performance.

Azure Ddsv5 is another model of Azure D series, which is based on Intel® x86 architecture, so the above etcd installation steps are slightly different:

```shell
sudo docker run -d --name etcd \
    -p 2379:2379 \
    -e ETCD_LISTEN_CLIENT_URLS=http://0.0.0.0:2379 \
    -e ALLOW_NONE_AUTHENTICATION=yes \
    -e ETCD_ADVERTISE_CLIENT_URLS=http://0.0.0.0:2379 \
    bitnami/etcd:3.4.16
```

### Single upstream + no plugin

Use a single upstream, without any plugins. It mainly tests the performance of APISIX in pure proxy back-to-origin mode.

```shell
# apisix: 1 worker + 1 upstream + no plugin

# create route
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

### Single upstream + two plugins

Using a single upstream, two plugins. It mainly tests the performance of APISIX when the two core performance-consuming plugins, limit-count and prometheus, are enabled.

```shell
# apisix: 1 worker + 1 upstream + 2 plugins (limit-count + prometheus)

# create route
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

### Data comparison

In the above two scenarios, relevant tests and comparisons were carried out from the two levels of request QPS (queries per second) and delay time. The result is as follows:

1. QPS comparison

    ![QPS](https://static.apiseven.com/2022/blog/0808/4.png)
2. Latency Comparison

    ![Latency](https://static.apiseven.com/2022/blog/0808/5.png)

<table>
    <tr>
        <td><b>  </b></td>
        <td colspan="2">Single upstream + no plugin</td>
        <td colspan="2">Single upstream + two plugins</td>
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

It can also be seen from the above data that in network IO-intensive computing scenarios such as API gateways, Dpdsv5 still has a performance gap compared to the same series of Ddsv5. But another good news is that the price of Dpdsv5 is about 20% cheaper than Ddsv5 under the same configuration. In actual machine selection, users can make flexible decisions according to their business volume.

## Summary

This article mainly uses Apache APISIX to compare the performance of Azure Ddsv5 and Azure Dpdsv5. It can be seen that in network IO-intensive computing scenarios such as API gateways, Azure Dpdsv5 is not so bright compared to Ddsv5, but since this series of models is still in preview, Microsoft is making continuous improvements and optimizations. Looking forward to its sequel.

## Reference

[Now in preview: Azure Virtual Machines with Ampere Altra Arm-based processors](https://azure.microsoft.com/en-us/blog/now-in-preview-azure-virtual-machines-with-ampere-altra-armbased-processors/)
