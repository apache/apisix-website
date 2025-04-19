"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[20821],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},u=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=s(t),m=r,g=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return t?a.createElement(g,l(l({ref:n},u),{},{components:t})):a.createElement(g,l({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,l=new Array(i);l[0]=d;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=t[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},27877:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=t(87462),r=(t(67294),t(3905));const i={title:"Installation",keywords:["apisix-java-plugin-runner","Installation"],description:"This document explains how to installation and use apisix-java-plugin-runner."},l=void 0,o={unversionedId:"installation-guide",id:"version-0.6.0/installation-guide",isDocsHomePage:!1,title:"Installation",description:"This document explains how to installation and use apisix-java-plugin-runner.",source:"@site/docs-apisix-java-plugin-runner_versioned_docs/version-0.6.0/installation-guide.md",sourceDirName:".",slug:"/installation-guide",permalink:"/docs/java-plugin-runner/installation-guide",editUrl:"/edit#https://github.com/apache/apisix-java-plugin-runner/edit/release/0.6.0/docs/en/latest/installation-guide.md",tags:[],version:"0.6.0",frontMatter:{title:"Installation",keywords:["apisix-java-plugin-runner","Installation"],description:"This document explains how to installation and use apisix-java-plugin-runner."},sidebar:"version-0.6.0/docs",previous:{title:"The internal of apisix java plugin runner",permalink:"/docs/java-plugin-runner/the-internal-of-apisix-java-plugin-runner"},next:{title:"Deployment Guide",permalink:"/docs/java-plugin-runner/deployment-guide"}},p=[{value:"Overview",id:"overview",children:[]},{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Install",id:"install",children:[]},{value:"Demo",id:"demo",children:[]}],s={toc:p};function u(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"overview"},"Overview"),(0,r.kt)("p",null,"This document explains how to install apisix-java-plugin-runner."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"JDK 21"),(0,r.kt)("li",{parentName:"ul"},"APISIX master branch"),(0,r.kt)("li",{parentName:"ul"},"Refer to ",(0,r.kt)("a",{parentName:"li",href:"/docs/java-plugin-runner/how-it-works#debug"},"Debug"),"  to build the debug environment.")),(0,r.kt)("h2",{id:"install"},"Install"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create a simple web application with Spring Boot, and choose Maven as the build tool.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Add the apisix-java-plugin-runner dependency in your POM, like:"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.apache.apisix</groupId> \n    <artifactId>apisix-runner-starter</artifactId>\n    <version>0.6.0</version>\n</dependency>\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Configuring the scan package path")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'\n```java\n@SpringBootApplication(scanBasePackages = {"your-filter\'s-package-name","org.apache.apisix.plugin.runner"})\n')),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Excluding the default logging framework")),(0,r.kt)("p",null,"To prevent multiple slf4j bindings, exclude the ",(0,r.kt)("inlineCode",{parentName:"p"},"logback-classic")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"log4j-to-slf4j")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"pom.xml"),", like:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.springframework.boot</groupId>\n    <artifactId>spring-boot-starter</artifactId>\n    <exclusions>\n           <exclusion>\n                <groupId>ch.qos.logback</groupId>\n                <artifactId>logback-classic</artifactId>\n           </exclusion>\n           <exclusion>\n                <groupId>org.apache.logging.log4j</groupId>\n                <artifactId>log4j-to-slf4j</artifactId>\n           </exclusion>\n    </exclusions>\n</dependency>\n")),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Configuring the address for Unix Domain Socket communication with APISIX")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-properties"},"socket.file = /tmp/runner.sock\n")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Implementing the ",(0,r.kt)("inlineCode",{parentName:"li"},"PluginFilter")," interface")),(0,r.kt)("p",null,"When you write your custom plugins, you need to implement the ",(0,r.kt)("inlineCode",{parentName:"p"},"PluginFilter")," interface and\ninject filters into Spring Boot's object lifecycle management using ",(0,r.kt)("inlineCode",{parentName:"p"},"@Component"),"."),(0,r.kt)("p",null,"code example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"@Component\npublic class RewriteRequestDemoFilter implements PluginFilter {\n  ......\n  implementing functions\n}\n")),(0,r.kt)("p",null,"You can refer to ",(0,r.kt)("a",{parentName:"p",href:"development.md"},"Development")," to learn how to write custom plugins."),(0,r.kt)("h2",{id:"demo"},"Demo"),(0,r.kt)("p",null,"A Demo Project that work with apisix-java-plugin-runner and custom filters\ncan be found at: ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/tzssangglass/java-plugin-runner-demo-1"},"java-plugin-runner-demo"),"."))}u.isMDXComponent=!0}}]);