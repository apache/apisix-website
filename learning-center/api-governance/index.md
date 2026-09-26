# API Governance: Framework and Best Practices

> Learn how API governance aligns ownership, design standards, security, lifecycle controls, runtime enforcement, and evidence across API teams.

Source: https://apisix.apache.org/learning-center/api-governance/

API governance is the system of decision rights, standards, processes, and controls that helps an organization operate APIs consistently throughout their lifecycle. It defines who owns an API, which rules apply, how exceptions are approved, where controls are enforced, and what evidence shows that the rules are working.

Governance is broader than installing an API gateway or publishing a style guide. Effective governance connects design-time checks, delivery workflows, runtime policy enforcement, and lifecycle decisions. It should reduce avoidable risk and inconsistency without turning every API change into a centralized manual review.

## API Governance vs API Management and API Gateways

These concepts overlap, but they are not interchangeable.

| Concept | Primary purpose | Typical responsibilities |
|---|---|---|
| API governance | Define decision rights, standards, controls, exceptions, and accountability | Ownership, design rules, security baselines, versioning, review, evidence, and retirement |
| API management | Operate APIs across their lifecycle | Design, publication, discovery, onboarding, analytics, governance, and runtime control, depending on the platform |
| API gateway | Enforce policies on live traffic | Routing, authentication, rate limiting, transformation, traffic control, metrics, and logging |

Governance describes what should happen and who is accountable. API management supplies processes and tooling for running the program. The gateway implements selected runtime controls. For a fuller explanation of the product categories, see [API gateway vs API management](/learning-center/api-gateway-vs-api-management/).

## Why API Governance Matters

As an API estate grows, local decisions accumulate. Teams may use different authentication methods, error formats, versioning rules, and deprecation practices. Ownership becomes unclear, duplicate APIs appear, and consumers discover breaking changes only after deployment.

Governance addresses these problems by establishing a small set of shared expectations:

- Every API has an accountable owner and intended audience.
- Contracts follow agreed naming, compatibility, and documentation standards.
- Security controls reflect data sensitivity and exposure.
- Runtime policies are applied consistently to the APIs that require them.
- Changes, exceptions, and deprecations are traceable.
- Teams collect evidence that controls operate as intended.

The purpose is not uniformity for its own sake. Standards should target risks and coordination costs that individual teams cannot solve independently.

## Design-Time and Runtime Governance

### Design-Time Governance

Design-time governance applies before an API reaches production. It can include:

