"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[20839],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),g=p(n),m=l,c=g["".concat(s,".").concat(m)]||g[m]||u[m]||r;return n?a.createElement(c,i(i({ref:t},d),{},{components:n})):a.createElement(c,i({ref:t},d))}));function m(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=g;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},66285:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var a=n(87462),l=(n(67294),n(3905));const r={title:"loggly",keywords:["Apache APISIX","API Gateway","Plugin","SolarWinds Loggly"],description:"This document contains information about the Apache APISIX loggly Plugin."},i=void 0,o={unversionedId:"plugins/loggly",id:"version-3.11/plugins/loggly",isDocsHomePage:!1,title:"loggly",description:"This document contains information about the Apache APISIX loggly Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.11/plugins/loggly.md",sourceDirName:"plugins",slug:"/plugins/loggly",permalink:"/docs/apisix/3.11/plugins/loggly",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/plugins/loggly.md",tags:[],version:"3.11",frontMatter:{title:"loggly",keywords:["Apache APISIX","API Gateway","Plugin","SolarWinds Loggly"],description:"This document contains information about the Apache APISIX loggly Plugin."},sidebar:"version-3.11/docs",previous:{title:"file-logger",permalink:"/docs/apisix/3.11/plugins/file-logger"},next:{title:"elasticsearch-logger",permalink:"/docs/apisix/3.11/plugins/elasticsearch-logger"}},s=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[{value:"Example of default log format",id:"example-of-default-log-format",children:[]}]},{value:"Metadata",id:"metadata",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[{value:"Full configuration",id:"full-configuration",children:[]},{value:"Minimal configuration",id:"minimal-configuration",children:[]}]},{value:"Example usage",id:"example-usage",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],p={toc:s};function d(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"description"},"Description"),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"loggly")," Plugin is used to forward logs to ",(0,l.kt)("a",{parentName:"p",href:"https://www.solarwinds.com/loggly"},"SolarWinds Loggly")," for analysis and storage."),(0,l.kt)("p",null,"When the Plugin is enabled, APISIX will serialize the request context information to ",(0,l.kt)("a",{parentName:"p",href:"https://documentation.solarwinds.com/en/success_center/loggly/content/admin/streaming-syslog-without-using-files.htm?cshid=loggly_streaming-syslog-without-using-files"},"Loggly Syslog")," data format which is Syslog events with ",(0,l.kt)("a",{parentName:"p",href:"https://datatracker.ietf.org/doc/html/rfc5424"},"RFC5424")," compliant headers."),(0,l.kt)("p",null,"When the maximum batch size is exceeded, the data in the queue is pushed to Loggly enterprise syslog endpoint. See ",(0,l.kt)("a",{parentName:"p",href:"/docs/apisix/3.11/batch-processor"},"batch processor")," for more details."),(0,l.kt)("h2",{id:"attributes"},"Attributes"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Required"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"customer_token"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"True"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Unique identifier used when sending logs to Loggly to ensure that they are sent to the right organisation account.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"severity"),(0,l.kt)("td",{parentName:"tr",align:null},"string (enum)"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"INFO"),(0,l.kt)("td",{parentName:"tr",align:null},"Syslog log event severity level. Choose between: ",(0,l.kt)("inlineCode",{parentName:"td"},"DEBUG"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"INFO"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"NOTICE"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"WARNING"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"ERR"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"CRIT"),", ",(0,l.kt)("inlineCode",{parentName:"td"},"ALERT"),", and ",(0,l.kt)("inlineCode",{parentName:"td"},"EMEGR"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"severity_map"),(0,l.kt)("td",{parentName:"tr",align:null},"object"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"nil"),(0,l.kt)("td",{parentName:"tr",align:null},"A way to map upstream HTTP response codes to Syslog severity. Key-value pairs where keys are the HTTP response codes and the values are the Syslog severity levels. For example ",(0,l.kt)("inlineCode",{parentName:"td"},'{"410": "CRIT"}'),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"tags"),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Metadata to be included with any event log to aid in segmentation and filtering.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"log_format"),(0,l.kt)("td",{parentName:"tr",align:null},"object"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},'{"host": "$host", "@timestamp": "$time_iso8601", "client_ip": "$remote_addr"}'),(0,l.kt)("td",{parentName:"tr",align:null},"Log format declared as key value pairs in JSON format. Values only support strings. ",(0,l.kt)("a",{parentName:"td",href:"/docs/apisix/3.11/apisix-variable"},"APISIX")," or ",(0,l.kt)("a",{parentName:"td",href:"http://nginx.org/en/docs/varindex.html"},"Nginx")," variables can be used by prefixing the string with ",(0,l.kt)("inlineCode",{parentName:"td"},"$"),".")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"include_req_body"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"When set to ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," includes the request body in the log. If the request body is too big to be kept in the memory, it can't be logged due to Nginx's limitations.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"include_req_body_expr"),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Filter for when the ",(0,l.kt)("inlineCode",{parentName:"td"},"include_req_body")," attribute is set to ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),". Request body is only logged when the expression set here evaluates to ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),". See ",(0,l.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr"},"lua-resty-expr")," for more.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"include_resp_body"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"When set to ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," includes the response body in the log.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"include_resp_body_expr"),(0,l.kt)("td",{parentName:"tr",align:null},"array"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"When the ",(0,l.kt)("inlineCode",{parentName:"td"},"include_resp_body")," attribute is set to ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),", use this to filter based on ",(0,l.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr"},"lua-resty-expr"),". If present, only logs the response if the expression evaluates to ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),".")))),(0,l.kt)("p",null,"This Plugin supports using batch processors to aggregate and process entries (logs/data) in a batch. This avoids the need for frequently submitting the data. The batch processor submits data every ",(0,l.kt)("inlineCode",{parentName:"p"},"5")," seconds or when the data in the queue reaches ",(0,l.kt)("inlineCode",{parentName:"p"},"1000"),". See ",(0,l.kt)("a",{parentName:"p",href:"/docs/apisix/3.11/batch-processor#configuration"},"Batch Processor")," for more information or setting your custom configuration."),(0,l.kt)("p",null,"To generate a Customer token, go to ",(0,l.kt)("inlineCode",{parentName:"p"},"<your assigned subdomain>/loggly.com/tokens")," or navigate to Logs > Source setup > Customer tokens."),(0,l.kt)("h3",{id:"example-of-default-log-format"},"Example of default log format"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},'<10>1 2024-01-06T06:50:51.739Z 127.0.0.1 apisix 58525 - [token-1@41058 tag="apisix"] {"service_id":"","server":{"version":"3.7.0","hostname":"localhost"},"apisix_latency":100.99985313416,"request":{"url":"http://127.0.0.1:1984/opentracing","headers":{"content-type":"application/x-www-form-urlencoded","user-agent":"lua-resty-http/0.16.1 (Lua) ngx_lua/10025","host":"127.0.0.1:1984"},"querystring":{},"uri":"/opentracing","size":155,"method":"GET"},"response":{"headers":{"content-type":"text/plain","server":"APISIX/3.7.0","transfer-encoding":"chunked","connection":"close"},"size":141,"status":200},"route_id":"1","latency":103.99985313416,"upstream_latency":3,"client_ip":"127.0.0.1","upstream":"127.0.0.1:1982","start_time":1704523851634}\n')),(0,l.kt)("h2",{id:"metadata"},"Metadata"),(0,l.kt)("p",null,"You can also configure the Plugin through Plugin metadata. The following configurations are available:"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Type"),(0,l.kt)("th",{parentName:"tr",align:null},"Required"),(0,l.kt)("th",{parentName:"tr",align:null},"Default"),(0,l.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"host"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},'"logs-01.loggly.com"'),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Endpoint of the host where the logs are being sent.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"port"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"514"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Loggly port to connect to. Only used for ",(0,l.kt)("inlineCode",{parentName:"td"},"syslog")," protocol.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"5000"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Loggly send data request timeout in milliseconds.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"protocol"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},'"syslog"'),(0,l.kt)("td",{parentName:"tr",align:null},'[ "syslog" , "http", "https" ]'),(0,l.kt)("td",{parentName:"tr",align:null},"Protocol in which the logs are sent to Loggly.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"log_format"),(0,l.kt)("td",{parentName:"tr",align:null},"object"),(0,l.kt)("td",{parentName:"tr",align:null},"False"),(0,l.kt)("td",{parentName:"tr",align:null},"nil"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Log format declared as key value pairs in JSON format. Values only support strings. ",(0,l.kt)("a",{parentName:"td",href:"/docs/apisix/3.11/apisix-variable"},"APISIX")," or ",(0,l.kt)("a",{parentName:"td",href:"http://nginx.org/en/docs/varindex.html"},"Nginx")," variables can be used by prefixing the string with ",(0,l.kt)("inlineCode",{parentName:"td"},"$"),".")))),(0,l.kt)("p",null,"We support ",(0,l.kt)("a",{parentName:"p",href:"https://documentation.solarwinds.com/en/success_center/loggly/content/admin/streaming-syslog-without-using-files.htm"},"Syslog"),", ",(0,l.kt)("a",{parentName:"p",href:"https://documentation.solarwinds.com/en/success_center/loggly/content/admin/http-bulk-endpoint.htm"},"HTTP/S"),' (bulk endpoint) protocols to send log events to Loggly. By default, in APISIX side, the protocol is set to "syslog". It lets you send RFC5424 compliant syslog events with some fine-grained control (log severity mapping based on upstream HTTP response code). But HTTP/S bulk endpoint is great to send larger batches of log events with faster transmission speed. If you wish to update it, just update the metadata.'),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"APISIX supports ",(0,l.kt)("a",{parentName:"p",href:"https://documentation.solarwinds.com/en/success_center/loggly/content/admin/streaming-syslog-without-using-files.htm"},"Syslog")," and ",(0,l.kt)("a",{parentName:"p",href:"https://documentation.solarwinds.com/en/success_center/loggly/content/admin/http-bulk-endpoint.htm"},"HTTP/S")," protocols to send data to Loggly. Syslog lets you send RFC5424 compliant syslog events with fine-grained control. But, HTTP/S bulk endpoint is better while sending large batches of logs at a fast transmission speed. You can configure the metadata to update the protocol as shown below:"))),(0,l.kt)("p",null,"You can fetch the ",(0,l.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")),(0,l.kt)("p",null,":::"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/loggly -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n   "protocol": "http"\n}\'\n')),(0,l.kt)("p",null,":::"),(0,l.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,l.kt)("h3",{id:"full-configuration"},"Full configuration"),(0,l.kt)("p",null,"The example below shows a complete configuration of the Plugin on a specific Route:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins":{\n        "loggly":{\n            "customer_token":"0e6fe4bf-376e-40f4-b25f-1d55cb29f5a2",\n            "tags":["apisix", "testroute"],\n            "severity":"info",\n            "severity_map":{\n                "503": "err",\n                "410": "alert"\n            },\n            "buffer_duration":60,\n            "max_retry_count":0,\n            "retry_delay":1,\n            "inactive_timeout":2,\n            "batch_max_size":10\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "127.0.0.1:80":1\n        }\n    },\n    "uri":"/index.html"\n}\'\n')),(0,l.kt)("h3",{id:"minimal-configuration"},"Minimal configuration"),(0,l.kt)("p",null,"The example below shows a bare minimum configuration of the Plugin on a Route:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins":{\n        "loggly":{\n            "customer_token":"0e6fe4bf-376e-40f4-b25f-1d55cb29f5a2",\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "127.0.0.1:80":1\n        }\n    },\n    "uri":"/index.html"\n}\'\n')),(0,l.kt)("h2",{id:"example-usage"},"Example usage"),(0,l.kt)("p",null,"Now, if you make a request to APISIX, it will be logged in Loggly:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/index.html\n")),(0,l.kt)("p",null,"You can then view the logs on your Loggly Dashboard:"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/plugin/loggly-dashboard.png",alt:"Loggly Dashboard"})),(0,l.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,l.kt)("p",null,"To remove the ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:80": 1\n        }\n    }\n}\'\n')))}d.isMDXComponent=!0}}]);