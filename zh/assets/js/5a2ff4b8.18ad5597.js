"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[1276],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var a=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var m=a.createContext({}),o=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=o(e.components);return a.createElement(m.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,m=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),s=o(n),k=l,c=s["".concat(m,".").concat(k)]||s[k]||d[k]||r;return n?a.createElement(c,i(i({ref:t},u),{},{components:n})):a.createElement(c,i({ref:t},u))}));function k(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,i=new Array(r);i[0]=s;var p={};for(var m in t)hasOwnProperty.call(t,m)&&(p[m]=t[m]);p.originalType=e,p.mdxType="string"==typeof e?e:l,i[1]=p;for(var o=2;o<r;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},4194:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>p,toc:()=>m});var a=n(87462),l=(n(67294),n(3905));const r={title:"jwt-auth",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","JWT Auth","jwt-auth"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `jwt-auth` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},i=void 0,p={unversionedId:"plugins/jwt-auth",id:"version-3.10/plugins/jwt-auth",isDocsHomePage:!1,title:"jwt-auth",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `jwt-auth` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.10/plugins/jwt-auth.md",sourceDirName:"plugins",slug:"/plugins/jwt-auth",permalink:"/zh/docs/apisix/3.10/plugins/jwt-auth",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/plugins/jwt-auth.md",tags:[],version:"3.10",frontMatter:{title:"jwt-auth",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","JWT Auth","jwt-auth"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `jwt-auth` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"version-3.10/docs",previous:{title:"key-auth",permalink:"/zh/docs/apisix/3.10/plugins/key-auth"},next:{title:"jwe-decrypt",permalink:"/zh/docs/apisix/3.10/plugins/jwe-decrypt"}},m=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u63a5\u53e3",id:"\u63a5\u53e3",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],o={toc:m};function u(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"jwt-auth")," \u63d2\u4ef6\u7528\u4e8e\u5c06 ",(0,l.kt)("a",{parentName:"p",href:"https://jwt.io/"},"JWT")," \u8eab\u4efd\u9a8c\u8bc1\u6dfb\u52a0\u5230 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/terminology/service"},"Service")," \u6216 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/terminology/route"},"Route")," \u4e2d\u3002"),(0,l.kt)("p",null,"\u901a\u8fc7 Consumer \u5c06\u5176\u5bc6\u5319\u6dfb\u52a0\u5230\u67e5\u8be2\u5b57\u7b26\u4e32\u53c2\u6570\u3001\u8bf7\u6c42\u5934\u6216 ",(0,l.kt)("inlineCode",{parentName:"p"},"cookie")," \u4e2d\u7528\u6765\u9a8c\u8bc1\u5176\u8bf7\u6c42\u3002"),(0,l.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,l.kt)("p",null,"Consumer \u7aef\uff1a"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"key"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"Consumer \u7684 ",(0,l.kt)("inlineCode",{parentName:"td"},"access_key")," \u5fc5\u987b\u662f\u552f\u4e00\u7684\u3002\u5982\u679c\u4e0d\u540c Consumer \u4f7f\u7528\u4e86\u76f8\u540c\u7684 ",(0,l.kt)("inlineCode",{parentName:"td"},"access_key")," \uff0c\u5c06\u4f1a\u51fa\u73b0\u8bf7\u6c42\u5339\u914d\u5f02\u5e38\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"secret"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u52a0\u5bc6\u79d8\u94a5\u3002\u5982\u679c\u672a\u6307\u5b9a\uff0c\u540e\u53f0\u5c06\u4f1a\u81ea\u52a8\u751f\u6210\u3002\u8be5\u5b57\u6bb5\u652f\u6301\u4f7f\u7528 ",(0,l.kt)("a",{parentName:"td",href:"/zh/docs/apisix/3.10/terminology/secret"},"APISIX Secret")," \u8d44\u6e90\uff0c\u5c06\u503c\u4fdd\u5b58\u5728 Secret Manager \u4e2d\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"public_key"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"RSA \u6216 ECDSA \u516c\u94a5\uff0c ",(0,l.kt)("inlineCode",{parentName:"td"},"algorithm")," \u5c5e\u6027\u9009\u62e9 ",(0,l.kt)("inlineCode",{parentName:"td"},"RS256")," \u6216 ",(0,l.kt)("inlineCode",{parentName:"td"},"ES256")," \u7b97\u6cd5\u65f6\u5fc5\u9009\u3002\u8be5\u5b57\u6bb5\u652f\u6301\u4f7f\u7528 ",(0,l.kt)("a",{parentName:"td",href:"/zh/docs/apisix/3.10/terminology/secret"},"APISIX Secret")," \u8d44\u6e90\uff0c\u5c06\u503c\u4fdd\u5b58\u5728 Secret Manager \u4e2d\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"private_key"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"RSA \u6216 ECDSA \u79c1\u94a5\uff0c ",(0,l.kt)("inlineCode",{parentName:"td"},"algorithm")," \u5c5e\u6027\u9009\u62e9 ",(0,l.kt)("inlineCode",{parentName:"td"},"RS256")," \u6216 ",(0,l.kt)("inlineCode",{parentName:"td"},"ES256")," \u7b97\u6cd5\u65f6\u5fc5\u9009\u3002\u8be5\u5b57\u6bb5\u652f\u6301\u4f7f\u7528 ",(0,l.kt)("a",{parentName:"td",href:"/zh/docs/apisix/3.10/terminology/secret"},"APISIX Secret")," \u8d44\u6e90\uff0c\u5c06\u503c\u4fdd\u5b58\u5728 Secret Manager \u4e2d\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"algorithm"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},'"HS256"'),(0,l.kt)("td",{parentName:"tr",align:null},'["HS256", "HS512", "RS256", "ES256"]'),(0,l.kt)("td",{parentName:"tr",align:null},"\u52a0\u5bc6\u7b97\u6cd5\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"exp"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"86400"),(0,l.kt)("td",{parentName:"tr",align:null},"[1,...]"),(0,l.kt)("td",{parentName:"tr",align:null},"token \u7684\u8d85\u65f6\u65f6\u95f4\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"base64_secret"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u5bc6\u94a5\u4e3a base64 \u7f16\u7801\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"lifetime_grace_period"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"0"),(0,l.kt)("td",{parentName:"tr",align:null},"[0,...]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5b9a\u4e49\u751f\u6210 JWT \u7684\u670d\u52a1\u5668\u548c\u9a8c\u8bc1 JWT \u7684\u670d\u52a1\u5668\u4e4b\u95f4\u7684\u65f6\u949f\u504f\u79fb\u3002\u8be5\u503c\u5e94\u8be5\u662f\u96f6\uff080\uff09\u6216\u4e00\u4e2a\u6b63\u6574\u6570\u3002")))),(0,l.kt)("p",null,"\u6ce8\u610f\uff1aschema \u4e2d\u8fd8\u5b9a\u4e49\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},'encrypt_fields = {"secret", "private_key"}'),"\uff0c\u8fd9\u610f\u5473\u7740\u8be5\u5b57\u6bb5\u5c06\u4f1a\u88ab\u52a0\u5bc6\u5b58\u50a8\u5728 etcd \u4e2d\u3002\u5177\u4f53\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/plugin-develop#%E5%8A%A0%E5%AF%86%E5%AD%98%E5%82%A8%E5%AD%97%E6%AE%B5"},"\u52a0\u5bc6\u5b58\u50a8\u5b57\u6bb5"),"\u3002"),(0,l.kt)("p",null,"Route \u7aef\uff1a"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"header"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"authorization"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u6211\u4eec\u4ece\u54ea\u4e2a header \u83b7\u53d6 token\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"query"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"jwt"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u6211\u4eec\u4ece\u54ea\u4e2a query string \u83b7\u53d6 token\uff0c\u4f18\u5148\u7ea7\u4f4e\u4e8e header\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"cookie"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"jwt"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u6211\u4eec\u4ece\u54ea\u4e2a cookie \u83b7\u53d6 token\uff0c\u4f18\u5148\u7ea7\u4f4e\u4e8e query\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"hide_credentials"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8be5\u53c2\u6570\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u5219\u4e0d\u4f1a\u5c06\u542b\u6709\u8ba4\u8bc1\u4fe1\u606f\u7684 header\\query\\cookie \u4f20\u9012\u7ed9 Upstream\u3002")))),(0,l.kt)("p",null,"\u60a8\u53ef\u4ee5\u4f7f\u7528 ",(0,l.kt)("a",{parentName:"p",href:"https://www.vaultproject.io/"},"HashiCorp Vault")," \u5b9e\u65bd ",(0,l.kt)("inlineCode",{parentName:"p"},"jwt-auth"),"\uff0c\u4ee5\u4ece\u5176",(0,l.kt)("a",{parentName:"p",href:"https://developer.hashicorp.com/vault/docs/secrets/kv"},"\u52a0\u5bc6\u7684 KV \u5f15\u64ce")," \u4f7f\u7528 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/terminology/secret"},"APISIX Secret")," \u8d44\u6e90\u3002"),(0,l.kt)("h2",{id:"\u63a5\u53e3"},"\u63a5\u53e3"),(0,l.kt)("p",null,"\u8be5\u63d2\u4ef6\u4f1a\u589e\u52a0 ",(0,l.kt)("inlineCode",{parentName:"p"},"/apisix/plugin/jwt/sign")," \u63a5\u53e3\u3002"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u4f60\u9700\u8981\u901a\u8fc7 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/public-api"},"public-api")," \u63d2\u4ef6\u6765\u66b4\u9732\u5b83\u3002"))),(0,l.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,l.kt)("p",null,"\u5982\u679c\u60f3\u8981\u542f\u7528\u63d2\u4ef6\uff0c\u5c31\u5fc5\u987b\u4f7f\u7528 JWT token \u521b\u5efa\u4e00\u4e2a Consumer \u5bf9\u8c61\uff0c\u5e76\u5c06 Route \u914d\u7f6e\u4e3a\u4f7f\u7528 JWT \u8eab\u4efd\u9a8c\u8bc1\u3002"),(0,l.kt)("p",null,"\u9996\u5148\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7 Admin API \u521b\u5efa\u4e00\u4e2a Consumer\uff1a"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,l.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "jack",\n    "plugins": {\n        "jwt-auth": {\n            "key": "user-key",\n            "secret": "my-secret-key"\n        }\n    }\n}\'\n')),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},(0,l.kt)("inlineCode",{parentName:"p"},"jwt-auth")," \u9ed8\u8ba4\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"HS256")," \u7b97\u6cd5\uff0c\u5982\u679c\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"RS256")," \u7b97\u6cd5\uff0c\u9700\u8981\u6307\u5b9a\u7b97\u6cd5\uff0c\u5e76\u914d\u7f6e\u516c\u94a5\u4e0e\u79c1\u94a5\uff0c\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "kerouac",\n    "plugins": {\n        "jwt-auth": {\n            "key": "user-key",\n            "public_key": "-----BEGIN PUBLIC KEY-----\\n\u2026\u2026\\n-----END PUBLIC KEY-----",\n            "private_key": "-----BEGIN RSA PRIVATE KEY-----\\n\u2026\u2026\\n-----END RSA PRIVATE KEY-----",\n            "algorithm": "RS256"\n        }\n    }\n}\'\n')))),(0,l.kt)("p",null,"\u521b\u5efa Consumer \u5bf9\u8c61\u540e\uff0c\u4f60\u53ef\u4ee5\u521b\u5efa Route \u8fdb\u884c\u9a8c\u8bc1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/index.html",\n    "plugins": {\n        "jwt-auth": {}\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,l.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,l.kt)("p",null,"\u9996\u5148\uff0c\u4f60\u9700\u8981\u4e3a\u7b7e\u53d1 token \u7684 API \u914d\u7f6e\u4e00\u4e2a Route\uff0c\u8be5\u8def\u7531\u5c06\u4f7f\u7528 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/public-api"},"public-api")," \u63d2\u4ef6\u3002"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/jas \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/apisix/plugin/jwt/sign",\n    "plugins": {\n        "public-api": {}\n    }\n}\'\n')),(0,l.kt)("p",null,"\u4e4b\u540e\u5c31\u53ef\u4ee5\u901a\u8fc7\u8c03\u7528\u5b83\u6765\u83b7\u53d6 token \u4e86\u3002"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6ca1\u6709\u989d\u5916\u7684 payload:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/apisix/plugin/jwt/sign?key=user-key -i\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"HTTP/1.1 200 OK\nDate: Wed, 24 Jul 2019 10:33:31 GMT\nContent-Type: text/plain\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX web server\n\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ1c2VyLWtleSIsImV4cCI6MTU2NDA1MDgxMXx.Us8zh_4VjJXF-TmR5f8cif8mBU7SuefPlpxhH0jbPVI\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u6709\u989d\u5916\u7684 payload:")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -G --data-urlencode \'payload={"uid":10000,"uname":"test"}\' http://127.0.0.1:9080/apisix/plugin/jwt/sign?key=user-key -i\n')),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"HTTP/1.1 200 OK\nDate: Wed, 21 Apr 2021 06:43:59 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX/2.4\n\neyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmFtZSI6InRlc3QiLCJ1aWQiOjEwMDAwLCJrZXkiOiJ1c2VyLWtleSIsImV4cCI6MTYxOTA3MzgzOX0.jI9-Rpz1gc3u8Y6lZy8I43RXyCu0nSHANCvfn0YZUCY\n")),(0,l.kt)("p",null,"\u73b0\u5728\u4f60\u53ef\u4ee5\u4f7f\u7528\u83b7\u53d6\u5230\u7684 token \u8fdb\u884c\u8bf7\u6c42\u5c1d\u8bd5"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"token \u653e\u5230\u8bf7\u6c42\u5934\u4e2d\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/index.html \\-H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ1c2VyLWtleSIsImV4cCI6MTU2NDA1MDgxMX0.Us8zh_4VjJXF-TmR5f8cif8mBU7SuefPlpxhH0jbPVI' -i\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 13175\n...\nAccept-Ranges: bytes\n<!DOCTYPE html>\n<html lang="cn">\n...\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u7f3a\u5c11 token")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/index.html -i\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 401 Unauthorized\n...\n{"message":"Missing JWT token in request"}\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"token \u653e\u5230\u8bf7\u6c42\u53c2\u6570\u4e2d\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/index.html?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ1c2VyLWtleSIsImV4cCI6MTU2NDA1MDgxMX0.Us8zh_4VjJXF-TmR5f8cif8mBU7SuefPlpxhH0jbPVI -i\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 13175\n...\nAccept-Ranges: bytes\n\n<!DOCTYPE html>\n<html lang="cn">\n...\n')),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"token \u653e\u5230 cookie \u4e2d\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/index.html --cookie jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ1c2VyLWtleSIsImV4cCI6MTU2NDA1MDgxMX0.Us8zh_4VjJXF-TmR5f8cif8mBU7SuefPlpxhH0jbPVI -i\n")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 200 OK\nContent-Type: text/html\nContent-Length: 13175\n...\nAccept-Ranges: bytes\n\n<!DOCTYPE html>\n<html lang="cn">\n...\n')),(0,l.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,l.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u7981\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"jwt-auth")," \u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/index.html",\n    "id": 1,\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}u.isMDXComponent=!0}}]);