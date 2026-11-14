# Centralized Authentication with APISIX OpenID Connect

> Learn how the APISIX openid-connect plugin validates tokens or runs the OIDC authorization code flow before proxying requests upstream.

Source: https://apisix.apache.org/blog/2021/08/25/using-the-apache-apisix-openid-connect-plugin-for-centralized-authentication/

The Apache APISIX `openid-connect` plugin can integrate gateway routes with an OpenID Connect identity provider. It can validate bearer tokens for API clients or run the authorization code flow for browser-based applications. This centralizes supported authentication checks at the gateway while leaving resource-level authorization in the application that owns the data.

<!--truncate-->

## OpenID Connect in an API Gateway

[OpenID Connect (OIDC)](https://openid.net/developers/how-connect-works/) is an identity layer built on OAuth 2.0. An identity provider publishes metadata, authorization and token endpoints, and signing keys. A relying party validates the resulting tokens and their claims.

When APISIX protects a route, it acts as an OIDC relying party or token-validating resource-server component, depending on the configured mode:

- **Authorization code flow:** a browser without an authenticated session is redirected to the identity provider. APISIX processes the callback, establishes a session, and then proxies the request.
- **Bearer-only mode:** an API client sends an access token. APISIX validates the token and rejects missing or invalid credentials instead of redirecting the client.

These modes serve different clients. Redirecting a machine client to a login page is usually incorrect; accepting bearer tokens without the intended issuer, audience, scope, and signature checks is unsafe.

## What Centralized Authentication Does—and Does Not—Do

Applying authentication at the gateway can:

- give multiple routes a consistent integration with the same identity provider;
- reject unauthenticated traffic before it reaches an upstream service;
- reduce repeated OIDC protocol handling in individual edge-facing applications;
- attach validated token information to a trusted upstream request when configured.

It does not automatically implement all authorization. A valid identity may still be unable to read a specific account, change another user's resource, or perform an administrative action. Services should enforce domain- and resource-level permissions using trusted identity context.

The upstream must also be unable to receive spoofed identity headers directly from an untrusted client. Restrict upstream network access and configure the trusted proxy boundary so that only APISIX sets or forwards the identity headers the application consumes.

## Prerequisites

Before configuring the plugin:

1. Create an OIDC client at the identity provider.
2. Record the issuer's discovery URL, normally ending in `/.well-known/openid-configuration`.
3. Register the exact redirect URI used by APISIX for an authorization code flow.
4. Decide which scopes and claims the API requires.
5. Store the client secret and session secret in protected configuration; do not commit production values to source control.
6. Ensure APISIX can reach the discovery, authorization, token, user-information, and key endpoints required by the selected flow.

Use HTTPS for the identity provider and public application route. The plugin's TLS verification should remain enabled; the current default for `ssl_verify` is `true`.

## Configure Authorization Code Flow

The following Admin API request illustrates the relevant fields. Replace the example identifiers and upstream with values from your environment.

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/oidc-browser" \
  -X PUT \
  -H "X-API-KEY: $admin_key" \
  -d '
{
  "uri": "/app/*",
  "plugins": {
    "openid-connect": {
      "client_id": "<oidc-client-id>",
      "client_secret": "<oidc-client-secret>",
      "discovery": "https://id.example.com/.well-known/openid-configuration",
      "redirect_uri": "https://gateway.example.com/app/oidc/callback",
      "logout_path": "/app/logout",
      "scope": "openid profile",
      "bearer_only": false,
      "realm": "example",
      "session": {
        "secret": "<random-secret-at-least-16-characters>"
      }
    }
  },
  "upstream_id": "app-service"
}'
```

When `bearer_only` is `false`, the session secret is required and must contain at least 16 characters. Use a high-entropy secret appropriate for the deployment's secret-management system rather than the placeholder shown above.

The example uses a fixed callback under the protected `/app/*` route. Replace the hostname with the externally reachable gateway hostname and register `https://gateway.example.com/app/oidc/callback` exactly with the identity provider. Do not omit `redirect_uri` on a wildcard browser route: the default is derived from the current request URI and would produce a different callback path for different application pages. The explicit callback must remain a subpath of the protected route without being identical to a normal application URI.

The explicit `/app/logout` path also remains inside the route matched by `/app/*`. If you choose another logout path, ensure that a route carrying the same plugin configuration matches it.

After successful login, APISIX maintains the configured session and proxies the request. Test login, logout, session expiry, callback errors, and behavior across multiple gateway instances before production rollout.

## Configure Bearer-Only Token Validation

For APIs called with access tokens, enable bearer-only mode:

```shell
curl "http://127.0.0.1:9180/apisix/admin/routes/oidc-api" \
  -X PUT \
  -H "X-API-KEY: $admin_key" \
  -d '
{
  "uri": "/api/*",
  "plugins": {
    "openid-connect": {
      "client_id": "<api-client-id>",
      "client_secret": "<api-client-secret>",
      "discovery": "https://id.example.com/.well-known/openid-configuration",
      "scope": "openid",
      "required_scopes": ["api.read"],
      "claim_validator": {
        "audience": {
          "required": true,
          "match_with_client_id": true
        }
      },
      "bearer_only": true,
      "realm": "example"
    }
  },
  "upstream_id": "api-service"
}'
```

The `required_scopes` field makes the plugin reject a validated access token that lacks `api.read`. The audience validator requires an `aud` claim and, in this example, requires it to contain `<api-client-id>`. Configure the identity provider so that this client ID is the access token's intended audience. If the provider uses a separate API audience, use a supported validation rule that matches that exact audience rather than disabling the check. Do not treat an ID token intended for a browser client as an access token for an unrelated API.

## Identity Information Sent Upstream

The plugin can place access-token, ID-token, or user-information data in upstream headers through its documented configuration options. Forward only the data the upstream requires:

- avoid sending tokens to services that do not need them;
- ensure clients cannot bypass APISIX and inject trusted headers;
- redact credentials and token-bearing headers from access and error logs;
- keep authorization decisions tied to stable claims such as issuer, subject, audience, and approved scopes rather than mutable display fields.

An upstream service should fail closed when required trusted identity context is absent or malformed.

## Operational and Security Checks

### Protect secrets and administrative access

Restrict access to the APISIX Admin API and configuration store. Use the deployment's supported secret-management approach, limit who can read OIDC credentials, and rotate client and session secrets through a tested procedure.

### Validate failure behavior

Test expired tokens, invalid signatures, missing scopes, identity-provider outages, key rotation, clock skew, and discovery refresh. Decide whether each protected route should reject traffic or use another explicit behavior when identity services are unavailable.

### Separate authentication from authorization

The gateway can require a valid token and selected scopes. The service should still check tenant, object ownership, role, and business-state constraints. Document which layer owns every decision so a policy is neither omitted nor inconsistently duplicated.

### Monitor without leaking credentials

Measure authentication success and failure rates, identity-provider latency, callback errors, and session failures. Avoid labels containing raw subject IDs or tokens, and never log client secrets, authorization codes, or complete bearer tokens.

## Frequently Asked Questions

### Is OpenID the same as OpenID Connect?

No. This integration uses OpenID Connect, the modern identity protocol built on OAuth 2.0. The APISIX plugin is named `openid-connect`.

### Should every route use authorization code flow?

No. It is suitable for interactive browser login. APIs called by software clients commonly use bearer-only token validation or another appropriate authentication method.

### Does validating a token at APISIX secure the upstream by itself?

No. The upstream network path, trusted header boundary, resource authorization, secret handling, and service-to-service access must also be secured.

### Where is the complete configuration reference?

Use the current [`openid-connect` plugin documentation](https://apisix.apache.org/docs/apisix/plugins/openid-connect/) as the source of truth for supported fields, defaults, examples, and version-specific behavior.

## Conclusion

The APISIX `openid-connect` plugin can centralize OIDC authentication for browser and API routes. Choose the correct flow, register the callback precisely, validate the issuer and token requirements, protect secrets, and keep resource-level authorization in the service that owns the resource.

Treat the gateway as one layer in the identity architecture—not as a replacement for upstream authorization or a reason to trust unprotected identity headers.
