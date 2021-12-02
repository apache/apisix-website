"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[51457],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=a,f=d["".concat(c,".").concat(m)]||d[m]||s[m]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},70202:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return p},default:function(){return s}});var r=n(87462),a=n(63366),o=(n(67294),n(3905)),i={title:"\u6279\u5904\u7406\u5668"},l=void 0,c={unversionedId:"batch-processor",id:"version-2.11/batch-processor",isDocsHomePage:!1,title:"\u6279\u5904\u7406\u5668",description:"\x3c!--",source:"@site/i18n/zh/docusaurus-plugin-content-docs-docs-apisix/version-2.11/batch-processor.md",sourceDirName:".",slug:"/batch-processor",permalink:"/zh/docs/apisix/batch-processor",editUrl:"https://github.com/apache/apisix/edit/release/2.11/docs/zh/latest/batch-processor.md",tags:[],version:"2.11",frontMatter:{title:"\u6279\u5904\u7406\u5668"},sidebar:"version-2.11/docs",previous:{title:"\u8bc1\u4e66",permalink:"/zh/docs/apisix/certificate"},next:{title:"\u538b\u529b\u6d4b\u8bd5",permalink:"/zh/docs/apisix/benchmark"}},p=[{value:"\u914d\u7f6e",id:"\u914d\u7f6e",children:[]}],u={toc:p};function s(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u6279\u5904\u7406\u5668\u53ef\u7528\u4e8e\u805a\u5408\u6761\u76ee\uff08\u65e5\u5fd7/\u4efb\u4f55\u6570\u636e\uff09\u5e76\u8fdb\u884c\u6279\u5904\u7406\u3002\n\u5f53 ",(0,o.kt)("inlineCode",{parentName:"p"},"batch_max_size")," \u8bbe\u7f6e\u4e3a\u96f6\u65f6\uff0c\u5904\u7406\u5668\u5c06\u7acb\u5373\u6267\u884c\u6bcf\u4e2a\u6761\u76ee\u3002\u5c06\u6279\u5904\u7406\u7684\u6700\u5927\u503c\u8bbe\u7f6e\u4e3a\u5927\u4e8e 1 \u5c06\u5f00\u59cb\u805a\u5408\u6761\u76ee\uff0c\u76f4\u5230\u8fbe\u5230\u6700\u5927\u503c\u6216\u8d85\u65f6\u3002"),(0,o.kt)("h2",{id:"\u914d\u7f6e"},"\u914d\u7f6e"),(0,o.kt)("p",null,"\u521b\u5efa\u6279\u5904\u7406\u5668\u7684\u552f\u4e00\u5fc5\u9700\u53c2\u6570\u662f\u51fd\u6570\u3002\u5f53\u6279\u5904\u7406\u8fbe\u5230\u6700\u5927\u503c\u6216\u7f13\u51b2\u533a\u6301\u7eed\u65f6\u95f4\u8d85\u8fc7\u65f6\uff0c\u51fd\u6570\u5c06\u88ab\u6267\u884c\u3002"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"\u540d\u79f0"),(0,o.kt)("th",{parentName:"tr",align:null},"\u5fc5\u9009\u9879"),(0,o.kt)("th",{parentName:"tr",align:null},"\u63cf\u8ff0"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"name"),(0,o.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009\u7684"),(0,o.kt)("td",{parentName:"tr",align:null},"\u6807\u8bc6\u6279\u5904\u7406\u8005\u7684\u552f\u4e00\u6807\u8bc6\u7b26")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"batch_max_size"),(0,o.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009\u7684"),(0,o.kt)("td",{parentName:"tr",align:null},"\u6bcf\u6279\u7684\u6700\u5927\u5927\u5c0f\uff0c\u9ed8\u8ba4\u4e3a ",(0,o.kt)("inlineCode",{parentName:"td"},"1000"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"inactive_timeout"),(0,o.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009\u7684"),(0,o.kt)("td",{parentName:"tr",align:null},"\u5982\u679c\u4e0d\u6d3b\u52a8\uff0c\u5c06\u5237\u65b0\u7f13\u51b2\u533a\u7684\u6700\u5927\u65f6\u95f4\uff08\u4ee5\u79d2\u4e3a\u5355\u4f4d\uff09\uff0c\u9ed8\u8ba4\u503c\u4e3a ",(0,o.kt)("inlineCode",{parentName:"td"},"5"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"buffer_duration"),(0,o.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009\u7684"),(0,o.kt)("td",{parentName:"tr",align:null},"\u5fc5\u987b\u5148\u5904\u7406\u6279\u6b21\u4e2d\u6700\u65e7\u6761\u76ee\u7684\u6700\u5927\u671f\u9650\uff08\u4ee5\u79d2\u4e3a\u5355\u4f4d\uff09\uff0c\u9ed8\u8ba4\u662f ",(0,o.kt)("inlineCode",{parentName:"td"},"5"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"max_retry_count"),(0,o.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009\u7684"),(0,o.kt)("td",{parentName:"tr",align:null},"\u4ece\u5904\u7406\u7ba1\u9053\u4e2d\u79fb\u9664\u4e4b\u524d\u7684\u6700\u5927\u91cd\u8bd5\u6b21\u6570\uff1b\u9ed8\u8ba4\u4e3a ",(0,o.kt)("inlineCode",{parentName:"td"},"0"))),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"retry_delay"),(0,o.kt)("td",{parentName:"tr",align:null},"\u53ef\u9009\u7684"),(0,o.kt)("td",{parentName:"tr",align:null},"\u5982\u679c\u6267\u884c\u5931\u8d25\uff0c\u5e94\u8be5\u5ef6\u8fdf\u8fdb\u7a0b\u6267\u884c\u7684\u79d2\u6570\uff1b\u9ed8\u8ba4\u4e3a ",(0,o.kt)("inlineCode",{parentName:"td"},"1"))))),(0,o.kt)("p",null,"\u4ee5\u4e0b\u4ee3\u7801\u663e\u793a\u4e86\u5982\u4f55\u4f7f\u7528\u6279\u5904\u7406\u7a0b\u5e8f\u7684\u793a\u4f8b\u3002\u6279\u5904\u7406\u5668\u5c06\u4e00\u4e2a\u8981\u6267\u884c\u7684\u51fd\u6570\u4f5c\u4e3a\u7b2c\u4e00\u4e2a\u53c2\u6570\uff0c\u5c06\u6279\u5904\u7406\u914d\u7f6e\u4f5c\u4e3a\u7b2c\u4e8c\u4e2a\u53c2\u6570\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-lua"},"local bp = require(\"apisix.utils.batch-processor\")\nlocal func_to_execute = function(entries)\n            -- serialize to json array core.json.encode(entries)\n            -- process/send data\n            return true\n       end\n\nlocal config = {\n    max_retry_count  = 2,\n    buffer_duration  = 60,\n    inactive_timeout  = 5,\n    batch_max_size = 1,\n    retry_delay  = 0\n}\n\n\nlocal batch_processor, err = bp:new(func_to_execute, config)\n\nif batch_processor then\n    batch_processor:push({hello='world'})\nend\n")),(0,o.kt)("p",null,"\u6ce8\u610f\uff1a\u8bf7\u786e\u4fdd\u6279\u5904\u7406\u7684\u6700\u5927\u503c\uff08\u6761\u76ee\u6570\uff09\u5728\u51fd\u6570\u6267\u884c\u7684\u8303\u56f4\u5185\u3002\n\u5237\u65b0\u6279\u5904\u7406\u7684\u8ba1\u65f6\u5668\u57fa\u4e8e ",(0,o.kt)("inlineCode",{parentName:"p"},"inactive_timeout")," \u914d\u7f6e\u8fd0\u884c\u3002\u56e0\u6b64\uff0c\u4e3a\u4e86\u83b7\u5f97\u6700\u4f73\u4f7f\u7528\u6548\u679c\uff0c\n\u4fdd\u6301 ",(0,o.kt)("inlineCode",{parentName:"p"},"inactive_timeout")," \u5c0f\u4e8e ",(0,o.kt)("inlineCode",{parentName:"p"},"buffer_duration"),"\u3002"))}s.isMDXComponent=!0}}]);