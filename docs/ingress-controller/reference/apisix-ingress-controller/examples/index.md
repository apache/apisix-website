# Configuration Examples

> Explore a variety of APISIX Ingress Controller configuration examples to help you customize settings to suit your environment effectively.

Source: https://apisix.apache.org/docs/ingress-controller/reference/apisix-ingress-controller/examples/

APISIX Ingress Controller supports both Ingress resources and Gateway API for traffic management in Kubernetes. In addition to these standard Kubernetes APIs, the APISIX Ingress Controller also supports a set of [CRDs (Custom Resource Definitions)](/docs/ingress-controller/reference/api-reference/) designed specifically for APISIX-native functionality.

This document provides examples of common configurations covering how and when to use these resources. You should adjust custom values such as namespaces, route URIs, and credentials to match your environment.

## Configure CP Endpoint and Admin Key

To update the Control Plane endpoint and admin key for connectivity between APISIX Ingress Controller and Control Plane at runtime:

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: GatewayProxy
metadata:
  namespace: ingress-apisix
  name: apisix-config
spec:
  provider:
    type: ControlPlane
    controlPlane:
      endpoints:
      - http://127.0.0.1:9180
      auth:
        type: AdminKey
        adminKey:
          value: replace-with-your-admin-key
```

## Define Controller and Gateway

To specify the controller responsible for handling resources before applying further configurations:




**gateway**


```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  namespace: ingress-apisix
  name: apisix
spec:
  controllerName: "apisix.apache.org/apisix-ingress-controller"    # 1
---
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  namespace: ingress-apisix
  name: apisix
spec:
  gatewayClassName: apisix
  listeners:
  - name: http
    protocol: HTTP
    port: 80                    # 2
  infrastructure:
    parametersRef:
      group: apisix.apache.org  # 3
      kind: GatewayProxy        # 4
      name: apisix-config       # 5
```

❶ The controller name should be customized if you are running multiple distinct instances of the APISIX Ingress Controller in the same cluster (not a single instance with multiple replicas). Each ingress controller instance must use a unique controllerName in its [configuration file](/docs/ingress-controller/reference/configuration-file/), and the corresponding GatewayClass should reference that value.

❷ The `port` in the Gateway listener is used for routing matching based on [`listener_port_match_mode`](/docs/ingress-controller/reference/configuration-file/) (`auto`, `explicit`, or `off`). The controller cannot dynamically open new ports on the data plane, so ensure APISIX is configured to listen on the port.

❸ API group of the referenced resource.

❹ Kind of the referenced resource.

❺ Name of the referenced resource. Should match the `metadata.name` of the GatewayProxy resource.




**ingress**


```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  namespace: ingress-apisix
  name: apisix
spec:
  controller: apisix.apache.org/apisix-ingress-controller    # 1
  parameters:
    apiGroup: apisix.apache.org    # 2
    kind: GatewayProxy             # 3
    name: apisix-config            # 4
    namespace: ingress-apisix      # 5
    scope: Namespace               # 6
```

❶ The controller name should be customized if you are running multiple distinct instances of the APISIX Ingress Controller in the same cluster (not a single instance with multiple replicas). Each ingress controller instance must use a unique controllerName in its [configuration file](/docs/ingress-controller/reference/configuration-file/), and the corresponding IngressClass should reference that value.

❷ API group of the referenced resource.

❸ Kind of the referenced resource.

❹ Name of the referenced resource. Should match the `metadata.name` of the GatewayProxy resource.

❺ Namespace where the referenced resource is defined.

❻ Scope of the referenced resource.




**apisix-crd**


```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  namespace: ingress-apisix
  name: apisix
spec:
  controller: apisix.apache.org/apisix-ingress-controller    # 1
  parameters:
    apiGroup: apisix.apache.org    # 2
    kind: GatewayProxy             # 3
    name: apisix-config            # 4
    namespace: ingress-apisix      # 5
    scope: Namespace               # 6
```

❶ The controller name should be customized if you are running multiple distinct instances of the APISIX Ingress Controller in the same cluster (not a single instance with multiple replicas). Each ingress controller instance must use a unique controllerName in its [configuration file](/docs/ingress-controller/reference/configuration-file/), and the corresponding IngressClass should reference that value.

❷ API group of the referenced resource.

❸ Kind of the referenced resource.

❹ Name of the referenced resource. Should match the `metadata.name` of the GatewayProxy resource.

❺ Namespace where the referenced resource is defined.

❻ Scope of the referenced resource.





## Route to K8s Services

To create a route that proxies requests to a service on K8s:




**gateway**


```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  parentRefs:
  - name: apisix
  rules:
  - matches:
    - path:
        type: Exact
        value: /ip
    backendRefs:
    - name: httpbin
      port: 80
