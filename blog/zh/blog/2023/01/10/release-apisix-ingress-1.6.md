---
title: "Apache APISIX Ingress 1.6 正式发布"
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://github.com/tao12345666333.png"
keywords: 
- APISIX Ingress
- Ingress
- Ingress Controller
- 云原生
- Kubernetes
- Gateway API
description: Apache APISIX Ingress 1.6 版本正式发布！此版本带来了 Gateway API 的支持，同时新增服务发现组件集成与代理外部服务，优化对 APISIX Ingress Controller 的使用体验。
tags: [Community]
---

> Apache APISIX Ingress 1.6 版本正式发布！此版本带来了 Gateway API 的支持，同时新增服务发现组件集成与代理外部服务，优化对 APISIX Ingress Controller 的使用体验。

<!--truncate-->

距离上一个版本 v1.5 发布，已经过了 3 个月，我们很高兴地宣布 Apache APISIX Ingress v1.6 正式发布！

在该版本中，共有 **29 位贡献者** 参与代码提交，其中 **17 位是新晋贡献者** ，感谢大家的支持和参与！

![新晋贡献者](https://static.apiseven.com/uploads/2023/01/11/7ALBS8mi_blog1.png)

本次发布的 Apache APISIX Ingress v1.6 版本带来了众多新特性，主要集中在对 Gateway API 的支持，同时也在扩展 APISIX Ingress 的使用场景和易用性方面的提升。以下是一些重点特性的介绍。

## 扩展对 Gateway API 的支持

Gateway API 是 Kubernetes 中下一代的 Ingress 规范，致力于提供富有表现力，可扩展和面向角色的接口来发展 Kubernetes 的网络，各个 Ingress controller 项目都在积极推进对该规范的支持。Apache APISIX Ingress 项目自 2021 年开始就在积极地紧跟上游社区的发展，并积极推进 Gateway API 在 APISIX Ingress 项目中的实现。

![Gateway API](https://static.apiseven.com/uploads/2023/01/11/ru9yoUrn_blog2.png)

当前，Apache APISIX Ingress 项目中通过 Gateway API 进行配置的特性尚处于 beta 阶段，欢迎大家在测试环境中积极进行测试，并提供反馈，我们将持续的对此特性进行优化和改进，尽早完成此特性的 GA。

在 APISIX Ingress v1.6 版本中，我们添加了对 Gateway API 中的 `TCPRoute` 和 `UDPRoute` 这两种资源的支持。同时，扩展了对 `HTTPRoute` 资源中 `Filters` 的支持，这样用户在使用 `HTTPRoute` 资源时，就可以在该资源中应用一些重定向、Header 改写等能力了。

例如可以使用如下配置：

```YAML
apiVersion: gateway.networking.k8s.io/v1alpha2
kind: HTTPRoute
metadata:
  name: http-route
spec:
  hostnames: ["httpbin.org"]
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /headers
    filters:
    - type: RequestHeaderModifier
      requestHeaderModifier:
        add:
        - name: X-Api-Version
          value: v1
        - name: X-api-key
          value: api-value
        set:
        - name: X-Auth
          value: filter
        remove:
        - Remove-header
    backendRefs:
    - name: httpbin
      port: 80
```

通过使用此配置，客户端在对 [httpbin.org](httpbin.org) 进行请求时，将会添加 `"X-Api-Version": "v1"` 和 `"X-Api-Key": "api-value"` 的请求头，并将 `"X-Auth"` 请求头的值设置为 `filter` ，同时将移除 `"Remove-Header"` 这个请求头。

## 支持与服务发现组件的集成

Kubernetes 中默认是使用基于 DNS 的服务发现机制，但是应用在迁移和改造的过程中，并非所有的业务都会选择改造成基于 DNS 的这种服务发现机制，仍然有大量微服务架构的应用会继续使用原有的服务注册发现组件，比如 Consul，Nacos，Eureka 等。

为了将 APISIX Ingress 打造成一款更加好用的 Ingress controller，我们在 v1.6 版本中新增了与服务发现组件集成的能力，用户可以将注册在 Consul/Nacos/Eureka/DNS 中的服务，通过 APISIX Ingress 暴露出来，无论是南北向还是东西向流量的场景均可使用。

例如通过如下配置，声明要代理的服务是通过 Nacos 注册的名为 `httpbin` 的服务。

```YAML
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
  name: httpbin-upstream
spec:
  discovery:
    type: nacos
    serviceName: httpbin
```

然后在 ApisixRoute 资源中对其进行引用即可：

```YAML
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  name: httpbin-route
spec:
  http:
  - name: rule1
    match:
      hosts:
      - local.httpbin.org
      paths:
      - /*
    upstreams:
    - name: httpbin-upstream
```

这样客户端在访问时，就会被 APISIX 代理到 Nacos 中注册的服务了。更多内容可[参考文档](https://apisix.apache.org/docs/ingress-controller/tutorials/external-service-discovery/)。

## 支持代理外部服务

与上述功能类似，Apache APISIX Ingress v1.6 版本中还添加了对外部服务代理的能力。主要是为了便于用户对一些没有部署在 Kubernetes 中的外部服务进行代理。

最典型的场景比如说消息推送。业务为了保障服务的高可用，通常会选择多家供应商提供服务，但供应商也可能会出现一些异常的情况。这种时候就可以通过这个功能，在多个供应商提供的服务中进行动态调度了。

比如通过如下配置设置两个供应商的域名作为后端：

```YAML
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
  name: notify-api
spec:
  externalNodes:
  - type: Domain
    name: foo.com
  - type: Domain
    name: bar.com
  healthCheck:
    passive:
      unhealthy:
        httpCodes:
          - 500
          - 502
          - 503
          - 504
        httpFailures: 3
        timeout: 5s
    active:
      type: http
      httpPath: /healthz
      timeout: 5s
      healthy:
        successes: 3
        interval: 2s
        httpCodes:
          - 200
```

然后在 ApisixRoute 资源中进行引用：

```YAML
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  name: notify-route
spec:
  http:
  - name: rule1
    match:
      hosts:
      - local.notify.app
      paths:
      - /*
    upstreams:
    - name: notify-api
```

这样，如果某个供应商的服务出现异常，则会根据健康检查的规则自动地代理到备用的服务上，从而保障业务的可用性。

同样的，如果业务中存在需要代理 ExternalName Service 的场景也可以使用这种方式进行代理。更多内容可[参考文档](https://apisix.apache.org/docs/ingress-controller/tutorials/external-service/)。

## 其他

除了上述的这些功能外，在此版本中还添加了很多其他功能，包括：

- 支持 Ingress 资源中代理不同 namespace 中的后端服务；
- 原生的 MQTT 协议的代理支持；
- 允许为 4 层代理添加插件支持；
- 允许在 ApisixRoute 资源中使用 vars 进行条件匹配；
- 日志轮转支持；

更多详细的变更请查看 Release Note：https://github.com/apache/apisix-ingress-controller/blob/master/CHANGELOG.md#160
