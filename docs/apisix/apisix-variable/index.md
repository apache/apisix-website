# APISIX variable

> This article describes the variables supported by Apache APISIX.

Source: https://apisix.apache.org/docs/apisix/apisix-variable/

## Description

Besides [NGINX variable](http://nginx.org/en/docs/varindex.html), APISIX also provides
additional variables.

## List of variables

|   Variable Name     |  Origin    | Description                                                                         | Example        |
|-------------------- | ---------- | ----------------------------------------------------------------------------------- | -------------  |
| balancer_ip         | core       | The IP of picked upstream server.                                                   | 192.168.1.2    |
| balancer_port       | core       | The port of picked upstream server.                                                 | 80             |
| consumer_name       | core       | Username of Consumer.                                                               |                |
| consumer_group_id   | core       | Group ID of Consumer.                                                               |                |
| graphql_name        | core       | The [operation name](https://graphql.org/learn/queries/#operation-name) of GraphQL. | HeroComparison |
| graphql_operation   | core       | The operation type of GraphQL.                                                      | mutation       |
| graphql_root_fields | core       | The top level fields of GraphQL.                                                    | ["hero"]       |
| mqtt_client_id      | mqtt-proxy | The client id in MQTT protocol.                                                     |                |
| route_id            | core       | Id of Route.                                                                        |                |
| route_name          | core       | Name of Route.                                                                      |                |
| service_id          | core       | Id of Service.                                                                      |                |
| service_name        | core       | Name of Service.                                                                    |                |
| redis_cmd_line      | Redis      | The content of Redis command.                                                       |                |
| resp_body           | core       | In the logger plugin, if some of the plugins support logging of response body, for example by configuring `include_resp_body: true`, then this variable can be used in the log format. |                |
| rpc_time            | xRPC       | Time spent at the rpc request level.                                                |                |

You can also register your own [variable](/docs/apisix/plugin-develop/#register-custom-variable).
