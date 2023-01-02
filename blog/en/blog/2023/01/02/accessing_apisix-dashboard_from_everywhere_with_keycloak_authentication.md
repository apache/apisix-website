---
title: "Accessing Apisix-dashboard from everywhere with Keycloak authentication"
authors:
  - name: "Busico Mirto Silvio"
    title: ""
    url: "https://github.com/MirtoBusico"
    image_url: "https://avatars.githubusercontent.com/u/11090934?s=400&u=644e4f87c2fad56760f6eb4f46cbcb4db059880a&v=4"
keywords:
  - Apache APISIX
  - API Gateway
  - Authentication
  - OpenID Connect
  - Keycloak
  - Nginx reverse proxy
  - openid-connect
description: This article describes how to expose Apisix-dashboard using Apisix to authenticate the access using openid-connect plugin and a Keycloak server to manage identities
tags: [Authentication, Plugins]
image: https://github.com/MirtoBusico/assets-for-blogs/blob/main/blog01a.png
---

> This article describes how to setup an external access to apisix dashboard protecting the URL with authentication managed by a keycloak server.

<!--truncate-->




# Accessing Apisix-dashboard from everywhere with Keycloak authentication

> Work in progress

![framework](https://github.com/MirtoBusico/assets-for-blogs/blob/main/blog01a.png)

This article presents how to setup a framework where a user can access the Apisix-dashboard protected by authentication managed by a Keycloak server.

# Prerequisites

Basic understanding of nginx reverse proxy, kubernetes, apisix and openid connect.

> A lot of information can be found in ["Use Keycloak with API Gateway to secure APIs"](https://apisix.apache.org/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis/) blog post

Here I'll present instructions, examples, code and screenshots taken from my home lab.



My framework consists of some KVM virtual machines:









