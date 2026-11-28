# Install with Helm

> Guide to install APISIX ingress controller on kind.

Source: https://apisix.apache.org/zh/docs/ingress-controller/install/

Helm is a package manager for Kubernetes that automates the release and management of software on Kubernetes.

This document guides you through installing the APISIX ingress controller using Helm.

## Prerequisites

Before installing APISIX ingress controller, ensure you have:

1. A working Kubernetes cluster (version 1.31+)
   - Production: TKE, EKS, AKS, or other cloud-managed clusters
   - Development: minikube, kind, or k3s

   Kubernetes 1.31+ is required because the controller ships the Gateway API 1.6 CRDs, whose CEL (Common Expression Language) validation rules rely on features available from 1.31. The controller also uses CEL validation in its own CRDs, IngressClass Namespaced Params support, and EndpointSlice terminating conditions.
2. [kubectl](https://kubernetes.io/docs/tasks/tools/) installed and configured to access your cluster
3. [Helm](https://helm.sh/) (version 3.8+) installed

Make sure to update the Helm repositories:

```bash
helm repo add apisix https://apache.github.io/apisix-helm-chart
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
```

## Install APISIX and APISIX Ingress Controller

The script below installs APISIX and APISIX Ingress Controller:

```bash
helm install apisix \
  --namespace ingress-apisix \
  --create-namespace \
  --set ingress-controller.enabled=true \
  --set ingress-controller.apisix.adminService.namespace=ingress-apisix \
  --set ingress-controller.gatewayProxy.createDefault=true \
  apisix/apisix
```

## Install APISIX and APISIX Ingress Controller (Standalone API-driven mode)

To run APISIX in [APISIX Standalone API-driven mode](https://apisix.apache.org/docs/apisix/deployment-modes/#api-driven-experimental), use the following script to install APISIX and the APISIX Ingress Controller:

```bash
helm install apisix \
  --namespace ingress-apisix \
  --create-namespace \
  --set apisix.deployment.role=traditional \
  --set apisix.deployment.role_traditional.config_provider=yaml \
  --set etcd.enabled=false \
  --set ingress-controller.enabled=true \
  --set ingress-controller.config.provider.type=apisix-standalone \
  --set ingress-controller.apisix.adminService.namespace=ingress-apisix \
  --set ingress-controller.gatewayProxy.createDefault=true \
  apisix/apisix
```

## Install APISIX Ingress Controller

The script below installs APISIX Ingress Controller:

```bash
# Set the access address and adminkey for apisix
helm install apisix-ingress-controller \
  --create-namespace \
  -n ingress-apisix \
  --set gatewayProxy.createDefault=true \
  --set gatewayProxy.provider.controlPlane.auth.adminKey.value=edd1c9f034335f136f87ad84b625c8f1 \
  --set apisix.adminService.namespace=apisix-ingress \
  --set apisix.adminService.name=apisix-admin \
  --set apisix.adminService.port=9180 \
  apisix/apisix-ingress-controller
```
