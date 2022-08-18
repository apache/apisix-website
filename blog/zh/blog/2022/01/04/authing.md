---
title: "Apache APISIX 结合 Authing 实现集中式身份认证管理"
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
- Apache APISIX
- Authing
- OpenID Connect
- Authentication
- API Gateway
description: 通过阅读本文，你可以了解集中式身份认证的相关细节，以及如何在 Apache APISIX 中使用 Authing 的具体操作步骤。
tags: [Plugins,Authentication,Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/Authing.png
---

> 通过阅读本文，你可以了解集中式身份认证的相关细节，以及如何在 Apache APISIX 中使用 Authing 的具体操作步骤。

<!--truncate-->

![APISIX-Authing Cover](https://static.apiseven.com/202108/1641274764710-e6f9fe4e-01de-4c7d-b465-fab4202a6475.png)

## 项目介绍

### 关于 Apache APISIX

[Apache APISIX](https://github.com/apache/apisix) 是一个动态、实时、高性能的 API 网关，提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。Apache APISIX 不仅支持插件动态变更和热插拔，而且拥有众多实用的插件。Apache APISIX 的 OpenID Connect 插件支持 OpenID Connect 协议，用户可以使用该插件让 Apache APISIX 对接 Authing 服务，作为集中式认证网关部署于企业中。

### 关于 Authing

[Authing](https://www.authing.cn/) 是国内首款以开发者为中心的全场景身份云产品，集成了所有主流身份认证协议，为企业和开发者提供完善安全的用户认证和访问管理服务。以「API First」作为产品基石，把身份领域所有常用功能都进行了模块化的封装，通过全场景编程语言 SDK 将所有能力 API 化提供给开发者。同时，用户可以灵活的使用 Authing 开放的 RESTful APIs 进行功能拓展，满足不同企业不同业务场景下的身份管理需求。

## 什么是集中式身份认证

### 传统身份认证

在传统认证模式下，各个后端应用服务需要单独开发功能以支持身份认证功能，例如与身份提供商进行交互、获取用户的身份信息等功能。

![传统认证模式流程图](https://static.apiseven.com/202108/1639467045776-715e1805-540b-4cef-87c5-6166e2af43a8.png)

### 集中式身份认证

与传统认证模式不同，集中身份认证模式把用户认证从应用服务中抽离了出来。以 Apache APISIX 为例，集中认证的流程如上图所示：首先由用户发起请求（request），然后由前置的网关负责用户认证流程，与身份提供方对接，向身份提供方发送身份认证（authorization）请求。身份提供方返回用户身份信息（user info）。网关完成用户身份识别后，将用户身份信息通过请求头的形式转发至后端应用。

![集中认证模式流程图](https://static.apiseven.com/202108/1639467122244-d4292436-c5ce-48f6-b1d5-67645f24fbc9.png)

### 集中式身份认证的优点

相比较传统认证模式，集中认证模式下有如下优点：

1. 简化应用开发流程，降低开发应用工作量和维护成本，避免各个应用重复开发身份认证逻辑。
2. 提高业务的安全性，集中身份认证模式在网关层面能够及时拦截未经身份认证的请求，保护后端的应用。

同时结合 Authing 强大的身份认证管理功能，可实现如下功能：

1. 通过控制台对身份认证服务进行生命周期管理，包括创建、启用、禁用等。
2. 提供实时、可视化的应用监控，包括：接口请求次数、接口调用延迟和接口错误信息，并且进行实时告警通知。
3. 集中式日志，可以方便地查看用户登录、登出以及对应用的调整和修改信息。

更多具体内容可参考 [Authing 应用集成网关](https://www.authing.cn/gateway-integration)。

## 如何使用

### 步骤一：配置 Authing

1. 登录 Authing 账号，选择自建应用，并填入应用名称和认证地址。如果你没有 Authing 账号，请访问 [Authing 官网](https://www.authing.cn/)，单击右上角 “登录/注册”，注册一个 Authing 账号。
    ![配置 Authing](https://static.apiseven.com/202108/1641275135400-5a11226a-404d-43f7-bde5-6e1b9599cebd.png)

2. 单击“创建”，创建一个 Authing 应用。
    ![创建 Authing 应用](https://static.apiseven.com/202108/1641275174810-f78469f7-24dd-41c8-bdc7-eb7d5ff58672.png)

3. 设置登录和登出的跳转 URL。在认证过程中，Authing 将会拒绝除配置以外的回调 URL，由于本次为本地测试，所以将登录回调 URL 和登出回调 URL 都设置为 APISIX 访问地址 http://127.0.0.1:9080/ 。
    ![设置登录和登出的跳转 URL](https://static.apiseven.com/202108/1641275642514-65a2205a-22dd-43b2-ba06-e51b249754a8.png)

4. 创建用户（可选）。在用户列表页面，创建用户，账号密码分别为 user1/user1，并且可以在「用户信息-授权管理」页面中设置是否允许应用的访问（默认为允许）。
    ![创建用户](https://static.apiseven.com/202108/1641275703261-ec7d98d4-50ee-428c-b73c-a70002e67dfb.png)
    ![设置访问权限](https://static.apiseven.com/202108/1641275703263-90176798-6bb7-40d5-976f-dfc516db020f.png)

5. 访问应用页面，获取以下配置，配置 Apache APISIX OpenID Connect 时需要提供这些信息：
   1. App ID： OAuth client ID，即应用的 ID。与下文的 `client_id` 和 `{YOUR_CLIENT_ID}` 对应。
   2. App secret：OAuth client secret，即应用密钥。与下文的 `client_secret` 和 `{YOUR_CLIENT_SECRET}` 对应。
   3. 服务发现地址：应用服务发现的地址。与下文的 `{YOUR_DISCOVERY}` 对应。
   ![配置信息](https://static.apiseven.com/202108/1641275800242-e937cfd4-6237-4928-adab-7ec99556bbac.png)

### 步骤二：安装 Apache APISIX

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

### 步骤三：启动 Apache APISIX 并配置对应的路由

1. 运行以下命令，启动 Apache APISIX。

   ```shell
   apisix start
   ```

2. 创建路由并配置 OpenID Connect 插件。OpenID Connect 配置列表如下。

|字段|默认值|使用说明|
|:--------|:--------|:---------------|
|client_id|N/A|OAuth 客户端 ID|
|client_secret|N/A|OAuth 客户端密钥|
|discovery|N/A|身份提供商的服务发现端点|
|scope|openid|需要访问资源范围|
|relm|apisix|指定 WWW-Authenticate 响应头验证信息|
|bearer_only|false|是否检查请求头中的 token|
|logout_path|/logout|登出的 URI|
|redirect_uri|request_uri|身份提供商跳转回来的 URI，默认为请求地址|
|timeout|3|请求超时时间，单位为秒|
|ssl_verify|false|是否身份提供商的校验 ssl 证书|
|introspection_endpoint|N/A|身份提供商的令牌验证端点的 URL，不填则将从 discovery 响应中提取。|
|introspection_endpoint_auth_method|client_secret_basic|令牌自省的认证方法名称|
|public_key|N/A|验证令牌的公钥|
|token_signing_alg_values_expected|N/A|验证令牌的算法|
|set_access_token_header|true|是否在请求头中携带 access token|
|access_token_in_authorization_header|false|true 时将 access token 放置在 Authorization 头中，false 时将 access token 放置在 X-Access-Token 头中。|
|set_id_token_header|false|是否将 ID token 携带至 X-ID-Token 请求头|
|set_userinfo_header|false|是否将用户信息携带至 X-Userinfo 请求头|

以下代码示例通过 Apache APISIX Admin API 进行创建路由，设置路由的上游为 [httpbin.org](http://httpbin.org)。`httpbin.org` 是一个简单的用于接收请求和响应请求的后端服务，下文将使用 `httpbin.org` 的 `get` 页面，参考 [http bin get](http://httpbin.org/#/HTTP_Methods/get_get)。

具体配置项请参考 [Apache APISIX OpenID Connect Plugin](https://apisix.apache.org/zh/docs/apisix/plugins/openid-connect/)。

```shell
curl  -XPOST 127.0.0.1:9080/apisix/admin/routes -H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" -d '{
    "uri":"/*",
    "plugins":{
        "openid-connect":{
            "client_id":"{YOUR_CLIENT_ID}",
            "client_secret":"{YOUR_CLIENT_SECRET}",
            "discovery":"https://{YOUR_DISCOVERY}",
            "scope":"openid profile",
            "bearer_only":false,
            "realm":"apisix",
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

1. 访问 "http://127.0.0.1:9080/get"，由于已经开启了 OpenID Connect 插件，所以页面被重定向到 Authing 登录页面（可在 Authing 控制台中 「应用-品牌化」对该页面进行定制）。
    ![访问 Apache APISIX](https://static.apiseven.com/202108/1641276796088-48cb415e-d5dd-4c15-a3da-ecbb4c987b06.png)

2. 输入用户在 Authing 注册的账号密码，或者在步骤一中创建的用户 user1/user1 ，单击“登录”，登录 Authing 账户。

3. 登录成功之后，能成功访问到 httpbin.org 中的 get 页面。该 httpbin.org/get 页面将返回请求的数据如下：

    ```shell
    ...
    "X-Access-Token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFqeU55aVdVd2NhbUFxdEdVRUNCeFNsTWxQSWtTR2N1NmkyZzhEUk1OSGsifQ.eyJqdGkiOiJjTy16a0pCS0NSRFlHR2kyWkJhY0oiLCJzdWIiOiI2MWM5OGFmOTg0MjI4YWU0OTYyMDU4NTIiLCJpYXQiOjE2NDA1OTg4NTgsImV4cCI6MTY0MTgwODQ1OCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSIsImlzcyI6Imh0dHBzOi8vYXBpc2l4LmF1dGhpbmcuY24vb2lkYyIsImF1ZCI6IjYxYzk4M2M0YjI4NzdkNDg2OWRkOGFjYiJ9.l2V8vDWcCObB1LjIhKs2ARG4J7WuB-0c-bnYZG2GP2zcpl6PMAPcId2B76CaXCU58ajGcfRmOlWJ67UaHrfWKv8IM4vcYN1gwhKdokSyrhEM31gQE-MzNEsEbPaVIGXdpR1N2JnAJK5-tKIjopDAXSwArfO6fQKTpjLhCi3COIA169WGRR4CKCwNzzpFAYP2ilNc18D_HRTBLS6UjxZSNUtWE5dbx7uBjblhwIwn5e1fxiEQcknVK8Dxf8NUliFECvr02HX2hNvmuCECkvA_mZYlshAeqidK8tSEXirAWsWS5jlXFqLiBJkhSHFrbxRyqeOSfJCJR_YcCwk9AzgZGg",
    "X-Id-Token": "eyJhdF9oYXNoIjoiRl8tRjZaUVgtWVRDNEh0TldmcHJmUSIsImJpcnRoZGF0ZSI6bnVsbCwiZmFtaWx5X25hbWUiOm51bGwsImdlbmRlciI6IlUiLCJnaXZlbl9uYW1lIjpudWxsLCJpc3MiOiJodHRwczpcL1wvYXBpc2l4LmF1dGhpbmcuY25cL29pZGMiLCJwaWN0dXJlIjoiaHR0cHM6XC9cL2ZpbGVzLmF1dGhpbmcuY29cL2F1dGhpbmctY29uc29sZVwvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTI3VDA5OjU0OjE3Ljc3M1oiLCJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwibmFtZSI6bnVsbCwiaWF0IjoxNjQwNTk4ODU4LCJuaWNrbmFtZSI6bnVsbCwibm9uY2UiOiJmMTlmZjhjODM5NzdmZjNlMDczMzZmMzg3Y2QxM2EzMSIsIm1pZGRsZV9uYW1lIjpudWxsLCJleHAiOjE2NDE4MDg0NTgsInN1YiI6IjYxYzk4YWY5ODQyMjhhZTQ5NjIwNTg1MiIsImxvY2FsZSI6bnVsbCwiYXVkIjoiNjFjOTgzYzRiMjg3N2Q0ODY5ZGQ4YWNiIiwicHJvZmlsZSI6bnVsbH0=",
    "X-Userinfo": "eyJ3ZWJzaXRlIjpudWxsLCJ6b25laW5mbyI6bnVsbCwibmFtZSI6bnVsbCwicHJvZmlsZSI6bnVsbCwibmlja25hbWUiOm51bGwsInN1YiI6IjYxYzk4YWY5ODQyMjhhZTQ5NjIwNTg1MiIsImxvY2FsZSI6bnVsbCwiYmlydGhkYXRlIjpudWxsLCJmYW1pbHlfbmFtZSI6bnVsbCwiZ2VuZGVyIjoiVSIsImdpdmVuX25hbWUiOm51bGwsIm1pZGRsZV9uYW1lIjpudWxsLCJwaWN0dXJlIjoiaHR0cHM6XC9cL2ZpbGVzLmF1dGhpbmcuY29cL2F1dGhpbmctY29uc29sZVwvZGVmYXVsdC11c2VyLWF2YXRhci5wbmciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIxLTEyLTI3VDA5OjU0OjE3Ljc3M1oifQ=="
    ...
    ```

    其中：

    **X-Access-Token**：Apache APISIX 将从用户提供商获取到的 access token 放入 X-Access-Token 请求头，可以通过插件配置中的 `access_token_in_authorization_header` 来选择是否放入 Authorization 请求头中。

    ![X-Access-Token](https://static.apiseven.com/202108/1641278494765-139b6ffc-227b-4f02-8b2a-45d762422e15.png)

    **X-Id-Token**：Apache APISIX 将从用户提供商获取到的 ID token 通过 base64 编码之后放入 X-Id-Token 请求头，可以通过插件配置中的 `set_id_token_header` 来选择是否开启该功能，默认为为开启状态。

    ![X-Id-Token](https://static.apiseven.com/202108/1641278494768-867dadf3-8ecd-4376-af03-d86b6a7aa698.png)

    **X-Userinfo**：  Apache APISIX 将从用户提供商获取到的用户信息，通过 base64 编码之后放入 X-Userinfo，你可以通过插件配置中的 `set_userinfo_header` 来选择是否开启该功能，默认为开启状态。

    ![X-Userinfo](https://static.apiseven.com/202108/1641278494771-42567d0c-8424-46e2-9c5b-a12cf1af6bc8.png)

    由此可以看到，Apache APISIX 将会携带 `X-Access-Token`、`X-Id-Token` 和 `X-Userinfo` 三个请求头传递至上游。上游可以通过解析这几个头部，从而获取到用户 ID 信息和用户的元数据。

4. 在 Authing 控制台中的 「审计日志-用户行为日志」中可以观察到 user1 的登录信息。
   ![登录信息](https://static.apiseven.com/202108/1641276858261-00fb4d07-751e-42db-bbbf-e8550002466f.png)

## 总结

本文为大家描述了 Apache APISIX 和 Authing 对接的详细操作步骤，通过阅读本文，大家对于在 Apache APISIX 中使用 Authing 有了更清晰的理解。

Apache APISIX 不仅致力于保持自身的高性能，也一直非常重视开源生态的建设。目前 Apache APISIX 已经拥有了 10+ 个认证授权相关的插件，支持与业界主流的认证授权服务对接。

如果你有对接其他认证授权的需求，不妨访问 Apache APISIX 的 [GitHub](https://github.com/apache/apisix/issues)，通过 issue 留下你的建议；或订阅 Apache APISIX 的[邮件列表](https://apisix.apache.org/zh/docs/general/join)，通过邮件表达你的想法。
