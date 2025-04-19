"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[82708],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>u});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),d=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=d(n),u=a,h=m["".concat(p,".").concat(u)]||m[u]||c[u]||o;return n?r.createElement(h,i(i({ref:t},s),{},{components:n})):r.createElement(h,i({ref:t},s))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var d=2;d<o;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},30857:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>i,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var r=n(87462),a=(n(67294),n(3905));const o={title:"Development Guide"},i=void 0,l={unversionedId:"develop",id:"version-2.8/develop",isDocsHomePage:!1,title:"Development Guide",description:"The Dashboard contains both manager-api and web parts, so you need to start the development environment separately.",source:"@site/docs-apisix-dashboard_versioned_docs/version-2.8/develop.md",sourceDirName:".",slug:"/develop",permalink:"/zh/docs/dashboard/2.8/develop",editUrl:"/zh/edit#https://github.com/apache/apisix-dashboard/edit/release/2.8/docs/zh/latest/develop.md",tags:[],version:"2.8",frontMatter:{title:"Development Guide"},sidebar:"version-2.8/docs",previous:{title:"Deploy with RPM",permalink:"/zh/docs/dashboard/2.8/deploy-with-rpm"},next:{title:"i18n User Guide",permalink:"/zh/docs/dashboard/2.8/I18N_USER_GUIDE"}},p=[{value:"Prerequisites",id:"prerequisites",children:[]},{value:"Clone the project",id:"clone-the-project",children:[]},{value:"Start developing",id:"start-developing",children:[{value:"manager-api",id:"manager-api",children:[]},{value:"web",id:"web",children:[]}]}],d={toc:p};function s(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"The Dashboard contains both ",(0,a.kt)("inlineCode",{parentName:"p"},"manager-api")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"web")," parts, so you need to start the development environment separately."),(0,a.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("p",null,"Before development, refer to this ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/dashboard/2.8/deploy"},"guide")," to install dependencies."),(0,a.kt)("h2",{id:"clone-the-project"},"Clone the project"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ git clone -b release/2.8 https://github.com/apache/apisix-dashboard.git\n")),(0,a.kt)("h2",{id:"start-developing"},"Start developing"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ cd apisix-dashboard\n")),(0,a.kt)("h3",{id:"manager-api"},"manager-api"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Please change the configuration in ",(0,a.kt)("inlineCode",{parentName:"p"},"api/conf/conf.yaml"),".")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"In the root directory, launch development mode."))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ make api-run\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"In the root directory, stop development mode.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ make api-stop\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Please refer to the ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/dashboard/2.8/FAQ"},"FAQ")," about the problem of displaying exception in the dashboard after adding custom plugins or modifying plugin's schema.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"If writing an back end E2E test, please refer to the ",(0,a.kt)("a",{parentName:"p",href:"/zh/docs/dashboard/2.8/back-end-tests"},"Back End E2E Writing Guide")))),(0,a.kt)("h3",{id:"web"},"web"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Go to the ",(0,a.kt)("inlineCode",{parentName:"li"},"web")," directory.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ cd ./web\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Please change the ",(0,a.kt)("inlineCode",{parentName:"p"},"manager-api")," address in the ",(0,a.kt)("inlineCode",{parentName:"p"},"config/defaultSettings.ts")," file if needed.")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"Launch development mode"))),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ yarn install\n\n$ yarn start\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"If writing an front end E2E test, please refer to the ",(0,a.kt)("a",{parentName:"li",href:"/zh/docs/dashboard/2.8/front-end-e2e"},"Front End E2E Writing Guide"))))}s.isMDXComponent=!0}}]);