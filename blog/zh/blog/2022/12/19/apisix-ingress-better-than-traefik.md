---
title: "为什么 APISIX Ingress 是比 Traefik 更好的选择？"
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://github.com/tao12345666333.png"
keywords: 
- Apache APISIX
- Ingress
- Ingress controller
- Gateway API
- Traefik
description: 本文可以为正在选型 Kubernetes Ingress Controller 产品的用户提供一些帮助。
tags: [Ecosystem]
---

> 本文可以为正在选型 Kubernetes Ingress Controller 产品的用户提供一些帮助。

<!--truncate-->

> 作者张晋涛，API7.ai 云原生专家，Apache APISIX Committer、Kubernetes Ingress Nginx Reviewer

## Apache APISIX Ingress

[Apache APISIX Ingress](https://github.com/apache/apisix-ingress-controller/) 是一个使用 Apache APISIX 作为数据面的 Kubernetes Ingress controller 实现。

目前，它支持多种规则的配置方式，包括 Ingress、APISIX Ingress CRD （自定义资源）以及 Gateway API。

其整体采用数据面与控制面分离的架构，由 Apache APISIX 承载实际的业务流量。因此大大提升了整体的安全性，极大避免了由于数据面被攻击而导致 Kubernetes 集群被攻击的可能。

![image (4).png](https://static.apiseven.com/2022/12/22/63a4011023eef.png)

## Traefik

Traefik 是由 Traefik Labs 开源的一款反向代理和负载均衡器。它在 Kubernetes 中支持多种规则的配置方式，包括 Ingress、Traefik IngressRoute（自定义资源）和 Gateway API。

Traefik 是一个统一的二进制文件，控制面和数据面的代理逻辑均绑定在一起。因此，如果受到攻击或者有远程执行的安全漏洞被利用，极有可能存在 Kubernetes 集群被攻击的情况。

![image (5).png](https://static.apiseven.com/2022/12/22/63a4010fb7f25.png)

## APISIX Ingress vs Traefik

接下来我将从以下几个维度对 Apache APISIX Ingress 和 Traefik 进行一些对比，方便大家在选型时对产品有更多的认知。

### 协议支持

作为网关，最为核心的能力便是要能够正确的代理流量。作为 Kubernetes 集群的入口网关，主要处理如下两部分的流量：即 **Client 到网关的流量**和**网关与 Upstream 的流量**。如下所示：

```bash
Client <----> Ingress <----> Upstream Service
```

当前的协议多种多样，以下简单汇总了两个项目对协议的支持，仅供参考。

|    协议    | APISIX Ingress | Traefik |
| :--------: | :------------: | :-----: |
| HTTP/HTTPS |      支持      |  支持   |
|   HTTP/2   |      支持      |  支持   |
|   HTTP/3   |     不支持     |  支持   |
|    TCP     |      支持      |  支持   |
|    UDP     |      支持      |  支持   |
| WebSocket  |      支持      |  支持   |
|   Dubbo    |      支持      | 不支持  |

此外，无论是 APISIX Ingress 还是 Traefik，均可通过 HTTP/2 或者 TCP 代理等方式支持 gRPC、MQTT 等协议，故而未在上述表格中列出。

从协议支持的角度来看，APISIX Ingress 和 Traefik 各有优势。此外，APISIX 对于 HTTP/3 的支持正在规划中，后续也可随时关注社区动态。

### 可扩展性

由于业务需求多种多样，所以可扩展性也是进行技术选型的一个主要指标。APISIX Ingress 和 Traefik 均提供了一些扩展方式，我们将分别进行介绍。

#### APISIX Ingress

在 APISIX Ingress 中进行功能扩展，主要是通过开发自定义插件来完成。当前，APISIX Ingress 主要支持如下几种插件的开发方式：

* 通过 Lua 进行插件的开发：这种方式相对简单，并且几乎没有性能损耗；
* 通过 Plugin Runner 开发：这种模式下支持 JAVA/Python/Go 等多种计算语言进行开发，方便用户利用现有的业务逻辑，同时无需学习新语言；
* 通过 WASM 进行插件插件：这种模式下，可以使用任何支持构建出 WASM 的语言进行插件开发；

此外，还可以通过 Serverless 插件来直接编排 Lua 代码，满足业务需求。

当然，如果你有 Lua 模块的开发经验，也可以直接编写 Lua 模块，然后进行加载即可，只需在配置文件中增加如下内容即可：

```yaml
apisix:
...
extra_lua_path: "/path/to/example/?.lua"
```

具体关于插件的的开发步骤和使用，请参考 [Apache APISIX 的插件开发文档](https://apisix.apache.org/docs/apisix/plugin-develop/)。

#### Traefik

Traefik 也提供了相关插件机制用于功能扩展。但是 Traefik 是由 Go 进行开发的，因此它的插件也需要用 Go 进行开发。

在开发完成后，就可以在 Traefik 的配置中添加如下内容进行引用了（需注意，插件的名字需要与包名保持一致）。例如：

```yaml
experimental:
localPlugins:
example:
moduleName: github.com/traefik/pluginproviderdemo
```

总体来看，APISIX Ingress 提供了更多种的扩展方式，可以根据实际情况进行灵活选择。可以根据自己喜欢或擅长的工具即可，更容易实现与现有业务集成。而 Traefik 目前则只支持通过 Go 语言进行开发，选择较少。

### 生态

在进行技术选型时候，除了考虑一些性能表现，还需要对产品的整个生态支持进行考察。比如项目所使用的协议、项目归属以及与现有基础设施是否可以整合等等。下方简单整理了几个角度进行呈现（包含了控制面和数据面）。

| 对比维度  |      APISIX Ingress      |   Traefik    |
| :-------: | :----------------------: | :----------: |
|   归属    | Apache 软件基金会（ASF） | Traefik Labs |
|   协议    |        Apache 2.0        |     MIT      |
| 诞生时间  |       2019 年 6 月       | 2015 年 8 月 |
|  consul   |           支持           |     支持     |
|   nacos   |           支持           |    不支持    |
|  Eureka   |           支持           |    不支持    |
|   etcd    |           支持           |     支持     |
| zookeeper |           支持           |     支持     |
|    DNS    |           支持           |    不支持    |

此外，这两个项目都非常积极与一些周边项目进行了集成与合作。比如 Rancher、KubeSphere 等。

从生态合作角度来看，APISIX Ingress 比 Traefik 提供了更为广泛的集成能力，尤其是与基础组件。因此在进行技术选型时，可以结合当前自己所用的基础组件的情况进行权衡。

## 来自用户的声音

在今年，我们也看到了很多来自用户的声音，他们开始在业务架构中用上了 APISIX Ingress。比如[地平线使用 APISIX Ingress 替换了 Traefik](https://www.apiseven.com/usercase/apisix-ingress-with-horizon-ai)，主要是考虑如下方面：

* 通过 Annotation 增加的配置不易重用；
* Traefik 中默认的行为与 NGINX 中不同，用户在使用时候会产生困惑；

在切换为 Apache APISIX Ingress 后，得益于 APISIX Ingress 丰富的插件生态，绝大多数需求均可通过内置插件满足。并且插件的配置可直接通过 APISIX Ingress 的 ApisixRoute 资源进行定义，比较直观。也可以通过 ApisixPluginConfig 进行插件模板的配置，在其他的 ApisixRoute 资源中进行引用。

![image (8).png](https://static.apiseven.com/2022/12/22/63a4011134069.png)

APISIX Ingress 的数据面性能更佳，能高效地应对日益增长的业务流量，而不会陷入性能瓶颈。

除地平线以外，包括[少年得到](http://www.igetcool.com/)，[观为智慧](http://www.gwwisdom.com/)等公司也都使用 APISIX Ingress 替换了 Traefik，更多用户案例请参考[用户案例](https://www.apiseven.com/usercases)。

此外，Apache APISIX 社区非常活跃，在 GitHub 和 Slack 等频道上都会快速响应。也期待各位在社区积极进行反馈与讨论。

## 总结

本文从协议支持、可扩展性和生态等方面对比了 Apache APISIX Ingress 和 Traefik。从内容中也可以看到，APISIX Ingress 在可扩展性和生态集成方面有一定的优势，用户可以更容易地对 APISIX Ingress 进行扩展，以及与一些基础组件进行集成。

希望本文可以为正在选型 Kubernetes Ingress Controller 产品的用户提供一些帮助。
