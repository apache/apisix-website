---
title: "为什么 APISIX Ingress 是比 Ingress NGINX 更好的选择？"
authors:
  - name: "容鑫"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
keywords: 
- Apache APISIX
- Ingress
- Ingress Controller
- Ingress nginx
- Kubernetes
description: 本文将会对比两个比较流行的 Ingress controller 实现，希望能对读者进行 Ingress controller 选型中有所帮助。
tags: [Ecosystem]
---

> 本文将会对比两个比较流行的 Ingress controller 实现，希望能对读者进行 Ingress controller 选型中有所帮助。

<!--truncate-->

> 作者容鑫，API7.ai 云原生技术工程师，Apache APISIX Committer。

本文将会对比两个比较流行的 Ingress controller 实现，希望能对读者进行 Ingress controller 选型中有所帮助。

>[Ingress NGINX](https://github.com/kubernetes/ingress-nginx) 是 Kubernetes 社区实现的 Ingress controller，在社区中被广泛使用。[Apache APISIX Ingress](https://github.com/apache/apisix-ingress-controller) 则是 Apache 软件基金会下的开源项目，使用 APISIX 作为数据面的 Kubernetes Ingress controller。

## Ingress NGINX vs APISIX Ingress

### 功能对比

下列表格中，对比了 Ingress NGINX 和 APISIX Ingress 基本功能，包括协议支持、鉴权方式、上游探针/策略、负载均衡策略、Kubenertes 集成等。以下表格数据取自 [learnk8s.io](https://docs.google.com/spreadsheets/d/191WWNpjJ2za6-nbG4ZoUMXMpUK8KlCIosvQB0f-oq3k)。

| Product/Project               |                                | Ingress NGINX             | Apache APISIX Ingress |
| :---------------------------- | :----------------------------- | :------------------------ | :-------------------- |
| 1. General info               |                                |                           |                       |
|                               | Based on                       | nginx                     | nginx                 |
| 2. Protocols                  |                                |                           |                       |
|                               | HTTP/HTTPS                     | ✔️                         | ✔️                     |
|                               | HTTP2                          | ✔️                         | ✔️                     |
|                               | gRPC                           | ✔️                         | ✔️                     |
|                               | TCP                            | Partial                   | ✔️                     |
|                               | TCP+TLS                        | ✖︎                         | ✔️                     |
|                               | UDP                            | Partial                   | ✔️                     |
|                               | Websockets                     | ✔️                         | ✔️                     |
|                               | Proxy Protocol                 | ✔️                         | ✔️                     |
|                               | QUIC/HTTP3                     | Preview                   | Preview               |
| 3. Clients                    |                                |                           |                       |
|                               | Rate limiting (L7)             | ✔️                         | ✔️                     |
|                               | WAF                            | ✔️                         | Partial               |
|                               | Timeouts                       | ✔️                         | ✔️                     |
|                               | Safe-list/Block-list           | ✔️                         | ✔️                     |
|                               | Authentication                 | ✔️                         | ✔️                     |
|                               | Authorisation                  | ✖︎                         | ✔️                     |
| 4. Traffic routing            |                                |                           |                       |
|                               | Host                           | ✔️                         | ✔️                     |
|                               | Path                           | ✔️                         | ✔️                     |
|                               | Headers                        | ✔️                         | ✔️                     |
|                               | Querystring                    | ✔️                         | ✔️                     |
|                               | Method                         | ✔️                         | ✔️                     |
|                               | ClientIP                       | ✔️                         | ✔️                     |
| 5. Upstream probes/resiliency |                                |                           |                       |
|                               | Healthchecks                   | ✖︎                         | ✔️                     |
|                               | Retries                        | ✔️                         | ✔️                     |
|                               | Circuit Breaker                | ✖︎                         | ✔️                     |
| 6.Load balancer strategies    |                                |                           |                       |
|                               | Round robin                    | ✔️                         | ✔️                     |
|                               | Sticky sessions                | ✔️                         | ✔️                     |
|                               | Least connections              | ✖︎                         | ✔️                     |
|                               | Ring hash                      | ✔️                         | ✔️                     |
|                               | Custom load balancing          | ✖︎                         | ✔️                     |
| 7. Authentication             |                                |                           |                       |
|                               | Basic auth                     | ✔️                         | ✔️                     |
|                               | External Auth                  | ✔️                         | ✔️                     |
|                               | Client certificate - mTLS      | ✔️                         | ✔️                     |
|                               | OAuth                          | ✔️                         | ✔️                     |
|                               | OpenID                         | ✖︎                         | ✔️                     |
|                               | JWT                            | ✖︎                         | ✔️                     |
|                               | LDAP                           | ✖︎                         | ✔️                     |
|                               | HMAC                           | ✖︎                         | ✔️                     |
| 8. Observability              |                                |                           |                       |
|                               | Logging                        | ✔️                         | ✔️                     |
|                               | Metrics                        | ✔️                         | ✔️                     |
|                               | Tracing                        | ✔️                         | ✔️                     |
| 9. Kubernetes Integration     |                                |                           |                       |
|                               | State                          | Kubernetes                | Kubernetes            |
|                               | CRD                            | ✖︎                         | ✔️                     |
|                               | Scope                          | Clusterwide<br/>namespace | namespace             |
|                               | Support for the Gateway API    | ✖︎                         | Preview               |
|                               | Integrates with service meshes | ✔️                         | ✔️                     |
| 10. Traffic shaping           |                                |                           |                       |
|                               | Canary                         | ✔️                         | ✔️                     |
|                               | Session Affinity               | ✔️                         | ✔️                     |
|                               | Traffic Mirroring              | ✔️                         | ✔️                     |
| 11. Other                     |                                |                           |                       |
|                               | Hot reloading                  | ✔️                         | ✔️                     |
|                               | LetsEncrypt Integration        | ✔️                         | ✔️                     |
|                               | Wildcard certificate support   | ✔️                         | ✔️                     |
|                               | Configure hot reloading        | Preview                   | ✔️                     |
|                               | Service Discovery              | ✖                         | ✔️                     |

### 功能差异

通过下图，可以粗略看到 APISIX Ingress 内置的功能和特性相比 Ingress NGINX 更加丰富，其中包括服务发现、协议支持、认证鉴权等等。

![功能差异](https://static.apiseven.com/uploads/2023/01/11/xCr4lsN2_1077243769.png)

### 服务发现

在微服务架构中，应用被拆分为很多微服务，无论是微服务故障，还是对应用服务进行扩缩容，都需要尽快的通知到调用方，以免调用失败。因此，在微服务架构中，服务注册和发现机制就显得很重要了，通常这会通过注册中心来完成。

| Service Discovery | Ingress NGINX | Apache APISIX Ingress |
| :---------------- | :------------ | :-------------------- |
| Kubernetes        | ✔️             | ✔️                     |
| DNS               | ✖             | ✔️                     |
| nacos             | ✖             | ✔️                     |
| exureka           | ✖             | ✔️                     |
| consul_kv         | ✖             | ✔️                     |

### 协议支持

两者都对 HTTP/HTTPS 协议提供完整支持，APISIX Ingress 在协议支持上更丰富一些，能够的使用 TLS 来加密 TCP 流量，还支持 [MQTT](https://apisix.apache.org/docs/apisix/plugins/mqtt-proxy/)、[Dubbo](https://apisix.apache.org/docs/apisix/plugins/dubbo-proxy/)、[Kafka](https://apisix.apache.org/docs/apisix/plugins/kafka-proxy/) 等协议进行代理。

### 服务治理能力

#### 健康检查

在后端节点故障或者迁移时，不可避免会出现节点不可用的情况。如果大量请求访问到了这些不可用的节点时，将会造成流量损失，导致业务中断。因此，需要对节点进行健康检查，通过探针的形式探测后端节点的可用性，将请求代理到健康的节点，从而减少或避免流量损失。

健康检查的能力在 Ingress NGINX 中尚未支持，而 APISIX Ingress 提供了该能力，其中包括：

* **主动健康检查**：确保后端服务中的 Pod 处于可用的状态。在应用服务进行滚动更新时，会牵扯大量的节点进行更新，不健康的节点将会被负载均衡器忽略，开启健康检查能够有效的挑选出可用的 Pod，避免流量损失。
* **被动健康检查**：被动的方式无需发起额外的探针，每个请求就是探针，若一个健康节点连续 N 个请求都被判定为失败（取决于如何配置），则该节点将被标记为不健康。由于无法提前感知节点的状态，可能会有一定量的失败请求，在滚动更新时这种情况会相对常见，可以通过服务降级来避免失败的请求量。

如下是 APISIX Ingress 为 httpbin 服务配置健康检查示例：

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
name: httpbin
spec:
healthCheck:
passive:
unhealthy:
httpCodes:
- 500
httpFailures: 3
active:
type: http
httpPath: /healthz
healthy:
successes: 3
interval: 2s
httpCodes:
- 200
```

#### 服务熔断

流量高峰时，网关作为流量入口向后端服务发起调用，后端服务有可能会产生调用失败（超时或者异常），失败时不能让请求堆积在网关上，需要快速失败并返回回去，这就需要在网关上进行熔断。

服务熔断的功能在 Ingress NGINX 中尚未支持。在 APISIX Ingress 中则可以通过 [api-breaker](https://apisix.apache.org/docs/apisix/plugins/api-breaker/) 熔断插件来实现。

具体使用配置示例如下：

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
name: httpbin-route
spec:
http:
- name: rule1
match:
hosts:
- httpbin.org
paths:
- /status/*
backends:
- serviceName: httpbin
servicePort: 80
plugins:
- name: api-breaker
enable: true
config:
break_response_code: 502
unhealthy:
http_statuses:
- 505
failures: 2
healthy:
http_statuses:
- 200
successes: 2
```

### 插件和鉴权方式

目前 Ingress NGINX 主要通过 [Annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/) 和 [ConfigMap](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/) 等方式进行配置，支持的插件功能比较有限。如果想要使用 JWT、HAMC 等鉴权方式，只能自行开发。

而 APISIX Ingress 得益于 APISIX 的丰富功能，原生支持 APISIX 内置的 [80+ 插件](https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L391-L473)，能够覆盖大部分使用场景，还支持 JWT、HMAC、wolf-rbac 等多种鉴权方式。以下仅展示 APISIX Ingress 使用 HMAC 认证并在路由上的应用示例：

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixConsumer
metadata:
name: hmac-value
spec:
authParameter:
hmacAuth:
value:
access_key: papa
secret_key: fatpa
algorithm: "hmac-sha256"
clock_skew: 0

---

apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
name: httpbin-route
spec:
http:
- name: rule1
match:
hosts:
- httpbin.org
paths:
- /ip
backends:
- serviceName: httpbin
servicePort: 80
authentication:
enable: true
type: hmacAuth
```

## Ingress NGINX 和 APISIX Ingress 的扩展方式

除了以上这些细节对比外，两者对于额外功能的扩展也有所不同。当 Ingress controller 的基础功能无法满足企业用户的需求时，只能通过扩展的方式进行定制开发。接下来将具体介绍 Ingress NGINX 和 APISIX Ingress 如何进行功能扩展。

### Ingress NGINX 如何进行功能扩展

Ingress NGINX 在扩展方式上比较单一，只能通过嵌入 Lua 程序的方式来扩展功能。我们以 [Ingress NGINX 插件开发](https://github.com/kubernetes/ingress-nginx/blob/main/rootfs/etc/nginx/lua/plugins/README.md)为例，大概需要以下步骤：

1. 编写 Lua 程序 example-plugin
2. 将插件安装到 ingress-nginx pod 中的 `/etc/nginx/lua/plugins/<your plugin name>` → `/etc/nginx/lua/plugins/example-plugin`
3. 在 ConfigMap 中启用 `example-plugin` 插件，需要在安装 Ingress NGINX 时引用此 ConfigMap 对象

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
name: ingress-nginx-controller
namespace: ingress-nginx
data:
plugins: "example-plugin"
```

### APISIX Ingress 如何进行功能扩展

APISIX Ingress 提供了多种扩展方式，企业用户可以根据自身情况自由选择或组合，当前支持如下拓展方式：

* 通过 [Lua 进行插件开发](https://apisix.apache.org/docs/apisix/plugin-develop/)：这种方式相对简单，并且几乎没有性能损耗；
* 通过 plugin-runner 开发：这种模式下支持 Java/Python/Go 等语言进行开发，这可以方便用户利用一些现有的业务逻辑，并且无需学习新语言；
* 通过 Wasm 进行插件插件：这种模式下，可以使用任何支持构建出 Wasm 的语言进行插件开发。

此外还可以通过 Serverless 插件来直接编写 Lua 代码，快速满足业务需求。

## 为什么 APISIX Ingress 选择维护 CRD

目前 APISIX Ingress 支持三种声明式配置：Ingress、CRD 和 Gateway API。这里主要对比 Ingress 和 CRD，Gateway API 将在后续展开。

Ingress 比较适合从 Ingress NGINX 迁移的企业用户，其转换成本较低。但缺点也较明显，比如语义化能力弱、没有细致规范等，同时也只能通过 Annotations 方式扩展，且 Annotations 无法支撑复杂配置场景。相对的使用 CRD 主要有以下好处：

* 更契合数据面的设计语义，更加简单易用；
* 一些重要配置能够被复用，而不会存在冗余庞大的单个配置；
* 功能性和可扩展能力有了巨大提升；
* 数据面 APISIX 有着活跃的社区，更新和发布版本快，CRD 的方式能够轻易支持数据面的更多能力；

## Ingress NGINX 的痛点：不支持配置热加载

### 静态配置带来的问题

Ingress NGINX 主要基于 NGINX 配置文件的方式，尽管使用 NGINX + Lua 来实现功能扩展，但没有彻底解决静态配置文件的问题。在路由能力和加载模式上稍显不足，并且存在一些明显劣势。

比如添加、修改任何新的规则时，需要重新加载 NGINX 配置。随着越来越多的路由规则和证书，在触发变更时，reload 操作将会更耗时，甚至需要几秒到十几秒的时间，对线上流量的影响将会非常大的，会导致流量短暂中断、影响响应延迟、负载均衡质量（每次重新加载 NGINX 都会重置负载均衡状态）等。

### 触发 NGINX 重新加载的情况

以下这些情况，涵盖了 Ingress controller 大量的使用场景：

* 创建新的 Ingress 资源；
* 将TLS 部分添加到现有 Ingress；
* Ingress Annotations 的变化可能影响上游配置（例如 load-balance 注释不需要重新加载）；
* 在 Ingress 中添加或删除 path；
* Ingress、Service、Secret 资源被删除；
* Secret 发生更新。

在上述场景下，具有频繁部署应用程序的集群环境中，会不断触发 Ingress、Secret 等资源的操作（创建、更新、删除等），导致 NGINX 重新加载次数剧增，给生产环境带来了极大的影响。

### 小结

Ingress NGINX 的架构决定了它必须生成 NGINX 配置然后通过 reload 方式完成配置更新，架构不调整是无法解决这些已知问题。比如路由的实现，APISIX Ingress 则不再依赖 NGINX 配置改为了纯内存结构，通过热更新方式实现动态路由，不再需要重启 NGINX。

## 云原生新一代网关规范 Gateway API

### Gateway API 优势

Gateway API 相比 Ingress 的功能性更强，旨在通过由许多供应商实现并具有广泛行业支持的富有表现力、可扩展和面向角色的接口来发展 Kubernetes 服务网络。当下 Gateway API 具有如下的优势：

* 面向角色：Gateway 是由一组 API 资源组成的。不同的 API 资源代表了使用与配置 Kubernetes 网络资源的不同角色；
* 表现力强：Gateway API 的核心功能就包含诸如基于头的匹配、流量加权以及其他在 Ingress 中只能通过各实现者自定义的非标准化 Annotations 等方式实现的功能；
* 可扩展：Gateway API 允许不同资源在不同层级一同使用。这使得能够对 API 结构进行更精细化的控制。

### 支持情况

Gateway API 作为一种扩展 Kubernetes 服务网络的标准，其 Gateway 资源能够实现作为 Kubernetes API 来管理网关的生命周期，功能十分强大。目前许多 Ingress controller 都在积极支持它，包括 Istio、Kong、Traefik 等。在目前 [Gateway API 实现情况](https://gateway-api.sigs.k8s.io/implementations/#implementation-status)中，很遗憾的是，**Ingress NGINX 尚未计划支持 Gateway API** 。而 APISIX Ingress 已经支持了 Gateway API 的大部分特性：包括 HTTPRoute、TCPRoute、TLSRoute、UDPRoute 等。

## 总结

经过 APISIX Ingress 与 Ingress NGINX 的完整对比，我们可以看到两者基础功能差异不大，也都具备扩展能力。但在微服务的架构中，APISIX Ingress 对服务治理和服务发现的支持更具优势。

总体来看，两款开源软件均非常优秀，Ingress NGINX 主要特点是简单、易接入，但缺点也十分明显；APISIX Ingress 作为后来者解决了 NGINX 不支持热加载的痛点，在扩展能力和功能上相比 Ingress NGINX 也具有很大的优势。从项目发展角度而言，支持 Gateway API 和 CRD 能够扩展和丰富 Ingress controller 基础能力。

如果读者正在进行 Ingress controller 选型，倾向于功能丰富和更强的扩展能力，推荐使用 APISIX Ingress。如果只是刚接触 Ingress controller，没有更多的功能需求，Ingress NGINX 也是一个比较好的选择。
