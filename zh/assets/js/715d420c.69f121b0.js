"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[57382],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>u});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),o=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},c=function(e){var t=o(e.components);return n.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=o(a),u=i,k=m["".concat(p,".").concat(u)]||m[u]||d[u]||l;return a?n.createElement(k,r(r({ref:t},c),{},{components:a})):n.createElement(k,r({ref:t},c))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=a.length,r=new Array(l);r[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var o=2;o<l;o++)r[o]=a[o];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},58215:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(67294);const i=function(e){let{children:t,hidden:a,className:i}=e;return n.createElement("div",{role:"tabpanel",hidden:a,className:i},t)}},55064:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(67294),i=a(79443);const l=function(){const e=(0,n.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e};var r=a(86010);const s="tabItem_vU9c",p="tabItemActive_cw6a";const o=function(e){var t;const{lazy:a,block:i,defaultValue:o,values:c,groupId:d,className:m}=e,u=n.Children.toArray(e.children),k=null!=c?c:u.map((e=>({value:e.props.value,label:e.props.label}))),h=null!=o?o:null==(t=u.find((e=>e.props.default)))?void 0:t.props.value,{tabGroupChoices:g,setTabGroupChoices:v}=l(),[N,I]=(0,n.useState)(h),f=[];if(null!=d){const e=g[d];null!=e&&e!==N&&k.some((t=>t.value===e))&&I(e)}const y=e=>{const t=e.currentTarget,a=f.indexOf(t),n=k[a].value;I(n),null!=d&&(v(d,n),setTimeout((()=>{(function(e){const{top:t,left:a,bottom:n,right:i}=e.getBoundingClientRect(),{innerHeight:l,innerWidth:r}=window;return t>=0&&i<=r&&n<=l&&a>=0})(t)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(p),setTimeout((()=>t.classList.remove(p)),2e3))}),150))},x=e=>{var t;let a=null;switch(e.key){case"ArrowRight":{const t=f.indexOf(e.target)+1;a=f[t]||f[0];break}case"ArrowLeft":{const t=f.indexOf(e.target)-1;a=f[t]||f[f.length-1];break}}null==(t=a)||t.focus()};return n.createElement("div",{className:"tabs-container"},n.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":i},m)},k.map((e=>{let{value:t,label:a}=e;return n.createElement("li",{role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,className:(0,r.Z)("tabs__item",s,{"tabs__item--active":N===t}),key:t,ref:e=>f.push(e),onKeyDown:x,onFocus:y,onClick:y},null!=a?a:t)}))),a?(0,n.cloneElement)(u.filter((e=>e.props.value===N))[0],{className:"margin-vert--md"}):n.createElement("div",{className:"margin-vert--md"},u.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}},79443:(e,t,a)=>{a.d(t,{Z:()=>n});const n=(0,a(67294).createContext)(void 0)},22211:(e,t,a)=>{a.r(t),a.d(t,{contentTitle:()=>p,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var n=a(87462),i=(a(67294),a(3905)),l=a(55064),r=a(58215);const s={title:"APISIX \u5b89\u88c5\u6307\u5357",keywords:["APISIX","APISIX \u5b89\u88c5\u6559\u7a0b","\u90e8\u7f72 APISIX"],description:"\u672c\u6587\u6863\u4e3b\u8981\u4ecb\u7ecd\u4e86 APISIX \u591a\u79cd\u5b89\u88c5\u65b9\u6cd5\u3002"},p=void 0,o={unversionedId:"installation-guide",id:"version-3.9/installation-guide",isDocsHomePage:!1,title:"APISIX \u5b89\u88c5\u6307\u5357",description:"\u672c\u6587\u6863\u4e3b\u8981\u4ecb\u7ecd\u4e86 APISIX \u591a\u79cd\u5b89\u88c5\u65b9\u6cd5\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.9/installation-guide.md",sourceDirName:".",slug:"/installation-guide",permalink:"/zh/docs/apisix/3.9/installation-guide",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.9/docs/zh/latest/installation-guide.md",tags:[],version:"3.9",frontMatter:{title:"APISIX \u5b89\u88c5\u6307\u5357",keywords:["APISIX","APISIX \u5b89\u88c5\u6559\u7a0b","\u90e8\u7f72 APISIX"],description:"\u672c\u6587\u6863\u4e3b\u8981\u4ecb\u7ecd\u4e86 APISIX \u591a\u79cd\u5b89\u88c5\u65b9\u6cd5\u3002"},sidebar:"version-3.9/docs",previous:{title:"\u9650\u901f",permalink:"/zh/docs/apisix/3.9/getting-started/rate-limiting"},next:{title:"\u8f6f\u4ef6\u67b6\u6784",permalink:"/zh/docs/apisix/3.9/architecture-design/apisix"}},c=[{value:"\u5b89\u88c5 APISIX",id:"\u5b89\u88c5-apisix",children:[{value:"\u901a\u8fc7 RPM \u4ed3\u5e93\u5b89\u88c5",id:"\u901a\u8fc7-rpm-\u4ed3\u5e93\u5b89\u88c5",children:[]},{value:"\u901a\u8fc7 RPM \u5305\u79bb\u7ebf\u5b89\u88c5\uff1a",id:"\u901a\u8fc7-rpm-\u5305\u79bb\u7ebf\u5b89\u88c5",children:[]},{value:"\u7ba1\u7406 APISIX \u670d\u52a1",id:"\u7ba1\u7406-apisix-\u670d\u52a1",children:[]},{value:"\u901a\u8fc7 DEB \u4ed3\u5e93\u5b89\u88c5",id:"\u901a\u8fc7-deb-\u4ed3\u5e93\u5b89\u88c5",children:[]},{value:"\u7ba1\u7406 APISIX \u670d\u52a1",id:"\u7ba1\u7406-apisix-\u670d\u52a1-1",children:[]}]},{value:"\u5b89\u88c5 etcd",id:"\u5b89\u88c5-etcd",children:[]},{value:"\u540e\u7eed\u64cd\u4f5c",id:"\u540e\u7eed\u64cd\u4f5c",children:[{value:"\u914d\u7f6e APISIX",id:"\u914d\u7f6e-apisix",children:[]},{value:"\u66f4\u65b0 Admin API key",id:"\u66f4\u65b0-admin-api-key",children:[]},{value:"\u4e3a APISIX \u6dfb\u52a0 systemd \u914d\u7f6e\u6587\u4ef6",id:"\u4e3a-apisix-\u6dfb\u52a0-systemd-\u914d\u7f6e\u6587\u4ef6",children:[]}]}],d={toc:c};function m(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u672c\u6587\u5c06\u4ecb\u7ecd\u5982\u4f55\u5728\u4f60\u7684\u73af\u5883\u4e2d\u5b89\u88c5\u5e76\u8fd0\u884c APISIX\u3002"),(0,i.kt)("p",null,"\u5173\u4e8e\u5982\u4f55\u5feb\u901f\u8fd0\u884c Apache APISIX\uff0c\u8bf7\u53c2\u8003",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.9/getting-started/README"},"\u5165\u95e8\u6307\u5357"),"\u3002"),(0,i.kt)("h2",{id:"\u5b89\u88c5-apisix"},"\u5b89\u88c5 APISIX"),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u9009\u62e9\u4ee5\u4e0b\u4efb\u610f\u4e00\u79cd\u65b9\u5f0f\u5b89\u88c5 APISIX\uff1a"),(0,i.kt)(l.Z,{groupId:"install-method",defaultValue:"docker",values:[{label:"Docker",value:"docker"},{label:"Helm",value:"helm"},{label:"RPM",value:"rpm"},{label:"DEB",value:"deb"},{label:"Source Code",value:"source code"}],mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"docker",mdxType:"TabItem"},(0,i.kt)("p",null,"\u4f7f\u7528\u6b64\u65b9\u6cd5\u5b89\u88c5 APISIX\uff0c\u4f60\u9700\u8981\u5b89\u88c5 ",(0,i.kt)("a",{parentName:"p",href:"https://www.docker.com/"},"Docker")," \u548c ",(0,i.kt)("a",{parentName:"p",href:"https://docs.docker.com/compose/"},"Docker Compose"),"\u3002"),(0,i.kt)("p",null,"\u9996\u5148\u4e0b\u8f7d ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-docker"},"apisix-docker")," \u4ed3\u5e93\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"git clone https://github.com/apache/apisix-docker.git\ncd apisix-docker/example\n")),(0,i.kt)("p",null,"\u7136\u540e\uff0c\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"docker-compose")," \u542f\u7528 APISIX\u3002"),(0,i.kt)(l.Z,{groupId:"cpu-arch",defaultValue:"x86",values:[{label:"x86",value:"x86"},{label:"ARM/M1",value:"arm"}],mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"x86",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"docker-compose -p docker-apisix up -d\n"))),(0,i.kt)(r.Z,{value:"arm",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"docker-compose -p docker-apisix -f docker-compose-arm64.yml up -d\n"))))),(0,i.kt)(r.Z,{value:"helm",mdxType:"TabItem"},(0,i.kt)("p",null,"\u901a\u8fc7 Helm \u5b89\u88c5 APISIX\uff0c\u8bf7\u6267\u884c\u4ee5\u4e0b\u547d\u4ee4\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"helm repo add apisix https://charts.apiseven.com\nhelm repo update\nhelm install apisix apisix/apisix --create-namespace  --namespace apisix\n")),(0,i.kt)("p",null,"\u4f60\u53ef\u4ee5\u4ece ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/apache/apisix-helm-chart"},"apisix-helm-chart")," \u4ed3\u5e93\u627e\u5230\u5176\u4ed6\u7ec4\u4ef6\u3002")),(0,i.kt)(r.Z,{value:"rpm",mdxType:"TabItem"},(0,i.kt)("p",null,"\u8be5\u5b89\u88c5\u65b9\u6cd5\u9002\u7528\u4e8e CentOS 7 \u548c CentOS 8\u3002\u5982\u679c\u4f60\u9009\u62e9\u8be5\u65b9\u6cd5\u5b89\u88c5 APISIX\uff0c\u9700\u8981\u5148\u5b89\u88c5 etcd\u3002\u5177\u4f53\u5b89\u88c5\u65b9\u6cd5\u8bf7\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"#%E5%AE%89%E8%A3%85-etcd"},"\u5b89\u88c5 etcd"),"\u3002"),(0,i.kt)("h3",{id:"\u901a\u8fc7-rpm-\u4ed3\u5e93\u5b89\u88c5"},"\u901a\u8fc7 RPM \u4ed3\u5e93\u5b89\u88c5"),(0,i.kt)("p",null,"\u5982\u679c\u5f53\u524d\u7cfb\u7edf",(0,i.kt)("strong",{parentName:"p"},"\u6ca1\u6709\u5b89\u88c5 OpenResty"),"\uff0c\u8bf7\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u6765\u5b89\u88c5 OpenResty \u548c APISIX \u4ed3\u5e93\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo yum install -y https://repos.apiseven.com/packages/centos/apache-apisix-repo-1.0-1.noarch.rpm\n")),(0,i.kt)("p",null,"\u5982\u679c\u5df2\u5b89\u88c5 OpenResty \u7684\u5b98\u65b9 RPM \u4ed3\u5e93\uff0c\u8bf7\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u5b89\u88c5 APISIX \u7684 RPM \u4ed3\u5e93\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo yum-config-manager --add-repo https://repos.apiseven.com/packages/centos/apache-apisix.repo\n")),(0,i.kt)("p",null,"\u5b8c\u6210\u4e0a\u8ff0\u64cd\u4f5c\u540e\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u5b89\u88c5 APISIX\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo yum install apisix\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4f60\u4e5f\u53ef\u4ee5\u5b89\u88c5\u6307\u5b9a\u7248\u672c\u7684 APISIX\uff08\u672c\u793a\u4f8b\u4e3a APISIX v3.8.0 \u7248\u672c\uff09\uff1a"),(0,i.kt)("pre",{parentName:"div"},(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo yum install apisix-3.8.0\n")))),(0,i.kt)("h3",{id:"\u901a\u8fc7-rpm-\u5305\u79bb\u7ebf\u5b89\u88c5"},"\u901a\u8fc7 RPM \u5305\u79bb\u7ebf\u5b89\u88c5\uff1a"),(0,i.kt)("p",null,"\u5c06 APISIX \u79bb\u7ebf RPM \u5305\u4e0b\u8f7d\u5230 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix")," \u6587\u4ef6\u5939\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo mkdir -p apisix\nsudo yum install -y https://repos.apiseven.com/packages/centos/apache-apisix-repo-1.0-1.noarch.rpm\nsudo yum clean all && yum makecache\nsudo yum install -y --downloadonly --downloaddir=./apisix apisix\n")),(0,i.kt)("p",null,"\u7136\u540e\u5c06 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix")," \u6587\u4ef6\u5939\u590d\u5236\u5230\u76ee\u6807\u4e3b\u673a\u5e76\u8fd0\u884c\u4ee5\u4e0b\u547d\u4ee4\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo yum install ./apisix/*.rpm\n")),(0,i.kt)("h3",{id:"\u7ba1\u7406-apisix-\u670d\u52a1"},"\u7ba1\u7406 APISIX \u670d\u52a1"),(0,i.kt)("p",null,"APISIX \u5b89\u88c5\u5b8c\u6210\u540e\uff0c\u4f60\u53ef\u4ee5\u8fd0\u884c\u4ee5\u4e0b\u547d\u4ee4\u521d\u59cb\u5316 NGINX \u914d\u7f6e\u6587\u4ef6\u548c etcd\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"apisix init\n")),(0,i.kt)("p",null,"\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u542f\u52a8 APISIX\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"apisix start\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4f60\u53ef\u4ee5\u8fd0\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix help")," \u547d\u4ee4\uff0c\u901a\u8fc7\u67e5\u770b\u8fd4\u56de\u7ed3\u679c\uff0c\u83b7\u53d6\u5176\u4ed6\u64cd\u4f5c\u7684\u547d\u4ee4\u53ca\u63cf\u8ff0\u3002")))),(0,i.kt)(r.Z,{value:"deb",mdxType:"TabItem"},(0,i.kt)("h3",{id:"\u901a\u8fc7-deb-\u4ed3\u5e93\u5b89\u88c5"},"\u901a\u8fc7 DEB \u4ed3\u5e93\u5b89\u88c5"),(0,i.kt)("p",null,"\u76ee\u524d APISIX \u652f\u6301\u7684 DEB \u4ed3\u5e93\u4ec5\u652f\u6301 Debian 11\uff08Bullseye\uff09\uff0c\u5e76\u4e14\u652f\u6301 amd64 \u548c arm64 \u67b6\u6784\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'# amd64\nwget -O - http://repos.apiseven.com/pubkey.gpg | sudo apt-key add -\necho "deb http://repos.apiseven.com/packages/debian bullseye main" | sudo tee /etc/apt/sources.list.d/apisix.list\n\n# arm64\nwget -O - http://repos.apiseven.com/pubkey.gpg | sudo apt-key add -\necho "deb http://repos.apiseven.com/packages/arm64/debian bullseye main" | sudo tee /etc/apt/sources.list.d/apisix.list\n')),(0,i.kt)("p",null,"\u5b8c\u6210\u4e0a\u8ff0\u64cd\u4f5c\u540e\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u5b89\u88c5 APISIX\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo apt update\nsudo apt install -y apisix=3.8.0-0\n")),(0,i.kt)("h3",{id:"\u7ba1\u7406-apisix-\u670d\u52a1-1"},"\u7ba1\u7406 APISIX \u670d\u52a1"),(0,i.kt)("p",null,"APISIX \u5b89\u88c5\u5b8c\u6210\u540e\uff0c\u4f60\u53ef\u4ee5\u8fd0\u884c\u4ee5\u4e0b\u547d\u4ee4\u521d\u59cb\u5316 NGINX \u914d\u7f6e\u6587\u4ef6\u548c etcd\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo apisix init\n")),(0,i.kt)("p",null,"\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\u542f\u52a8 APISIX\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sudo apisix start\n")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u4f60\u53ef\u4ee5\u8fd0\u884c ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix help")," \u547d\u4ee4\uff0c\u901a\u8fc7\u67e5\u770b\u8fd4\u56de\u7ed3\u679c\uff0c\u83b7\u53d6\u5176\u4ed6\u64cd\u4f5c\u7684\u547d\u4ee4\u53ca\u63cf\u8ff0\u3002")))),(0,i.kt)(r.Z,{value:"source code",mdxType:"TabItem"},(0,i.kt)("p",null,"\u5982\u679c\u4f60\u60f3\u8981\u4f7f\u7528\u6e90\u7801\u6784\u5efa APISIX\uff0c\u8bf7\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.9/building-apisix"},"\u6e90\u7801\u5b89\u88c5 APISIX"),"\u3002"))),(0,i.kt)("h2",{id:"\u5b89\u88c5-etcd"},"\u5b89\u88c5 etcd"),(0,i.kt)("p",null,"APISIX \u4f7f\u7528 ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/etcd-io/etcd"},"etcd")," \u4f5c\u4e3a\u914d\u7f6e\u4e2d\u5fc3\u8fdb\u884c\u4fdd\u5b58\u548c\u540c\u6b65\u914d\u7f6e\u3002\u5728\u5b89\u88c5 APISIX \u4e4b\u524d\uff0c\u9700\u8981\u5728\u4f60\u7684\u4e3b\u673a\u4e0a\u5b89\u88c5 etcd\u3002"),(0,i.kt)("p",null,"\u5982\u679c\u4f60\u5728\u5b89\u88c5 APISIX \u65f6\u9009\u62e9\u4e86 Docker \u6216 Helm \u5b89\u88c5\uff0c\u90a3\u4e48 etcd \u5c06\u4f1a\u81ea\u52a8\u5b89\u88c5\uff1b\u5982\u679c\u4f60\u9009\u62e9\u5176\u4ed6\u65b9\u6cd5\u6216\u8005\u9700\u8981\u624b\u52a8\u5b89\u88c5 APISIX\uff0c\u8bf7\u53c2\u8003\u4ee5\u4e0b\u6b65\u9aa4\u5b89\u88c5 etcd\uff1a"),(0,i.kt)(l.Z,{groupId:"os",defaultValue:"linux",values:[{label:"Linux",value:"linux"},{label:"macOS",value:"mac"}],mdxType:"Tabs"},(0,i.kt)(r.Z,{value:"linux",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"ETCD_VERSION='3.5.4'\nwget https://github.com/etcd-io/etcd/releases/download/v${ETCD_VERSION}/etcd-v${ETCD_VERSION}-linux-amd64.tar.gz\ntar -xvf etcd-v${ETCD_VERSION}-linux-amd64.tar.gz && \\\n  cd etcd-v${ETCD_VERSION}-linux-amd64 && \\\n  sudo cp -a etcd etcdctl /usr/bin/\nnohup etcd >/tmp/etcd.log 2>&1 &\n"))),(0,i.kt)(r.Z,{value:"mac",mdxType:"TabItem"},(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"brew install etcd\nbrew services start etcd\n")))),(0,i.kt)("h2",{id:"\u540e\u7eed\u64cd\u4f5c"},"\u540e\u7eed\u64cd\u4f5c"),(0,i.kt)("h3",{id:"\u914d\u7f6e-apisix"},"\u914d\u7f6e APISIX"),(0,i.kt)("p",null,"\u901a\u8fc7\u4fee\u6539\u672c\u5730 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u6587\u4ef6\uff0c\u6216\u8005\u5728\u542f\u52a8 APISIX \u65f6\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"-c")," \u6216 ",(0,i.kt)("inlineCode",{parentName:"p"},"--config")," \u6dfb\u52a0\u6587\u4ef6\u8def\u5f84\u53c2\u6570 ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix start -c <path string>"),"\uff0c\u5b8c\u6210\u5bf9 APISIX \u670d\u52a1\u672c\u8eab\u7684\u57fa\u672c\u914d\u7f6e\u3002"),(0,i.kt)("p",null,"\u6bd4\u5982\u5c06 APISIX \u9ed8\u8ba4\u76d1\u542c\u7aef\u53e3\u4fee\u6539\u4e3a 8000\uff0c\u5176\u4ed6\u914d\u7f6e\u4fdd\u6301\u9ed8\u8ba4\uff0c\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u4e2d\u53ea\u9700\u8fd9\u6837\u914d\u7f6e\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},"apisix:\n  node_listen: 8000 # APISIX listening port\n")),(0,i.kt)("p",null,"\u6bd4\u5982\u6307\u5b9a APISIX \u9ed8\u8ba4\u76d1\u542c\u7aef\u53e3\u4e3a 8000\uff0c\u5e76\u4e14\u8bbe\u7f6e etcd \u5730\u5740\u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"http://foo:2379"),"\uff0c\u5176\u4ed6\u914d\u7f6e\u4fdd\u6301\u9ed8\u8ba4\u3002\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u4e2d\u53ea\u9700\u8fd9\u6837\u914d\u7f6e\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},'apisix:\n  node_listen: 8000 # APISIX listening port\n\ndeployment:\n  role: traditional\n  role_traditional:\n    config_provider: etcd\n  etcd:\n    host:\n      - "http://foo:2379"\n')),(0,i.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"APISIX \u7684\u9ed8\u8ba4\u914d\u7f6e\u53ef\u4ee5\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config-default.yaml")," \u6587\u4ef6\u4e2d\u770b\u5230\uff0c\u8be5\u6587\u4ef6\u4e0e APISIX \u6e90\u7801\u5f3a\u7ed1\u5b9a\uff0c\u8bf7\u4e0d\u8981\u624b\u52a8\u4fee\u6539 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config-default.yaml")," \u6587\u4ef6\u3002\u5982\u679c\u9700\u8981\u81ea\u5b9a\u4e49\u4efb\u4f55\u914d\u7f6e\uff0c\u90fd\u5e94\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u6587\u4ef6\u4e2d\u5b8c\u6210\u3002"))),(0,i.kt)("div",{className:"admonition admonition-warning alert alert--danger"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"warning")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"\u8bf7\u4e0d\u8981\u624b\u52a8\u4fee\u6539 APISIX \u5b89\u88c5\u76ee\u5f55\u4e0b\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"./conf/nginx.conf")," \u6587\u4ef6\u3002\u5f53 APISIX \u542f\u52a8\u65f6\uff0c\u4f1a\u6839\u636e ",(0,i.kt)("inlineCode",{parentName:"p"},"config.yaml")," \u7684\u914d\u7f6e\u81ea\u52a8\u751f\u6210\u65b0\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"nginx.conf")," \u5e76\u81ea\u52a8\u542f\u52a8\u670d\u52a1\u3002"))),(0,i.kt)("h3",{id:"\u66f4\u65b0-admin-api-key"},"\u66f4\u65b0 Admin API key"),(0,i.kt)("p",null,"\u5efa\u8bae\u4fee\u6539 Admin API \u7684 key\uff0c\u4fdd\u62a4 APISIX \u7684\u5b89\u5168\u3002"),(0,i.kt)("p",null,"\u8bf7\u53c2\u8003\u5982\u4e0b\u4fe1\u606f\u66f4\u65b0\u914d\u7f6e\u6587\u4ef6\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},'deployment:\n  admin:\n    admin_key\n      -\n        name: "admin"\n        key: newsupersecurekey  # \u8bf7\u4fee\u6539 key \u7684\u503c\n        role: admin\n')),(0,i.kt)("p",null,"\u66f4\u65b0\u5b8c\u6210\u540e\uff0c\u4f60\u53ef\u4ee5\u4f7f\u7528\u65b0\u7684 key \u8bbf\u95ee Admin API\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9180/apisix/admin/routes?api_key=newsupersecurekey -i\n")),(0,i.kt)("h3",{id:"\u4e3a-apisix-\u6dfb\u52a0-systemd-\u914d\u7f6e\u6587\u4ef6"},"\u4e3a APISIX \u6dfb\u52a0 systemd \u914d\u7f6e\u6587\u4ef6"),(0,i.kt)("p",null,"\u5982\u679c\u4f60\u662f\u901a\u8fc7 RPM \u5305\u5b89\u88c5 APISIX\uff0c\u914d\u7f6e\u6587\u4ef6\u5df2\u7ecf\u81ea\u52a8\u5b89\u88c5\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528\u4ee5\u4e0b\u547d\u4ee4\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"systemctl start apisix\nsystemctl stop apisix\n")),(0,i.kt)("p",null,"\u5982\u679c\u4f60\u662f\u901a\u8fc7\u5176\u4ed6\u65b9\u6cd5\u5b89\u88c5\u7684 APISIX\uff0c\u53ef\u4ee5\u53c2\u8003",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-build-tools/blob/master/usr/lib/systemd/system/apisix.service"},"\u914d\u7f6e\u6587\u4ef6\u6a21\u677f"),"\u8fdb\u884c\u4fee\u6539\uff0c\u5e76\u5c06\u5176\u6dfb\u52a0\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"/usr/lib/systemd/system/apisix.service")," \u8def\u5f84\u4e0b\u3002"),(0,i.kt)("p",null,"\u5982\u9700\u4e86\u89e3 APISIX \u540e\u7eed\u4f7f\u7528\uff0c\u8bf7\u53c2\u8003",(0,i.kt)("a",{parentName:"p",href:"/zh/docs/apisix/3.9/getting-started/README"},"\u5165\u95e8\u6307\u5357"),"\u83b7\u53d6\u66f4\u591a\u4fe1\u606f\u3002"))}m.isMDXComponent=!0},86010:(e,t,a)=>{function n(e){var t,a,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=n(e[t]))&&(i&&(i+=" "),i+=a);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}a.d(t,{Z:()=>i});const i=function(){for(var e,t,a=0,i="";a<arguments.length;)(e=arguments[a++])&&(t=n(e))&&(i&&(i+=" "),i+=t);return i}}}]);