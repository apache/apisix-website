---
title: "如何在 Apache APISIX 中集成 Keycloak 实现身份认证"
authors:
  - name: "朱欣欣"
    title: "Author"
    url: "https://github.com/starsz"
    image_url: "https://avatars.githubusercontent.com/u/25628854?v=4"
  - name: "苏钰"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API 网关
- Keycloak
- 身份认证
- 集成
description: 通过 API 网关 Apache APISIX 的 openid-connect 插件可以与 Keycloak 进行身份认证。通过该插件，APISIX 仅需通过配置即可实现对使用者和应用服务进行认证与鉴权。
tags: [Plugins,Authentication]
image: https://static.apiseven.com/2022/blog/0818/plugins/keycloak.png
---

> 本文通过详细的步骤为大家展示了如何在 Apache APISIX 使用 OpenID-Connect 协议和 Keycloak 进行身份认证。通过对接 Keycloak，Apache APISIX 仅需通过配置即可实现对使用者和应用服务进行认证与鉴权，从而大大减少了相关开发工作。

<!--truncate-->

<head>
    <link rel="canonical" href="https://www.keycloak.org/2021/12/apisix" />
</head>

![Keycloak-APISIX 集成](https://static.apiseven.com/202108/1639129658486-393e8a3a-ccf2-496d-9b46-4db741bd6e55.png)

## 什么是 Keycloak

[Keycloak](https://www.keycloak.org/) 是一个针对现代应用程序和服务的开源身份和访问管理解决方案。Keycloak 支持单点登录（Single-Sign On），因此服务可以通过 OpenID Connect、OAuth 2.0 等协议对接 Keycloak。同时 Keycloak 也支持集成不同的身份认证服务，例如 Github、Google 和 Facebook 等。

另外 Keycloak 也支持用户联邦功能，可以通过 LDAP 或 Kerberos 来导入用户。更多 Keycloak 内容可以参考[官方文档介绍](https://www.keycloak.org/documentation)。

## 如何使用

### 环境准备

在进行如下步骤前，请确保环境中已启动 Apache APISIX。

#### 启动 Keycloak

这里我们使用 `docker-compose` 将 Keycloak 与其所依赖的的 PostgreSQL 一并启动。

```yaml
version: '3.7'

services:
  postgres:
      image: postgres:12.2
      container_name: postgres
      environment:
        POSTGRES_DB: keycloak
        POSTGRES_USER: keycloak
        POSTGRES_PASSWORD: password

  keycloak:
      image: jboss/keycloak:9.0.2
      container_name: keycloak
      environment:
        DB_VENDOR: POSTGRES
        DB_ADDR: postgres
        DB_DATABASE: keycloak
        DB_USER: keycloak
        DB_PASSWORD: password
        KEYCLOAK_USER: admin
        KEYCLOAK_PASSWORD: password
        PROXY_ADDRESS_FORWARDING: "true"
      ports:
        - 8080:8080
      depends_on:
        - postgres
```

```shell
docker-compose up
```

执行完毕后需要确认 Keycloak 和 PostgreSQL 是否已成功启动。

```shell
docker-compose ps
```

#### 配置 Keycloak

Keycloak 启动完成之后，使用浏览器访问 "http://127.0.0.1:8080/auth/admin/"，并键入 `admin/password` 账号密码进行登录管理员控制台。

##### 创建 realm

首先，创建一个名称为 `apisix_test_realm`的 `realm`。在 Keycloak 中，`realm` 是一个专门用来管理项目的工作区，不同 `realm`之间的资源是相互隔离的。

Keycloak 中 `realm` 分为两类：一类是 `master realm`，由 Keycloak 刚启动时创建，用于管理 admin 账号以及创建其他的 `realm`。第二类是 `other realm`，由 `master realm` 中的 admin 创建，可以在该 `realm` 中进行用户和应用的创建并进行管理和使用。更多细节可参考 [Keycloak 中 realm 和 users](https://www.keycloak.org/docs/latest/getting_started/index.html#realms-and-users) 相关内容。

![创建 realm](https://static.apiseven.com/202108/1639101202459-72803240-b358-4c69-a9ca-4b6751a8547d.png)

![编辑 realm 名称](https://static.apiseven.com/202108/1639101243617-0498379f-392e-4837-8f37-eee558c21e3d.png)

##### 创建 Client

接下来需要创建 `OpenID Connect Client`。在 Keycloak 中，Client 表示允许向 Keycloak 发起身份认证的客户端。

在本示例场景中，`Apache APISIX` 相当于一个客户端，负责向 Keycloak 发起身份认证请求，因此我们创建一个名称为 `apisix` 的 Client。关于 Client 更多细节可参考 [Keycloak OIDC Clients](https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients)。

![创建 OpenID Client](https://static.apiseven.com/202108/1639101288379-9a46b92a-294e-4b40-ac7e-408284a3d0ad.png)

![创建 Client 名称](https://static.apiseven.com/202108/1639101327347-c8ab463a-1cb0-4eb0-a26f-17d7c0c54846.png)

##### 配置 Client

Client 创建完成后，需要为 Client 配置 Apache APISIX 的访问类型。

 在 Keycloak 中 `Access Type` 分为三类：

1. **confidential**。适用于需要执行浏览器登录的应用，客户端会通过 `client secret` 来获取 `access token` , 多运用于服务端渲染的 web 系统。
2. **public**。适用于需要执行浏览器登录的应用，多运用于使用 vue 和 react 实现的前端项目。
3. **bearer-only**。适用于不需要执行浏览器登录的应用，只允许携带 `bearer token` 访问，多运用于 RESTful API 的使用场景。

更多关于 Client 设置细节可参考 [Keycloak OIDC Clients 高级设置](https://www.keycloak.org/docs/latest/server_admin/#advanced-settings)。

因为我们使用了 Apache APISIX 作为服务端的 Client， 因此可以选择类型一或类型三（这里以类型一为例进行演示）。

![配置 Client 类型](https://static.apiseven.com/202108/1639101355171-e368730b-2a72-4c4d-9397-cf4a1c8f2806.png)

##### 创建 User

Keycloak 支持对接其他第三方的用户系统，例如 Google 和 Facebook。或者使用 LDAP 的方式进行导入或手动创建用户，这里我们使用「手动创建用户」来进行演示。

![创建用户](https://static.apiseven.com/202108/1639101385277-b2f578c0-e68a-4945-83ac-7a77145bb056.png)

![添加用户相关信息](https://static.apiseven.com/202108/1639101406281-724bbb50-96fc-4aa8-aec1-9414f83c199d.png)

在 Credentials 页面设置用户的密码。

![设置用户密码](https://static.apiseven.com/202108/1639101430209-d289459a-5014-4a2d-864f-7917b84b1c0c.png)

#### 创建路由

Keycloak 配置完成后，需要在 Apache APISIX 中创建路由并开启 `Openid-Connect` 插件，具体关于该插件的配置文档可以参考 [Apache APISIX OpenID-Connect 插件](https://apisix.apache.org/docs/apisix/plugins/openid-connect)。

#### 获取 client_id 和 client_secret

![获取 Client 相关信息](https://static.apiseven.com/202108/1639101454807-ff8c8b77-bdac-4ac6-966e-a2f5e2418b7a.png)

上图配置中：

* `client_id` 为之前创建 Client 时使用的名称，即 `apisix`；
* `client_secret` 则需要进入 Clients-apisix-Credentials 中获取，例如：`d5c42c50-3e71-4bbe-aa9e-31083ab29da4`。

#### 获取 discovery 配置项

![获取配置](https://static.apiseven.com/202108/1639101585273-7eb31728-fe4c-4af3-84d1-76c1a97e7e35.png)

进入 Realm Settings-General-Endpoints 中，选择 `OpenID Endpoint Configuration` 链接，复制该链接指向的地址。例如：`http://127.0.0.1:8080/auth/realms/apisix_test_realm/.well-known/openid-configuration`。

##### 创建路由并开启插件

使用如下命令访问 Apache APISIX Admin 接口来创建一条路由，设置上游为 `httpbin.org`，并开启插件 OpenID Connect 用于身份认证。

> 注意：如果创建 Client 时，选择 `bearer-only` 作为 `Access Type`，在配置路由是需要将 `bearer_only` 设置为 true，此时访问 Apache APISIX 将不会跳转到 Keycloak 登录界面。

```shell
curl  -XPOST 127.0.0.1:9080/apisix/admin/routes -H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" -d '{
    "uri":"/*",
    "plugins":{
        "openid-connect":{
            "client_id":"apisix",
            "client_secret":"d5c42c50-3e71-4bbe-aa9e-31083ab29da4",
            "discovery":"http://127.0.0.1:8080/auth/realms/apisix_test_realm/.well-known/openid-configuration",
            "scope":"openid profile",
            "bearer_only":false,
            "realm":"apisix_test_realm",
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

### 访问测试

上述配置完成后，我们就可以在 Apache APISIX 中进行相关的测试访问了。

#### 访问 Apache APISIX

使用浏览器访问 `http://127.0.0.1:9080/image/png`。

由于开启了 OpenID-Connect 插件，并且设置了 `bearer-only` 为 `false` 。因此第一次访问该路径时， Apache APISIX 将重定向到 Keycloak 中 `apisix_test_realm` 中配置的登录界面，进行用户登录请求。

![登录页面](https://static.apiseven.com/202108/1639101623370-cc668e0f-0c2c-469c-9a3e-3118c271d63f.png)

输入之前配置 Keycloak 时创建的 User peter，即可完成用户登录。

#### 访问成功

登录成功后，浏览器又会将链接重定向到 "[http://127.0.0.1:9080/image/png](http://127.0.0.1:9080/image/png)"。并成功访问到该图片内容，该内容与上游 "[http://httpbin.org/image/png](http://httpbin.org/image/png)" 一致。

![访问成功](https://static.apiseven.com/202108/1639101644015-6d541202-dfff-4de3-ad47-f49dd65911a6.png)

#### 登出账号

测试完毕后，使用浏览器访问 "http:/127.0.0.1:9080/logout" 进行账号登出。

> 注意：登出路径可通过 OpenID-Connect 插件配置中的 `logout_path` 指定，默认为 `logout`。

## 总结

本文通过详细的步骤为大家展示了如何在 Apache APISIX 使用 OpenID-Connect 协议和 Keycloak 进行身份认证。通过对接 Keycloak，Apache APISIX 仅需通过配置即可实现对使用者和应用服务进行认证与鉴权，从而大大减少了相关开发工作。

更多关于 Apache APISIX 中的身份认证功能实现也可参考文章[《使用 Apache APISIX 和 Okta 来实现集中式身份认证》](https://apisix.apache.org/zh/blog/2021/08/16/Using-the-Apache-APISIX-OpenID-Connect-Plugin-for-Centralized-Authentication)。
