"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[54474],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=d(n),c=r,g=u["".concat(p,".").concat(c)]||u[c]||m[c]||l;return n?a.createElement(g,i(i({ref:t},s),{},{components:n})):a.createElement(g,i({ref:t},s))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},84657:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const l={title:"opentelemetry",keywords:["Apache APISIX","API Gateway","Plugin","OpenTelemetry"],description:"This document contains information about the Apache opentelemetry Plugin."},i=void 0,o={unversionedId:"plugins/opentelemetry",id:"version-3.10/plugins/opentelemetry",isDocsHomePage:!1,title:"opentelemetry",description:"This document contains information about the Apache opentelemetry Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.10/plugins/opentelemetry.md",sourceDirName:"plugins",slug:"/plugins/opentelemetry",permalink:"/docs/apisix/3.10/plugins/opentelemetry",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.10/docs/en/latest/plugins/opentelemetry.md",tags:[],version:"3.10",frontMatter:{title:"opentelemetry",keywords:["Apache APISIX","API Gateway","Plugin","OpenTelemetry"],description:"This document contains information about the Apache opentelemetry Plugin."},sidebar:"version-3.10/docs",previous:{title:"skywalking",permalink:"/docs/apisix/3.10/plugins/skywalking"},next:{title:"prometheus",permalink:"/docs/apisix/3.10/plugins/prometheus"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[{value:"Configuring the collector",id:"configuring-the-collector",children:[]}]},{value:"Variables",id:"variables",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],d={toc:p};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," Plugin can be used to report tracing data according to the ",(0,r.kt)("a",{parentName:"p",href:"https://opentelemetry.io/docs/reference/specification/"},"OpenTelemetry specification"),"."),(0,r.kt)("p",null,"The Plugin only supports binary-encoded ",(0,r.kt)("a",{parentName:"p",href:"https://opentelemetry.io/docs/reference/specification/protocol/otlp/#otlphttp"},"OLTP over HTTP"),"."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Sampling configuration.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"always_off"),(0,r.kt)("td",{parentName:"tr",align:null},'["always_on", "always_off", "trace_id_ratio", "parent_base"]'),(0,r.kt)("td",{parentName:"tr",align:null},"Sampling strategy. ",(0,r.kt)("inlineCode",{parentName:"td"},"always_on"),": always samples, ",(0,r.kt)("inlineCode",{parentName:"td"},"always_off"),": never samples, ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_id_ratio"),": random sampling result based on given sampling probability, ",(0,r.kt)("inlineCode",{parentName:"td"},"parent_base"),": use parent decision if given, else determined by the root sampler.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},'{fraction = 0, root = {name = "always_off"}}'),(0,r.kt)("td",{parentName:"tr",align:null},"Parameters for sampling strategy.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.fraction"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 1]"),(0,r.kt)("td",{parentName:"tr",align:null},"Sampling probability for ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_id_ratio"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},'{name = "always_off", options = {fraction = 0}}'),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Root sampler for ",(0,r.kt)("inlineCode",{parentName:"td"},"parent_base")," strategy.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root.name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"always_off"),(0,r.kt)("td",{parentName:"tr",align:null},'["always_on", "always_off", "trace_id_ratio"]'),(0,r.kt)("td",{parentName:"tr",align:null},"Root sampling strategy.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root.options"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"{fraction = 0}"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Root sampling strategy parameters.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root.options.fraction"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 1]"),(0,r.kt)("td",{parentName:"tr",align:null},"Root sampling probability for ",(0,r.kt)("inlineCode",{parentName:"td"},"trace_id_ratio"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"additional_attributes"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Additional attributes appended to the trace span. Support built-in NGINX or APISIX variables in values, such as ",(0,r.kt)("inlineCode",{parentName:"td"},"http_header")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"route_id"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"additional_header_prefix_attributes"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Headers or header prefixes appended to the trace span's attributes. For example, use ",(0,r.kt)("inlineCode",{parentName:"td"},'x-my-header"')," or ",(0,r.kt)("inlineCode",{parentName:"td"},"x-my-headers-*")," to include all headers with the prefix ",(0,r.kt)("inlineCode",{parentName:"td"},"x-my-headers-"),".")))),(0,r.kt)("h3",{id:"configuring-the-collector"},"Configuring the collector"),(0,r.kt)("p",null,"You can set up the collector by configuring it in you configuration file (",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"):"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"trace_id_source"),(0,r.kt)("td",{parentName:"tr",align:null},"enum"),(0,r.kt)("td",{parentName:"tr",align:null},"x-request-id"),(0,r.kt)("td",{parentName:"tr",align:null},"Source of the trace ID. Valid values are ",(0,r.kt)("inlineCode",{parentName:"td"},"random")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"x-request-id"),". When set to ",(0,r.kt)("inlineCode",{parentName:"td"},"x-request-id"),", the value of the ",(0,r.kt)("inlineCode",{parentName:"td"},"x-request-id")," header will be used as trace ID. Make sure that it matches the regex pattern ",(0,r.kt)("inlineCode",{parentName:"td"},"[0-9a-f]{32}"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"resource"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Additional ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/resource/sdk.md"},"resource")," appended to the trace.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"collector"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},'{address = "127.0.0.1:4318", request_timeout = 3}'),(0,r.kt)("td",{parentName:"tr",align:null},"OpenTelemetry Collector configuration.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"collector.address"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"127.0.0.1:4318"),(0,r.kt)("td",{parentName:"tr",align:null},"Collector address. If the collector serves on https, use ",(0,r.kt)("a",{parentName:"td",href:"https://127.0.0.1:4318"},"https://127.0.0.1:4318")," as the address.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"collector.request_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"3"),(0,r.kt)("td",{parentName:"tr",align:null},"Report request timeout in seconds.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"collector.request_headers"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Report request HTTP headers.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch_span_processor"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Trace span processor.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch_span_processor.drop_on_queue_full"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"When set to ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", drops the span when queue is full. Otherwise, force process batches.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch_span_processor.max_queue_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"1024"),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum queue size for buffering spans for delayed processing.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch_span_processor.batch_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"2"),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum time in seconds for constructing a batch.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch_span_processor.max_export_batch_size"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"16"),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum number of spans to process in a single batch.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch_span_processor.inactive_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"Time interval in seconds between processing batches.")))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If you find a ",(0,r.kt)("inlineCode",{parentName:"p"},"bad argument #1 to '?' (invalid value)")," error triggered by the ",(0,r.kt)("inlineCode",{parentName:"p"},"hex2bytes")," function in error log, it's essential to verify if your traceId matches the specified regex pattern ",(0,r.kt)("inlineCode",{parentName:"p"},"[0-9a-f]{32}"),", as required by opentelemetry's ",(0,r.kt)("a",{parentName:"p",href:"https://opentelemetry.io/docs/specs/otel/trace/api/#retrieving-the-traceid-and-spanid"},"traceId format"),"."),(0,r.kt)("p",{parentName:"div"},"For instance, a possible scenario occurs when the plugin attribute ",(0,r.kt)("inlineCode",{parentName:"p"},"trace_id_source")," is configured as ",(0,r.kt)("inlineCode",{parentName:"p"},"x-request-id"),", and requests include an x-request-id header generated by Envoy. Envoy typically uses a ",(0,r.kt)("a",{parentName:"p",href:"https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/observability/tracing#trace-context-propagation"},"UUID")," to create this header by default. When the opentelemetry plugin adopts this UUID as the traceId, the presence of hyphens in the UUID can cause issues. Since the UUID format with hyphens does not comply with the expected traceId format, it results in errors when attempting to push traces to the collector."))),(0,r.kt)("p",null,"You can configure these as shown below in your configuration file (",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},"plugin_attr:\n  opentelemetry:\n    resource:\n      service.name: APISIX\n      tenant.id: business_id\n    collector:\n      address: 192.168.8.211:4318\n      request_timeout: 3\n      request_headers:\n        foo: bar\n    batch_span_processor:\n      drop_on_queue_full: false\n      max_queue_size: 6\n      batch_timeout: 2\n      inactive_timeout: 1\n      max_export_batch_size: 2\n")),(0,r.kt)("h2",{id:"variables"},"Variables"),(0,r.kt)("p",null,"The following nginx variables are set by OpenTelemetry:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opentelemetry_context_traceparent")," -  ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/trace-context/#trace-context-http-headers-format"},"W3C trace context"),", e.g.: ",(0,r.kt)("inlineCode",{parentName:"li"},"00-0af7651916cd43dd8448eb211c80319c-b9c7c989f97918e1-01")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opentelemetry_trace_id")," - Trace Id of the current span"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opentelemetry_span_id")," -  Span Id of the current span")),(0,r.kt)("p",null,"How to use variables? you have to add it to your configuration file (",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},'http:\n    enable_access_log: true\n    access_log: "/dev/stdout"\n    access_log_format: \'{"time": "$time_iso8601","opentelemetry_context_traceparent": "$opentelemetry_context_traceparent","opentelemetry_trace_id": "$opentelemetry_trace_id","opentelemetry_span_id": "$opentelemetry_span_id","remote_addr": "$remote_addr","uri": "$uri"}\'\n    access_log_format_escape: json\nplugins:\n  - opentelemetry\nplugin_attr:\n  opentelemetry:\n    set_ngx_var: true\n')),(0,r.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,r.kt)("p",null,"To enable the Plugin, you have to add it to your configuration file (",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},"plugins:\n  - ...\n  - opentelemetry\n")),(0,r.kt)("p",null,"Now, you can enable the Plugin on a specific Route:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uris": [\n        "/uid/*"\n    ],\n    "plugins": {\n        "opentelemetry": {\n            "sampler": {\n                "name": "always_on"\n            }\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,r.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,r.kt)("p",null,"To remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uris": [\n        "/uid/*"\n    ],\n    "plugins": {\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}s.isMDXComponent=!0}}]);