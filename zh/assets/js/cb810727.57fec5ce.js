"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[98388],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>d});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),c=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),m=c(n),d=r,k=m["".concat(o,".").concat(d)]||m[d]||u[d]||l;return n?a.createElement(k,i(i({ref:t},s),{},{components:n})):a.createElement(k,i({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=m;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var c=2;c<l;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},18275:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const l={title:"Secret"},i=void 0,p={unversionedId:"terminology/secret",id:"version-3.10/terminology/secret",isDocsHomePage:!1,title:"Secret",description:"\u5bc6\u94a5\u662f\u6307 APISIX \u8fd0\u884c\u8fc7\u7a0b\u4e2d\u6240\u9700\u7684\u4efb\u4f55\u654f\u611f\u4fe1\u606f\uff0c\u5b83\u53ef\u80fd\u662f\u6838\u5fc3\u914d\u7f6e\u7684\u4e00\u90e8\u5206\uff08\u5982 etcd \u7684\u5bc6\u7801\uff09\uff0c\u4e5f\u53ef\u80fd\u662f\u63d2\u4ef6\u4e2d\u7684\u4e00\u4e9b\u654f\u611f\u4fe1\u606f\u3002APISIX \u4e2d\u5e38\u89c1\u7684\u5bc6\u94a5\u7c7b\u578b\u5305\u62ec\uff1a",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.10/terminology/secret.md",sourceDirName:"terminology",slug:"/terminology/secret",permalink:"/zh/docs/apisix/3.10/terminology/secret",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/terminology/secret.md",tags:[],version:"3.10",frontMatter:{title:"Secret"},sidebar:"version-3.10/docs",previous:{title:"Upstream",permalink:"/zh/docs/apisix/3.10/terminology/upstream"},next:{title:"batch-requests",permalink:"/zh/docs/apisix/3.10/plugins/batch-requests"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u4f7f\u7528\u73af\u5883\u53d8\u91cf\u7ba1\u7406\u5bc6\u94a5",id:"\u4f7f\u7528\u73af\u5883\u53d8\u91cf\u7ba1\u7406\u5bc6\u94a5",children:[{value:"\u5f15\u7528\u65b9\u5f0f",id:"\u5f15\u7528\u65b9\u5f0f",children:[]},{value:"\u793a\u4f8b\uff1a\u5728 key-auth \u63d2\u4ef6\u4e2d\u4f7f\u7528",id:"\u793a\u4f8b\u5728-key-auth-\u63d2\u4ef6\u4e2d\u4f7f\u7528",children:[]}]},{value:"\u4f7f\u7528 Vault \u7ba1\u7406\u5bc6\u94a5",id:"\u4f7f\u7528-vault-\u7ba1\u7406\u5bc6\u94a5",children:[{value:"\u5f15\u7528\u65b9\u5f0f",id:"\u5f15\u7528\u65b9\u5f0f-1",children:[]},{value:"\u793a\u4f8b\uff1a\u5728 key-auth \u63d2\u4ef6\u4e2d\u4f7f\u7528",id:"\u793a\u4f8b\u5728-key-auth-\u63d2\u4ef6\u4e2d\u4f7f\u7528-1",children:[]}]}],c={toc:o};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,"\u5bc6\u94a5\u662f\u6307 APISIX \u8fd0\u884c\u8fc7\u7a0b\u4e2d\u6240\u9700\u7684\u4efb\u4f55\u654f\u611f\u4fe1\u606f\uff0c\u5b83\u53ef\u80fd\u662f\u6838\u5fc3\u914d\u7f6e\u7684\u4e00\u90e8\u5206\uff08\u5982 etcd \u7684\u5bc6\u7801\uff09\uff0c\u4e5f\u53ef\u80fd\u662f\u63d2\u4ef6\u4e2d\u7684\u4e00\u4e9b\u654f\u611f\u4fe1\u606f\u3002APISIX \u4e2d\u5e38\u89c1\u7684\u5bc6\u94a5\u7c7b\u578b\u5305\u62ec\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u4e00\u4e9b\u7ec4\u4ef6\uff08etcd\u3001Redis\u3001Kafka \u7b49\uff09\u7684\u7528\u6237\u540d\u3001\u5bc6\u7801"),(0,r.kt)("li",{parentName:"ul"},"\u8bc1\u4e66\u7684\u79c1\u94a5"),(0,r.kt)("li",{parentName:"ul"},"API \u5bc6\u94a5"),(0,r.kt)("li",{parentName:"ul"},"\u654f\u611f\u7684\u63d2\u4ef6\u914d\u7f6e\u5b57\u6bb5\uff0c\u901a\u5e38\u7528\u4e8e\u8eab\u4efd\u9a8c\u8bc1\u3001hash\u3001\u7b7e\u540d\u6216\u52a0\u5bc6")),(0,r.kt)("p",null,"APISIX Secret \u5141\u8bb8\u7528\u6237\u5728 APISIX \u4e2d\u901a\u8fc7\u4e00\u4e9b\u5bc6\u94a5\u7ba1\u7406\u670d\u52a1\uff08Vault \u7b49\uff09\u6765\u5b58\u50a8\u5bc6\u94a5\uff0c\u5728\u4f7f\u7528\u7684\u65f6\u5019\u6839\u636e key \u8fdb\u884c\u8bfb\u53d6\uff0c\u786e\u4fdd\u5bc6\u94a5\u5728\u6574\u4e2a\u5e73\u53f0\u4e2d\u4e0d\u4ee5\u660e\u6587\u7684\u5f62\u5f0f\u5b58\u5728\u3002"),(0,r.kt)("p",null,"\u5176\u5de5\u4f5c\u539f\u7406\u5982\u56fe\u6240\u793a\uff1a\n",(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.10/docs/assets/images/secret.png",alt:"secret"})),(0,r.kt)("p",null,"APISIX \u76ee\u524d\u652f\u6301\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u5b58\u50a8\u5bc6\u94a5\uff1a"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E7%AE%A1%E7%90%86%E5%AF%86%E9%92%A5"},"\u73af\u5883\u53d8\u91cf")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#%E4%BD%BF%E7%94%A8-vault-%E7%AE%A1%E7%90%86%E5%AF%86%E9%92%A5"},"HashiCorp Vault"))),(0,r.kt)("p",null,"\u4f60\u53ef\u4ee5\u5728\u4ee5\u4e0b\u63d2\u4ef6\u7684 consumer \u914d\u7f6e\u4e2d\u901a\u8fc7\u6307\u5b9a\u683c\u5f0f\u7684\u53d8\u91cf\u6765\u4f7f\u7528 APISIX Secret \u529f\u80fd\uff0c\u6bd4\u5982 ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u3002"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u5982\u679c\u67d0\u4e2a\u914d\u7f6e\u9879\u4e3a\uff1a",(0,r.kt)("inlineCode",{parentName:"p"},'key: "$ENV://ABC"'),'\uff0c\u5f53 APISIX Secret \u4e2d\u6ca1\u6709\u68c0\u7d22\u5230 $ENV://ABC \u5bf9\u5e94\u7684\u771f\u5b9e\u503c\uff0c\u90a3\u4e48 key \u7684\u503c\u5c06\u662f "$ENV://ABC" \u800c\u4e0d\u662f ',(0,r.kt)("inlineCode",{parentName:"p"},"nil"),"\u3002"))),(0,r.kt)("h2",{id:"\u4f7f\u7528\u73af\u5883\u53d8\u91cf\u7ba1\u7406\u5bc6\u94a5"},"\u4f7f\u7528\u73af\u5883\u53d8\u91cf\u7ba1\u7406\u5bc6\u94a5"),(0,r.kt)("p",null,"\u4f7f\u7528\u73af\u5883\u53d8\u91cf\u6765\u7ba1\u7406\u5bc6\u94a5\u610f\u5473\u7740\u4f60\u53ef\u4ee5\u5c06\u5bc6\u94a5\u4fe1\u606f\u4fdd\u5b58\u5728\u73af\u5883\u53d8\u91cf\u4e2d\uff0c\u5728\u914d\u7f6e\u63d2\u4ef6\u65f6\u901a\u8fc7\u7279\u5b9a\u683c\u5f0f\u7684\u53d8\u91cf\u6765\u5f15\u7528\u73af\u5883\u53d8\u91cf\u3002APISIX \u652f\u6301\u5f15\u7528\u7cfb\u7edf\u73af\u5883\u53d8\u91cf\u548c\u901a\u8fc7 Nginx ",(0,r.kt)("inlineCode",{parentName:"p"},"env")," \u6307\u4ee4\u914d\u7f6e\u7684\u73af\u5883\u53d8\u91cf\u3002"),(0,r.kt)("h3",{id:"\u5f15\u7528\u65b9\u5f0f"},"\u5f15\u7528\u65b9\u5f0f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ENV://$env_name/$sub_key\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"env_name: \u73af\u5883\u53d8\u91cf\u540d\u79f0"),(0,r.kt)("li",{parentName:"ul"},"sub_key: \u5f53\u73af\u5883\u53d8\u91cf\u7684\u503c\u662f JSON \u5b57\u7b26\u4e32\u65f6\uff0c\u83b7\u53d6\u67d0\u4e2a\u5c5e\u6027\u7684\u503c")),(0,r.kt)("p",null,"\u5982\u679c\u73af\u5883\u53d8\u91cf\u7684\u503c\u662f\u5b57\u7b26\u4e32\u7c7b\u578b\uff0c\u5982\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"export JACK_AUTH_KEY=abc\n")),(0,r.kt)("p",null,"\u5219\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u65b9\u5f0f\u5f15\u7528\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$ENV://JACK_AUTH_KEY\n")),(0,r.kt)("p",null,"\u5982\u679c\u73af\u5883\u53d8\u91cf\u7684\u503c\u662f\u4e00\u4e2a JSON \u5b57\u7b26\u4e32\uff0c\u4f8b\u5982\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'export JACK={"auth-key":"abc","openid-key": "def"}\n')),(0,r.kt)("p",null,"\u5219\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u65b9\u5f0f\u5f15\u7528\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"# \u83b7\u53d6\u73af\u5883\u53d8\u91cf JACK \u7684 auth-key\n$ENV://JACK/auth-key\n\n# \u83b7\u53d6\u73af\u5883\u53d8\u91cf JACK \u7684 openid-key\n$ENV://JACK/openid-key\n")),(0,r.kt)("h3",{id:"\u793a\u4f8b\u5728-key-auth-\u63d2\u4ef6\u4e2d\u4f7f\u7528"},"\u793a\u4f8b\uff1a\u5728 key-auth \u63d2\u4ef6\u4e2d\u4f7f\u7528"),(0,r.kt)("p",null,"\u7b2c\u4e00\u6b65\uff1aAPISIX \u5b9e\u4f8b\u542f\u52a8\u524d\u521b\u5efa\u73af\u5883\u53d8\u91cf"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"export JACK_AUTH_KEY=abc\n")),(0,r.kt)("p",null,"\u7b2c\u4e8c\u6b65\uff1a\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u4e2d\u5f15\u7528\u73af\u5883\u53d8\u91cf"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "jack",\n    "plugins": {\n        "key-auth": {\n            "key": "$ENV://JACK_AUTH_KEY"\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u901a\u8fc7\u4ee5\u4e0a\u6b65\u9aa4\uff0c\u53ef\u4ee5\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u4e2d\u7684 key \u914d\u7f6e\u4fdd\u5b58\u5728\u73af\u5883\u53d8\u91cf\u4e2d\uff0c\u800c\u4e0d\u662f\u5728\u914d\u7f6e\u63d2\u4ef6\u65f6\u660e\u6587\u663e\u793a\u3002"),(0,r.kt)("h2",{id:"\u4f7f\u7528-vault-\u7ba1\u7406\u5bc6\u94a5"},"\u4f7f\u7528 Vault \u7ba1\u7406\u5bc6\u94a5"),(0,r.kt)("p",null,"\u4f7f\u7528 Vault \u6765\u7ba1\u7406\u5bc6\u94a5\u610f\u5473\u7740\u4f60\u53ef\u4ee5\u5c06\u5bc6\u94a5\u4fe1\u606f\u4fdd\u5b58\u5728 Vault \u670d\u52a1\u4e2d\uff0c\u5728\u914d\u7f6e\u63d2\u4ef6\u65f6\u901a\u8fc7\u7279\u5b9a\u683c\u5f0f\u7684\u53d8\u91cf\u6765\u5f15\u7528\u3002APISIX \u76ee\u524d\u652f\u6301\u5bf9\u63a5 ",(0,r.kt)("a",{parentName:"p",href:"https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v1"},"Vault KV \u5f15\u64ce\u7684 V1 \u7248\u672c"),"\u3002"),(0,r.kt)("h3",{id:"\u5f15\u7528\u65b9\u5f0f-1"},"\u5f15\u7528\u65b9\u5f0f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"$secret://$manager/$id/$secret_name/$key\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"manager: \u5bc6\u94a5\u7ba1\u7406\u670d\u52a1\uff0c\u53ef\u4ee5\u662f Vault\u3001AWS \u7b49"),(0,r.kt)("li",{parentName:"ul"},"APISIX Secret \u8d44\u6e90 ID\uff0c\u9700\u8981\u4e0e\u6dfb\u52a0 APISIX Secret \u8d44\u6e90\u65f6\u6307\u5b9a\u7684 ID \u4fdd\u6301\u4e00\u81f4"),(0,r.kt)("li",{parentName:"ul"},"secret_name: \u5bc6\u94a5\u7ba1\u7406\u670d\u52a1\u4e2d\u7684\u5bc6\u94a5\u540d\u79f0"),(0,r.kt)("li",{parentName:"ul"},"key\uff1a\u5bc6\u94a5\u7ba1\u7406\u670d\u52a1\u4e2d\u5bc6\u94a5\u5bf9\u5e94\u7684 key")),(0,r.kt)("h3",{id:"\u793a\u4f8b\u5728-key-auth-\u63d2\u4ef6\u4e2d\u4f7f\u7528-1"},"\u793a\u4f8b\uff1a\u5728 key-auth \u63d2\u4ef6\u4e2d\u4f7f\u7528"),(0,r.kt)("p",null,"\u7b2c\u4e00\u6b65\uff1a\u5728 Vault \u4e2d\u521b\u5efa\u5bf9\u5e94\u7684\u5bc6\u94a5\uff0c\u53ef\u4ee5\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"vault kv put apisix/jack auth-key=value\n")),(0,r.kt)("p",null,"\u7b2c\u4e8c\u6b65\uff1a\u901a\u8fc7 Admin API \u6dfb\u52a0 Secret \u8d44\u6e90\uff0c\u914d\u7f6e Vault \u7684\u5730\u5740\u7b49\u8fde\u63a5\u4fe1\u606f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/secrets/vault/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "https://127.0.0.1:8200"\uff0c\n    "prefix": "apisix",\n    "token": "root"\n}\'\n')),(0,r.kt)("p",null,"\u5982\u679c\u4f7f\u7528 APISIX Standalone \u7248\u672c\uff0c\u5219\u53ef\u4ee5\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.yaml"),"  \u6587\u4ef6\u4e2d\u6dfb\u52a0\u5982\u4e0b\u914d\u7f6e\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"secrets:\n  - id: vault/1\n    prefix: apisix\n    token: root\n    uri: 127.0.0.1:8200\n")),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u5b83\u73b0\u5728\u652f\u6301\u4f7f\u7528 ","[",(0,r.kt)("inlineCode",{parentName:"p"},"namespace")," \u5b57\u6bb5]","(/zh/docs/apisix/3.10/admin-api#secret-config-body-requset-parameters] \u8bbe\u7f6e ",(0,r.kt)("a",{parentName:"p",href:"https://developer.hashicorp.com/vault/docs/enterprise/namespaces#vault-api-and-namespaces"},"HashiCorp Vault Enterprise")," \u548c HCP Vault \u6240\u652f\u6301\u7684\u591a\u79df\u6237\u547d\u540d\u7a7a\u95f4\u6982\u5ff5\u3002"))),(0,r.kt)("p",null,"\u7b2c\u4e09\u6b65\uff1a\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u4e2d\u5f15\u7528 APISIX Secret \u8d44\u6e90\uff0c\u586b\u5145\u79d8\u94a5\u4fe1\u606f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "jack",\n    "plugins": {\n        "key-auth": {\n            "key": "$secret://vault/1/jack/auth-key"\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u901a\u8fc7\u4e0a\u9762\u4e24\u6b65\u64cd\u4f5c\uff0c\u5f53\u7528\u6237\u8bf7\u6c42\u547d\u4e2d ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\u65f6\uff0c\u4f1a\u901a\u8fc7 APISIX Secret \u7ec4\u4ef6\u83b7\u53d6\u5230 key \u5728 Vault \u4e2d\u7684\u771f\u5b9e\u503c\u3002"))}s.isMDXComponent=!0}}]);