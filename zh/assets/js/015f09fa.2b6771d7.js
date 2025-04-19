"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[90036],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),m=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},d=function(e){var t=m(e.components);return a.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=m(n),u=r,k=s["".concat(o,".").concat(u)]||s[u]||c[u]||l;return n?a.createElement(k,p(p({ref:t},d),{},{components:n})):a.createElement(k,p({ref:t},d))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,p=new Array(l);p[0]=s;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i.mdxType="string"==typeof e?e:r,p[1]=i;for(var m=2;m<l;m++)p[m]=n[m];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},89270:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>p,default:()=>d,frontMatter:()=>l,metadata:()=>i,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const l={title:"opentelemetry",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","OpenTelemetry"],description:"opentelemetry \u63d2\u4ef6\u53ef\u7528\u4e8e\u6839\u636e OpenTelemetry \u534f\u8bae\u89c4\u8303\u4e0a\u62a5 Traces \u6570\u636e\uff0c\u8be5\u63d2\u4ef6\u4ec5\u652f\u6301\u4e8c\u8fdb\u5236\u7f16\u7801\u7684 OLTP over HTTP\u3002"},p=void 0,i={unversionedId:"plugins/opentelemetry",id:"plugins/opentelemetry",isDocsHomePage:!1,title:"opentelemetry",description:"opentelemetry \u63d2\u4ef6\u53ef\u7528\u4e8e\u6839\u636e OpenTelemetry \u534f\u8bae\u89c4\u8303\u4e0a\u62a5 Traces \u6570\u636e\uff0c\u8be5\u63d2\u4ef6\u4ec5\u652f\u6301\u4e8c\u8fdb\u5236\u7f16\u7801\u7684 OLTP over HTTP\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current/plugins/opentelemetry.md",sourceDirName:"plugins",slug:"/plugins/opentelemetry",permalink:"/zh/docs/apisix/next/plugins/opentelemetry",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/master/docs/zh/latest/plugins/opentelemetry.md",tags:[],version:"current",frontMatter:{title:"opentelemetry",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","OpenTelemetry"],description:"opentelemetry \u63d2\u4ef6\u53ef\u7528\u4e8e\u6839\u636e OpenTelemetry \u534f\u8bae\u89c4\u8303\u4e0a\u62a5 Traces \u6570\u636e\uff0c\u8be5\u63d2\u4ef6\u4ec5\u652f\u6301\u4e8c\u8fdb\u5236\u7f16\u7801\u7684 OLTP over HTTP\u3002"},sidebar:"docs",previous:{title:"skywalking",permalink:"/zh/docs/apisix/next/plugins/skywalking"},next:{title:"prometheus",permalink:"/zh/docs/apisix/next/plugins/prometheus"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u914d\u7f6e",id:"\u914d\u7f6e",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u542f\u7528 opentelemetry \u63d2\u4ef6",id:"\u542f\u7528-opentelemetry-\u63d2\u4ef6",children:[]},{value:"\u5c06 Traces \u4e0a\u62a5\u5230 OpenTelemetry",id:"\u5c06-traces-\u4e0a\u62a5\u5230-opentelemetry",children:[]},{value:"\u5728\u65e5\u5fd7\u4e2d\u4f7f\u7528 trace \u53d8\u91cf",id:"\u5728\u65e5\u5fd7\u4e2d\u4f7f\u7528-trace-\u53d8\u91cf",children:[]}]}],m={toc:o};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("head",null,(0,r.kt)("link",{rel:"canonical",href:"https://docs.api7.ai/hub/opentelemetry"})),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u63d2\u4ef6\u53ef\u7528\u4e8e\u6839\u636e ",(0,r.kt)("a",{parentName:"p",href:"https://opentelemetry.io/docs/reference/specification/"},"OpenTelemetry Specification")," \u534f\u8bae\u89c4\u8303\u4e0a\u62a5 Traces \u6570\u636e\u3002\u8be5\u63d2\u4ef6\u4ec5\u652f\u6301\u4e8c\u8fdb\u5236\u7f16\u7801\u7684 OLTP over HTTP\uff0c\u5373\u8bf7\u6c42\u7c7b\u578b\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"application/x-protobuf")," \u7684\u6570\u636e\u4e0a\u62a5\u3002"),(0,r.kt)("h2",{id:"\u914d\u7f6e"},"\u914d\u7f6e"),(0,r.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u670d\u52a1\u540d\u79f0\u3001\u79df\u6237 ID\u3001collector \u548c batch span processor \u7684\u914d\u7f6e\u5df2\u9884\u914d\u7f6e\u5728",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/apisix/cli/config.lua"},"\u9ed8\u8ba4\u914d\u7f6e"),"\u4e2d\u3002"),(0,r.kt)("p",null,"\u60a8\u53ef\u4ee5\u901a\u8fc7\u7aef\u70b9 ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix/admin/plugin_metadata/opentelemetry")," \u66f4\u6539\u63d2\u4ef6\u7684\u914d\u7f6e\uff0c\u4f8b\u5982\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u4ece\u201cconfig.yaml\u201d\u83b7\u53d6\u201cadmin_key\u201d,\u5e76\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u4fdd\u5b58\u5230\u73af\u5883\u53d8\u91cf\u4e2d\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/opentelemetry -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "trace_id_source": "x-request-id",\n    "resource": {\n      "service.name": "APISIX"\n    },\n    "collector": {\n      "address": "127.0.0.1:4318",\n      "request_timeout": 3,\n      "request_headers": {\n        "Authorization": "token"\n      }\n    },\n    "batch_span_processor": {\n      "drop_on_queue_full": false,\n      "max_queue_size": 1024,\n      "batch_timeout": 2,\n      "inactive_timeout": 1,\n      "max_export_batch_size": 16\n    },\n    "set_ngx_var": false\n}\'\n')),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"\u91c7\u6837\u7b56\u7565\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"always_off")),(0,r.kt)("td",{parentName:"tr",align:null},'["always_on", "always_off", "trace_id_ratio", "parent_base"]'),(0,r.kt)("td",{parentName:"tr",align:null},"\u91c7\u6837\u7b56\u7565\u3002",(0,r.kt)("br",null),(0,r.kt)("inlineCode",{parentName:"td"},"always_on"),"\uff1a\u5168\u91c7\u6837\uff1b",(0,r.kt)("inlineCode",{parentName:"td"},"always_off"),"\uff1a\u4e0d\u91c7\u6837\uff1b",(0,r.kt)("inlineCode",{parentName:"td"},"trace_id_ratio"),"\uff1a\u57fa\u4e8e trace id \u7684\u767e\u5206\u6bd4\u91c7\u6837\uff1b",(0,r.kt)("inlineCode",{parentName:"td"},"parent_base"),"\uff1a\u5982\u679c\u5b58\u5728 tracing \u4e0a\u6e38\uff0c\u5219\u4f7f\u7528\u4e0a\u6e38\u7684\u91c7\u6837\u51b3\u5b9a\uff0c\u5426\u5219\u4f7f\u7528\u914d\u7f6e\u7684\u91c7\u6837\u7b56\u7565\u51b3\u7b56\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"\u91c7\u6837\u7b56\u7565\u53c2\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.fraction"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 1]"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"trace_id_ratio"),"\uff1a\u91c7\u6837\u7b56\u7565\u7684\u767e\u5206\u6bd4\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"parent_base"),"\uff1a\u91c7\u6837\u7b56\u7565\u5728\u6ca1\u6709\u4e0a\u6e38 tracing \u65f6\uff0c\u4f1a\u4f7f\u7528 root \u91c7\u6837\u7b56\u7565\u505a\u51b3\u7b56\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root.name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},'["always_on", "always_off", "trace_id_ratio"]'),(0,r.kt)("td",{parentName:"tr",align:null},"root \u91c7\u6837\u7b56\u7565\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root.options"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"root \u91c7\u6837\u7b56\u7565\u53c2\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sampler.options.root.options.fraction"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"0"),(0,r.kt)("td",{parentName:"tr",align:null},"[0, 1]"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"trace_id_ratio")," root \u91c7\u6837\u7b56\u7565\u7684\u767e\u5206\u6bd4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"additional_attributes"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8ffd\u52a0\u5230 trace span \u7684\u989d\u5916\u5c5e\u6027\uff0c\u652f\u6301\u5185\u7f6e NGINX \u6216 ",(0,r.kt)("a",{parentName:"td",href:"https://apisix.apache.org/docs/apisix/apisix-variable/"},"APISIX \u53d8\u91cf"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"additional_header_prefix_attributes"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"\u9644\u52a0\u5230\u8ddf\u8e2a\u8303\u56f4\u5c5e\u6027\u7684\u6807\u5934\u6216\u6807\u5934\u524d\u7f00\u3002\u4f8b\u5982\uff0c\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"td"},'x-my-header"')," \u6216 ",(0,r.kt)("inlineCode",{parentName:"td"},"x-my-headers-*")," \u6765\u5305\u542b\u5e26\u6709\u524d\u7f00 ",(0,r.kt)("inlineCode",{parentName:"td"},"x-my-headers-")," \u7684\u6240\u6709\u6807\u5934\u3002")))),(0,r.kt)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u5728\u4e0d\u540c\u573a\u666f\u4e0b\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u63d2\u4ef6\u3002"),(0,r.kt)("h3",{id:"\u542f\u7528-opentelemetry-\u63d2\u4ef6"},"\u542f\u7528 opentelemetry \u63d2\u4ef6"),(0,r.kt)("p",null,"\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0cAPISIX \u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u63d2\u4ef6\u662f\u7981\u7528\u7684\u3002\u8981\u542f\u7528\u5b83\uff0c\u8bf7\u5c06\u63d2\u4ef6\u6dfb\u52a0\u5230\u914d\u7f6e\u6587\u4ef6\u4e2d\uff0c\u5982\u4e0b\u6240\u793a\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="config.yaml"',title:'"config.yaml"'},"plugins:\n  - ...\n  - opentelemetry\n")),(0,r.kt)("p",null,"\u91cd\u65b0\u52a0\u8f7d APISIX \u4ee5\u4f7f\u66f4\u6539\u751f\u6548\u3002"),(0,r.kt)("p",null,"\u6709\u5173 ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u53ef\u4ee5\u914d\u7f6e\u7684\u5176\u4ed6\u9009\u9879\uff0c\u8bf7\u53c2\u9605",(0,r.kt)("a",{parentName:"p",href:"#%E9%9D%99%E6%80%81%E9%85%8D%E7%BD%AE"},"\u9759\u6001\u914d\u7f6e"),"\u3002"),(0,r.kt)("h3",{id:"\u5c06-traces-\u4e0a\u62a5\u5230-opentelemetry"},"\u5c06 Traces \u4e0a\u62a5\u5230 OpenTelemetry"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u8ffd\u8e2a\u5bf9\u8def\u7531\u7684\u8bf7\u6c42\u5e76\u5c06 traces \u53d1\u9001\u5230 OpenTelemetry\u3002"),(0,r.kt)("p",null,"\u5728 Docker \u542f\u52a8\u4e00\u4e2a OpenTelemetry collector \u5b9e\u4f8b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"docker run -d --name otel-collector -p 4318:4318 otel/opentelemetry-collector-contrib\n")),(0,r.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a\u5f00\u542f\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u63d2\u4ef6\u7684\u8def\u7531\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "otel-tracing-route",\n    "uri": "/anything",\n    "plugins": {\n      "opentelemetry": {\n        "sampler": {\n          "name": "always_on"\n        }\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org": 1\n      }\n    }\n  }\'\n')),(0,r.kt)("p",null,"\u5411\u8def\u7531\u53d1\u9001\u8bf7\u6c42\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9080/anything"\n')),(0,r.kt)("p",null,"\u4f60\u5e94\u8be5\u6536\u5230\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," \u54cd\u5e94\u3002"),(0,r.kt)("p",null,"\u5728 OpenTelemetry collector \u7684\u65e5\u5fd7\u4e2d\uff0c\u4f60\u5e94\u8be5\u770b\u5230\u7c7b\u4f3c\u4ee5\u4e0b\u7684\u4fe1\u606f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'2024-02-18T17:14:03.825Z info ResourceSpans #0\nResource SchemaURL:\nResource attributes:\n    -> telemetry.sdk.language: Str(lua)\n    -> telemetry.sdk.name: Str(opentelemetry-lua)\n    -> telemetry.sdk.version: Str(0.1.1)\n    -> hostname: Str(e34673e24631)\n    -> service.name: Str(APISIX)\nScopeSpans #0\nScopeSpans SchemaURL:\nInstrumentationScope opentelemetry-lua\nSpan #0\n    Trace ID       : fbd0a38d4ea4a128ff1a688197bc58b0\n    Parent ID      :\n    ID             : af3dc7642104748a\n    Name           : GET /anything\n    Kind           : Server\n    Start time     : 2024-02-18 17:14:03.763244032 +0000 UTC\n    End time       : 2024-02-18 17:14:03.920229888 +0000 UTC\n    Status code    : Unset\n    Status message :\nAttributes:\n    -> net.host.name: Str(127.0.0.1)\n    -> http.method: Str(GET)\n    -> http.scheme: Str(http)\n    -> http.target: Str(/anything)\n    -> http.user_agent: Str(curl/7.64.1)\n    -> apisix.route_id: Str(otel-tracing-route)\n    -> apisix.route_name: Empty()\n    -> http.route: Str(/anything)\n    -> http.status_code: Int(200)\n{"kind": "exporter", "data_type": "traces", "name": "debug"}\n')),(0,r.kt)("p",null,"\u8981\u53ef\u89c6\u5316\u8fd9\u4e9b\u8ffd\u8e2a\uff0c\u4f60\u53ef\u4ee5\u5c06 traces \u5bfc\u51fa\u5230\u540e\u7aef\u670d\u52a1\uff0c\u4f8b\u5982 Zipkin \u548c Prometheus\u3002\u6709\u5173\u66f4\u591a\u8be6\u7ec6\u4fe1\u606f\uff0c\u8bf7\u53c2\u9605",(0,r.kt)("a",{parentName:"p",href:"https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter"},"exporters"),"\u3002"),(0,r.kt)("h3",{id:"\u5728\u65e5\u5fd7\u4e2d\u4f7f\u7528-trace-\u53d8\u91cf"},"\u5728\u65e5\u5fd7\u4e2d\u4f7f\u7528 trace \u53d8\u91cf"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u63d2\u4ef6\u4ee5\u8bbe\u7f6e\u4ee5\u4e0b\u5185\u7f6e\u53d8\u91cf\uff0c\u8fd9\u4e9b\u53d8\u91cf\u53ef\u4ee5\u5728\u65e5\u5fd7\u63d2\u4ef6\u6216\u8bbf\u95ee\u65e5\u5fd7\u4e2d\u4f7f\u7528\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opentelemetry_context_traceparent"),":  ",(0,r.kt)("a",{parentName:"li",href:"https://www.w3.org/TR/trace-context/#trace-context-http-headers-format"},"W3C trace context")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opentelemetry_trace_id"),": \u5f53\u524d span \u7684 trace_id"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"opentelemetry_span_id"),": \u5f53\u524d span \u7684 span_id")),(0,r.kt)("p",null,"\u5982\u4e0b\u66f4\u65b0\u914d\u7f6e\u6587\u4ef6\u3002\u4f60\u5e94\u8be5\u81ea\u5b9a\u4e49\u8bbf\u95ee\u65e5\u5fd7\u683c\u5f0f\u4ee5\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u63d2\u4ef6\u53d8\u91cf\uff0c\u5e76\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"set_ngx_var")," \u5b57\u6bb5\u4e2d\u8bbe\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"opentelemetry")," \u53d8\u91cf\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},'nginx_config:\n  http:\n    enable_access_log: true\n    access_log_format: \'{"time": "$time_iso8601","opentelemetry_context_traceparent": "$opentelemetry_context_traceparent","opentelemetry_trace_id": "$opentelemetry_trace_id","opentelemetry_span_id": "$opentelemetry_span_id","remote_addr": "$remote_addr"}\'\n    access_log_format_escape: json\nplugin_attr:\n  opentelemetry:\n    set_ngx_var: true\n')),(0,r.kt)("p",null,"\u91cd\u65b0\u52a0\u8f7d APISIX \u4ee5\u4f7f\u914d\u7f6e\u66f4\u6539\u751f\u6548\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'{"time": "18/Feb/2024:15:09:00 +0000","opentelemetry_context_traceparent": "00-fbd0a38d4ea4a128ff1a688197bc58b0-8f4b9d9970a02629-01","opentelemetry_trace_id": "fbd0a38d4ea4a128ff1a688197bc58b0","opentelemetry_span_id": "af3dc7642104748a","remote_addr": "172.10.0.1"}\n')))}d.isMDXComponent=!0}}]);