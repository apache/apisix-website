---
title: "使用 APISIX openid-connect 插件进行集中身份认证"
slug: 2021/08/25/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication
authors:
  - name: "朱欣欣"
    title: "Author"
    url: "https://github.com/starsz"
    image_url: "https://avatars.githubusercontent.com/u/25628854?v=4"
  - name: "曾奕霖"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords:
- API 网关
- APISIX
- Apache APISIX
- Okta
- 集中认证
description: 通过云原生 API 网关 Apache APISIX 的 openid-connect 插件，你可以快速对接集中式认证软件 OKat，以简化应用开发流程及提高业务的安全性，保护后端的应用。
tags: [Authentication, Plugins, Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/openid%20connect.png
---

> 相比较传统认证模式，集中认证模式下有如下优点：第一，简化应用开发流程，降低开发应用工作量和维护成本，避免各个应用重复开发身份认证代码；第二，提高业务的安全性，集中身份认证模式在网关层面能够及时拦截未经身份认证的请求，保护后端的应用。

<!--truncate-->

## 什么是 Apache APISIX

[Apache APISIX](https://apisix.apache.org/) 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 不仅支持插件动态变更和热插拔，而且拥有众多实用的插件。Apache APISIX 的 OpenID Connect 插件支持 OpenID，用户可以使用该插件将身份认证从传统认证模式替换为集中认证模式。

## 什么是身份认证

身份认证是指通过一定的手段，对用户的身份进行验证。应用通过身份认证识别用户身份，并根据用户身份 ID 从身份提供方（Identity Provider）获取详细的用户元数据，并以此判断用户是否拥有访问指定资源的权限。身份认证模式分为两大类：**传统认证模式**和**集中认证模式**。

### 传统认证模式

在传统认证模式下，各个应用服务需要单独支持身份认证，例如当用户未登录时访问登录接口，接口返回 301 跳转页面。应用需要开发维护 Session 以及和身份提供商的认证交互等逻辑。传统认证模式的流程如下图所示：首先由用户发起请求（request），然后由网关接收请求并将其转发至对应的应用服务，最后由应用服务与身份提供方对接，完成身份认证（authorization）。

![传统认证模式流程图](https://static.apiseven.com/202108/1639467045776-715e1805-540b-4cef-87c5-6166e2af43a8.png)

### 集中认证模式

与传统认证模式不同，集中身份认证模式把用户认证从应用服务中抽离了出来，以 Apache APISIX 为例，集中认证的流程如下图所示：首先由用户发起请求（request），然后由前置的网关负责用户认证流程，与身份提供方对接，向身份提供方发送身份认证（authorization）请求。身份提供方返回用户身份信息（user info）。网关完成用户身份识别后，将用户身份信息通过请求头的形式转发至后端应用。

![集中认证模式流程图](https://static.apiseven.com/202108/1639467122244-d4292436-c5ce-48f6-b1d5-67645f24fbc9.png)

相比较传统认证模式，集中认证模式下有如下优点：

1. 简化应用开发流程，降低开发应用工作量和维护成本，避免各个应用重复开发身份认证代码。
2. 提高业务的安全性，集中身份认证模式在网关层面能够及时拦截未经身份认证的请求，保护后端的应用。

## 什么是 OpenID

OpenID 是一种集中认证模式，它是一个去中心化的身份认证系统。使用 OpenID 的好处是，用户只需要在一个 OpenID 身份提供方的网站上注册和登录，使用一份账户密码信息即可访问不同应用。Okta 是一个常见的 OpenID 身份提供方，Apache APISIX OpenID Connect 插件支持 OpenID，所以用户可以使用该插件将传统认证模式替换为集中认证模式。

### OpenID 认证过程

OpenID 认证过程有以下 7 个步骤，如下图所示。

1. APISIX 向 Identity Provider 发起认证请求。
2. 用户在 Identity Provider 上登录并认证身份。
3. Identity Provider 携带 Authorization Code 返回 APISIX。
4. APISIX 使用从请求参数中提取到的 Code 请求 Identity Provider。
5. Identity Provider 向 APISIX 发送应答消息，里面包含了 ID Token 和 Access Token。
6. APISIX 将 Access Token 发送到 Identity Provider 的 User Endpoint，以进行获取用户身份。
7. 通过认证后，User Endpoint 将 User info 发送到 APISIX，完成身份验证。

![OpenID 认证流程图](https://static.apiseven.com/202108/1639467187923-71854ddb-65fd-4a90-8bd0-242b47a8624b.png)

## 如何使用 Apache APISIX 的 OpenID Connect 插件配置 Okta 认证

使用 Apache APISIX OpenID Connect 插件配置 Okta 认证的过程非常简单，只需三步即可完成 Okta 配置 ，从传统身份认证模式切换到集中身份认证模式。下文讲述了使用 Apache APISIX 的 OpenID Connect 插件配置 Okta 认证的操作步骤。

### 前提条件

已有 Okta 账号。

### 步骤一：配置 Okta

1. 登录你的 Okta 账号，并创建一个 Okta 应用，选择 OIDC 登录模式以及 Web Application 应用类型。
    ![创建一个 Okta 应用](https://static.apiseven.com/202108/1639467243454-ac16645a-4a8a-426f-93a2-e840cae3c502.png)
    ![选择 OIDC 登录模式以及 Web Application 应用类型](https://static.apiseven.com/202108/1639467299429-0ea741a7-95fd-43b5-a0c4-25a7026e62d2.png)
2. 设置登录和登出的跳转 URL。
其中 “Sign-in redirect URIs” 为登录成功允许跳转的链接地址，“Sign-out redirect URIs” 表示登出之后跳转的链接地址。在这个示例中，我们将登录成功跳转和登出之后跳转的链接地址都设置为 `http://127.0.0.1:9080/`。
    ![设置登录和登出的跳转 URL](https://static.apiseven.com/202108/1639467390099-e9594a05-7e78-4f20-a902-7c4ca2c302fb.png)
3. 完成设置以后，单击“Save”保存修改。
    ![保存修改](https://static.apiseven.com/202108/1639467449049-628d7796-0d8e-4ed9-8334-5ba7f0fb32f4.png)
4. 访问应用的 General 页面，获取以下配置，配置 Apache APISIX OpenID Connect 时需要提供这些信息：

- Client ID：OAuth client ID，即应用的 ID，与下文的 `client_id`  和 `{YOUR_CLIENT_ID}` 对应。
- Client secret：OAuth client secret，即应用密钥，与下文的 `client_secret`  和 `{YOUR_CLIENT_SECRET}` 对应。
- Okta domain：应用使用的域名，与下文的 discovery  中的 `{YOUR_ISSUER}` 对应。

![获取配置信息](https://static.apiseven.com/202108/1639467501106-d95bf8ad-db47-4918-ac70-424b12488e5b.png)

### 安装 Apache APISIX

你可以通过源码包、Docker、Helm Chart 等多种方式来安装 Apache APISIX。

#### 安装依赖

Apache APISIX 的运行环境需要依赖 NGINX 和 etcd，所以在安装 Apache APISIX 前，请根据您使用的操作系统安装对应的依赖。我们提供了 CentOS7、Fedora 31 & 32 、Ubuntu 16.04 & 18.04、 Debian 9 & 10 和 MacOS 上的依赖安装操作步骤，详情请参考[安装依赖](https://apisix.apache.org/zh/docs/apisix/install-dependencies/)。

通过 Docker 或 Helm Chart 安装 Apache APISIX 时，已经包含了所需的 NGINX 和 etcd，请参照各自对应的文档。

#### 通过 RPM 包安装（CentOS 7）

这种安装方式适用于 CentOS 7 操作系统，请运行以下命令安装 Apache APISIX。

```shell
sudo yum install -y https://github.com/apache/apisix/releases/download/2.7/apisix-2.7-0.x86_64.rpm
```

#### 通过 Docker 安装

详情请参考：[使用 Docker 安装 Apache APISIX](https://hub.docker.com/r/apache/apisix)。

#### 通过 Helm Chart 安装

详情请参考：[使用 Helm Chart 安装 Apache APISIX](https://github.com/apache/apisix-helm-chart)。

#### 通过源码包安装

1. 创建一个名为 `apisix-2.7` 的目录：
  
  ```shell
  mkdir apisix-2.7
  ```

2. 下载 Apache APISIX Release 源码包：
  
  ```shell
  wget https://downloads.apache.org/apisix/2.7/apache-apisix-2.7-src.tgz
  ```

  您也可以通过 Apache APISIX 官网下载 Apache APISIX Release 源码包。 Apache APISIX 官网也提供了 Apache APISIX、APISIX Dashboard 和 APISIX Ingress Controller 的源码包，详情请参考 [Apache APISIX 官网-下载页](https://apisix.apache.org/zh/downloads)。

3. 解压 Apache APISIX Release 源码包：
  
  ```shell
  tar zxvf apache-apisix-2.7-src.tgz -C apisix-2.7
  ```

4. 安装运行时依赖的 Lua 库：

  ```shell
  # 切换到 apisix-2.7 目录
  cd apisix-2.7
  # 创建依赖
  make deps
  ```

#### 初始化依赖

运行以下命令初始化 NGINX 配置文件和 etcd。

```shell
# initialize NGINX config file and etcd
make init
```

### 启动 Apache APISIX 并配置对应的路由

1. 运行以下命令，启动 Apache APISIX。

2. 创建路由并配置 OpenID Connect 插件。

OpenID Connect 配置列表如下：

|字段|默认值|描述|
| :------| :------------ | :------- |
|client_id|""|OAuth 客户端 ID|
|client_secret|""|OAuth 客户端密钥|
|discovery|""|身份提供商的服务发现端点|
|scope|openid|需要访问资源范围|
|relm|apisix|指定 WWW-Authenticate 响应头验证信息|
|bearer_only|false|是否检查请求头中的 token|
|logout_path|/logout|登出的 URI|
|redirect_uri|request_uri|身份提供商跳转回来的 URI，默认为请求地址|
|timeout|3|请求超时时间，单位为秒|
|ssl_verify|false|是否身份提供商的校验 ssl 证书|
|introspection_endpoint|""|身份提供商的令牌验证端点的 URL，不填则将从 discovery 响应中提取|
|introspection_endpoint_auth_method|client_secret_basic|令牌自省的认证方法名称|
|public_key|""|验证令牌的公钥|
|token_signing_alg_values_expected|""|验证令牌的算法|
|set_access_token_header|true|是否在请求头中携带 access token|
|access_token_in_authorization_header|false|true 时将 access token 放置在 Authorization 头中，false 时将 access token 放置在 X-Access-Token 头中|
|set_id_token_header|true|是否将 ID token 携带至 X-ID-Token 请求头|
|set_userinfo_header|true|是否将用户信息携带至 X-Userinfo 请求头|

以下代码示例通过 Apache APISIX Admin API 进行创建路由，设置路由的上游为 httpbin.org。httpbin.org 是一个简单的用于接收请求和响应请求的后端服务，下文将使用 httpbin.org 的 get 页面，参考 [http bin get](http://httpbin.org/#/HTTP_Methods/get_get)。

具体配置项请参考 [Apache APISIX OpenID Connect Plugin](https://apisix.apache.org/zh/docs/apisix/plugins/openid-connect/)。

```shell
curl  -XPOST 127.0.0.1:9080/apisix/admin/routes -H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" -d '{
    "uri":"/*",
    "plugins":{
        "openid-connect":{
            "client_id":"{YOUR_CLIENT_ID}",
            "client_secret":"{YOUR_CLIENT_SECRET}",
            "discovery":"https://{YOUR_ISSUER}/.well-known/openid-configuration",
            "scope":"openid profile",
            "bearer_only":false,
            "realm":"master",
            "introspection_endpoint_auth_method":"client_secret_post",
            "redirect_uri":"http://127.0.0.1:9080/"
        }
    },
    "upstream":{
        "type":"roundrobin",
        "nodes":{
            "httpbin.org:80":1
        }
    }
}'
```

### 步骤四：访问 Apache APISIX

1. 访问 http://127.0.0.1:9080/get ，因为开启了 OpenID Connect 插件，所以页面被重定向到 Okta 登录页面。
  
![visit Okta login page](https://static.apiseven.com/202108/1639467566395-2a049b96-3b1f-4e74-93f0-d6ea2f52a72e.png)
  
2. 输入用户在 Okta 注册的账号密码，单击“Sign in”，登录 Okta 账户。

3. 登录成功之后，能成功访问到 httpbin.org 中的 get 页面。该 httpbin.org/get 页面将返回请求的数据如下：

  ```sh
  "X-Access-Token": "******Y0RPcXRtc0FtWWVuX2JQaFo1ZVBvSlBNdlFHejN1dXY5elV3IiwiYWxnIjoiUlMyNTYifQ.***TVER3QUlPbWZYSVRzWHRxRWh2QUtQMWRzVDVGZHZnZzAiLCJpc3MiOiJodHRwczovL3FxdGVzdG1hbi5va3RhLmNvbSIsImF1ZCI6Imh0dHBzOi8vcXF0ZXN0bWFuLm9rdGEuY29tIiwic3ViIjoiMjgzMDE4Nzk5QHFxLmNvbSIsImlhdCI6MTYyODEyNjIyNSwiZXhwIjoxNjI4MTI5ODI1LCJjaWQiOiIwb2ExMWc4ZDg3TzBGQ0dYZzY5NiIsInVpZCI6IjAwdWEwNWVjZEZmV0tMS3VvNjk1Iiwic2NwIjpbIm9wZW5pZCIsInByb2Zpb***.****iBshIcJhy8QNvzAFD0fV4gh7OAdTXFMu5k0hk0JeIU6Tfg_Mh-josfap38nxRN5hSWAvWSk8VNxokWTf1qlaRbypJrKI4ntadl1PrvG-HgUSFD0JpyqSQcv10TzVeSgBfOVD-czprG2Azhck-SvcjCNDV-qc3P9KoPQz0SRFX0wuAHWUbj1FRBq79YnoJfjkJKUHz3uu7qpTK89mxco8iyuIwB8fAxPMoXjIuU6-6Bw8kfZ4S2FFg3GeFtN-vE9bE5vFbP-JFQuwFLZNgqI0XO2S7l7Moa4mWm51r2fmV7p7rdpoNXYNerXOeZIYysQwe2_L****",
  "X-Id-Token": "******aTdDRDJnczF5RnlXMUtPZUtuSUpQdyIsImFtciI6WyJwd2QiXSwic3ViIjoiMDB1YTA1ZWNkRmZXS0xLdW82OTUiLCJpc3MiOiJodHRwczpcL1wvcXF0ZXN0bWFuLm9rdGEuY29tIiwiYXVkIjoiMG9hMTFnOGQ4N08wRkNHWGc2OTYiLCJuYW1lIjoiUGV0ZXIgWmh1IiwianRpIjoiSUQuNGdvZWo4OGUyX2RuWUI1VmFMeUt2djNTdVJTQWhGNS0tM2l3Z0p5TTcxTSIsInZlciI6MSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMjgzMDE4Nzk5QHFxLmNvbSIsImV4cCI6MTYyODEyOTgyNSwiaWRwIjoiMDBvYTA1OTFndHAzMDhFbm02OTUiLCJub25jZSI6ImY3MjhkZDMxMWRjNGY3MTI4YzlmNjViOGYzYjJkMDgyIiwiaWF0IjoxNjI4MTI2MjI1LCJhdXRoX3RpbWUi*****",
  "X-Userinfo": "*****lfbmFtZSI6IlpodSIsImxvY2FsZSI6ImVuLVVTIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMjgzMDE4Nzk5QHFxLmNvbSIsInVwZGF0ZWRfYXQiOjE2MjgwNzA1ODEsInpvbmVpbmZvIjoiQW1lcmljYVwvTG9zX0FuZ2VsZXMiLCJzdWIiOiIwMHVhMDVlY2RGZldLTEt1bzY5NSIsImdpdmVuX25hbWUiOiJQZXRlciIsIm5hbWUiOiJQZXRl****"
  ```

其中：

**X-Access-Token**：Apache APISIX 将从用户提供商获取到的 access token 放入 X-Access-Token 请求头，可以通过插件配置中的 access_token_in_authorization_header 来选择是否放入 Authorization 请求头中。

![X-Access-Token](https://static.apiseven.com/202108/1639467626264-980605e2-0b21-4512-9e2c-af71950fcf99.png)

**X-Id-Token**：Apache APISIX 将从用户提供商获取到的 ID token 通过 base64 编码之后放入 X-Id-Token 请求头，可以通过插件配置中的 set_id_token_header 来选择是否开启该功能，默认为为开启状态。

![X-Id-Token](https://static.apiseven.com/202108/1639467682902-ada726b8-b46b-460d-8313-ef47b38d13ab.png)

**X-Userinfo**：  Apache APISIX 将从用户提供商获取到的用户信息，通过 base64 编码之后放入 X-Userinfo，你可以通过插件配置中的 set_userinfo_header 来选择是否开启该功能，默认为开启状态。

![X-Userinfo](https://static.apiseven.com/202108/1639467730566-fc8a8a76-a3aa-4b8e-bb13-505b50839877.png)

由此可以看到，Apache APISIX 将会携带 X-Access-Token,X-Id-Token,X-Userinfo 三个请求头传递至上游。上游可以通过解析这几个头部，从而获取到用户 ID 信息和用户的元数据。

我们展示了在 Apache APISIX 中直接建立来自 Okta 的集中式身份认证的过程。只要注册一个免费的 Okta 开发者账户就可以轻松开始了。这种集中认证的方法减少了开发者的学习和维护成本，提供了安全和精简的用户体验。

## 关于 Okta

Okta 是一个可定制的、安全的集中身份认证解决方案。Okta 可以为您的应用程序添加认证和授权。不需要自己编写代码，即可在您的应用程序中直接获得可扩展的认证。您可以将应用程序连接到 Okta，并定义用户的登录方式。每次用户尝试认证时，Okta 都会验证他们的身份，并将所需信息发回给您的应用程序。

## 关于 Apache APISIX

Apache APISIX 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。你可以使用 Apache APISIX 处理传统的南北向流量，以及服务间的东西向流量，也可以当做 [Kubernetes Ingress Controller](https://github.com/apache/apisix-ingress-controller) 来使用。

全球已有数百家企业使用 Apache APISIX 处理关键业务流量，涵盖金融、互联网、制造、零售、运营商等等，比如美国航空航天局（NASA）、欧盟的数字工厂、中国航信、中国移动、腾讯、华为、微博、网易、贝壳找房、360、泰康、奈雪的茶等等。

Github：https://github.com/apache/apisix

官网：https://apisix.apache.org
