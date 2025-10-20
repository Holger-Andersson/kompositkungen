import "./style.css";
import { materials } from './data/materials.data.ts';
import { renderHistory } from './pages/history.ts'
import { MixRatioInputs } from './services/calculate-mix.ts'
import { saveData } from './services/savemix.ts'
// import { getPotlifeMinutes } from './services/getpotlife.ts'

export function renderHome(prefill?: any) {
  document.querySelector('#app')!.innerHTML = `
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
    `;

  // Button som kör renderpage för att visa historiksida.
  const switchButton = document.getElementById("switch") as HTMLButtonElement;
  switchButton.addEventListener('click', () => {
    renderHistory();
  });

  // funktion som hämtar material från material.ts till roll-listan.
  const selectElement = document.getElementById("material") as HTMLSelectElement;
  selectElement.innerHTML = "";

  materials.forEach(mat => {
    const option = document.createElement("option");
    option.textContent = mat.name;
    option.value = mat.name;
    selectElement.appendChild(option);
  });
  MixRatioInputs();

  if (prefill) {
    (document.getElementById("docId") as HTMLInputElement).value = prefill._id ?? "";
    (document.getElementById("project") as HTMLInputElement).value = prefill.projectNumber ?? "";
    (document.getElementById("material") as HTMLSelectElement).value = prefill.material ?? "";
    (document.getElementById("amountA") as HTMLInputElement).value = prefill.partA ?? "";
    (document.getElementById("amountB") as HTMLInputElement).value = prefill.partB ?? "";
    (document.getElementById("amountC") as HTMLInputElement).value = prefill.partC ?? "";
    (document.getElementById("temperature") as HTMLInputElement).value = prefill.temperature ?? "";
    (document.getElementById("comment") as HTMLInputElement).value = prefill.comment ?? "";
    (document.getElementById("calculate") as HTMLButtonElement).textContent = "Uppdatera";
  }

  const updateForm = document.getElementById("mix-form") as HTMLFormElement;
  updateForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const body = {
      projectNumber: Number((document.getElementById("project") as HTMLInputElement).value),
      material: (document.getElementById("material") as HTMLSelectElement).value,
      partA: (document.getElementById("amountA") as HTMLInputElement).value,
      partB: (document.getElementById("amountB") as HTMLInputElement).value,
      partC: (document.getElementById("amountC") as HTMLInputElement).value,
      temperature: (document.getElementById("temperature") as HTMLInputElement).value,
      comment: (document.getElementById("comment") as HTMLInputElement).value,
    };
    const id = (document.getElementById("docId") as HTMLInputElement).value;

    try {
      if (id) {
        const res = await fetch(`/api/history/${encodeURIComponent(id)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          renderHistory();
        }
      } else {
        saveData();
        renderHome();
      }
    } catch (error) {
      console.error(error, "Kunde inte uppdatera");
    }
  });

}
renderHome();
