"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[45597],{35318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(27378);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),k=s(n),h=l,u=k["".concat(p,".").concat(h)]||k[h]||m[h]||r;return n?a.createElement(u,o(o({ref:t},c),{},{components:n})):a.createElement(u,o({ref:t},c))}));function h(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,o=new Array(r);o[0]=k;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:l,o[1]=i;for(var s=2;s<r;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},48213:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=n(25773),l=(n(27378),n(35318));const r={title:"\u5982\u4f55\u4f7f\u7528 Nocalhost \u5f00\u53d1 APISIX Ingress Controller",author:"Garry Chen",authorURL:"https://github.com/neaped",authorImageURL:"https://avatars.githubusercontent.com/u/3713305?v=4",keywords:["Kubernetes","API \u7f51\u5173","Apache APISIX Ingress","Nocalhost","Controller","\u90e8\u7f72\u5f00\u53d1"],description:"\u672c\u6587\u5c06\u4e3a\u60a8\u4ecb\u7ecd\u5982\u4f55\u4f7f\u7528 Nocalhost \u5c06\u672c\u5730\u5f00\u53d1\u673a\u65e0\u7f1d\u8fde\u63a5\u5230\u4e00\u4e2a\u8fdc\u7a0b Kubernetes \u96c6\u7fa4\uff0c\u540c\u65f6\u914d\u5408 IDE \u6765\u5f00\u53d1\u548c\u8c03\u8bd5 Apache APISIX Ingress Controller\u3002",tags:["Ecosystem"]},o=void 0,i={permalink:"/zh/blog/2021/11/22/develop-apisix-ingress-with-nocalhost-in-kubernetes",source:"@site/blog/2021/11/22/develop-apisix-ingress-with-nocalhost-in-kubernetes.md",title:"\u5982\u4f55\u4f7f\u7528 Nocalhost \u5f00\u53d1 APISIX Ingress Controller",description:"\u672c\u6587\u5c06\u4e3a\u60a8\u4ecb\u7ecd\u5982\u4f55\u4f7f\u7528 Nocalhost \u5c06\u672c\u5730\u5f00\u53d1\u673a\u65e0\u7f1d\u8fde\u63a5\u5230\u4e00\u4e2a\u8fdc\u7a0b Kubernetes \u96c6\u7fa4\uff0c\u540c\u65f6\u914d\u5408 IDE \u6765\u5f00\u53d1\u548c\u8c03\u8bd5 Apache APISIX Ingress Controller\u3002",date:"2021-11-22T00:00:00.000Z",formattedDate:"2021\u5e7411\u670822\u65e5",tags:[{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:6.115,truncated:!0,authors:[{name:"Garry Chen",url:"https://github.com/neaped",imageURL:"https://avatars.githubusercontent.com/u/3713305?v=4"}],prevItem:{title:"Apache APISIX request_uri \u53d8\u91cf\u63a7\u5236\u4e0d\u5f53\uff0c\u5b58\u5728\u8def\u5f84\u904d\u5386\u98ce\u9669\u516c\u544a(CVE-2021-43557)",permalink:"/zh/blog/2021/11/23/cve-2021-43557"},nextItem:{title:"\u91cd\u78c5\u529f\u80fd\uff01Apache APISIX \u62e5\u62b1 WASM \u751f\u6001",permalink:"/zh/blog/2021/11/19/apisix-supports-wasm"}},p={authorsImageUrls:[void 0]},s=[{value:"\u73af\u5883\u51c6\u5907",id:"\u73af\u5883\u51c6\u5907",children:[],level:2},{value:"\u90e8\u7f72 Apache APISIX Ingress Controller",id:"\u90e8\u7f72-apache-apisix-ingress-controller",children:[],level:2},{value:"\u5f00\u53d1",id:"\u5f00\u53d1",children:[{value:"\u6b65\u9aa4\u4e00\uff1a\u8fdb\u5165\u5f00\u53d1\u6a21\u5f0f",id:"\u6b65\u9aa4\u4e00\u8fdb\u5165\u5f00\u53d1\u6a21\u5f0f",children:[],level:3},{value:"\u6b65\u9aa4\u4e8c\uff1a\u4fee\u6539\u4ee3\u7801\u5e76\u68c0\u67e5\u7ed3\u679c",id:"\u6b65\u9aa4\u4e8c\u4fee\u6539\u4ee3\u7801\u5e76\u68c0\u67e5\u7ed3\u679c",children:[],level:3},{value:"\u6b65\u9aa4\u4e09\uff1a\u7ed3\u675f\u5f00\u53d1\u6a21\u5f0f",id:"\u6b65\u9aa4\u4e09\u7ed3\u675f\u5f00\u53d1\u6a21\u5f0f",children:[],level:3}],level:2},{value:"\u8c03\u8bd5",id:"\u8c03\u8bd5",children:[{value:"\u6b65\u9aa4\u4e00\uff1a\u5f00\u542f\u8fdc\u7a0b\u8c03\u8bd5",id:"\u6b65\u9aa4\u4e00\u5f00\u542f\u8fdc\u7a0b\u8c03\u8bd5",children:[],level:3},{value:"\u6b65\u9aa4\u4e8c\uff1a\u8bbe\u7f6e\u65ad\u70b9",id:"\u6b65\u9aa4\u4e8c\u8bbe\u7f6e\u65ad\u70b9",children:[],level:3}],level:2},{value:"\u8fdc\u7a0b\u8fd0\u884c",id:"\u8fdc\u7a0b\u8fd0\u884c",children:[],level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[],level:2}],c={toc:s};function m(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u5c06\u4e3a\u60a8\u4ecb\u7ecd\u5982\u4f55\u4f7f\u7528 Nocalhost \u5c06\u672c\u5730\u5f00\u53d1\u673a\u65e0\u7f1d\u8fde\u63a5\u5230\u4e00\u4e2a\u8fdc\u7a0b Kubernetes \u96c6\u7fa4\uff0c\u540c\u65f6\u914d\u5408 IDE \u6765\u5f00\u53d1\u548c\u8c03\u8bd5 Apache APISIX Ingress Controller\u3002\u5229\u7528\u73b0\u6709\u6280\u672f\u6808\u66f4\u987a\u7545\u5730\u5f00\u53d1\u548c\u8c03\u8bd5\u8fdc\u7a0b\u5e94\u7528\u3002")),(0,l.kt)("h2",{id:"\u73af\u5883\u51c6\u5907"},"\u73af\u5883\u51c6\u5907"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u51c6\u5907\u4e00\u4e2a\u53ef\u7528\u7684 Kubernetes \u96c6\u7fa4\u3002\u53ef\u4f7f\u7528\u4efb\u610f\u62e5\u6709\u547d\u540d\u7a7a\u95f4\u7ba1\u7406\u6743\u9650\u7684 Kubernetes \u96c6\u7fa4"),(0,l.kt)("li",{parentName:"ul"},"\u672c\u5730\u5df2\u5b89\u88c5\u597d ",(0,l.kt)("a",{parentName:"li",href:"https://helm.sh"},"Helm v3.0+")),(0,l.kt)("li",{parentName:"ul"},"\u96c6\u7fa4\u4e2d\u5df2\u5b89\u88c5\u597d Apache APISIX"),(0,l.kt)("li",{parentName:"ul"},"GoLand IDE 2020.03+ (\u672c\u6587\u5e94\u7528\u7684\u662f 2021.2 \u7248\u672c)"),(0,l.kt)("li",{parentName:"ul"},"\u5b89\u88c5 ",(0,l.kt)("a",{parentName:"li",href:"https://nocalhost.dev/zh-CN/docs/installation#install-jetbrains-plugin"},"Nocalhost JetBrains plugin")," \u63d2\u4ef6"),(0,l.kt)("li",{parentName:"ul"},"\u5b89\u88c5 ",(0,l.kt)("a",{parentName:"li",href:"https://golang.org/dl/"},"Go 1.13")," \u6216\u66f4\u9ad8\u7248\u672c")),(0,l.kt)("h2",{id:"\u90e8\u7f72-apache-apisix-ingress-controller"},"\u90e8\u7f72 Apache APISIX Ingress Controller"),(0,l.kt)("p",null,"\u5728 GoLand \u4e2d\u901a\u8fc7 Nocalhost \u90e8\u7f72 Apache APISIX Ingress Controller\uff0c\u64cd\u4f5c\u5982\u4e0b\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5728 GoLand \u4e2d\u6253\u5f00 Nocalhost \u63d2\u4ef6")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u9009\u62e9\u5c06\u8981\u90e8\u7f72 APISIX Ingress Controller \u7684\u547d\u540d\u7a7a\u95f4")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u53f3\u952e\u70b9\u51fb\u9009\u5b9a\u7684\u547d\u540d\u7a7a\u95f4, \u9009\u62e9 ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("inlineCode",{parentName:"strong"},"Deploy Application")),", \u7136\u540e\u9009\u62e9 ",(0,l.kt)("strong",{parentName:"p"},(0,l.kt)("inlineCode",{parentName:"strong"},"Helm Repo"))," \u4f5c\u4e3a\u5b89\u88c5\u65b9\u6cd5")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},"\u5728\u4e0b\u9762\u7684\u5bf9\u8bdd\u6846\u4e2d\uff1a"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},"\u5728 ",(0,l.kt)("inlineCode",{parentName:"li"},"Name")," \u4e2d\u8f93\u5165\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")),(0,l.kt)("li",{parentName:"ol"},"\u5728 ",(0,l.kt)("inlineCode",{parentName:"li"},"Chart URL")," \u4e2d\u8f93\u5165\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"https://charts.apiseven.com"))))),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637131316244-f1a58c88-8628-4918-a4c4-1ad287742fd0.gif",alt:"\u90e8\u7f72 APISIX ingress controller"})),(0,l.kt)("p",null,"\u90e8\u7f72\u5b8c\u6210\u540e\uff0c\u6211\u4eec\u901a\u8fc7\u5728 IDE \u5185\u542f\u7528\u7aef\u53e3\u8f6c\u53d1\u6765\u6d4b\u8bd5 ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller"),":"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u5728 Nocalhost \u63d2\u4ef6\u7684 Workloads \u4e2d\u627e\u5230 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller"),"\uff0c\u53f3\u952e\u70b9\u51fb\u5e76\u9009\u62e9 ",(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"strong"},"Port Forward"))),(0,l.kt)("li",{parentName:"ol"},"\u6dfb\u52a0\u7aef\u53e3\u8f6c\u53d1 ",(0,l.kt)("inlineCode",{parentName:"li"},"8080:8080")),(0,l.kt)("li",{parentName:"ol"},"\u5728\u672c\u5730\u8bbf\u95ee ",(0,l.kt)("a",{parentName:"li",href:"http://127.0.0.1:8080/healthz"},(0,l.kt)("inlineCode",{parentName:"a"},"http://127.0.0.1:8080/healthz"))," \u5e76\u68c0\u67e5\u7ed3\u679c")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637131450462-842c3baf-b7a4-4598-be0b-27486bf1cf28.gif",alt:"\u6d4b\u8bd5\u90e8\u7f72\u662f\u5426\u6210\u529f"})),(0,l.kt)("h2",{id:"\u5f00\u53d1"},"\u5f00\u53d1"),(0,l.kt)("h3",{id:"\u6b65\u9aa4\u4e00\u8fdb\u5165\u5f00\u53d1\u6a21\u5f0f"},"\u6b65\u9aa4\u4e00\uff1a\u8fdb\u5165\u5f00\u53d1\u6a21\u5f0f"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u53f3\u952e\u70b9\u51fb ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")," \u5de5\u4f5c\u8d1f\u8f7d\uff0c\u9009\u62e9 ",(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"strong"},"Start DevMode"))),(0,l.kt)("li",{parentName:"ol"},"\u5982\u679c\u60a8\u5df2\u7ecf\u5c06\u6e90\u7801\u514b\u9686\u5230\u672c\u5730\uff0c\u8bf7\u9009\u62e9\u60a8\u7684\u6e90\u4ee3\u7801\u76ee\u5f55\u3002\u5426\u5219\u901a\u8fc7\u8f93\u5165\u4ed3\u5e93\u5730\u5740 ",(0,l.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller.git"},"https://github.com/apache/apisix-ingress-controller.git")," \u6765\u8ba9 Nocalhost \u514b\u9686\u4f60\u7684\u6e90\u4ee3\u7801\u5230\u672c\u5730"),(0,l.kt)("li",{parentName:"ol"},"\u7b49\u5f85\u64cd\u4f5c\u5b8c\u6210\uff0cNocalhost \u5c06\u5728\u8fdb\u5165 DevMode \u540e\u5728 IDE \u5185\u6253\u5f00\u8fdc\u7a0b\u7ec8\u7aef")),(0,l.kt)("p",null,"\u73b0\u5728\u901a\u8fc7\u5728\u8fdc\u7a0b\u7ec8\u7aef\u4e2d\u8f93\u5165\u4ee5\u4e0b\u547d\u4ee4\u6765\u542f\u52a8 ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," \u8fdb\u7a0b\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"go run main.go ingress --config-path conf/config-default.yaml\n")),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," \u542f\u52a8\u540e\uff0c\u53ef\u901a\u8fc7 ",(0,l.kt)("a",{parentName:"p",href:"http://127.0.0.1:8080/healthz"},(0,l.kt)("inlineCode",{parentName:"a"},"http://127.0.0.1:8080/healthz"))," \u8bbf\u95ee\u670d\u52a1\uff0c\u5e76\u68c0\u67e5\u7ed3\u679c."),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637131513751-b9184c10-4da3-4ab2-b403-56ae2360704a.gif",alt:"\u8fdb\u5165\u5f00\u53d1\u6a21\u5f0f"})),(0,l.kt)("h3",{id:"\u6b65\u9aa4\u4e8c\u4fee\u6539\u4ee3\u7801\u5e76\u68c0\u67e5\u7ed3\u679c"},"\u6b65\u9aa4\u4e8c\uff1a\u4fee\u6539\u4ee3\u7801\u5e76\u68c0\u67e5\u7ed3\u679c"),(0,l.kt)("p",null,"\u73b0\u5728\u6211\u4eec\u6765\u4fee\u6539\u4e00\u4e0b\u4ee3\u7801\u5e76\u770b\u770b\u6548\u679c\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u505c\u6b62 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")," \u8fdb\u7a0b"),(0,l.kt)("li",{parentName:"ol"},"\u5728 Goland \u4e2d\u641c\u7d22 ",(0,l.kt)("inlineCode",{parentName:"li"},"healthz")," \u5e76\u627e\u5230 ",(0,l.kt)("inlineCode",{parentName:"li"},"router.go")," \u6587\u4ef6\u3002 \u5c06 ",(0,l.kt)("inlineCode",{parentName:"li"},"healthzResponse")," \u7684\u72b6\u6001\u4ee3\u7801\u4ece ",(0,l.kt)("inlineCode",{parentName:"li"},"ok")," \u66f4\u6539\u4e3a ",(0,l.kt)("inlineCode",{parentName:"li"},"Hello Nocalhost")),(0,l.kt)("li",{parentName:"ol"},"\u91cd\u65b0\u542f\u52a8\u8fdb\u7a0b\u5e76\u5728\u672c\u5730\u68c0\u67e5\u66f4\u6539\u7ed3\u679c")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637131699629-a0766f66-0faa-4bf8-9013-284e5f2bdd57.gif",alt:"\u65e0\u9700\u91cd\u65b0\u6784\u5efa\u955c\u50cf\u6216\u91cd\u542f\u5bb9\u5668\uff0c\u51e0\u79d2\u540e\u4fbf\u53ef\u4ee5\u770b\u5230\u6539\u52a8\u7684\u7ed3\u679c"})),(0,l.kt)("h3",{id:"\u6b65\u9aa4\u4e09\u7ed3\u675f\u5f00\u53d1\u6a21\u5f0f"},"\u6b65\u9aa4\u4e09\uff1a\u7ed3\u675f\u5f00\u53d1\u6a21\u5f0f"),(0,l.kt)("p",null,"\u73b0\u5728\u5173\u95ed\u5f00\u53d1\u7a97\u53e3\u5e76\u9000\u51fa\u5f00\u53d1\u6a21\u5f0f\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u53f3\u952e\u70b9\u51fb ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")),(0,l.kt)("li",{parentName:"ol"},"\u9009\u62e9 ",(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"strong"},"End DevMode")))),(0,l.kt)("p",null,"Nocalhost \u5c06\u4f7f ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," \u7ed3\u675f DevMode, \u5e76\u91cd\u7f6e ",(0,l.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," \u5230\u5176\u539f\u59cb\u7248\u672c\u3002\u542f\u7528\u7aef\u53e3\u8f6c\u53d1\u6765\u770b\u770b\u9000\u51fa\u5f00\u53d1\u6a21\u5f0f\u540e\u7684\u7ed3\u679c\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637131766524-dba7b756-ae0b-42d1-8ff0-6ac14059ce11.gif",alt:"\u7ed3\u675f DevMode"})),(0,l.kt)("p",null,"\u6ce8\u610f\uff1a\u5728\u5f00\u53d1\u6a21\u5f0f\u4e0b\u4fee\u6539\u4ee3\u7801\u65f6\uff0c\u6240\u6709\u4ee3\u7801\u66f4\u6539\u90fd\u53ea\u5728",(0,l.kt)("strong",{parentName:"p"},"\u5f00\u53d1\u5bb9\u5668"),"\u4e2d\u751f\u6548\u3002"),(0,l.kt)("p",null,"\u9000\u51fa DevMode \u540e\uff0cNocalhost \u5c06\u4f1a\u5c06\u8fdc\u7a0b\u5bb9\u5668\u91cd\u7f6e\u4e3a\u539f\u59cb\u72b6\u6001(\u8fdb\u5165 DevMode \u4e4b\u524d\u7684\u7248\u672c)\u3002\u8fd9\u6837\uff0c\u5728\u9000\u51fa DevMode \u540e\uff0c\u5bf9\u4ee3\u7801\u8fdb\u884c\u4fee\u6539\u4e0d\u4f1a\u5bf9\u539f\u59cb\u73af\u5883\u9020\u6210\u4efb\u4f55\u66f4\u6539\u6216\u5f71\u54cd\u3002"),(0,l.kt)("h2",{id:"\u8c03\u8bd5"},"\u8c03\u8bd5"),(0,l.kt)("p",null,"\u8c03\u8bd5\u5e94\u7528\u7a0b\u5e8f\u662f\u4e00\u4ef6\u9ebb\u70e6\u7684\u4e8b\uff0c\u5728 Kubernetes \u96c6\u7fa4\u4e2d\u8c03\u8bd5\u5e94\u7528\u7a0b\u5e8f\u5219\u66f4\u52a0\u9ebb\u70e6\u3002\u4f46 Nocalhost \u53ef\u4ee5\u5e2e\u52a9\u6211\u4eec\u5728\u8c03\u8bd5 Kubernetes \u96c6\u7fa4\u4e2d\u7684\u7a0b\u5e8f\u65f6\u83b7\u5f97\u548c\u5728 IDE \u4e2d\u76f4\u63a5\u8c03\u8bd5\u672c\u5730\u7a0b\u5e8f\u540c\u6837\u7684\u4f53\u9a8c\u3002"),(0,l.kt)("h3",{id:"\u6b65\u9aa4\u4e00\u5f00\u542f\u8fdc\u7a0b\u8c03\u8bd5"},"\u6b65\u9aa4\u4e00\uff1a\u5f00\u542f\u8fdc\u7a0b\u8c03\u8bd5"),(0,l.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u65b9\u5f0f\u5f00\u542f\u8fdc\u7a0b\u8c03\u8bd5"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u53f3\u952e\u70b9\u51fb ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")," \u5e76\u9009\u62e9 ",(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"strong"},"Remote Debug"))),(0,l.kt)("li",{parentName:"ul"},"Nocalhost \u5c06\u4f1a\u5148\u8ba9 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")," \u8fdb\u5165 DevMode\uff0c\u5e76\u8fd0\u884c\u5728 ",(0,l.kt)("a",{parentName:"li",href:"https://nocalhost.dev/zh-CN/docs/config/config-develop"},(0,l.kt)("inlineCode",{parentName:"a"},"dev config"))," \u5b9a\u4e49\u7684\u8c03\u8bd5\u547d\u4ee4")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637132327260-7bba1d81-cf70-4982-9a07-51cc379e6bea.gif",alt:"\u5f00\u59cb\u8fdc\u7a0b\u8c03\u8bd5"})),(0,l.kt)("h3",{id:"\u6b65\u9aa4\u4e8c\u8bbe\u7f6e\u65ad\u70b9"},"\u6b65\u9aa4\u4e8c\uff1a\u8bbe\u7f6e\u65ad\u70b9"),(0,l.kt)("p",null,"\u5728 ",(0,l.kt)("inlineCode",{parentName:"p"},"healthz")," \u51fd\u6570\u4e0a\u8bbe\u7f6e\u4e00\u4e2a\u65ad\u70b9\u3002\u60ac\u505c\u5728\u884c\u53f7\u5de6\u4fa7\uff0c\u7136\u540e\u70b9\u51fb\u7ea2\u70b9\u3002\u8bbe\u7f6e\u597d\u65ad\u70b9\u540e\uff0c\u5728\u6d4f\u89c8\u5668\u4e2d\u8bbf\u95ee ",(0,l.kt)("a",{parentName:"p",href:"http://127.0.0.1:8080/healthz"},(0,l.kt)("inlineCode",{parentName:"a"},"http://127.0.0.1:8080/healthz")),"\uff0c\u4f1a\u89e6\u53d1\u65ad\u70b9\uff0cGoLand \u4f1a\u8df3\u5230\u524d\u53f0\u3002\u70b9\u51fb\u8c03\u8bd5\u76f8\u5173\u6309\u94ae\u53ef\u5bf9\u7a0b\u5e8f\u8fdb\u884c\u8c03\u8bd5\u3002"),(0,l.kt)("p",null,"\u6b64\u5916\uff0c\u56e0\u4e3a\u6211\u4eec\u542f\u7528\u4e86 ",(0,l.kt)("inlineCode",{parentName:"p"},"dev.hotReload"),"\uff0c\u6240\u4ee5\u6bcf\u6b21\u66f4\u6539\u4ee3\u7801\u65f6\uff0cNocalhost \u5c06\u81ea\u52a8\u91cd\u65b0\u8fd0\u884c\u8c03\u8bd5\u547d\u4ee4\u3002\u8fd9\u53ef\u4ee5\u8ba9\u6211\u4eec\u9891\u7e41\u66f4\u6539\u548c\u8c03\u8bd5\u4ee3\u7801\u65f6\u53d8\u5f97\u65b9\u4fbf\u5f88\u591a\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637132455552-86f44c0c-94d1-4ad9-a79d-0e2c6957d60b.gif",alt:"\u8bbe\u7f6e\u65ad\u70b9\u5e76\u8fd0\u884c\u670d\u52a1"})),(0,l.kt)("h2",{id:"\u8fdc\u7a0b\u8fd0\u884c"},"\u8fdc\u7a0b\u8fd0\u884c"),(0,l.kt)("p",null,"Nocalhost \u4e0d\u4ec5\u4ec5\u53ef\u4ee5\u8fdc\u7a0b\u8c03\u8bd5\uff0c\u8fd8\u4e3a\u6211\u4eec\u5728 Kubernetes \u96c6\u7fa4\u4e2d\u8fd0\u884c\u670d\u52a1\u4ee5\u53ca\u70ed\u52a0\u8f7d\u63d0\u4f9b\u4e86\u4e00\u79cd\u66f4\u7b80\u5355\u7684\u65b9\u5f0f\u3002"),(0,l.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7\u4ee5\u4e0b\u6b65\u9aa4\u4f7f\u7528 Remote Run \u529f\u80fd\uff1a"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u53f3\u952e\u70b9\u51fb ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller"),"\uff0c\u5e76\u9009\u62e9 ",(0,l.kt)("strong",{parentName:"li"},(0,l.kt)("inlineCode",{parentName:"strong"},"Remote Run"))),(0,l.kt)("li",{parentName:"ul"},"Nocalhost \u5c06\u4f1a\u5148\u8ba9 ",(0,l.kt)("inlineCode",{parentName:"li"},"apisix-ingress-controller")," \u8fdb\u5165 DevMode\uff0c\u5e76\u8fd0\u884c\u5728 ",(0,l.kt)("a",{parentName:"li",href:"https://nocalhost.dev/zh-CN/docs/config/config-develop"},(0,l.kt)("inlineCode",{parentName:"a"},"dev config"))," \u5b9a\u4e49\u7684\u8fd0\u884c\u547d\u4ee4")),(0,l.kt)("p",null,"\u6bcf\u6b21\u66f4\u6539\u4ee3\u7801\u5b8c\u4ee3\u7801\u540e\uff0cNocalhost \u90fd\u4f1a\u81ea\u52a8\u89e6\u53d1\u8fd0\u884c\u547d\u4ee4\uff0c\u5c06\u7a0b\u5e8f\u8fd0\u884c\u8d77\u6765\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1637133046432-84810667-c3ee-4d71-8a33-eb1833fd9ce2.gif",alt:"Remote run"})),(0,l.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,l.kt)("p",null,"\u901a\u8fc7\u672c\u6587\uff0c\u6211\u4eec\u4e3a\u5927\u5bb6\u5c55\u793a\u4e86\u5982\u4f55\u4f7f\u7528 Nocalhost \u6765\u5f00\u53d1\u548c\u8c03\u8bd5 Kubernetes \u96c6\u7fa4\u4e2d\u7684 Apache APISIX Ingress Controller\u3002\u501f\u52a9 Nocalhost \u7684\u80fd\u529b\uff0c\u6211\u4eec\u4e0d\u518d\u9700\u8981\u7b49\u5f85\u7f13\u6162\u7684\u672c\u5730\u5f00\u53d1\u8fc7\u7a0b\uff0c\u800c\u662f\u53ef\u4ee5\u901a\u8fc7\u5373\u65f6\u53cd\u9988\u548c\u9ad8\u6548\u7684\u4e91\u672c\u5730\u5f00\u53d1\u73af\u5883\u8fdb\u884c\u5feb\u901f\u90e8\u7f72\u4e0e\u8fed\u4ee3."))}m.isMDXComponent=!0}}]);