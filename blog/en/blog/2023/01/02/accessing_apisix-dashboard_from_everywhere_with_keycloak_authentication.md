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

## Keycloak installation
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

Go to the administration console

![k6k02](https://github.com/MirtoBusico/assets-for-blogs/blob/main/k6k02.png)

Login and the “Master” realm appears. Note the Keycloak version


![k6k03](https://github.com/MirtoBusico/assets-for-blogs/blob/main/k6k03.png)

## Automatic Keycloak startup

> Work on **hserv**

Create in **“/usr/lib/systemd/system”** a file named **“keycloak.service”** containing
```
[Unit]
Description=keycloak service
After=network.service

[Service]
ExecStart=/home/sysop/H/keycloak-20.0.1/bin/kc.sh start-dev >/var/log/keycloak.log 2>&1
PIDFile=/var/run/keycloak.pid

[Install]
WantedBy=multi-user.target
```
Enable and activate the service
```
sudo systemctl enable keycloak
sudo systemctl start keycloak
```
Reboot hserv and verify Keycloak is accessible at startup

## Create site and certificates for "https://k6k.h.net"
> Work on **hserv**

Verify that the keycloak address was added in "/etc/hosts" on any machine that will access the service and is reported in the DNS server hosted on **hserv**.

The address used is the exsternal address o the **hsrv** machine

In the **"/etc/hosts"** fle add the line
```
192.168.100.20 k6k k6k.h.net
```

In the DNS server on **hserv** add the k6k entry in the **“h.net”** DNS zone with address **“192.168.100.20”**

![dns01](https://github.com/MirtoBusico/assets-for-blogs/blob/main/dns01.png)

Create the certificate for **"k6k.h.net"**

In **"~/H/hservcerts"** create a file called **"k6kssl.cnf"** containing
```
[req]
default_bits = 2048
distinguished_name = req_distinguished_name
prompt = no

[req_distinguished_name]
C = IT
ST = Italy
L = Rome
O = Busico Mirto
OU = Laboratory
CN = k6k.h.net

[v3_ca]
subjectAltName = @alt_names

[alt_names]
DNS.1 = k6k
# other names
DNS.2 = k6k.h.net
DNS.3 = k6k.ext.h.net
DNS.4 = k6k.int.h.net
```
Create the server private key and csr certificate request
```
cd ~/H/hservcerts
sudo openssl req -new -sha256 -nodes -newkey rsa:2048 -keyout k6k.key -out k6k.csr -config k6kssl.cnf
```

Create the certificate signed by the **"hservca"** certification authority
```
sudo openssl x509 -req -in k6k.csr -CA hservca.pem -CAkey hservca.key -CAcreateserial -out k6k.crt -sha256 -days 3650 -extfile k6kssl.cnf -extensions v3_ca
```
Now you have the key file **k6k.key** and the certificate file **k6k.cert** to be used in the nginx reverse proxy

Change the access rights for k6k.key file to permit nginx access
```
cd ~/H/hservcerts
sudo chmod a+r k6k.key
```
Create the root directory for k6k under nginx and create an index.html file in that directory
```
sudo mkdir /usr/share/nginx/k6k
sudo chmod 777 /usr/share/nginx/k6k
vi /usr/share/nginx/k6k/index.html
```
Put in index.html filke the "K6K" base document
```
<!DOCTYPE html>
<html>
<text>

<h1>K6K default page</h1>

</text>
</html>
```
In the directory **“/etc/nginx/conf.d”** create the file **“k6k.conf”**
```
cd /etc/nginx/conf.d
sudo vi k6k.conf
```
The file contains
```
server {

    listen 443 ssl http2;
    server_name k6k.h.net;
    root   /usr/share/nginx/k6k;
    
    access_log  /var/log/nginx/k6k.access.log;
    error_log  /var/log/nginx/k6k.error.log;

    ssl_certificate     /home/sysop/H/hservcerts/k6k.crt;
    ssl_certificate_key /home/sysop/H/hservcerts/k6k.key;

    
    location / {
        index  index.html index.htm;
    }

    error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```
Restart Nginx
```
sudo systemctl restart nginx
```
Try to access “https://k6k.h.net” from a browser: the k6k base document will be showed

## Add keycloak reverse proxy

In the directory **“/etc/nginx/conf.d”** change the file **“k6k.conf”** to proxy keycloak
```
cd /etc/nginx/conf.d
sudo vi k6k.conf
```
The file now contains
```
server {

    listen 443 ssl http2;
    server_name k6k.h.net;
    root   /usr/share/nginx/k6k;
    
    access_log  /var/log/nginx/k6k.access.log;
    error_log  /var/log/nginx/k6k.error.log;

    ssl_certificate     /home/sysop/H/hservcerts/k6k.crt;
    ssl_certificate_key /home/sysop/H/hservcerts/k6k.key;

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    location / {
        proxy_pass http://127.0.0.1:8080;
    }

    error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}
```
Restart Nginx
```
sudo systemctl restart nginx
```
Rebuild keycloak for production
```
cd ~/H/keycloak-20.0.1/bin/
./kc.sh --verbose build
```