- Reviewing an API's purpose, owner, consumers, and data classification
- Describing the interface with an [OpenAPI specification](https://spec.openapis.org/oas/latest.html) or another appropriate contract format
- Linting names, error models, pagination, versioning, and compatibility rules
- Running schema, security, and dependency checks in CI
- Requiring an explicit exception when a standard cannot be met
- Publishing the approved contract and ownership metadata to a catalog

These controls catch problems while they are less expensive to change. They also create inputs for documentation, testing, client generation, and deployment automation.

### Runtime Governance

Runtime governance applies while consumers use an API. Common controls include:

- Authenticating callers and validating credentials
- Enforcing shared access, network, and TLS policies
- Applying consumer, route, or global rate limits
- Restricting methods, paths, origins, or source addresses
- Routing traffic between approved versions or deployments
- Capturing request metrics and access logs
- Detecting policy violations and operational anomalies

A gateway is useful here because it can enforce common controls without duplicating them in every backend. It cannot, however, correct an ambiguous contract, assign an API owner, or decide whether a breaking change should be approved.

### Lifecycle Governance

Lifecycle governance connects design and runtime. It defines when an API moves from proposed to active, deprecated, and retired; how consumers are notified; which compatibility guarantees apply; and how teams verify that old versions are no longer in use.

## An API Governance Framework

A practical framework covers the following areas.

### 1. Ownership and Inventory

Record an accountable owner, technical contact, intended consumers, lifecycle state, and critical dependencies for each API. An inventory should answer which APIs exist and who can make decisions about them. A repository file, service catalog, or API catalog can hold this information, but it needs a maintained source of truth.

### 2. Design and Contract Standards

Define the minimum rules that improve interoperability: resource naming, status codes, error formats, pagination, idempotency, compatibility, and contract documentation. Automate objective rules with linters and tests. Reserve human review for architecture, domain modeling, risk, and exceptions that tools cannot evaluate reliably.

### 3. Security and Data Policy

Classify APIs by exposure and data sensitivity, then map each class to required controls. A public read-only API and an internal payment API should not inherit an identical checklist. Policies may cover authentication, authorization boundaries, encryption, input validation, rate limiting, secrets, logging, and retention.

Gateway authentication is only one layer. Backend services must still enforce resource ownership and business authorization, while development and security practices address vulnerabilities that cannot be detected at the gateway.

### 4. Change and Version Management

Define what counts as a breaking change, how compatibility is tested, when a new version is required, and how long old versions are supported. Track consumers of a version before deprecation. A versioning standard without usage evidence can leave teams unable to retire anything safely.

### 5. Publication and Consumer Experience

An approved API should have accurate documentation, a clear support channel, and a predictable onboarding process. Public and partner APIs may also need searchable discovery, application registration, credentials, service-level expectations, and change notifications. These are usually handled outside the gateway.

### 6. Runtime Policy Enforcement

Translate approved policies into deployable configuration. Reusable policy bundles reduce drift, while environment-specific configuration handles legitimate differences. Treat gateway configuration as code where possible, review it, test it, and promote it through environments instead of relying on untracked production edits.

### 7. Observability and Evidence

Define which signals demonstrate that an API and its controls are healthy. Gateway metrics can show request volume, latency, errors, and policy outcomes for traffic that passes through the gateway. Logs can support investigations and compliance evidence when their content, retention, access, and privacy controls are designed appropriately.

Gateway telemetry complements service metrics, distributed tracing, security monitoring, and business events. It does not provide complete end-to-end or business visibility on its own.

### 8. Deprecation and Retirement

Set entry and exit criteria for deprecation. Identify active consumers, communicate dates, monitor remaining traffic, and remove routes, credentials, documentation, and dependencies when retirement is complete. Keeping abandoned endpoints indefinitely increases attack surface and operational cost.

## Centralized vs Federated API Governance

### Centralized Governance

A central platform or architecture team defines standards and reviews changes. This can create consistency quickly, but a small team may become a queue for every API decision. Centralized review is most useful for high-risk decisions, shared platform controls, and organization-wide exceptions.

### Federated Governance

Domain teams own their APIs within shared organizational guardrails. Automated checks and reusable runtime policies enforce the common baseline, while teams retain authority over domain-specific design. A central group maintains standards, tooling, and exception policy rather than approving every routine change.

Many organizations use a hybrid model: centralized minimum controls with federated API ownership. The right balance depends on regulatory risk, team maturity, API audience, and the cost of inconsistency.

## API Governance Process

The following sequence turns governance from a document into operating practice:

1. **Inventory APIs and assign owners.** Start with externally exposed and business-critical APIs rather than waiting for a perfect enterprise inventory.
2. **Classify APIs by risk and audience.** Use the classification to select proportionate controls.
3. **Define a minimum baseline.** Choose a short set of design, security, documentation, and lifecycle rules that can be explained and measured.
4. **Automate design checks.** Run contract linting, compatibility checks, and security tests in CI where possible.
5. **Create reusable runtime policies.** Package common gateway controls so teams do not recreate them route by route.
6. **Manage exceptions explicitly.** Record the owner, reason, compensating control, approval, and expiry date.
7. **Collect evidence.** Monitor API health, policy outcomes, configuration drift, undocumented APIs, and deprecated-version traffic.
8. **Review outcomes and revise standards.** Remove rules that add work without reducing risk, and strengthen controls where incidents or drift reveal a gap.

## API Governance Tools

No single tool governs an API estate by itself. Common tool categories include:

| Tool category | Governance role |
|---|---|
| Contract and design tools | Define and review API interfaces |
| Linters and CI checks | Automate objective design and compatibility rules |
| Service or API catalogs | Record ownership, lifecycle state, documentation, and dependencies |
| Source control and delivery systems | Review, approve, test, and promote changes |
| Identity and secrets systems | Manage users, applications, credentials, and trust material |
| API gateways | Enforce selected runtime policies and route traffic |
| Observability and SIEM systems | Analyze operational and security evidence |
| Workflow systems | Track exceptions, deprecations, and organizational approvals |

Evaluate tools against a defined governance process. Buying a portal or gateway before establishing ownership and decision rights often moves the inconsistency into a new interface instead of resolving it.

## How Apache APISIX Supports Runtime API Governance

[Apache APISIX](/) can serve as the runtime enforcement component in a wider governance architecture.

- [Routes](/docs/apisix/terminology/route/) and [Services](/docs/apisix/terminology/service/) define how requests reach upstream APIs and which plugins run.
- [Plugin Configs](/docs/apisix/terminology/plugin-config/) let multiple routes reuse a plugin configuration.
- [Global Rules](/docs/apisix/terminology/global-rule/) run configured plugins before route- or service-level plugins, which can support selected gateway-wide controls.
- [Consumers](/docs/apisix/terminology/consumer/) identify API callers, [Credentials](/docs/apisix/terminology/credential/) hold consumer authentication configurations, and [Consumer Groups](/docs/apisix/terminology/consumer-group/) apply reusable plugin policies to sets of consumers.
- Authentication, IP restriction, rate limiting, and transformation plugins, together with [SSL and mTLS configuration](/docs/apisix/mtls/), enforce controls on traffic routed through APISIX.
- [Prometheus metrics](/docs/apisix/plugins/prometheus/) and logging plugins such as [http-logger](/docs/apisix/plugins/http-logger/) export runtime evidence to external monitoring and analysis systems.
- The [Admin API](/docs/apisix/admin-api/) manages APISIX runtime resources in deployment modes that use it, enabling teams to connect reviewed configuration workflows to the gateway.

These mechanisms do not make APISIX a complete governance system. APISIX does not assign organizational ownership, approve API designs, maintain a source-of-truth catalog, provide a complete developer portal, or run lifecycle approval workflows. Those responsibilities stay with API owners and the connected tools selected by the organization.

## API Governance Best Practices

- Keep the mandatory baseline small enough to explain, automate, and maintain.
- Apply controls according to API risk instead of forcing every API through the same process.
- Store ownership and lifecycle state in a maintained system of record.
- Validate API contracts and compatibility before deployment.
- Treat gateway policies as reviewed, tested configuration rather than manual production settings.
- Separate gateway authentication from application-level business authorization.
- Use reusable policies, but allow documented exceptions with owners and expiry dates.
- Monitor whether controls are deployed and effective, not only whether a policy document exists.
- Include privacy and retention requirements when collecting API logs.
- Measure deprecated-version traffic before removing an endpoint.
- Review governance rules after incidents, platform changes, and repeated exception requests.

## API Governance Checklist

For each production API, confirm that:

- An accountable owner and support contact are recorded.
- The audience, data classification, and lifecycle state are known.
- A reviewed contract describes the current interface.
- Automated checks cover applicable design and compatibility rules.
- Authentication and authorization responsibilities are documented.
- Required gateway policies are deployed through a controlled workflow.
- Secrets and certificates have owners and rotation procedures.
- Metrics, logs, and alerts cover the expected operational risks.
- Exceptions include a reason, owner, compensating control, and expiry date.
- Versioning, deprecation, consumer notification, and retirement paths are defined.

Governance becomes useful when these answers are visible and actionable to the teams building and operating APIs. The goal is a dependable system of ownership and controls, not a longer approval checklist.
