# Release Apache APISIX 3.2.1

> The Apache APISIX 3.2.1 version is officially released on May 30. This version provides better user experience.

Source: https://apisix.apache.org/blog/2023/06/01/release-apache-apisix-3.2.1/

> APISIX 3.2.1 version is officially released, fixing many bugs and improving user experience.
<!--truncate-->

## bugfix

- Fix invalid cache in `core.request.add_header` [#8824](https://github.com/apache/apisix/pull/8824)
   > Provide a new implementation to avoid the problem that nginx built-in header variable cache is not refreshed

- Fix etcd data synchronization exception [#8493](https://github.com/apache/apisix/pull/8493)

- Fix high CPU usage and memory usage caused by healthcheck [#9016](https://github.com/apache/apisix/pull/9016)
   > Fix healthchecker leak problem created by `healthcheck.new` in create_checker if APISIX fails after `cancel_clean_handler`

- Prevent non-`127.0.0.0/24` requests from accessing Admin API with empty admin_key [#9146](https://github.com/apache/apisix/pull/9146)

- Fix the problem of batch-requests not reading trailer headers [#9289](https://github.com/apache/apisix/pull/9289)

If you are interested in the complete update details of the new release, please refer to the [CHANGELOG](https://github.com/apache/apisix/blob/master/CHANGELOG.md#bugfixes) of the 3.2.1 release.
