"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[26953],{3905:function(t,e,a){a.d(e,{Zo:function(){return u},kt:function(){return g}});var n=a(67294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var s=n.createContext({}),p=function(t){var e=n.useContext(s),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},u=function(t){var e=p(t.components);return n.createElement(s.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),m=p(a),g=r,c=m["".concat(s,".").concat(g)]||m[g]||d[g]||l;return a?n.createElement(c,i(i({ref:e},u),{},{components:a})):n.createElement(c,i({ref:e},u))}));function g(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=m;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},21787:function(t,e,a){a.r(e),a.d(e,{frontMatter:function(){return i},contentTitle:function(){return o},metadata:function(){return s},toc:function(){return p},default:function(){return d}});var n=a(87462),r=a(63366),l=(a(67294),a(3905)),i={title:"datadog"},o=void 0,s={unversionedId:"plugins/datadog",id:"plugins/datadog",isDocsHomePage:!1,title:"datadog",description:"\x3c!--",source:"@site/docs/apisix/plugins/datadog.md",sourceDirName:"plugins",slug:"/plugins/datadog",permalink:"/docs/apisix/next/plugins/datadog",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/plugins/datadog.md",tags:[],version:"current",frontMatter:{title:"datadog"},sidebar:"docs",previous:{title:"node-status",permalink:"/docs/apisix/next/plugins/node-status"},next:{title:"http-logger",permalink:"/docs/apisix/next/plugins/http-logger"}},p=[{value:"Summary",id:"summary",children:[]},{value:"Name",id:"name",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Metadata",id:"metadata",children:[]},{value:"Exported Metrics",id:"exported-metrics",children:[]},{value:"How To Enable",id:"how-to-enable",children:[]},{value:"Disable Plugin",id:"disable-plugin",children:[]},{value:"Custom Configuration",id:"custom-configuration",children:[]}],u={toc:p};function d(t){var e=t.components,a=(0,r.Z)(t,["components"]);return(0,l.kt)("wrapper",(0,n.Z)({},u,a,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"summary"},"Summary"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#summary"},"Summary")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#name"},"Name")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#attributes"},"Attributes")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#metadata"},"Metadata")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#exported-metrics"},"Exported Metrics")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#how-to-enable"},"How To Enable")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#disable-plugin"},"Disable Plugin")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"#custom-configuration"},"Custom Configuration"))),(0,l.kt)("h2",{id:"name"},"Name"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"datadog")," is a monitoring plugin built into Apache APISIX for seamless integration with ",(0,l.kt)("a",{parentName:"p",href:"https://www.datadoghq.com/"},"Datadog"),", one of the most used monitoring and observability platform for cloud applications. If enabled, this plugin supports multiple powerful types of metrics capture for every request and response cycle that essentially reflects the behaviour and health of the system."),(0,l.kt)("p",null,"This plugin pushes its custom metrics to the DogStatsD server, comes bundled with Datadog agent (to learn more about how to install a datadog agent, please visit ",(0,l.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/agent/"},"here")," ), over the UDP protocol. DogStatsD basically is an implementation of StatsD protocol which collects the custom metrics for Apache APISIX agent, aggregates it into a single data point and sends it to the configured Datadog server.\nTo learn more about DogStatsD, please visit ",(0,l.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent"},"DogStatsD")," documentation."),(0,l.kt)("p",null,"This plugin provides the ability to push metrics as a batch to the external Datadog agent, reusing the same datagram socket. In case if you did not receive the log data, don't worry give it some time. It will automatically send the logs after the timer function expires in our Batch Processor."),(0,l.kt)("p",null,"For more info on Batch-Processor in Apache APISIX please refer.\n",(0,l.kt)("a",{parentName:"p",href:"/docs/apisix/next/batch-processor"},"Batch-Processor")),(0,l.kt)("h2",{id:"attributes"},"Attributes"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Requirement"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Valid"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"prefer_name"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"true/false"),(0,l.kt)("td",{parentName:"tr",align:null},"If set to ",(0,l.kt)("inlineCode",{parentName:"td"},"false"),", would use route/service id instead of name(default) with metric tags.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"batch_max_size"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},"5000"),(0,l.kt)("td",{parentName:"tr",align:null},"[1,...]"),(0,l.kt)("td",{parentName:"tr",align:null},"Max buffer size of each batch")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"inactive_timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},"5"),(0,l.kt)("td",{parentName:"tr",align:null},"[1,...]"),(0,l.kt)("td",{parentName:"tr",align:null},"Maximum age in seconds when the buffer will be flushed if inactive")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"buffer_duration"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},"60"),(0,l.kt)("td",{parentName:"tr",align:null},"[1,...]"),(0,l.kt)("td",{parentName:"tr",align:null},"Maximum age in seconds of the oldest entry in a batch before the batch must be processed")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"max_retry_count"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},"1"),(0,l.kt)("td",{parentName:"tr",align:null},"[1,...]"),(0,l.kt)("td",{parentName:"tr",align:null},"Maximum number of retries if one entry fails to reach dogstatsd server")))),(0,l.kt)("h2",{id:"metadata"},"Metadata"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Requirement"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Valid"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"host"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},'"127.0.0.1"'),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"The DogStatsD server host address")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"port"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},"8125"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"The DogStatsD server host port")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"namespace"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},'"apisix"'),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Prefix for all the custom metrics sent by APISIX agent. Useful for finding entities for metric graph. e.g. (apisix.request.counter)")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"constant_tags"),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"optional"),(0,l.kt)("td",{parentName:"tr",align:null},'[ "source:apisix" ]'),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Static tags embedded into generated metrics. Useful for grouping metric over certain signals.")))),(0,l.kt)("p",null,"To know more about how to effectively write tags, please visit ",(0,l.kt)("a",{parentName:"p",href:"https://docs.datadoghq.com/getting_started/tagging/#defining-tags"},"here")),(0,l.kt)("h2",{id:"exported-metrics"},"Exported Metrics"),(0,l.kt)("p",null,"Apache APISIX agent, for every request response cycle, export the following metrics to DogStatsD server if the datadog plugin is enabled:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Metric Name"),(0,l.kt)("th",{parentName:"tr",align:null},"StatsD Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Request Counter"),(0,l.kt)("td",{parentName:"tr",align:null},"Counter"),(0,l.kt)("td",{parentName:"tr",align:null},"No of requests received.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Request Latency"),(0,l.kt)("td",{parentName:"tr",align:null},"Histogram"),(0,l.kt)("td",{parentName:"tr",align:null},"Time taken to process the request (in milliseconds).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Upstream latency"),(0,l.kt)("td",{parentName:"tr",align:null},"Histogram"),(0,l.kt)("td",{parentName:"tr",align:null},"Time taken to proxy the request to the upstream server till a response is received (in milliseconds).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"APISIX Latency"),(0,l.kt)("td",{parentName:"tr",align:null},"Histogram"),(0,l.kt)("td",{parentName:"tr",align:null},"Time taken by APISIX agent to process the request (in milliseconds).")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Ingress Size"),(0,l.kt)("td",{parentName:"tr",align:null},"Timer"),(0,l.kt)("td",{parentName:"tr",align:null},"Request body size in bytes.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"Egress Size"),(0,l.kt)("td",{parentName:"tr",align:null},"Timer"),(0,l.kt)("td",{parentName:"tr",align:null},"Response body size in bytes.")))),(0,l.kt)("p",null,"The metrics will be sent to the DogStatsD agent with the following tags:"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"If there is no suitable value for any particular tag, the tag will simply be omitted.")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"route_name"),": Name specified in the route schema definition. If not present or plugin attribute ",(0,l.kt)("inlineCode",{parentName:"li"},"prefer_name")," is set to ",(0,l.kt)("inlineCode",{parentName:"li"},"false"),", it will fall back to the route id value."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"service_name"),": If a route has been created with the abstraction of service, the particular service name/id (based on plugin ",(0,l.kt)("inlineCode",{parentName:"li"},"prefer_name")," attribute) will be used."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"consumer"),": If the route has a linked consumer, the consumer Username will be added as a tag."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"balancer_ip"),": IP of the Upstream balancer that has processed the current request."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"response_status"),": HTTP response status code."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("strong",{parentName:"li"},"scheme"),": Scheme that has been used to make the request, such as HTTP, gRPC, gRPCs etc.")),(0,l.kt)("h2",{id:"how-to-enable"},"How To Enable"),(0,l.kt)("p",null,"The following is an example on how to enable the datadog plugin for a specific route. We are assumming your datadog agent is already up an running."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n      "plugins": {\n            "datadog": {}\n       },\n      "upstream": {\n           "type": "roundrobin",\n           "nodes": {\n               "127.0.0.1:1980": 1\n           }\n      },\n      "uri": "/hello"\n}\'\n')),(0,l.kt)("p",null,"Now any requests to uri ",(0,l.kt)("inlineCode",{parentName:"p"},"/hello")," will generate aforesaid metrics and push it to DogStatsD server of the datadog agent."),(0,l.kt)("h2",{id:"disable-plugin"},"Disable Plugin"),(0,l.kt)("p",null,"Remove the corresponding json configuration in the plugin configuration to disable the ",(0,l.kt)("inlineCode",{parentName:"p"},"datadog"),".\nAPISIX plugins are hot-reloaded, therefore no need to restart APISIX."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/hello",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,l.kt)("h2",{id:"custom-configuration"},"Custom Configuration"),(0,l.kt)("p",null,"In the default configuration, the plugin expects the dogstatsd service to be available at ",(0,l.kt)("inlineCode",{parentName:"p"},"127.0.0.1:8125"),". If you wish to update the config, please update the plugin metadata. To know more about the fields of the datadog metadata, see ",(0,l.kt)("a",{parentName:"p",href:"#metadata"},"here"),"."),(0,l.kt)("p",null,"Make a request to ",(0,l.kt)("em",{parentName:"p"},"/apisix/admin/plugin_metadata")," endpoint with the updated metadata as following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/datadog -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n    "host": "172.168.45.29",\n    "port": 8126,\n    "constant_tags": [\n        "source:apisix",\n        "service:custom"\n    ],\n    "namespace": "apisix"\n}\'\n')),(0,l.kt)("p",null,"This HTTP PUT request will update the metadata and subsequent metrics will be pushed to the ",(0,l.kt)("inlineCode",{parentName:"p"},"172.168.45.29:8126")," endpoint via UDP StatsD. Everything will be hot-loaded, there is no need to restart Apache APISIX instances."),(0,l.kt)("p",null,"In case, if you wish to revert the datadog metadata schema to the default values, just make another PUT request to the same endpoint with an empty body. For example:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"$ curl http://127.0.0.1:9080/apisix/admin/plugin_metadata/datadog -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '{}'\n")))}d.isMDXComponent=!0}}]);