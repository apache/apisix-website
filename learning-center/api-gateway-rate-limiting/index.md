# API Gateway Rate Limiting: Algorithms

> Understand gateway rate limiting, including token bucket, sliding window, leaky bucket, quotas, distributed counters, and client response guidance.

Source: https://apisix.apache.org/learning-center/api-gateway-rate-limiting/

API gateway rate limiting controls how many requests a client can make within a defined time window. Enforcing limits at the gateway protects backend services from overload, constrains abusive traffic, and gives consumers predictable usage boundaries. Apache APISIX provides dedicated [rate-limiting plugins and configuration examples](/docs/apisix/getting-started/rate-limiting/) for common gateway policies.

## What is Rate Limiting

Rate limiting enforces a maximum request rate or count for API consumers. When a client exceeds a configured limit, a gateway can return HTTP 429 (Too Many Requests) instead of forwarding the request. A server may include `Retry-After` when it can tell the client when to retry.

Rate limiting helps protect finite backend capacity from accidental loops, high-frequency polling, [credential attacks and other API security risks](/learning-center/api-gateway-security/), and traffic that exceeds the service's operating envelope.

Without rate limiting, a single misbehaving client can consume disproportionate backend resources, degrading performance for all consumers. Rate limiting is also a contractual tool: it can enforce usage tiers defined in [API monetization plans](/learning-center/api-monetization-guide/) and service agreements.

## Why Rate Limit at the Gateway

Implementing rate limiting at the API gateway rather than in individual services provides several structural advantages.

**Shared enforcement point.** Requests routed through the gateway can use the same throttling policy regardless of which upstream service handles them. This can reduce duplicated or inconsistent edge limits across a microservices fleet.

**Reduced backend load.** Rejected requests never reach the upstream service. This means the gateway absorbs the cost of excess traffic, keeping backend services operating within their designed capacity.

**Consistent client experience.** Centralized rate limiting can provide consistent HTTP 429 responses. Additional quota headers such as `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` are implementation-dependent and should be documented for clients.

**Operational visibility.** When access logs and metrics are configured, gateway-level rate limiting can expose rejected requests by route, consumer, or other configured key. Teams can use that evidence to investigate abusive clients, undersized quotas, and traffic anomalies.

## Rate Limiting Algorithms

The algorithms below describe common rate-limiting models. A gateway product may implement only some of them, and details such as queuing, counter storage, and boundary handling vary by implementation.

### Token Bucket

The token bucket algorithm maintains a bucket of tokens for each rate-limited entity. Tokens are added at a fixed rate up to a maximum capacity. Each request consumes one token. If the bucket is empty, the request is rejected.

Token bucket allows short bursts up to the bucket capacity while enforcing an average rate over time. This makes it well-suited for APIs where occasional traffic spikes are acceptable but sustained overuse is not.

**Pros:** Permits controlled bursting, simple to implement, low memory footprint.

**Cons:** Burst size must be tuned carefully; overly generous bursts can still overwhelm backends.

### Leaky Bucket

The leaky bucket algorithm processes requests at a fixed rate, queuing excess requests until the queue is full. It smooths traffic into a uniform output rate regardless of input burstiness.

Leaky bucket is ideal for backends that require strictly uniform request rates, such as third-party APIs with their own rate limits or services with fixed connection pools.

**Pros:** Produces a more uniform output rate and limits how much burst traffic is forwarded immediately.

**Cons:** Higher latency for bursty traffic due to queuing, queue size requires tuning.

### Sliding Window (Counter-Based)

A sliding window counter estimates usage over a rolling interval by combining the current window with a weighted portion of the previous window. This reduces the boundary spike possible with a fixed window without storing every request timestamp.

For example, if the window is 60 seconds and the current position is 40 seconds into the window, the algorithm weights 33% of the previous window's count and 100% of the current window's count to determine if the limit is exceeded.

**Pros:** Accurate rate enforcement without boundary spikes, reasonable memory usage.

**Cons:** Slightly more complex to implement than fixed window.

### Fixed Window

The fixed window algorithm divides time into non-overlapping intervals and counts requests within each interval. When the count exceeds the limit, subsequent requests are rejected until the next window begins.

Fixed window is the simplest algorithm but has a well-known boundary problem: a client can make double the intended rate by clustering requests at the end of one window and the beginning of the next. Despite this limitation, fixed window remains widely deployed due to its simplicity and low overhead.

**Pros:** Minimal memory and computation, easy to understand and debug.

**Cons:** Boundary burst problem allows temporary rate doubling.

### Algorithm Comparison

| Algorithm | Burst Handling | Output Smoothness | Memory | Complexity | Boundary Accuracy |
|-----------|---------------|-------------------|--------|------------|-------------------|
| Token Bucket | Allows controlled bursts | Moderate | Low | Low | N/A |
| Leaky Bucket | Queues bursts | Very smooth | Medium | Low | N/A |
| Sliding Window (Counter-Based) | Proportional smoothing | Smooth | Medium | Medium | High |
| Fixed Window | Boundary bursts possible | Low | Very low | Very low | Low |

