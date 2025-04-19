"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[87821],{35318:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>g});var a=t(27378);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var p=a.createContext({}),c=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=c(e.components);return a.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=c(t),g=l,d=m["".concat(p,".").concat(g)]||m[g]||u[g]||r;return t?a.createElement(d,i(i({ref:n},s),{},{components:t})):a.createElement(d,i({ref:n},s))}));function g(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var r=t.length,i=new Array(r);i[0]=m;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:l,i[1]=o;for(var c=2;c<r;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},60738:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var a=t(25773),l=(t(27378),t(35318));const r={title:"\u540e\u7aef\u65b0\u624b\u5982\u4f55\u4ece 0 \u5230 1 \u5728 API \u7f51\u5173\u4e0a\u5f00\u53d1 APISIX \u63d2\u4ef6",authors:[{name:"\u90ed\u5947",title:"Author",url:"https://github.com/guoqqqi",image_url:"https://avatars.githubusercontent.com/u/72343596?v=4"},{name:"\u66fe\u5955\u9716",title:"Technical Writer",url:"https://github.com/yzeng25",image_url:"https://avatars.githubusercontent.com/u/36651058?v=4"}],keywords:["\u63d2\u4ef6\u5f00\u53d1","\u4e8c\u6b21\u5f00\u53d1","API \u7f51\u5173","Logging","file logger"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u6ca1\u6709\u540e\u7aef\u7ecf\u9a8c\u7684\u524d\u7aef\u5de5\u7a0b\u5e08\u5982\u4f55\u5728\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX \u4e0a\u5f00\u53d1 file-logger \u63d2\u4ef6\u7684\u5177\u4f53\u6b65\u9aa4\uff0c\u4ece\u4e2d\u4f60\u53ef\u4ee5\u5b66\u4e60\u5230\u5728 APISIX \u4e0a\u8fdb\u884c\u5f00\u53d1\u63d2\u4ef6\u3002",tags:["Plugins","Ecosystem"]},i=void 0,o={permalink:"/zh/blog/2022/02/16/file-logger-api-gateway",source:"@site/blog/2022/02/16/file-logger-api-gateway.md",title:"\u540e\u7aef\u65b0\u624b\u5982\u4f55\u4ece 0 \u5230 1 \u5728 API \u7f51\u5173\u4e0a\u5f00\u53d1 APISIX \u63d2\u4ef6",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u6ca1\u6709\u540e\u7aef\u7ecf\u9a8c\u7684\u524d\u7aef\u5de5\u7a0b\u5e08\u5982\u4f55\u5728\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX \u4e0a\u5f00\u53d1 file-logger \u63d2\u4ef6\u7684\u5177\u4f53\u6b65\u9aa4\uff0c\u4ece\u4e2d\u4f60\u53ef\u4ee5\u5b66\u4e60\u5230\u5728 APISIX \u4e0a\u8fdb\u884c\u5f00\u53d1\u63d2\u4ef6\u3002",date:"2022-02-16T00:00:00.000Z",formattedDate:"2022\u5e742\u670816\u65e5",tags:[{label:"Plugins",permalink:"/zh/blog/tags/plugins"},{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:12.6,truncated:!0,authors:[{name:"\u90ed\u5947",title:"Author",url:"https://github.com/guoqqqi",image_url:"https://avatars.githubusercontent.com/u/72343596?v=4",imageURL:"https://avatars.githubusercontent.com/u/72343596?v=4"},{name:"\u66fe\u5955\u9716",title:"Technical Writer",url:"https://github.com/yzeng25",image_url:"https://avatars.githubusercontent.com/u/36651058?v=4",imageURL:"https://avatars.githubusercontent.com/u/36651058?v=4"}],prevItem:{title:"\u793e\u533a\u53cc\u5468\u62a5\uff5c2.1-2.14 \u529f\u80fd\u4eae\u70b9\u66f4\u65b0\u8fdb\u884c\u4e2d",permalink:"/zh/blog/2022/02/17/weekly-report-0214"},nextItem:{title:"Apache APISIX \u5b58\u5728\u6539\u5199 X-REAL-IP header \u7684\u98ce\u9669\u516c\u544a\uff08CVE-2022-24112\uff09",permalink:"/zh/blog/2022/02/11/cve-2022-24112"}},p={authorsImageUrls:[void 0,void 0]},c=[{value:"\u529f\u80fd\u4ecb\u7ecd",id:"\u529f\u80fd\u4ecb\u7ecd",children:[],level:2},{value:"\u5f00\u53d1\u5b9e\u73b0\u8fc7\u7a0b",id:"\u5f00\u53d1\u5b9e\u73b0\u8fc7\u7a0b",children:[{value:"\u786e\u5b9a\u63d2\u4ef6\u540d\u79f0\u53ca\u4f18\u5148\u7ea7",id:"\u786e\u5b9a\u63d2\u4ef6\u540d\u79f0\u53ca\u4f18\u5148\u7ea7",children:[],level:3},{value:"\u521b\u5efa\u6700\u5c0f\u53ef\u6267\u884c\u63d2\u4ef6\u6587\u4ef6",id:"\u521b\u5efa\u6700\u5c0f\u53ef\u6267\u884c\u63d2\u4ef6\u6587\u4ef6",children:[],level:3},{value:"\u542f\u7528\u63d2\u4ef6\u5e76\u6d4b\u8bd5",id:"\u542f\u7528\u63d2\u4ef6\u5e76\u6d4b\u8bd5",children:[],level:3},{value:"\u4e3a file-logger \u63d2\u4ef6\u7f16\u5199\u6838\u5fc3\u529f\u80fd",id:"\u4e3a-file-logger-\u63d2\u4ef6\u7f16\u5199\u6838\u5fc3\u529f\u80fd",children:[],level:3}],level:2},{value:"\u9a8c\u8bc1\u53ca\u6dfb\u52a0\u6d4b\u8bd5",id:"\u9a8c\u8bc1\u53ca\u6dfb\u52a0\u6d4b\u8bd5",children:[{value:"\u9a8c\u8bc1\u6536\u96c6\u65e5\u5fd7\u8bb0\u5f55",id:"\u9a8c\u8bc1\u6536\u96c6\u65e5\u5fd7\u8bb0\u5f55",children:[],level:3},{value:"\u4e3a\u63d2\u4ef6\u6dfb\u52a0\u6d4b\u8bd5",id:"\u4e3a\u63d2\u4ef6\u6dfb\u52a0\u6d4b\u8bd5",children:[],level:3}],level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[],level:2},{value:"\u53c2\u8003\u8d44\u6599",id:"\u53c2\u8003\u8d44\u6599",children:[],level:2}],s={toc:c};function u(e){let{components:n,...t}=e;return(0,l.kt)("wrapper",(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u672c\u7bc7\u6587\u7ae0\u8bb0\u5f55\u4e86\u4e00\u4e2a\u6ca1\u6709\u540e\u7aef\u7ecf\u9a8c\u7684\u524d\u7aef\u5de5\u7a0b\u5e08\u5f00\u53d1 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u7684\u8fc7\u7a0b\u3002")),(0,l.kt)("p",null,"\u5728\u8fc7\u53bb\u7684\u51e0\u4e2a\u6708\uff0c\u793e\u533a\u7528\u6237\u4e3a Apache APISIX \u6dfb\u52a0\u4e86\u8bb8\u591a\u63d2\u4ef6\uff0c\u4e30\u5bcc\u4e86 Apache APISIX \u7684\u751f\u6001\u3002\u4ece\u4f7f\u7528\u8005\u7684\u89d2\u5ea6\u800c\u8a00\uff0c\u66f4\u591a\u6837\u5316\u7684\u63d2\u4ef6\u51fa\u73b0\u65e0\u7591\u662f\u4e00\u4ef6\u597d\u4e8b\uff0c\u5b83\u4eec\u5728\u5b8c\u5584 Apache APISIX \u9ad8\u6027\u80fd\u548c\u4f4e\u5ef6\u8fdf\u7684\u57fa\u7840\u4e4b\u4e0a\uff0c\u6ee1\u8db3\u4e86\u4f7f\u7528\u8005\u5bf9\u4e8e\u7f51\u5173\u7684\u66f4\u591a\u671f\u671b\uff0c\u5373\u201c\u4e00\u7ad9\u5f0f\u201d\u548c\u201c\u591a\u529f\u80fd\u201d\u3002"),(0,l.kt)("p",null,"\u793e\u533a\u7684\u8d21\u732e\u8005\u4eec\u662f\u5982\u4f55\u4e3a Apache APISIX \u5f00\u53d1\u63d2\u4ef6\u7684\u5462\uff1fApache APISIX \u535a\u5ba2\u4e0a\u7684\u6587\u7ae0\u4f3c\u4e4e\u90fd\u6ca1\u6709\u8be6\u7ec6\u8bb2\u8ff0\u8fc7\u5f00\u53d1\u63d2\u4ef6\u7684\u6d41\u7a0b\u3002\u90a3\u4e48\u8fd9\u6b21\u6211\u4eec\u6362\u4e00\u4e2a\u89c6\u89d2\uff0c\u4ece\u63d2\u4ef6\u5f00\u53d1\u8005\u7684\u89d2\u5ea6\u51fa\u53d1\uff0c\u4e00\u8d77\u6765\u770b\u770b\u4e00\u6b3e\u63d2\u4ef6\u8bde\u751f\u7684\u5168\u8fc7\u7a0b\u5427\uff01"),(0,l.kt)("p",null,"\u672c\u7bc7\u6587\u7ae0\u8bb0\u5f55\u4e86\u4e00\u4e2a",(0,l.kt)("strong",{parentName:"p"},"\u6ca1\u6709\u540e\u7aef\u7ecf\u9a8c\u7684\u524d\u7aef\u5de5\u7a0b\u5e08"),"\u5728 API \u7f51\u5173\u4e0a\u5f00\u53d1 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u7684\u8fc7\u7a0b\u3002\u5728\u8be6\u7ec6\u8bf4\u660e\u5b9e\u73b0\u8fc7\u7a0b\u4e4b\u524d\uff0c\u5148\u5411\u5927\u5bb6\u7b80\u5355\u4ecb\u7ecd\u4e0b ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u7684\u529f\u80fd\u3002"),(0,l.kt)("h2",{id:"\u529f\u80fd\u4ecb\u7ecd"},"\u529f\u80fd\u4ecb\u7ecd"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u652f\u6301\u4f7f\u7528 Apache APISIX \u63d2\u4ef6\u5143\u6570\u636e\u751f\u6210\u81ea\u5b9a\u4e49\u7684\u65e5\u5fd7\u683c\u5f0f\uff0c\u7528\u6237\u53ef\u4ee5\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u5c06 JSON \u683c\u5f0f\u7684\u8bf7\u6c42\u548c\u54cd\u5e94\u6570\u636e\u9644\u52a0\u5230\u65e5\u5fd7\u6587\u4ef6\u4e2d\uff0c\u4e5f\u53ef\u4ee5\u5c06 Log \u6570\u636e\u6d41\u63a8\u9001\u5230\u6307\u5b9a\u4f4d\u7f6e\u3002"),(0,l.kt)("p",null,"\u8bd5\u60f3\uff0c\u5728\u76d1\u63a7\u67d0\u4e00\u4e2a\u8def\u7531\u7684\u8bbf\u95ee\u65e5\u5fd7\u65f6\uff0c\u5f88\u591a\u65f6\u5019\u6211\u4eec\u5173\u6ce8\u7684\u4e0d\u4ec5\u662f\u67d0\u4e9b\u8bf7\u6c42\u548c\u54cd\u5e94\u6570\u636e\u7684\u503c\uff0c\u8fd8\u5e0c\u671b\u5c06\u65e5\u5fd7\u6570\u636e\u5355\u72ec\u5199\u5165\u5230\u6307\u5b9a\u7684\u6587\u4ef6\u4e2d\u3002\u8fd9\u65f6\u5c31\u53ef\u4ee5\u4f7f\u7528 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u6765\u5e2e\u5fd9\u5b9e\u73b0\u8fd9\u4e9b\u9700\u6c42\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1644996258131-a0e32942-dcc5-4129-873f-0a7551532e77.png",alt:"\u529f\u80fd\u4ecb\u7ecd"})),(0,l.kt)("p",null,"\u5177\u4f53\u5b9e\u73b0\u8fc7\u7a0b\u4e2d\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u5c06\u65e5\u5fd7\u6570\u636e\u5355\u72ec\u5199\u5165\u6307\u5b9a\u7684\u65e5\u5fd7\u6587\u4ef6\uff0c\u7b80\u5316\u76d1\u63a7\u548c\u8c03\u8bd5\u7684\u8fc7\u7a0b\u3002"),(0,l.kt)("h2",{id:"\u5f00\u53d1\u5b9e\u73b0\u8fc7\u7a0b"},"\u5f00\u53d1\u5b9e\u73b0\u8fc7\u7a0b"),(0,l.kt)("p",null,"\u4ecb\u7ecd\u5b8c ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u7684\u529f\u80fd\u4e4b\u540e\uff0c\u5927\u5bb6\u4e5f\u7b97\u5bf9\u8fd9\u4e2a\u63d2\u4ef6\u6709\u4e86\u66f4\u591a\u7684\u8ba4\u8bc6\u3002\u4e0b\u9762\u4e3a\u5927\u5bb6\u8be6\u7ec6\u8bb2\u89e3\u4e00\u4e0b\uff0c",(0,l.kt)("strong",{parentName:"p"},"\u6ca1\u6709\u670d\u52a1\u7aef\u7ecf\u9a8c"),"\u7684\u6211\u662f\u5982\u4f55\u4ece 0 \u5f00\u59cb\u4e3a Apache APISIX \u5b8c\u6210\u8be5\u63d2\u4ef6\u5e76\u6dfb\u52a0\u76f8\u5e94\u6d4b\u8bd5\u7684\u3002"),(0,l.kt)("h3",{id:"\u786e\u5b9a\u63d2\u4ef6\u540d\u79f0\u53ca\u4f18\u5148\u7ea7"},"\u786e\u5b9a\u63d2\u4ef6\u540d\u79f0\u53ca\u4f18\u5148\u7ea7"),(0,l.kt)("p",null,"\u6253\u5f00 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/apisix/plugin-develop/#%E6%8F%92%E4%BB%B6%E5%91%BD%E5%90%8D%EF%BC%8C%E4%BC%98%E5%85%88%E7%BA%A7%E5%92%8C%E5%85%B6%E4%BB%96"},"Apache APISIX \u63d2\u4ef6\u5f00\u53d1\u6307\u5357"),"\uff0c\u6309\u7167\u5148\u540e\u987a\u5e8f\u9700\u8981\u786e\u5b9a\u4ee5\u4e0b\u51e0\u9879\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u786e\u5b9a\u63d2\u4ef6\u5206\u7c7b\u3002"),(0,l.kt)("li",{parentName:"ol"},"\u786e\u5b9a\u63d2\u4ef6\u4f18\u5148\u7ea7\uff0c\u5e76\u66f4\u65b0 ",(0,l.kt)("inlineCode",{parentName:"li"},"conf/config-default.yaml")," \u6587\u4ef6\u3002")),(0,l.kt)("p",null,"\u56e0\u4e3a\u6b64\u6b21\u5f00\u53d1\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u5c5e\u4e8e\u65e5\u5fd7\u7c7b\u578b\u7684\u63d2\u4ef6\uff0c\u6240\u4ee5\u6211\u53c2\u8003\u4e86 Apache APISIX \u5df2\u6709\u7684\u65e5\u5fd7\u63d2\u4ef6\u7684\u540d\u79f0\u548c\u6392\u5e8f\uff0c\u5c06 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u653e\u5230\u4e86\u8fd9\u91cc\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1644996436166-58305d35-3798-4df2-b8df-1874f3e0cb01.png",alt:"\u786e\u8ba4 file-logger \u63d2\u4ef6\u540d\u79f0\u548c\u4f18\u5148\u7ea7"})),(0,l.kt)("p",null,"\u54a8\u8be2\u4e86\u5176\u4ed6\u63d2\u4ef6\u7684\u4f5c\u8005\u548c\u793e\u533a\u7684\u70ed\u5fc3\u6210\u5458\u4e4b\u540e\uff0c\u6700\u7ec8\u786e\u8ba4\u4e86\u8be5\u63d2\u4ef6\u7684\u540d\u79f0 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u548c\u4f18\u5148\u7ea7 ",(0,l.kt)("inlineCode",{parentName:"p"},"399"),"\u3002"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u9700\u8981\u6ce8\u610f\u7684\u662f\uff0c\u63d2\u4ef6\u7684\u4f18\u5148\u7ea7\u4e0e\u6267\u884c\u987a\u5e8f\u6709\u5173\uff0c\u4f18\u5148\u7ea7\u7684\u503c\u8d8a\u5927\uff0c\u6267\u884c\u8d8a\u9760\u524d\u3002\u800c\u63d2\u4ef6\u540d\u79f0\u7684\u6392\u5e8f\u4e0e\u6267\u884c\u987a\u5e8f\u65e0\u5173\u3002")),(0,l.kt)("h3",{id:"\u521b\u5efa\u6700\u5c0f\u53ef\u6267\u884c\u63d2\u4ef6\u6587\u4ef6"},"\u521b\u5efa\u6700\u5c0f\u53ef\u6267\u884c\u63d2\u4ef6\u6587\u4ef6"),(0,l.kt)("p",null,"\u786e\u8ba4\u597d\u63d2\u4ef6\u540d\u79f0\u548c\u4f18\u5148\u7ea7\u540e\uff0c\u4fbf\u53ef\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix/plugins/")," \u76ee\u5f55\u4e0b\u521b\u5efa\u6211\u4eec\u7684\u63d2\u4ef6\u4ee3\u7801\u6587\u4ef6\uff0c\u8fd9\u91cc\u6709\u4e24\u70b9\u9700\u8981\u6ce8\u610f\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c\u662f\u76f4\u63a5\u5728 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix/plugins/")," \u76ee\u5f55\u4e0b\u76f4\u63a5\u521b\u5efa\u63d2\u4ef6\u4ee3\u7801\u6587\u4ef6\uff0c\u5c31\u65e0\u9700\u66f4\u6539 ",(0,l.kt)("inlineCode",{parentName:"li"},"Makefile")," \u6587\u4ef6\u3002"),(0,l.kt)("li",{parentName:"ul"},"\u5982\u679c\u4f60\u7684\u63d2\u4ef6\u6709\u65b0\u5efa\u81ea\u5df1\u7684\u4ee3\u7801\u76ee\u5f55\uff0c\u90a3\u4e48\u5c31\u9700\u8981\u66f4\u65b0 ",(0,l.kt)("inlineCode",{parentName:"li"},"Makefile \u6587\u4ef6"),"\uff0c\u8be6\u7ec6\u6b65\u9aa4\u53ef\u53c2\u8003 ",(0,l.kt)("a",{parentName:"li",href:"https://apisix.apache.org/zh/docs/apisix/plugin-develop/#%E6%8F%92%E4%BB%B6%E5%91%BD%E5%90%8D%EF%BC%8C%E4%BC%98%E5%85%88%E7%BA%A7%E5%92%8C%E5%85%B6%E4%BB%96"},"Apache APISIX \u63d2\u4ef6\u5f00\u53d1\u6307\u5357"),"\u3002")),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u4e0b\u9762\u6211\u4eec\u5728 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix/plugins/")," \u76ee\u5f55\u4e0b\u521b\u5efa ",(0,l.kt)("inlineCode",{parentName:"li"},"file-logger.lua")," \u6587\u4ef6\u3002"),(0,l.kt)("li",{parentName:"ol"},"\u7136\u540e\u6839\u636e\u5b98\u65b9\u7ed9\u51fa\u7684 ",(0,l.kt)("inlineCode",{parentName:"li"},"example-plugin")," \u7684\u4f8b\u5b50\u505a\u53c2\u8003\uff0c\u6765\u5b8c\u6210\u4e00\u4e2a\u521d\u59cb\u5316\u7248\u672c\u3002")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-lua"},'-- \u5728\u5934\u90e8\u5f15\u5165\u6211\u4eec\u6240\u9700\u8981\u7684\u6a21\u5757\nlocal log_util     =   require("apisix.utils.log-util")\nlocal core         =   require("apisix.core")\nlocal plugin       =   require("apisix.plugin")\nlocal ngx          =   ngx\n\n-- \u58f0\u660e\u63d2\u4ef6\u540d\u79f0\nlocal plugin_name = "file-logger"\n\n-- \u5b9a\u4e49\u63d2\u4ef6 schema \u683c\u5f0f\nlocal schema = {\n    type = "object",\n    properties = {\n        path = {\n            type = "string"\n        },\n    },\n    required = {"path"}\n}\n\n-- \u63d2\u4ef6\u5143\u6570\u636e schema\nlocal metadata_schema = {\n    type = "object",\n    properties = {\n        log_format = log_util.metadata_schema_log_format\n    }\n}\n\n\nlocal _M = {\n    version = 0.1,\n    priority = 399,\n    name = plugin_name,\n    schema = schema,\n    metadata_schema = metadata_schema\n}\n\n-- \u68c0\u67e5\u63d2\u4ef6\u914d\u7f6e\u662f\u5426\u6b63\u786e\nfunction _M.check_schema(conf, schema_type)\n    if schema_type == core.schema.TYPE_METADATA then\n        return core.schema.check(metadata_schema, conf)\n    end\n    return core.schema.check(schema, conf)\nend\n\n-- \u65e5\u5fd7\u9636\u6bb5\nfunction _M.log(conf, ctx)\n    core.log.warn("conf: ", core.json.encode(conf))\n    core.log.warn("ctx: ", core.json.encode(ctx, true))\nend\n\n\nreturn _M\n')),(0,l.kt)("p",null,"\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"example-plugin")," \u7684\u4f8b\u5b50\u5b8c\u6210\u4e86\u4e00\u4e2a\u6700\u5c0f\u7684\u53ef\u7528\u63d2\u4ef6\u6587\u4ef6\u540e\uff0c\u4fbf\u53ef\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"core.log.warn(core.json.encode(conf))")," \u548c ",(0,l.kt)("inlineCode",{parentName:"p"},'core.log.warn("ctx: ", core.json.encode(ctx, true))')," \u5c06\u63d2\u4ef6\u7684\u914d\u7f6e\u6570\u636e\u548c\u8bf7\u6c42\u76f8\u5173\u7684\u6570\u636e\u4fe1\u606f\u8f93\u51fa\u5230 ",(0,l.kt)("inlineCode",{parentName:"p"},"error.log")," \u6587\u4ef6\u4e2d\u53bb\u3002"),(0,l.kt)("h3",{id:"\u542f\u7528\u63d2\u4ef6\u5e76\u6d4b\u8bd5"},"\u542f\u7528\u63d2\u4ef6\u5e76\u6d4b\u8bd5"),(0,l.kt)("p",null,"\u4e0b\u9762\u901a\u8fc7\u521b\u5efa\u4e00\u6761\u6d4b\u8bd5\u8def\u7531\uff0c\u6765\u6d4b\u8bd5\u63d2\u4ef6\u662f\u5426\u80fd\u6210\u529f\u5c06\u6211\u4eec\u4e3a\u5176\u914d\u7f6e\u7684\u63d2\u4ef6\u6570\u636e\u548c\u8bf7\u6c42\u76f8\u5173\u7684\u6570\u636e\u4fe1\u606f\uff0c\u6253\u5370\u5230\u9519\u8bef\u65e5\u5fd7\u6587\u4ef6\u4e2d\u53bb\u3002"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5728\u672c\u5730\u51c6\u5907\u4e00\u4e2a\u6d4b\u8bd5\u4e0a\u6e38\uff08\u672c\u6587\u4e2d\u4f7f\u7528\u7684\u6d4b\u8bd5\u4e0a\u6e38\u662f\u6211\u5728\u672c\u5730\u521b\u5efa\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"127.0.0.1:3030/api/hello"),"\uff09\u3002")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"curl")," \u547d\u4ee4\u521b\u5efa\u4e00\u6761\u8def\u7531\u5e76\u542f\u7528\u6211\u4eec\u65b0\u589e\u7684\u63d2\u4ef6\u3002"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},' curl http://127.0.0.1:9080/apisix/admin/routes/1 -H \'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1\' -X PUT -d \'\n {\n "plugins": {\n     "file-logger": {\n     "path": "logs/file.log"\n     }\n },\n "upstream": {\n     "type": "roundrobin",\n     "nodes": {\n     "127.0.0.1:3030": 1\n     }\n },\n "uri": "/api/hello"\n }\'\n')),(0,l.kt)("p",{parentName:"li"},"\u63a5\u7740\u5c31\u4f1a\u770b\u5230\u4e00\u4e2a ",(0,l.kt)("inlineCode",{parentName:"p"},"200")," \u7684\u72b6\u6001\u7801\uff0c\u8868\u660e\u5df2\u6210\u529f\u521b\u5efa\u4e86\u8def\u7531\u3002")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u8fd0\u884c ",(0,l.kt)("inlineCode",{parentName:"p"},"curl")," \u547d\u4ee4\u5411\u8be5\u8def\u7531\u53d1\u9001\u8bf7\u6c42\uff0c\u6d4b\u8bd5 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u662f\u5426\u5df2\u7ecf\u542f\u52a8\u3002"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/api/hello\nHTTP/1.1 200 OK\n...\nhello, world\n"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"logs/error.log")," \u6587\u4ef6\u4e2d\u4f1a\u6709\u4e00\u6761\u8fd9\u6837\u7684\u8bb0\u5f55\uff1a"),(0,l.kt)("p",{parentName:"li"},(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1644996952020-7a79d5df-e679-42f1-94f3-40a913db790c.png",alt:"logs/error.log \u8bb0\u5f55"})),(0,l.kt)("p",{parentName:"li"},"\u53ef\u4ee5\u770b\u5230\uff0c \u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf")," \u53c2\u6570\u4e2d\u6211\u4eec\u4e3a\u63d2\u4ef6\u914d\u7f6e\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"path: logs/file.log")," \u5df2\u7ecf\u6210\u529f\u5730\u4fdd\u5b58\u4e86\u3002\u5230\u6b64\u6211\u4eec\u5df2\u7ecf\u6210\u529f\u521b\u5efa\u4e86\u4e00\u4e2a\u6700\u5c0f\u53ef\u7528\u7684\u63d2\u4ef6\uff0c\u5728\u65e5\u5fd7\u9636\u6bb5\u6253\u5370\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"conf")," \u548c ",(0,l.kt)("inlineCode",{parentName:"p"},"ctx")," \u53c2\u6570\u7684\u6570\u636e\u3002"),(0,l.kt)("p",{parentName:"li"},"\u4e4b\u540e\uff0c\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u5728\u8be5 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger.lua")," \u63d2\u4ef6\u4ee3\u7801\u6587\u4ef6\u4e2d\uff0c\u4e3a\u5b83\u7f16\u5199\u6838\u5fc3\u529f\u80fd\u3002\u8fd9\u91cc\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u8fd0\u884c ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix reload")," \u547d\u4ee4\u6765\u91cd\u65b0\u52a0\u8f7d\u6700\u65b0\u7684\u63d2\u4ef6\u4ee3\u7801\uff0c\u800c\u65e0\u9700\u91cd\u542f Apache APISIX\u3002"))),(0,l.kt)("h3",{id:"\u4e3a-file-logger-\u63d2\u4ef6\u7f16\u5199\u6838\u5fc3\u529f\u80fd"},"\u4e3a file-logger \u63d2\u4ef6\u7f16\u5199\u6838\u5fc3\u529f\u80fd"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u7684\u4e3b\u8981\u529f\u80fd\u662f\u5199\u65e5\u5fd7\u6570\u636e\u3002\u5728\u7ecf\u8fc7\u8be2\u95ee\u548c\u67e5\u9605\u8d44\u6599\u540e\uff0c\u6211\u4e86\u89e3\u5230 ",(0,l.kt)("a",{parentName:"p",href:"https://www.tutorialspoint.com/lua/lua_file_io.htm"},"Lua \u7684 IO \u5e93"),"\uff0c\u4e8e\u662f\u786e\u8ba4\u4e86\u8be5\u63d2\u4ef6\u7684\u529f\u80fd\u903b\u8f91\u5927\u81f4\u4e3a\u4ee5\u4e0b\u51e0\u6b65\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u6bcf\u6b21\u63a5\u53d7\u8bf7\u6c42\u4e4b\u540e\uff0c\u5c06\u65e5\u5fd7\u6570\u636e\u8f93\u51fa\u5230\u63d2\u4ef6\u914d\u7f6e\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"path")," \u4e2d\u53bb\u3002"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"\u9996\u5148\uff0c\u5728\u65e5\u5fd7\u9636\u6bb5\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"li"},"conf")," \u62ff\u5230 ",(0,l.kt)("inlineCode",{parentName:"li"},"file-logger")," \u4e2d ",(0,l.kt)("inlineCode",{parentName:"li"},"path")," \u7684\u503c\u3002"),(0,l.kt)("li",{parentName:"ol"},"\u7136\u540e\uff0c\u901a\u8fc7 Lua IO \u5e93\u6765\u5b8c\u6210\u6587\u4ef6\u300c\u521b\u5efa\u300d\u3001\u300c\u6253\u5f00\u300d\u3001\u300c\u5199\u300d\u3001\u300c\u5237\u65b0\u7f13\u5b58\u300d\u3001\u300c\u5173\u95ed\u300d\u7684\u64cd\u4f5c\u3002"))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5904\u7406\u300c\u6587\u4ef6\u6253\u5f00\u300d\u5931\u8d25\u3001\u300c\u6587\u4ef6\u521b\u5efa\u300d\u5931\u8d25\u7b49\u9519\u8bef\u3002"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-lua"},' local function write_file_data(conf, log_message)\n     local msg, err = core.json.encode(log_message)\n     if err then\n         return core.log.error("message json serialization failed, error info : ", err)\n     end\n\n     local file, err = io_open(conf.path, \'a+\')\n\n     if not file then\n         core.log.error("failed to open file: ", conf.path, ", error info: ", err)\n     else\n         local ok, err = file:write(msg, \'\\n\')\n         if not ok then\n             core.log.error("failed to write file: ", conf.path, ", error info: ", err)\n         else\n             file:flush()\n         end\n         file:close()\n     end\n end\n'))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u53c2\u8003 ",(0,l.kt)("inlineCode",{parentName:"p"},"http-logger")," \u63d2\u4ef6\u6e90\u7801\uff0c\u5b8c\u6210\u4e86\u5c06\u65e5\u8bb0\u6570\u636e\u4f20\u7ed9\u5199\u65e5\u5fd7\u6570\u636e\u7684\u65b9\u6cd5\u548c metadata \u7684\u4e00\u4e9b\u5224\u65ad\u548c\u5904\u7406\u3002"),(0,l.kt)("pre",{parentName:"li"},(0,l.kt)("code",{parentName:"pre",className:"language-lua"}," function _M.log(conf, ctx)\n     local metadata = plugin.plugin_metadata(plugin_name)\n     local entry\n\n     if metadata and metadata.value.log_format\n         and core.table.nkeys(metadata.value.log_format) > 0\n     then\n         entry = log_util.get_custom_format_log(ctx, metadata.value.log_format)\n     else\n         entry = log_util.get_full_log(ngx, conf)\n     end\n\n     write_file_data(conf, entry)\n end\n")))),(0,l.kt)("h2",{id:"\u9a8c\u8bc1\u53ca\u6dfb\u52a0\u6d4b\u8bd5"},"\u9a8c\u8bc1\u53ca\u6dfb\u52a0\u6d4b\u8bd5"),(0,l.kt)("h3",{id:"\u9a8c\u8bc1\u6536\u96c6\u65e5\u5fd7\u8bb0\u5f55"},"\u9a8c\u8bc1\u6536\u96c6\u65e5\u5fd7\u8bb0\u5f55"),(0,l.kt)("p",null,"\u56e0\u4e3a\u5728\u521b\u5efa\u6d4b\u8bd5\u8def\u7531\u65f6\u5df2\u7ecf\u542f\u7528\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\uff0c\u5e76\u4e14\u914d\u7f6e\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"path")," \u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"logs/file.log"),"\uff0c\u6240\u4ee5\u6b64\u65f6\u6211\u4eec\u53ea\u9700\u7ed9\u6d4b\u8bd5\u8def\u7531\u53d1\u9001\u8bf7\u6c42\uff0c\u4ee5\u9a8c\u8bc1\u65e5\u5fd7\u6536\u96c6\u7684\u7ed3\u679c\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i http://127.0.0.1:9080/api/hello\n")),(0,l.kt)("p",null,"\u5728\u5bf9\u5e94\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"logs/file.log")," \u4e2d\u6211\u4eec\u53ef\u4ee5\u770b\u5230\u6bcf\u6761\u8bb0\u5f55\u90fd\u662f\u4ee5 JSON \u7684\u683c\u5f0f\u4fdd\u5b58\u4e0b\u6765\u3002\u5c06\u5176\u4e2d\u4e00\u6761\u6570\u636e\u683c\u5f0f\u5316\u4e4b\u540e\u5982\u4e0b\u6240\u793a\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "server":{\n        "hostname":"....",\n        "version":"2.11.0"\n    },\n    "client_ip":"127.0.0.1",\n    "upstream":"127.0.0.1:3030",\n    "route_id":"1",\n    "start_time":1641285122961,\n    "latency":13.999938964844,\n    "response":{\n        "status":200,\n        "size":252,\n        "headers":{\n            "server":"APISIX\\/2.11.0",\n            "content-type":"application\\/json; charset=utf-8",\n            "date":"Tue, 04 Jan 2022 08:32:02 GMT",\n            "vary":"Accept-Encoding",\n            "content-length":"19",\n            "connection":"close",\n            "etag":"\\"13-5j0ZZR0tI549fSRsYxl8c9vAU78\\""\n        }\n    },\n    "service_id":"",\n    "request":{\n        "querystring":{\n\n        },\n        "size":87,\n        "method":"GET",\n        "headers":{\n            "host":"127.0.0.1:9080",\n            "accept":"*\\/*",\n            "user-agent":"curl\\/7.77.0"\n        },\n        "url":"http:\\/\\/127.0.0.1:9080\\/api\\/hello",\n        "uri":"\\/api\\/hello"\n    }\n}\n')),(0,l.kt)("p",null,"\u81f3\u6b64\u9a8c\u8bc1\u6536\u96c6\u65e5\u5fd7\u8bb0\u5f55\u7684\u73af\u8282\u7ed3\u675f\u4e86\uff0c\u9a8c\u8bc1\u7ed3\u679c\u8bf4\u660e\u63d2\u4ef6\u6210\u529f\u542f\u52a8\u5e76\u8fd4\u56de\u4e86\u5e94\u6709\u7684\u6570\u636e\u3002"),(0,l.kt)("h3",{id:"\u4e3a\u63d2\u4ef6\u6dfb\u52a0\u6d4b\u8bd5"},"\u4e3a\u63d2\u4ef6\u6dfb\u52a0\u6d4b\u8bd5"),(0,l.kt)("p",null,"\u5bf9\u4e8e ",(0,l.kt)("inlineCode",{parentName:"p"},"add_block_preprocessor")," \u90e8\u5206\u7684\u4ee3\u7801\uff0c\u7531\u4e8e\u6211\u6ca1\u6709\u5b66\u8fc7 Perl \uff0c\u6240\u4ee5\u5728\u521a\u5f00\u59cb\u7f16\u5199\u65f6\u6bd4\u8f83\u56f0\u60d1\u3002\u5728\u8be2\u95ee\u4e4b\u540e\u624d\u4e86\u89e3\u5230\u5b83\u7684\u6b63\u786e\u4f7f\u7528\u65b9\u5f0f\uff1a\u5982\u679c\u6211\u4eec\u5728\u6570\u636e\u90e8\u5206\u6ca1\u6709\u7f16\u5199\u76f8\u5173\u7684 ",(0,l.kt)("inlineCode",{parentName:"p"},"request")," \u65ad\u8a00\u548c ",(0,l.kt)("inlineCode",{parentName:"p"},"no_error_log")," \u65ad\u8a00\u65f6\uff0c\u90a3\u4e48\u9ed8\u8ba4\u65ad\u8a00\u5982\u4e0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-lua"},"--- request\nGET /t\n--- no_error_log\n[error]\n")),(0,l.kt)("p",null,"\u7efc\u5408\u53c2\u8003\u4e86\u4e00\u4e9b\u5176\u4ed6\u7684\u65e5\u5fd7\u6d4b\u8bd5\u6587\u4ef6\u4ee5\u540e\uff0c\u6211\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"t/plugin/")," \u76ee\u5f55\u4e0b\u521b\u5efa ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger.t")," \u6587\u4ef6\u3002"),(0,l.kt)("p",null,"\u6bcf\u4e00\u4efd\u6d4b\u8bd5\u6587\u4ef6\u90fd\u7531 ",(0,l.kt)("inlineCode",{parentName:"p"},"__DATA__")," \u5206\u4e3a\u5e8f\u8a00\u90e8\u5206\u548c\u6570\u636e\u90e8\u5206\u3002\u7531\u4e8e\u76ee\u524d\u5b98\u7f51\u6d4b\u8bd5\u76f8\u5173\u6587\u6863\u6ca1\u6709\u660e\u786e\u5f52\u6863\u5206\u7c7b\uff0c\u66f4\u591a\u5177\u4f53\u5185\u5bb9\u53ef\u53c2\u8003\u6587\u672b\u7684\u76f8\u5173\u8d44\u6599\u3002\u4e0b\u9762\u6211\u4e3a\u5927\u5bb6\u5217\u51fa\u53c2\u8003\u76f8\u5173\u8d44\u6599\u540e\u5b8c\u6210\u7684\u5176\u4e2d\u4e00\u4e2a\u6d4b\u8bd5\u7528\u4f8b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-perl"},'use t::APISIX \'no_plan\';\n\nno_long_string();\nno_root_location();\n\nadd_block_preprocessor(sub {\n    my ($block) = @_;\n\n    if (! $block->request) {\n        $block->set_value("request", "GET /t");\n    }\n\n    if (! $block->no_error_log && ! $block->error_log) {\n        $block->set_value("no_error_log", "[error]");\n    }\n});\n\n\nrun_tests;\n\n__DATA__\n\n=== TEST 1: sanity\n--- config\n    location /t {\n        content_by_lua_block {\n            local configs = {\n                -- full configuration\n                {\n                    path = "file.log"\n                },\n                -- property "path" is required\n                {\n                    path = nil\n                }\n            }\n\n            local plugin = require("apisix.plugins.file-logger")\n\n            for i = 1, #configs do\n                ok, err = plugin.check_schema(configs[i])\n                if err then\n                    ngx.say(err)\n                else\n                    ngx.say("done")\n                end\n            end\n        }\n    }\n--- response_body_like\ndone\nproperty "path" is required\n')),(0,l.kt)("p",null,"\u81f3\u6b64\u63d2\u4ef6\u6dfb\u52a0\u6d4b\u8bd5\u73af\u8282\u7ed3\u675f\u3002"),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u4ee5\u4e0a\u5c31\u662f\u6211\u4f5c\u4e3a\u4e00\u4e2a\u540e\u7aef\u65b0\u624b\uff0c\u4ece 0 \u5f00\u59cb\u5b9e\u73b0\u4e00\u6b3e Apache APISIX \u63d2\u4ef6\u7684\u5168\u8fc7\u7a0b\u3002\u5728\u5f00\u53d1\u63d2\u4ef6\u7684\u8fc7\u7a0b\u4e2d\u786e\u5b9e\u78b0\u5230\u4e86\u5f88\u591a\u5751\uff0c\u6bd4\u8f83\u5e78\u8fd0\u7684\u662f Apache APISIX \u793e\u533a\u91cc\u9762\u6709\u5f88\u591a\u70ed\u5fc3\u7684\u5927\u4f6c\u5e2e\u6211\u89e3\u60d1\uff0c\u4f7f\u5f97 ",(0,l.kt)("inlineCode",{parentName:"p"},"file-logger")," \u63d2\u4ef6\u7684\u5f00\u53d1\u548c\u6d4b\u8bd5\u5168\u7a0b\u90fd\u6bd4\u8f83\u987a\u7545\u3002\u5982\u679c\u4f60\u5bf9\u8fd9\u4e2a\u63d2\u4ef6\u611f\u5174\u8da3\uff0c\u6216\u60f3\u8981\u67e5\u770b\u63d2\u4ef6\u8be6\u60c5\uff0c\u53ef\u4ee5\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/zh/docs/apisix/next/plugins/file-logger/"},"Apache APISIX \u5b98\u65b9\u6587\u6863"),"\u3002"),(0,l.kt)("p",null,"\u76ee\u524d\uff0cApache APISIX \u4e5f\u5728\u5f00\u53d1\u5176\u4ed6\u63d2\u4ef6\u4ee5\u652f\u6301\u96c6\u6210\u66f4\u591a\u670d\u52a1\uff0c\u5982\u679c\u60a8\u5bf9\u6b64\u611f\u5174\u8da3\uff0c\u6b22\u8fce\u968f\u65f6\u5728 ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/discussions"},"GitHub Discussion")," \u4e2d\u53d1\u8d77\u8ba8\u8bba\uff0c\u4e5f\u53ef\u901a\u8fc7",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/general/join"},"\u90ae\u4ef6\u5217\u8868"),"\u8fdb\u884c\u4ea4\u6d41\u8ba8\u8bba\u3002"),(0,l.kt)("h2",{id:"\u53c2\u8003\u8d44\u6599"},"\u53c2\u8003\u8d44\u6599"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://apisix.apache.org/zh/docs/apisix/plugin-develop/"},"Apache APISIX \u63d2\u4ef6\u5f00\u53d1\u6307\u5357")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.tutorialspoint.com/lua/lua_file_io.htm"},"Lua - File I/O \u4f7f\u7528\u6307\u5357")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://apisix.apache.org/zh/docs/apisix/how-to-build/#%E6%AD%A5%E9%AA%A44%EF%BC%9A%E8%BF%90%E8%A1%8C%E6%B5%8B%E8%AF%95%E6%A1%88%E4%BE%8B"},"\u5982\u4f55\u8fd0\u884c Apache APISIX \u6d4b\u8bd5\u6848\u4f8b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://apisix.apache.org/zh/docs/apisix/plugin-develop/#%E7%BC%96%E5%86%99%E6%B5%8B%E8%AF%95%E7%94%A8%E4%BE%8B"},"\u5982\u4f55\u7f16\u5199\u6d4b\u8bd5\u7528\u4f8b")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://apisix.apache.org/zh/docs/apisix/internal/testing-framework/"},"Apache APISIX \u6d4b\u8bd5\u6846\u67b6\u4ecb\u7ecd")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://metacpan.org/pod/Test%3A%3ANginx%3A%3ASocket"},"test-nginx \u76f8\u5173\u7684\u4e00\u4e9b API \u4ecb\u7ecd"))))}u.isMDXComponent=!0}}]);