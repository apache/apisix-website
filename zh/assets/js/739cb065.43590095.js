"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[21645],{35318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(27378);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},p=Object.keys(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(r=0;r<p.length;r++)n=p[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),o=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=o(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,p=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=o(n),g=a,d=h["".concat(i,".").concat(g)]||h[g]||u[g]||p;return n?r.createElement(d,s(s({ref:t},c),{},{components:n})):r.createElement(d,s({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var p=n.length,s=new Array(p);s[0]=h;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:a,s[1]=l;for(var o=2;o<p;o++)s[o]=n[o];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},23417:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>p,metadata:()=>l,toc:()=>o});var r=n(25773),a=(n(27378),n(35318));const p={title:"\u501f\u52a9 KubeSphere \u63d0\u4f9b\u66f4\u597d\u7528\u7684\u7f51\u5173\u53ca K8s Ingress \u63a7\u5236\u5668",slug:"2021/08/31/apache-apisix-kubeSphere-a-better-gateway-and-k8s-ingress-controller",author:"\u5f20\u664b\u6d9b",authorURL:"https://github.com/tao12345666333",authorImageURL:"https://avatars.githubusercontent.com/u/3264292?v=4",keywords:["API \u7f51\u5173","Apache APISIX","KubeSphere","Ingress"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5728 KubeSphere \u4e2d\u4f7f\u7528\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX \u7684\u5b98\u65b9 Helm \u4ed3\u5e93\u76f4\u63a5\u90e8\u7f72 Apache APISIX \u548c APISIX Ingress Controller\u3002",tags:["Ecosystem"]},s=void 0,l={permalink:"/zh/blog/2021/08/31/apache-apisix-kubeSphere-a-better-gateway-and-k8s-ingress-controller",source:"@site/blog/2021/08/31/Apache APISIX \xd7 KubeSphere-a-better-gateway-and-K8S-Ingress-Controller.md",title:"\u501f\u52a9 KubeSphere \u63d0\u4f9b\u66f4\u597d\u7528\u7684\u7f51\u5173\u53ca K8s Ingress \u63a7\u5236\u5668",description:"\u672c\u6587\u4ecb\u7ecd\u4e86\u5728 KubeSphere \u4e2d\u4f7f\u7528\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX \u7684\u5b98\u65b9 Helm \u4ed3\u5e93\u76f4\u63a5\u90e8\u7f72 Apache APISIX \u548c APISIX Ingress Controller\u3002",date:"2021-08-31T00:00:00.000Z",formattedDate:"2021\u5e748\u670831\u65e5",tags:[{label:"Ecosystem",permalink:"/zh/blog/tags/ecosystem"}],readingTime:7.62,truncated:!0,authors:[{name:"\u5f20\u664b\u6d9b",url:"https://github.com/tao12345666333",imageURL:"https://avatars.githubusercontent.com/u/3264292?v=4"}],prevItem:{title:"Python \u52a9\u4f60\u5feb\u901f\u4e0a\u624b Apache APISIX \u63d2\u4ef6\u5f00\u53d1",permalink:"/zh/blog/2021/09/06/python-helps-you-quickly-with-apache-apisix-development"},nextItem:{title:"\u793e\u533a\u4f1a\u8bae\uff5cAPISIX Ingress \u4f1a\u8bae\u4e0e\u4f60\u4e0d\u89c1\u4e0d\u6563",permalink:"/zh/blog/2021/08/30/ingress-meeting"}},i={authorsImageUrls:[void 0]},o=[{value:"KubeSphere \u4ecb\u7ecd",id:"kubesphere-\u4ecb\u7ecd",children:[],level:2},{value:"Apache APISIX \u4ecb\u7ecd",id:"apache-apisix-\u4ecb\u7ecd",children:[],level:2},{value:"\u524d\u7f6e\u6761\u4ef6",id:"\u524d\u7f6e\u6761\u4ef6",children:[],level:2},{value:"\u90e8\u7f72 Apache APISIX \u548c Apache APISIX Ingress Controller",id:"\u90e8\u7f72-apache-apisix-\u548c-apache-apisix-ingress-controller",children:[],level:2},{value:"\u90e8\u7f72\u793a\u4f8b\u9879\u76ee",id:"\u90e8\u7f72\u793a\u4f8b\u9879\u76ee",children:[],level:2},{value:"\u4f7f\u7528 Apache APISIX \u4f5c\u4e3a\u7f51\u5173\u4ee3\u7406",id:"\u4f7f\u7528-apache-apisix-\u4f5c\u4e3a\u7f51\u5173\u4ee3\u7406",children:[],level:2},{value:"\u4f7f\u7528 APISIX Ingress Controller \u4ee3\u7406\u670d\u52a1",id:"\u4f7f\u7528-apisix-ingress-controller-\u4ee3\u7406\u670d\u52a1",children:[],level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[],level:2},{value:"\u672a\u6765\u5c55\u671b",id:"\u672a\u6765\u5c55\u671b",children:[],level:2}],c={toc:o};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u4ecb\u7ecd\u4e86\u5728 KubeSphere \u4e2d\u4f7f\u7528 Apache APISIX \u7684\u5b98\u65b9 Helm \u4ed3\u5e93\u76f4\u63a5\u90e8\u7f72 Apache APISIX \u548c APISIX Ingress Controller \u3002\u5e76\u4e14 Apache APISIX \u53ef\u901a\u8fc7\u4f5c\u4e3a\u7f51\u5173\uff0c\u6216\u8005 APISIX Ingress Controller \u7684\u6570\u636e\u9762\u6765\u627f\u8f7d\u4e1a\u52a1\u6d41\u91cf\u3002")),(0,a.kt)("h2",{id:"kubesphere-\u4ecb\u7ecd"},"KubeSphere \u4ecb\u7ecd"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://kubesphere.io/"},"KubeSphere")," \u662f\u5728 Kubernetes \u4e4b\u4e0a\u6784\u5efa\u7684\u9762\u5411\u4e91\u539f\u751f\u5e94\u7528\u7684\u7cfb\u7edf\uff0c\u5b8c\u5168\u5f00\u6e90\uff0c\u652f\u6301\u591a\u4e91\u4e0e\u591a\u96c6\u7fa4\u7ba1\u7406\uff0c\u63d0\u4f9b\u5168\u6808\u7684 IT \u81ea\u52a8\u5316\u8fd0\u7ef4\u80fd\u529b\uff0c\u7b80\u5316\u4f01\u4e1a\u7684 DevOps \u5de5\u4f5c\u6d41\u3002\u5b83\u7684\u67b6\u6784\u53ef\u4ee5\u975e\u5e38\u65b9\u4fbf\u5730\u4f7f\u7b2c\u4e09\u65b9\u5e94\u7528\u4e0e\u4e91\u539f\u751f\u751f\u6001\u7ec4\u4ef6\u8fdb\u884c\u5373\u63d2\u5373\u7528 (plug-and-play) \u7684\u96c6\u6210\u3002"),(0,a.kt)("p",null,"\u4f5c\u4e3a\u5168\u6808\u7684\u591a\u79df\u6237\u5bb9\u5668\u5e73\u53f0\uff0cKubeSphere \u63d0\u4f9b\u4e86\u8fd0\u7ef4\u53cb\u597d\u7684\u5411\u5bfc\u5f0f\u64cd\u4f5c\u754c\u9762\uff0c\u5e2e\u52a9\u4f01\u4e1a\u5feb\u901f\u6784\u5efa\u4e00\u4e2a\u5f3a\u5927\u548c\u529f\u80fd\u4e30\u5bcc\u7684\u5bb9\u5668\u4e91\u5e73\u53f0\u3002KubeSphere \u4e3a\u7528\u6237\u63d0\u4f9b\u6784\u5efa\u4f01\u4e1a\u7ea7 Kubernetes \u73af\u5883\u6240\u9700\u7684\u591a\u9879\u529f\u80fd\uff0c\u4f8b\u5982\u591a\u4e91\u4e0e\u591a\u96c6\u7fa4\u7ba1\u7406\u3001Kubernetes \u8d44\u6e90\u7ba1\u7406\u3001DevOps\u3001\u5e94\u7528\u751f\u547d\u5468\u671f\u7ba1\u7406\u3001\u5fae\u670d\u52a1\u6cbb\u7406\uff08\u670d\u52a1\u7f51\u683c\uff09\u3001\u65e5\u5fd7\u67e5\u8be2\u4e0e\u6536\u96c6\u3001\u670d\u52a1\u4e0e\u7f51\u7edc\u3001\u591a\u79df\u6237\u7ba1\u7406\u3001\u76d1\u63a7\u544a\u8b66\u3001\u4e8b\u4ef6\u4e0e\u5ba1\u8ba1\u67e5\u8be2\u3001\u5b58\u50a8\u7ba1\u7406\u3001\u8bbf\u95ee\u6743\u9650\u63a7\u5236\u3001GPU \u652f\u6301\u3001\u7f51\u7edc\u7b56\u7565\u3001\u955c\u50cf\u4ed3\u5e93\u7ba1\u7406\u4ee5\u53ca\u5b89\u5168\u7ba1\u7406\u7b49\u3002"),(0,a.kt)("h2",{id:"apache-apisix-\u4ecb\u7ecd"},"Apache APISIX \u4ecb\u7ecd"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix"},"Apache APISIX")," \u662f\u4e00\u6b3e\u5f00\u6e90\u7684\u9ad8\u6027\u80fd\u3001\u52a8\u6001\u4e91\u539f\u751f\u7f51\u5173\uff0c\u7531\u6df1\u5733\u652f\u6d41\u79d1\u6280\u6709\u9650\u516c\u53f8\u4e8e 2019 \u5e74\u6350\u8d60\u7ed9 Apache \u57fa\u91d1\u4f1a\uff0c\u5f53\u524d\u5df2\u7ecf\u6210\u4e3a Apache \u57fa\u91d1\u4f1a\u7684\u9876\u7ea7\u5f00\u6e90\u9879\u76ee\uff0c\u4e5f\u662f GitHub \u4e0a\u6700\u6d3b\u8dc3\u7684\u7f51\u5173\u9879\u76ee\u3002Apache APISIX \u5f53\u524d\u5df2\u7ecf\u8986\u76d6\u4e86 API \u7f51\u5173\uff0cLB\uff0cKubernetes Ingress\uff0cService Mesh \u7b49\u591a\u79cd\u573a\u666f\u3002"),(0,a.kt)("h2",{id:"\u524d\u7f6e\u6761\u4ef6"},"\u524d\u7f6e\u6761\u4ef6"),(0,a.kt)("p",null,"\u5c06\u73b0\u6709 Kubernetes \u96c6\u7fa4\u5df2\u7eb3\u5165 KubeSphere \u7ba1\u7406\u3002"),(0,a.kt)("h2",{id:"\u90e8\u7f72-apache-apisix-\u548c-apache-apisix-ingress-controller"},"\u90e8\u7f72 Apache APISIX \u548c Apache APISIX Ingress Controller"),(0,a.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u53c2\u8003 KubeSphere \u7684\u6587\u6863\u542f\u7528 KubeSphere \u7684 ",(0,a.kt)("a",{parentName:"p",href:"https://kubesphere.io/docs/pluggable-components/app-store/"},"AppStore"),"\uff0c\u6216\u8005\u4f7f\u7528\u4f7f\u7528 Apache APISIX \u7684 ",(0,a.kt)("a",{parentName:"p",href:"https://charts.apiseven.com"},"Helm \u4ed3\u5e93"),"\u6765\u8fdb\u884c\u90e8\u7f72\u3002\u8fd9\u91cc\uff0c\u6211\u4eec\u76f4\u63a5\u4f7f\u7528 Apache APISIX \u7684 Helm \u4ed3\u5e93\u8fdb\u884c\u90e8\u7f72\u3002"),(0,a.kt)("p",null,"\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\u5373\u53ef\u6dfb\u52a0 Apache APISIX \u7684 Helm repo\uff0c\u5e76\u5b8c\u6210\u90e8\u7f72\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'\u279c  ~ helm repo add apisix https://charts.apiseven.com\n"apisix" has been added to your repositories\n\u279c  ~ helm repo add bitnami https://charts.bitnami.com/bitnami\n"bitnami" has been added to your repositories\n\u279c  ~ helm repo update\n\u279c  ~ kubectl create ns apisix\nnamespace/apisix created\n\u279c  ~ helm install apisix apisix/apisix --set gateway.type=NodePort --set ingress-controller.enabled=true --namespace apisix\nW0827 18:19:58.504653  294386 warnings.go:70] apiextensions.k8s.io/v1beta1 CustomResourceDefinition is deprecated in v1.16+, unavailable in v1.22+; use apiextensions.k8s.io/v1 CustomResourceDefinition\nNAME: apisix\nLAST DEPLOYED: Fri Aug 27 18:20:00 2021\nNAMESPACE: apisix\nSTATUS: deployed\nREVISION: 1\nTEST SUITE: None\nNOTES:\n1. Get the application URL by running these commands:\n  export NODE_PORT=$(kubectl get --namespace apisix -o jsonpath="{.spec.ports[0].nodePort}" services apisix-gateway)\n  export NODE_IP=$(kubectl get nodes --namespace apisix -o jsonpath="{.items[0].status.addresses[0].address}")\n  echo http://$NODE_IP:$NODE_PORT\n')),(0,a.kt)("p",null,"\u9a8c\u8bc1\u662f\u5426\u5df2\u7ecf\u6210\u529f\u90e8\u7f72\u4e14\u8fd0\u884c\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\u279c  ~ kubectl -n apisix get pods\nNAME                                         READY   STATUS    RESTARTS   AGE\napisix-77d7545d4d-cvdhs                      1/1     Running   0          4m7s\napisix-etcd-0                                1/1     Running   0          4m7s\napisix-etcd-1                                1/1     Running   0          4m7s\napisix-etcd-2                                1/1     Running   0          4m7s\napisix-ingress-controller-74c6b5fbdd-94ngk   1/1     Running   0          4m7s\n")),(0,a.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u76f8\u5173\u7684 Pod \u5747\u5df2\u6b63\u5e38\u8fd0\u884c\u3002"),(0,a.kt)("h2",{id:"\u90e8\u7f72\u793a\u4f8b\u9879\u76ee"},"\u90e8\u7f72\u793a\u4f8b\u9879\u76ee"),(0,a.kt)("p",null,"\u6211\u4eec\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"kennethreitz/httpbin")," \u4f5c\u4e3a\u793a\u4f8b\u9879\u76ee\u8fdb\u884c\u6f14\u793a\u3002\u8fd9\u91cc\u4e5f\u76f4\u63a5\u5728 KubeSphere \u4e2d\u5b8c\u6210\u90e8\u7f72\u3002"),(0,a.kt)("p",null,"\u9009\u62e9\u670d\u52a1 -- \u65e0\u72b6\u6001\u670d\u52a1\uff0c\u521b\u5efa\u5373\u53ef\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1630404138226-5475c163-d372-414e-af74-5c5a86f19629.png",alt:"KubeSphere APISIX Ingress Controller demo"})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1630404173444-9bb73e0d-5bee-428e-a257-4685500344ef.png",alt:"KubeSphere APISIX Ingress Controller demo"})),(0,a.kt)("p",null,"\u5728 KubeSphere \u7684\u670d\u52a1\u548c\u8d1f\u8f7d\u754c\u9762\u5373\u53ef\u770b\u5230\u90e8\u7f72\u6210\u529f\uff0c\u4e5f\u53ef\u4ee5\u76f4\u63a5\u5728\u7ec8\u7aef\u4e0b\u67e5\u770b\u662f\u5426\u5df2\u7ecf\u90e8\u7f72\u6210\u529f\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\u279c  ~ kubectl get pods,svc -l app=httpbin\nNAME                             READY   STATUS    RESTARTS   AGE\npod/httpbin-v1-7d6dc7d5f-5lcmg   1/1     Running   0          48s\n\nNAME              TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE\nservice/httpbin   ClusterIP   10.96.0.5    <none>        80/TCP    48s\n")),(0,a.kt)("h2",{id:"\u4f7f\u7528-apache-apisix-\u4f5c\u4e3a\u7f51\u5173\u4ee3\u7406"},"\u4f7f\u7528 Apache APISIX \u4f5c\u4e3a\u7f51\u5173\u4ee3\u7406"),(0,a.kt)("p",null,"\u6211\u4eec\u5148\u6f14\u793a\u5982\u4f55\u4f7f\u7528 Apache APISIX \u4f5c\u4e3a\u7f51\u5173\u4ee3\u7406 Kubernetes \u96c6\u7fa4\u4e2d\u7684\u670d\u52a1\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'root@apisix:~$ kubectl -n apisix exec -it `kubectl -n apisix get pods -l app.kubernetes.io/name=apisix -o name` -- bash\nbash-5.1# curl httpbin.default/get\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.default",\n    "User-Agent": "curl/7.77.0"\n  },\n  "origin": "10.244.2.9",\n  "url": "http://httpbin.default/get"\n}\n')),(0,a.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u5728 Apache APISIX \u7684 Pod \u5185\u53ef\u6b63\u5e38\u8bbf\u95ee\u793a\u4f8b\u9879\u76ee\u3002\u63a5\u4e0b\u6765\u4f7f\u7528 Apache APISIX \u5bf9\u8be5\u793a\u4f8b\u9879\u76ee\u8fdb\u884c\u4ee3\u7406\u3002"),(0,a.kt)("p",null,"\u8fd9\u91cc\u6211\u4eec\u4f7f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"curl")," \u8c03\u7528 Apache APISIX \u7684 admin \u63a5\u53e3\uff0c\u521b\u5efa\u4e00\u6761\u8def\u7531\u3002\u5c06\u6240\u6709 host \u5934\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"httpbin.org")," \u7684\u8bf7\u6c42\u8f6c\u53d1\u7ed9 ",(0,a.kt)("inlineCode",{parentName:"p"},"httpbin.default:80")," \u8fd9\u4e2a\u5b9e\u9645\u7684\u5e94\u7528\u670d\u52a1\u4e0a\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'bash-5.1# curl "http://127.0.0.1:9180/apisix/admin/routes/1" -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -X PUT -d \'\n{\n  "uri": "/get",\n  "host": "httpbin.org",\n  "upstream": {\n    "type": "roundrobin",\n    "nodes": {\n      "httpbin.default:80": 1\n    }\n  }\n}\'\n{"node":{"key":"\\/apisix\\/routes\\/1","value":{"host":"httpbin.org","update_time":1630060883,"uri":"\\/*","create_time":1630060883,"priority":0,"upstream":{"type":"roundrobin","pass_host":"pass","nodes":{"httpbin.default:80":1},"hash_on":"vars","scheme":"http"},"id":"1","status":1}},"action":"set"}\n')),(0,a.kt)("p",null,"\u4f60\u4f1a\u5f97\u5230\u7c7b\u4f3c\u4e0a\u9762\u7684\u8f93\u51fa\uff0c\u63a5\u4e0b\u6765\u9a8c\u8bc1\u662f\u5426\u4ee3\u7406\u6210\u529f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'bash-5.1# curl http://127.0.0.1:9080/get -H "HOST: httpbin.org"\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.org",\n    "User-Agent": "curl/7.77.0",\n    "X-Forwarded-Host": "httpbin.org"\n  },\n  "origin": "127.0.0.1",\n  "url": "http://httpbin.org/get"\n}\n')),(0,a.kt)("p",null,"\u5f97\u5230\u4e0a\u9762\u7684\u8f93\u51fa\uff0c\u8bf4\u660e\u5df2\u7ecf\u901a\u8fc7 Apache APISIX \u4ee3\u7406\u4e86\u793a\u4f8b\u9879\u76ee\u7684\u6d41\u91cf\u3002\u63a5\u4e0b\u6765\u6211\u4eec\u8bd5\u8bd5\u5728\u96c6\u7fa4\u5916\u901a\u8fc7 Apache APISIX \u8bbf\u95ee\u793a\u4f8b\u9879\u76ee\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"root@apisix:~$ kubectl  -n apisix get svc -l app.kubernetes.io/name=apisix\nNAME             TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE\napisix-admin     ClusterIP   10.96.33.97    <none>        9180/TCP       22m\napisix-gateway   NodePort    10.96.126.83   <none>        80:31441/TCP   22m\n")),(0,a.kt)("p",null,"\u5728\u4f7f\u7528 Helm chart \u90e8\u7f72\u7684\u65f6\u5019\uff0c\u9ed8\u8ba4\u4f1a\u5c06 Apache APISIX \u7684\u7aef\u53e3\u901a\u8fc7 NodePort \u7684\u5f62\u5f0f\u66b4\u9732\u51fa\u53bb\u3002\u6211\u4eec\u4f7f\u7528 Node IP + NodePort \u7684\u7aef\u53e3\u8fdb\u884c\u8bbf\u95ee\u6d4b\u8bd5\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'root@apisix:~$ curl http://172.18.0.5:31441/get -H "HOST: httpbin.org"\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.org",\n    "User-Agent": "curl/7.76.1",\n    "X-Forwarded-Host": "httpbin.org"\n  },\n  "origin": "10.244.2.1",\n  "url": "http://httpbin.org/get"\n}\n')),(0,a.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0c",(0,a.kt)("strong",{parentName:"p"},"\u5728\u96c6\u7fa4\u5916\u5df2\u7ecf\u53ef\u4ee5\u901a\u8fc7 Apache APISIX \u4f5c\u4e3a\u7f51\u5173\u4ee3\u7406 Kubernetes \u96c6\u7fa4\u5185\u7684\u670d\u52a1\u4e86\u3002")),(0,a.kt)("h2",{id:"\u4f7f\u7528-apisix-ingress-controller-\u4ee3\u7406\u670d\u52a1"},"\u4f7f\u7528 APISIX Ingress Controller \u4ee3\u7406\u670d\u52a1"),(0,a.kt)("p",null,"\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u5728 KubeSphere \u4e2d\u6dfb\u52a0\u5e94\u7528\u8def\u7531\uff08Ingress\uff09\uff0cApache APISIX Ingress Controller \u4f1a\u81ea\u52a8\u5c06\u8def\u7531\u89c4\u5219\u540c\u6b65\u81f3 Apache APISIX \u4e2d\uff0c\u5b8c\u6210\u670d\u52a1\u7684\u4ee3\u7406\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1630404265190-585b9b09-72d5-4320-b0fe-9cf8a73c55ea.png",alt:"KubeSphere APISIX Ingress Controller demo"})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1630404325747-b92928dc-2c6b-4574-a49d-32b6bcb187f9.png",alt:"KubeSphere APISIX Ingress Controller demo"})),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u6ce8\u610f"),"\u6211\u4eec\u6dfb\u52a0\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"kubernetes.io/ingress.class: apisix")," \u7684 annotation \u914d\u7f6e\uff0c\u7528\u4e8e\u652f\u6301\u96c6\u7fa4\u5185\u591a ingress-controller \u7684\u573a\u666f\u3002"),(0,a.kt)("p",null,"\u4fdd\u5b58\u540e\uff0c\u53ef\u770b\u5230\u5982\u4e0b\u754c\u9762\uff1a"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://static.apiseven.com/202108/1630404366474-dfe8ae08-f16d-417f-8ef3-3495ebda0f7d.png",alt:"KubeSphere APISIX Ingress Controller demo"})),(0,a.kt)("p",null,"\u5728\u7ec8\u7aef\u4e0b\u6d4b\u8bd5\u662f\u5426\u4ee3\u7406\u6210\u529f\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'root@apisix:~$ curl http://172.18.0.5:31441/get -H "HOST: http-ing.org"  {  "args": {},   "headers": {    "Accept": "*/*",     "Host": "http-ing.org",     "User-Agent": "curl/7.76.1",     "X-Forwarded-Host": "http-ing.org"  },   "origin": "10.244.2.1",   "url": "http://http-ing.org/get"}\n')),(0,a.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u4e5f\u6b63\u5e38\u4ee3\u7406\u4e86\u3002"),(0,a.kt)("p",null,"\u9664\u4e86\u4ee5\u4e0a\u65b9\u5f0f\u5916\uff0cApache APISIX Ingress Controller \u901a\u8fc7 CRD \u7684\u65b9\u5f0f\u5bf9 Kubernetes \u8fdb\u884c\u4e86\u6269\u5c55\uff0c\u4f60\u4e5f\u53ef\u4ee5\u901a\u8fc7\u53d1\u5e03 ",(0,a.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," \u7b49\u8fd9\u79cd\u81ea\u5b9a\u4e49\u8d44\u6e90\u6765\u5b8c\u6210 Kubernetes \u4e2d\u670d\u52a1\u7684\u5bf9\u5916\u66b4\u9732\u3002"),(0,a.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,a.kt)("p",null,"\u4f60\u53ef\u4ee5\u5728 KubeSphere \u4e2d\u4f7f\u7528 Apache APISIX \u7684\u5b98\u65b9 Helm \u4ed3\u5e93\u76f4\u63a5\u90e8\u7f72 Apache APISIX \u548c APISIX Ingress Controller \u3002\u5e76\u4e14 Apache APISIX \u53ef\u901a\u8fc7\u4f5c\u4e3a\u7f51\u5173\uff0c\u6216\u8005 APISIX Ingress Controller \u7684\u6570\u636e\u9762\u6765\u627f\u8f7d\u4e1a\u52a1\u6d41\u91cf\u3002"),(0,a.kt)("h2",{id:"\u672a\u6765\u5c55\u671b"},"\u672a\u6765\u5c55\u671b"),(0,a.kt)("p",null,"Apache APISIX \u5df2\u7ecf\u4e0e KubeSphere \u793e\u533a\u8fbe\u6210\u5408\u4f5c\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u5728 KubeSphere \u81ea\u5e26\u7684\u5e94\u7528\u4ed3\u5e93\u4e2d\u627e\u5230 Apache APISIX \uff0c\u4e0d\u9700\u8981\u624b\u52a8\u6dfb\u52a0 Helm \u4ed3\u5e93\u3002"))}u.isMDXComponent=!0}}]);