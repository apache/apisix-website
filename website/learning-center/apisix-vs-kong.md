---
title: "Apache APISIX vs Kong: Architecture, Features, and Tradeoffs"
description: "Compare Apache APISIX and Kong across deployment topology, configuration, plugins, Kubernetes integration, performance testing, and migration tradeoffs."
slug: apisix-vs-kong
date: 2026-04-14
tags: [comparison, apisix, kong, api-gateway]
hide_table_of_contents: false
faq:
  - q: "Does Apache APISIX always require etcd?"
    a: >-
      No. APISIX uses etcd in its traditional and decoupled deployment modes, but its standalone modes use a complete local configuration file or full-state API updates instead. Teams should compare the automation, recovery, and state-management tradeoffs of the specific mode they plan to operate.
  - q: "Can Kong configuration be imported directly into Apache APISIX?"
    a: >-
      There is no universal direct conversion because the gateways use different entity schemas, route matching rules, plugin phases, credentials, and state models. A migration should map and test each service, route, consumer, plugin, certificate, and operational behavior before traffic is shifted.
  - q: "Which gateway is a better fit for Kubernetes?"
    a: >-
      Both projects provide Kubernetes ingress controllers, so the decision depends on the exact Ingress, Gateway API, and custom resources your platform requires. Test the relevant support matrix, status reporting, secret handling, upgrade behavior, and configuration convergence for the controller version you intend to deploy.
---

Apache APISIX and Kong are open-source API gateways with mature routing, traffic management, authentication, observability, and Kubernetes integrations. Their most important differences are not a single feature count or benchmark result, but how they store and distribute configuration, which deployment models they support, and how their plugin ecosystems are packaged.

Apache APISIX combines an Apache-governed project and [100+ open-source plugins](/plugins/) with etcd-backed and standalone deployment modes. Kong offers database-backed, DB-less, and hybrid control-plane/data-plane topologies, plus an ecosystem that includes open-source, Enterprise-only, and separately licensed plugins. The right choice depends on the topology, policies, extensions, and operating model your team needs.

For a broader shortlist, see the [open-source API gateway comparison](/learning-center/open-source-api-gateway-comparison/).

## APISIX vs Kong at a Glance

| Dimension | Apache APISIX | Kong Gateway |
|---|---|---|
| Project and product model | Apache Software Foundation open-source project | Open-source gateway with vendor-backed commercial products and services |
| Deployment topology | Traditional, decoupled control/data plane, and standalone modes | Traditional database-backed, DB-less, and hybrid control/data plane modes |
| Configuration state | etcd in traditional and decoupled modes; local YAML/JSON or full-state API updates in standalone mode | Database in traditional mode; declarative configuration held by each node in DB-less mode; control plane distributes configuration to data planes in hybrid mode |
| Runtime configuration | Admin API with etcd-backed updates; standalone behavior depends on file-driven or API-driven mode | Admin API in database-backed deployments; full declarative reloads in DB-less mode; control-plane updates in hybrid mode |
| Plugin ecosystem | 100+ open-source plugins, native Lua plugins, external plugin runners, and experimental Wasm support | Plugin Hub with open-source, Enterprise-only, and license-required plugins; custom plugins through supported PDKs |
| Kubernetes | APISIX Ingress Controller supports Kubernetes Ingress, supported Gateway API resources, and APISIX custom resources | Kong Ingress Controller translates Ingress, Gateway API, and Kong custom resources into Kong Gateway configuration |
| Performance evaluation | Official APISIX benchmarks are available, but must be interpreted using their documented environment and workload | Official Kong benchmarks are available, with results that depend on version, topology, plugins, and test environment |

Feature availability changes across versions and Kong editions. Verify any requirement against the current documentation for the exact version and distribution you plan to deploy.

## Architecture and Configuration

### Apache APISIX

Apache APISIX is built on NGINX and LuaJIT. In its traditional mode, a node handles both control-plane and data-plane responsibilities, while decoupled mode separates those roles. Both modes can use etcd as the configuration provider. APISIX nodes watch configuration changes in etcd and update in-memory routing and plugin state without replacing worker processes.

