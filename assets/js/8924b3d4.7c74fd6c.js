"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[59201],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),u=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=u(n),m=r,k=c["".concat(p,".").concat(m)]||c[m]||s[m]||l;return n?a.createElement(k,i(i({ref:t},d),{},{components:n})):a.createElement(k,i({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3386:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const l={title:"workflow",keywords:["Apache APISIX","API Gateway","Plugin","workflow","traffic control"],description:"This document describes the Apache APISIX workflow Plugin, you can use it to control traffic."},i=void 0,o={unversionedId:"plugins/workflow",id:"version-3.10/plugins/workflow",isDocsHomePage:!1,title:"workflow",description:"This document describes the Apache APISIX workflow Plugin, you can use it to control traffic.",source:"@site/docs-apisix_versioned_docs/version-3.10/plugins/workflow.md",sourceDirName:"plugins",slug:"/plugins/workflow",permalink:"/docs/apisix/3.10/plugins/workflow",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.10/docs/en/latest/plugins/workflow.md",tags:[],version:"3.10",frontMatter:{title:"workflow",keywords:["Apache APISIX","API Gateway","Plugin","workflow","traffic control"],description:"This document describes the Apache APISIX workflow Plugin, you can use it to control traffic."},sidebar:"version-3.10/docs",previous:{title:"client-control",permalink:"/docs/apisix/3.10/plugins/client-control"},next:{title:"zipkin",permalink:"/docs/apisix/3.10/plugins/zipkin"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[{value:"<code>actions</code> Attributes",id:"actions-attributes",children:[]}]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],u={toc:p};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"workflow")," plugin is used to introduce ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/api7/lua-resty-expr#operator-list"},"lua-resty-expr")," to provide complex traffic control features."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"rules.case"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[array]"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"List of variables to match for filtering requests for conditional traffic split. It is in the format ",(0,r.kt)("inlineCode",{parentName:"td"},"{variable operator value}"),". For example, ",(0,r.kt)("inlineCode",{parentName:"td"},'{"arg_name", "==", "json"}'),". The variables here are consistent with NGINX internal variables. For details on supported operators, you can refer to ",(0,r.kt)("a",{parentName:"td",href:"https://github.com/api7/lua-resty-expr#operator-list"},"lua-resty-expr"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"rules.actions"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[object]"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"The action to be performed when the case matches successfully. Currently, only one element is supported in actions. The first child element of the actions' only element can be ",(0,r.kt)("inlineCode",{parentName:"td"},"return")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"limit-count"),".")))),(0,r.kt)("h3",{id:"actions-attributes"},(0,r.kt)("inlineCode",{parentName:"h3"},"actions")," Attributes"),(0,r.kt)("h4",{id:"return"},"return"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"actions","[1]",".return"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Return directly to the client.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"actions","[1]",".","[2]",".code"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"HTTP status code returned to the client.")))),(0,r.kt)("h4",{id:"limit-count"},"limit-count"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"actions","[1]",".limit-count"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Execute the functions of the ",(0,r.kt)("inlineCode",{parentName:"td"},"limit-count")," plugin.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"actions","[1]",".","[2]"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Configuration of ",(0,r.kt)("inlineCode",{parentName:"td"},"limit-count")," plugin, ",(0,r.kt)("inlineCode",{parentName:"td"},"group")," is not supported.")))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"In ",(0,r.kt)("inlineCode",{parentName:"p"},"rules"),", match ",(0,r.kt)("inlineCode",{parentName:"p"},"case")," in order according to the index of the ",(0,r.kt)("inlineCode",{parentName:"p"},"rules"),", and execute ",(0,r.kt)("inlineCode",{parentName:"p"},"actions")," directly if ",(0,r.kt)("inlineCode",{parentName:"p"},"case")," match."))),(0,r.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,r.kt)("p",null,"You can configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"workflow")," plugin on a Route as shown below:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri":"/hello/*",\n    "plugins":{\n        "workflow":{\n            "rules":[\n                {\n                    "case":[\n                        ["uri", "==", "/hello/rejected"]\n                    ],\n                    "actions":[\n                        [\n                            "return",\n                            {"code": 403}\n                        ]\n                    ]\n                },\n                {\n                    "case":[\n                        ["uri", "==", "/hello/v2/appid"]\n                    ],\n                    "actions":[\n                        [\n                            "limit-count",\n                            {\n                                "count":2,\n                                "time_window":60,\n                                "rejected_code":429\n                            }\n                        ]\n                    ]\n                }\n            ]\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "127.0.0.1:1980":1\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"Here, the ",(0,r.kt)("inlineCode",{parentName:"p"},"workflow")," Plugin is enabled on the Route. If the request matches the ",(0,r.kt)("inlineCode",{parentName:"p"},"case")," in the ",(0,r.kt)("inlineCode",{parentName:"p"},"rules"),", the ",(0,r.kt)("inlineCode",{parentName:"p"},"actions")," will be executed."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 1: If the requested uri is ",(0,r.kt)("inlineCode",{parentName:"strong"},"/hello/rejected"),", the status code ",(0,r.kt)("inlineCode",{parentName:"strong"},"403")," is returned to the client")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/hello/rejected -i\nHTTP/1.1 403 Forbidden\n......\n\n{"error_msg":"rejected by workflow"}\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 2: if the request uri is ",(0,r.kt)("inlineCode",{parentName:"strong"},"/hello/v2/appid"),", the ",(0,r.kt)("inlineCode",{parentName:"strong"},"workflow")," plugin would execute the ",(0,r.kt)("inlineCode",{parentName:"strong"},"limit-count")," plugin")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/hello/v2/appid -i\nHTTP/1.1 200 OK\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/hello/v2/appid -i\nHTTP/1.1 200 OK\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/hello/v2/appid -i\nHTTP/1.1 429 Too Many Requests\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example 3: if the request can not match any ",(0,r.kt)("inlineCode",{parentName:"strong"},"case")," in the ",(0,r.kt)("inlineCode",{parentName:"strong"},"rules"),", the ",(0,r.kt)("inlineCode",{parentName:"strong"},"workflow")," plugin would do nothing")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/hello/fake -i\nHTTP/1.1 200 OK\n")),(0,r.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,r.kt)("p",null,"To remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"workflow")," plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri":"/hello/*",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}d.isMDXComponent=!0}}]);