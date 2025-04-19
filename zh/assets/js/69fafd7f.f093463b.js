"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4929],{35318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(27378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),o=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=o(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),m=o(n),g=a,k=m["".concat(s,".").concat(g)]||m[g]||u[g]||l;return n?r.createElement(k,i(i({ref:t},c),{},{components:n})):r.createElement(k,i({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=m;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var o=2;o<l;o++)i[o]=n[o];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},13926:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>p,toc:()=>o});var r=n(25773),a=(n(27378),n(35318));const l={title:"APISIX Ingress Controller\uff1a\u4e00\u79cd\u65e0\u9700 etcd \u7684\u8f7b\u91cf\u7ea7\u90e8\u7f72\u65b9\u5f0f",authors:[{name:"\u5bb9\u946b",title:"Author",url:"https://github.com/AlinsRan",image_url:"https://github.com/AlinsRan.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://avatars.githubusercontent.com/u/114121331?v=4"}],keywords:["Apache APISIX","APISIX Ingress Controller","etcd"],description:"APISIX Ingress Controller \u521b\u65b0\u67b6\u6784\uff0c\u6446\u8131\u5bf9 etcd \u96c6\u7fa4\u7684\u4f9d\u8d56\uff0c\u6781\u5927\u7b80\u5316\u7ef4\u62a4\u6210\u672c\u548c\u7cfb\u7edf\u590d\u6742\u6027\u3002",tags:["Community"],image:"https://static.apiseven.com/2022/10/19/634f6677742a1.png"},i=void 0,p={permalink:"/zh/blog/2023/10/18/ingress-apisix",source:"@site/blog/2023/10/18/ingress-apisix.md",title:"APISIX Ingress Controller\uff1a\u4e00\u79cd\u65e0\u9700 etcd \u7684\u8f7b\u91cf\u7ea7\u90e8\u7f72\u65b9\u5f0f",description:"APISIX Ingress Controller \u521b\u65b0\u67b6\u6784\uff0c\u6446\u8131\u5bf9 etcd \u96c6\u7fa4\u7684\u4f9d\u8d56\uff0c\u6781\u5927\u7b80\u5316\u7ef4\u62a4\u6210\u672c\u548c\u7cfb\u7edf\u590d\u6742\u6027\u3002",date:"2023-10-18T00:00:00.000Z",formattedDate:"2023\u5e7410\u670818\u65e5",tags:[{label:"Community",permalink:"/zh/blog/tags/community"}],readingTime:8.815,truncated:!0,authors:[{name:"\u5bb9\u946b",title:"Author",url:"https://github.com/AlinsRan",image_url:"https://github.com/AlinsRan.png",imageURL:"https://github.com/AlinsRan.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://avatars.githubusercontent.com/u/114121331?v=4",imageURL:"https://avatars.githubusercontent.com/u/114121331?v=4"}],prevItem:{title:"\u793e\u533a\u53cc\u5468\u62a5 (10.09 - 10.22)",permalink:"/zh/blog/2023/10/26/bi-weekly-report"},nextItem:{title:"\u793e\u533a\u53cc\u5468\u62a5 (9.25 - 10.08)",permalink:"/zh/blog/2023/10/11/bi-weekly-report"}},s={authorsImageUrls:[void 0,void 0]},o=[{value:"\u80cc\u666f",id:"\u80cc\u666f",children:[],level:2},{value:"\u65b0\u67b6\u6784\u7684\u8bbe\u8ba1",id:"\u65b0\u67b6\u6784\u7684\u8bbe\u8ba1",children:[{value:"Gateway API \u7406\u60f3\u4e2d\u7684\u65b0\u67b6\u6784",id:"gateway-api-\u7406\u60f3\u4e2d\u7684\u65b0\u67b6\u6784",children:[],level:3}],level:2},{value:"\u65b0\u67b6\u6784\u90e8\u7f72\u4e0e\u4f7f\u7528",id:"\u65b0\u67b6\u6784\u90e8\u7f72\u4e0e\u4f7f\u7528",children:[{value:"\u5b89\u88c5 APISIX Ingress Controller",id:"\u5b89\u88c5-apisix-ingress-controller",children:[],level:3},{value:"\u9ad8\u53ef\u7528\u90e8\u7f72",id:"\u9ad8\u53ef\u7528\u90e8\u7f72",children:[],level:3},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",children:[{value:"\u90e8\u7f72 httpbin \u5e94\u7528\u670d\u52a1",id:"\u90e8\u7f72-httpbin-\u5e94\u7528\u670d\u52a1",children:[],level:4},{value:"\u8bbf\u95ee httpbin \u6d4b\u8bd5",id:"\u8bbf\u95ee-httpbin-\u6d4b\u8bd5",children:[],level:4}],level:3}],level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[],level:2}],c={toc:o};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"APISIX Ingress Controller \u521b\u65b0\u67b6\u6784\uff0c\u6446\u8131\u5bf9 etcd \u96c6\u7fa4\u7684\u4f9d\u8d56\uff0c\u6781\u5927\u7b80\u5316\u7ef4\u62a4\u6210\u672c\u548c\u7cfb\u7edf\u590d\u6742\u6027\u3002")),(0,a.kt)("h2",{id:"\u80cc\u666f"},"\u80cc\u666f"),(0,a.kt)("p",null,"APISIX Ingress Controller \u662f\u4e00\u4e2a\u57fa\u4e8e Apache APISIX \u7684 Kubernetes Ingress Controller\uff0c\u5b83\u53ef\u4ee5\u5c06 Kubernetes \u4e2d\u7684 Ingress/CRDs \u8d44\u6e90\u8f6c\u6362\u4e3a Apache APISIX \u7684\u8def\u7531\u89c4\u5219\uff0c\u5e76\u540c\u6b65\u5230 Apache APISIX \u96c6\u7fa4\u4e2d\u3002\u7531\u6b64\u4e00\u6765\uff0c\u7528\u6237\u53ef\u4ee5\u5229\u7528 Apache APISIX \u7684\u5f3a\u5927\u529f\u80fd\uff0c\u5982\u63d2\u4ef6\u3001\u8d1f\u8f7d\u5747\u8861\u3001\u5065\u5eb7\u68c0\u67e5\u7b49\uff0c\u6765\u7ba1\u7406 Kubernetes \u7684\u5165\u53e3\u6d41\u91cf\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/10/24/aezup4a9_APISIX-Ingress-1.png",alt:"APISIX Ingress Controller Architecture"})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/10/24/ZtjVM6dH_APISIX-Ingress-2.png",alt:"Architecture of APISIX Ingress Controller with Gateway API"})),(0,a.kt)("p",null,"\u5728\u4e4b\u524d\u7684\u7248\u672c\u4e2d\uff0c\u90e8\u7f72 APISIX Ingress Controller \u96c6\u7fa4\u9700\u8981\u989d\u5916\u7ef4\u62a4\u4e00\u5957\u9ad8\u53ef\u7528\u7684 etcd \u96c6\u7fa4\u3002\u5b9e\u9645\u4e0a\u5728\u4f7f\u7528\u8fc7\u7a0b\u4e2d\uff0c\u5b83\u5e76\u4e0d\u662f\u90a3\u4e48\u597d\u7528\uff0c\u4f1a\u5e26\u6765\u4e86\u4e00\u4e9b\u95ee\u9898\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"etcd \u96c6\u7fa4\u7ef4\u62a4\u6210\u672c\u9ad8"),"\uff1a\u90e8\u7f72\u9ad8\u53ef\u7528\u96c6\u7fa4\u9700\u8981\u8f83\u9ad8\u7684\u5b66\u4e60\u4e0e\u7ef4\u62a4\u6210\u672c\uff0c\u9700\u8981\u8003\u8651\u5185\u5b58\u7b49\u7cfb\u7edf\u8d44\u6e90\u7684\u6d88\u8017\u3002\u5728 Kubernetes \u4e2d\u90e8\u7f72 etcd \u96c6\u7fa4\u9700\u8981\u6ce8\u610f\u7684\u4e8b\u9879\u8f83\u591a\uff0c\u5f80\u5f80\u7531\u4e8e\u4e0d\u719f\u6089 etcd \u800c\u65e0\u6cd5\u6709\u6548\u89e3\u51b3\u95ee\u9898\u3002\u8fd8\u9700\u5173\u5fc3\u5185\u5b58\u7b49\u7cfb\u7edf\u8d44\u6e90\u6d88\u8017\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u4f7f\u7528\u6210\u672c\u9ad8"),"\uff1aAPISIX Ingress Controller \u96c6\u7fa4\u7684\u90e8\u7f72\u9700\u8981\u4e09\u4e2a\u7ec4\u4ef6\uff0c\u76f8\u6bd4\u4e8e\u5355\u4e2a\u7ec4\u4ef6\u7684 ingress-nginx \u800c\u8a00\uff0c\u5f53\u524d\u67b6\u6784\u9700\u8981\u8f83\u9ad8\u7684\u5b66\u4e60\u548c\u8c03\u8bd5\u6210\u672c\uff0c\u5341\u5206\u4e0d\u6613\u4e8e\u4f7f\u7528\uff0c\u7ed9\u521d\u6b21\u4f7f\u7528\u8005\u5e26\u6765\u989d\u5916\u7684\u8d1f\u62c5\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u6570\u636e\u5197\u4f59\u548c\u4e00\u81f4\u6027\u95ee\u9898"),"\uff1a\u5373 Kubernetes etcd \u4fdd\u7559\u4e00\u4efd\uff0cAPISIX ETCD \u96c6\u7fa4\u4e5f\u4fdd\u7559\u4e86\u4e00\u4efd\u3002\u5728\u4f7f\u7528\u8fc7\u7a0b\u4e2d\uff0c\u5f80\u5f80\u9700\u8981\u907f\u514d\u4e24\u8005\u6570\u636e\u4e0d\u4e00\u81f4\u7684\u60c5\u51b5\uff0c\u4f46\u7531\u4e8e APISIX \u5e76\u4e0d\u4f9d\u8d56\u4e8e Ingress controller\uff0c\u5b83\u4eec\u4e4b\u95f4\u5904\u4e8e\u89e3\u8026\u7684\u5173\u7cfb\uff0c\u5f88\u96be\u5904\u7406\u548c\u907f\u514d\u8fd9\u79cd\u60c5\u51b5\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u5b9e\u73b0 Gatewa API \u9047\u5230\u963b\u788d"),"\uff1aGateway API \u80fd\u591f\u52a8\u6001\u7684\u7ba1\u7406\u4e00\u7ec4 Gateway\uff08APISIX\uff09 \u7684\u751f\u547d\u5468\u671f\uff0cAPISIX \u914d\u7f6e\u4e3b\u8981\u6765\u6e90\u4e8e etcd\uff0cIngress Controlle \u9700\u8981\u540c\u65f6\u611f\u77e5\u4e00\u7ec4 etcd \u96c6\u7fa4\u4e0e APISIX \u7684\u72b6\u6001\uff0c\u8fd9\u4f7f\u5f97\u7ef4\u62a4\u548c\u7ba1\u7406\u90fd\u4f1a\u5341\u5206\u590d\u6742\u3002"))),(0,a.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c\u5728\u6574\u4e2a\u67b6\u6784\u4e2d\uff0cApache APISIX \u5e76\u4e0d\u4f9d\u8d56\u4e8e Ingress Controller\uff0c\u540e\u8005\u53ea\u627f\u62c5\u7740\u914d\u7f6e\u63a8\u9001\u7684\u89d2\u8272\uff0c\u5b9e\u9645\u4e0a\u5b83\u5e76\u4e0d\u5177\u5907\u7ba1\u7406 APISIX \u7684\u80fd\u529b\uff0c\u8fd9\u4e9b\u95ee\u9898\u5728\u73b0\u6709\u7684\u67b6\u6784\u4e2d\u96be\u4ee5\u89e3\u51b3\u3002",(0,a.kt)("strong",{parentName:"p"},"\u4e3a\u4e86\u8fd9\u4e9b\u89e3\u51b3\u95ee\u9898\uff0c\u6211\u4eec\u9700\u8981\u8bbe\u8ba1\u65b0\u7684 APISIX Ingress Controller \u67b6\u6784\u3002")),(0,a.kt)("h2",{id:"\u65b0\u67b6\u6784\u7684\u8bbe\u8ba1"},"\u65b0\u67b6\u6784\u7684\u8bbe\u8ba1"),(0,a.kt)("p",null,"\u5982\u679c\u8981\u89e3\u51b3\u73b0\u6709\u67b6\u6784\u7684\u95ee\u9898\uff0c\u5219\u5fc5\u987b\u628a etcd \u7ec4\u4ef6\u53bb\u6389\u3002\u5f53\u524d\u4e3b\u8981\u8003\u8651\u4e86\u4ee5\u4e0b\u4e24\u4e2a\u65b9\u6848\uff1a"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u6e32\u67d3 ",(0,a.kt)("inlineCode",{parentName:"strong"},"apisix.yaml")," \u914d\u7f6e\u6587\u4ef6"),"\uff1a\u6839\u636e CRD \u751f\u6210 ",(0,a.kt)("inlineCode",{parentName:"p"},"apisix.yaml")," \u914d\u7f6e\u6587\u4ef6\uff0cAPISIX \u5728 yaml \u90e8\u7f72\u6a21\u5f0f\u4e0b\u5b9a\u671f\u6bcf\u79d2\u949f\u5168\u91cf\u8bfb\u53d6 ",(0,a.kt)("inlineCode",{parentName:"p"},"apisix.yaml")," \u914d\u7f6e\u6587\u4ef6\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u6a21\u62df etcd server API"),"\uff1a\u6839\u636e CRD \u6784\u5efa KV \u5185\u5b58\u6570\u636e\u5e93\uff0c\u5e76\u6a21\u62df etcd server API \u63d0\u4f9b\u7ed9 APISIX \u8fdb\u884c\u4f7f\u7528\u3002APISIX \u5c06\u4f1a\u5c1d\u8bd5 watch Controller \u63d0\u4f9b\u7684\u8d44\u6e90\u914d\u7f6e\uff0c\u5e76\u901a\u77e5\u5230 APISIX \u5b9e\u4f8b\u3002"))),(0,a.kt)("p",null,"\u663e\u7136\uff0c\u7b2c\u4e00\u79cd\u65b9\u5f0f\u4f1a\u7b80\u5355\u5f88\u591a\uff0c\u4f46\u5e76\u4e0d\u9002\u7528\u4e8e\u7f51\u5173\u76f4\u8fde\u540e\u7aef Pod \u7684\u573a\u666f\uff0c\u56e0\u4e3a Pod IP \u5728 Kubernetes \u4e2d\u5177\u6709\u52a8\u6001\u4f38\u7f29\u7684\u7279\u6027\uff0cIngress Controller \u4f1a\u4e0d\u65ad\u7684\u751f\u6210 ",(0,a.kt)("inlineCode",{parentName:"p"},"apisix.yaml")," \u914d\u7f6e\uff0c\u8fd9\u4f1a\u5bfc\u81f4 APISIX \u8def\u7531\u6811\u88ab\u9891\u7e41\u91cd\u5efa\uff0c\u4ece\u800c\u9020\u6210\u957f\u671f\u7684\u6027\u80fd\u6296\u52a8\u3002\u6700\u7ec8\u7ecf\u793e\u533a\u8ba8\u8bba\u51b3\u5b9a\u91c7\u7528\u7b2c\u4e8c\u79cd\u65b9\u6848\uff0c\u5b83\u7684\u67b6\u6784\u5982\u4e0b\u56fe\u6240\u793a\uff1a"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/10/24/H7xooJ59_APISIX-Ingress-3.png",alt:"Architecture of New APISIX Ingress Controller"})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/10/24/UbKWYGar_APISIX-Ingress-4.png",alt:"Architecture of New APISIX Ingress Controller (HA)"})),(0,a.kt)("p",null,"APISIX Ingress Controller \u5728 Release v1.7.0 \u7248\u672c\u4e2d\u5b9e\u73b0\u4e86\u65b0\u67b6\u6784\uff0c\u5b83\u76f8\u6bd4\u5177\u6709\u4ee5\u4e0b\u4f18\u52bf\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u4ee5\u58f0\u660e\u5f0f\u914d\u7f6e\u4f5c\u4e3a\u914d\u7f6e\u7684\u552f\u4e00\u6765\u6e90"),"\uff1aAPISIX \u5c06\u53ea\u4f1a\u5730\u4f9d\u8d56\u4e8e Control Plane \u63d0\u4f9b\u7684\u914d\u7f6e\u4fe1\u606f\u5e76\u4f5c\u4e3a\u552f\u4e00\u6765\u6e90\uff0c\u8fd9\u662f Kubernetes \u5e38\u89c1\u7684\u65b9\u5f0f\uff0c\u6781\u5927\u51cf\u5c11\u4e86\u8fd0\u7ef4\u590d\u6742\u6027\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u65e0\u9700\u7ef4\u62a4\u72ec\u7acb\u7684 etcd \u96c6\u7fa4"),"\uff1a\u65b0\u67b6\u6784\u6446\u8131\u4e86\u5bf9\u72ec\u7acb etcd \u96c6\u7fa4\u7684\u4f9d\u8d56\uff0c\u5bf9\u4e8e\u7528\u6237\u6765\u8bf4\uff0c\u6781\u5927\u51cf\u5c11\u4e86\u7ef4\u62a4\u6210\u672c\u4e0e\u590d\u6742\u6027\uff0c\u66f4\u6613\u4e8e\u90e8\u7f72\u4e0e\u4f7f\u7528\u3002")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("strong",{parentName:"p"},"\u63a8\u8fdb Kubernetes Gateway API \u6807\u51c6"),"\uff1aAPISIX \u5c06\u4f9d\u8d56\u4e8e Ingress Controller\uff0c\u4f7f\u5f97\u540e\u8005\u80fd\u591f\u7ba1\u7406 Gateway \u7684\u751f\u547d\u5468\u671f\uff0c\u8fd9\u6709\u52a9\u4e8e\u843d\u5b9e Gateway API \u7684\u5b8c\u6574\u5b9e\u73b0\u3002"))),(0,a.kt)("h3",{id:"gateway-api-\u7406\u60f3\u4e2d\u7684\u65b0\u67b6\u6784"},"Gateway API \u7406\u60f3\u4e2d\u7684\u65b0\u67b6\u6784"),(0,a.kt)("p",null,"Gateway API \u662f Ingress API \u7684\u4e0b\u4e00\u4ee3\u7248\u672c\uff0c\u63d0\u4f9b\u4e86\u66f4\u4e30\u5bcc\u7684\u529f\u80fd\u548c\u8868\u8fbe\u80fd\u529b\u3002\u76ee\u524d Gateway API \u5df2\u5f97\u5230\u4e86\u4f17\u591a\u5382\u5546\u548c\u9879\u76ee\u7684\u652f\u6301\uff0cAPISIX Ingress Controller \u4f5c\u4e3a Gateway API \u7684\u5b9e\u73b0\u8005\u4e4b\u4e00\uff0c\u65e2\u9075\u5faa\u4e86 Gateway API \u7684\u6807\u51c6\u89c4\u8303\uff0c\u53c8\u7ed3\u5408\u4e86 Apache APISIX \u7684\u4e30\u5bcc\u7279\u6027\uff0c\u4e3a\u7528\u6237\u63d0\u4f9b\u4e86\u66f4\u591a\u7684\u7f51\u5173\u914d\u7f6e\u548c\u7b56\u7565\u9009\u9879\u3002"),(0,a.kt)("p",null,"\u65b0\u67b6\u6784\u7684\u843d\u5730\u80fd\u591f\u8fdb\u4e00\u6b65\u63a8\u8fdb\u4e86 Gateway API \u7684\u5b9e\u73b0\uff0c\u4ee5\u63d0\u4f9b\u66f4\u597d\u7684\u8def\u7531\u914d\u7f6e\u548c\u7b56\u7565\uff0c\u5e76\u964d\u4f4e\u7ef4\u62a4\u6210\u672c\uff0c\u4f7f\u5176\u66f4\u6613\u90e8\u7f72\u4e0e\u4f7f\u7528\uff0c\u540c\u65f6\u4e5f\u53ef\u4ee5\u5145\u5206\u5229\u7528 Gateway API \u7684\u4f18\u52bf\uff0c\u63d0\u9ad8 API \u7f51\u5173\u7684\u7ba1\u7406\u6548\u7387\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/uploads/2023/10/17/9n1XraKT_Ingress-APISIX-5.png",alt:"Gateway API"})),(0,a.kt)("h2",{id:"\u65b0\u67b6\u6784\u90e8\u7f72\u4e0e\u4f7f\u7528"},"\u65b0\u67b6\u6784\u90e8\u7f72\u4e0e\u4f7f\u7528"),(0,a.kt)("p",null,"\u5728\u672c\u7ae0\u8282\u4e2d\uff0c\u5c06\u4f1a\u8bf4\u660e\u5728 Kubernetes \u4e2d\u9ad8\u53ef\u7528\u5b89\u88c5\u548c\u90e8\u7f72 APISIX Ingress Controller\uff0c\u5e76\u5728\u4f8b\u5b50\u4e2d\u6f14\u793a\u5982\u4f55\u914d\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," \u4ee5\u8bbf\u95ee ",(0,a.kt)("inlineCode",{parentName:"p"},"httpbin")," \u5e94\u7528\u670d\u52a1\u3002"),(0,a.kt)("h3",{id:"\u5b89\u88c5-apisix-ingress-controller"},"\u5b89\u88c5 APISIX Ingress Controller"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u4f60\u53ef\u4ee5\u8fd0\u884c\u4ee5\u4e0b\u547d\u4ee4\uff0c\u4ece Github \u514b\u9686 APISIX \u6e90\u7801\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"git clone --depth 1 --branch 1.7.0 https://github.com/apache/apisix-ingress-controller.git ingress-apisix-1.7.0\n\ncd ingress-apisix-1.7.0\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u5b89\u88c5 CRDs")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -k samples/deploy/crd/v1/\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"\u5b89\u88c5 APISIX Ingress Controller")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f samples/deploy/composite.yaml\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"\u68c0\u67e5\u90e8\u7f72\u72b6\u6001")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u68c0\u67e5 service"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get service  -n ingress-apisix # check service\n")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"NAME                        TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE\ningress-apisix-gateway      NodePort    10.99.236.58     <none>        80:31143/TCP,443:30166/TCP   90s\n"))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u68c0\u67e5 pods"),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get pods -n ingress-apisix # check pod\n")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"NAME                                                 READY   STATUS    RESTARTS   AGE\ningress-apisix-composite-deployment-5df9bc99c7-xxpvq   2/2     Running   0          100s\n")))),(0,a.kt)("h3",{id:"\u9ad8\u53ef\u7528\u90e8\u7f72"},"\u9ad8\u53ef\u7528\u90e8\u7f72"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u90e8\u7f72 3 \u4e2a\u5b9e\u4f8b\uff0c\u4ec5\u9700\u914d\u7f6e ",(0,a.kt)("a",{parentName:"li",href:"https://kubernetes.io/docs/concepts/workloads/controllers/deployment/"},"replicas")," \u4fbf\u53ef\u5b9e\u73b0\u9ad8\u53ef\u7528\u3002")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"}," kubectl scale deployment ingress-apisix-composite-deployment --replicas=3 -n ingress\n-apisix\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u68c0\u67e5\u90e8\u7f72\u72b6\u6001")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl get pods -n ingress-apisix\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\nNAME                                                   READY   STATUS    RESTARTS   AGE\ningress-apisix-composite-deployment-6bfdc5d6f6-gjgql   2/2     Running   0          20s\ningress-apisix-composite-deployment-6bfdc5d6f6-jb24q   2/2     Running   0          20s\ningress-apisix-composite-deployment-6bfdc5d6f6-sjpzr   2/2     Running   0          45h\n")),(0,a.kt)("h3",{id:"\u4f7f\u7528\u793a\u4f8b"},"\u4f7f\u7528\u793a\u4f8b"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"ApisixRoute \u662f Ingress \u7684 CRDs \u8d44\u6e90\uff0c\u7528\u4e8e\u8868\u793a\u5c06\u6d41\u91cf\u8def\u7531\u5230\u5177\u4f53\u7684\u540e\u7aef\u670d\u52a1\u3002")),(0,a.kt)("p",null,"\u4ee5\u4e0b\u793a\u4f8b\u5c06\u5ef6\u8fdf\u5982\u4f55\u914d\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," \u5c06\u6d41\u91cf\u8def\u7531 ",(0,a.kt)("inlineCode",{parentName:"p"},"httpbin")," \u540e\u7aef\u670d\u52a1\u3002"),(0,a.kt)("h4",{id:"\u90e8\u7f72-httpbin-\u5e94\u7528\u670d\u52a1"},"\u90e8\u7f72 httpbin \u5e94\u7528\u670d\u52a1"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u90e8\u7f72 ",(0,a.kt)("inlineCode",{parentName:"li"},"httpbin")," \u5e94\u7528\u670d\u52a1\u4ee5\u53ca\u914d\u7f6e ",(0,a.kt)("inlineCode",{parentName:"li"},"ApisixRoute"),"\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f samples/httpbin/httpbin-route.yaml\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"\u5177\u4f53 ",(0,a.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," \u914d\u7f6e\u5982\u4e0b\uff1a"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u5e26\u6709 ",(0,a.kt)("inlineCode",{parentName:"li"},"Host: httpbin.org")," \u7684\u6240\u6709\u8bf7\u6c42\u5c06\u4f1a\u8def\u7531\u5230 ",(0,a.kt)("inlineCode",{parentName:"li"},"httpbin")," \u670d\u52a1")),(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre",className:"language-YAML"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n    - name: route-1\n      match:\n        hosts:\n          - httpbin.org\n        paths:\n          - /*\n      backends:\n        - serviceName: httpbin\n          servicePort: 80\n")))),(0,a.kt)("h4",{id:"\u8bbf\u95ee-httpbin-\u6d4b\u8bd5"},"\u8bbf\u95ee httpbin \u6d4b\u8bd5"),(0,a.kt)("p",null,"\u901a\u8fc7\u672c\u5730\u7aef\u53e3\u8f6c\u53d1\uff0c\u8bbf\u95ee ",(0,a.kt)("inlineCode",{parentName:"p"},"ingress-apisix-gateway")," \u670d\u52a1\uff0c\u8bf7\u6c42\u5c06\u4ece ingress-apisix-gateway \u8def\u7531\u5230 httpbin \u5e94\u7528\u7a0b\u5e8f\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-Bash"},"# forward port 9080 -> service 80\nkubectl port-forward service/ingress-apisix-gateway 9080:80 -n ingress-apisix &\n\n# acesss httpbin\ncurl http://127.0.0.1:9080/headers -H 'Host: httpbin.org'\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-Bash"},'{\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.org",\n    "User-Agent": "curl/7.74.0",\n    "X-Forwarded-Host": "httpbin.org"\n  }\n}\n')),(0,a.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,a.kt)("p",null,"\u672c\u6587\u8be6\u7ec6\u63a2\u8ba8\u4e86 APISIX Ingress Controller \u7684\u521b\u65b0\u67b6\u6784\uff0c\u5b83\u6446\u8131\u4e86\u5bf9 etcd \u96c6\u7fa4\u7684\u4f9d\u8d56\uff0c\u6781\u5927\u5730\u7b80\u5316\u4e86\u7ef4\u62a4\u6210\u672c\u548c\u7cfb\u7edf\u590d\u6742\u6027\u3002\u540c\u65f6\uff0cAPISIX Ingress Controller \u4e5f\u5728\u79ef\u6781\u63a8\u8fdb Kubernetes Gateway API \u6807\u51c6\u5728 Ingress Controller \u4e2d\u7684\u843d\u5730\u5b9e\u73b0\uff0c\u4ee5\u63d0\u4f9b\u66f4\u4e30\u5bcc\u548c\u4e00\u81f4\u7684\u6d41\u91cf\u7ba1\u7406\u80fd\u529b\u3002"),(0,a.kt)("p",null,"\u603b\u800c\u8a00\u4e4b\uff0c\u65e0\u8bba\u662f APISIX Ingress Controller \u7684\u65b0\u67b6\u6784\u8fd8\u662f Kubernetes Gateway API \u5b9e\u73b0\u7684\u843d\u5730\uff0c\u65e8\u5728\u4e3a\u7528\u6237\u63d0\u4f9b\u66f4\u52a0\u5f3a\u5927\u3001\u7075\u6d3b\u548c\u6613\u7528\u7684 Ingress Controller \u89e3\u51b3\u65b9\u6848\uff0c\u4ee5\u6ee1\u8db3\u4e0d\u65ad\u53d8\u5316\u7684\u4e91\u539f\u751f\u5e94\u7528\u7a0b\u5e8f\u90e8\u7f72\u548c\u6d41\u91cf\u7ba1\u7406\u9700\u6c42\u3002"))}u.isMDXComponent=!0}}]);