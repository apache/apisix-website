---
title: "如何使用 Amesh 配置插件"
authors: 
  - name: "lingsamuel"
    title: "Author"
    url: "https://github.com/lingsamuel"
    image_url: "https://github.com/lingsamuel.png"
keywords: 
- Apache APISIX
- Amesh
- Service Mesh
- 服务网格
- Kubernetes
description: Amesh 是 Apache APISIX 的服务网格库。本文在假设已经成功安装 Amesh 后，如何在 Amesh 中进行部署、配置和更新插件等操作。
tags: [Ecosystem]
---

> Amesh 是 Apache APISIX 的服务网格库。本文在假设已经成功安装 Amesh 后，如何在 Amesh 中进行部署、配置和更新插件等操作。

<!--truncate-->

> 作者[@lingsamuel](https://github.com/lingsamuel)，API7.ai 云原生技术专家，Apache APISIX Committer。

在上一篇 Amesh 产品介绍中，我们有提到在 Amesh v2.0 版本新增了一个可选的控制面组件，即 `amesh-controller` 及相应的 CRD。`amesh controller` 为用户提供了配置 APISIX 插件的能力，使 APISIX 众多的插件在服务网格场景下也能开箱即用，而无需用户进行自定义的开发。那么如何使用这些组件，来进行 APISIX 插件能力的使用呢？

本文在假设已经成功安装 Amesh 后，如何在 Amesh 中进行部署、配置和更新插件等操作。

## 部署 Amesh Controller 与 CRD

使用如下命令部署 Amesh Controller 与 CRD：

```bash
cd controller
kubectl apply -k ./config/crd/
helm install amesh-controller -n istio-system ./charts/amesh-controller
```

默认情况下，Amesh 将会自动连接到位于 `istio-system` namespace 下的 `amesh-controller` 服务 `15810` 端口，而无需重启 Sidecar。

如需自定义，可以使用 `AMESH_GRPC_SOURCE` 环境变量进行配置。该变量默认值为 `"grpc://amesh-controller.istio-system.svc:15810"`，按需指定到对应的 `amesh-controller` 即可。

## 部署示例应用

这里我们以 Istio 提供的 Bookinfo 应用为测试用例。

```bash
# 在 Istio 目录下执行
kubectl -n test apply -f samples/bookinfo/platform/kube/bookinfo.yaml
kubectl -n test run consumer --image curlimages/curl --image-pull-policy IfNotPresent --command sleep 1d
```

测试是否能够正常访问：

```bash
kubectl -n test exec -it -c istio-proxy consumer -- curl -i -XGET "http://productpage:9080/productpage" | grep -o "<title>.*</title>"
```

输出细节类似如下所示：

```bash
<title>Simple Bookstore App</title>
```

## 配置示例插件

本文将以 `response-rewrite` 插件为例进行演示。首先为集群应用下列示例配置：

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: AmeshPluginConfig
metadata:
  name: ameshpluginconfig-sample
spec:
  plugins:
    - name: response-rewrite
      config: '{"body": "BODY_REWRITE", "headers": {"X-Header":"Rewrite"}}'
```

尝试访问测试负载：

```bash
kubectl -n test exec -it -c istio-proxy consumer -- curl -i -XGET "http://productpage:9080/productpage"
```

输出细节应该包含如下内容：

```yaml
Via: APISIX
Server: APISIX/2.15.0
X-Header: Rewrite

BODY_REWRITE
```

### 更新插件配置

将示例 AmeshPluginConfig 文件修改为如下，移除 Body 配置：

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: AmeshPluginConfig
metadata:
  name: ameshpluginconfig-sample
spec:
  plugins:
  - name: response-rewrite
    config: '{"headers": {"X-Header":"Rewrite"}}'
```

再次请求测试负载：

```bash
kubectl -n test exec -it -c istio-proxy consumer -- curl -i -XGET "http://productpage:9080/productpage" | grep -o "<title>.*</title>"
```

输出应该包含如下内容：

```html
<title>Simple Bookstore App</title>
```

这表明响应 Body 没有被重写，符合我们的预期。

下面的命令可以验证 Header 是否被正常重写：

```bash
kubectl -n test exec -it -c istio-proxy consumer -- curl -i -XGET "http://productpage:9080/productpage" | grep "X-Header"
```

输出内容如下所示：

```yaml
X-Header: Rewrite
```

## 其他场景

除了上文演示的 `response-rewrite` 插件之外，Amesh 还支持配置 APISIX 的所有插件。用户可以根据需要进行配置。

例如，当需要进行故障注入时，只需要将配置中的插件名改为 `fault-injection`，插件配置改为 `'{"abort": { "http_status": 200, "body": "Fault Injection!" }'` 即可实现，具体如下所示：

```yaml
apiVersion: apisix.apache.org/v1alpha1
kind: AmeshPluginConfig
metadata:
  name: faultinjection-sample
spec:
  plugins:
  - name: fault-injection
    config: '{"abort": { "http_status": 200, "body": "Fault Injection!" }'
```

## 总结

本文以 `response-rewrite` 插件为例，演示了 Amesh v0.2 版本新增的插件配置功能。在实际使用中，用户可以根据需要，为 Amesh 配置适合的 APISIX 中已有的插件。也欢迎各位在实践中进行体验，并反馈更多关于服务网格的想法。
