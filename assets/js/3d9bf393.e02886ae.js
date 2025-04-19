"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[53588],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>d});var r=t(67294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(t),d=o,g=u["".concat(p,".").concat(d)]||u[d]||m[d]||a;return t?r.createElement(g,i(i({ref:n},c),{},{components:t})):r.createElement(g,i({ref:n},c))}));function d(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=u;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},19069:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var r=t(87462),o=(t(67294),t(3905));const a={title:"Consumer Group",keywords:["API gateway","Apache APISIX","Consumer Group"],description:"Consumer Group in Apache APISIX."},i=void 0,s={unversionedId:"terminology/consumer-group",id:"version-3.11/terminology/consumer-group",isDocsHomePage:!1,title:"Consumer Group",description:"Consumer Group in Apache APISIX.",source:"@site/docs-apisix_versioned_docs/version-3.11/terminology/consumer-group.md",sourceDirName:"terminology",slug:"/terminology/consumer-group",permalink:"/docs/apisix/3.11/terminology/consumer-group",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/terminology/consumer-group.md",tags:[],version:"3.11",frontMatter:{title:"Consumer Group",keywords:["API gateway","Apache APISIX","Consumer Group"],description:"Consumer Group in Apache APISIX."},sidebar:"version-3.11/docs",previous:{title:"Consumer",permalink:"/docs/apisix/3.11/terminology/consumer"},next:{title:"Credential",permalink:"/docs/apisix/3.11/terminology/credential"}},p=[{value:"Description",id:"description",children:[]},{value:"Example",id:"example",children:[]}],l={toc:p};function c(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},l,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"description"},"Description"),(0,o.kt)("p",null,"Consumer Groups are used to extract commonly used ",(0,o.kt)("a",{parentName:"p",href:"/docs/apisix/3.11/terminology/plugin"},"Plugin")," configurations and can be bound directly to a ",(0,o.kt)("a",{parentName:"p",href:"/docs/apisix/3.11/terminology/consumer"},"Consumer"),"."),(0,o.kt)("p",null,"With consumer groups, you can define any number of plugins, e.g. rate limiting and apply them to a set of consumers,\ninstead of managing each consumer individually."),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("p",null,"The example below illustrates how to create a Consumer Group and bind it to a Consumer."),(0,o.kt)("p",null,"Create a Consumer Group which shares the same rate limiting quota:"),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"You can fetch the ",(0,o.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumer_groups/company_a \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "limit-count": {\n            "count": 200,\n            "time_window": 60,\n            "rejected_code": 503,\n            "group": "grp_company_a"\n        }\n    }\n}\'\n')),(0,o.kt)("p",null,"Create a Consumer within the Consumer Group:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/consumers \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "username": "jack",\n    "plugins": {\n        "key-auth": {\n            "key": "auth-one"\n        }\n    },\n    "group_id": "company_a"\n}\'\n')),(0,o.kt)("p",null,"When APISIX can't find the Consumer Group with the ",(0,o.kt)("inlineCode",{parentName:"p"},"group_id"),", the Admin API is terminated with a status code of ",(0,o.kt)("inlineCode",{parentName:"p"},"400"),"."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol"},"When the same plugin is configured in ",(0,o.kt)("a",{parentName:"li",href:"/docs/apisix/3.11/terminology/consumer"},"consumer"),", ",(0,o.kt)("a",{parentName:"li",href:"/docs/apisix/3.11/terminology/route"},"routing"),", ",(0,o.kt)("a",{parentName:"li",href:"/docs/apisix/3.11/terminology/plugin-config"},"plugin config")," and ",(0,o.kt)("a",{parentName:"li",href:"/docs/apisix/3.11/terminology/service"},"service"),", only one configuration is in effect, and the consumer has the highest priority. Please refer to ",(0,o.kt)("a",{parentName:"li",href:"/docs/apisix/3.11/terminology/plugin"},"Plugin"),"."),(0,o.kt)("li",{parentName:"ol"},"If a Consumer already has the ",(0,o.kt)("inlineCode",{parentName:"li"},"plugins")," field configured, the plugins in the Consumer Group will effectively be merged into it. The same plugin in the Consumer Group will not override the one configured directly in the Consumer.")))),(0,o.kt)("p",null,"For example, if we configure a Consumer Group as shown below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "id": "bar",\n    "plugins": {\n        "response-rewrite": {\n            "body": "hello"\n        }\n    }\n}\n')),(0,o.kt)("p",null,"To a Consumer as shown below."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "username": "foo",\n    "group_id": "bar",\n    "plugins": {\n        "basic-auth": {\n            "username": "foo",\n            "password": "bar"\n        },\n        "response-rewrite": {\n            "body": "world"\n        }\n    }\n}\n')),(0,o.kt)("p",null,"Then the ",(0,o.kt)("inlineCode",{parentName:"p"},"body")," in ",(0,o.kt)("inlineCode",{parentName:"p"},"response-rewrite")," keeps ",(0,o.kt)("inlineCode",{parentName:"p"},"world"),"."))}c.isMDXComponent=!0}}]);