```




**ingress**


```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  ingressClassName: apisix
  rules:
  - http:
      paths:
      - path: /ip
        pathType: Exact
        backend:
          service:
            name: httpbin
            port:
              number: 80
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  ingressClassName: apisix
  http:
  - name: httpbin
    match:
      paths:
      - /ip
    backends:
    - serviceName: httpbin
      servicePort: 80
```





## Route to External Services

To create a route that proxies requests to a service publicly hosted:




**gateway**


```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: ingress-apisix
  name: httpbin-external-domain
spec:
  type: ExternalName
  externalName: httpbin.org
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: ingress-apisix
  name: get-ip
spec:
  parentRefs:
  - name: apisix
  rules:
  - matches:
    - path:
        type: Exact
        value: /ip
    backendRefs:
    - name: httpbin-external-domain
      port: 80
```




**ingress**


```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: ingress-apisix
  name: httpbin-external-domain
spec:
  type: ExternalName
  externalName: httpbin.org
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: ingress-apisix
  name: get-ip
spec:
  ingressClassName: apisix
  rules:
  - http:
      paths:
      - path: /ip
        pathType: Exact
        backend:
          service:
            name: httpbin-external-domain
            port:
              number: 80
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
  namespace: ingress-apisix
  name: httpbin-external-domain
spec:
  ingressClassName: apisix
  externalNodes:
  - type: Domain
    name: httpbin.org
---
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: get-ip
spec:
  ingressClassName: apisix
  http:
    - name: get-ip
      match:
        paths:
          - /ip
      upstreams:
      - name: httpbin-external-domain
```





## Configure Weighted Services

To create a route that proxies traffic to upstream services by weight:




**gateway**


```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  parentRefs:
  - name: apisix
  rules:
  - matches:
    - path:
        type: Exact
        value: /ip
    backendRefs:
    - name: httpbin-1
      port: 80
      weight: 3
    - name: httpbin-2
      port: 80
      weight: 7
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  ingressClassName: apisix
  http:
  - name: httpbin
    match:
      paths:
      - /ip
    backends:
    - serviceName: httpbin-1
      servicePort: 80
      weight: 3
    - serviceName: httpbin-2
      servicePort: 80
      weight: 7
```





This configuration is not supported by the Ingress resource.

## Configure Upstream

To configure upstream related configurations, including load balancing algorithm, how the host header is passed to upstream, service timeout, health checks, and more:




**gateway**


```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: BackendTrafficPolicy
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  targetRefs:
  - name: httpbin
    kind: Service
    group: ""
  timeout:
    send: 10s
    read: 10s
    connect: 10s
  scheme: http
  retries: 10
  loadbalancer:
    type: roundrobin
  passHost: rewrite
  upstreamHost: httpbin.example.com
  healthCheck:
    active:
      type: http
      httpPath: /status/200
      host: httpbin.org
      healthy:
        successes: 2
        interval: 2s
      unhealthy:
        httpFailures: 3
        interval: 2s
    passive:
      type: http
      healthy:
        successes: 3
      unhealthy:
        httpFailures: 3
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  ingressClassName: apisix
  timeout:
    send: 10s
    read: 10s
    connect: 10s
  scheme: http
  retries: 10
  loadbalancer:
    type: roundrobin
  passHost: rewrite
  upstreamHost: httpbin.example.com
  healthCheck:
    active:
      type: http
      httpPath: /status/200
      host: httpbin.org
      healthy:
        successes: 2
        interval: 2s
      unhealthy:
        httpFailures: 3
        interval: 2s
    passive:
      type: http
      healthy:
        successes: 3
      unhealthy:
        httpFailures: 3
```





## Configure Consumer and Credentials




**gateway**


To create a consumer and configure the authentication credentials directly on the consumer:

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: Consumer
metadata:
  namespace: ingress-apisix
  name: alice
spec:
  gatewayRef:
    name: apisix
  credentials:
    - type: key-auth
      name: primary-key
      config:
        key: alice-primary-key
```

You can also use the secret CRD, where the credential should be base64 encoded:

```yaml
apiVersion: v1
kind: Secret
metadata:
  namespace: ingress-apisix
  name: key-auth-primary
data:
  key: YWxpY2UtcHJpbWFyeS1rZXk=
---
apiVersion: apisix.apache.org/v1alpha1
kind: Consumer
metadata:
  namespace: ingress-apisix
  name: alice
spec:
  gatewayRef:
    name: apisix
  credentials:
    - type: key-auth
      name: key-auth-primary
      secretRef:
        name: key-auth-primary
```




