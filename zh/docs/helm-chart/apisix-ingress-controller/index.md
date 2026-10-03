# Apache APISIX Ingress Controller Helm Chart

Source: https://apisix.apache.org/zh/docs/helm-chart/apisix-ingress-controller/

## Prerequisites

- [Kubernetes 1.12+](https://kubernetes.io/docs/setup/)
- [Apache APISIX](https://apisix.apache.org/docs/apisix/installation-guide/)
- [Helm v3.0+](https://helm.sh/docs/intro/quickstart/#install-helm)

## Install

To install apisix-ingress-controller which release name is `apisix-ingress-controller`:

```bash
helm repo add apisix https://apache.github.io/apisix-helm-chart
helm repo update
helm install apisix-ingress-controller apisix/apisix-ingress-controller --namespace ingress-apisix --create-namespace
```

Note: APISIX Ingress Controller will try to establish a connection with APISIX admin in the location specified by `apisix.serviceName` and `apisix.serviceNamespace` values following the naming convention `<serviceName.serviceNamespace.svc.clusterDomain>`. You can override this behavior to specify a fully custom location by setting the `apisix.serviceFullname` value.

## Uninstall

To uninstall/delete the `apisix-ingress-controller` release:

```bash
helm uninstall apisix-ingress-controller --namespace ingress-apisix
```

## Deployment Options

### ingress version

By default apisix-ingress-controller watches the [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources in api group `networking/v1`, however, if your Kubernetes cluster is prior to `v1.19`, you need to change the ingress watching version.

If your Kubernetes version is older than `v1.14`, then:

```shell
helm install apisix-ingress-controller apisix/apisix-ingress-controller --namespace ingress-apisix --set config.kubernetes.ingressVersion=extensions/v1beta1
```

Or if your Kubernetes version is between `v1.14` and `v1.19`, try below:

```shell
helm install apisix-ingress-controller apisix/apisix-ingress-controller --namespace ingress-apisix --set config.kubernetes.ingressVersion=networking/v1beta1
```

## Upgrade Considerations

### CRD

Helm installs the APISIX CRDs in `crds/` on `helm install` only and skips them on `helm upgrade`, so apply them yourself when upgrading:

```shell
helm pull apisix/apisix-ingress-controller --untar
kubectl apply --server-side -f apisix-ingress-controller/crds/apisixic-crds.yaml
```

The Gateway API CRDs are chart-managed and controlled by `crds.gatewayAPI.enabled` (default `true`).
CRDs not created by this release (for example by GKE or another chart) are left untouched, and chart-managed ones are kept on `helm uninstall`.
Set `crds.gatewayAPI.enabled=false` when another component owns the CRDs and you render the chart with `helm template` or Argo CD.
