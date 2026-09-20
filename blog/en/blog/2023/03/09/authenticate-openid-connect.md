---
title: Authenticate with OpenID Connect and Apache APISIX
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Authentication
  - OAuth 2.0
  - OpenID Connect
  - Google Identity
  - Microsoft Entra ID
description: >
  Configure Apache APISIX 3.18 with Google or Microsoft Entra ID through OpenID Connect discovery metadata, then switch providers without a gateway-specific integration.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/06/13/OZebsxXL_eye-gd82fef23c.jpg
---

> Apache APISIX can authenticate browser clients with an OpenID Connect provider before forwarding requests to a protected upstream. Using provider discovery metadata keeps the gateway configuration portable between providers such as Google Identity and Microsoft Entra ID.

<!--truncate-->

[OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) defines a framework for delegated authorization. [OpenID Connect](https://openid.net/developers/how-connect-works/) adds an identity layer so a client can verify who authenticated and obtain standardized claims about that user.

In this design, the identity provider authenticates the user and Apache APISIX validates the resulting OIDC flow at the gateway. The upstream service still owns business authorization, resource ownership, and other domain-specific access decisions. Moving authentication to the gateway does not make every authenticated user authorized for every operation.

## How provider portability works

An OIDC discovery document publishes endpoints and capabilities in a standard format. The APISIX [openid-connect plugin](/docs/apisix/plugins/openid-connect/) reads that document instead of requiring a provider-specific gateway integration.

Switching providers normally changes these values:

- client ID
- client secret
- discovery URL
- provider-side redirect URI registration

Claims, tenant rules, consent, and account policies can still differ between providers. Test application authorization and claim handling after a switch rather than assuming that identical OIDC protocol support produces identical user data.

## Prerequisites

This example assumes:

- Apache APISIX 3.18.0 in standalone mode
- Docker Compose
- a test upstream such as httpbin
- an OIDC web client registered with Google Identity or Microsoft Entra ID
- the exact callback URL `http://localhost:9080/.apisix/redirect` registered with the provider

Use HTTPS and a production hostname outside local development. Store client and session secrets in a secret manager or protected environment variables rather than committing them to source control.

## Run APISIX and the upstream

The Compose file mounts an existing standalone APISIX configuration and the declarative route configuration used below.

```yaml
services:
  apisix:
    image: apache/apisix:3.18.0-debian
    ports:
      - "9080:9080"
    volumes:
      - ./apisix/config.yml:/usr/local/apisix/conf/config.yaml:ro
      - ./apisix/apisix.yml:/usr/local/apisix/conf/apisix.yaml:ro
    env_file:
      - .env
  httpbin:
    image: kennethreitz/httpbin
```

Configure APISIX to use the YAML configuration provider as described in the [deployment modes documentation](/docs/apisix/deployment-modes/). Then add this Route to `apisix/apisix.yml`:

```yaml
routes:
  - id: oidc-protected-route
    uri: /*
    plugins:
      openid-connect:
        client_id: ${{OIDC_CLIENT_ID}}
        client_secret: ${{OIDC_CLIENT_SECRET}}
        discovery: ${{OIDC_DISCOVERY_URL}}
        redirect_uri: http://localhost:9080/.apisix/redirect
        scope: openid profile email
        ssl_verify: true
        session:
          secret: ${{OIDC_SESSION_SECRET}}
    upstream:
      type: roundrobin
      nodes:
        "httpbin:80": 1
#END
```

The callback is a sub-path of the wildcard Route and is not the same URI as the original protected request. This avoids the `no session state found` failure caused by sending an initial request directly to the callback path.

`OIDC_SESSION_SECRET` must contain at least 16 characters. It encrypts and authenticates browser session data when the plugin uses authorization code flow. APISIX 3.18 enables provider TLS certificate verification by default; keep `ssl_verify: true` and install the appropriate trust chain instead of disabling verification in production.

Create a `.env` file outside version control:

```dotenv
OIDC_CLIENT_ID=replace-with-provider-client-id
OIDC_CLIENT_SECRET=replace-with-provider-client-secret
OIDC_DISCOVERY_URL=https://accounts.google.com/.well-known/openid-configuration
OIDC_SESSION_SECRET=replace-with-a-long-random-secret
```

## Configure Google Identity

In Google Cloud Console:

1. Configure the OAuth consent screen for the project.
2. Create an OAuth client ID with application type **Web application**.
3. Register `http://localhost:9080/.apisix/redirect` as an authorized redirect URI.
4. Put the generated client ID and client secret in `.env`.
5. Set `OIDC_DISCOVERY_URL` to `https://accounts.google.com/.well-known/openid-configuration`.

Start the environment:

```shell
docker compose up
```

Opening `http://localhost:9080/get` should redirect the browser to Google. After authentication, APISIX completes the callback and proxies the original request to httpbin.

Provider consoles change over time. The durable requirements are a web client, the exact registered callback URI, and the provider's OIDC discovery document; consult Google's current OIDC documentation for console-specific steps.

## Switch to Microsoft Entra ID

Create a web application registration in Microsoft Entra ID and register the same callback URL. Create a client secret for the application, then replace the provider variables:

```dotenv
OIDC_CLIENT_ID=replace-with-entra-application-client-id
OIDC_CLIENT_SECRET=replace-with-entra-client-secret
OIDC_DISCOVERY_URL=https://login.microsoftonline.com/replace-with-tenant-id/v2.0/.well-known/openid-configuration
OIDC_SESSION_SECRET=replace-with-a-new-long-random-secret
```

Recreate the APISIX container so Compose injects the updated environment variables. A container restart alone does not reload values from `.env`:

```shell
docker compose up --detach --force-recreate apisix
```

Confirm that the container received the new discovery URL without printing either client or session secret:

```shell
docker compose exec apisix printenv OIDC_DISCOVERY_URL
```

The new session secret invalidates cookies created during the Google test. If you intentionally retain the previous session secret instead, clear the APISIX session cookie or use a private browser window before testing. A request to `http://localhost:9080/get` should then start the Microsoft Entra ID flow.

Use a tenant-specific discovery URL when access should be limited to one organization. Microsoft also exposes other issuer patterns for multi-tenant applications; choose one only after defining which accounts the application should accept.

## Validate the integration

For either provider, verify more than the successful redirect:

1. An unauthenticated request starts the provider flow.
2. A successful callback returns the user to the original protected URL.
3. An invalid client secret or unregistered callback fails without exposing secret values in logs.
4. Session cookies use the expected domain, path, `Secure`, and `SameSite` settings for the deployment.
5. The upstream receives only the identity headers that the application needs and does not treat those headers as a substitute for business authorization.
6. Logout, token refresh, session expiration, and denied consent behave as expected.

If the application needs bearer-token validation rather than a browser redirect, configure the plugin for that flow instead of copying the session configuration unchanged. The official plugin documentation includes authorization code, bearer-only, introspection, PKCE, and troubleshooting examples.

## Conclusion

OpenID Connect lets APISIX use a standard provider contract for gateway-side authentication. Discovery metadata makes the endpoint configuration portable, while the client registration, tenant policy, claims, and service authorization remain deployment-specific. Test those boundaries whenever you move from Google to Microsoft Entra ID or another OIDC provider.
