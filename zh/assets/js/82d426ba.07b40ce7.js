"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[3376],{3905:(e,t,r)=>{r.d(t,{Zo:()=>g,kt:()=>m});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},g=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,p=e.parentName,g=i(e,["components","mdxType","originalType","parentName"]),c=s(r),m=a,d=c["".concat(p,".").concat(m)]||c[m]||u[m]||l;return r?n.createElement(d,o(o({ref:t},g),{},{components:r})):n.createElement(d,o({ref:t},g))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=c;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}c.displayName="MDXCreateElement"},55480:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>g,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=r(87462),a=(r(67294),r(3905));const l={title:"log-rotate",keywords:["APISIX","API \u7f51\u5173","Plugin","\u65e5\u5fd7\u5207\u5206"],description:"\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX log-rotate \u63d2\u4ef6\u7528\u4e8e\u5b9a\u671f\u5207\u5206\u65e5\u5fd7\u76ee\u5f55\u4e0b\u7684\u8bbf\u95ee\u65e5\u5fd7\u548c\u9519\u8bef\u65e5\u5fd7\u3002"},o=void 0,i={unversionedId:"plugins/log-rotate",id:"version-3.11/plugins/log-rotate",isDocsHomePage:!1,title:"log-rotate",description:"\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX log-rotate \u63d2\u4ef6\u7528\u4e8e\u5b9a\u671f\u5207\u5206\u65e5\u5fd7\u76ee\u5f55\u4e0b\u7684\u8bbf\u95ee\u65e5\u5fd7\u548c\u9519\u8bef\u65e5\u5fd7\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-3.11/plugins/log-rotate.md",sourceDirName:"plugins",slug:"/plugins/log-rotate",permalink:"/zh/docs/apisix/3.11/plugins/log-rotate",editUrl:"/zh/edit#https://github.com/apache/apisix/edit/release/3.11/docs/zh/latest/plugins/log-rotate.md",tags:[],version:"3.11",frontMatter:{title:"log-rotate",keywords:["APISIX","API \u7f51\u5173","Plugin","\u65e5\u5fd7\u5207\u5206"],description:"\u4e91\u539f\u751f API \u7f51\u5173 Apache APISIX log-rotate \u63d2\u4ef6\u7528\u4e8e\u5b9a\u671f\u5207\u5206\u65e5\u5fd7\u76ee\u5f55\u4e0b\u7684\u8bbf\u95ee\u65e5\u5fd7\u548c\u9519\u8bef\u65e5\u5fd7\u3002"},sidebar:"version-3.11/docs",previous:{title:"syslog",permalink:"/zh/docs/apisix/3.11/plugins/syslog"},next:{title:"error-log-logger",permalink:"/zh/docs/apisix/3.11/plugins/error-log-logger"}},p=[{value:"\u63cf\u8ff0",id:"\u63cf\u8ff0",children:[]},{value:"\u53c2\u6570",id:"\u53c2\u6570",children:[]},{value:"\u542f\u7528\u63d2\u4ef6",id:"\u542f\u7528\u63d2\u4ef6",children:[]},{value:"\u5220\u9664\u63d2\u4ef6",id:"\u5220\u9664\u63d2\u4ef6",children:[]}],s={toc:p};function g(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"\u63cf\u8ff0"},"\u63cf\u8ff0"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"log-rotate")," \u63d2\u4ef6\u7528\u4e8e\u5b9a\u671f\u5207\u5206\u65e5\u5fd7\u76ee\u5f55\u4e0b\u7684\u8bbf\u95ee\u65e5\u5fd7\u548c\u9519\u8bef\u65e5\u5fd7\u3002"),(0,a.kt)("p",null,"\u4f60\u53ef\u4ee5\u81ea\u5b9a\u4e49\u65e5\u5fd7\u8f6e\u6362\u7684\u9891\u7387\u4ee5\u53ca\u8981\u4fdd\u7559\u7684\u65e5\u5fd7\u6570\u91cf\u3002\u5f53\u65e5\u5fd7\u6570\u91cf\u8d85\u8fc7\u9650\u5236\u65f6\uff0c\u65e7\u7684\u65e5\u5fd7\u4f1a\u88ab\u81ea\u52a8\u5220\u9664\u3002"),(0,a.kt)("h2",{id:"\u53c2\u6570"},"\u53c2\u6570"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,a.kt)("th",{parentName:"tr",align:null},"\u7c7b\u578b"),(0,a.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,a.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,a.kt)("th",{parentName:"tr",align:null},"\u6709\u6548\u503c"),(0,a.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"interval"),(0,a.kt)("td",{parentName:"tr",align:null},"integer"),(0,a.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,a.kt)("td",{parentName:"tr",align:null},"60 * 60"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u6bcf\u95f4\u9694\u591a\u957f\u65f6\u95f4\u5207\u5206\u4e00\u6b21\u65e5\u5fd7\uff0c\u4ee5\u79d2\u4e3a\u5355\u4f4d\u3002")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"max_kept"),(0,a.kt)("td",{parentName:"tr",align:null},"integer"),(0,a.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,a.kt)("td",{parentName:"tr",align:null},"24 * 7"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u6700\u591a\u4fdd\u7559\u591a\u5c11\u4efd\u5386\u53f2\u65e5\u5fd7\uff0c\u8d85\u8fc7\u6307\u5b9a\u6570\u91cf\u540e\uff0c\u81ea\u52a8\u5220\u9664\u8001\u6587\u4ef6\u3002")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"max_size"),(0,a.kt)("td",{parentName:"tr",align:null},"integer"),(0,a.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,a.kt)("td",{parentName:"tr",align:null},"-1"),(0,a.kt)("td",{parentName:"tr",align:null}),(0,a.kt)("td",{parentName:"tr",align:null},"\u65e5\u5fd7\u6587\u4ef6\u8d85\u8fc7\u6307\u5b9a\u5927\u5c0f\u65f6\u8fdb\u884c\u5207\u5206\uff0c\u5355\u4f4d\u4e3a Byte\u3002\u5982\u679c ",(0,a.kt)("inlineCode",{parentName:"td"},"max_size")," \u5c0f\u4e8e 0 \u6216\u8005\u6839\u636e ",(0,a.kt)("inlineCode",{parentName:"td"},"interval")," \u8ba1\u7b97\u7684\u65f6\u95f4\u5230\u8fbe\u65f6\uff0c\u5c06\u4e0d\u4f1a\u6839\u636e ",(0,a.kt)("inlineCode",{parentName:"td"},"max_size")," \u5207\u5206\u65e5\u5fd7\u3002")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"enable_compression"),(0,a.kt)("td",{parentName:"tr",align:null},"boolean"),(0,a.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,a.kt)("td",{parentName:"tr",align:null},"false"),(0,a.kt)("td",{parentName:"tr",align:null},"[false, true]"),(0,a.kt)("td",{parentName:"tr",align:null},"\u5f53\u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"td"},"true")," \u65f6\uff0c\u542f\u7528\u65e5\u5fd7\u6587\u4ef6\u538b\u7f29\u3002\u8be5\u529f\u80fd\u9700\u8981\u5728\u7cfb\u7edf\u4e2d\u5b89\u88c5 ",(0,a.kt)("inlineCode",{parentName:"td"},"tar")," \u3002")))),(0,a.kt)("p",null,"\u5f00\u542f\u8be5\u63d2\u4ef6\u540e\uff0c\u5c31\u4f1a\u6309\u7167\u53c2\u6570\u81ea\u52a8\u5207\u5206\u65e5\u5fd7\u6587\u4ef6\u4e86\u3002\u6bd4\u5982\u4ee5\u4e0b\u793a\u4f8b\u662f\u6839\u636e ",(0,a.kt)("inlineCode",{parentName:"p"},"interval: 10")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"max_kept: 10")," \u5f97\u5230\u7684\u6837\u672c\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"ll logs\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"total 44K\n-rw-r--r--. 1 resty resty    0 Mar 20 20:33 2020-03-20_20-33-40_access.log\n-rw-r--r--. 1 resty resty 2.8K Mar 20 20:33 2020-03-20_20-33-40_error.log\n-rw-r--r--. 1 resty resty    0 Mar 20 20:33 2020-03-20_20-33-50_access.log\n-rw-r--r--. 1 resty resty 2.4K Mar 20 20:33 2020-03-20_20-33-50_error.log\n-rw-r--r--. 1 resty resty    0 Mar 20 20:33 2020-03-20_20-34-00_access.log\n-rw-r--r--. 1 resty resty 2.4K Mar 20 20:34 2020-03-20_20-34-00_error.log\n-rw-r--r--. 1 resty resty    0 Mar 20 20:34 2020-03-20_20-34-10_access.log\n-rw-r--r--. 1 resty resty 2.4K Mar 20 20:34 2020-03-20_20-34-10_error.log\n-rw-r--r--. 1 resty resty    0 Mar 20 20:34 access.log\n-rw-r--r--. 1 resty resty 1.5K Mar 20 21:31 error.log\n")),(0,a.kt)("p",null,"\u5f53\u5f00\u542f\u65e5\u5fd7\u6587\u4ef6\u538b\u7f29\u65f6\uff0c\u65e5\u5fd7\u6587\u4ef6\u540d\u79f0\u5982\u4e0b\u6240\u793a\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"ll logs\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"total 10.5K\n-rw-r--r--. 1 resty resty  1.5K Mar 20 20:33 2020-03-20_20-33-50_access.log.tar.gz\n-rw-r--r--. 1 resty resty  1.5K Mar 20 20:33 2020-03-20_20-33-50_error.log.tar.gz\n-rw-r--r--. 1 resty resty  1.5K Mar 20 20:33 2020-03-20_20-34-00_access.log.tar.gz\n-rw-r--r--. 1 resty resty  1.5K Mar 20 20:34 2020-03-20_20-34-00_error.log.tar.gz\n-rw-r--r--. 1 resty resty  1.5K Mar 20 20:34 2020-03-20_20-34-10_access.log.tar.gz\n-rw-r--r--. 1 resty resty  1.5K Mar 20 20:34 2020-03-20_20-34-10_error.log.tar.gz\n-rw-r--r--. 1 resty resty    0 Mar 20 20:34 access.log\n-rw-r--r--. 1 resty resty 1.5K Mar 20 21:31 error.log\n")),(0,a.kt)("h2",{id:"\u542f\u7528\u63d2\u4ef6"},"\u542f\u7528\u63d2\u4ef6"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u8be5\u63d2\u4ef6\u9ed8\u8ba4\u4e3a\u7981\u7528\u72b6\u6001"),"\uff0c\u4f60\u53ef\u4ee5\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u4e2d\u542f\u7528 ",(0,a.kt)("inlineCode",{parentName:"p"},"log-rotate")," \u63d2\u4ef6\uff0c\u4e0d\u9700\u8981\u5728\u4efb\u4f55\u8def\u7531\u6216\u670d\u52a1\u4e2d\u7ed1\u5b9a\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="./conf/config.yaml"',title:'"./conf/config.yaml"'},"plugins:\n    # the plugins you enabled\n    - log-rotate\n\nplugin_attr:\n    log-rotate:\n        interval: 3600    # rotate interval (unit: second)\n        max_kept: 168     # max number of log files will be kept\n        max_size: -1      # max size of log files will be kept\n        enable_compression: false    # enable log file compression(gzip) or not, default false\n")),(0,a.kt)("p",null,"\u914d\u7f6e\u5b8c\u6210\uff0c\u4f60\u9700\u8981\u91cd\u65b0\u52a0\u8f7d APISIX\u3002"),(0,a.kt)("h2",{id:"\u5220\u9664\u63d2\u4ef6"},"\u5220\u9664\u63d2\u4ef6"),(0,a.kt)("p",null,"\u5f53\u4f60\u4e0d\u518d\u9700\u8981\u8be5\u63d2\u4ef6\u65f6\uff0c\u53ea\u9700\u8981\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"./conf/config.yaml")," \u4e2d\u5220\u9664\u6216\u6ce8\u91ca\u8be5\u63d2\u4ef6\u5373\u53ef\u3002"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yaml"},"plugins:\n    # the plugins you enabled\n    # - log-rotate\n\nplugin_attr:\n\n")))}g.isMDXComponent=!0}}]);