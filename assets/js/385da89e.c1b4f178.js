"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[25191],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=c(n),h=r,m=d["".concat(s,".").concat(h)]||d[h]||u[h]||l;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var c=2;c<l;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},31865:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>o,toc:()=>s});var a=n(87462),r=(n(67294),n(3905));n(55064),n(58215);const l={title:"FAQ"},i=void 0,o={unversionedId:"FAQ",id:"FAQ",isDocsHomePage:!1,title:"FAQ",description:"The Charts will install ETCD 3.4.14 by default. If you want to install Apache APISIX only, please set etcd.enabled=false and set etcd.host={http://your_etcd_address:2379}.",source:"@site/docs/apisix-helm-chart/FAQ.md",sourceDirName:".",slug:"/FAQ",permalink:"/docs/helm-chart/FAQ",editUrl:"/edit#https://github.com/apache/apisix-helm-chart/edit/master/docs/en/latest/FAQ.md",tags:[],version:"current",frontMatter:{title:"FAQ"},sidebar:"docs",previous:{title:"Apache APISIX Ingress Controller Helm Chart",permalink:"/docs/helm-chart/apisix-ingress-controller"}},s=[{value:"How to install APISIX only?",id:"how-to-install-apisix-only",children:[]},{value:"How to install Apache APISIX running in standalone mode?",id:"how-to-install-apache-apisix-running-in-standalone-mode",children:[]},{value:"Why get 403 when I access Apache APISIX admin api?",id:"why-get-403-when-i-access-apache-apisix-admin-api",children:[]},{value:"Creating resources such as ApisixRoute has no effect?",id:"creating-resources-such-as-apisixroute-has-no-effect",children:[]}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"how-to-install-apisix-only"},"How to install APISIX only?"),(0,r.kt)("p",null,"The Charts will install ETCD ",(0,r.kt)("inlineCode",{parentName:"p"},"3.4.14")," by default. If you want to install Apache APISIX only, please set ",(0,r.kt)("inlineCode",{parentName:"p"},"etcd.enabled=false")," and set ",(0,r.kt)("inlineCode",{parentName:"p"},"etcd.host={http://your_etcd_address:2379}"),"."),(0,r.kt)("p",null,"Please use the FQDN or the IP address of the ETCD cluster."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"# if etcd export by kubernetes service need spell fully qualified name\nhelm install apisix apisix/apisix \\\n    --set etcd.enabled=false \\\n    --set etcd.host={http://etcd_node_1:2379\\,http://etcd_node_2:2379}\n")),(0,r.kt)("h3",{id:"how-to-install-apache-apisix-running-in-standalone-mode"},"How to install Apache APISIX running in standalone mode?"),(0,r.kt)("p",null,"helm install apisix apisix/apisix  --set apisix.deployment.mode=standalone --set etcd.enabled=false --set apisix.deployment.role=data_plane"),(0,r.kt)("h3",{id:"why-get-403-when-i-access-apache-apisix-admin-api"},"Why get 403 when I access Apache APISIX admin api?"),(0,r.kt)("p",null,"We can define ",(0,r.kt)("inlineCode",{parentName:"p"},"admin.allow.ipList")," in CIDR."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'helm install apisix apisix/apisix \\\n    --set admin.allow.ipList="10.22.100.12/8" \\\n    --set admin.allow.ipList="172.0.0.0/24"\n')),(0,r.kt)("p",null,"If you want to allow all IPs for a quick test, just set ",(0,r.kt)("inlineCode",{parentName:"p"},'admin.allow.ipList=""')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'helm install apisix apisix/apisix \\\n    --set admin.allow.ipList=""\n')),(0,r.kt)("h3",{id:"creating-resources-such-as-apisixroute-has-no-effect"},"Creating resources such as ApisixRoute has no effect?"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("a",{parentName:"li",href:"https://apisix.apache.org/docs/ingress-controller/tutorials/check-crd-status"},"check the synchronization status of CRD")),(0,r.kt)("li",{parentName:"ol"},"Find the current version of the CRD declaration in ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller"},"https://github.com/apache/apisix-ingress-controller"),", located in the samples/deploy/crd directory, overwrite and install them. ")),(0,r.kt)("p",null,"Note: this operation may result in loss or corruption of historical data. You should back up the relevant data in advance."))}p.isMDXComponent=!0},58215:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(67294);const r=function(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},55064:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(67294),r=n(79443);const l=function(){const e=(0,a.useContext)(r.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e};var i=n(86010);const o="tabItem_vU9c",s="tabItemActive_cw6a";const c=function(e){var t;const{lazy:n,block:r,defaultValue:c,values:p,groupId:u,className:d}=e,h=a.Children.toArray(e.children),m=null!=p?p:h.map((e=>({value:e.props.value,label:e.props.label}))),f=null!=c?c:null==(t=h.find((e=>e.props.default)))?void 0:t.props.value,{tabGroupChoices:y,setTabGroupChoices:b}=l(),[g,v]=(0,a.useState)(f),w=[];if(null!=u){const e=y[u];null!=e&&e!==g&&m.some((t=>t.value===e))&&v(e)}const k=e=>{const t=e.currentTarget,n=w.indexOf(t),a=m[n].value;v(a),null!=u&&(b(u,a),setTimeout((()=>{(function(e){const{top:t,left:n,bottom:a,right:r}=e.getBoundingClientRect(),{innerHeight:l,innerWidth:i}=window;return t>=0&&r<=i&&a<=l&&n>=0})(t)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(s),setTimeout((()=>t.classList.remove(s)),2e3))}),150))},x=e=>{var t;let n=null;switch(e.key){case"ArrowRight":{const t=w.indexOf(e.target)+1;n=w[t]||w[0];break}case"ArrowLeft":{const t=w.indexOf(e.target)-1;n=w[t]||w[w.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":r},d)},m.map((e=>{let{value:t,label:n}=e;return a.createElement("li",{role:"tab",tabIndex:g===t?0:-1,"aria-selected":g===t,className:(0,i.Z)("tabs__item",o,{"tabs__item--active":g===t}),key:t,ref:e=>w.push(e),onKeyDown:x,onFocus:k,onClick:k},null!=n?n:t)}))),n?(0,a.cloneElement)(h.filter((e=>e.props.value===g))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},h.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==g})))))}},79443:(e,t,n)=>{n.d(t,{Z:()=>a});const a=(0,n(67294).createContext)(void 0)},86010:(e,t,n)=>{function a(e){var t,n,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=a(e[t]))&&(r&&(r+=" "),r+=n);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}n.d(t,{Z:()=>r});const r=function(){for(var e,t,n=0,r="";n<arguments.length;)(e=arguments[n++])&&(t=a(e))&&(r&&(r+=" "),r+=t);return r}}}]);