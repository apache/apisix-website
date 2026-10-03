# User-Agent Restriction (ua-restriction)

> The ua-restriction Plugin restricts access to upstream resources using an allowlist or denylist of user agents, preventing overload from web crawlers and enhancing API security.

Source: https://apisix.apache.org/docs/apisix/plugins/ua-restriction/

## Description

The `ua-restriction` Plugin supports restricting access to upstream resources through either configuring an allowlist or denylist of user agents. A common use case is to prevent web crawlers from overloading the upstream resources and causing service degradation.

## Attributes

| Name           | Type          | Required | Default       | Valid values   | Description                                                                                                                          |
|----------------|---------------|----------|---------------|----------------|--------------------------------------------------------------------------------------------------------------------------------------|
| bypass_missing | boolean       | False    | false         |                | If `true`, bypasses the UA restriction check when the `User-Agent` header is missing.                                                |
| allowlist      | array[string] | False    |               |                | List of allowed user agents (supports regex). Exactly one of `allowlist` or `denylist` must be configured.                           |
| denylist       | array[string] | False    |               |                | List of denied user agents (supports regex). Exactly one of `allowlist` or `denylist` must be configured.                            |
| message        | string        | False    | "Not allowed" | [1, 1024] chars | Message returned to the client when the user agent is not allowed.                                                                   |

## Examples

The examples below demonstrate how you can configure `ua-restriction` for different scenarios.

:::note

You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

### Reject Web Crawlers and Customize Error Message

The following example demonstrates how you can configure the Plugin to fend off unwanted web crawlers and customize the rejection message.




**admin-api**


Create a Route and configure the Plugin to block specific crawlers from accessing resources with a customized message:

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "id": "ua-restriction-route",
    "uri": "/anything",
    "plugins": {
      "ua-restriction": {
        "bypass_missing": false,
        "denylist": [
          "(Baiduspider)/(\\d+)\\.(\\d+)",
          "bad-bot-1"
        ],
        "message": "Access denied"
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "httpbin.org:80": 1
      }
    }
  }'
```




**adc**


<div class="code-title">adc.yaml</div>

```yaml
services:
  - name: ua-restriction-service
    routes:
      - name: ua-restriction-route
        uris:
          - /anything
        plugins:
          ua-restriction:
            bypass_missing: false
            denylist:
              - "(Baiduspider)/(\\d+)\\.(\\d+)"
              - "bad-bot-1"
            message: "Access denied"
    upstream:
      type: roundrobin
      nodes:
        - host: httpbin.org
          port: 80
          weight: 1
```

Synchronize the configuration to the gateway:

```shell
adc sync -f adc.yaml
```




**aic**





**gateway-api**


<div class="code-title">ua-restriction-ic.yaml</div>

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: aic
  name: httpbin-external-domain
spec:
  type: ExternalName
  ports:
    - port: 80
  externalName: httpbin.org
---
apiVersion: apisix.apache.org/v1alpha1
kind: PluginConfig
metadata:
  namespace: aic
  name: ua-restriction-plugin-config
spec:
  plugins:
    - name: ua-restriction
      config:
        bypass_missing: false
        denylist:
          - "(Baiduspider)/(\\d+)\\.(\\d+)"
          - "bad-bot-1"
        message: "Access denied"
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: aic
  name: ua-restriction-route
spec:
  parentRefs:
    - name: apisix
  rules:
    - matches:
        - path:
            type: Exact
            value: /anything
      filters:
        - type: ExtensionRef
          extensionRef:
            group: apisix.apache.org
            kind: PluginConfig
            name: ua-restriction-plugin-config
      backendRefs:
        - name: httpbin-external-domain
          port: 80
```

Apply the configuration to your cluster:

```shell
kubectl apply -f ua-restriction-ic.yaml
```




**apisix-ingress-controller**


<div class="code-title">ua-restriction-ic.yaml</div>

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
  namespace: aic
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
  namespace: aic
  name: ua-restriction-route
