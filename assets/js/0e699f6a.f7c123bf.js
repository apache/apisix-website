"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[24943],{3905:(t,e,n)=>{n.d(e,{Zo:()=>m,kt:()=>g});var a=n(67294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var p=a.createContext({}),u=function(t){var e=a.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},m=function(t){var e=u(t.components);return a.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},d=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,p=t.parentName,m=o(t,["components","mdxType","originalType","parentName"]),d=u(n),g=r,k=d["".concat(p,".").concat(g)]||d[g]||s[g]||l;return n?a.createElement(k,i(i({ref:e},m),{},{components:n})):a.createElement(k,i({ref:e},m))}));function g(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},85782:(t,e,n)=>{n.r(e),n.d(e,{contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const l={title:"ai-proxy",keywords:["Apache APISIX","API Gateway","Plugin","ai-proxy"],description:"This document contains information about the Apache APISIX ai-proxy Plugin."},i=void 0,o={unversionedId:"plugins/ai-proxy",id:"version-3.11/plugins/ai-proxy",isDocsHomePage:!1,title:"ai-proxy",description:"This document contains information about the Apache APISIX ai-proxy Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.11/plugins/ai-proxy.md",sourceDirName:"plugins",slug:"/plugins/ai-proxy",permalink:"/docs/apisix/3.11/plugins/ai-proxy",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/plugins/ai-proxy.md",tags:[],version:"3.11",frontMatter:{title:"ai-proxy",keywords:["Apache APISIX","API Gateway","Plugin","ai-proxy"],description:"This document contains information about the Apache APISIX ai-proxy Plugin."},sidebar:"version-3.11/docs",previous:{title:"body-transformer",permalink:"/docs/apisix/3.11/plugins/body-transformer"},next:{title:"attach-consumer-label",permalink:"/docs/apisix/3.11/plugins/attach-consumer-label"}},p=[{value:"Description",id:"description",children:[]},{value:"Request Format",id:"request-format",children:[{value:"OpenAI",id:"openai",children:[]}]},{value:"Plugin Attributes",id:"plugin-attributes",children:[]},{value:"Example usage",id:"example-usage",children:[]}],u={toc:p};function m(t){let{components:e,...n}=t;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-proxy")," plugin simplifies access to LLM providers and models by defining a standard request format\nthat allows key fields in plugin configuration to be embedded into the request."),(0,r.kt)("p",null,"Proxying requests to OpenAI is supported now. Other LLM services will be supported soon."),(0,r.kt)("h2",{id:"request-format"},"Request Format"),(0,r.kt)("h3",{id:"openai"},"OpenAI"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Chat API")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"messages")),(0,r.kt)("td",{parentName:"tr",align:null},"Array"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of message objects")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"messages.role")),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Role of the message (",(0,r.kt)("inlineCode",{parentName:"td"},"system"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"user"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"assistant"),")")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"messages.content")),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Content of the message")))),(0,r.kt)("h2",{id:"plugin-attributes"},"Plugin Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Field")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Required")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"auth"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Object"),(0,r.kt)("td",{parentName:"tr",align:null},"Authentication configuration")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"auth.header"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Object"),(0,r.kt)("td",{parentName:"tr",align:null},"Authentication headers. Key must match pattern ",(0,r.kt)("inlineCode",{parentName:"td"},"^[a-zA-Z0-9._-]+$"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"auth.query"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Object"),(0,r.kt)("td",{parentName:"tr",align:null},"Authentication query parameters. Key must match pattern ",(0,r.kt)("inlineCode",{parentName:"td"},"^[a-zA-Z0-9._-]+$"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.provider"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the AI service provider (",(0,r.kt)("inlineCode",{parentName:"td"},"openai"),").")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.name"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Model name to execute.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Object"),(0,r.kt)("td",{parentName:"tr",align:null},"Key/value settings for the model")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options.max_tokens"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Integer"),(0,r.kt)("td",{parentName:"tr",align:null},"Defines the max tokens if using chat or completion models. Default: 256")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options.input_cost"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Number"),(0,r.kt)("td",{parentName:"tr",align:null},"Cost per 1M tokens in your prompt. Minimum: 0")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options.output_cost"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Number"),(0,r.kt)("td",{parentName:"tr",align:null},"Cost per 1M tokens in the output of the AI. Minimum: 0")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options.temperature"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Number"),(0,r.kt)("td",{parentName:"tr",align:null},"Matching temperature for models. Range: 0.0 - 5.0")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options.top_p"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Number"),(0,r.kt)("td",{parentName:"tr",align:null},"Top-p probability mass. Range: 0 - 1")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.options.stream"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Stream response by SSE. Default: false")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"model.override.endpoint"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Override the endpoint of the AI provider")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"passthrough"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"If enabled, the response from LLM will be sent to the upstream. Default: false")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Integer"),(0,r.kt)("td",{parentName:"tr",align:null},"Timeout in milliseconds for requests to LLM. Range: 1 - 60000. Default: 3000")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"keepalive"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Enable keepalive for requests to LLM. Default: true")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"keepalive_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Integer"),(0,r.kt)("td",{parentName:"tr",align:null},"Keepalive timeout in milliseconds for requests to LLM. Minimum: 1000. Default: 60000")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"keepalive_pool"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Integer"),(0,r.kt)("td",{parentName:"tr",align:null},"Keepalive pool size for requests to LLM. Minimum: 1. Default: 30")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ssl_verify"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"SSL verification for requests to LLM. Default: true")))),(0,r.kt)("h2",{id:"example-usage"},"Example usage"),(0,r.kt)("p",null,"Create a route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-proxy")," plugin like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${ADMIN_API_KEY}" \\\n  -d \'{\n    "uri": "/anything",\n    "plugins": {\n      "ai-proxy": {\n        "auth": {\n          "header": {\n            "Authorization": "Bearer <some-token>"\n          }\n        },\n        "model": {\n          "provider": "openai",\n          "name": "gpt-4",\n          "options": {\n            "max_tokens": 512,\n            "temperature": 1.0\n          }\n        }\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "somerandom.com:443": 1\n      },\n      "scheme": "https",\n      "pass_host": "node"\n    }\n  }\'\n')),(0,r.kt)("p",null,"Since ",(0,r.kt)("inlineCode",{parentName:"p"},"passthrough")," is not enabled upstream node can be any arbitrary value because it won't be contacted."),(0,r.kt)("p",null,"Now send a request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/anything -i -XPOST  -H \'Content-Type: application/json\' -d \'{\n        "messages": [\n            { "role": "system", "content": "You are a mathematician" },\n            { "role": "user", "a": 1, "content": "What is 1+1?" }\n        ]\n    }\'\n')),(0,r.kt)("p",null,"You will receive a response like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "choices": [\n    {\n      "finish_reason": "stop",\n      "index": 0,\n      "message": {\n        "content": "The sum of \\\\(1 + 1\\\\) is \\\\(2\\\\).",\n        "role": "assistant"\n      }\n    }\n  ],\n  "created": 1723777034,\n  "id": "chatcmpl-9whRKFodKl5sGhOgHIjWltdeB8sr7",\n  "model": "gpt-4o-2024-05-13",\n  "object": "chat.completion",\n  "system_fingerprint": "fp_abc28019ad",\n  "usage": { "completion_tokens": 15, "prompt_tokens": 23, "total_tokens": 38 }\n}\n')))}m.isMDXComponent=!0}}]);