---
title: "API Gateway Authentication: Methods, Best Practices & Implementation"
description: "Compare API gateway authentication methods including API keys, JWT, OAuth 2.0, OIDC, mTLS, and HMAC, with implementation guidance for Apache APISIX."
slug: api-gateway-authentication
date: 2026-04-14
tags: [authentication, security, api-gateway]
hide_table_of_contents: false
---

API gateway authentication verifies client identity for requests routed through the gateway and covered by its authentication policy. Depending on the client and trust model, credentials can be a username and password, API key, signed token, OAuth access token, or client certificate. Centralized enforcement can reduce duplicated authentication logic; backend services still enforce business and resource-level authorization.

## What is API Gateway Authentication

In a distributed architecture, every service that exposes an endpoint must answer a fundamental question: who is making this request? Without a gateway, each service independently implements its own authentication stack. This leads to inconsistent enforcement, duplicated code, and a broader attack surface.

An [API gateway](/learning-center/what-is-an-api-gateway/) centralizes this concern for the APIs placed behind it. For a request that matches a protected route, the configured authentication policy determines how credentials are validated and whether the request is forwarded or rejected. Public routes, anonymous-access options, and paths that bypass the gateway need separate consideration.

Centralizing authentication can consolidate shared credential checks and policy changes. Gateway logs can also contribute evidence for authentication attempts when the relevant logging is configured and verified. They do not automatically form a complete audit trail: identity providers and services can observe events that the gateway never sees, and rejected requests may not carry an established consumer identity.

Authentication establishes who or what is making a request. Authorization determines what that authenticated identity may access. A gateway can enforce both, but validating a credential does not by itself grant permission to every upstream resource.

## Comparison Table

| Method | Complexity | Statefulness | Best For | Credential Lifetime |
|--------|-----------|-------------|----------|---------------------|
| Basic Auth | Low | Stateless (lookup) | Controlled integrations, legacy clients | Manual rotation |
| LDAP | Medium | Directory lookup | Enterprise users and existing directories | Directory policy |
| Key Auth | Low | Stateless (lookup) | Controlled server-to-server integrations | Manual rotation |
| JWT | Medium | Stateless | Distributed APIs and signed claims | Token expiration |
| OAuth 2.0 | High | Authorization server | Delegated access and machine-to-machine grants | Access token lifetime |
| OIDC | High | Identity provider and session | User authentication and SSO | ID and access token lifetime |
| mTLS | High | Certificate validation | Workload identity, partner APIs, zero-trust | Certificate validity period |
| HMAC | Medium | Stateless | Signed requests and webhook verification | Per-key rotation policy |

## Authentication Methods

### Basic and LDAP Authentication

Basic authentication encodes a username and password in the HTTP `Authorization` header and should be used only over TLS. It is straightforward for controlled integrations but requires strong credential rotation. Apache APISIX supports this method through the [basic-auth plugin](/docs/apisix/plugins/basic-auth/).

LDAP authentication validates a username and password against an LDAP directory instead of storing credentials in each backend service. The [ldap-auth plugin](/docs/apisix/plugins/ldap-auth/) lets a gateway use an existing directory as the credential source while applying route-level access policies centrally.

### Key Auth

Key authentication is the simplest method. The client includes a static API key in a header or query parameter. The gateway validates the key against a stored registry and maps it to a consumer identity.

Key Auth works well for controlled server-to-server communication where transport security is enforced and credentials can be stored and rotated safely. It is a poor fit for public clients, such as browser or mobile applications, where a long-lived shared secret cannot be kept confidential.

Apache APISIX supports Key Auth natively through its [key-auth plugin](/docs/apisix/plugins/key-auth/). Configuration requires only defining a consumer and attaching the plugin to a route.

### JWT (JSON Web Tokens)

JWT authentication uses digitally signed tokens that carry claims about the client. A gateway validates the token signature and the claims required by its policy, such as expiration and not-before times. Because JWTs are self-contained, validation does not necessarily require an external request for every API call.

The compact format and local signature verification make JWTs useful for distributed APIs, provided issuers, signing keys, accepted algorithms, and required claims are configured explicitly.

