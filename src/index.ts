import { Mats } from './domain/materials.ts';
import { renderHistory } from './history.ts'
import { getInputCalc } from './services/calcmix.ts'
import { saveData } from './services/savemix.ts'
// import { getPotlifeMinutes } from './services/getpotlife.ts'

export function renderHome() {
  document.querySelector('#app')!.innerHTML = `
    <div class="container">
      <h1>KOMPOSITKUNGEN</h1>

      <button id="switch" type="button">Historik</button>
      <form id="mix-form" class="section" action="#" method="#">
        <div class="row">

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

  Mats.forEach(mat => {
    const option = document.createElement("option");
    option.textContent = mat.name;
    selectElement.appendChild(option);
  });
  getInputCalc();

  // funktion som tar befintlig input och sparar det till databas.
  const submitButton = document.getElementById("calculate") as HTMLButtonElement;
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    saveData();
    console.log("hej")
  });
}
  renderHome();
  console.log("allo")
