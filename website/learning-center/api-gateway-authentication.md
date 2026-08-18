---
title: "API Gateway Authentication: Methods, Best Practices & Implementation"
description: "Compare API gateway authentication methods including API keys, JWT, OAuth 2.0, OIDC, mTLS, and HMAC, with implementation guidance for Apache APISIX."
slug: api-gateway-authentication
date: 2026-04-14
tags: [authentication, security, api-gateway]
hide_table_of_contents: false
---

API gateway authentication verifies client identity at a centralized entry point before requests reach backend services. Depending on the client and trust model, credentials can be a username and password, API key, signed token, OAuth access token, or client certificate. Centralized enforcement reduces duplicated authentication logic and creates one control point for access policies.

## What is API Gateway Authentication

In a distributed architecture, every service that exposes an endpoint must answer a fundamental question: who is making this request? Without a gateway, each service independently implements its own authentication stack. This leads to inconsistent enforcement, duplicated code, and a broader attack surface.

An API gateway centralizes this concern. It intercepts every inbound request, validates credentials against a configured identity provider or local store, and either forwards the authenticated request downstream or rejects it immediately. Broken authentication consistently ranks among the top API vulnerability categories, making centralized enforcement critical.

Centralizing authentication at the gateway layer provides three key advantages. First, it significantly reduces per-service authentication code by consolidating auth logic into a single component. Second, it creates a single audit log for every authentication event. Third, it enables credential rotation and policy changes without redeploying individual services.

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

APISIX implements JWT validation through its [jwt-auth plugin](/docs/apisix/plugins/jwt-auth/). It supports symmetric, RSA, ECDSA, RSA-PSS, and EdDSA signing algorithms, together with configurable token locations and time-based claim validation.

### OAuth 2.0

OAuth 2.0 is an authorization framework that enables third-party applications to obtain limited access to an API on behalf of a resource owner. For machine-to-machine access, the client credentials grant issues tokens to an application rather than a user. The gateway validates bearer tokens issued by an authorization server, typically by introspecting the token or verifying a JWT access token locally.

OAuth 2.0 is widely adopted across enterprises for API integrations. The framework's delegation model makes it essential for any API exposed to external developers or partner ecosystems.

### OpenID Connect (OIDC)

OpenID Connect extends OAuth 2.0 with a standardized identity layer. It adds an ID token (a JWT) that carries user identity claims alongside the OAuth 2.0 access token. The gateway can validate the ID token to confirm user identity and use the access token for authorization decisions.

OIDC is the de facto standard for single sign-on in API ecosystems. Major identity providers including Okta, Auth0, Azure AD, and Google Identity all implement OIDC. APISIX provides native OIDC support through its [openid-connect plugin](/docs/apisix/plugins/openid-connect/), which handles the full authorization code flow, token introspection, and token refresh.

### mTLS (Mutual TLS)

Mutual TLS requires both the client and server to present certificates during the TLS handshake. The gateway validates the client certificate against a trusted certificate authority, establishing strong machine identity without application-layer tokens.

mTLS adoption has surged alongside zero-trust architecture initiatives. In Kubernetes environments, mTLS between services has become increasingly common. At the gateway level, mTLS is particularly valuable for B2B integrations and internal service-to-service communication where certificate management infrastructure already exists.

### HMAC Authentication

HMAC authentication requires the client to compute a hash-based message authentication code over the request content using a shared secret. The gateway independently computes the same HMAC and compares the results. This method provides request integrity verification in addition to authentication.

HMAC is useful for financial APIs and webhook verification scenarios where the receiver must verify both the sender and the integrity of the signed request.

## Best Practices

**Layer your authentication.** Use mTLS at the transport layer for service identity and JWT or OAuth 2.0 at the application layer for user identity. Defense in depth reduces the impact of any single credential compromise.

**Enforce short-lived tokens.** Choose JWT and OAuth 2.0 access-token lifetimes that limit exposure while remaining practical for the client flow. Use an appropriate renewal mechanism rather than issuing long-lived bearer tokens by default.

**Centralize consumer management.** Define consumers at the gateway level with consistent identity attributes. Map every API key, JWT subject, and OAuth 2.0 client ID to a named consumer entity. This enables unified rate limiting, logging, and access control across authentication methods.

**Validate all claims.** Do not trust a JWT solely because its signature is valid. Verify the issuer (iss), audience (aud), expiration (exp), and not-before (nbf) claims. Reject tokens with unexpected or missing claims.

**Log authentication events comprehensively.** Record authentication successes and failures with the available client identity, timestamp, source address, and route. Set retention according to the organization's incident-response, privacy, and compliance requirements.

## How Apache APISIX Handles Authentication

Apache APISIX provides a plugin-based authentication architecture that supports the methods described above. Each authentication plugin runs in the gateway's request processing pipeline before the request reaches any upstream service.

APISIX's Consumer and Credential resources associate authentication material with named consumers. When different consumers need to use different authentication methods on the same Route or Service, the `multi-auth` plugin provides explicit "any supported method" behavior.

Key plugins include:

- [key-auth](/docs/apisix/plugins/key-auth/): Static API key validation with header or query parameter extraction.
- [jwt-auth](/docs/apisix/plugins/jwt-auth/): JWT signature verification with configurable algorithms and claim validation.
- [openid-connect](/docs/apisix/plugins/openid-connect/): Full OIDC flow support including authorization code, token introspection, and PKCE.

APISIX can also combine authentication with authorization plugins such as consumer-restriction and OPA (Open Policy Agent), enabling access-control decisions after identity is established.

## FAQ

### Should I use JWT or OAuth 2.0 for my API?

JWT and OAuth 2.0 are not mutually exclusive. OAuth 2.0 is an authorization framework that often uses JWTs as its access token format. If your API serves first-party clients only, standalone JWT authentication may suffice. If third-party developers need delegated access, implement the full OAuth 2.0 framework with JWT access tokens.

### Is API key authentication secure enough for production?

API key authentication can be appropriate for controlled server-to-server communication over TLS when keys are stored safely, scoped, monitored, and rotated. It is not appropriate as a secret in public browser or mobile clients because users can extract the key. For user-facing or delegated access, OAuth 2.0 and OIDC usually provide a better lifecycle and identity model.

### How does mTLS differ from standard TLS at the gateway?

Standard TLS authenticates only the server to the client. The client verifies the server's certificate, but the server accepts any client connection. mTLS adds a second handshake step where the client also presents a certificate that the server validates against a trusted CA. This provides strong machine identity for both parties and is a foundational component of zero-trust network architectures.

### Can I combine multiple authentication methods on a single route?

Yes, but the intended behavior must be explicit. Apache APISIX provides the `multi-auth` plugin for a Route or Service that should accept a request when any configured authentication method succeeds. Adding independent authentication plugins without `multi-auth` does not provide the same alternative-method semantics.
