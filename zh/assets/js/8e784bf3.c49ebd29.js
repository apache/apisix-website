"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[78216],{3905:function(e,t,o){o.d(t,{Zo:function(){return s},kt:function(){return d}});var n=o(67294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function i(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)o=i[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)o=i[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var m=n.createContext({}),c=function(e){var t=n.useContext(m),o=t;return e&&(o="function"==typeof e?e(t):a(a({},t),e)),o},s=function(e){var t=c(e.components);return n.createElement(m.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,i=e.originalType,m=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(o),d=r,h=u["".concat(m,".").concat(d)]||u[d]||p[d]||i;return o?n.createElement(h,a(a({ref:t},s),{},{components:o})):n.createElement(h,a({ref:t},s))}));function d(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=o.length,a=new Array(i);a[0]=u;var l={};for(var m in t)hasOwnProperty.call(t,m)&&(l[m]=t[m]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var c=2;c<i;c++)a[c]=o[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,o)}u.displayName="MDXCreateElement"},69920:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return a},contentTitle:function(){return l},metadata:function(){return m},toc:function(){return c},default:function(){return p}});var n=o(87462),r=o(63366),i=(o(67294),o(3905)),a={id:"committer-guide",title:"Committer Guide",keywords:["API gateway","APISIX","Apache APISIX","committer guide"],description:"This article is a set of guidelines for Apache APISIX committers. It provides general guideline of contritions, and the way of promoting from contributors to commiter, and from committer to PMC."},l=void 0,m={unversionedId:"committer-guide",id:"committer-guide",isDocsHomePage:!1,title:"Committer Guide",description:"This article is a set of guidelines for Apache APISIX committers. It provides general guideline of contritions, and the way of promoting from contributors to commiter, and from committer to PMC.",source:"@site/docs/general/committer-guide.md",sourceDirName:".",slug:"/committer-guide",permalink:"/zh/docs/general/committer-guide",editUrl:"https://github.com/apache/apisix-website/edit/master/website/docs/general/committer-guide.md",tags:[],version:"current",lastUpdatedBy:"tzssangglass",lastUpdatedAt:1637325220,formattedLastUpdatedAt:"2021/11/19",frontMatter:{id:"committer-guide",title:"Committer Guide",keywords:["API gateway","APISIX","Apache APISIX","committer guide"],description:"This article is a set of guidelines for Apache APISIX committers. It provides general guideline of contritions, and the way of promoting from contributors to commiter, and from committer to PMC."},sidebar:"docs",previous:{title:"Contributor Guide",permalink:"/zh/docs/general/contributor-guide"},next:{title:"Release Guide",permalink:"/zh/docs/general/release-guide"}},c=[{value:"What can I contribute?",id:"what-can-i-contribute",children:[]},{value:"How to become an APISIX committer?",id:"how-to-become-an-apisix-committer",children:[]},{value:"Promotion",id:"promotion",children:[]},{value:"Responsibilities",id:"responsibilities",children:[]},{value:"How to become an APISIX PMC?",id:"how-to-become-an-apisix-pmc",children:[]}],s={toc:c};function p(e){var t=e.components,o=(0,r.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,n.Z)({},s,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"what-can-i-contribute"},"What can I contribute?"),(0,i.kt)("p",null,"All forms of contributions are accepted, for example:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Take a look at issues with tag called Good first issue or Help wanted.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Join the discussion on mailing list.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Answer questions on issues.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Fix bugs reported on issues, and send us pull request.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Review the existing pull request.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Improve the website.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Write a document or article.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Any form of contribution that is not mentioned above."))),(0,i.kt)("p",null,"If you would like to contribute, please send an email to ",(0,i.kt)("a",{parentName:"p",href:"mailto:dev@apisix.apache.org"},"dev@apisix.apache.org")," to let us know!"),(0,i.kt)("h2",{id:"how-to-become-an-apisix-committer"},"How to become an APISIX committer?"),(0,i.kt)("p",null,"Anyone can be a contributor to an Apache project. Being a contributor simply means that you take an interest in the project and contribute in some way, ranging from asking sensible questions (which documents the project and provides feedback to developers) through to providing new features as patches."),(0,i.kt)("p",null,"If you become a valuable contributor to the project you may well be invited to become a committer. Committer is a term used at the ASF to signify someone who is committed to a particular project. It brings with it the privilege of write access to the project repository and resources."),(0,i.kt)("p",null,"More details could be found ",(0,i.kt)("a",{parentName:"p",href:"https://community.apache.org/contributors/"},"here"),"."),(0,i.kt)("h2",{id:"promotion"},"Promotion"),(0,i.kt)("p",null,"The Apache APISIX community follows the Apache Community\u2019s process on accepting a new committer. After a contributor participates in APISIX's community actively, (P)PMC and Committers will make decisions to invite the contributor join Committers and (P)PMC."),(0,i.kt)("p",null,"Processes are:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Start the discussion and vote in @private. Only current PMC member could nominate")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"If the vote passes, send an offer to become a committer with @private CC\u2019ed")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"New committer signs ICLA and apply Apache ID and email address")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Update Team page."))),(0,i.kt)("h2",{id:"responsibilities"},"Responsibilities"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Develop new features")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Refactor codes")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Review PR reliably and in time")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Consider and accept feature requests")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Answer questions")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Update documentation and examples")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Improve processes and tools")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Guide new contributors join community."))),(0,i.kt)("h2",{id:"how-to-become-an-apisix-pmc"},"How to become an APISIX PMC?"),(0,i.kt)("p",null,"In APISIX community, a committer who has earned even more merits can be invited to be a part of the Project Management Committee (PMC)."),(0,i.kt)("p",null,"One thing that is sometimes hard to understand when you are new to the open development process used at the ASF, is that we value the community more than the code. A strong and healthy community will be respectful and be a fun and rewarding place. More importantly, a diverse and healthy community can continue to support the code over the longer term, even as individual companies come and go from the field."))}p.isMDXComponent=!0}}]);