---
title: "API Gateway APISIX Integrates Keycloak for Authentication"
authors:
  - name: "Xinxin Zhu"
    title: "Author"
    url: "https://github.com/starsz"
    image_url: "https://avatars.githubusercontent.com/u/25628854?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API Gateway
- Keycloak
- Authentication
- Integration
description: This article shows you how to use OpenID-Connect protocol and Keycloak for identity authentication in API Gateway Apache APISIX through detailed steps.
tags: [Plugins,Authentication]
image: https://static.apiseven.com/2022/blog/0818/plugins/keycloak.png
---

> This article shows you how to use OpenID-Connect protocol and Keycloak for identity authentication in Apache APISIX through detailed steps.

<!--truncate-->

<head>
    <link rel="canonical" href="https://www.keycloak.org/2021/12/apisix" />
</head>

![Keycloak-APISIX Integration](https://static.apiseven.com/202108/1639129658486-393e8a3a-ccf2-496d-9b46-4db741bd6e55.png)

[Keycloak](https://www.keycloak.org/) is an open source identity and access management solution for modern applications and services. Keycloak supports Single-Sign On, which enables services to interface with Keycloak through protocols such as OpenID Connect, OAuth 2.0, etc. Keycloak also supports integrations with different authentication services, such as Github, Google and Facebook.

In addition, Keycloak also supports user federation, and can import users through LDAP and Kerberos. For more information about Keycloak, please refer to the [official documentation](https://www.keycloak.org/about).

## How to Use

### Environment Preparation

Make sure that Apache APISIX is started in your environment before proceeding with the following steps.

#### Start Keycloak

Here we use `docker-compose` to start Keycloak with PostgreSQL.

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

After execution, you need to verify that Keycloak and postgres have started successfully.

```shell
docker-compose ps
```

#### Configure Keycloak

After Keycloak is started, use your browser to access "http://127.0.0.1:8080/auth/admin/" and type the `admin/password` account password to log in to the administrator console.

##### Create a realm

First, you need to create a realm named `apisix_test_realm`. In Keycloak, a realm is a workspace dedicated to managing projects, and the resources of different realms are isolated from each other.

The realm in Keycloak is divided into two categories: one is the `master realm`, which is created when Keycloak is first started and used to manage the admin account and create other realm. the second is the `other realm`, which is created by the admin in the master realm and can be used to create, manage and use users and applications in this realm. The second category is the other realm, created by admin in the master realm, where users and applications can be created, managed and used. For more details, please refer to the [realm and users section in Keycloak](https://www.keycloak.org/docs/latest/getting_started/index.html#realms-and-users).

![Create realm](https://static.apiseven.com/202108/1639101202459-72803240-b358-4c69-a9ca-4b6751a8547d.png)

![Edit realm title](https://static.apiseven.com/202108/1639101243617-0498379f-392e-4837-8f37-eee558c21e3d.png)

##### Create a Client

The next step is to create the `OpenID Connect Client`. In Keycloak, Client means a client that is allowed to initiate authentication to Keycloak.

In this example scenario, `Apache APISIX` is equivalent to a client that is responsible for initiating authentication requests to Keycloak, so we create a Client with the name `apisix`. More details about the Client can be found in [Keycloak OIDC Clients](https://www.keycloak.org/docs/latest/server_admin/#_oidc_clients).

![Create OpenID Client](https://static.apiseven.com/202108/1639101288379-9a46b92a-294e-4b40-ac7e-408284a3d0ad.png)

![Creat Client title](https://static.apiseven.com/202108/1639101327347-c8ab463a-1cb0-4eb0-a26f-17d7c0c54846.png)

##### Configure the Client

After the Client is created, you need to configure the Apache APISIX access type for the Client.

In Keycloak, there are three types of Access Type:

1. **Confidential**: which is used for applications that need to perform browser login, and the client will get the `access token` through `client secret`, mostly used in web systems rendered by the server.
2. **Public**: for applications that need to perform browser login, mostly used in front-end projects implemented using vue and react.
3. **Bearer-only**: for applications that don't need to perform browser login, only allow access with `bearer token`, mostly used in RESTful API scenarios.

For more details about Client settings, please refer to [Keycloak OIDC Clients Advanced Settings](https://www.keycloak.org/docs/latest/server_admin/#advanced-settings).

Since we are using Apache APISIX as the Client on the server side, we can choose either "confidential" Access Type or "Bearer-only" Access Type. For the demonstration below, we are using "confidential" Access Type as an example.

![Set Client type](https://static.apiseven.com/202108/1639101355171-e368730b-2a72-4c4d-9397-cf4a1c8f2806.png)

##### Create Users

Keycloak supports interfacing with other third-party user systems, such as Google and Facebook, or importing or manually creating users using LDAP . Here we will use "manually creating users" to demonstrate.

![Create user](https://static.apiseven.com/202108/1639101385277-b2f578c0-e68a-4945-83ac-7a77145bb056.png)

![Add user info](https://static.apiseven.com/202108/1639101406281-724bbb50-96fc-4aa8-aec1-9414f83c199d.png)

Then set the user's password in the Credentials page.

![Set user password](https://static.apiseven.com/202108/1639101430209-d289459a-5014-4a2d-864f-7917b84b1c0c.png)

#### Create Routes

After Keycloak is configured, you need to create a route and open the `Openid-Connect` plugin . For details on the configuration of this plugin, please refer to the [Apache APISIX OpenID-Connect plugin](https://apisix.apache.org/docs/apisix/plugins/openid-connect).

##### Get client_id and client_secret

![Get Client infos](https://static.apiseven.com/202108/1639101454807-ff8c8b77-bdac-4ac6-966e-a2f5e2418b7a.png)

In the above configuration.

* `client_id` is the name used when creating the Client before, i.e. `apisix`
* `client_secret` should be obtained from Clients-apisix-Credentials, for example: `d5c42c50-3e71-4bbbe-aa9e-31083ab29da4`.

##### Get the discovery configuration

![Get configuration](https://static.apiseven.com/202108/1639101585273-7eb31728-fe4c-4af3-84d1-76c1a97e7e35.png)

Go to Realm Settings-General-Endpoints, select the `OpenID Endpoint Configuration` link and copy the address that the link points to, for example:`http://127.0.0.1:8080/auth/realms/apisix_test_realm/.well-known/openid-configuration`.

##### Create a route and enable the plug-in

Use the following command to access the Apache APISIX Admin interface to create a route, set the upstream to `httpbin.org`, and enable the plug-in OpenID Connect for authentication.

> Note: If you select `bearer-only` as the Access Type when creating a Client, you need to set `bearer_only` to true when configuring the route, so that access to Apache APISIX will not jump to the Keycloak login screen.

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

### Access Testing

Once the above configuration is complete, we are ready to perform the relevant access tests in Apache APISIX.

#### Access Apache APISIX

Use your browser to access http://127.0.0.1:9080/image/png.

Since the OpenID-Connect plugin is enabled and `bearer-only` is set to `false`, when you access this path for the first time, Apache APISIX will redirect to the login screen configured in `apisix_test_realm` in Keycloak and make a user login request.

![Login Page](https://static.apiseven.com/202108/1639101623370-cc668e0f-0c2c-469c-9a3e-3118c271d63f.png)

Enter the User peter created during the Keycloak configuration to complete user login.

#### Successful access

After a successful login, the browser will again redirect the link to http://127.0.0.1:9080/image/png and will successfully access the image content. The content is identical to that of the upstream http://httpbin.org/image/png.

![Access successfully](https://static.apiseven.com/202108/1639101644015-6d541202-dfff-4de3-ad47-f49dd65911a6.png)

#### Logout

After the test, use your browser to access "http:/127.0.0.1:9080/logout" to logout your account.

> Note: The logout path can be specified by `logout_path` in the OpenID-Connect plug-in configuration, the default is `logout`.

## Summary

This article shows the procedure of using OpenID-Connect protocol and Keycloak for authentication in Apache APISIX. By integrating with Keycloak, Apache APISIX can be configured to authenticate and authenticate users and application services, which greatly reduces the development work involved.

For more information about the implementation of authentication in Apache APISIX with Okta, see [this article](https://apisix.apache.org/zh/blog/2021/08/16/Using-the-Apache-APISIX-OpenID-Connect-Plugin-for-Centralized-Authentication/).
