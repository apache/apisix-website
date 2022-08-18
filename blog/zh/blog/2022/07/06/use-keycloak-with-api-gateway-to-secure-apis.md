---
title: "使用 Keycloak 与 API 网关保护你的 API"
authors:
  - name: "朱欣欣"
    title: "Apache APISIX Committer"
    url: "https://github.com/starsz"
    image_url: "https://github.com/starsz.png"
  - name: "琚致远"
    title: "Apache Member"
    url: "https://github.com/juzhiyuan"
    image_url: "https://github.com/juzhiyuan.png"
keywords:
  - Apache APISIX
  - API 网关
  - Authentication
  - OpenID Connect
  - Keycloak
description: 本篇文章将一步一步引导你如何使用 API 网关 Apache APISIX 与 Keycloak 保护你的 API，并且介绍了 OpenID Connect 相关概念以及交互流程和相关术语。
tags: [Authentication, Plugins]
image: https://static.apiseven.com/2022/blog/0818/plugins/keycloak.png
---

> 本篇文章将一步一步引导你如何使用 API 网关与 Keycloak 保护你的 API。

<!--truncate-->

OpenID Connect 又名 OIDC，是基于 OAuth 2.0 的认证协议。它允许客户端从身份认证服务 IdP 获取用户基本信息，常见的 IdP 有：Keycloak、Ory、Okta、Auth0、Authing 等。

开源的 API 网关 Apache APISIX 支持使用 openid-connect 插件对接以上身份认证服务，APISIX 会将所有未认证的请求重定向至身份认证服务的登录页，当登录成功后 APISIX 会将获取到的用户信息发送至上游服务。

