"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[11558],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||i;return n?r.createElement(h,a(a({ref:t},u),{},{components:n})):r.createElement(h,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},40988:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return c},default:function(){return p}});var r=n(87462),o=n(63366),i=(n(67294),n(3905)),a={title:"Developing for Apache APISIX Ingress Controller"},l=void 0,s={unversionedId:"development",id:"development",isDocsHomePage:!1,title:"Developing for Apache APISIX Ingress Controller",description:"\x3c!--",source:"@site/docs/apisix-ingress-controller/development.md",sourceDirName:".",slug:"/development",permalink:"/zh/docs/ingress-controller/development",editUrl:"https://github.com/apache/apisix-ingress-controller/edit/master/docs/zh/latest/development.md",tags:[],version:"current",frontMatter:{title:"Developing for Apache APISIX Ingress Controller"},sidebar:"docs",previous:{title:"Ingress Controller",permalink:"/zh/docs/ingress-controller/design"},next:{title:"Contributing to apisix-ingress-controller",permalink:"/zh/docs/ingress-controller/contribute"}},c=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Fork and Clone",id:"fork-and-clone",children:[]},{value:"Build",id:"build",children:[]},{value:"Test",id:"test",children:[{value:"Run unit test cases",id:"run-unit-test-cases",children:[]},{value:"Run e2e test cases",id:"run-e2e-test-cases",children:[]},{value:"Build docker image",id:"build-docker-image",children:[]}]},{value:"Run apisix-ingress-controller locally",id:"run-apisix-ingress-controller-locally",children:[]}],u={toc:c};function p(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This document explains how to get started with developing for Apache APISIX Ingress controller."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Install ",(0,i.kt)("a",{parentName:"li",href:"https://golang.org/dl/"},"Go 1.13")," or later, and we use go module to manage the go package dependencies."),(0,i.kt)("li",{parentName:"ul"},"Prepare an available Kubernetes cluster in your workstation, we recommend you to use ",(0,i.kt)("a",{parentName:"li",href:"https://kind.sigs.k8s.io/"},"Kind"),"."),(0,i.kt)("li",{parentName:"ul"},"Install Apache APISIX in Kubernetes by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-helm-chart"},"Helm Chart"),".")),(0,i.kt)("h2",{id:"fork-and-clone"},"Fork and Clone"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Fork the repository from ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller"},"apache/apisix-ingress-controller")," to your own GitHub account."),(0,i.kt)("li",{parentName:"ul"},"Clone the fork repository to your workstation."),(0,i.kt)("li",{parentName:"ul"},"Run ",(0,i.kt)("inlineCode",{parentName:"li"},"go mod download")," to download modules to local cache. By the way, if you are a developer in China, we suggest you setting ",(0,i.kt)("inlineCode",{parentName:"li"},"GOPROXY")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"https://goproxy.cn")," to speed up the downloading.")),(0,i.kt)("h2",{id:"build"},"Build"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"cd /path/to/apisix-ingress-controller\nmake build\n./apisix-ingress-controller version\n")),(0,i.kt)("h2",{id:"test"},"Test"),(0,i.kt)("h3",{id:"run-unit-test-cases"},"Run unit test cases"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"cd /path/to/apisix-ingress-controller\nmake unit-test\n")),(0,i.kt)("h3",{id:"run-e2e-test-cases"},"Run e2e test cases"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"cd /path/to/apisix-ingress-controller\nmake e2e-test\n")),(0,i.kt)("p",null,"Note the running of e2e cases is somewhat slow, so please be patient."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"See ",(0,i.kt)("a",{parentName:"p",href:"https://onsi.github.io/ginkgo/#focused-specs"},"here")," to learn\nhow to just run partial e2e cases.")),(0,i.kt)("h3",{id:"build-docker-image"},"Build docker image"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"cd /path/to/apisix-ingress-controller\nmake build-image IMAGE_TAG=a.b.c\n")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Note: The Dockerfile in this repository is only for development, not for release.")),(0,i.kt)("p",null,"If you're coding for apisix-ingress-controller and adding some e2e test cases to verify your changes,\nyou should push the images to the image registry that your Kubernetes cluster can access, if you're using Kind, just run the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"make push-images-to-kind\n")),(0,i.kt)("h2",{id:"run-apisix-ingress-controller-locally"},"Run apisix-ingress-controller locally"),(0,i.kt)("p",null,"We assume all prerequisites above mentioned are met, what's more, since we want to run apisix-ingress-controller in bare-metal environment, please make sure both the proxy service and admin api service of Apache APISIX are exposed outside of the Kubernetes cluster, e.g. configuring them as ",(0,i.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/concepts/services-networking/service/#nodeport"},"NodePort")," services."),(0,i.kt)("p",null,"Let's assume the Admin API service address of Apache APISIX is ",(0,i.kt)("inlineCode",{parentName:"p"},"http://192.168.65.2:31156"),". Next launch the ingress-apisix-controller by the following command."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"cd /path/to/apisix-ingress-controller\n./apisix-ingress-controller ingress \\\n    --kubeconfig /path/to/kubeconfig \\\n    --http-listen :8080 \\\n    --log-output stderr \\\n    --apisix-base-url http://192.168.65.2:31156/apisix/admin\n    --apisix-admin-key edd1c9f034335f136f87ad84b625c8f1\n")),(0,i.kt)("p",null,"Something you need to pay attention to:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"configuring of ",(0,i.kt)("inlineCode",{parentName:"li"},"--kubeconfig"),", if you are using Minikube, the file path should be ",(0,i.kt)("inlineCode",{parentName:"li"},"~/.kube/config"),"."),(0,i.kt)("li",{parentName:"ul"},"configuring of ",(0,i.kt)("inlineCode",{parentName:"li"},"--apisix-admin-key"),", if you have changed the admin key in Apache APISIX, also changing it here, if you disable the authentication if Apache APISIX, just removing this option.")))}p.isMDXComponent=!0}}]);