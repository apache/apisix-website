---
title: APISIX Ingress Controller 1.0 Release
slug: 2021/06/18/first-ga-version-v1.0-of-apache-apisix-ingress-controller-released
author: Jintao Zhang
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://avatars.githubusercontent.com/u/3264292?v=4"
keywords:
- APISIX
- Apache APISIX
- Ingress Controller
description: Apache APISIX Ingress Controller released, supports resources such as ApisixRoute and ApisixUpstream, and also supports control of external traffic.
tags: [Community]
---

> Apache APISIX Ingress Controller v1.0 has been released, supporting the use of custom resources including `ApisixRoute`, `ApisixUpstream`, and Kubernetes native Ingress resources to control external traffic access to services deployed in Kubernetes. services deployed in Kubernetes.

<!--truncate-->

## About Apache APISIX Ingress Controller

The Apache APISIX Ingress Controller is a cloud-native Ingress Controller implementation that uses Apache APISIX as a data plane to carry traffic and extends Kubernetes using CRD.

<!--truncate-->

Supports controlling external traffic access to services deployed in Kubernetes using custom resources including ApisixRoute, ApisixUpstream, and Kubernetes-native Ingress resources.

The overall architecture is as follows.

![Apache APISIX Ingress Controller Architecture Diagram](https://static.apiseven.com/202108/1639464578081-06d7c64a-b597-444f-a59f-0217676e1ffc.png)

## v1.0 latest features

### Add ApisixConsumer custom resource to make configuration authentication more convenient

In the previous version, if you want to configure keyAuth or basicAuth, you need to manually call Apache APISIX admin api to create consumer configuration.

In v1.0, we added the `ApisixConsumer` resource, which allows users to define consumer resources and configure authentication for ApisixRoute in a more native way.

For example, a keyAuth resource is defined with the following configuration.

```yaml
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixConsumer
metadata:
  name: keyauth
spec:
  authParameter:
    keyAuth:
      value:
        key: API
```

In ApisixRoute you only need to add the corresponding type of `authentication` configuration.

```yaml
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixRoute
metadata:
  name: httpbin-route
spec:
  http:
   ...
   authentication:
     enable: true
     type: keyAuth
```

### Adding mTLS support to ApisixTls

In v1.0 we also added mTLS support for ApisixTls custom resources, just add the client configuration to the ApisixTls resource configuration, e.g.

```yaml
apiVersion: apisix.apache.org/v1
kind: ApisixTls
metadata:
  name: sample-tls
spec:
  ...
  client:
    ... client: caSecret:
      name: client-ca-secret
      namespace: default
````

### Added more annotations to the native Ingress resource to enrich its functionality

- `k8s.apisix.apache.org/blocklist-source-range` to restrict the source IP.
- `k8s.apisix.apache.org/rewrite-target` and `k8s.apisix.apache.org/rewrite-target-regex` to perform target rewrite operations.
- `k8s.apisix.apache.org/http-to-https` to perform HTTP to HTTPS forced redirects.

See the project [CHANGELOG](https://github.com/apache/apisix-ingress-controller/blob/master/CHANGELOG.md) for more feature changes.

## Why use APISIX Ingress Controller

Apache APISIX Ingress Controller uses Apache APISIX as its data plane to carry business traffic, so it inherits the following advantages from Apache APISIX.

- **High Performance & Stability**: Apache APISIX is a cloud-native high-performance dynamic API gateway that has been used in many enterprise large-scale traffic scenarios, and its performance and stability have been tested for a long time.
- **Rich ecology**: Apache APISIX is currently the most active open source gateway project, as the top project of Apache, both the community activity and its plug-in ecology are very rich, can meet the user's multiple use scenarios and needs.

In addition, because APISIX Ingress Controller also has the following unique advantages.

- **Good compatibility**: supports multiple Ingress resource versions and works fine in different Kubernetes versions.
- **Dynamic updates**: Both Ingress resources and configuration updates such as certificates are hot loaded without reload, ensuring smooth business operation.
- **Flexible Scalability**: Since APISIX Ingress Controller adopts the architecture of separate control plane and data plane, the data plane cluster of Apache APISIX can be scaled up separately without scaling up Apache APISIX Ingress Controller.
- **Operation and Maintenance Friendly**: Under the current architecture, users can choose to deploy the dataplane Apache APISIX cluster in a Kubernetes cluster or in a physical machine environment as the case may be. And Apache APISIX Ingress Controller failure will not have any impact on business traffic.
