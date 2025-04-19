"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[58496],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>c});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),d=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=d(e.components);return a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),m=d(n),c=r,g=m["".concat(p,".").concat(c)]||m[c]||u[c]||i;return n?a.createElement(g,l(l({ref:t},s),{},{components:n})):a.createElement(g,l({ref:t},s))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var d=2;d<i;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9293:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"http-dubbo",keywords:["Apache APISIX","API Gateway","Plugin","http-dubbo","http to dubbo","transcode"],description:"This document contains information about the Apache APISIX http-dubbo Plugin."},l=void 0,o={unversionedId:"plugins/http-dubbo",id:"version-3.11/plugins/http-dubbo",isDocsHomePage:!1,title:"http-dubbo",description:"This document contains information about the Apache APISIX http-dubbo Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.11/plugins/http-dubbo.md",sourceDirName:"plugins",slug:"/plugins/http-dubbo",permalink:"/docs/apisix/3.11/plugins/http-dubbo",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/plugins/http-dubbo.md",tags:[],version:"3.11",frontMatter:{title:"http-dubbo",keywords:["Apache APISIX","API Gateway","Plugin","http-dubbo","http to dubbo","transcode"],description:"This document contains information about the Apache APISIX http-dubbo Plugin."},sidebar:"version-3.11/docs",previous:{title:"kafka-proxy",permalink:"/docs/apisix/3.11/plugins/kafka-proxy"},next:{title:"Admin API",permalink:"/docs/apisix/3.11/admin-api"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Example usage",id:"example-usage",children:[]},{value:"How to Get <code>params_type_desc</code>",id:"how-to-get-params_type_desc",children:[]},{value:"How to Serialize JSON According to Dubbo Protocol",id:"how-to-serialize-json-according-to-dubbo-protocol",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],d={toc:p};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"http-dubbo")," plugin can transcode between http and Dubbo (Note: in\nDubbo 2.x, the serialization type of the upstream service must be fastjson)."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Valid values"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"service_name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Dubbo service name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"service_version"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"0.0.0"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Dubbo service version")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"method"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Dubbo service method name")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"params_type_desc"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Description of the Dubbo service method signature")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"serialization_header_key"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"If ",(0,r.kt)("inlineCode",{parentName:"td"},"serialization_header_key")," is set, the plugin will read this request header to determine if the body has already been serialized according to the Dubbo protocol. If the value of this request header is true, the plugin will not modify the body content and will directly consider it as Dubbo request parameters. If it is false, the developer is required to pass parameters in the format of Dubbo's generic invocation, and the plugin will handle serialization. Note: Due to differences in precision between Lua and Java, serialization by the plugin may lead to parameter precision discrepancies.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"serialized"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null},"[true, false]"),(0,r.kt)("td",{parentName:"tr",align:null},"Same as ",(0,r.kt)("inlineCode",{parentName:"td"},"serialization_header_key"),". Priority is lower than ",(0,r.kt)("inlineCode",{parentName:"td"},"serialization_header_key"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"connect_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"6000"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Upstream tcp connect timeout")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"read_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"6000"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Upstream tcp read_timeout")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"send_timeout"),(0,r.kt)("td",{parentName:"tr",align:null},"number"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"6000"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Upstream tcp send_timeout")))),(0,r.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,r.kt)("p",null,"The example below enables the ",(0,r.kt)("inlineCode",{parentName:"p"},"http-dubbo")," Plugin on the specified Route:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i http://127.0.0.1:9180/apisix/admin/routes/1  \\\n-H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "uri": "/TestService/testMethod",\n    "plugins": {\n      "http-dubbo": {\n      "method": "testMethod",\n      "params_type_desc": "Ljava/lang/Long;Ljava/lang/Integer;",\n      "serialized": true,\n      "service_name": "com.xxx.xxx.TestService",\n      "service_version": "0.0.0"\n    }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:20880": 1\n        }\n    }\n}\'\n')),(0,r.kt)("h2",{id:"example-usage"},"Example usage"),(0,r.kt)("p",null,"Once you have configured the Plugin as shown above, you can make a request as shown below:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl --location 'http://127.0.0.1:9080/TestService/testMethod' \\\n--data '1\n2'\n")),(0,r.kt)("h2",{id:"how-to-get-params_type_desc"},"How to Get ",(0,r.kt)("inlineCode",{parentName:"h2"},"params_type_desc")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'Method[] declaredMethods = YourService.class.getDeclaredMethods();\nString params_type_desc = ReflectUtils.getDesc(Arrays.stream(declaredMethods).filter(it -> it.getName().equals("yourmethod")).findAny().get().getParameterTypes());\n\n// If there are method overloads, you need to find the method you want to expose.\n// ReflectUtils is a Dubbo implementation.\n')),(0,r.kt)("h2",{id:"how-to-serialize-json-according-to-dubbo-protocol"},"How to Serialize JSON According to Dubbo Protocol"),(0,r.kt)("p",null,"To prevent loss of precision, we recommend using pre-serialized bodies for requests. The serialization rules for Dubbo's\nfastjson are as follows:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Convert each parameter to a JSON string using toJSONString."),(0,r.kt)("li",{parentName:"ul"},"Separate each parameter with a newline character ",(0,r.kt)("inlineCode",{parentName:"li"},"\\n"),".")),(0,r.kt)("p",null,"Some languages and libraries may produce unchanged results when calling toJSONString on strings or numbers. In such\ncases, you may need to manually handle some special cases. For example:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The string ",(0,r.kt)("inlineCode",{parentName:"li"},'abc"')," needs to be encoded as ",(0,r.kt)("inlineCode",{parentName:"li"},'"abc\\""'),"."),(0,r.kt)("li",{parentName:"ul"},"The string ",(0,r.kt)("inlineCode",{parentName:"li"},"123")," needs to be encoded as ",(0,r.kt)("inlineCode",{parentName:"li"},'"123"'),".")),(0,r.kt)("p",null,"Abstract class, parent class, or generic type as input parameter signature, when the input parameter requires a specific\ntype. Serialization requires writing specific type information.\nRefer to ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/alibaba/fastjson/wiki/SerializerFeature_cn"},"WriteClassName")," for more details."),(0,r.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,r.kt)("p",null,"To remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"http-dubbo")," Plugin, you can delete the corresponding JSON configuration from the Plugin configuration.\nAPISIX will automatically reload and you do not have to restart for this to take effect."))}s.isMDXComponent=!0}}]);