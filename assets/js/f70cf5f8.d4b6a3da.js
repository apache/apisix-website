"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[90581],{35318:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(27378);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,g=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?a.createElement(g,r(r({ref:t},c),{},{components:n})):a.createElement(g,r({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,r[1]=l;for(var p=2;p<o;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},23133:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(25773),i=(n(27378),n(35318));const o={title:"Comprehensive Overview of APISIX AI Gateway Features",keywords:["APISIX","AI Gateway","LLM Proxy","API Gateway for AI","Token Rate Limiting","AI Security","AI Traffic Management","Open-Source API Gateway","Multi-LLM Load Balancing","AI API Protection","AI Request Throttling"],description:"Explore the robust features of the APISIX AI Gateway, including LLM proxy, intelligent traffic scheduling, token rate limiting, and security protection. Achieve multi-LLM load balancing, API rate control, and content moderation through open-source plugins to optimize the performance, security, and cost control of AI applications.",tags:["Ecosystem"],image:"https://static.api7.ai/uploads/2025/03/07/Qs4WrU0I_apisix-ai-gateway.webp"},r=void 0,l={permalink:"/blog/2025/02/24/apisix-ai-gateway-features",source:"@site/blog/2025/02/24/apisix-ai-gateway-features.md",title:"Comprehensive Overview of APISIX AI Gateway Features",description:"Explore the robust features of the APISIX AI Gateway, including LLM proxy, intelligent traffic scheduling, token rate limiting, and security protection. Achieve multi-LLM load balancing, API rate control, and content moderation through open-source plugins to optimize the performance, security, and cost control of AI applications.",date:"2025-02-24T00:00:00.000Z",formattedDate:"February 24, 2025",tags:[{label:"Ecosystem",permalink:"/blog/tags/ecosystem"}],readingTime:4.62,truncated:!0,authors:[],prevItem:{title:"Monthly Report (January 27 - February 28)",permalink:"/blog/2025/02/28/monthly-report"},nextItem:{title:"Why We Are Reinventing API Gateways: The Story Behind Apache APISIX",permalink:"/blog/2025/02/21/why-reinvent-api-gateways"}},s={authorsImageUrls:[]},p=[{value:"Introduction: The Rise of AI Agents and the Evolution of AI Gateway",id:"introduction-the-rise-of-ai-agents-and-the-evolution-of-ai-gateway",children:[],level:2},{value:"LLM Proxy: Efficient Management of Multiple LLM Backends",id:"llm-proxy-efficient-management-of-multiple-llm-backends",children:[],level:2},{value:"AI Security Protection: Ensuring Safe and Compliant Use of AI",id:"ai-security-protection-ensuring-safe-and-compliant-use-of-ai",children:[],level:2},{value:"Token Observability and Management: Preventing High Bills Due to API Abuse",id:"token-observability-and-management-preventing-high-bills-due-to-api-abuse",children:[],level:2},{value:"Smart Routing: Dynamic Traffic Management for AI APIs",id:"smart-routing-dynamic-traffic-management-for-ai-apis",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"This article will provide an in-depth look at the AI gateway features of the current and upcoming versions of APISIX. As a multifunctional API and AI gateway, Apache APISIX offers efficient and secure LLM API calls for AI applications.")),(0,i.kt)("h2",{id:"introduction-the-rise-of-ai-agents-and-the-evolution-of-ai-gateway"},"Introduction: The Rise of AI Agents and the Evolution of AI Gateway"),(0,i.kt)("p",null,"In recent years, AI agents such as AutoGPT, Chatbots, and AI Assistants have seen rapid development. These applications rely heavily on API calls to large language models (LLMs), which has brought about challenges considering high concurrency, cost control, and security."),(0,i.kt)("p",null,"Traditional API gateways primarily serve Web APIs and microservices and are not optimized for the unique needs of AI applications. This has led to the emergence of the concept of AI gateway. An AI gateway needs to provide enhanced capabilities in the following areas:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Multi-LLM Proxy"),": Support for multiple LLM providers to avoid vendor lock-in."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Token Rate Limiting"),": Prevent API abuse and optimize cost management."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Security Protection"),": Including prompt filtering and content moderation to ensure compliance of AI applications."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Smart Traffic Management"),": Dynamically adjust LLM weights based on cost, latency, and stability.")),(0,i.kt)("p",null,"Apache APISIX is not only an API gateway but also an AI gateway through its plugins, helping AI applications call LLM APIs more efficiently and securely."),(0,i.kt)("h2",{id:"llm-proxy-efficient-management-of-multiple-llm-backends"},"LLM Proxy: Efficient Management of Multiple LLM Backends"),(0,i.kt)("p",null,"AI applications typically do not rely on a single LLM provider but need to dynamically select the best model based on requirements. For example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Using OpenAI GPT-4 for general text generation and Claude for legal document processing."),(0,i.kt)("li",{parentName:"ul"},"Switching between Mistral and Gemini to optimize cost and throughput.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Apache APISIX's LLM Proxy offers the following capabilities:")),(0,i.kt)("p",null,"\u2705 Support for Multiple LLM Providers: Including OpenAI, DeepSeek, Claude, Mistral, Gemini, etc., to avoid vendor lock-in."),(0,i.kt)("p",null,"\u2705 LLM Weight and Priority Management: Adjust traffic distribution based on business needs."),(0,i.kt)("p",null,"\u2705 Multi-LLM Load Balancing: Dynamically adjust LLM weights based on latency, cost, and stability."),(0,i.kt)("p",null,"\u2705 Retry and Fallback Mechanisms: Ensure business continuity if an LLM API fails."),(0,i.kt)("p",null,"\u2705 Load Balancing Across Different Providers of the Same LLM:"),(0,i.kt)("p",null,"For example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Privately deployed DeepSeek."),(0,i.kt)("li",{parentName:"ul"},"Official DeepSeek API."),(0,i.kt)("li",{parentName:"ul"},"DeepSeek API from Volcano Engine")),(0,i.kt)("p",null,"Users can flexibly allocate traffic weights among different DeepSeek providers based on latency, stability, and price to achieve the best calling strategy."),(0,i.kt)("p",null,"These capabilities enable AI applications to adapt flexibly to different LLMs, improve reliability, and reduce API calling costs."),(0,i.kt)("h2",{id:"ai-security-protection-ensuring-safe-and-compliant-use-of-ai"},"AI Security Protection: Ensuring Safe and Compliant Use of AI"),(0,i.kt)("p",null,"AI APIs may involve sensitive data, misleading information, and potential misuse. Therefore, an AI gateway needs to provide security at multiple levels."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The AI security capabilities provided by Apache APISIX include:")),(0,i.kt)("p",null,"\u2705 ",(0,i.kt)("strong",{parentName:"p"},"AI RAG (Retrieval-Augmented Generation)"),": Supports enterprise-owned knowledge bases to reduce LLM hallucinations and improve output reliability."),(0,i.kt)("p",null,"\u2705 ",(0,i.kt)("strong",{parentName:"p"},"Prompt Guard"),": Automatically intercepts sensitive, illegal, and inappropriate prompts to prevent malicious use by users."),(0,i.kt)("p",null,"\u2705 ",(0,i.kt)("strong",{parentName:"p"},"Prompt Decorator"),": Automatically adds content before and after user input to enhance the quality of LLM-generated content."),(0,i.kt)("p",null,"\u2705 ",(0,i.kt)("strong",{parentName:"p"},"Prompt Template"),": Makes it easier for users to reuse standardized prompts and improve interaction experience."),(0,i.kt)("p",null,"\u2705 ",(0,i.kt)("strong",{parentName:"p"},"Response Filtering & Moderation"),": Intercepts sensitive or non-compliant AI-generated content."),(0,i.kt)("p",null,"\u2705 ",(0,i.kt)("strong",{parentName:"p"},"Logging & Auditing"),": Provides complete API request logs for compliance audits."),(0,i.kt)("p",null,"These security measures ensure that AI applications meet enterprise-level security requirements and avoid compliance risks due to misleading AI content."),(0,i.kt)("h2",{id:"token-observability-and-management-preventing-high-bills-due-to-api-abuse"},"Token Observability and Management: Preventing High Bills Due to API Abuse"),(0,i.kt)("p",null,"Calling LLM APIs consumes tokens, and API abuse can lead to significant costs. Apache APISIX provides fine-grained token monitoring and management mechanisms."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The token management capabilities of Apache APISIX include:")),(0,i.kt)("p",null,"\u2705 Token Rate Limiting by Route/Service/Consumer/Consumer Group/Custom Dimension"),(0,i.kt)("p",null,"\u2705 Support for Multiple Rate Limiting Modes:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Single-machine vs. cluster rate limiting to accommodate different scales of AI API services."),(0,i.kt)("li",{parentName:"ul"},"Fixed time window vs. sliding time window to flexibly control API rates.")),(0,i.kt)("p",null,"\u2705 Different Rate Limiting Policies for Different LLMs: Prevent cost overruns."),(0,i.kt)("p",null,"Through Apache APISIX, enterprises can achieve fine-grained management of token resources and prevent high bills due to API abuse."),(0,i.kt)("h2",{id:"smart-routing-dynamic-traffic-management-for-ai-apis"},"Smart Routing: Dynamic Traffic Management for AI APIs"),(0,i.kt)("p",null,"During AI API calls, different tasks may require different LLMs. For example:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Code generation requests \u2192 sent to GPT-4 or DeepSeek."),(0,i.kt)("li",{parentName:"ul"},"Long-form summarization tasks \u2192 sent to Claude."),(0,i.kt)("li",{parentName:"ul"},"General conversations \u2192 sent to GPT-3.5 or Gemini.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The smart routing capabilities of Apache APISIX include:")),(0,i.kt)("p",null,"\u2705 Context-Aware Routing Based on Request Content:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Select the optimal LLM based on prompt type."),(0,i.kt)("li",{parentName:"ul"},"Allocate different models (GPT-4 Turbo vs. GPT-3.5) based on user level (paid vs. free users).")),(0,i.kt)("p",null,"\u2705 Response Caching: Reduce redundant API calls and improve response speed."),(0,i.kt)("p",null,"These capabilities help AI APIs run more efficiently, reduce API latency, and increase throughput."),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"With the rapid development of AI technology, API gateways also need to evolve to meet the unique needs of AI applications. Apache APISIX, with its LLM Proxy, token rate limiting, security protection, and smart routing features, has become the best choice for an AI gateway."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"The core advantages of Apache APISIX compared to traditional API gateways are:")),(0,i.kt)("p",null,"\ud83d\ude80 Support for Multiple LLM Providers: Avoid vendor lock-in."),(0,i.kt)("p",null,"\u26a1\ufe0f Smart Traffic Scheduling: Dynamic load balancing to improve API reliability."),(0,i.kt)("p",null,"\ud83d\udd12 Built-in Security Capabilities: Including prompt protection and content moderation to ensure secure and compliant AI APIs."),(0,i.kt)("p",null,"\ud83d\udcb0 Token Rate Limiting: Prevent high bills due to API abuse."),(0,i.kt)("p",null,"\ud83d\udcca High-performance Architecture: Meet the high concurrency needs of AI applications."),(0,i.kt)("p",null,"If you are building AI-related applications and want to have both a powerful API gateway and AI gateway, give Apache APISIX a try!"))}u.isMDXComponent=!0}}]);