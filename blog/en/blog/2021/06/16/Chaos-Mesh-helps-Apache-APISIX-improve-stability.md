---
title: Chaos Mesh Helps Apache APISIX Improve Stability
slug: 2021/06/16/chaos-mesh-helps-apache-apisix-improve-stability
author: Shuyang Wu
authorURL: "https://github.com/Yiyiyimu"
authorImageURL: "https://avatars.githubusercontent.com/u/34589752?v=4"
keywords:
- APISIX
- Apache APISIX
- Chaos Mesh
description: This article introduces how to use Chaos Mesh to test the related processes and scenarios of API gateway Apache APISIX to improve the stability of APISIX.
tags: [Ecosystem]
---

> This article describes how to use Chaos Mesh in a variety of scenarios to improve stability for Apache APISIX.

<!--truncate-->

Apache APISIX is a top-level project under the Apache Foundation and has been tested in production environments with tens of billions of requests per day. As the community has grown, Apache APISIX has become more and more powerful, requiring more and more interactions with external components, and the uncertainty that comes with it has grown exponentially. We have received some feedback from users in the community, and here are two examples.

## Scenario 1

In the Apache APISIX configuration center, when there is unexpectedly high network latency between etcd and Apache APISIX, can Apache APISIX still operate normally for traffic filtering and forwarding?

## Scenario 2

User feedback in an issue reports errors interacting with the Apache APISIX admin API when a node in the etcd cluster fails while the cluster is still operational.

While Apache APISIX covers most scenarios in CI with unit / e2e / fuzz testing, it does not yet cover interactions with external components. Can Apache APISIX give appropriate error messages when network fluctuations, hard disk failures, or unpredictable abnormal behavior such as process kill occurs, and can it maintain or restore itself to a normal state of operation? In order to test the coverage of the scenarios proposed by users and to proactively identify similar issues before putting it into production, the community decided to use Chaos Mesh, PingCAP's open source chaos engineering platform, for testing.

Chaos engineering is a method of experimenting on the system infrastructure to proactively identify vulnerabilities in the system, thus ensuring that the system is resilient to runaway environments in production. Chaos engineering was first proposed by Netflix to simulate and thus counteract the instability of early cloud services. As the technology has evolved, chaos engineering platforms now offer a wider variety of faults to inject and rely on Kubernetes to more easily control the fault radius. These are all important reasons why Apache APISIX chose Chaos Mesh, but as an open source community, Apache APISIX understands that only an active community can ensure stable use and rapid iteration of the software, and this is what makes Chaos Mesh even more appealing.

## How to Apply Chaos Engineering on APISIX

Chaos Engineering has evolved into a complete methodology beyond the mere injection of faults. According to the recommendations of Principle of Chaos Engineering, deploying chaos engineering experiments requires five steps.

1. define the steady state, i.e., find a quantifiable metric that proves proper operation.
2. make a hypothesis that the metric always remains in steady state in both the experimental and control groups.
3. design the experiment to introduce possible failures in operation.
4. test the hypothesis, i.e., falsify the hypothesis by comparing the results of the experimental and control groups.
5. fix the problem.

The next two user feedback scenarios are used as examples to introduce the process of applying chaos engineering to Apache APISIX according to these five steps.

### Scenario 1

![2021-06-16-1](https://static.apiseven.com/202108/1639462804552-8d51872f-3419-4e64-b365-4ef7cbb2a388.png)

Describe this scenario in a diagram. Against the five steps above, you first need to find quantifiable metrics that measure the proper functioning of Apache APISIX. The primary method of testing is to use Grafana to monitor Apache APISIX performance metrics. Once measurable metrics are found, the data can be extracted separately from Prometheus in the CI for comparison. Another point is that the logs need to be analyzed. Another point is the need to analyze logs, which for Apache APISIX is to look at Nginx error.log to determine whether errors are reported and whether they are expected.

In the control group, before Chaos was introduced, we tested that set/get route was successful, etcd was connectable, and recorded the RPS at that time. There is no significant change in RPS compared to before. The experiment is as expected.

### Scenario 2

![2021-06-16-2](https://static.apiseven.com/202108/1639462935848-b87400d3-e59b-4e6d-84f9-25c2771d48d3.png)

Introducing pod-kill chaos after performing the same control group experiment reproduces the expected error. In the case of randomly deleting a few etcd nodes in the cluster, etcd connectivity exhibited sporadic behavior, and the logs printed a large number of connection denied errors. More interestingly, the setup route returned normally when deleting the first or third node in the etcd endpoint list, and only when deleting the second node in the etcd endpoint list did the setup route report the error "connection refused".

The reason for this is that the etcd lua API used by Apache APISIX does not select endpoints randomly, but sequentially, so the operation performed by the new etcd client is equivalent to binding to only one etcd endpoint, resulting in a persistent failure. After fixing this issue, a health check was added to the etcd lua API to ensure that it does not duplicate a lot on a disconnected etcd, and a fallback check was added for when an etcd cluster is completely disconnected to avoid blowing up the log with a lot of errors.

## Future plans

### 1. Chaos testing with e2e simulation scenarios

Currently in Apache APISIX, it still relies heavily on people to identify possible vulnerabilities in the system for testing fixes. For the open source community, unlike the previously mentioned Netflix application of chaos engineering in the enterprise, while testing in CI without worrying about the impact of the failure radius of chaos engineering on the production environment, it also does not cover the complex and comprehensive scenarios in the production environment.

In order to cover more scenarios, the future community plans to simulate more complete scenarios using the existing e2e tests for a larger and more randomized chaos testing.

### 2. Adding Chaos Testing to More Apache APISIX Projects

In addition to finding more possible vulnerabilities for Apache APISIX, the community plans to add chaos testing to more projects such as Apache APISIX Dashboard and Apache APISIX Ingress Controller.

### 3. Adding Features to Chaos Mesh

When deploying Chaos Mesh, we have encountered some features that are not supported at the moment, including the target of network latency does not support the selection of service, network chaos can not specify the container port injection, etc. The Apache APISIX community will also help Chaos Mesh to add related features in the future. We hope that the open source community will get better and better.
