"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[72132],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),h=c(n),m=r,u=h["".concat(p,".").concat(m)]||h[m]||d[m]||i;return n?a.createElement(u,s(s({ref:t},l),{},{components:n})):a.createElement(u,s({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=h;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,s[1]=o;for(var c=2;c<i;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},84895:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>l,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"ApisixUpstream",keywords:["APISIX ingress","Apache APISIX","ApisixUpstream"],description:"Guide to using ApisixUpstream custom Kubernetes resource."},s=void 0,o={unversionedId:"concepts/apisix_upstream",id:"version-1.8.0/concepts/apisix_upstream",isDocsHomePage:!1,title:"ApisixUpstream",description:"Guide to using ApisixUpstream custom Kubernetes resource.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.8.0/concepts/apisix_upstream.md",sourceDirName:"concepts",slug:"/concepts/apisix_upstream",permalink:"/docs/ingress-controller/concepts/apisix_upstream",editUrl:"/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.8.0/docs/en/latest/concepts/apisix_upstream.md",tags:[],version:"1.8.0",frontMatter:{title:"ApisixUpstream",keywords:["APISIX ingress","Apache APISIX","ApisixUpstream"],description:"Guide to using ApisixUpstream custom Kubernetes resource."},sidebar:"version-1.8.0/docs",previous:{title:"ApisixRoute",permalink:"/docs/ingress-controller/concepts/apisix_route"},next:{title:"ApisixTls",permalink:"/docs/ingress-controller/concepts/apisix_tls"}},p=[{value:"Load balancing",id:"load-balancing",children:[]},{value:"Health check",id:"health-check",children:[]},{value:"Retries and timeouts",id:"retries-and-timeouts",children:[]},{value:"Port-level settings",id:"port-level-settings",children:[]}],c={toc:p};function l(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"ApisixUpstream")," is a Kubernetes CRD object that abstracts out a Kubernetes service and makes it richer by adding load balancing, health check, retry, and timeouts. It is designed to have the same name as the Kubernetes service."),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/references/apisix_upstream"},"reference")," for the full API documentation."),(0,r.kt)("h2",{id:"load-balancing"},"Load balancing"),(0,r.kt)("p",null,"The example below shows how you can configure load balacing in ",(0,r.kt)("inlineCode",{parentName:"p"},"ApisixUpstream")," object using ",(0,r.kt)("a",{parentName:"p",href:"https://linkerd.io/2016/03/16/beyond-round-robin-load-balancing-for-latency/"},"ewma"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  loadbalancer:\n    type: ewma\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: httpbin\nspec:\n  selector:\n    app: httpbin\n  ports:\n  - name: http\n    port: 80\n    targetPort: 8080\n")),(0,r.kt)("p",null,"If you require sticky sessions, algorithms like ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Consistent_hashing"},"consistent hashing")," can be used for load balancing. The example below uses the ",(0,r.kt)("inlineCode",{parentName:"p"},"User-Agent")," header for hashing:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  loadbalancer:\n    type: chash\n    hashOn: header\n    key: "user-agent"\n')),(0,r.kt)("h2",{id:"health-check"},"Health check"),(0,r.kt)("p",null,"kubelet provides ",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#:~:text=The%20kubelet%20uses%20readiness%20probes,removed%20from%20Service%20load%20balancers."},"probes")," for health check. But if more features like passive feedback is required, a powerful health check mechanism is needed."),(0,r.kt)("p",null,"The example below shows how you can configure a passive health checker to detect unhealthy endpoints. Once there are three consecutive requests with the unhealthy status codes, the endpoint will be marked as unhealthy and requests will not be forwarded to it until it is healthy again."),(0,r.kt)("p",null,"The active health checker checks these unhealthy endpoints continuously for healthy status codes. Requests are forwarded to these endpoints again after they are healthy."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  healthCheck:\n    passive:\n      unhealthy:\n        httpCodes:\n          - 500\n          - 502\n          - 503\n          - 504\n        httpFailures: 3\n        timeout: 5s\n    active:\n      type: http\n      httpPath: /healthz\n      timeout: 5s\n      host: www.foo.com\n      healthy:\n        successes: 3\n        interval: 2s\n        httpCodes:\n          - 200\n          - 206\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The active health check configuration is mandatory if using the ",(0,r.kt)("inlineCode",{parentName:"p"},"healthCheck")," feature in ",(0,r.kt)("inlineCode",{parentName:"p"},"ApisixUpstream"),"."))),(0,r.kt)("h2",{id:"retries-and-timeouts"},"Retries and timeouts"),(0,r.kt)("p",null,"You can configure APISIX to retry requests to tolerate network errors. By default, ",(0,r.kt)("inlineCode",{parentName:"p"},"retries")," is ",(0,r.kt)("inlineCode",{parentName:"p"},"1"),"."),(0,r.kt)("p",null,"The example below configures ",(0,r.kt)("inlineCode",{parentName:"p"},"3")," retries."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  retries: 3\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If an error or timeout occurs while transferring a response to a client, it would not retry."))),(0,r.kt)("p",null,"You can also change the timeouts to fit your applications. The default connect, read, and send timeout is ",(0,r.kt)("inlineCode",{parentName:"p"},"60s"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  timeout:\n    connect: 5s\n    read: 10s\n    send: 10s\n")),(0,r.kt)("h2",{id:"port-level-settings"},"Port-level settings"),(0,r.kt)("p",null,"A Kubernetes service can expose multiple ports to provide distinct functions (like different protocols). For each of the ports, a different Upstream configuration might be required."),(0,r.kt)("p",null,"In the example below, the ",(0,r.kt)("inlineCode",{parentName:"p"},"foo")," service exposes two ports, one using HTTP and the other gRPC. The Upstream service is configured to use the correct scheme for the respective ports:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixUpstream\nmetadata:\n  name: foo\nspec:\n  loadbalancer:\n    type: roundrobin\n  portLevelSettings:\n  - port: 7000\n    scheme: http\n  - port: 7001\n    scheme: grpc\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: foo\nspec:\n  selector:\n    app: foo\n  ports:\n  - name: http\n    port: 7000\n    targetPort: 7000\n  - name: grpc\n    port: 7001\n    targetPort: 7001\n")))}l.isMDXComponent=!0}}]);