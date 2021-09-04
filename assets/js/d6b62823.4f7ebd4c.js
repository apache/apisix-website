(self.webpackChunk=self.webpackChunk||[]).push([[64176],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return u},kt:function(){return m}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=p(r),m=a,f=d["".concat(c,".").concat(m)]||d[m]||l[m]||o;return r?n.createElement(f,i(i({ref:t},u),{},{components:r})):n.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},83922:function(e,t,r){"use strict";r.r(t),r.d(t,{frontMatter:function(){return i},metadata:function(){return s},toc:function(){return c},default:function(){return u}});var n=r(22122),a=r(19756),o=(r(67294),r(3905)),i={title:"User Guide"},s={unversionedId:"USER_GUIDE",id:"version-2.8/USER_GUIDE",isDocsHomePage:!1,title:"User Guide",description:"\x3c!--",source:"@site/docs-apisix-dashboard_versioned_docs/version-2.8/USER_GUIDE.md",sourceDirName:".",slug:"/USER_GUIDE",permalink:"/docs/dashboard/USER_GUIDE",editUrl:"https://github.com/apache/apisix-dashboard/edit/master/docs/en/latest/USER_GUIDE.md",version:"2.8",frontMatter:{title:"User Guide"},sidebar:"version-2.8/docs",next:{title:"Import OpenAPI Guide",permalink:"/docs/dashboard/IMPORT_OPENAPI_USER_GUIDE"}},c=[{value:"Dashboard",id:"dashboard",children:[]},{value:"Route",id:"route",children:[{value:"List",id:"list",children:[]},{value:"Create",id:"create",children:[]}]},{value:"Setting",id:"setting",children:[]}],p={toc:c};function u(e){var t=e.components,r=(0,a.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The following are parts of the modules' snapshot."),(0,o.kt)("h2",{id:"dashboard"},"Dashboard"),(0,o.kt)("p",null,"We support the monitor page by referencing it in ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe"},"iframe"),". Before accessing ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/"},"Grafana"),", please Enable ",(0,o.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/administration/configuration/#allow_embedding"},(0,o.kt)("inlineCode",{parentName:"a"},"allow_embedding=true")),", which defaults to ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),". This causes the browser to fail to render Grafana pages properly due to security policies."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112922395-0eed0380-912a-11eb-8c92-4c67d2bae4a8.png",alt:"Dashboard-en"})),(0,o.kt)("h2",{id:"route"},"Route"),(0,o.kt)("p",null,"The Route module aims to control routes by UI instead of calling APIs."),(0,o.kt)("h3",{id:"list"},"List"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112922389-0c8aa980-912a-11eb-8c45-b13192b3775d.png",alt:"route-list"})),(0,o.kt)("h3",{id:"create"},"Create"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112922912-ef0a0f80-912a-11eb-9d33-63d7215f7cfd.png",alt:"route-create-step1-en"})),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112923105-44462100-912b-11eb-8e1f-6548a6c28c35.png",alt:"route-create-step2-en"})),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112923140-545e0080-912b-11eb-9aef-d26b2c564efe.png",alt:"route-create-step3-en"})),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112923257-971fd880-912b-11eb-820c-1f2ca381304a.png",alt:"route-create-step4-en"})),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112923280-a0a94080-912b-11eb-8b83-3960778ecf8a.png",alt:"route-create-done-list-en"})),(0,o.kt)("h2",{id:"setting"},"Setting"),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/40708551/112923561-22996980-912c-11eb-926f-45177500eb65.png",alt:"setting"})))}u.isMDXComponent=!0}}]);