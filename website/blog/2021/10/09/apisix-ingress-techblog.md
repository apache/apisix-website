---
title: A thoughtful tutorial to get started with Apache APISIX Ingress from concept to practice
author: Jintao Zhang
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://avatars.githubusercontent.com/u/3264292?v=4"
date: 2021-10-09
keywords: 
- Apache APISIX
- Ingress
- Kubernetes
description: This article describes and explains Apache APISIX Ingress in detail from both theoretical and practical perspectives.
tags: [technology]
---

> Jintao Zhang, Apache APISIX Committer, Kubernetes Ingress Nginx Reviewer, and contributor to several cloud-native open source projects.

<!--truncate-->

## Apache APISIX Ingress Overview

### Apache APISIX Ingress Definition

In the K8s ecosystem, Ingress is a resource that represents the entry point for K8s traffic. To make it effective, an Ingress Controller is needed to listen to the Ingress resources in K8s and resolve the rules and actually carry the traffic for those resources. The most widely used Ingress Controller implementations in today's trends are Kubernetes Ingress Nginx.

APISIX Ingress is another implementation of the Ingress Controller. The main difference with Kubernetes Ingress Nginx is that APISIX Ingress uses Apache APISIX as the actual data plane that carries business traffic. As shown in the figure below, when a user requests a specific service/API/web page, the entire business traffic/user request is transferred to the K8s cluster through an external proxy and then processed by APISIX Ingress.

