---
title: "API Gateway Security Best Practices"
description: "Learn API Gateway security best practices with Apache APISIX, including authentication, authorization, rate limiting, WAF, mTLS, and zero-trust controls."
slug: api-gateway-security
date: 2026-04-14
tags: [security, api-gateway, best-practices]
hide_table_of_contents: false
---

API gateway security best practices protect API infrastructure at the edge by combining authentication, coarse-grained authorization, rate limiting, request validation, and traffic filtering before requests reach backend services. These controls reduce the attack surface and provide consistent protection for traffic routed through the gateway, while backend services remain responsible for business authorization and resource ownership.

## Why API Gateway Security Matters

The OWASP API Security Top 10 (2023 edition) ranks broken object-level authorization and broken authentication as its first two API risk categories. As organizations expose more application functionality through APIs, these interfaces require the same deliberate threat modeling and layered controls as the services behind them.

The cost of getting API security wrong can be substantial. An API gateway sits at a useful enforcement point because it processes traffic routed through it and can apply common edge policies consistently, while application services continue to enforce their own authorization and data-protection rules.

## Common API Threats

Understanding the threat landscape is essential for building an effective defense. The following categories represent the most frequent and damaging attack patterns targeting APIs today.

### Broken Object-Level Authorization (BOLA)

BOLA attacks exploit weak authorization checks to access resources belonging to other users. An attacker modifies object identifiers in API requests (for example, changing `/users/123/orders` to `/users/456/orders`) to retrieve unauthorized data. BOLA remains one of the most exploited API vulnerability classes, particularly in organizations where API management and authorization enforcement have not kept pace with API proliferation.

### Injection Attacks

SQL injection, NoSQL injection, and command injection remain persistent threats. Attackers embed malicious payloads in query parameters, headers, or request bodies. Despite being a well-known vulnerability class, injection attacks continue to appear frequently in web application security assessments.

### Broken Authentication

Weak or improperly implemented authentication mechanisms allow attackers to assume legitimate user identities. Common failures include missing token validation, weak password policies, credential stuffing vulnerabilities, and improper session management.

### Excessive Data Exposure

APIs frequently return more data than the client needs, relying on the frontend to filter sensitive fields. Attackers bypass the frontend and consume raw API responses directly, gaining access to data never intended for display. This over-exposure is especially dangerous in mobile applications where API traffic is easily intercepted.

### Rate Limit Bypass

Without appropriate traffic controls, automated clients can increase the rate of brute-force attempts, credential enumeration, or resource-exhaustion traffic against an API.

## Security Layers at the Gateway

A defense-in-depth approach applies multiple security controls at the gateway layer, each addressing a distinct category of risk.

### Authentication

For routes that require identity, the gateway can verify credentials before forwarding a request. Common mechanisms include JWT validation, OAuth 2.0 token introspection, API key verification, and [mutual TLS (mTLS)](/learning-center/what-is-mutual-tls/) for service-to-service communication. Centralizing [API gateway authentication](/learning-center/api-gateway-authentication/) can reduce inconsistent edge enforcement, while explicitly public routes remain unauthenticated by design.

### Authorization

Beyond verifying identity, the gateway can enforce route-, consumer-, role-, attribute-, or scope-based access policies before forwarding a request. These gateway-level checks complement rather than replace authorization in the application: backend services must still verify resource ownership and other business rules to prevent BOLA.

### Rate Limiting and Throttling

Rate limiting protects backend services from abuse and helps allocate capacity fairly. Effective rate limiting can operate at multiple granularities, including per consumer, per route, per IP address, and globally. It should be combined with authentication, request validation, and other controls when defending against automated abuse.

### IP Restriction

IP allowlists and denylists provide coarse-grained access control. While not sufficient as a sole security measure, IP restriction is valuable for restricting administrative endpoints, limiting partner API access to known address ranges, and blocking traffic from regions associated with attack activity.

### WAF and CORS

A Web Application Firewall (WAF) at the gateway layer can inspect requests for configured attack patterns. CORS controls which origins browser code may read responses from; it is enforced by browsers and does not stop non-browser clients from sending requests. Use these controls for their distinct purposes rather than treating either as a complete authorization or injection defense.

### TLS Termination

TLS termination at the gateway encrypts client-to-gateway traffic when HTTPS is required. The gateway handles certificate management, cipher suite configuration, and protocol version enforcement, while teams should separately decide whether to re-encrypt traffic from the gateway to upstream services. TLS is a baseline requirement for production APIs that carry sensitive or authenticated traffic.

### Request Validation

Schema-based request validation can reject malformed, unexpected, or oversized payloads before they reach backend services. This reduces invalid input, but it does not by itself prevent injection; applications still need safe query construction, output handling, and business-level validation.

## Zero-Trust API Architecture

