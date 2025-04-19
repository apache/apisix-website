"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[37228],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>u});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),m=s(r),u=a,v=m["".concat(c,".").concat(u)]||m[u]||d[u]||o;return r?n.createElement(v,i(i({ref:t},l),{},{components:r})):n.createElement(v,i({ref:t},l))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7207:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>l,frontMatter:()=>o,metadata:()=>p,toc:()=>c});var n=r(87462),a=(r(67294),r(3905));const o={title:"\u63a7\u5236\u9762\u670d\u52a1\u53d1\u73b0",keywords:["API \u7f51\u5173","APISIX","ZooKeeper","Nacos","APISIX-Seed"],description:"\u672c\u6587\u6863\u4ecb\u7ecd\u4e86\u5982\u4f55\u5728 API \u7f51\u5173 Apache APISIX \u63a7\u5236\u9762\u901a\u8fc7 Nacos \u548c Zookeeper \u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\u3002"},i=void 0,p={unversionedId:"discovery/control-plane-service-discovery",id:"version-3.9/discovery/control-plane-service-discovery",isDocsHomePage:!1,title:"\u63a7\u5236\u9762\u670d\u52a1\u53d1\u73b0",description:"\u672c\u6587\u6863\u4ecb\u7ecd\u4e86\u5982\u4f55\u5728 API \u7f51\u5173 Apache APISIX \u63a7\u5236\u9762\u901a\u8fc7 Nacos \u548c Zookeeper \u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.9/discovery/control-plane-service-discovery.md",sourceDirName:"discovery",slug:"/discovery/control-plane-service-discovery",permalink:"/zh/docs/apisix/3.9/discovery/control-plane-service-discovery",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.9/docs/zh/latest/discovery/control-plane-service-discovery.md",tags:[],version:"3.9",frontMatter:{title:"\u63a7\u5236\u9762\u670d\u52a1\u53d1\u73b0",keywords:["API \u7f51\u5173","APISIX","ZooKeeper","Nacos","APISIX-Seed"],description:"\u672c\u6587\u6863\u4ecb\u7ecd\u4e86\u5982\u4f55\u5728 API \u7f51\u5173 Apache APISIX \u63a7\u5236\u9762\u901a\u8fc7 Nacos \u548c Zookeeper \u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\u3002"},sidebar:"version-3.9/docs",previous:{title:"eureka",permalink:"/zh/docs/apisix/3.9/discovery/eureka"},next:{title:"Kubernetes",permalink:"/zh/docs/apisix/3.9/discovery/kubernetes"}},c=[{value:"APISIX-Seed \u67b6\u6784",id:"apisix-seed-\u67b6\u6784",children:[]},{value:"\u4e3a\u4ec0\u4e48\u9700\u8981 APISIX-Seed\uff1f",id:"\u4e3a\u4ec0\u4e48\u9700\u8981-apisix-seed",children:[]},{value:"\u652f\u6301\u7684\u670d\u52a1\u53d1\u73b0\u7c7b\u578b",id:"\u652f\u6301\u7684\u670d\u52a1\u53d1\u73b0\u7c7b\u578b",children:[]}],s={toc:c};function l(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u672c\u6587\u6863\u4ecb\u7ecd\u4e86\u5982\u4f55\u5728 APISIX \u63a7\u5236\u9762\u901a\u8fc7 Nacos \u548c Zookeeper \u5b9e\u73b0\u670d\u52a1\u53d1\u73b0\u3002"),(0,a.kt)("h2",{id:"apisix-seed-\u67b6\u6784"},"APISIX-Seed \u67b6\u6784"),(0,a.kt)("p",null,"Apache APISIX \u5728\u65e9\u671f\u5df2\u7ecf\u652f\u6301\u4e86\u6570\u636e\u9762\u670d\u52a1\u53d1\u73b0\uff0c\u73b0\u5728 APISIX \u4e5f\u901a\u8fc7 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-seed"},"APISIX-Seed")," \u9879\u76ee\u5b9e\u73b0\u4e86\u63a7\u5236\u9762\u670d\u52a1\u53d1\u73b0\uff0c\u4e0b\u56fe\u4e3a APISIX-Seed \u67b6\u6784\u56fe\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix/release/3.9/docs/assets/images/control-plane-service-discovery.png",alt:"control-plane-service-discovery"})),(0,a.kt)("p",null,"\u56fe\u4e2d\u7684\u6570\u5b57\u4ee3\u8868\u7684\u5177\u4f53\u4fe1\u606f\u5982\u4e0b\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u901a\u8fc7 Admin API \u5411 APISIX \u6ce8\u518c\u4e0a\u6e38\u5e76\u6307\u5b9a\u670d\u52a1\u53d1\u73b0\u7c7b\u578b\u3002APISIX-Seed \u5c06\u76d1\u542c etcd \u4e2d\u7684 APISIX \u8d44\u6e90\u53d8\u5316\uff0c\u8fc7\u6ee4\u670d\u52a1\u53d1\u73b0\u7c7b\u578b\u5e76\u83b7\u53d6\u670d\u52a1\u540d\u79f0\uff08\u5982 ZooKeeper\uff09\uff1b"),(0,a.kt)("li",{parentName:"ol"},"APISIX-Seed \u5c06\u5728\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3\uff08\u5982 ZooKeeper\uff09\u8ba2\u9605\u6307\u5b9a\u7684\u670d\u52a1\u540d\u79f0\uff0c\u4ee5\u76d1\u63a7\u548c\u66f4\u65b0\u5bf9\u5e94\u7684\u670d\u52a1\u4fe1\u606f\uff1b"),(0,a.kt)("li",{parentName:"ol"},"\u5ba2\u6237\u7aef\u5411\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3\u6ce8\u518c\u670d\u52a1\u540e\uff0cAPISIX-Seed \u4f1a\u83b7\u53d6\u65b0\u7684\u670d\u52a1\u4fe1\u606f\uff0c\u5e76\u5c06\u66f4\u65b0\u540e\u7684\u670d\u52a1\u8282\u70b9\u5199\u5165 etcd\uff1b"),(0,a.kt)("li",{parentName:"ol"},"\u5f53 APISIX-Seed \u5728 etcd \u4e2d\u66f4\u65b0\u76f8\u5e94\u7684\u670d\u52a1\u8282\u70b9\u4fe1\u606f\u65f6\uff0cAPISIX \u4f1a\u5c06\u6700\u65b0\u7684\u670d\u52a1\u8282\u70b9\u4fe1\u606f\u540c\u6b65\u5230\u5185\u5b58\u4e2d\u3002")),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"\u5f15\u5165 APISIX-Seed \u540e\uff0c\u5982\u679c\u6ce8\u518c\u4e2d\u5fc3\u7684\u670d\u52a1\u53d8\u5316\u9891\u7e41\uff0cetcd \u4e2d\u7684\u6570\u636e\u4e5f\u4f1a\u9891\u7e41\u53d8\u5316\u3002\u56e0\u6b64\uff0c\u9700\u8981\u5728\u542f\u52a8 etcd \u65f6\u8bbe\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"--auto-compaction")," \u9009\u9879\uff0c\u7528\u6765\u5b9a\u671f\u538b\u7f29\u5386\u53f2\u8bb0\u5f55\uff0c\u907f\u514d\u8017\u5c3d etcd \u5b58\u50a8\u7a7a\u95f4\u3002\u8be6\u7ec6\u4fe1\u606f\u8bf7\u53c2\u8003 ",(0,a.kt)("a",{parentName:"p",href:"https://etcd.io/docs/v3.5/learning/api/#revisions"},"revisions"),"\u3002"))),(0,a.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u9700\u8981-apisix-seed"},"\u4e3a\u4ec0\u4e48\u9700\u8981 APISIX-Seed\uff1f"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u7f51\u7edc\u62d3\u6251\u53d8\u5f97\u66f4\u7b80\u5355"),(0,a.kt)("p",{parentName:"li"},"APISIX \u4e0d\u9700\u8981\u4e0e\u6bcf\u4e2a\u6ce8\u518c\u4e2d\u5fc3\u4fdd\u6301\u7f51\u7edc\u8fde\u63a5\uff0c\u53ea\u9700\u8981\u5173\u6ce8 etcd \u4e2d\u7684\u914d\u7f6e\u4fe1\u606f\u5373\u53ef\u3002\u8fd9\u5c06\u5927\u5927\u7b80\u5316\u7f51\u7edc\u62d3\u6251\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u4e0a\u6e38\u670d\u52a1\u603b\u6570\u636e\u91cf\u53d8\u5c0f"),(0,a.kt)("p",{parentName:"li"},"\u7531\u4e8e ",(0,a.kt)("inlineCode",{parentName:"p"},"registry")," \u7684\u7279\u6027\uff0cAPISIX \u53ef\u80fd\u4f1a\u5728 Worker \u4e2d\u5b58\u50a8\u5168\u91cf\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"registry")," \u670d\u52a1\u6570\u636e\uff0c\u4f8b\u5982 Consul_KV\u3002\u901a\u8fc7\u5f15\u5165 APISIX-Seed\uff0cAPISIX \u7684\u6bcf\u4e2a\u8fdb\u7a0b\u5c06\u4e0d\u9700\u8981\u989d\u5916\u7f13\u5b58\u4e0a\u6e38\u670d\u52a1\u76f8\u5173\u4fe1\u606f\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u66f4\u5bb9\u6613\u7ba1\u7406"),(0,a.kt)("p",{parentName:"li"},"\u670d\u52a1\u53d1\u73b0\u914d\u7f6e\u9700\u8981\u4e3a\u6bcf\u4e2a APISIX \u5b9e\u4f8b\u914d\u7f6e\u4e00\u6b21\u3002\u901a\u8fc7\u5f15\u5165 APISIX-Seed\uff0cAPISIX \u5c06\u5bf9\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3\u7684\u914d\u7f6e\u53d8\u5316\u65e0\u611f\u77e5\u3002"))),(0,a.kt)("h2",{id:"\u652f\u6301\u7684\u670d\u52a1\u53d1\u73b0\u7c7b\u578b"},"\u652f\u6301\u7684\u670d\u52a1\u53d1\u73b0\u7c7b\u578b"),(0,a.kt)("p",null,"\u76ee\u524d\u5df2\u7ecf\u652f\u6301\u4e86 ZooKeeper \u548c Nacos\uff0c\u540e\u7eed\u8fd8\u5c06\u652f\u6301\u66f4\u591a\u7684\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3\uff0c\u66f4\u591a\u4fe1\u606f\u8bf7\u53c2\u8003\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-seed#apisix-seed-for-apache-apisix"},"APISIX Seed"),"\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5982\u679c\u4f60\u60f3\u542f\u7528\u63a7\u5236\u9762 ZooKeeper \u670d\u52a1\u53d1\u73b0\uff0c\u8bf7\u53c2\u8003\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-seed/blob/main/docs/zh/latest/zookeeper.md"},"ZooKeeper \u90e8\u7f72\u6559\u7a0b"),"\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5982\u679c\u4f60\u60f3\u542f\u7528\u63a7\u5236\u9762 Nacos \u670d\u52a1\u53d1\u73b0\uff0c\u8bf7\u53c2\u8003\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-seed/blob/main/docs/zh/latest/nacos.md"},"Nacos \u90e8\u7f72\u6559\u7a0b"),"\u3002"))))}l.isMDXComponent=!0}}]);