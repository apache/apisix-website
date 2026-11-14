# gRPC Proxy

Source: https://apisix.apache.org/docs/apisix/grpc-proxy/

proxying gRPC traffic:
gRPC client -> APISIX -> gRPC/gRPCS server

## Parameters

* `scheme`: the `scheme` of the route's upstream must be `grpc` or `grpcs`.
* `uri`: format likes /service/method, Example：/helloworld.Greeter/SayHello

### Example

#### create proxying gRPC route

Here's an example, to proxying gRPC service by specified route:

* attention: the `scheme` of the route's upstream must be `grpc` or `grpcs`.
* attention: APISIX use TLS‑encrypted HTTP/2 to expose gRPC service, so need to [config SSL certificate](/docs/apisix/certificate/)
* attention: APISIX also support to expose gRPC service with plaintext HTTP/2, which does not rely on TLS, usually used to proxy gRPC service in intranet environment
* the grpc server example：[grpc_server_example](https://github.com/api7/grpc_server_example)

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["POST", "GET"],
    "uri": "/helloworld.Greeter/SayHello",
    "upstream": {
        "scheme": "grpc",
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:50051": 1
        }
    }
}'
```

#### testing HTTP/2 with TLS‑encrypted

Invoking the route created before：

```shell
$ grpcurl -insecure -import-path /pathtoprotos  -proto helloworld.proto  -d '{"name":"apisix"}' 127.0.0.1:9443 helloworld.Greeter.SayHello
{
  "message": "Hello apisix"
}
```

> grpcurl is a CLI tool, similar to curl, that acts as a gRPC client and lets you interact with a gRPC server. For installation, please check out the official [documentation](https://github.com/fullstorydev/grpcurl#installation).

This means that the proxying is working.

#### testing HTTP/2 with plaintext

By default, the APISIX only listens to `9443` for TLS‑encrypted HTTP/2. You can support HTTP/2 with plaintext via the `node_listen` section under `apisix` in `conf/config.yaml`:

```yaml
apisix:
    node_listen:
        - port: 9080
        - port: 9081
    enable_http2: true
```

Invoking the route created before：

```shell
$ grpcurl -plaintext -import-path /pathtoprotos  -proto helloworld.proto  -d '{"name":"apisix"}' 127.0.0.1:9081 helloworld.Greeter.SayHello
{
  "message": "Hello apisix"
}
```

This means that the proxying is working.

### gRPCS

If your gRPC service encrypts with TLS by itself (so called `gPRCS`, gPRC + TLS), you need to change the `scheme` to `grpcs`. The example above runs gRPCS service on port 50052, to proxy gRPC request, we need to use the configuration below:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "methods": ["POST", "GET"],
    "uri": "/helloworld.Greeter/SayHello",
    "upstream": {
        "scheme": "grpcs",
        "type": "roundrobin",
        "nodes": {
            "127.0.0.1:50052": 1
        }
    }
}'
```
