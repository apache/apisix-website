---
title: "如何使用 APISIX 进行集中式身份认证"
author: "朱欣欣"
authorURL: "https://github.com/starsz"
authorImageURL: "https://avatars.githubusercontent.com/u/25628854?v=4"
keywords: 
- APISIX
- API 网关
- 集中式身份认证
- OpenID-Connect 
description: 本文介绍了身份认证的相关概念和身份认证的意义以及使用云原生 API 网关 Apache APISIX 进行集中式身份认证优点，并用实际示例展示了 APISIX 中身份认证的玩法。
tags: [Authentication, Ecosystem]
---

> 本文介绍了 Apache APISIX 的身份认证功能，从重要性和玩法使用上进行了详细介绍。

<!--truncate-->

身份认证在日常生活当中是非常常见的一项功能，大家平时基本都会接触到。比如用支付宝消费时的人脸识别确认、公司上班下班时的指纹/面部打卡以及网站上进行账号密码登录操作等，其实都是身份认证的场景体现。

![概念理解](https://static.apiseven.com/202108/1631004418593-0a46f949-72aa-4cd4-8f38-1988327c92d6.png)

如上图，Jack 通过账号密码请求服务端应用，服务端应用中需要有一个专门用做身份认证的模块来处理这部分的逻辑。请求处理完毕之后，如果使用 JWT Token 认证方式，服务器会反馈一个 Token 去标识这个用户为 Jack。如果登录过程中账号密码输入错误，就会导致身份认证失败。这个场景大家肯定都非常熟悉，这里就不做展开举例了。

## 网络身份认证的意义在哪里

### 安全性

身份认证确保了后端服务的安全性，避免了未经授权的访问，从而确保数据的安全性。比如防止某些黑客攻击，以及一些恶意调用，这些都可以通过身份认证进行阻拦。

### 实用性

从实用性的角度考虑，它可以更方便地记录操作者或调用方。比如上班打卡其实就是通过记录「谁进行了这项操作」来统计员工上班信息。

其次它可以记录访问频率及访问频次。例如记录某用户在最近几分钟中发起请求的频率和频次，可以判断这个用户活跃程度，也可以判断是否为恶意攻击等。

### 功能性

在功能层面，它通过识别身份可以对不同的身份进行不同权限的操作处理。比如在公司里，你的身份权限无法使用某些页面或服务。再细致一点，对不同身份或者不同的 API 接口调用方做一些相关技术上的限制策略，如限流限速等，以此来达到根据不同的用户（调用方）采取不同的功能限制。

## 使用 Apache APISIX 进行集中式身份认证优点

### 从传统到新模式

如下图所示，左侧的图为我们展示了一种比较常见的传统身份认证方法。每一个应用服务模块去开发一个单独的身份认证模块，用来支持身份认证的一套流程处理。但当服务量多了之后，就会发现这些模块的开发工作量都是非常巨大且重复的。

![Apache APISIX 身份认证](https://static.apiseven.com/202108/1631004492221-0721d933-705d-4875-b956-e94a11a45135.png)

这种时候，我们可以通过把这部分的开发逻辑放置到 Apache APISIX 的网关来实现统一，减少开发量。

图右所示，用户或应用方直接去请求 Apache APISIX，然后 Apache APISIX 通过识别并认证通过后，会将鉴别的身份信息传递到上游应用服务。之后上游应用服务就可以从请求头中读到这部分信息，然后进行后续相关工作的处理。

讲完了大概流程，我们来详细罗列下。

### 优点一：配置收敛，统一管理

![Dashboard](https://static.apiseven.com/202108/1631004574541-87b607eb-2971-4c1d-a1d6-74cf4a5fdd42.png)

如上图是一张 APISIX-Dashboard 的界面截图，可以看到路由、Consumer 等数据信息。这里的 Consumer 可以理解为一个应用方，比如可以为应用专门去创建一个 Consumer 并配置相关的认证插件，例如 JWT、Basic-Auth 等插件。当有新的服务出现时，我们需要再创建一个 Consumer，然后将这部分配置信息给配置到第二个应用服务上。

通过集中式身份认证，可以将客户配置进行收敛并统一管理，达到降低运维成本的效果。

### 优点二：插件丰富，减少开发

Apache APISIX 作为一个 API 网关，目前已开启与各种插件功能的适配合作，插件库也比较丰富。目前已经可与大量身份认证相关的插件进行搭配处理，如下图所示。

![API 网关认证插件](https://static.apiseven.com/202108/1631004738218-586e84af-a5ab-4714-845d-4d71b7ba79e3.png)

基础认证插件比如 Key-Auth、Basic-Auth，他们是通过账号密码的方式进行认证。

复杂一些的认证插件如 Hmac-Auth、JWT-Auth。如 Hmac-Auth 通过对请求信息做一些加密，生成一个签名。当 API 调用方将这个签名携带到 Apache APISIX 的网关 Apache APISIX 会以相同的算法计算签名，只有当签名方和应用调用方认证相同时才予以通过。

Authz-casbin 插件是目前 Apche APISIX 与 Casbin 社区正在进行合作开发的一个项目，它的应用原理是按照 Casbin 的规则，去处理一些基于角色的权限管控 (RBAC)，进行 ACL 相关操作。

其他则是一些通用认证协议和联合第三方组件进行合作的认证协议，例如 OpenID-Connect 身份认证机制，以及 LDAP 认证等。

### 优点三：配置灵活，功能强大

功能强大该如何理解，就是 Apache APISIX 中可以针对每一个 Consumer（即调用方应用）去做不同级别的插件配置。

![配置灵活](https://static.apiseven.com/202108/1631004783828-3dd0056c-a6aa-4ab9-b902-7bd2ca545ffe.png)

如上图，我们创建了两个消费者 Consumer A，Consumer B。我们将 Consumer A 应用到`应用1`，则后续`应用1`的访问将会开启 Consumer A 的这部分插件，例如 IP 黑白名单，限制并发数量等。将 Consumer B 应用到`应用2` ，由于开启了 http-log 插件，则`应用2`的访问日志将会通过 HTTP 的方式发送到日志系统进行收集。

## Apache APISIX 中身份认证的玩法

关于 Apache APISIX 身份认证的玩法，这里为大家提供三个阶段的玩法推荐，大家仅作参考，也可以在这些基础上，进行更深度的使用和应用。

### 初级：普通玩法

普通玩法推荐大家基于 Key-Auth、Basic-Auth、JWT- Auth 和 Hmac-Auth 进行，这些插件的使用需要与 Consumer 进行关联使用。

#### 步骤一：创建路由，配置身份认证插件

创建路由，配置上游为 `httpbin.org`，同时开启 `basic-auth` 插件。

![创建路由](https://static.apiseven.com/202108/1631004892467-71c93f8f-dc0e-47fe-a88f-943adb9edbff.png)

#### 步骤二：创建消费者，配置身份信息

创建消费者 foo。在消费者中，我们需要配置用户的认证信息，例如 `username` 为 foo，`password` 为 `bar`。

![创建消费者](https://static.apiseven.com/202108/1631004937828-15ac5d8f-0e45-4c3d-94e8-2b180266b379.png)

#### 步骤三：应用服务携带认证信息进行访问

应用携带 `username:foo` ,`password: bar` 访问 Apache APISIX。Apache APISIX 通过认证，并将请求 Authorization 请求头携带至上游 `httpbin.org` 。由于 `httpbin.org` 中 get 接口会将请求信息返回，因此我们可以在其中观察到请求头 `Authorization`。

![请求携带](https://static.apiseven.com/202108/1631004973305-4b209f79-f7de-41a2-994e-8877a6624d99.png)

### 中级：进阶玩法

进阶模式下，是使用 Apache APISIX 与 OpenID-Connect 插件进行对接第三方认证服务。OpenID-Connect 是一种认证机制，可以采用该认证机制对接用户的用户管理系统或者用户管理服务，例如国内的 Authing 和腾讯云，国外的 Okta 和 Auth0 等。

![第三方认证模式](https://static.apiseven.com/202108/1631005002268-7393b40e-1733-4e66-bc09-742be221efae.png)

具体操作如下，这里使用 Okta 云服务举例：

#### 步骤一：创建 OpenID-Connect 应用

在 Okta 控制台页面创建一个支持 OpenID-Connect 的应用。

![创建](https://static.apiseven.com/202108/1631005022640-1e931b14-8175-47f3-bfb8-46e09cec616b.png)

#### 步骤二：创建路由，配置 OpenID-Connect 插件

创建路由，配置访问的上游地址为 httpbin.org，同时开启 openid-connect 插件，将 Okta 应用的配置填写到 openid-connect 插件中。

![配置插件](https://static.apiseven.com/202108/1631005045489-b637ef9a-c71c-440f-ae58-a93398a4c9dd.png)

#### 步骤三：用户访问时，会跳转至登录页面。登录完成后，上游应用获取用户信息

此时，当用户访问 Apache APISIX 时，会先重定向到 Okta 登录页面。此时需要在该页面填写 Okta 中已经存在的用户的账号密码。登陆完成之后，Apache APISIX 会将本次认证的 Access-Token，ID-Token 携带至上游，同时将本次认证的用户信息以 base64 的方式编码至 Userinfo 请求头，传递至上游。

![APISIX 页面](https://static.apiseven.com/202108/1631005077846-0f877a03-ddcd-46f6-a38d-f046b4700058.png)

## 高级：DIY 玩法

这里提供的 DIY 玩法是利用了 Serverless 插件，这款插件功能丰富，玩法也非常多。大家如果有自己的使用玩法，也欢迎在社区内进行交流。

具体操作流程就是将自己的代码片段通过 Serverless 插件上传到 Apache APISIX，这个过程中 Serverless 插件支持动态配置和热更新。

### 方式一：自定义判断逻辑

![判断逻辑](https://static.apiseven.com/202108/1631005112469-c04868b8-388e-4b81-abcc-d37b6a8951f5.png)

通过请求头、参数等相关信息，来进行一些判断。通过这种做法，我们可以去实现自己的一些规则，比如说结合企业内部的一些认证，或者去写一些自己的业务逻辑。

### 方式二：发起认证鉴权请求

![鉴权请求](https://static.apiseven.com/202108/1631005141578-f90cf948-4913-45cd-a28e-9e697ad197fe.png)

通过 HTTP 库发起一个 HTTP 请求，我们可以利用第三方服务做一些认证、鉴权相关事情，然后解析返回结果。通过这种方式，我们可以做的事情就可以扩展很多。比如对接 Redis 或数据库，只要是通过 TCP 或 UDP 这种形式的，都可以通过 Serverless 插件进行尝试。

### 配置上传

完成自定义代码片之后，我们创建路由，并将代码片配置到 Serverless 插件。后面再通过访问 Apache APISIX 获取相应的信息反馈，测试插件是否生效。

![配置上传](https://static.apiseven.com/202108/1631005184917-bc620c0b-d4c6-43f5-8450-4f5b2b9549e1.png)
