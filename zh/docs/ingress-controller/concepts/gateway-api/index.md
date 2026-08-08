# Gateway API

Source: https://apisix.apache.org/zh/docs/ingress-controller/concepts/gateway-api/

Gateway API is dedicated to achieving expressive and scalable Kubernetes service networking through various custom resources.

By supporting Gateway API, the APISIX Ingress controller can realize richer functions, including Gateway management, multi-cluster support, and other features. It is also possible to manage running instances of the APISIX gateway through Gateway API resource management.

## Concepts

- **GatewayClass**: Defines a class of Gateways with a shared configuration and behavior. Each GatewayClass is managed by a single controller, although a controller may support multiple GatewayClasses.
- **Gateway**: Represents a request for network traffic handling within the cluster. A Gateway specifies how traffic enters the cluster and is directed to backend Services, typically by binding to one or more listeners.
- **HTTPRoute**: Configures routing for HTTP traffic.
- **GRPCRoute**: Configures routing for gRPC traffic.
- **ReferenceGrant**: Grants permission to reference resources across namespaces.
- **TLSRoute**: Defines routing rules for terminating or passing through TLS traffic.
- **TCPRoute**: Configures routing for TCP traffic.
- **UDPRoute**: Configures routing for UDP traffic.
- **BackendTLSPolicy**: Specifies how a Gateway should validate TLS connections to its backends, including trusted certificate authorities and verification modes.

## Gateway API Support Level

| Resource         | Core Support Level  | Extended Support Level | Implementation-Specific Support Level | API Version |
| ---------------- | ------------------- | ---------------------- | ------------------------------------- | ----------- |
| GatewayClass     | Supported           | N/A                    | Not supported                         | v1          |
| Gateway          | Partially supported | Partially supported    | Not supported                         | v1          |
| HTTPRoute        | Supported           | Partially supported    | Not supported                         | v1          |
| GRPCRoute        | Supported           | Supported              | Not supported                         | v1          |
| ReferenceGrant   | Supported           | Not supported          | Not supported                         | v1beta1     |
| TLSRoute         | Supported           | Supported              | Not supported                         | v1alpha2    |
| TCPRoute         | Supported           | Supported              | Not supported                         | v1alpha2    |
| UDPRoute         | Supported           | Supported              | Not supported                         | v1alpha2    |
| BackendTLSPolicy | Not supported       | Not supported          | Not supported                         | v1alpha3    |

## Examples

For configuration examples, see the Gateway API tabs in [Configuration Examples](/docs/ingress-controller/reference/example/).

For a complete list of configuration options, refer to the [Gateway API Reference](https://gateway-api.sigs.k8s.io/reference/1.3/spec/). Be aware that some fields are not supported, or partially supported.

## Unsupported / Partially Supported Fields

The fields below are specified in the Gateway API specification but are either partially implemented or not yet supported in the APISIX Ingress Controller.

### HTTPRoute

| Fields                         | Status                 | Notes                                                                                   |
|--------------------------------|------------------------|-----------------------------------------------------------------------------------------|
| `spec.timeouts`                | Not supported          | The field is unsupported because ADC provides finer-grained timeout configuration (connect, read, write), whereas `spec.timeouts` only allows a general total timeout and upstream timeout, so it cannot be directly mapped. To configure route timeouts, you can use [BackendTrafficPolicy](/docs/ingress-controller/reference/api-reference/#backendtrafficpolicyspec).  |
| `spec.retries`                 | Not supported          | The field is unsupported because APISIX does not support the features in retries. To configure route retries, you can use [BackendTrafficPolicy](/docs/ingress-controller/reference/api-reference/#backendtrafficpolicyspec).  |
| `spec.sessionPersistence`      | Not supported          | APISIX does not support the configuration of cookie lifetimes. As an alternative, you can use [`chash` load balancer](/docs/ingress-controller/reference/api-reference/#loadbalancer). |
| `spec.rules[].backendRefs[].filters[]` | Not supported | BackendRef-level filters are not implemented as data plane does not support filtering at this level; only rule-level filters (`spec.rules[].filters[]`) are supported. |

### Gateway

| Fields                                               | Status               | Notes                                                                                          |
|------------------------------------------------------|----------------------|------------------------------------------------------------------------------------------------|
| `spec.listeners[].port`               | Partially supported | Controls `server_port` route-var injection; behaviour is configured via [`listener_port_match_mode`](/docs/ingress-controller/reference/configuration-file/) (`auto` / `explicit` / `off`). The controller cannot dynamically open data plane ports, so APISIX must already listen on the specified port. |
| `spec.listeners[].tls.certificateRefs[].group` | Partially supported | Only `""` is supported; other group values cause validation failure. |
| `spec.listeners[].tls.certificateRefs[].kind`        | Partially supported  | Only `Secret` is supported.                                                                    |
| `spec.listeners[].tls.mode`                          | Partially supported  | `Terminate` is implemented; `Passthrough` is effectively unsupported for Gateway listeners.    |
| `spec.addresses`                                     | Not supported        | Controller does not read or act on `spec.addresses`.                                           |
