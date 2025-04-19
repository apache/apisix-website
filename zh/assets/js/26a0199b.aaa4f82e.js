"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[22020],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),s=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),c=s(n),m=r,k=c["".concat(o,".").concat(m)]||c[m]||u[m]||i;return n?a.createElement(k,l(l({ref:t},d),{},{components:n})):a.createElement(k,l({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,l[1]=p;for(var s=2;s<i;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},37172:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>o});var a=n(87462),r=(n(67294),n(3905));const i={title:"node-status",keywords:["Apache APISIX","API \u7f51\u5173","\u63d2\u4ef6","Node status"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 API \u7f51\u5173 Apache APISIX node-status \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002"},l=void 0,p={unversionedId:"plugins/node-status",id:"version-3.11/plugins/node-status",isDocsHomePage:!1,title:"node-status",description:"\u672c\u6587\u4ecb\u7ecd\u4e86 API \u7f51\u5173 Apache APISIX node-status \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.11/plugins/node-status.md",sourceDirName:"plugins",slug:"/plugins/node-status",permalink:"/zh/docs/apisix/3.11/plugins/node-status",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.11/docs/zh/latest/plugins/node-status.md",tags:[],version:"3.11",frontMatter:{title:"node-status",keywords:["Apache APISIX","API \u7f51\u5173","\u63d2\u4ef6","Node status"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 API \u7f51\u5173 Apache APISIX node-status \u63d2\u4ef6\u7684\u76f8\u5173\u4fe1\u606f\u3002"},sidebar:"version-3.11/docs",previous:{title:"prometheus",permalink:"/zh/docs/apisix/3.11/plugins/prometheus"},next:{title:"datadog",permalink:"/zh/docs/apisix/3.11/plugins/datadog"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u63d2\u4ef6\u5c5e\u6027",id:"\u63d2\u4ef6\u5c5e\u6027",children:[]},{value:"\u63d2\u4ef6\u63a5\u53e3",id:"\u63d2\u4ef6\u63a5\u53e3",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u6d4b\u8bd5\u63d2\u4ef6",id:"\u6d4b\u8bd5\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],s={toc:o};function d(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"node-status")," \u63d2\u4ef6\u53ef\u7528\u4e8e\u901a\u8fc7\u66b4\u9732\u7684 API \u67e5\u8be2 APISIX \u7684\u8bf7\u6c42\u72b6\u6001\uff0c\u5e76\u8fd4\u56de\u57fa\u672c\u7684\u72b6\u6001\u4fe1\u606f\u3002"),(0,r.kt)("h2",{id:"\u63d2\u4ef6\u5c5e\u6027"},"\u63d2\u4ef6\u5c5e\u6027"),(0,r.kt)("p",null,"\u65e0\u3002"),(0,r.kt)("h2",{id:"\u63d2\u4ef6\u63a5\u53e3"},"\u63d2\u4ef6\u63a5\u53e3"),(0,r.kt)("p",null,"\u8be5\u63d2\u4ef6\u5c06\u4f1a\u589e\u52a0 ",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/status")," \u7684\u63a5\u53e3\u7528\u6765\u66b4\u9732 APISIX \u7684\u72b6\u6001\uff0c\u4f60\u9700\u8981\u901a\u8fc7 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/plugins/public-api"},"public-api")," \u63d2\u4ef6\u6765\u66b4\u9732\u8be5\u63a5\u53e3\u3002"),(0,r.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"node-status")," \u63d2\u4ef6\u9ed8\u8ba4\u4e3a\u7981\u7528\u72b6\u6001\uff0c\u5982\u679c\u4f60\u9700\u8981\u4f7f\u7528\u8be5\u63d2\u4ef6\uff0c\u8bf7\u5728\u914d\u7f6e\u6587\u4ef6 ",(0,r.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u4e2d\u542f\u7528\u5b83\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},"plugins:\n  - limit-req\n  - node-status\n  - jwt-auth\n  - zipkin\n  ......\n")),(0,r.kt)("p",null,"\u4f60\u9700\u8981\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/status")," API \u914d\u7f6e\u8def\u7531\uff0c\u5e76\u4f7f\u7528 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/plugins/public-api"},"public-api")," \u63d2\u4ef6\u66b4\u9732\u5b83\u3002"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/ns -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/apisix/status",\n    "plugins": {\n        "public-api": {}\n    }\n}\'\n')),(0,r.kt)("h2",{id:"\u6d4b\u8bd5\u63d2\u4ef6"},"\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5b8c\u6210\u4e0a\u8ff0\u914d\u7f6e\u540e\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5411 ",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/status")," \u53d1\u9001\u8bf7\u6c42\u4ee5\u83b7\u53d6\u72b6\u6001\u4fe1\u606f\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/apisix/status -i\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 200 OK\nDate: Tue, 03 Nov 2020 11:12:55 GMT\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\nServer: APISIX web server\n\n{"status":{"total":"23","waiting":"0","accepted":"22","writing":"1","handled":"22","active":"1","reading":"0"},"id":"6790a064-8f61-44ba-a6d3-5df42f2b1bb3"}\n')),(0,r.kt)("p",null,"\u8fd4\u56de\u7ed3\u679c\u4e2d\u7684\u53c2\u6570\u91ca\u4e49\u5982\u4e0b\uff1a"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u53c2\u6570"),(0,r.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"status"),(0,r.kt)("td",{parentName:"tr",align:null},"APISIX \u7684\u72b6\u6001\u4fe1\u606f\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"total"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef\u8bf7\u6c42\u603b\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"waiting"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u524d\u7b49\u5f85\u5ba2\u6237\u7aef\u8bf7\u6c42\u7684\u7a7a\u95f2\u8fde\u63a5\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"accepted"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u524d\u5df2\u7ecf\u63a5\u53d7\u7684\u5ba2\u6237\u7aef\u8fde\u63a5\u603b\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"writing"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u524d\u6b63\u5728\u5199\u7ed9\u5ba2\u6237\u7aef\u54cd\u5e94\u7684\u8fde\u63a5\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"handled"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u524d\u5df2\u7ecf\u5904\u7406\u7684\u8fde\u63a5\u603b\u6570\uff0c\u9664\u975e\u8fbe\u5230\u5176\u4ed6\u8d44\u6e90\u7684\u9650\u5236\uff0c\u5426\u5219\u6b64\u503c\u4e0e ",(0,r.kt)("inlineCode",{parentName:"td"},"accepted")," \u76f8\u540c\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"active"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u524d\u6d3b\u8dc3\u7684\u5ba2\u6237\u7aef\u8fde\u63a5\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"reading"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u524d\u6b63\u5728\u8bfb\u53d6\u8bf7\u6c42\u5934\u7684\u8fde\u63a5\u6570\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"id"),(0,r.kt)("td",{parentName:"tr",align:null},"APISIX UID \u4fe1\u606f\uff0c\u4fdd\u5b58\u5728 ",(0,r.kt)("inlineCode",{parentName:"td"},"./conf/apisix.uid")," \u6587\u4ef6\u4e2d\u3002")))),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5982\u679c\u4f60\u4e0d\u518d\u9700\u8981\u8be5\u63d2\u4ef6\uff0c\u53ef\u4ee5\u4ece\u914d\u7f6e\u6587\u4ef6 (",(0,r.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml"),") \u4e2d\u5220\u9664\u5b83\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},"  - limit-req\n  - jwt-auth\n  - zipkin\n  ......\n")),(0,r.kt)("p",null,"\u4f60\u4e5f\u53ef\u4ee5\u79fb\u9664\u66b4\u9732 ",(0,r.kt)("inlineCode",{parentName:"p"},"/apisix/status")," \u63a5\u53e3\u7684\u8def\u7531\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/ns -H "X-API-KEY: $admin_key" -X DELETE\n')))}d.isMDXComponent=!0}}]);