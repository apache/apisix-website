---
title: "Mutual TLS (mTLS): Authentication and Certificates"
description: "Learn how mutual TLS (mTLS) authentication uses client and server certificates, how TLS vs mTLS differs, and how Apache APISIX enforces mTLS."
slug: what-is-mutual-tls
date: 2026-04-14
tags: [mtls, security, tls]
hide_table_of_contents: false
---

Mutual TLS (mTLS) authentication is a security protocol where both the client and server authenticate each other using X.509 digital certificates during the TLS handshake. Unlike standard TLS, which only verifies the server's identity, mTLS provides mutual authentication: both parties prove their identities before exchanging application data over a secure connection.

## Why Mutual TLS Matters

In a typical TLS connection, the client verifies that the server holds a valid certificate, but the server does not authenticate the client with a certificate. The server instead relies on application-layer mechanisms such as API keys, tokens, or passwords when it needs to identify the caller.

This gap becomes critical in zero-trust architectures, service-to-service communication, and regulated environments where network-level identity verification is required. mTLS closes this gap by making identity verification bilateral and cryptographic.

## TLS vs mTLS: How Authentication Differs

| Aspect | Standard TLS | Mutual TLS (mTLS) |
|---|---|---|
| Server authenticated | Yes | Yes |
| Client authenticated | No (application layer) | Yes (certificate) |
| Client certificate required | No | Yes |
| Certificate management complexity | Low | High |
| Typical use case | Public websites, APIs | Internal services, zero-trust, IoT |
| Identity assurance level | Server only | Both endpoints |
| Handshake work | Server certificate validation | Server and client certificate validation |
| Common in browsers | Yes | Rare (except enterprise) |

mTLS is commonly used for service-to-service authentication and zero-trust architectures because it establishes cryptographic identity before application data is exchanged.

## How the mTLS Handshake Works

The mTLS handshake extends the standard TLS 1.3 handshake with additional steps for client certificate exchange. Here is the full sequence:

**Step 1: Client Hello.** The client initiates the connection by sending supported cipher suites, TLS version, and a random value to the server. This step is identical to standard TLS.

**Step 2: Server Hello and Server Certificate.** The server responds with its chosen cipher suite, its own random value, and its X.509 certificate. The server also sends a CertificateRequest message, signaling that the client must present a certificate. In standard TLS, this CertificateRequest is absent.

**Step 3: Client Verifies Server Certificate.** The client validates the server's certificate against its trust store, checking the certificate chain, expiration, revocation status (via CRL or OCSP), and that the subject matches the expected server identity.

**Step 4: Client Certificate Submission.** The client sends its own X.509 certificate to the server along with a CertificateVerify message containing a digital signature over the handshake transcript, proving possession of the private key corresponding to the certificate.

**Step 5: Server Verifies Client Certificate.** The server validates the client certificate against its configured Certificate Authority (CA) trust store, checks the certificate chain, verifies the CertificateVerify signature, and optionally checks revocation status. If verification fails, the server terminates the connection immediately.

**Step 6: Secure Channel Established.** Both parties derive session keys from the shared secret. All subsequent communication is encrypted and authenticated in both directions.

The additional certificate exchange and validation make an mTLS handshake more expensive than a standard TLS handshake. The actual cost depends on factors such as certificate-chain depth, cryptographic algorithms, revocation checks, network latency, and whether the connection can use session resumption.

## Use Cases for Mutual TLS

### Zero-Trust Architecture

Zero-trust security models operate on the principle of "never trust, always verify." Every service must authenticate before communicating, regardless of network location. mTLS can provide the transport-layer identity needed to apply this model between clients, gateways, and services.

### Microservices Communication

In microservices architectures, dozens or hundreds of services communicate over internal networks. Without mTLS, a compromised service can impersonate any other service on the network. mTLS ensures that Service A can only communicate with Service B if both hold certificates signed by a trusted CA. Service meshes like Istio and Linkerd automate mTLS certificate issuance and rotation for every service pod, making deployment tractable at scale.

### IoT Device Authentication

IoT devices can operate in physically untrusted environments where API keys or passwords may be extracted from device firmware. When private keys are protected by secure hardware, mTLS can bind device identity to a certificate and make credential copying more difficult.

### API Security and Partner Integration

APIs exposed to partners or high-risk environments often require stronger client authentication than an API key alone provides. mTLS ensures that only clients holding a certificate issued by a trusted CA can establish a connection, providing defense in depth before [application-layer authentication](/learning-center/api-gateway-authentication/) occurs. This transport-layer control is one part of a broader [API gateway security](/learning-center/api-gateway-security/) strategy.

## Challenges of Implementing mTLS

### Certificate Lifecycle Management

Every client and server identity in an mTLS deployment needs a valid certificate with an issuance, renewal, and revocation process. As the number of workloads grows, manual certificate management becomes impractical. Tools such as cert-manager, HashiCorp Vault, and SPIFFE/SPIRE can automate parts of this lifecycle.

