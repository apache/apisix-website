---
title: "Design and Implementation of a Canary Release Solution Along the Whole Life Cycle Based on Apache APISIX"
author: "Shengwei Pan"
keywords: 
- Apache APISIX
- API Gateway
- Alibaba Cloud Microservice Engine
description: This article describes how Alibaba Cloud's microservice engine MSE is based on the flexible routing capabilities of Apache APISIX, cooperates with MSE's full-link grayscale capabilities, and achieves full-link grayscale through minimal configuration and code-free intrusion. 
tags: [User Case]
---

> This article describes how Alibaba Cloud's microservice engine MSE is based on the flexible routing capabilities of Apache APISIX, cooperates with MSE's full-link grayscale capabilities, and achieves full-link grayscale through minimal configuration and code-free intrusion.

<!--truncate-->

Apache APISIX is an open-source cloud native API gateway. As an API gateway, it has the characteristics of dynamic, real-time, and high performance. It provides rich traffic management functions such as load balancing, dynamic upstream, gray-scale publishing, service fusing, identity authentication and observability. You can use Apache APISIX to handle the traditional north-south traffic and the east-west traffic between services. It can also be used as a K8s ingress controller. Thanks to the full dynamic design of APISIX, configuration changes can be made at any time without restarting the service.

Alibaba cloud microservice engine MSE provides a very easy-to-use traffic swimlane capability. It is implemented based on Java agent bytecode enhanced technology. It seamlessly supports all Spring Cloud and Dubbo versions on the market for nearly five years. Through minimal configuration and code intrusion-free methods, it realizes a canary release solution along the whole life cycle and releases the new value of the APISIX based microservice architecture.

## Introduction of canary release solution along the whole life cycle

### Relevant concepts

- Swimlane: a set of isolated environments defined for the same version application. Only the request traffic that meets the flow control routing rules will be routed to the marking application in the corresponding lane. An application can belong to multiple swimlanes. A swimlane can contain multiple applications. The relationship between applications and swimlanes is many to many.

- Baseline environment: an application that is not marked is an application of a stable version of the baseline, that is, a stable online environment.

- Traffic fallback: the number of services deployed in the swimlane is not required to be completely consistent with the baseline environment. When there are no other services that the call chain depends on in the swimlane, the traffic needs to be fallback to the baseline environment and further routed back to the swimlane of the corresponding label when necessary.

- Lane Group: a collection of lanes. The swimlane group is mainly used to distinguish different teams or different scenes.

### Business scenario

The capability of canary release solution along the whole life cycle based on traffic lanes is applicable to the following business scenarios:

- Daily development / project / test environment isolation;
- Canary release solution along the whole life cycle;
- High availability same machine room priority routing;
- Full link pressure test.

### Technical principles

How to quickly implement canary release solution along the whole life cycle in the actual business scenario? At present, there are two main solutions, physical environment based isolation and logical environment based isolation.

#### Physical environment isolation

Physical environment isolation, in fact, is to build real traffic isolation by adding machines.

