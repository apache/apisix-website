# Release Apache APISIX 3.9.1

> The Apache APISIX 3.9.1 version is released on April 29, 2024. This release includes a bug fix.

Source: https://apisix.apache.org/blog/2024/04/29/release-apache-apisix-3.9.1/

We are glad to release Apache APISIX 3.9.1 with a bug fix to improve user experiences.

<!--truncate-->

## Bug Fix

### Fix `forward-auth` plugin timeout

Fix `forward-auth` plugin timeouts when the client request uses POST and auth service API expects GET. The error was caused by APISIX forwarding the POST request with headers like `Content-Type` and `Expect` to the auth service API expecting GET.

With the latest fix, APISIX only adds POST request headers if the plugin's `request_method` configuration is set to POST.

For more information, see [PR #11021](https://github.com/apache/apisix/pull/11021).

## Changelog

Visit [here](https://github.com/apache/apisix/blob/release/3.9/CHANGELOG.md#391) to see the changelog.
