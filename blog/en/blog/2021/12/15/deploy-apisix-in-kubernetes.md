---
title: "How to Easily Deploy Apache APISIX in Kubernetes"
authors:
  - name: "Bozhong Yu"
    title: "Author"
    url: "https://github.com/zaunist"
    image_url: "https://avatars.githubusercontent.com/u/38528079?v=4"
  - name: "Sylvia"
    title: "Technical Writer"
    url: "https://github.com/SylviaBABY"
    image_url: "https://avatars.githubusercontent.com/u/39793568?v=4"
keywords: 
- Apache APISIX
- API Gateway
- Kubernetes
- APISIX Dashboard
- Deployment
- Cluster
description: API Gateway Apache APISIX currently supports multiple ways to install and deploy. This article focuses on how to deploy APISIX and Dashboard in a Kubernetes environment.
tags: [Ecosystem]
image: https://static.apiseven.com/2022/blog/0818/ecosystem/kubernetes.png
---

> Apache APISIX currently supports multiple ways to install and deploy. This article focuses on how to deploy Apache APISIX and APISIX-Dashboard in a Kubernetes environment.

<!--truncate-->

Apache APISIX is a dynamic, real-time, high-performance open source API gateway that provides rich traffic management features such as load balancing, dynamic upstream, canary release, service meltdown, authentication, observability, and more.

And Kubernetes, an open source system for automatically deploying, scaling, and managing containerized applications, is designed to provide users with support for automatic deployment **across host clusters**, scaling, and related features such as running application containers. Here we have compiled two easy-to-follow installation ideas on how to quickly deploy Apache APISIX in K8s and present related information via Dashboard.

## Environment Preparation

Before deploying, make sure your network is up and ready for K8s clustering.
Here, we recommend using Kind to build the K8s cluster test environment locally, it is very convenient and easy to get started. After installing Kind according to the [official documentation](https://kind.sigs.k8s.io/docs/user/quick-start/), you can set up the K8s cluster environment with a single command.

```shell
kind create cluster
```

## Option 1: Installation via Helm

Helm is mainly used to manage applications in Kubernetes. Helm is also known as the package manager in Kubernetes, similar to apt, yum, and pacman, which are package managers in Linux.

Currently, Apache APISIX has provided [Helm Chart repository](https://github.com/apache/apisix-helm-chart), and users can easily deploy and uninstall Apache APISIX via Helm.

### Deploying Apache APISIX

First add the Apache APISIX Helm Chart address and update the repository.

```shell
helm repo add apisix https://charts.apiseven.com
helm repo update
```

Install Apache APISIX (this demo installs Apache APISIX into Default Namespace, for custom Namespace, please [refer to the documentation](https://kubernetes.io/docs/tasks/administer-cluster/namespaces/#creating-a-new-namespace)).

```shell
helm install apisix apisix/apisix
```

When the above command is executed successfully, the following return message will be obtained.

```shell
▶ helm install apisix apisix/apisix
NAME: apisix
LAST DEPLOYED: Sun Dec  5 14:43:19 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
1. Get the application URL by running these commands:
  export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services apisix-gateway)
  export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
  echo http://$NODE_IP:$NODE_PORT
```

With an Apache APISIX deployment installed in the above manner, the Admin API is exposed on port `9180` in the cluster and the Gateway is exposed on port `80`. To access the Admin API, you can use `kubectl port-forward` to forward the port to a port on the local host.

Here is a demonstration of port-forwarding to port `9080` on the local machine, mainly to synchronize with the official Apache APISIX documentation and to facilitate subsequent verification.

```shell
kubectl port-forward service/apisix-admin 9080:9180
```

After that, you can refer to the [Apache APISIX Quick Start Guide](https://apisix.apache.org/zh/docs/apisix/getting-started/) to add and bind a Route to Upstream and other related operations.

Finally, the verification of the new route is performed.

Since this article uses Kind to build a local K8s cluster, the `apisix-gateway` NodePort is not accessible, so an additional step is needed before validation, i.e. forwarding port `80` from the cluster to port `8080` on the local machine.

```shell
kubectl port-forward service/apisix-gateway 8080:80
```

Start the verification process.

```shell
curl -X GET "http://127.0.0.1:8080/get?foo1=bar1&foo2=bar2" -H "Host: httpbin.org"
```

The expected return results can be seen in the example below.

```json
{
  "args": {
    "foo1": "bar1",
    "foo2": "bar2"
  },
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-61ac63b5-348d3c5567db393462cd0666",
    "X-Forwarded-Host": "httpbin.org"
  },
  "origin": "127.0.0.1, 192.46.208.201",
  "url": "http://httpbin.org/get?foo1=bar1&foo2=bar2"
}
```

### Deploying Apache APISIX-Dashboard

As with deploying Apache APISIX, installing Apache APISIX-Dashboard via Helm requires only one command.

```shell
helm install apisix-dashboard apisix/apisix-dashboard
```

Next, forward the Dashboard port to the local machine.

```shell
kubectl port-forward service/apisix-dashboard 8080:80
```

Finally, visit your `localhost:8080` to see the login page.

:::note
The node information of Apache APISIX will not appear in the system information of Apache APISIX-Dashboard deployed here. The `server-info` plug-in is not enabled by default if installed by Helm, so you can add it in the apisix configmap if needed.

For the configuration of `server-info`, please refer to the [relevant documentation](https://apisix.apache.org/docs/apisix/plugins/server-info/).
:::

## Option 2: Deployment via yaml file

Deploying Apache APISIX using a yaml file is easier than the Helm deployment method described above, and allows you to customize the configuration more easily.

### Deploying APISIX and Dashboard

:::note
If you have already deployed using method 1, you will need to clear the ETCD PVC storage before proceeding with the following installation.
:::

The yaml files needed to deploy Apache APISIX, APISIX-Dashboard, and etcd clusters are already organized here, and you can call the next mentioned files through the [apisix-on-kubernetes repository](https://github.com/zaunist/apisix-on-kubernetes).

First clone the `apisix-on-kubernetes` repository mentioned above.

```shell
git clone https://github.com/zaunist/apisix-on-kubernetes.git
```

Then execute the following command.

```shell
kubectl apply -f etcd.yaml
kubectl apply -f apisix.yaml
kubectl apply -f apisix-dashboard.yaml
```

Wait for the Pod to fully boot and forward the `apisix-dashboard` port to the local machine.

```shell
kubectl port-forward service/apisix-dashboard 8080:80
```

Finally, visit `localhost:8080` to see the Dashboard related information. The default login password is `admin`,`admin`.

:::tip
To visualize the deployment during the installation process, you can use [Kubernetes Dashboard](https://github.com/kubernetes/dashboard) to see the Pod running on the web side.
:::

## Summary

This article has introduced two ways to deploy Apache APISIX and Apache APISIX-Dashboard in Kubernetes. Both approaches have the same ultimate goal, but each has its own advantages in use.

For example, it is very easy to install using Helm and perform all operations with just a few commands, while deploying via YAML files makes it easier to make custom configuration changes and more manageable.

How to install and deploy Apache APISIX in a real-world scenario depends on your usage habits, so here are just two ideas for you to consider. We hope that you can develop more interesting techniques and methods in the subsequent use of Apache APISIX.
