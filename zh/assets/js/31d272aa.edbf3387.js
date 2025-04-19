"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[92629],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,g=m["".concat(s,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(g,l(l({ref:t},c),{},{components:n})):r.createElement(g,l({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1260:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var r=n(87462),a=(n(67294),n(3905));const i={title:"ApisixClusterConfig/v2",keywords:["APISIX ingress","Apache APISIX","ApisixClusterConfig"],description:"Reference for ApisixClusterConfig/v2 custom Kubernetes resource."},l=void 0,o={unversionedId:"references/apisix_cluster_config_v2",id:"references/apisix_cluster_config_v2",isDocsHomePage:!1,title:"ApisixClusterConfig/v2",description:"Reference for ApisixClusterConfig/v2 custom Kubernetes resource.",source:"@site/docs/apisix-ingress-controller/references/apisix_cluster_config_v2.md",sourceDirName:"references",slug:"/references/apisix_cluster_config_v2",permalink:"/zh/docs/ingress-controller/next/references/apisix_cluster_config_v2",editUrl:"/zh/edit#https://github.com/apache/apisix-ingress-controller/edit/master/docs/zh/latest/references/apisix_cluster_config_v2.md",tags:[],version:"current",frontMatter:{title:"ApisixClusterConfig/v2",keywords:["APISIX ingress","Apache APISIX","ApisixClusterConfig"],description:"Reference for ApisixClusterConfig/v2 custom Kubernetes resource."},sidebar:"docs",previous:{title:"ApisixTls/v2",permalink:"/zh/docs/ingress-controller/next/references/apisix_tls_v2"},next:{title:"ApisixPluginConfig/v2",permalink:"/zh/docs/ingress-controller/next/references/apisix_pluginconfig_v2"}},s=[{value:"Spec",id:"spec",children:[]}],p={toc:s};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"See ",(0,a.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/concepts/apisix_cluster_config"},"concepts")," to learn more about how to use the ApisixClusterConfig resource."),(0,a.kt)("h2",{id:"spec"},"Spec"),(0,a.kt)("p",null,"See the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-ingress-controller/blob/master/samples/deploy/crd/v1/ApisixClusterConfig.yaml"},"definition")," on GitHub."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Attribute"),(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring"),(0,a.kt)("td",{parentName:"tr",align:null},"object"),(0,a.kt)("td",{parentName:"tr",align:null},"Monitoring configurations.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring.prometheus"),(0,a.kt)("td",{parentName:"tr",align:null},"object"),(0,a.kt)("td",{parentName:"tr",align:null},"Prometheus configurations.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring.prometheus.enable"),(0,a.kt)("td",{parentName:"tr",align:null},"boolean"),(0,a.kt)("td",{parentName:"tr",align:null},"When set to ",(0,a.kt)("inlineCode",{parentName:"td"},"true"),", enables Prometheus.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring.prometheus.prefer_name"),(0,a.kt)("td",{parentName:"tr",align:null},"boolean"),(0,a.kt)("td",{parentName:"tr",align:null},"When set to ",(0,a.kt)("inlineCode",{parentName:"td"},"true"),", prints Route/Service name instead of their ID in Prometheus metrics.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring.skywalking"),(0,a.kt)("td",{parentName:"tr",align:null},"object"),(0,a.kt)("td",{parentName:"tr",align:null},"Apache SkyWalking configurations.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring.skywalking.enable"),(0,a.kt)("td",{parentName:"tr",align:null},"boolean"),(0,a.kt)("td",{parentName:"tr",align:null},"When set to ",(0,a.kt)("inlineCode",{parentName:"td"},"true"),", enables SkyWalking.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"monitoring.skywalking.sampleRatio"),(0,a.kt)("td",{parentName:"tr",align:null},"number"),(0,a.kt)("td",{parentName:"tr",align:null},"Sample ratio for spans. Should be in ",(0,a.kt)("inlineCode",{parentName:"td"},"[0, 1]"),".")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"admin"),(0,a.kt)("td",{parentName:"tr",align:null},"object"),(0,a.kt)("td",{parentName:"tr",align:null},"Admin configurations.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"admin.baseURL"),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"Base URL of the APISIX cluster.")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"admin.AdminKey"),(0,a.kt)("td",{parentName:"tr",align:null},"string"),(0,a.kt)("td",{parentName:"tr",align:null},"Admin key to authenticate with APISIX cluster.")))))}c.isMDXComponent=!0}}]);