"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[54269],{3905:(e,n,t)=>{t.d(n,{Zo:()=>l,kt:()=>f});var r=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),p=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},l=function(e){var n=p(e.components);return r.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,l=a(e,["components","mdxType","originalType","parentName"]),g=p(t),f=i,d=g["".concat(c,".").concat(f)]||g[f]||u[f]||o;return t?r.createElement(d,s(s({ref:n},l),{},{components:t})):r.createElement(d,s({ref:n},l))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,s=new Array(o);s[0]=g;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a.mdxType="string"==typeof e?e:i,s[1]=a;for(var p=2;p<o;p++)s[p]=t[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},71628:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>s,default:()=>l,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var r=t(87462),i=(t(67294),t(3905));const o={title:"ApisixPluginConfig",keywords:["APISIX ingress","Apache APISIX","ApisixPluginConfig"],description:"Guide to using ApisixPluginConfig custom Kubernetes resource."},s=void 0,a={unversionedId:"concepts/apisix_plugin_config",id:"version-1.7.0/concepts/apisix_plugin_config",isDocsHomePage:!1,title:"ApisixPluginConfig",description:"Guide to using ApisixPluginConfig custom Kubernetes resource.",source:"@site/docs-apisix-ingress-controller_versioned_docs/version-1.7.0/concepts/apisix_plugin_config.md",sourceDirName:"concepts",slug:"/concepts/apisix_plugin_config",permalink:"/zh/docs/ingress-controller/1.7.0/concepts/apisix_plugin_config",editUrl:"/zh/edit#https://github.com/apache/apisix-ingress-controller/edit/v1.7.0/docs/zh/latest/concepts/apisix_plugin_config.md",tags:[],version:"1.7.0",frontMatter:{title:"ApisixPluginConfig",keywords:["APISIX ingress","Apache APISIX","ApisixPluginConfig"],description:"Guide to using ApisixPluginConfig custom Kubernetes resource."},sidebar:"version-1.7.0/docs",previous:{title:"ApisixClusterConfig",permalink:"/zh/docs/ingress-controller/1.7.0/concepts/apisix_cluster_config"},next:{title:"Annotations",permalink:"/zh/docs/ingress-controller/1.7.0/concepts/annotations"}},c=[],p={toc:c};function l(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"ApisixPluginConfig")," is a Kubernetes CRD that can be used to extract commonly used Plugins and can be bound directly to multiple Routes."),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/ingress-controller/references/apisix_pluginconfig_v2"},"reference")," for the full API documentation."),(0,i.kt)("p",null,"The example below shows how you can configure an ",(0,i.kt)("inlineCode",{parentName:"p"},"ApisixPluginConfig")," resource:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: apisix.apache.org/v2\nkind: ApisixPluginConfig\nmetadata:\n  name: echo-and-cors-apc\nspec:\n  plugins:\n  - name: echo\n    enable: true\n    config:\n      before_body: "This is the prologue"\n      after_body: "This is the epilogue"\n      headers:\n       X-Foo: v1\n       X-Foo2: v2\n  - name: cors\n    enable: true\n')),(0,i.kt)("p",null,"You can then configure a Route to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"echo-and-cors-apc")," Plugin configuration:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"apiVersion: apisix.apache.org/v2beta3\nkind: ApisixRoute\nmetadata:\n  name: httpbin-route\nspec:\n  http:\n  - name: rule1\n    match:\n      hosts:\n      - httpbin.org\n      paths:\n      - /ip\n    backends:\n    - serviceName: %s\n      servicePort: %d\n      weight: 10\n    plugin_config_name: echo-and-cors-apc\n")))}l.isMDXComponent=!0}}]);