APISIX implements JWT validation through its [jwt-auth plugin](/docs/apisix/plugins/jwt-auth/). The behavior described here is checked against APISIX 3.19.0: it verifies the signature and uses `key_claim_name` (default `key`) to find a configured Consumer credential. That lookup is not automatic mapping of every JWT `sub` to a Consumer. By default, `exp` and `nbf` are checked when present; explicitly configured `claims_to_verify` entries must be present and valid in this version. This setting accepts time claims, not a general issuer or audience policy; see the [3.19.0 claim-validation implementation](https://github.com/apache/apisix/blob/3.19.0/apisix/plugins/jwt-auth/parser.lua).

### OAuth 2.0

OAuth 2.0 is an authorization framework that enables third-party applications to obtain limited access to an API on behalf of a resource owner. For machine-to-machine access, the client credentials grant issues tokens to an application rather than a user. The gateway validates bearer tokens issued by an authorization server, typically by introspecting the token or verifying a JWT access token locally.

Use OAuth 2.0 when the integration needs delegated access or an authorization-server-managed token lifecycle. It is not a requirement for every external API; the appropriate method depends on the client, permissions, and trust boundaries.

### OpenID Connect (OIDC)

OpenID Connect extends OAuth 2.0 with a standardized identity layer. It adds an ID token (a JWT) that carries user identity claims alongside the OAuth 2.0 access token. The gateway can validate the ID token to confirm user identity and use the access token for authorization decisions.

APISIX provides OIDC support through its [openid-connect plugin](/docs/apisix/plugins/openid-connect/), with authorization-code login, bearer-token validation, and token-refresh options. Choose the flow and issuer/audience checks for the identity provider and token type being accepted; these settings are not interchangeable with `jwt-auth`. An ID token establishes identity for its intended client, not permission to every API resource. The [provider-switching tutorial](/blog/2023/03/09/authenticate-openid-connect/) illustrates discovery-based configuration for Google and Microsoft Entra ID; provider-specific settings still require validation.

### mTLS (Mutual TLS)

[Mutual TLS (mTLS)](/learning-center/what-is-mutual-tls/) requires both the client and server to present certificates during the TLS handshake. The gateway validates the client certificate against a trusted certificate authority, establishing strong machine identity without application-layer tokens.

At the gateway level, mTLS can be useful for partner integrations and service-to-service communication where certificate issuance, rotation, and revocation are managed. It establishes a certificate-based identity at that TLS boundary, not automatic user identity or permission to every backend resource.

### HMAC Authentication

HMAC authentication requires the client to compute a hash-based message authentication code over agreed request components using a shared secret. The gateway computes the expected HMAC and compares the results. Integrity protection covers the signed components, not automatically every header and body field; the client and verifier must use the same signing rules.

HMAC is useful for financial APIs and webhook verification scenarios where the receiver must verify both the sender and the integrity of the signed request.

## Best Practices

**Layer your authentication.** Use mTLS at the transport layer for service identity and JWT or OAuth 2.0 at the application layer for user identity. Defense in depth reduces the impact of any single credential compromise.

**Enforce short-lived tokens.** Choose JWT and OAuth 2.0 access-token lifetimes that limit exposure while remaining practical for the client flow. Use an appropriate renewal mechanism rather than issuing long-lived bearer tokens by default.

**Design identity mapping explicitly.** Use [Consumers](/docs/apisix/terminology/consumer/) and [Credentials](/docs/apisix/terminology/credential/) where the selected authentication plugin supports them. External token validation does not by itself attach an APISIX Consumer. Confirm which identity is available before using consumer-based quotas, logging, or access policies; keep service-level ownership and permissions separate.

**Define and enforce a token policy.** A valid signature alone does not establish that a token is intended for this API. Specify trusted issuers, intended audiences, required claims, and time validity, then verify that the chosen plugin and flow enforce each requirement. Do not assume the default `jwt-auth` time checks require every claim to exist or enforce `iss` and `aud`; use appropriate additional validation where the selected mechanism does not cover the policy.

**Verify audit coverage.** Configure and test logging for successful and rejected requests, including timestamp, route, outcome, and available identity. Correlate gateway, identity-provider, and service events where needed. Do not log passwords, API keys, bearer tokens, or session cookies; set retention according to incident-response, privacy, and compliance requirements.

## How Apache APISIX Handles Authentication

Apache APISIX provides plugin-based credential checks and TLS client-certificate validation. Request authentication depends on the configured Route, Service, or other policy scope; installing a plugin does not protect every route or prevent direct access to upstream services.

APISIX's Consumer and Credential resources associate authentication material with named consumers for plugins that use those resources. When different consumers need alternative authentication methods on the same Route or Service, the [multi-auth plugin](/docs/apisix/plugins/multi-auth/) provides explicit "any supported method" behavior. It does not mean that all configured methods must succeed.

Key plugins include:

- [key-auth](/docs/apisix/plugins/key-auth/): Static API key validation with header or query parameter extraction.
- [jwt-auth](/docs/apisix/plugins/jwt-auth/): Consumer-credential lookup, JWT signature verification, and configurable time-claim checks.
- [openid-connect](/docs/apisix/plugins/openid-connect/): Identity-provider integration with flow-specific settings for login and bearer-token validation.

APISIX can also combine authentication with authorization plugins such as [consumer-restriction](/docs/apisix/plugins/consumer-restriction/) and [OPA (Open Policy Agent)](/docs/apisix/plugins/opa/), enabling configured access-control decisions. Their input and identity requirements must match the chosen authentication path; successful authentication alone does not grant access to every resource. The [API gateway security guide](/learning-center/api-gateway-security/) explains how these controls fit with rate limiting and other layers of defense.

To test these controls on a running gateway, first complete the [Apache APISIX getting started guide](/docs/apisix/getting-started/) and then configure the authentication plugin that matches the client and trust model.

## FAQ

### Should I use JWT or OAuth 2.0 for my API?

JWT and OAuth 2.0 are not mutually exclusive. OAuth 2.0 is an authorization framework that often uses JWTs as its access token format. If your API serves first-party clients only, standalone JWT authentication may suffice. If third-party developers need delegated access, implement the full OAuth 2.0 framework with JWT access tokens.

### Is API key authentication secure enough for production?

API key authentication can be appropriate for controlled server-to-server communication over TLS when keys are stored safely, scoped, monitored, and rotated. It is not appropriate as a secret in public browser or mobile clients because users can extract the key. For user-facing or delegated access, OAuth 2.0 and OIDC usually provide a better lifecycle and identity model.

### How does mTLS differ from standard TLS at the gateway?

In a typical server-authenticated TLS connection, the client validates the server's certificate without presenting its own certificate for client authentication. mTLS adds client-certificate authentication within the TLS handshake. The server validates the client certificate against its configured trust policy; application-level authorization is still a separate decision.

### Can I combine multiple authentication methods on a single route?

Yes, but the intended behavior must be explicit. Apache APISIX provides the `multi-auth` plugin for a Route or Service that should accept a request when any configured authentication method succeeds. Adding independent authentication plugins without `multi-auth` does not provide the same alternative-method semantics.
