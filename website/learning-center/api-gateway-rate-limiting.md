---
title: "API Gateway Rate Limiting: Algorithms"
description: "Understand gateway rate limiting, including token bucket, sliding window, leaky bucket, quotas, distributed counters, and client response guidance."
slug: api-gateway-rate-limiting
date: 2026-04-14
tags: [rate-limiting, traffic-control, api-gateway]
hide_table_of_contents: false
---

API gateway rate limiting controls how many requests a client can make within a defined time window. Enforcing limits at the gateway protects backend services from overload, constrains abusive traffic, and gives consumers predictable usage boundaries. Apache APISIX provides dedicated [rate-limiting plugins and configuration examples](/docs/apisix/getting-started/rate-limiting/) for common gateway policies.

## What is Rate Limiting

Rate limiting enforces a maximum request rate or count for API consumers. When a client exceeds a configured limit, a gateway can return HTTP 429 (Too Many Requests) instead of forwarding the request. A server may include `Retry-After` when it can tell the client when to retry.

Rate limiting helps protect finite backend capacity from accidental loops, high-frequency polling, credential attacks, and other traffic that exceeds the service's operating envelope.

Without rate limiting, a single misbehaving client can consume disproportionate backend resources, degrading performance for all consumers. Rate limiting is also a contractual tool: it enforces the usage tiers defined in API monetization plans and SLAs.

## Why Rate Limit at the Gateway

Implementing rate limiting at the API gateway rather than in individual services provides several structural advantages.

**Shared enforcement point.** Requests routed through the gateway can use the same throttling policy regardless of which upstream service handles them. This can reduce duplicated or inconsistent edge limits across a microservices fleet.

**Reduced backend load.** Rejected requests never reach the upstream service. This means the gateway absorbs the cost of excess traffic, keeping backend services operating within their designed capacity.

**Consistent client experience.** Centralized rate limiting can provide consistent HTTP 429 responses. Additional quota headers such as `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` are implementation-dependent and should be documented for clients.

**Operational visibility.** Gateway-level rate limiting produces unified metrics on throttled requests, enabling operations teams to identify abusive clients, undersized quotas, and traffic anomalies from a single dashboard.

## Rate Limiting Algorithms

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

### Sliding Window

The sliding window algorithm divides time into overlapping windows and counts requests across the current and previous windows using weighted proportions. This eliminates the boundary problem inherent in fixed windows.

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
| Sliding Window | Proportional smoothing | Smooth | Medium | Medium | High |
| Fixed Window | Boundary bursts possible | Low | Very low | Very low | Low |

## Rate Limiting Strategies

### Per-Consumer

Assign rate limits based on authenticated consumer identity. This is the most common strategy for APIs with tiered pricing plans. A free tier consumer might receive 100 requests per minute while a paid enterprise consumer receives 10,000.

Per-consumer rate limiting requires the rate limiting plugin to execute after authentication so the consumer identity is available. APISIX's consumer abstraction makes this straightforward: attach rate limit configurations directly to consumer definitions.

### Per-IP

Throttle requests based on the client's source IP address. This strategy is effective for public APIs that do not require authentication, such as health check endpoints or public data feeds. IP-based rate limiting is a practical first line of defense against volumetric API abuse, especially when combined with reputation scoring.

Per-IP limiting has limitations in environments where many clients share a single IP (corporate NATs, mobile carriers). Use it as a coarse first defense layer, not as the sole rate limiting strategy.

### Per-Route

Apply different rate limits to different API endpoints based on their resource cost. A search endpoint that triggers expensive database queries might have a stricter limit than a simple metadata lookup. This strategy protects the most resource-intensive parts of your backend.

### Global

Enforce an aggregate rate limit across all consumers and routes. Global limits protect the overall system capacity and are typically set well above individual consumer limits. They serve as a safety net when the sum of individual limits exceeds actual infrastructure capacity.

## How Apache APISIX Implements Rate Limiting

Apache APISIX provides three complementary rate limiting plugins, each targeting a different dimension of traffic control.

### limit-req (Request Rate Limiting)

The [limit-req plugin](/docs/apisix/plugins/limit-req/) implements a leaky bucket algorithm that controls the request rate per second. It accepts configuration for the sustained request rate (`rate`), the burst allowance (`burst`), and the rejection status code.

This plugin is ideal when you need to smooth traffic to a uniform rate. It supports keying on remote address, consumer name, service, or any variable available in the APISIX context.

### limit-count (Request Count Limiting)

The [limit-count plugin](/docs/apisix/plugins/limit-count/) enforces a maximum number of requests within a configurable time window. It supports both fixed window and sliding window algorithms, with the window size configurable from one second to one day.

limit-count is a good fit for implementing API quota plans (e.g., 10,000 requests per day). It returns rate limit headers so clients can track their remaining quota. For distributed deployments, limit-count supports shared counters through Redis so multiple gateway nodes can enforce the same quota. Redis-backed counting adds network and storage overhead, so benchmark it with the topology and traffic profile you plan to run.

### limit-conn (Concurrent Connection Limiting)

The [limit-conn plugin](/docs/apisix/plugins/limit-conn/) restricts the number of concurrent requests being processed simultaneously. Unlike rate-based limits, connection limits protect against slow-client attacks and long-running requests that tie up backend connections.

This plugin is essential for APIs that serve large file downloads, streaming responses, or long-polling connections. It works by counting active connections per key and rejecting new connections when the limit is exceeded.

### Combining Plugins

APISIX allows stacking all three plugins on a single route. A typical production configuration might combine limit-count for daily quotas, limit-req for per-second smoothing, and limit-conn for concurrent connection caps. The plugins execute in order, and a request rejected by any plugin does not consume quota in subsequent plugins.

Layering can be useful when an API has independent quota, burst, and concurrency requirements. Choose only the dimensions supported by measured backend capacity and consumer contracts.

## FAQ

### What HTTP status code should I return for rate-limited requests?

Return HTTP 429 (Too Many Requests) as defined in RFC 6585. When the server can estimate an appropriate retry time, include a `Retry-After` header. APISIX's limit-count plugin can also return `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` headers so clients can track the configured quota.

### How do I handle rate limiting in a distributed gateway deployment?

Use a shared counter store such as Redis when gateway nodes need to enforce one shared quota. APISIX's limit-count plugin supports Redis and Redis Cluster policies for distributed counters. The added network and storage overhead depends on Redis topology, load, and network conditions, so benchmark it in the intended deployment.

### Should I rate limit internal service-to-service traffic?

It can be useful when one service can exceed another service's measured capacity. Set internal limits from load tests and failure objectives rather than commercial quotas. Circuit breakers complement rate limiting by stopping or reducing requests when a downstream service is unhealthy.

### How do I communicate rate limits to API consumers?

Document rate limits, response behavior, and any implementation-specific quota headers in your API reference and onboarding materials. If consumers need current quota state, expose it through documented response fields, an endpoint, or a dashboard. For paid tiers, consider notifications when consumers approach their limits.

## Related

- [What is an API gateway?](/learning-center/what-is-an-api-gateway/)
- [API gateway security](/learning-center/api-gateway-security/)
- [Get started with Apache APISIX](/docs/apisix/getting-started/)
