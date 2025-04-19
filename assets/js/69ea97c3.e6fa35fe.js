"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[38377],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||i;return n?r.createElement(g,l(l({ref:t},p),{},{components:n})):r.createElement(g,l({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,l=new Array(i);l[0]=d;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:o,l[1]=a;for(var c=2;c<i;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91301:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>s});var r=n(87462),o=(n(67294),n(3905));const i={title:"ApisixGlobalRule",keywords:["APISIX ingress","Apache APISIX","ApisixGlobalRule"],description:"Guide to using ApisixGlobalRule custom Kubernetes resource."},l=void 0,a={unversionedId:"concepts/apisix_global_rule",id:"version-1.7.0/concepts/apisix_global_rule",isDocsHomePage:!1,title:"ApisixGlobalRule",description:"Guide to using ApisixGlobalRule custom Kubernetes resource.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.7.0/concepts/apisix_global_rule.md",sourceDirName:"concepts",slug:"/concepts/apisix_global_rule",permalink:"/docs/ingress-controller/1.7.0/concepts/apisix_global_rule",editUrl:"/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.7.0/docs/en/latest/concepts/apisix_global_rule.md",tags:[],version:"1.7.0",frontMatter:{title:"ApisixGlobalRule",keywords:["APISIX ingress","Apache APISIX","ApisixGlobalRule"],description:"Guide to using ApisixGlobalRule custom Kubernetes resource."},sidebar:"version-1.7.0/docs",previous:{title:"Annotations",permalink:"/docs/ingress-controller/1.7.0/concepts/annotations"},next:{title:"Ingress Controller",permalink:"/docs/ingress-controller/1.7.0/design"}},s=[{value:"Example",id:"example",children:[]}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ApisixGlobalRule")," is a Kubernetes CRD resource used to create an APISIX ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/terminology/global-rule/"},"global-rule")," object, which can apply the ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/next/terminology/plugin/"},"plugin")," to all requests."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,"Enable the ",(0,o.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/next/plugins/limit-count/"},"limit-count")," plugin on the APISIX, which can limit all requests."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2\nkind: ApisixGlobalRule\nmetadata:\n  name: global\nspec:\n  plugins:\n  - name: limit-count\n    enabled: true \n    config:\n      time_window": 60,\n      policy: "local",\n      count: 2,\n      key: "remote_addr",\n      rejected_code: 503\n')))}p.isMDXComponent=!0}}]);