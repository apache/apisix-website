"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[64954],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>h});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=a.createContext({}),p=function(e){var n=a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=p(e.components);return a.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(t),h=r,d=m["".concat(l,".").concat(h)]||m[h]||u[h]||i;return t?a.createElement(d,s(s({ref:n},c),{},{components:t})):a.createElement(d,s({ref:n},c))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,s=new Array(i);s[0]=m;var o={};for(var l in n)hasOwnProperty.call(n,l)&&(o[l]=n[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var p=2;p<i;p++)s[p]=t[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},51394:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>s,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var a=t(87462),r=(t(67294),t(3905));const i={title:"Using External Services In ApisixUpstream"},s=void 0,o={unversionedId:"tutorials/external-service",id:"version-1.6.1/tutorials/external-service",isDocsHomePage:!1,title:"Using External Services In ApisixUpstream",description:"In this tutorial, we will introduce how to configure external services in the ApisixUpstream resources.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.6.1/tutorials/external-service.md",sourceDirName:"tutorials",slug:"/tutorials/external-service",permalink:"/zh/docs/ingress-controller/1.6.1/tutorials/external-service",editUrl:"/zh/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.6.1/docs/zh/latest/tutorials/external-service.md",tags:[],version:"1.6.1",frontMatter:{title:"Using External Services In ApisixUpstream"},sidebar:"version-1.6.1/docs",previous:{title:"How to use go-plugin-runner with APISIX Ingress",permalink:"/zh/docs/ingress-controller/1.6.1/tutorials/how-to-use-go-plugin-runner-in-apisix-ingress"},next:{title:"Using External Services Discovery In ApisixUpstream",permalink:"/zh/docs/ingress-controller/1.6.1/tutorials/external-service-discovery"}},l=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Introduction",id:"introduction",children:[]},{value:"External Domain Upstream",id:"external-domain-upstream",children:[]},{value:"External Name Service Upstream",id:"external-name-service-upstream",children:[]},{value:"Domain In External Name Service",id:"domain-in-external-name-service",children:[]}],p={toc:l};function c(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"In this tutorial, we will introduce how to configure external services in the ApisixUpstream resources."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"an available Kubernetes cluster"),(0,r.kt)("li",{parentName:"ul"},"an available APISIX and APISIX Ingress Controller installation")),(0,r.kt)("p",null,"We assume that your APISIX is installed in the ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix")," namespace."),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"APISIX ingress supports configuring external services as backends, both for K8s external name services and direct domains.\nIn this case, we don't configure the ",(0,r.kt)("inlineCode",{parentName:"p"},"backends")," field in the ApisixRoute resource. Instead, we will use the ",(0,r.kt)("inlineCode",{parentName:"p"},"upstreams")," field to refer to an ApisixUpstream resources with the ",(0,r.kt)("inlineCode",{parentName:"p"},"externalNodes")," field configured."),(0,r.kt)("p",null,"For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"# httpbin-route.yaml\napiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - local.httpbin.org\n      paths:\n      - /*\n    # backends:  # We won't use the `backends` field\n    #    - serviceName: httpbin\n    #      servicePort: 80\n    upstreams:\n    - name: httpbin-upstream\n")),(0,r.kt)("p",null,"This configuration tells the ingress controller not to resolve upstream hosts through the K8s services, but to use the configuration defined in the referenced ApisixUpstream.\nThe referenced ApisixUpstream ",(0,r.kt)("em",{parentName:"p"},"MUST")," have ",(0,r.kt)("inlineCode",{parentName:"p"},"externalNodes")," field configured. For example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"# httpbin-upstream.yaml\napiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin-upstream\nspec:\n  externalNodes:\n  - type: Domain\n    name: httpbin.org\n")),(0,r.kt)("p",null,"In this yaml example, we configured ",(0,r.kt)("inlineCode",{parentName:"p"},"httpbin.org")," as the backend. The type ",(0,r.kt)("inlineCode",{parentName:"p"},"Domain")," indicates that this is a third-party service, and any domain name is supported here."),(0,r.kt)("p",null,"If you want to use an external name service in the K8s cluster, the type should be ",(0,r.kt)("inlineCode",{parentName:"p"},"Service")," and the name should be the service name. By configuring ApisixUpstream with type ",(0,r.kt)("inlineCode",{parentName:"p"},"Service"),", the ingress controller will automatically keep track of the content of the external name service and its changes."),(0,r.kt)("h2",{id:"external-domain-upstream"},"External Domain Upstream"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - local.httpbin.org\n      paths:\n      - /*\n    upstreams:\n    - name: httpbin-upstream\n---\napiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin-upstream\nspec:\n  externalNodes:\n  - type: Domain\n    name: httpbin.org\n")),(0,r.kt)("p",null,"After applying the above configuration, we can try to access ",(0,r.kt)("inlineCode",{parentName:"p"},"httpbin.org")," directly through APISIX."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl exec -it -n apisix APISIX_POD_NAME -- curl -i -H "Host: local.httpbin.org" http://127.0.0.1:9080/get\n')),(0,r.kt)("p",null,"If everything works, you will see the result like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 321\nConnection: keep-alive\nDate: Thu, 15 Dec 2022 10:47:30 GMT\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nServer: APISIX/3.0.0\n\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "local.httpbin.org",\n    "User-Agent": "curl/7.29.0",\n    "X-Amzn-Trace-Id": "Root=xxxxx",\n    "X-Forwarded-Host": "local.httpbin.org"\n  },\n  "origin": "127.0.0.1, xxxxxxxxx",\n  "url": "http://local.httpbin.org/get"\n}\n')),(0,r.kt)("p",null,"The header ",(0,r.kt)("inlineCode",{parentName:"p"},"Server: APISIX/3.0.0")," indicates that the request is sent from APISIX."),(0,r.kt)("h2",{id:"external-name-service-upstream"},"External Name Service Upstream"),(0,r.kt)("p",null,"Let's deploy a simple httpbin app in the namespace ",(0,r.kt)("inlineCode",{parentName:"p"},"test")," as the backend for the external name service we will create later."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"kubectl create ns test\nkubectl -n test run httpbin --image-pull-policy IfNotPresent --image=kennethreitz/httpbin --port 80\nkubectl -n test expose pod/httpbin --port 80\n")),(0,r.kt)("p",null,"Then use the following configuration to create an external name service in the ",(0,r.kt)("inlineCode",{parentName:"p"},"apisix")," namespace."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: ext-httpbin\nspec:\n  type: ExternalName\n  externalName: httpbin.test.svc\n")),(0,r.kt)("p",null,"Now we can create an external name service ApisixRoute and ApisixUpstream."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: ext-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - ext.httpbin.org\n      paths:\n      - /*\n    upstreams:\n    - name: ext-upstream\n---\napiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: ext-upstream\nspec:\n  externalNodes:\n  - type: Service\n    name: ext-httpbin\n")),(0,r.kt)("p",null,"Once the configurations is synced, try to access it with the following command."),(0,r.kt)("p",null,"The only argument that changes is the header we pass."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'kubectl exec -it -n apisix APISIX_POD_NAME -- curl -i -H "Host: ext.httpbin.org" http://127.0.0.1:9080/get\n')),(0,r.kt)("p",null,"The output should be like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-text"},'HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 234\nConnection: keep-alive\nDate: Thu, 15 Dec 2022 10:54:21 GMT\nAccess-Control-Allow-Origin: *\nAccess-Control-Allow-Credentials: true\nServer: APISIX/3.0.0\n\n{\n  "args": {},\n  "headers": {\n    "Accept": "*/*",\n    "Host": "ext.httpbin.org",\n    "User-Agent": "curl/7.29.0",\n    "X-Forwarded-Host": "ext.httpbin.org"\n  },\n  "origin": "127.0.0.1",\n  "url": "http://ext.httpbin.org/get"\n}\n')),(0,r.kt)("h2",{id:"domain-in-external-name-service"},"Domain In External Name Service"),(0,r.kt)("p",null,"The external name service can also hold any domain name outside of the K8s cluster."),(0,r.kt)("p",null,"Let's update the external service configuration we applied in the previous section."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: v1\nkind: Service\nmetadata:\n  name: ext-httpbin\nspec:\n  type: ExternalName\n  externalName: httpbin.org\n")),(0,r.kt)("p",null,"Try accessing it again, and the output should contain multiple ",(0,r.kt)("inlineCode",{parentName:"p"},"origin"),", and an ",(0,r.kt)("inlineCode",{parentName:"p"},"X-Amzn-Trace-Id")," header, which means we are accessing the actual online ",(0,r.kt)("inlineCode",{parentName:"p"},"httpbin.org")," service."))}c.isMDXComponent=!0}}]);