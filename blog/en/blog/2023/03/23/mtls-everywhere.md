---
title: mTLS everywhere
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Security
  - TLS
  - DevOps
  - cert-manager
description: >
  Security in one's information system has always been among the most critical Non-Functional Requirements. Transport Secure Layer, aka TLS, formerly SSL, is among its many pillars. In this post, I'll show how to configure TLS for Apache APISIX.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/06/08/JXRmK9nZ_keys.jpeg
---

>Security in one's information system has always been among the most critical Non-Functional Requirements. Transport Secure Layer, _aka_ TLS, formerly SSL, is among its many pillars. In this post, I'll show how to configure TLS for [Apache APISIX](https://apisix.apache.org/).

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/mtls-everywhere/" />
</head>

## TLS in a few words

[TLS](https://wikipedia.org/wiki/Transport_Layer_Security) offers several capabilities:

* Server authentication: the client is confident that the server it exchanges data with is the right one. It avoids sending data, which might be confidential, to the wrong actor
* Optional client authentication: the other way around, the server only allows clients whose identity can be verified
* Confidentiality: no third party can read the data exchanged between the client and the server
* Integrity: no third party can tamper with the data

TLS works through certificates. A certificate is similar to an ID, proving the certificate's holder identity. Just like an ID, you need to trust who delivered it. Trust is established through a chain: if I trust Alice, who trusts Bob, who in turn trusts Charlie, who delivered the certificate, then I trust the latter. In this scenario, Alice is known as the **root certificate authority**.

TLS authentication is based on public key cryptography. Alice generates a public key/private key pair and publishes the public key. If one encrypts data with the public key, only the private key that generated the public key can decrypt them. The other usage is for one to encrypt data with the private key and everybody with the public key to decrypt it, thus proving their identity.

Finally, mutual TLS, _aka_ mTLS, is the configuration of two-way TLS: server authentication to the client, as usual, but also the other way around, client authentication to the server.

We now have enough understanding of the concepts to get our hands dirty.

## Generating certificates with cert-manager

A couple of root <abbr title="Certificate Authority">CA</abbr> are installed in browsers by default. That's how we can browse HTTPS websites safely, trusting that <https://apache.org> is the site they pretend to be. The infrastructure has no pre-installed certificates, so we must start from scratch.

We need at least one root certificate. In turn, it will generate all other certificates. While it's possible to do every manually, I'll rely on [cert-manager](https://cert-manager.io/) in Kubernetes. As its name implies, cert-manager is a solution to manage certificates.

Installing it with Helm is straightforward:

```bash
helm repo add jetstack https://charts.jetstack.io  #1

helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \                       #2
  --create-namespace \                             #2
  --version v1.11.0 \
  --set installCRDs=true \
  --set prometheus.enabled=false                   #3
```

1. Add the charts' repository
2. Install the objects in a dedicated namespace
3. Don't monitor, in the scope of this post

We can make sure that everything works as expected by looking at the pods:

```bash
kubectl get pods -n cert-manager
```

```
cert-manager-cainjector-7f694c4c58-fc9bk  1/1  Running  2  (2d1h ago)  7d
cert-manager-cc4b776cf-8p2t8              1/1  Running  1  (2d1h ago)  7d
cert-manager-webhook-7cd8c769bb-494tl     1/1  Running  1  (2d1h ago)  7d
```

cert-manager can sign certificates from multiple sources: HashiCorp Vault, Let's Encrypt, etc. To keep things simple:

* We will generate our dedicated root certificate, _i.e._, `Self-Signed`
* We won't handle certificates rotation

Let's start with the following:

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer                           #1
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: {}
---
apiVersion: v1
kind: Namespace
metadata:
  name: tls                                   #2
---
apiVersion: cert-manager.io/v1
kind: Certificate                             #3
metadata:
  name: selfsigned-ca
  namespace: tls
spec:
  isCA: true
  commonName: selfsigned-ca
  secretName: root-secret
  issuerRef:
    name: selfsigned-issuer
    kind: ClusterIssuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer                                  #4
metadata:
  name: ca-issuer
  namespace: tls
spec:
  ca:
    secretName: root-secret
```

1. Certificate authority that generates certificates **cluster-wide**
2. Create a namespace for our demo
3. Namespaced root certificate using the cluster-wide issuer. Only used to create a namespaced issuer
4. Namespaced issuer. Used to create all other certificates in the post

After applying the previous manifest, we should be able to see the single certificate that we created:

```bash
kubectl get certificate -n tls
```

```
NAME            READY   SECRET        AGE
selfsigned-ca   True    root-secret   7s
```

The certificate infrastructure is ready; let's look at Apache APISIX.

## Quick overview of a sample Apache APISIX architecture

[Apache APISIX](https://apisix.apache.org/) is an API Gateway. By default, it stores its configuration in [etcd](https://etcd.io/), a distributed key-value store - the same one used by Kubernetes. Note that in real-world scenarios, we should set up etcd clustering to improve the resiliency of the solution. For this post, we will limit ourselves to a single etcd instance. Apache APISIX offers an admin API via HTTP endpoints. Finally, the gateway forwards calls from the client to an upstream. Here's an overview of the architecture and the required certificates:

![Apache APISIX architecture](https://static.apiseven.com/uploads/2023/06/08/dplOhFAt_apisix-architecture.svg)

Let's start with the foundational bricks: etcd and Apache APISIX. We need two certificates: one for etcd, in the server role, and one for Apache APISIX, as the etcd client.

Let's set up certificates from our namespaced issuer:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: etcd-server                         #1
  namespace: tls
spec:
  secretName: etcd-secret                   #2
  isCA: false
  usages:
    - client auth                           #3
    - server auth                           #3
  dnsNames:
    - etcd                                  #4
  issuerRef:
    name: ca-issuer                         #5
    kind: Issuer
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: apisix-client                       #6
  namespace: tls
spec:
  secretName: apisix-client-secret
  isCA: false
  usages:
    - client auth
  emailAddresses:
    - apisix@apache.org                     #7
  issuerRef:
    name: ca-issuer                         #5
    kind: Issuer
```

1. Certificate for etcd
2. Kubernetes `Secret` name, see below
3. Usages for this certificate
4. Kubernetes `Service` name, see below
5. Reference the previously namespaced issuer created earlier
6. Certificate for Apache APISIX as a client of etcd
7. Mandatory attribute for clients

After applying the above manifest, we can list the certificates in the `tls` namespace:

```bash
kubectl get certificates -n tls
```

```
NAME              READY   SECRET                 AGE
selfsigned-ca     True    root-secret            8m59s    //1
apisix-client     True    apisix-client-secret   8m22s    //2
etcd-server       True    etcd-secret            8m54s    //2
```

1. Previously created certificate
2. Newly-created certificates signed by `selfsigned-ca`

## cert-manager's Certificates

So far, we have created `Certificate` objects, but we didn't explain what they are. Indeed, they are simple Kubernetes <abbr title="Custom Resource Definition">CRD</abbr>s provided by cert-manager. Under the cover, cert-manager creates a Kubernetes `Secret` from a `Certificate`. It manages the whole lifecycle, so deleting a `Certificate` deletes the bounded `Secret`. The `secretName` attribute in the above manifest sets the `Secret` name.

```bash
kubectl get secrets -n tls
```

```
NAME                   TYPE                DATA   AGE
apisix-client-secret   kubernetes.io/tls   3      35m
etcd-secret            kubernetes.io/tls   3      35m
root-secret            kubernetes.io/tls   3      35m
```

Let's look at a `Secret`, _e.g._, `apisix-client-secret`:

```bash
kubectl describe apisix-client-secret -n tls
```

```
Name:         apisix-client-secret
Namespace:    tls
Labels:       controller.cert-manager.io/fao=true
Annotations:  cert-manager.io/alt-names:
              cert-manager.io/certificate-name: apisix-client
              cert-manager.io/common-name:
              cert-manager.io/ip-sans:
              cert-manager.io/issuer-group:
              cert-manager.io/issuer-kind: Issuer
              cert-manager.io/issuer-name: ca-issuer
              cert-manager.io/uri-sans:

Type:  kubernetes.io/tls

Data
====
ca.crt:   1099 bytes
tls.crt:  1115 bytes
tls.key:  1679 bytes
```

A `Secret` created by a `Certificate` provides three attributes:

* `tls.crt`: The certificate itself
* `tls.key`: The private key
* `ca.crt`: The signing certificate in the certificate chain, _i.e._, `root-secret/tls.crt`

Kubernetes encodes `Secret` content in base 64. To get any of the above in plain text, one should decode it, _e.g._:

```bash
kubectl get secret etcd-secret -n tls -o jsonpath='{ .data.tls\.crt }' | base64
```

```
-----BEGIN CERTIFICATE-----
MIIDBjCCAe6gAwIBAgIQM3JUR8+R0vuUndjGK/aOgzANBgkqhkiG9w0BAQsFADAY
MRYwFAYDVQQDEw1zZWxmc2lnbmVkLWNhMB4XDTIzMDMxNjEwMTYyN1oXDTIzMDYx
NDEwMTYyN1owADCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMQpMj/0
giDVOjOosSRRKUwTzl1Wo2R9YYAeteOW3fuMiAd+XaBGmRO/+GWZQN1tyRQ3pITM
ezBgogYAUUNcuqN/UAsgH/JM58niMjZdjRKn4+it94Nj1e24jFL4ts2snCn7FfKJ
3zRtY9tyS7Agw3tCwtXV68Xpmf3CsfhPmn3rGdWHXyYctzAZhqYfEswN3hxpJZxR
YVeb55WgDoPo5npZo3+yYiMtoOimIprcmZ2Ye8Wai9S4QKDafUWlvU5GQ65VVLzH
PEdOMwbWcwiLqwUv889TiKiC5cyAD6wJOuPRF0KKxxFnG+lHlg9J2S1i5sC3pqoc
i0pEQ+atOOyLMMECAwEAAaNkMGIwHQYDVR0lBBYwFAYIKwYBBQUHAwIGCCsGAQUF
BwMBMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAU2ZaAdEficKUWPFRjdsKSEX/l
gbMwEgYDVR0RAQH/BAgwBoIEZXRjZDANBgkqhkiG9w0BAQsFAAOCAQEABcNvYTm8
ZJe3jUq6f872dpNVulb2UvloTpWxQ8jwXgcrhekSKU6pZ4p9IPwfauHLjceMFJLp
t2eDi5fSQ1upeqXOofeyKSYjjyA/aVf1zMI8ReCCQtQuAVYyJWBlNLc3XMMecbcp
JLGtd/OAZnKDeYYkUX7cJ2wN6Wl/wGLM2lxsqDhEHEZwvGL0DmsdHw7hzSjdVmxs
0Qgkh4jVbNUKdBok5U9Ivr3P1xDPaD/FqGFyM0ssVOCHxtPxhOUA/m3DSr6klfEF
McOfudZE958bChOrJgVrUnY3inR0J335bGQ1luEp5tYwPgyD9dG4MQEDD3oLwp+l
+NtTUqz8WVlMxQ==
-----END CERTIFICATE-----
```

## Configuring mTLS between etcd and APISIX

With the certificates available, we can now configure mutual TLS between etcd and APISIX. Let's start with etcd:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: etcd
  namespace: tls
  labels:
    role: config
spec:
  containers:
    - name: etcd
      image: bitnami/etcd:3.5.7
      ports:
        - containerPort: 2379
      env:
        - name: ETCD_TRUSTED_CA_FILE        #1
          value: /etc/ssl/private/ca.crt
        - name: ETCD_CERT_FILE              #2
          value: /etc/ssl/private/tls.crt
        - name: ETCD_KEY_FILE               #3
          value: /etc/ssl/private/tls.key
        - name: ETCD_ROOT_PASSWORD
          value: whatever
        - name: ETCD_CLIENT_CERT_AUTH       #4
          value: "true"
        - name: ETCD_LISTEN_CLIENT_URLS
          value: https://0.0.0.0:2379
      volumeMounts:
        - name: ssl
          mountPath: /etc/ssl/private       #5
  volumes:
    - name: ssl
      secret:
        secretName: etcd-secret             #5
```

1. Set the trusted CA
2. Set the certificate
3. Set the private key
4. Require clients to pass their certificate, hence ensuring mutual authentication
5. Mount the previously generated secret in the container for access

Now, it's Apache APISIX's turn:

```yaml
apiVersion: v1
kind: ConfigMap                                            #1
metadata:
  name: apisix-config
  namespace: tls
data:
  config.yaml: >-
    apisix:
      ssl:
        ssl_trusted_certificate: /etc/ssl/certs/ca.crt     #2
    deployment:
      etcd:
        host:
          - https://etcd:2379
        tls:
          cert: /etc/ssl/certs/tls.crt                     #2
          key: /etc/ssl/certs/tls.key                      #2
      admin:
        allow_admin:
          - 0.0.0.0/0
        https_admin: true                                  #3
        admin_api_mtls:
          admin_ssl_cert: /etc/ssl/private/tls.crt         #3
          admin_ssl_cert_key: /etc/ssl/private/tls.key     #3
          admin_ssl_ca_cert: /etc/ssl/private/ca.crt       #3
---
apiVersion: v1
kind: Pod
metadata:
  name: apisix
  namespace: tls
  labels:
    role: gateway
spec:
  containers:
    - name: apisix
      image: apache/apisix:3.2.0-debian
      ports:
        - containerPort: 9443                              #4
        - containerPort: 9180                              #5
      volumeMounts:
        - name: config                                      #1
          mountPath: /usr/local/apisix/conf/config.yaml
          subPath: config.yaml
        - name: ssl                                        #6
          mountPath: /etc/ssl/private
        - name: etcd-client                                #7
          mountPath: /etc/ssl/certs
  volumes:
    - name: config
      configMap:
        name: apisix-config
    - name: ssl                                            #6,8
      secret:
        secretName: apisix-server-secret
    - name: etcd-client                                    #7,8
      secret:
        secretName: apisix-client-secret
```

1. Apache APISIX doesn't offer configuration via environment variables. We need to use a `ConfigMap` that mirrors the regular `config.yaml` file
2. Configure _client_ authentication for etcd
3. Configure _server_ authentication for the Admin API
4. Regular HTTPS port
5. Admin HTTPS port
6. Certificates for server authentication
7. Certificates for client authentication
8. Two sets of certificates are used, one for server authentication for the Admin API and regular HTTPS, and one for client authentication for etcd.

At this point, we can apply the above manifests and see the two pods communicating. When connecting, Apache APISIX sends its `apisix-client` certificate via HTTPS. Because an authority signs the certificate that etcd trusts, it allows the connection.

I've omitted the `Service` definition for brevity's sake, but you can check them in the associated [GitHub repo](https://github.com/ajavageek/tls-apisix).

```
NAME     READY   STATUS    RESTARTS   AGE
apisix   1/1     Running   0          179m
etcd     1/1     Running   0          179m
```

## Client access

Now that we've set up the basic infrastructure, we should test accessing it with a client. We will use our faithful `curl`, but any client that allows configuring certificates should work, _e.g_, httpie.

The first step is to create a dedicated certificate-key pair for the client:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: curl-client
  namespace: tls
spec:
  secretName: curl-secret
  isCA: false
  usages:
    - client auth
  emailAddresses:
    - curl@localhost.dev
  issuerRef:
    name: ca-issuer
    kind: Issuer
```

`curl` requires a path to the certificate file instead of the content. We can go around this limitation through the magic of zsh: the `=( ... )` syntax allows the creation of a temporary file. If you're using another shell, you'll need to find the equivalent syntax or download the files manually.

Let's query the Admin API for all existing routes. This simple command allows checking that Apache APISIX is connected to etcd, and it can read its configuration from there.

```bash
curl --resolve 'admin:32180:127.0.0.1' https://admin:32180/apisix/admin/routes \                     #1
     --cert =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.crt }' | base64 -d) \  #2
     --key =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.key }' | base64 -d) \   #2
     --cacert =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.ca\.crt }' | base64 -d) \ #2
     -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1'
```

1. `--resolve` avoids polluting one's `/etc/hosts` file. `curl` will translate `admin` to `localhost`, but the query is sent to `admin` inside the Kubernetes cluster, thus using the correct `Service`
2. Get the required data inside the `Secret`, decode it, and use it as a temporary file

If everything works, and it should, the result should be the following:

```json
{"total":0,"list":[]}
```

No routes are available so far because we have yet to create any.

## TLS with upstreams

Last but not least, we should configure TLS for upstreams. In the following, I'll use a simple [nginx](https://nginx.org/) instance that responds with static content. Use it as an illustration for more complex upstreams.

The first step, as always, is to generate a dedicated `Certificate` for the upstream. I'll skip how to do it as we already created a few. I call it `upstream-server` and its `Secret`, unimaginatively, `upstream-secret`. We can now use the latter to secure nginx:

```yaml
apiVersion: v1
kind: ConfigMap                                           #1
metadata:
  name: nginx-config
  namespace: tls
data:
  nginx.conf: >-
    events {
      worker_connections 1024;
    }
    http {
      server {
        listen              443 ssl;
        server_name         upstream;
        ssl_certificate     /etc/ssl/private/tls.crt;     #2
        ssl_certificate_key /etc/ssl/private/tls.key;     #2

        root /www/data;
        location / {
            index index.json;
        }
      }
    }
---
apiVersion: v1
kind: Pod
metadata:
  name: upstream
  namespace: tls
  labels:
    role: upstream
spec:
  containers:
    - name: upstream
      image: nginx:1.23-alpine
      ports:
        - containerPort: 443
      volumeMounts:
        - name: config
          mountPath: /etc/nginx/nginx.conf                #1
          subPath: nginx.conf
        - name: content
          mountPath: /www/data/index.json                 #3
          subPath: index.json
        - name: ssl                                       #2
          mountPath: /etc/ssl/private
  volumes:
    - name: config
      configMap:
        name: nginx-config
    - name: ssl                                           #2
      secret:
        secretName: upstream-secret
    - name: content                                       #3
      configMap:
        name: nginx-content
```

1. nginx doesn't allow configuration via environment variables; we need to use the `ConfigMap` approach
2. Use the key-certificate pair created via the `Certificate`
3. Some static content unimportant in the scope of this post

The next step is to create the route with the help of the Admin API. We prepared everything in the previous step; now we can use the API:

```bash
curl --resolve 'admin:32180:127.0.0.1' https://admin:32180/apisix/admin/routes/1 \
     --cert =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.crt }' | base64 -d) \     #1
     --key =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.key }' | base64 -d) \      #1
     --cacert =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.ca\.crt }' | base64 -d) \    #1
     -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d "{
        \"uri\": \"/\",
        \"upstream\": {
          \"scheme\": \"https\",                                                                        #2
          \"nodes\": {
            \"upstream:443\": 1
          },
          \"tls\": {
            \"client_cert\": \"$(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.crt }' | base64 -d)\", #3
            \"client_key\": \"$(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.key }' | base64 -d)\"   #3
          }
        }
     }"
```

1. Client auth for Admin API, as above
2. Use HTTPS for the upstream
3. Configure key-certificate pair for the route. Apache APISIX stores the data in etcd and will use them when you call the route. Alternatively, you can keep the pair as a dedicated object and use the newly-created reference (just like for upstreams). It depends on how many routes the certificate needs. For more information, check the [SSL endpoint](https://apisix.apache.org/docs/apisix/admin-api/#ssl)

Finally, we can check it works as expected:

```bash
curl --resolve 'upstream:32443:127.0.0.1' https://upstream:32443/ \
     --cert =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.crt }' | base64 -d) \
     --key =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.tls\.key }' | base64 -d) \
     --cacert =(kubectl get secret curl-secret -n tls -o jsonpath='{ .data.ca\.crt }' | base64 -d)
```

And it does:

```json
{ "hello": "world" }
```

## Conclusion

In this post, I've described a working Apache APISIX architecture and implemented mutual TLS between all the components: etcd and APISIX, client and APISIX, and finally, client and upstream. I hope it will help you to achieve the same.

The complete source code for this post can be found on [GitHub](https//github.com/ajavageek/tls-apisix).

**To go further:**

* [How to Easily Deploy Apache APISIX in Kubernetes](https://apisix.apache.org/blog/2021/12/15/deploy-apisix-in-kubernetes/)
* [cert-manager](https://cert-manager.io/)
* [A Simple CA Setup with Kubernetes Cert Manager](https://medium.com/geekculture/a-simple-ca-setup-with-kubernetes-cert-manager-bc8ccbd9c2)
* [Mutual TLS Authentication](https://apisix.apache.org/docs/apisix/mtls/)
