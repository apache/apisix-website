---
title: Evaluate Coraza WAF with Apache APISIX
authors:
  - name: Guohao Wang
    title: Author
    url: https://github.com/sn0rt
    image_url: https://avatars.githubusercontent.com/u/2706161?v=4
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://avatars.githubusercontent.com/u/114121331?v=4"
keywords:
  - APISIX
  - Coraza
  - WAF
  - OWASP Core Rule Set
description: "Evaluate a phase-one Coraza Proxy Wasm policy with Apache APISIX, understand current request-body limitations, and test the OWASP Core Rule Set safely."
tags: [Ecosystem]
image: https://static.api7.ai/uploads/2025/03/27/vFVg9LxN_apisix-coraza.webp
---

> Apache APISIX can load the external Coraza Proxy Wasm module and evaluate request-phase rules. The current integration has important Proxy Wasm and request-body limitations, so treat it as an integration to test rather than a complete WAF capability built into APISIX.

<!--truncate-->

A web application firewall (WAF) evaluates HTTP requests and responses against configured rules. It can reject traffic that matches known attack patterns before the request reaches an upstream service. A WAF is one layer of defense: it does not replace authentication, business authorization, secure application code, dependency updates, or application-level validation.

[Coraza](https://coraza.io/) is an open-source WAF engine written in Go. [Coraza Proxy Wasm](https://github.com/corazawaf/coraza-proxy-wasm) packages the engine as a Proxy Wasm module and can include the [OWASP Core Rule Set (CRS)](https://coreruleset.org/). Apache APISIX can load the module through its [Wasm plugin runtime](/docs/apisix/wasm/) and apply the resulting plugin to selected Routes or a Global Rule.

## What the integration can and cannot do

The base integration can evaluate phase-one variables such as the request URI and headers for traffic that passes through APISIX. CRS supplies generic detection rules for attack classes such as SQL injection and cross-site scripting, but many rules depend on request-body processing and later phases. Do not infer full CRS coverage from a successful URI rule.

The integration has important boundaries:

- Coraza Proxy Wasm is not bundled with APISIX; you download and operate the module separately.
- APISIX currently implements only part of the Proxy Wasm API, so test the exact callbacks and traffic patterns your policy requires.
- An [open upstream APISIX issue](https://github.com/corazawaf/coraza-proxy-wasm/issues/309) reports that request-body rules do not receive some payloads as expected. Until the required body flows pass tests with your exact APISIX and module versions, do not rely on this integration for request-body protection.
- CRS requires tuning. Enabling a broad ruleset without observing false positives can block legitimate requests.
- The Coraza Proxy Wasm 0.6.0 release notes warn about possible memory leaks and performance degradation. Load-test the module with representative traffic before production rollout.

Start in detection or a narrowly scoped blocking mode, review audit output, and expand enforcement only after the policy behaves as expected.

## Prerequisites

This example uses:

- Apache APISIX 3.18.0
- Coraza Proxy Wasm 0.6.0
- the CRS version embedded in that Coraza release
- an APISIX Admin API key stored in the `admin_key` environment variable

Pin versions in production and review the [Coraza Proxy Wasm releases](https://github.com/corazawaf/coraza-proxy-wasm/releases) before upgrading. A newer APISIX or Coraza release may change runtime behavior, available callbacks, or the embedded CRS version.

## Install the Coraza Wasm module

The following Dockerfile adds the published Coraza module to the APISIX image and verifies the release archive before extracting it. The checksum shown here matches the official 0.6.0 archive; update the version and checksum together after verifying a newer release. This does not make Coraza a built-in APISIX plugin; the file remains an external runtime dependency.

```dockerfile
FROM apache/apisix:3.18.0-debian

ARG CORAZA_VERSION=0.6.0
ARG CORAZA_SHA256=cca4e3c75cf6b2e615907f936a1b6dcd0955250e0fb7d3b1c2ecef807d84603c

USER root

ADD https://github.com/corazawaf/coraza-proxy-wasm/releases/download/${CORAZA_VERSION}/coraza-proxy-wasm-${CORAZA_VERSION}.zip /tmp/coraza-proxy-wasm.zip

RUN echo "${CORAZA_SHA256}  /tmp/coraza-proxy-wasm.zip" | sha256sum --check --strict - \
    && apt-get update \
    && apt-get install --yes --no-install-recommends unzip \
    && mkdir -p /usr/local/apisix/proxywasm \
    && unzip /tmp/coraza-proxy-wasm.zip -d /usr/local/apisix/proxywasm \
    && rm /tmp/coraza-proxy-wasm.zip \
    && apt-get purge --yes unzip \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R apisix:apisix /usr/local/apisix/proxywasm

USER apisix
```

Build the image and confirm that `/usr/local/apisix/proxywasm/coraza-proxy-wasm.wasm` exists in the container.

## Register the module in APISIX

Add the module to `conf/config.yaml`. The plugin name in this configuration is the name used on Routes and Global Rules.

```yaml
wasm:
  plugins:
    - name: coraza-filter
      priority: 7999
      file: /usr/local/apisix/proxywasm/coraza-proxy-wasm.wasm
```

Restart APISIX after changing `config.yaml`. If APISIX cannot load the module, check the file path, ownership, and startup logs before adding the plugin to traffic.

## Apply a small test policy

Begin with a policy whose result is easy to verify. This example rejects requests to `/anything` before proxying them to httpbin.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/coraza-test" \
  --request PUT \
  --header "X-API-KEY: ${admin_key}" \
  --header "Content-Type: application/json" \
  --data '{
    "uri": "/anything",
    "plugins": {
      "coraza-filter": {
        "conf": {
          "directives_map": {
            "test": [
              "SecRuleEngine On",
              "SecRule REQUEST_URI \"@beginsWith /anything\" \"id:101,phase:1,deny,status:403\""
            ]
          },
          "default_directives": "test"
        }
      }
    },
    "upstream": {
      "type": "roundrobin",
      "nodes": {
        "httpbin.org:80": 1
      }
    }
  }'
```

Request the Route:

```shell
curl --include "http://127.0.0.1:9080/anything"
```

The response should have status `403`. This test confirms that APISIX loaded the module and that the configured directive ran. It does not validate a production WAF policy.

## Evaluate the OWASP Core Rule Set

After the small phase-one policy works, you can load the CRS embedded in the Coraza module for further evaluation:

```yaml
plugins:
  coraza-filter:
    conf:
      directives_map:
        crs:
          - SecRuleEngine On
          - Include @crs-setup-conf
          - Include @owasp_crs/*.conf
      default_directives: crs
```

Use this plugin configuration only on selected test Routes while tuning. Loading the rules does not prove that every request phase or variable is available through APISIX. In particular, validate request-body rules independently and review the current upstream APISIX issues before treating CRS as an enforcement control. A Global Rule can apply the plugin more broadly, but doing so before validating coverage and exclusions increases the blast radius of both missed detections and false positives.

## Tune the WAF before production

WAF deployment is an iterative security task, not a one-time switch. Before enabling blocking across production traffic:

1. Replay representative requests in a non-production environment.
2. Review rule IDs, matched variables, and false positives in the Coraza and APISIX logs.
3. Add the narrowest practical exclusions instead of disabling broad rule groups.
4. Verify whether request-body callbacks run for every required content type; uploads, streaming traffic, HTTP/2 requests, and large payloads need separate tests.
5. Measure latency, memory use, and error rates under expected peak traffic.
6. Define an operational rollback path for the Wasm plugin and its rules.
7. Continue patching applications and dependencies; CRS blocks selected traffic patterns but does not remove underlying vulnerabilities.

For a broader defense-in-depth model, combine the tuned WAF policy with [API gateway authentication](/learning-center/api-gateway-authentication/), rate limiting, transport security, and service-owned authorization. The [API gateway security guide](/learning-center/api-gateway-security/) explains how these controls fit together.

## Conclusion

Coraza Proxy Wasm gives APISIX operators an open-source path to evaluate phase-one traffic rules and investigate CRS at the gateway. The integration is most useful as a controlled test with pinned versions, narrow policies, and workload-specific validation. Do not treat it as complete API WAF coverage until every required request and response phase, including body processing, is verified in your deployment.
