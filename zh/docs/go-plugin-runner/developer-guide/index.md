# Developer Guide

Source: https://apisix.apache.org/zh/docs/go-plugin-runner/developer-guide/

## Overview

This documentation explains how to develop this project.

## Build

Run `make build`. Then you can run `APISIX_LISTEN_ADDRESS=unix:/tmp/runner.sock ./go-runner run`
to start it.

## Test

Run `make test`.
