---
title: "The Flame Graph Did Not Lie, but It Did Not Reveal the Bottleneck: Debugging an APISIX Throughput Regression"
authors:
  - name: "Xin Rong"
    title: "Author"
    url: "https://github.com/AlinsRan"
    image_url: "https://github.com/AlinsRan.png"
  - name: "Yilia Lin"
    title: "Technical Writer"
    url: "https://github.com/Yilialinn"
    image_url: "https://github.com/Yilialinn.png"
keywords:
  - Apache APISIX
  - flame graph
  - LuaJIT
  - performance optimization
  - throughput regression
description: Debugging an APISIX throughput regression with a complete evidence chain—from CPU saturation and flame-graph call stacks to LuaJIT compilation events, per-request call counts, and paired A/B tests.
tags: [Ecosystem]
---

A throughput regression investigation revealed that the widest path in the flame graph explained a substantial cost, but not the entire regression. The two locations that proved worth investigating accounted for only 3.0% and 3.9% of the Lua samples. Ranked purely by hotspot size, neither would have made the first optimization shortlist.

<!--truncate-->

The most valuable outcome of this investigation was not any single patch, but the chain of evidence: first confirm that the CPU is genuinely the bottleneck; inspect flame-graph widths horizontally to establish candidates; follow the call stacks vertically to see how repeated calls and shared paths amplify cost; when the flame graph cannot explain the end-to-end gap, inspect LuaJIT compilation and abort events; and finally quantify the effect through per-request call counts and paired A/B tests.

> **Data scope:** Except for the public PR #13779 A/B results cited later, the internal data below comes from one custom APISIX build running in the same controlled environment, with more than 100 plugins loaded. Internal throughput is normalized and is used only to illustrate the diagnostic method and causal chain. It does not represent the general performance of Apache APISIX OSS under other hardware, configurations, or workloads. The repeated cross-phase Global Rule filtering investigated here was fixed in [Apache APISIX 3.18.0](https://apisix.apache.org/blog/2026/08/20/release-apache-apisix-3.18.0/); the article records the pre-fix investigation and should not be read as describing the current release.

## 1. Confirm a CPU Bottleneck Before Looking at a Flame Graph

A flame graph shows what the CPU was executing during the sampling window. Its width can explain a performance regression only when the target worker's CPU is close to saturation and throughput is constrained by that core.

Before sampling, we fixed the following conditions:

- APISIX ran with a single worker pinned to a dedicated physical core.
- The upstream service and load generator ran on other cores to avoid CPU contention.
- The request model, configuration, and response content remained unchanged.
- The throughput regression was consistently reproducible, with no change in error rate or response results.
- The target worker remained close to saturation, while the upstream service, network, and load generator still had spare capacity.

If these prerequisites are not met, investigate connections, the network, the upstream service, or the load generator first instead of searching for answers in an on-CPU flame graph.

## 2. Read Width Horizontally, Not Rank

We used eBPF to collect C and Lua call stacks simultaneously at 500 Hz. The following is the actual Lua on-CPU flame graph from the investigation.

<!-- TODO: Insert the original full Lua on-CPU flame graph (Figure 1). -->

Figure 1: Global view of the actual flame graph. Searching for `run_global_rules` produced three matches, none of which stood out in the full graph. The original profile contained 2,446 samples; process PIDs were removed from the screenshot. Click the image to view it at full size.

When reading a flame graph horizontally, width matters; the position along the x-axis does not. A wider frame means that more samples landed on that path. The initial candidates, ranked by Lua self time, were:

| Candidate location | Lua self time | Initial assessment |
|---|---:|---|
| Prometheus exporter | 25.9% | Most obvious place to investigate first |
| `ctx.var` metamethod | 15.1% | Second candidate |
| Custom logging side path | 3.9% | Easy to overlook |
| `run_global_rules` | 3.0% | Easy to overlook |

Here, self time means the percentage of samples with Lua context that landed directly at that location. It is not a percentage of total CPU time. Approximately 19.6% of the samples in this profile lacked Lua context; in this single window, 3.0% and 3.9% therefore correspond to only about 59 and 77 samples. These percentages are useful for forming candidates to retest, but they cannot directly predict throughput gains, and the difference in their rankings should not be overinterpreted.

This ranking has four blind spots:

1. When LuaJIT executes interpreted code, different Lua code paths may collapse into shared `lj_BC_*` and `lj_vm_*` symbols.
2. Compiled JIT traces cannot always be fully expanded by conventional stack unwinding, so observable JIT samples provide only a lower bound.
3. Costs such as table lookups, memory allocation, and garbage collection are attributed to C symbols rather than to the Lua lines that triggered them.
4. A call can change the caller's JIT state, making the resulting cost appear at the head of the caller function.

