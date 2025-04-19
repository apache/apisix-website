"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[97748],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),d=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),s=d(n),c=r,k=s["".concat(o,".").concat(c)]||s[c]||m[c]||l;return n?a.createElement(k,i(i({ref:t},u),{},{components:n})):a.createElement(k,i({ref:t},u))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=s;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},76818:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const l={title:"dubbo-proxy"},i=void 0,p={unversionedId:"plugins/dubbo-proxy",id:"version-3.11/plugins/dubbo-proxy",isDocsHomePage:!1,title:"dubbo-proxy",description:"dubbo-proxy \u63d2\u4ef6\u5141\u8bb8\u5c06 HTTP \u8bf7\u6c42\u4ee3\u7406\u5230 dubbo\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.11/plugins/dubbo-proxy.md",sourceDirName:"plugins",slug:"/plugins/dubbo-proxy",permalink:"/zh/docs/apisix/3.11/plugins/dubbo-proxy",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.11/docs/zh/latest/plugins/dubbo-proxy.md",tags:[],version:"3.11",frontMatter:{title:"dubbo-proxy"},sidebar:"version-3.11/docs",previous:{title:"openfunction",permalink:"/zh/docs/apisix/3.11/plugins/openfunction"},next:{title:"mqtt-proxy",permalink:"/zh/docs/apisix/3.11/plugins/mqtt-proxy"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u8981\u6c42",id:"\u8981\u6c42",children:[]},{value:"\u8fd0\u884c\u65f6\u5c5e\u6027",id:"\u8fd0\u884c\u65f6\u5c5e\u6027",children:[]},{value:"\u9759\u6001\u5c5e\u6027",id:"\u9759\u6001\u5c5e\u6027",children:[]},{value:"\u5982\u4f55\u542f\u7528",id:"\u5982\u4f55\u542f\u7528",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],d={toc:o};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"dubbo-proxy")," \u63d2\u4ef6\u5141\u8bb8\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP")," \u8bf7\u6c42\u4ee3\u7406\u5230 ",(0,r.kt)("a",{parentName:"p",href:"http://dubbo.apache.org"},(0,r.kt)("strong",{parentName:"a"},"dubbo")),"\u3002"),(0,r.kt)("h2",{id:"\u8981\u6c42"},"\u8981\u6c42"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"OpenResty"),", \u4f60\u9700\u8981\u7f16\u8bd1\u5b83\u6765\u652f\u6301 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo"),", \u53c2\u8003 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/FAQ#%E5%A6%82%E4%BD%95%E6%9E%84%E5%BB%BA-apisix-runtime-%E7%8E%AF%E5%A2%83"},"APISIX-Runtime"),"\u3002"),(0,r.kt)("h2",{id:"\u8fd0\u884c\u65f6\u5c5e\u6027"},"\u8fd0\u884c\u65f6\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"service_name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"dubbo \u670d\u52a1\u540d\u5b57")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"service_version"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9009"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"dubbo \u670d\u52a1\u7248\u672c")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"method"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009"),(0,r.kt)("td",{parentName:"tr",align:null},"uri \u8def\u5f84"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"dubbo \u670d\u52a1\u65b9\u6cd5")))),(0,r.kt)("h2",{id:"\u9759\u6001\u5c5e\u6027"},"\u9759\u6001\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"upstream_multiplex_count"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5fc5\u9009"),(0,r.kt)("td",{parentName:"tr",align:null},"32"),(0,r.kt)("td",{parentName:"tr",align:null},">= 1"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e0a\u6e38\u8fde\u63a5\u4e2d\u6700\u5927\u7684\u591a\u8def\u590d\u7528\u8bf7\u6c42\u6570")))),(0,r.kt)("h2",{id:"\u5982\u4f55\u542f\u7528"},"\u5982\u4f55\u542f\u7528"),(0,r.kt)("p",null,"\u9996\u5148\uff0c\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo-proxy")," \u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"# Add this in config.yaml\nplugins:\n  - ... # plugin you need\n  - dubbo-proxy\n")),(0,r.kt)("p",null,"\u7136\u540e\u91cd\u8f7d ",(0,r.kt)("inlineCode",{parentName:"p"},"APISIX"),"\u3002"),(0,r.kt)("p",null,"\u8fd9\u91cc\u6709\u4e2a\u4f8b\u5b50\uff0c\u5728\u6307\u5b9a\u7684\u8def\u7531\u4e2d\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo-proxy")," \u63d2\u4ef6\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/upstreams/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "nodes": {\n        "127.0.0.1:20880": 1\n    },\n    "type": "roundrobin"\n}\'\n\ncurl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uris": [\n        "/hello"\n    ],\n    "plugins": {\n        "dubbo-proxy": {\n            "service_name": "org.apache.dubbo.sample.tengine.DemoService",\n            "service_version": "0.0.0",\n            "method": "tengineDubbo"\n        }\n    },\n    "upstream_id": 1\n}\'\n')),(0,r.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4f60\u53ef\u4ee5\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"Tengine")," \u63d0\u4f9b\u7684 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/alibaba/tengine/tree/master/modules/mod_dubbo#quick-start"},"\u5feb\u901f\u5f00\u59cb")," \u4f8b\u5b50\u4e2d\u4f7f\u7528\u4e0a\u8ff0\u914d\u7f6e\u8fdb\u884c\u6d4b\u8bd5\u3002"),(0,r.kt)("p",null,"\u5c06\u4f1a\u6709\u540c\u6837\u7684\u7ed3\u679c\u3002"),(0,r.kt)("p",null,"\u4ece\u4e0a\u6e38 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo")," \u670d\u52a1\u8fd4\u56de\u7684\u6570\u636e\u4e00\u5b9a\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"Map<String, String>")," \u7c7b\u578b\u3002"),(0,r.kt)("p",null,"\u5982\u679c\u8fd4\u56de\u7684\u6570\u636e\u5982\u4e0b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "status": "200",\n    "header1": "value1",\n    "header2": "valu2",\n    "body": "blahblah"\n}\n')),(0,r.kt)("p",null,"\u5219\u5bf9\u5e94\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP")," \u54cd\u5e94\u5982\u4e0b"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-http"},'HTTP/1.1 200 OK # "status" will be the status code\n...\nheader1: value1\nheader2: value2\n...\n\nblahblah # "body" will be the body\n')),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u4f60\u60f3\u5728\u67d0\u4e2a\u8def\u7531\u6216\u670d\u52a1\u4e2d\u7981\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo-proxy")," \u63d2\u4ef6\uff0c\u975e\u5e38\u7b80\u5355\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u5220\u9664\u63d2\u4ef6\u914d\u7f6e\u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"json")," \u914d\u7f6e\uff0c\u4e0d\u9700\u8981\u91cd\u542f\u670d\u52a1\u5c31\u80fd\u7acb\u5373\u751f\u6548\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'$ curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uris": [\n        "/hello"\n    ],\n    "plugins": {\n    },\n    "upstream_id": 1\n    }\n}\'\n')),(0,r.kt)("p",null,"\u73b0\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo-proxy")," \u63d2\u4ef6\u5c31\u5df2\u7ecf\u88ab\u7981\u7528\u4e86\u3002\u6b64\u65b9\u6cd5\u540c\u6837\u9002\u7528\u4e8e\u5176\u4ed6\u63d2\u4ef6\u3002"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u5f7b\u5e95\u7981\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"dubbo-proxy")," \u63d2\u4ef6\uff0c\n\u4f60\u9700\u8981\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u6ce8\u91ca\u6389\u4ee5\u4e0b\u5185\u5bb9\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"plugins:\n  - ... # plugin you need\n  #- dubbo-proxy\n")),(0,r.kt)("p",null,"\u7136\u540e\u91cd\u65b0\u52a0\u8f7d ",(0,r.kt)("inlineCode",{parentName:"p"},"APISIX"),"\u3002"))}u.isMDXComponent=!0}}]);