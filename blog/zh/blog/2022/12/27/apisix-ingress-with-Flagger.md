---
title: "APISIX Ingress + Flagger 实现顺滑的金丝雀发布"
author: "谭恒亮"
authorURL: "https://github.com/Gallardot"
authorImageURL: "https://github.com/Gallardot.png"
keywords: 
- Apache APISIX
- Ingress
- Ingress controller
- 金丝雀
- Flagger
description: 通过 Apache APISIX 和 Flagger 的整合，实现了非常顺滑的金丝雀发布。
tags: [Ecosystem]
---

> 通过 Apache APISIX 和 Flagger 的整合，实现了非常顺滑的金丝雀发布。

<!--truncate-->

> 作者：谭恒亮，Github ID: Gallardot。开源项目爱好者，CNCF Chaos Mesh 项目 Maintainer，CNCF KubeVela、Apache APISIX、CNCF Flagger、CNCF Argo Rollouts 等项目 Contributor。目前在小鹏汽车任职基础架构研发专家。

在日常的项目开发过程中时，我们时常会面临服务变更的挑战，为了不影响用户体验，我们往往尽可能需要规避服务不可用的风险。因此，持续交付便应运而生，其被接受为一种企业软件实践，并且是完善的持续集成原则的自然演变。

然而，持续部署仍然非常罕见，这可能是由于管理的复杂性以及担心部署失败会影响系统可用性。在整个持续交付体系中，金丝雀发布或许是最为经典的一个场景。基于此，我们能够很快发现“不健康”和“有问题”的服务，并且可以毫不费力地回滚到上一个版本。

金丝雀发布也称“灰度发布”。通常来讲，在原有版本可用的情况下，同时发布部署一个新版本应用作为“金丝雀”，其目的是为了测试新版本的性能和表现，在保障整体系统稳定的前提下，尽早发现和及时调整。

金丝雀发布并非黑即白的发布方式，它能够缓慢地将特定百分比的流量引导至一小部分用户。若验证没有问题，再推广到全部用户，并逐步淘汰旧版本，以降低生产环境引入新功能带来的风险。

本文将介绍如何通过 Apache APISIX Ingress 和 Flagger 实现顺滑的金丝雀发布，从而提高发布效率，降低发布风险。

## 项目介绍

### Apache APISIX Ingress

Apache APISIX Ingress 使用 Apache APISIX 作为数据面代理的 Kubernetes Ingress controller 实现，提供了负载均衡、动态上游、金丝雀发布、精细化路由、限流限速、服务降级、服务熔断、身份认证、可观测性等数百项功能。目前已被包括 Zoom、腾讯云、驾考宝典、地平线、欧洲哥白尼参考系统等国内外公司和组织采用。

### Flagger

Flagger 是一个 CNCF 云原生计算基金会项目，是 GitOps 工具 Flux 系列的一部分。最近 CNCF 云原生计算基金会也宣布了 Flux 正式毕业，很好地表明了云原生技术当前的成功与光明前景。作为一种渐进式交付工具，Flagger 可自动执行在 Kubernetes 上运行的应用程序的发布过程。它通过在衡量分析指标和运行一致性测试的同时逐渐将流量转移到新版本来降低在生产中引入新软件版本的风险。

经过 Apache APISIX 和 Flux 两个社区的合作与努力，Flagger 在近期也发布了 v1.27.0 版本，支持使用 Apache APISIX Ingress 和 Flagger 进行自动化的金丝雀发布。

