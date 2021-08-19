(self.webpackChunk=self.webpackChunk||[]).push([[30338],{3905:function(e,r,t){"use strict";t.d(r,{Zo:function(){return s},kt:function(){return m}});var n=t(67294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=n.createContext({}),c=function(e){var r=n.useContext(p),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},s=function(e){var r=c(e.components);return n.createElement(p.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(t),m=o,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||a;return t?n.createElement(f,i(i({ref:r},s),{},{components:t})):n.createElement(f,i({ref:r},s))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=d;var l={};for(var p in r)hasOwnProperty.call(r,p)&&(l[p]=r[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=t[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},51953:function(e,r,t){"use strict";t.r(r),t.d(r,{frontMatter:function(){return i},metadata:function(){return l},toc:function(){return p},default:function(){return s}});var n=t(22122),o=t(19756),a=(t(67294),t(3905)),i={title:"Deploy with RPM"},l={unversionedId:"deploy-with-rpm",id:"version-2.6.1/deploy-with-rpm",isDocsHomePage:!1,title:"Deploy with RPM",description:"\x3c!--",source:"@site/docs-apisix-dashboard_versioned_docs/version-2.6.1/deploy-with-rpm.md",sourceDirName:".",slug:"/deploy-with-rpm",permalink:"/docs/dashboard/2.6.1/deploy-with-rpm",editUrl:"https://github.com/apache/apisix-dashboard/edit/master/docs/en/latest/deploy-with-rpm.md",version:"2.6.1",frontMatter:{title:"Deploy with RPM"},sidebar:"version-2.6.1/docs",previous:{title:"Deploy with Docker",permalink:"/docs/dashboard/2.6.1/deploy-with-docker"},next:{title:"Development Guide",permalink:"/docs/dashboard/2.6.1/develop"}},p=[{value:"Install from RPM",id:"install-from-rpm",children:[]},{value:"Run",id:"run",children:[]}],c={toc:p};function s(e){var r=e.components,t=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"NOTE:")," Only support CentOS 7 currently, for more information, please refer to ",(0,a.kt)("a",{parentName:"p",href:"/docs/dashboard/2.6.1/deploy"},"here"),"."),(0,a.kt)("h2",{id:"install-from-rpm"},"Install from RPM"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ sudo yum install -y https://github.com/apache/apisix-dashboard/releases/download/v2.6/apisix-dashboard-2.6-0.x86_64.rpm\n")),(0,a.kt)("h2",{id:"run"},"Run"),(0,a.kt)("p",null,"Before you start, make sure the following dependencies are installed and running in your environment."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://etcd.io/docs/v3.4.0/dl-build/"},"etcd")," 3.4.0+")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"$ sudo nohup manager-api -p /usr/local/apisix/dashboard/ &\n")))}s.isMDXComponent=!0}}]);