**apisix-crd**


To create a consumer and configure the authentication credentials directly on the consumer:

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixConsumer
metadata:
  namespace: ingress-apisix
  name: alice
spec:
  ingressClassName: apisix
  authParameter:
    keyAuth:
      value:
        key: alice-primary-key
```

You can also use the secret CRD, where the credential should be base64 encoded:

```yaml
apiVersion: v1
kind: Secret
metadata:
  namespace: ingress-apisix
  name: key-auth-primary
data:
  key: YWxpY2UtcHJpbWFyeS1rZXk=
---
apiVersion: apisix.apache.org/v2
kind: ApisixConsumer
metadata:
  namespace: ingress-apisix
  name: alice
spec:
  ingressClassName: apisix
  authParameter:
    keyAuth:
      secretRef:
        name: key-auth-primary
```





## Configure Plugin on Consumer

To configure plugin(s) on a consumer, such as a rate limiting plugin:




**gateway**


```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: Consumer
metadata:
  namespace: ingress-apisix
  name: alice
spec:
  gatewayRef:
    name: apisix
  credentials:
    - type: key-auth
      name: alice-key
      config:
        key: alice-key
  plugins:
    - name: limit-count
      config:
        count: 3
        time_window: 60
        key: remote_addr
        key_type: var
        policy: local
        rejected_code: 429
        rejected_msg: Too many requests
        show_limit_quota_header: true
        allow_degradation: false
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixConsumer
metadata:
  namespace: ingress-apisix
  name: alice
spec:
  ingressClassName: apisix
  authParameter:
    keyAuth:
      value:
        key: alice-key
  plugins:
    - name: limit-count
      enable: true
      config:
        count: 3
        time_window: 60
        key: consumer_name
        key_type: var
        policy: local
        rejected_code: 429
        rejected_msg: Too many requests
        show_limit_quota_header: true
        allow_degradation: false
```





## Configure Route Priority and Matching Conditions

To configure route priority and request matching conditions on a targeted route:




**gateway**


```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: HTTPRoutePolicy
metadata:
  namespace: ingress-apisix
  name: http-route-policy
