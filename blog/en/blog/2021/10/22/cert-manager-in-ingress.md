---
title: "APISIX Ingress Controller manages certificates with Cert Manager"
author: "Chao Zhang"
authorURL: "https://github.com/tokers"
authorImageURL: "https://avatars.githubusercontent.com/u/10428333?v=4"
keywords: 
- Apache APISIX Ingress Controller
- Apache APISIX
- API Gateway
- Cert Manager
- Kubernetes
description: This article shows how to create a certificate and pair it with Apache APISIX Ingress Controller via the Cert Manager.
tags: [Ecosystem]
---

> This article shows how to create a certificate and pair it with Apache APISIX Ingress Controller via the Cert Manager.

<!--truncate-->

[Apache APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller)  is a [Kubernetes Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) Open Source Tool that uses [Apache APISIX](http://apisix.apache.org/) as a data surface and has been updated to [v1.3](https://github.com/apache/apisix-ingress-controller/blob/master/CHANGELOG.md#130) with features such as certificate management, load balancing, Canary Publishing, and more.

For a long time, certificate management is not a simple thing although Apache APISIX Ingress Controller supports extracting certificates and private keys from Kubernetes Secrets Resources and converting them into Apache APISIX recognizable SSL objects, but this is only a part of the whole certificate management chain, certificate issuance, rotation, revocation logic still need to be implemented by administrators, especially when the number of certificates is relatively large, the workload is often not small, so it takes up a lot of the administrator’s time.

[Cert Manager](https://cert-manager.io/docs/) is a piece of software dedicated to simplifying certificate management on the Kubernetes platform and supports docking many different certificate sources, such as [Let’s Encrypt](https://letsencrypt.org/) and [HashiCorp Vault](https://www.vaultproject.io/).

If you’re having trouble with certificate management when using Apache APISIX Ingress Controller, using the Cert Manager is a good option, and this article shows how to create a certificate and pair it with Apache APISIX Ingress Controller via the Cert Manager.

## Step 1: Environmental Preparation

If you want to follow the instructions in this article, make sure the following environments and tools are in place:

1. To prepare a usable Kubernetes cluster, in the development environment, you can use [Kind](https://kind.sigs.k8s.io/) and [Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)
3. Install [kubectl](https://kubernetes.io/docs/tutorials/hello-minikube/)
4. Install [Helm v3](https://helm.sh/)

> Note that all of the following operations will be performed in the ingress-apisix namespace, so you need to create the namespace first: `kubectl create namespace ingress-apisix`

## Step 2：Install Apache APISIX Ingress Controller

You can install Apache APISIX Ingress Controller via Helm, including Apache APISIX and etcd clusters for data planes.

``` shell
helm repo add apisix https://charts.apiseven.com
helm repo update
helm install apisix apisix/apisix --set gateway.tls.enabled=true --set ingress-controller.enabled=true --namespace ingress-apisix
```

Click to view the [installation details](https://github.com/apache/apisix-helm-chart/blob/master/charts/apisix/README.md).

## Step 3：Install Cert Manager

To Install Cert Manager from Helm, click to view the [installation details](https://cert-manager.io/docs/installation/).

```shell
helm install cert-manager jetstack/cert-manager --namespace ingress-apisix  --set prometheus.enabled=false --set installCRDs=true
```

Please wait for a moment after installation to check the running status of the components and make sure that all the components are working properly. You can do this by following the command.

```shell
kubectl get all -n ingress-apisix
```

The result is as follows, indicating that all components are working properly.

```shell
NAME                                             READY   STATUS        RESTARTS   AGE
pod/apisix-5d99956d88-j68sj                      1/1     Running       0          63s
pod/apisix-69459554d4-btnwn                      0/1     Terminating   0          57m
pod/apisix-etcd-0                                1/1     Running       0          57m
pod/apisix-etcd-1                                1/1     Running       0          57m
pod/apisix-etcd-2                                0/1     Running       0          50s
pod/apisix-ingress-controller-7b5c767cc7-j62hb   1/1     Running       0          55m
pod/cert-manager-5ffd4f6c89-q9f7m                1/1     Running       0          45m
pod/cert-manager-cainjector-748dc889c5-nrvkh     1/1     Running       0          45m
pod/cert-manager-startupapicheck-kmgxf           0/1     Completed     0          45m
pod/cert-manager-webhook-bc964d98b-mkjj7         1/1     Running       0          45m

NAME                                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
service/apisix-admin                ClusterIP   10.96.16.25     <none>        9180/TCP                     57m
service/apisix-etcd                 ClusterIP   10.96.232.251   <none>        2379/TCP,2380/TCP            57m
service/apisix-etcd-headless        ClusterIP   None            <none>        2379/TCP,2380/TCP            57m
service/apisix-gateway              NodePort    10.96.118.75    <none>        80:32039/TCP,443:30107/TCP   57m
service/apisix-ingress-controller   ClusterIP   10.96.13.76     <none>        80/TCP                       57m
service/cert-manager-webhook        ClusterIP   10.96.182.188   <none>        443/TCP                      45m

NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/apisix                      1/1     1            1           57m
deployment.apps/apisix-ingress-controller   1/1     1            1           57m
deployment.apps/cert-manager                1/1     1            1           45m
deployment.apps/cert-manager-cainjector     1/1     1            1           45m
deployment.apps/cert-manager-webhook        1/1     1            1           45m

NAME                                                   DESIRED   CURRENT   READY   AGE
replicaset.apps/apisix-5d99956d88                      1         1         1       63s
replicaset.apps/apisix-69459554d4                      0         0         0       57m
replicaset.apps/apisix-ingress-controller-74c6b5fbdd   0         0         0       57m
replicaset.apps/apisix-ingress-controller-7b5c767cc7   1         1         1       55m
replicaset.apps/apisix-ingress-controller-7d58db957c   0         0         0       55m
replicaset.apps/cert-manager-5ffd4f6c89                1         1         1       45m
replicaset.apps/cert-manager-cainjector-748dc889c5     1         1         1       45m
replicaset.apps/cert-manager-webhook-bc964d98b         1         1         1       45m

NAME                           READY   AGE
statefulset.apps/apisix-etcd   2/3     57m

NAME                                     COMPLETIONS   DURATION   AGE
job.batch/cert-manager-startupapicheck   1/1           6m24s      45m
```

> The mechanism of the [Kubernetes Controller Manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) determines that the Pod name will be different.

## Step 4: Apply for a Certificate and Test it

First we need to configure the credential issuing object.

```yaml
# issuer.yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: issuer
  namespace: ingress-apisix
spec:
  selfSigned: {}
```

And create a self-signed certificate issuer.

```shell
kubectl apply -f issuer.yaml
```

> Note that self-signed authoring objects are not recommended for use in production environments! See [here](https://cert-manager.io/docs/configuration/) for more on the configuration of the certificate authority object.

。Then create a certificate for the domain name `httpbin. org`.

```yaml
# httpbin-cert.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: httpbin
  namespace: ingress-apisix
spec:
  secretName: httpbin
  duration: 2160h # 90d
  renewBefore: 360h # 15d
  subject:
    organizations:
      - foo
  commonName: httpbin.org
  isCA: false
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  usages:
    - server auth
  dnsNames:
    - "httpbin.org"
    - "*.httpbin.org"
  issuerRef:
    name: issuer
    kind: Issuer
    group: cert-manager.io
```

```shell
kubectl apply -f httpbin-cert.yaml
```

At this point, it is necessary to see whether the corresponding Secrets have been created.

```shell
kubectl get secrets -n ingress-apisix httpbin
NAME      TYPE                DATA   AGE
httpbin   kubernetes.io/tls   3      2m5s
```

With the above validation, the creation of the Secrets object has been captured by Apache APISIX Ingress Controller, we try to access Apache APISIX Ingress Controller to verify the certificate is valid, first we need to create additional routing objects.

```shell
# Create backend
kubectl run httpbin --image kennethreitz/httpbin --namespace ingress-apisix
kubectl expose pod httpbin -n ingress-apisix --port 80
```

```yaml
# Define ApisixTls Objects
apiVersion: apisix.apache.org/v1
kind: ApisixTls
metadata:
  name: httpbin
  namespace: ingress-apisix
spec:
  hosts:
  - httpbin.org
  secret:
    name: httpbin
    namespace: ingress-apisix
---
# Define the route to access the backend
apiVersion: apisix.apache.org/v2beta1
kind: ApisixRoute
metadata:
  name: httpbin
  namespace: ingress-apisix
spec:
  http:
  - name: httpbin
    match:
      paths:
      - /*
      hosts:
      - httpbin.org
    backends:
    - serviceName: httpbin
      servicePort: 80
```

Next access the service `apisix-gateway`. Note that the service is `NodePort` by default, and you can change its type as needed. If your Kubernetes cluster is hosted by the cloud vendor, consider changing it to the `LoadBalancer` type, to get an externally accessible IP.

Here we map the service to local via port forwarding.

```shell
kubectl port-forward -n ingress-apisix svc/apisix-gateway 8443:443
```

Then start configuring access.

```shell
curl https://httpbin.org:8443/json --resolve 'httpbin.org:8443:127.0.0.1' -sk
{
  "slideshow": {
    "author": "Yours Truly",
    "date": "date of publication",
    "slides": [
      {
        "title": "Wake up to WonderWidgets!",
        "type": "all"
      },
      {
        "items": [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets"
        ],
        "title": "Overview",
        "type": "all"
      }
    ],
    "title": "Sample Slide Show"
  }
}
```

After the above operation, you can see that the access was successful, that the certificate has been validated. Note that since the certificate is self-signed, the `-k` option needs to be added to ignore the certificate validation.

In addition, if you want to rotate the certificate, remove the `httpbin` as the Secret object, and Cert Manager immediately creates a new httpbin Secret object and includes the new certificate.

## Summary

This article focuses on how to use the CERT Manager to create and manage certificates in Apache APISIX Ingress Controller. For more on Apache APISIX Ingress, [see this article](https://apisix.apache.org/zh/blog/2021/10/09/apisix-ingress-techblog/).

Or take part in a biweekly [online discussion](https://github.com/apache/apisix-ingress-controller/issues/614) on the Apache APISIX Ingress Project to share current project progress, best practices, and design ideas.
