# Release Apache APISIX 3.14.1

> The Apache APISIX 3.14.1 version is released on Oct 17, 2025. This release includes a bug fix.

Source: https://apisix.apache.org/blog/2025/10/17/release-apache-apisix-3.14.1/

We are glad to release Apache APISIX 3.14.1 with a bug fix to improve user experiences.

<!--truncate-->

## Bug Fix

### Port conflict in worker process for prometheus

Fix an issue where the Prometheus server could sometimes fail to start due to port conflicts when running in worker processes. The fix enables port reuse for the Prometheus server, ensuring reliable startup even during restarts.

For more information, see [PR #12667](https://github.com/apache/apisix/pull/12667).

## Other Update

* Add warning log when skipping schema checks for disabled plugins (PR [#12655](https://github.com/apache/apisix/pull/12655))

## Changelog

For a complete list of changes in this release, please see [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#3141).
