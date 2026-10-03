# Deployment Architecture

Source: https://apisix.apache.org/docs/ingress-controller/concepts/deployment-architecture/

The APISIX Ingress Controller is used to manage the APISIX Gateway as either a standalone application or a Kubernetes-based application. It dynamically configures and manages the APISIX Gateway using Gateway API resources.

## Admin API Mode

In the traditional deployment approach, APISIX uses etcd as its configuration center, allowing administrators to dynamically manage routes, upstreams, and other resources through RESTful APIs. It supports distributed cluster deployments with real-time configuration synchronization.

![Admin API Architecture](https://raw.githubusercontent.com/apache/apisix-ingress-controller/master/docs/assets/images/ingress-admin-api-architecture.png)

## Standalone Mode (Experimental)

APISIX runs independently without relying on etcd, supporting two sub-modes - file-driven (managing configuration through conf/apisix.yaml files) and API-driven (storing configuration in memory with full configuration management through the dedicated /apisix/admin/configs endpoint).

This mode is particularly suitable for Kubernetes environments and single-node deployments, where the API-driven memory management approach combines the convenience of traditional Admin API with the simplicity of Standalone mode.

![Standalone Architecture](https://raw.githubusercontent.com/apache/apisix-ingress-controller/master/docs/assets/images/ingress-standalone-architecture.png)
