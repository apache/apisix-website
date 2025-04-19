"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[56331],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),h=p(r),d=i,m=h["".concat(l,".").concat(d)]||h[d]||u[d]||o;return r?n.createElement(m,a(a({ref:t},c),{},{components:r})):n.createElement(m,a({ref:t},c))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var p=2;p<o;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}h.displayName="MDXCreateElement"},51393:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var n=r(87462),i=(r(67294),r(3905));const o={title:"Proxy the httpbin service"},a=void 0,s={unversionedId:"tutorials/proxy-the-httpbin-service",id:"version-1.6.1/tutorials/proxy-the-httpbin-service",isDocsHomePage:!1,title:"Proxy the httpbin service",description:"This document explains how apisix-ingress-controller guides Apache APISIX routes traffic to httpbin service correctly.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.6.1/tutorials/proxy-the-httpbin-service.md",sourceDirName:"tutorials",slug:"/tutorials/proxy-the-httpbin-service",permalink:"/zh/docs/ingress-controller/1.6.1/tutorials/proxy-the-httpbin-service",editUrl:"/zh/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.6.1/docs/zh/latest/tutorials/proxy-the-httpbin-service.md",tags:[],version:"1.6.1",frontMatter:{title:"Proxy the httpbin service"},sidebar:"version-1.6.1/docs",previous:{title:"Configuring Ingress with Kubernetes Ingress resource",permalink:"/zh/docs/ingress-controller/1.6.1/tutorials/proxy-the-httpbin-service-with-ingress"},next:{title:"How to proxy the gRPC service",permalink:"/zh/docs/ingress-controller/1.6.1/tutorials/proxy-grpc-service"}},l=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Deploy httpbin service",id:"deploy-httpbin-service",children:[]},{value:"Resource Delivery",id:"resource-delivery",children:[]},{value:"Test",id:"test",children:[]}],p={toc:l};function c(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This document explains how apisix-ingress-controller guides Apache APISIX routes traffic to httpbin service correctly."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Prepare an available Kubernetes cluster in your workstation, we recommend you to use ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/kubernetes/minikube"},"Minikube"),"."),(0,i.kt)("li",{parentName:"ul"},"Install Apache APISIX in Kubernetes by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-helm-chart"},"Helm Chart"),"."),(0,i.kt)("li",{parentName:"ul"},"Install ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller/blob/master/install.md"},"apisix-ingress-controller"),".")),(0,i.kt)("h2",{id:"deploy-httpbin-service"},"Deploy httpbin service"),(0,i.kt)("p",null,"We use ",(0,i.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/kennethreitz/httpbin/"},"kennethreitz/httpbin")," as the service image, See its overview page for details."),(0,i.kt)("p",null,"Now, try to deploy it to your Kubernetes cluster:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl run httpbin --image kennethreitz/httpbin --port 80\nkubectl expose pod httpbin --port 80\n")),(0,i.kt)("h2",{id:"resource-delivery"},"Resource Delivery"),(0,i.kt)("p",null,"In order to let Apache APISIX proxies requests to httpbin, we need to create an ",(0,i.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," resource, if you're not familiar with it, see the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/blob/master/samples/deploy/crd/v1/ApisixRoute.yaml"},"reference")," for the details."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"# httpbin-route.yaml\napiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpserver-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - local.httpbin.org\n      paths:\n      - /*\n    backends:\n       - serviceName: httpbin\n         servicePort: 80\n")),(0,i.kt)("p",null,"The YAML snippet shows a simple ",(0,i.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," configuration, which tells Apache APISIX to route all requests with Host ",(0,i.kt)("inlineCode",{parentName:"p"},"local.httpbin.org")," to the ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin")," service.\nNow try to create it."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f httpbin-route.yaml\n")),(0,i.kt)("h2",{id:"test"},"Test"),(0,i.kt)("p",null,"Run curl call in one of Apache APISIX Pods to check whether the resource was delivered to it. Note you should replace the value of ",(0,i.kt)("inlineCode",{parentName:"p"},"--default-apisix-cluster-admin-key")," to the real ",(0,i.kt)("inlineCode",{parentName:"p"},"admin_key")," value in your Apache APISIX cluster."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl exec -it -n ${namespace of Apache APISIX} ${Pod name of Apache APISIX} -- curl http://127.0.0.1:9180/apisix/admin/routes -H 'X-API-Key: edd1c9f034335f136f87ad84b625c8f1'\n")),(0,i.kt)("p",null,"And request to Apache APISIX to verify the route."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl exec -it -n ${namespace of Apache APISIX} ${Pod name of Apache APISIX} -- curl http://127.0.0.1:9080/headers -H 'Host: local.httpbin.org'\n")),(0,i.kt)("p",null,"In case of success, you'll see a JSON string which contains all requests headers carried by ",(0,i.kt)("inlineCode",{parentName:"p"},"curl")," like:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.org",\n    "User-Agent": "curl/7.64.1",\n    "X-Amzn-Trace-Id": "Root=1-5ffc3273-2928e0844e19c9810d1bbd8a"\n  }\n}\n')))}c.isMDXComponent=!0}}]);