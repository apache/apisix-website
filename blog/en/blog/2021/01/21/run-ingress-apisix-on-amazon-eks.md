---
title: Run Ingress APISIX on Amazon EKS
author: "Chao Zhang"
authorURL: "https://github.com/tokers"
authorImageURL: "https://avatars0.githubusercontent.com/u/10428333?s=60&v=4"
keywords:
  - API Gateway
  - APISIX
  - Apache APISIX
  - Ingress
  - Amazon EKS
description: This article details how to run the cloud-native API gateway Apache APISIX and apisix-ingress-controller on Amazon EKS.
tags: [Ecosystem]
---

> Amazon EKS provides flexibility to start, run, and scale Kubernetes applications in the AWS cloud or on-premises. This article explains how to run Ingress APISIX on it.This article explains how to run Ingress APISIX on Amazon EKS.

<!--truncate-->

This post is based on [Install Ingress APISIX on Amazon EKS](http://apisix.apache.org/docs/ingress-controller/deployments/aws/).

Amazon Elastic Kubernetes Service ([Amazon EKS](https://amazonaws-china.com/eks/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&eks-blogs.sort-by=item.additionalFields.createdDate&eks-blogs.sort-order=desc)) gives you the flexibility to start, run, and scale Kubernetes applications in the AWS cloud or on-premises. This article explains how to run Ingress APISIX on it.

Ingress APISIX brings good features (traffic splitting, multiple protocols, authentication and etc) of Apache APISIX to Kubernetes, with a well-designed Controller component to drive it, which helps users to achieve complex demands for the north-south traffic.

## Prerequisites

Before you go ahead, make sure you have an available EKS cluster on Amazon AWS. If you don't have one, please create it according to the guide.

You shall have kubectl tool in your own environment, set the context to your EKS cluster by running:

```shell
aws eks update-kubeconfig --name <your eks cluster name> --region <your region>
```

After the Kubernetes cluster is ready, creating the namespace ingress-apisix, all subsequent resources will be created at this namespace.

kubectl create namespace ingress-apisix

We use [Helm](https://helm.sh/) to deploy all components in Ingress APISIX ([Apache APISIX](https://github.com/apache/apisix) and [apisix-ingress-controller](https://github.com/apache/apisix-ingress-controller)), so please also install Helm according to its installation guide. The helm charts for Apache APISIX and apisix-ingress-controller are in apache/apisix-helm-chart and apache/apisix-ingress-controller, clone them to get the charts.

## Install Apache APISIX

Apache APISIX as the proxy plane of apisix-ingress-controller, should be deployed in advance.

```shell
cd /path/to/apisix-helm-chart
helm repo add bitnami https://charts.bitnami.com/bitnami
helm dependency update ./chart/apisix
helm install apisix ./chart/apisix \
  --set gateway.type=LoadBalancer \
  --set allow.ipList="{0.0.0.0/0}" \
  --namespace ingress-apisix
kubectl get service --namespace ingress-apisix
```

The above commands created two Kubernetes Service resources, one is `apisix-gateway`, which processes the real traffic; another is `apisix-admin`, which acts as the control plane to process all the configuration changes. Here we created the `apisix-gateway` as a `LoadBalancer` type Service, which resorts the [AWS Network Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) to expose it to the Internet. You can find the load balancer hostname by the following command:

```shell
kubectl get service apisix-gateway \
--namespace ingress-apisix \
-o jsonpath='{.status.loadBalancer.ingress[].hostname}'
```

Another thing should be concerned that the `allow.ipList` field should be customized according to the [EKS CIDR Ranges](https://amazonaws-china.com/premiumsupport/knowledge-center/eks-multiple-cidr-ranges/) in your EKS cluster, so that the apisix-ingress-controller can be authorized by Apache APISIX (for the resources pushing).

See [values.yaml](https://github.com/apache/apisix-helm-chart/blob/master/charts/apisix/values.yaml) to learn all the configuration items if you have other requirements.

## Install apisix-ingress-controller

After Apache APISIX is deployed successfully, now it's time to install the controller component.

```shell
cd /path/to/apisix-ingress-controller
# install base resources, e.g. ServiceAccount.
helm install ingress-apisix-base -n ingress-apisix ./charts/base
# install apisix-ingress-controller
helm install ingress-apisix ./charts/ingress-apisix \
  --set ingressController.image.tag=dev \
  --set ingressController.config.apisix.baseURL=http://apisix-admin:9180/apisix/admin \
  --set ingressController.config.apisix.adminKey={YOUR ADMIN KEY} \
  --namespace ingress-apisix
```

The ingress-apisix-base chart installed some basic dependencies for apisix-ingress-controller, such as ServiceAccount, its exclusive CRDs and etc.

The ingress-apisix chart guides us how to install the controller itself, you can change the image tag to the desired release version, also the value of `ingressController.config.apisix.adminKey` in above mentioned commands should be filled according to your practical usage (and be sure the admin key is same as the on in Apache APISIX deployment). See [values.yaml](https://github.com/apache/apisix-helm-chart/blob/master/charts/apisix-ingress-controller/values.yaml) to learn all the configuration items if you have other requirements.

Now try to open your EKS console, choosing your cluster and clicking the Workloads tag, you shall see all pods of Apache APISIX, etcd and apisix-ingress-controller are ready.

## Test

Now we have deployed all components in Ingress APISIX, it's important to check whether it runs well. We will deploy a httpbin service and ask Apache APISIX to route all requests with Host `"local.httpbin.org"` to it.

The first step we should do is created the httpbin workload and expose it.

```shell
kubectl run httpbin --image kennethreitz/httpbin --port 80
kubectl expose pod httpbin --port 80
```

In order to let Apache APISIX routes requests correctly, we need create an ApisixRoute resource to drive it.

```shell
# ar-httpbin.yaml
apiVersion: apisix.apache.org/v1
kind: ApisixRoute
metadata:
  name: httpserver-route
spec:
  rules:
  - host: local.httpbin.org
    http:
      paths:
      - backend:
          serviceName: httpbin
          servicePort: 80
        path: /*
```

The above ApisixRoute resource asks Apache APISIX to route requests which Host header is `"local.httpbin.org"` to the httpbin backend (the one we just created).

Now try to apply it, note the service and the ApisixRoute resource should be put in the same namespace., crossing namespaces is not allowed in apisix-ingress-controller.

```shell
kubectl apply -f ar-httpbin.yaml
```

Test it by a simple curl call from a place where the Apache APISIX service is reachable.

```shell
$ curl http://{apisix-gateway-ip}:{apisix-gateway-port}/headers -s -H 'Host: local.httpbin.org'

{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-5ffc3273-2928e0844e19c9810d1bbd8a"
  }
}
```

If the Service type is `ClusterIP,` you have to login to a pod in the EKS cluster, then accessing Apache APISIX with its `ClusterIP` or Service FQDN. If it was exposed (no matter `NodePort` or `LoadBalancer`), just accessing its outside reachable endpoint.

## See Also

- https://www.apiseven.com/zh/blog/a-first-look-at-kubernetes-service-api
- https://www.apiseven.com/zh/blog/another-way-to-implement-envoy-filter
- https://github.com/apache/apisix
- https://github.com/apache/apisix-helm-chart
- https://github.com/apache/apisix-ingress-controller
