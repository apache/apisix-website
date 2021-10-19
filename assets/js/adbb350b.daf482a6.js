"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[85427],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return h}});var i=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,i,a=function(e,t){if(null==e)return{};var r,i,a={},n=Object.keys(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(i=0;i<n.length;i++)r=n[i],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=i.createContext({}),u=function(e){var t=i.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return i.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(r),h=a,m=d["".concat(l,".").concat(h)]||d[h]||c[h]||n;return r?i.createElement(m,o(o({ref:t},p),{},{components:r})):i.createElement(m,o({ref:t},p))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,o=new Array(n);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var u=2;u<n;u++)o[u]=r[u];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}d.displayName="MDXCreateElement"},55545:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return c}});var i=r(87462),a=r(63366),n=(r(67294),r(3905)),o={id:"contributor-guide",title:"Contributor Guide",keywords:["API gateway","APISIX","Apache APISIX","contributor guide"],description:"This article is a set of guidelines for Apache APISIX contributors, including things that a contributor can do and how to do it well."},s=void 0,l={unversionedId:"contributor-guide",id:"contributor-guide",isDocsHomePage:!1,title:"Contributor Guide",description:"This article is a set of guidelines for Apache APISIX contributors, including things that a contributor can do and how to do it well.",source:"@site/docs/general/contributor-guide.md",sourceDirName:".",slug:"/contributor-guide",permalink:"/docs/general/contributor-guide",editUrl:"https://github.com/apache/apisix-website/edit/master/website/docs/general/contributor-guide.md",tags:[],version:"current",lastUpdatedBy:"Serendipity96",lastUpdatedAt:1634605999,formattedLastUpdatedAt:"10/19/2021",frontMatter:{id:"contributor-guide",title:"Contributor Guide",keywords:["API gateway","APISIX","Apache APISIX","contributor guide"],description:"This article is a set of guidelines for Apache APISIX contributors, including things that a contributor can do and how to do it well."},sidebar:"docs",previous:{title:"Subscribe Guide",permalink:"/docs/general/subscribe-guide"},next:{title:"Committer Guide",permalink:"/docs/general/committer-guide"}},u=[{value:"Submit an issue",id:"submit-an-issue",children:[]},{value:"Developer Flow",id:"developer-flow",children:[{value:"Fork repo",id:"fork-repo",children:[]},{value:"Choose an issue",id:"choose-an-issue",children:[]},{value:"Create your branch",id:"create-your-branch",children:[]},{value:"Coding",id:"coding",children:[]},{value:"Submit PR",id:"submit-pr",children:[]},{value:"Delete branch",id:"delete-branch",children:[]},{value:"Notice",id:"notice",children:[]}]}],p={toc:u};function c(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,n.kt)("wrapper",(0,i.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Please fee free to report bugs, submit suggestions, or submit PRs according to this guide."),(0,n.kt)("h2",{id:"submit-an-issue"},"Submit an issue"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Before submitting your issues, please go through a comprehensive search to make sure the problem cannot be solved just by searching.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Check the Issue List to make sure the problem is not repeated.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Create a new issue and choose the type of issue.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Define the issue with a clear and descriptive title.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Fill in necessary information according to the template.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Choose a label after issue created.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Please pay attention to your issue, you may need provide more information during discussion."))),(0,n.kt)("h2",{id:"developer-flow"},"Developer Flow"),(0,n.kt)("h3",{id:"fork-repo"},"Fork repo"),(0,n.kt)("p",null,"Fork the Apache APISIX repo to your own repo to work, then setting proper upstream."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"git remote add upstream https://github.com/apache/apisix.git\n")),(0,n.kt)("h3",{id:"choose-an-issue"},"Choose an issue"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Please choose your target issue. If it is a new issue discovered or a new function enhancement to offer, please create an issue and set the right label for it.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"After choosing the relevant issue, please reply with a deadline to indicate that you are working on it.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Find a mentor from the Team page and your mentor will give you feedback about your PR or issue in time."))),(0,n.kt)("h4",{id:"good-first-issues"},(0,n.kt)("strong",{parentName:"h4"},"Good First Issues"),":"),(0,n.kt)("p",null,"Good First Issue curates easy pickings from this project, and helps you make your first contribution to Apache APISIX\xae."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"},"Apache APISIX\xae")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-ingress-controller/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"},"Apache APISIX\xae Ingress Controller")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-dashboard/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"},"Apache APISIX\xae dashboard")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-helm-chart/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"},"Apache APISIX\xae Helm Chart")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-docker/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"},"Docker distribution for Apache APISIX\xae")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"},"Apache APISIX\xae Website")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-java-plugin-runner/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22"},"Apache APISIX\xae Java Plugin Runner")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/apache/apisix-go-plugin-runner/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22"},"Apache APISIX\xae Go Plugin Runner"))),(0,n.kt)("h3",{id:"create-your-branch"},"Create your branch"),(0,n.kt)("p",null,"Switch to your forked master branch, pull codes from upstream, then create a new branch."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"$ git checkout master\n$ git pull upstream master\n$ git checkout -b IssueNo\n")),(0,n.kt)("p",null,"Notice: We will merge PR using squash, commit logs will be different form upstream if you use one older branch."),(0,n.kt)("h3",{id:"coding"},"Coding"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Please obey the Code of Conduct during the process of development and finish the check before submitting the pull request.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Then push codes to your fork repo."))),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"$ git add modified-file-names\n$ git commit -m 'commit message'\n$ git push origin issueNo\n")),(0,n.kt)("h3",{id:"submit-pr"},"Submit PR"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Send a pull request to the master branch.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"The mentor will do codes review before discussing some details (including the design, the implementation and the performance) with you.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Also make sure that the pull request title has a semantic prefix like ",(0,n.kt)("inlineCode",{parentName:"p"},"fix:")," or ",(0,n.kt)("inlineCode",{parentName:"p"},"feat:")," or any other ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/commitizen/conventional-commit-types/blob/master/index.json"},"conventional commit types"),".")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Then congratulate to you to be an official contributor of Apache APISIX."))),(0,n.kt)("h3",{id:"delete-branch"},"Delete branch"),(0,n.kt)("p",null,"You can delete the remote branch (origin/IssueNo) and the local branch (IssueNo) associated with the remote branch (origin/IssueNo) after the mentor merged the PR into the master branch."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},"$ git checkout master\n$ git branch -d IssueNo\n$ git push origin --delete issueNo\n")),(0,n.kt)("h3",{id:"notice"},"Notice"),(0,n.kt)("p",null,"Please note that in order to show your ID in the contributor list, please DO NOT forget to set the configurations below:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-sh"},'$ git config --global user.name "username"\n$ git config --global user.email "mail address"\n')))}c.isMDXComponent=!0}}]);