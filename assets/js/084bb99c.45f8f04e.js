"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[52230],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,g=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?a.createElement(g,i(i({ref:t},c),{},{components:n})):a.createElement(g,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},27900:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=n(87462),r=(n(67294),n(3905));const o={title:"ai-aws-content-moderation",keywords:["Apache APISIX","API Gateway","Plugin","ai-aws-content-moderation"],description:"This document contains information about the Apache APISIX ai-aws-content-moderation Plugin."},i=void 0,l={unversionedId:"plugins/ai-aws-content-moderation",id:"version-3.12/plugins/ai-aws-content-moderation",isDocsHomePage:!1,title:"ai-aws-content-moderation",description:"This document contains information about the Apache APISIX ai-aws-content-moderation Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.12/plugins/ai-aws-content-moderation.md",sourceDirName:"plugins",slug:"/plugins/ai-aws-content-moderation",permalink:"/docs/apisix/plugins/ai-aws-content-moderation",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/plugins/ai-aws-content-moderation.md",tags:[],version:"3.12",frontMatter:{title:"ai-aws-content-moderation",keywords:["Apache APISIX","API Gateway","Plugin","ai-aws-content-moderation"],description:"This document contains information about the Apache APISIX ai-aws-content-moderation Plugin."},sidebar:"version-3.12/docs",previous:{title:"ai-prompt-guard",permalink:"/docs/apisix/plugins/ai-prompt-guard"},next:{title:"ai-prompt-decorator",permalink:"/docs/apisix/plugins/ai-prompt-decorator"}},s=[{value:"Description",id:"description",children:[]},{value:"Plugin Attributes",id:"plugin-attributes",children:[]},{value:"Example usage",id:"example-usage",children:[]}],p={toc:s};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-aws-content-moderation")," plugin processes the request body to check for toxicity and rejects the request if it exceeds the configured threshold."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"This plugin must be used in routes that proxy requests to LLMs only."))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"As of now, the plugin only supports the integration with ",(0,r.kt)("a",{parentName:"em",href:"https://aws.amazon.com/comprehend/"},"AWS Comprehend")," for content moderation. PRs for introducing support for other service providers are welcomed."))),(0,r.kt)("h2",{id:"plugin-attributes"},"Plugin Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Field")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Required")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"comprehend.access_key_id"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"AWS access key ID")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"comprehend.secret_access_key"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"AWS secret access key")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"comprehend.region"),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"AWS region")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"comprehend.endpoint"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"AWS Comprehend service endpoint. Must match the pattern ",(0,r.kt)("inlineCode",{parentName:"td"},"^https?://"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"comprehend.ssl_verify"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Enables SSL certificate verification.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"moderation_categories"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Object"),(0,r.kt)("td",{parentName:"tr",align:null},"Key-value pairs of moderation category and their score. In each pair, the key should be one of the ",(0,r.kt)("inlineCode",{parentName:"td"},"PROFANITY"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"HATE_SPEECH"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"INSULT"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"HARASSMENT_OR_ABUSE"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"SEXUAL"),", or ",(0,r.kt)("inlineCode",{parentName:"td"},"VIOLENCE_OR_THREAT"),"; and the value should be between 0 and 1 (inclusive).")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"moderation_threshold"),(0,r.kt)("td",{parentName:"tr",align:null},"No"),(0,r.kt)("td",{parentName:"tr",align:null},"Number"),(0,r.kt)("td",{parentName:"tr",align:null},"The degree to which content is harmful, offensive, or inappropriate. A higher value indicates more toxic content allowed. Range: 0 - 1. Default: 0.5")))),(0,r.kt)("h2",{id:"example-usage"},"Example usage"),(0,r.kt)("p",null,"First initialise these shell variables:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"ADMIN_API_KEY=edd1c9f034335f136f87ad84b625c8f1\nACCESS_KEY_ID=aws-comprehend-access-key-id-here\nSECRET_ACCESS_KEY=aws-comprehend-secret-access-key-here\nOPENAI_KEY=open-ai-key-here\n")),(0,r.kt)("p",null,"Create a route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-aws-content-moderation")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-proxy")," plugin like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${ADMIN_API_KEY}" \\\n  -d \'{\n    "uri": "/post",\n    "plugins": {\n      "ai-aws-content-moderation": {\n        "comprehend": {\n          "access_key_id": "\'"$ACCESS_KEY_ID"\'",\n          "secret_access_key": "\'"$SECRET_ACCESS_KEY"\'",\n          "region": "us-east-1"\n        },\n        "moderation_categories": {\n          "PROFANITY": 0.5\n        }\n      },\n      "ai-proxy": {\n        "auth": {\n          "header": {\n            "api-key": "\'"$OPENAI_KEY"\'"\n          }\n        },\n        "model": {\n          "provider": "openai",\n          "name": "gpt-4",\n          "options": {\n            "max_tokens": 512,\n            "temperature": 1.0\n          }\n        }\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-proxy")," plugin is used here as it simplifies access to LLMs. However, you may configure the LLM in the upstream configuration as well."),(0,r.kt)("p",null,"Now send a request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/post -i -XPOST  -H \'Content-Type: application/json\' -d \'{\n  "messages": [\n    {\n      "role": "user",\n      "content": "<very profane message here>"\n    }\n  ]\n}\'\n')),(0,r.kt)("p",null,"Then the request will be blocked with error like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},"HTTP/1.1 400 Bad Request\nDate: Thu, 03 Oct 2024 11:53:15 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/3.10.0\n\nrequest body exceeds PROFANITY threshold\n")),(0,r.kt)("p",null,"Send a request with compliant content in the request body:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/post -i -XPOST  -H \'Content-Type: application/json\' -d \'{\n  "messages": [\n    {\n      "role": "system",\n      "content": "You are a mathematician"\n    },\n    { "role": "user", "content": "What is 1+1?" }\n  ]\n}\'\n')),(0,r.kt)("p",null,"This request will be proxied normally to the configured LLM."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'HTTP/1.1 200 OK\nDate: Thu, 03 Oct 2024 11:53:00 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/3.10.0\n\n{"choices":[{"finish_reason":"stop","index":0,"message":{"content":"1+1 equals 2.","role":"assistant"}}],"created":1727956380,"id":"chatcmpl-AEEg8Pe5BAW5Sw3C1gdwXnuyulIkY","model":"gpt-4o-2024-05-13","object":"chat.completion","system_fingerprint":"fp_67802d9a6d","usage":{"completion_tokens":7,"prompt_tokens":23,"total_tokens":30}}\n')),(0,r.kt)("p",null,"You can also configure filters on other moderation categories like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${ADMIN_API_KEY}" \\\n  -d \'{\n    "uri": "/post",\n    "plugins": {\n      "ai-aws-content-moderation": {\n        "comprehend": {\n          "access_key_id": "\'"$ACCESS_KEY_ID"\'",\n          "secret_access_key": "\'"$SECRET_ACCESS_KEY"\'",\n          "region": "us-east-1"\n        },\n        "moderation_categories": {\n          "PROFANITY": 0.5,\n          "HARASSMENT_OR_ABUSE": 0.7,\n          "SEXUAL": 0.2\n        }\n      },\n      "ai-proxy": {\n        "auth": {\n          "header": {\n            "api-key": "\'"$OPENAI_KEY"\'"\n          }\n        },\n        "model": {\n          "provider": "openai",\n          "name": "gpt-4",\n          "options": {\n            "max_tokens": 512,\n            "temperature": 1.0\n          }\n        }\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"If none of the ",(0,r.kt)("inlineCode",{parentName:"p"},"moderation_categories")," are configured, request bodies will be moderated on the basis of overall toxicity.\nThe default ",(0,r.kt)("inlineCode",{parentName:"p"},"moderation_threshold")," is 0.5, it can be configured like so."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${ADMIN_API_KEY}" \\\n  -d \'{\n  "uri": "/post",\n  "plugins": {\n    "ai-aws-content-moderation": {\n      "provider": {\n        "comprehend": {\n          "access_key_id": "\'"$ACCESS_KEY_ID"\'",\n          "secret_access_key": "\'"$SECRET_ACCESS_KEY"\'",\n          "region": "us-east-1"\n        }\n      },\n      "moderation_threshold": 0.7,\n      "llm_provider": "openai"\n    },\n    "ai-proxy": {\n      "auth": {\n        "header": {\n          "api-key": "\'"$OPENAI_KEY"\'"\n        }\n      },\n      "model": {\n        "provider": "openai",\n        "name": "gpt-4",\n        "options": {\n          "max_tokens": 512,\n          "temperature": 1.0\n        }\n      }\n    }\n  },\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "httpbin.org:80": 1\n    }\n  }\n}\'\n')))}c.isMDXComponent=!0}}]);