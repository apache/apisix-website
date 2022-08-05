---
title: "How APISIX Ingress grown from 0 to 1"
slug: 2021/10/26/apisix-ingress
author: "Wei Jin"
authorURL: "https://github.com/gxthrj"
authorImageURL: "https://avatars.githubusercontent.com/u/4413028?v=4"
keywords: 
- Apache APISIX
- APISIX Ingress Controller
- Kubernetes
- Apache
- API Gateway
description: This article describes the growth of APISIX Ingress and the details of the enhancements and community help that APISIX Ingress has received since joining the community.
tags: [Ecosystem, Community]
---

> This article describes the growth of APISIX Ingress and the details of the enhancements and community help that APISIX Ingress has received since joining the community.

<!--truncate-->

## Concepts

### What is APISIX Ingress

In the K8s ecosystem, Ingress is a resource that represents the entry point for K8s traffic. To make it effective, an Ingress Controller is needed to listen to the Ingress resources in K8s, and to resolve the corresponding rules and actually carry the traffic.

APISIX Ingress is based on the Apache APISIX Ingress Controller implementation, which extends Kubernetes and also supports the native resource definition of Ingress resource.

![APISIX Ingress Architechture](https://static.apiseven.com/202108/1635304156040-50b7a2ae-ed0c-42ac-8517-edd0715e0082.png)

As you can see in the figure above, APISIX Ingress is deployed in a Kubernetes cluster and proxies requests from a Kubernetes external cluster. These requests are then reverse proxied to the Kubernetes cluster Service, which also supports pushing services directly to the Service Pod.

### What is Apache APISIX

We mentioned earlier that APISIX Ingress uses Apache APISIX as the actual data plane to carry business traffic, so what is Apache APISIX?

Apache APISIX is the top open source project of the Apache Foundation and the most active open source gateway project, and is currently certified as a trusted open source project by the China Academy of Information and Communications Technology. As a dynamic, real-time, high-performance open source API gateway, Apache APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, service meltdown, authentication, observability, and more.

![Apache APISIX Architechture](https://static.apiseven.com/202108/1635304156053-68751f2e-40e7-4932-99a4-5b9cc8f60628.png)

As you can see from the figure above, Apache APISIX is divided into two parts, data plane on the left side is used to handle the reverse proxy of traffic, and control plane on the right side is responsible for the distribution of configuration.

The Apache APISIX Ingress Controller uses declarative configuration, and after internal processing, the data is finally synchronized to etcd and transferred to Apache APISIX through the Admin API on the control plane to achieve configuration synchronization of the Apache APISIX cluster.

More information about Apache APISIX Ingress Controller features can be found [here](https://github.com/apache/apisix-ingress-controller).

## Growth of APISIX Ingress

Most of the previous sessions have mentioned a lot about the usage scenarios or comparative advantages of Apache APISIX Ingress. This time, let's take a different perspective and analyze the birth and development of Apache APISIX Ingress.

### Joining in the Apache Community

I provided the first lines of code for the APISIX Ingress Controller project in 2019 and the project was officially added to the Apache community in December 2020. In terms of product updates, we released the first GA version in June this year, as well as 1.3 this past October, and expect to release 1.4 in November this year to keep the project up to date.

![Contributors Growth](https://static.apiseven.com/202108/1635304156111-d0b82a61-b304-42ce-8d3a-2b959d3cb271.png)

The graph above shows the contributor growth curve for Apache APISIX Ingress Controller. Combined with the timeline, we can see that the number of contributors has been increasing at a high and steady rate since we joined the Apache community in December 2020. This reflects that Apache APISIX Ingress is gaining more and more attention from partners and is gradually being used in enterprise production environments.

### Growing in the Apache Community

Starting with a personal project or a project incubated within a company and joining the community, the change of environment before and after inevitably leads to a change in the way the project works. By joining the community, Apache APISIX Ingress has received more support and assistance in terms of functionality and project integrity.

#### Start asynchronous discussions

After becoming an Apache Software Foundation project, the Apache APISIX Ingress Controller project became more open. For example, every feature added or modified to the product has to be discussed publicly, usually through a mailing list and a GitHub Issue.

![Mail List](https://static.apiseven.com/202108/1635304156102-8877f3da-a43d-4b94-9a84-a95743546112.png)
![GitHub Issue](https://static.apiseven.com/202108/1635304156096-c0eeb189-54f8-4ebe-b019-f41001869186.png)

At present, the two discussions are initiated at the same time, so that as many people as possible can judge the reasonableness of the features from their own use scenarios and use perspectives. This is no longer a personal project, but a community project, a collaborative effort involving multiple people.

At the same time, the asynchronous discussion of the mailing list and GitHub Issue allowed for a more comprehensive collection of feedback from the community (both questions and answers), and facilitated the search and organization of subsequent questions on a public basis.

#### Arrange Bi-weekly Meetings

In terms of interaction, Apache APISIX Ingress has taken the experience of some other communities and opened up a regular bi-weekly community meeting event.

This is a new channel that we hope to make the project transparent while also providing a more life-like channel for community members to discuss issues together.

Through this bi-weekly meeting, we will give you a detailed overview of what has happened in the last two weeks, what new issues have been raised and what PRs are waiting to be merged. Of course, we will also discuss any issues or suggestions for the current project.

We hope this will not only be an immediate discussion, but also an interaction to share and exchange observations from multiple perspectives.

For details on the bi-weekly meetings [click here](https://github.com/apache/apisix-ingress-controller/issues/614), you can also view the [replay of previous meetings](https://space.bilibili.com/551921247).

#### Become More Disciplined with Project Details

Another big change since entering the Apache community is that project planning has become more standardized, whether it's code, testing, or version releases.

At the code level, the community is currently using the [Golang Code Specification](https://github.com/uber-go/guide), with some automated checks via Action CI.

In order to ensure that the project features can be merged quickly and no new bugs are introduced, we also have requirements on the test specification. For example, during the feature development process, unit tests or e2e tests must be included. e2e tests integrate gruntwork-io/terratest and kubernetes-sigs/kind to build Kubernetes test environment.

The test framework is Ginkgo, which is widely accepted by the community. The perfect test cases greatly ensure the stability of the project and reduce the maintenance cost of the project.

In terms of release, we are also strictly following the Apache community release specification. Since APISIX Ingress Controller is also an extension of Kubernetes, the iterations involving CRD also follow the Kubernetes release rules.

## Benefits of Joining the Apache Community

In addition to the above mentioned specifications on the project system, we have also received a lot of "technical feedbacks" from our partners during the process of going to the community.

### Features Improvements

Most of these contributions come from community members using APISIX Ingress to solve problems or refine scenarios, such as

- Admission Hook
- Ingress' own Prometheus Metrics
- mTLs
- Improvements to the canary release function
- Additional product documentation

More features [click here to view](https://github.com/apache/apisix-ingress-controller/#readme).

Also with feedback from the community, we have supported [multi-platform integration features](https://github.com/apache/apisix-ingress-controller/blob/master/install.md#installation) in response to popular demand.

![multi-platform integration](https://static.apiseven.com/202108/1635304156088-035cb0b0-8138-4e93-af5c-8e6ee8371f81.png)

### Enriched library of usage scenarios

While the community was enriched with features, it was also enriched with scenarios on the use of Apache APISIX Ingress.

#### Scenario 1: Deploying Apache APISIX Ingress inside a Kubernetes cluster

One of the most typical ways is to deploy within a Kubernetes cluster, and the following diagram illustrates a typical usage scenario.

![Deploying Apache APISIX Ingress inside a Kubernetes cluster](https://static.apiseven.com/202108/1635304156077-ced688eb-9dbf-4895-b7a2-acb2f4a288b2.png)

After the client passes through the external LB, it is processed by Apache APISIX, which acts as a gateway and a reverse proxy and can also be deployed inside and outside the Kubernetes cluster.

The above deployment scenario is to integrate APISIX Ingress Controller inside Kubernetes and synchronize the declarative configuration of Kubernetes to Apache APISIX through APISIX Ingress Controller. cluster data plane to directly proxy the subsequent Upstream business services.

#### Scenario 2: Deploying Apache APISIX Ingress Across Clusters

Speech.ai, a company based in Suzhou, have provided us with a cross-cluster usage scenario, and the general flow is shown below.
![Deploying Apache APISIX Ingress Across Clusters](https://static.apiseven.com/202108/1635304156072-ae9a3943-e686-4629-a5b7-0b5c38301139.png)

There are two clusters in the above architecture, the formal cloud host cluster and the physical machine cluster. Apache APISIX Ingress Controller is deployed within each cluster, interacting with the Kubernetes API server while synchronizing the configuration to the Apache APISIX Admin API. APISIX clusters.

In cross-cluster scenarios, access between clusters is mainly through Apache APISIX. Usually, the access between clusters is divided into private line and public network. With the health check function of Apache APISIX, the traffic can be automatically switched to other normal channels when the private line or public network transmission fails, which ensures the stability and high availability of business.

#### Scenario 3: Manage Mutiple Kubernetes Clusters with one Apache APISIX Cluster

![Manage Mutiple Kubernetes Clusters with one Apache APISIX Cluster](https://static.apiseven.com/202108/1635304156063-c7d879c6-8dfb-4ead-a88d-b5bdc9e453d6.png)

This usage scenario deploys the APISIX Ingress Controller inside a Kubernetes cluster, unlike Scenario 1 where there are multiple Kubernetes clusters. However, the corresponding Apache APISIX is actually deployed outside of all the Kubernetes clusters, and the configuration of each cluster is then synchronized to the overall Apache APISIX cluster via the Apache APISIX Ingress Controller.

The advantage of this is that you can fully control each Kubernetes cluster through a set of SLB Cluster, which can satisfy some enterprise architecture scenarios of multiple clusters or cross-room usage and reduce the number of forwarding on business traffic.

### Conclusion

Thanks to the above harvest, Apache APISIX Ingress has gained more and more attention, and more and more enterprises have started to apply APISIX Ingress Controller to their own products, such as China Mobile, Youzan, Guanwei Intelligence, and many other enterprises. We expect more enterprises to choose Apache APISIX Ingress in the future.

## Future Plan

Apache APISIX Ingress has also received some suggestions from many community partners in the process of continuous iteration, such as some feature planning for future products.

### Support Kubernetes gateway API

The Kubernetes community has given a gateway API implementation standard to unify the design of Ingress. Once this standard is implemented, subsequent users can use the same configuration in different Ingress when using APISIX Ingress, perfectly adapting to multiple deployments.

### Support Ingress Controller Monolithic Architecture

There are some voices in the community who believe that etcd, on which Apache APISIX relies, is actually a stateful service, and once stateful services are involved, additional attention needs to be paid to storage and migration related work.

We hope to make Apache APISIX seamlessly scalable in a containerized cloud-native scenario, so we will follow up with deployment planning for the Ingress Controller monolithic architecture. In this scenario, Apache APISIX can be deployed separately from etcd, and declarative configurations can be listened to by the Apache APISIX Ingress Controller and synchronized to Apache APISIX.

More future plans and feature-related content [click here](https://github.com/apache/apisix-ingress-controller/milestones).

The development of the community is never-ending, and we appreciate your support of Apache APISIX Ingress Controller along the way. We hope that you will actively participate and give us feedback on any issues regarding the Apache APISIX Ingress Controller project to make the product even better.