APISIX also provides [standalone deployment modes](/docs/apisix/deployment-modes/) that do not use etcd as the configuration center. File-driven standalone mode loads a complete YAML or JSON configuration, while API-driven standalone mode accepts full-state updates through its dedicated configuration API. These modes have different automation and state-management tradeoffs from the default etcd-backed model.

APISIX supports an [embedded Dashboard UI](/docs/apisix/dashboard/) for managing routes, plugins, and upstreams through the Admin API. Its availability depends on whether the selected APISIX package or build includes the compiled UI assets. When enabled, production deployments still need to restrict access to the Admin API and protect its credentials.

### Kong

Kong documents three main [deployment topologies](https://developer.konghq.com/gateway/deployment-topologies/):

- **Traditional mode:** Gateway nodes connect to a database that stores configured entities. Each node performs both control-plane and data-plane responsibilities.
- **DB-less mode:** Each node holds declarative configuration in memory. Operators load a complete YAML or JSON configuration at startup or through the `/config` endpoint. Entity management through the Admin API is read-only in this mode, and plugins that require database-backed state have limitations.
- **Hybrid mode:** Control-plane nodes manage configuration and distribute it to data-plane nodes. Data planes do not connect directly to the control-plane database and cache the latest configuration they receive.

These topologies have materially different failure modes and workflows. A comparison that treats all Kong deployments as database polling, or all Kong deployments as DB-less, misses the choices Kong operators actually make.

## Operational Tradeoffs

### Configuration dependencies

APISIX deployments that use etcd need a properly sized and monitored etcd cluster, including backup and recovery procedures. Kubernetes uses etcd internally, but that does not remove the need to design and operate the configuration store used by APISIX. Standalone modes avoid this dependency, but shift configuration ownership toward complete declarative state or full-state API updates.

Kong's traditional mode requires operating its database and handling the supported upgrade and migration workflow. DB-less mode removes that database dependency from gateway nodes, but configuration is replaced as a complete declarative document and database-dependent plugin behavior is limited. Hybrid mode separates control and data planes, while adding control-plane connectivity, certificate, version-compatibility, and plugin-distribution considerations.

There is no universal lowest-cost topology. Compare the infrastructure, recovery objectives, team expertise, configuration workflow, and required plugin state for the specific mode you intend to run.

### Configuration propagation

APISIX's etcd-backed modes use watch-based updates, while standalone modes use file detection or full-state API updates. Kong's propagation behavior depends on whether the deployment is traditional, DB-less, or hybrid. In either product, measure configuration convergence under failure, rollout, and recovery conditions instead of relying on an unqualified "instant" claim.

## Plugins and Extensibility

Apache APISIX lists [100+ open-source plugins](/plugins/) across traffic management, authentication, security, observability, transformation, serverless integration, AI traffic, and other protocols. Native plugins use Lua. APISIX also supports custom plugins through Java, Python, and Go plugin runners, with experimental Wasm support. Runner-based plugins introduce a separate process and communication boundary that teams should include in performance and failure testing.

Kong's [Plugin Hub](https://developer.konghq.com/plugins/) includes open-source plugins as well as plugins marked Enterprise-only or license-required. Because the catalog and packaging change, evaluate the exact plugins required by your deployment rather than comparing a frozen total. Kong documents custom plugin development through Lua, Go, Python, and JavaScript PDKs; installation and availability can differ by deployment topology.

For both gateways, build a requirement-level plugin matrix that records:

- whether the feature is available in the intended version and distribution;
- whether it requires external storage or another service;
- whether it works in the selected control-plane/data-plane topology;
- how configuration, upgrades, and rollback are handled;
- what latency and failure behavior it adds to your actual request path.

## Protocol Support

APISIX supports HTTP and HTTPS routing, stream proxying for TCP and UDP, WebSocket, and gRPC proxying. Specific plugins add capabilities such as gRPC-Web handling and HTTP-to-gRPC transcoding. Other protocol plugins have narrower scopes; for example, `mqtt-proxy` performs MQTT load balancing in stream mode rather than general MQTT-to-HTTP transformation.

Kong documents native routing for HTTP/HTTPS, TCP/TLS, and gRPC/GRPCS. [WebSocket traffic](https://developer.konghq.com/gateway/traffic-control/proxying/) can use regular HTTP(S) Services and Routes, or dedicated WS(S) Services and Routes when message-level WebSocket plugin processing is required. Additional behavior depends on installed plugins and the selected distribution.

Protocol names alone do not prove that one gateway can replace an application adapter. Verify the exact direction of translation, supported message format, streaming behavior, authentication path, and plugin compatibility required by the workload.

## Kubernetes Integration

The [APISIX Ingress Controller](/docs/ingress-controller/overview/) translates supported Kubernetes Ingress, Gateway API, and APISIX custom resources into APISIX configuration. Gateway API support varies by resource and field, so use the [current support matrix](/docs/ingress-controller/concepts/gateway-api/) when planning a deployment.

The [Kong Ingress Controller](https://developer.konghq.com/kubernetes-ingress-controller/) translates resources such as `Ingress` and `HTTPRoute`, along with Kong custom resources, into Kong Gateway configuration. Its supported resources and behavior vary by controller version and deployment model.

For a Kubernetes evaluation, compare more than whether each project has a controller. Test the Gateway API resources and policies you need, failure handling for invalid configuration, status conditions, upgrade compatibility, secret handling, and how quickly the controller and data plane converge after a change.

## How to Compare Performance

Neither project's published benchmark establishes a universal winner. The [APISIX benchmark](/docs/apisix/benchmark/) and [Kong benchmark](https://developer.konghq.com/gateway/performance/benchmarks/) use their own infrastructure, versions, tuning, routes, plugins, and traffic generators. Results from different test environments are not a valid head-to-head comparison.

Run both gateways in the topology you would operate and keep these variables equivalent:

1. CPU, memory, network placement, TLS settings, and worker configuration.
2. Number and complexity of routes, upstreams, and consumers.
3. Authentication, rate limiting, logging, tracing, and transformation plugins.
4. Request and response sizes, keepalive behavior, connection concurrency, and protocol.
5. Configuration storage and control-plane topology.
6. Test duration, warm-up period, error rate, throughput, and latency percentiles.

Report P50, P95, and P99 latency together with throughput and errors. A gateway that performs well with no plugins may behave differently with the policy chain required in production.

## Migration Considerations

A migration from Kong to APISIX is a configuration and behavior migration, not a direct file conversion. Similar concepts often exist on both sides, but their schemas, matching rules, plugin phases, credentials, and state models differ.

Use a staged process:

1. Inventory Kong Services, Routes, Consumers, credentials, plugins, certificates, and deployment topology.
2. Map each item to APISIX Routes, Services, Upstreams, Consumers, credentials, SSL resources, and plugins.
3. Identify plugins without equivalent behavior and design replacements before moving traffic.
4. Reproduce routing precedence, path handling, retries, timeouts, health checks, and observability in a test environment.
5. Run both gateways in parallel and shift selected traffic gradually using an upstream load balancer, DNS, or another controlled entry point.
6. Compare responses, logs, metrics, traces, and failure behavior, and keep a tested rollback path.

Parallel operation and gradual traffic shifting can reduce migration risk, but they do not guarantee zero downtime. The outcome depends on the surrounding architecture, stateful plugins, change controls, and rollback design.

## When APISIX May Be a Better Fit

Consider Apache APISIX when:

- you want an Apache-governed open-source gateway with a large open-source plugin catalog;
- etcd-backed dynamic configuration fits your operating model, or APISIX's standalone modes match your declarative workflow;
- you need a specific APISIX plugin, external plugin runner, or documented protocol capability;
- the APISIX Ingress Controller supports the Kubernetes and Gateway API resources your platform uses.

## When Kong May Be a Better Fit

Consider Kong when:

- your organization already operates Kong configuration, plugins, and deployment tooling;
- a specific Kong plugin or integration is available in the distribution you plan to use;
- Kong's traditional, DB-less, or hybrid topology matches your configuration and control-plane requirements;
- you want Kong's commercial support or managed-service options and have evaluated their licensing and operational model.

## Make the Decision with Your Own Requirements

Start with the deployment topology and policy chain you will actually operate. Build a short proof of concept for both gateways, test configuration recovery as well as request traffic, and verify every required plugin against the intended version and distribution. The better choice is the one that meets those requirements with acceptable operational complexity, not the one with the longest feature table.

You can review the [full set of API gateway comparisons](/comparisons/) or [learn how an API gateway works](/learning-center/what-is-an-api-gateway/) before building a test plan.