Production deployments should automate renewal and alert before expiration. Otherwise, an expired certificate can prevent a client or service from establishing new connections.

### Certificate Rotation

Short-lived certificates reduce the time a compromised credential remains usable but require reliable automated rotation. Longer-lived certificates reduce rotation frequency but increase exposure if a key is compromised. Choose a lifetime that matches the workload's risk and the recovery guarantees of the certificate-management system.

### Performance Considerations

mTLS adds computational work during the handshake and certificate validation. Services that create many new connections can therefore see more overhead than services that reuse connections. Connection pooling, persistent connections, and TLS session resumption can amortize or reduce repeated handshake work.

### Debugging and Observability

When mTLS connections fail, diagnosing the cause is harder than debugging standard TLS failures. Common failure modes include expired certificates, CA trust store mismatches, certificate revocation, and clock skew between endpoints. Structured logging of TLS handshake events, certificate serial numbers, and validation errors is essential for operational mTLS deployments.

## How to Configure mTLS in Apache APISIX

Apache APISIX supports mTLS at both the edge (between clients and APISIX) and internally (between APISIX and upstream services). Client-to-gateway authentication is configured on an SSL resource, while gateway-to-upstream authentication is configured on an upstream.

### Client-to-Gateway mTLS

To require client certificates for incoming connections, configure an SSL resource for the relevant SNI names and set `client.ca` to the CA certificate trusted for client authentication. `client.depth` controls the maximum verification depth. APISIX rejects a client that does not present a certificate that can be verified against the configured CA. See the [mTLS documentation](/docs/apisix/mtls/) for configuration examples.

### Gateway-to-Upstream mTLS

When an upstream service requires mTLS, configure its upstream with `tls.client_cert` and `tls.client_key`, or reference a client-type SSL resource with `tls.client_cert_id`. APISIX then presents that certificate when connecting to the upstream. This capability requires APISIX to run on APISIX-Runtime. The [upstream mTLS documentation](/docs/apisix/mtls/#mtls-between-apisix-and-upstream) covers the prerequisite and supported fields.

### Scope Client Certificate Verification

Client certificate verification is attached to the SSL resource selected by SNI, rather than to a Route `ssl` field. If specific URI patterns on that HTTPS virtual host must bypass client-certificate checking, configure `client.skip_mtls_uri_regex` on the SSL resource and keep the exception list as narrow as possible.

The [certificate guide](/docs/apisix/certificate/) explains how APISIX selects certificates by SNI and configures CA bundles. Certificate issuance and automated rotation remain the responsibility of the PKI or certificate-management system used by the deployment.

## mTLS Best Practices

1. **Automate certificate lifecycle.** Never rely on manual certificate issuance or renewal for production mTLS. Use cert-manager, Vault, or SPIRE.

2. **Limit certificate lifetime.** Use the shortest lifetime that the rotation and recovery process can support reliably, and rotate automatically before expiration.

3. **Separate CAs by trust domain.** Do not use the same CA for internal service certificates and external partner certificates. Maintain distinct trust hierarchies.

4. **Monitor certificate expiration.** Set alerting thresholds at 7 days, 3 days, and 1 day before expiration. Track certificate inventory centrally.

5. **Enable OCSP stapling.** Reduce certificate validation latency by stapling OCSP responses at the server rather than requiring clients to contact the CA's OCSP responder.

## FAQ

### What happens if a client certificate expires during an active mTLS connection?

Existing connections continue functioning until they are closed because TLS authentication occurs during the handshake, not continuously. However, any new connection attempt with the expired certificate will fail. This is why short-lived certificates combined with connection draining during rotation are important: they ensure that stale credentials are phased out promptly without disrupting in-flight requests.

### Is mTLS the same as two-way SSL?

Yes. "Two-way SSL," "mutual SSL," and "mutual TLS" all describe the same mechanism: both endpoints present and verify certificates. The terminology "mutual TLS" is preferred in modern usage because TLS superseded SSL over two decades ago, and all current implementations use TLS 1.2 or TLS 1.3 rather than any SSL version.

### Does mTLS replace the need for API keys or OAuth tokens?

No. mTLS authenticates the transport-layer identity (which machine or service is connecting), while API keys and OAuth tokens authenticate the application-layer identity (which user, application, or tenant is making the request). In a defense-in-depth strategy, mTLS and application-layer authentication serve complementary roles. mTLS ensures only authorized services can reach the endpoint; tokens and keys determine what those services are allowed to do.

### How does mTLS perform at scale in Kubernetes?

In Kubernetes environments, a service mesh or certificate controller can automate certificate issuance and rotation for workloads. Connection reuse limits repeated handshake work, but operators still need to monitor certificate expiration, CA availability, rotation failures, and the resource cost of the certificate-management control plane.
