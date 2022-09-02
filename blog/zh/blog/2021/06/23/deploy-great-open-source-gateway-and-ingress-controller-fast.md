---
title: "使用 Rancher 极速部署更好用的开源网关和 Ingress 控制器"
author: "张晋涛"
authorURL: "https://github.com/tao12345666333"
authorImageURL: "https://avatars.githubusercontent.com/u/3264292?v=4"
keywords:
- APISIX
- Rancher
- Helm Chart
- API 网关
description: 通过 API 网关 Apache APISIX Helm 仓库可直接部署 APISIX 和 APISIX Ingress Controller 在 Rancher 中，并且可以通过它们来承载业务流量。
tags: [Ecosystem]
---
> 你可以在 Rancher 中使用 Apache APISIX 的官方 Helm 仓库直接部署 Apache APISIX 和 APISIX Ingress controller。并且 Apache APISIX 可通过作为网关，或者 APISIX Ingress controller 的数据面来承载业务流量。

<!--truncate-->
## Rancher 介绍

Rancher 是一个开源的企业级多集群 Kubernetes 管理平台，实现了 Kubernetes 集群在混合云+本地数据中心的集中部署与管理，以确保集群的安全性，加速企业数字化转型。

## Apache APISIX 介绍

Apache APISIX 是一款开源的高性能、动态云原生网关，由深圳[支流科技](https://api7.ai/)有限公司于 2019 年捐赠给 Apache 基金会，当前已经成为 Apache 基金会的顶级开源项目，也是 GitHub 上最活跃的开源网关项目。Apache APISIX 当前已经覆盖了 API 网关，LB，Kubernetes Ingress，Service Mesh 等多种场景。

## 前置条件

- 将现有 Kubernetes 集群已纳入 Rancher 管理。

## 部署 Apache APISIX 和 Apache APISIX Ingress controller

在 Rancher 的 *Tools - Catalogs* 页面可以进行商店（catalogs）的配置，我们在这里[添加 Apache APISIX 的 Helm 仓库](https://github.com/apache/apisix-helm-chart)。

![2021-06-23-1](https://static.apiseven.com/202108/1639464984786-20a73a62-1e9d-463b-aac3-26ac18ab5228.png)

保存完成后，即可选择 *Apps* 页面进行 Apache APISIX 的部署了。选择 *Launch* 便可看到 Apache APISIX 的仓库信息了。这里我们直接选择 apisix 即可。

![2021-06-23-2](https://static.apiseven.com/202108/1639465059361-aa11ab87-11f7-45b6-964f-d285d41e8a39.png)

![2021-06-23-3](https://static.apiseven.com/202108/1639465129809-bf86383f-bab5-459d-bb02-e7d45e3b4c51.png)

接下来着只需要在此页面中进行简单的配置即可。 **因为我们想要同时部署 APISIX Ingress controller，所以在底部的 Answers 中填入 `ingress-controller.enabled=true` 这个配置项** 。保存即可完成部署。

![2021-06-23-4](https://static.apiseven.com/202108/1639465197713-4ba6e7a2-8824-42e6-bf27-1d49f4e60ce5.png)

稍等片刻即可完成部署。

![2021-06-23-5](https://static.apiseven.com/202108/1639465259396-fc1104e9-289d-41b6-ae23-d6e05da066b1.png)

## 部署示例项目

我们使用 `kennethreitz/httpbin` 作为示例项目进行演示。这里也直接在 Rancher 中完成部署。

![2021-06-23-6](https://static.apiseven.com/202108/1639465331864-d8160567-d30c-427a-b0e5-425df6657879.png)

## 使用 Apache APISIX 作为网关代理

我们先演示如何使用 Apache APISIX 作为网关代理 Kubernetes 集群中的服务。

```shell
root@apisix:~$ kubectl -n apisix exec -it `kubectl -n apisix get pods -l app.kubernetes.io/name=apisix -o name` -- bash
bash-5.1# curl httpbin.default/get
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.default",
    "User-Agent": "curl/7.76.1"
  },
  "origin": "10.244.3.3",
  "url": "http://httpbin.default/get"
}
```

可以看到在 Apache APISIX 的 Pod 内可正常访问示例项目。接下来使用 Apache APISIX 对该示例项目进行代理。

这里我们使用 `curl` 调用 Apache APISIX 的 admin 接口，创建一条路由。将所有 host 头为 `httpbin.org` 的请求转发给 `httpbin.default:80` 这个实际的应用服务上。

```shell
bash-5.1# curl "http://127.0.0.1:9180/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d '
{
  "uri": "/*",
  "host": "httpbin.org",
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "httpbin.default:80": 1
    }
  }
}'
{"action":"set","node":{"value":{"uri":"\/*","create_time":1623834078,"update_time":1623834078,"priority":0,"upstream":{"type":"roundrobin","hash_on":"vars","pass_host":"pass","nodes":{"httpbin.default:80":1},"scheme":"http"},"id":"1","status":1,"host":"httpbin.org"},"key":"\/apisix\/routes\/1"}}
```

你会得到类似上面的输出，接下来验证是否代理成功：

```shell
bash-5.1# curl http://127.0.0.1:9080/get -H "HOST: httpbin.org"
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.76.1",
    "X-Forwarded-Host": "httpbin.org"
  },
  "origin": "127.0.0.1",
  "url": "http://httpbin.org/get"
}
```

得到上面的输出，说明已经通过 Apache APISIX 代理了示例项目的流量。接下来我们试试在集群外通过 Apache APISIX 访问示例项目。

```shell
root@apisix:~$ kubectl  -n apisix get svc -l app.kubernetes.io/name=apisix
NAME             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
apisix-admin     ClusterIP   10.96.142.88    <none>        9180/TCP       51m
apisix-gateway   NodePort    10.96.158.192   <none>        80:32763/TCP   51m
```

在使用 Helm chart 部署的时候，默认会将 Apache APISIX 的端口通过 NodePort 的形式暴露出去。我们使用 Node IP + NodePort 的端口进行访问测试。

```shell
root@apisix:~$ curl http://172.18.0.2:32763/get -H "HOST: httpbin.org"
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.58.0",
    "X-Forwarded-Host": "httpbin.org"
  },
  "origin": "10.244.3.1",
  "url": "http://httpbin.org/get"
}
```

可以看到，**在集群外已经可以通过 Apache APISIX 作为网关代理 Kubernetes 集群内的服务了。**

## 使用 APISIX Ingress controller 代理服务

我们可以直接在 Rancher 中添加 Ingress ，Apache APISIX Ingress controller 会自动将路由规则同步至 Apache APISIX 中，完成服务的代理。

![2021-06-23-7](https://static.apiseven.com/202108/1639465402058-3f41e8de-033b-4888-a835-30969251e402.png)

注意右下角， 我们添加了 `kubernetes.io/ingress.class: apisix` 的 annotation 配置，用于支持集群内多 ingress-controller 的场景。

保存后，可看到如下界面：

![2021-06-23-8](https://static.apiseven.com/202108/1639465466581-db8c19d7-9c8f-402c-9270-34e327908caa.png)

在终端下测试是否代理成功：

```shell
root@apisix:~$ curl http://172.18.0.2:32763/get -H "HOST: httpbin-ing.org"
{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin-ing.org",
    "User-Agent": "curl/7.58.0",
    "X-Forwarded-Host": "httpbin-ing.org"
  },
  "origin": "10.244.3.1",
  "url": "http://httpbin-ing.org/get"
}
```

可以看到也正常代理了。

除了以上方式外，Apache APISIX Ingress controller 通过 CRD 的方式对 Kubernetes 进行了扩展，你也可以通过发布 `ApisixRoute` 等这种自定义资源来完成 Kubernetes 中服务的对外暴露。

## 总结

你可以在 Rancher 中使用 Apache APISIX 的官方 Helm 仓库直接部署 Apache APISIX 和 APISIX Ingress controller 。并且 Apache APISIX 可通过作为网关，或者 APISIX Ingress controller 的数据面来承载业务流量。

## 未来展望

Apache APISIX 已经与 Rancher 社区达成合作，未来你可以直接在 Rancher 自带的应用仓库中找到 Apache APISIX ，不再需要手动添加 Helm 仓库了。
