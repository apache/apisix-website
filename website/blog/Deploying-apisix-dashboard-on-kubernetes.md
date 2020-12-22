# Deploying apisix dashboard on kubernetes

Because there is no official image right now, so I used iiqi‘s image [https://github.com/iiQi/apisix-dashboard-docker](https://github.com/iiQi/apisix-dashboard-docker).

You can find `iiqi/apisix-dashboard` and `iiqi/apisix-manager` in dockerhub.

I use `deployment.yaml` and `service.yaml` to deploy these images on kubernetes.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: apisix-manager
  namespace: {your-namespace}
  labels:
    app: apisix-manager
spec:
  ports:
  - port: 8080
    name: http
    targetPort: 8080
  selector:
    app: apisix-manager
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apisix-manager
  namespace: {your-namespace}
  labels:
    app: apisix-manager
spec:
  replicas: 1
  selector:
    matchLabels:
      app: apisix-manager
  strategy:
    rollingUpdate:
      # 最大浪涌，每次启动的最大节点数量
      maxSurge: 1
      # 最大不可用，每次删除的最大节点数量
      maxUnavailable: 0
    # 使用滚动更新，保证新replicaSet启动一个pod，并在readiness探针监测可用后关闭一个旧replicaSet中的pod
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: apisix-manager
    spec:
      nodeSelector:
        lifecycle: Spot   # 只部署在Spot实例上
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        # 填写自身的应用标签取值，以尽量不在同一个节点上部署同一服务的pod
                        - apisix-manager
                # 只针对节点生效，不扩散到zone/region
                topologyKey: kubernetes.io/hostname
      containers:
      - name: apisix-manager
        image: iiqi/apisix-manager:2.0.0-RC3-1         #put your image
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
        resources:
          requests:
            cpu: 100m
            memory: 1G
          # 通过CGroup限制容器可用的资源
          limits:
            cpu: 1000m
            memory: 1G
```

It's an example about `manager-api`, `dashboard` is similar to this.

First I set two new configmap for images.

You should find Configuration file's path in Dockerfile, eg:

```Dockerfile
WORKDIR /go/src/github.com/apisix/manager-api
COPY ./src/api .
RUN mkdir -p /go/manager-api/conf \
    mkdir -p /go/manager-api/build-tools \
    && go env -w GOPROXY=https://goproxy.io,direct \
    && export GOPROXY=https://goproxy.io \
    && go build -o /go/manager-api/manager-api \
    && mv /go/src/github.com/apisix/manager-api/conf/*.json /go/manager-api/conf/ \
    && mv /go/src/github.com/apisix/manager-api/build-tools/* /go/manager-api/build-tools/
```

you can find `/go/manager-api/conf/` is the path.

/etc/nginx/conf.d/backend.conf 

```
upstream backend {
  server 127.0.0.1:8080;    # put your manager-api service's cluster IP
}
```

/go/manager-api/conf/conf.json

```json
{
  "etcd": {
    "endpoints": "127.0.0.1:2379",   # put your etcd service's cluster IP
    ...
  },
  "user": [
    {
      "username": "admin",
      "password": "admin"
    },
    {
      "username": "user",
      "password": "user"
    }
  ]
}
```

Then change your apisix's configmap.

/usr/local/apisix/conf/config-default.yaml

```yaml
enable_admin: true     # change to false
```

Finally, use your kubernetes ingress or apisix create a route.

example:

```sh
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
  "uri": "/*",
  "host": "apisix-dashboard.alpha.tplinknbu.com",
  "upstream": {"nodes": {"apisix-dashboard.api-gateway.svc.cluster.local:8080": 1}, "type": "roundrobin"}
}'
```

Go to [apisix-dashboard.alpha.tplinknbu.com](apisix-dashboard.alpha.tplinknbu.com) and login.