## Rate Limiting Strategies

### Per-Consumer

Assign rate limits based on authenticated consumer identity. This is useful for APIs that provide different quotas or burst allowances to different consumer groups.

In APISIX, an authentication plugin can establish the Consumer before a rate-limiting plugin keys a policy on `consumer_name`. Rate-limiting plugins can also be attached to [Consumers](/docs/apisix/terminology/consumer/) or [Consumer Groups](/docs/apisix/terminology/consumer-group/) when that ownership model fits the policy.

### Per-IP

Throttle requests based on the client's source IP address. This can provide a coarse limit for unauthenticated public APIs, but an IP address is not a stable client identity and should not be treated as one.

Per-IP limiting has limitations in environments where many clients share a single IP (corporate NATs, mobile carriers). Use it as a coarse first defense layer, not as the sole rate limiting strategy.

### Per-Route

Apply different rate limits to different API endpoints based on their resource cost. A search endpoint that triggers expensive database queries might have a stricter limit than a simple metadata lookup. This strategy protects the most resource-intensive parts of your backend.

### Global

Enforce an aggregate rate limit across all consumers and routes. Global limits protect the overall system capacity and are typically set well above individual consumer limits. They serve as a safety net when the sum of individual limits exceeds actual infrastructure capacity.

## How Apache APISIX Implements Rate Limiting

Apache APISIX provides three complementary traffic-control plugins. They do not map one-to-one to every generic algorithm above: `limit-req` uses a leaky bucket, `limit-count` supports fixed and sliding windows, and `limit-conn` controls concurrency.

### limit-req (Request Rate Limiting)

The [limit-req plugin](/docs/apisix/plugins/limit-req/) implements a leaky bucket algorithm that controls the request rate per second. It accepts configuration for the sustained request rate (`rate`), the burst allowance (`burst`), and the rejection status code. Local policies maintain counters independently on each gateway node; Redis-backed policies can share rate limits across nodes.

This plugin is ideal when you need to smooth traffic to a uniform rate. It supports keying on remote address, consumer name, service, or any variable available in the APISIX context.

### limit-count (Request Count Limiting)

The [limit-count plugin](/docs/apisix/plugins/limit-count/) enforces a maximum number of requests within a configurable positive time window. It uses a fixed window by default and supports a sliding window through `window_type`.

limit-count is a good fit for implementing API quota plans (e.g., 10,000 requests per day). It returns rate limit headers by default so clients can track their remaining quota. For distributed deployments, limit-count supports shared counters through Redis so multiple gateway nodes can enforce the same quota. Redis-backed counting adds network and storage overhead, so benchmark it with the topology and traffic profile you plan to run.

### limit-conn (Concurrent Connection Limiting)

The [limit-conn plugin](/docs/apisix/plugins/limit-conn/) restricts concurrent requests by a configured key. Requests between `conn` and `conn + burst` can be delayed, while requests above that threshold can be rejected.

Concurrency limits can help protect upstreams with finite connection pools or workloads with long-lived requests. Choose thresholds from measured concurrency and latency rather than treating the plugin as a general request quota.

### Combining Plugins

APISIX allows stacking the three plugins on a route. A policy might combine `limit-count` for a longer quota window, `limit-req` for per-second smoothing, and `limit-conn` for concurrency caps.

Layering can be useful when an API has independent quota, burst, and concurrency requirements. Choose only the dimensions supported by measured backend capacity and consumer contracts.

Starting in APISIX 3.16, `limit-count` and `limit-conn` can define multiple rules, use expressions for selected thresholds, and compose keys from request variables. The [dynamic rate-limiting introduction](/blog/2026/04/14/apisix-3.16-dynamic-rate-limiting/) shows how these capabilities support different tiers and tenants without duplicating routes.

## FAQ

### What HTTP status code should I return for rate-limited requests?

Return HTTP 429 (Too Many Requests) as defined in RFC 6585. When the server can estimate an appropriate retry time, include a `Retry-After` header. APISIX rate-limiting plugins let operators configure the rejection status, and `limit-count` can return `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers so clients can track the configured quota.

### How do I handle rate limiting in a distributed gateway deployment?

Use a shared counter store such as Redis when gateway nodes need to enforce one shared policy. Current APISIX documentation describes Redis-backed policies for `limit-count`, `limit-req`, and `limit-conn`; local policies enforce counters independently on each node. The added network and storage overhead depends on Redis topology, load, and network conditions, so benchmark it in the intended deployment.

### Should I rate limit internal service-to-service traffic?

It can be useful when one service can exceed another service's measured capacity. Set internal limits from load tests and failure objectives rather than commercial quotas. Circuit breakers complement rate limiting by stopping or reducing requests when a downstream service is unhealthy.

### How do I communicate rate limits to API consumers?

Document rate limits, response behavior, and any implementation-specific quota headers in your API reference and onboarding materials. If consumers need current quota state, expose it through documented response fields, an endpoint, or a dashboard. For paid tiers, consider notifications when consumers approach their limits.
