---
title: "API 网关策略的二三事"
authors:
  - name: "暴渊"
    title: "Author"
    url: "https://github.com/Baoyuantop"
    image_url: "https://github.com/Baoyuantop.png"
keywords:
- API Gateway
- 网关策略
- APISIX
- Gateway Policy 
description: 这篇文章介绍了什么是 API 网关策略，并针对认证授权、安全、流量处理与可观测性这四类 API 网关中常用的策略进行描述。
tags: [Ecosystem]
---

> 这篇文章介绍了什么是 API 网关策略，并针对认证授权、安全、流量处理与可观测性这四类 API 网关中常用的策略进行描述。

<!--truncate-->

> 作者[暴渊](https://github.com/Baoyuantop)，API7.ai 技术工程师，Apache APISIX Committer。

近些年随着云原生和微服务架构的日趋发展，API 网关以流量入口的角色在技术架构中扮演着越来越重要的作用。**API 网关主要负责接收所有请求的流量并进行处理转发至上游服务，API 网关的策略决定了 API 网关处理这些流量的逻辑与规则，直接决定了实际的业务流量行为。**

## 什么是 API 网关策略？

API 网关一般位于所有的上游服务之前，当用户向服务发送请求后请求会先到 API 网关，API 网关接收到请求之后一般会判断几件事情：

1. **请求是否合法，比如是否来自被禁止访问的用户列表中；**
2. **这个请求是否通过认证，访问的内容是否是经过授权的；**
3. **请求是否触发了某些限制规则，比如限流限速等；**
4. **请求应该转发给哪个上游服务。**

经过这一系列步骤，这个请求要么不符合预设的规则被拒绝，要么经过了层层处理正确到达指定的上游服务中。我们将这些处理规则称之为 API 网关的策略。这些规则由网关的管理员在网关运行时不断添加至网关中，网关接受这些规则并根据这些规则作出正确的流量处理行为。

以 API 网关 [Apache APISIX](https://apisix.apache.org/) 为例，APISIX 的配置信息有两种：网关启动用的配置文件，比如 `config.yaml`，这个文件决定了网关正常启动所必须的一些配置。另外在运行时管理员可以通过 [Admin API](https://apisix.apache.org/docs/apisix/admin-api/) 动态创建各种规则与配置，比如 Route、Consumer、Plugin 等等。API 网关的策略就是管理员通过 Admin API 动态创建的各种规则与配置。

本文不再额外描述基本常用场景，而是针对认证授权、安全、流量处理与可观测性这四类 API 网关中重要的场景进行阐述，介绍每种场景下包含的一些 API 网关策略的作用以及使用方法。

## 认证和授权策略

认证可以确认 API 调用者的身份，授权主要限制调用者仅能访问权限内的资源。

![授权调用](https://static.apiseven.com/uploads/2023/01/29/EuHMTBfw_download_image%20%283%29%20%281%29.png)

比如说一位乘客前往车站出行，进入车站之前会使用身份证进行“认证”确认身份，在进入车站后出示车票，经工作人员确认后被“授权”进入某班列车。

认证授权类策略主要目的是保证网关转发到上游服务的所有请求都是经过认证和授权的，不会出现非法请求。并且访问的都是权限范围内的资源。比较常用的策略有下面几种：

### Basic Auth

[基本访问认证](https://en.wikipedia.org/wiki/Basic_access_authentication)策略，这是一种最简单的访问控制技术。一般由用户的 HTTP 代理在发出请求时携带用于认证的请求头，一般为：`Authorization: Basic <credentials>`，credentials 中即包含了用户认证需要的用户 ID 和密码，使用 `:` 隔离。这种方式不需要登陆页面、cookie 等繁杂的设置，仅仅基于请求头中的简单凭据信息进行认证，一般为用户名和密码，配置使用起来较为简单。

携带基本认证的 `cURL` 请求的示例如下，用户名为 `username`，密码为 `password`：

```shell
curl -i -u 'username:password' http://127.0.0.1:8080/hello
```

需要注意的是 `credentials` 中的信息在传输过程中并不会被加密，仅仅做 Base64 编码，所以通常需要和 HTTPS 一起使用来保证密码的安全性。

在网关中实施这一策略后，未携带凭据的请求将无法正常通过网关转发，除非在请求中携带了正确的认证信息，实现了最小成本下为 API 添加了访问验证。

### Key Auth

Key Auth 策略通过在 API 中添加 Key 来限制 API 调用，并识别请求携带的 Key 来进行访问资源的控制。只有携带了正确的 Key 之后的请求才能正常访问，可以在请求头中或 Query 中携带。通常还可以通过这个 Key 来区分不同的 API 调用方，从而可以针对不同的调用方实施不同的其他策略或资源控制。同样的 Key 在 HTTP 中是明文传输的，确保请求使用了 HTTPS 以保证安全。

以 APISIX 的 [key-auth](https://apisix.apache.org/docs/apisix/plugins/key-auth/) 插件为例，插件需要通过 Admin API 创建一个具有唯一 key 值的 Consumer：

```shell
curl http://127.0.0.1:9180/apisix/admin/consumers \
-H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
    "username": "jack",
    "plugins": {
        "key-auth": {
            "key": "jack-key"
        }
    }
}'
```

这一请求创建了一个名字为 `jack` 的 Consumer，它的 key 值为 `jack-key`。在路由中启用插件时需要配置网关从请求中读取 Key 值的位置和字段名称。默认的配置位置为 `header` ，字段名称为 `apikey`， 那么正确的请求这个路由的示例为：

```shell
curl -i http://127.0.0.1:8080/hello -H 'apikey: jack-key'
```

APISIX 在收到这一请求后会从请求中解析出 Key，然后从配置的所有 Key 中找到和这个请求匹配的 Consumer `jack`，这样网关就清楚这个请求是 `jack` 发出的。如果没有找到匹配的 Key 即可判定为非法请求。

### JSON Web Token（JWT）

JSON Web Token (JWT) 是一个开放的[标准](https://www.rfc-editor.org/rfc/rfc7519)，它定义了一种以 json 对象形式在各方之间安全传递信息的方式。JWT 策略可以集认证和授权于一身，在用户取得授权后会向用户传输一个 JWT Token，在后面的所有请求中调用方都会携带这个 Token 从而保证请求是被授权的。

在 API 网关中可以通过 JWT 策略将 [JWT](https://jwt.io/) 身份验证能力添加到网关中，从而把这层逻辑从业务中抽离出来，业务实现者可以更加专注实现业务逻辑。以 APISIX 的 [jwt-auth](https://apisix.apache.org/zh/docs/apisix/plugins/jwt-auth/) 插件为例，插件需要在 Consumer 中启用并配置唯一的 Key、加密用的公私钥、加密算法、Token 过期时间等。同时还需要在路由中启用这一插件并配置网关读取 Token 的位置和字段，比如 header、query、cookie 等。该插件会在 API 网关中添加一个 API 用于签发 Token。在发送请求之前需要请求签发 token 的 API 获得 Token，发送请求时需要根据配置信息在指定的位置上携带这一 Token。在请求到达网关后网关会按照配置信息从请求的指定位置读取 Token 并验证 Token 的有效性，验证通过后该请求才能被转发至上游服务。

相较于前两种策略，JWT 策略包含了过期时间选项，签发的 Token 随着时间流逝是可以过期的，但是 Basic Auth 和 Key Auth 的有效期是永久的，除非服务端更换了密码或 Key。除此之外 JWT 策略可以在多个服务之间公用，尤其是针对单点登录场景下很有用。

### OpenID Connect

[OpenID Connect](https://openid.net/connect/) 是建立在 OAuth2.0 协议之上的身份认证方法，为应用的授权提供了比较完整的方案，API 网关中的 OpenID Connect 策略将允许上游服务从身份提供者（IdP）中获取请求中的用户信息，从而保护 API 安全。常见的身份提供者有 Keycloak、Ory Hydra、Okta、Auth0 等等。以 Apache APISIX 为例网关中的 [OpenID Connect](https://apisix.apache.org/docs/apisix/plugins/openid-connect/) 策略工作流程如下：

![工作流程](https://static.apiseven.com/uploads/2023/01/29/zagxMPz1_download_image%20%285%29%20%281%29.png)

1. 客户端向网关发出请求
2. 网关收到请求后向 IdP 发出认证请求
3. 用户将被重定向到 IdP 提供的页面完成登陆认证
4. IdP 重定向到网关并携带认证 code
5. 网关通过 code 向 IdP 请求 Access Token 从而获取用户信息
6. 网关向上游转发请求时即可携带用户信息

通过这一流程可以将认证和鉴权从业务中独立出来放置于网关中解决，使架构更加清晰。关于更多 APISIX 的认证授权方法可以参考 [API Gateway Authentication](https://api7.ai/blog/api-gateway-authentication)。

## 安全策略

API 网关安全策略像门卫一样保证 API 安全访问，允许正常请求被网关转发并在网关上拦截非法请求。根据 [OWASP API Security Project](https://owasp.org/www-project-api-security/)，在 API 的调用者中存在着大量可能的威胁和攻击。使用 API 网关安全策略可以对所有的 API 请求进行安全验证，在 API 免于遭受这些安全威胁上起到了重要作用。

![安全策略](https://static.apiseven.com/uploads/2023/01/29/g7IiXUK8_download_image%20%286%29%20%281%29.png)

以下是几种比较重要的 API 网关安全策略。

### IP 访问限制

IP 限制策略通过将某些 IP 或 [CIDR](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) 设置为白名单或者黑名单来限制某些客户端对 API 的访问，确保重要数据不会被随意访问。正确配置这一策略很大程度上提高了 API 的安全性，实现了更高的 API 安全治理。

### URI 拦截

URI 拦截策略主要通过设置 URI 的一些规则来阻止潜在的危险 API 请求。比如一些安全攻击通过嗅探 URI 路径从而发现潜在的安全漏洞进而攻击。

Apache APISIX 提供了 `uri-blocker` 插件来提供这一能力。通过 [uri-blocker](https://apisix.apache.org/docs/apisix/plugins/uri-blocker/) 插件可以设置一些正则规则，如果请求命中规则就可以拦截当前用户的请求，例如设置 `root.exe`、`admin` ，这一插件就可以阻止 `*/root.exe` 和 `*/admin` 这种类似的请求，进一步保护 API 安全。

### CORS

CORS 即浏览器针对跨域请求作出的安全策略。一般情况下在浏览器中发出 xhr 请求前浏览器会验证请求地址和当前地址是否为[同一域](https://developer.mozilla.org/en-US/docs/Glossary/Origin)，如果在同一域下请求可以直接发出，否则浏览器会先出发一个 OPTION 类型的跨域预检请求，然后在该请求的响应头中会有 CORS 相关的设置，例如允许跨域请求的方法、允许请求携带的凭据等。浏览器会根据这些信息决定是否发出正式的请求，详细可以参考 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)。

一般情况下包含 CORS 设置的响应是由后端服务设置的，但是如果服务数量很多，在网关层面针对不同服务统一处理会更加便捷安全。CORS 策略可以在不同的 API 上设置不同的跨域解决策略，上游服务无需再处理这些逻辑。

### CSRF

[CSRF](https://owasp.org/www-community/attacks/csrf) 即跨站请求伪造攻击，通常情况下会使终端用户在他们已经认证的站点中执行非自愿的动作。这种攻击通常伴随着社会工程学（通过电子邮件向攻击者发送攻击链接），当用户点击这一链接后利用攻击者在网站中已登陆认证的身份执行攻击操作。在网站看来因为用户已经登陆，所以所做的任何操作都是正常的。

通常网站的后端服务需要添加额外的中间件处理这部分逻辑，防范的方法也都有统一的标准。使用 CSRF 策略可以为网关提供防范这一攻击的能力，在网关层统一做 CSRF 安全处理，简化上游服务逻辑复杂度。

## 流量处理策略

流量处理策略主要保证 API 网关进行流量转发的上游负载都在健康范围内，同时在请求转发前或者返回给调用者前对请求进行按需改写。这一类型的策略主要围绕限流限速、熔断、缓存、重写等功能展开。

### 限流限速

在资源有限的情况下，API 可以提供的服务能力是有一定限度的，如果调用超过了这一限制可能会使上游服务崩溃继而引起一些连锁反应。限流限速可以防范这种情况的发生，另一方面也可以有效防止 API 遭受 DDOS 攻击。

在限流限速策略中可以设置一个时间窗口和可允许最大的请求数量，在时间窗口内超过这个数量的请求会被拒绝并返回设置的信息，直到请求数量低于设定的值或到下一个时间窗口后会允许继续访问。

请求计数的凭据可以设置为请求中的变量或着某一个请求头等，例如根据不同的 IP 设置相应的限速策略。实现更加灵活的控制。

### 熔断

API 熔断策略可以为上游服务提供熔断能力，使用这一策略时需要设置上游服务健康和不健康的状态码，用于网关判断上游服务状态。另外还需要设置触发熔断或者恢复健康的请求次数，连续达到这一次数后即判定为对应的状态。当上游服务连续向网关返回一定次数的不健康状态码后，网关就会熔断该上游服务一段时间，在这段时间内不再向该上游转发请求而是由网关直接返回错误。可以防止上游服务因为错误后继续接收请求出现 “雪崩”，保护业务服务。超过这一时间后网关会再次尝试向上游转发请求，如果还是返回不健康的状态码，网关就会继续熔断更长的时间（加倍）。直到转发请求后上游连续返回了一定次数的健康状态码，则网关认为上游服务恢复健康，后续会继续往该上游节点转发流量。

在这个策略中还需要设置当不健康后需要返回的状态码和信息，当上游服务不健康后请求在网关层面直接返回，保护业务服务稳定。

### 流量拆分

流量拆分策略可以动态控制将流量按比例转发给不同的上游服务，这在[灰度发布](https://en.wikipedia.org/wiki/Feature_toggle#Canary_release)或[蓝绿发布](https://en.wikipedia.org/wiki/Blue-green_deployment)中非常有用。

灰度发布又名金丝雀发布，当服务发布新功能时可以仅让一部分请求使用新的服务，另一部分仍然停留在旧的服务中。如果新服务保持稳定，则可以增加比例逐步将所有请求转移到新的服务中，直至比例完全切换，完成服务升级。

蓝绿发布则是另一种发布模式，可以做到在用户使用的高峰期进行发布，同时不会中断服务。服务的旧版本和新版本会同时共存。一般会将生产环境（蓝色）复制到一个相同但是单独的容器中（绿色）。在绿色环境中发布新的更新，之后将绿色和蓝色一同发布至生产环境。之后就可以在绿色环境中进行测试和修复，在这期间用户访问的还是蓝色系统。之后可以使用某些负载均衡策略将请求重定向到绿色环境中。蓝色环境即可保持待机作为灾难恢复选项或者用作下一次更新。

APISIX 的  [traffic-split](https://apisix.apache.org/docs/apisix/plugins/traffic-split/)  插件通过流量拆分对上述提到的两种发布类型都进行了很好的支持，使得业务部署更加便捷可靠。

### 请求重写

在现代微服务架构中，尤其是服务端与服务、服务与服务之间充斥各种不同的协议，或着请求数据格式不统一，这些问题如果单独在各自服务之间实现转换处理会产生很多冗余的逻辑代码并且难以管理。一些请求重写策略可以处理一些协议转换、请求体改写等逻辑。

APISIX 提供了 [response-rewrite](https://apisix.apache.org/docs/apisix/plugins/response-rewrite/) 插件可以用来修改上游服务返回的 Body 或者 Header 信息内容，支持添加或者删除响应头，设置规则修改响应体等。这在设置 CORS 响应头实现跨域请求设置或者设置 Location 实现重定向等场景中很有用。

另一方面，对于请求重写 APISIX 则提供了 [proxy-rewrite](https://apisix.apache.org/docs/apisix/plugins/proxy-rewrite/) 插件也可以处理代理到上游服务的请求内容，可以对请求的 URI、方法、请求头等重写，在很多场景下为业务处理提供了便捷。

### 故障注入

故障注入测试是一种软件测试方法，通过在系统中故意引入错误来确保系统的行为正常。通常在部署之前进行测试以保证在生产环境中没有潜在的故障。在一些混沌测试场景下，需要对服务注入一些错误来验证服务的可靠性。

软件的故障注入可以分为编译时注入和运行时注入。编译时注入指在编写软件的过程中通过改变某些代码或逻辑来实现；运行时注入通过向正在运行的软件环境中设置错误来测试软件的行为。故障注入策略可以在网关中以运行时注入的方式，模拟应用网络请求中的故障。通过在策略中设置一个比例，命中这个比例内的请求会执行设置好的故障逻辑，比如延迟时间返回，或直接返回设置的错误码和错误信息给调用方。

通过这种方式可以增加软件的适应性，让开发人员提前看到可能出现的一些错误情况，在发布之前针对问题做出适应性修改。

### 协议转换

协议转换类的策略可以做一些常见协议之间的转换。比如常见的 HTTP 请求和 gRPC 之间的转换。Apache APISIX 提供了 [grpc-transcode](https://apisix.apache.org/zh/docs/apisix/plugins/grpc-transcode/) 插件可以实现在网关接收到 HTTP 请求之后，将请求转码并转发给 gRPC 类型的服务，接收到响应后以 HTTP 的格式返回给客户端。这样客户端无需关注上游 gRPC 的类型，只处理 HTTP 即可。

## 可观测性策略

可观测性指在一个系统中通过系统的输出数据来衡量这个系统运行状态的能力。在一些简单的系统中，因为系统组件数量相对较少，出现问题时可以通过分析各个组件状态得到答案。但是在大型分布式系统中，各种微服务组件数量非常大，对组件一一进行排查显然是不现实的，这个时候就需要系统具备可观测性。可观测性提供了对分布式系统的“可见性”，当系统出现问题时它可以提供工程师所需的控制能力，准确定位问题。

![输出数据类型](https://static.apiseven.com/uploads/2023/01/29/JMvtNbzD_download_image%20%287%29%20%281%29.png)

可观测性的数据收集可以在应用程序组件内实现，也可以在其他位置实现。API 网关作为所有流量的入口，在 API 网关中实现系统的可观测性，可以清晰反映出系统 API 的使用情况。API 网关的可观测性策略可以帮助到公司的每个团队：

* 工程师团队可以监控并解决 API 问题；
* 产品团队可以了解 API 的使用情况以挖掘背后的商业价值；
* 销售和增长团队可以监控 API 使用情况，观察商业机会并确保 API 提供正确的数据。

可观测性策略根据输出的数据类型一般分为三类：Tracing，Metrics 和 Logging。

### Tracing

在大型分布式系统中服务之间的调用关系错综复杂，Tracing（链路追踪）可以在分布式应用中追踪完整的调用链路、应用之间的依赖分析以及请求统计等内容。在系统出现问题时可以帮助工程师确定排查范围和位置。

Tracing 策略可以在 API 网关上集成一些其他的分布式调用链路追踪系统，收集信息并记录。常见的服务比如 Zipkin、SkyWalking 等。通过 Tracing 策略将这些服务集成到 API 网关中，实现在网关上数据收集和与这些服务之间的通信，可以帮助工程师解决诸如这个请求接触了什么服务以及引入了多少延迟等问题。Tracing 策略使工程师能够进一步确认在特定的会话或相关的 API 调用中要看哪些日志，确认排查范围。

### Metrics

Metrics 指在服务运行期间收集到的一个时间间隔内软件自己的各种观测数据，这些数据默认是结构化的，可以更好地实现查询和可视化。通过对这些数据分析可以掌握系统当下的运行状态和行为。

Metrics 策略可以在 API 网关中集成 Prometheus 或 Datadog 这一类服务，为系统提供监控、报警等能力。这一策略通过 API 网关中的各种接口收集网关运行过程中的数据，并将数据上报至上述服务中。通过将这些数据可视化后开发者可以清晰看到网关的运行状态，API 请求的统计信息等数据统计图。

### Logging

日志是在某个特定时间系统事件的文本记录，当系统出现问题时日志是首要排查的地方。当服务出现一些意外情况时工程师依赖日志内容查看系统“发生了什么”从而找出对应的解决方法。日志内容一般分为两类：API 请求日志和网关自身的运行日志。API 请求日志记录了 API 网关在运行期间所有的 API 请求记录，通过这些记录工程师可以掌握 API 访问情况，及时发现并排查异常请求。网关自身的运行日志则包含了网关在工作期间发生的所有事件的记录，当 API 网关自身出现异常时可以作为排查问题的重要依据。

Logging 策略可以将 API 网关中的日志存储在服务器磁盘中或是推送到一些其他的日志服务器中，比如 HTTP 日志服务器、TCP 日志服务器、UDP 日志服务器等，或者是其他的日志系统比如 Apache Kafka、Apache RocketMQ、Clickhouse 等。

## 总结

这篇文章介绍了什么是 API 网关策略，并针对认证授权、安全、流量处理与可观测性这四类 API 网关中常用的策略进行描述。API 网关在所有上游服务之前接收请求的流量，控制一个请求是否要转发以及如何进行转发，对不安全的、未授权的请求直接拒绝或进行限制，这些行为都可以由 API 网关策略决定。
