# Using an API Gateway for Secure Webhook Delivery

> Learn where an API gateway fits in a webhook architecture, from subscription and inbound security to retries, idempotency, and observability.

Source: https://apisix.apache.org/blog/2022/11/07/webhook-api-gateway-event-driven-apis/

Webhooks let an event producer notify a consumer by making an HTTP request to a callback URL. An API gateway can protect and route the HTTP-facing parts of that design, but it does not by itself provide durable event delivery, callback validation, retry scheduling, or idempotent processing. Those responsibilities need to be designed explicitly.

<!--truncate-->

## Why Use Webhooks Instead of Polling?

Polling asks an API repeatedly whether a resource has changed. It is straightforward, but frequent polls may return no new data and create unnecessary load. A webhook reverses the interaction: the producer sends an HTTP request when a relevant event occurs.

Common examples include:

- notifying a fulfillment service when an order is paid;
- updating a CRM integration after a customer record changes;
- telling a subscriber that a long-running job completed;
- triggering a deployment or automation workflow after a repository event.

Webhooks are appropriate when consumers can expose a reachable callback and tolerate asynchronous, at-least-once delivery. Polling or an event-streaming system may be a better fit when callbacks are not reachable, consumers need replay over a long history, or very high event volume requires a different delivery model.

## The Components of a Webhook System

A production design usually includes more than one HTTP endpoint:

1. **Subscription API:** registers the events and callback URL a consumer wants to receive.
2. **Event producer:** records a business event after the relevant state change succeeds.
3. **Delivery worker:** creates signed webhook requests, applies retry policy, and records delivery state.
4. **Consumer endpoint:** authenticates the request, deduplicates it, acknowledges receipt, and processes the event.
5. **API gateway:** can route and protect the subscription API, delivery API, or consumer endpoint, depending on which side of the integration you operate.

The gateway is an HTTP policy and traffic component. A durable queue, outbox, or delivery store is normally responsible for surviving process restarts and retrying events without losing them.

## Where an API Gateway Fits

### Protecting the subscription API

A gateway can authenticate subscribers, limit registration traffic, enforce request-size constraints, and route subscription requests to the application that owns subscriber data.

The application must still validate callback URLs. In particular, prevent server-side request forgery by rejecting unsupported schemes, credentials in URLs, local and link-local addresses, and destinations that resolve to protected networks. Revalidate DNS resolution at delivery time when the threat model requires it, and control redirects rather than following them blindly.

### Receiving inbound webhooks

When your system consumes webhooks, the gateway can terminate TLS, restrict request size, apply source controls where appropriate, and route events to the correct receiver. Authentication depends on the provider: it may use an HTTP signature, a shared secret, mTLS, an OAuth token, or another documented mechanism.

Do not assume that IP allowlists alone authenticate a sender, or that every provider signs requests the same way. Signature verification often depends on the exact raw request body and provider-specific timestamp rules. If a gateway plugin transforms the body before verification, the signature check can fail or verify the wrong representation.

### Sending outbound webhooks

An outbound delivery service can use a gateway as a controlled egress point for TLS policy, destination policy, telemetry, and network routing. The gateway does not automatically decide which events to send, persist them, or retry them safely. Keep those responsibilities in the producer, outbox, queue, and delivery worker.

## Subscription Flow

A safe subscription flow can follow these steps:

1. The consumer authenticates to the subscription API.
2. The application authorizes the requested event types and tenant.
3. The callback URL passes syntax, scheme, destination, and ownership checks.
4. The producer stores a subscription identifier and a protected signing secret or public-key association.
5. If ownership verification is required, the system sends a challenge and activates the subscription only after the correct response.
6. The API returns the subscription state without exposing secret material.

Rate limits at the gateway can reduce abuse, but business rules such as which tenant may subscribe to which account belong in the subscription service.

## Delivery Flow

When the source transaction commits, record the event in a durable outbox or publish it to a durable broker. A delivery worker then:

1. assigns a stable event or delivery identifier;
2. serializes the documented payload;
3. creates the authentication signature or credential;
4. sends the request with a bounded connection and response timeout;
5. records the response and schedules a retry when the policy permits;
6. moves repeatedly failing deliveries to a bounded failure state for investigation or replay.

