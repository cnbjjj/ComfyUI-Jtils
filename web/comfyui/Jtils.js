(()=>{"use strict";({260:function(){var o=this&&this.__awaiter||function(o,t,n,e){return new(n||(n=Promise))((function(i,s){function c(o){try{a(e.next(o))}catch(o){s(o)}}function r(o){try{a(e.throw(o))}catch(o){s(o)}}function a(o){var t;o.done?i(o.value):(t=o.value,t instanceof n?t:new n((function(o){o(t)}))).then(c,r)}a((e=e.apply(o,t||[])).next())}))};const t="𝓙tils",n="Search Nodes by Class Type",e="Version";const i="#792243",s="#880E4F",c="#FF5984",r={[n]:()=>o(void 0,void 0,void 0,(function*(){var t;const{app:n}=yield function(){return o(this,void 0,void 0,(function*(){const o=yield import("../../../scripts/app.js"),t=yield import("../../../scripts/api.js");return{app:o.app,api:t.api}}))}(),e=(yield n.graphToPrompt()).output;let r=(null===(t=prompt("Please enter the search string:",""))||void 0===t?void 0:t.trim())+"";null===r&&(r="");const a=Object.entries(e).filter((([o])=>{var t;const n=e[o];return""===r?void 0===n.class_type:null===(t=n.class_type)||void 0===t?void 0:t.toLowerCase().includes(r.toLowerCase())}));a.forEach((([o])=>{const t=n.graph.getNodeById(o);if(!t)return;console.log(t);let{color:e,bgcolor:r,groupcolor:a}=t;Object.assign(t,{color:i,bgcolor:s,groupcolor:c}),t.onDeselected=()=>{Object.assign(t,{bgcolor:r,color:e,groupcolor:a}),t.onDeselected=null}})),n.canvas.canvas.data.selectNodes(Object.values(a).map((([o])=>n.graph.getNodeById(o))))})),[e]:()=>o(void 0,void 0,void 0,(function*(){console.log(t,"v0.0.1")}))};setTimeout((()=>o(void 0,void 0,void 0,(function*(){const n=window.LGraphCanvas.prototype.getCanvasMenuOptions;window.LGraphCanvas.prototype.getCanvasMenuOptions=function(){const o=n.apply(this,arguments);return o.push(null,{content:t,has_submenu:!0,submenu:{options:Object.entries(r).map((([o,t])=>({content:o,callback:t})))}}),o},fetch("/Jtils/version").then((n=>o(void 0,void 0,void 0,(function*(){const o=yield n.json();console.log(`${t} Loaded`,o)}))))}))),10)}})[260]()})();