![Physical environment isolation](https://user-images.githubusercontent.com/88811141/173307762-c8d3c115-c7c0-415d-94eb-f259cadab3bb.png)

This scheme needs to build a set of network isolated and resource-independent environments for canary services, and deploy the canary version of the services in it. Because it is isolated from the formal environment, other services in the formal environment cannot access the services that need canary release. Therefore, these online services need to be deployed redundantly in the canary deployment so that the entire call link can forward traffic normally. In addition, some other dependent middleware components such as the registry also need to be redundantly deployed in the canary deployment to ensure the visibility between microservices and ensure that the obtained node IP address only belongs to the current network environment.

This scheme is generally used to build enterprise testing and pre development environment, but it is not flexible enough for the scenarios of online canary release and drainage. Moreover, the existence of multiple versions of microservices is very common in a microservice architecture. It is necessary to maintain multiple sets of canary deployments by using heap machines for these business scenarios. If the number of applications is very small, this method can be accepted; If you have too many applications, the operation and maintenance costs and machine costs will be too large, and the costs and costs will far exceed the benefits.

#### Logical environment isolation

The other scheme is to build a logical environment isolation. We only need to deploy the canary version of the service. When the traffic flows on the call link, the gateway, each middleware and each micro service passing through will identify the canary traffic and dynamically forward it to the canary version of the corresponding service. As shown below:

![Logical environment isolation](https://user-images.githubusercontent.com/88811141/173314750-0a86a58f-b89f-4421-b841-015bb3cd5869.png)

The above figure can well show the effect of this scheme. We use different colors to represent the canary traffic of different versions. It can be seen that both the microservice gateway and the microservice itself need to identify the traffic and make dynamic decisions according to the governance rules. When the service version changes, the forwarding of this call link will also change in real time. Compared with the canary deployment built by machines, this scheme can not only save a lot of machine costs and operation and maintenance manpower, but also help developers to control the online traffic in real time and quickly.

## Canary release solution along the whole life cycle based on Apache APISIX

Canary release along the whole life cycle is one of the core functions of microservices, and it is also a function that cloud users must have in the process of microservicing. Due to the large number of technologies and scenarios involved in the canary release along the whole life cycle, if the enterprise implements self realization one by one, it will need to spend a lot of labor costs to expand and operate it.

MSE service governance provides a complete product based canary release solution along the whole life cycle, covering most scenarios such as RPC, MQ, and observability. As long as the architecture is based on the spring cloud or Dubbo framework, the application can realize the enterprise level canary release along the whole life cycle function without upgrading or code changes.

### Prerequisites for use

#### Step 1: Install APISIX related components

1. Install APISIX, apisix-ingress-controller, etc. components.

```C++
helm repo add apisix https://charts.apiseven.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
kubectl create ns ingress-apisix
helm install apisix apisix/apisix \
  --set gateway.type=LoadBalancer \
  --set ingress-controller.enabled=true \
  --set etcd.persistence.storageClass="alicloud-disk-ssd" \
  --set etcd.persistence.size="20Gi" \
  --namespace ingress-apisix \
  --set ingress-controller.config.apisix.serviceNamespace=ingress-apisix
kubectl get service --namespace ingress-apisix
```

Under the `ingress-apisix` namespace you can see the stateless APISIX and `apisix-ingress-controller` applications, as well as the stateful etcd application.

2. Use Helm to install APISIX Dashboard.

```SQL
helm repo add apisix https://charts.apiseven.com
helm repo update
helm install apisix-dashboard apisix/apisix-dashboard --namespace
ingress-apisix
```

3. After installation, you can bind an SLB. 4.

4. Access APISIX Dashboard via `{slb-ip}:9000`.

![Dashboard](https://user-images.githubusercontent.com/88811141/173316825-e590decb-4c35-4602-9590-41ddde8b93cf.png)

#### Step 2: Enable microservice governance

In this step, you need to enable MSE microservice governance, install the MSE service governance component (ack-onepilot) and enable microservice governance for applications. For specific operation information, please refer to the official Alibaba cloud tutorial.

#### Step 3: Deploy the demo application

Deploy three applications A, B, and C in Alibaba cloud container service. Each application deploys a `base` version and a `gray` version respectively, and deploy a Nacos server applications to realize service discovery. For details, please refer to this tutorial to complete application deployment: deploy demo application. After the deployment is completed, you can configure the service for the application through the apisik dashboard for upstream configuration.

### Scenario 1: Routing by domain name

In some scenarios, the baseline environment and gray environment on the line can be distinguished by different domain names. Gray environment has a separate domain name that can be configured. Suppose we visit www.gray.com to request gray environment, visit www.base.com is the baseline environment.

![Scenario 1](https://user-images.githubusercontent.com/88811141/173319294-d27fc48a-4d42-4578-9457-4ab9072528a4.png)

Call the link `Ingress-nginx - > A - > B - > C`, where a can be a `spring-boot` application.

#### Configure APISIX routing rules

Select a route in the APISIX Dashboard and click to create. In the matching criteria, select the domain name and request path `/*`, and select the corresponding upstream. Configure the following routes respectively:

- When the `host` is `www.base.com`, it is routed to the upstream corresponding to ID `4011524535454748`, that is, spring-cloud-a-svc;

- When the host is `www.gray.com`, it is routed to the upstream corresponding to ID `401163331936715388`, that is, `spring-cloud-a-gray-svc`.

Then configure the route corresponding to the base:

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a",
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.base.com",
  "upstream_id": "401152455435354748",
  "labels": {
  "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

Configure the route corresponding to `gray`:

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a-gray",
  "priority": 1,
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.gray.com",
  "upstream_id": "401163331936715388",
  "labels": {
    "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

#### Configure canary release along the whole life cycle of MSE

You need to configure the full link publishing of MSE. For details, please refer to this tutorial: [Configuring full link grayscale](https://help.aliyun.com/document_detail/404845.html).

#### Validation of results

Visit `www.base.com` route to the `base` version of A application:

```Nginx
curl -H"Host:www.base.com" http://47.97.253.177/a
A[172.18.144.15] -> B[172.18.144.125] -> C[172.18.144.90]%
```

Visit `www.gray.com` route to the `gray` version of A application:

```Nginx
curl -H"Host:www.gray.com" http://47.97.253.177/a
Agray[172.18.144.16] -> Bgray[172.18.144.57] -> Cgray[172.18.144.157]%
```

### Scenario 2: Routing by specified request parameters

Some clients can't rewrite the domain name. Users hope to visit `www.demo.com` routes to the gray environment by passing in different parameters. For example, in the following figure, the gray environment is accessed through the request parameter `env=gray`.

![Scenario 2](https://user-images.githubusercontent.com/88811141/173321500-ee604a73-f41b-4fc1-8861-c591bbb9d257.png)

Call the link ingress apisik - > A - > b - > C, where a can be a spring boot application.

#### Configure APISIX routing rules

Select a route in the apisixdashboard and click create. In the matching criteria, create a new advanced matching rule, request path selection / *, and select the corresponding upstream. Configure the following routes respectively:

- When the host is `www.demo.com`, when the request parameter `env=gray`, the route priority matches the upstream corresponding to the ID `401163331936715388`, that is, `spring-cloud-a-gray-svc`;

- When the host is `www.demo.com`, the route will match the upstream corresponding to ID `4011524535454748`, that is, `spring-cloud-a-svc`.

Then configure the route corresponding to the `base`:

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a",
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.demo.com",
  "upstream_id": "401152455435354748",
  "labels": {
    "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

Configure the route corresponding to `gray`, as shown in the following figure:

![Configure diagram](https://user-images.githubusercontent.com/88811141/173322176-ab677577-8595-4875-85cb-2dc799070871.png)

```JSON
{
  "uri": "/*",
  "name": "spring-cloud-a-gray",
  "priority": 1,
  "methods": [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "HEAD",
    "OPTIONS",
    "CONNECT",
    "TRACE"
  ],
  "host": "www.demo.com",
  "vars": [
    [
      "arg_env",
      "==",
      "gray"
    ]
  ],
  "upstream_id": "401163331936715388",
  "labels": {
  "API_VERSION": "0.0.1"
  },
  "status": 1
}
```

#### Configure canary release along the whole life cycle of MSE

The configuration steps are consistent with those in scenario 1.

#### Validation of results

At this point, visit `www.demo.com` route to baseline environment:

```Nginx
curl -H"Host:www.demo.com" http://47.97.253.177/a
A[172.18.144.15] -> B[172.18.144.125] -> C[172.18.144.90]%
```

At this point, visit `www.demo.com` while `env=gray` routing to gray environment:

```Nginx
curl -H"Host:www.demo.com" http://47.97.253.177/a?env=gray
Agray[172.18.144.16] -> Bgray[172.18.144.57] -> Cgray[172.18.144.157]%
```

> Note: among them, `47.97.253.177` is the public IP of APISIX.

## Summary

Based on the flexible routing capability of Apache APISIX and the canary release along the whole life cycle capability of MSE, the enterprise level canary release along the whole life cycle capability can be quickly realized.

APISIX supports routing by header, cookie, params, domain name and other methods. It only needs to route the traffic to different "swimlane" environments on the gateway side according to the needs, and the traffic will be closed automatically in the "swimlane" of the corresponding tag. When there are no other services in the swimlane that the call chain depends on, the traffic needs to be returned to the baseline environment, and further routed back to the swimlane of the corresponding tag when necessary
