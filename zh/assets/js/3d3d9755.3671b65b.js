"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[74310],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),o=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):p(p({},t),e)),a},c=function(e){var t=o(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=o(a),u=i,k=m["".concat(s,".").concat(u)]||m[u]||d[u]||r;return a?n.createElement(k,p(p({ref:t},c),{},{components:a})):n.createElement(k,p({ref:t},c))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,p=new Array(r);p[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,p[1]=l;for(var o=2;o<r;o++)p[o]=a[o];return n.createElement.apply(null,p)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},55331:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>p,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var n=a(87462),i=(a(67294),a(3905));const r={title:"\u76d1\u63a7 API",keywords:["API \u7f51\u5173","Apache APISIX","\u53ef\u89c2\u6d4b\u6027","\u76d1\u63a7","\u63d2\u4ef6"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 API \u7f51\u5173 Apache APISIX \u53ef\u89c2\u5bdf\u6027\u63d2\u4ef6\u5e76\u4e86\u89e3\u5982\u4f55\u8bbe\u7f6e\u8fd9\u4e9b\u63d2\u4ef6\u3002"},p=void 0,l={unversionedId:"tutorials/observe-your-api",id:"version-3.10/tutorials/observe-your-api",isDocsHomePage:!1,title:"\u76d1\u63a7 API",description:"\u672c\u6587\u4ecb\u7ecd\u4e86 API \u7f51\u5173 Apache APISIX \u53ef\u89c2\u5bdf\u6027\u63d2\u4ef6\u5e76\u4e86\u89e3\u5982\u4f55\u8bbe\u7f6e\u8fd9\u4e9b\u63d2\u4ef6\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.10/tutorials/observe-your-api.md",sourceDirName:"tutorials",slug:"/tutorials/observe-your-api",permalink:"/zh/docs/apisix/3.10/tutorials/observe-your-api",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.10/docs/zh/latest/tutorials/observe-your-api.md",tags:[],version:"3.10",frontMatter:{title:"\u76d1\u63a7 API",keywords:["API \u7f51\u5173","Apache APISIX","\u53ef\u89c2\u6d4b\u6027","\u76d1\u63a7","\u63d2\u4ef6"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 API \u7f51\u5173 Apache APISIX \u53ef\u89c2\u5bdf\u6027\u63d2\u4ef6\u5e76\u4e86\u89e3\u5982\u4f55\u8bbe\u7f6e\u8fd9\u4e9b\u63d2\u4ef6\u3002"},sidebar:"version-3.10/docs",previous:{title:"\u4fdd\u62a4 API",permalink:"/zh/docs/apisix/3.10/tutorials/protect-api"},next:{title:"\u5065\u5eb7\u68c0\u67e5",permalink:"/zh/docs/apisix/3.10/tutorials/health-check"}},s=[{value:"API \u53ef\u89c2\u6d4b\u6027",id:"api-\u53ef\u89c2\u6d4b\u6027",children:[]},{value:"\u524d\u63d0\u6761\u4ef6",id:"\u524d\u63d0\u6761\u4ef6",children:[]},{value:"\u65e5\u5fd7",id:"\u65e5\u5fd7",children:[]},{value:"\u6307\u6807",id:"\u6307\u6807",children:[]},{value:"\u94fe\u8def\u8ffd\u8e2a",id:"\u94fe\u8def\u8ffd\u8e2a",children:[]},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[]}],o={toc:s};function c(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"APISIX \u4e2d\u63d0\u4f9b\u4e86\u5f88\u591a\u5177\u6709\u4e30\u5bcc\u529f\u80fd\u7684\u53ef\u89c2\u6d4b\u6027\u63d2\u4ef6\u3002\u4f60\u53ef\u4ee5\u901a\u8fc7\u4f7f\u7528\u548c\u8bbe\u7f6e\u8fd9\u4e9b\u63d2\u4ef6\uff0c\u6765\u4e86\u89e3 API \u884c\u4e3a\uff0c\u8fdb\u800c\u4f7f\u6574\u4e2a\u4e1a\u52a1\u6d41\u7a0b\u66f4\u52a0\u6e05\u6670\u3002"),(0,i.kt)("h2",{id:"api-\u53ef\u89c2\u6d4b\u6027"},"API \u53ef\u89c2\u6d4b\u6027"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"API \u53ef\u89c2\u6d4b\u6027"),"\u5df2\u7ecf\u6210\u4e3a API \u5f00\u53d1\u7684\u4e00\u90e8\u5206\uff0c\u56e0\u4e3a\u5b83\u89e3\u51b3\u4e86\u4e0e API \u4e00\u81f4\u6027\u3001\u53ef\u9760\u6027\u548c\u5feb\u901f\u8fed\u4ee3 API \u529f\u80fd\u7684\u76f8\u5173\u95ee\u9898\u3002\u53ef\u89c2\u6d4b\u6027\u53ef\u5206\u4e3a\u4e09\u4e2a\u5173\u952e\u90e8\u5206\uff1a\u65e5\u5fd7\u3001\u6307\u6807\u3001\u94fe\u8def\u8ffd\u8e2a\uff0c\u63a5\u4e0b\u6765\u8ba9\u6211\u4eec\u9010\u4e2a\u4e86\u89e3\u5b83\u4eec\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321cf14c555a.jpg",alt:"Observability of three key areas"})),(0,i.kt)("h2",{id:"\u524d\u63d0\u6761\u4ef6"},"\u524d\u63d0\u6761\u4ef6"),(0,i.kt)("p",null,"\u5728\u8fdb\u884c\u8be5\u6559\u7a0b\u4e4b\u524d\uff0c\u8bf7\u786e\u4fdd\u4f60\u5df2\u7ecf",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/tutorials/expose-api"},"\u516c\u5f00\u670d\u52a1"),"\u3002"),(0,i.kt)("h2",{id:"\u65e5\u5fd7"},"\u65e5\u5fd7"),(0,i.kt)("p",null,"\u5728 APISIX \u4e2d\uff0c",(0,i.kt)("strong",{parentName:"p"},"\u65e5\u5fd7"),"\u53ef\u5206\u4e3a\u8bbf\u95ee\u65e5\u5fd7\u548c\u9519\u8bef\u65e5\u5fd7\u3002\u8bbf\u95ee\u65e5\u5fd7\u4e3b\u8981\u8bb0\u5f55\u4e86\u6bcf\u4e2a\u8bf7\u6c42\u7684\u4e0a\u4e0b\u6587\u4fe1\u606f\uff0c\u9519\u8bef\u65e5\u5fd7\u5219\u662f APISIX \u8fd0\u884c\u6253\u5370\u7684\u65e5\u5fd7\u4fe1\u606f\uff0c\u5305\u62ec NGINX \u548c\u63d2\u4ef6\u76f8\u5173\u7684\u4fe1\u606f\u3002APISIX \u7684\u65e5\u5fd7\u5b58\u50a8\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"./apisix/logs/")," \u76ee\u5f55\u4e0b\u3002\u5f53\u7136\u4f60\u53ef\u4ee5\u901a\u8fc7\u4e00\u4e9b APISIX \u7684\u65e5\u5fd7\u63d2\u4ef6\uff0c\u5c06 APISIX \u7684\u65e5\u5fd7\u53d1\u9001\u5230\u6307\u5b9a\u7684\u65e5\u5fd7\u670d\u52a1\u4e2d\uff0cAPISIX \u63d0\u4f9b\u4e86\u4ee5\u4e0b\u63d2\u4ef6\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/http-logger"},"http-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/skywalking-logger"},"skywalking-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/tcp-logger"},"tcp-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/kafka-logger"},"kafka-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/rocketmq-logger"},"rocketmq-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/udp-logger"},"udp-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/clickhouse-logger"},"clickhouse-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/error-log-logger"},"error-logger")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/google-cloud-logging"},"google-cloud-logging"))),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u5728 APISIX ",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/plugins/http-logger"},"\u63d2\u4ef6\u4e2d\u5fc3")," \u67e5\u770b APISIX \u652f\u6301\u7684\u6240\u6709\u65e5\u5fd7\u63d2\u4ef6\u3002\u63a5\u4e0b\u6765\u6211\u4eec\u5c06\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"http-logger")," \u63d2\u4ef6\u4e3a\u4f60\u6f14\u793a\u5982\u4f55\u5c06 APISIX \u7684\u65e5\u5fd7\u6570\u636e\u53d1\u9001\u5230 HTTP/HTTPS \u670d\u52a1\u5668\u4e2d\u3002"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u6ce8\u610f")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4f60\u53ef\u4ee5\u4f7f\u7528 ",(0,i.kt)("a",{parentName:"p",href:"https://mockbin.org/"},"mockbin.com")," \u751f\u6210\u4e00\u4e2a\u6a21\u62df\u7684 HTTP \u670d\u52a1\u5668\u6765\u5b58\u50a8\u548c\u67e5\u770b\u65e5\u5fd7\u3002"))),(0,i.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c55\u793a\u4e86\u5728\u6307\u5b9a\u8def\u7531\u4e0a\u542f\u52a8 ",(0,i.kt)("inlineCode",{parentName:"p"},"http-logger")," \u7684\u793a\u4f8b\u3002"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u60a8\u53ef\u4ee5\u8fd9\u6837\u4ece ",(0,i.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u4e2d\u83b7\u53d6 ",(0,i.kt)("inlineCode",{parentName:"p"},"admin_key")," \u5e76\u5b58\u5165\u73af\u5883\u53d8\u91cf\uff1a"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'\ncurl http://127.0.0.1:9180/apisix/admin/routes/1 \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n  "plugins": {\n    "http-logger": {\n      "uri": "http://mockbin.org/bin/5451b7cd-af27-41b8-8df1-282ffea13a61"\n    }\n  },\n  "upstream_id": "1",\n  "uri": "/get"\n}\'\n\n')),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"\u6ce8\u610f")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4f60\u53ef\u4ee5\u901a\u8fc7\u4fee\u6539 ",(0,i.kt)("inlineCode",{parentName:"p"},"uri")," \u5c5e\u6027\uff0c\u5c06\u4e0a\u8ff0 ",(0,i.kt)("inlineCode",{parentName:"p"},"http-logger")," \u7684\u670d\u52a1\u5668\u5730\u5740\u66f4\u6362\u4e3a\u4f60\u7684\u670d\u52a1\u5668\u5730\u5740\uff1a"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n   "uri": "http://mockbin.org/bin/5451b7cd-af27-41b8-8df1-282ffea13a61"\n}\n')))),(0,i.kt)("p",null,"\u521b\u5efa\u6210\u529f\u540e\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u5411 ",(0,i.kt)("inlineCode",{parentName:"p"},"get")," \u7aef\u70b9\u53d1\u9001\u8bf7\u6c42\u4ee5\u751f\u6210\u65e5\u5fd7\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/get\n")),(0,i.kt)("p",null,"\u8bf7\u6c42\u6210\u529f\u540e\uff0c\u4f60\u53ef\u4ee5\u5355\u51fb",(0,i.kt)("a",{parentName:"p",href:"http://mockbin.org/bin/5451b7cd-af27-41b8-8df1-282ffea13a61/log"},"\u6a21\u62df\u670d\u52a1\u5668\u94fe\u63a5"),"\u67e5\u770b\u8bbf\u95ee\u65e5\u5fd7\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321d1d83eb7a.png",alt:"http-logger-plugin-test-screenshot"})),(0,i.kt)("h2",{id:"\u6307\u6807"},"\u6307\u6807"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u6307\u6807"),"\u662f\u5728\u2f00\u6bb5\u65f6\u95f4\u5185\u6d4b\u91cf\u7684\u6570\u503c\u3002\u4e0e\u2f47\u5fd7\u4e0d\u540c\uff0c\u6307\u6807\u5728\u9ed8\u8ba4\u60c5\u51b5\u4e0b\u662f\u7ed3\u6784\u5316\u7684\uff0c\u8fd9\u4f7f\u5f97\u67e5\u8be2\u548c\u4f18\u5316\u5b58\u50a8\u53d8\u5f97\u66f4\u52a0\u5bb9\u6613\u3002\u800c APISIX \u4e5f\u63d0\u4f9b\u4e86 ",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/plugins/prometheus"},"Prometheus")," \u7684\u63d2\u4ef6\u6765\u83b7\u53d6\u4f60\u7684 API \u6307\u6807\uff0c\u5e76\u5728 Prometheus \u4e2d\u66b4\u9732\u5b83\u4eec\u3002\u901a\u8fc7\u4f7f\u7528 APISIX \u63d0\u4f9b\u7684 Grafana \u4eea\u8868\u677f\u5143\u6570\u636e\uff0c\u5e76\u4ece Prometheus \u4e2d\u83b7\u53d6\u6307\u6807\uff0c\u66f4\u52a0\u65b9\u4fbf\u5730\u76d1\u63a7\u4f60\u7684 API\u3002"),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"prometheus")," \u63d2\u4ef6\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n  "uri": "/get",\n  "plugins": {\n    "prometheus": {}\n  },\n  "upstream_id": "1"\n}\'\n')),(0,i.kt)("p",null,"\u542f\u7528\u6210\u529f\u540e\uff0c\u4f60\u53ef\u4ee5\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"/apisix/prometheus/metrics")," \u63a5\u53e3\u83b7\u53d6 APISIX \u7684\u6307\u6807\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9091/apisix/prometheus/metrics\n")),(0,i.kt)("p",null,"\u8fd4\u56de\u7ed3\u679c\u5982\u4e0b\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},'HTTP/1.1 200 OK\nServer: openresty\nContent-Type: text/plain; charset=utf-8\nTransfer-Encoding: chunked\nConnection: keep-alive\n\n# HELP apisix_batch_process_entries batch process remaining entries\n# TYPE apisix_batch_process_entries gauge\napisix_batch_process_entries{name="http logger",route_id="1",server_addr="172.19.0.8"} 0\n# HELP apisix_etcd_modify_indexes Etcd modify index for APISIX keys\n# TYPE apisix_etcd_modify_indexes gauge\napisix_etcd_modify_indexes{key="consumers"} 17819\napisix_etcd_modify_indexes{key="global_rules"} 17832\napisix_etcd_modify_indexes{key="max_modify_index"} 20028\napisix_etcd_modify_indexes{key="prev_index"} 18963\napisix_etcd_modify_indexes{key="protos"} 0\napisix_etcd_modify_indexes{key="routes"} 20028\n...\n')),(0,i.kt)("p",null,"\u4f60\u8fd8\u53ef\u4ee5\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"p"},"http://localhost:9090/targets")," \u5728 Prometheus \u4eea\u8868\u677f\u4e0a\u67e5\u770b\u7aef\u70b9\u7684\u72b6\u6001\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321d30b32024.png",alt:"plu\u200b\u200bgin-orchestration-configure-rule-screenshot"})),(0,i.kt)("p",null,"\u5982\u4e0a\u56fe\uff0cAPISIX \u516c\u5f00\u7684\u6307\u6807\u7aef\u70b9\u5df2\u542f\u52a8\u5e76\u6b63\u5728\u8fd0\u884c\u3002"),(0,i.kt)("p",null,"\u73b0\u5728\uff0c\u4f60\u53ef\u4ee5\u67e5\u8be2 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix_http_status")," \u7684\u6307\u6807\uff0c\u67e5\u770b APISIX \u5904\u7406\u4e86\u54ea\u4e9b HTTP \u8bf7\u6c42\u53ca\u5176\u7ed3\u679c\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321d30aed3b2.png",alt:"prometheus-plugin-dashboard-query-http-status-screenshot"})),(0,i.kt)("p",null,"\u9664\u6b64\u4e4b\u5916\uff0c\u4f60\u8fd8\u53ef\u4ee5\u67e5\u770b\u5728\u672c\u5730\u5b9e\u4f8b\u4e2d\u8fd0\u884c\u7684 Grafana \u4eea\u8868\u677f\u3002\u8bf7\u8bbf\u95ee ",(0,i.kt)("inlineCode",{parentName:"p"},"http://localhost:3000/"),"\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321d30bba97c.png",alt:"prometheus-plugin-grafana-dashboard-screenshot"})),(0,i.kt)("p",null,"\u76ee\u524d\uff0cAPISIX \u8fd8\u63d0\u4f9b\u4e86\u5176\u4ed6\u4e24\u4e2a\u5173\u4e8e\u6307\u6807\u7684\u63d2\u4ef6\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/node-status"},"Node status \u63d2\u4ef6"),"(",(0,i.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/plugins/node-status/"},"https://apisix.apache.org/docs/apisix/plugins/node-status/"),")"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/zh/docs/apisix/3.10/plugins/datadog"},"Datadog \u63d2\u4ef6"))),(0,i.kt)("h2",{id:"\u94fe\u8def\u8ffd\u8e2a"},"\u94fe\u8def\u8ffd\u8e2a"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u94fe\u8def\u8ffd\u8e2a"),"\u5c31\u662f\u5c06\u4e00\u6b21\u8bf7\u6c42\u8fd8\u539f\u6210\u8c03\u7528\u94fe\u8def\uff0c\u5e76\u5c06\u8be5\u8bf7\u6c42\u7684\u8c03\u7528\u60c5\u51b5\u4f7f\u7528\u62d3\u6251\u7684\u65b9\u5f0f\u5c55\u73b0\uff0c\u6bd4\u5982\u5c55\u793a\u5404\u4e2a\u5fae\u670d\u52a1\u8282\u70b9\u4e0a\u7684\u8017\u65f6\uff0c\u8bf7\u6c42\u5177\u4f53\u7ecf\u8fc7\u4e86\u54ea\u4e9b\u670d\u52a1\u5668\u4ee5\u53ca\u6bcf\u4e2a\u670d\u52a1\u8282\u70b9\u7684\u8bf7\u6c42\u72b6\u6001\u7b49\u5185\u5bb9\u3002"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://zipkin.io/"},"Zipkin")," \u4e00\u4e2a\u5f00\u6e90\u7684\u5206\u5e03\u5f0f\u8ffd\u8e2a\u7cfb\u7edf\u3002APISIX \u7684",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/plugins/zipkin"},"zipkin \u63d2\u4ef6")," \u652f\u6301\u6839\u636e ",(0,i.kt)("a",{parentName:"p",href:"https://zipkin.io/pages/instrumenting.html"},"Zipkin API \u89c4\u8303")," \u6536\u96c6\u94fe\u8def\u4fe1\u606f\u5e76\u62a5\u544a\u7ed9 Zipkin Collector\u3002"),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"\u63d0\u793a")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4f7f\u7528\u8be5\u63d2\u4ef6\u524d\uff0c\u8bf7\u786e\u4fdd\u4f60\u5df2\u7ecf\u6709\u4e00\u4e2a\u6b63\u5728\u8fd0\u884c\u7684 Zipkin \u5b9e\u4f8b\u3002\u4f60\u53ef\u4ee5\u4f7f\u7528 Docker \u5feb\u901f\u542f\u52a8\u4e00\u4e2a Zipkin \u5b9e\u4f8b\uff1a"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre"},"docker run -d -p 9411:9411 openzipkin/zipkin\n")))),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u5982\u4e0b\u793a\u4f8b\uff0c\u5728\u6307\u5b9a\u8def\u7531\u4e2d\u542f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"zipkin")," \u63d2\u4ef6\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1  \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n  "methods": [\n    "GET"\n  ],\n  "uri": "/get",\n  "plugins": {\n    "zipkin": {\n      "endpoint": "http://127.0.0.1:9411/api/v2/spans",\n      "sample_ratio": 1\n    }\n  },\n  "upstream_id": "1"\n}\'\n')),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u547d\u4ee4\u8bf7\u6c42 APISIX\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/get\n")),(0,i.kt)("p",null,"\u5982\u4e0b\u6240\u793a\uff0c\u8fd4\u56de\u7ed3\u679c\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"header")," \u90e8\u5206\u9644\u52a0\u4e86\u4e00\u4e9b\u989d\u5916\u7684\u8ddf\u8e2a\u6807\u8bc6\u7b26\uff08TraceId\u3001SpanId \u548c ParentId\uff09\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-text"},'"X-B3-Parentspanid": "61bd3f4046a800e7",\n"X-B3-Sampled": "1",\n"X-B3-Spanid": "855cd5465957f414",\n"X-B3-Traceid": "e18985df47dab632d62083fd96626692",\n')),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u901a\u8fc7\u8bbf\u95ee ",(0,i.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:9411/zipkin"),"\uff0c\u5728 Zipkin \u7684 Web UI \u4e0a\u770b\u5230\u8bf7\u6c42\u94fe\u8def\u3002"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321dc27f3d33.png",alt:"Zipkin plugin output 1"})),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/09/14/6321dc284049c.png",alt:"Zipkin plugin output 2"})),(0,i.kt)("p",null,"\u4f60\u4e5f\u53ef\u4ee5\u901a\u8fc7\u53e6\u5916\u4e24\u4e2a\u63d2\u4ef6\u8fdb\u884c\u94fe\u8def\u8ffd\u8e2a\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/plugins/skywalking"},"Skywalking \u63d2\u4ef6"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.10/plugins/opentelemetry"},"OpenTelemetry \u63d2\u4ef6")))),(0,i.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,i.kt)("p",null,"API \u53ef\u89c2\u6d4b\u6027\u662f\u4e00\u79cd\u7528\u4e8e\u5728 API \u4e16\u754c\u4e2d\u7ba1\u7406\u5e94\u7528\u7a0b\u5e8f\u7684\u6846\u67b6\uff0cAPISIX \u7684\u63d2\u4ef6\u53ef\u4ee5\u901a\u8fc7\u96c6\u6210\u5230\u591a\u4e2a\u53ef\u89c2\u6d4b\u6027\u5e73\u53f0\u6765\u5e2e\u52a9\u4f60\u76d1\u63a7 API\uff0c\u8ba9\u4f60\u66f4\u4e13\u6ce8\u4e8e\u5f00\u53d1\u6838\u5fc3\u4e1a\u52a1\u529f\u80fd\uff0c\u65e0\u9700\u4e3a\u96c6\u6210\u591a\u4e2a\u53ef\u89c2\u6d4b\u6027\u5e94\u7528\u82b1\u8d39\u66f4\u591a\u65f6\u95f4\u3002"))}c.isMDXComponent=!0}}]);