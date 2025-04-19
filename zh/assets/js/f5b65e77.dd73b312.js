"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[98598],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=s(n),k=r,m=u["".concat(p,".").concat(k)]||u[k]||d[k]||i;return n?a.createElement(m,l(l({ref:t},c),{},{components:n})):a.createElement(m,l({ref:t},c))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},57111:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"csrf",keywords:["Apache APISIX","API \u7f51\u5173","\u8de8\u7ad9\u8bf7\u6c42\u4f2a\u9020\u653b\u51fb","Cross-site request forgery","csrf"],description:"CSRF \u63d2\u4ef6\u57fa\u4e8e Double Submit Cookie \u7684\u65b9\u5f0f\uff0c\u5e2e\u52a9\u7528\u6237\u963b\u6b62\u8de8\u7ad9\u8bf7\u6c42\u4f2a\u9020\u653b\u51fb\u3002"},l=void 0,o={unversionedId:"plugins/csrf",id:"version-3.9/plugins/csrf",isDocsHomePage:!1,title:"csrf",description:"CSRF \u63d2\u4ef6\u57fa\u4e8e Double Submit Cookie \u7684\u65b9\u5f0f\uff0c\u5e2e\u52a9\u7528\u6237\u963b\u6b62\u8de8\u7ad9\u8bf7\u6c42\u4f2a\u9020\u653b\u51fb\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.9/plugins/csrf.md",sourceDirName:"plugins",slug:"/plugins/csrf",permalink:"/zh/docs/apisix/3.9/plugins/csrf",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.9/docs/zh/latest/plugins/csrf.md",tags:[],version:"3.9",frontMatter:{title:"csrf",keywords:["Apache APISIX","API \u7f51\u5173","\u8de8\u7ad9\u8bf7\u6c42\u4f2a\u9020\u653b\u51fb","Cross-site request forgery","csrf"],description:"CSRF \u63d2\u4ef6\u57fa\u4e8e Double Submit Cookie \u7684\u65b9\u5f0f\uff0c\u5e2e\u52a9\u7528\u6237\u963b\u6b62\u8de8\u7ad9\u8bf7\u6c42\u4f2a\u9020\u653b\u51fb\u3002"},sidebar:"version-3.9/docs",previous:{title:"consumer-restriction",permalink:"/zh/docs/apisix/3.9/plugins/consumer-restriction"},next:{title:"public-api",permalink:"/zh/docs/apisix/3.9/plugins/public-api"}},p=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],s={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"csrf")," \u63d2\u4ef6\u57fa\u4e8e ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Cross-site_request_forgery#Double_Submit_Cookie"},(0,r.kt)("inlineCode",{parentName:"a"},"Double Submit Cookie"))," \u7684\u65b9\u5f0f\uff0c\u4fdd\u62a4\u7528\u6237\u7684 API \u514d\u4e8e CSRF \u653b\u51fb\u3002"),(0,r.kt)("p",null,"\u5728\u6b64\u63d2\u4ef6\u8fd0\u884c\u65f6\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"GET"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"HEAD")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"OPTIONS")," \u4f1a\u88ab\u5b9a\u4e49\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"safe-methods"),"\uff0c\u5176\u4ed6\u7684\u8bf7\u6c42\u65b9\u6cd5\u5219\u5b9a\u4e49\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"unsafe-methods"),"\u3002\u56e0\u6b64 ",(0,r.kt)("inlineCode",{parentName:"p"},"GET"),"\u3001",(0,r.kt)("inlineCode",{parentName:"p"},"HEAD")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"OPTIONS")," \u65b9\u6cd5\u7684\u8c03\u7528\u4e0d\u4f1a\u88ab\u68c0\u67e5\u62e6\u622a\u3002"),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"apisix-csrf-token")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u751f\u6210\u7684 Cookie \u4e2d\u7684 Token \u540d\u79f0\uff0c\u9700\u8981\u4f7f\u7528\u6b64\u540d\u79f0\u5728\u8bf7\u6c42\u5934\u643a\u5e26 Cookie \u4e2d\u7684\u5185\u5bb9\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"expires"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"7200")),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"CSRF Cookie \u7684\u8fc7\u671f\u65f6\u95f4\uff0c\u5355\u4f4d\u4e3a\u79d2\u3002\u5f53\u8bbe\u7f6e\u4e3a ",(0,r.kt)("inlineCode",{parentName:"td"},"0")," \u65f6\uff0c\u4f1a\u5ffd\u7565 CSRF Cookie \u8fc7\u671f\u65f6\u95f4\u68c0\u67e5\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"key"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a0\u5bc6 Token \u7684\u5bc6\u94a5\u3002")))),(0,r.kt)("p",null,"\u6ce8\u610f\uff1aschema \u4e2d\u8fd8\u5b9a\u4e49\u4e86 ",(0,r.kt)("inlineCode",{parentName:"p"},'encrypt_fields = {"key"}'),"\uff0c\u8fd9\u610f\u5473\u7740\u8be5\u5b57\u6bb5\u5c06\u4f1a\u88ab\u52a0\u5bc6\u5b58\u50a8\u5728 etcd \u4e2d\u3002\u5177\u4f53\u53c2\u8003 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.9/plugin-develop#%E5%8A%A0%E5%AF%86%E5%AD%98%E5%82%A8%E5%AD%97%E6%AE%B5"},"\u52a0\u5bc6\u5b58\u50a8\u5b57\u6bb5"),"\u3002"),(0,r.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5982\u4f55\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u7528\u5e76\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"csrf")," \u63d2\u4ef6\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n  "uri": "/hello",\n  "plugins": {\n    "csrf": {\n      "key": "edd1c9f034335f136f87ad84b625c8f1"\n    }\n  },\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "127.0.0.1:9001": 1\n    }\n  }\n}\'\n')),(0,r.kt)("p",null,"\u5f53\u4f60\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"GET")," \u4e4b\u5916\u7684\u65b9\u6cd5\u8bbf\u95ee\u88ab\u4fdd\u62a4\u7684\u8def\u7531\u65f6\uff0c\u8bf7\u6c42\u4f1a\u88ab\u62e6\u622a\u5e76\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"401")," HTTP \u72b6\u6001\u7801\u3002"),(0,r.kt)("p",null,"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"GET")," \u8bf7\u6c42 ",(0,r.kt)("inlineCode",{parentName:"p"},"/hello")," \u65f6\uff0c\u5728\u54cd\u5e94\u4e2d\u4f1a\u6709\u4e00\u4e2a\u643a\u5e26\u4e86\u52a0\u5bc6 Token \u7684 Cookie\u3002Token \u5b57\u6bb5\u540d\u79f0\u4e3a\u63d2\u4ef6\u914d\u7f6e\u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," \u503c\uff0c\u9ed8\u8ba4\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix-csrf-token"),"\u3002"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u6bcf\u4e00\u4e2a\u8bf7\u6c42\u90fd\u4f1a\u8fd4\u56de\u4e00\u4e2a\u65b0\u7684 Cookie\u3002"))),(0,r.kt)("p",null,"\u5728\u540e\u7eed\u5bf9\u8be5\u8def\u7531\u8fdb\u884c\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"unsafe-methods")," \u8bf7\u6c42\u4e2d\uff0c\u9700\u8981\u4ece Cookie \u4e2d\u8bfb\u53d6\u52a0\u5bc6\u7684 Token\uff0c\u5e76\u5728\u8bf7\u6c42\u5934\u4e2d\u643a\u5e26\u8be5 Token\u3002\u8bf7\u6c42\u5934\u5b57\u6bb5\u7684\u540d\u79f0\u4e3a\u63d2\u4ef6\u5c5e\u6027\u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"name"),"\u3002"),(0,r.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u542f\u7528\u63d2\u4ef6\u540e\uff0c\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"curl")," \u547d\u4ee4\u5c1d\u8bd5\u76f4\u63a5\u5bf9\u8be5\u8def\u7531\u53d1\u8d77 ",(0,r.kt)("inlineCode",{parentName:"p"},"POST")," \u8bf7\u6c42\uff0c\u4f1a\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"Unauthorized")," \u5b57\u6837\u7684\u62a5\u9519\u63d0\u793a\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/hello -X POST\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 401 Unauthorized\n...\n{"error_msg":"no csrf token in headers"}\n')),(0,r.kt)("p",null,"\u5f53\u53d1\u8d77 ",(0,r.kt)("inlineCode",{parentName:"p"},"GET")," \u8bf7\u6c42\u65f6\uff0c\u8fd4\u56de\u7ed3\u679c\u4e2d\u4f1a\u6709\u643a\u5e26 Token \u7684 Cookie\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/hello\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"HTTP/1.1 200 OK\n...\nSet-Cookie: apisix-csrf-token=eyJyYW5kb20iOjAuNjg4OTcyMzA4ODM1NDMsImV4cGlyZXMiOjcyMDAsInNpZ24iOiJcL09uZEF4WUZDZGYwSnBiNDlKREtnbzVoYkJjbzhkS0JRZXVDQm44MG9ldz0ifQ==;path=/;Expires=Mon, 13-Dec-21 09:33:55 GMT\n")),(0,r.kt)("p",null,"\u5728\u8bf7\u6c42\u4e4b\u524d\uff0c\u7528\u6237\u9700\u8981\u4ece Cookie \u4e2d\u8bfb\u53d6 Token\uff0c\u5e76\u5728\u540e\u7eed\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"unsafe-methods")," \u8bf7\u6c42\u7684\u8bf7\u6c42\u5934\u4e2d\u643a\u5e26\u3002"),(0,r.kt)("p",null,"\u4f8b\u5982\uff0c\u4f60\u53ef\u4ee5\u5728\u5ba2\u6237\u7aef\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/js-cookie/js-cookie"},"js-cookie")," \u8bfb\u53d6 Cookie\uff0c\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/axios/axios"},"axios")," \u53d1\u9001\u8bf7\u6c42\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const token = Cookie.get('apisix-csrf-token');\n\nconst instance = axios.create({\n  headers: {'apisix-csrf-token': token}\n});\n")),(0,r.kt)("p",null,"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"curl")," \u547d\u4ee4\u53d1\u9001\u8bf7\u6c42\uff0c\u786e\u4fdd\u8bf7\u6c42\u4e2d\u643a\u5e26\u4e86 Cookie \u4fe1\u606f\uff0c\u5982\u679c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"200")," HTTP \u72b6\u6001\u7801\u5219\u8868\u793a\u8bf7\u6c42\u6210\u529f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/hello -X POST -H 'apisix-csrf-token: eyJyYW5kb20iOjAuNjg4OTcyMzA4ODM1NDMsImV4cGlyZXMiOjcyMDAsInNpZ24iOiJcL09uZEF4WUZDZGYwSnBiNDlKREtnbzVoYkJjbzhkS0JRZXVDQm44MG9ldz0ifQ==' -b 'apisix-csrf-token=eyJyYW5kb20iOjAuNjg4OTcyMzA4ODM1NDMsImV4cGlyZXMiOjcyMDAsInNpZ24iOiJcL09uZEF4WUZDZGYwSnBiNDlKREtnbzVoYkJjbzhkS0JRZXVDQm44MG9ldz0ifQ=='\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/1.1 200 OK\n")),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u5220\u9664\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n{\n  "uri": "/hello",\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "127.0.0.1:1980": 1\n    }\n  }\n}\'\n')))}c.isMDXComponent=!0}}]);