"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[24499],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(g,i(i({ref:t},p),{},{components:n})):r.createElement(g,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},18820:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const o={title:"Global Rules",keywords:["API Gateway","Apache APISIX","Global Rules"],description:"This article describes how to use global rules."},i=void 0,l={unversionedId:"terminology/global-rule",id:"version-3.12/terminology/global-rule",isDocsHomePage:!1,title:"Global Rules",description:"This article describes how to use global rules.",source:"@site/docs-apisix_versioned_docs/version-3.12/terminology/global-rule.md",sourceDirName:"terminology",slug:"/terminology/global-rule",permalink:"/docs/apisix/terminology/global-rule",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/terminology/global-rule.md",tags:[],version:"3.12",frontMatter:{title:"Global Rules",keywords:["API Gateway","Apache APISIX","Global Rules"],description:"This article describes how to use global rules."},sidebar:"version-3.12/docs",previous:{title:"Credential",permalink:"/docs/apisix/terminology/credential"},next:{title:"Plugin",permalink:"/docs/apisix/terminology/plugin"}},s=[{value:"Description",id:"description",children:[]},{value:"Example",id:"example",children:[]}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)("p",null,"A ",(0,a.kt)("a",{parentName:"p",href:"/docs/apisix/terminology/plugin"},"Plugin")," configuration can be bound directly to a ",(0,a.kt)("a",{parentName:"p",href:"/docs/apisix/terminology/route"},"Route"),", a ",(0,a.kt)("a",{parentName:"p",href:"/docs/apisix/terminology/service"},"Service")," or a ",(0,a.kt)("a",{parentName:"p",href:"/docs/apisix/terminology/consumer"},"Consumer"),". But what if we want a Plugin to work on all requests? This is where we register a global Plugin with Global Rule."),(0,a.kt)("p",null,"Compared with the plugin configuration in Route, Service, Plugin Config, and Consumer, the plugin in the Global Rules is always executed first."),(0,a.kt)("h2",{id:"example"},"Example"),(0,a.kt)("p",null,"The example below shows how you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"limit-count")," Plugin on all requests:"),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"You can fetch the ",(0,a.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,a.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl -X PUT \\\n  http://{apisix_listen_address}/apisix/admin/global_rules/1 \\\n  -H \'Content-Type: application/json\' \\\n  -H "X-API-KEY: $admin_key" \\\n  -d \'{\n        "plugins": {\n            "limit-count": {\n                "time_window": 60,\n                "policy": "local",\n                "count": 2,\n                "key": "remote_addr",\n                "rejected_code": 503\n            }\n        }\n    }\'\n')),(0,a.kt)("p",null,"You can also list all the Global rules by making this request with the Admin API:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://{apisix_listen_address}/apisix/admin/global_rules -H "X-API-KEY: $admin_key"\n')))}p.isMDXComponent=!0}}]);