# node-status

> This document contains information about the Apache APISIX node-status Plugin.

Source: https://apisix.apache.org/docs/apisix/plugins/node-status/

## Description

The `node-status` Plugin can be used get the status of requests to APISIX by exposing an API endpoint.

## Attributes

None.

## API

This Plugin will add the endpoint `/apisix/status` to expose the status of APISIX.

You may need to use the [public-api](/docs/apisix/plugins/public-api/) Plugin to expose the endpoint.

## Enable Plugin

To configure the `node-status` Plugin, you have to first enable it in your configuration file (`conf/config.yaml`):

<div class="code-title">conf/config.yaml</div>

```yaml
plugins:
  - example-plugin
  - limit-req
  - jwt-auth
  - zipkin
  - node-status
  ......
```

You have to the setup the Route for the status API and expose it using the [public-api](/docs/apisix/plugins/public-api/) Plugin.

:::note
You can fetch the `admin_key` from `config.yaml` and save to an environment variable with the following command:

```bash
admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/"//g')
```

:::

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/ns -H "X-API-KEY: $admin_key" -X PUT -d '
{
    "uri": "/apisix/status",
    "plugins": {
        "public-api": {}
    }
}'
```

## Example usage

Once you have configured the Plugin, you can make a request to the `apisix/status` endpoint to get the status:

```shell
curl http://127.0.0.1:9080/apisix/status -i
```

```shell
HTTP/1.1 200 OK
Date: Tue, 03 Nov 2020 11:12:55 GMT
Content-Type: text/plain; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Server: APISIX web server

{"status":{"total":"23","waiting":"0","accepted":"22","writing":"1","handled":"22","active":"1","reading":"0"},"id":"6790a064-8f61-44ba-a6d3-5df42f2b1bb3"}
```

The parameters in the response are described below:

| Parameter | Description                                                                                                            |
|-----------|------------------------------------------------------------------------------------------------------------------------|
| status    | Status of APISIX.                                                                                                      |
| total     | Total number of client requests.                                                                                       |
| waiting   | Number of idle client connections waiting for a request.                                                               |
| accepted  | Number of accepted client connections.                                                                                 |
| writing   | Number of connections to which APISIX is writing back a response.                                                      |
| handled   | Number of handled connections. Generally, this value is the same as `accepted` unless any a resource limit is reached. |
| active    | Number of active client connections including `waiting` connections.                                                   |
| reading   | Number of connections where APISIX is reading the request header.                                                      |
| id        | UID of APISIX instance saved in `apisix/conf/apisix.uid`.                                                              |

## Delete Plugin

To remove the Plugin, you can remove it from your configuration file (`conf/config.yaml`):

<div class="code-title">conf/config.yaml</div>

```yaml
plugins:
  - example-plugin
  - limit-req
  - jwt-auth
  - zipkin
  ......
```

You can also remove the Route on `/apisix/status`:

```shell
curl http://127.0.0.1:9180/apisix/admin/routes/ns -H "X-API-KEY: $admin_key" -X DELETE
```
