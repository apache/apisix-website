"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[63695],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||r;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},15709:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return p},default:function(){return u}});var a=n(87462),i=n(63366),r=(n(67294),n(3905)),o={title:"Install Dependencies"},s=void 0,l={unversionedId:"install-dependencies",id:"version-2.11/install-dependencies",isDocsHomePage:!1,title:"Install Dependencies",description:"\x3c!--",source:"@site/docs-apisix_versioned_docs/version-2.11/install-dependencies.md",sourceDirName:".",slug:"/install-dependencies",permalink:"/docs/apisix/install-dependencies",editUrl:"https://github.com/apache/apisix/edit/release/2.11/docs/en/latest/install-dependencies.md",tags:[],version:"2.11",frontMatter:{title:"Install Dependencies"},sidebar:"version-2.11/docs",previous:{title:"Benchmark",permalink:"/docs/apisix/benchmark"},next:{title:"Plugin Develop",permalink:"/docs/apisix/plugin-develop"}},p=[{value:"Note",id:"note",children:[]},{value:"Install",id:"install",children:[]}],c={toc:p};function u(e){var t=e.components,n=(0,i.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#note"},"Note")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"#install"},"Install"))),(0,r.kt)("h2",{id:"note"},"Note"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Since v2.0 Apache APISIX would not support the v2 protocol storage to etcd anymore, and the minimum etcd version supported is v3.4.0. What's more, etcd v3 uses gRPC as the messaging protocol, while Apache APISIX uses HTTP(S) to communicate with etcd cluster, so be sure the ",(0,r.kt)("a",{parentName:"p",href:"https://etcd.io/docs/v3.4.0/dev-guide/api_grpc_gateway/"},"etcd gRPC gateway")," is enabled.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},'Now by default Apache APISIX uses HTTP protocol to talk with etcd cluster, which is insecure. Please configure certificate and corresponding private key for your etcd cluster, and use "https" scheme explicitly in the etcd endpoints list in your Apache APISIX configuration, if you want to keep the data secure and integral. See the etcd section in ',(0,r.kt)("inlineCode",{parentName:"p"},"conf/config-default.yaml")," for more details.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If you want use Tengine instead of OpenResty, please take a look at this installation step script ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/ci/linux_tengine_runner.sh"},"Install Tengine at Ubuntu"),".")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"If it is OpenResty 1.19, APISIX will use OpenResty's built-in LuaJIT to run ",(0,r.kt)("inlineCode",{parentName:"p"},"bin/apisix"),"; otherwise it will use Lua 5.1. If you encounter ",(0,r.kt)("inlineCode",{parentName:"p"},"luajit: lj_asm_x86.h:2819: asm_loop_ fixup: Assertion '((intptr_t)target & 15) == 0' failed"),", this is a problem with the low version of OpenResty's built-in LuaJIT under certain compilation conditions.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"On some platforms, installing LuaRocks via the package manager will cause Lua to be upgraded to Lua 5.3, so we recommend installing LuaRocks via source code. if you install OpenResty and its OpenSSL develop library (openresty-openssl111-devel for rpm and openresty-openssl111-dev for deb) via the official repository, then ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix/blob/master/utils/linux-install-luarocks.sh"},"we provide a script for automatic installation"),". If you compile OpenResty yourself, you can refer to the above script and change the path in it. If you don't specify the OpenSSL library path when you compile, you don't need to configure the OpenSSL variables in LuaRocks, because the system's OpenSSL is used by default. If the OpenSSL library is specified at compile time, then you need to ensure that LuaRocks' OpenSSL configuration is consistent with OpenResty's.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"WARNING: If you are using OpenResty which is older than ",(0,r.kt)("inlineCode",{parentName:"p"},"1.17.8"),", please installing openresty-openss-devel instead of openresty-openssl111-devel.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"OpenResty is a dependency of APISIX. If it is your first time to deploy APISIX and you don't need to use OpenResty to deploy other services, you can stop and disable OpenResty after installation since it will not affect the normal work of APISIX. Please operate carefully according to your service. For example in Ubuntu: ",(0,r.kt)("inlineCode",{parentName:"p"},"systemctl stop openresty && systemctl disable openresty"),"."))),(0,r.kt)("h2",{id:"install"},"Install"),(0,r.kt)("p",null,"Run the following command to install Apache APISIX's dependencies on a supported operating system."),(0,r.kt)("p",null,"Supported OS versions: CentOS7, Fedora31 & 32, Ubuntu 16.04 & 18.04, Debian 9 & 10, Arch Linux, Mac OSX"),(0,r.kt)("p",null,"Note that in the case of Arch Linux, we use ",(0,r.kt)("inlineCode",{parentName:"p"},"openresty")," from the AUR, thus requiring a AUR helper. For now ",(0,r.kt)("inlineCode",{parentName:"p"},"yay")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"pacaur")," are supported."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"curl https://raw.githubusercontent.com/apache/apisix/master/utils/install-dependencies.sh -sL | bash -\n")),(0,r.kt)("p",null,"If you have cloned the Apache APISIX project, execute in the Apache APISIX root directory:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"bash utils/install-dependencies.sh\n")))}u.isMDXComponent=!0}}]);