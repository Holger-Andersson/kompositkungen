(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function d(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const v=[{name:"Välj Material..",ratio:{a:0,b:0},potlife:{10:90,16:60,25:35,32:17}},{name:"855",ratio:{a:6.8,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"858",ratio:{a:4,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"791",ratio:{a:1.11,b:.51,c:16.3},potlife:{10:90,16:60,25:35,32:17}},{name:"797",ratio:{a:2,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"MX1",ratio:{a:3.3,b:1,c:22.6},potlife:{10:90,16:60,25:35,32:17}},{name:"MXP",ratio:{a:4.8,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"BX1",ratio:{a:2.3,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"BX2",ratio:{a:4,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S1HB",ratio:{a:2.6,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"CS2",ratio:{a:4,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"CS4",ratio:{a:2.3,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S2/KIWA",ratio:{a:2.3,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S5",ratio:{a:16.8,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"S7",ratio:{a:100,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"NVE-PRIMER",ratio:{a:45,b:1},potlife:{10:90,16:60,25:35,32:17}},{name:"NVE",ratio:{a:47,b:1},potlife:{10:90,16:60,25:35,32:17}}];async function b(){const n=document.getElementById("projectHistory").value,r=document.getElementById("historyList");try{const d=await(await fetch(`/api/projects/${n}/history`)).json();r.innerHTML="";for(const t of d)r.innerHTML+=`
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
`;const n=document.getElementById("switchBack");n&&n.addEventListener("click",()=>m());try{const e=await(await fetch("/api/history")).json(),a=document.getElementById("historyList");if(!e.length){a.innerHTML="Ingen historik ännu.";return}a.innerHTML="";for(const o of e)a.innerHTML+=`
    <div class="row" id="listDisplay">
    <div><strong>Projekt:</strong> ${o.projectNumber??"-"}</div>
    <div><strong>Datum:</strong> ${o.createdAt?new Date(o.createdAt).toLocaleString():""}</div>
    <div><strong>Material:</strong> ${o.material??""}</div>
    <div><strong>Part A:</strong> ${o.partA??""}</div>
    <div><strong>Part B:</strong> ${o.partB??""}</div>
    <div><strong>Part C:</strong> ${o.partC??""}</div>
    <div><strong>Temp:</strong> ${o.temperature??""}</div>
    <div><strong>Kommentar:</strong> ${o.comment??""}</div>
    <button type="button" data-id="${o._id}" class="delete-btn">Radera</button>
    <button type="button" data-id="${o._id}" class="edit-btn">Ändra</button>
    </div>
    `}catch{document.getElementById("historyList").innerHTML="<p>Kunde inte hämta historik.</p>"}document.getElementById("getProjectHistory").addEventListener("click",async t=>{t.preventDefault(),b()}),document.querySelectorAll(".edit-btn").forEach(t=>{t.addEventListener("click",async()=>{const e=t.dataset.id;if(!e)return;const a=await fetch(`/api/history/${e}`);if(!a.ok){console.error("Kunde inte hämta posten");return}const o=await a.json();m(o)})}),document.querySelectorAll(".delete-btn").forEach(t=>{t.addEventListener("click",async()=>{const e=t.dataset.id;if(!e)return;if(!(await fetch(`/api/history/${e}`,{method:"DELETE"})).ok){console.error("Kunde inte radera posten");return}u()})})}function p(){const n=document.getElementById("material");if(!n)throw new Error("Materialet hittades inte");return v.find(r=>r.name===n.value)}function g(){const n=document.getElementById("amountA"),r=document.getElementById("amountB"),i=document.getElementById("amountC"),d=document.getElementById("material");if(!n||!r||!i||!d)return;function t(){const a=p(),o=a?.ratio?.a,c=a?.ratio?.b,s=a?.ratio?.c;if(!o||n.value===""){r.value="",i.value="";return}const l=Number(n.value)/o;r.value=String(Math.round(l*c)),i.value=s==null?"":String(Math.round(l*s))}function e(){const a=p(),o=a?.ratio?.a,c=a?.ratio?.b,s=a?.ratio?.c;if(!c||r.value===""){n.value="",i.value="";return}const l=Number(r.value)/c;n.value=String(Math.round(l*o)),i.value=s==null?"":String(Math.round(l*s))}n.addEventListener("input",t),r.addEventListener("input",e),d.addEventListener("change",()=>{n.value!==""?t():r.value!==""&&e()})}async function f(){let n={projectNumber:Number(document.getElementById("project").value),material:document.getElementById("material").value,temperature:Number(document.getElementById("temperature").value),comment:document.getElementById("comment").value,partA:Number(document.getElementById("amountA").value),partB:Number(document.getElementById("amountB").value),partC:Number(document.getElementById("amountC").value)};try{const r=await fetch("/api/form",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(r.ok)return!0;{const i=await r.json();return alert(`${i.error}`),!1}}catch(r){console.error(r,"Kunde inte spara")}}function m(n){document.querySelector("#app").innerHTML=`
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
    `,document.getElementById("switch").addEventListener("click",()=>{u()});const i=document.getElementById("material");i.innerHTML="",v.forEach(t=>{const e=document.createElement("option");e.textContent=t.name,e.value=t.name,i.appendChild(e)}),g(),n&&(document.getElementById("docId").value=n._id??"",document.getElementById("project").value=n.projectNumber??"",document.getElementById("material").value=n.material??"",document.getElementById("amountA").value=n.partA??"",document.getElementById("amountB").value=n.partB??"",document.getElementById("amountC").value=n.partC??"",document.getElementById("temperature").value=n.temperature??"",document.getElementById("comment").value=n.comment??"",document.getElementById("calculate").textContent="Uppdatera"),document.getElementById("mix-form").addEventListener("submit",async t=>{t.preventDefault();const e={projectNumber:Number(document.getElementById("project").value),material:document.getElementById("material").value,partA:Number(document.getElementById("amountA").value),partB:Number(document.getElementById("amountB").value),partC:Number(document.getElementById("amountC").value),temperature:Number(document.getElementById("temperature").value),comment:document.getElementById("comment").value},a=document.getElementById("docId").value;try{if(a){const o=await fetch(`/api/history/${encodeURIComponent(a)}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!o.ok){const c=await o.json();alert(`${c.error}`);return}u();return}else await f()&&m()}catch(o){console.error(o,"Kunde inte uppdatera")}})}m();
