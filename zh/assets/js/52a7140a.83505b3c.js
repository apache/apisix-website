"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[63929],{3905:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>u});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=l(t),u=a,v=d["".concat(c,".").concat(u)]||d[u]||m[u]||i;return t?r.createElement(v,o(o({ref:n},s),{},{components:t})):r.createElement(v,o({ref:n},s))}));function u(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var p={};for(var c in n)hasOwnProperty.call(n,c)&&(p[c]=n[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,o[1]=p;for(var l=2;l<i;l++)o[l]=t[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},34643:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var r=t(87462),a=(t(67294),t(3905));const i={title:"Service",keywords:["API \u7f51\u5173","Apache APISIX","Router"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 Apache APISIX Service \u5bf9\u8c61\u7684\u6982\u5ff5\u53ca\u5176\u4f7f\u7528\u65b9\u6cd5\u3002"},o=void 0,p={unversionedId:"terminology/service",id:"version-3.11/terminology/service",isDocsHomePage:!1,title:"Service",description:"\u672c\u6587\u4ecb\u7ecd\u4e86 Apache APISIX Service \u5bf9\u8c61\u7684\u6982\u5ff5\u53ca\u5176\u4f7f\u7528\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.11/terminology/service.md",sourceDirName:"terminology",slug:"/terminology/service",permalink:"/zh/docs/apisix/3.11/terminology/service",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.11/docs/zh/latest/terminology/service.md",tags:[],version:"3.11",frontMatter:{title:"Service",keywords:["API \u7f51\u5173","Apache APISIX","Router"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 Apache APISIX Service \u5bf9\u8c61\u7684\u6982\u5ff5\u53ca\u5176\u4f7f\u7528\u65b9\u6cd5\u3002"},sidebar:"version-3.11/docs",previous:{title:"Script",permalink:"/zh/docs/apisix/3.11/terminology/script"},next:{title:"Upstream",permalink:"/zh/docs/apisix/3.11/terminology/upstream"}},c=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u914d\u7f6e\u793a\u4f8b",id:"\u914d\u7f6e\u793a\u4f8b",children:[]}],l={toc:c};function s(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,a.kt)("p",null,"Service\uff08\u4e5f\u79f0\u4e4b\u4e3a\u670d\u52a1\uff09\u662f\u67d0\u7c7b API \u7684\u62bd\u8c61\uff08\u4e5f\u53ef\u4ee5\u7406\u89e3\u4e3a\u4e00\u7ec4 Route \u7684\u62bd\u8c61\uff09\u3002\u5b83\u901a\u5e38\u4e0e\u4e0a\u6e38\u670d\u52a1\u62bd\u8c61\u662f\u4e00\u4e00\u5bf9\u5e94\u7684\uff0c\u4f46\u4e0e\u8def\u7531\u4e4b\u95f4\uff0c\u901a\u5e38\u662f 1:N \u5373\u4e00\u5bf9\u591a\u7684\u5173\u7cfb\u3002\u53c2\u770b\u4e0b\u56fe\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.11/docs/assets/images/service-example.png",alt:"\u670d\u52a1\u793a\u4f8b"})),(0,a.kt)("p",null,"\u4e0d\u540c\u8def\u7531\u89c4\u5219\u540c\u65f6\u7ed1\u5b9a\u5230\u4e00\u4e2a\u670d\u52a1\u4e0a\uff0c\u8fd9\u4e9b\u8def\u7531\u5c06\u5177\u6709\u76f8\u540c\u7684\u4e0a\u6e38\u548c\u63d2\u4ef6\u914d\u7f6e\uff0c\u51cf\u5c11\u5197\u4f59\u914d\u7f6e\u3002\u5f53\u8def\u7531\u548c\u670d\u52a1\u90fd\u5f00\u542f\u540c\u4e00\u4e2a\u63d2\u4ef6\u65f6\uff0c\u8def\u7531\u4e2d\u7684\u63d2\u4ef6\u4f18\u5148\u7ea7\u9ad8\u4e8e\u670d\u52a1\u4e2d\u7684\u63d2\u4ef6\u3002\u5173\u4e8e\u63d2\u4ef6\u4f18\u5148\u7ea7\u7684\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/terminology/plugin"},"Plugin"),"\u3002"),(0,a.kt)("p",null,"\u66f4\u591a\u5173\u4e8e Service \u7684\u4fe1\u606f\uff0c\u8bf7\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/admin-api#service"},"Admin API \u7684 Service \u5bf9\u8c61"),"\u3002"),(0,a.kt)("h2",{id:"\u914d\u7f6e\u793a\u4f8b"},"\u914d\u7f6e\u793a\u4f8b"),(0,a.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u521b\u5efa\u4e86\u4e00\u4e2a\u542f\u7528\u9650\u6d41\u63d2\u4ef6\u7684\u670d\u52a1\uff0c\u5e76\u4e14\u5c06\u8be5\u670d\u52a1\u7ed1\u5b9a\u5230 ID \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"100")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"101")," \u7684\u8def\u7531\u4e0a\u3002"),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,a.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,a.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,a.kt)("pre",{parentName:"div"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u521b\u5efa\u670d\u52a1\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/services/200 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "limit-count": {\n            "count": 2,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key": "remote_addr"\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u521b\u5efa ID \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"100")," \u7684\u8def\u7531\uff0c\u5e76\u7ed1\u5b9a ID \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"200")," \u7684\u670d\u52a1\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/100 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/index.html",\n    "service_id": "200"\n}\'\n'))),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"\u521b\u5efa ID \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"101")," \u7684\u8def\u7531\uff0c\u5e76\u7ed1\u5b9a ID \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"200")," \u7684\u670d\u52a1\u3002"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/101 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/foo/index.html",\n    "service_id": "200"\n}\'\n')))),(0,a.kt)("p",null,"\u5f53\u7136\u4f60\u4e5f\u53ef\u4ee5\u4e3a\u8def\u7531\u6307\u5b9a\u4e0d\u540c\u7684\u63d2\u4ef6\u914d\u7f6e\u6216\u4e0a\u6e38\u3002\u6bd4\u5982\u5728\u4ee5\u4e0b\u793a\u4f8b\u4e2d\uff0c\u6211\u4eec\u8bbe\u7f6e\u4e86\u4e0d\u540c\u7684\u9650\u6d41\u53c2\u6570\uff0c\u5176\u4ed6\u90e8\u5206\uff08\u6bd4\u5982\u4e0a\u6e38\uff09\u5219\u7ee7\u7eed\u4f7f\u7528\u4e0a\u8ff0\u670d\u52a1\u4e2d\u7684\u914d\u7f6e\u53c2\u6570\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/102 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/bar/index.html",\n    "id": "102",\n    "service_id": "200",\n    "plugins": {\n        "limit-count": {\n            "count": 2000,\n            "time_window": 60,\n            "rejected_code": 503,\n            "key": "remote_addr"\n        }\n    }\n}\'\n')),(0,a.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"\u63d0\u793a")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u5f53\u8def\u7531\u548c\u670d\u52a1\u90fd\u542f\u7528\u540c\u4e00\u4e2a\u63d2\u4ef6\u65f6\uff0c\u8def\u7531\u4e2d\u7684\u63d2\u4ef6\u914d\u7f6e\u4f1a\u4f18\u5148\u4e8e\u670d\u52a1\u3002\u66f4\u591a\u4fe1\u606f\uff0c\u8bf7\u53c2\u8003",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.11/terminology/plugin"},"Plugin"),"\u3002"))))}s.isMDXComponent=!0}}]);