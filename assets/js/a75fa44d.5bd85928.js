"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[25505],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var i=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=i.createContext({}),p=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},u=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},c=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(t),d=a,f=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return t?i.createElement(f,r(r({ref:n},u),{},{components:t})):i.createElement(f,r({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=c;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var p=2;p<o;p++)r[p]=t[p];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}c.displayName="MDXCreateElement"},79423:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var i=t(87462),a=(t(67294),t(3905));const o={title:"Configuration based on environments",keywords:["Apache APISIX","API Gateway","Configuration","Environment"],description:"This document describes how you can change APISIX configuration based on environments."},r=void 0,l={unversionedId:"profile",id:"version-3.11/profile",isDocsHomePage:!1,title:"Configuration based on environments",description:"This document describes how you can change APISIX configuration based on environments.",source:"@site/docs-apisix_versioned_docs/version-3.11/profile.md",sourceDirName:".",slug:"/profile",permalink:"/docs/apisix/3.11/profile",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/profile.md",tags:[],version:"3.11",frontMatter:{title:"Configuration based on environments",keywords:["Apache APISIX","API Gateway","Configuration","Environment"],description:"This document describes how you can change APISIX configuration based on environments."},sidebar:"version-3.11/docs",previous:{title:"Debug Function",permalink:"/docs/apisix/3.11/debug-function"},next:{title:"SSL Protocol",permalink:"/docs/apisix/3.11/ssl-protocol"}},s=[{value:"Using environment variables in the configuration file",id:"using-environment-variables-in-the-configuration-file",children:[]},{value:"Using the <code>APISIX_PROFILE</code> environment variable",id:"using-the-apisix_profile-environment-variable",children:[]}],p={toc:s};function u(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Extracting configuration from the code makes APISIX adaptable to changes in the operating environments. For example, APISIX can be deployed in a development environment for testing and then moved to a production environment. The configuration for APISIX in these environments would be different."),(0,a.kt)("p",null,"APISIX supports managing multiple configurations through environment variables in two different ways:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Using environment variables in the configuration file"),(0,a.kt)("li",{parentName:"ol"},"Using an environment variable to switch between multiple configuration profiles")),(0,a.kt)("h2",{id:"using-environment-variables-in-the-configuration-file"},"Using environment variables in the configuration file"),(0,a.kt)("p",null,"This is useful when you want to change some configurations based on the environment."),(0,a.kt)("p",null,"To use environment variables, you can use the syntax ",(0,a.kt)("inlineCode",{parentName:"p"},"key_name: ${{ENVIRONMENT_VARIABLE_NAME:=}}"),". You can also set a default value to fall back to if no environment variables are set by adding it to the configuration as ",(0,a.kt)("inlineCode",{parentName:"p"},"key_name: ${{ENVIRONMENT_VARIABLE_NAME:=VALUE}}"),". The example below shows how you can modify your configuration file to use environment variables to set the listening ports of APISIX:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="config.yaml"',title:'"config.yaml"'},"apisix:\n  node_listen:\n    - ${{APISIX_NODE_LISTEN:=}}\ndeployment:\n  admin:\n    admin_listen:\n      port: ${{DEPLOYMENT_ADMIN_ADMIN_LISTEN:=}}\n")),(0,a.kt)("p",null,"When you run APISIX, you can set these environment variables dynamically:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"export APISIX_NODE_LISTEN=8132\nexport DEPLOYMENT_ADMIN_ADMIN_LISTEN=9232\n")),(0,a.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"You should set these variables with ",(0,a.kt)("inlineCode",{parentName:"p"},"export"),". If you do not export, APISIX will fail to resolve for these variables."))),(0,a.kt)("p",null,"Now when you start APISIX, it will listen on port ",(0,a.kt)("inlineCode",{parentName:"p"},"8132")," and expose the Admin API on port ",(0,a.kt)("inlineCode",{parentName:"p"},"9232"),"."),(0,a.kt)("p",null,"To use default values if no environment variables are set, you can add it to your configuration file as shown below:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="config.yaml"',title:'"config.yaml"'},"apisix:\n  node_listen:\n    - ${{APISIX_NODE_LISTEN:=9080}}\ndeployment:\n  admin:\n    admin_listen:\n      port: ${{DEPLOYMENT_ADMIN_ADMIN_LISTEN:=9180}}\n")),(0,a.kt)("p",null,"Now if you don't specify these environment variables when running APISIX, it will fall back to the default values and expose the Admin API on port ",(0,a.kt)("inlineCode",{parentName:"p"},"9180")," and listen on port ",(0,a.kt)("inlineCode",{parentName:"p"},"9080"),"."),(0,a.kt)("p",null,"Similarly, you can also use environment variables in ",(0,a.kt)("inlineCode",{parentName:"p"},"apisix.yaml")," when deploying APISIX in standalone mode."),(0,a.kt)("p",null,"For example, you can export the upstream address and port to environment variables:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"export HOST_ADDR=httpbin.org\nexport HOST_PORT=80\n")),(0,a.kt)("p",null,"Then create a route as such:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="apisix.yaml"',title:'"apisix.yaml"'},'routes:\n  -\n    uri: "/anything"\n    upstream:\n      nodes:\n        "${{HOST_ADDR}}:${{HOST_PORT}}": 1\n      type: roundrobin\n#END\n')),(0,a.kt)("p",null,"Initialize and start APISIX in standalone mode, requests to ",(0,a.kt)("inlineCode",{parentName:"p"},"/anything")," should now be forwarded to ",(0,a.kt)("inlineCode",{parentName:"p"},"httpbin.org:80/anything"),"."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"WARNING"),": When using docker to deploy APISIX in standalone mode. New environment variables added to ",(0,a.kt)("inlineCode",{parentName:"p"},"apisix.yaml")," while APISIX has been initialized will only take effect after a reload."),(0,a.kt)("h2",{id:"using-the-apisix_profile-environment-variable"},"Using the ",(0,a.kt)("inlineCode",{parentName:"h2"},"APISIX_PROFILE")," environment variable"),(0,a.kt)("p",null,"If you have multiple configuration changes for multiple environments, it might be better to have a different configuration file for each."),(0,a.kt)("p",null,"Although this might increase the number of configuration files, you would be able to manage each independently and can even do version management."),(0,a.kt)("p",null,"APISIX uses the ",(0,a.kt)("inlineCode",{parentName:"p"},"APISIX_PROFILE")," environment variable to switch between environments, i.e. to switch between different sets of configuration files. If the value of ",(0,a.kt)("inlineCode",{parentName:"p"},"APISIX_PROFILE")," is ",(0,a.kt)("inlineCode",{parentName:"p"},"env"),", then APISIX will look for the configuration files ",(0,a.kt)("inlineCode",{parentName:"p"},"conf/config-env.yaml"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"conf/apisix-env.yaml"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"conf/debug-env.yaml"),"."),(0,a.kt)("p",null,"For example for the production environment, you can have:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"conf/config-prod.yaml"),(0,a.kt)("li",{parentName:"ul"},"conf/apisix-prod.yaml"),(0,a.kt)("li",{parentName:"ul"},"conf/debug-prod.yaml")),(0,a.kt)("p",null,"And for the development environment:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"conf/config-dev.yaml"),(0,a.kt)("li",{parentName:"ul"},"conf/apisix-dev.yaml"),(0,a.kt)("li",{parentName:"ul"},"conf/debug-dev.yaml")),(0,a.kt)("p",null,"And if no environment is specified, APISIX can use the default configuration files:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"conf/config.yaml"),(0,a.kt)("li",{parentName:"ul"},"conf/apisix.yaml"),(0,a.kt)("li",{parentName:"ul"},"conf/debug.yaml")),(0,a.kt)("p",null,"To use a particular configuration, you can specify it in the environment variable:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"export APISIX_PROFILE=prod\n")),(0,a.kt)("p",null,"APISIX will now use the ",(0,a.kt)("inlineCode",{parentName:"p"},"-prod.yaml")," configuration files."))}u.isMDXComponent=!0}}]);