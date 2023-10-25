---
title: "Embrace the Lightweight APISIX Ingress Controller Without etcd Dependency"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords: 
- Apache APISIX
- APISIX Ingress Controller
- etcd
description: The innovative architecture of the APISIX Ingress Controller eliminates the dependency on a standalone etcd cluster, greatly simplifying maintenance costs and system complexity.
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

> The innovative architecture of the APISIX Ingress Controller eliminates the dependency on a standalone etcd cluster, greatly simplifying maintenance costs and system complexity.
<!--truncate-->

## Background

APISIX Ingress Controller is a Kubernetes Ingress Controller based on Apache APISIX. It has the capability to convert Ingress/CRDs resources from Kubernetes into routing rules for Apache APISIX, synchronizing them with the Apache APISIX cluster. As a result, users can harness the robust functionalities of Apache APISIX, including plugins, load balancing, health checks, and more, for the management of inbound traffic in Kubernetes.

![APISIX Ingress Controller Architecture](https://static.apiseven.com/uploads/2023/10/24/aezup4a9_APISIX-Ingress-1.png)

![Architecture of APISIX Ingress Controller with Gateway API](https://static.apiseven.com/uploads/2023/10/24/ZtjVM6dH_APISIX-Ingress-2.png)

In previous versions, deploying an APISIX Ingress Controller cluster necessitated the additional maintenance of a highly available etcd cluster. In practice, it proved to be less user-friendly and posed several challenges:

1. **High Maintenance Costs for the etcd Cluster**: Setting up a highly available cluster involves significant learning and maintenance costs, including system resource consumption like memory. Deploying an etcd cluster in Kubernetes requires careful attention to various factors, often leading to challenges for those unfamiliar with etcd, and necessitating concerns about memory and other system resource consumption.

2. **High Utilization Costs**: Deploying an APISIX Ingress Controller cluster entails three components. Compared to a single-component ingress-nginx, the APISIX Ingress Controller demands higher learning and debugging costs. It is notably less straightforward to use, presenting an additional burden for first-time users.

3. **Data Redundancy and Inconsistency**: Both Kubernetes etcd and APISIX etcd clusters retain a copy of the data. During usage, efforts are often needed to prevent discrepancies between the two datasets. Due to APISIX and the Ingress controller being decoupled, addressing and mitigating such situations becomes challenging.

4. **Obstacles in Implementing Gateway API**: The Gateway API dynamically manages the full lifecycle of a set of Gateways (APISIX).  Because APISIX configuration primarily stems from etcd, the Ingress Controller must simultaneously monitor the etcd clusters and APISIX, which makes maintenance and management very complicated.

In the overall architecture, Apache APISIX does not rely on the Ingress Controller. The Ingress Controller performs the role of pushing configuration but lacks the ability to manage APISIX effectively. These issues are challenging to address within the existing architecture. **To tackle these challenges and provide solutions, a new APISIX Ingress Controller architecture needs to be designed.**

## Design of New Architecture

To address the issues in the existing architecture, it is necessary to remove the etcd component. Currently, we are considering two main approaches:

1. **Rendering the `apisix.yaml` configuration file**: Generate `apisix.yaml` configuration files based on the CRD. APISIX, in YAML deployment mode, periodically reads the entire `apisix.yaml` configuration file every second.

2. **Simulating the etcd server API**: Building a KV in-memory database based on the CRD and simulating the etcd server API for use by APISIX. APISIX will attempt to watch the resource configurations provided by the Controller and notify all APISIX instances.

Clearly, the first approach is simpler, but it is not suitable for scenarios where the gateway directly connects to backend Pods. The reason is that in Kubernetes, Pod IPs have dynamic scalability features, and the Ingress Controller generates the `apisix.yaml` configuration continuously.

This causes the APISIX routing tree to be rebuilt frequently, causing long-term performance jitter. Finally, after discussion, the APISIX community decided to adopt the second option. Its architecture is shown in the figure below:

![Architecture of New APISIX Ingress Controller](https://static.apiseven.com/uploads/2023/10/24/H7xooJ59_APISIX-Ingress-3.png)

![Architecture of New APISIX Ingress Controller (HA)](https://static.apiseven.com/uploads/2023/10/24/UbKWYGar_APISIX-Ingress-4.png)

APISIX Ingress Controller implements a new architecture in Release v1.7.0, which has the following advantages:

- **Sole reliance on declarative configuration**: APISIX will exclusively rely on the configuration information provided by the Control Plane and take it as the sole source. This approach, commonly used in Kubernetes, greatly reduces operational complexity.

- **No need to maintain a separate etcd cluster**: The new architecture eliminates the dependency on a standalone etcd cluster. This significantly reduces maintenance costs and complexity for users, making it easier to deploy and use.

- **Advancement of the Kubernetes Gateway API standard**: APISIX relies on the Ingress Controller and enables it to manage the lifecycle of the gateway. This contributes to the complete implementation of the Gateway API.

## Ideal Architecture for Gateway API

Gateway API is the next-generation version of the Ingress API, offering enhanced functionality and expressiveness. Currently, Gateway API has gained support from numerous vendors and projects. As one of the implementers of Gateway API, APISIX Ingress Controller not only adheres to the standard specifications of Gateway API but also combines the rich features of Apache APISIX to provide users with a broader range of gateway configurations and policy options.

The implementation of the new architecture further advances the realization of Gateway API, enabling better routing configuration and policies while reducing maintenance costs. This makes it easier to deploy and use, while also leveraging the advantages of Gateway API to improve the management efficiency of the API gateway.

![Gateway API](https://static.apiseven.com/uploads/2023/10/17/9n1XraKT_Ingress-APISIX-5.png)

## How to Deploy and Use the New APISIX Ingress Controller

In this chapter, we will explain the high-available installation and deployment of APISIX Ingress Controller in Kubernetes, and demonstrate how to configure `ApisixRoute` to access the `httpbin` application service in an example.

### Install APISIX Ingress Controller

1. You can run the following command to clone the APISIX source code from Github:

```shell
git clone --depth 1 --branch 1.7.0 https://github.com/apache/apisix-ingress-controller.git ingress-apisix-1.7.0

cd ingress-apisix-1.7.0
```

2. Install CRDs

```shell
kubectl apply -k samples/deploy/crd/v1/
```

3. Install APISIX Ingress Controller

```shell
kubectl apply -f samples/deploy/composite.yaml
```

4. Check deployment status

- Check service

  ```shell
  kubectl get service  -n ingress-apisix # check service
  ```

  ```shell
  NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
  ingress-apisix-gateway      NodePort    10.99.236.58     <none>        80:31143/TCP,443:30166/TCP   90s
  ```

- Check pods

  ```shell
  kubectl get pods -n ingress-apisix # check pod
  ```

  ```shell
  NAME                                                 READY   STATUS    RESTARTS   AGE
  ingress-apisix-composite-deployment-5df9bc99c7-xxpvq   2/2     Running   0          100s
  ```

### Highly Available Deployment

- Deploy 3 instances and you can achieve high availability by configuring [replicas](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/).

```shell
 kubectl scale deployment ingress-apisix-composite-deployment --replicas=3 -n ingress
-apisix
```

- Check deployment status

```shell
kubectl get pods -n ingress-apisix
```

```shell

NAME                                                   READY   STATUS    RESTARTS   AGE
ingress-apisix-composite-deployment-6bfdc5d6f6-gjgql   2/2     Running   0          20s
ingress-apisix-composite-deployment-6bfdc5d6f6-jb24q   2/2     Running   0          20s
ingress-apisix-composite-deployment-6bfdc5d6f6-sjpzr   2/2     Running   0          45h
```

### Example of Usage

> ApisixRoute is the CRDs resource of Ingress, used to represent routing traffic to specific backend services.

The following example shows how to configure `ApisixRoute` to route traffic to the `httpbin` backend service.

#### Deploy httpbin Application Service

- Deploy `httpbin` application service and configure `ApisixRoute`:

```shell
kubectl apply -f samples/httpbin/httpbin-route.yaml
```

- The specific `ApisixRoute` configuration is as follows:

  All requests with `Host: httpbin.org` will be routed to the `httpbin` service

  ```YAML
  apiVersion: apisix.apache.org/v2
  kind: ApisixRoute
  metadata:
    name: httpbin-route
  spec:
    http:
      - name: route-1
        match:
          hosts:
            - httpbin.org
          paths:
            - /*
        backends:
          - serviceName: httpbin
            servicePort: 80
  ```

#### Visit httpbin Test

Access the `ingress-apisix-gateway` service through local port forwarding, and requests will be routed from ingress-apisix-gateway to the httpbin application.

```Bash
# forward port 9080 -> service 80
kubectl port-forward service/ingress-apisix-gateway 9080:80 -n ingress-apisix &

# acesss httpbin
curl http://127.0.0.1:9080/headers -H 'Host: httpbin.org'
```

```Bash
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.74.0",
    "X-Forwarded-Host": "httpbin.org"
  }
}
```

## Summary

We thoroughly discussed the innovative architecture of the APISIX Ingress Controller, liberating it from dependency on the etcd cluster. This greatly simplifies maintenance costs and system complexity. Simultaneously, the APISIX Ingress Controller actively advances the implementation of the Kubernetes Gateway API standard within the Ingress Controller, aiming to provide more extensive and consistent traffic management capabilities.

In conclusion, whether it be the new architecture of APISIX Ingress Controller or the implementation of the Kubernetes Gateway API, the goal is to offer users a more robust, flexible, and user-friendly Ingress Controller solution to meet the ever-changing demands of cloud-native application deployment and traffic management.
