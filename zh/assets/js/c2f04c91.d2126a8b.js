"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[25318],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(n),u=r,g=m["".concat(p,".").concat(u)]||m[u]||d[u]||i;return n?a.createElement(g,o(o({ref:t},c),{},{components:n})):a.createElement(g,o({ref:t},c))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},32679:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"Route",keywords:["API \u7f51\u5173","Apache APISIX","Route","\u8def\u7531"],description:"\u672c\u6587\u8bb2\u8ff0\u4e86\u8def\u7531\u7684\u6982\u5ff5\u4ee5\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},o=void 0,l={unversionedId:"terminology/route",id:"version-3.12/terminology/route",isDocsHomePage:!1,title:"Route",description:"\u672c\u6587\u8bb2\u8ff0\u4e86\u8def\u7531\u7684\u6982\u5ff5\u4ee5\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.12/terminology/route.md",sourceDirName:"terminology",slug:"/terminology/route",permalink:"/zh/docs/apisix/terminology/route",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.12/docs/zh/latest/terminology/route.md",tags:[],version:"3.12",frontMatter:{title:"Route",keywords:["API \u7f51\u5173","Apache APISIX","Route","\u8def\u7531"],description:"\u672c\u6587\u8bb2\u8ff0\u4e86\u8def\u7531\u7684\u6982\u5ff5\u4ee5\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"version-3.12/docs",previous:{title:"Plugin Metadata",permalink:"/zh/docs/apisix/terminology/plugin-metadata"},next:{title:"Router",permalink:"/zh/docs/apisix/terminology/router"}},p=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u914d\u7f6e\u7b80\u4ecb",id:"\u914d\u7f6e\u7b80\u4ecb",children:[]},{value:"\u914d\u7f6e\u793a\u4f8b",id:"\u914d\u7f6e\u793a\u4f8b",children:[]}],s={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,"Route\uff08\u4e5f\u79f0\u4e3a\u8def\u7531\uff09\u662f APISIX \u4e2d\u6700\u57fa\u7840\u548c\u6700\u6838\u5fc3\u7684\u8d44\u6e90\u5bf9\u8c61\uff0cAPISIX \u53ef\u4ee5\u901a\u8fc7\u8def\u7531\u5b9a\u4e49\u89c4\u5219\u6765\u5339\u914d\u5ba2\u6237\u7aef\u8bf7\u6c42\uff0c\u6839\u636e\u5339\u914d\u7ed3\u679c\u52a0\u8f7d\u5e76\u6267\u884c\u76f8\u5e94\u7684\u63d2\u4ef6\uff0c\u6700\u540e\u5c06\u8bf7\u6c42\u8f6c\u53d1\u7ed9\u5230\u6307\u5b9a\u7684\u4e0a\u6e38\u670d\u52a1\u3002"),(0,r.kt)("h2",{id:"\u914d\u7f6e\u7b80\u4ecb"},"\u914d\u7f6e\u7b80\u4ecb"),(0,r.kt)("p",null,"\u8def\u7531\u4e2d\u4e3b\u8981\u5305\u542b\u4e09\u90e8\u5206\u5185\u5bb9\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u5339\u914d\u89c4\u5219\uff1a\u6bd4\u5982 ",(0,r.kt)("inlineCode",{parentName:"li"},"uri"),"\u3001",(0,r.kt)("inlineCode",{parentName:"li"},"host"),"\u3001",(0,r.kt)("inlineCode",{parentName:"li"},"remote_addr")," \u7b49\u7b49\uff0c\u4f60\u4e5f\u53ef\u4ee5\u81ea\u5b9a\u4e49\u5339\u914d\u89c4\u5219\uff0c\u8be6\u7ec6\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"li",href:"/zh/docs/apisix/admin-api#route-request-body-parameters"},"Route body \u8bf7\u6c42\u53c2\u6570"),"\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u63d2\u4ef6\u914d\u7f6e\uff1a\u4f60\u53ef\u4ee5\u6839\u636e\u4e1a\u52a1\u9700\u6c42\uff0c\u5728\u8def\u7531\u4e2d\u914d\u7f6e\u76f8\u5e94\u7684\u63d2\u4ef6\u6765\u5b9e\u73b0\u529f\u80fd\u3002\u8be6\u7ec6\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"li",href:"/zh/docs/apisix/terminology/plugin"},"Plugin")," \u548c ",(0,r.kt)("a",{parentName:"li",href:"/zh/docs/apisix/terminology/plugin-config"},"plugin-config"),"\u3002"),(0,r.kt)("li",{parentName:"ul"},"\u4e0a\u6e38\u4fe1\u606f\uff1a\u8def\u7531\u4f1a\u6839\u636e\u914d\u7f6e\u7684\u8d1f\u8f7d\u5747\u8861\u4fe1\u606f\uff0c\u5c06\u8bf7\u6c42\u6309\u7167\u89c4\u5219\u8f6c\u53d1\u81f3\u76f8\u5e94\u7684\u4e0a\u6e38\u3002\u8be6\u7ec6\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"li",href:"/zh/docs/apisix/terminology/upstream"},"Upstream"),"\u3002")),(0,r.kt)("p",null,"\u4e0b\u56fe\u793a\u4f8b\u662f\u4e00\u4e9b Route \u89c4\u5219\u7684\u5b9e\u4f8b\uff0c\u5f53\u67d0\u4e9b\u5c5e\u6027\u503c\u76f8\u540c\u65f6\uff0c\u56fe\u4e2d\u7528\u76f8\u540c\u989c\u8272\u6807\u8bc6\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.12/docs/assets/images/routes-example.png",alt:"\u8def\u7531\u793a\u4f8b"})),(0,r.kt)("p",null,"\u4f60\u53ef\u4ee5\u5728\u8def\u7531\u4e2d\u5b8c\u6210\u6240\u6709\u53c2\u6570\u7684\u914d\u7f6e\uff0c\u8be5\u65b9\u5f0f\u8bbe\u7f6e\u5bb9\u6613\u8bbe\u7f6e\uff0c\u6bcf\u4e2a\u8def\u7531\u7684\u76f8\u5bf9\u72ec\u7acb\u81ea\u7531\u5ea6\u6bd4\u8f83\u9ad8\u3002\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "plugins": {\n        "limit-count": {\n            "count": 2,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key_type": "var",\n            "key": "remote_addr"\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u5f53\u4f60\u7684\u8def\u7531\u4e2d\u6709\u6bd4\u8f83\u591a\u7684\u91cd\u590d\u914d\u7f6e\uff08\u6bd4\u5982\u542f\u7528\u76f8\u540c\u7684\u63d2\u4ef6\u914d\u7f6e\u6216\u4e0a\u6e38\u4fe1\u606f\uff09\uff0c\u4f60\u4e5f\u53ef\u4ee5\u901a\u8fc7\u914d\u7f6e ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/terminology/service"},"Service")," \u548c ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/terminology/upstream"},"Upstream")," \u7684 ID \u6216\u8005\u5176\u4ed6\u5bf9\u8c61\u7684 ID \u6765\u5b8c\u6210\u8def\u7531\u914d\u7f6e\u3002\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n  "uri": "/index.html",\n  "plugin_config_id": "123456789apacheapisix",\n  "upstream_id": "1"\n}\'\n')),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"\u63d0\u793a")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"APISIX \u6240\u6709\u7684\u8d44\u6e90\u5bf9\u8c61\u7684 ID\uff0c\u5747\u4f7f\u7528\u5b57\u7b26\u4e32\u683c\u5f0f\uff0c\u5982\u679c\u4f7f\u7528\u7684\u4e0a\u6e38 ID\u3001\u670d\u52a1 ID \u6216\u5176\u4ed6\u8d44\u6e90\u5bf9\u8c61\u7684 ID \u5927\u4e8e 14 \u4e2a\u5b57\u7b26\u65f6\uff0c\u8bf7\u52a1\u5fc5\u4f7f\u7528\u5b57\u7b26\u4e32\u5f62\u5f0f\u8868\u793a\u8be5\u8d44\u6e90\u5bf9\u8c61\u3002\u4f8b\u5982\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-json"},'  "plugin_config_id": "1234a67891234apisix",\n  "service_id": "434199918991639234",\n  "upstream_id": "123456789123456789"\n')))),(0,r.kt)("h2",{id:"\u914d\u7f6e\u793a\u4f8b"},"\u914d\u7f6e\u793a\u4f8b"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u521b\u5efa\u7684\u8def\u7531\uff0c\u662f\u628a URI \u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"/index.html")," \u7684\u8bf7\u6c42\u4ee3\u7406\u5230\u5730\u5740\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"127.0.0.1:1980")," \u7684\u4e0a\u6e38\u670d\u52a1\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -i -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 201 Created\nDate: Sat, 31 Aug 2019 01:17:15 GMT\nContent-Type: text/plain\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX web server\n\n{"node":{"value":{"uri":"\\/index.html","upstream":{"nodes":{"127.0.0.1:1980":1},"type":"roundrobin"}},"createdIndex":61925,"key":"\\/apisix\\/routes\\/1","modifiedIndex":61925}}\n')),(0,r.kt)("p",null,"\u5f53\u63a5\u6536\u5230\u6210\u529f\u5e94\u7b54\u540e\uff0c\u8868\u793a\u8be5\u8def\u7531\u5df2\u6210\u529f\u521b\u5efa\u3002"),(0,r.kt)("p",null,"\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u53c2\u8003 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/admin-api#route"},"Admin API \u7684 Route \u5bf9\u8c61"),"\u3002"))}c.isMDXComponent=!0}}]);