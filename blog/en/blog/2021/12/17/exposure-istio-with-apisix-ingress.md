---
title: "Secure Exposure of Istio Services with APISIX Ingress"
authors:
  - name: "Jintao Zhang"
    title: "Author"
    url: "https://github.com/tao12345666333"
    image_url: "https://avatars.githubusercontent.com/u/3264292?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- Istio
- Kubernetes
- APISIX Ingress Controller
- Service Mesh
description: This article shows how to use Istio Service Mesh and API Gateway Apache APISIX to expose services from a Service Mesh-enabled Kubernetes cluster outside the cluster.
tags: [Ecosystem]
---

> This article shows you step by step how to use Istio Service Mesh and Apache APISIX, to expose services in a Service Mesh-enabled Kubernetes cluster to the outside of the cluster through very detailed steps.

<!--truncate-->

## Service Mesh

With the hot development of Cloud-Native technology, Service Mesh is gradually becoming popular in the microservices field. The popular implementations of Service Mesh are [Istio](https://istio.io/) and [Linkerd](https://linkerd.io/).

The following diagram shows the schematic diagram of Service Mesh, which introduces Sidecar Proxy to complete the interconnection and communication between microservices.

![Service Mesh](https://static.apiseven.com/202108/1639730484170-fbf2e5ed-3041-4975-8730-a16c92be68f2.png)

The diagram above shows that Service Mesh focuses more on east-west traffic in the traditional sense, i.e., traffic between services. When we use Service Mesh with Kubernetes, the east-west traffic corresponds to the traffic within the Kubernetes cluster.

Back in real-world usage scenarios, we won't only be exposed to traffic within the Kubernetes cluster, we will mostly need to expose some services outside of the cluster for users or other services to use. But when exposing services in a Kubernetes cluster outside the cluster, we have to consider factors such as security and observability.

We'll show you how to securely expose services in a Service Mesh-enabled Kubernetes cluster outside the cluster using Istio Service Mesh and Apache APISIX.

![How to deal](https://static.apiseven.com/202108/1639730236819-0911b90b-811f-4451-b0e5-f89ac3e04b77.png)

## Step 1: Prepare the Kubernetes cluster

Here we use [Kind](https://github.com/kubernetes-sigs/kind/) to create a temporary cluster locally for demonstration purposes. You can refer to the [official documentation](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) for how to install it with the Kind command.

Here is the yaml configuration file used to create the demo cluster, save it as `kind-config.yaml`.

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
- role: worker
```

Then use this configuration file to create a cluster.

```bash
(MoeLove) ➜ kind create cluster --config kind-config.yaml
Creating cluster "kind" ...
 ✓ Ensuring node image (kindest/node:v1.22.2) 🖼
 ✓ Preparing nodes 📦 📦 📦 📦  
 ✓ Writing configuration 📜
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
 ✓ Joining worker nodes 🚜
Set kubectl context to "kind-kind"
You can now use your cluster with:

kubectl cluster-info --context kind-kind

Not sure what to do next? 😅  Check out https://kind.sigs.k8s.io/docs/user/quick-start/
```

## Step 2: Deploy Istio

After the Kubernetes cluster is created, let's deploy Istio.

First, create a directory named `apisix-istio` and do the following after entering the directory.

```bash
(MoeLove) ➜ mkdir apisix-istio
(MoeLove) ➜ cd apisix-istio
(MoeLove) ➜ curl -sL https://istio.io/downloadIstio | sh -

Downloading istio-1.12.1 from https://github.com/istio/istio/releases/download/1.12.1/istio-1.12.1-linux-amd64.tar.gz ...

Istio 1.12.1 Download Complete!

Istio has been successfully downloaded into the istio-1.12.1 folder on your system.

Next Steps:
See https://istio.io/latest/docs/setup/install/ to add Istio to your Kubernetes cluster.

To configure the istioctl client tool for your workstation,
add the /root/apisix-istio/istio-1.12.1/bin directory to your environment path variable with:
         export PATH="$PATH:/root/apisix-istio/istio-1.12.1/bin"

Begin the Istio pre-installation check by running:
         istioctl x precheck

Need more information? Visit https://istio.io/latest/docs/setup/install/
```

When the above operation is completed, a new directory will be created under the current directory. We can follow the output of the above command to continue the operation.

```bash
(MoeLove) ➜ ls
istio-1.12.1
(MoeLove) ➜ export PATH="$PATH:/root/apisix-istio/istio-1.12.1/bin"
(MoeLove) ➜ istioctl x precheck
✔ No issues found when checking the cluster. Istio is safe to install or upgrade!
  To get started, check out https://istio.io/latest/docs/setup/getting-started/
```

Next, the real deployment process begins. Just set it to `--set profile=minimal` for a minimal installation.

```bash
(MoeLove) ➜ istioctl install --set profile=minimal  -y
✔ Istio core
installed

✔ Istiod
installed

✔ Installation
complete

Making this installation the default for injection and validation.

Thank you for installing Istio 1.12.  Please take a few minutes to tell us about your install/upgrade experience!  https://forms.gle/FegQbc9UvePd4Z9z7
```

Finally, check the current deployment status and you can see that the Pod is already running.

```bash
(MoeLove) ➜ kubectl -n istio-system get pods
NAME                      READY   STATUS    RESTARTS   AGE
istiod-58d79b7bff-g66cv   1/1     Running   0          1m
```

## Step 3: Deploy Apache APISIX

Next, we will deploy Apache APISIX.

First create a Namespace named `apisix-istio` and enable auto-injection.

```bash
(MoeLove) ➜ kubectl create ns apisix-istio
namespace/apisix-istio created
(MoeLove) ➜ kubectl label namespace apisix-istio istio-injection=enabled
namespace/apisix-istio labeled
```

Next, add Helm Repo and use Helm for Apache APISIX and Apache APISIX Ingress Controller deployments.

```bash
(MoeLove) ➜ helm repo add apisix https://charts.apiseven.com
"apisix" has been added to your repositories
(MoeLove) ➜ helm install apisix-istio apisix/apisix --set gateway.type=NodePort --set ingress-controller.enabled=true --set ingress-controller.config.apisix.serviceNamespace=apisix-istio  --set ingress-controller.config.apisix.serviceName=apisix-istio-admin  --namespace apisix-istio
NAME: apisix-istio
LAST DEPLOYED: Wed Dec 15 14:16:33 2021
NAMESPACE: apisix-istio
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Get the application URL by running these commands:
  export NODE_PORT=$(kubectl get --namespace apisix-istio -o jsonpath="{.spec.ports[0].nodePort}" services apisix-istio-gateway)
  export NODE_IP=$(kubectl get nodes --namespace apisix-istio -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT
```

After executing the above command, you can wait for all Pods to run normally by executing the following command.

```bash
(MoeLove) ➜ kubectl -n apisix-istio wait --for=condition=Ready pods --all
pod/apisix-istio-7bdfcb4bd9-89jcn condition met
pod/apisix-istio-etcd-0 condition met
pod/apisix-istio-etcd-1 condition met
pod/apisix-istio-etcd-2 condition met
pod/apisix-istio-ingress-controller-5fcbb75b8c-b4nnc condition met
```

You can see that all the Pods are currently running properly. Next, let's test and verify.

## Test Session

### Simple test

When we deployed Apache APISIX using Helm earlier, we selected the service exposure method as `NodePort`, so we can then access Apache APISIX directly using the following command.

```bash
(MoeLove) ➜ export NODE_PORT=$(kubectl get --namespace apisix-istio -o jsonpath="{.spec.ports[0].nodePort}" services apisix-istio-gateway)
(MoeLove) ➜ export NODE_IP=$(kubectl get nodes --namespace apisix-istio -o jsonpath="{.items[0].status.addresses[0].address}")
(MoeLove) ➜ curl http://$NODE_IP:$NODE_PORT
{"error_msg":"404 Route Not Found"}
```

Note that when requesting with the `curl` command we add a `-v` option to look at the response headers of the request.

```bash
(MoeLove) ➜ curl -v http://$NODE_IP:$NODE_PORT
* Rebuilt URL to: http://172.20.0.2:31225/
*   Trying 172.20.0.2...
* TCP_NODELAY set
* Connected to 172.20.0.2 (172.20.0.2) port 31225 (#0)
> GET / HTTP/1.1
> Host: 172.20.0.2:31225
> User-Agent: curl/7.58.0
> Accept: */*
>
< HTTP/1.1 404 Not Found
< date: Wed, 15 Dec 2021 14:31:40 GMT
< content-type: text/plain; charset=utf-8
< server: istio-envoy
< x-envoy-upstream-service-time: 1
< x-envoy-decorator-operation: apisix-istio-gateway.apisix-istio.svc.cluster.local:80/*
< transfer-encoding: chunked
<
{"error_msg":"404 Route Not Found"}
* Connection #0 to host 172.20.0.2 left intact
```

As you can see from the above output, the response header contains the following.

```bash
< server: istio-envoy
< x-envoy-upstream-service-time: 1
< x-envoy-decorator-operation: apisix-istio-gateway.apisix-istio.svc.cluster.local:80/*
```

This means that Istio's auto-injection has succeeded, and that it is not Apache APISIX but Istio's Sidecar that is currently interacting directly.

### BookInfo Deployment Testing

Next, we use Istio's own BookInfo sample application to perform the relevant tests.

First, create a Namespace and enable Istio's auto-injection.

```bash
(MoeLove) ➜ kubectl create ns bookinfo
namespace/bookinfo created
(MoeLove) ➜ kubectl label namespace bookinfo istio-injection=enabled
namespace/bookinfo labeled
```

BookInfo deployment is then performed and the relevant deployment files are automatically created in the directory during the above-mentioned Istio installation.

```bash
(MoeLove) ➜ kubectl -n bookinfo apply -f istio-1.12.1/samples/bookinfo/platform/kube/bookinfo.yaml
service/details created
serviceaccount/bookinfo-details created
deployment.apps/details-v1 created
service/ratings created
serviceaccount/bookinfo-ratings created
deployment.apps/ratings-v1 created
service/reviews created
serviceaccount/bookinfo-reviews created`
deployment.apps/reviews-v1 created
deployment.apps/reviews-v2 created
deployment.apps/reviews-v3 created
service/productpage created
serviceaccount/bookinfo-productpage created
deployment.apps/productpage-v1 created
```

Wait for all Pods to run normally.

```bash
(MoeLove) ➜ kubectl -n bookinfo get pods
NAME                             READY   STATUS    RESTARTS   AGE
details-v1-96cf758d8-qr6p9       2/2     Running   0          64s
productpage-v1-5f75dfbfb-22hcw   2/2     Running   0          64s
ratings-v1-779dbc4fdd-jt5zp      2/2     Running   0          64s
reviews-v1-ffbbf7fc8-kxvrr       2/2     Running   0          64s
reviews-v2-54546c6f84-pnjkn      2/2     Running   0          64s
reviews-v3-74d6bf84cd-h4r9z      2/2     Running   0          63s
```

Now we can use Apache APISIX to expose the service outside the Kubernetes cluster. Create a routing configuration using the following and save it as `productpage-ar.yaml`.

```yaml
apiVersion: apisix.apache.org/v2beta2
kind: ApisixRoute
metadata:
 name: productpage
spec:
 http:
 - name: rule1
   match:
     hosts:
     - apisix-istio.dev
     paths:
       - /*
   backends:
   - serviceName: productpage
     servicePort: 9080
```

:::note
The above configuration can be interpreted as creating a route with the domain name `apisix-istio.dev` and forwarding all request traffic to port `9080` of the `productpage` service.
:::

Then create this resource.

```bash
(MoeLove) ➜ kubectl -n bookinfo apply -f productpage-ar.yaml
apisixroute.apisix.apache.org/productpage created
```

Request Apache APISIX again with the domain name we just configured, and you will see that a `200` related prompt is returned.

```bash
(MoeLove) ➜ curl -I -H "HOST: apisix-istio.dev" http://$NODE_IP:$NODE_PORT/
HTTP/1.1 200 OK
content-type: text/html; charset=utf-8
content-length: 1683
date: Wed, 15 Dec 2021 15:47:30 GMT
x-envoy-upstream-service-time: 7
server: istio-envoy
x-envoy-decorator-operation: apisix-istio-gateway.apisix-istio.svc.cluster.local:80/*
```

The Apache APISIX port can then be exposed via `port-forward`.

```bash
(MoeLove) ➜ kubectl -n apisix-istio port-forward --address 0.0.0.0 svc/apisix-istio-gateway 8080:80
Forwarding from 0.0.0.0:8080 -> 9080
```

Finally, set the Header of `HOST: apisix-istio.dev` in your browser and try to make a request, you will get the correct page as shown below.

![Correct page](https://static.apiseven.com/202108/1639713895938-dec7460b-fa51-443e-a32e-fe2000788127.png)

## Visualization tool: Kiali

Kiali is a tool that allows visualization of Istio and can be installed as an Istio add-on.

It is deployed here directly using the configuration files in the `addons` directory carried by Istio.

```bash
(MoeLove) ➜ kubectl -n istio-system apply -f  istio-1.12.1/samples/addons/
serviceaccount/grafana created
configmap/grafana created
service/grafana created
deployment.apps/grafana created
configmap/istio-grafana-dashboards created
configmap/istio-services-grafana-dashboards created
deployment.apps/jaeger created
service/tracing created
service/zipkin created
service/jaeger-collector created
serviceaccount/kiali created
configmap/kiali created
clusterrole.rbac.authorization.k8s.io/kiali-viewer created
clusterrole.rbac.authorization.k8s.io/kiali created
clusterrolebinding.rbac.authorization.k8s.io/kiali created
role.rbac.authorization.k8s.io/kiali-controlplane created
rolebinding.rbac.authorization.k8s.io/kiali-controlplane created
service/kiali created
deployment.apps/kiali created
serviceaccount/prometheus created
configmap/prometheus created
clusterrole.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/prometheus created
service/prometheus created
deployment.apps/prometheus created
```

Wait for the normal operation of Pod to view:

```bash
(MoeLove) ➜ kubectl -n istio-system get pods
NAME                          READY   STATUS    RESTARTS   AGE
grafana-6ccd56f4b6-wq6k5      1/1     Running   0          2m12s
istiod-58d79b7bff-g66cv       1/1     Running   0          42m
jaeger-5d44bc5c5d-84ksf       1/1     Running   0          2m11s
kiali-79b86ff5bc-w457g        1/1     Running   0          2m3s
prometheus-64fd8ccd65-2mjcc   2/2     Running   0          2m9s
```

Next, execute the following command to port-forward Kiali and access it in the browser. Of course, you can do the same thing with the above port-forward.

```
(MoeLove) ➜ istioctl dashboard kiali  --address 0.0.0.0 --port 9999 --browser=false
http://0.0.0.0:9999/kiali
skipping opening a browser
```

Open `http://0.0.0.0:9999/kiali` in your browser and try to access the BookInfo service via Apache APISIX several times to see the following results.

![Access BookInfo](https://static.apiseven.com/202108/1639714083338-d5a0601e-5dcb-446d-9b25-89ec95044ebd.png)

Click Graph and select Namespace as BookInfo. During the test to access the BookInfo application, you can see the effect shown below. You can see the traffic coming in from the Apache APISIX and then flowing to the various components of the application.

![Flow chart](https://static.apiseven.com/202108/1639714198376-27882a16-751b-436d-9212-69cad379bb72.png)

This concludes the entire process. We have successfully exposed the services in the Kubernetes cluster with Service Mesh enabled using Apache APISIX and Apache APISIX Ingress Controller securely.

## Summary

This article shows you step-by-step how to use Istio Service Mesh and Apache APISIX to expose the services in a Service Mesh-enabled Kubernetes cluster to the outside of the cluster in a very detailed step-by-step manner. You can also provide more security or traffic control through the rich plug-in capabilities of Apache APISIX in the future.

We hope that the above detailed tutorials will help you to more easily integrate with solutions such as Istio when using Apache APISIX.