Zero-trust architecture does not grant trust from network location alone. Protected API calls should be evaluated against identity, authorization, device or workload context, and other policy signals appropriate to the resource.

At the gateway layer, zero-trust principles can include validating credentials on protected routes, evaluating common access policy per request, and requiring encryption according to the threat model. Network location alone does not confer implicit trust.
The API gateway can serve as one policy enforcement point for traffic routed through it. Application services and other infrastructure controls remain responsible for resource authorization, data protection, and traffic that does not pass through the gateway.

## Security Best Practices

The following practices represent a comprehensive approach to API gateway security that organizations should adopt incrementally based on risk profile.

1. **Define authentication per route.** Require verified identity for protected APIs, validate credentials on every protected request, and expose public routes only by explicit design. Choose token lifetimes and authentication methods according to the client and risk model.

2. **Implement least-privilege authorization.** Grant the minimum permissions required for each consumer. Default to deny and require explicit grants for sensitive operations.

3. **Apply rate limits where they address a measured risk.** Combine only independent dimensions justified by the abuse model and backend capacity, such as per-consumer, per-route, global, or concurrency limits. Select the algorithm and burst behavior for the workload.

4. **Validate all request inputs.** Enforce request schema validation at the gateway. Reject payloads that exceed expected sizes, contain unexpected fields, or fail type checks.

5. **Use mutual TLS where service identity is required.** Encrypt internal traffic according to the threat model, validate certificates, and automate certificate rotation where practical.

6. **Enable WAF rules for known attack patterns.** Deploy rulesets targeting SQL injection, XSS, and command injection. Update rules regularly to address emerging attack vectors.

7. **Log and audit relevant security events.** Capture authentication failures, authorization denials, rate limit triggers, and WAF blocks without recording credentials or sensitive payloads. Feed appropriate security logs into a SIEM for correlation and alerting.

8. **Rotate credentials and secrets regularly.** Automate API key rotation, certificate renewal, and token signing key rotation. Never embed secrets in client-side code or version control.

9. **Restrict administrative API access.** Protect management APIs with strong authentication, IP restrictions, and separate credentials from data-plane APIs.

10. **Conduct regular security assessments.** Perform API-specific penetration testing, not just general web application assessments. The OWASP API Security Testing Guide provides a structured methodology.

## How Apache APISIX Secures APIs

Apache APISIX provides security plugins that can implement several gateway layers in the defense-in-depth model described above.

For **IP-based access control**, the [ip-restriction plugin](/docs/apisix/plugins/ip-restriction/) supports allowlists and denylists at the route level, enabling fine-grained control over which addresses can reach specific endpoints.

**Cross-origin resource sharing** is managed through the [CORS plugin](/docs/apisix/plugins/cors/), which configures the origins, methods, and headers that browser code may use when reading cross-origin responses. CORS is not a substitute for authentication or authorization.

**CSRF protection** is available through the [CSRF plugin](/docs/apisix/plugins/csrf/), which generates and validates CSRF tokens to mitigate cross-site request forgery on state-changing operations.

For **mutual TLS**, APISIX supports [mTLS configuration](/docs/apisix/mtls/) for client-to-gateway and gateway-to-upstream connections when both encryption and peer authentication are required.

APISIX also supports JWT authentication, key authentication, OpenID Connect, rate limiting with multiple algorithms, and request body validation. Its plugin architecture lets teams compose gateway policies per route while retaining application-level authorization and validation in the services that own the data.

## FAQ

### What is the difference between API gateway security and API security?

API security is the broad discipline of protecting APIs across their entire lifecycle, including design, development, testing, and runtime. API gateway security specifically refers to the security controls enforced at the gateway layer during runtime, such as authentication, rate limiting, and input validation. The gateway is one component of a comprehensive API security strategy, not a replacement for secure coding practices and security testing. An [API governance framework](/learning-center/api-governance/) connects these runtime controls with ownership, design standards, exceptions, and lifecycle decisions.

### Should I terminate TLS at the API gateway or at the backend service?

TLS can terminate at the gateway when centralized certificate and edge-policy management fit the architecture. Re-encrypt gateway-to-upstream traffic when the network and data threat model requires confidentiality, and use mTLS when upstream services also need to authenticate the gateway. TLS passthrough or service-side termination may be more appropriate for some protocols or ownership boundaries.

### How many rate limiting layers should an API gateway enforce?

Choose rate-limit dimensions from measured capacity and the abuse model. A service may combine global, per-consumer, per-route, or concurrency limits when those controls address distinct risks. Select the algorithm and burst behavior that match the backend and client contract rather than enforcing a universal number of layers.

## Related

- [What is an API gateway?](/learning-center/what-is-an-api-gateway/)
- [API gateway rate limiting](/learning-center/api-gateway-rate-limiting/)