`run_global_rules` had one additional characteristic: it did not form one large column. Instead, it appeared across call stacks from several request phases. A single occurrence being narrow does not mean that their combined cost is small.

## 3. Follow the Stack: How a Shared Path Amplifies 3%

After selecting a `run_global_rules` frame, follow the call stack vertically. The request-phase entry point is at the bottom, followed by `common_phase`, Global Rule plugin filtering, dispatch, and finally the execution of individual plugins.

<!-- TODO: Insert the original zoomed run_global_rules stack (Figure 2). -->

Figure 2: Interactive zoomed view after selecting one `run_global_rules` stack. The selected stack is stretched to fill the canvas, so its width is normalized and must not be interpreted as its share of total CPU time. Click the image to view it at full size.

Stack height does not represent elapsed time. Its purpose is to show where the cost enters, who invokes it, and why it appears repeatedly.

Before the fix, `run_global_rules()` called `_M.filter()` in several request phases. `_M.filter()` iterated through every loaded plugin and checked each one to determine whether it had been configured in the Global Rule:

```lua
-- Simplified illustration; not the complete APISIX implementation
for _, plugin_obj in ipairs(local_plugins) do
    local name = plugin_obj.name
    local plugin_conf = user_plugin_conf[name]
    if type(plugin_conf) ~= "table" then
        goto continue
    end
    -- Process the configured plugin
    ::continue::
end
```

Two amplifiers were present:

1. The cost of each filtering pass increased with the number of loaded plugins.
2. The same filtering result was regenerated across request phases. The `body_filter` and `delayed_body_filter` phases could also be entered multiple times for response-body chunks.

In this test configuration, a single request triggered nine filtering passes. In other words, the same request repeated the work of finding a small number of configured plugins among more than 100 loaded plugins nine times.

This explains why a Lua-level self time of 3.0% understated the cost of the entire path:

| Actual work | Common flame-graph attribution |
|---|---|
| The loop itself | Corresponding location in `plugin.lua` |
| Large numbers of table lookups | `lj_BC_TGETS` |
| Temporary table allocation | `lj_alloc_malloc` |
| GC work triggered or carried by the path | `gc_sweep` |
| Uncompiled interpreter dispatch | `lj_vm_*` / `lj_BC_*` |

