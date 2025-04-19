"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[44080],{35318:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>d});var n=a(27378);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,r=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(a),d=i,g=c["".concat(p,".").concat(d)]||c[d]||m[d]||r;return a?n.createElement(g,l(l({ref:t},u),{},{components:a})):n.createElement(g,l({ref:t},u))}));function d(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=a.length,l=new Array(r);l[0]=c;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var s=2;s<r;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},46341:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>m,frontMatter:()=>r,metadata:()=>o,toc:()=>s});var n=a(25773),i=(a(27378),a(35318));const r={title:"APISIX-MCP: Embracing Intelligent API Management with AI + MCP",authors:[{name:"Zhihuang Lin",title:"API7 Engineer",url:"https://github.com/oil-oil",image_url:"https://github.com/oil-oil.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png"}],keywords:["API Gateway","APISIX AI Gateway","Apache APISIX","MCP","Model Context Protocol"],description:"The MCP protocol provides standardized connectivity for AI models. APISIX-MCP simplifies API management through natural language interaction, enabling intelligent configuration and automated workflows, thereby improving operational efficiency.",image:"https://static.api7.ai/uploads/2025/04/01/b53YPObN_apisix-mcp.webp",tags:["Ecosystem"]},l=void 0,o={permalink:"/blog/2025/04/01/embrace-intelligent-api-management-with-ai-and-mcp",source:"@site/blog/2025/04/01/embrace-intelligent-api-management-with-ai-and-mcp.md",title:"APISIX-MCP: Embracing Intelligent API Management with AI + MCP",description:"The MCP protocol provides standardized connectivity for AI models. APISIX-MCP simplifies API management through natural language interaction, enabling intelligent configuration and automated workflows, thereby improving operational efficiency.",date:"2025-04-01T00:00:00.000Z",formattedDate:"April 1, 2025",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:5.855,truncated:!0,authors:[{name:"Zhihuang Lin",title:"API7 Engineer",url:"https://github.com/oil-oil",image_url:"https://github.com/oil-oil.png",imageURL:"https://github.com/oil-oil.png"},{name:"Yilia Lin",title:"Technical Writer",url:"https://github.com/Yilialinn",image_url:"https://github.com/Yilialinn.png",imageURL:"https://github.com/Yilialinn.png"}],prevItem:{title:"Introducing APISIX AI Gateway",permalink:"/blog/2025/04/08/introducing-apisix-ai-gateway"},nextItem:{title:"Release Apache APISIX 3.12.0",permalink:"/blog/2025/04/01/release-apache-apisix-3.12.0"}},p={authorsImageUrls:[void 0,void 0]},s=[{value:"Preface",id:"preface",children:[],level:2},{value:"About APISIX-MCP",id:"about-apisix-mcp",children:[{value:"General Operations",id:"general-operations",children:[],level:3},{value:"API Resource Management",id:"api-resource-management",children:[],level:3},{value:"Plugin Operations",id:"plugin-operations",children:[],level:3},{value:"Security Configuration",id:"security-configuration",children:[],level:3}],level:2},{value:"How to Use APISIX-MCP",id:"how-to-use-apisix-mcp",children:[],level:2},{value:"Advantages of AI-Driven Operations",id:"advantages-of-ai-driven-operations",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],u={toc:s};function m(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"This article introduces the MCP protocol and its application in APISIX-MCP. APISIX-MCP simplifies API management through natural language interaction, supporting the creation, updating, and deletion of resources.  ")),(0,i.kt)("h2",{id:"preface"},"Preface"),(0,i.kt)("p",null,"With the explosive growth of large-scale AI model applications, many traditional systems are eager to integrate AI capabilities quickly. However, the current landscape of AI tools lacks unified standards, resulting in severe fragmentation. Different models vary in capability and integration methods, creating significant challenges for traditional applications during adoption.  "),(0,i.kt)("p",null,"Against this backdrop, in late 2024, Anthropic\u2014the company behind the renowned Claude model\u2014introduced the ",(0,i.kt)("strong",{parentName:"p"},"Model Context Protocol (MCP)"),". MCP positions itself as the ",(0,i.kt)("strong",{parentName:"p"},'"USB-C interface" for AI applications'),". Just as USB-C standardizes connections for peripherals and accessories, MCP provides a standardized approach for AI models to connect with diverse data sources and tools.  "),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://static.api7.ai/uploads/2025/04/01/u6Q4dGDZ_apisix-mcp-architecture-new.webp",alt:"MCP Architecture"}),"  "),(0,i.kt)("p",null,"Numerous services and applications have already adopted MCP. For example:  "),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"GitHub-MCP")," enables natural language code submissions and PR creation.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Figma MCP")," allows AI to generate UI designs directly.  "),(0,i.kt)("li",{parentName:"ul"},"With ",(0,i.kt)("strong",{parentName:"li"},"Browser-tools-MCP"),", tools like Cursor can debug code by interacting with DOM elements and console logs.  ")),(0,i.kt)("p",null,"The official MCP repository includes implementations for Google Drive, Slack, Git, and various databases. As an open standard, MCP has gained widespread recognition in the AI community, attracting third-party developers who contribute hundreds of new MCP services daily. Anthropic, as the founder, actively drives MCP\u2019s evolution by refining the protocol and educating developers.  "),(0,i.kt)("h2",{id:"about-apisix-mcp"},"About APISIX-MCP"),(0,i.kt)("p",null,"The rise of MCP offers traditional applications a new technical pathway. Leveraging MCP\u2019s standardized integration capabilities, we developed ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-mcp"},(0,i.kt)("strong",{parentName:"a"},"APISIX-MCP")),", which bridges large language models with Apache APISIX\u2019s Admin API through natural language interaction. The current implementation supports the following operations:  "),(0,i.kt)("h3",{id:"general-operations"},"General Operations"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_resource"),": Retrieve resources by type (routes, services, upstreams, etc.).  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"delete_resource"),": Delete resources by ID.  ")),(0,i.kt)("h3",{id:"api-resource-management"},"API Resource Management"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_route"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_route"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_route"),": Manage routes.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_service"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_service"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_service"),": Manage services.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_upstream"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_upstream"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_upstream"),": Manage upstreams.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_ssl"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_ssl"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_ssl"),": Manage SSL certificates.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_or_update_proto"),": Manage Protobuf definitions.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_or_update_stream_route"),": Manage stream routes.  ")),(0,i.kt)("h3",{id:"plugin-operations"},"Plugin Operations"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_all_plugin_names"),": List all available plugins.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_plugin_info"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"get_plugins_by_type"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"get_plugin_schema"),": Fetch plugin configurations.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_plugin_config"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_plugin_config"),": Manage plugin configurations.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_global_rule"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_global_rule"),": Manage global plugin rules.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_plugin_metadata"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"create_or_update_plugin_metadata"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_plugin_metadata"),": Manage plugin metadata.  ")),(0,i.kt)("h3",{id:"security-configuration"},"Security Configuration"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_secret_by_id"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"create_secret"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"update_secret"),": Manage secrets.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_or_update_consumer"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_consumer"),": Manage consumers.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"get_credential"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"create_or_update_credential"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_credential"),": Manage consumer credentials.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"create_consumer_group"),"/",(0,i.kt)("inlineCode",{parentName:"li"},"delete_consumer_group"),": Manage consumer groups.  ")),(0,i.kt)("h2",{id:"how-to-use-apisix-mcp"},"How to Use APISIX-MCP"),(0,i.kt)("p",null,"APISIX-MCP is now open-sourced and available on ",(0,i.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/apisix-mcp"},"npm")," and ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-mcp"},"GitHub"),". It can be configured via any MCP-compatible AI client, such as Claude Desktop, Cursor, or the Cline plugin for VSCode.  "),(0,i.kt)("p",null,"Below is a step-by-step guide using ",(0,i.kt)("strong",{parentName:"p"},"Cursor"),":  "),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Open Cursor, click the settings icon, and navigate to the settings page.  "),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("img",{parentName:"p",src:"https://static.api7.ai/uploads/2025/04/01/OCQcecuQ_apisix-mcp-2.webp",alt:"Configure cursor for APISIX-MCP"}),"  ")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Click ",(0,i.kt)("strong",{parentName:"p"},'"Add new global MCP server"')," to edit the ",(0,i.kt)("inlineCode",{parentName:"p"},"mcp.json")," configuration file:  "),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "mcpServers": {\n    "apisix-mcp": {\n      "command": "npx",\n      "args": ["-y", "apisix-mcp"],\n      "env": {\n        "APISIX_SERVER_HOST": "your-apisix-server-host",\n        "APISIX_ADMIN_API_PORT": "your-apisix-admin-api-port",\n        "APISIX_ADMIN_API_PREFIX": "your-apisix-admin-api-prefix",\n        "APISIX_ADMIN_KEY": "your-apisix-api-key"\n      }\n    }\n  }\n}\n')))),(0,i.kt)("p",null,"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"mcpServers")," field of the configuration file, add a service ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix-mcp"),", which can be changed. Then configure the commands for running the MCP service."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"command")),": ",(0,i.kt)("inlineCode",{parentName:"li"},"npx")," (Node.js package executor).  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"args")),": ",(0,i.kt)("inlineCode",{parentName:"li"},"-y")," (auto-install dependencies) and ",(0,i.kt)("inlineCode",{parentName:"li"},"apisix-mcp")," (package name).  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"strong"},"env")),": Customize APISIX connection settings (defaults below):  ")),(0,i.kt)("p",null,"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"env")," field, you can specify the APISIX service access address, Admin API port, prefix, and authentication key. These environment variables have default values, so if you start APISIX without any custom configuration, you can omit the ",(0,i.kt)("inlineCode",{parentName:"p"},"env")," field entirely. The default values for each variable are as follows:"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Variable"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"),(0,i.kt)("th",{parentName:"tr",align:null},"Default Value"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"APISIX_SERVER_HOST")),(0,i.kt)("td",{parentName:"tr",align:null},"APISIX server host"),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"http://127.0.0.1"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"APISIX_ADMIN_API_PORT")),(0,i.kt)("td",{parentName:"tr",align:null},"Admin API port"),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"9180"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"APISIX_ADMIN_API_PREFIX")),(0,i.kt)("td",{parentName:"tr",align:null},"Admin API prefix"),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"/apisix/admin"))),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"APISIX_ADMIN_KEY")),(0,i.kt)("td",{parentName:"tr",align:null},"Admin API authentication key"),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"edd1c9f034335f136f87ad84b625c8f1"))))),(0,i.kt)("ol",{start:3},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Upon successful configuration, the MCP Servers list will show a green indicator for ",(0,i.kt)("inlineCode",{parentName:"p"},"apisix-mcp"),", along with available tools.  "),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("img",{parentName:"p",src:"https://static.api7.ai/uploads/2025/04/01/toaXLc3n_apisix-mcp-3.webp",alt:"Successful Configuration"}),"  "),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},"Note: If setup fails, refer to the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/api7/apisix-mcp"},"APISIX-MCP GitHub")," documentation for manual builds.  "))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"In the chat panel, select ",(0,i.kt)("strong",{parentName:"p"},"Agent")," mode and choose a model (e.g., Claude Sonnet 3.5/3.7 or GPT-4o).  "),(0,i.kt)("p",{parentName:"li"},(0,i.kt)("img",{parentName:"p",src:"https://static.api7.ai/uploads/2025/04/01/g9v91DIf_apisix-mcp-4.webp",alt:"Select Agent Models"}),"  ")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Next, we can enter relevant operational commands to verify if the MCP service is functioning correctly. Following the workflow in APISIX's Getting Started documentation, we input the following into the dialog box and send the message:  "),(0,i.kt)("blockquote",{parentName:"li"},(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("em",{parentName:"p"},'"Help me create a route with path ',(0,i.kt)("inlineCode",{parentName:"em"},"/api")," for accessing ",(0,i.kt)("inlineCode",{parentName:"em"},"https://httpbin.org"),' upstream, with CORS and rate-limiting plugins. Print the route details after configuration."'),"  "))),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Next, in Cursor, you will see a process similar to the MCP tool invocation demonstrated in the video below. Due to the inherent randomness of large AI model responses, the exact operations performed may vary from the example shown."),(0,i.kt)("video",{width:"100%",controls:!0},(0,i.kt)("source",{src:"https://static.api7.ai/uploads/2025/04/01/V7CmO59u_mcp-demo.mp4",type:"video/mp4"})))),(0,i.kt)("p",null,"Here, the auto-execution mode (YOLO Mode) is enabled, allowing Cursor to automatically invoke all tools in the MCP server. From the video, we can observe the AI performing the following operations based on our requirements:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Analyzing the plugins we need to configure, then calling ",(0,i.kt)("inlineCode",{parentName:"li"},"get_plugins_list")," to retrieve all plugin names"),(0,i.kt)("li",{parentName:"ul"},"Invoking ",(0,i.kt)("inlineCode",{parentName:"li"},"get_plugin_schema")," to examine detailed configuration information for different plugins"),(0,i.kt)("li",{parentName:"ul"},"Calling ",(0,i.kt)("inlineCode",{parentName:"li"},"create_route")," to create the route"),(0,i.kt)("li",{parentName:"ul"},"Using ",(0,i.kt)("inlineCode",{parentName:"li"},"update_route")," to add the previously queried plugin configurations to the route"),(0,i.kt)("li",{parentName:"ul"},"Executing ",(0,i.kt)("inlineCode",{parentName:"li"},"get_route")," to verify whether the route was successfully configured and if the configuration is correct")),(0,i.kt)("ol",{start:7},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"The resulting route configuration includes:  "),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Route ID"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"httpbin"),"  ")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Path"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"/api/*"),"  ")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Methods"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"GET"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"POST"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"PUT"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"DELETE"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"PATCH"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"HEAD"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"OPTIONS"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"CORS Plugin"),":  "),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"allow_origins: *\nallow_methods: *\nallow_headers: *\nexpose_headers: X-Custom-Header\nmax_age: 3600\nallow_credential: false\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"limit-count Plugin"),":  "),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"count: 100\ntime_window: 60\nkey: remote_addr\nrejected_code: 429\npolicy: local\n"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Upstream"),":"),(0,i.kt)("pre",{parentName:"li"},(0,i.kt)("code",{parentName:"pre"},"type: roundrobin (load balancing strategy using round-robin)  \nupstream node: httpbin.org:443 (backend service address)  \n")))))),(0,i.kt)("h2",{id:"advantages-of-ai-driven-operations"},"Advantages of AI-Driven Operations"),(0,i.kt)("p",null,"In the above process, we accomplished the creation of a route configured with CORS and rate-limiting through just one round of natural language interaction with AI. Compared to manual route configuration, leveraging AI offers several distinct advantages:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Reduced Cognitive Load"),": Eliminates manual documentation lookup and parameter memorization.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Automated Workflows"),": AI decomposes tasks (e.g., plugin setup \u2192 route creation) without human intervention.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Closed-Loop Validation"),": Auto-verification ensures correctness.  "),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Iterative Optimization"),": Continuous dialogue refines configurations.  ")),(0,i.kt)("p",null,"This interaction model transforms complex configuration processes into natural conversational experiences while maintaining accuracy and verifiability. These capabilities are achieved through the MCP protocol's semantic parsing of requirements, intelligent tool invocation, and final execution via Admin API."),(0,i.kt)("p",null,"It's important to note that APISIX-MCP isn't designed to completely replace manual configuration, but rather to optimize efficiency for high-frequency operations. Its value shines particularly in configuration debugging and rapid validation scenarios, creating effective complementarity with traditional management approaches. As the MCP ecosystem continues to evolve, we can anticipate deeper integration of such tools in API management, promising more sophisticated capabilities."),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"MCP enables intelligent operations for complex API systems. APISIX-MCP lowers the barrier to Apache APISIX adoption, with future plans for AI-traffic-specific plugins. The fusion of AI and API management promises smarter, more efficient infrastructure governance."))}m.isMDXComponent=!0}}]);