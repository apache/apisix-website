"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[15117],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>c});var a=t(67294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var u=a.createContext({}),k=function(e){var n=a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=k(e.components);return a.createElement(u.Provider,{value:n},e.children)},s={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},o=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,u=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),o=k(t),c=l,m=o["".concat(u,".").concat(c)]||o[c]||s[c]||r;return t?a.createElement(m,i(i({ref:n},d),{},{components:t})):a.createElement(m,i({ref:n},d))}));function c(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,i=new Array(r);i[0]=o;var p={};for(var u in n)hasOwnProperty.call(n,u)&&(p[u]=n[u]);p.originalType=e,p.mdxType="string"==typeof e?e:l,i[1]=p;for(var k=2;k<r;k++)i[k]=t[k];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}o.displayName="MDXCreateElement"},42874:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>p,toc:()=>u});var a=t(87462),l=(t(67294),t(3905));const r={title:"key-auth",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Key Auth","key-auth"],description:"key-auth \u63d2\u4ef6\u652f\u6301\u4f7f\u7528\u8eab\u4efd\u9a8c\u8bc1\u5bc6\u94a5\u4f5c\u4e3a\u5ba2\u6237\u7aef\u5728\u8bbf\u95ee\u4e0a\u6e38\u8d44\u6e90\u4e4b\u524d\u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\u7684\u673a\u5236\u3002"},i=void 0,p={unversionedId:"plugins/key-auth",id:"plugins/key-auth",isDocsHomePage:!1,title:"key-auth",description:"key-auth \u63d2\u4ef6\u652f\u6301\u4f7f\u7528\u8eab\u4efd\u9a8c\u8bc1\u5bc6\u94a5\u4f5c\u4e3a\u5ba2\u6237\u7aef\u5728\u8bbf\u95ee\u4e0a\u6e38\u8d44\u6e90\u4e4b\u524d\u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\u7684\u673a\u5236\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current/plugins/key-auth.md",sourceDirName:"plugins",slug:"/plugins/key-auth",permalink:"/zh/docs/apisix/next/plugins/key-auth",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/master/docs/zh/latest/plugins/key-auth.md",tags:[],version:"current",frontMatter:{title:"key-auth",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Key Auth","key-auth"],description:"key-auth \u63d2\u4ef6\u652f\u6301\u4f7f\u7528\u8eab\u4efd\u9a8c\u8bc1\u5bc6\u94a5\u4f5c\u4e3a\u5ba2\u6237\u7aef\u5728\u8bbf\u95ee\u4e0a\u6e38\u8d44\u6e90\u4e4b\u524d\u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\u7684\u673a\u5236\u3002"},sidebar:"docs",previous:{title:"attach-consumer-label",permalink:"/zh/docs/apisix/next/plugins/attach-consumer-label"},next:{title:"jwt-auth",permalink:"/zh/docs/apisix/next/plugins/jwt-auth"}},u=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u5728\u8def\u7531\u4e0a\u5b9e\u73b0\u5bc6\u94a5\u8ba4\u8bc1",id:"\u5728\u8def\u7531\u4e0a\u5b9e\u73b0\u5bc6\u94a5\u8ba4\u8bc1",children:[]},{value:"\u9690\u85cf\u4e0a\u6e38\u7684\u8eab\u4efd\u9a8c\u8bc1\u4fe1\u606f",id:"\u9690\u85cf\u4e0a\u6e38\u7684\u8eab\u4efd\u9a8c\u8bc1\u4fe1\u606f",children:[]},{value:"\u6f14\u793a\u6807\u5934\u548c\u67e5\u8be2\u4e2d\u7684\u5bc6\u94a5\u4f18\u5148\u7ea7",id:"\u6f14\u793a\u6807\u5934\u548c\u67e5\u8be2\u4e2d\u7684\u5bc6\u94a5\u4f18\u5148\u7ea7",children:[]},{value:"\u5c06\u6d88\u8d39\u8005\u81ea\u5b9a\u4e49 ID \u6dfb\u52a0\u5230\u6807\u5934",id:"\u5c06\u6d88\u8d39\u8005\u81ea\u5b9a\u4e49-id-\u6dfb\u52a0\u5230\u6807\u5934",children:[]},{value:"\u533f\u540d\u6d88\u8d39\u8005\u7684\u901f\u7387\u9650\u5236",id:"\u533f\u540d\u6d88\u8d39\u8005\u7684\u901f\u7387\u9650\u5236",children:[]}]}],k={toc:u};function d(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},k,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("head",null,(0,l.kt)("link",{rel:"canonical",href:"https://docs.api7.ai/hub/key-auth"})),(0,l.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u652f\u6301\u4f7f\u7528\u8eab\u4efd\u9a8c\u8bc1\u5bc6\u94a5\u4f5c\u4e3a\u5ba2\u6237\u7aef\u5728\u8bbf\u95ee\u4e0a\u6e38\u8d44\u6e90\u4e4b\u524d\u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\u7684\u673a\u5236\u3002"),(0,l.kt)("p",null,"\u8981\u4f7f\u7528\u8be5\u63d2\u4ef6\uff0c\u60a8\u9700\u8981\u5728 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/terminology/consumer"},"Consumers")," \u4e0a\u914d\u7f6e\u8eab\u4efd\u9a8c\u8bc1\u5bc6\u94a5\uff0c\u5e76\u5728\u8def\u7531\u6216\u670d\u52a1\u4e0a\u542f\u7528\u8be5\u63d2\u4ef6\u3002\u5bc6\u94a5\u53ef\u4ee5\u5305\u542b\u5728\u8bf7\u6c42 URL \u67e5\u8be2\u5b57\u7b26\u4e32\u6216\u8bf7\u6c42\u6807\u5934\u4e2d\u3002\u7136\u540e\uff0cAPISIX \u5c06\u9a8c\u8bc1\u5bc6\u94a5\u4ee5\u786e\u5b9a\u662f\u5426\u5e94\u5141\u8bb8\u6216\u62d2\u7edd\u8bf7\u6c42\u8bbf\u95ee\u4e0a\u6e38\u8d44\u6e90\u3002"),(0,l.kt)("p",null,"\u5f53\u6d88\u8d39\u8005\u6210\u529f\u901a\u8fc7\u8eab\u4efd\u9a8c\u8bc1\u540e\uff0cAPISIX \u4f1a\u5728\u5c06\u8bf7\u6c42\u4ee3\u7406\u5230\u4e0a\u6e38\u670d\u52a1\u4e4b\u524d\u5411\u8bf7\u6c42\u6dfb\u52a0\u5176\u4ed6\u6807\u5934\uff0c\u4f8b\u5982 ",(0,l.kt)("inlineCode",{parentName:"p"},"X-Consumer-Username"),"\u3001",(0,l.kt)("inlineCode",{parentName:"p"},"X-Credential-Indentifier")," \u548c\u5176\u4ed6\u6d88\u8d39\u8005\u81ea\u5b9a\u4e49\u6807\u5934\uff08\u5982\u679c\u5df2\u914d\u7f6e\uff09\u3002\u4e0a\u6e38\u670d\u52a1\u5c06\u80fd\u591f\u533a\u5206\u6d88\u8d39\u8005\u5e76\u6839\u636e\u9700\u8981\u5b9e\u73b0\u5176\u4ed6\u903b\u8f91\u3002\u5982\u679c\u8fd9\u4e9b\u503c\u4e2d\u7684\u4efb\u4f55\u4e00\u4e2a\u4e0d\u53ef\u7528\uff0c\u5219\u4e0d\u4f1a\u6dfb\u52a0\u76f8\u5e94\u7684\u6807\u5934\u3002"),(0,l.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,l.kt)("p",null,"Consumer/Credential \u7aef\uff1a"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"key"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e0d\u540c\u7684 Consumer \u5e94\u6709\u4e0d\u540c\u7684 ",(0,l.kt)("inlineCode",{parentName:"td"},"key"),"\uff0c\u5b83\u5e94\u5f53\u662f\u552f\u4e00\u7684\u3002\u5982\u679c\u591a\u4e2a Consumer \u4f7f\u7528\u4e86\u76f8\u540c\u7684 ",(0,l.kt)("inlineCode",{parentName:"td"},"key"),"\uff0c\u5c06\u4f1a\u51fa\u73b0\u8bf7\u6c42\u5339\u914d\u5f02\u5e38\u3002\u8be5\u5b57\u6bb5\u652f\u6301\u4f7f\u7528 ",(0,l.kt)("a",{parentName:"td",href:"/zh/docs/apisix/next/terminology/secret"},"APISIX Secret")," \u8d44\u6e90\uff0c\u5c06\u503c\u4fdd\u5b58\u5728 Secret Manager \u4e2d\u3002")))),(0,l.kt)("p",null,"\u6ce8\u610f\uff1aschema \u4e2d\u8fd8\u5b9a\u4e49\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},'encrypt_fields = {"key"}'),"\uff0c\u8fd9\u610f\u5473\u7740\u8be5\u5b57\u6bb5\u5c06\u4f1a\u88ab\u52a0\u5bc6\u5b58\u50a8\u5728 etcd \u4e2d\u3002\u5177\u4f53\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/plugin-develop#%E5%8A%A0%E5%AF%86%E5%AD%98%E5%82%A8%E5%AD%97%E6%AE%B5"},"\u52a0\u5bc6\u5b58\u50a8\u5b57\u6bb5"),"\u3002"),(0,l.kt)("p",null,"Route \u7aef\uff1a"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"header"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"apikey"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u6211\u4eec\u4ece\u54ea\u4e2a header \u83b7\u53d6 key\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"query"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"apikey"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u6211\u4eec\u4ece\u54ea\u4e2a query string \u83b7\u53d6 key\uff0c\u4f18\u5148\u7ea7\u4f4e\u4e8e ",(0,l.kt)("inlineCode",{parentName:"td"},"header"),"\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"hide_credentials"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5982\u679c\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),"\uff0c\u5219\u4e0d\u8981\u5c06\u542b\u6709\u8ba4\u8bc1\u4fe1\u606f\u7684 header \u6216 query string \u4f20\u9012\u7ed9 Upstream\u3002")))),(0,l.kt)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u6f14\u793a\u4e86\u5982\u4f55\u5728\u4e0d\u540c\u573a\u666f\u4e2d\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u3002"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,l.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,l.kt)("h3",{id:"\u5728\u8def\u7531\u4e0a\u5b9e\u73b0\u5bc6\u94a5\u8ba4\u8bc1"},"\u5728\u8def\u7531\u4e0a\u5b9e\u73b0\u5bc6\u94a5\u8ba4\u8bc1"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u6f14\u793a\u5982\u4f55\u5728\u8def\u7531\u4e0a\u5b9e\u73b0\u5bc6\u94a5\u8ba4\u8bc1\u5e76\u5c06\u5bc6\u94a5\u5305\u542b\u5728\u8bf7\u6c42\u6807\u5934\u4e2d\u3002"),(0,l.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack"),"\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "username": "jack"\n  }\'\n')),(0,l.kt)("p",null,"\u4e3a\u6d88\u8d39\u8005\u521b\u5efa ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u51ed\u8bc1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers/jack/credentials" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "cred-jack-key-auth",\n    "plugins": {\n      "key-auth": {\n        "key": "jack-key"\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u521b\u5efa\u8def\u7531\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "key-auth-route",\n    "uri": "/anything",\n    "plugins": {\n      "key-auth": {}\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')),(0,l.kt)("h4",{id:"\u4f7f\u7528\u6709\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"},"\u4f7f\u7528\u6709\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u4f7f\u7528\u6709\u6548\u5bc6\u94a5\u53d1\u9001\u8bf7\u6c42\u81f3\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i \"http://127.0.0.1:9080/anything\" -H 'apikey: jack-key'\n")),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u6536\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," \u54cd\u5e94\u3002"),(0,l.kt)("h4",{id:"\u4f7f\u7528\u65e0\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"},"\u4f7f\u7528\u65e0\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u4f7f\u7528\u65e0\u6548\u5bc6\u94a5\u53d1\u9001\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i \"http://127.0.0.1:9080/anything\" -H 'apikey: wrong-key'\n")),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 401 Unauthorized")," \u54cd\u5e94\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},'{"message":"Invalid API key in request"}\n')),(0,l.kt)("h4",{id:"\u65e0\u9700\u5bc6\u94a5\u5373\u53ef\u9a8c\u8bc1"},"\u65e0\u9700\u5bc6\u94a5\u5373\u53ef\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u65e0\u9700\u5bc6\u94a5\u5373\u53ef\u53d1\u9001\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything"\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 401 Unauthorized")," \u54cd\u5e94\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},'{"message":"Missing API key found in request"}\n')),(0,l.kt)("h3",{id:"\u9690\u85cf\u4e0a\u6e38\u7684\u8eab\u4efd\u9a8c\u8bc1\u4fe1\u606f"},"\u9690\u85cf\u4e0a\u6e38\u7684\u8eab\u4efd\u9a8c\u8bc1\u4fe1\u606f"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u6f14\u793a\u5982\u4f55\u901a\u8fc7\u914d\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"hide_credentials")," \u6765\u9632\u6b62\u5bc6\u94a5\u88ab\u53d1\u9001\u5230\u4e0a\u6e38\u670d\u52a1\u3002\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c\u8eab\u4efd\u9a8c\u8bc1\u5bc6\u94a5\u88ab\u8f6c\u53d1\u5230\u4e0a\u6e38\u670d\u52a1\uff0c\u8fd9\u5728\u67d0\u4e9b\u60c5\u51b5\u4e0b\u53ef\u80fd\u4f1a\u5bfc\u81f4\u5b89\u5168\u98ce\u9669\u3002"),(0,l.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack"),"\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "username": "jack"\n  }\'\n')),(0,l.kt)("p",null,"\u4e3a\u6d88\u8d39\u8005\u521b\u5efa ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u51ed\u8bc1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers/jack/credentials" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "cred-jack-key-auth",\n    "plugins": {\n      "key-auth": {\n        "key": "jack-key"\n      }\n    }\n  }\'\n')),(0,l.kt)("h4",{id:"\u4e0d\u9690\u85cf\u51ed\u636e"},"\u4e0d\u9690\u85cf\u51ed\u636e"),(0,l.kt)("p",null,"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u521b\u5efa\u8def\u7531\uff0c\u5e76\u5c06 ",(0,l.kt)("inlineCode",{parentName:"p"},"hide_credentials")," \u914d\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"false")," (\u9ed8\u8ba4\u914d\u7f6e)\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n-H "X-API-KEY: ${admin_key}" \\\n-d \'{\n  "id": "key-auth-route",\n  "uri": "/anything",\n  "plugins": {\n    "key-auth": {\n      "hide_credentials": false\n    }\n  },\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "httpbin.org:80": 1\n    }\n  }\n}\'\n')),(0,l.kt)("p",null,"\u53d1\u9001\u5e26\u6709\u6709\u6548\u5bc6\u94a5\u7684\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?apikey=jack-key"\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," \u54cd\u5e94\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "args": {\n    "auth": "jack-key"\n  },\n  "data": "",\n  "files": {},\n  "form": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "127.0.0.1",\n    "User-Agent": "curl/8.2.1",\n    "X-Consumer-Username": "jack",\n    "X-Credential-Identifier": "cred-jack-key-auth",\n    "X-Amzn-Trace-Id": "Root=1-6502d8a5-2194962a67aa21dd33f94bb2",\n    "X-Forwarded-Host": "127.0.0.1"\n  },\n  "json": null,\n  "method": "GET",\n  "origin": "127.0.0.1, 103.248.35.179",\n  "url": "http://127.0.0.1/anything?apikey=jack-key"\n}\n')),(0,l.kt)("p",null,"\u6ce8\u610f\u51ed\u8bc1 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack-key")," \u5bf9\u4e8e\u4e0a\u6e38\u670d\u52a1\u662f\u53ef\u89c1\u7684\u3002"),(0,l.kt)("h4",{id:"\u9690\u85cf\u51ed\u636e"},"\u9690\u85cf\u51ed\u636e"),(0,l.kt)("p",null,"\u5c06\u63d2\u4ef6\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"hide_credentials")," \u66f4\u65b0\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"true"),"\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes/key-auth-route" -X PATCH \\\n-H "X-API-KEY: ${admin_key}" \\\n-d \'{\n  "plugins": {\n    "key-auth": {\n      "hide_credentials": true\n    }\n  }\n}\'\n')),(0,l.kt)("p",null,"\u53d1\u9001\u5e26\u6709\u6709\u6548\u5bc6\u94a5\u7684\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?apikey=jack-key"\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," \u54cd\u5e94\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "args": {},\n  "data": "",\n  "files": {},\n  "form": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "127.0.0.1",\n    "User-Agent": "curl/8.2.1",\n    "X-Consumer-Username": "jack",\n    "X-Credential-Identifier": "cred-jack-key-auth",\n    "X-Amzn-Trace-Id": "Root=1-6502d85c-16f34dbb5629a5960183e803",\n    "X-Forwarded-Host": "127.0.0.1"\n  },\n  "json": null,\n  "method": "GET",\n  "origin": "127.0.0.1, 103.248.35.179",\n  "url": "http://127.0.0.1/anything"\n}\n')),(0,l.kt)("p",null,"\u6ce8\u610f\u51ed\u8bc1 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack-key")," \u5bf9\u4e0a\u6e38\u670d\u52a1\u4e0d\u518d\u53ef\u89c1\u3002"),(0,l.kt)("h3",{id:"\u6f14\u793a\u6807\u5934\u548c\u67e5\u8be2\u4e2d\u7684\u5bc6\u94a5\u4f18\u5148\u7ea7"},"\u6f14\u793a\u6807\u5934\u548c\u67e5\u8be2\u4e2d\u7684\u5bc6\u94a5\u4f18\u5148\u7ea7"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u6f14\u793a\u4e86\u5982\u4f55\u5728\u8def\u7531\u4e0a\u5b9e\u73b0\u6d88\u8d39\u8005\u7684\u5bc6\u94a5\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5e76\u81ea\u5b9a\u4e49\u5e94\u5305\u542b\u5bc6\u94a5\u7684 URL \u53c2\u6570\u3002\u8be5\u793a\u4f8b\u8fd8\u663e\u793a\uff0c\u5f53\u5728\u6807\u5934\u548c\u67e5\u8be2\u5b57\u7b26\u4e32\u4e2d\u90fd\u914d\u7f6e\u4e86 API \u5bc6\u94a5\u65f6\uff0c\u8bf7\u6c42\u6807\u5934\u5177\u6709\u66f4\u9ad8\u7684\u4f18\u5148\u7ea7\u3002"),(0,l.kt)("p",null,"\u521b\u5efa\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack"),"\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "username": "jack"\n  }\'\n')),(0,l.kt)("p",null,"\u4e3a\u6d88\u8d39\u8005\u521b\u5efa ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u51ed\u8bc1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers/jack/credentials" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "cred-jack-key-auth",\n    "plugins": {\n      "key-auth": {\n        "key": "jack-key"\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u521b\u5efa\u8def\u7531\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n-H "X-API-KEY: ${admin_key}" \\\n-d \'{\n  "id": "key-auth-route",\n  "uri": "/anything",\n  "plugins": {\n    "key-auth": {\n      "query": "auth"\n    }\n  },\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "httpbin.org:80": 1\n    }\n  }\n}\'\n')),(0,l.kt)("h4",{id:"\u4f7f\u7528\u6709\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1-1"},"\u4f7f\u7528\u6709\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u4f7f\u7528\u6709\u6548\u5bc6\u94a5\u53d1\u9001\u8bf7\u6c42\u81f3\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?auth=jack-key"\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u4f1a\u6536\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," \u54cd\u5e94\u3002"),(0,l.kt)("h4",{id:"\u4f7f\u7528\u65e0\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1-1"},"\u4f7f\u7528\u65e0\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u4f7f\u7528\u65e0\u6548\u5bc6\u94a5\u53d1\u9001\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?auth=wrong-key"\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 401 Unauthorized")," \u54cd\u5e94\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},'{"message":"Invalid API key in request"}\n')),(0,l.kt)("h4",{id:"\u4f7f\u7528\u67e5\u8be2\u5b57\u7b26\u4e32\u4e2d\u7684\u6709\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"},"\u4f7f\u7528\u67e5\u8be2\u5b57\u7b26\u4e32\u4e2d\u7684\u6709\u6548\u5bc6\u94a5\u8fdb\u884c\u9a8c\u8bc1"),(0,l.kt)("p",null,"\u4f46\u662f\uff0c\u5982\u679c\u60a8\u5728\u6807\u5934\u4e2d\u5305\u542b\u6709\u6548\u5bc6\u94a5\uff0c\u800c URL \u67e5\u8be2\u5b57\u7b26\u4e32\u4e2d\u4ecd\u5305\u542b\u65e0\u6548\u5bc6\u94a5\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i \"http://127.0.0.1:9080/anything?auth=wrong-key\" -H 'apikey: jack-key'\n")),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u4f1a\u770b\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," \u54cd\u5e94\u3002\u8fd9\u8868\u660e\u6807\u5934\u4e2d\u5305\u542b\u7684\u5bc6\u94a5\u59cb\u7ec8\u5177\u6709\u66f4\u9ad8\u7684\u4f18\u5148\u7ea7\u3002"),(0,l.kt)("h3",{id:"\u5c06\u6d88\u8d39\u8005\u81ea\u5b9a\u4e49-id-\u6dfb\u52a0\u5230\u6807\u5934"},"\u5c06\u6d88\u8d39\u8005\u81ea\u5b9a\u4e49 ID \u6dfb\u52a0\u5230\u6807\u5934"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u6f14\u793a\u4e86\u5982\u4f55\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"Consumer-Custom-Id")," \u6807\u5934\u4e2d\u5c06\u6d88\u8d39\u8005\u81ea\u5b9a\u4e49 ID \u9644\u52a0\u5230\u7ecf\u8fc7\u8eab\u4efd\u9a8c\u8bc1\u7684\u8bf7\u6c42\uff0c\u8be5 ID \u53ef\u7528\u4e8e\u6839\u636e\u9700\u8981\u5b9e\u73b0\u5176\u4ed6\u903b\u8f91\u3002"),(0,l.kt)("p",null,"\u521b\u5efa\u4e00\u4e2a\u5e26\u6709\u81ea\u5b9a\u4e49 ID \u6807\u7b7e\u7684\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack"),"\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "username": "jack",\n    "labels": {\n      "custom_id": "495aec6a"\n    }\n  }\'\n')),(0,l.kt)("p",null,"Create ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," credential for the consumer:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers/jack/credentials" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "cred-jack-key-auth",\n    "plugins": {\n      "key-auth": {\n        "key": "jack-key"\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"Create a Route with ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "key-auth-route",\n    "uri": "/anything",\n    "plugins": {\n      "key-auth": {}\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"To verify, send a request to the Route with the valid key:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i "http://127.0.0.1:9080/anything?auth=jack-key"\n')),(0,l.kt)("p",null,"You should see an ",(0,l.kt)("inlineCode",{parentName:"p"},"HTTP/1.1 200 OK")," response similar to the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "args": {\n    "auth": "jack-key"\n  },\n  "data": "",\n  "files": {},\n  "form": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "127.0.0.1",\n    "User-Agent": "curl/8.6.0",\n    "X-Amzn-Trace-Id": "Root=1-66ea8d64-33df89052ae198a706e18c2a",\n    "X-Consumer-Username": "jack",\n    "X-Credential-Identifier": "cred-jack-key-auth",\n    "X-Consumer-Custom-Id": "495aec6a",\n    "X-Forwarded-Host": "127.0.0.1"\n  },\n  "json": null,\n  "method": "GET",\n  "origin": "192.168.65.1, 205.198.122.37",\n  "url": "http://127.0.0.1/anything?apikey=jack-key"\n}\n')),(0,l.kt)("h3",{id:"\u533f\u540d\u6d88\u8d39\u8005\u7684\u901f\u7387\u9650\u5236"},"\u533f\u540d\u6d88\u8d39\u8005\u7684\u901f\u7387\u9650\u5236"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u6f14\u793a\u4e86\u5982\u4f55\u4e3a\u5e38\u89c4\u6d88\u8d39\u8005\u548c\u533f\u540d\u6d88\u8d39\u8005\u914d\u7f6e\u4e0d\u540c\u7684\u901f\u7387\u9650\u5236\u7b56\u7565\uff0c\u5176\u4e2d\u533f\u540d\u6d88\u8d39\u8005\u4e0d\u9700\u8981\u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\uff0c\u5e76\u4e14\u914d\u989d\u8f83\u5c11\u3002"),(0,l.kt)("p",null,"\u521b\u5efa\u5e38\u89c4\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack")," \u5e76\u914d\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"limit-count")," \u63d2\u4ef6\u4ee5\u5141\u8bb8 30 \u79d2\u5185\u7684\u914d\u989d\u4e3a 3\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "username": "jack",\n    "plugins": {\n      "limit-count": {\n        "count": 3,\n        "time_window": 30,\n        "rejected_code": 429\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"\u4e3a\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack")," \u521b\u5efa ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u51ed\u8bc1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers/jack/credentials" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "cred-jack-key-auth",\n    "plugins": {\n      "key-auth": {\n        "key": "jack-key"\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"\u521b\u5efa\u533f\u540d\u7528\u6237 ",(0,l.kt)("inlineCode",{parentName:"p"},"anonymous"),"\uff0c\u5e76\u914d\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"limit-count"),"\u63d2\u4ef6\uff0c\u4ee5\u5141\u8bb8 30 \u79d2\u5185\u914d\u989d\u4e3a 1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/consumers" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "username": "anonymous",\n    "plugins": {\n      "limit-count": {\n        "count": 1,\n        "time_window": 30,\n        "rejected_code": 429\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"\u521b\u5efa\u8def\u7531\u5e76\u914d\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u4ee5\u63a5\u53d7\u533f\u540d\u6d88\u8d39\u8005 ",(0,l.kt)("inlineCode",{parentName:"p"},"anonymous")," \u7ed5\u8fc7\u8eab\u4efd\u9a8c\u8bc1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://127.0.0.1:9180/apisix/admin/routes" -X PUT \\\n  -H "X-API-KEY: ${admin_key}" \\\n  -d \'{\n    "id": "key-auth-route",\n    "uri": "/anything",\n    "plugins": {\n      "key-auth": {\n        "anonymous_consumer": "anonymous"\n      }\n    },\n    "upstream": {\n      "type": "roundrobin",\n      "nodes": {\n        "httpbin.org:80": 1\n      }\n    }\n  }\'\n')),(0,l.kt)("p",null,"\u4e3a\u4e86\u9a8c\u8bc1\uff0c\u8bf7\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"jack")," \u7684\u5bc6\u94a5\u53d1\u9001\u4e94\u4e2a\u8fde\u7eed\u7684\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'resp=$(seq 5 | xargs -I{} curl "http://127.0.0.1:9080/anything" -H \'apikey: jack-key\' -o /dev/null -s -w "%{http_code}\\n") && \\\n  count_200=$(echo "$resp" | grep "200" | wc -l) && \\\n  count_429=$(echo "$resp" | grep "429" | wc -l) && \\\n  echo "200": $count_200, "429": $count_429\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b\u54cd\u5e94\uff0c\u663e\u793a\u5728 5 \u4e2a\u8bf7\u6c42\u4e2d\uff0c3 \u4e2a\u8bf7\u6c42\u6210\u529f\uff08\u72b6\u6001\u4ee3\u7801 200\uff09\uff0c\u800c\u5176\u4ed6\u8bf7\u6c42\u88ab\u62d2\u7edd\uff08\u72b6\u6001\u4ee3\u7801 429\uff09\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"200:    3, 429:    2\n")),(0,l.kt)("p",null,"\u53d1\u9001\u4e94\u4e2a\u533f\u540d\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'resp=$(seq 5 | xargs -I{} curl "http://127.0.0.1:9080/anything" -o /dev/null -s -w "%{http_code}\\n") && \\\n  count_200=$(echo "$resp" | grep "200" | wc -l) && \\\n  count_429=$(echo "$resp" | grep "429" | wc -l) && \\\n  echo "200": $count_200, "429": $count_429\n')),(0,l.kt)("p",null,"\u60a8\u5e94\u8be5\u770b\u5230\u4ee5\u4e0b\u54cd\u5e94\uff0c\u8868\u660e\u53ea\u6709\u4e00\u4e2a\u8bf7\u6c42\u6210\u529f\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},"200:    1, 429:    4\n")))}d.isMDXComponent=!0}}]);