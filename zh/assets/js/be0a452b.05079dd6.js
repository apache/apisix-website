"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[72714],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>c});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var o=a.createContext({}),s=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=s(e.components);return a.createElement(o.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),u=s(t),c=r,k=u["".concat(o,".").concat(c)]||u[c]||d[c]||l;return t?a.createElement(k,i(i({ref:n},m),{},{components:t})):a.createElement(k,i({ref:n},m))}));function c(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=u;var p={};for(var o in n)hasOwnProperty.call(n,o)&&(p[o]=n[o]);p.originalType=e,p.mdxType="string"==typeof e?e:r,i[1]=p;for(var s=2;s<l;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},2969:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var a=t(87462),r=(t(67294),t(3905));const l={title:"consumer-restriction",keywords:["Apache APISIX","API \u7f51\u5173","Consumer restriction"],description:"Consumer Restriction \u63d2\u4ef6\u5141\u8bb8\u7528\u6237\u6839\u636e Route\u3001Service\u3001Consumer \u6216 Consumer Group \u6765\u8bbe\u7f6e\u76f8\u5e94\u7684\u8bbf\u95ee\u9650\u5236\u3002"},i=void 0,p={unversionedId:"plugins/consumer-restriction",id:"version-3.12/plugins/consumer-restriction",isDocsHomePage:!1,title:"consumer-restriction",description:"Consumer Restriction \u63d2\u4ef6\u5141\u8bb8\u7528\u6237\u6839\u636e Route\u3001Service\u3001Consumer \u6216 Consumer Group \u6765\u8bbe\u7f6e\u76f8\u5e94\u7684\u8bbf\u95ee\u9650\u5236\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.12/plugins/consumer-restriction.md",sourceDirName:"plugins",slug:"/plugins/consumer-restriction",permalink:"/zh/docs/apisix/plugins/consumer-restriction",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.12/docs/zh/latest/plugins/consumer-restriction.md",tags:[],version:"3.12",frontMatter:{title:"consumer-restriction",keywords:["Apache APISIX","API \u7f51\u5173","Consumer restriction"],description:"Consumer Restriction \u63d2\u4ef6\u5141\u8bb8\u7528\u6237\u6839\u636e Route\u3001Service\u3001Consumer \u6216 Consumer Group \u6765\u8bbe\u7f6e\u76f8\u5e94\u7684\u8bbf\u95ee\u9650\u5236\u3002"},sidebar:"version-3.12/docs",previous:{title:"referer-restriction",permalink:"/zh/docs/apisix/plugins/referer-restriction"},next:{title:"csrf",permalink:"/zh/docs/apisix/plugins/csrf"}},o=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u5c5e\u6027",id:"\u5c5e\u6027",children:[]},{value:"\u542f\u7528\u5e76\u6d4b\u8bd5\u63d2\u4ef6",id:"\u542f\u7528\u5e76\u6d4b\u8bd5\u63d2\u4ef6",children:[{value:"\u901a\u8fc7 <code>consumer_name</code> \u9650\u5236\u8bbf\u95ee",id:"\u901a\u8fc7-consumer_name-\u9650\u5236\u8bbf\u95ee",children:[]},{value:"\u901a\u8fc7 <code>allowed_by_methods</code> \u9650\u5236\u8bbf\u95ee",id:"\u901a\u8fc7-allowed_by_methods-\u9650\u5236\u8bbf\u95ee",children:[]},{value:"\u901a\u8fc7 <code>service_id</code> \u9650\u5236\u8bbf\u95ee",id:"\u901a\u8fc7-service_id-\u9650\u5236\u8bbf\u95ee",children:[]}]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],s={toc:o};function m(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"consumer-restriction")," \u63d2\u4ef6\u5141\u8bb8\u7528\u6237\u6839\u636e Route\u3001Service\u3001Consumer \u6216 Consumer Group \u6765\u8bbe\u7f6e\u76f8\u5e94\u7684\u8bbf\u95ee\u9650\u5236\u3002"),(0,r.kt)("h2",{id:"\u5c5e\u6027"},"\u5c5e\u6027"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,r.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,r.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,r.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,r.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"type"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"consumer_name"),(0,r.kt)("td",{parentName:"tr",align:null},'["consumer_name", "consumer_group_id", "service_id", "route_id"]'),(0,r.kt)("td",{parentName:"tr",align:null},"\u652f\u6301\u8bbe\u7f6e\u8bbf\u95ee\u9650\u5236\u7684\u5bf9\u8c61\u7c7b\u578b\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"whitelist"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a0\u5165\u767d\u540d\u5355\u7684\u5bf9\u8c61\uff0c\u4f18\u5148\u7ea7\u9ad8\u4e8e",(0,r.kt)("inlineCode",{parentName:"td"},"allowed_by_methods"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"blacklist"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u52a0\u5165\u9ed1\u540d\u5355\u7684\u5bf9\u8c61\uff0c\u4f18\u5148\u7ea7\u9ad8\u4e8e",(0,r.kt)("inlineCode",{parentName:"td"},"whitelist"),"\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"rejected_code"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null},"403"),(0,r.kt)("td",{parentName:"tr",align:null},"[200,...]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bf7\u6c42\u88ab\u62d2\u7edd\u65f6\uff0c\u8fd4\u56de\u7684 HTTP \u72b6\u6001\u7801\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"rejected_msg"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bf7\u6c42\u88ab\u62d2\u7edd\u65f6\uff0c\u8fd4\u56de\u7684\u9519\u8bef\u4fe1\u606f\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"allowed_by_methods"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[object]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e00\u7ec4\u4e3a Consumer \u8bbe\u7f6e\u5141\u8bb8\u7684\u914d\u7f6e\uff0c\u5305\u62ec\u7528\u6237\u540d\u548c\u5141\u8bb8\u7684 HTTP \u65b9\u6cd5\u5217\u8868\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"allowed_by_methods.user"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e3a Consumer \u8bbe\u7f6e\u7684\u7528\u6237\u540d\u3002")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"allowed_by_methods.methods"),(0,r.kt)("td",{parentName:"tr",align:null},"array","[string]"),(0,r.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},'["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "CONNECT", "TRACE", "PURGE"]'),(0,r.kt)("td",{parentName:"tr",align:null},"\u4e3a Consumer \u8bbe\u7f6e\u7684\u5141\u8bb8\u7684 HTTP \u65b9\u6cd5\u5217\u8868\u3002")))),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u4e0d\u540c\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"type")," \u5c5e\u6027\u503c\u5206\u522b\u4ee3\u8868\u4ee5\u4e0b\u542b\u4e49\uff1a"),(0,r.kt)("ul",{parentName:"div"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"consumer_name"),"\uff1a\u628a Consumer \u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"username")," \u5217\u5165\u767d\u540d\u5355\u6216\u9ed1\u540d\u5355\u6765\u9650\u5236 Consumer \u5bf9 Route \u6216 Service \u7684\u8bbf\u95ee\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"consumer_group_id"),": \u628a Consumer Group \u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"id")," \u5217\u5165\u767d\u540d\u5355\u6216\u9ed1\u540d\u5355\u6765\u9650\u5236 Consumer \u5bf9 Route \u6216 Service \u7684\u8bbf\u95ee\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"service_id"),"\uff1a\u628a Service \u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"id")," \u5217\u5165\u767d\u540d\u5355\u6216\u9ed1\u540d\u5355\u6765\u9650\u5236 Consumer \u5bf9 Service \u7684\u8bbf\u95ee\uff0c\u9700\u8981\u7ed3\u5408\u6388\u6743\u63d2\u4ef6\u4e00\u8d77\u4f7f\u7528\u3002"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"route_id"),"\uff1a\u628a Route \u7684 ",(0,r.kt)("inlineCode",{parentName:"li"},"id")," \u5217\u5165\u767d\u540d\u5355\u6216\u9ed1\u540d\u5355\u6765\u9650\u5236 Consumer \u5bf9 Route \u7684\u8bbf\u95ee\u3002")))),(0,r.kt)("h2",{id:"\u542f\u7528\u5e76\u6d4b\u8bd5\u63d2\u4ef6"},"\u542f\u7528\u5e76\u6d4b\u8bd5\u63d2\u4ef6"),(0,r.kt)("h3",{id:"\u901a\u8fc7-consumer_name-\u9650\u5236\u8bbf\u95ee"},"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"h3"},"consumer_name")," \u9650\u5236\u8bbf\u95ee"),(0,r.kt)("p",null,"\u9996\u5148\uff0c\u521b\u5efa\u4e24\u4e2a Consumer\uff0c\u5206\u522b\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"jack2"),"\uff1a"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -i -d \'\n{\n    "username": "jack1",\n    "plugins": {\n        "basic-auth": {\n            "username":"jack2019",\n            "password": "123456"\n        }\n    }\n}\'\n\ncurl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -i -d \'\n{\n    "username": "jack2",\n    "plugins": {\n        "basic-auth": {\n            "username":"jack2020",\n            "password": "123456"\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u7136\u540e\uff0c\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u7528\u5e76\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"consumer-restriction")," \u63d2\u4ef6\uff0c\u5e76\u901a\u8fc7\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"consumer_name")," \u52a0\u5165 ",(0,r.kt)("inlineCode",{parentName:"p"},"whitelist")," \u6765\u9650\u5236\u4e0d\u540c Consumer \u7684\u8bbf\u95ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "plugins": {\n        "basic-auth": {},\n        "consumer-restriction": {\n            "whitelist": [\n                "jack1"\n            ]\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u6d4b\u8bd5\u63d2\u4ef6")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u53d1\u51fa\u8bbf\u95ee\u8bf7\u6c42\uff0c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"200")," HTTP \u72b6\u6001\u7801\uff0c\u4ee3\u8868\u8bbf\u95ee\u6210\u529f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -u jack2019:123456 http://127.0.0.1:9080/index.html -i\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/1.1 200 OK\n")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jack2")," \u53d1\u51fa\u8bbf\u95ee\u8bf7\u6c42\uff0c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"403")," HTTP \u72b6\u6001\u7801\uff0c\u4ee3\u8868\u8bbf\u95ee\u88ab\u9650\u5236\uff0c\u63d2\u4ef6\u751f\u6548\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -u jack2020:123456 http://127.0.0.1:9080/index.html -i\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 403 Forbidden\n...\n{"message":"The consumer_name is forbidden."}\n')),(0,r.kt)("h3",{id:"\u901a\u8fc7-allowed_by_methods-\u9650\u5236\u8bbf\u95ee"},"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"h3"},"allowed_by_methods")," \u9650\u5236\u8bbf\u95ee"),(0,r.kt)("p",null,"\u9996\u5148\uff0c\u521b\u5efa\u4e24\u4e2a Consumer\uff0c\u5206\u522b\u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"jack2"),"\uff0c\u521b\u5efa\u65b9\u6cd5\u8bf7\u53c2\u8003",(0,r.kt)("a",{parentName:"p",href:"#%E9%80%9A%E8%BF%87-consumername-%E9%99%90%E5%88%B6%E8%AE%BF%E9%97%AE"},"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"a"},"consumer_name")," \u9650\u5236\u8bbf\u95ee"),"\u3002"),(0,r.kt)("p",null,"\u7136\u540e\uff0c\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u7528\u5e76\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"consumer-restriction")," \u63d2\u4ef6\uff0c\u5e76\u4e14\u4ec5\u5141\u8bb8 ",(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"POST")," \u65b9\u6cd5\u8fdb\u884c\u8bbf\u95ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "plugins": {\n        "basic-auth": {},\n        "consumer-restriction": {\n            "allowed_by_methods":[{\n                "user": "jack1",\n                "methods": ["POST"]\n            }]\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u6d4b\u8bd5\u63d2\u4ef6")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u53d1\u51fa\u8bbf\u95ee\u8bf7\u6c42\uff0c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"403")," HTTP \u72b6\u6001\u7801\uff0c\u4ee3\u8868\u8bbf\u95ee\u88ab\u9650\u5236\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -u jack2019:123456 http://127.0.0.1:9080/index.html\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 403 Forbidden\n...\n{"message":"The consumer_name is forbidden."}\n')),(0,r.kt)("p",null,"\u73b0\u5728\u66f4\u65b0\u63d2\u4ef6\u914d\u7f6e\uff0c\u589e\u52a0 ",(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"GET")," \u8bbf\u95ee\u80fd\u529b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "plugins": {\n        "basic-auth": {},\n        "consumer-restriction": {\n            "allowed_by_methods":[{\n                "user": "jack1",\n                "methods": ["POST","GET"]\n            }]\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"jack1")," \u518d\u6b21\u53d1\u51fa\u8bbf\u95ee\u8bf7\u6c42\uff0c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"200")," HTTP \u72b6\u6001\u7801\uff0c\u4ee3\u8868\u8bbf\u95ee\u6210\u529f\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -u jack2019:123456 http://127.0.0.1:9080/index.html\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/1.1 200 OK\n")),(0,r.kt)("h3",{id:"\u901a\u8fc7-service_id-\u9650\u5236\u8bbf\u95ee"},"\u901a\u8fc7 ",(0,r.kt)("inlineCode",{parentName:"h3"},"service_id")," \u9650\u5236\u8bbf\u95ee"),(0,r.kt)("p",null,"\u4f7f\u7528 ",(0,r.kt)("inlineCode",{parentName:"p"},"service_id")," \u7684\u65b9\u5f0f\u9700\u8981\u4e0e\u6388\u6743\u63d2\u4ef6\u4e00\u8d77\u914d\u5408\u4f7f\u7528\uff0c\u8fd9\u91cc\u4ee5 ",(0,r.kt)("a",{parentName:"p",href:"/zh/docs/apisix/plugins/key-auth"},(0,r.kt)("inlineCode",{parentName:"a"},"key-auth"))," \u6388\u6743\u63d2\u4ef6\u4e3a\u4f8b\u3002"),(0,r.kt)("p",null,"\u9996\u5148\uff0c\u521b\u5efa\u4e24\u4e2a Service\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/services/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    },\n    "desc": "new service 001"\n}\'\n\ncurl http://127.0.0.1:9180/apisix/admin/services/2 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    },\n    "desc": "new service 002"\n}\'\n')),(0,r.kt)("p",null,"\u5728\u6307\u5b9a Consumer \u4e0a\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u548c ",(0,r.kt)("inlineCode",{parentName:"p"},"consumer-restriction")," \u63d2\u4ef6\uff0c\u5e76\u901a\u8fc7\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"service_id")," \u52a0\u5165 ",(0,r.kt)("inlineCode",{parentName:"p"},"whitelist")," \u6765\u9650\u5236 Consumer \u5bf9 Service \u7684\u8bbf\u95ee\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "new_consumer",\n    "plugins": {\n    "key-auth": {\n        "key": "auth-jack"\n    },\n    "consumer-restriction": {\n           "type": "service_id",\n            "whitelist": [\n                "1"\n            ],\n            "rejected_code": 403\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u6d4b\u8bd5\u63d2\u4ef6")),(0,r.kt)("p",null,"\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u7528\u5e76\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\uff0c\u5e76\u7ed1\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"service_id")," \u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"1"),"\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "service_id": 1,\n    "plugins": {\n         "key-auth": {\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u5bf9 Service \u53d1\u51fa\u8bbf\u95ee\u8bf7\u6c42\uff0c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"403")," HTTP \u72b6\u6001\u7801\uff0c\u8bf4\u660e\u5728\u767d\u540d\u5355\u5217\u4e2d\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"service_id")," \u5141\u8bb8\u8bbf\u95ee\uff0c\u63d2\u4ef6\u751f\u6548\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/index.html -H 'apikey: auth-jack' -i\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"HTTP/1.1 200 OK\n")),(0,r.kt)("p",null,"\u66f4\u65b0\u914d\u7f6e ",(0,r.kt)("inlineCode",{parentName:"p"},"key-auth")," \u63d2\u4ef6\uff0c\u5e76\u7ed1\u5b9a ",(0,r.kt)("inlineCode",{parentName:"p"},"service_id")," \u4e3a ",(0,r.kt)("inlineCode",{parentName:"p"},"2"),"\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "service_id": 2,\n    "plugins": {\n         "key-auth": {\n        }\n    }\n}\'\n')),(0,r.kt)("p",null,"\u518d\u6b21\u5bf9 Service \u53d1\u51fa\u8bbf\u95ee\u8bf7\u6c42\uff0c\u8fd4\u56de ",(0,r.kt)("inlineCode",{parentName:"p"},"403")," HTTP \u72b6\u6001\u7801\uff0c\u8bf4\u660e\u4e0d\u5728\u767d\u540d\u5355\u5217\u8868\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"service_id")," \u88ab\u62d2\u7edd\u8bbf\u95ee\uff0c\u63d2\u4ef6\u751f\u6548\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/index.html -H 'apikey: auth-jack' -i\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'HTTP/1.1 403 Forbidden\n...\n{"message":"The service_id is forbidden."}\n')),(0,r.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,r.kt)("p",null,"\u5f53\u4f60\u9700\u8981\u5220\u9664\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5220\u9664\u76f8\u5e94\u7684 JSON \u914d\u7f6e\uff0cAPISIX \u5c06\u4f1a\u81ea\u52a8\u91cd\u65b0\u52a0\u8f7d\u76f8\u5173\u914d\u7f6e\uff0c\u65e0\u9700\u91cd\u542f\u670d\u52a1\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    },\n    "plugins": {\n        "basic-auth": {}\n    }\n}\'\n')))}m.isMDXComponent=!0}}]);