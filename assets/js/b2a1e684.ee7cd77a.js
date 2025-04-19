"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[75560],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>c});var a=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,l=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=s(t),c=r,g=u["".concat(p,".").concat(c)]||u[c]||m[c]||l;return t?a.createElement(g,i(i({ref:n},d),{},{components:t})):a.createElement(g,i({ref:n},d))}));function c(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var l=t.length,i=new Array(l);i[0]=u;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var s=2;s<l;s++)i[s]=t[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}u.displayName="MDXCreateElement"},48471:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=t(87462),r=(t(67294),t(3905));const l={title:"mocking",keywords:["Apache APISIX","API Gateway","Plugin","Mocking"],description:"This document contains information about the Apache APISIX mocking Plugin."},i=void 0,o={unversionedId:"plugins/mocking",id:"version-3.12/plugins/mocking",isDocsHomePage:!1,title:"mocking",description:"This document contains information about the Apache APISIX mocking Plugin.",source:"@site/docs-apisix_versioned_docs/version-3.12/plugins/mocking.md",sourceDirName:"plugins",slug:"/plugins/mocking",permalink:"/docs/apisix/plugins/mocking",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.12/docs/en/latest/plugins/mocking.md",tags:[],version:"3.12",frontMatter:{title:"mocking",keywords:["Apache APISIX","API Gateway","Plugin","Mocking"],description:"This document contains information about the Apache APISIX mocking Plugin."},sidebar:"version-3.12/docs",previous:{title:"fault-injection",permalink:"/docs/apisix/plugins/fault-injection"},next:{title:"degraphql",permalink:"/docs/apisix/plugins/degraphql"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Example usage",id:"example-usage",children:[]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],s={toc:p};function d(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"mocking")," Plugin is used for mocking an API. When executed, it returns random mock data in the format specified and the request is not forwarded to the Upstream."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"delay"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Response delay in seconds.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"response_status"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"200"),(0,r.kt)("td",{parentName:"tr",align:null},"HTTP status code of the response.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"content_type"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"application/json"),(0,r.kt)("td",{parentName:"tr",align:null},"Header ",(0,r.kt)("inlineCode",{parentName:"td"},"Content-Type")," of the response.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"response_example"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Body of the response, support use variables, like ",(0,r.kt)("inlineCode",{parentName:"td"},"$remote_addr $consumer_name"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"response_schema"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"The JSON schema object for the response. Works when ",(0,r.kt)("inlineCode",{parentName:"td"},"response_example")," is unspecified.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"with_mock_header"),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"False"),(0,r.kt)("td",{parentName:"tr",align:null},"true"),(0,r.kt)("td",{parentName:"tr",align:null},"When set to ",(0,r.kt)("inlineCode",{parentName:"td"},"true"),", adds a response header ",(0,r.kt)("inlineCode",{parentName:"td"},"x-mock-by: APISIX/{version}"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"response_headers"),(0,r.kt)("td",{parentName:"tr",align:null},"object"),(0,r.kt)("td",{parentName:"tr",align:null},"false"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"Headers to be added in the mocked response. Example: ",(0,r.kt)("inlineCode",{parentName:"td"},'{"X-Foo": "bar", "X-Few": "baz"}'))))),(0,r.kt)("p",null,"The JSON schema supports the following types in their fields:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"string")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"number")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"integer")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"boolean")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"object")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"array"))),(0,r.kt)("p",null,"Here is a JSON schema example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "properties":{\n        "field0":{\n            "example":"abcd",\n            "type":"string"\n        },\n        "field1":{\n            "example":123.12,\n            "type":"number"\n        },\n        "field3":{\n            "properties":{\n                "field3_1":{\n                    "type":"string"\n                },\n                "field3_2":{\n                    "properties":{\n                        "field3_2_1":{\n                            "example":true,\n                            "type":"boolean"\n                        },\n                        "field3_2_2":{\n                            "items":{\n                                "example":155.55,\n                                "type":"integer"\n                            },\n                            "type":"array"\n                        }\n                    },\n                    "type":"object"\n                }\n            },\n            "type":"object"\n        },\n        "field2":{\n            "items":{\n                "type":"string"\n            },\n            "type":"array"\n        }\n    },\n    "type":"object"\n}\n')),(0,r.kt)("p",null,"This is the response generated by the Plugin from this JSON schema:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "field1": 123.12,\n    "field3": {\n        "field3_1": "LCFE0",\n        "field3_2": {\n            "field3_2_1": true,\n            "field3_2_2": [\n                155,\n                155\n            ]\n        }\n    },\n    "field0": "abcd",\n    "field2": [\n        "sC"\n    ]\n}\n')),(0,r.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,r.kt)("p",null,"The example below configures the ",(0,r.kt)("inlineCode",{parentName:"p"},"mocking")," Plugin for a specific Route:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/index.html",\n    "plugins": {\n        "mocking": {\n            "delay": 1,\n            "content_type": "application/json",\n            "response_status": 200,\n            "response_schema": {\n               "properties":{\n                   "field0":{\n                       "example":"abcd",\n                       "type":"string"\n                   },\n                   "field1":{\n                       "example":123.12,\n                       "type":"number"\n                   },\n                   "field3":{\n                       "properties":{\n                           "field3_1":{\n                               "type":"string"\n                           },\n                           "field3_2":{\n                               "properties":{\n                                   "field3_2_1":{\n                                       "example":true,\n                                       "type":"boolean"\n                                   },\n                                   "field3_2_2":{\n                                       "items":{\n                                           "example":155.55,\n                                           "type":"integer"\n                                       },\n                                       "type":"array"\n                                   }\n                               },\n                               "type":"object"\n                           }\n                       },\n                       "type":"object"\n                   },\n                   "field2":{\n                       "items":{\n                           "type":"string"\n                       },\n                       "type":"array"\n                   }\n               },\n               "type":"object"\n           }\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')),(0,r.kt)("h2",{id:"example-usage"},"Example usage"),(0,r.kt)("p",null,"Once you have configured the Plugin as mentioned above, you can test the Route."),(0,r.kt)("p",null,"The example used here uses this mocked response:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "delay":0,\n  "content_type":"",\n  "with_mock_header":true,\n  "response_status":201,\n  "response_example":"{\\"a\\":1,\\"b\\":2}"\n}\n')),(0,r.kt)("p",null,"Now to test the Route:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl http://127.0.0.1:9080/test-mock -i\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'HTTP/1.1 201 Created\n...\nContent-Type: application/json;charset=utf8\nx-mock-by: APISIX/2.10.0\n...\n\n{"a":1,"b":2}\n')),(0,r.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,r.kt)("p",null,"To remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"mocking")," Plugin, you can delete the corresponding JSON configuration from the Plugin configuration. APISIX will automatically reload and you do not have to restart for this to take effect."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "methods": ["GET"],\n    "uri": "/index.html",\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": {\n            "127.0.0.1:1980": 1\n        }\n    }\n}\'\n')))}d.isMDXComponent=!0}}]);