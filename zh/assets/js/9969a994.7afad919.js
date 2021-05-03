(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{183:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return o})),r.d(t,"toc",(function(){return p})),r.d(t,"default",(function(){return s}));var n=r(3),i=r(8),a=(r(0),r(270)),c={title:"Proxy the httpbin service"},o={unversionedId:"practices/proxy-the-httpbin-service",id:"practices/proxy-the-httpbin-service",isDocsHomePage:!1,title:"Proxy the httpbin service",description:"\x3c!--",source:"@site/docs/apisix-ingress-controller/practices/proxy-the-httpbin-service.md",slug:"/practices/proxy-the-httpbin-service",permalink:"/zh/docs/ingress-controller/practices/proxy-the-httpbin-service",editUrl:"https://github.com/apache/apisix-ingress-controller/edit/master/docs/zh/latest/practices/proxy-the-httpbin-service.md",version:"current",sidebar:"docs",previous:{title:"Proxy the httpbin service with Ingress",permalink:"/zh/docs/ingress-controller/practices/proxy-the-httpbin-service-with-ingress"},next:{title:"Install Ingress APISIX on ACK",permalink:"/zh/docs/ingress-controller/deployments/ack"}},p=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Deploy httpbin service",id:"deploy-httpbin-service",children:[]},{value:"Resource Delivery",id:"resource-delivery",children:[]},{value:"Test",id:"test",children:[]}],l={toc:p};function s(e){var t=e.components,r=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"This document explains how apisix-ingress-controller guides Apache APISIX routes traffic to httpbin service correctly."),Object(a.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Prepare an available Kubernetes cluster in your workstation, we recommend you to use ",Object(a.b)("a",{parentName:"li",href:"https://github.com/kubernetes/minikube"},"Minikube"),"."),Object(a.b)("li",{parentName:"ul"},"Install Apache APISIX in Kubernetes by ",Object(a.b)("a",{parentName:"li",href:"https://github.com/apache/apisix-helm-chart"},"Helm Chart"),"."),Object(a.b)("li",{parentName:"ul"},"Install ",Object(a.b)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller/blob/master/install.md"},"apisix-ingress-controller"),".")),Object(a.b)("h2",{id:"deploy-httpbin-service"},"Deploy httpbin service"),Object(a.b)("p",null,"We use ",Object(a.b)("a",{parentName:"p",href:"https://hub.docker.com/r/kennethreitz/httpbin/"},"kennethreitz/httpbin")," as the service image, See its overview page for details."),Object(a.b)("p",null,"Now, try to deploy it to your Kubernetes cluster:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"kubectl run httpbin --image kennethreitz/httpbin --port 80\nkubectl expose pod httpbin --port 80\n")),Object(a.b)("h2",{id:"resource-delivery"},"Resource Delivery"),Object(a.b)("p",null,"In order to let Apache APISIX proxies requests to httpbin, we need to create an ",Object(a.b)("inlineCode",{parentName:"p"},"ApisixRoute")," resource, if you're not familiar with it, see the ",Object(a.b)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/blob/master/samples/deploy/crd/v1beta1/ApisixRoute.yaml"},"reference")," for the details."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-yaml"},"# httpbin-route.yaml\napiVersion: apisix.apache.org/v1\nkind: ApisixRoute\nmetadata:\n  name: httpserver-route\nspec:\n  rules:\n  - host: local.httpbin.org\n    http:\n      paths:\n      - backend:\n          serviceName: httpbin\n          servicePort: 80\n        path: /*\n")),Object(a.b)("p",null,"The YAML snippet shows a simple ",Object(a.b)("inlineCode",{parentName:"p"},"ApisixRoute")," configuration, which tells Apache APISIX to route all requests with Host ",Object(a.b)("inlineCode",{parentName:"p"},"local.httpbin.org")," to the ",Object(a.b)("inlineCode",{parentName:"p"},"httpbin")," service.\nNow try to create it."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"kubectl apply -f httpbin-route.yaml\n")),Object(a.b)("h2",{id:"test"},"Test"),Object(a.b)("p",null,"Run curl call in one of Apache APISIX Pods to check whether the resource was delivered to it. Note you should replace the value of ",Object(a.b)("inlineCode",{parentName:"p"},"--apisix-admin-key")," to the real ",Object(a.b)("inlineCode",{parentName:"p"},"admin_key")," value in your Apache APISIX cluster."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"kubectl exec -it -n ${namespace of Apache APISIX} ${Pod name of Apache APISIX} -- curl http://127.0.0.1:9180/apisix/admin/routes -H 'X-API-Key: edd1c9f034335f136f87ad84b625c8f1'\n")),Object(a.b)("p",null,"And request to Apache APISIX to verify the route."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-shell"},"kubectl exec -it -n ${namespace of Apache APISIX} ${Pod name of Apache APISIX} -- curl http://127.0.0.1:9080/headers -H 'Host: local.httpbin.org'\n")),Object(a.b)("p",null,"In case of success, you'll see a JSON string which contains all requests headers carried by ",Object(a.b)("inlineCode",{parentName:"p"},"curl")," like:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-json"},'{\n  "headers": {\n    "Accept": "*/*",\n    "Host": "httpbin.org",\n    "User-Agent": "curl/7.64.1",\n    "X-Amzn-Trace-Id": "Root=1-5ffc3273-2928e0844e19c9810d1bbd8a"\n  }\n}\n')))}s.isMDXComponent=!0},270:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return d}));var n=r(0),i=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=i.a.createContext({}),s=function(e){var t=i.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},b=function(e){var t=s(e.components);return i.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},h=i.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),b=s(r),h=n,d=b["".concat(c,".").concat(h)]||b[h]||u[h]||a;return r?i.a.createElement(d,o(o({ref:t},l),{},{components:r})):i.a.createElement(d,o({ref:t},l))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,c=new Array(a);c[0]=h;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:n,c[1]=o;for(var l=2;l<a;l++)c[l]=r[l];return i.a.createElement.apply(null,c)}return i.a.createElement.apply(null,r)}h.displayName="MDXCreateElement"}}]);