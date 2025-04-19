"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[72667],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),p=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,h=u["".concat(d,".").concat(m)]||u[m]||s[m]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=u;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},99744:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var a=n(87462),r=(n(67294),n(3905));const i={title:"authz-casdoor",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Authz Casdoor","authz-casdoor"],description:"\u672c\u7bc7\u6587\u6863\u4ecb\u7ecd\u4e86 Apache APISIX auth-casdoor \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002"},o=void 0,l={unversionedId:"plugins/authz-casdoor",id:"version-3.12/plugins/authz-casdoor",isDocsHomePage:!1,title:"authz-casdoor",description:"\u672c\u7bc7\u6587\u6863\u4ecb\u7ecd\u4e86 Apache APISIX auth-casdoor \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.12/plugins/authz-casdoor.md",sourceDirName:"plugins",slug:"/plugins/authz-casdoor",permalink:"/zh/docs/apisix/plugins/authz-casdoor",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.12/docs/zh/latest/plugins/authz-casdoor.md",tags:[],version:"3.12",frontMatter:{title:"authz-casdoor",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Authz Casdoor","authz-casdoor"],description:"\u672c\u7bc7\u6587\u6863\u4ecb\u7ecd\u4e86 Apache APISIX auth-casdoor \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002"},sidebar:"version-3.12/docs",previous:{title:"authz-keycloak",permalink:"/zh/docs/apisix/plugins/authz-keycloak"},next:{title:"wolf-rbac",permalink:"/zh/docs/apisix/plugins/wolf-rbac"}},d=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],p={toc:d};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"authz-casdoor")," \u63d2\u4ef6\u53ef\u6dfb\u52a0 ",(0,r.kt)("a",{parentName:"p",href:"https://casdoor.org/"},"Casdoor")," \u96c6\u4e2d\u8ba4\u8bc1\u65b9\u5f0f\u3002"),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"endpoint_addr"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null},"Casdoor \u7684 URL\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"client_id"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null},"Casdoor \u7684\u5ba2\u6237\u7aef id\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"client_secret"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null},"Casdoor \u7684\u5ba2\u6237\u7aef\u5bc6\u94a5\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"callback_url"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null},"\u7528\u4e8e\u63a5\u6536 code \u4e0e state \u7684\u56de\u8c03\u5730\u5740\u3002")))),(0,r.kt)("p",null,"\u6ce8\u610f\uff1aschema \u4e2d\u8fd8\u5b9a\u4e49\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},'encrypt_fields = {"client_secret"}'),"\uff0c\u8fd9\u610f\u5473\u7740\u8be5\u5b57\u6bb5\u5c06\u4f1a\u88ab\u52a0\u5bc6\u5b58\u50a8\u5728 etcd \u4e2d\u3002\u5177\u4f53\u53c2\u8003 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/plugin-develop#%E5%8A%A0%E5%AF%86%E5%AD%98%E5%82%A8%E5%AD%97%E6%AE%B5"},"\u52a0\u5bc6\u5b58\u50a8\u5b57\u6bb5"),"\u3002"),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"IMPORTANT")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u6307\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"endpoint_addr")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"callback_url")," \u5c5e\u6027\u65f6\u4e0d\u8981\u4ee5\u201c/\u201d\u6765\u7ed3\u5c3e\u3002"),(0,r.kt)("p",{parentName:"div"},(0,r.kt)("inlineCode",{parentName:"p"},"callback_url")," \u5fc5\u987b\u662f\u8def\u7531\u7684 URI\u3002\u5177\u4f53\u7ec6\u8282\u53ef\u67e5\u770b\u4e0b\u65b9\u793a\u4f8b\u5185\u5bb9\uff0c\u4e86\u89e3\u76f8\u5173\u914d\u7f6e\u3002"))),(0,r.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"auth-casdoor")," \u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "methods": ["GET"],\n  "uri": "/anything/*",\n  "plugins": {\n    "authz-casdoor": {\n        "endpoint_addr":"http://localhost:8000",\n        "callback_url":"http://localhost:9080/anything/callback",\n        "client_id":"7ceb9b7fda4a9061ec1c",\n        "client_secret":"3416238e1edf915eac08b8fe345b2b95cdba7e04"\n    }\n  },\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "httpbin.org:80": 1\n    }\n  }\n}\'\n')),(0,r.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4e00\u65e6\u542f\u7528\u4e86\u8be5\u63d2\u4ef6\uff0c\u8bbf\u95ee\u8be5\u8def\u7531\u7684\u65b0\u7528\u6237\u9996\u5148\u4f1a\u7ecf\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"authz-casdoor")," \u63d2\u4ef6\u7684\u5904\u7406\uff0c\u7136\u540e\u88ab\u91cd\u5b9a\u5411\u5230 Casdoor \u767b\u5f55\u9875\u9762\u3002"),(0,r.kt)("p",null,"\u6210\u529f\u767b\u5f55\u540e\uff0cCasdoor \u4f1a\u5c06\u8be5\u7528\u6237\u91cd\u5b9a\u5411\u5230 ",(0,r.kt)("inlineCode",{parentName:"p"},"callback_url"),"\uff0c\u5e76\u6307\u5b9a GET \u53c2\u6570\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"code")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"state"),"\u3002\u8be5\u63d2\u4ef6\u8fd8\u4f1a\u5411 Casdoor \u8bf7\u6c42\u4e00\u4e2a\u8bbf\u95ee Token\uff0c\u5e76\u786e\u8ba4\u7528\u6237\u662f\u5426\u5df2\u767b\u5f55\u3002\u5728\u6210\u529f\u8ba4\u8bc1\u540e\uff0c\u8be5\u6d41\u7a0b\u53ea\u51fa\u73b0\u4e00\u6b21\u5e76\u4e14\u540e\u7eed\u8bf7\u6c42\u4e0d\u4f1a\u88ab\u6253\u65ad\u3002"),(0,r.kt)("p",null,"\u4e0a\u8ff0\u64cd\u4f5c\u5b8c\u6210\u540e\uff0c\u7528\u6237\u5c31\u4f1a\u88ab\u91cd\u5b9a\u5411\u5230\u76ee\u6807 URL\u3002"),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u9700\u8981\u7981\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"authz-casdoor")," \u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/anything/*",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "httpbin.org:80": 1\n        }\n    }\n}\'\n')))}c.isMDXComponent=!0}}]);