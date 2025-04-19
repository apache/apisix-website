"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[60917],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>m});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},l=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=c(n),m=i,h=u["".concat(p,".").concat(m)]||u[m]||d[m]||r;return n?a.createElement(h,o(o({ref:t},l),{},{components:n})):a.createElement(h,o({ref:t},l))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},69915:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>l,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var a=n(87462),i=(n(67294),n(3905));const r={title:"ApisixRoute",keywords:["APISIX ingress","Apache APISIX","ApisixRoute"],description:"Guide to using ApisixRoute custom Kubernetes resource."},o=void 0,s={unversionedId:"concepts/apisix_route",id:"version-1.6.0/concepts/apisix_route",isDocsHomePage:!1,title:"ApisixRoute",description:"Guide to using ApisixRoute custom Kubernetes resource.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.6.0/concepts/apisix_route.md",sourceDirName:"concepts",slug:"/concepts/apisix_route",permalink:"/docs/ingress-controller/1.6.0/concepts/apisix_route",editUrl:"/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.6.0/docs/en/latest/concepts/apisix_route.md",tags:[],version:"1.6.0",frontMatter:{title:"ApisixRoute",keywords:["APISIX ingress","Apache APISIX","ApisixRoute"],description:"Guide to using ApisixRoute custom Kubernetes resource."},sidebar:"version-1.6.0/docs",previous:{title:"ApisixPluginConfig/v2beta3",permalink:"/docs/ingress-controller/1.6.0/references/apisix_pluginconfig_v2beta3"},next:{title:"ApisixUpstream",permalink:"/docs/ingress-controller/1.6.0/concepts/apisix_upstream"}},p=[{value:"Path-based routing",id:"path-based-routing",children:[]},{value:"Advanced routing",id:"advanced-routing",children:[]},{value:"Service resolution granularity",id:"service-resolution-granularity",children:[]},{value:"Weight-based traffic split",id:"weight-based-traffic-split",children:[]},{value:"Plugins",id:"plugins",children:[{value:"Config with secretRef",id:"config-with-secretref",children:[]}]},{value:"Websocket proxy",id:"websocket-proxy",children:[]},{value:"TCP route",id:"tcp-route",children:[]},{value:"UDP route",id:"udp-route",children:[]}],c={toc:p};function l(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," is a Kubernetes CRD object that provides a spec to route traffic to services with APISIX. It is much more capable and easy to use compared to the default ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress/"},"Kubernetes Ingress")," resource."),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/references/apisix_route_v2"},"reference")," for the full API documentation."),(0,i.kt)("h2",{id:"path-based-routing"},"Path-based routing"),(0,i.kt)("p",null,"The example below shows how you can configure Ingress to route traffic to two backend services. Requests with host ",(0,i.kt)("inlineCode",{parentName:"p"},"foo.com")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"/foo")," prefix are routed to the ",(0,i.kt)("inlineCode",{parentName:"p"},"foo")," service and requests with the ",(0,i.kt)("inlineCode",{parentName:"p"},"/bar")," prefix are routed to the ",(0,i.kt)("inlineCode",{parentName:"p"},"bar")," service."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: foo-bar-route\nspec:\n  http:\n  - name: foo\n    match:\n      hosts:\n      - foo.com\n      paths:\n      - "/foo/*"\n    backends:\n    - serviceName: foo\n      servicePort: 80\n  - name: bar\n    match:\n      paths:\n        - "/bar/*"\n    backends:\n    - serviceName: bar\n      servicePort: 80\n')),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"IMPORTANT")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Paths are matched exactly by default. To match a prefix, use ",(0,i.kt)("inlineCode",{parentName:"p"},"*"),". For example ",(0,i.kt)("inlineCode",{parentName:"p"},"/id/*")," will match all paths with the ",(0,i.kt)("inlineCode",{parentName:"p"},"/id/")," prefix."))),(0,i.kt)("h2",{id:"advanced-routing"},"Advanced routing"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ApisixRoute")," resource can also be used to configure advanced routing through ",(0,i.kt)("inlineCode",{parentName:"p"},"methods")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"exprs"),"."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"methods")," attribute can be used to route traffic based on the HTTP method as shown in the example below. This will route all requests with the ",(0,i.kt)("inlineCode",{parentName:"p"},"GET")," method to the ",(0,i.kt)("inlineCode",{parentName:"p"},"foo")," service."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: method-route\nspec:\n  http:\n    - name: method\n      match:\n        paths:\n        - /\n        methods:\n        - GET\n      backends:\n      - serviceName: foo\n        servicePort: 80\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"exprs")," attribute is used to configure conditions to match HTTP queries, headers, and cookies."),(0,i.kt)("p",null,"It can be composed of several expressions and each of them in-turn is composed of a subject, operator, and a value/set."),(0,i.kt)("p",null,"The configuration below will route all requests with a query parameter ",(0,i.kt)("inlineCode",{parentName:"p"},"id")," with the value ",(0,i.kt)("inlineCode",{parentName:"p"},"2143")," to the ",(0,i.kt)("inlineCode",{parentName:"p"},"foo")," service:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: method-route\nspec:\n  http:\n    - name: method\n      match:\n        paths:\n          - /\n        exprs:\n          - subject:\n              scope: Query\n              name: id\n            op: Equal\n            value: "2143"\n      backends:\n      - serviceName: foo\n        servicePort: 80\n')),(0,i.kt)("h2",{id:"service-resolution-granularity"},"Service resolution granularity"),(0,i.kt)("p",null,"By default, the service referenced will be watched to update its endpoint list in APISIX. To just use the ",(0,i.kt)("inlineCode",{parentName:"p"},"ClusterIP")," of the service, you can set the ",(0,i.kt)("inlineCode",{parentName:"p"},"resolveGranularity")," attribute to ",(0,i.kt)("inlineCode",{parentName:"p"},"service")," (defaults to ",(0,i.kt)("inlineCode",{parentName:"p"},"endpoint"),"):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: method-route\nspec:\n  http:\n    - name: method\n      match:\n        paths:\n          - /*\n        methods:\n          - GET\n      backends:\n      - serviceName: foo\n        servicePort: 80\n        resolveGranularity: service\n")),(0,i.kt)("h2",{id:"weight-based-traffic-split"},"Weight-based traffic split"),(0,i.kt)("p",null,"You can configure more than one backend services in a route rule and set weights to route traffic between them. This uses the ",(0,i.kt)("a",{parentName:"p",href:"http://apisix.apache.org/docs/apisix/plugins/traffic-split/"},"traffic-split")," Plugin internally. The default weight is ",(0,i.kt)("inlineCode",{parentName:"p"},"100"),"."),(0,i.kt)("p",null,"The example below shows routing traffic between two services with a weight ratio ",(0,i.kt)("inlineCode",{parentName:"p"},"100:50"),". This means that 2/3 of the requests (with ",(0,i.kt)("inlineCode",{parentName:"p"},"GET")," method and ",(0,i.kt)("inlineCode",{parentName:"p"},"User-Agent")," header matching the regex pattern ",(0,i.kt)("inlineCode",{parentName:"p"},".*Chrome.*"),") will be routed to the ",(0,i.kt)("inlineCode",{parentName:"p"},"foo")," service and 1/3 of the requests will be routed to the ",(0,i.kt)("inlineCode",{parentName:"p"},"bar")," service:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: method-route\nspec:\n  http:\n    - name: method\n      match:\n        paths:\n          - /*\n        methods:\n          - GET\n        exprs:\n          - subject:\n              scope: Header\n              name: User-Agent\n            op: RegexMatch\n            value: ".*Chrome.*"\n      backends:\n      - serviceName: foo\n        servicePort: 80\n        weight: 100\n      - serviceName: bar\n        servicePort: 81\n        weight: 50\n')),(0,i.kt)("h2",{id:"plugins"},"Plugins"),(0,i.kt)("p",null,"APISIX's ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/batch-requests/"},"80+ Plugins")," can be used with APISIX Ingress. These Plugins have the same name as in the APISIX documentation."),(0,i.kt)("p",null,"The example below configures ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/plugins/cors/"},"cors")," Plugin for the route:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n    - name: httpbin\n      match:\n        hosts:\n        - local.httpbin.org\n        paths:\n          - /*\n      backends:\n      - serviceName: foo\n        servicePort: 80\n      plugins:\n        - name: cors\n          enable: true\n")),(0,i.kt)("h3",{id:"config-with-secretref"},"Config with secretRef"),(0,i.kt)("p",null,"Plugins are supported to be configured from kubernetes secret with ",(0,i.kt)("inlineCode",{parentName:"p"},"secretRef"),"."),(0,i.kt)("p",null,"The priority is ",(0,i.kt)("inlineCode",{parentName:"p"},"plugins.secretRef > plugins.config"),". That is, the duplicated key in ",(0,i.kt)("inlineCode",{parentName:"p"},"plugins.config")," are replaced by ",(0,i.kt)("inlineCode",{parentName:"p"},"plugins.secretRef"),"."),(0,i.kt)("p",null,"Example below configures echo plugin. The final values of ",(0,i.kt)("inlineCode",{parentName:"p"},"before_body"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"body")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"after_body"),' are "This is the replaced preface", "my custom body" and "This is the epilogue", respectively.'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: v1\nkind: Secret\nmetadata:\n  name: echo\ndata:\n  # content is "This is the replaced preface"\n  before_body: IlRoaXMgaXMgdGhlIHJlcGxhY2VkIHByZWZhY2Ui\n  # content is "my custom body"\n  body: Im15IGN1c3RvbSBib2R5Ig==\n---\napiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n    - name: rule1\n      match:\n        hosts:\n          - httpbin.org\n        paths:\n          - /ip\n      backends:\n        - serviceName: %s\n          servicePort: %d\n          weight: 10\n      plugins:\n        - name: echo\n          enable: true\n          config:\n            before_body: "This is the preface"\n            after_body: "This is the epilogue"\n            headers:\n              X-Foo: v1\n              X-Foo2: v2\n          secretRef: echo\n')),(0,i.kt)("h2",{id:"websocket-proxy"},"Websocket proxy"),(0,i.kt)("p",null,"You can route requests to ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/WebSocket#:~:text=WebSocket%20is%20a%20computer%20communications,WebSocket%20is%20distinct%20from%20HTTP."},"WebSocket")," services by setting the ",(0,i.kt)("inlineCode",{parentName:"p"},"websocket")," attribute to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," as shown below:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: ws-route\nspec:\n  http:\n    - name: websocket\n      match:\n        hosts:\n          - ws.foo.org\n        paths:\n          - /*\n      backends:\n      - serviceName: websocket-server\n        servicePort: 8080\n      websocket: true\n")),(0,i.kt)("h2",{id:"tcp-route"},"TCP route"),(0,i.kt)("p",null,"You can configure APISIX Ingress to route traffic to TCP servers."),(0,i.kt)("p",null,"The example below configures APISIX Ingress to route traffic from port ",(0,i.kt)("inlineCode",{parentName:"p"},"9100")," to the service ",(0,i.kt)("inlineCode",{parentName:"p"},"tcp-server"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: tcp-route\nspec:\n  stream:\n    - name: tcp-route-rule1\n      protocol: TCP\n      match:\n        ingressPort: 9100\n      backend:\n        serviceName: tcp-server\n        servicePort: 8080\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"ingressPort")," (",(0,i.kt)("inlineCode",{parentName:"p"},"9100")," here) should be pre-defined in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L101"},"APISIX configuration"),"."))),(0,i.kt)("h2",{id:"udp-route"},"UDP route"),(0,i.kt)("p",null,"You can configure APISIX Ingress to route traffic to UDP servers."),(0,i.kt)("p",null,"The example below configures APISIX Ingress to route traffic from port ",(0,i.kt)("inlineCode",{parentName:"p"},"9200")," to the service ",(0,i.kt)("inlineCode",{parentName:"p"},"udp-server"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: udp-route\nspec:\n  stream:\n    - name: udp-route-rule1\n      protocol: UDP\n      match:\n        ingressPort: 9200\n      backend:\n        serviceName: udp-server\n        servicePort: 53\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The ",(0,i.kt)("inlineCode",{parentName:"p"},"ingressPort")," (",(0,i.kt)("inlineCode",{parentName:"p"},"9200")," here) should be pre-defined in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/conf/config-default.yaml#L105"},"APISIX configuration"),"."))))}l.isMDXComponent=!0}}]);