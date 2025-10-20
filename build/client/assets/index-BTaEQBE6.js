(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();const v=[{name:"Välj Material..",ratio:{a:0,b:0},potlife:{10:90,16:60,25:35,32:17}},{name:"855",ratio:{a:6.8,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"858",ratio:{a:4,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"MX1",ratio:{a:3.3,b:1,c:22.6},potlife:{10:90,16:60,25:35,32:17}},{name:"MXP",ratio:{a:4.8,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"BX1",ratio:{a:2.3,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"BX2",ratio:{a:4,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S1HB",ratio:{a:2.6,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"CS2",ratio:{a:4,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"CS4",ratio:{a:2.3,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S2/KIWA",ratio:{a:2.3,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S5",ratio:{a:16.8,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S7",ratio:{a:100,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"NVE-PRIMER",ratio:{a:45,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"NVE",ratio:{a:47,b:1},potlife:{10:90,16:60,25:35,32:17}}];async function g(){const e=document.getElementById("projectHistory").value,r=document.getElementById("historyList");try{const d=await(await fetch(`/api/projects/${e}/history`)).json();r.innerHTML="";for(const t of d)r.innerHTML+=`
    <div class="row" id="listDisplay">
    <div><strong>Projekt:</strong> ${t.projectNumber??"-"}</div>
    <div><strong>Datum:</strong> ${t.createdAt?new Date(t.createdAt).toLocaleString():""}</div>
    <div><strong>Material:</strong> ${t.material??""}</div>
    <div><strong>Part A:</strong> ${t.partA??""}</div>
    <div><strong>Part B:</strong> ${t.partB??""}</div>
    <div><strong>Part C:</strong> ${t.partC??""}</div>
    <div><strong>Temp:</strong> ${t.temperature??""}</div>
    <div><strong>Kommentar:</strong> ${t.comment??""}</div>
    </div>
    `}catch{console.log("err0r")}}async function u(){document.querySelector("#app").innerHTML=`
<div class="container">
    <h1>KOMPOSITKUNGEN</h1>
        <button id="switchBack" type="button">Tillbaka</button>
          <form id="displayProject" class="section">
          <div class="row">
          <label for="projectHistory">Ange projektnummer</label>
          <input type="number" id="projectHistory" placeholder="tex 18922"/>
        <button type="submit" id="getProjectHistory">Hämta</button>
</div>
<section class="history-section">
  <div id="historyList"></div>
</section>
  </div>
`;const e=document.getElementById("switchBack");e&&e.addEventListener("click",()=>m());try{const n=await(await fetch("/api/history")).json(),o=document.getElementById("historyList");if(!n.length){o.innerHTML="Ingen historik ännu.";return}o.innerHTML="";for(const a of n)o.innerHTML+=`
    <div class="row" id="listDisplay">
    <div><strong>Projekt:</strong> ${a.projectNumber??"-"}</div>
    <div><strong>Datum:</strong> ${a.createdAt?new Date(a.createdAt).toLocaleString():""}</div>
    <div><strong>Material:</strong> ${a.material??""}</div>
    <div><strong>Part A:</strong> ${a.partA??""}</div>
    <div><strong>Part B:</strong> ${a.partB??""}</div>
    <div><strong>Part C:</strong> ${a.partC??""}</div>
    <div><strong>Temp:</strong> ${a.temperature??""}</div>
    <div><strong>Kommentar:</strong> ${a.comment??""}</div>
    <button type="button" data-id="${a._id}" class="delete-btn">Radera</button>
    <button type="button" data-id="${a._id}" class="edit-btn">Ändra</button>
    </div>
    `}catch{document.getElementById("historyList").innerHTML="<p>Kunde inte hämta historik.</p>"}document.getElementById("getProjectHistory").addEventListener("click",async t=>{t.preventDefault(),g()}),document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.id;if(!n)return;const o=await fetch(`/api/history/${n}`);if(!o.ok){console.error("Kunde inte hämta posten");return}const a=await o.json();m(a)})}),document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",async()=>{const n=t.dataset.id;if(!n)return;if(!(await fetch(`/api/history/${n}`,{method:"DELETE"})).ok){console.error("Kunde inte radera posten");return}u()})})}function p(){const e=document.getElementById("material");if(!e)throw new Error("#Material finns inte att hitta");return v.find(r=>r.name===e.value)}function b(){const e=document.getElementById("amountA"),r=document.getElementById("amountB"),i=document.getElementById("amountC"),d=document.getElementById("material");if(!e||!r||!i||!d)return;function t(){const o=p(),a=o?.ratio?.a,l=o?.ratio?.b,c=o?.ratio?.c;if(!a||e.value===""){r.value="",i.value="";return}const s=Number(e.value)/a;r.value=String(Math.round(s*l)),i.value=c==null?"":String(Math.round(s*c))}function n(){const o=p(),a=o?.ratio?.a,l=o?.ratio?.b,c=o?.ratio?.c;if(!l||r.value===""){e.value="",i.value="";return}const s=Number(r.value)/l;e.value=String(Math.round(s*a)),i.value=c==null?"":String(Math.round(s*c))}e.addEventListener("input",t),r.addEventListener("input",n),d.addEventListener("change",()=>{e.value!==""?t():r.value!==""&&n()})}async function f(){let e={projectNumber:Number(document.getElementById("project").value),material:document.getElementById("material").value,temperature:Number(document.getElementById("temperature").value),comment:document.getElementById("comment").value,partA:document.getElementById("amountA").value,partB:document.getElementById("amountB").value,partC:document.getElementById("amountC").value};console.log(e),console.log("då");const r=await fetch("/api/form",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});console.log(r)}function m(e){document.querySelector("#app").innerHTML=`
    <div class="container">
      <h1>KOMPOSITKUNGEN</h1>

      <button id="switch" type="button">Historik</button>
      <form id="mix-form" class="section" action="#" method="#">
        <div class="row">

          <input type="hidden" id="docId" />
          <label for="material">Material</label>
          <select id="material" name="material" required>
          </select>

          <label for="project">Project nummer</label>
          <input type="text" id="project" name="project" placeholder="Project nummer" />
        </div>
        <div class="row">
          <label for="amountA">A-del</label>
          <input id="amountA" name="amountA" type="number" placeholder="A" />

          <label for="amountB">B-del</label>
          <input id="amountB" name="amountB" type="number" placeholder="B" />

          <label for="amountC">C-del</label>
          <input id="amountC" name="amountC" type="number" placeholder="C" />
          </div>
        <div class="row">
          <label for="temperature">Temperatur</label>
          <input type="number" id="temperature" name="temperature" placeholder="Ange i celcius" />
        </div>
        <div class="row">
          <label for="comment">Kommentar</label>
          <input type="text" id="comment" name="comment" placeholder="Kommentar" />
        </div>
        <div class="row">
          <button type="submit" id="calculate">Submit</button>
        </div>
      </form>

      <section class="timer-section">
        <h2 id="timer-heading">Timer</h2>

        <div class="row">
          <label for="potlife">Brinn tid (minuter)</label>
          <input id="potlife" name="potlife" type="number" inputmode="numeric" placeholder="t.ex. 45" />

          <div class="timer-display">00:00</div>
          <div>Tid kvar: 40:00</div>
          <div>Använd tid: 20:00</div>
        </div>

        <div class="progress">
          <div class="bar" id="timer-bar" style="width: 33%"></div>
        </div>

        <div class="buttons">
          <button id="start-timer" class="primary" type="button">Starta</button>
          <button id="pause-timer" class="secondary" type="button">Pausa</button>
          <button id="reset-timer" class="secondary" type="button">Nollställ</button>
        </div>
      </section>
      </div>
    `,document.getElementById("switch").addEventListener("click",()=>{u()});const i=document.getElementById("material");i.innerHTML="",v.forEach(t=>{const n=document.createElement("option");n.textContent=t.name,n.value=t.name,i.appendChild(n)}),b(),e&&(document.getElementById("docId").value=e._id??"",document.getElementById("project").value=e.projectNumber??"",document.getElementById("material").value=e.material??"",document.getElementById("amountA").value=e.partA??"",document.getElementById("amountB").value=e.partB??"",document.getElementById("amountC").value=e.partC??"",document.getElementById("temperature").value=e.temperature??"",document.getElementById("comment").value=e.comment??"",document.getElementById("calculate").textContent="Uppdatera"),document.getElementById("mix-form").addEventListener("submit",async t=>{t.preventDefault();const n={projectNumber:Number(document.getElementById("project").value),material:document.getElementById("material").value,partA:document.getElementById("amountA").value,partB:document.getElementById("amountB").value,partC:document.getElementById("amountC").value,temperature:document.getElementById("temperature").value,comment:document.getElementById("comment").value},o=document.getElementById("docId").value;try{o?(await fetch(`/api/history/${encodeURIComponent(o)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).ok&&u():(f(),m())}catch(a){console.error(a,"Kunde inte uppdatera")}})}m();