![金丝雀发布流程](https://static.apiseven.com/2022/12/26/63a9a47945eda.png)

下文将通过实践，一步步为大家展示下这个顺滑的金丝雀发布过程。

## 金丝雀发布准备环节

### 环境与组件准备

首先需要一个 v1.19 或更新版本的 Kubernetes 集群，你可以通过 [kind](https://kind.sigs.k8s.io/) 进行安装。

然后使用 Helm V3 来安装 Apache APISIX 和 Apache APISIX Ingress Controller，具体操作如下所示：

```bash
helm repo add apisix https://charts.apiseven.com
kubectl create ns apisix



helm upgrade -i apisix apisix/apisix --version=0.11.3 \
--namespace apisix \
--set apisix.podAnnotations."prometheus\.io/scrape"=true \
--set apisix.podAnnotations."prometheus\.io/port"=9091 \
--set apisix.podAnnotations."prometheus\.io/path"=/apisix/prometheus/metrics \
--set pluginAttrs.prometheus.export_addr.ip=0.0.0.0 \
--set pluginAttrs.prometheus.export_addr.port=9091 \
--set pluginAttrs.prometheus.export_uri=/apisix/prometheus/metrics \
--set pluginAttrs.prometheus.metric_prefix=apisix_ \
--set ingress-controller.enabled=true \
--set ingress-controller.config.apisix.serviceNamespace=apisix
```

完成后，在 apisix namespace 中安装 Flagger 和 Prometheus 附加组件。

```bash
helm repo add flagger https://flagger.app



helm upgrade -i flagger flagger/flagger \
--namespace apisix \
--set prometheus.install=true \
--set meshProvider=apisix
```

注意，如需使用自建 prometheus 或者 prometheus operator，可以自行搜索相关文章进行修改。

### 初始化应用

Flagger 可以作用于 Kubernetes 的 deployment 以及其他的 workload，也可以和 HPA 结合在一起工作。它将会创建一系列的对象（比如 Kubernetes deployments、ClusterIP services 和 ApisixRoute）。这些对象可以将应用暴露到集群外提供服务，并用于金丝雀发布过程的分析和发布。

首先使用 `kubectl create ns test` 命令来新建一个 namespace，这里我们将其命名为 `test`。然后通过 `kubectl apply -k https://github.com/fluxcd/flagger//kustomize/podinfo?ref=main` 命令，新建一个 deployment 和 HPA，这里使用 Flagger 官方示例程序。

接下来可通过 `helm upgrade -i flagger-loadtester flagger/loadtester \`

`--namespace=test` 指令来部署 Flagger 的负载测试服务，用于在金丝雀发布期间产生流量时，方便对其进行分析。

此时，创建 Apache APISIX 的`ApisixRoute`，Flagger 将会引用该资源，并且生成金丝雀版本的 Apache APISIX Ingress 的`ApisixRoute`，具体可参考下方示例（示例中的`app.example.com`可以替换成你的实际域名）。

```yaml
apiVersion: apisix.apache.org/v2
kind: ApisixRoute
metadata:
  name: podinfo
  namespace: test
spec:
  http:
    - backends:
        - serviceName: podinfo
          servicePort: 80
      match:
        hosts:
          - app.example.com
        methods:
          - GET
        paths:
          - /*
      name: method
      plugins:
        - name: prometheus
          enable: true
          config:
            disable: false
            prefer_name: true
```

将上方代码保存为 `podinfo-apisixroute.yaml` 文件并且提交到集群中。

```shell
kubectl apply -f ./podinfo-apisixroute.yaml
```

接下来可以创建 Flagger 的自定义资源 Canary，如下所示（示例中的 `app.example.com` 可以替换成你的实际域名）。

```yaml
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: podinfo
  namespace: test
spec:
  provider: apisix
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: podinfo
  # 引用 apisix route
  routeRef:
    apiVersion: apisix.apache.org/v2
    kind: ApisixRoute
    name: podinfo
  progressDeadlineSeconds: 60
  service:
    port: 80
    targetPort: 9898
  analysis:
    # 调度间隔 (默认 60s)
    interval: 10s
    # 最大的metric检测失败次数，超过将会自动回滚
    threshold: 10
    # 流量路由到canary应用的最大百分比
    # (0-100)
    maxWeight: 50
    # 金丝雀分析渐进的步长
    # (0-100)
    stepWeight: 10
    # 通过Prometheus检查APISIX上的流量状况
    metrics:
      - name: request-success-rate
        # 最小的请求成功率 (非 5xx 响应)
        # (0-100)
        thresholdRange:
          min: 99
        interval: 1m
      - name: request-duration
        # P99 最大的请求延迟
        # 单位是毫秒
        thresholdRange:
          max: 500
        interval: 30s
    webhooks:
        # 自动产生流量以便进行金丝雀分析，根据实际业务场景修改
      - name: load-test
        url: http://flagger-loadtester.test/
        timeout: 5s
        type: rollout
        metadata:
          cmd: |-
            hey -z 1m -q 10 -c 2 -h2 -host app.example.com http://apisix-gateway.apisix/api/info
```

将上述代码保存为 `podinfo-canary.yaml` 文件，并提交到集群中。

```shell
kubectl apply -f ./podinfo-canary.yaml
```

稍等一下 Flagger 就会自动生成相关的资源。

```bash
# 主动提交的
deployment.apps/podinfo
horizontalpodautoscaler.autoscaling/podinfo
apisixroute/podinfo
canary.flagger.app/podinfo

# 自动生成的
deployment.apps/podinfo-primary
horizontalpodautoscaler.autoscaling/podinfo-primary
service/podinfo
service/podinfo-canary
service/podinfo-primary
apisixroute/podinfo-podinfo-canary
```

此时你通过域名 app.example.com 访问应用（示例中的 `app.example.com` 可以替换成你的实际域名），你将会看到当前版本的应用细节。

![版本 1](https://static.apiseven.com/2022/12/26/63a9a4798e616.png)

## 具体功能实践

### 自动金丝雀发布

Flagger 实现了一个控制循环，在持续测量 HTTP 请求成功率、请求平均持续时间和 Pod 健康状况等关键性能指标的同时，逐渐将流量转移至金丝雀节点。根据对相关指标的分析，发布或中止金丝雀部署，并将分析结果发布到相关平台例如 Slack、MS Teams 或者 Prometheus Alert Manager 等。

![Flagger 控制循环](https://static.apiseven.com/2022/12/26/63a9a47bb7a3d.png)

具体可通过更新容器镜像版本，来触发金丝雀发布。

```shell
kubectl -n test set image deployment/podinfo \
podinfod=stefanprodan/podinfo:6.0.1
```

当 Flagger 检测到 deployment 有新版变更时，就会开始试运行金丝雀分析发布。

```shell
kubectl -n test describe canary/podinfo

Status:
  Canary Weight:  0
  Conditions:
    Message:               Canary analysis completed successfully, promotion finished.
    Reason:                Succeeded
    Status:                True
    Type:                  Promoted
  Failed Checks:           1
  Iterations:              0
  Phase:                   Succeeded

Events:
  Type     Reason  Age                    From     Message
  ----     ------  ----                   ----     -------
  Warning  Synced  2m59s                  flagger  podinfo-primary.test not ready: waiting for rollout to finish: observed deployment generation less than desired generation
  Warning  Synced  2m50s                  flagger  podinfo-primary.test not ready: waiting for rollout to finish: 0 of 1 (readyThreshold 100%) updated replicas are available
  Normal   Synced  2m40s (x3 over 2m59s)  flagger  all the metrics providers are available!
  Normal   Synced  2m39s                  flagger  Initialization done! podinfo.test
  Normal   Synced  2m20s                  flagger  New revision detected! Scaling up podinfo.test
  Warning  Synced  2m (x2 over 2m10s)     flagger  canary deployment podinfo.test not ready: waiting for rollout to finish: 0 of 1 (readyThreshold 100%) updated replicas are available
  Normal   Synced  110s                   flagger  Starting canary analysis for podinfo.test
  Normal   Synced  109s                   flagger  Advance podinfo.test canary weight 10
  Warning  Synced  100s                   flagger  Halt advancement no values found for apisix metric request-success-rate probably podinfo.test is not receiving traffic: running query failed: no values found
  Normal   Synced  90s                    flagger  Advance podinfo.test canary weight 20
  Normal   Synced  80s                    flagger  Advance podinfo.test canary weight 30
  Normal   Synced  69s                    flagger  Advance podinfo.test canary weight 40
  Normal   Synced  59s                    flagger  Advance podinfo.test canary weight 50
  Warning  Synced  30s (x2 over 40s)      flagger  podinfo-primary.test not ready: waiting for rollout to finish: 1 old replicas are pending termination
  Normal   Synced  9s (x3 over 50s)       flagger  (combined from similar events): Promotion completed! Scaling down podinfo.test
```

在新版本金丝雀发布的过程中，你可以通过域名 app.example.com 访问应用（示例中的 `app.example.com` 可以替换成你的实际域名），这里将会出现不同版本的响应切换。

![版本 2](https://static.apiseven.com/2022/12/26/63a9a47b281b0.png)

通过查看由 Flagger 自动创建出来的 Apache APISIX 的 `ApisixRoute` 资源 `podinfo-podinfo-canary`，会发现 service `podinfo-primary` 和 service `podinfo-canary` 的权重跟随着发布过程一起变化。

```yaml
spec:
  http:
    - backends:
        - serviceName: podinfo-primary
          servicePort: 80
          # Flagger自动调整
          weight: 80
        - serviceName: podinfo-canary
          servicePort: 80
          # Flagger自动调整
          weight: 20
```

当最终发布完成后，将会看到稳定的最新版本。

![版本 3](https://static.apiseven.com/2022/12/26/63a9a479d5bbe.png)

:::note 注意

如若在金丝雀发布期间再次变更了 deployment，Flagger 将会重新进行金丝雀分析。你可以通过以下命令来观察到所有的金丝雀发布细节。

:::

```bash
watch kubectl get canaries --all-namespaces

NAMESPACE   NAME      STATUS      WEIGHT   LASTTRANSITIONTIME
test        podinfo-2   Progressing   10       2022-11-23T05:00:54Z
test        podinfo     Succeeded     0        2022-11-23T06:00:54Z
```

### 自动回滚

在金丝雀发布分析期间，你可以通过生成 HTTP `500` 错误请求，测试 Flagger 暂停金丝雀发布并回滚到旧版本。

首先需要触发另一个金丝雀发布。

```bash
kubectl -n test set image deployment/podinfo \
podinfod=stefanprodan/podinfo:6.0.2
```

然后进入到 load tester 容器中。

```bash
kubectl -n test exec -it deploy/flagger-loadtester bash
```

接着去生成 HTTP `500` 错误，并模拟服务延迟。

```bash
hey -z 1m -c 5 -q 5 -host app.example.com http://apisix-gateway.apisix/status/500

watch -n 1 curl -H \"host: app.example.com\" http://apisix-gateway.apisix/delay/1
```

当失败指标的检测次数达到金丝雀分析的阈值时，流量将被自动路由到主节点。金丝雀节点被缩小到零，该金丝雀发布过程被标记为失败。

```bash
kubectl -n apisix logs deploy/flagger -f | jq .msg

"New revision detected! Scaling up podinfo.test"
"canary deployment podinfo.test not ready: waiting for rollout to finish: 0 of 1 (readyThreshold 100%) updated replicas are available"
"Starting canary analysis for podinfo.test"
"Advance podinfo.test canary weight 10"
"Halt podinfo.test advancement success rate 0.00% < 99%"
"Halt podinfo.test advancement success rate 26.76% < 99%"
"Halt podinfo.test advancement success rate 34.19% < 99%"
"Halt podinfo.test advancement success rate 37.32% < 99%"
"Halt podinfo.test advancement success rate 39.04% < 99%"
"Halt podinfo.test advancement success rate 40.13% < 99%"
"Halt podinfo.test advancement success rate 48.28% < 99%"
"Halt podinfo.test advancement success rate 50.35% < 99%"
"Halt podinfo.test advancement success rate 56.92% < 99%"
"Halt podinfo.test advancement success rate 67.70% < 99%"
"Rolling back podinfo.test failed checks threshold reached 10"
"Canary failed! Scaling down podinfo.test"
```

### 自定义指标金丝雀分析

金丝雀分析可以通过查询 Prometheus 的指标进行扩展，具体可根据实际业务场景进行调整。主要操作是需要创建一个指标模板，并提交到集群。

```yaml
apiVersion: flagger.app/v1beta1
kind: MetricTemplate
metadata:
  name: not-found-percentage
  namespace: test
spec:
  provider:
    type: prometheus
    address: http://flagger-prometheus.apisix:9090
  query: |
    sum(
      rate(
        apisix_http_status{
          route=~"{{ namespace }}_{{ route }}-{{ target }}-canary_.+",
          code!~"4.."
        }[{{ interval }}]
      )
    )
    /
    sum(
      rate(
        apisix_http_status{
          route=~"{{ namespace }}_{{ route }}-{{ target }}-canary_.+"
        }[{{ interval }}]
      )
    ) * 100
# 修改金丝雀发布中的 analysis，添加上面创建的指标模版。
  analysis:
    metrics:
      - name: "404s percentage"
        templateRef:
          name: not-found-percentage
        thresholdRange:
          max: 5
        interval: 1m
```

上述配置内容主要是通过检查 HTTP `404` 请求的 QPS 是否高于总流量的 5% 来验证金丝雀。如果 HTTP `404` 请求超过 5% 的阈值，那么金丝雀发布就失败了。

## 总结

当然，以上过程还可以通过更多的自定义指标检查、Webhook、手动审批和 Slack 或 MS Teams 通知等进行扩展。

通过 Apache APISIX 和 Flagger 的整合，实现了非常顺滑的金丝雀发布。在业务实践的过程中，提高了发布效率，降低了发布风险。后续两个社区也会通过更紧密的合作，去实现 Blue/Green Mirroring 和 A/B Testing 等更多的发布能力特性。
