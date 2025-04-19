"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[31812],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>c});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=d(n),c=a,h=m["".concat(l,".").concat(c)]||m[c]||u[c]||i;return n?r.createElement(h,o(o({ref:t},p),{},{components:n})):r.createElement(h,o({ref:t},p))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var d=2;d<i;d++)o[d]=n[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},20788:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(87462),a=(n(67294),n(3905));const i={title:"ai-request-rewrite",keywords:["Apache APISIX","AI Gateway","Plugin","ai-request-rewrite"],description:"The ai-request-rewrite plugin intercepts client requests before they are forwarded to the upstream service. It sends a predefined prompt, along with the original request body, to a specified LLM service. The LLM processes the input and returns a modified request body, which is then used for the upstream request. This allows dynamic transformation of API requests based on AI-generated content."},o=void 0,s={unversionedId:"plugins/ai-request-rewrite",id:"plugins/ai-request-rewrite",isDocsHomePage:!1,title:"ai-request-rewrite",description:"The ai-request-rewrite plugin intercepts client requests before they are forwarded to the upstream service. It sends a predefined prompt, along with the original request body, to a specified LLM service. The LLM processes the input and returns a modified request body, which is then used for the upstream request. This allows dynamic transformation of API requests based on AI-generated content.",source:"@site/docs/apisix/plugins/ai-request-rewrite.md",sourceDirName:"plugins",slug:"/plugins/ai-request-rewrite",permalink:"/zh/docs/apisix/next/plugins/ai-request-rewrite",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/master/docs/zh/latest/plugins/ai-request-rewrite.md",tags:[],version:"current",frontMatter:{title:"ai-request-rewrite",keywords:["Apache APISIX","AI Gateway","Plugin","ai-request-rewrite"],description:"The ai-request-rewrite plugin intercepts client requests before they are forwarded to the upstream service. It sends a predefined prompt, along with the original request body, to a specified LLM service. The LLM processes the input and returns a modified request body, which is then used for the upstream request. This allows dynamic transformation of API requests based on AI-generated content."},sidebar:"docs",previous:{title:"ai-rag",permalink:"/zh/docs/apisix/next/plugins/ai-rag"},next:{title:"batch-requests",permalink:"/zh/docs/apisix/next/plugins/batch-requests"}},l=[{value:"Description",id:"description",children:[]},{value:"Plugin Attributes",id:"plugin-attributes",children:[]},{value:"How it works",id:"how-it-works",children:[]},{value:"Examples",id:"examples",children:[{value:"Redact sensitive information",id:"redact-sensitive-information",children:[]},{value:"Send request to an OpenAI compatible LLM",id:"send-request-to-an-openai-compatible-llm",children:[]}]}],d={toc:l};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"ai-request-rewrite")," plugin intercepts client requests before they are forwarded to the upstream service. It sends a predefined prompt, along with the original request body, to a specified LLM service. The LLM processes the input and returns a modified request body, which is then used for the upstream request. This allows dynamic transformation of API requests based on AI-generated content."),(0,a.kt)("h2",{id:"plugin-attributes"},"Plugin Attributes"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Field")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Required")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Type")),(0,a.kt)("th",{parentName:"tr",align:null},(0,a.kt)("strong",{parentName:"th"},"Description")))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"prompt"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},"The prompt send to LLM service.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"provider"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},"Name of the LLM service. Available options: openai, deekseek and openai-compatible")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"auth"),(0,a.kt)("td",{parentName:"tr",align:null},"Yes"),(0,a.kt)("td",{parentName:"tr",align:null},"Object"),(0,a.kt)("td",{parentName:"tr",align:null},"Authentication configuration")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"auth.header"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Object"),(0,a.kt)("td",{parentName:"tr",align:null},"Authentication headers. Key must match pattern ",(0,a.kt)("inlineCode",{parentName:"td"},"^[a-zA-Z0-9._-]+$"),".")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"auth.query"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Object"),(0,a.kt)("td",{parentName:"tr",align:null},"Authentication query parameters. Key must match pattern ",(0,a.kt)("inlineCode",{parentName:"td"},"^[a-zA-Z0-9._-]+$"),".")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"options"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Object"),(0,a.kt)("td",{parentName:"tr",align:null},"Key/value settings for the model")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"options.model"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},'Model to execute. Examples: "gpt-3.5-turbo" for openai, "deepseek-chat" for deekseek, or "qwen-turbo" for openai-compatible services')),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"override.endpoint"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"String"),(0,a.kt)("td",{parentName:"tr",align:null},"Override the default endpoint when using OpenAI-compatible services (e.g., self-hosted models or third-party LLM services). When the provider is 'openai-compatible', the endpoint field is required.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"timeout"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Integer"),(0,a.kt)("td",{parentName:"tr",align:null},"Total timeout in milliseconds for requests to LLM service, including connect, send, and read timeouts. Range: 1 - 60000. Default: 30000")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"keepalive"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,a.kt)("td",{parentName:"tr",align:null},"Enable keepalive for requests to LLM service. Default: true")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"keepalive_timeout"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Integer"),(0,a.kt)("td",{parentName:"tr",align:null},"Keepalive timeout in milliseconds for requests to LLM service. Minimum: 1000. Default: 60000")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"keepalive_pool"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Integer"),(0,a.kt)("td",{parentName:"tr",align:null},"Keepalive pool size for requests to LLM service. Minimum: 1. Default: 30")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"ssl_verify"),(0,a.kt)("td",{parentName:"tr",align:null},"No"),(0,a.kt)("td",{parentName:"tr",align:null},"Boolean"),(0,a.kt)("td",{parentName:"tr",align:null},"SSL verification for requests to LLM service. Default: true")))),(0,a.kt)("h2",{id:"how-it-works"},"How it works"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://github.com/user-attachments/assets/c7288e4f-00fc-46ca-b69e-d3d74d7085ca",alt:"image"})),(0,a.kt)("h2",{id:"examples"},"Examples"),(0,a.kt)("p",null,"The examples below demonstrate how you can configure ",(0,a.kt)("inlineCode",{parentName:"p"},"ai-request-rewrite")," for different scenarios."),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"You can fetch the admin_key from config.yaml and save to an environment variable with the following command:"),(0,a.kt)("p",{parentName:"div"},"admin_key=$(yq '.deployment.admin.admin_key","[0]",".key' conf/config.yaml | sed 's/\"//g')"))),(0,a.kt)("h3",{id:"redact-sensitive-information"},"Redact sensitive information"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "uri": "/anything",\n    "plugins": {\n      "ai-request-rewrite": {\n        "prompt": "Given a JSON request body, identify and mask any sensitive information such as credit card numbers, social security numbers, and personal identification numbers (e.g., passport or driver\'\\\'\'s license numbers). Replace detected sensitive values with a masked format (e.g., \\"*** **** **** 1234\\") for credit card numbers. Ensure the JSON structure remains unchanged.",\n        "provider": "openai",\n        "auth": {\n          "header": {\n            "Authorization": "Bearer <some-token>"\n          }\n        },\n        "options": {\n          "model": "gpt-4"\n        }\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')),(0,a.kt)("p",null,"Now send a request:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9080/anything" \\\n  -H "Content-Type: application/json" \\\n  -d \'{\n    "name": "John Doe",\n    "email": "john.doe@example.com",\n    "credit_card": "4111 1111 1111 1111",\n    "ssn": "123-45-6789",\n    "address": "123 Main St"\n  }\'\n')),(0,a.kt)("p",null,"The request body send to the LLM Service is as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "messages": [\n     {\n       "role": "system",\n       "content": "Given a JSON request body, identify and mask any sensitive information such as credit card numbers, social security numbers, and personal identification numbers (e.g., passport or driver\'s license numbers). Replace detected sensitive values with a masked format (e.g., \'*** **** **** 1234\') for credit card numbers). Ensure the JSON structure remains unchanged."\n     },\n     {\n       "role": "user",\n       "content": "{\\n\\"name\\":\\"John Doe\\",\\n\\"email\\":\\"john.doe@example.com\\",\\n\\"credit_card\\":\\"4111 1111 1111 1111\\",\\n\\"ssn\\":\\"123-45-6789\\",\\n\\"address\\":\\"123 Main St\\"\\n}"\n     }\n   ]\n}\n\n')),(0,a.kt)("p",null,"The LLM processes the input and returns a modified request body, which replace detected sensitive values with a masked format then used for the upstream request:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "John Doe",\n  "email": "john.doe@example.com",\n  "credit_card": "**** **** **** 1111",\n  "ssn": "***-**-6789",\n  "address": "123 Main St"\n}\n')),(0,a.kt)("h3",{id:"send-request-to-an-openai-compatible-llm"},"Send request to an OpenAI compatible LLM"),(0,a.kt)("p",null,"Create a route with the ",(0,a.kt)("inlineCode",{parentName:"p"},"ai-request-rewrite")," plugin with ",(0,a.kt)("inlineCode",{parentName:"p"},"provider")," set to ",(0,a.kt)("inlineCode",{parentName:"p"},"openai-compatible")," and the endpoint of the model set to ",(0,a.kt)("inlineCode",{parentName:"p"},"override.endpoint")," like so:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "uri": "/anything",\n    "plugins": {\n      "ai-request-rewrite": {\n        "prompt": "Given a JSON request body, identify and mask any sensitive information such as credit card numbers, social security numbers, and personal identification numbers (e.g., passport or driver\'\\\'\'s license numbers). Replace detected sensitive values with a masked format (e.g., \'*** **** **** 1234\') for credit card numbers). Ensure the JSON structure remains unchanged.",\n        "provider": "openai-compatible",\n        "auth": {\n          "header": {\n            "Authorization": "Bearer <some-token>"\n          }\n        },\n        "options": {\n          "model": "qwen-plus",\n          "max_tokens": 1024,\n          "temperature": 1\n        },\n        "override": {\n          "endpoint": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"\n        }\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')))}p.isMDXComponent=!0}}]);