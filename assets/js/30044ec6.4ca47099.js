"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[22442],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),g=p(r),h=i,d=g["".concat(l,".").concat(h)]||g[h]||u[h]||o;return r?n.createElement(d,s(s({ref:t},c),{},{components:r})):n.createElement(d,s({ref:t},c))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,s=new Array(o);s[0]=g;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var p=2;p<o;p++)s[p]=r[p];return n.createElement.apply(null,s)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},98105:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>s,default:()=>c,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var n=r(87462),i=(r(67294),r(3905));const o={title:"Configuring Ingress with APISIX CRDs",keywords:["APISIX Ingress","Apache APISIX","Kubernetes Ingress","APISIX CRDs"],description:"A tutorial on configuring Ingress using APISIX Custom Resource Definitions (CRDs)."},s=void 0,a={unversionedId:"tutorials/proxy-the-httpbin-service",id:"version-1.7.0/tutorials/proxy-the-httpbin-service",isDocsHomePage:!1,title:"Configuring Ingress with APISIX CRDs",description:"A tutorial on configuring Ingress using APISIX Custom Resource Definitions (CRDs).",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.7.0/tutorials/proxy-the-httpbin-service.md",sourceDirName:"tutorials",slug:"/tutorials/proxy-the-httpbin-service",permalink:"/docs/ingress-controller/1.7.0/tutorials/proxy-the-httpbin-service",editUrl:"/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.7.0/docs/en/latest/tutorials/proxy-the-httpbin-service.md",tags:[],version:"1.7.0",frontMatter:{title:"Configuring Ingress with APISIX CRDs",keywords:["APISIX Ingress","Apache APISIX","Kubernetes Ingress","APISIX CRDs"],description:"A tutorial on configuring Ingress using APISIX Custom Resource Definitions (CRDs)."},sidebar:"version-1.7.0/docs",previous:{title:"Configuring Ingress with Kubernetes Gateway API",permalink:"/docs/ingress-controller/1.7.0/tutorials/configure-ingress-with-gateway-api"},next:{title:"How to proxy the gRPC service",permalink:"/docs/ingress-controller/1.7.0/tutorials/proxy-grpc-service"}},l=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Deploy httpbin",id:"deploy-httpbin",children:[]},{value:"Configuring Ingress",id:"configuring-ingress",children:[]},{value:"Test the created Routes",id:"test-the-created-routes",children:[]}],p={toc:l};function c(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This tutorial walks through configuring APISIX Ingress with ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/concepts/apisix_route"},"APISIX Custom Resource Definitions (CRDs)"),"."),(0,i.kt)("p",null,"Also see:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/tutorials/configure-ingress-with-gateway-api"},"Configuring Ingress with Kubernetes Gateway API")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/tutorials/proxy-the-httpbin-service-with-ingress"},"Configuring Ingress with Kubernetes Ingress resource"))),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("p",null,"Before you move on, make sure you:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Have access to a Kubernetes cluster. This tutorial uses ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/kubernetes/minikube"},"minikube"),"."),(0,i.kt)("li",{parentName:"ol"},"Install APISIX Ingress. See the ",(0,i.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/minikube"},"Installation")," section.")),(0,i.kt)("h2",{id:"deploy-httpbin"},"Deploy httpbin"),(0,i.kt)("p",null,"We will deploy a sample service, ",(0,i.kt)("a",{parentName:"p",href:"https://hub.docker.com/r/kennethreitz/httpbin/"},"kennethreitz/httpbin"),", for this tutorial."),(0,i.kt)("p",null,"You can deploy it to your Kubernetes cluster by running:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl run httpbin --image kennethreitz/httpbin --port 80\nkubectl expose pod httpbin --port 80\n")),(0,i.kt)("h2",{id:"configuring-ingress"},"Configuring Ingress"),(0,i.kt)("p",null,"We can configure the Ingress using an ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/references/apisix_route_v2"},"ApisixRoute")," resource. The example below configures APISIX to route requests to the httpbin service:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="httpbin-ingress.yaml"',title:'"httpbin-ingress.yaml"'},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpserver-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - local.httpbin.org\n      paths:\n      - /*\n    backends:\n       - serviceName: httpbin\n         servicePort: 80\n")),(0,i.kt)("p",null,"This configuration will route all requests with host ",(0,i.kt)("inlineCode",{parentName:"p"},"local.httpbin.org")," to the httpbin service."),(0,i.kt)("p",null,"You can apply it by running:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f httpbin-ingress.yaml\n")),(0,i.kt)("h2",{id:"test-the-created-routes"},"Test the created Routes"),(0,i.kt)("p",null,"If you followed along and used minikube and ",(0,i.kt)("inlineCode",{parentName:"p"},"NodePort")," service to expose APISIX, you can access it through the Node IP of the service ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix-gateway"),". If the Node IP is not reachable directly (if you are on Darwin, Windows, or WSL), you can create a tunnel to access the service on your machine:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"minikube service apisix-gateway --url -n ingress-apisix\n")),(0,i.kt)("p",null,"Now, you can send a ",(0,i.kt)("inlineCode",{parentName:"p"},"GET")," request to the created Route and it will be Routed to the httpbin service:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'curl --location --request GET "localhost:57687/get?foo1=bar1&foo2=bar2" -H "Host: local.httpbin.org"\n')),(0,i.kt)("p",null,"You will receive a response similar to:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="output"',title:'"output"'},'{\n  "args": {\n    "foo1": "bar1", \n    "foo2": "bar2"\n  }, \n  "headers": {\n    "Accept": "*/*", \n    "Host": "local.httpbin.org", \n    "User-Agent": "curl/7.84.0", \n    "X-Forwarded-Host": "local.httpbin.org"\n  }, \n  "origin": "172.17.0.1", \n  "url": "http://local.httpbin.org/get?foo1=bar1&foo2=bar2"\n}\n')))}c.isMDXComponent=!0}}]);