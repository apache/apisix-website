---
title: "API Gateway Enhances Security by CSRF Plugin"
authors:
  - name: "Yuan Bao"
    title: "Author"
    url: "https://github.com/Baoyuantop"
    image_url: "https://github.com/Baoyuantop.png"
  - name: "Yilin Zeng"
    title: "Technical Writer"
    url: "https://github.com/yzeng25"
    image_url: "https://github.com/yzeng25.png"
keywords: 
- Apache APISIX
- API Security
- cross-site request forgery
- CSRF
- API Gateway
description: This article introduces `csrf`, the CSRF security plugin for API Gateway, and details how to secure your API information in APISIX with the help of the `csrf` plugin.
tags: [Plugins,Ecosystem]
---

> This article introduces `csrf`, the CSRF security plugin for Apache APISIX, and details how to secure your API information in Apache APISIX with the help of the `csrf` plugin.

<!--truncate-->

The key point of launching a cross-site request forgery attack is to make the target server unable to distinguish whether the source of many requests is a real user or an attacker. The general flow of the attack is that first the attacker will lure the user to navigate to a web page provided by the attacker. This page contains a request that is automatically sent to the target server. The page then loads normally and the request is automatically sent to the server. It appears to the server that the request is exactly the same as the request normally sent by the user, unaware that it was initiated by the attacker without the user's knowledge. Since the request carries some of the user's credentials, the attacker can get access to the user's information by parsing these credentials, thus creating a security risk.

This article introduces `csrf`, the CSRF security plugin for Apache APISIX, and details how to secure your API information in Apache APISIX with the help of the `csrf` plugin.

Apache APISIX is a dynamic, real-time, high-performance API gateway.

APISIX provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

## Plugin Introduction

The `csrf` plugin is implemented based on the `Double Submit Cookie` scheme. As defined in [RFC 7231#section-4.2.1](https://datatracker.ietf.org/doc/html/rfc7231.html#section-4.2.1), we consider the `GET`, `HEAD` and `OPTIONS` methods as **secure methods**. According to this convention, the `csrf` plug-in will let these three methods go directly, but will check the other methods and intercept any unsafe requests.

To defend against CSRF attacks, we need to create a token or identifier that cannot be forged and ensure that this is not sent with the attacker's request. The user needs to carry the token that the `csrf` plugin relies on in the request header, and the token is computed using a key for signing. This ensures that the token cannot be forged by others, thus securing the API.

![Plugin workflow](https://static.apiseven.com/202108/1645605178661-7c0bc3bc-9792-43fd-b3f6-b01c0f6b24db.png)

When the `csrf` plugin is enabled in a route, all request responses to that route will contain a Cookie carrying a `csrf token`.

The user needs to carry this Cookie in an insecure request for this route and add an additional field in the request header to carry the content of the cookie. The field is the `name` value in the plugin configuration so that the request passes the CSRF plugin's checks.

The user provides a random key in the plugin's configuration, which is used by the plugin to encrypt the token information with a sha256 hash and generate a CSRF token, thus ensuring that the token cannot be forged.

## How to Use the Plugin

### Enable CSRF Plugin in a Route

Create a route in APISIX using the Admin API and enable the csrf plugin.

```shell
curl -i http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "plugins": {
    "csrf": {
      "key": "edd1c9f034335f136f87ad84b625c8f1"
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:9001": 1
    }
  }
}'
```

There are three configuration parameters for the plugin.

- `key`: Required field, the value of the random secret key. The user needs to provide a random key.
- `expires`: Optional, the expiration time of the random secret key, the default value is 7200 seconds. Since the CSRF token is sent to the client using a Cookie, this configuration is placed in the Cookie's configuration to control the Cookie's expiration time. In addition, the plugin will also calculate the time to determine whether the token expires.
- `name`: Optional, the name of the CSRF token, the default value is `apisix-csrf-token`.

### Send a Request

The route is first accessed using a `POST` request.

```shell
curl -i http://127.0.0.1:9080/hello -X POST
```

Apache APISIX will intercept the request and return a `401` error. In the returned header you will find a Cookie set, which should be the default value `apisix-csrf-token=....` inside the Cookie if the name field of the plugin is not configured . This is the CSRF token generated by the CSRF plugin. In the request, you need to make sure that the request carries this Cookie and that the token is written in the request header.

```shell
HTTP/1.1 401 Unauthorized
Set-Cookie: apisix-csrf-token= ${apisix-csrf-token};path=/;Expires=Mon, 13-Dec-21 09:33:55 GMT
{"error_msg":"no csrf token in headers"}
```

Example of using JavaScript on the client side: reading Cookies using `js-cookie` and sending requests using `axios`.

```JavaScript
const token = Cookie.get('apisix-csrf-token');

const instance = axios.create({
  headers: {'apisix-csrf-token': token}
});
```

If the token in the Cookie does not match the token in the request header, the request will be intercepted by the `csrf` plugin, as shown in the following example.

```shell
curl -i http://127.0.0.1:9080/hello -X POST -H 'apisix-csrf-token: ${apisix-csrf-token}' -b 'apisix-csrf-token= ${apisix-csrf-token}'
```

```shell
HTTP/1.1 401 Unauthorized
Set-Cookie: apisix-csrf-token= ${apisix-csrf-token};path=/;Expires=Mon, 13-Dec-21 09:33:55 GMT
{"error_msg":"csrf token mismatch"}
```

Finally, use `curl` to verify regular access.

```shell
curl -i http://127.0.0.1:9080/hello -X POST -H 'apisix-csrf-token: ${apisix-csrf-token}' -b 'apisix-csrf-token= ${apisix-csrf-token}'
```

```shell
HTTP/1.1 200 OK
```

Internally, the plugin needs to verify that the token in the Cookie matches the token carried in the request header and recalculate the signature to verify that the token is valid.

### Disable the Plugin

Remove the relevant configuration information for the `csrf` plugin and then send a request to update the route to deactivate the plugin.

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

## Summary

This article describes in detail how the `csrf` plugin works and how to use it. We hope that this article can give you a clearer understanding of using the plugin to intercept CSRF attacks in Apache APISIX and facilitate its application in practical scenarios.

Apache APISIX is also currently working on additional plugins to support the integration of additional services, so if you are interested, feel free to start a discussion in [GitHub Discussion](https://github.com/apache/apisix/discussions), or via the [mailing list](https://apisix.apache.org/zh/docs/general/join) to communicate.
