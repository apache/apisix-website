# ua-restriction

> ua-restriction 插件使用用户代理的允许列表或拒绝列表来限制对上游资源的访问，防止网络爬虫过载并增强 API 安全性。

Source: https://apisix.apache.org/zh/docs/apisix/plugins/ua-restriction/

## 描述

`ua-restriction` 插件支持通过配置用户代理的允许列表或拒绝列表来限制对上游资源的访问。一个常见的用例是防止网络爬虫使上游资源过载并导致服务降级。

## 属性

| 名称           | 类型          | 必选项 | 默认值        | 有效值          | 描述                                                                                       |
|----------------|---------------|--------|---------------|-----------------|------------------------------------------------------------------------------------------|
| bypass_missing | boolean       | 否     | false         |                 | 如果为 `true`，则在缺少 `User-Agent` 请求头时绕过用户代理限制检查。                         |
| allowlist      | array[string] | 否     |               |                 | 允许的用户代理列表（支持正则表达式）。`allowlist` 和 `denylist` 必须且只能配置其中一个。    |
| denylist       | array[string] | 否     |               |                 | 拒绝的用户代理列表（支持正则表达式）。`allowlist` 和 `denylist` 必须且只能配置其中一个。    |
| message        | string        | 否     | "Not allowed" | [1, 1024] 个字符 | 当用户代理被拒绝访问时返回给客户端的消息。                                                   |

## 示例

以下示例演示了如何针对不同场景配置 `ua-restriction`。

:::note

你可以这样从 `config.yaml` 中获取 `admin_key` 并存入环境变量：

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

### 拒绝网络爬虫并自定义错误消息

以下示例演示了如何配置插件以抵御不需要的网络爬虫并自定义拒绝消息。




**admin-api**


创建路由并配置插件以使用自定义消息阻止特定爬虫访问资源：

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

将配置同步到网关：

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
  externalName: httpbin.org
  ports:
    - port: 80
      targetPort: 80
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

将配置应用到你的集群：

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

将配置应用到你的集群：

```shell
kubectl apply -f ua-restriction-ic.yaml
```









向路由发送请求：

```shell
curl -i "http://127.0.0.1:9080/anything"
```

你应该收到 `HTTP/1.1 200 OK` 响应。

使用不允许的用户代理向路由发送另一个请求：

```shell
curl -i "http://127.0.0.1:9080/anything" -H 'User-Agent: Baiduspider/5.0'
```

你应该收到 `HTTP/1.1 403 Forbidden` 响应，其中包含以下消息：

```text
{"message":"Access denied"}
```

### 绕过 UA 限制检查

以下示例说明如何配置插件以允许特定用户代理的请求绕过 UA 限制。




**admin-api**


创建如下路由：

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

将配置同步到网关：

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

将配置应用到你的集群：

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

将配置应用到你的集群：

```shell
kubectl apply -f ua-restriction-ic.yaml
```









向路由发送一个请求而不修改用户代理：

```shell
curl -i "http://127.0.0.1:9080/anything"
```

你应该收到一个 `HTTP/1.1 403 Forbidden` 响应，其中包含以下消息：

```text
{"message":"Access denied"}
```

向路由发送另一个请求，用户代理为空：

```shell
curl -i "http://127.0.0.1:9080/anything" -H 'User-Agent: '
```

你应该收到一个 `HTTP/1.1 200 OK` 响应。
