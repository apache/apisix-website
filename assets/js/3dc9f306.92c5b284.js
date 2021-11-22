"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[38393],{3905:function(t,e,o){o.d(e,{Zo:function(){return l},kt:function(){return d}});var n=o(67294);function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function a(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function i(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?a(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function c(t,e){if(null==t)return{};var o,n,r=function(t,e){if(null==t)return{};var o,n,r={},a=Object.keys(t);for(n=0;n<a.length;n++)o=a[n],e.indexOf(o)>=0||(r[o]=t[o]);return r}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)o=a[n],e.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(t,o)&&(r[o]=t[o])}return r}var u=n.createContext({}),s=function(t){var e=n.useContext(u),o=e;return t&&(o="function"==typeof t?t(e):i(i({},e),t)),o},l=function(t){var e=s(t.components);return n.createElement(u.Provider,{value:e},t.children)},f={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},p=n.forwardRef((function(t,e){var o=t.components,r=t.mdxType,a=t.originalType,u=t.parentName,l=c(t,["components","mdxType","originalType","parentName"]),p=s(o),d=r,h=p["".concat(u,".").concat(d)]||p[d]||f[d]||a;return o?n.createElement(h,i(i({ref:e},l),{},{components:o})):n.createElement(h,i({ref:e},l))}));function d(t,e){var o=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var a=o.length,i=new Array(a);i[0]=p;var c={};for(var u in e)hasOwnProperty.call(e,u)&&(c[u]=e[u]);c.originalType=t,c.mdxType="string"==typeof t?t:r,i[1]=c;for(var s=2;s<a;s++)i[s]=o[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}p.displayName="MDXCreateElement"},27710:function(t,e,o){o.r(e),o.d(e,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return s},default:function(){return f}});var n=o(87462),r=o(63366),a=(o(67294),o(3905)),i={id:"2fa",title:"Two Factor Authentication",keywords:["API gateway","APISIX","Apache APISIX","two factor authentication"],description:"This article provides information of how to enable Two-factor authentication(2FA) on GitHub. It consists of 3 parts, what is Two-factor authentication(2FA), how to enable 2FA on GitHub, and how to submit codes."},c=void 0,u={unversionedId:"2fa",id:"2fa",isDocsHomePage:!1,title:"Two Factor Authentication",description:"This article provides information of how to enable Two-factor authentication(2FA) on GitHub. It consists of 3 parts, what is Two-factor authentication(2FA), how to enable 2FA on GitHub, and how to submit codes.",source:"@site/docs/general/2fa.md",sourceDirName:".",slug:"/2fa",permalink:"/docs/general/2fa",editUrl:"https://github.com/apache/apisix-website/edit/master/website/docs/general/2fa.md",tags:[],version:"current",lastUpdatedBy:"lijing-21",lastUpdatedAt:1637571898,formattedLastUpdatedAt:"11/22/2021",frontMatter:{id:"2fa",title:"Two Factor Authentication",keywords:["API gateway","APISIX","Apache APISIX","two factor authentication"],description:"This article provides information of how to enable Two-factor authentication(2FA) on GitHub. It consists of 3 parts, what is Two-factor authentication(2FA), how to enable 2FA on GitHub, and how to submit codes."},sidebar:"docs",previous:{title:"Security",permalink:"/docs/general/security"},next:{title:"Subscribe Guide",permalink:"/docs/general/subscribe-guide"}},s=[{value:"Two-factor authentication(2FA)",id:"two-factor-authentication2fa",children:[]},{value:"Enable 2FA on GitHub",id:"enable-2fa-on-github",children:[]},{value:"How to Submit Codes",id:"how-to-submit-codes",children:[]}],l={toc:s};function f(t){var e=t.components,o=(0,r.Z)(t,["components"]);return(0,a.kt)("wrapper",(0,n.Z)({},l,o,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"two-factor-authentication2fa"},"Two-factor authentication(2FA)"),(0,a.kt)("p",null,"Two factor authentication (2FA) refers to the authentication method that combines both passport and an object (credit card, SMS phone, token or biomarkers as fingerprint) to identify a user. To ensure the security of the committer\u2019s account, we need you to enable 2FA to sign in and contribute codes on GitHub. More details, please refer to 2FA."),(0,a.kt)("p",null,"Note:If you do not enable 2FA, you will be removed from the project and unable to access our repositories and the fork from our private repository."),(0,a.kt)("h2",{id:"enable-2fa-on-github"},"Enable 2FA on GitHub"),(0,a.kt)("p",null,"For detailed operations, please refer to Enable Two Factor Authentication with TOTP."),(0,a.kt)("p",null,"After enabling 2FA, you need to sign in GitHub with the way of username/password + mobile phone authentication code."),(0,a.kt)("p",null,"Tips: If you cannot download the APP through the page link, you can search and download the Google Authenticator in APP Store."),(0,a.kt)("h2",{id:"how-to-submit-codes"},"How to Submit Codes"),(0,a.kt)("p",null,"After enabling 2FA, you need to generate a private access Token to perform operations such as git submit and so on. At this time, you will use username + private access Token in replace of username + password to submit codes."),(0,a.kt)("p",null,"For detailed operations, please refer to Create a Private Token."))}f.isMDXComponent=!0}}]);