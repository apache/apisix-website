(window.webpackJsonp=window.webpackJsonp||[]).push([[187],{255:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(8),i=(r(0),r(270)),o={title:"Getting Started"},s={unversionedId:"getting-started",id:"getting-started",isDocsHomePage:!1,title:"Getting Started",description:"\x3c!--",source:"@site/docs/apisix-ingress-controller/getting-started.md",slug:"/getting-started",permalink:"/docs/ingress-controller/getting-started",editUrl:"https://github.com/apache/apisix-ingress-controller/edit/master/docs/en/latest/getting-started.md",version:"current",sidebar:"docs",next:{title:"Ingress APISIX Use Examples",permalink:"/docs/ingress-controller/practices/index"}},c=[{value:"What is apisix-ingress-controller",id:"what-is-apisix-ingress-controller",children:[]},{value:"Features",id:"features",children:[]},{value:"How It Works",id:"how-it-works",children:[]},{value:"Installation on Cloud",id:"installation-on-cloud",children:[]},{value:"Installation on Prem",id:"installation-on-prem",children:[]},{value:"Get Involved to Contribute",id:"get-involved-to-contribute",children:[]},{value:"Compatibility with Apache APISIX",id:"compatibility-with-apache-apisix",children:[]}],l={toc:c};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"what-is-apisix-ingress-controller"},"What is apisix-ingress-controller"),Object(i.b)("p",null,"apisix-ingress-controller is yet another Ingress controller for Kubernetes using ",Object(i.b)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX")," as the high performance reverse proxy."),Object(i.b)("p",null,"It's configured by using the declarative configurations like ",Object(i.b)("a",{parentName:"p",href:"/docs/ingress-controller/concepts/apisix_route"},"ApisixRoute"),", ",Object(i.b)("a",{parentName:"p",href:"/docs/ingress-controller/concepts/apisix_upstream"},"ApisixUpstream"),", ",Object(i.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress/"},"Ingress"),".\nAll these resources are watched and converted to corresponding resources in Apache APISIX."),Object(i.b)("p",null,"Service Discovery are also supported through ",Object(i.b)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/"},"Kubernetes Service"),",\nand will be reflected to nodes in APISIX Upstream."),Object(i.b)("p",null,Object(i.b)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/master/docs/assets/images/scene.png",alt:"scene"})),Object(i.b)("h2",{id:"features"},"Features"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Declarative configuration"),Object(i.b)("li",{parentName:"ul"},"Full dynamic capabilities to delivery configurations."),Object(i.b)("li",{parentName:"ul"},"Native Kubernetes Ingress (both v1 and v1beta1) support."),Object(i.b)("li",{parentName:"ul"},"Service Discovery based on Kubernetes Service."),Object(i.b)("li",{parentName:"ul"},"Out of box support for node health check."),Object(i.b)("li",{parentName:"ul"},"Support load balancing based on Pod (upstream nodes)."),Object(i.b)("li",{parentName:"ul"},"Rich plugins support."),Object(i.b)("li",{parentName:"ul"},"Easy to deploy and use.")),Object(i.b)("h2",{id:"how-it-works"},"How It Works"),Object(i.b)("p",null,"See ",Object(i.b)("a",{parentName:"p",href:"/docs/ingress-controller/design"},"Design")," for more details."),Object(i.b)("h2",{id:"installation-on-cloud"},"Installation on Cloud"),Object(i.b)("p",null,"apisix-ingress-controller supports to be installed on some clouds such as AWS, GCP."),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/azure"},"Install Ingress APISIX on Azure AKS")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/aws"},"Install Ingress APISIX on AWS EKS")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/ack"},"Install Ingress APISIX on ACK")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/gke"},"Install Ingress APISIX on Google Cloud GKE")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/minikube"},"Install Ingress APISIX on Minikube")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/kubesphere"},"Install Ingress APISIX on KubeSphere")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/deployments/k3s-rke"},"Install Ingress APISIX on K3S and RKE"))),Object(i.b)("h2",{id:"installation-on-prem"},"Installation on Prem"),Object(i.b)("p",null,"If you want to deploy apisix-ingress-controller on Prem, we recommend you to use ",Object(i.b)("a",{parentName:"p",href:"https://helm.sh/"},"Helm"),". Just a few steps"),Object(i.b)("h2",{id:"get-involved-to-contribute"},"Get Involved to Contribute"),Object(i.b)("p",null,"First, your supports and cooperations to make this project better are appreciated.\nBut before you start, please read ",Object(i.b)("a",{parentName:"p",href:"/docs/ingress-controller/contribute"},"How to Contribute")," and ",Object(i.b)("a",{parentName:"p",href:"/docs/ingress-controller/development"},"How to Develop"),"."),Object(i.b)("h2",{id:"compatibility-with-apache-apisix"},"Compatibility with Apache APISIX"),Object(i.b)("p",null,"The following table describes the compatibility between apisix-ingress-controller and\n",Object(i.b)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX"),"."),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:"right"},"apisix-ingress-controller"),Object(i.b)("th",{parentName:"tr",align:"right"},"Apache APISIX"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"right"},Object(i.b)("inlineCode",{parentName:"td"},"master")),Object(i.b)("td",{parentName:"tr",align:"right"},Object(i.b)("inlineCode",{parentName:"td"},">= 2.4"),", ",Object(i.b)("inlineCode",{parentName:"td"},"2.5")," is recommended.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"right"},Object(i.b)("inlineCode",{parentName:"td"},"0.5")),Object(i.b)("td",{parentName:"tr",align:"right"},Object(i.b)("inlineCode",{parentName:"td"},">= 2.4"),", ",Object(i.b)("inlineCode",{parentName:"td"},"2.5")," is recommended.")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:"right"},Object(i.b)("inlineCode",{parentName:"td"},"0.4")),Object(i.b)("td",{parentName:"tr",align:"right"},Object(i.b)("inlineCode",{parentName:"td"},">= 2.4"))))))}p.isMDXComponent=!0},270:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return m}));var n=r(0),a=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},b=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),b=p(r),u=n,m=b["".concat(o,".").concat(u)]||b[u]||d[u]||i;return r?a.a.createElement(m,s(s({ref:t},l),{},{components:r})):a.a.createElement(m,s({ref:t},l))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);