"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[96913],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=s(n),u=r,h=d["".concat(p,".").concat(u)]||d[u]||m[u]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},30631:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=n(87462),r=(n(67294),n(3905));const i={title:"mqtt-proxy",keywords:["Apache APISIX","API Gateway","Plugin","MQTT Proxy"],description:"This document contains information about the Apache APISIX mqtt-proxy Plugin. The `mqtt-proxy` Plugin is used for dynamic load balancing with `client_id` of MQTT."},o=void 0,l={unversionedId:"plugins/mqtt-proxy",id:"version-3.11/plugins/mqtt-proxy",isDocsHomePage:!1,title:"mqtt-proxy",description:"This document contains information about the Apache APISIX mqtt-proxy Plugin. The `mqtt-proxy` Plugin is used for dynamic load balancing with `client_id` of MQTT.",source:"@site/docs-apisix_versioned_docs/version-3.11/plugins/mqtt-proxy.md",sourceDirName:"plugins",slug:"/plugins/mqtt-proxy",permalink:"/docs/apisix/3.11/plugins/mqtt-proxy",editUrl:"/edit#https://github.com/apache/apisix/edit/release/3.11/docs/en/latest/plugins/mqtt-proxy.md",tags:[],version:"3.11",frontMatter:{title:"mqtt-proxy",keywords:["Apache APISIX","API Gateway","Plugin","MQTT Proxy"],description:"This document contains information about the Apache APISIX mqtt-proxy Plugin. The `mqtt-proxy` Plugin is used for dynamic load balancing with `client_id` of MQTT."},sidebar:"version-3.11/docs",previous:{title:"dubbo-proxy",permalink:"/docs/apisix/3.11/plugins/dubbo-proxy"},next:{title:"kafka-proxy",permalink:"/docs/apisix/3.11/plugins/kafka-proxy"}},p=[{value:"Description",id:"description",children:[]},{value:"Attributes",id:"attributes",children:[]},{value:"Enable Plugin",id:"enable-plugin",children:[]},{value:"Enabling mTLS with mqtt-proxy plugin",id:"enabling-mtls-with-mqtt-proxy-plugin",children:[{value:"Create a stream_route using mqtt-proxy plugin and mTLS",id:"create-a-stream_route-using-mqtt-proxy-plugin-and-mtls",children:[]}]},{value:"Delete Plugin",id:"delete-plugin",children:[]}],s={toc:p};function c(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"description"},"Description"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"mqtt-proxy")," Plugin is used for dynamic load balancing with ",(0,r.kt)("inlineCode",{parentName:"p"},"client_id")," of MQTT. It only works in stream model."),(0,r.kt)("p",null,"This Plugin supports both the protocols ",(0,r.kt)("a",{parentName:"p",href:"http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html"},"3.1.*")," and ",(0,r.kt)("a",{parentName:"p",href:"https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"},"5.0"),"."),(0,r.kt)("h2",{id:"attributes"},"Attributes"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"protocol_name"),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the protocol. Generally ",(0,r.kt)("inlineCode",{parentName:"td"},"MQTT"),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"protocol_level"),(0,r.kt)("td",{parentName:"tr",align:null},"integer"),(0,r.kt)("td",{parentName:"tr",align:null},"True"),(0,r.kt)("td",{parentName:"tr",align:null},"Level of the protocol. It should be ",(0,r.kt)("inlineCode",{parentName:"td"},"4")," for MQTT ",(0,r.kt)("inlineCode",{parentName:"td"},"3.1.*")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"5")," for MQTT ",(0,r.kt)("inlineCode",{parentName:"td"},"5.0"),".")))),(0,r.kt)("h2",{id:"enable-plugin"},"Enable Plugin"),(0,r.kt)("p",null,"To enable the Plugin, you need to first enable the ",(0,r.kt)("inlineCode",{parentName:"p"},"stream_proxy")," configuration in your configuration file (",(0,r.kt)("inlineCode",{parentName:"p"},"conf/config.yaml"),"). The below configuration represents listening on the ",(0,r.kt)("inlineCode",{parentName:"p"},"9100")," TCP port:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="conf/config.yaml"',title:'"conf/config.yaml"'},"    ...\n    router:\n        http: 'radixtree_uri'\n        ssl: 'radixtree_sni'\n    stream_proxy:                 # TCP/UDP proxy\n      tcp:                        # TCP proxy port list\n        - 9100\n    dns_resolver:\n    ...\n")),(0,r.kt)("p",null,"You can now send the MQTT request to port ",(0,r.kt)("inlineCode",{parentName:"p"},"9100"),"."),(0,r.kt)("p",null,"You can now create a stream Route and enable the ",(0,r.kt)("inlineCode",{parentName:"p"},"mqtt-proxy")," Plugin:"),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"You can fetch the ",(0,r.kt)("inlineCode",{parentName:"p"},"admin_key")," from ",(0,r.kt)("inlineCode",{parentName:"p"},"config.yaml")," and save to an environment variable with the following command:"),(0,r.kt)("pre",{parentName:"div"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"admin_key=$(yq '.deployment.admin.admin_key[0].key' conf/config.yaml | sed 's/\"//g')\n")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "mqtt-proxy": {\n            "protocol_name": "MQTT",\n            "protocol_level": 4\n        }\n    },\n    "upstream": {\n        "type": "roundrobin",\n        "nodes": [{\n            "host": "127.0.0.1",\n            "port": 1980,\n            "weight": 1\n        }]\n    }\n}\'\n')),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If you are using Docker in macOS, then ",(0,r.kt)("inlineCode",{parentName:"p"},"host.docker.internal")," is the right parameter for the ",(0,r.kt)("inlineCode",{parentName:"p"},"host")," attribute."))),(0,r.kt)("p",null,"This Plugin exposes a variable ",(0,r.kt)("inlineCode",{parentName:"p"},"mqtt_client_id")," which can be used for load balancing as shown below:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "mqtt-proxy": {\n            "protocol_name": "MQTT",\n            "protocol_level": 4\n        }\n    },\n    "upstream": {\n        "type": "chash",\n        "key": "mqtt_client_id",\n        "nodes": [\n        {\n            "host": "127.0.0.1",\n            "port": 1995,\n            "weight": 1\n        },\n        {\n            "host": "127.0.0.2",\n            "port": 1995,\n            "weight": 1\n        }\n        ]\n    }\n}\'\n')),(0,r.kt)("p",null,"MQTT connections with different client ID will be forwarded to different nodes based on the consistent hash algorithm. If client ID is missing, client IP is used instead for load balancing."),(0,r.kt)("h2",{id:"enabling-mtls-with-mqtt-proxy-plugin"},"Enabling mTLS with mqtt-proxy plugin"),(0,r.kt)("p",null,"Stream proxies use TCP connections and can accept TLS. Follow the guide about ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/3.11/stream-proxy/#accept-tls-over-tcp-connection"},"how to accept tls over tcp connections")," to open a stream proxy with enabled TLS."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"mqtt-proxy")," plugin is enabled through TCP communications on the specified port for the stream proxy, and will also require clients to authenticate via TLS if ",(0,r.kt)("inlineCode",{parentName:"p"},"tls")," is set to ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,r.kt)("p",null,"Configure ",(0,r.kt)("inlineCode",{parentName:"p"},"ssl")," providing the CA certificate and the server certificate, together with a list of SNIs. Steps to protect ",(0,r.kt)("inlineCode",{parentName:"p"},"stream_routes")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"ssl")," are equivalent to the ones to ",(0,r.kt)("a",{parentName:"p",href:"/docs/apisix/3.11/mtls/#protect-route"},"protect Routes"),"."),(0,r.kt)("h3",{id:"create-a-stream_route-using-mqtt-proxy-plugin-and-mtls"},"Create a stream_route using mqtt-proxy plugin and mTLS"),(0,r.kt)("p",null,"Here is an example of how create a stream_route which is using the ",(0,r.kt)("inlineCode",{parentName:"p"},"mqtt-proxy")," plugin, providing the CA certificate, the client certificate and the client key (for self-signed certificates which are not trusted by your host, use the ",(0,r.kt)("inlineCode",{parentName:"p"},"-k")," flag):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl 127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X PUT -d \'\n{\n    "plugins": {\n        "mqtt-proxy": {\n            "protocol_name": "MQTT",\n            "protocol_level": 4\n        }\n    },\n    "sni": "${your_sni_name}",\n    "upstream": {\n        "nodes": {\n            "127.0.0.1:1980": 1\n        },\n        "type": "roundrobin"\n    }\n}\'\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"sni")," name must match one or more of the SNIs provided to the SSL object that you created with the CA and server certificates."),(0,r.kt)("h2",{id:"delete-plugin"},"Delete Plugin"),(0,r.kt)("p",null,"To remove the ",(0,r.kt)("inlineCode",{parentName:"p"},"mqtt-proxy")," Plugin you can remove the corresponding configuration as shown below:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl http://127.0.0.1:9180/apisix/admin/stream_routes/1 -H "X-API-KEY: $admin_key" -X DELETE\n')))}c.isMDXComponent=!0}}]);