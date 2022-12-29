---
title: "APISIX Ingress 如何支持自定义插件"
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://github.com/tao12345666333.png"
keywords: 
- Kubernetes
- APISIX Ingress
- 云原生
- APISIX
- Plugin
description: 本篇主要介绍了 Ingress 资源相关的语义，以及如何对 Ingress 资源进行能力的扩展。
tags: [Ecosystem]
---

> 本篇主要介绍了 Ingress 资源相关的语义，以及如何对 Ingress 资源进行能力的扩展。

<!--truncate-->

> 作者：张晋涛，API7.ai 云原生技术专家，Apache APISIX PMC 成员，Apache APISIX Ingress Controller 项目维护者。

## Ingress 和 Ingress Controllers

Kubernetes 中的 Ingress 是一种资源对象，用于定义如何从 Kubernetes 集群外访问到 Kubernetes 集群内的服务，其中包含了具体的访问规则，通常情况下客户端使用 HTTP/HTTPS 协议进行访问。

客户端可按照 Ingress 资源定义的规则，将客户端请求路由到 Kubernetes 集群中的服务或具体的 Pod 中。

![3df3234c-7ae7-48de-8dbb-0449226e4f2e.png](https://static.apiseven.com/2022/12/14/63996e81521dc.png)

以下是一个 Ingress 资源的示例：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: apisix-gateway
spec:
  rules:
  - host: apisix.apache.org
    http:
      paths:
      - backend:
          service:
            name: apisix-gateway
            port:
              number: 80
        path: /
        pathType: Exact
```

上述示例中包含了以下内容：

* **metadata.name**：Ingress 资源的名称
* **spec.rules[].host**：外部访问使用的域名
* **spec.rules[].http.paths[].backend**：定义了 Kubernetes 集群中服务的相关信息
* **spec.rules[].http.paths[].path**：定义了外部服务访问 Kubernetes 集群中服务时使用的路径
* **spec.rules[].http.paths[].pathType**：定义了外部服务访问 Kubernetes 集群中服务时路径的匹配规则

从上述内容可以看到，**Ingress 资源的语义是相对比较简单的。**

Ingress 仅仅是 Kubernetes 中的一种资源定义，它本身不具备任何流量处理能力。要让 Ingress 资源生效，则必须要有 controller 来处理这些 Ingress 资源，通常这样的 controller 我们称之为 Ingress controller。

Ingress controller 会持续地监控或监听 Kubernetes 集群中 Ingress 资源的变化，并根据 Ingress 资源中定义的规则，转换为其数据面中的代理规则，并由数据面来实际的承载流量。

**在实际的生产环境中，客户端访问的需求是多种多样的。比如最常见的认证、路由重写等能力，通过 Ingress 资源是无法直接进行描述的。那么这些需求要如何满足呢？**

## Ingress-NGINX 如何支持扩展功能

首先我以 Kubernetes 社区的 Ingress-NGINX controller 为例，介绍如何在其中使用扩展功能。

在 Ingress-NGINX 项目中，可以为 Ingress 资源增加一些 Annotation 来描述其需要使用的扩展能力。比如使用如下配置便可开启 cors 能力。

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: https://foo.com,https://bar.com
    nginx.ingress.kubernetes.io/cors-allow-headers: x-foo-1,x-foo-2
    nginx.ingress.kubernetes.io/cors-allow-methods: GET,POST,PUT
  name: nginx-ingress
spec:
  rules:
  - host: kubernetes.github.io
    http:
      paths:
      - path: /ingress
        pathType: Exact
        backend:
          service:
            name: nginx
            port:
              number: 80
```

这种方式仅仅需要为 Ingress 资源添加 Annotations 的配置即可，相对简单。但需要注意，使用这种模式需要 Ingress-NGINX controller 已经完成了对该 Annotations 的完整支持，否则该配置是无效的。

如果需要其他的一些 Ingress-NGINX controller 尚未实现的能力，则需要对其进行二次开发。

## 在 APISIX Ingress 中使用插件

相较于 Ingress-NGINX controller，APISIX Ingress 使用 APISIX 作为数据面，APISIX 是一个高性能的全动态 API 网关。所有的配置变更都是动态进行的，无需重启，所以对业务流量不会造成任何影响。

在 Apache APISIX Ingress 中可以通过使用插件，来满足用户各种流量处理的需求和具体场景。当前有 80+ 插件开箱即用，当然用户也可以开发自定义插件来进行能力的扩展。

![output.png](https://static.apiseven.com/2022/12/14/63996c4d6f23e.png)

目前，在 Apache APISIX 中支持多种方式进行自定义插件的开发：

* 使用 Lua 进行插件的开发，这类插件会在 APISIX 内部运行；
* 使用其他语言进行插件的开发，这种机制叫作 Plugin Runner，利用该机制开发的插件属于 external-plugin。

关于 APISIX 插件的开发，可参考官方文档：

* [插件开发](https://apisix.apache.org/docs/apisix/plugin-develop/)
* [External Plugin 开发](https://apisix.apache.org/docs/apisix/external-plugin/)

了解了 APISIX 的插件开发模式后，接下来将介绍 3 种在 APISIX Ingress 中使用 Lua 语言开发插件的方式。

### 方式一：纯 CRD 模式

APISIX Ingress controller 支持自己设计的一套 CRD 规范，你可以直接在路由规则中开启插件（无论是内置插件还是自定义插件），例如：

```yaml
apiVersion: apisix.apache.org/v2beta3
kind: ApisixRoute
metadata:
 name: httpbin-route
spec:
 http:
 - name: rule1
   match:
     hosts:
     - apisix.apache.org
     paths:
       - /apisix-ingress
   backends:
   - serviceName: apisix-gateway
     servicePort: 80
   plugins:
   - name: cors
     enable: true
     config:
       allow_origins: http://foo.bar.org
       allow_methods: "GET,POST"
       max_age: 3600
       expose_headers: x-foo,x-baz
       allow_headers: x-from-ingress
       allow_credential: true
```

通过上述配置可以创建路由规则，并且在此路由中开启 `cors` 插件。

**这是 APISIX Ingress 中最原生支持的方式，这种方式也与 APISIX 更加贴合。同时，用户新增自定义插件后，APISIX Ingress 也无需进行任何二次开发，可直接使用。**

### 方式二：Ingress Annotations 模式

由于 Ingress 资源的语义有限，所以通常情况下我们可以通过 `annotations` 为资源对象扩展一些信息，这也是最常见的对 Ingress 能力扩展的方式。例如：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: apisix
    k8s.apisix.apache.org/enable-cors: "true"
    k8s.apisix.apache.org/cors-allow-origin: https://foo.com,https://bar.com
    k8s.apisix.apache.org/cors-allow-headers: x-foo-1,x-foo-2
    k8s.apisix.apache.org/cors-allow-methods: GET,POST,PUT
  name: apisix-ingress
spec:
  rules:
  - host: apisix.apache.org
    http:
      paths:
      - path: /apisix-ingress
        pathType: Exact
        backend:
          service:
            name: apisix-gateway
            port:
              number: 80
```

上述配置在 Ingress 资源中增加了 `cors` 相关的一些信息。APISIX Ingress controller 可以识别这些信息，并将这些信息转换为数据面中 `cors` 的配置，进而完成对 Ingress 资源的扩展。

**但是这种模式下，需要确保在 APISIX Ingress controller 中已经实现了对这些 Annotations 的处理逻辑，如果尚未实现，则需要进行一些二次开发。**

如果需要进行二次开发，可参考[如何进行 APISIX Ingress controller 的开发](https://apisix.apache.org/docs/ingress-controller/contribute/)。

### 方式三：CRD + Ingress Annotations 模式

除以上两种方式外，在 APISIX Ingress 中也可以通过 CRD + Ingress Annotations 的方式进行扩展，例如：

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixPluginConfig
metadata:
  name: cors-plugin
spec:
  plugins:
    - name: cors
      enable: true
      config:
        allow_origins: http://foo.bar.org
        allow_methods: "GET,POST"
        max_age: 3600
        expose_headers: x-foo,x-baz
        allow_headers: x-from-ingress
        allow_credential: true
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: apisix
    k8s.apisix.apache.org/plugin-config-name: cors-plugin
  name: apisix-ingress
spec:
  rules:
  - host: apisix.apache.org
    http:
      paths:
      - path: /apisix-ingress
        pathType: Exact
        backend:
          service:
            name: apisix-gateway
            port:
              number: 80
```

通过上方的这段配置，可以单独创建名为 `cors-plugin` 的插件配置，并通过 Ingress 资源的 `k8s.apisix.apache.org/plugin-config-name: cors-plugin` 对其进行引用。通过这种操作的实际效果与前两个方式基本类似，都会在对应的路由上开启 `cors` 插件。

在这种模式下，**用户的插件配置可以作为独立资源，并且可以被多个 Ingress 资源共享。同时，也无需进行任何二次开发。**

## 总结

本篇主要介绍了 Ingress 资源相关的语义，以及如何对 Ingress 资源进行能力的扩展。在 Ingress-NGINX 中可以通过 Annotations 的方式进行能力的扩展，但在 Apache APISIX Ingress 中可以通过三种模式进行配置。且其中两种对于用户自己开发的自定义插件而言，是无需进行任何二次开发的，进而满足用户更多的场景和需求。
