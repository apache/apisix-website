---
title: Access the Kafka Cluster by APISIX Gateway
authors:
  - name: Meng Yan
    title: Author
    url: https://github.com/yanmxa
keywords:
  - Message Queue
  - Kafka
  - Gateway
  - Strimzi
description: A few days ago, I added Apache APISIX as a proxy to an Apache Kafka cluster to manage authentication and authorization. Now, I created a custom authorization plugin in Go for the Kafka cluster.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/12/29/oJyQz1c4_A&K_Cover.png
---

> This blog shows how to use Apache APISIX to develop a customize authorization plugin for the kafka cluster.

<!--truncate-->

## Prerequisites

- Have a running OpenShift cluster
- Run a Kafka cluster with [strimzi kafka operator](https://github.com/strimzi/strimzi-kafka-operator)
- Install [kubectl](https://kubernetes.io/docs/reference/kubectl), [OpenShift CLI](https://docs.openshift.com/container-platform/4.11/cli_reference/openshift_cli/getting-started-cli.html) and curl on host

## Expose the Kafka Cluster by KafkaBridge

To simplify the configuration setting for the kafka. I provision the kafka by [strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator). In order to make Kafka expose interfaces externally like other services, I use `KafkaBridge` to transform it into an HTTP service.

- Create the `KafkaBridge`

```bash
# namespace
KAFKA_NAMESPACE=kafka

# create kafka bridge instance
cat <<EOF | oc apply -f -
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaBridge
metadata:
  name: strimzi-kafka-bridge
  namespace: ${KAFKA_NAMESPACE}
spec:
  bootstrapServers: kafka-kafka-bootstrap.${KAFKA_NAMESPACE}.svc:9092
  http:
    port: 8080
  replicas: 1
EOF
```

- Verification

```bash
KAFKA_NAMESPACE=kafka
# forward 8080 by bridge pod
kubectl -n ${KAFKA_NAMESPACE} port-forward $(kubectl get pods -l strimzi.io/cluster=strimzi-kafka-bridge -n ${KAFKA_NAMESPACE} -o jsonpath="{.items[0].metadata.name}") 8080:8080

# or forward 8080 by svc
kubectl -n ${KAFKA_NAMESPACE} port-forward svc/$(kubectl get svc -l strimzi.io/cluster=strimzi-kafka-bridge -n ${KAFKA_NAMESPACE} -o jsonpath="{.items[0].metadata.name}") 8080:8080

# list topic
curl http://localhost:8080/topics

# consume message with the consumer
while true; do curl -X GET http://localhost:8080/consumers/strimzi-kafka-consumer-group/instances/strimzi-kafka-consumer/records \
-H 'accept: application/vnd.kafka.json.v2+json'; sleep 1; done
```

## Running APISIX on Openshift

- Install APISIX on ROSA

```bash
oc create sa apisix-sa -n apisix
oc adm policy add-scc-to-user anyuid -z apisix-sa -n apisix

helm install apisix apisix/apisix \
  --set gateway.type=NodePort \
  --set etcd.podSecurityContext.enabled=false \
  --set etcd.containerSecurityContext.enabled=false \
  --set serviceAccount.name=apisix-sa \
  --namespace apisix
```

- Configure the Kafka Route with Admin API

```bash
# forward 9180 port to local host
kubectl -n apisix port-forward $(kubectl get pods -l app.kubernetes.io/name=apisix -n apisix -o jsonpath="{.items[0].metadata.name}") 9180:9180

# the bridge service name can be accessed by
# kubectl get svc -l strimzi.io/cluster=strimzi-kafka-bridge -n $KAFKA_NAMESPACE -o jsonpath="{.items[0].metadata.name}"
curl "http://127.0.0.1:9180/apisix/admin/routes/1" \
-H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d '
{
  "methods": ["GET", "POST", "DELETE", "PUT"],
  "host": "example.com",
  "uri": "/*",
  "plugins": {
    "ext-plugin-post-resp": {
      "conf": [
        {"name":"my-response-rewrite", "value":"{\"tag\":\"\"}"}
      ]
    }
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "strimzi-kafka-bridge-bridge-service.kafka.svc:8080": 1
    }
  }
}'
```

- Request the Kafka Service with Client API

```bash
# forward the http api of apisix to local host
kubectl -n apisix port-forward $(kubectl get pods -l app.kubernetes.io/name=apisix -n apisix -o jsonpath="{.items[0].metadata.name}") 9080:9080

# list topic
curl --verbose --header "Host: example.com" http://localhost:9080/topics

# send message to the topic
curl --header "Host: example.com" --location 'http://localhost:9080/topics/event' -H 'Content-Type: application/vnd.kafka.json.v2+json' --data \
'{
   "records":[
      {
         "key":"event5",
         "value": "hello5"
      },
      {
         "key":"event6",
         "value": "world6"
      }
   ]
}'

# create a kafka consumer in a new consumer group
curl --header "Host: example.com" -X POST http://localhost:9080/consumers/strimzi-kafka-consumer-group \
  -H 'content-type: application/vnd.kafka.v2+json' \
  -d '{
    "name": "strimzi-kafka-consumer",
    "auto.offset.reset": "earliest",
    "format": "json",
    "enable.auto.commit": true,
    "fetch.min.bytes": 512,
    "consumer.request.timeout.ms": 30000
  }'

# subscribe to the topic
curl --header "Host: example.com" -X POST http://localhost:9080/consumers/strimzi-kafka-consumer-group/instances/strimzi-kafka-consumer/subscription \
  -H 'content-type: application/vnd.kafka.v2+json' \
  -d '{
    "topics": [
        "event"
    ]
}'

# consume message with the consumer
while true; do curl --header "Host: example.com" -X GET http://localhost:9080/consumers/strimzi-kafka-consumer-group/instances/strimzi-kafka-consumer/records \
-H 'accept: application/vnd.kafka.json.v2+json'; sleep 1; done
```

## Develop an Authentication Plugin with Golang

- Develop a validation plugin for the certificates

  I develop the plugin leverage the [Go plugin runner](https://github.com/apache/apisix-go-plugin-runner). The plugin is just read the certificate from the header and then validate it. You can visit [this](https://github.com/yanmxa/apisix-go-plugin-runner/commit/84adcb2447287d48419c312f8aba8039c4b1f32d) for more detail.

- Build the APISIX Image with the above Plugin

```bash
git clone git@github.com:apache/apisix-go-plugin-runner.git
# develop the plugin
...
# build binary
make build
# create Dockerfile to add the build binary
`Dockerfile
FROM apache/apisix:3.6.0-debian
COPY ./go-runner /usr/local/apisix/apisix-go-plugin-runner/go-runner
`
# build and push image
docker build -f ./Dockerfile -t quay.io/myan/apisix-360-go:0.1 .
docker push quay.io/myan/apisix-360-go:0.1
```

- Startup the Plugin When Running the Server

  Modify the `config.yaml` by `apisix` ConfigMap.

```bash
  etcd:
    host:                # it's possible to define multiple etcd hosts addresses of the same etcd cluster.
      - "http://apisix-etcd.apisix.svc.cluster.local:2379"
    prefix: "/apisix"    # configuration prefix in etcd
    timeout: 30          # 30 seconds
...
# Nginx will hide all environment variables by default. So you need to declare your variable first in the conf/config.yaml
# https://github.com/apache/apisix/blob/master/docs/en/latest/external-plugin.md
nginx_config:
  envs:
    - APISIX_LISTEN_ADDRESS
    - APISIX_CONF_EXPIRE_TIME

ext-plugin:
  # path_for_test: "/tmp/runner.sock"
  cmd: ["/usr/local/apisix/apisix-go-plugin-runner/go-runner", "run", "-m", "prod"]
```

- Replace the APISIX Deployment Image

```bash
# image: quay.io/myan/apisix-360-go:0.1
kubectl set image deployment/apisix apisix=quay.io/myan/apisix-360-go:0.1
```

- Verification

```bash
# set the certificate
CERT_CONTENT_BASE64=$(base64 < rest/client.crt)

# list the topics
curl -i 'http://127.0.0.1:9080/topics' \
-H 'Host: example.com' \
-H 'Content-Type: application/vnd.kafka.json.v2+json' \
-H 'Source: client' \
-H "Client-Certificate: $CERT_CONTENT_BASE64"

# create consumer
curl -X POST 'http://localhost:9080/consumers/strimzi-kafka-consumer-group' \
  -H 'Host: example.com' \
  -H 'Content-Type: application/vnd.kafka.json.v2+json' \
  -H 'Source: client' \
  -H "Client-Certificate: $CERT_CONTENT_BASE64" \
  -d '{
   "name": "strimzi-kafka-consumer",
   "auto.offset.reset": "earliest",
   "format": "json",
   "enable.auto.commit": true,
   "fetch.min.bytes": 512,
   "consumer.request.timeout.ms": 30000
}'

# subscribe topic event with the consumer group 'strimzi-kafka-consumer'
curl -X POST 'http://localhost:9080/consumers/strimzi-kafka-consumer-group/instances/strimzi-kafka-consumer/subscription' \
  -H 'Host: example.com' \
  -H 'Content-Type: application/vnd.kafka.json.v2+json' \
  -H 'Source: client' \
  -H "Client-Certificate: $CERT_CONTENT_BASE64" \
  -d '{
   "topics": ["event"]
}'

# consume message
curl -X GET 'http://localhost:9080/consumers/strimzi-kafka-consumer-group/instances/strimzi-kafka-consumer/records' \
  -H 'Host: example.com' \
  -H 'Accept: application/vnd.kafka.json.v2+json' \
  -H 'Source: client' \
  -H "Client-Certificate: $CERT_CONTENT_BASE64" \
```

## References

- [How to use go-plugin-runner with APISIX Ingress](https://apisix.apache.org/zh/docs/ingress-controller/tutorials/how-to-use-go-plugin-runner-in-apisix-ingress/)
- [How to use Go to develop Apache APISIX plugin](https://apisix.apache.org/blog/2021/08/19/go-makes-apache-apisix-better/)
- [APISIX之Go插件开发](https://zhuanlan.zhihu.com/p/613540331)
- [结合 casbin 为 APISIX 开发一个接口权限校验插件](https://www.fdevops.com/2022/10/09/casbin-apisix-31182)
- [Docker部署 apisix 并使用golang插件(自定义鉴权方式)](https://blog.csdn.net/weixin_42873928/article/details/123279381)