spec:
  ingressClassName: apisix
  http:
    - name: ua-restriction-route
      match:
        paths:
          - /anything
      upstreams:
      - name: httpbin-external-domain
      plugins:
      - name: ua-restriction
        enable: true
        config:
          bypass_missing: false
          denylist:
            - "(Baiduspider)/(\\d+)\\.(\\d+)"
            - "bad-bot-1"
          message: "Access denied"
```

Apply the configuration to your cluster:

```shell
kubectl apply -f ua-restriction-ic.yaml
```









Send a request to the Route:

```shell
curl -i "http://127.0.0.1:9080/anything"
```

You should receive an `HTTP/1.1 200 OK` response.

Send another request to the Route with a disallowed user agent:

```shell
curl -i "http://127.0.0.1:9080/anything" -H 'User-Agent: Baiduspider/5.0'
```

You should receive an `HTTP/1.1 403 Forbidden` response with the following message:

```text
{"message":"Access denied"}
```

### Bypass UA Restriction Checks

The following example demonstrates how to configure the Plugin to allow requests of a specific user agent to bypass the UA restriction.




**admin-api**


Create a Route as such:

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \
  -H "X-API-KEY: ${admin_key}" \
  -d '{
    "id": "ua-restriction-route",
    "uri": "/anything",
    "plugins": {
      "ua-restriction": {
        "bypass_missing": true,
        "allowlist": [
          "good-bot-1"
        ],
        "message": "Access denied"
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "httpbin.org:80": 1
      }
    }
  }'
```




**adc**


<div class="code-title">adc.yaml</div>

```yaml
services:
  - name: ua-restriction-service
    routes:
      - name: ua-restriction-route
        uris:
          - /anything
        plugins:
          ua-restriction:
            bypass_missing: true
            allowlist:
              - "good-bot-1"
            message: "Access denied"
    upstream:
      type: roundrobin
      nodes:
        - host: httpbin.org
          port: 80
          weight: 1
```

Synchronize the configuration to the gateway:

```shell
adc sync -f adc.yaml
```




**aic**





**gateway-api**


<div class="code-title">ua-restriction-ic.yaml</div>

```yaml
apiVersion: v1
kind: Service
metadata:
  namespace: aic
  name: httpbin-external-domain
spec:
  type: ExternalName
  ports:
    - port: 80
  externalName: httpbin.org
---
apiVersion: apisix.apache.org/v1alpha1
kind: PluginConfig
metadata:
  namespace: aic
  name: ua-restriction-allowlist-plugin-config
spec:
  plugins:
    - name: ua-restriction
      config:
        bypass_missing: true
        allowlist:
          - "good-bot-1"
        message: "Access denied"
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  namespace: aic
  name: ua-restriction-route
spec:
  parentRefs:
    - name: apisix
  rules:
    - matches:
        - path:
            type: Exact
            value: /anything
      filters:
        - type: ExtensionRef
          extensionRef:
            group: apisix.apache.org
            kind: PluginConfig
            name: ua-restriction-allowlist-plugin-config
      backendRefs:
        - name: httpbin-external-domain
          port: 80
```

Apply the configuration to your cluster:

```shell
kubectl apply -f ua-restriction-ic.yaml
```




**apisix-ingress-controller**


<div class="code-title">ua-restriction-ic.yaml</div>

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixUpstream
metadata:
  namespace: aic
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
  namespace: aic
  name: ua-restriction-route
spec:
  ingressClassName: apisix
  http:
    - name: ua-restriction-route
      match:
        paths:
          - /anything
      upstreams:
      - name: httpbin-external-domain
      plugins:
      - name: ua-restriction
        enable: true
        config:
          bypass_missing: true
          allowlist:
            - "good-bot-1"
          message: "Access denied"
```

Apply the configuration to your cluster:

```shell
kubectl apply -f ua-restriction-ic.yaml
```









Send a request to the Route without modifying the user agent:

```shell
curl -i "http://127.0.0.1:9080/anything"
```

You should receive an `HTTP/1.1 403 Forbidden` response with the following message:

```text
{"message":"Access denied"}
```

Send another request to the Route with an empty user agent:

```shell
curl -i "http://127.0.0.1:9080/anything" -H 'User-Agent: '
```

You should receive an `HTTP/1.1 200 OK` response.
