"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[52855],{3905:(t,e,a)=>{a.d(e,{Zo:()=>d,kt:()=>u});var n=a(67294);function l(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){l(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function p(t,e){if(null==t)return{};var a,n,l=function(t,e){if(null==t)return{};var a,n,l={},r=Object.keys(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||(l[a]=t[a]);return l}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)a=r[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(l[a]=t[a])}return l}var o=n.createContext({}),m=function(t){var e=n.useContext(o),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},d=function(t){var e=m(t.components);return n.createElement(o.Provider,{value:e},t.children)},k={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},N=n.forwardRef((function(t,e){var a=t.components,l=t.mdxType,r=t.originalType,o=t.parentName,d=p(t,["components","mdxType","originalType","parentName"]),N=m(a),u=l,s=N["".concat(o,".").concat(u)]||N[u]||k[u]||r;return a?n.createElement(s,i(i({ref:e},d),{},{components:a})):n.createElement(s,i({ref:e},d))}));function u(t,e){var a=arguments,l=e&&e.mdxType;if("string"==typeof t||l){var r=a.length,i=new Array(r);i[0]=N;var p={};for(var o in e)hasOwnProperty.call(e,o)&&(p[o]=e[o]);p.originalType=t,p.mdxType="string"==typeof t?t:l,i[1]=p;for(var m=2;m<r;m++)i[m]=a[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}N.displayName="MDXCreateElement"},73978:(t,e,a)=>{a.r(e),a.d(e,{contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>p,toc:()=>o});var n=a(87462),l=(a(67294),a(3905));const r={title:"authz-keycloak",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Authz Keycloak","authz-keycloak"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `authz-keycloak` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},i=void 0,p={unversionedId:"plugins/authz-keycloak",id:"plugins/authz-keycloak",isDocsHomePage:!1,title:"authz-keycloak",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `authz-keycloak` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/current/plugins/authz-keycloak.md",sourceDirName:"plugins",slug:"/plugins/authz-keycloak",permalink:"/zh/docs/apisix/next/plugins/authz-keycloak",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/master/docs/zh/latest/plugins/authz-keycloak.md",tags:[],version:"current",frontMatter:{title:"authz-keycloak",keywords:["Apache APISIX","API \u7f51\u5173","Plugin","Authz Keycloak","authz-keycloak"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5173\u4e8e Apache APISIX `authz-keycloak` \u63d2\u4ef6\u7684\u57fa\u672c\u4fe1\u606f\u53ca\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"docs",previous:{title:"basic-auth",permalink:"/zh/docs/apisix/next/plugins/basic-auth"},next:{title:"authz-casdoor",permalink:"/zh/docs/apisix/next/plugins/authz-casdoor"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u5982\u4f55\u542f\u7528",id:"\u5982\u4f55\u542f\u7528",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]},{value:"\u63d2\u4ef6 Roadmap",id:"\u63d2\u4ef6-roadmap",children:[]}],m={toc:o};function d(t){let{components:e,...a}=t;return(0,l.kt)("wrapper",(0,n.Z)({},m,a,{components:e,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"authz-keycloak")," \u63d2\u4ef6\u53ef\u7528\u4e8e\u901a\u8fc7 ",(0,l.kt)("a",{parentName:"p",href:"https://www.keycloak.org/"},"Keycloak Identity Server")," \u6dfb\u52a0\u8eab\u4efd\u9a8c\u8bc1\u3002"),(0,l.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u867d\u7136\u8be5\u63d2\u4ef6\u662f\u4e3a\u4e86\u4e0e Keycloak \u4e00\u8d77\u4f7f\u7528\u800c\u5f00\u53d1\u7684\uff0c\u4f46\u662f\u5b83\u4e5f\u53ef\u4ee5\u4e0e\u4efb\u4f55\u7b26\u5408 OAuth/OIDC \u6216 UMA \u534f\u8bae\u7684\u8eab\u4efd\u8ba4\u8bc1\u8f6f\u4ef6\u4e00\u8d77\u4f7f\u7528\u3002"))),(0,l.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u4e86\u89e3 Keycloak \u7684\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://www.keycloak.org/docs/latest/authorization_services/"},"Authorization Services Guide"),"\u3002"),(0,l.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,l.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,l.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,l.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,l.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"discovery"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"https://host.domain/realms/foo/.well-known/uma2-configuration"},"https://host.domain/realms/foo/.well-known/uma2-configuration")),(0,l.kt)("td",{parentName:"tr",align:null},"Keycloak \u6388\u6743\u670d\u52a1\u7684 ",(0,l.kt)("a",{parentName:"td",href:"https://www.keycloak.org/docs/latest/authorization_services/index.html"},"discovery document")," \u7684 URL\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"token_endpoint"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"https://host.domain/realms/foo/protocol/openid-connect/token"},"https://host.domain/realms/foo/protocol/openid-connect/token")),(0,l.kt)("td",{parentName:"tr",align:null},"\u63a5\u53d7 OAuth2 \u517c\u5bb9 token \u7684\u63a5\u53e3\uff0c\u9700\u8981\u652f\u6301 ",(0,l.kt)("inlineCode",{parentName:"td"},"urn:ietf:params:oauth:grant-type:uma-ticket")," \u6388\u6743\u7c7b\u578b\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"resource_registration_endpoint"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},(0,l.kt)("a",{parentName:"td",href:"https://host.domain/realms/foo/authz/protection/resource_set"},"https://host.domain/realms/foo/authz/protection/resource_set")),(0,l.kt)("td",{parentName:"tr",align:null},"\u7b26\u5408 UMA \u7684\u8d44\u6e90\u6ce8\u518c\u7aef\u70b9\u3002\u5982\u679c\u63d0\u4f9b\uff0c\u5219\u8986\u76d6\u53d1\u73b0\u4e2d\u7684\u503c\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client_id"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef\u6b63\u5728\u5bfb\u6c42\u8bbf\u95ee\u7684\u8d44\u6e90\u670d\u52a1\u5668\u7684\u6807\u8bc6\u7b26\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"client_secret"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef\u5bc6\u7801\uff08\u5982\u679c\u9700\u8981\uff09\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"grant_type"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},'"urn:ietf:params:oauth:grant-type:uma-ticket"'),(0,l.kt)("td",{parentName:"tr",align:null},'["urn:ietf:params:oauth:grant-type:uma-ticket"]'),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"policy_enforcement_mode"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},'"ENFORCING"'),(0,l.kt)("td",{parentName:"tr",align:null},'["ENFORCING", "PERMISSIVE"]'),(0,l.kt)("td",{parentName:"tr",align:null})),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"permissions"),(0,l.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"\u63cf\u8ff0\u5ba2\u6237\u7aef\u5e94\u7528\u6240\u9700\u8bbf\u95ee\u7684\u8d44\u6e90\u548c\u6743\u9650\u8303\u56f4\u7684\u5b57\u7b26\u4e32\u3002\u683c\u5f0f\u5fc5\u987b\u4e3a\uff1a",(0,l.kt)("inlineCode",{parentName:"td"},"RESOURCE_ID#SCOPE_ID"),"\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"lazy_load_paths"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"[true, false]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a true \u65f6\uff0c\u4f7f\u7528\u8d44\u6e90\u6ce8\u518c\u7aef\u70b9\u800c\u4e0d\u662f\u9759\u6001\u6743\u9650\u5c06\u8bf7\u6c42 URI \u52a8\u6001\u89e3\u6790\u4e3a\u8d44\u6e90\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"http_method_as_scope"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"false"),(0,l.kt)("td",{parentName:"tr",align:null},"[true, false]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u4e3a true \u65f6\uff0c\u5c06 HTTP \u8bf7\u6c42\u7c7b\u578b\u6620\u5c04\u5230\u540c\u540d\u8303\u56f4\u5e76\u6dfb\u52a0\u5230\u6240\u6709\u8bf7\u6c42\u7684\u6743\u9650\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"3000"),(0,l.kt)("td",{parentName:"tr",align:null},"[1000, ...]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u4e0e Identity Server \u7684 HTTP \u8fde\u63a5\u8d85\u65f6\uff08\u6beb\u79d2\uff09\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"access_token_expires_in"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"300"),(0,l.kt)("td",{parentName:"tr",align:null},"[1, ...]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbf\u95ee\u4ee4\u724c\u7684\u6709\u6548\u671f\u3002token.")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"access_token_expires_leeway"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"0"),(0,l.kt)("td",{parentName:"tr",align:null},"[0, ...]"),(0,l.kt)("td",{parentName:"tr",align:null},"access_token \u66f4\u65b0\u7684\u5230\u671f\u4f59\u5730\u3002\u8bbe\u7f6e\u540e\uff0c\u4ee4\u724c\u5c06\u5728\u5230\u671f\u524d\u51e0\u79d2\u66f4\u65b0 access_token_expires_leeway\u3002\u8fd9\u907f\u514d\u4e86 access_token \u5728\u5230\u8fbe OAuth \u8d44\u6e90\u670d\u52a1\u5668\u65f6\u521a\u521a\u8fc7\u671f\u7684\u60c5\u51b5\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"refresh_token_expires_in"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"3600"),(0,l.kt)("td",{parentName:"tr",align:null},"[1, ...]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5237\u65b0\u4ee4\u724c\u7684\u5931\u6548\u65f6\u95f4\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"refresh_token_expires_leeway"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"0"),(0,l.kt)("td",{parentName:"tr",align:null},"[0, ...]"),(0,l.kt)("td",{parentName:"tr",align:null},"refresh_token \u66f4\u65b0\u7684\u5230\u671f\u4f59\u5730\u3002\u8bbe\u7f6e\u540e\uff0c\u4ee4\u724c\u5c06\u5728\u5230\u671f\u524d\u51e0\u79d2\u5237\u65b0 refresh_token_expires_leeway\u3002\u8fd9\u6837\u53ef\u4ee5\u907f\u514d\u5728\u5230\u8fbe OAuth \u8d44\u6e90\u670d\u52a1\u5668\u65f6 refresh_token \u521a\u521a\u8fc7\u671f\u7684\u9519\u8bef\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"ssl_verify"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"[true, false]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u9a8c\u8bc1 TLS \u8bc1\u4e66\u662f\u5426\u4e0e\u4e3b\u673a\u540d\u5339\u914d\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"cache_ttl_seconds"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"86400 (equivalent to 24h)"),(0,l.kt)("td",{parentName:"tr",align:null},"positive integer >= 1"),(0,l.kt)("td",{parentName:"tr",align:null},"\u63d2\u4ef6\u7f13\u5b58\u63d2\u4ef6\u7528\u4e8e\u5411 Keycloak \u8fdb\u884c\u8eab\u4efd\u9a8c\u8bc1\u7684\u53d1\u73b0\u6587\u6863\u548c\u4ee4\u724c\u7684\u6700\u957f\u65f6\u95f4\uff08\u4ee5\u79d2\u4e3a\u5355\u4f4d\uff09\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"keepalive"),(0,l.kt)("td",{parentName:"tr",align:null},"boolean"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"true"),(0,l.kt)("td",{parentName:"tr",align:null},"[true, false]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u542f\u7528 HTTP keep-alive \u4fdd\u8bc1\u5728\u4f7f\u7528\u540e\u4ecd\u7136\u4fdd\u6301\u8fde\u63a5\u6253\u5f00\u3002\u5982\u679c\u60a8\u671f\u671b\u5bf9 Keycloak \u6709\u5f88\u591a\u8bf7\u6c42\uff0c\u8bf7\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"td"},"true"),"\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"keepalive_timeout"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"60000"),(0,l.kt)("td",{parentName:"tr",align:null},"positive integer >= 1000"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5df2\u5efa\u7acb\u7684 HTTP \u8fde\u63a5\u5c06\u5173\u95ed\u4e4b\u524d\u7684\u7a7a\u95f2\u65f6\u95f4\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"keepalive_pool"),(0,l.kt)("td",{parentName:"tr",align:null},"integer"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null},"5"),(0,l.kt)("td",{parentName:"tr",align:null},"positive integer >= 1"),(0,l.kt)("td",{parentName:"tr",align:null},"\u8fde\u63a5\u6c60\u4e2d\u7684\u6700\u5927\u8fde\u63a5\u6570\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"access_denied_redirect_uri"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"[1, 2048]"),(0,l.kt)("td",{parentName:"tr",align:null},"\u9700\u8981\u5c06\u7528\u6237\u91cd\u5b9a\u5411\u5230\u7684 URI\uff0c\u800c\u4e0d\u662f\u8fd4\u56de\u7c7b\u4f3c ",(0,l.kt)("inlineCode",{parentName:"td"},'"error_description":"not_authorized"')," \u8fd9\u6837\u7684\u9519\u8bef\u6d88\u606f\u3002")),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"password_grant_token_generation_incoming_uri"),(0,l.kt)("td",{parentName:"tr",align:null},"string"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,l.kt)("td",{parentName:"tr",align:null}),(0,l.kt)("td",{parentName:"tr",align:null},"/api/token"),(0,l.kt)("td",{parentName:"tr",align:null},"\u5c06\u6b64\u8bbe\u7f6e\u4e3a\u4f7f\u7528\u5bc6\u7801\u6388\u4e88\u7c7b\u578b\u751f\u6210\u4ee4\u724c\u3002\u8be5\u63d2\u4ef6\u4f1a\u5c06\u4f20\u5165\u7684\u8bf7\u6c42 URI \u4e0e\u6b64\u503c\u8fdb\u884c\u6bd4\u8f83\u3002")))),(0,l.kt)("p",null,"\u6ce8\u610f\uff1aschema \u4e2d\u8fd8\u5b9a\u4e49\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},'encrypt_fields = {"client_secret"}'),"\uff0c\u8fd9\u610f\u5473\u7740\u8be5\u5b57\u6bb5\u5c06\u4f1a\u88ab\u52a0\u5bc6\u5b58\u50a8\u5728 etcd \u4e2d\u3002\u5177\u4f53\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"/zh/docs/apisix/next/plugin-develop#%E5%8A%A0%E5%AF%86%E5%AD%98%E5%82%A8%E5%AD%97%E6%AE%B5"},"\u52a0\u5bc6\u5b58\u50a8\u5b57\u6bb5"),"\u3002"),(0,l.kt)("p",null,"\u9664\u4e0a\u8ff0\u91ca\u4e49\u5916\uff0c\u8fd8\u6709\u4ee5\u4e0b\u9700\u8981\u6ce8\u610f\u7684\u70b9\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Discovery and endpoints"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"li"},"discovery")," \u5c5e\u6027\u540e\uff0c",(0,l.kt)("inlineCode",{parentName:"li"},"authz-keycloak")," \u63d2\u4ef6\u5c31\u53ef\u4ee5\u4ece\u5176 URL \u4e2d\u53d1\u73b0 Keycloak API \u7684\u7aef\u70b9\u3002\u8be5 URL \u6307\u5411 Keyloak \u9488\u5bf9\u76f8\u5e94\u9886\u57df\u6388\u6743\u670d\u52a1\u7684\u53d1\u73b0\u6587\u6863\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c\u53d1\u73b0\u6587\u6863\u53ef\u7528\uff0c\u5219\u63d2\u4ef6\u5c06\u6839\u636e\u8be5\u6587\u6863\u786e\u5b9a\u4ee4\u724c\u7aef\u70b9 URL\u3002\u5982\u679c URL \u5b58\u5728\uff0c\u5219 ",(0,l.kt)("inlineCode",{parentName:"li"},"token_endpoint")," \u548c ",(0,l.kt)("inlineCode",{parentName:"li"},"resource_registration_endpoint")," \u7684\u503c\u5c06\u88ab\u5176\u8986\u76d6\u3002"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Client ID and secret"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"\u8be5\u63d2\u4ef6\u9700\u914d\u7f6e ",(0,l.kt)("inlineCode",{parentName:"li"},"client_id")," \u5c5e\u6027\u6765\u6807\u8bc6\u81ea\u8eab\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c ",(0,l.kt)("inlineCode",{parentName:"li"},"lazy_load_paths")," \u5c5e\u6027\u88ab\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"true"),"\uff0c\u90a3\u4e48\u8be5\u63d2\u4ef6\u8fd8\u9700\u8981\u4ece Keycloak \u4e2d\u83b7\u5f97\u4e00\u4e2a\u81ea\u8eab\u8bbf\u95ee\u4ee4\u724c\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u5982\u679c\u5ba2\u6237\u7aef\u5bf9 Keycloak \u7684\u8bbf\u95ee\u662f\u52a0\u5bc6\u7684\uff0c\u5c31\u9700\u8981\u914d\u7f6e ",(0,l.kt)("inlineCode",{parentName:"li"},"client_secret")," \u5c5e\u6027\u3002"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Policy enforcement mode"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"policy_enforcement_mode")," \u5c5e\u6027\u6307\u5b9a\u4e86\u5728\u5904\u7406\u53d1\u9001\u5230\u670d\u52a1\u5668\u7684\u6388\u6743\u8bf7\u6c42\u65f6\uff0c\u8be5\u63d2\u4ef6\u5982\u4f55\u6267\u884c\u7b56\u7565\u3002",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"ENFORCING")," mode\uff1a\u5373\u4f7f\u6ca1\u6709\u4e0e\u7ed9\u5b9a\u8d44\u6e90\u5173\u8054\u7684\u7b56\u7565\uff0c\u8bf7\u6c42\u4e5f\u4f1a\u9ed8\u8ba4\u88ab\u62d2\u7edd\u3002",(0,l.kt)("inlineCode",{parentName:"li"},"policy_enforcement_mode")," \u9ed8\u8ba4\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"ENFORCING"),"\u3002"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"PERMISSIVE")," mode\uff1a\u5982\u679c\u8d44\u6e90\u6ca1\u6709\u7ed1\u5b9a\u4efb\u4f55\u8bbf\u95ee\u7b56\u7565\uff0c\u4e5f\u88ab\u5141\u8bb8\u8bf7\u6c42\u3002"))))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Permissions"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5728\u5904\u7406\u4f20\u5165\u7684\u8bf7\u6c42\u65f6\uff0c\u63d2\u4ef6\u53ef\u4ee5\u6839\u636e\u8bf7\u6c42\u7684\u53c2\u6570\u786e\u5b9a\u9759\u6001\u6216\u52a8\u6001\u68c0\u67e5 Keycloak \u7684\u6743\u9650\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5982\u679c ",(0,l.kt)("inlineCode",{parentName:"p"},"lazy_load_paths")," \u53c2\u6570\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"false"),"\uff0c\u5219\u6743\u9650\u6765\u81ea ",(0,l.kt)("inlineCode",{parentName:"p"},"permissions")," \u5c5e\u6027\u3002",(0,l.kt)("inlineCode",{parentName:"p"},"permissions")," \u4e2d\u7684\u6bcf\u4e2a\u6761\u76ee\u90fd\u9700\u8981\u6309\u7167\u4ee4\u724c\u7aef\u70b9\u9884\u8bbe\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"permission")," \u5c5e\u6027\u8fdb\u884c\u683c\u5f0f\u5316\u3002\u8be6\u7ec6\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://www.keycloak.org/docs/latest/authorization_services/index.html#_service_obtaining_permissions"},"Obtaining Permissions"),"."),(0,l.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u6709\u6548\u6743\u9650\u53ef\u4ee5\u662f\u5355\u4e2a\u8d44\u6e90\uff0c\u4e5f\u53ef\u4ee5\u662f\u4e0e\u4e00\u4e2a\u6216\u591a\u4e2a\u8303\u56f4\u914d\u5bf9\u7684\u8d44\u6e90\u3002"))),(0,l.kt)("p",{parentName:"li"},"\u5982\u679c ",(0,l.kt)("inlineCode",{parentName:"p"},"lazy_load_paths")," \u5c5e\u6027\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"true"),"\uff0c\u5219\u8bf7\u6c42 URI \u5c06\u89e3\u6790\u4e3a\u4f7f\u7528\u8d44\u6e90\u6ce8\u518c\u7aef\u70b9\u5728 Keycloak \u4e2d\u914d\u7f6e\u7684\u4e00\u4e2a\u6216\u591a\u4e2a\u8d44\u6e90\u3002\u5df2\u7ecf\u89e3\u6790\u7684\u8d44\u6e90\u88ab\u7528\u4f5c\u4e8e\u68c0\u67e5\u7684\u6743\u9650\u3002"),(0,l.kt)("div",{parentName:"li",className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u9700\u8981\u8be5\u63d2\u4ef6\u4ece\u4ee4\u724c\u7aef\u70b9\u4e3a\u81ea\u5df1\u83b7\u53d6\u5355\u72ec\u7684\u8bbf\u95ee\u4ee4\u724c\u3002\u56e0\u6b64\uff0c\u8bf7\u786e\u4fdd\u5728 Keycloak \u7684\u5ba2\u6237\u7aef\u8bbe\u7f6e\u4e2d\u8bbe\u7f6e\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"Service Accounts Enabled")," \u9009\u9879\u3002"),(0,l.kt)("p",{parentName:"div"},"\u8fd8\u9700\u8981\u786e\u4fdd\u9881\u53d1\u7684\u8bbf\u95ee\u4ee4\u724c\u5305\u542b\u5177\u6709 ",(0,l.kt)("inlineCode",{parentName:"p"},"uma_protection")," \u89d2\u8272\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"resource_access")," \u58f0\u660e\uff0c\u4ee5\u4fdd\u8bc1\u63d2\u4ef6\u80fd\u591f\u901a\u8fc7 Protection API \u67e5\u8be2\u8d44\u6e90\u3002")))))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u81ea\u52a8\u5c06 HTTP method \u6620\u5c04\u5230\u4f5c\u7528\u57df"),(0,l.kt)("p",{parentName:"li"},"  ",(0,l.kt)("inlineCode",{parentName:"p"},"http_method_as_scope")," \u901a\u5e38\u4e0e ",(0,l.kt)("inlineCode",{parentName:"p"},"lazy_load_paths")," \u4e00\u8d77\u4f7f\u7528\uff0c\u4f46\u4e5f\u53ef\u4ee5\u4e0e\u9759\u6001\u6743\u9650\u5217\u8868\u4e00\u8d77\u4f7f\u7528\u3002"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5982\u679c ",(0,l.kt)("inlineCode",{parentName:"p"},"http_method_as_scope")," \u5c5e\u6027\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"true"),"\uff0c\u63d2\u4ef6\u4f1a\u5c06\u8bf7\u6c42\u7684 HTTP \u65b9\u6cd5\u6620\u5c04\u5230\u540c\u540d\u8303\u56f4\u3002\u7136\u540e\u5c06\u8303\u56f4\u6dfb\u52a0\u5230\u6bcf\u4e2a\u8981\u68c0\u67e5\u7684\u6743\u9650\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5982\u679c ",(0,l.kt)("inlineCode",{parentName:"p"},"lazy_load_paths")," \u5c5e\u6027\u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"false"),"\uff0c\u5219\u63d2\u4ef6\u4f1a\u5c06\u6620\u5c04\u8303\u56f4\u6dfb\u52a0\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"permissions")," \u5c5e\u6027\u4e2d\u914d\u7f6e\u7684\u4efb\u610f\u4e00\u4e2a\u9759\u6001\u6743\u9650\u2014\u2014\u5373\u4f7f\u5b83\u4eec\u5df2\u7ecf\u5305\u542b\u4e00\u4e2a\u6216\u591a\u4e2a\u8303\u56f4\u3002")))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"password")," \u6388\u6743\u751f\u6210\u4ee4\u724c"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5982\u679c\u8981\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"password")," \u6388\u6743\u751f\u6210\u4ee4\u724c\uff0c\u4f60\u53ef\u4ee5\u8bbe\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"password_grant_token_generation_incoming_uri")," \u5c5e\u6027\u7684\u503c\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u5982\u679c\u4f20\u5165\u7684 URI \u4e0e\u914d\u7f6e\u7684\u5c5e\u6027\u5339\u914d\u5e76\u4e14\u8bf7\u6c42\u65b9\u6cd5\u662f POST\uff0c\u5219\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"token_endpoint")," \u751f\u6210\u4e00\u4e2a\u4ee4\u724c\u3002"),(0,l.kt)("p",{parentName:"li"},"\u540c\u65f6\uff0c\u4f60\u8fd8\u9700\u8981\u6dfb\u52a0 ",(0,l.kt)("inlineCode",{parentName:"p"},"application/x-www-form-urlencoded")," \u4f5c\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"Content-Type")," \u6807\u5934\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"username")," \u548c ",(0,l.kt)("inlineCode",{parentName:"p"},"password")," \u4f5c\u4e3a\u53c2\u6570\u3002"),(0,l.kt)("p",{parentName:"li"},"\u5982\u4e0b\u793a\u4f8b\u662f\u5f53 ",(0,l.kt)("inlineCode",{parentName:"p"},"password_grant_token_generation_incoming_uri")," \u8bbe\u7f6e\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"/api/token")," \u65f6\u7684\u547d\u4ee4\uff1a"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl --location --request POST 'http://127.0.0.1:9080/api/token' \\\n--header 'Accept: application/json, text/plain, */*' \\\n--header 'Content-Type: application/x-www-form-urlencoded' \\\n--data-urlencode 'username=<User_Name>' \\\n--data-urlencode 'password=<Password>'\n")))))),(0,l.kt)("h2",{id:"\u5982\u4f55\u542f\u7528"},"\u5982\u4f55\u542f\u7528"),(0,l.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u4e3a\u4f60\u5c55\u793a\u4e86\u5982\u4f55\u5728\u6307\u5b9a Route \u4e2d\u542f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"authz-keycloak")," \u63d2\u4ef6\uff0c\u5176\u4e2d ",(0,l.kt)("inlineCode",{parentName:"p"},"${realm}")," \u662f Keycloak \u4e2d\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"realm")," \u540d\u79f0\uff1a"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,l.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,l.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,l.kt)("pre",{parentName:"div"},(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/get",\n    "plugins": {\n        "authz-keycloak": {\n            "token_endpoint": "http://127.0.0.1:8090/realms/${realm}/protocol/openid-connect/token",\n            "permissions": ["resource name#scope name"],\n            "client_id": "Client ID"\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:8080": 1\n        }\n    }\n}\'\n')),(0,l.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,l.kt)("p",null,"\u901a\u8fc7\u4e0a\u8ff0\u547d\u4ee4\u542f\u7528\u63d2\u4ef6\u540e\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u6cd5\u6d4b\u8bd5\u63d2\u4ef6\u3002"),(0,l.kt)("p",null,"\u9996\u5148\u9700\u8981\u4ece Keycloak \u83b7\u53d6 JWT \u4ee4\u724c\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl "http://<YOUR_KEYCLOAK_HOST>/realms/<YOUR_REALM>/protocol/openid-connect/token" \\\n  -d "client_id=<YOUR_CLIENT_ID>" \\\n  -d "client_secret=<YOUR_CLIENT_SECRET>" \\\n  -d "username=<YOUR_USERNAME>" \\\n  -d "password=<YOUR_PASSWORD>" \\\n  -d "grant_type=password"\n')),(0,l.kt)("p",null,"\u4f60\u5e94\u8be5\u6536\u5230\u7c7b\u4f3c\u4ee5\u4e0b\u7684\u54cd\u5e94\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},'{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJoT3ludlBPY2d6Y3VWWnYtTU42bXZKMUczb0dOX2d6MFo3WFl6S2FSa1NBIn0.eyJleHAiOjE3MDMyOTAyNjAsImlhdCI6MTcwMzI4OTk2MCwianRpIjoiMjJhOGFmMzItNDM5Mi00Yzg3LThkM2UtZDkyNDVmZmNiYTNmIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44Mzo4MDgwL3JlYWxtcy9xdWlja3N0YXJ0LXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjAyZWZlY2VlLTBmYTgtNDg1OS1iYmIwLTgyMGZmZDdjMWRmYSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFwaXNpeC1xdWlja3N0YXJ0LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI1YzIzZjVkZC1hN2ZhLTRlMmItOWQxNC02MmI1YzYyNmU1NDYiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtcXVpY2tzdGFydC1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI1YzIzZjVkZC1hN2ZhLTRlMmItOWQxNC02MmI1YzYyNmU1NDYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InF1aWNrc3RhcnQtdXNlciJ9.WNZQiLRleqCxw-JS-MHkqXnX_BPA9i6fyVHqF8l-L-2QxcqTAwbIp7AYKX-z90CG6EdRXOizAEkQytB32eVWXaRkLeTYCI7wIrT8XSVTJle4F88ohuBOjDfRR61yFh5k8FXXdAyRzcR7tIeE2YUFkRqw1gCT_VEsUuXPqm2wTKOmZ8fRBf4T-rP4-ZJwPkHAWc_nG21TmLOBCSulzYqoC6Lc-OvX5AHde9cfRuXx-r2HhSYs4cXtvX-ijA715MY634CQdedheoGca5yzPsJWrAlBbCruN2rdb4u5bDxKU62pJoJpmAsR7d5qYpYVA6AsANDxHLk2-W5F7I_IxqR0YQ","expires_in":300,"refresh_expires_in":1800,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjN2IwYmY4NC1kYjk0LTQ5YzctYWIyZC01NmU3ZDc1MmRkNDkifQ.eyJleHAiOjE3MDMyOTE3NjAsImlhdCI6MTcwMzI4OTk2MCwianRpIjoiYzcyZjAzMzctYmZhNS00MWEzLTlhYjEtZmJlNGY0NmZjMDgxIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMS44Mzo4MDgwL3JlYWxtcy9xdWlja3N0YXJ0LXJlYWxtIiwiYXVkIjoiaHR0cDovLzE5Mi4xNjguMS44Mzo4MDgwL3JlYWxtcy9xdWlja3N0YXJ0LXJlYWxtIiwic3ViIjoiMDJlZmVjZWUtMGZhOC00ODU5LWJiYjAtODIwZmZkN2MxZGZhIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImFwaXNpeC1xdWlja3N0YXJ0LWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiI1YzIzZjVkZC1hN2ZhLTRlMmItOWQxNC02MmI1YzYyNmU1NDYiLCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiI1YzIzZjVkZC1hN2ZhLTRlMmItOWQxNC02MmI1YzYyNmU1NDYifQ.7AH7ppbVOlkYc9CoJ7kLSlDUkmFuNga28Amugn2t724","token_type":"Bearer","not-before-policy":0,"session_state":"5c23f5dd-a7fa-4e2b-9d14-62b5c626e546","scope":"email profile"}\n')),(0,l.kt)("p",null,"\u4e4b\u540e\u5c31\u53ef\u4ee5\u4f7f\u7528\u83b7\u5f97\u7684\u8bbf\u95ee\u4ee4\u724c\u53d1\u8d77\u8bf7\u6c42\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/get -H 'Authorization: Bearer ${ACCESS_TOKEN}'\n")),(0,l.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,l.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u7981\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"authz-keycloak")," \u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/get",\n    "plugins": {\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:8080": 1\n        }\n    }\n}\'\n')),(0,l.kt)("h2",{id:"\u63d2\u4ef6-roadmap"},"\u63d2\u4ef6 Roadmap"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u76ee\u524d\uff0c",(0,l.kt)("inlineCode",{parentName:"p"},"authz-keycloak")," \u63d2\u4ef6\u901a\u8fc7\u8981\u6c42\u5b9a\u4e49\u8d44\u6e90\u540d\u79f0\u548c\u6240\u9700\u7684\u8303\u56f4\uff0c\u6765\u5f3a\u5236\u6267\u884c\u8def\u7531\u7b56\u7565\u3002\u4f46 Keycloak \u5b98\u65b9\u9002\u914d\u7684\u5176\u4ed6\u8bed\u8a00\u5ba2\u6237\u7aef\uff08Java\u3001JavaScript\uff09\u4ecd\u7136\u53ef\u4ee5\u901a\u8fc7\u52a8\u6001\u67e5\u8be2 Keycloak \u8def\u5f84\u4ee5\u53ca\u5ef6\u8fdf\u52a0\u8f7d\u8eab\u4efd\u8d44\u6e90\u7684\u8def\u5f84\u6765\u63d0\u4f9b\u8def\u5f84\u5339\u914d\u3002\u5728 Apache APISIX \u4e4b\u540e\u53d1\u5e03\u7684\u63d2\u4ef6\u4e2d\u5373\u5c06\u652f\u6301\u6b64\u529f\u80fd\u3002")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"\u652f\u6301\u4ece Keycloak JSON \u6587\u4ef6\u4e2d\u8bfb\u53d6\u6743\u9650\u8303\u7574\u548c\u5176\u4ed6\u914d\u7f6e\u9879\u3002"))))}d.isMDXComponent=!0}}]);