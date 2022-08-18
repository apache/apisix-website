---
title: Centralized authentication using the OpenID Connect plugin for Apache APISIX
slug: 2021/08/25/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication
authors:
  - name: "Xinxin Zhu"
    title: "Author"
    url: "https://github.com/starsz"
    image_url: "https://avatars.githubusercontent.com/u/25628854?v=4"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://avatars.githubusercontent.com/u/36651058?v=4"
keywords:
  - API Gateway
  - APISIX
  - Apache APISIX
  - Okta
  - Authorization
description: Using the openid-connect plugin of the cloud-native API gateway Apache APISIX can quickly interface with the centralized authentication solution OKat.
tags: [Authentication, Plugins, Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/plugins/openid%20connect.png
---

> Compared with the traditional authentication mode, the centralized authentication mode has the following advantages: first, it simplifies the application development process, reduces the development application workload and maintenance costs, and avoids repeated development of authentication code for each application; second, it improves business security, and the centralized authentication mode can intercept unauthenticated requests at the gateway level in time to protect back-end applications.

<!--truncate-->

## What is Apache APISIX

[Apache APISIX](https://apisix.apache.org/) is a dynamic, real-time, high-performance API gateway that provides rich traffic management features such as load balancing, dynamic upstream, canary release, service meltdown, authentication, observability, and more. Apache APISIX's OpenID Connect plug-in supports OpenID, which allows users to replace authentication from traditional authentication mode to centralized authentication mode.

## What is authentication

Authentication refers to the verification of a user's identity through certain means. The application identifies the user through authentication and obtains detailed user metadata from the Identity Provider based on the user identity ID, and uses it to determine whether the user has access to the specified resources. Authentication modes are divided into two categories: **Traditional Authentication Mode** and **Centralized Authentication Mode**.

### Traditional authentication mode

In traditional authentication mode, each application service needs to support authentication separately, such as accessing the login interface when the user is not logged in, and the interface returns a 301 jump page. The application needs to develop the logic for maintaining the Session and the authentication interaction with the identity provider. The flow of the traditional authentication model is shown in the figure below: first, the user initiates a request, then the gateway receives the request and forwards it to the corresponding application service, and finally the application service interfaces with the identity provider to complete the authentication.

![Flowchart of traditional authentication mode](https://static.apiseven.com/202108/1639467045776-715e1805-540b-4cef-87c5-6166e2af43a8.png)

### Centralized authentication mode

Unlike the traditional authentication model, the centralized authentication model takes user authentication out of the application service. Take Apache APISIX as an example, the centralized authentication process is shown in the following diagram: first, the user initiates a request, and then the front gateway is responsible for the user authentication process, interfacing with the identity provider and sending the identity provider an authorization) request to the identity provider. The identity provider returns user info. After the gateway identifies the user, it forwards the user identity information to the back-end application in the form of a request header.

![Flow chart of centralized authentication mode](https://static.apiseven.com/202108/1639467122244-d4292436-c5ce-48f6-b1d5-67645f24fbc9.png)

Compared with the traditional authentication mode, the centralized authentication mode has the following advantages.

1. simplify the application development process, reduce the development of application workload and maintenance costs, to avoid the repeated development of each application authentication code.
2. improve business security, centralized authentication mode at the gateway level to intercept unauthenticated requests in time to protect the back-end applications.

## What is OpenID

OpenID is a centralized authentication model, which is a decentralized identity system. The benefit of using OpenID is that users only need to register and log in with one OpenID identity provider's website and use one account password information to access different applications. okta is a common OpenID identity provider and the Apache APISIX OpenID Connect plugin supports OpenID so users can use the plugin to to replace the traditional authentication model with a centralized authentication model.

### OpenID Authentication Process

The OpenID authentication process has the following 7 steps, as shown in the figure below. 1.

1. APISIX initiates an authentication request to Identity Provider. 2.
2. The user logs in and authenticates on the Identity Provider. 3.
3. The Identity Provider returns to APISIX with the Authorization Code. 4.
4. APISIX requests the Identity Provider with the Code extracted from the request parameters. 5.
5. The Identity Provider sends an answer message to APISIX containing the ID Token and Access Token. 6.
6. APISIX sends the Access Token to the Identity Provider's User Endpoint to obtain the user's identity.
7. After authentication, the User Endpoint sends the User info to APISIX to complete the authentication.

![OpenID Authentication Flowchart](https://static.apiseven.com/202108/1639467187923-71854ddb-65fd-4a90-8bd0-242b47a8624b.png)

## How to configure Okta authentication using the OpenID Connect plugin for Apache APISIX

Configuring Okta authentication using the Apache APISIX OpenID Connect plug-in is a simple three-step process that allows you to switch from traditional to centralized authentication mode. The following section describes the steps to configure Okta authentication using the OpenID Connect plug-in for Apache APISIX.

### Prerequisites

An Okta account already exists.

### Step 1: Configure Okta

1. Login to your Okta account and create an Okta application, select the OIDC login mode and the Web Application application type.
    ![Create an Okta application](https://static.apiseven.com/202108/1639467243454-ac16645a-4a8a-426f-93a2-e840cae3c502.png)
    ![Select OIDC login mode and Web Application application type](https://static.apiseven.com/202108/1639467299429-0ea741a7-95fd-43b5-a0c4-25a7026e62d2.png) 2.
2. Set the login and logout jump URLs.
The "Sign-in redirect URIs" are the links that are allowed to be redirected after successful login, and the "Sign-out redirect URIs" are the links that are redirected after logging out. In this example, we set both the sign-in redirect and sign-out redirect URLs to `http://127.0.0.1:9080/`.
    ![Set the login and logout URL](https://static.apiseven.com/202108/1639467390099-e9594a05-7e78-4f20-a902-7c4ca2c302fb.png)
3. Click "Save" to save the changes after finishing the settings.
    ![Save Changes](https://static.apiseven.com/202108/1639467449049-628d7796-0d8e-4ed9-8334-5ba7f0fb32f4.png)
Visit the General page of the application to get the following configuration, which is required to configure Apache APISIX OpenID Connect.

- Client ID: OAuth client ID, which is the ID of the application, corresponding to `client_id` and `{YOUR_CLIENT_ID}` below.
- Client secret: OAuth client secret, i.e. application key, corresponds to `client_secret` and `{YOUR_CLIENT_SECRET}` below.
- Okta domain: The domain name used by the application, corresponds to `{YOUR_ISSUER}` in discovery below.

![Get configuration info](https://static.apiseven.com/202108/1639467501106-d95bf8ad-db47-4918-ac70-424b12488e5b.png)

### Installing Apache APISIX

You can install Apache APISIX in a variety of ways such as through source packages, Docker, Helm Chart, etc.

#### Installing dependencies

The Apache APISIX runtime environment requires dependencies on NGINX and etcd, so before installing Apache APISIX, please install the corresponding dependencies according to the operating system you are using. We have provided steps for installing dependencies on CentOS7, Fedora 31 & 32, Ubuntu 16.04 & 18.04, Debian 9 & 10 and MacOS, please refer to [Installing dependencies](https://apisix.apache.org/zh/docs/apisix/install) for details. -dependencies/).

When installing Apache APISIX via Docker or Helm Chart, the required NGINX and etcd are already included, please refer to the respective documentation.

#### Installation via RPM package (CentOS 7)

This installation method is available for CentOS 7 operating system, please run the following command to install Apache APISIX.

```shell
sudo yum install -y https://github.com/apache/apisix/releases/download/2.7/apisix-2.7-0.x86_64.rpm
```

#### Installation via Docker

For details, please refer to: [Installing Apache APISIX with Docker](https://hub.docker.com/r/apache/apisix).

#### Installation via Helm Chart

For details, please refer to: [Installing Apache APISIX with Helm Chart](https://github.com/apache/apisix-helm-chart).

#### Installation via source package

1. Create a directory named ``apisix-2.7``.
  
  ```shell
  mkdir apisix-2.7
  ```

2. Download the Apache APISIX Release source package.
  
  ```shell
  wget https://downloads.apache.org/apisix/2.7/apache-apisix-2.7-src.tgz
  ```

  You can also download the Apache APISIX Release source package from the Apache APISIX official website. The Apache APISIX official website also provides source packages for Apache APISIX, APISIX Dashboard, and APISIX Ingress Controller, see [Apache APISIX official website - download page](https://apisix.apache.org/zh/ For details, please refer to the [Apache APISIX official-downloads page](https://apisix.apache.org/downloads).

3. Unpack the Apache APISIX Release source package.
  
  ```shell
  tar zxvf apache-apisix-2.7-src.tgz -C apisix-2.7
  ```

4. install the runtime dependencies of the Lua library:

  ```shell
  # Switch to the apisix-2.7 directory
  cd apisix-2.7
  # Create dependencies
  make deps
  ```

#### Initializing dependencies

Run the following command to initialize the NGINX configuration file and etcd.

```shell
# initialize NGINX config file and etcd
make init
```

### Start Apache APISIX and configure the corresponding routes

1. Run the following command to start Apache APISIX. 2.

2. Create routes and configure the OpenID Connect plug-in.

The OpenID Connect configuration list is as follows.

|fields|default|description|
| :------| :------------ | :------- |
|client_id|""|OAuth client ID|
|client_secret|""|OAuth client key|
|discovery|""|the identity provider's service discovery endpoint|
|scope|openid|scope of resources to be accessed|
|relm|apisix|specifies the WWW-Authenticate response header authentication information|
|bearer_only|false|whether to check the token in the request header|
|logout_path|/logout|logout URI|
|redirect_uri|request_uri|The URI that the identity provider jumped back to, defaulting to the request address|
|timeout|3|The request timeout in seconds|
|ssl_verify|false|whether the identity provider verifies the ssl certificate|
|introspection_endpoint|""|the URL of the identity provider's token verification endpoint, which will be extracted from the discovery response if not filled|
|introspection_endpoint_auth_method|client_secret_basic|the name of the token's default authentication method|
|public_key|""|public key of the authentication token|
|token_signing_alg_values_expected|""|the algorithm for authenticating tokens|
|set_access_token_header|true|whether to carry the access token in the request header|
|access_token_in_authorization_header|false|Place the access token in the Authorization header if true, or in the X-Access-Token header if false|
|set_id_token_header|true|whether to carry the ID token in the X-ID-Token request header|
|set_userinfo_header|true|whether to carry user information in the X-Userinfo request header|

The following code example creates a route through the Apache APISIX Admin API, setting the route upstream to httpbin.org. httpbin.org is a simple backend service for receiving and responding to requests, and the get page of httpbin.org is used below, see [http bin get]( http://httpbin.org/#/HTTP_Methods/get_get).

Please refer to [Apache APISIX OpenID Connect Plugin](https://apisix.apache.org/zh/docs/apisix/plugins/openid-connect/) for specific configuration items.

```shell
curl -XPOST 127.0.0.1:9080/apisix/admin/routes -H "X-Api-Key: edd1c9f034335f136f87ad84b625c8f1" -d '{
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
            "redirect_uri": "http://127.0.0.1:9080/"
        }
    },
    "upstream":{
        "type": "roundrobin",
        "nodes":{
            "httpbin.org:80":1
        }
    }
}'
```

### Step 4: Accessing Apache APISIX

1. Visit http://127.0.0.1:9080/get and the page is redirected to the Okta login page because the OpenID Connect plugin is turned on.
  
![visit Okta login page](https://static.apiseven.com/202108/1639467566395-2a049b96-3b1f-4e74-93f0-d6ea2f52a72e.png)
  
2. Enter the password you registered with Okta and click "Sign in" to log in to your Okta account. 3.

3. After successful login, you can successfully access the get page in httpbin.org. The httpbin.org/get page will return the requested data as follows.

  ```sh
  "X-Access-Token": "******Y0RPcXRtc0FtWWVuX2JQaFo1ZVBvSlBNdlFHejN1dXY5elV3IiwiYWxnIjoiUlMyNTYifQ.***TVER3QUlPbWZYSVRzWHRxRWh2QUtQMWRzVDVGZHZnZzAiLCJpc3MiOiJodHRwczovL3FxdGVzdG1hbi5va3RhLmNvbSIsImF1ZCI6Imh0dHBzOi8vcXF0ZXN0bWFuLm9rdGEuY29tIiwic3ViIjoiMjgzMDE4Nzk5QHFxLmNvbSIsImlhdCI6MTYyODEyNjIyNSwiZXhwIjoxNjI4MTI5ODI1LCJjaWQiOiIwb2ExMWc4ZDg3TzBGQ0dYZzY5NiIsInVpZCI6IjAwdWEwNWVjZEZmV0tMS3VvNjk1Iiwic2NwIjpbIm9wZW5pZCIsInByb2Zpb***.****iBshIcJhy8QNvzAFD0fV4gh7OAdTXFMu5k0hk0JeIU6Tfg_Mh-josfap38nxRN5hSWAvWSk8VNxokWTf1qlaRbypJrKI4ntadl1PrvG-HgUSFD0JpyqSQcv10TzVeSgBfOVD-czprG2Azhck-SvcjCNDV-qc3P9KoPQz0SRFX0wuAHWUbj1FRBq79YnoJfjkJKUHz3uu7qpTK89mxco8iyuIwB8fAxPMoXjIuU6-6Bw8kfZ4S2FFg3GeFtN-vE9bE5vFbP-JFQuwFLZNgqI0XO2S7l7Moa4mWm51r2fmV7p7rdpoNXYNerXOeZIYysQwe2_L****",
  "X-Id-Token": "******aTdDRDJnczF5RnlXMUtPZUtuSUpQdyIsImFtciI6WyJwd2QiXSwic3ViIjoiMDB1YTA1ZWNkRmZXS0xLdW82OTUiLCJpc3MiOiJodHRwczpcL1wvcXF0ZXN0bWFuLm9rdGEuY29tIiwiYXVkIjoiMG9hMTFnOGQ4N08wRkNHWGc2OTYiLCJuYW1lIjoiUGV0ZXIgWmh1IiwianRpIjoiSUQuNGdvZWo4OGUyX2RuWUI1VmFMeUt2djNTdVJTQWhGNS0tM2l3Z0p5TTcxTSIsInZlciI6MSwicHJlZmVycmVkX3VzZXJuYW1lIjoiMjgzMDE4Nzk5QHFxLmNvbSIsImV4cCI6MTYyODEyOTgyNSwiaWRwIjoiMDBvYTA1OTFndHAzMDhFbm02OTUiLCJub25jZSI6ImY3MjhkZDMxMWRjNGY3MTI4YzlmNjViOGYzYjJkMDgyIiwiaWF0IjoxNjI4MTI2MjI1LCJhdXRoX3RpbWUi*****",
  "X-Userinfo": "*****lfbmFtZSI6IlpodSIsImxvY2FsZSI6ImVuLVVTIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMjgzMDE4Nzk5QHFxLmNvbSIsInVwZGF0ZWRfYXQiOjE2MjgwNzA1ODEsInpvbmVpbmZvIjoiQW1lcmljYVwvTG9zX0FuZ2VsZXMiLCJzdWIiOiIwMHVhMDVlY2RGZldLTEt1bzY5NSIsImdpdmVuX25hbWUiOiJQZXRlciIsIm5hbWUiOiJQZXRl****"
  ```

In which:

**X-Access-Token**: Apache APISIX puts the access token obtained from the user provider into the X-Access-Token request header, which can be optionally put into the Authorization request header via access_token_in_authorization_header in the plugin configuration.

![X-Access-Token](https://static.apiseven.com/202108/1639467626264-980605e2-0b21-4512-9e2c-af71950fcf99.png)

**X-Id-Token**: Apache APISIX will put the ID token obtained from the user provider into the X-Id-Token request header after base64 encoding, you can choose whether to enable this feature by using the set_id_token_header in the plugin configuration.

![X-Id-Token](https://static.apiseven.com/202108/1639467682902-ada726b8-b46b-460d-8313-ef47b38d13ab.png)

**X-Userinfo**: Apache APISIX will get the user information from the user provider and put it into X-Userinfo after base64 encoding, you can choose whether to turn it on or not by using set_userinfo_header in the plugin configuration, the default is on.

![X-Userinfo](https://static.apiseven.com/202108/1639467730566-fc8a8a76-a3aa-4b8e-bb13-505b50839877.png)

As you can see, Apache APISIX will carry the X-Access-Token, X-Id-Token, and X-Userinfo request headers to the upstream. The upstream can parse these headers to get the user ID information and user metadata.

We show the process of setting up centralized authentication from Okta directly in Apache APISIX. It is easy to get started by signing up for a free Okta developer account. This centralized approach to authentication reduces learning and maintenance costs for developers and provides a secure and streamlined user experience.

## About Okta

Okta is a customizable, secure centralized authentication solution. Okta can add authentication and authorization to your application. Get scalable authentication directly in your application without writing your own code. You can connect your application to Okta and define how users log in. Each time a user tries to authenticate, Okta verifies their identity and sends the required information back to your application.

## About Apache APISIX

Apache APISIX is a dynamic, real-time, high-performance API gateway that provides load balancing, dynamic upstream, canary release, service meltdown, authentication, observability, and other rich traffic management features. You can use Apache APISIX for traditional north-south traffic, as well as east-west traffic between services, or as a [Kubernetes Ingress Controller](https://github.com/apache/apisix-ingress-controller).

Hundreds of enterprises worldwide have used Apache APISIX to handle business-critical traffic, covering finance, Internet, manufacturing, retail, carriers, and more, such as NASA, the EU's Digital Factory, China Airlines, China Mobile, Tencent, Huawei, Sina Weibo, NetEase, Ke, 360, Taikang, Nayuki, and more.

Github: https://github.com/apache/apisix

Official website: https://apisix.apache.org
