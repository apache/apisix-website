"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[13761],{35318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(27378);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},k={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,i=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=s(n),u=l,h=m["".concat(p,".").concat(u)]||m[u]||k[u]||i;return n?a.createElement(h,r(r({ref:t},c),{},{components:n})):a.createElement(h,r({ref:t},c))}));function u(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var i=n.length,r=new Array(i);r[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:l,r[1]=o;for(var s=2;s<i;s++)r[s]=n[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},61029:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>k,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var a=n(25773),l=(n(27378),n(35318));const i={title:"\u4f7f\u7528 Keycloak \u4e0e API \u7f51\u5173\u4fdd\u62a4\u4f60\u7684 API",authors:[{name:"\u6731\u6b23\u6b23",title:"Apache APISIX Committer",url:"https://github.com/starsz",image_url:"https://github.com/starsz.png"},{name:"\u741a\u81f4\u8fdc",title:"Apache Member",url:"https://github.com/juzhiyuan",image_url:"https://github.com/juzhiyuan.png"}],keywords:["Apache APISIX","API \u7f51\u5173","Authentication","OpenID Connect","Keycloak"],description:"\u672c\u7bc7\u6587\u7ae0\u5c06\u4e00\u6b65\u4e00\u6b65\u5f15\u5bfc\u4f60\u5982\u4f55\u4f7f\u7528 API \u7f51\u5173 Apache APISIX \u4e0e Keycloak \u4fdd\u62a4\u4f60\u7684 API\uff0c\u5e76\u4e14\u4ecb\u7ecd\u4e86 OpenID Connect \u76f8\u5173\u6982\u5ff5\u4ee5\u53ca\u4ea4\u4e92\u6d41\u7a0b\u548c\u76f8\u5173\u672f\u8bed\u3002",tags:["Authentication","Plugins"],image:"https://static.apiseven.com/2022/blog/0818/plugins/keycloak.png"},r=void 0,o={permalink:"/zh/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis",source:"@site/blog/2022/07/06/use-keycloak-with-api-gateway-to-secure-apis.md",title:"\u4f7f\u7528 Keycloak \u4e0e API \u7f51\u5173\u4fdd\u62a4\u4f60\u7684 API",description:"\u672c\u7bc7\u6587\u7ae0\u5c06\u4e00\u6b65\u4e00\u6b65\u5f15\u5bfc\u4f60\u5982\u4f55\u4f7f\u7528 API \u7f51\u5173 Apache APISIX \u4e0e Keycloak \u4fdd\u62a4\u4f60\u7684 API\uff0c\u5e76\u4e14\u4ecb\u7ecd\u4e86 OpenID Connect \u76f8\u5173\u6982\u5ff5\u4ee5\u53ca\u4ea4\u4e92\u6d41\u7a0b\u548c\u76f8\u5173\u672f\u8bed\u3002",date:"2022-07-06T00:00:00.000Z",formattedDate:"2022\u5e747\u67086\u65e5",tags:[{label:"Authentication",permalink:"/zh/blog/tags/authentication"},{label:"Plugins",permalink:"/zh/blog/tags/plugins"}],readingTime:9.715,truncated:!0,authors:[{name:"\u6731\u6b23\u6b23",title:"Apache APISIX Committer",url:"https://github.com/starsz",image_url:"https://github.com/starsz.png",imageURL:"https://github.com/starsz.png"},{name:"\u741a\u81f4\u8fdc",title:"Apache Member",url:"https://github.com/juzhiyuan",image_url:"https://github.com/juzhiyuan.png",imageURL:"https://github.com/juzhiyuan.png"}],prevItem:{title:"\u793e\u533a\u53cc\u5468\u62a5 6.16 - 6.30",permalink:"/zh/blog/2022/07/07/weekly-report-0630"},nextItem:{title:"\u5982\u4f55\u4f7f\u7528 DataAnt \u76d1\u63a7 Apache APISIX",permalink:"/zh/blog/2022/07/05/use-dataant-to-monitor-apisix"}},p={authorsImageUrls:[void 0,void 0]},s=[{value:"\u6d41\u7a0b\u63cf\u8ff0",id:"\u6d41\u7a0b\u63cf\u8ff0",children:[],level:2},{value:"\u76f8\u5173\u672f\u8bed",id:"\u76f8\u5173\u672f\u8bed",children:[],level:2},{value:"\u524d\u7f6e\u6b65\u9aa4",id:"\u524d\u7f6e\u6b65\u9aa4",children:[{value:"\u5b89\u88c5 Apache APISIX",id:"\u5b89\u88c5-apache-apisix",children:[],level:3},{value:"\u914d\u7f6e Keycloak",id:"\u914d\u7f6e-keycloak",children:[{value:"\u521b\u5efa Realm",id:"\u521b\u5efa-realm",children:[],level:4},{value:"\u521b\u5efa User",id:"\u521b\u5efa-user",children:[],level:4},{value:"\u521b\u5efa Client",id:"\u521b\u5efa-client",children:[],level:4}],level:3},{value:"\u914d\u7f6e\u6c47\u603b",id:"\u914d\u7f6e\u6c47\u603b",children:[{value:"Apache APISIX",id:"apache-apisix",children:[],level:4},{value:"Keycloak",id:"keycloak",children:[],level:4}],level:3}],level:2},{value:"\u573a\u666f\u793a\u4f8b",id:"\u573a\u666f\u793a\u4f8b",children:[{value:"\u524d\u7f6e\u6761\u4ef6",id:"\u524d\u7f6e\u6761\u4ef6",children:[],level:3},{value:"\u573a\u666f\u4e00\uff1a\u4f7f\u7528\u8d26\u6237\u5bc6\u7801\u4fdd\u62a4\u4e0a\u6e38\u670d\u52a1",id:"\u573a\u666f\u4e00\u4f7f\u7528\u8d26\u6237\u5bc6\u7801\u4fdd\u62a4\u4e0a\u6e38\u670d\u52a1",children:[],level:3},{value:"\u573a\u666f\u4e8c\uff1a\u4f7f\u7528 AccessToken \u9a8c\u8bc1\u8eab\u4efd",id:"\u573a\u666f\u4e8c\u4f7f\u7528-accesstoken-\u9a8c\u8bc1\u8eab\u4efd",children:[],level:3},{value:"\u573a\u666f\u4e09\uff1a\u4e0a\u6e38\u670d\u52a1\u89e3\u6790 UserInfo \u4fe1\u606f",id:"\u573a\u666f\u4e09\u4e0a\u6e38\u670d\u52a1\u89e3\u6790-userinfo-\u4fe1\u606f",children:[],level:3}],level:2},{value:"\u5e38\u89c1\u95ee\u9898",id:"\u5e38\u89c1\u95ee\u9898",children:[],level:2},{value:"\u53c2\u8003\u8d44\u6599",id:"\u53c2\u8003\u8d44\u6599",children:[],level:2}],c={toc:s};function k(e){let{components:t,...n}=e;return(0,l.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u672c\u7bc7\u6587\u7ae0\u5c06\u4e00\u6b65\u4e00\u6b65\u5f15\u5bfc\u4f60\u5982\u4f55\u4f7f\u7528 API \u7f51\u5173\u4e0e Keycloak \u4fdd\u62a4\u4f60\u7684 API\u3002")),(0,l.kt)("p",null,"OpenID Connect \u53c8\u540d OIDC\uff0c\u662f\u57fa\u4e8e OAuth 2.0 \u7684\u8ba4\u8bc1\u534f\u8bae\u3002\u5b83\u5141\u8bb8\u5ba2\u6237\u7aef\u4ece\u8eab\u4efd\u8ba4\u8bc1\u670d\u52a1 IdP \u83b7\u53d6\u7528\u6237\u57fa\u672c\u4fe1\u606f\uff0c\u5e38\u89c1\u7684 IdP \u6709\uff1aKeycloak\u3001Ory\u3001Okta\u3001Auth0\u3001Authing \u7b49\u3002"),(0,l.kt)("p",null,"\u5f00\u6e90\u7684 API \u7f51\u5173 Apache APISIX \u652f\u6301\u4f7f\u7528 openid-connect \u63d2\u4ef6\u5bf9\u63a5\u4ee5\u4e0a\u8eab\u4efd\u8ba4\u8bc1\u670d\u52a1\uff0cAPISIX \u4f1a\u5c06\u6240\u6709\u672a\u8ba4\u8bc1\u7684\u8bf7\u6c42\u91cd\u5b9a\u5411\u81f3\u8eab\u4efd\u8ba4\u8bc1\u670d\u52a1\u7684\u767b\u5f55\u9875\uff0c\u5f53\u767b\u5f55\u6210\u529f\u540e APISIX \u4f1a\u5c06\u83b7\u53d6\u5230\u7684\u7528\u6237\u4fe1\u606f\u53d1\u9001\u81f3\u4e0a\u6e38\u670d\u52a1\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/1.png",alt:"screenshot"})),(0,l.kt)("p",null,"Keycloak \u662f\u4e00\u4e2a\u5f00\u6e90\u7684\u8eab\u4efd\u8ba4\u8bc1\u7ba1\u7406\u670d\u52a1\uff0c\u53ef\u4f5c\u4e3a IdP \u6765\u4f7f\u7528\u3002\u5b83\u4e3a\u5e94\u7528\u7a0b\u5e8f\u589e\u52a0\u4e86\u8ba4\u8bc1\u670d\u52a1\uff0c\u5e76\u80fd\u901a\u8fc7\u6700\u5c0f\u7684\u4ee3\u4ef7\u4fdd\u8bc1\u670d\u52a1\u7684\u5b89\u5168\u3002\u540c\u65f6\uff0c\u5b83\u8fd8\u63d0\u4f9b\u4e86\u7528\u6237\u8054\u90a6\u3001\u5f3a\u8ba4\u8bc1\u3001\u7528\u6237\u7ba1\u7406\u3001\u7ec6\u7c92\u5ea6\u6388\u6743\u7b49\u529f\u80fd\u3002\u5728\u8fd9\u7bc7\u6587\u7ae0\u4e2d\uff0c\u6211\u4eec\u5c06\u4ee5 Keycloak \u4e3a\u4f8b\uff0c\u8ba9\u6211\u4eec\u770b\u770b\u5982\u4f55\u5c06\u5176\u4e0e APISIX \u5bf9\u63a5\uff0c\u4ee5\u4fdd\u62a4\u4f60\u7684\u670d\u52a1\u3002"),(0,l.kt)("h2",{id:"\u6d41\u7a0b\u63cf\u8ff0"},"\u6d41\u7a0b\u63cf\u8ff0"),(0,l.kt)("p",null,"\u4e0b\u56fe\u4e3a OpenID Connect \u534f\u8bae\u4ea4\u4e92\u6d41\u7a0b\uff1a"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/2.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u5728\u91cd\u5b9a\u5411\u9636\u6bb5\uff08Redirect\uff09\uff0cIdP \u5c06\u7528\u6237\u91cd\u5b9a\u5411\u5230\u4e00\u4e2a\u9884\u5148\u914d\u7f6e\u597d\u7684\u91cd\u5b9a\u5411 URL\uff08redirect_url\uff09\uff0c\u4f8b\u5982 ",(0,l.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:9080/callback"),"\u3002\u8bf7\u6ce8\u610f\uff1a\u8fd9\u662f\u4e00\u4e2a\u5728 APISIX \u4e2d\u4e0d\u5b58\u5728\u7684 API\uff0c\u5b83\u53ea\u7528\u4e8e\u6355\u83b7\u76f8\u5173\u7684\u8bf7\u6c42\uff0c\u5e76\u5728 OIDC \u903b\u8f91\u4e2d\u5b8c\u6210 Token \u4ea4\u6362\u7684\u529f\u80fd\u3002\u8bf7\u4e0d\u8981\u4f7f\u7528\u8fd9\u4e2a\u5730\u5740\u4f5c\u4e3a\u89e6\u53d1 OIDC \u63d2\u4ef6\u91cd\u5b9a\u5411\u7684\u6761\u4ef6\uff0c\u5426\u5219\uff0c\u5b83\u5c06\u8fd4\u56de\u5982\u4e0b\u9519\u8bef\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"the error request to the redirect_uri path, but there's no session state found"),"\u3002"),(0,l.kt)("h2",{id:"\u76f8\u5173\u672f\u8bed"},"\u76f8\u5173\u672f\u8bed"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Bearer Only\uff1a Keycloak \u652f\u6301\u8d26\u6237\u5bc6\u7801\u6216 AccessToken \u8fdb\u884c\u8eab\u4efd\u8ba4\u8bc1\uff0c\u82e5\u542f\u7528 bearer_only \u9009\u9879\uff0c\u5219\u4ec5\u5141\u8bb8\u901a\u8fc7 AccessToken \u8fdb\u884c\u8ba4\u8bc1\uff0c\u8be5\u65b9\u5f0f\u9002\u7528\u4e8e\u670d\u52a1\u4e4b\u95f4\u7684\u8bbf\u95ee\u8ba4\u8bc1\uff1b"),(0,l.kt)("li",{parentName:"ol"},"Realm\uff1a Keycloak \u4e2d\u7684 Realm \u76f8\u5f53\u4e8e\u4e00\u4e2a\u79df\u6237\uff0c\u4e0d\u540c Realm \u662f\u76f8\u4e92\u9694\u79bb\u7684\uff0c\u53ea\u80fd\u7ba1\u7406\u548c\u9a8c\u8bc1\u5b83\u4eec\u6240\u5177\u6709\u7684\u7528\u6237\uff1b"),(0,l.kt)("li",{parentName:"ol"},"Scope\uff1a\u8fd9\u662f\u4e00\u79cd\u9650\u5236\u5728\u8bbf\u95ee\u4ee4\u724c\uff08AccessToken\uff09\u4e2d\u58f0\u660e\u7684\u89d2\u8272\u7684\u65b9\u6cd5\u3002\u4f8b\u5982\uff0c\u5f53\u4e00\u4e2a\u5ba2\u6237\u7aef\u8981\u6c42\u9a8c\u8bc1\u4e00\u4e2a\u7528\u6237\u65f6\uff0c\u5ba2\u6237\u7aef\u6536\u5230\u7684\u8bbf\u95ee\u4ee4\u724c\u5c06\u53ea\u5305\u542b\u8303\u56f4\u660e\u786e\u6307\u5b9a\u7684\u89d2\u8272\u6620\u5c04\u3002\u5ba2\u6237\u7aef\u8303\u56f4\u5141\u8bb8\u4f60\u9650\u5236\u6bcf\u4e2a\u5355\u72ec\u7684\u8bbf\u95ee\u4ee4\u724c\u7684\u6743\u9650\uff0c\u800c\u4e0d\u662f\u8ba9\u5ba2\u6237\u7aef\u8bbf\u95ee\u7528\u6237\u7684\u6240\u6709\u6743\u9650\uff1b"),(0,l.kt)("li",{parentName:"ol"},"User\uff1aUser \u662f\u53ef\u4ee5\u767b\u5f55\u5230 Keycloak \u7684\u7528\u6237\uff0c\u53ef\u4ee5\u601d\u8003\u4e0b\u4f60\u6240\u7528\u8fc7\u7684 SSO \u767b\u5f55\u670d\u52a1\uff1b"),(0,l.kt)("li",{parentName:"ol"},"Client\uff1a\u5ba2\u6237\u7aef\u662f\u6307\u60f3\u8981\u4f7f\u7528 Keycloak \u6765\u4fdd\u62a4\u7684\u670d\u52a1\u3002")),(0,l.kt)("h2",{id:"\u524d\u7f6e\u6b65\u9aa4"},"\u524d\u7f6e\u6b65\u9aa4"),(0,l.kt)("blockquote",null,(0,l.kt)("ol",{parentName:"blockquote"},(0,l.kt)("li",{parentName:"ol"},"\u672c\u6307\u5357\u5c06\u4f7f\u7528 Docker \u8fdb\u884c Keycloak \u7684\u5b89\u88c5\u4e0e\u542f\u52a8\uff1b"),(0,l.kt)("li",{parentName:"ol"},"\u672c\u6307\u5357\u6240\u7528\u670d\u52a1\u5668\u73af\u5883\u4e3a CentOS 7\uff0cIP \u4e3a 127.0.0.1\u3002"))),(0,l.kt)("h3",{id:"\u5b89\u88c5-apache-apisix"},"\u5b89\u88c5 Apache APISIX"),(0,l.kt)("p",null,"\u8bf7\u53c2\u8003 ",(0,l.kt)("a",{parentName:"p",href:"https://apisix.apache.org/docs/apisix/getting-started"},"https://apisix.apache.org/docs/apisix/getting-started")," \u5b89\u88c5\u3001\u542f\u52a8 APISIX\uff0c\u672c\u793a\u4f8b\u4e2d APISIX \u5b9e\u4f8b\u5730\u5740\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:9080/"),"\u3002"),(0,l.kt)("h3",{id:"\u914d\u7f6e-keycloak"},"\u914d\u7f6e Keycloak"),(0,l.kt)("p",null,"\u8bf7\u5728\u670d\u52a1\u5668\u4e2d\u6267\u884c\u5982\u4e0b\u547d\u4ee4\u5b89\u88c5 18.0.2 \u7248\u672c\u7684 Keycloak\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},"docker run -d -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:18.0.2 start-dev\n")),(0,l.kt)("p",null,"\u542f\u52a8\u5b8c\u6210\u540e Keycloak \u5c06\u76d1\u542c ",(0,l.kt)("inlineCode",{parentName:"p"},"8080")," \u7aef\u53e3\uff0c\u5e76\u4f7f\u7528 admin \u4f5c\u4e3a\u7ba1\u7406\u5458\u8d26\u6237\u4e0e\u5bc6\u7801\u3002"),(0,l.kt)("h4",{id:"\u521b\u5efa-realm"},"\u521b\u5efa Realm"),(0,l.kt)("p",null,"\u8bbf\u95ee ",(0,l.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:8080/")," \u5c06\u663e\u793a\u5982\u4e0b\u754c\u9762\uff0c\u8fd9\u8868\u793a Keycloak \u5df2\u6210\u529f\u8fd0\u884c\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/3.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u8bbf\u95ee Administrator Console \u5e76\u4f7f\u7528 admin \u4f5c\u4e3a\u8d26\u6237\u4e0e\u5bc6\u7801\u8fdb\u884c\u767b\u5f55\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/4.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u5b89\u88c5\u5b8c\u6bd5\u9996\u6b21\u767b\u9646\u65f6\uff0c\u7cfb\u7edf\u5185\u5c06\u9ed8\u8ba4\u521b\u5efa\u540d\u4e3a master \u7684 Realm\u3002Realm \u662f OIDC \u4f53\u7cfb\u4e2d\u7684\u4e00\u4e2a\u6982\u5ff5\uff0c\u53ef\u7406\u89e3\u4e3a\u79df\u6237\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/5.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u9f20\u6807\u79fb\u52a8\u5230\u5de6\u4fa7 Master \u4e0a\u65b9\u65f6\u70b9\u51fb Add realm \u5e76\u8f93\u5165 myrealm \u4f5c\u4e3a Realm \u7684\u540d\u79f0\uff0c\u521b\u5efa\u3002"),(0,l.kt)("p",null,"\u5f53\u5b89\u88c5 Keycloak \u9996\u6b21\u767b\u5f55\u65f6\uff0c\u7cfb\u7edf\u4e2d\u4f1a\u9ed8\u8ba4\u521b\u5efa\u4e00\u4e2a\u540d\u4e3a master \u7684 Realm\uff0c\u4f46\u5b83\u662f\u4e13\u95e8\u7528\u6765\u7ba1\u7406 Keycloak \u7684\uff0c\u6211\u4eec\u4e0d\u5e94\u8be5\u628a\u5b83\u7528\u4e8e\u6211\u4eec\u7684\u5e94\u7528\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u521b\u5efa\u4e00\u4e2a\u65b0\u7684 Realm\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/6.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u521b\u5efa\u6210\u529f\u540e\u5c06\u770b\u5230\u5df2\u5207\u6362\u81f3 myrealm\uff0c\u4e14\u5e95\u90e8\u5b58\u6709 Endpoints -> OpenID Endpoint Configuration\uff0c\u5730\u5740\u4e3a ",(0,l.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration"),"\uff0c\u8fd9\u662f\u4e00\u4e2a\u670d\u52a1\u53d1\u73b0\u7684\u89c4\u8303\uff0c\u7a0d\u540e\u5c06\u4f7f\u7528\u8be5\u5730\u5740\u4f5c\u4e3a OIDC \u6240\u9700\u8981\u4f7f\u7528\u7684\u5404\u4e2a\u8282\u70b9\u5730\u5740\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/7.png",alt:"screenshot"})),(0,l.kt)("h4",{id:"\u521b\u5efa-user"},"\u521b\u5efa User"),(0,l.kt)("p",null,"\u6211\u4eec\u9700\u8981\u521b\u5efa\u4e00\u4e2a\u7528\u6237\u7528\u4e8e\u901a\u8fc7\u8d26\u6237\u5bc6\u7801\u8fdb\u884c\u767b\u9646\u8ba4\u8bc1\u3002\u9009\u62e9 Manage -> Users -> Add user\uff0c\u5e76\u8f93\u5165 myuser \u4f5c\u4e3a\u7528\u6237\u540d\uff0c\u4fdd\u5b58\u540e\u8bbf\u95ee Users \u9875\u9762\u5e76\u9009\u62e9 ",(0,l.kt)("inlineCode",{parentName:"p"},"View all users"),"\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/8.png",alt:"screenshot"})),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/9.png",alt:"screenshot"})),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/10.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u70b9\u51fb ID \u540e\u8fdb\u5165 Credentials \u9009\u9879\u5361\uff0c\u8bbe\u7f6e\u4e00\u4e2a\u65b0\u5bc6\u7801\uff08\u672c\u793a\u4f8b\u4f7f\u7528 mypassword \u4f5c\u4e3a\u5bc6\u7801\uff09\u3002\u540c\u65f6\u5c06 Temporary \u8bbe\u7f6e\u4e3a OFF\uff0c\u4ee5\u5173\u95ed\u9996\u6b21\u767b\u9646\u5fc5\u987b\u4fee\u6539\u5bc6\u7801\u7684\u9650\u5236\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/11.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u70b9\u51fb Set Password \u4fdd\u5b58\u8bbe\u7f6e\u3002"),(0,l.kt)("h4",{id:"\u521b\u5efa-client"},"\u521b\u5efa Client"),(0,l.kt)("p",null,"\u8bbf\u95ee Configure -> Clients -> Create \u4ee5\u521b\u5efa\u4e00\u4e2a\u65b0\u7684 Client\uff0c\u8fd9\u5c06\u7528\u4e8e\u4e4b\u540e\u914d\u7f6e APISIX\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/12.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u8f93\u5165 Client ID \u5e76\u4fdd\u5b58\uff0c\u672c\u4f8b\u4f7f\u7528 myclient \u4f5c\u4e3a ID\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/13.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u4fdd\u5b58\u540e\u9700\u8981\u914d\u7f6e 2 \u4e2a\u53c2\u6570\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"Access Type\uff1a\u9ed8\u8ba4\u4e3a public\uff0c\u8bf7\u4fee\u6539\u4e3a credential \u4ee5\u83b7\u53d6 Client Secret\uff1b"),(0,l.kt)("li",{parentName:"ol"},"Valid Redirect URIs\uff1a\u5f53\u767b\u9646\u6210\u529f\u65f6\uff0cKeycloak \u5c06\u643a\u5e26 state \u4e0e code \u91cd\u5b9a\u5411\u5ba2\u6237\u7aef\u81f3\u8be5\u5730\u5740\uff0c\u56e0\u6b64\u8bbe\u7f6e\u4e3a Apache APISIX \u7684\u7279\u5b9a\u56de\u8c03\u5730\u5740\uff0c\u4f8b\u5982 ",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:9080/anything/callback"))),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/14.png",alt:"screenshot"})),(0,l.kt)("p",null,"\u8bbe\u7f6e\u5b8c\u6210\u540e\u4fdd\u5b58\uff0c\u6b64\u65f6\u9875\u9762\u9876\u90e8\u5c06\u51fa\u73b0 Credentials \u9009\u9879\u5361\uff0c\u5c06 Secret \u590d\u5236\u4e0b\u6765\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/15.png",alt:"screenshot"})),(0,l.kt)("h3",{id:"\u914d\u7f6e\u6c47\u603b"},"\u914d\u7f6e\u6c47\u603b"),(0,l.kt)("h4",{id:"apache-apisix"},"Apache APISIX"),(0,l.kt)("p",null,"\u5b9e\u4f8b\u5730\u5740\uff1a",(0,l.kt)("inlineCode",{parentName:"p"},"http://127.0.0.1:9080/")),(0,l.kt)("h4",{id:"keycloak"},"Keycloak"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u670d\u52a1\u5730\u5740\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:8080/")),(0,l.kt)("li",{parentName:"ol"},"Realm\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"myrealm")),(0,l.kt)("li",{parentName:"ol"},"Client ID\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"myclient")),(0,l.kt)("li",{parentName:"ol"},"Client Secret\uff1ae91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq"),(0,l.kt)("li",{parentName:"ol"},"Redirect URI\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:9080/anything/callback")),(0,l.kt)("li",{parentName:"ol"},"Discovery\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration")),(0,l.kt)("li",{parentName:"ol"},"Logout URL\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"/anything/logout")),(0,l.kt)("li",{parentName:"ol"},"Bearer Only: ",(0,l.kt)("inlineCode",{parentName:"li"},"false")),(0,l.kt)("li",{parentName:"ol"},"Username\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"myuser")),(0,l.kt)("li",{parentName:"ol"},"Password\uff1a",(0,l.kt)("inlineCode",{parentName:"li"},"mypassword"))),(0,l.kt)("h2",{id:"\u573a\u666f\u793a\u4f8b"},"\u573a\u666f\u793a\u4f8b"),(0,l.kt)("h3",{id:"\u524d\u7f6e\u6761\u4ef6"},"\u524d\u7f6e\u6761\u4ef6"),(0,l.kt)("p",null,"\u672c\u793a\u4f8b\u4f7f\u7528 httpbin.org/anything \u4f5c\u4e3a\u4e0a\u6e38\u670d\u52a1\uff0c\u5b83\u5c06\u8fd4\u56de\u8bf7\u6c42\u4e2d\u7684\u6240\u6709\u5185\u5bb9\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/16.png",alt:"screenshot"})),(0,l.kt)("h3",{id:"\u573a\u666f\u4e00\u4f7f\u7528\u8d26\u6237\u5bc6\u7801\u4fdd\u62a4\u4e0a\u6e38\u670d\u52a1"},"\u573a\u666f\u4e00\uff1a\u4f7f\u7528\u8d26\u6237\u5bc6\u7801\u4fdd\u62a4\u4e0a\u6e38\u670d\u52a1"),(0,l.kt)("p",null,"\u672c\u793a\u4f8b\u5c06\u5f15\u5bfc\u5ba2\u6237\u7aef\u5230\u767b\u9646\u9875\u901a\u8fc7\u8d26\u6237\u5bc6\u7801\u7684\u65b9\u5f0f\u8fdb\u884c\u8eab\u4efd\u8ba4\u8bc1\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\u521b\u5efa\u4e00\u6761 API\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -XPUT 127.0.0.1:9080/apisix/admin/routes/1 -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -d \'{\n    "uri":"/anything/*",\n    "plugins": {\n        "openid-connect": {\n            "client_id": "myclient",\n            "client_secret": "e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq",\n            "discovery": "http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration",\n            "scope": "openid profile",\n            "bearer_only": false,\n            "realm": "myrealm",\n            "redirect_uri": "http://127.0.0.1:9080/anything/callback",\n            "logout_path": "/anything/logout"\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "httpbin.org:80":1\n        }\n    }\n}\'\n')),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/17.png",alt:"screenshot"})),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u521b\u5efa API \u6210\u529f\u540e\u8bbf\u95ee ",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:9080/anything/test")," \u65f6\uff0c\u7531\u4e8e\u672a\u8fdb\u884c\u767b\u5f55\uff0c\u56e0\u6b64\u5c06\u88ab\u5f15\u5bfc\u5230 Keycloak \u7684\u767b\u5f55\u9875\u9762\uff1a")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/18.png",alt:"screenshot"})),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"\u8f93\u5165\u8d26\u53f7\uff08myuser\uff09\u3001\u5bc6\u7801\uff08mypassword\uff09\u5b8c\u6210\u767b\u5f55\u540e\uff0c\u6210\u529f\u8df3\u8f6c\u5230 ",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:9080/anything/test")," \u9875\u9762\uff1a")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/19.png",alt:"screenshot"})),(0,l.kt)("ol",{start:4},(0,l.kt)("li",{parentName:"ol"},"\u8bbf\u95ee ",(0,l.kt)("inlineCode",{parentName:"li"},"http://127.0.0.1:9080/anything/logout")," \u9000\u51fa\u767b\u5f55\uff1a")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/20.png",alt:"screenshot"})),(0,l.kt)("h3",{id:"\u573a\u666f\u4e8c\u4f7f\u7528-accesstoken-\u9a8c\u8bc1\u8eab\u4efd"},"\u573a\u666f\u4e8c\uff1a\u4f7f\u7528 AccessToken \u9a8c\u8bc1\u8eab\u4efd"),(0,l.kt)("p",null,"\u901a\u8fc7\u542f\u7528 bearer_only \u53c2\u6570\u5bf9\u5e94\u7528\u4e4b\u95f4\u7684\u8c03\u7528\u8fdb\u884c\u8eab\u4efd\u8ba4\u8bc1\uff0c\u6b64\u65f6\u5e94\u7528\u8bbf\u95ee APISIX \u65f6\u9700\u643a\u5e26 Authorization Header\uff0c\u5426\u5219\u8be5\u8bf7\u6c42\u5c06\u88ab\u62d2\u7edd\u3002"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u4f7f\u7528\u5982\u4e0b\u547d\u4ee4\u521b\u5efa\u4e00\u6761 API\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -XPUT 127.0.0.1:9080/apisix/admin/routes/1 -H "X-API-KEY: edd1c9f034335f136f87ad84b625c8f1" -d \'{\n    "uri":"/anything/*",\n    "plugins": {\n        "openid-connect": {\n            "client_id": "myclient",\n            "client_secret": "e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq",\n            "discovery": "http://127.0.0.1:8080/realms/myrealm/.well-known/openid-configuration",\n            "scope": "openid profile",\n            "bearer_only": true,\n            "realm": "myrealm",\n            "redirect_uri": "http://127.0.0.1:9080/anything/callback",\n            "logout_path": "/anything/logout"\n        }\n    },\n    "upstream":{\n        "type":"roundrobin",\n        "nodes":{\n            "httpbin.org:80":1\n        }\n    }\n}\'\n')),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/21.png",alt:"screenshot"})),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u672a\u643a\u5e26 X-Access-Token \u8bbf\u95ee Apache APISIX \u65f6\u5c06\u8fd4\u56de 401 \u8868\u660e\u672a\u7ecf\u6388\u6743\uff1a")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/22.png",alt:"screenshot"})),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"\u8c03\u7528 Keycloak API \u83b7\u53d6 AccessToken\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl -XPOST "http://127.0.0.1:8080/realms/myrealm/protocol/openid-connect/token" -d "grant_type=password&username=myuser&client_id=myclient&client_secret=e91CKZQwhxyDqpkP0YFUJBxiXJ0ikJhq&password=mypassword"\n')),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/23.png",alt:"screenshot"})),(0,l.kt)("ol",{start:4},(0,l.kt)("li",{parentName:"ol"},"\u5c06 AccessToken \u653e\u4e8e Authorization \u5934\u4e2d\u8bf7\u6c42 APISIX\uff08\u66ff\u6362\u6389 ",(0,l.kt)("inlineCode",{parentName:"li"},"${AccessToken}"),"\uff09\uff0c\u53ef\u4ee5\u8ba4\u8bc1\u6210\u529f\uff1a")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9080/anything/test -H "Authorization: Bearer ${AccessToken}"\n')),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://static.apiseven.com/2022/blog/0706/24.png",alt:"screenshot"})),(0,l.kt)("h3",{id:"\u573a\u666f\u4e09\u4e0a\u6e38\u670d\u52a1\u89e3\u6790-userinfo-\u4fe1\u606f"},"\u573a\u666f\u4e09\uff1a\u4e0a\u6e38\u670d\u52a1\u89e3\u6790 UserInfo \u4fe1\u606f"),(0,l.kt)("p",null,"\u5f53\u542f\u7528 APISIX ",(0,l.kt)("inlineCode",{parentName:"p"},"set_userinfo_header")," \u914d\u7f6e\u540e\uff0c\u8ba4\u8bc1\u6210\u529f\u540e\u56de\u8c03\u8bf7\u6c42\u5c06\u643a\u5e26 ",(0,l.kt)("inlineCode",{parentName:"p"},"X-Userinfo")," \u8bf7\u6c42\u5934\uff0c\u5b83\u5305\u542b\u4e86 User \u7684\u57fa\u672c\u4fe1\u606f\uff0c\u53ef\u901a\u8fc7 ",(0,l.kt)("inlineCode",{parentName:"p"},"base64_decode")," \u83b7\u5f97\u7528\u6237\u5185\u5bb9\u3002"),(0,l.kt)("h2",{id:"\u5e38\u89c1\u95ee\u9898"},"\u5e38\u89c1\u95ee\u9898"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"\u4e3a\u4ec0\u4e48 APISIX \u4e2d Cookie \u503c\u975e\u5e38\u957f\uff1f"))),(0,l.kt)("p",null,"\u56e0\u4e3a APISIX \u4f1a\u5c06 ",(0,l.kt)("inlineCode",{parentName:"p"},"id_token"),"\u3001",(0,l.kt)("inlineCode",{parentName:"p"},"access_token"),"\u3001",(0,l.kt)("inlineCode",{parentName:"p"},"refresh_token")," \u7b49\u503c\u5199\u5165 Cookie \u4e2d\uff0c\u56e0\u6b64\u6574\u4e2a Cookie \u5185\u5bb9\u6bd4\u8f83\u957f\u3002\u5177\u4f53\u5b9e\u73b0\u53ef\u9605\u8bfb ",(0,l.kt)("inlineCode",{parentName:"p"},"lua-resty-openidc")," \u5e93\u4e2d\u8bbe\u7f6e session \u7684\u903b\u8f91\u3002"),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"\u5982\u4f55\u4fee\u6539 Session \u5b58\u50a8\u7684 Cookie \u540d\u79f0\u3001\u5b58\u50a8\u4f4d\u7f6e\uff1f"))),(0,l.kt)("p",null,"\u76ee\u524d openid-connect \u63d2\u4ef6\u672a\u63d0\u4f9b\u81ea\u5b9a\u4e49\u8fd9\u90e8\u5206\u914d\u7f6e\u7684\u80fd\u529b\uff0c\u56e0\u6b64\u53ef\u4ee5\u4f7f\u7528 lua-resty-session \u4e2d\u63d0\u4f9b\u7684\u65b9\u6cd5\uff1a\u901a\u8fc7 NGINX \u53d8\u91cf\u7684\u65b9\u5f0f\u5bf9\u5176\u9ed8\u8ba4\u914d\u7f6e\u8fdb\u884c\u8986\u76d6\u3002\n\u6b64\u5904\u501f\u52a9 APISIX \u63d0\u4f9b\u7684 NGINX \u914d\u7f6e\u6ce8\u5165\u80fd\u529b\u4ee5\u5b9e\u73b0\u8986\u76d6\uff1a\u901a\u8fc7\u5728\u914d\u7f6e\u6587\u4ef6 {apisix}/conf/config.yaml \u4e2d\u6dfb\u52a0\u8fd9\u4e9b\u4ee3\u7801\uff0c\u53ef\u4fee\u6539 Session \u5b58\u50a8 Cookie \u7684\u540d\u79f0\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yaml"},'nginx_config:\n  http_server_configuration_snippet: |\n    set $session_name "session_override";\n')),(0,l.kt)("p",null,"\u66f4\u591a\u914d\u7f6e\u9879\u53ef\u53c2\u8003\uff1a"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://github.com/bungle/lua-resty-session/blob/master/lib/resty/session.lua#L348-L380"},"lua-resty-session Init phase")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://github.com/bungle/lua-resty-session#pluggable-storage-adapters"},"lua-resty-session Pluggable Storage Adapters"))),(0,l.kt)("h2",{id:"\u53c2\u8003\u8d44\u6599"},"\u53c2\u8003\u8d44\u6599"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://apisix.apache.org/zh/blog/2021/12/10/integrate-keycloak-auth-in-apisix/"},"Integrate Keycloak with APISIX")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://www.keycloak.org/getting-started/getting-started-docker"},"Keycloak Getting Started")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://stackoverflow.com/questions/56561554/keycloak-realm-vs-keycloak-client"},"Keycloak Realm vs Client")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://stackoverflow.com/questions/49107701/keycloak-client-vs-user"},"Keycloak Client vs User")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("a",{parentName:"li",href:"https://wjw465150.gitbooks.io/keycloak-documentation/content/server_admin/topics/roles/client-scope.html"},"What is Client Scope?"))))}k.isMDXComponent=!0}}]);