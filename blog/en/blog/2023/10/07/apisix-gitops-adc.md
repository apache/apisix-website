---
title: "Manage APISIX Declarative Configuration with ADC and GitOps"
authors:
  - name: Jintao Zhang
    title: Author
    url: https://github.com/tao12345666333
    image_url: https://avatars.githubusercontent.com/u/3264292?v=4
  - name: Yilia Lin
    title: Technical Writer
    url: https://github.com/Yilialinn
    image_url: https://avatars.githubusercontent.com/u/114121331?v=4
keywords:
  - Open Source
  - API Gateway
  - Apache APISIX
  - GitOps
  - ADC
  - Declarative Configuration
description: "Use ADC lint, diff, sync, dump, and OpenAPI conversion commands in a reviewed GitOps workflow for Apache APISIX configuration."
tags: [Community]
image: https://static.apiseven.com/2022/10/19/634f6677742a1.png
---

ADC is a command-line tool for managing API gateway configuration declaratively. With Apache APISIX, teams can keep intended routes, services, upstreams, and other supported resources in version control, review changes, compare them with a target gateway, and synchronize an approved file.

<!--truncate-->

ADC helps automate a workflow, but installing a CLI does not make the workflow GitOps by itself. A production design still needs review, protected credentials, environment promotion, drift policy, verification, and rollback procedures.

## What Declarative Gateway Configuration Changes

An imperative workflow sends a sequence of create, update, and delete requests. The history may show what commands ran, but it can be difficult to see the intended final state.

A declarative workflow stores the desired state in a file and asks a tool to compare or reconcile that state with a target system. This can improve:

- **reviewability:** a pull request shows the intended configuration change;
- **repeatability:** the same approved input can be evaluated in another environment;
- **traceability:** commits connect a configuration version to its reviewer and deployment;
- **drift detection:** a diff can reveal changes made outside the controlled workflow;
- **recovery:** an earlier reviewed configuration is available as a rollback candidate.

These properties depend on repository controls and deployment discipline. A declarative file can still contain an unsafe route, and synchronizing an old file can remove a valid production change.

## What ADC Provides

The current ADC command set includes workflows for:

- `adc lint` — check a declarative file before deployment;
- `adc diff` — compare a local file with the configured gateway;
- `adc sync` — synchronize the local desired state;
- `adc dump` — export supported configuration from the gateway;
- `adc convert openapi` — convert an OpenAPI document to declarative gateway configuration;
- `adc ping` — verify that ADC can connect to the configured server.