![APISIX Ingress Architecture](https://static.apiseven.com/202108/1636726995544-071e2348-3f13-45b7-9ada-b3b522f252ca.png)

As you can see from the above diagram, APISIX Ingress is divided into two parts. One part is the APISIX Ingress Controller, which is the control plane that will do the configuration management and distribution. The other part is the APISIX Proxy Pod, which is responsible for carrying business traffic and is implemented by means of CRD (Custom Resource Definitions).

### Apache APISIX in a nutshell

We mentioned earlier that APISIX Ingress uses Apache APISIX as the data surface that actually carries business traffic, so what does the Apache APISIX project do?

![Apache APISIX Architecture](https://static.apiseven.com/202108/1636727035666-b2772401-eba2-41fc-bda6-7136c8905056.png)

Apache APISIX is the top open source project of the Apache Foundation and is currently the most active open source gateway project. As a dynamic, real-time, high-performance open source API gateway, Apache APISIX provides rich traffic management features such as load balancing, dynamic upstream, grayscale publishing, service meltdown, authentication, observability, and more.

Apache APISIX helps enterprises handle API and microservice traffic quickly and securely with features such as flow-limiting authentication, logging security features, and support for rich custom plug-ins. There are also currently relevant integrations with many open source projects such as Apache SkyWalking, Prometheus and other such components.

## APISIX Ingress vs K8s Ingress Nginx

Since I am involved in the development and maintenance of both APISIX Ingress and K8s Ingress Nginx, many people ask me how to choose between these two projects. Or why do you want to do APISIX Ingress when you have K8s Ingress Nginx.

### Configuration level

In APISIX Ingress, we have added some rich and flexible configurations, such as grayscale deployment through a single configuration file. However, in K8s Ingress Nginx, you need at least two Ingress resource files to achieve the above effect.

### Richness

In terms of richness, because Apache APISIX is feature-rich and allows for multiple plugins, using APISIX Ingress eliminates the need to configure additional features yourself, allowing you to spend more time on actual development.

### Architecture separation

APISIX Ingress uses a separate architecture for the data plane and control plane, so users can choose to deploy the data plane inside/outside the K8s cluster. However, K8s Ingress Nginx puts the control plane and the data plane in the same Pod, so if something happens to the Pod or the control plane, the whole Pod will hang, which will affect business traffic.

This architectural separation gives users a more convenient deployment option and facilitates data migration and usage in business architecture adjustment scenarios.

## APISIX Ingress Features Explained

Since Apache APISIX is a fully dynamic, high-performance gateway, APISIX Ingress itself supports full dynamics, including routing, SSL certificates, upstream, plug-ins, and more.

APISIX Ingress also has the following features.

* CRD support for easier understanding of declarative configurations; while state checking ensures quick access to the synchronized state of declarative configurations
* Support for advanced route matching rules and custom resources, which can be extended with more than 50 official Apache APISIX plug-ins & customer-defined plug-ins
* Support for K8s native Ingress configuration
* Support for traffic slicing
* Support for gRPC plaintext and TCP Layer 4 proxy
* Automatic service registration and discovery, no fear of scaling up or down
* More flexible load balancing policy with health check function

The following is a detailed introduction to CRD and custom resources.

### CRD Extensions

We mentioned CRD in the previous introduction, but how does APISIX Ingress use CRD extensions?

![CRD Extensions](https://static.apiseven.com/202108/1636727073073-a8c84ed6-450d-4b61-84c9-1eeef4dd2d40.png)

At the user level, when a request is made by a Client and arrives at Apache APISIX, the corresponding service traffic is directly transferred to the backend (e.g., Service Pod), thus completing the forwarding process. This process does not need to go through the Ingress Controller, which can ensure that if there are problems, or changes, expansion and contraction or migration processing, it will not affect the users and business traffic.

On the configuration side, users can apply custom CRD configurations to K8s clusters via kubectl apply, and Ingress Controller will continuously watch these resource changes to apply the corresponding configurations to Apache APISIX.

### Custom resources

APISIX Ingress currently supports the following 5 categories of custom resources related to routing, upstream, consumer, certificate related and cluster public configuration.

#### APISIX Route

The top-level configuration for the `spec` attribute in the custom resource APISIX Route is `http`. But actually `spec` supports both configurations, `spec.http` as in the example below, which is mainly used for Layer 7 proxies, and `spec.stream`, which is used for Layer 4 proxies. In the configuration file, we first customize a rule for it, namely the relevant parameter under match.

![APISIX Route](https://static.apiseven.com/202108/1636727122153-0bb0f6d5-6950-477f-9782-64f162c21315.png)

As the above back-end configuration example uses the same Service, you can adjust it according to the scenario in actual use. Note that the `weight` attribute is used to configure the relevant service weight. With the above configuration, a complete set of routing customization resources can be implemented.

#### APISIX Upstream (Upstream)

When configuring APISIX Upstream, you need to pay attention to the content of `name` to be consistent with the Service of K8s cluster, so as to ensure that the subsequent APISIX Ingress Controller can accurately match its corresponding traffic.

![APISIX Upstream](https://static.apiseven.com/202108/1636727168233-9a64a2fb-e1f4-4920-9b8c-c93d57fd1c6f.png)

In the configuration file, `spec.loadbalancer` is mainly responsible for setting the load balancing policy, and there are various policy modes to choose from. `spec.schem`e is for the protocol type configuration, currently only HTTP and gRPC protocols are supported. `spec.healthCheck` is mainly for setting the health check function, such as setting its active status, effective protocol and path and final feedback and other parameters configuration.

#### APISIX Consumer

The APISIX Consumer configuration mainly adds authentication-related features, such as `spec.authParameter`, which currently supports `BasicAuth` and `KeyAuth`, the two more common types of authentication.

![APISIX Consumer](https://static.apiseven.com/202108/1636727198010-e3afef47-f62c-4bab-843e-5fe292baf96e.png)

You can configure the associated `username` and `password` directly with `value`, or directly with `secret`, which is more secure than the plaintext configuration of the former.

#### APISIX TLS (certificate)

APISIX TLS is mainly for certificate management. As the example shows, users can configure multiple domains via `hosts`, and the parameters under `secret` are the corresponding configuration certificates.

![APISIX TLS](https://static.apiseven.com/202108/1636727238605-2f468ea9-c8eb-459f-95ef-4c62e2801def.png)

Apache APISIX TLS also comes with `spec.client` for configuring mTLS two-way authentication.

#### APISIX Config

The Config types supported by custom resources are described in two ways.

![APISIX Cluster Config](https://static.apiseven.com/202108/1636727270170-9f796ddd-5f64-4d53-aa4a-2872953bf380.png)

One type is APISIX Cluster Config, which is mainly used for some generic configurations. Currently it supports global use of Prometheus plug-in/global configuration SkyWalking in K8s or Apache APISIX, and we will add some other generic configurations in subsequent development.

Another one is the [APISIX Plugin Config](https://github.com/apache/apisix-ingress-controller/pull/689) that we are currently working on in PR. If you are interested, you can also click the link to join the discussion. Plugin Config is mainly a unified collection of common plug-in configurations, for example, some of the same configuration, users can use APISIX Plugin Config to apply to multiple routes at the same time, eliminating the tedious steps of multiple independent configurations.

## APISIX Ingress Hands-On Practice

Currently, you can deploy APISIX Ingress via [Helm Charts](https://github.com/apache/apisix-helm-chart). You can deploy both Apache APISIX and APISIX Ingress, including the etcd required for Apache APISIX, with a single command, which is very simple.

![Installation Steps](https://static.apiseven.com/202108/1636727303060-7f783d80-271c-49a2-9255-0b40026057f5.png)

### Practice Scenario 1: Traffic Segmentation

By using APISIX Ingress, you can achieve the effect of proportional traffic slicing, as follows.

#### Step 1: Configure APISIX Upstream

![Configure APISIX Upstream](https://static.apiseven.com/202108/1636727344030-149b5257-10e1-4136-9896-de724f00b754.png)

#### Step 2: Configure APISIX Route

Configure `subset` and `weight` in `backends` to split the incoming user request traffic. The example below shows that 90% of the traffic will go to v1 and 10% of the traffic will go to v2.

![Configure APISIX Route](https://static.apiseven.com/202108/1636727381638-f51a5403-2715-4309-8967-cb47ce7eeeb3.png)

With the above two steps, it is very easy to slice and dice traffic proportionally to achieve scenarios like grayscale publishing.
For more details, please refer to: [Traffic Segmentation in Apache APISIX Ingress Controller](https://www.apiseven.com/zh/blog/traffic-split-in-apache-apisix-ingress-controller).

### Practice Scenario 2: Configuring Authentication

If you want to configure Basic Auth for certain routes in APISIX Ingress, you can refer to the following actions.

#### Step 1: Create APISIX Consumer resource

As mentioned earlier, you can add `basicAuth` to the APISIX Consumer configuration and specify a username and password for it.

![Create Resource](https://static.apiseven.com/202108/1636727418621-5235ee37-7220-4f8f-8796-0c7c06f02bbf.png)

#### Step 2: Configure the APISIX Route and add authentication-related parameters

In the custom resource APISIX Route, simply turn it on and specify the authentication type by adding `authenticatio`n to the backend.

![Add authentication parameters](https://static.apiseven.com/202108/1636727456956-c9b74ea6-b568-4586-8ca4-395a57114386.png)

With the above steps, it is possible to use Consumer to complete the relevant configuration authentication.

### Practice Scenario 3: K8s Resource Extensions

As we mentioned at the beginning, APISIX Ingress supports not only custom resources, but also K8s native Ingress resources.

![K8s native resources](https://static.apiseven.com/202108/1636727492287-53002467-7829-4830-93b2-0748fd16a52d.png)

The image above shows the K8s Ingress resource. Normally if you want to do rewrite on a resource, you can add annotation configuration attributes. This way when the user carries the `httpbin.org` request, it can be redirected to /ip via the path /sample.

When the above requirement uses APISIX Ingress, simply add a `kubernetes.io/ingress.class: apisix` to Ingress to specify the APISIX Ingress Controller to listen to this resource, and configure `k8s.apisix.apache.org/rewrite-target: "/ip"` to complete the redirection to the /ip path.

![APISIX Ingress Resources](https://static.apiseven.com/202108/1636727529043-734a07a4-646b-4519-8dba-70cd3fd82df9.png)

The above example is just one of the ways APISIX Ingress currently supports native K8s Ingress, for more examples you can check the [specific documentation](https://apisix.apache.org/docs/ingress-controller/practices/proxy-the-httpbin-service-with-ingress) for reference and use.

## Future Plans

APISIX Ingress will continue to be updated in terms of functionality and ecology, and the current phase has been completed [APISIX Ingress and Cert-manager integration](https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/practices/manage-certificates-with-cert-manager.md), and the following goals will be achieved step by step.

1. complete Kubernetes V1.22+ and CRD V1 version adaptation support (completed, soon to be released in APISIX Ingress V1.3 version)
2. support for Gateway API (expected in Q4)
3. extend the new architecture to allow users to use APISIX Ingress without the need to use etcd
4. enrich the product ecology and expand the APISIX Ingress community

Finally, we hope you can participate in the project more often, for example, there will be an APISIX Ingress community meeting every two weeks on Wednesday at 2 pm, and we will synchronize the current progress of the project or the problems we encountered. Keep an eye on the Apache APISIX video to participate in the live community meetings.

[Click here](https://github.com/apache/apisix-ingress-controller/issues/614) for more details about the APISIX Ingress community meetings.
