---
title: "Release Apache APISIX Ingress v1.5-rc1"
author: "Jintao Zhang"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://github.com/tao12345666333.png"
keywords: 
- Apache APISIX
- Ingress
- Ingress controller
- Gateway API
- CRD
description: Apache APISIX Ingress Controller v1.5-rc1 is officially released. Bring API Version upgrades, Gateway API support, and updates to Ingress resources.
tags: [Community]
---

> Apache APISIX Ingress Controller v1.5-rc1 is officially released. Bring API Version upgrades, Gateway API support, and updates to Ingress resources.

<!--truncate-->

Apache APISIX Ingress Controller v1.5-rc1 version is officially released. This release took about 7 months and 144 commits by 36 contributors. Among them, there are 22 new contributors, thank you for your contribution and support to this project!

![Contributors](https://static.apiseven.com/2022/blog/0805/ingress-1.png)

Next, let's take a look at the important updates in APISIX Ingress v1.5.

## All CRD API versions upgraded to v2

At the beginning of the APISIX Ingress project, there were only a few CRDs, and each resource was maintained by its own API version. This leads to a situation in which the API version used by each custom resource is different in the process of subsequent introduction of new resources or function iteration, which increases user learning costs.

So starting from the v1.3 version, we have proposed a [proposal](https://github.com/apache/apisix-ingress-controller/issues/707) that unifies the API version of all resources. After two version iterations, the v2 API version has been officially introduced, and v2beta3 is marked as deprecated, and v2beta3 will be completely removed until the v1.7 version.

## Basic support for Gateway API

Gateway API can be said to be the next generation Ingress definition with richer performance capabilities. We have completed support for most of these resources in APISIX Ingress.

:::note

This feature is currently experimental and not enabled by default.

:::

If you want to use the Gateway API in APISIX Ingress, you can enable this function by passing the `enable_gateway_ api: true` configuration item in the controller's configuration file.

After installing the CRD of the Gateway API, you can complete the configuration of the Layer7 proxy by creating an `HTTPRoute` resource. As follows:

```yaml
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: HTTPRoute
metadata:
  name: httpbin-route
spec:
  hostnames: ["httpbin.local"]
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /ip
    backendRefs:
    - name: httpbin
      port: 80
```

After this configuration takes effect, the client will be able to access the `80` port of the backend `httpbin` through `httpbin.local/ip`.

In addition, we plan to implement support for the remaining two resources, `TCP Route` and `UDP Route` of the Gateway API in v1.6, and plan to introduce a conformance test for the Gateway API to ensure that our implementation matches the expectations of the Gateway API.

## Allow Ingress resources to bind arbitrary plugins

In the Apache APISIX Ingress Controller project, Kubernetes native Ingress resources are supported for proxy configuration, but if you want to use APISIX's rich plugin capabilities in Ingress resources, you must add Annotation to complete it, and you need to implement the logic corresponding to Annotation.

This approach limits the plugin capabilities of the Ingress resource, and developing Annotaion separately for each plugin is a relatively expensive affair.

In the v1.5 release, we made it possible to enable the Ingress resource by adding a new Annotaion `k8s.apisix.apache.org/plugin-config-name`, which allows to refer to any `Apisix Plugin Config` resource Ingress resources are free to use the ability of any APISIX plugin.

This will greatly increase the ease of use of APISIX Ingress Controller, and will also reduce the cost for users to migrate from other Ingress controllers to APISIX Ingress Controller.

## More details

In addition to these features, many other features have been added to this release. for example:

- A mechanism for synchronizing data from the Kubernetes cluster to the APISIX cluster on a regular basis to ensure the consistency of the data in the APISIX cluster and the configuration in the Kubernetes cluster;
- Add more authentication methods for ApisixConsumer resources;
- Compatibility with APISIX v2.15;
- Update all dependencies to the latest version to reduce security risks;

For more specific release details, please refer to v1.5-rc1's [Changelog](https://github.com/apache/apisix-ingress-controller/blob/v1.5.0/CHANGELOG.md#150-rc1).
