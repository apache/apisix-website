# Status API

Source: https://apisix.apache.org/docs/apisix/status-api/

In Apache APISIX, the status API is used to:

* Check if APISIX has successfully started and running correctly.
* Check if all of the workers have received and loaded the configuration.

To change the default endpoint (`127.0.0.1:7085`) of the Status API server, change the `ip` and `port` in the `status` section in your configuration file (`conf/config.yaml`):

```yaml
apisix:
  status:
    ip: "127.0.0.1"
    port: 7085
```

This API can be used to perform readiness probes on APISIX before APISIX starts receiving user requests.

### GET /status

Returns a JSON reporting the status of APISIX workers. If APISIX is not running, the request will error out while establishing TCP connection. Otherwise this endpoint will always return ok if request reaches a running worker.

```json
{
  "status": "ok"
}
```

### GET /status/ready

Returns `ok` when all workers have loaded the configuration, otherwise returns the specific error with `503` error code. Below are specific examples.

When all workers have loaded the configuration:

```json
{
  "status": "ok"
}
```

When 1 workers has't been initialised:

```json
{
  "status": "error",
  "error": "worker count: 16 but status report count: 15"
}
```

When a particular worker hasn't loaded the configuration:

```json
{
  "error": "worker id: 9 has not received configuration",
  "status": "error"
}
```
