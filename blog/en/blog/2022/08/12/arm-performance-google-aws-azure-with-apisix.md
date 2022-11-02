---
title: "GCP, AWS, Azure, and OCI ARM-Based Server Performance Comparison"
authors:
  - name: "Shirui Zhao"
    title: "Author"
    url: "https://github.com/soulbird"
    image_url: "https://github.com/soulbird.png"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
  - name: "Yilia"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- API gateway
- ARM
- Azure
- AWS
- Google
- Oracle
- Apache APISIX
description: This article compares the performance of Google, AWS, Azure, and Oracle ARM-based servers in network IO-intensive scenarios through the API gateway Apache APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/10/18/634e6963ea45f.png
---

> This article uses  Apache APISIX to compare the performance of AWS, Google, Azure, and Oracle ARM-based servers in network IO-intensive scenarios.

<!--truncate-->

<head>
    <link rel="canonical" href="https://api7.ai/2022/08/12/arm-performance-google-aws-azure-with-apisix/" />
</head>

## Background

The ARM architecture is a member of the [RISC (Reduced instruction set computer)](https://en.wikipedia.org/wiki/Reduced_instruction_set_computer) design family. The RISC microprocessor architecture design enables small processors to efficiently handle complex tasks by using a set of highly optimized instructions. Being widely used in many embedded system designs, the ARM architecture has become the cornerstone of the world’s largest computing ecosystem and mobile devices. Many experts regard it as the future of cloud computing due to its advantages of low power consumption, low cost, high performance, and flexible licensing. Therefore, mainstream cloud vendors led by AWS (Amazon Web Services), GCP (Google Cloud Platform), Azure (Microsoft Azure), and OCI (Oracle Cloud Infrastructure) have successively launched ARM-based servers. This article selects servers from these vendors to conduct performance testing. Let’s first examine the four major manufacturers and their products.

## ARM Servers of Major Cloud Vendors

### AWS Graviton

After four years of development since 2018, AWS Graviton has entered its third generation age. The characteristics of these three generations of processors are as follows:

- **AWS Graviton1** processors feature custom silicon and 64-bit Neoverse cores.
- **AWS Graviton2**-based instances support a wide range of general purpose, burstable, compute-optimized, memory-optimized, storage-optimized, and accelerated computing workloads, including application servers, microservices, high-performance computing (HPC), CPU-based machine learning (ML) inference, video encoding, electronic design automation, gaming, open-source databases, and in-memory caches. In order to provide a one-stop service experience, many AWS services also support Graviton2-based instances.
- **AWS Graviton3** processors are the latest in the AWS Graviton processor family. They provide up to 25% better compute performance, **2 times** higher floating-point performance, and up to **2 times** faster cryptographic workload performance compared to AWS Graviton2 processors. AWS Graviton3 processors deliver **3 times** better performance compared to AWS Graviton2 processors for ML workloads, including support for bfloat16. They also support DDR5 memory, which provides **50%** more memory bandwidth compared to DDR4.

The following figure shows the main models equipped with AWS Graviton3 processors:

![AWS Graviton3 processors](https://static.apiseven.com/2022/10/21/6352412740665.webp)

### Google Cloud Platform T2A

The Google Cloud Platform (GCP) Tau T2A VM is a preview of Google’s first ARM-based virtual machine in July 2022, powered by Ampere® Altra® Arm processors based on the Neoverse N1 design. Tau T2A VMs come in various predefined VM shapes with up to 48 vCPUs per VM and 4GB of memory per vCPU. They offer 32 Gbps of network bandwidth and a wide range of network-attached storage options, making the Tau T2A VM suitable for scale-out workloads including web servers, containerized microservices, data record processing, media transcoding, and Java applications. In addition, it also has the following two characteristics:

- **Integration with Google Cloud services**: T2A VMs support the most popular Linux operating systems such as RHEL, SUSE Linux Enterprise Server, CentOS, Ubuntu, and Rocky Linux. In addition, T2A VMs also support Container-optimized OS to bring up Docker containers quickly, efficiently, and securely. Further, developers building applications on Google Cloud can already use several Google Cloud services with T2A VMs.
- **Extensive ISV partner ecosystem**: Ampere lists more than 100 applications, databases, cloud-native software, and programming languages that are already running on Ampere-based T2A VMs, with more being added all the time.

The main models are as follows:

![Google Cloud Platform T2A Models](https://static.apiseven.com/2022/10/21/6352412815275.webp)

### Azure ARM-based Virtual Machines

In April 2022, Microsoft announced a preview of its family of Azure virtual machines based on Ampere® Altra® Arm processors. The new VMs are designed to efficiently run scale-out workloads, web servers, application servers, open-source databases, cloud-native and rich .NET applications, Java applications, game servers, media servers, and more. The new VM series includes general-purpose Dpsv5 and memory-optimized Epsv5 VMs. The main models are as follows:

![Azure ARM-based Virtual Machines](https://static.apiseven.com/2022/10/21/635241c219ef7.jpeg)

### Oracle Cloud Infrastructure Ampere A1 Compute

At the end of May 2021, Oracle released its first Arm-based computing product: the OCI Ampere A1 Compute. The product can run on Oracle Cloud Infrastructure (OCI). The main model is VM.Standard.A1.Flex (OCI A1), whose CPU core and memory can be flexibly configured.

To support the new Ampere A1 Compute instances in OCI, Oracle has created an [Arm developer ecosystem](https://blogs.oracle.com/cloud-infrastructure/post/oracle-makes-building-applications-on-ampere-a1-compute-instances-easy) that enables developers to seamlessly convert, build and run applications on OCI Arm instances. Additionally, Oracle has partnered with Ampere Computing, Arm, GitLab, Jenkins, and others to accelerate the Arm developer ecosystem. As a result, Arm processors have evolved from mobile devices to cloud servers, providing developers with the tools and platforms to transit, build and run Arm-based workloads.

## Cloud Vendors ARM Server Performance Test

After introducing the above four servers, we will reflect the overall performance of each server by testing single-core performance. Here the network IO-intensive API gateway [Apache APISIX](https://apisix.apache.org/) is selected to bind a single CPU core for stress testing on the four models: AWS c7g.large, GCP t2a-standard-2, Azure D2ps v5 (Although the name contains D2ps, it is a dual-core CPU belonging to the Dpsv5 series.) and OCI A1 to conduct stress testings and analyze server performance through two metrics: QPS and response latency.

[Apache APISIX](https://github.com/apache/apisix) is a cloud-native, high-performance, scalable, open-source API gateway. Compared with traditional API gateways, Apache APISIX is developed based on NGINX and LuaJIT, with features such as dynamic routing and plugin hot reloading, which is very suitable for API management under cloud-native architecture. The architecture diagram is shown below:

![Apache APISIX's Architecture Diagram](https://static.apiseven.com/2022/10/21/635241c9d2c35.jpeg)

We use Apache APISIX to bind a single CPU on AWS c7g.large, GCP t2a-standard-2, Azure D2ps v5 (although the name includes D2ps, but it is a dual-core CPU belonging to the Dpsv5 series), and OCI A1 to conduct stress testing and analyze the performance of the server through QPS and response latency.

We use [Apache APISIX’s official open-source performance benchmark](https://github.com/apache/apisix/blob/master/benchmark/run.sh) for testing.

### Test Cases

In this article, we test the performance of Apache APISIX in the following two typical scenarios, thus obtaining more realistic test data for comparison.

**Scenario 1: A single upstream**
In this scenario, a single upstream without any plugins is used to test the performance of Apache APISIX in pure proxy back-to-origin mode.

**Scenario 2: Single upstream + multiple plugins**
This scenario uses a single upstream with two plugins. It mainly tests the performance of APISIX when the two core consumption performance plugins, `limit-count` and `prometheus`, are operating.

### Test Results

The figure below is the QPS (queries per second) test result of AWS c7g.large, GCP t2a-standard-2, Azure D2ps v5, and OCI A1. The higher the QPS value, the better the performance of the server.

![QPS Value Comparison of AWS c7g, GCP, Azure and OCI A1](https://static.apiseven.com/2022/10/21/635241290d787.webp)

From the perspective of QPS, under the network IO-intensive API gateway like Apache APISIX, the performance of these four servers is as follows:

#### Sort performance from best to worst:

- **Scenario 1: AWS c7g.large > Azure D2ps v5 > OCI A1 > GCP t2a-standard-2**

  With a single upstream without any plugins, AWS c7g.large achieves a QPS of 23,000 times/sec, almost twice the performance of GCP t2a-standard-2 (11,300 times/sec QPS). There is a small gap among Azure D2ps v5, OCI A1, and GCP t2a-standard-2. OCI A1 and GCP t2a-standard-2 have almost the same performance, with a difference of only 200 times/sec.

- **Scenario 2: AWS c7g.large > Azure D2ps v5 > GCP t2a-standard-2 > OCI A1**

  In the scenario of a single upstream and two plug-ins, the QPS of AWS c7g.large reaches 18,000 times/sec, still leading while narrowing the gap with the other three servers. The performance of Azure D2ps v5 is slightly higher than that of OCI A1, with a difference of only 400 times/sec.

The figure below is the response latency test results in milliseconds. The smaller the value, the better the performance.

![Response Latency of AWS c7g, GCP, Azure and OCI A1](https://static.apiseven.com/2022/10/21/635241298c145.webp)

From the perspective of response latency, under the network IO-intensive API gateway like Apache APISIX, the performance of these four servers is as follows:

#### Sort performance from best to worst:

- **Scenario 1 and Scenario 2: AWS c7g.large > Azure D2ps v5 > GCP t2a-standard-2 > OCI A1**

  In these two scenarios, the performance of AWS c7g.large is almost twice that of OCI A1, and there is little difference among the latter three.

## Conclusion

Through the analysis of the performance test results of Apache APISIX, we can see that AWS Graviton3 has higher performance than GCP T2A, Azure Dpsv5, and OCI A1. However, we only used the Apache APISIX binding single-core test during the test. The performance presented by the four may be different if multi-core is used.

We will reveal multi-core test results in the future, please stay tuned!

## References

- [New – Amazon EC2 C7g Instances, Powered by AWS Graviton3 Processors](https://aws.amazon.com/cn/blogs/aws/new-amazon-ec2-c7g-instances-powered-by-aws-graviton3-processors/)
- [Tau T2A machine series (Preview)](https://cloud.google.com/compute/docs/general-purpose-machines#t2a_machines)
- [Now in preview: Azure Virtual Machines with Ampere Altra Arm-based processors](https://azure.microsoft.com/en-us/blog/now-in-preview-azure-virtual-machines-with-ampere-altra-armbased-processors/)
- [Ampere A1 Compute](https://www.oracle.com/hk/cloud/compute/arm/)