Avoid sending the callback synchronously inside the source transaction. A slow or unavailable consumer should not hold open the user-facing request that produced the event.

## Security Controls

### Authenticate every delivery

Use the mechanism documented by the provider or define a clear signing scheme for your own webhooks. A typical signature design includes the raw body, a timestamp, and a delivery identifier, and uses a current secret or private key. The consumer should compare signatures in constant time and reject timestamps outside a configured tolerance.

### Prevent replay

A timestamp limits how long a captured request remains useful. Store recently accepted delivery identifiers so a repeated valid request is not processed twice. The retention period should cover the sender's maximum retry window.

### Protect secrets and logs

Store webhook secrets in protected secret storage, limit access, and support rotation with a short, auditable overlap. Redact authorization headers, signatures, tokens, and sensitive payload fields from gateway and application logs.

### Treat callback destinations as untrusted input

Callback URLs can be used to probe internal services or cloud metadata endpoints. Apply destination policy before each delivery, restrict ports and schemes, use controlled egress, and set conservative timeouts and response-size limits.

## Reliability and Idempotency

Webhook delivery is commonly at least once: a consumer can process an event and then fail before its acknowledgement reaches the sender. The sender sees a timeout and retries, so the consumer receives a duplicate.

Design the handler to be idempotent:

- use the stable event identifier as a deduplication key;
- make state transitions conditional on the current state;
- protect deduplication records with an atomic insert or equivalent constraint;
- retain records for at least the documented retry period.

Retry only operations and status classes allowed by your contract. Use exponential backoff with jitter, a maximum attempt count, and a maximum delivery age. Honor `Retry-After` when the receiver uses it and your policy permits. Do not retry permanent authentication, validation, or destination-policy failures indefinitely.

Consumers should acknowledge only after the event has been durably accepted. If processing is slow, enqueue the event and return a success response after that durable handoff rather than keeping the HTTP request open.

## Observability

Track delivery outcomes without exposing sensitive payloads. Useful dimensions include:

- subscription and event type;
- attempt count and delivery age;
- destination class or tenant, with cardinality controls;
- response status, timeout, and policy rejection;
- queue delay and failure-state volume.

Propagate a correlation identifier from the event record through the gateway and delivery worker. Alert on sustained failure rates and growing queue age, not on a single transient retry.

## Using Apache APISIX

[Apache APISIX](https://apisix.apache.org/) can route webhook HTTP endpoints and apply plugins for authentication, traffic control, observability, request restrictions, and other gateway policies. Select and test policies for the exact inbound or outbound flow; not every responsibility described above belongs in APISIX.

For example, APISIX can expose `/webhooks/{provider}` routes to receiver services and apply per-route size limits and telemetry. The receiver should still perform provider-specific signature and replay checks unless a verified plugin implements that exact scheme. Likewise, a durable event store and delivery worker should own outbound retries and idempotency.

Review available [APISIX plugins](https://apisix.apache.org/docs/apisix/plugins/) and keep custom plugins small, bounded, and outside the durable workflow state machine.

## Frequently Asked Questions

### Is a webhook the same as an event stream?

No. A webhook pushes an HTTP request to a callback. An event stream or broker usually provides different retention, ordering, replay, and consumer coordination capabilities. They can be used together: a broker stores events while a worker delivers selected events as webhooks.

### Can an API gateway guarantee webhook delivery?

No. A gateway can route and observe an HTTP attempt, but durable delivery requires persisted event state, retry scheduling, and a defined failure/replay process.

### Should a webhook return `200` immediately?

Return a documented success status only after the event is authenticated and durably accepted. Long processing should usually happen asynchronously. Returning success before durable acceptance can lose events; waiting for all business processing can cause unnecessary retries.

### Are webhook retries safe?

Only when the sender uses bounded retry rules and the consumer processes repeated event identifiers idempotently. Network timeouts make duplicate delivery normal, not exceptional.

## Conclusion

An API gateway is useful at the HTTP boundary of a webhook system: it can secure, limit, observe, and route subscription and delivery traffic. Durable events, callback validation, authentication semantics, retries, and idempotent processing require application and messaging components with explicit ownership.

Design those responsibilities first, then apply gateway policies that reinforce the design without hiding or duplicating the delivery state machine.
