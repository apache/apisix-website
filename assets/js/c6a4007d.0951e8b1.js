(self.webpackChunk=self.webpackChunk||[]).push([[71239],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return c},kt:function(){return h}});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var o=n.createContext({}),p=function(e){var t=n.useContext(o),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,s=e.originalType,o=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(r),h=i,m=d["".concat(o,".").concat(h)]||d[h]||u[h]||s;return r?n.createElement(m,a(a({ref:t},c),{},{components:r})):n.createElement(m,a({ref:t},c))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var s=r.length,a=new Array(s);a[0]=d;var l={};for(var o in t)hasOwnProperty.call(t,o)&&(l[o]=t[o]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var p=2;p<s;p++)a[p]=r[p];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},44883:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return a},metadata:function(){return l},toc:function(){return o},default:function(){return c}});var n=r(22122),i=r(19756),s=(r(67294),r(3905)),a={title:"Apache APISIX Ingress Controller Helm Chart"},l={unversionedId:"apisix-ingress-controller",id:"apisix-ingress-controller",isDocsHomePage:!1,title:"Apache APISIX Ingress Controller Helm Chart",description:"\x3c!--",source:"@site/docs/apisix-helm-chart/apisix-ingress-controller.md",sourceDirName:".",slug:"/apisix-ingress-controller",permalink:"/docs/helm-chart/apisix-ingress-controller",editUrl:"https://github.com/apache/apisix-helm-chart/edit/master/docs/en/latest/apisix-ingress-controller.md",version:"current",frontMatter:{title:"Apache APISIX Ingress Controller Helm Chart"},sidebar:"docs",previous:{title:"Apache APISIX Dashboard Helm Chart",permalink:"/docs/helm-chart/apisix-dashboard"},next:{title:"FAQ",permalink:"/docs/helm-chart/FAQ"}},o=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Install",id:"install",children:[]},{value:"Uninstall",id:"uninstall",children:[]},{value:"Deployment Options",id:"deployment-options",children:[{value:"ingress version",id:"ingress-version",children:[]}]},{value:"Upgrade Considerations",id:"upgrade-considerations",children:[{value:"CRD",id:"crd",children:[]}]}],p={toc:o};function c(e){var t=e.components,r=(0,i.Z)(e,["components"]);return(0,s.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://kubernetes.io/docs/setup/"},"Kubernetes 1.12+")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix#configure-and-installation"},"Apache APISIX")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",{parentName:"li",href:"https://helm.sh/docs/intro/quickstart/#install-helm"},"Helm v3.0+"))),(0,s.kt)("h2",{id:"install"},"Install"),(0,s.kt)("p",null,"To install apisix-ingress-controller which release name is ",(0,s.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"$ helm repo add apisix https://charts.apiseven.com\n$ helm repo update\n$ helm install apisix-ingress-controller apisix/apisix-ingress-controller --namespace ingress-apisix\n")),(0,s.kt)("h2",{id:"uninstall"},"Uninstall"),(0,s.kt)("p",null,"To uninstall/delete the ",(0,s.kt)("inlineCode",{parentName:"p"},"apisix-ingress-controller")," release:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-bash"},"helm uninstall apisix-ingress-controller --namespace ingress-apisix\n")),(0,s.kt)("h2",{id:"deployment-options"},"Deployment Options"),(0,s.kt)("h3",{id:"ingress-version"},"ingress version"),(0,s.kt)("p",null,"By default apisix-ingress-controller watches the ",(0,s.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/ingress/"},"Ingress")," resources in api group ",(0,s.kt)("inlineCode",{parentName:"p"},"networking/v1"),", however, if your Kubernetes cluster is prior to ",(0,s.kt)("inlineCode",{parentName:"p"},"v1.19"),", you need to change the ingress watching version."),(0,s.kt)("p",null,"If your Kubernetes version is older than ",(0,s.kt)("inlineCode",{parentName:"p"},"v1.14"),", then:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"helm install apisix-ingress-controller apisix/apisix-ingress-controller --namespace ingress-apisix --set config.kubernetes.ingressVersion=extensions/v1beta1\n")),(0,s.kt)("p",null,"Or if your Kubernetes version is between ",(0,s.kt)("inlineCode",{parentName:"p"},"v1.14")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"v1.19"),", try below:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"helm install apisix-ingress-controller apisix/apisix-ingress-controller --namespace ingress-apisix --set config.kubernetes.ingressVersion=networking/v1beta1\n")),(0,s.kt)("h2",{id:"upgrade-considerations"},"Upgrade Considerations"),(0,s.kt)("h3",{id:"crd"},"CRD"),(0,s.kt)("p",null,"CRDs upgrading is special as helm chart will skip to apply these resources when they already exist."),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"With the arrival of Helm 3, we removed the old crd-install hooks for a more simple methodology. There is now a special directory called crds that you can create in your chart to hold your CRDs. These CRDs are not templated, but will be installed by default when running a helm install for the chart. If the CRD already exists, it will be skipped with a warning. If you wish to skip the CRD installation step, you can pass the --skip-crds flag.")),(0,s.kt)("p",null,"In such a case, you may need to apply these CRDs by yourself."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"$ cd /path/to/apisix-ingress-controller\n$ kubectl apply -k samples/deploy/crd/\n")))}c.isMDXComponent=!0}}]);