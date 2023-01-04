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

**Hserv** and **hdev** machines have a Graphical User Interface (from now GUI). All the other machines have only the character console.

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
> Working on hdev
 
Copy the "hservca.pem" file in the "/home/sysop" directory.
Copy this file on any other machine that will use sertificates signed by this CA.

> Work on any machine

Then on any host and hserv do the following:
> **Attention**:
> 
>    • "dpkg-reconfigure ca-certificates" do not recognize the ".pem" extension. Copy the **"hservca.pem"** file to **"hservca.crt"**
>    
>    • select the new certificate in "dpkg-reconfigure ca-certificates" (extra/hservca.crt is not selected)

```
cd
sudo mkdir -p /usr/share/ca-certificates/extra
sudo cp hservca.pem /usr/share/ca-certificates/extra/hservca.crt
sudo dpkg-reconfigure ca-certificates
```

Confirm that you want to proceed: select “yes” and click “Ok”. Select the new “hservca.crt” entry and click “Ok”

![confirm](https://github.com/MirtoBusico/assets-for-blogs/blob/main/ca-certificates.png)

# Install nginx-mainline

Verify the system is updated
```
sudo apt update
sudo apt full-upgrade
```
Install prerequisites
```
sudo apt install wget gnupg2 ca-certificates lsb-release ubuntu-keyring software-properties-common -y
```
Download the Nginx GPG key
```
wget -O- https://nginx.org/keys/nginx_signing.key | sudo gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg
```
Add the Nginx mainline apt repository
```
echo deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx | sudo tee /etc/apt/sources.list.d/nginx-mainline.list
```
Pin the Nginx repository
```
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx
```
Update apt and install nginx
```
sudo apt update
sudo apt install nginx
```

# Install Keycloak
> Work on **hserv**

## Prerequisites
Install jdk
```
sudo apt install default-jdk
```
Remove anacron
```
sudo apt remove anacron
```
Reboot the **hserv** machine

##  10.2  Keycloak installation
Go in base installation directory and get keycloak installation files (verify what is the last release)
```
cd ~/H/
wget https://github.com/keycloak/keycloak/releases/download/20.0.1/keycloak-20.0.1.zip
```
Extract the files
```
unzip keycloak-20.0.1.zip
```
Go to the bin directory and start keycloak in standalone mode
```
cd ~/H/keycloak-20.0.1/bin/
./kc.sh start-dev
```
Verify that Keycloak is accessible from hserv at the URL **"http://localhost:8080"**

Create the admin user as name **"admin"** and password **"1357Togo"**

![k6k01](https://github.com/MirtoBusico/assets-for-blogs/blob/main/k6k01.png)





