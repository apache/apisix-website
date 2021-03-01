---
title: Release Apache APISIX Ingress Controller 0.5
---

<!--truncate-->

A lot of important features are supported in this release, it makes apisix-ingress-controller more powerful and flexible.
Also, several bugs are fixed so the robustness is also enhanced.

We recommend you to use [Apache APISIX 2.5](https://github.com/apache/apisix/releases/tag/2.5) with this release. Note since CRDs are updated, when
you upgrade your old release, **manual steps are required to apply the new ApisixRoute**. Please see the instruction `7` in [FAQ](https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/FAQ.md) for more details.

## Core

* Support traffic split feature ([#308](https://github.com/apache/apisix-ingress-controller/pull/308))
* Support route match exprs ([#304](https://github.com/apache/apisix-ingress-controller/pull/304), [#306](https://github.com/apache/apisix-ingress-controller/pull/306))
* Support to configure [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) resources in version `extensions/v1beta1` ([#296](https://github.com/apache/apisix-ingress-controller/pull/296), [#315](https://github.com/apache/apisix-ingress-controller/pull/315))
* Add name fields when generating APISIX Routes and Upstreams ([#333](https://github.com/apache/apisix-ingress-controller/pull/333))
* Support to use remote addrs as route match conditions ([#347](https://github.com/apache/apisix-ingress-controller/pull/347))
* Schema for ApisixRoute CRD ([#345](https://github.com/apache/apisix-ingress-controller/pull/345))

## Fix

* Sometimes ApisixRoute update is ineffective ([#319](https://github.com/apache/apisix-ingress-controller/pull/319))
* Priority field is not passed to APISIX ([#329](https://github.com/apache/apisix-ingress-controller/pull/329))
* Route rule name in ApisixRoute can be duplicated ([#330](https://github.com/apache/apisix-ingress-controller/pull/330))
* Use `PUT` instead of `PATCH` method when updating resources ([#353](https://github.com/apache/apisix-ingress-controller/pull/353))
* Secrets controller doesn't push the newest cert and priv key to APISIX ([#337](https://github.com/apache/apisix-ingress-controller/pull/337))

## Test

* Use [Kind](https://kind.sigs.k8s.io/) to run e2e suites ([#331](https://github.com/apache/apisix-ingress-controller/pull/331))
* Add e2e test cases for plugins redirect, uri-blocker, fault-injection, request-id, limit-count, echo, cors, response-rewrite, proxy-rewrite ([#320](https://github.com/apache/apisix-ingress-controller/pull/320), [#327](https://github.com/apache/apisix-ingress-controller/pull/327), [#328](https://github.com/apache/apisix-ingress-controller/pull/328), [#334](https://github.com/apache/apisix-ingress-controller/pull/334), [#336](https://github.com/apache/apisix-ingress-controller/pull/336), [#342](https://github.com/apache/apisix-ingress-controller/pull/342), [#341](https://github.com/apache/apisix-ingress-controller/pull/341))