![screenshot](https://static.apiseven.com/2022/blog/0706/1.png)

Keycloak 是一个开源的身份认证管理服务，可作为 IdP 来使用。它为应用程序增加了认证服务，并能通过最小的代价保证服务的安全。同时，它还提供了用户联邦、强认证、用户管理、细粒度授权等功能。在这篇文章中，我们将以 Keycloak 为例，让我们看看如何将其与 APISIX 对接，以保护你的服务。

## 流程描述

下图为 OpenID Connect 协议交互流程：

![screenshot](https://static.apiseven.com/2022/blog/0706/2.png)

在重定向阶段（Redirect），IdP 将用户重定向到一个预先配置好的重定向 URL（redirect_url），例如 `http://127.0.0.1:9080/callback`。请注意：这是一个在 APISIX 中不存在的 API，它只用于捕获相关的请求，并在 OIDC 逻辑中完成 Token 交换的功能。请不要使用这个地址作为触发 OIDC 插件重定向的条件，否则，它将返回如下错误：`the error request to the redirect_uri path, but there's no session state found`。

## 相关术语

1. Bearer Only： Keycloak 支持账户密码或 AccessToken 进行身份认证，若启用 bearer_only 选项，则仅允许通过 AccessToken 进行认证，该方式适用于服务之间的访问认证；
2. Realm： Keycloak 中的 Realm 相当于一个租户，不同 Realm 是相互隔离的，只能管理和验证它们所具有的用户；
3. Scope：这是一种限制在访问令牌（AccessToken）中声明的角色的方法。例如，当一个客户端要求验证一个用户时，客户端收到的访问令牌将只包含范围明确指定的角色映射。客户端范围允许你限制每个单独的访问令牌的权限，而不是让客户端访问用户的所有权限；
4. User：User 是可以登录到 Keycloak 的用户，可以思考下你所用过的 SSO 登录服务；
5. Client：客户端是指想要使用 Keycloak 来保护的服务。

## 前置步骤

> 1. 本指南将使用 Docker 进行 Keycloak 的安装与启动；
> 2. 本指南所用服务器环境为 CentOS 7，IP 为 127.0.0.1。

### 安装 Apache APISIX

请参考 https://apisix.apache.org/docs/apisix/getting-started 安装、启动 APISIX，本示例中 APISIX 实例地址为 `http://127.0.0.1:9080/`。

### 配置 Keycloak

请在服务器中执行如下命令安装 18.0.2 版本的 Keycloak：

```shell
docker run -d -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:18.0.2 start-dev
```

启动完成后 Keycloak 将监听 `8080` 端口，并使用 admin 作为管理员账户与密码。

#### 创建 Realm

访问 `http://127.0.0.1:8080/` 将显示如下界面，这表示 Keycloak 已成功运行。

![screenshot](https://static.apiseven.com/2022/blog/0706/3.png)

访问 Administrator Console 并使用 admin 作为账户与密码进行登录。

![screenshot](https://static.apiseven.com/2022/blog/0706/4.png)

安装完毕首次登陆时，系统内将默认创建名为 master 的 Realm。Realm 是 OIDC 体系中的一个概念，可理解为租户。

![screenshot](https://static.apiseven.com/2022/blog/0706/5.png)

鼠标移动到左侧 Master 上方时点击 Add realm 并输入 myrealm 作为 Realm 的名称，创建。

当安装 Keycloak 首次登录时，系统中会默认创建一个名为 master 的 Realm，但它是专门用来管理 Keycloak 的，我们不应该把它用于我们的应用，所以我们需要创建一个新的 Realm。

![screenshot](https://static.apiseven.com/2022/blog/0706/6.png)

创建成功后将看到已切换至 myrealm，且底部存有 Endpoints -> OpenID Endpoint Configuration，地址为 `http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration`，这是一个服务发现的规范，稍后将使用该地址作为 OIDC 所需要使用的各个节点地址。

![screenshot](https://static.apiseven.com/2022/blog/0706/7.png)

#### 创建 User

我们需要创建一个用户用于通过账户密码进行登陆认证。选择 Manage -> Users -> Add user，并输入 myuser 作为用户名，保存后访问 Users 页面并选择 `View all users`。

![screenshot](https://static.apiseven.com/2022/blog/0706/8.png)

![screenshot](https://static.apiseven.com/2022/blog/0706/9.png)

![screenshot](https://static.apiseven.com/2022/blog/0706/10.png)

点击 ID 后进入 Credentials 选项卡，设置一个新密码（本示例使用 mypassword 作为密码）。同时将 Temporary 设置为 OFF，以关闭首次登陆必须修改密码的限制。

![screenshot](https://static.apiseven.com/2022/blog/0706/11.png)

点击 Set Password 保存设置。

#### 创建 Client

访问 Configure -> Clients -> Create 以创建一个新的 Client，这将用于之后配置 APISIX。

![screenshot](https://static.apiseven.com/2022/blog/0706/12.png)

输入 Client ID 并保存，本例使用 myclient 作为 ID。

![screenshot](https://static.apiseven.com/2022/blog/0706/13.png)

保存后需要配置 2 个参数：

1. Access Type：默认为 public，请修改为 credential 以获取 Client Secret；
2. Valid Redirect URIs：当登陆成功时，Keycloak 将携带 state 与 code 重定向客户端至该地址，因此设置为 Apache APISIX 的特定回调地址，例如 `http://127.0.0.1:9080/anything/callback`

![screenshot](https://static.apiseven.com/2022/blog/0706/14.png)

设置完成后保存，此时页面顶部将出现 Credentials 选项卡，将 Secret 复制下来。

![screenshot](https://static.apiseven.com/2022/blog/0706/15.png)

### 配置汇总

#### Apache APISIX

实例地址：`http://127.0.0.1:9080/`

#### Keycloak

1. 服务地址：`http://127.0.0.1:8080/`
2. Realm：`myrealm`
3. Client ID：`myclient`
4. Client Secret：e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq
5. Redirect URI：`http://127.0.0.1:9080/anything/callback`
6. Discovery：`http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration`
7. Logout URL：`/anything/logout`
8. Bearer Only: `false`
9. Username：`myuser`
10. Password：`mypassword`

## 场景示例

### 前置条件

本示例使用 httpbin.org/anything 作为上游服务，它将返回请求中的所有内容。

![screenshot](https://static.apiseven.com/2022/blog/0706/16.png)

### 场景一：使用账户密码保护上游服务

本示例将引导客户端到登陆页通过账户密码的方式进行身份认证：

1. 使用如下命令创建一条 API：

```shell
curl -XPUT 127.0.0.1:9080/apisix/admin/routes/1 -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -d '{
    "uri":"/anything/*",
    "plugins": {
        "openid-connect": {
            "client_id": "myclient",
            "client_secret": "e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq",
            "discovery": "http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration",
            "scope": "openid profile",
            "bearer_only": false,
            "realm": "myrealm",
            "redirect_uri": "http://127.0.0.1:9080/anything/callback",
            "logout_path": "/anything/logout"
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

![screenshot](https://static.apiseven.com/2022/blog/0706/17.png)

2. 创建 API 成功后访问 `http://127.0.0.1:9080/anything/test` 时，由于未进行登录，因此将被引导到 Keycloak 的登录页面：

![screenshot](https://static.apiseven.com/2022/blog/0706/18.png)

3. 输入账号（myuser）、密码（mypassword）完成登录后，成功跳转到 `http://127.0.0.1:9080/anything/test` 页面：

![screenshot](https://static.apiseven.com/2022/blog/0706/19.png)

4. 访问 `http://127.0.0.1:9080/anything/logout` 退出登录：

![screenshot](https://static.apiseven.com/2022/blog/0706/20.png)

### 场景二：使用 AccessToken 验证身份

通过启用 bearer_only 参数对应用之间的调用进行身份认证，此时应用访问 APISIX 时需携带 Authorization Header，否则该请求将被拒绝。

1. 使用如下命令创建一条 API：

```shell
curl -XPUT 127.0.0.1:9080/apisix/admin/routes/1 -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -d '{
    "uri":"/anything/*",
    "plugins": {
        "openid-connect": {
            "client_id": "myclient",
            "client_secret": "e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq",
            "discovery": "http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration",
            "scope": "openid profile",
            "bearer_only": true,
            "realm": "myrealm",
            "redirect_uri": "http://127.0.0.1:9080/anything/callback",
            "logout_path": "/anything/logout"
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

![screenshot](https://static.apiseven.com/2022/blog/0706/21.png)

2. 未携带 X-Access-Token 访问 Apache APISIX 时将返回 401 表明未经授权：

![screenshot](https://static.apiseven.com/2022/blog/0706/22.png)

3. 调用 Keycloak API 获取 AccessToken：

```shell
curl -XPOST "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token" -d "grant_type=password&username=myuser&client_id=myclient&client_secret=e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq&password=mypassword"
```

![screenshot](https://static.apiseven.com/2022/blog/0706/23.png)

4. 将 AccessToken 放于 Authorization 头中请求 APISIX（替换掉 `${AccessToken}`），可以认证成功：

```shell
curl http://127.0.0.1:9080/anything/test -H "Authorization: Bearer ${AccessToken}"
```

![screenshot](https://static.apiseven.com/2022/blog/0706/24.png)

### 场景三：上游服务解析 UserInfo 信息

当启用 APISIX `set_userinfo_header` 配置后，认证成功后回调请求将携带 `X-Userinfo` 请求头，它包含了 User 的基本信息，可通过 `base64_decode` 获得用户内容。

## 常见问题

1. **为什么 APISIX 中 Cookie 值非常长？**

因为 APISIX 会将 `id_token`、`access_token`、`refresh_token` 等值写入 Cookie 中，因此整个 Cookie 内容比较长。具体实现可阅读 `lua-resty-openidc` 库中设置 session 的逻辑。

2. **如何修改 Session 存储的 Cookie 名称、存储位置？**

目前 openid-connect 插件未提供自定义这部分配置的能力，因此可以使用 lua-resty-session 中提供的方法：通过 NGINX 变量的方式对其默认配置进行覆盖。
此处借助 APISIX 提供的 NGINX 配置注入能力以实现覆盖：通过在配置文件 {apisix}/conf/config.yaml 中添加这些代码，可修改 Session 存储 Cookie 的名称：

```yaml
nginx_config:
  http_server_configuration_snippet: |
    set $session_name "session_override";
```

更多配置项可参考：

1. [lua-resty-session Init phase](https://github.com/bungle/lua-resty-session/blob/master/lib/resty/session.lua#L348-L380)
2. [lua-resty-session Pluggable Storage Adapters](https://github.com/bungle/lua-resty-session#pluggable-storage-adapters)

## 参考资料

1. [Integrate Keycloak with APISIX](https://apisix.apache.org/zh/blog/2021/12/10/integrate-keycloak-auth-in-apisix/)
2. [Keycloak Getting Started](https://www.keycloak.org/getting-started/getting-started-docker)
3. [Keycloak Realm vs Client](https://stackoverflow.com/questions/56561554/keycloak-realm-vs-keycloak-client)
4. [Keycloak Client vs User](https://stackoverflow.com/questions/49107701/keycloak-client-vs-user)
5. [What is Client Scope?](https://wjw465150.gitbooks.io/keycloak-documentation/content/server_admin/topics/roles/client-scope.html)
