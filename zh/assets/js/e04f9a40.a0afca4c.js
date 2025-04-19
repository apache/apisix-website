"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3857],{5318:(e,t,r)=>{r.d(t,{Zo:()=>m,kt:()=>d});var a=r(7378);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var c=a.createContext({}),l=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},s=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,c=e.parentName,m=p(e,["components","mdxType","originalType","parentName"]),s=l(r),d=n,h=s["".concat(c,".").concat(d)]||s[d]||u[d]||i;return r?a.createElement(h,o(o({ref:t},m),{},{components:r})):a.createElement(h,o({ref:t},m))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,o=new Array(i);o[0]=s;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p.mdxType="string"==typeof e?e:n,o[1]=p;for(var l=2;l<i;l++)o[l]=r[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,r)}s.displayName="MDXCreateElement"},7301:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>p,toc:()=>c});var a=r(5773),n=(r(7378),r(5318));const i={id:"committer-guide",title:"\u9879\u76ee\u7ba1\u7406\u4f53\u7cfb",keywords:["API \u7f51\u5173","APISIX","Apache APISIX","APISIX committer \u6307\u5357"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 Apache APISIX committers \u7684\u4e00\u4e9b\u51c6\u5219\uff0c\u5305\u62ec\u8d21\u732e\u7684\u7c7b\u578b\u4e0e\u8d21\u732e\u8005\u7684\u664b\u5347\u8def\u7ebf\uff0c\u4ee5\u53ca\u8d21\u732e\u8005\u5982\u4f55\u6210\u4e3a committer\uff0c\u8fdb\u4e00\u6b65\u6210\u4e3a PMC \u6210\u5458\u3002"},o=void 0,p={unversionedId:"committer-guide",id:"committer-guide",isDocsHomePage:!1,title:"\u9879\u76ee\u7ba1\u7406\u4f53\u7cfb",description:"\u672c\u6587\u4ecb\u7ecd\u4e86 Apache APISIX committers \u7684\u4e00\u4e9b\u51c6\u5219\uff0c\u5305\u62ec\u8d21\u732e\u7684\u7c7b\u578b\u4e0e\u8d21\u732e\u8005\u7684\u664b\u5347\u8def\u7ebf\uff0c\u4ee5\u53ca\u8d21\u732e\u8005\u5982\u4f55\u6210\u4e3a committer\uff0c\u8fdb\u4e00\u6b65\u6210\u4e3a PMC \u6210\u5458\u3002",source:"@site/i18n/zh/docusaurus-plugin-content-docs/current/committer-guide.md",sourceDirName:".",slug:"/committer-guide",permalink:"/zh/docs/general/committer-guide",editUrl:"https://github.com/apache/apisix-website/edit/master/website/docs/general/committer-guide.md",tags:[],version:"current",frontMatter:{id:"committer-guide",title:"\u9879\u76ee\u7ba1\u7406\u4f53\u7cfb",keywords:["API \u7f51\u5173","APISIX","Apache APISIX","APISIX committer \u6307\u5357"],description:"\u672c\u6587\u4ecb\u7ecd\u4e86 Apache APISIX committers \u7684\u4e00\u4e9b\u51c6\u5219\uff0c\u5305\u62ec\u8d21\u732e\u7684\u7c7b\u578b\u4e0e\u8d21\u732e\u8005\u7684\u664b\u5347\u8def\u7ebf\uff0c\u4ee5\u53ca\u8d21\u732e\u8005\u5982\u4f55\u6210\u4e3a committer\uff0c\u8fdb\u4e00\u6b65\u6210\u4e3a PMC \u6210\u5458\u3002"},sidebar:"docs",previous:{title:"\u62a5\u544a\u5b89\u5168\u6f0f\u6d1e",permalink:"/zh/docs/general/security"},next:{title:"\u4e2d\u6587\u6587\u6863\u5199\u4f5c\u6307\u5357",permalink:"/zh/docs/general/documentation-style-guide"}},c=[{value:"\u5982\u4f55\u6210\u4e3a Apache APISIX committer\uff1f",id:"\u5982\u4f55\u6210\u4e3a-apache-apisix-committer",children:[]},{value:"\u664b\u5347",id:"\u664b\u5347",children:[]},{value:"\u804c\u8d23",id:"\u804c\u8d23",children:[]},{value:"\u5982\u4f55\u6210\u4e3a Apache APISIX PMC \u6210\u5458\uff1f",id:"\u5982\u4f55\u6210\u4e3a-apache-apisix-pmc-\u6210\u5458",children:[]}],l={toc:c};function m(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"\u672c\u6587\u6863\u4ecb\u7ecd\u4e86 Apache APISIX \u8d21\u732e\u8005\u7684\u7ed3\u6784\u3002"),(0,n.kt)("p",null,"\u53c2\u8003",(0,n.kt)("a",{parentName:"p",href:"/docs/general/contributor-guide/"},"\u8d21\u732e\u6307\u5357"),"\u4ee5\u4e86\u89e3\u66f4\u591a\u5173\u4e8e\u8d21\u732e\u6d41\u7a0b\u7684\u4fe1\u606f\u3002"),(0,n.kt)("h2",{id:"\u5982\u4f55\u6210\u4e3a-apache-apisix-committer"},"\u5982\u4f55\u6210\u4e3a Apache APISIX committer\uff1f"),(0,n.kt)("p",null,"\u4efb\u4f55\u4eba\u90fd\u53ef\u4ee5\u6210\u4e3a Apache \u9879\u76ee\u7684\u8d21\u732e\u8005\u3002\u6210\u4e3a\u8d21\u732e\u8005\u610f\u5473\u7740\u4f60\u5bf9\u6b64\u9879\u76ee\u611f\u5174\u8da3\uff0c\u5e76\u4ee5\u67d0\u79cd\u65b9\u5f0f\u4e3a\u5176\u505a\u51fa\u8d21\u732e\uff0c\u5305\u62ec\u4ece\u63d0\u51fa\u5408\u7406\u7684\u95ee\u9898\uff08\u8bb0\u5f55\u9879\u76ee\u5e76\u5411\u5f00\u53d1\u8005\u63d0\u4f9b\u53cd\u9988\uff09\u5230\u4ece\u4e8b\u65b0\u529f\u80fd\u548c\u8865\u4e01\u7684\u5f00\u53d1\u3002"),(0,n.kt)("p",null,"\u5982\u679c\u4f60\u5df2\u7ecf\u6210\u4e3a\u4e00\u4e2a\u9879\u76ee\u7684\u6709\u4ef7\u503c\u7684\u8d21\u732e\u8005\uff0c\u4f60\u53ef\u80fd\u4f1a\u88ab\u9080\u8bf7\u6210\u4e3a committer\u3002Committer \u662f Apache \u8f6f\u4ef6\u57fa\u91d1\u4f1a\uff08Apache Software Foundation\uff0c\u7b80\u79f0 ASF\uff09\u7684\u4e00\u4e2a\u4e13\u7528\u672f\u8bed\uff0c\u8c61\u5f81\u7740\u81f4\u529b\u4e8e\u67d0\u4e2a\u7279\u5b9a\u9879\u76ee\u7684\u4eba\u3002\u5b83\u4e3a\u4f60\u5e26\u6765\u4e86\u5bf9\u9879\u76ee\u4ed3\u5e93\u548c\u8d44\u6e90\u7684\u5199\u5165\u6743\u9650\u3002"),(0,n.kt)("p",null,"\u66f4\u591a\u7684\u7ec6\u8282\u53ef\u4ee5\u5728",(0,n.kt)("a",{parentName:"p",href:"https://community.apache.org/contributors/"},"\u8fd9\u91cc"),"\u627e\u5230\u3002"),(0,n.kt)("h2",{id:"\u664b\u5347"},"\u664b\u5347"),(0,n.kt)("p",null,"Apache APISIX \u793e\u533a\u9075\u5faa Apache \u793e\u533a\u63a5\u53d7\u65b0 committer \u7684\u6d41\u7a0b\u3002\u5728\u8d21\u732e\u8005\u79ef\u6781\u53c2\u52a0 APISIX \u793e\u533a\u7684\u6d3b\u52a8\u540e\uff0c(P) PMC \u6210\u5458\u5c06\u51b3\u5b9a\u662f\u5426\u9080\u8bf7\u8be5\u8d21\u732e\u8005\u52a0\u5165 Committers \u548c (P) PMC\u3002"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u6b64\u8fc7\u7a0b\u9996\u5148\u5728 @private \u4e2d\u8fdb\u884c\u8ba8\u8bba\u548c\u6295\u7968\u3002\u53ea\u6709\u5f53\u524d\u7684 PMC \u6210\u5458\u53ef\u4ee5\u63d0\u540d\u4e00\u4e2a\u65b0\u7684 committer \u6216 PMC \u6210\u5458\u3002\u8ba8\u8bba\u4e2d\u7684\u6bcf\u5c01\u65b0\u90ae\u4ef6\u90fd\u5c06\u5ef6\u957f\u8be5\u8fc7\u7a0b 72 \u5c0f\u65f6\uff0c\u6240\u4ee5\u8bf7\u8010\u5fc3\u7b49\u5f85\u7ed3\u679c\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u5982\u679c\u6295\u7968\u901a\u8fc7\uff0c\u5c06\u5411\u8d21\u732e\u8005\u53d1\u9001\u4e00\u5c01\u9080\u8bf7\u4fe1\uff0c\u9080\u8bf7\u5176\u6210\u4e3a committer\uff0c\u5e76\u6ce8\u660e @private CC'ed\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u65b0\u7684 committer \u53ef\u4ee5\u7b7e\u7f72 ",(0,n.kt)("a",{parentName:"p",href:"https://www.apache.org/licenses/contributor-agreements.html#clas"},"ICLA")," \u5e76\u7533\u8bf7 Apache ID \u548c\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u7136\u540e\u53ef\u4ee5\u901a\u8fc7 ",(0,n.kt)("a",{parentName:"p",href:"https://gitbox.apache.org/setup/"},"GitBox")," \u5c06 Apache \u8d26\u6237\u548c GitHub \u8d26\u6237\u5173\u8054\u8d77\u6765\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u65b0\u7684 committer \u9700\u8981\u66f4\u65b0",(0,n.kt)("a",{parentName:"p",href:"/team"},"\u56e2\u961f"),"\u9875\u9762\u6dfb\u52a0\u4e2a\u4eba\u4fe1\u606f\u3002"))),(0,n.kt)("h2",{id:"\u804c\u8d23"},"\u804c\u8d23"),(0,n.kt)("p",null,"\u4ee5\u4e0b\u662f ASF committer \u7684\u671f\u671b\u804c\u8d23\u3002"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u5f00\u53d1\u65b0\u7684\u529f\u80fd\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u91cd\u6784\u4ee3\u7801\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u53ca\u65f6\u53ef\u9760\u5730 Review PR\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u8003\u8651\u5e76\u63a5\u53d7\u529f\u80fd\u8bf7\u6c42\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u56de\u7b54\u95ee\u9898\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u66f4\u65b0\u6587\u6863\u548c\u793a\u4f8b\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u6539\u8fdb\u6d41\u7a0b\u548c\u5de5\u5177\u3002")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"\u5f15\u5bfc\u65b0\u7684\u8d21\u732e\u8005\u52a0\u5165\u793e\u533a\u3002"))),(0,n.kt)("h2",{id:"\u5982\u4f55\u6210\u4e3a-apache-apisix-pmc-\u6210\u5458"},"\u5982\u4f55\u6210\u4e3a Apache APISIX PMC \u6210\u5458\uff1f"),(0,n.kt)("p",null,"\u5728 APISIX \u793e\u533a\uff0c\u83b7\u5f97\u66f4\u591a\u6210\u7ee9\u7684 committer \u53ef\u4ee5\u88ab\u9080\u8bf7\u6210\u4e3a\u9879\u76ee\u7ba1\u7406\u59d4\u5458\u4f1a\uff08Project Management Committee\uff0c\u7b80\u79f0 PMC\uff09\u7684\u4e00\u5458\u3002"),(0,n.kt)("p",null,"Apache \u793e\u533a\u7684\u7406\u5ff5\u4e4b\u4e00\u662f\u201c\u793e\u533a\u4f18\u4e8e\u4ee3\u7801\u201d\u3002\u4e00\u4e2a\u5145\u6ee1\u6d3b\u529b\u4e14\u6301\u7eed\u6210\u957f\u7684\u5f00\u6e90\u793e\u533a\u81ea\u7136\u4f1a\u53d7\u5230\u5f00\u53d1\u8005\u4eec\u7684\u9752\u7750\uff0c\u540c\u65f6\u4e5f\u4f1a\u63d0\u4f9b\u65e2\u6709\u610f\u601d\u53c8\u6709\u4ef7\u503c\u7684\u5185\u5bb9\u3002"))}m.isMDXComponent=!0}}]);