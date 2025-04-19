"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[34926],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,g=u["".concat(s,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(g,l(l({ref:t},d),{},{components:n})):a.createElement(g,l({ref:t},d))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},18492:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>p,toc:()=>d});var a=n(87462),r=(n(67294),n(3905)),i=n(55064),l=n(58215);const o={title:"Getting started",keywords:["APISIX ingress","Apache APISIX","Kubernetes ingress"],description:"Guide to get started with Apache APISIX ingress controller."},s=void 0,p={unversionedId:"getting-started",id:"version-1.7.0/getting-started",isDocsHomePage:!1,title:"Getting started",description:"Guide to get started with Apache APISIX ingress controller.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.7.0/getting-started.md",sourceDirName:".",slug:"/getting-started",permalink:"/docs/ingress-controller/1.7.0/getting-started",editUrl:"/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.7.0/docs/en/latest/getting-started.md",tags:[],version:"1.7.0",frontMatter:{title:"Getting started",keywords:["APISIX ingress","Apache APISIX","Kubernetes ingress"],description:"Guide to get started with Apache APISIX ingress controller."},sidebar:"version-1.7.0/docs",next:{title:"minikube",permalink:"/docs/ingress-controller/1.7.0/deployments/minikube"}},d=[{value:"Features",id:"features",children:[]},{value:"Get involved",id:"get-involved",children:[]},{value:"Compatibility with APISIX",id:"compatibility-with-apisix",children:[]}],c={toc:d};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"APISIX ingress controller is a ",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/"},"Kubernetes ingress controller")," using ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org"},"Apache APISIX")," as the high performance reverse proxy."),(0,r.kt)("p",null,"APISIX ingress controller can be configured using the native Kubernetes Ingress or Gateway API as well as with the declarative and easy to use custom resources provided by APISIX. The APISIX ingress controller converts these resources to APISIX configuration."),(0,r.kt)("p",null,"The examples below show how these differ. Both the examples configure a Route in APISIX that routes to an httpbin service as the Upstream."),(0,r.kt)(i.Z,{groupId:"resources",defaultValue:"apisix",values:[{label:"APISIX Ingress CRD",value:"apisix"},{label:"Kubernetes Ingress API",value:"ingress"},{label:"Kubernetes Gateway API",value:"gateway"}],mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"apisix",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="httpbin-route.yaml"',title:'"httpbin-route.yaml"'},"apiVersion: apisix.apache.org/v2\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n    - name: route-1\n      match:\n        hosts:\n          - local.httpbin.org\n        paths:\n          - /*\n      backends:\n        - serviceName: httpbin\n          servicePort: 80\n"))),(0,r.kt)(l.Z,{value:"ingress",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="httpbin-route.yaml"',title:'"httpbin-route.yaml"'},"apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: httpbin-route\nspec:\n  ingressClassName: apisix\n  rules:\n    - host: local.httpbin.org\n      http:\n        paths:\n          - backend:\n              service:\n                name: httpbin\n                port:\n                  number: 80\n            path: /\n            pathType: Prefix\n"))),(0,r.kt)(l.Z,{value:"gateway",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="httpbin-route.yaml"',title:'"httpbin-route.yaml"'},"apiVersion: gateway.networking.k8s.io/v1alpha2\nkind: HTTPRoute\nmetadata:\n  name: httpbin-route\nspec:\n  hostnames:\n  - local.httpbin.org\n  rules:\n  - matches:\n    - path:\n        type: PathPrefix\n        value: /\n    backendRefs:\n    - name: httpbin\n      port: 80\n")))),(0,r.kt)("p",null,"APISIX ingress controller defines the CRDs ",(0,r.kt)("a",{parentName:"p",href:"/docs/ingress-controller/1.7.0/concepts/apisix_route"},"ApisixRoute"),", ",(0,r.kt)("a",{parentName:"p",href:"/docs/ingress-controller/1.7.0/concepts/apisix_upstream"},"ApisixUpstream"),", ",(0,r.kt)("a",{parentName:"p",href:"/docs/ingress-controller/1.7.0/concepts/apisix_tls"},"ApisixTls"),", and ",(0,r.kt)("a",{parentName:"p",href:"/docs/ingress-controller/1.7.0/concepts/apisix_cluster_config"},"ApisixClusterConfig"),"."),(0,r.kt)("p",null,"APISIX also supports ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/next/discovery/kubernetes/"},"service discovery")," through ",(0,r.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/"},"Kubernetes service")," abstraction."),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/apache/apisix-ingress-controller/v1.7.0/docs/assets/images/scene.png",alt:"scene"})),(0,r.kt)("p",null,"See ",(0,r.kt)("a",{parentName:"p",href:"/docs/ingress-controller/1.7.0/design"},"Design")," to learn more about how APISIX ingress controller works under the hood."),(0,r.kt)("h2",{id:"features"},"Features"),(0,r.kt)("p",null,"To summarize, APISIX ingress controller has the following features:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Declarative configuration with CRDs."),(0,r.kt)("li",{parentName:"ul"},"Fully dynamic configuration."),(0,r.kt)("li",{parentName:"ul"},"Supports native Kubernetes Ingress resource (both v1 and v1beta1)."),(0,r.kt)("li",{parentName:"ul"},"Supports service discovery through Kubernetes Service."),(0,r.kt)("li",{parentName:"ul"},"Out-of-the-box node health check support."),(0,r.kt)("li",{parentName:"ul"},"Supports load balancing based on pods (Upstream nodes)."),(0,r.kt)("li",{parentName:"ul"},"Rich ",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/next/plugins/batch-requests/"},"Plugins")," with ",(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/apisix/next/plugin-develop/"},"custom Plugin")," support.")),(0,r.kt)("h2",{id:"get-involved"},"Get involved"),(0,r.kt)("p",null,"You can contribute to the development of APISIX ingress controller. See ",(0,r.kt)("a",{parentName:"p",href:"/docs/ingress-controller/1.7.0/contribute"},"Development guide")," for instructions on setting up the project locally."),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/general/contributor-guide/"},"Contribute to APISIX")," section for details on the contributing flow."),(0,r.kt)("h2",{id:"compatibility-with-apisix"},"Compatibility with APISIX"),(0,r.kt)("p",null,"The table below shows the compatibility between APISIX ingress controller and the APISIX proxy."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"APISIX ingress controller"),(0,r.kt)("th",{parentName:"tr",align:null},"Supported APISIX versions"),(0,r.kt)("th",{parentName:"tr",align:null},"Recommended APISIX version"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"master")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.15"),", ",(0,r.kt)("inlineCode",{parentName:"td"},">=3.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"3.1"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.7.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.15"),", ",(0,r.kt)("inlineCode",{parentName:"td"},">=3.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"3.1"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.6.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.15"),", ",(0,r.kt)("inlineCode",{parentName:"td"},">=3.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.15"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"3.0"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.5.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.15"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.4.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.11"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.3.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.10"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.2.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.8"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.1.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.7"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.1.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.7"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1.0.0")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.7")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.7"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"0.6")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.6")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.6"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"0.5")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.4")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"2.5"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"0.4")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},">= 2.4")),(0,r.kt)("td",{parentName:"tr",align:null})))))}u.isMDXComponent=!0},58215:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294);const r=function(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},55064:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(67294),r=n(79443);const i=function(){const e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e};var l=n(86010);const o="tabItem_vU9c",s="tabItemActive_cw6a";const p=function(e){var t;const{lazy:n,block:r,defaultValue:p,values:d,groupId:c,className:u}=e,m=a.Children.toArray(e.children),g=null!=d?d:m.map((e=>({value:e.props.value,label:e.props.label}))),k=null!=p?p:null==(t=m.find((e=>e.props.default)))?void 0:t.props.value,{tabGroupChoices:h,setTabGroupChoices:N}=i(),[b,f]=(0,a.useState)(k),v=[];if(null!=c){const e=h[c];null!=e&&e!==b&&g.some((t=>t.value===e))&&f(e)}const y=e=>{const t=e.currentTarget,n=v.indexOf(t),a=g[n].value;f(a),null!=c&&(N(c,a),setTimeout((()=>{(function(e){const{top:t,left:n,bottom:a,right:r}=e.getBoundingClientRect(),{innerHeight:i,innerWidth:l}=window;return t>=0&&r<=l&&a<=i&&n>=0})(t)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s),setTimeout((()=>t.classList.remove(s)),2e3))}),150))},I=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=v.indexOf(e.target)+1;n=v[t]||v[0];break}case"ArrowLeft":{const t=v.indexOf(e.target)-1;n=v[t]||v[v.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":r},u)},g.map((e=>{let{value:t,label:n}=e;return a.createElement("li",{role:"tab",tabIndex:b===t?0:-1,"aria-selected":b===t,className:(0,l.Z)("tabs__item",o,{"tabs__item--active":b===t}),key:t,ref:e=>v.push(e),onKeyDown:I,onFocus:y,onClick:y},null!=n?n:t)}))),n?(0,a.cloneElement)(m.filter((e=>e.props.value===b))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},m.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==b})))))}},79443:(e,t,n)=>{n.d(t,{Z:()=>a});const a=(0,n(67294).createContext)(void 0)},86010:(e,t,n)=>{function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:()=>r});const r=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}}}]);