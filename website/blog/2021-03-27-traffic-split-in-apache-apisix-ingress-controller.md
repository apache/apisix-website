---
title: "Traffic Split in Apache APISIX Ingress Controller"
avatar: "https://avatars.githubusercontent.com/u/10428333?s=460&u=f48ef50c5621a1616a3ede50221547e34270e061&v=4"
author: "Chao Zhang"
href: "https://github.com/tokers"
date: 2021-03-27
---

Traffic Split is a feature that splits and deliveries traffic to multiple backend services. Solutions like API Gateway (e.g. [Apache APISIX](http://apisix.apache.org/) and [Traefik](https://traefik.io/)), Service Mesh (e.g. [Istio](https://istio.io/) and [Linkerd](https://linkerd.io/)) are capable of doing traffic splitting and implement functionalities like [Canary Release](https://blog.getambassador.io/cloud-native-patterns-canary-release-1cb8f82d371a) and [Blue-Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html).

Traffic split is also a key feature in [Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/). As the ingress layer in the [Kuberentes](https://kubernetes.io/) cluster, it’s desired to reduce the risk due to release a new version of the application by setting up some traffic split rules in the ingress controller, so only a controllable amount of traffic will be routed to newly released instances. In this article, we’ll introduce the traffic split (also called canary release) in [Ingress Nginx](https://kubernetes.github.io/ingress-nginx/) and [Kong Ingress Controller](https://github.com/Kong/kubernetes-ingress-controller), and ultimately we explain the traffic split in [Apache APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller).

(PS: For the sake of more concise descriptions, we use the term "canary app" to describe the backend service which routed after the canary rules hit, and the term "stable app" to describe the backend service which routed due to the canary rules miss, for instance, the canary and stable app are "foo-canary" and "foo" perspectively in the following diagram.)

![1.png](https://lh6.googleusercontent.com/E_qq-RFIcVBbTFsI8-QTNH7Io5vOXapdQUaAzKE2mYlyvtXUlZEoSd8aVMHAppARmXx9_wgHsgP1CWK_R74MfPV58dLQ71kEcU57DooHKz2LuKb6D6TW9B2_C8rLsm8wHTk2_zZt)

## Ingress Nginx

Ingress Nginx supports the canary release, it’s controlled by an annotation "nginx.ingress.kubernetes.io/canary", and it supports several annotations to customize this feature.

+ nginx.ingress.kubernetes.io/canary-by-header

The destination is decided by whether the value of header (indicated by nginx.ingress.kubernetes.io/canary-by-header), the Canary app will be routed if the value is "always", the otherwise stable app will be routed (value of the header is "never").

+ nginx.ingress.kubernetes.io/canary-by-header-value

This annotation extends nginx.ingress.kubernetes.io/canary-by-header, now the value of the header no longer needs to be "always" or "never".

+ nginx.ingress.kubernetes.io/canary-by-header-pattern

Similar to nginx.ingress.kubernetes.io/canary-by-header, but the value is a [PCRE](https://www.pcre.org/) compatible regular expression.

+ nginx.ingress.kubernetes.io/canary-by-cookie

Use data field in Cookie header to decide the backend service.

+ nginx.ingress.kubernetes.io/canary-weight

Assign weight value between 0 and 100, traffic will be delivered according to this weight, a 0 weight means all traffic will be routed to the canary app and 100 weight will route all traffic to the stable app.

The following YAML snippet proxies requests whose URI path is led by "/get" and the User-Agent matches with the ".*Mozilla.*" pattern to the canary app "foo-canary".

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
      kubernetes.io/ingress.class: nginx
      nginx.ingress.kubernetes.io/canary: "true"
      nginx.ingress.kubernetes.io/canary-by-header: "User-Agent"
      nginx.ingress.kubernetes.io/canary-by-header-pattern: 
".*Mozilla.*"
  name: ingress-v1beta1
```

## Kong

The Kong Gateway has a [canary release plugin](https://docs.konghq.com/hub/kong-inc/canary/0.32-x.html) and exposes this plugin to its ingress controller by [KongPlugin](https://docs.konghq.com/hub/) resource. Administrators/Users need to create a KongPlugin object and fill the canary release rule, injecting an annotation "konghq.com/plugins" to the target [Kuberentes Service](https://kubernetes.io/docs/concepts/services-networking/service/). Or you can create a [KongClusterPlugin](https://docs.konghq.com/kubernetes-ingress-controller/1.1.x/guides/using-kongclusterplugin-resource/) object to let this canary rule effective in the whole cluster.

```
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: foo-canary
config: 
  percentage: 30
  upstream_host: foo.com
  upstream_fallback: false
  upstream_port: 80
plugin: canary
---
apiVersion: v1
kind: Service
metadata:
  name: foo-canary
  labels:
    app: foo
  annotations:
    konghq.com/plugins: foo-canary
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
      app: foo
      canary: true
```

The above case marks the service "foo-canary" as "canary", and creates a canary release rule to proxy 30% traffic to this service.

## Apache APISIX

[Apache APISIX](https://apisix.apache.org) splits traffic with custom rules by its [traffic-split](apisix.apache.org/docs/apisix/plugins/traffic-split) plugin, and Apache APISIX Ingress Controller implements the traffic split feature to [ApisixRoute](apisix.apache.org/docs/ingress-controller/concepts/apisix_route) (as the first-class support, without relying on annotations) by this plugin and the flexible route match abilities in ApisixRoute.

### Weight-Based

By configuring multiple Kubernetes Services, the weight-based canary rule can be applied like:

```
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixRoute
metadata:
  name: foo-route
spec:
  http:
  - name: rule1
    match:
      hosts:
      - foo.org
      paths:
      - /get*
    backends:
    - serviceName: foo-canary
      servicePort: 80
      weight: 10
    - serviceName: foo
      servicePort: 80
      weight: 5
```

The above case puts ⅔ requests whose Host is "foo.org" and with URI path prefix "/get" to "foo-canary" service and others to foo.

The weight for canary service can be tiny for the small scale verification, and enlarge the weight by modifying the ApisixRoute until all traffic routed to the canary service, finishing the release totally.

### Rules-Based

The [Exprs](https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/concepts/apisix_route.md#advanced-route-features) field in ApisixRoute allows users to configure custom route match rules, on the other hand, multiple route rules can be grouped into a single ApisixRoute object, so there is a seamless way to implement the rules-based traffic split.

```
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixRoute
metadata:
  name: foo-route
spec:
  http:
  - name: rule1
    priority: 1
    match:
      hosts:
      - foo.org
      paths:
      - /get*
    backends:
    - serviceName: foo
      servicePort: 80
  - name: rule2
    priority: 2
    match:
      hosts:
      - foo.org
      paths:
      - /get*
      exprs:
      - subject:
          scope: Query
          name: id
        op: In
        set:
        - "3"
        - "13"
        - "23"
        - "33"
    backends:
    - serviceName: foo-canary
      servicePort: 80
```

Requests whose Host is "foo.org", URI path prefix is "/get" will be separated into two parts:

+ The id parameter which value is 3, 13, 23 or 33 will hit rule2, and forward to foo-canary;

+ Others will hit rule1 and route to foo.

## Summary

Traffic split (Canary release) in Ingress Nginx supports weight-based scheme and header rule-based one, but it relies on annotations, which semantic is weak; The Kong way only supports to configure canary release by weight, the scenarios are somewhat narrow, and the configuring is complicated (you need to configure several resources); In contrast, traffic split in Apache APISIX Ingress Controller is flexible and easy to configure, it works well for both the weight-based and rule-based traffic split scheme.
