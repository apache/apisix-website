---
title: Make your security policy auditable
authors:
  - name: Nicolas Fränkel
    title: Author
    url: https://github.com/nfrankel
    image_url: https://avatars.githubusercontent.com/u/752258
keywords:
  - Cross-cutting concerns
  - Architecture
  - Security
  - Spring Security
  - Solutions Architecture
description: >
  Last week, I wrote about putting the right feature at the right place. I used rate limiting as an example, moving it from a library inside the application to the API Gateway. Today, I'll use another example: authentication and authorization.
tags: [Ecosystem]
image: https://static.apiseven.com/uploads/2023/06/08/pzULiHZO_opa-horizontal-color.svg
---

>Last week, I wrote about [putting the right feature at the right place](https://blog.frankel.ch/right-feature-right-place/). I used rate limiting as an example, moving it from a library inside the application to the API Gateway. Today, I'll use another example: authentication and authorization.

<!--truncate-->

<head>
    <link rel="canonical" href="https://blog.frankel.ch/security-policy-auditable/" />
</head>

## Securing a Spring Boot application

I'll keep using Spring Boot in the following because I'm familiar with it. The Spring Boot application offers a REST endpoint to check employees' salaries.

The specific use case is taken from the Open Policy Agent site (more later):

>Create a policy that allows users to request their own salary as well as the salary of their direct subordinates.

We need a way to:

1. Authenticate an HTTP request as coming from a known user
2. Check whether the user has access to the salary data

In any other case, return a `401`.

I'll pass an authentication token in the request to keep things simple. I won't rely on a dedicated authentication/authorization backend, such as Keycloak, but it should be a similar approach if you do.

To enable Spring Security on the app, we need to add the Spring Boot Security Starter.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

We also need to enable Spring Security to work its magic:

```kotlin
@SpringBootApplication
@EnableWebSecurity
class SecureBootApplication
```

With those two steps in place, we can start securing the application according to the above requirement:

```kotlin
internal fun security() = beans {                                       //1
    bean {
        val http = ref<HttpSecurity>()
        http {
            authorizeRequests {
                authorize("/finance/salary/**", authenticated)          //2
            }
            addFilterBefore<UsernamePasswordAuthenticationFilter>(
                TokenAuthenticationFilter(ref())                        //3
            )
            httpBasic { disable() }
            csrf { disable() }
            logout { disable() }
            sessionManagement {
                sessionCreationPolicy = SessionCreationPolicy.STATELESS
            }
        }
        http.build()
    }
    bean { TokenAuthenticationManager(ref(), ref()) }                   //4
}
```

1. Use the Kotlin Beans DSL - because I can
2. Only allow access to the endpoint to authenticated users
3. Add a filter in the filter chain to replace regular authentication
4. Add a custom authentication manager

Requests look like the following:

```bash
curl -H 'Authorization: xyz'  localhost:9080/finance/salary/bob
```

The filter extracts from the request the necessary data used to decide whether to allow the request or not:

```kotlin
internal class TokenAuthenticationFilter(authManager: AuthenticationManager) :
    AbstractAuthenticationProcessingFilter("/finance/salary/**", authManager) {

    override fun attemptAuthentication(req: HttpServletRequest, resp: HttpServletResponse): Authentication {
        val header = req.getHeader("Authorization")                   //1
        val path = req.servletPath.split('/')                         //2
        val token = KeyToken(header, path)                            //3
        return authenticationManager.authenticate(token)              //4
    }

    // override fun successfulAuthentication(
}
```

1. Get the authentication token
2. Get the path
3. Wrap it under a dedicated structure
4. Try to authenticate the token

In turn, the manager tries to authenticate the token:

```kotlin
internal class TokenAuthenticationManager(
    private val accountRepo: AccountRepository,
    private val employeeRepo: EmployeeRepository
) : AuthenticationManager {
  override fun authenticate(authentication: Authentication): Authentication {
    val token = authentication.credentials as String? ?:                       //1
        throw BadCredentialsException("No token passed")
    val account = accountRepo.findByPassword(token).orElse(null) ?:            //2
        throw BadCredentialsException("Invalid token")
    val path = authentication.details as List<String>
    val accountId = account.id
    val segment = path.last()
    if (segment == accountId) return authentication.withPrincipal(accountId)   //3
    val employee = employeeRepo.findById(segment).orElse(null)                 //4
    val managerUserName = employee?.manager?.userName
    if (managerUserName != null && managerUserName == accountId)               //5
        return authentication.withPrincipal(accountId)                         //5
    throw InsufficientAuthenticationException("Incorrect token")               //6
  }
}
```

1. Get the authorization token passed from the filter
2. Try to find the account that has this token. For simplicity's sake, the token is stored in plain text without hashing
3. If the account tries to access its data, allow it
4. If not, we must load the hierarchy from another repo.
5. If the account attempts to access data from an employee they manage, allow it.
6. Else, deny it.

The whole flow can be summarized as the following:

![Spring Security Obfuscated Flow](http://www.plantuml.com/plantuml/svg/VL9DIyD04BtlhnXoKh6qYgVYHui6AuYLfj3pT3CbmNHtsGzh_VMwsOIbA-QGXFbuyzwRoSnOrDRj6uRSIWtEa0Oqa476k1HMomPGgJOrLofZ9LhSeY50pgKJreHI5yGwq5uryaWK6l8-oZnH_OcMMYxM4exkFSaKdlCrZ7UrGC5fRB11VHmVAXaXg1JpSde0huX_mDpPIkhw6sqjnMbpIQVOniARF0KyC0YsRqUZC5MJTLh0pUIAKME80NISlUSf5Fbh_hY62zWiybKEx_EYs2nNJt07Vbpax01XH628gI0kRUmrXemVDw0Fe5COSCk3WABTMy3zWxoUJ7mvOdk7yMf_BBxqvW2YmTZV5gBBD5_I02Ivvw8cZPfNnpFZjbANjK1BvX8Kskey4U1XAKLCXgKKSKgodC7r90iQEaBe5IMBN__sJw8gXk7th-gIO2UbtSelDli5k7tp0m00)

Now, we can try some requests.

```bash
curl -H 'Authorization: bob' localhost:9080/finance/salary/bob
```

`bob` asks for his own salary, and it works.

```bash
curl -H 'Authorization: bob' localhost:9080/finance/salary/alice
```

`bob` asks for the salary of one of his subordinates, and it works as well.

```bash
curl -H 'Authorization: bob' localhost:9080/finance/salary/alice
```

`alice` asks for her manager's salary, which is not allowed.

The code above works perfectly but has one big issue: there's no way to audit the logic. One must know Kotlin and how Spring Security works to ensure the implementation is sound.

## Introducing Open Policy Agent

Open Policy Agent, or OPA for short, describes itself as "Policy-based control for cloud native environments".

>Stop using a different policy language, policy model, and policy API for every product and service you use. Use OPA for a unified toolset and framework for policy across the cloud native stack.
>
>Whether for one service or for all your services, use OPA to decouple policy from the service's code so you can release, analyze, and review policies (which security and compliance teams love) without sacrificing availability or performance.
>
>-- [OPA Website](https://www.openpolicyagent.org/)

In short, OPA allows writing policies and offers a CLI and a daemon app to evaluate them.

You write policies in a specific interpreted language named [Rego](https://www.openpolicyagent.org/docs/latest/policy-language/), and I must admit it's not fun. Anyway, here's our above policy written in "clear" text:

```rego
package ch.frankel.blog.secureboot

employees := data.hierarchy                                 #1

default allow := false

# Allow users to get their own salaries.
allow {
    input.path == ["finance", "salary", input.user]         #2
}

# Allow managers to get their subordinates' salaries.
allow {
    some username
    input.path = ["finance", "salary", username]            #3
    employees[input.user][_] == username                    #3
}
```

1. Get the employee hierarchy somehow (see below)
2. If the account requests their salary, allow access
3. If the account requests the salary of a subordinate, allow access

I used two variables in the above snippet: `input` and `data`. `input` is the payload that the application sends to OPA. It should be in JSON format and has the following form:

```json
{
    "path": [
        "finance",
        "salary",
        "alice"
    ],
    "user": "bob"
}
```

## More Open Policy Agent goodness

However, OPA can't decide on the input alone, as it doesn't know the employee's hierarchy. One approach would be to load the hierarchy data on the app and send it to OPA. A more robust approach is to let OPA access external data to separate responsibilities cleanly. OPA offers [many options](https://www.openpolicyagent.org/docs/latest/external-data/) to achieve it. Here, I pretend to extract data from the `Employee` database, bundle it together with the policy file, serve the bundle via HTTP, and configure OPA to load it at regular intervals.

![Bundle refresh](http://www.plantuml.com/plantuml/svg/VLB1JiCm3BtdAwoUG6BZNb6q8are7DZ4E71D6tUDb3MLauwDhwTf6ZLK6wSwVlQpttDNndAotL4nNbfDW6TBFk86adLu9Knmomjk45gjP7aPuDqGHXWUMwKlYCPtXrV2IjrOqWfqomTekyiJLkYk4PnwhbOQUHw0lELbZP3lDllDLyHSzAKAMPR1YukcDHe1hWYop2cG9svn4i6KrYta5WWFdU84ih589wuCYvGkdaUs52gqPVqNcqJTWCCZXRVzzbrMbwc3mPMTGE2rR4pgV4f7pNT-juU9zNwYTOLnwzDYuNi9RKVDIE57nXqbeOizF9ljascewPFwXFHDqkADtR4HxZ8VM16QUYG85mb3_xc5Wzra_n-ayBh-X4VFOiRlqd9Q7duYvRwOZTzuSK8kFAUp8v1UiS93ONmmpelmhi-SdlleXCzIjHG8bTQsq6UswWkwe_e5)

Note that you shouldn't use Apache APISIX only to serve static files. But since I'll be using it in the next evolution of my architecture, I want to avoid having a separate HTTP server to simplify the system.

Now that we moved the decision logic to OPA, we can replace our code with a request to the OPA service. The new version of the authentication manager is:

```kotlin
internal class OpaAuthenticationManager(
    private val accountRepo: AccountRepository,
    private val opaWebClient: WebClient
) : AuthenticationManager {

    override fun authenticate(authentication: Authentication): Authentication {
        val token = authentication.credentials as String? ?:                       //1
            throw BadCredentialsException("No token passed")
        val account = accountRepo.findByPassword(token).orElse(null) ?:             //1
            throw BadCredentialsException("Invalid token")
        val path = authentication.details as List<String>
        val decision = opaWebClient.post()                                         //2
            .accept(MediaType.APPLICATION_JSON)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(OpaInput(DataInput(account.id, path)))                      //3
            .exchangeToMono { it.bodyToMono(DecisionOutput::class.java) }          //4
            .block() ?: DecisionOutput(ResultOutput(false))                        //5
        if (decision.result.allow) return authentication.withPrincipal(account.id) //6
        else throw InsufficientAuthenticationException("OPA disallow")             //6
    }
}
```

1. Keep the initial *authentication* logic
2. Replace the authorization with a call to the OPA service
3. Serialize the data to conform to the JSON input that the OPA policy expects
4. Deserialize the result
5. If something is wrong, the default should be to disallow
6. Abide by OPA's result

The flow is now the following:

![Spring Security flow with OPA](http://www.plantuml.com/plantuml/svg/VLB1RXCn4BtxAvxs18YGW3X551h12eHGKpMLUk7YsbDYuNeisqifNyzEt5ZPgirXlPetyzuRF_aq5vtASEkLDeKJXam9EgD3f-BOSSP57GfqZ3ju5MEdh2xwMcU2DeQ7K79jFHITCXnAOW-EUjTPdwywqNT_TA6TXP83iu-YkyJN_XBp6nTqC3JFskjqFx_RSgF8b1g_HZ1RCh-n6igMa_kdY-Cm7ROqvVg2CvuIFYdKstwOpQfgeZAaWFUBjufy9WLKptRD9JRzZ_xp9LxXwbj_qUDyjTbShI--u0GYrpptX2eX3eUGfQS6zpjMHEIEx0SyR0WSvlAB0YNH_RvPdy65E9GwSnY60DDy3dKuwYKo1VjYHtyvuKjN0FctuMPgoRZiE43UXlqPEDGLNYEoT-OUEbZ8stbQqz8Zg8KdTRl-tkLPZYzjvasYF8proOXwlfDGdutrtM8XxHRiyVW12bRLKxvfe59EdllMMS8DSxdcl-fq90ot_Zy0)

At this point, we moved the authorization logic from the code to OPA.

## Moving authentication to the API Gateway

The next and final step is to move the *authentication* logic The obvious candidate is the API Gateway since we set Apache APISIX in the previous step. In general, we should use the capabilities of the API Gateway as much as possible and fall back to libraries for the rest.

Apache APISIX has multiple authentication plugins available. Because I used a bearer token, I'll use [key-auth](https://apisix.apache.org/docs/apisix/plugins/key-auth/). Let's create our users, or in Apache APISIX terms, _consumers_:

```yaml
consumers:
  - username: alice
    plugins:
      key-auth:
        key:  alice
  - username: betty
    plugins:
      key-auth:
        key:  betty
  - username: bob
    plugins:
      key-auth:
        key:  bob
  - username: charlie
    plugins:
      key-auth:
        key:  charlie
```

Now, we can protect the Spring Boot upstream:

```yaml
routes:
  - uri: /finance/salary*
    upstream:
      type: roundrobin
      nodes:
        "boot:8080": 1
    plugins:
      key-auth:
        header: Authorization                    #1
      proxy-rewrite:
        headers:
          set:
            X-Account: $consumer_name            #2
```

1. Authenticate with `key-auth` and the `Authorization` header
2. Sets the consumer id in the `X-Account` HTTP header for the upstream

APISIX guarantees that requests that reach the Spring Boot app are authenticated. The code only needs to call the OPA service and follow the decision. We can entirely remove Spring Security and replace it with a *simple* filter:

```kotlin
bean {
    val repo = ref<EmployeeRepository>()
    router {
        val props = ref<AppProperties>()
        val opaWebClient = WebClient.create(props.opaEndpoint)
        filter { req, next -> validateOpa(opaWebClient, req, next) }
        GET("/finance/salary/{user_name}") {
          // ...
        }
    }
}

internal fun validateOpa(
    opaWebClient: WebClient,
    req: ServerRequest,
    next: (ServerRequest) -> ServerResponse
): ServerResponse {
    val httpReq = req.servletRequest()
    val account = httpReq.getHeader("X-Account")                           //1
    val path = httpReq.servletPath.split('/').filter { it.isNotBlank() }
    val decision = opaWebClient.post()                                     //2
        .accept(MediaType.APPLICATION_JSON)
        .contentType(MediaType.APPLICATION_JSON)
        .bodyValue(OpaInput(DataInput(account, path)))
        .exchangeToMono { it.bodyToMono(DecisionOutput::class.java) }
        .block() ?: DecisionOutput(ResultOutput(false))
    return if (decision.result.allow) next(req)
    else ServerResponse.status(HttpStatus.UNAUTHORIZED).build()
}
```

1. Get the account name from the API Gateway
2. Nothing changes afterward

The final flow is the following:

![Final flow without Spring Security](http://www.plantuml.com/plantuml/svg/TL5DJp8n4BxtLqpszBw921fFH0KEnk01IF3WmSlG3cwJqZRz4FZtbhBMtIpiORlppFEndPdwW2x4dMB8Wt4GFJb03nLKR6EY5kYEW5PwUSZmp2Al2MQh-Nh-KJ5kT7169OPjslOFD1Opk5pDgfEz_CP0EO7bcC5pupo6rvTt66wbHirfw56brE6-DaNL4DdvQ2inXffqa3onUdH1FGCLO652HoOc3CuNVnmCYh6Z49s6Xz4T8-M9GNhQyVRgNsTgAzWsMbk4NwJ9dPflw-K2fBOnN1O9kkPZB8x1anR_iln_Lv-w6KXd8PTGGJnTmsZOe2VngTDNzhW1QvJaHq0jG630ovw2UX1QcsUNwj_1bPIh6XKAvzQHZwb-IgWo-qacT7PYY-_zQ9JRPIbzNbbSvcd1pk_kC5jbDc2r50HROyB67DWq2U9E_G00)

## Conclusion

Everything looks like a nail when all you've got is a hammer. Developers' mighty hammer of choice is code. I've written tons of code to solve problems, and later on, I've used even more libraries to solve even more problems. As you evolve from developer to architect, you increase the number of tools you have. In this regard, code is only one tool among many. Your organization has many infrastructure tools you can leverage to develop solutions at minimal costs.

In this post, I've shown how you can leverage OPA and Apache APISIX to move your authentication and authorization logic from the code to the infrastructure. The former allows you to audit your security policies, the latter coherence among all your upstream across all tech stacks.

The complete source code for this post can be found on [GitHub](https://github.com/ajavageek/secure-boot).

**To go further:**

* [Spring Security](https://docs.spring.io/spring-security/reference/index.html)
* [Open Policy Agent](https://www.openpolicyagent.org/)
* [OPA Bundles](https://www.openpolicyagent.org/docs/latest/management-bundles/)
* [Rego playground](https://play.openpolicyagent.org/)
* [Spring Security Authorization with OPA](https://www.baeldung.com/spring-security-authorization-opa)