Use `adc --help` and the [official ADC repository](https://github.com/api7/adc) for the exact flags supported by the installed release. Pin and test a tool version in automation rather than silently changing behavior when a new release becomes available.

## Install ADC

The official installation script is:

```shell
curl -sL "https://run.api7.ai/adc/install" | sh
```

Downloading and executing a remote script is a trust decision. In a controlled environment, inspect the installer, verify the downloaded artifact according to your supply-chain policy, and pin the version used by CI.

Confirm that the command is available:

```shell
adc --help
```

## Configure a Target Securely

ADC reads connection settings from environment variables. For an APISIX target, configure the server and credential according to the current ADC documentation:

```shell
export ADC_SERVER="https://gateway-admin.example.com"
export ADC_TOKEN="<token-from-secret-store>"

adc ping
```

Do not commit `ADC_TOKEN`, print it in CI logs, or expose the APISIX Admin API to the public internet. Retrieve credentials from the CI platform's protected secret store, restrict network access to the administrative endpoint, and grant only the access required for the deployment job.

ADC also supports a backend selection for supported non-default targets, such as `ADC_BACKEND=api7ee` for the documented API7 Enterprise workflow. Do not copy a backend setting between products without checking the current tool documentation.

## Create a Baseline

If a gateway already has configuration, export the supported state with resource IDs to start a reviewed baseline:

```shell
adc dump --with-id -o adc.yaml
```

For an existing gateway, `--with-id` is important: without stable IDs, a later synchronization can treat exported resources as new objects, delete and recreate them, and break references or traffic. Review the exported file before treating it as the source of truth. Remove environment-specific or sensitive values according to the resource schema and your secret-management design. An export is a snapshot, not proof that every existing policy is correct.

Commit the reviewed baseline only after confirming that:

- the file contains the intended resources;
- secret material is not stored in plaintext;
- identifiers and references are stable across environments or templated safely;
- synchronizing the file in a disposable environment produces the expected state.

## Validate and Compare a Change

After editing `adc.yaml`, run a local check:

```shell
adc lint -f adc.yaml
```

Linting detects supported structural problems; it cannot prove that upstream addresses, authentication design, traffic limits, or business behavior are correct.

Compare the proposed file with the configured target:

```shell
adc diff -f adc.yaml
```

Review additions, changes, and deletions carefully. A deletion may be intentional, or it may mean that the desired-state file is incomplete. Treat unexpected drift as an investigation, not an automatic reason to overwrite production.

## Synchronize Approved Configuration

After review and environment-specific checks, synchronize the file:

```shell
adc sync -f adc.yaml
```

Run synchronization from a single controlled job for each target. Concurrent writers—CI jobs, manual Admin API changes, dashboards, and other controllers—can race or continually overwrite one another. Define which system owns each resource and how emergency changes are reconciled back into version control.

After synchronization, verify both configuration and behavior:

```shell
adc diff -f adc.yaml
```

Also run route-level smoke tests and observe error rate, latency, and upstream health. A zero configuration diff does not prove that the deployed routes work.

## Convert an OpenAPI Document

ADC can create a starting configuration from an OpenAPI document:

```shell
adc convert openapi -f openapi.yaml -o adc.yaml
```

Review the generated file. An OpenAPI document describes an HTTP interface, but it normally does not contain every gateway concern, such as upstream discovery, production credentials, consumer policy, rate-limit capacity, or observability requirements. Conversion is a bootstrap step, not an automatic production deployment.

## A Safe GitOps Pipeline

A minimal pipeline can use the following stages.

### 1. Pull-request checks

- validate YAML and repository conventions;
- run `adc lint` on every changed declarative file;
- reject embedded secrets;
- apply policy checks for administrative exposure, unauthenticated routes, wildcard hosts, and unbounded traffic where appropriate;
- require review from the service owner and gateway platform owner for sensitive changes.

### 2. Disposable-environment test

Synchronize the change to a non-production gateway, then run authentication, routing, timeout, and negative tests. Test deletion and rollback paths as well as successful creation.

### 3. Target diff

Run `adc diff` against the intended environment immediately before deployment. Store a redacted diff as deployment evidence and stop on unreviewed destructive changes.

### 4. Controlled synchronization

Use protected environments, one writer, a pinned ADC version, short-lived credentials where available, and an auditable approval. Do not pass secrets as command-line arguments that may be captured in process or job logs.

### 5. Post-deployment verification

Confirm the target diff, run smoke tests, monitor key traffic indicators, and associate the deployment with the source commit. Roll back only after evaluating whether the previous file remains compatible with current upstream services.

## Environment Promotion

Avoid maintaining unrelated copies of a large configuration file for development, staging, and production. Choose a controlled strategy such as:

- a shared base plus small reviewed environment overlays;
- generated environment files from a typed source and validated templates;
- separate directories with automated structural comparison.

Keep secrets outside the declarative source and resolve them through supported secret references or the deployment environment. Ensure the rendered artifact being synchronized is reviewable and retained as deployment evidence without secret values.

## Drift and Emergency Changes

Decide in advance how to handle a manual emergency edit:

1. record who made it, why, and which resource changed;
2. export or inspect the resulting state;
3. reconcile the intended change into version control promptly;
4. verify that the next synchronization will not remove the emergency fix accidentally.

Blindly running `adc sync` on a timer can hide ownership problems and repeatedly revert another authorized controller. Alert on drift first; reconcile automatically only when the resource ownership and desired state are unambiguous.

## Frequently Asked Questions

### Is APISIX standalone mode the same as ADC?

No. Standalone mode is an APISIX deployment/configuration mode using a local YAML configuration source. ADC is a separate CLI that compares and synchronizes supported declarative resources with a configured backend. Choose the model that fits the deployment architecture and do not let multiple writers own the same resources.

### Does `adc lint` guarantee a safe production change?

No. It checks supported file rules. Security, upstream reachability, capacity, compatibility, and deletion impact require policy and integration tests.

### Should CI automatically synchronize every merged change?

Only if the repository, approval, credential, environment, and rollback controls justify it. Sensitive production environments may require a protected deployment approval even after the source pull request is merged.

### Can ADC eliminate configuration drift?

It can show and reconcile supported differences. Preventing repeated drift requires clear ownership and removing uncontrolled writers, not only running another synchronization.

## Conclusion

ADC provides useful primitives for a declarative APISIX workflow: export, lint, compare, synchronize, convert, and test connectivity. A reliable GitOps process combines those commands with protected secrets, review, one-writer ownership, environment testing, drift handling, and post-deployment verification.

Keep the desired state auditable, treat every unexpected deletion as a risk, and make the synchronized artifact—not an operator's workstation—the reproducible input to the gateway deployment.
