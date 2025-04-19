"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[6540],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),d=s(n),c=r,g=d["".concat(o,".").concat(c)]||d[c]||u[c]||l;return n?a.createElement(g,i(i({ref:t},m),{},{components:n})):a.createElement(g,i({ref:t},m))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=d;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<l;s++)i[s]=n[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},58467:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const l={title:"ai-prompt-template",keywords:["Apache APISIX","API Gateway","Plugin","ai-prompt-template"],description:"This document contains information about the Apache APISIX ai-prompt-template Plugin."},i=void 0,p={unversionedId:"plugins/ai-prompt-template",id:"version-3.11/plugins/ai-prompt-template",isDocsHomePage:!1,title:"ai-prompt-template",description:"This document contains information about the Apache APISIX ai-prompt-template Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.11/plugins/ai-prompt-template.md",sourceDirName:"plugins",slug:"/plugins/ai-prompt-template",permalink:"/docs/apisix/3.11/plugins/ai-prompt-template",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/plugins/ai-prompt-template.md",tags:[],version:"3.11",frontMatter:{title:"ai-prompt-template",keywords:["Apache APISIX","API Gateway","Plugin","ai-prompt-template"],description:"This document contains information about the Apache APISIX ai-prompt-template Plugin."},sidebar:"version-3.11/docs",previous:{title:"grpc-web",permalink:"/docs/apisix/3.11/plugins/grpc-web"},next:{title:"fault-injection",permalink:"/docs/apisix/3.11/plugins/fault-injection"}},o=[{value:"Description",id:"description",children:[]},{value:"Plugin Attributes",id:"plugin-attributes",children:[]},{value:"Example usage",id:"example-usage",children:[]}],s={toc:o};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-prompt-template")," plugin simplifies access to LLM providers, such as OpenAI and Anthropic, and their models by predefining the request format\nusing a template, which only allows users to pass customized values into template variables."),(0,r.kt)("h2",{id:"plugin-attributes"},"Plugin Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Field")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Required")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Type")),(0,r.kt)("th",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"th"},"Description")))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"templates")),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"Array"),(0,r.kt)("td",{parentName:"tr",align:null},"An array of template objects")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"templates.name")),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the template.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"templates.template.model")),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Model of the AI Model, for example ",(0,r.kt)("inlineCode",{parentName:"td"},"gpt-4")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"gpt-3.5"),". See your LLM provider API documentation for more available models.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"templates.template.messages.role")),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Role of the message (",(0,r.kt)("inlineCode",{parentName:"td"},"system"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"user"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"assistant"),")")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"templates.template.messages.content")),(0,r.kt)("td",{parentName:"tr",align:null},"Yes"),(0,r.kt)("td",{parentName:"tr",align:null},"String"),(0,r.kt)("td",{parentName:"tr",align:null},"Content of the message.")))),(0,r.kt)("h2",{id:"example-usage"},"Example usage"),(0,r.kt)("p",null,"Create a route with the ",(0,r.kt)("inlineCode",{parentName:"p"},"ai-prompt-template")," plugin like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${ADMIN_API_KEY}" \\\n  -d \'{\n    "uri": "/v1/chat/completions",\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "api.openai.com:443": 1\n      },\n      "scheme": "https",\n      "pass_host": "node"\n    },\n    "plugins": {\n      "ai-prompt-template": {\n        "templates": [\n          {\n            "name": "level of detail",\n            "template": {\n              "model": "gpt-4",\n              "messages": [\n                {\n                  "role": "user",\n                  "content": "Explain about {{ topic }} in {{ level }}."\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"Now send a request:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/v1/chat/completions -i -XPOST  -H \'Content-Type: application/json\' -d \'{\n  "template_name": "level of detail",\n  "topic": "psychology",\n  "level": "brief"\n}\' -H "Authorization: Bearer <your token here>"\n')),(0,r.kt)("p",null,"Then the request body will be modified to something like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "model": "some model",\n  "messages": [\n    { "role": "user", "content": "Explain about psychology in brief." }\n  ]\n}\n')))}m.isMDXComponent=!0}}]);