Viewed horizontally, this was only a 3% candidate. Following the stack vertically revealed that it sat on a shared path entered repeatedly. The optimization direction was straightforward: within one request, if the Global Rule and matched route have not changed, reuse the filtered plugin set instead of regenerating it in every phase. The cache must be invalidated by both Global Rule version and matched route because a Consumer configuration merge can replace the matched route between `rewrite` and `access`. This optimization was merged in [Apache APISIX PR #13779](https://github.com/apache/apisix/pull/13779) and released in APISIX 3.18.0.

## 4. When the Flame Graph Falls Short, Inspect LuaJIT

The second path came from a custom observability component. Neither that component nor its logging side path is part of APISIX OSS, but the issue it exposed is relevant to APISIX plugins and OpenResty extensions: an apparently lightweight call can both incur direct cost and change whether the caller subsequently runs in the interpreter or as machine code.

### 4.1 Interpreter and VM-Helper Activity Stood Out

After reclassifying the C-level samples by runtime category, the most notable signal was not any individual Lua line, but the relationship between interpreter execution and JIT execution:

| Runtime category | CPU time per request | Share of samples |
|---|---:|---:|
| Bytecode handlers and VM helpers: `lj_BC_*` / `lj_vm_*` | 5.86 μs | 29.6% |
| Observable JIT trace execution | 2.55 μs | 12.9% |

The 29.6% bucket cannot be read as a pure “interpreter share.” `lj_BC_*` symbols can be treated as bytecode handlers, but `lj_vm_*` also includes VM helpers such as numeric conversions and FFI bridges, some of which may be called from JIT traces. Strict attribution would require reclassifying exact symbols and cross-checking [LuaJIT profiler VM states](https://luajit.org/ext_profiler.html) (`I`, `N`, `C`, `G`, and `J`).

Because JIT traces are difficult to unwind completely, 12.9% is also only a lower bound. Even so, this concentration of VM-runtime-related activity in the same environment was a signal worth investigating—not evidence that all 29.6% ran in the interpreter.

This does not mean that more traces are always better. Initialization code does not need to be compiled, and different traces can have very different costs. Compilation results warrant deeper investigation only when the CPU is saturated, the path is frequently executed, and interpreter dispatch is abnormally active.

### 4.2 `jit.v` Raised the Alarm—and Caused the First Misdiagnosis

With `jit.v` enabled, one short load test reported 417 successful trace compilations and 493 aborts. After aggregation by source location, a group of paths each stopped at exactly 11 aborts.

These are compilation-event counts, however—not counts of unique functions, coverage measurements, or CPU time. `jit.v` has several important limitations:

- An abort record includes the trace starting point. When the abort site differs, `jit.v` appends it as `at ...`; a parser must not mistake that trailing location for the start, because the penalty applies to the actual trace starting point.
- A function never appearing as a trace starting point does not mean it was never compiled. Its body may have been inlined into a parent trace.
- Text logs make it difficult to perform stable set comparisons between results collected with a feature enabled and disabled.

Initially, we also misread “zero appearances as a starting point” as “the entire function runs in the interpreter.” A subsequent check using the bytecode mode of `jit.dump` showed that several function entries had not become root traces, while their bodies had repeatedly entered other traces. The paths that repeatedly failed were actually phase-entry and orchestration functions.

> The absence of a trace starting point proves only that the location did not become a root-trace anchor. It does not prove that the entire function never entered machine code.

### 4.3 Tie `start`, `stop`, and `abort` to One Origin

To answer which code failed to compile and why, LuaJIT must provide the event stream directly. The core approach is to store the location of each `start` event by trace ID, then attribute the corresponding `stop` or `abort` event back to that same starting point:

```lua
-- Simplified illustration; actual callback arguments and parsing are more complex
local trace_start = {}

jit.attach(function(what, trace_id, func, pc, err_code)
    if what == "start" then
        trace_start[trace_id] = locate(func, pc)
    elseif what == "stop" then
        record_compiled(trace_start[trace_id])
        trace_start[trace_id] = nil
    elseif what == "abort" then
        record_abort(trace_start[trace_id], err_code)
        trace_start[trace_id] = nil
    end
end, "trace")
```

The actual probe must also use `jit.util.funcinfo` to resolve source locations and `jit.vmdef.traceerr` to recover abort reasons. This makes it possible to compare the custom component's enabled and disabled states: which starting points enter the compiled set, which repeatedly abort, and whether a trace flush occurs.

In the LuaJIT build used for this investigation, the failure penalty began at 72 and then grew as twice the previous value plus 0–15. The tenth penalty was therefore in the range 36,864–44,529. On the eleventh failure, the computed value was at least 73,728; once it exceeded the 60,000 limit, LuaJIT blacklisted the starting bytecode instead of storing an exact value of 73,728. See the OpenResty LuaJIT [penalty constants](https://github.com/openresty/luajit2/blob/fbfc558aacd57a54623df0ced4c31a28f81f8ff2/src/lj_jit.h#L303-L313) and [implementation](https://github.com/openresty/luajit2/blob/fbfc558aacd57a54623df0ced4c31a28f81f8ff2/src/lj_trace.c#L393-L415). Several starting points stopped accumulating events after exactly 11 aborts. They never entered the compiled set, and no trace flush occurred during collection. The number of live traces in both test variants remained below the cache limit, ruling out trace-cache exhaustion. Together, this evidence was consistent with the source mechanism and showed that LuaJIT had stopped attempting to compile those trace starting points.

The conclusion must still remain narrowly scoped: the trace starting points were abandoned, not necessarily the entire function bodies. Other parts of those functions could still have been inlined into other traces.

When the data was grouped by caller, every affected phase-entry and orchestration function passed through the same custom logging side path. When the log level was too low to emit output, this path still inspected the request phase, call stack, and request context:

```lua
-- Simplified custom extension; not an APISIX OSS implementation
if log_level_is_suppressed then
    check_debug_capture(...)
    check_request_buffer(...)
    return
end
```

The added call did not produce a wide column of its own, but it changed the JIT outcome of its callers, making part of the cost appear at the heads of ordinary request-processing functions.

Here, the JIT data served two purposes: it exposed costs that the flame graph could not attribute correctly, and it verified that toggling the feature changed the execution state of high-frequency paths. It could not directly quantify the throughput loss. The goal was also not to force every function to compile, but to prevent work that should never happen when the feature is disabled.

One more trap can distort the result: the probe must be installed before the observed module is loaded. If a module stores a function reference during `require`, replacing the original function afterward allows the counter to observe only the few calls that did not capture the earlier reference. With the probe injected too late, we measured one call per request. Moving it before `require("apisix")` revealed the actual rate of five calls per request.

## 5. Close the Loop with Paired A/B Tests

The flame graph identifies locations, call stacks reveal amplification chains, and LuaJIT events explain misplaced costs. Paired experiments are still required to quantify the result.

For the Global Rule path, we retained the same dispatch and configuration but made the Prometheus business function return immediately after entry. This distinguished “the plugin's business logic is slow” from “the shared path before entering the plugin is slow.” To avoid presenting absolute RPS from a customized environment as an APISIX OSS benchmark, throughput with Prometheus disabled was normalized to 100:

| Internal A/B scenario | Relative throughput index | Relative to Prometheus disabled |
|---|---:|---:|
| Prometheus disabled | 100.0 | Baseline |
| Plugin and dispatch retained; business function returns immediately | 77.2 | -22.8% |
| Complete Prometheus Global Rule | 56.9 | -43.1% |

Even after the plugin's business code was short-circuited, a substantial gap remained. This experiment could not attribute the cost to a specific line, but it was sufficient to show that the loss did not come solely from metric calculation. The shared path before plugin entry was itself worth investigating. Only after combining this result with nine filtering passes per request, the vertical call stacks, and the C-level cost distribution was the amplification chain fully established.

The “business function returns immediately” variant still included dispatch and plugin-entry costs, so it could not quantify the benefit of reusing `_M.filter()` results on its own. [PR #13779](https://github.com/apache/apisix/pull/13779) provided a more direct paired result for the final fix: an APISIX 3.2-based fork, one CPU-pinned worker, wrk2, five runs per variant, and the median reported with Prometheus enabled through a Global Rule:

| Global Rule fix A/B | RPS | Relative to baseline |
|---|---:|---:|
| Pre-fix baseline | 21,453 | Baseline |
| Reuse the filtered set across phases | 24,062 | +12.2% |

The result was not rerun on `master` at the time and must not be extrapolated as a general gain for other versions or environments. Its purpose is to validate the fix directly against the corresponding baseline.

We applied the same method to the custom observability component. With the workload and configuration held constant, we collected compilation events, per-request call counts, throughput, and response-correctness results with the component enabled and disabled. The JIT events explained why the graph did not contain a sufficiently wide new column; only an end-to-end A/B test could answer how much the path actually cost. This article does not publish the final throughput delta for that custom path, so it remains an important diagnostic case here rather than a publicly quantified bottleneck conclusion.

The entire investigation can be condensed into five steps:

| Step | Core question | Evidence |
|---|---|---|
| 1. Confirm the CPU prerequisite | Can the flame graph legitimately explain the regression? | Worker saturation, CPU pinning, spare upstream and load-generator capacity, and stable reproduction |
| 2. Read width horizontally | Where do most samples land? | Global flame graph and candidate ranking |
| 3. Follow stacks vertically | Why is a small cost amplified? | Request phases, shared functions, and per-request call counts |
| 4. Inspect LuaJIT | Why is the cost misplaced or missing? | `start`, `stop`, `abort`, `flush`, and `jit.dump` |
| 5. Close the loop with paired A/B tests | What is the actual magnitude and causal relationship? | Throughput, latency, call counts, error rate, and response consistency |

These conclusions must remain within explicit boundaries:

- Flame-graph width, Lua self time, and throughput changes use different denominators and cannot be directly subtracted or divided.
- The custom observability component is not part of APISIX OSS. It is included only to illustrate a general issue that custom extensions may encounter.
- The values 29.6%, 12.9%, 417, 493, and `abort × 11` apply only to this build and collection window and must not be extrapolated.
- “Did not become a trace starting point” does not mean “the function was not compiled.” You must check whether the function body entered other traces.
- JIT compilation results are diagnostic signals, not final performance metrics. Any optimization must still be validated against throughput, latency, error rate, response content, and resource reclamation.

The flame graph did not lie. Horizontal width showed where CPU samples accumulated, and vertical call stacks showed how shared paths amplified their cost. But once costs spread across interpreter dispatch, JIT traces, the allocator, and caller functions, the flame graph no longer showed complete attribution.

At that point, the most effective next step was not to keep guessing which Lua line should be faster. It was to obtain the compilation-event stream from LuaJIT, then use per-request call counts and paired A/B tests to pin down the magnitude. The work most worth optimizing is often not the widest column, but the work that the evidence proves never needed to happen repeatedly in the first place.

## References

1. [WPS with Apache APISIX: Flame Graph and LuaJIT Performance Practices](https://apisix.apache.org/blog/2021/09/28/wps-usercase/)
2. [1s to 10ms: Reducing Prometheus Delay in API Gateway](https://api7.ai/blog/1s-to-10ms-reducing-prometheus-delay-in-api-gateway)
3. [How Is Apache APISIX Fast?](https://apisix.apache.org/blog/2023/06/12/how-is-apisix-fast/)
4. [Apache APISIX Benchmark Documentation](https://apisix.apache.org/docs/apisix/benchmark/)
5. [Apache APISIX PR #13779: Reuse the Filtered Global Rule Plugin Set Across Phases](https://github.com/apache/apisix/pull/13779)
