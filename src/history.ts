import { renderHome } from './index.ts';
import { getData } from '../src/services/gethistory.ts';

export async function renderHistory() {
  document.querySelector('#app')!.innerHTML = `
<div class="container">
    <h1>KOMPOSITKUNGEN</h1>
        <button id="switchBack" type="button">Tillbaka</button>
        <form id="displayProject" class="section" action="#" method="#">
    
        <div class="row">

        <label for="projectHistory">Ange projektnummer</label>

        <input type="number" id="projectHistory" placeholder="tex 18922"/>
        <button type="submit" id="getProjectHistory">Hämta</button>
</div>

<section class="history-section">
  <div id="historyList"></div>
</section>

</div>
`;
  // knapp för att renderera tillbaka till index sidan.
  const switchButton = document.getElementById("switchBack") as HTMLButtonElement;
  if (switchButton) {
    switchButton.addEventListener('click', () => renderHome());

  }

  try {
    const res = await fetch("/api/history");
    const items = await res.json();
    const list = document.getElementById("historyList") as HTMLDivElement;
    if (!items.length) {
      list.innerHTML = "Ingen historik ännu.";
      return;
    }

    list.innerHTML = "";
    for (const item of items) {
      list.innerHTML += `
    <div class="row" id="listDisplay">
    <div><strong>Projekt:</strong> ${item.projectNumber ?? '-'}</div>
    <div><strong>Datum:</strong> ${item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</div>
    <div><strong>Material:</strong> ${item.material ?? ''}</div>
    <div><strong>Part A:</strong> ${item.partA ?? ''}</div>
    <div><strong>Part B:</strong> ${item.partB ?? ''}</div>
    <div><strong>Part C:</strong> ${item.partC ?? ''}</div>
    <div><strong>Temp:</strong> ${item.temperature ?? ''}</div>
    <div><strong>Kommentar:</strong> ${item.comment ?? ''}</div>
    <button type="button" data-id="${item._id}" class="delete-btn">Radera</button>
    </div>
    `
    }

  } catch {
    document.getElementById("historyList")!.innerHTML = "<p>Kunde inte hämta historik.</p>";
  }

  const historyButton = document.getElementById("getProjectHistory") as HTMLButtonElement;
  historyButton.addEventListener('click', async (event) => {
    event.preventDefault();
    getData();
  });

  document.getElementById("historyList")!.addEventListener("click", async (event) => {
    const deleteButton = (event.target as HTMLElement).closest<HTMLButtonElement>(".delete-btn");
    const id = deleteButton.dataset.id;

    const res = await fetch(`/api/history/${id}`, { method: 'DELETE' });
    if (res.ok) {
      renderHistory();
    };
  });
}
