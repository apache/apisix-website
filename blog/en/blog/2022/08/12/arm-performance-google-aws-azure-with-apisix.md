---
title: "ARM is trending! Performance between Google&AWS&Azure"
authors:
  - name: "Shirui Zhao"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- API gateway
- ARM
- Azure
- AWS
- Google
- Apache APISIX
description: This article uses API Gateway Apache APISIX to compare the performance in ARM between Google&AWS&Azure in network IO-intensive scenarios.
tags: [Ecosystem]
---

> This article uses API Gateway Apache APISIX to compare the performance in ARM between Google&AWS&Azure in network IO-intensive scenarios.

<!--truncate-->

<head>
    <link rel="canonical" href="https://api7.ai/2022/08/12/arm-performance-google-aws-azure-with-apisix/" />
</head>

## Background

The ARM architecture belongs to the [RISC](https://en.wikipedia.org/wiki/Reduced_instruction_set_computer). The RISC microprocessor architecture design uses a highly optimized set of instructions to enable small processors to efficiently handle complex tasks.

ARM has become the cornerstone of the world's largest computing ecosystem and mobile devices, and is considered by many experts to be the future of cloud computing due to its low power consumption, flexible licensing and low cost.

Therefore, mainstream cloud vendors led by AWS, Google Cloud Platform (GCP) and Azure have successively launched servers with ARM architecture. Among them, AWS launched the first server processor AWS Graviton based on ARM architecture in 2018.

### AWS Graviton

AWS Graviton is a series of server processors based on the [ARM architecture](https://www.arm.com/) released by AWS in 2018\. The first generation of AWS Graviton processors uses custom chips and 64-bit Neoverse cores.

Released in 2020, AWS Graviton2 processors represent a major leap forward in performance and functionality compared to first-generation AWS Graviton processors. 7x faster performance, 4x more cores, 2x cache, 5x faster memory, and more.

The latest AWS Graviton3 processors to be released at the end of May 2022 are based on the more advanced Neoverse V1 design, they offer up to twice the floating point performance, twice the cryptographic performance, and three times the ML compared to the AWS Graviton2 processors performance, including support for bfloat16\. The following figure shows the main models equipped with AWS Graviton3 processors:

![AWS Graviton3 processors](https://static.apiseven.com/2022/blog/0812/1.png)

### Google Cloud Platform T2A

The Google Cloud Platform(GCP) Tau T2A VM is a preview of Google's first ARM-based virtual machine in July 2022, powered by Ampere® Altra® Arm processors based on the Neoverse N1 design. Tau T2A VMs come in a variety of predefined VM shapes with up to 48 vCPUs per VM and 4GB of memory per vCPU.

They offer up to 32 Gbps of network bandwidth and a wide range of network-attached storage options, making the Tau T2A VM suitable for scale-out workloads including web servers, containerized microservices, data record processing, media transcoding, and Java applications. The main models are as follows:

![Tau T2A VM](https://static.apiseven.com/2022/blog/0812/2.png)

### Azure Arm-based Virtual Machines

In April, Microsoft announced a preview of its family of Azure virtual machines based on Ampere® Altra® Arm processors. The new VMs are designed to efficiently run scale-out workloads, web servers, application servers, open source databases, cloud-native and rich .NET applications, Java applications, game servers, media servers, and more. The new VM series includes general Dpsv5 and memory-optimized Epsv5 VMs. The main models are as follows:

![Dpsv5 and Epsv5 VMs](https://static.apiseven.com/2022/blog/0812/3.png)

## Three cloud vendors ARM server performance test

In this article, we will reflect the overall performance of each server by testing single-core performance. Here, the network IO-intensive API gateway Apache APISIX is selected to bind a single CPU core for stress testing on three models: AWS c7g.large, GCP t2a-standard-2 and Azure D2ps v5 (belonging to the Dpsv5-series, dual-core CPU), and analyze the performance of the server through the two indicators of QPS and response delay.

[Apache APISIX](https://github.com/apache/apisix) is a cloud-native, high-performance, scalable API gateway. Based on NGNIX + LuaJIT and etcd, APISIX has the characteristics of dynamic routing and plug-in hot loading compared with traditional API gateways, which is especially suitable for API management under cloud native architecture.

![Apache APISIX](https://static.apiseven.com/2022/blog/0812/4.png)

Next, we will use the APISIX official open source performance [test script for testing](https://github.com/apache/apisix/blob/master/benchmark/run.sh).

### Test case

We will test the performance of Apache APISIX under two typical scenarios in order to obtain more realistic and rich test data:

* **Scenario 1: Single upstream.** In this scenario, a single upstream (without any plugins) is used to test the performance of APISIX in pure proxy back-to-origin mode.

* **Scenario 2: Single upstream + multiple plugins.** This scenario uses a single upstream with multiple plugins and two plugins are used here. It mainly tests the performance of APISIX when the two core consumption performance plugins, `limit-count` and `prometheus`, are enabled.

### Test Results

The figure below is the QPS (queries per second) test result and the higher the number, the better the performance.

![QPS result](https://static.apiseven.com/2022/blog/0812/5.png)

The figure below is the response delay test results in milliseconds. The smaller the number, the better the performance.

![Response delay results](https://static.apiseven.com/2022/blog/0812/6.png)

From the perspective of QPS and response delay, under network IO-intensive API gateways like Apache APISIX, AWS C7g has a 100% performance improvement compared to GCP T2A, and Azure Dpsv5 has a performance lead of about 15% compared to GCP T2A.

## Cost-performance comparison

Since this article only focuses on testing the performance of ARM machines from different cloud vendors, so we will ignore the change of "the same number of CPU cores with different memory", and analyze the cost-performance ratio of AWS Graviton3 and GCP T2A only from the perspective of the number of CPU cores.

:::note

In the current test scenario, the cost-performance ratio can be understood as: QPS/cost.

:::

The table below compares server hourly prices for different cores for AWS C7g (US East Ohio), GCP T2A (us-central1) and Azure Dpsv5 (East US):

| VM series / vCPU | 1       | 2       | 4       | 8      | 16      | 32      | 64      |
|------------------|---------|---------|:--------|:-------|:--------|:--------|:--------|
| AWS C7g          | $0.0361 | $0.0723 | $0.1445 | $0.289 | $0.5781 | $1.1562 | $1.7342 |
| GCP T2A          | $0.0385 | $0.077  | $0.154  | $0.308 | $0.616  | $1.232  | $1.848  |
| Azure Dpsv5      | *       | $0.077  | $0.154  | $0.308 | $0.616  | $1.232  | $1.848  |

The following table summarizes the cost and cost–performance ratio of AWS c7g.large and GCP t2a-standard-2 running for one year, referring to the QPS data for a single upstream in the Apache APISIX performance test. The larger the number, the higher the QPS can be obtained at the unit price.

|                    | Annual cost         | Cost performance (QPS/cost) |
|--------------------|-----------------|--------------------|
| AWS c7g.large      | $633.3          | 36.3               |
| GCP t2a-standard-2 | $674.5          | 16.8               |
| Azure D2ps v5      | $398.0（41% off) | 33.6               |

From the test results, AWS C7g is more cost-effective than GCP T2A and Azure Dpsv5\. Although Azure Dpsv5 has only a 15% performance improvement compared to GCP T2A, the cost performance is nearly double.

## Summary

AWS launched the first ARM-based processor, AWS Graviton, in 2018\. It was about 4 years ahead of GCP for the deployment of the ARM-based server field. Now the AWS Graviton processor has developed to the third generation.

Through the performance test results and price–performance ratio analysis of Apache APISIX, we can see that AWS Graviton3 has higher performance and cost-effective than GCP T2A and Azure Dpsv5\. This is inseparable from the fact that AWS has been deeply involved in the field of ARM-based servers for many years.

In addition, we used Apache APISIX bound single-core tests during our testing, and the price-performance ratio of AWS Graviton 3 may be further improved if multiple cores are used.

## Reference

* [New – Amazon EC2 C7g Instances, Powered by AWS Graviton3 Processors](https://aws.amazon.com/cn/blogs/aws/new-amazon-ec2-c7g-instances-powered-by-aws-graviton3-processors/)
* [Tau T2A machine series (Preview)](https://cloud.google.com/compute/docs/general-purpose-machines#t2a_machines)
* [Now in preview: Azure Virtual Machines with Ampere Altra Arm-based processors](https://azure.microsoft.com/en-us/blog/now-in-preview-azure-virtual-machines-with-ampere-altra-armbased-processors/)
