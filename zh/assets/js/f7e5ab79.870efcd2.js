"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[31161],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),o=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=o(e.components);return a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),s=o(n),c=r,k=s["".concat(u,".").concat(c)]||s[c]||d[c]||l;return n?a.createElement(k,i(i({ref:t},m),{},{components:n})):a.createElement(k,i({ref:t},m))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=s;var p={};for(var u in t)hasOwnProperty.call(t,u)&&(p[u]=t[u]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var o=2;o<l;o++)i[o]=n[o];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}s.displayName="MDXCreateElement"},46186:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const l={title:"azure-functions",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Azure Functions","azure-functions"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e API \u7f51\u5173 Apache APISIX azure-functions \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},i=void 0,p={unversionedId:"plugins/azure-functions",id:"version-3.10/plugins/azure-functions",isDocsHomePage:!1,title:"azure-functions",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e API \u7f51\u5173 Apache APISIX azure-functions \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.10/plugins/azure-functions.md",sourceDirName:"plugins",slug:"/plugins/azure-functions",permalink:"/zh/docs/apisix/3.10/plugins/azure-functions",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/plugins/azure-functions.md",tags:[],version:"3.10",frontMatter:{title:"azure-functions",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Azure Functions","azure-functions"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e API \u7f51\u5173 Apache APISIX azure-functions \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"version-3.10/docs",previous:{title:"serverless",permalink:"/zh/docs/apisix/3.10/plugins/serverless"},next:{title:"openwhisk",permalink:"/zh/docs/apisix/3.10/plugins/openwhisk"}},u=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u5143\u6570\u636e",id:"\u5143\u6570\u636e",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[{value:"\u914d\u7f6e\u8def\u5f84\u8f6c\u53d1",id:"\u914d\u7f6e\u8def\u5f84\u8f6c\u53d1",children:[]}]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],o={toc:u};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\u7528\u4e8e\u5c06 ",(0,r.kt)("a",{parentName:"p",href:"https://azure.microsoft.com/en-in/services/functions/"},"Azure Serverless Function")," \u4f5c\u4e3a\u52a8\u6001\u4e0a\u6e38\u96c6\u6210\u81f3 APISIX\uff0c\u4ece\u800c\u5b9e\u73b0\u5c06\u8bbf\u95ee\u6307\u5b9a URI \u7684\u8bf7\u6c42\u4ee3\u7406\u5230 Microsoft Azure \u4e91\u670d\u52a1\u3002"),(0,r.kt)("p",null,"\u542f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\u540e\uff0c\u8be5\u63d2\u4ef6\u4f1a\u7ec8\u6b62\u5bf9\u5df2\u914d\u7f6e URI \u7684\u8bf7\u6c42\uff0c\u5e76\u4ee3\u8868\u5ba2\u6237\u7aef\u5411 Azure Functions \u53d1\u8d77\u4e00\u4e2a\u65b0\u7684\u8bf7\u6c42\u3002\u8be5\u65b0\u8bf7\u6c42\u4e2d\u643a\u5e26\u4e86\u4e4b\u524d\u914d\u7f6e\u7684\u6388\u6743\u8be6\u7ec6\u4fe1\u606f\uff0c\u5305\u62ec\u8bf7\u6c42\u5934\u3001\u8bf7\u6c42\u4f53\u548c\u53c2\u6570\uff08\u4ee5\u4e0a\u53c2\u6570\u90fd\u662f\u4ece\u539f\u59cb\u8bf7\u6c42\u4e2d\u4f20\u9012\u7684\uff09\u3002\u4e4b\u540e\u4fbf\u4f1a\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\uff0c\u5c06\u5e26\u6709\u54cd\u5e94\u5934\u3001\u72b6\u6001\u7801\u548c\u54cd\u5e94\u4f53\u7684\u4fe1\u606f\u8fd4\u56de\u7ed9\u4f7f\u7528 APISIX \u53d1\u8d77\u8bf7\u6c42\u7684\u5ba2\u6237\u7aef\u3002"),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"function_uri"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u89e6\u53d1 Serverless Functions \u7684 Azure Functions \u7aef\u70b9\u3002\u4f8b\u5982 ",(0,r.kt)("inlineCode",{parentName:"td"},"http://test-apisix.azurewebsites.net/api/HttpTrigger"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"authorization"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u8bbf\u95ee Azure Functions \u7684\u6388\u6743\u51ed\u8bc1\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"authorization.apikey"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u6388\u6743\u51ed\u8bc1\u5185\u7684\u5b57\u6bb5\u3002\u751f\u6210 API \u5bc6\u94a5\u6765\u6388\u6743\u5bf9\u7aef\u70b9\u7684\u8bf7\u6c42\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"authorization.clientid"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u6388\u6743\u51ed\u8bc1\u5185\u7684\u5b57\u6bb5\u3002\u751f\u6210\u5ba2\u6237\u7aef ID\uff08Azure Active Directory\uff09\u6765\u6388\u6743\u5bf9\u7aef\u70b9\u7684\u8bf7\u6c42\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"3000"),(0,r.kt)("td",{parentName:"tr",align:null},"[100,...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u4ee3\u7406\u8bf7\u6c42\u8d85\u65f6\uff08\u4ee5\u6beb\u79d2\u4e3a\u5355\u4f4d\uff09\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ssl_verify"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"true"),(0,r.kt)("td",{parentName:"tr",align:null},"true/false"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\u6267\u884c SSL \u9a8c\u8bc1\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"keepalive"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"true"),(0,r.kt)("td",{parentName:"tr",align:null},"true/false"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u4fdd\u6301\u8fde\u63a5\u7684\u6d3b\u52a8\u72b6\u6001\u4ee5\u4fbf\u91cd\u590d\u4f7f\u7528\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"keepalive_pool"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"5"),(0,r.kt)("td",{parentName:"tr",align:null},"[1,...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u8fde\u63a5\u65ad\u5f00\u4e4b\u524d\uff0c\u53ef\u63a5\u6536\u7684\u6700\u5927\u8bf7\u6c42\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"keepalive_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"60000"),(0,r.kt)("td",{parentName:"tr",align:null},"[1000,...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8fde\u63a5\u7a7a\u95f2\u65f6\uff0c\u4fdd\u6301\u8be5\u8fde\u63a5\u5904\u4e8e\u6d3b\u52a8\u72b6\u6001\u7684\u65f6\u95f4\uff08\u4ee5\u6beb\u79d2\u4e3a\u5355\u4f4d\uff09\u3002")))),(0,r.kt)("h2",{id:"\u5143\u6570\u636e"},"\u5143\u6570\u636e"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"master_apikey"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},'""'),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u7528\u4e8e\u8bbf\u95ee Azure Functions URI \u7684 API \u5bc6\u94a5\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"master_clientid"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},'""'),(0,r.kt)("td",{parentName:"tr",align:null},"\u53ef\u7528\u4e8e\u6388\u6743 Azure Functions URI \u7684\u5ba2\u6237\u7aef ID\uff08Active Directory\uff09\u3002")))),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\u7684\u5143\u6570\u636e\u63d0\u4f9b\u4e86\u6388\u6743\u56de\u9000\u7684\u529f\u80fd\u3002\u5b83\u5b9a\u4e49\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},"master_apikey")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"master_clientid")," \u5b57\u6bb5\uff0c\u7528\u6237\u53ef\u4ee5\u4e3a\u5173\u952e\u4efb\u52a1\u7684\u5e94\u7528\u90e8\u7f72\u58f0\u660e API \u5bc6\u94a5\u6216\u5ba2\u6237\u7aef ID\u3002\u56e0\u6b64\uff0c\u5982\u679c\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\u5c5e\u6027\u4e2d\u6ca1\u6709\u627e\u5230\u76f8\u5173\u6388\u6743\u51ed\u8bc1\uff0c\u6b64\u65f6\u5143\u6570\u636e\u4e2d\u7684\u6388\u6743\u51ed\u8bc1\u5c31\u4f1a\u53d1\u6325\u4f5c\u7528\u3002"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u6ce8\u610f")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u6388\u6743\u65b9\u5f0f\u4f18\u5148\u7ea7\u6392\u5e8f\u5982\u4e0b\uff1a"),(0,r.kt)("ol",{parentName:"div"},(0,r.kt)("li",{parentName:"ol"},"\u9996\u5148\uff0c",(0,r.kt)("inlineCode",{parentName:"li"},"azure-functions")," \u63d2\u4ef6\u5728 APISIX \u4ee3\u7406\u7684\u8bf7\u6c42\u5934\u4e2d\u5bfb\u627e ",(0,r.kt)("inlineCode",{parentName:"li"},"x-functions-key")," \u6216 ",(0,r.kt)("inlineCode",{parentName:"li"},"x-functions-clientid")," \u952e\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u5982\u679c\u6ca1\u6709\u627e\u5230\uff0c",(0,r.kt)("inlineCode",{parentName:"li"},"azure-functions")," \u63d2\u4ef6\u4f1a\u68c0\u67e5\u63d2\u4ef6\u5c5e\u6027\u4e2d\u7684\u6388\u6743\u51ed\u8bc1\u3002\u5982\u679c\u6388\u6743\u51ed\u8bc1\u5b58\u5728\uff0c",(0,r.kt)("inlineCode",{parentName:"li"},"azure-functions")," \u63d2\u4ef6\u4f1a\u5c06\u76f8\u5e94\u7684\u6388\u6743\u6807\u5934\u6dfb\u52a0\u5230\u53d1\u9001\u5230 Azure Functions \u7684\u8bf7\u6c42\u4e2d\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u5982\u679c\u672a\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"li"},"azure-functions")," \u63d2\u4ef6\u7684\u6388\u6743\u51ed\u8bc1\u5c5e\u6027\uff0cAPISIX \u5c06\u83b7\u53d6\u63d2\u4ef6\u5143\u6570\u636e\u914d\u7f6e\u5e76\u4f7f\u7528 API \u5bc6\u94a5\u3002")))),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u6dfb\u52a0\u4e00\u4e2a\u65b0\u7684 API \u5bc6\u94a5\uff0c\u8bf7\u5411 ",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/admin/plugin_metadata")," \u7aef\u70b9\u53d1\u51fa\u8bf7\u6c42\uff0c\u5e76\u9644\u4e0a\u6240\u9700\u7684\u5143\u6570\u636e\u3002\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/plugin_metadata/azure-functions \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "master_apikey" : "<Your Azure master access key>"\n}\'\n')),(0,r.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5728\u6307\u5b9a\u8def\u7531\u4e2d\u542f\u7528\u8be5\u63d2\u4ef6\uff0c\u8bf7\u786e\u4fdd\u4f60\u7684 Azure Functions \u5df2\u63d0\u524d\u90e8\u7f72\u597d\uff0c\u5e76\u6b63\u5e38\u63d0\u4f9b\u670d\u52a1\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "azure-functions": {\n            "function_uri": "http://test-apisix.azurewebsites.net/api/HttpTrigger",\n            "authorization": {\n                "apikey": "${Generated API key to access the Azure-Function}"\n            }\n        }\n    },\n    "uri": "/azure"\n}\'\n')),(0,r.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u793a\u4f8b\u914d\u7f6e\u63d2\u4ef6\u540e\uff0c\u4efb\u4f55\u5bf9 ",(0,r.kt)("inlineCode",{parentName:"p"},"/azure")," URI \u7684\u8bf7\u6c42\uff08",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP/1.1"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"HTTPS"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"HTTP2"),"\uff09\u90fd\u5c06\u8c03\u7528\u5df2\u914d\u7f6e\u7684 Azure Functions \u7684 URI\uff0c\u5e76\u4e14\u4f1a\u5c06\u54cd\u5e94\u4fe1\u606f\u8fd4\u56de\u7ed9\u5ba2\u6237\u7aef\u3002"),(0,r.kt)("p",null,"\u4e0b\u8ff0\u547d\u4ee4\u7684\u542b\u4e49\u662f\uff1aAzure Functions \u4ece\u8bf7\u6c42\u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," \u53c2\u6570\uff0c\u5e76\u8fd4\u56de\u4e00\u6761 ",(0,r.kt)("inlineCode",{parentName:"p"},'"Hello $name"')," \u6d88\u606f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i -XGET http://localhost:9080/azure\\?name=APISIX\n")),(0,r.kt)("p",null,"\u6b63\u5e38\u8fd4\u56de\u7ed3\u679c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/1.1 200 OK\nContent-Type: text/plain; charset=utf-8\n...\nHello, APISIX\n")),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u662f\u5ba2\u6237\u7aef\u901a\u8fc7 HTTP/2 \u534f\u8bae\u4e0e APISIX \u8fdb\u884c\u901a\u4fe1\u3002"),(0,r.kt)("p",null,"\u5728\u8fdb\u884c\u6d4b\u8bd5\u4e4b\u524d\uff0c\u7531\u4e8e\u8be5 ",(0,r.kt)("inlineCode",{parentName:"p"},"enable_http2: true")," \u9ed8\u8ba4\u662f\u7981\u7528\u72b6\u6001\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u5728 ",(0,r.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u4e2d\u6dfb\u52a0 ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix.node_listen")," \u4e0b\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"- port: 9081")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"enable_http2: true")," \u5b57\u6bb5\u542f\u7528\u3002\u793a\u4f8b\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apisix:\n  node_listen:                      # \u652f\u6301\u76d1\u542c\u591a\u4e2a\u7aef\u53e3\n    - 9080\n    - port: 9081\n      enable_http2: true            # \u8be5\u5b57\u6bb5\u5982\u679c\u4e0d\u8bbe\u7f6e\uff0c\u9ed8\u8ba4\u503c\u4e3a `false`\n")),(0,r.kt)("p",null,"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"curl")," \u547d\u4ee4\u6d4b\u8bd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i -XGET --http2 --http2-prior-knowledge http://localhost:9081/azure\\?name=APISIX\n")),(0,r.kt)("p",null,"\u6b63\u5e38\u8fd4\u56de\u7ed3\u679c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/2 200\ncontent-type: text/plain; charset=utf-8\n...\nHello, APISIX\n")),(0,r.kt)("h3",{id:"\u914d\u7f6e\u8def\u5f84\u8f6c\u53d1"},"\u914d\u7f6e\u8def\u5f84\u8f6c\u53d1"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\u5728\u4ee3\u7406\u8bf7\u6c42\u5230 Azure Functions \u4e0a\u6e38\u65f6\u4e5f\u652f\u6301 URL \u8def\u5f84\u8f6c\u53d1\u3002\u57fa\u672c\u8bf7\u6c42\u8def\u5f84\u7684\u6269\u5c55\u88ab\u9644\u52a0\u5230\u63d2\u4ef6\u914d\u7f6e\u4e2d\u6307\u5b9a\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"function_uri")," \u5b57\u6bb5\u4e0a\u3002"),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"\u91cd\u8981")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u56e0\u4e3a APISIX \u8def\u7531\u662f\u4e25\u683c\u5339\u914d\u7684\uff0c\u6240\u4ee5\u4e3a\u4e86\u4f7f ",(0,r.kt)("inlineCode",{parentName:"p"},"azure-functions")," \u63d2\u4ef6\u6b63\u5e38\u5de5\u4f5c\uff0c\u5728\u8def\u7531\u4e0a\u914d\u7f6e\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"uri")," \u5b57\u6bb5\u5fc5\u987b\u4ee5 ",(0,r.kt)("inlineCode",{parentName:"p"},"*")," \u7ed3\u5c3e\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"*")," \u610f\u5473\u7740\u8fd9\u4e2a URI \u7684\u4efb\u4f55\u5b50\u8def\u5f84\u90fd\u4f1a\u88ab\u5339\u914d\u5230\u540c\u4e00\u4e2a\u8def\u7531\u3002"))),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u901a\u8fc7\u914d\u7f6e\u6587\u4ef6\u5b9e\u73b0\u8def\u5f84\u8f6c\u53d1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "azure-functions": {\n            "function_uri": "http://app-bisakh.azurewebsites.net/api",\n            "authorization": {\n                "apikey": "${Generated API key to access the Azure-Function}"\n            }\n        }\n    },\n    "uri": "/azure/*"\n}\'\n')),(0,r.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u793a\u4f8b\u914d\u7f6e\u63d2\u4ef6\u540e\uff0c\u4efb\u4f55\u8bbf\u95ee ",(0,r.kt)("inlineCode",{parentName:"p"},"azure/HttpTrigger1")," \u7684\u8bf7\u6c42\u90fd\u4f1a\u8c03\u7528 Azure Functions \u5e76\u8f6c\u53d1\u9644\u52a0\u7684\u53c2\u6570\u3002"),(0,r.kt)("p",null,"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"curl")," \u547d\u4ee4\u6d4b\u8bd5\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i -XGET http://127.0.0.1:9080/azure/HttpTrigger1\\?name\\=APISIX\\\n")),(0,r.kt)("p",null,"\u6b63\u5e38\u8fd4\u56de\u7ed3\u679c\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/1.1 200 OK\nContent-Type: text/plain; charset=utf-8\n...\nHello, APISIX\n")),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u5220\u9664\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/azure",\n    "plugins": {},\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}m.isMDXComponent=!0}}]);