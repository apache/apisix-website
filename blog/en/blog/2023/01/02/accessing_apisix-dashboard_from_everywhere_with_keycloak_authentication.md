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

| VM Name | Role | Services | Description |
|-------------|------|----------|-------------|
|   hdev      |  Development    |kubectl, istioctl, helm          | workstation from where manage the cluster   |
|   hserv     |  external services    | DNS server, Nginx, Keycloak          | services used by the cluster vm and external users            |
|   hkm       | Kubernetes master     | master node         | control plane manager for K8S            |
|   hkw1      | K8S worker 1    | first worker node         |     node for hosting pods        |
|   hkw2      | K8S worker 2    | second worker node         |     node for hosting pods        |
|   hkw3      | K8S worker 3    | third worker node         |     node for hosting pods        |

The **hserv** vm have two lan cards: one on an external lan to expose services and one an internal lan to communicate with the Kubernetes (from now K8S) cluster.
All the other VM are only connected to the internal lan.
All the machines resolve the IP addresses using the DNS server installed on **hserv**

> The real framework is more complex. Here are reported only the relevant components

All machines use Ubuntu distribution but commands reported here should worh for other distributions with some modifications.
The username used throughout this article will be **"sysop"** So the home directory will be indicated as **"/home/sysop"** or **"~/"**.

# Create a Certification authority and certificates

For all the VM the DNS server will resolve **"apisix.h.net"** to the external address of **hserv**.
For all others machine that will access the the services exposed by **hserv** there will be a line in the **"/etc/hosts"** file resolving **"apisix.h.net"** to the external address of **hserv**.

> Working on **hserv**

Create the directory for the entire project software
```
cd
mkdir H
```
Create the directory to hold the Certification authority (from now CA) certificates and the web sites certificates
```
cd ~/H
mkdir hservcerts
cd hservcerts
```
Create a private key for **"hservca"**
```
sudo openssl genrsa -out hservca.key 2048
```
This generates a **hservca.key** key file. Using this fiile generate the CA certificate
```
sudo openssl req -x509 -new -nodes -key hservca.key -sha256 -days 3650 -out hservca.pem
```
This generates a **hservca.pem"** certificate file. These two files will be used to create the web sites certificates


## Add the CA to browsers
To be able to access the web sites with certidicates issued by this private CA, the CA certificate file have to be added to the web browser that will access these sites.

Copy the **"hservca.pem"** file in any machine that will access these sites.

For **Firefox** browser go to:
```
Preferences -> Privacy & Security -> Certificates -> View Certificates -> Authorities -> Import 
```
and import **"hservca.pem"** (remember to flag all options)

For **Chromium** or **Chrome** browsers go to:
```
Settings -> Advanced -> Privacy and security -> Manage certificates -> Authorities -> Import (flag all options)
```
and import **"hservca.pem"** (remember to flag all options)

## Add the CA to the operating system






