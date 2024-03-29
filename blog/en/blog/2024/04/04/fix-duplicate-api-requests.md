---
title: Fixing duplicate API requests
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - APISIX
  - Idempotency
  - IETF
  - specification
description: >
  The first rule of distributed systems is "Don’t distribute your system". Designing distributed systems right is infamously hard for multiple reasons.
tags: [Community]
image: https://static.apiseven.com/uploads/2024/03/28/XObjRS46_stormtrooper-2899993.jpg
---

<head>
    <link rel="canonical" href="https://blog.frankel.ch/fix-duplicate-api-requests/" />
</head>

>The first rule of distributed systems is "Don’t distribute your system". Designing distributed systems right is infamously hard for multiple reasons.

<!--truncate-->

## The idempotency concept

For example, a call to a function can succeed or fail in non-distributed systems. Once you move the called function to a remote component, a third option appears: you call the remote function but get no response from the component. At this point, it’s impossible to know whether the call reached the component or not, *i.e.*, whether the problem occurred on the way to or the way back.

The only choice is to resend the request again. It’s a non-issue for reads; for calls that update the remote state, it’s "complicated." We need to describe the concept of *idempotence*:
>Idempotence is the property of certain operations in mathematics and computer science whereby they can be applied multiple times without changing the result beyond the initial application.
>
>—- [Idempotence on Wikipedia](https://en.wikipedia.org/wiki/Idempotence)

In the realm of HTTP APIs:

* `GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`, and `TRACE` are idempotent. For example, if you repeatedly delete an entity from the system, whether the said entity exists or not, the end state will be the same: there will be no entity.
* **`POST` and `PATCH` are not idempotent**. For example, posting multiple times a new entity will create that many new entities.

## A possible solution

Imagine that the client sending a request sends a unique key along. The server keeps track of key-request pairs. Overall, two things can happen:

* The server already has a record of such a pair and discards the request
* The server has no such previous record and stores the pair

It’s precisely the idea behind the IETF specification [The Idempotency-Key HTTP Header Field](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header-04). The `Idempotency-Key` HTTP header’s value is a string; the specification uses a UUID as an example. It’s the client’s responsibility to generate such a value, which must be unique.

The spec describes the following flow:

![Sequence diagram of the Idempotency Key](https://static.apiseven.com/uploads/2024/03/29/tZPye2d3_idempotency-key-sequence.png)

The specification mentions the server can optionally fingerprint the request, *i.e.*, hash it, and store the hash instead.

## Error scenarios

The nominal path is pretty straightforward, but the specification also defines three possible error scenarios that can happen.

Here they are:

* The request doesn't provide the idempotency key for a documented idempotent operation requiring this header/400:

    ```
    HTTP/1.1 400 Bad Request
    Content-Type: application/problem+json
    Content-Language: en
    {
      "type": "https://developer.example.com/idempotency",
      "title": "Idempotency-Key is missing",
      "detail": "This operation is idempotent and it requires correct usage of Idempotency Key.",
    }
    ```

* Attempt to reuse an idempotency key with a different request payload/422:

    ```
    HTTP/1.1 422 Unprocessable Content
    Content-Type: application/problem+json
    Content-Language: en
    {
      "type": "https://developer.example.com/idempotency",
      "title": "Idempotency-Key is already used",
      "detail": "This operation is idempotent and it requires
      correct usage of Idempotency Key. Idempotency Key MUST not be
      reused across different payloads of this operation.",
    }
    ```

* Request is retried while the original request is still being processed/409:

    ```
    HTTP/1.1 409 Conflict
    Content-Type: application/problem+json
    Content-Language: en
    {
      "type": "https://developer.example.com/idempotency",
      "title": "A request is outstanding for this Idempotency-Key",
      "detail": "A request with the same Idempotency-Key for the
                 same operation is being processed or is outstanding."
    }
    ```

## Conclusion

Distributed systems are complex in part because if a call to a remote component times out, it’s impossible to know whether it reached the said component. The only option is to repeat the call, but we risk executing a non-idempotent operation twice. In the realm of APIs, we can rely on the `Idempotency-Key` HTTP Header, an IETF specification currently in draft.

From an architect’s point of view, it makes sense to factor the behavior described in the above sequence diagram into a component, *i.e.*, an API Gateway. In a future post, I’ll try implementing the behavior in Apache APISIX.

**To go further:**

* [Idempotency-Key HTTP Header Field](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header-04)
