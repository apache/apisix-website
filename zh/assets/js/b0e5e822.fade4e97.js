(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{203:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var a=n(3),r=n(8),i=(n(0),n(270)),o={title:"ApisixUpstream"},s={unversionedId:"concepts/apisix_upstream",id:"concepts/apisix_upstream",isDocsHomePage:!1,title:"ApisixUpstream",description:"\x3c!--",source:"@site/docs/apisix-ingress-controller/concepts/apisix_upstream.md",slug:"/concepts/apisix_upstream",permalink:"/zh/docs/ingress-controller/concepts/apisix_upstream",editUrl:"https://github.com/apache/apisix-ingress-controller/edit/master/docs/zh/latest/concepts/apisix_upstream.md",version:"current",sidebar:"docs",previous:{title:"ApisixRoute",permalink:"/zh/docs/ingress-controller/concepts/apisix_route"},next:{title:"Ingress Controller",permalink:"/zh/docs/ingress-controller/design"}},c=[{value:"Configuring Load Balancer",id:"configuring-load-balancer",children:[]},{value:"Configuring Health Check",id:"configuring-health-check",children:[]},{value:"Configuring Retry and Timeout",id:"configuring-retry-and-timeout",children:[]},{value:"Port Level Settings",id:"port-level-settings",children:[]}],p={toc:c};function l(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"ApisixUpstream is the decorator of Kubernetes Service. It's designed to have same name with its target Kubernetes Service, it makes the Kubernetes Service richer by adding\nload balancing, health check, retry, timeout parameters and etc."),Object(i.b)("p",null,"Resort to ",Object(i.b)("inlineCode",{parentName:"p"},"ApisixUpstream")," and the Kubernetes Service, apisix ingress controller will generates the APISIX Upstream(s).\nTo learn more, please check the ",Object(i.b)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/docs/en/latest/architecture-design/upstream.md"},"Apache APISIX architecture-design docs"),"."),Object(i.b)("h3",{id:"configuring-load-balancer"},"Configuring Load Balancer"),Object(i.b)("p",null,"A proper load balancing algorithm is required to scatter requests reasonably for a Kubernetes Service."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v1\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  loadbalancer:\n    type: ewma\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: httpbin\nspec:\n  selector:\n    app: httpbin\n  ports:\n  - name: http\n    port: 80\n    targetPort: 8080\n")),Object(i.b)("p",null,"The above example shows that ",Object(i.b)("a",{parentName:"p",href:"https://linkerd.io/2016/03/16/beyond-round-robin-load-balancing-for-latency/"},"ewma")," is used as the load balancer for Service ",Object(i.b)("inlineCode",{parentName:"p"},"httpbin"),"."),Object(i.b)("p",null,"Sometimes the session sticky is desired, and you can use the ",Object(i.b)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Consistent_hashing"},"Consistent Hashing")," load balancing algorithm."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v1\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  loadbalancer:\n    type: chash\n    hashOn: header\n    key: "user-agent"\n')),Object(i.b)("p",null,"With the above settings, Apache APISIX will distributes requests according to the User-Agent header."),Object(i.b)("h3",{id:"configuring-health-check"},"Configuring Health Check"),Object(i.b)("p",null,"Although Kubelet already provides ",Object(i.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#:~:text=The%20kubelet%20uses%20readiness%20probes,removed%20from%20Service%20load%20balancers."},"probes")," to detect whether pods are healthy, you may still need more powerful health check mechanism,\nlike the passive feedback capability."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v1\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  healthCheck:\n    passive:\n      unhealthy:\n        httpCodes:\n          - 500\n          - 502\n          - 503\n          - 504\n        httpFailures: 3\n        timeout: 5s\n    active:\n      type: http\n      httpPath: /healthz\n      timeout: 5s\n      host: www.foo.com\n      healthy:\n        successes: 3\n        interval: 2s\n        httpCodes:\n          - 200\n          - 206\n")),Object(i.b)("p",null,"The above YAML snippet defines a passive health checker to detect the unhealthy state for\nendpoints, once there are three consecutive requests with bad status code (one of ",Object(i.b)("inlineCode",{parentName:"p"},"500"),", ",Object(i.b)("inlineCode",{parentName:"p"},"502"),", ",Object(i.b)("inlineCode",{parentName:"p"},"503"),", ",Object(i.b)("inlineCode",{parentName:"p"},"504"),"), the endpoint\nwill be set to unhealthy and no requests can be routed there until it's healthy again."),Object(i.b)("p",null,"That's why the active health checker comes in, endpoints might be down for a short while and ready again, the active health checker detects these unhealthy endpoints continuously, and pull them\nup once the healthy conditions are met (three consecutive requests got good status codes, e.g. ",Object(i.b)("inlineCode",{parentName:"p"},"200")," and ",Object(i.b)("inlineCode",{parentName:"p"},"206"),")."),Object(i.b)("p",null,"Note the active health checker is somewhat duplicated with the liveness/readiness probes but it's required if the passive feedback mechanism is in use. So once you use the health check feature in ApisixUpstream,\nthe active health checker is mandatory."),Object(i.b)("h3",{id:"configuring-retry-and-timeout"},"Configuring Retry and Timeout"),Object(i.b)("p",null,"You may want the proxy to retry when requests occur faults like transient network errors\nor service unavailable, by default the retry count is ",Object(i.b)("inlineCode",{parentName:"p"},"1"),". You can change it by specifying the ",Object(i.b)("inlineCode",{parentName:"p"},"retries")," field."),Object(i.b)("p",null,"The following configuration configures the ",Object(i.b)("inlineCode",{parentName:"p"},"retries")," to ",Object(i.b)("inlineCode",{parentName:"p"},"3"),", which indicates there'll be at most ",Object(i.b)("inlineCode",{parentName:"p"},"3")," requests sent to\nKubernetes service ",Object(i.b)("inlineCode",{parentName:"p"},"httpbin"),"'s endpoints."),Object(i.b)("p",null,"One should bear in mind that passing a request to the next endpoint is only possible\nif nothing has been sent to a client yet. That is, if an error or timeout occurs in the middle\nof the transferring of a response, fixing this is impossible."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v1\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  retries: 3\n")),Object(i.b)("p",null,"The default connect, read and send timeout are ",Object(i.b)("inlineCode",{parentName:"p"},"60s"),", which might not proper for some applications,\njust change them in the ",Object(i.b)("inlineCode",{parentName:"p"},"timeout")," field."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v1\nkind: ApisixUpstream\nmetadata:\n  name: httpbin\nspec:\n  timeout:\n    connect: 5s\n    read: 10s\n    send: 10s\n")),Object(i.b)("p",null,"The above examples sets the connect, read and timeout to ",Object(i.b)("inlineCode",{parentName:"p"},"5s"),", ",Object(i.b)("inlineCode",{parentName:"p"},"10s"),", ",Object(i.b)("inlineCode",{parentName:"p"},"10s")," respectively."),Object(i.b)("h3",{id:"port-level-settings"},"Port Level Settings"),Object(i.b)("p",null,"Once in a while a single Kubernetes Service might expose multiple ports which provides distinct functions and different Upstream configurations are required.\nIn that case, you can create configurations for individual port."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v1\nkind: ApisixUpstream\nmetadata:\n  name: foo\nspec:\n  loadbalancer:\n    type: roundrobin\n  portLevelSettings:\n  - port: 7000\n    scheme: http\n  - port: 7001\n    scheme: grpc\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: foo\nspec:\n  selector:\n    app: foo\n  portLevelSettings:\n  - name: http\n    port: 7000\n    targetPort: 7000\n  - name: grpc\n    port: 7001\n    targetPort: 7001\n")),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"foo")," service exposes two ports, one of them use HTTP protocol and the other uses grpc protocol.\nIn the meanwhile, the ApisixUpstream ",Object(i.b)("inlineCode",{parentName:"p"},"foo")," sets ",Object(i.b)("inlineCode",{parentName:"p"},"http")," scheme for port ",Object(i.b)("inlineCode",{parentName:"p"},"7000")," and ",Object(i.b)("inlineCode",{parentName:"p"},"grpc")," scheme for ",Object(i.b)("inlineCode",{parentName:"p"},"7001"),"\n(all ports are the service port). But both ports shares the load balancer configuration."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"PortLevelSettings")," is not mandatory if the service only exposes one port but is useful when multiple ports are defined."))}l.isMDXComponent=!0},270:function(e,t,n){"use strict";n.d(t,"a",(function(){return h})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),l=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},h=function(e){var t=l(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),h=l(n),u=a,d=h["".concat(o,".").concat(u)]||h[u]||b[u]||i;return n?r.a.createElement(d,s(s({ref:t},p),{},{components:n})):r.a.createElement(d,s({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);