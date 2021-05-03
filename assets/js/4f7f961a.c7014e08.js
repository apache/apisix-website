(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{129:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return b}));var r=n(3),a=n(8),o=(n(0),n(270)),i={title:"Batch Processor"},c={unversionedId:"batch-processor",id:"batch-processor",isDocsHomePage:!1,title:"Batch Processor",description:"\x3c!--",source:"@site/docs/apisix/batch-processor.md",slug:"/batch-processor",permalink:"/docs/apisix/batch-processor",editUrl:"https://github.com/apache/apisix/edit/master/docs/en/latest/batch-processor.md",version:"current",sidebar:"docs",previous:{title:"HTTPS",permalink:"/docs/apisix/https"},next:{title:"Benchmark",permalink:"/docs/apisix/benchmark"}},l=[{value:"Configurations",id:"configurations",children:[]}],s={toc:l};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The batch processor can be used to aggregate entries(logs/any data) and process them in a batch.\nWhen the batch_max_size is set to zero the processor will execute each entry immediately. Setting the batch max size more\nthan 1 will start aggregating the entries until it reaches the max size or the timeout expires."),Object(o.b)("h2",{id:"configurations"},"Configurations"),Object(o.b)("p",null,"The only mandatory parameter to create a batch processor is a function. The function will be executed when the batch reaches the max size\nor when the buffer duration exceeds."),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Requirement"),Object(o.b)("th",{parentName:"tr",align:null},"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"id"),Object(o.b)("td",{parentName:"tr",align:null},"optional"),Object(o.b)("td",{parentName:"tr",align:null},"A unique identifier to identity the batch processor")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"batch_max_size"),Object(o.b)("td",{parentName:"tr",align:null},"optional"),Object(o.b)("td",{parentName:"tr",align:null},"Max size of each batch, default is 1000")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"inactive_timeout"),Object(o.b)("td",{parentName:"tr",align:null},"optional"),Object(o.b)("td",{parentName:"tr",align:null},"maximum age in seconds when the buffer will be flushed if inactive, default is 5s")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"buffer_duration"),Object(o.b)("td",{parentName:"tr",align:null},"optional"),Object(o.b)("td",{parentName:"tr",align:null},"Maximum age in seconds of the oldest entry in a batch before the batch must be processed, default is 5")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"max_retry_count"),Object(o.b)("td",{parentName:"tr",align:null},"optional"),Object(o.b)("td",{parentName:"tr",align:null},"Maximum number of retries before removing from the processing pipe line; default is zero")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"retry_delay"),Object(o.b)("td",{parentName:"tr",align:null},"optional"),Object(o.b)("td",{parentName:"tr",align:null},"Number of seconds the process execution should be delayed if the execution fails; default is 1")))),Object(o.b)("p",null,"The following code shows an example of how to use a batch processor. The batch processor takes a function to be executed as the first\nargument and the batch configuration as the second parameter."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-lua"},"local bp = require(\"apisix.plugins.batch-processor\")\nlocal func_to_execute = function(entries)\n            -- serialize to json array core.json.encode(entries)\n            -- process/send data\n            return true\n       end\n\nlocal config = {\n    max_retry_count  = 2,\n    buffer_duration  = 60,\n    inactive_timeout  = 5,\n    batch_max_size = 1,\n    retry_delay  = 0\n}\n\n\nlocal batch_processor, err = bp:new(func_to_execute, config)\n\nif batch_processor then\n    batch_processor:push({hello='world'})\nend\n")),Object(o.b)("p",null,"Note: Please make sure the batch max size (entry count) is within the limits of the function execution.\nThe timer to flush the batch runs based on the ",Object(o.b)("inlineCode",{parentName:"p"},"inactive_timeout")," configuration. Thus, for optimal usage,\nkeep the ",Object(o.b)("inlineCode",{parentName:"p"},"inactive_timeout")," smaller than the ",Object(o.b)("inlineCode",{parentName:"p"},"buffer_duration"),"."))}b.isMDXComponent=!0},270:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),b=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=b(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=b(n),m=r,d=u["".concat(i,".").concat(m)]||u[m]||p[m]||o;return n?a.a.createElement(d,c(c({ref:t},s),{},{components:n})):a.a.createElement(d,c({ref:t},s))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);