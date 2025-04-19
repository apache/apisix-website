"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[68587],{35318:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>h});var o=r(27378);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=o.createContext({}),s=function(e){var t=o.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return o.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=s(r),h=n,y=m["".concat(p,".").concat(h)]||m[h]||u[h]||a;return r?o.createElement(y,i(i({ref:t},l),{},{components:r})):o.createElement(y,i({ref:t},l))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},979:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var o=r(25773),n=(r(27378),r(35318));const a={title:"Biweekly Report (May 08 - May 22)",keywords:["Apache APISIX","API Gateway","Weekly Report","Contributor"],description:"The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.",tags:["Community"],image:"https://static.apiseven.com/uploads/2023/05/21/Y0065svK_%E7%A4%BE%E5%8C%BA%E5%8F%8C%E5%91%A8%E6%8A%A5-%E5%85%AC%E4%BC%97%E5%8F%B7%E5%A4%B4%E5%9B%BE-%E8%8B%B1%E6%96%87.png"},i=void 0,c={permalink:"/blog/2023/05/24/weekly-report-0524",source:"@site/blog/2023/05/24/weekly-report-0524.md",title:"Biweekly Report (May 08 - May 22)",description:"The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.",date:"2023-05-24T00:00:00.000Z",formattedDate:"May 24, 2023",tags:[{label:"Community",permalink:"/blog/tags/community"}],readingTime:1.2,truncated:!0,authors:[],prevItem:{title:"Release Apache APISIX 3.2.1",permalink:"/blog/2023/06/01/release-apache-apisix-3.2.1"},nextItem:{title:"Why Do Microservices Need an API Gateway",permalink:"/blog/2023/05/19/why-do-microservices-need-an-api-gateway"}},p={authorsImageUrls:[]},s=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Contributor Statistics",id:"contributor-statistics",children:[],level:2},{value:"Highlights of Recent Features",id:"highlights-of-recent-features",children:[{value:"Apache APISIX",id:"apache-apisix",children:[],level:3},{value:"Apache APISIX Ingress Controller",id:"apache-apisix-ingress-controller",children:[],level:3}],level:2}],l={toc:s};function u(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"From 5.08 to 5.22, 24 contributors submitted 44 commits for Apache APISIX. Thank you for your contributions to Apache APISIX.")),(0,n.kt)("h2",{id:"introduction"},"Introduction"),(0,n.kt)("p",null,"Apache APISIX grew up as a community from the first day it was open-sourced, and quickly became the most active open-source API gateway project in the world. These achievements are inseparable from the joint efforts of community partners."),(0,n.kt)("p",null,'"If you want to go fast, go alone. If you want to go far, go together." The Apache APISIX Community Biweekly Report can help community members better grasp the progress of the Apache APISIX community so that everyone can participate in the Apache APISIX community.'),(0,n.kt)("p",null,"We have also sorted out some issues for newcomers to the community to participate in! If you are interested, don't miss it!"),(0,n.kt)("h2",{id:"contributor-statistics"},"Contributor Statistics"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/07/21/KnJsEu03_0508-0522.png",alt:"Apache APISIX Contributors List"})),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/05/26/nrrzBEPe_Untitled%20%281%29.png",alt:"Apache APISIX New Contributors"})),(0,n.kt)("h2",{id:"highlights-of-recent-features"},"Highlights of Recent Features"),(0,n.kt)("h3",{id:"apache-apisix"},"Apache APISIX"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/9388"},"Proxy-mirror plugin provides support for grpc and grpcs traffic proxying")," (contributor: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/Sn0rt"},"Sn0rt"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/pull/9420"},"Reuse etcd connections to improve etcd read-write throughput"),"(contributor: ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/kingluo"},"kingluo"),")"))),(0,n.kt)("h3",{id:"apache-apisix-ingress-controller"},"Apache APISIX Ingress Controller"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller/pull/1817"},"Apache APISIX Ingress Controller project removes support for custom resources in version v2beta3")," (contributor: ",(0,n.kt)("a",{parentName:"li",href:"https://github.com/tao12345666333"},"tao12345666333"),")")),(0,n.kt)("p",null,"A wealth of documentation tutorials and experience has been accumulated on the Apache APISIX official website and GitHub. If you encounter problems, you can look into the documentation, search keywords in the issues, or participate in the discussion on the issues, proposing your own ideas and practical experience."))}u.isMDXComponent=!0}}]);