spec:
  targetRefs:
  - group: gateway.networking.k8s.io
    kind: HTTPRoute
    name: httpbin
  priority: 10
  vars:
  - - http_x_test_name
    - ==
    - new_name
  - - arg_test
    - ==
    - test_name
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  ingressClassName: apisix
  http:
  - name: httpbin
    match:
      paths:
      - /*
      exprs:
      - subject:
          scope: Header
          name: X-Test-Name
        op: Equal
        value: new_name
      - subject:
          scope: Query
          name: test
        op: Equal
        value: test_name
    backends:
    - serviceName: httpbin
      servicePort: 80
```





## Configure Plugin on a Route

To configure plugins on a route:




**gateway**


```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: PluginConfig
metadata:
  namespace: ingress-apisix
  name: auth-plugin-config
spec:
  plugins:
    - name: key-auth
      config:
        _meta:
          disable: false
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: ingress-apisix
  name: get-ip
spec:
  parentRefs:
  - name: apisix
  rules:
  - matches: 
    - path:
        type: Exact
        value: /ip
    filters:
    - type: ExtensionRef
      extensionRef:
        group: apisix.apache.org
        kind: PluginConfig
        name: auth-plugin-config
    backendRefs:
    - name: httpbin
      port: 80
```




**apisix-crd**


To enable `basic-auth`, `key-auth`, `wolf-rbac`, `jwt-auth`, `ldap-auth`, or `hmac-auth`:

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: get-ip
spec:
  ingressClassName: apisix
  http:
    - name: get-ip
      match:
        paths:
          - /ip
      authentication:
        enable: true
        type: keyAuth
      backends:
      - serviceName: httpbin
        servicePort: 80
```

To enable other plugins:

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: get-ip
spec:
  ingressClassName: apisix
  http:
    - name: get-ip
      match:
        paths:
          - /ip
      plugins:
      - name: limit-count
        enable: true
        config:
          count: 2
          time_window: 10
          rejected_code: 429
      backends:
      - serviceName: httpbin
        servicePort: 80
```





## Configure Global Plugin

To configure a global plugin:




**gateway**


```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: GatewayProxy
metadata:
  namespace: ingress-apisix
  name: apisix-config
spec:
  provider:
    type: ControlPlane
    controlPlane:
      # add your control plane connection configuration here
      # ....
  plugins:
  - name: clickhouse-logger
    config:
      endpoint_addr: http://clickhouse-clickhouse-installation.apisix.svc.cluster.local:8123
      user: quickstart-user
      password: quickstart-pass
      logtable: test
      database: quickstart_db
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixGlobalRule
metadata:
  namespace: ingress-apisix
  name: apisix-global-rule-logging
spec:
  ingressClassName: apisix
  plugins:
  - name: clickhouse-logger
    enable: true
    config:
      endpoint_addr: http://clickhouse-clickhouse-installation.apisix.svc.cluster.local:8123
      user: quickstart-user
      password: quickstart-pass
      logtable: test
      database: quickstart_db
```





## Configure Plugin Metadata

To configure plugin metadata:




**gateway**


<!-- leave this section empty -->




**apisix-crd**


<!-- leave this section empty -->





```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: GatewayProxy
metadata:
  namespace: ingress-apisix
  name: apisix-config
spec:
  provider:
    type: ControlPlane
    controlPlane:
      # add your control plane connection configuration here
      # ....
  pluginMetadata:
    opentelemetry: {
      "trace_id_source": "x-request-id",
      "resource": {
        "service.name": "APISIX"
      },
      "collector": {
        "address": "simplest-collector:4318",
        "request_timeout": 3,
        "request_headers": {
          "Authorization": "token"
        }
      },
      "batch_span_processor": {
        "drop_on_queue_full": false,
        "max_queue_size": 1024,
        "batch_timeout": 2,
        "inactive_timeout": 1,
        "max_export_batch_size": 16
      },
      "set_ngx_var": true
    }
```

## Configure Plugin Config

To create a plugin config and reference it in a route:




**gateway**


```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: PluginConfig
metadata:
  namespace: ingress-apisix
  name: example-plugin-config
spec:
  plugins:
  - name: response-rewrite
    enable: true
    config:
      headers:
        X-Plugin-Config: "example-response-rewrite"
        X-Plugin-Test: "enabled"
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  parentRefs:
  - name: apisix
  rules:
  - matches: 
    - path:
        type: Exact
        value: /ip
    filters:
    - type: ExtensionRef
      extensionRef:
        group: apisix.apache.org
        kind: PluginConfig
        name: example-plugin-config
    backendRefs:
    - name: httpbin
      port: 80
```




**apisix-crd**


```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixPluginConfig
metadata:
  namespace: ingress-apisix
  name: example-plugin-config
spec:
  ingressClassName: apisix
  plugins:
  - name: response-rewrite
    enable: true
    config:
      headers:
        X-Plugin-Config: "example-response-rewrite"
        X-Plugin-Test: "enabled"
---
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  namespace: ingress-apisix
  name: httpbin
spec:
  ingressClassName: apisix
  http:
  - name: get-ip
    match:
      paths:
      - /ip
    backends:
    - serviceName: httpbin
      servicePort: 80
    plugin_config_name: example-plugin-config
```





## Configure Gateway Access Information

These configurations allow Ingress Controller users to access the gateway.




**gateway**


To configure the `statusAddress`:

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: GatewayProxy
metadata:
  namespace: ingress-apisix
  name: apisix-config
spec:
  provider:
    type: ControlPlane
    controlPlane:
      # add your control plane connection configuration here
      # ....
  statusAddress:
    - 10.24.87.13
```

Each entry in `statusAddress` can be an IP address or a hostname. The controller automatically sets the address type on the Gateway status — `IPAddress` for valid IPs and `Hostname` for everything else.




**ingress**


If you are using Ingress resources, you can configure either `statusAddress` or `publishService`.

To configure the `statusAddress`:

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: GatewayProxy
metadata:
  namespace: ingress-apisix
  name: apisix-config
spec:
  provider:
    type: ControlPlane
    controlPlane:
      # add your control plane connection configuration here
      # ....
  statusAddress:
    - 10.24.87.13
```

Each entry in `statusAddress` can be an IP address or a hostname. The controller automatically sets the `IP` field for valid IPs and the `Hostname` field for everything else in the Ingress load balancer status.

To configure the `publishService`:

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: GatewayProxy
metadata:
  namespace: ingress-apisix
  name: apisix-config
spec:
  provider:
    type: ControlPlane
    controlPlane:
      # add your control plane connection configuration here
      # ....
  publishService: apisix-gateway
```

When using `publishService`, the controller will use the endpoint of this Service to update the status information of the Ingress resource. The format can be either `namespace/svc-name` or simply `svc-name` if the default namespace is correctly set.

- If the Service is of `LoadBalancer` type, the controller uses its external IP or hostname.
- If the Service is of `ClusterIP` type, the controller propagates the hostname from any Ingress resources that reference that Service.




**apisix-crd**


Not supported.
