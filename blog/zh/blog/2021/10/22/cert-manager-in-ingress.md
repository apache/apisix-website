---
title: "如何在 APISIX Ingress Controller 中使用 Cert Manager 管理证书"
author: "张超"
authorURL: "https://github.com/tokers"
authorImageURL: "https://avatars.githubusercontent.com/u/10428333?v=4"
keywords: 
- Apache APISIX Ingress Controller
- Apache APISIX
- API 网关
- Cert Manager
- Kubernetes
description: Apache APISIX Ingress Controller 已经实现了证书管理、负载均衡、金丝雀发布等功能，本文介绍了如何通过 Cert Manager 在 APISIX Ingress Controller 里进行证书管理。
tags: [Ecosystem]
---

> 本文将通过详细的代码步骤为大家介绍如何通过 Cert Manager 在 Apache APISIX Ingress Controller 里进行证书管理。

<!--truncate-->

[Apache APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller) 是一款以 [Apache APISIX](http://apisix.apache.org/) 作为数据面的 [Kubernetes Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) 开源工具，目前已经更新到 [v1.3](https://github.com/apache/apisix-ingress-controller/blob/master/CHANGELOG.md#130) 版本，实现了如证书管理、负载均衡、金丝雀发布等功能。

长久以来，证书管理都不是一件简单的事情，虽然 Apache APISIX Ingress Controller 支持从 Kubernetes Secrets 资源中提取证书和私钥，并转换为 Apache APISIX 可识别的 SSL 对象，但这只是整个证书管理链中的一部分，证书的颁发、轮转、吊销逻辑依然需要管理员执行，尤其当证书数量比较多时，工作量往往并不小，因而会占用管理员不少的时间。

[Cert Manager](https://cert-manager.io/docs/) 是一款致力于在 Kubernetes 平台上简化证书管理的软件，它支持对接许多不同的证书源，如 [Let’s Encrypt](https://letsencrypt.org/) 和 [HashiCorp Vault](https://www.vaultproject.io/)。

如果你在使用 Apache APISIX Ingress Controller 时，遇到了证书管理的麻烦，那么使用 Cert Manager 将会是一个不错的选择，本文将介绍如何通过 Cert Manager 来创建证书并对接到 Apache APISIX Ingress Controller。

## 步骤一：环境准备

如果你希望按照本文的指导进行实际的操作，请确保以下环境和工具已准备就绪：

1. 准备一个可用的 Kubernetes 集群，开发环境中，你可以使用 [Kind](https://kind.sigs.k8s.io/) 和 [Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)
2. 安装 [kubectl](https://kubernetes.io/docs/tutorials/hello-minikube/)
3. 安装 [Helm v3](https://helm.sh/)

> 请注意，下文所有的操作都将在 ingress-apisix 命名空间中执行，因此需要先创建该命名空间：`kubectl create namespace ingress-apisix`

## 步骤二：安装 Apache APISIX Ingress Controller

我们可以通过 Helm 来安装 Apache APISIX Ingress Controller，包括数据面的 Apache APISIX 和 etcd 集群。

``` shell
helm repo add apisix https://charts.apiseven.com
helm repo update
helm install apisix apisix/apisix --set gateway.tls.enabled=true --set ingress-controller.enabled=true --namespace ingress-apisix
```

点击查看[详细安装介绍](https://github.com/apache/apisix-helm-chart/blob/master/charts/apisix/README.md)。

## 步骤三：安装 Cert Manager

通过 Helm 来安装 Cert Manager，点击可查看[详细安装介绍](https://cert-manager.io/docs/installation/)。

```shell
helm install cert-manager jetstack/cert-manager --namespace ingress-apisix  --set prometheus.enabled=false --set installCRDs=true
```

安装完毕后请等待一会后查看组件的运行状态，确保所有组件都已正常运行，你可以通过如下命令进行查看。

```shell
kubectl get all -n ingress-apisix
```

返回结果如下所示，表示所有组件都已正常运行。

```Apache
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

> [Kubernetes Controller Manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) 的机制决定了 Pod 名称会有所不同。

## 步骤四：申请证书并测试

首先我们需要配置证书颁发对象。

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

并创建自签名证书颁发者。

```shell
kubectl apply -f issuer.yaml
```

> 请注意，自签名颁发对象不推荐使用在生产环境中！更多证书颁发对象的配置请参考[这里](https://cert-manager.io/docs/configuration/)。

然后为域名 `httpbin.org` 创建一张证书。

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

此时需要查看对应 Secrets 是否已经被创建。

```shell
kubectl get secrets -n ingress-apisix httpbin
NAME      TYPE                DATA   AGE
httpbin   kubernetes.io/tls   3      2m5s
```

通过上述验证，该 Secrets 对象的创建事件已经被 Apache APISIX Ingress Controller 捕获到，我们尝试访问 Apache APISIX Ingress Controller 来验证证书是否生效，首先我们需要创建额外的路由对象。

```shell
# 创建后端
kubectl run httpbin --image kennethreitz/httpbin --namespace ingress-apisix
kubectl expose pod httpbin -n ingress-apisix --port 80
```

```yaml
# 定义 ApisixTls 对象
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
# 定义访问后端的路由
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

接下来访问服务 `apisix-gateway`。注意，默认情况下该服务的类型为 `NodePort`，你可以根据需要修改其类型，比如你的 Kubernetes 集群是云厂商托管的，则可以考虑将其修改为 `LoadBalancer` 类型，以获取一个外部可达的 IP。

这里我们通过端口转发的方式将服务映射到本地。

```shell
kubectl port-forward -n ingress-apisix svc/apisix-gateway 8443:443
```

然后开始配置访问。

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

经过上述操作，可以看到访问成功，说明证书已经生效。注意，由于证书是自签名的，这里需要加上 `-k` 选项来忽略证书的校验。

此外，如果你想要轮转证书，删除 `httpbin` 这一 Secret 对象即可，Cert Manager 会立刻创建一个新的 httpbin  Secret 对象，并且包含新的证书。

## 总结

本文主要讲解了如何利用 Cert Manager 在 Apache APISIX Ingress Controller 中进行证书的创建和管理。想了解更多关于 Apache APISIX Ingress 的介绍与内容，可参考[本篇文章](https://apisix.apache.org/zh/blog/2021/10/09/apisix-ingress-techblog/)。

或者参与 Apache APISIX  Ingress 项目每两周举行的线上讨论，分享当下项目进度、最佳实践及设计思路等多个话题，可查看具体 [issue](https://github.com/apache/apisix-ingress-controller/issues/614) 了解更多。
