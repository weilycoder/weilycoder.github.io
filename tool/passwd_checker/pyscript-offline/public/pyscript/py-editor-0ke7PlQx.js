import{T as e,c as t,X as r,d as n,a as o,r as s,o as a,H as i,s as c}from"./core-B0xJnVq9.js";import{notify as l}from"./error-DpZG5LEt.js";let d=0;const u=e=>`${e}-editor-${d++}`,f=new Map,p=new Map,g={worker:{codeBeforeRun:()=>c,onReady:({runAsync:e,io:t},{sync:r})=>{t.stdout=t.buffered(r.write),t.stderr=t.buffered(r.writeErr),r.revoke(),r.runAsync=e}}},v=(e,t)=>{if("boolean"==typeof t)throw`Invalid source: ${e}`;return t};async function m({currentTarget:t}){const{env:o,pySrc:c,outDiv:d}=this,u=!!t;if(u&&(t.disabled=!0,d.innerHTML=""),!f.has(o)){const c=URL.createObjectURL(new Blob([""])),d={type:this.interpreter,serviceWorker:this.serviceWorker},{config:p}=this;if(p)try{if(d.configURL=s(p),p.endsWith(".toml")){const[{parse:e},t]=await Promise.all([import("./toml-CvAfdf9_.js"),fetch(p).then((e=>e.ok&&e.text()))]);d.config=e(v(p,t))}else if(p.endsWith(".json")){const e=await fetch(p).then((e=>e.ok&&e.json()));d.config=v(p,e)}else d.configURL=s("./config.txt"),d.config=JSON.parse(p);d.version=a(d.config)}catch(e){return void l(e)}else d.config={};const m=r.call(new i(null,g),c,d);if(u)for(const r of e.keys()){const e=t.closest(`.${r}-editor-box`),o=e?.parentNode?.previousElementSibling;if(o){n(o,{xworker:{value:m}});break}}const{sync:h}=m,{promise:y,resolve:b}=Promise.withResolvers();f.set(o,y),h.revoke=()=>{URL.revokeObjectURL(c),b(m)}}return f.get(o).then((e=>{e.onerror=({error:e})=>{u&&d.insertAdjacentHTML("beforeend",`<span style='color:red'>${e.message||e}</span>\n`),console.error(e)};const r=()=>{u&&(t.disabled=!1)},{sync:n}=e;n.write=e=>{u?d.innerText+=`${e}\n`:console.log(e)},n.writeErr=e=>{u?d.insertAdjacentHTML("beforeend",`<span style='color:red'>${e}</span>\n`):(l(e),console.error(e))},n.runAsync(c).then(r,r)}))}const h=(e,t)=>{const r=document.createElement("div");r.className=`${t}-editor-input`,r.setAttribute("aria-label","Python Script Area");const n=((e,t)=>{const r=document.createElement("button");return r.className=`absolute ${t}-editor-run-button`,r.innerHTML='<svg style="height:20px;width:20px;vertical-align:-.125em;transform-origin:center;overflow:visible;color:green" viewBox="0 0 384 512" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg"><g transform="translate(192 256)" transform-origin="96 0"><g transform="translate(0,0) scale(1,1)"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" fill="currentColor" transform="translate(-192 -256)"></path></g></g></svg>',r.setAttribute("aria-label","Python Script Run Button"),r.addEventListener("click",(async t=>{r.blur(),await e.handleEvent(t)})),r})(e,t),o=document.createElement("div");return o.addEventListener("keydown",(e=>{e.stopPropagation()})),r.append(n,o),r},y=(e,t)=>{const r=document.createElement("div");r.className=`${t}-editor-box`;const n=h(e,t),o=(e=>{const t=document.createElement("div");return t.className=`${e}-editor-output`,t.id=`${u(e)}-output`,t})(t);return r.append(n,o),[r,o,n.querySelector("button")]},b=async(e,s,a)=>{const[{basicSetup:i,EditorView:c},{Compartment:d},{python:f},{indentUnit:g},{keymap:h},{defaultKeymap:b,indentWithTab:w}]=await Promise.all([t.core,t.state,t.python,t.language,t.view,t.commands]);let E=e.hasAttribute("setup");const k=e.hasAttribute("config"),$=e.getAttribute("service-worker"),A=`${a}-${e.getAttribute("env")||u(s)}`;if($&&(new r("data:application/javascript,postMessage(0)",{type:"dummy",serviceWorker:$}).onmessage=({target:e})=>e.terminate()),k&&p.has(A))throw new SyntaxError(p.get(A)?`duplicated config for env: ${A}`:`unable to add a config to the env: ${A}`);p.set(A,k);let x=e.textContent;const{src:S}=e;if(S)try{x=v(S,await fetch(S).then((e=>e.ok&&e.text())))}catch(e){return void l(e)}const L={handleEvent:m,serviceWorker:$,interpreter:a,env:A,config:k&&e.getAttribute("config"),get pySrc(){return E?x:B.state.doc.toString()},get outDiv(){return E?null:j}};let C;n(e,{target:{get:()=>C},handleEvent:{get:()=>L.handleEvent,set:e=>{L.handleEvent=e===m?m:async t=>{const{currentTarget:r}=t;n(t,{code:{value:L.pySrc}}),!1!==await e(t)&&await m.call(L,{currentTarget:r})}}},code:{get:()=>L.pySrc,set:e=>{E||B.update([B.state.update({changes:{from:0,to:B.state.doc.length,insert:e}})])}},process:{value(e,t=!1){if(t)return N();const r=E,n=x;E=!0,x=e;const o=()=>{E=r,x=n};return L.handleEvent({currentTarget:null}).then(o,o)}}});const T=()=>{const t=new Event(`${s}-editor`,{bubbles:!0});e.dispatchEvent(t)};if(E)return await L.handleEvent({currentTarget:null}),void T();const M=e.getAttribute("target");if(M){if(C=document.getElementById(M)||document.querySelector(M),!C)throw new Error(`Unknown target ${M}`)}else C=document.createElement(`${s}-editor`),C.style.display="block",e.after(C);C.id||(C.id=u(s)),C.hasAttribute("exec-id")||C.setAttribute("exec-id",0),C.hasAttribute("root")||C.setAttribute("root",C.id);const[R,j,U]=y(L,s);R.dataset.env=e.hasAttribute("env")?A:a;const P=R.querySelector(`.${s}-editor-input > div`).attachShadow({mode:"open"});P.innerHTML="<style> :host { all: initial; }</style>",C.appendChild(R);const W=o(e.textContent).trim(),H=/^([ \t]+)/m.test(W)?RegExp.$1:"    ",N=()=>U.click(),B=new c({extensions:[g.of(H),(new d).of(f()),h.of([...b,{key:"Ctrl-Enter",run:N,preventDefault:!0},{key:"Cmd-Enter",run:N,preventDefault:!0},{key:"Shift-Enter",run:N,preventDefault:!0},w]),i],foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"],parent:P,doc:W});B.focus(),T()};let w=0,E=Promise.resolve();const k=()=>{w=0,$()},$=()=>{if(!w){w=setTimeout(k,250);for(const[t,r]of e){const e=`script[type="${t}-editor"]`;for(const n of document.querySelectorAll(e))n.type+="-active",E=E.then((()=>b(n,t,r)))}return E}};new MutationObserver($).observe(document,{childList:!0,subtree:!0});var A=$();export{A as default};
//# sourceMappingURL=py-editor-0ke7PlQx.js.map