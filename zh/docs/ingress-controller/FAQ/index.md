# FAQ

> This document provides answers to frequently asked questions (FAQ) when using APISIX Ingress Controller.

Source: https://apisix.apache.org/zh/docs/ingress-controller/FAQ/

This document provides answers to frequently asked questions (FAQ) when using APISIX Ingress Controller.

### How does Ingress Controller handle route priority across multiple resources?

In APISIX, a higher value indicates a higher route priority.

* **Ingress:** Does not support explicit route priority. Routes created using Ingress are assigned a default priority of 0, typically the lowest.
* **HTTPRoute:** Has a [38-bit priority](https://github.com/apache/apisix-ingress-controller/blob/master/internal/adc/translator/httproute.go#L428-L448). The priority calculation is dynamic and may change, making exact values difficult to predict.
* **APISIXRoute:** Can be assigned an explicit priority. To have a higher priority than an HTTPRoute, the value must exceed 549,755,813,887 (2^39 − 1).

### How do HTTPRoute filters interact with PluginConfig CRDs?

APISIX maps built-in Gateway API HTTPRoute filters to specific plugins:

* `RequestHeaderModifier` → `proxy-rewrite`
* `RequestRedirect` → `redirect`
* `RequestMirror` → `proxy-mirror`
* `URLRewrite` → `proxy-rewrite`
* `ResponseHeaderModifier` → `response-rewrite`
* `CORS` → `cors`
* `ExtensionRef` → user-defined plugin reference

When both filters and a PluginConfig CRD are applied:

* If filters are applied first, PluginConfig overrides any overlapping plugin settings.
* If PluginConfig is applied first, filters merge with PluginConfig settings, and overlapping fields from filters take precedence.
