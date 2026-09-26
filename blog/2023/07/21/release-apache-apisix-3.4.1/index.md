# Release Apache APISIX 3.4.1

> The Apache APISIX 3.4.0 version is released on July 21, 2023. This version fixes a security vulnerability in JWT.

Source: https://apisix.apache.org/blog/2023/07/21/release-apache-apisix-3.4.1/

We are pleased to present Apache APISIX 3.4.1 with a security patch for JWT.

<!--truncate-->

## Fix

### Upgrade `lua-resty-jwt` dependency version

Upgrade `lua-resty-jwt` dependency version from `0.2.4` to `0.2.5` to mitigate the risk of authentication bypass in APISIX `jwt-auth` plugin.

The issue is reported in [#9809](https://github.com/apache/apisix/issues/9809) and fixed in [PR #9837](https://github.com/apache/apisix/pull/9837).

## Changelog

Read the changelog of this release [here](https://github.com/apache/apisix/blob/release/3.4/CHANGELOG.md#341).
