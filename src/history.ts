import '../style.css';
import { renderHome } from '../src/main.ts';
import { getData } from '../src/services/gethistory.ts';

export function renderHistory() {
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
<div id="output"></div>

</section>

</div>

`;
 // knapp för att renderera tillbaka till index sidan.
    const switchButton = document.getElementById("switchBack") as HTMLButtonElement;
    if (switchButton) {
        switchButton.addEventListener('click', () => renderHome());
    }

    const historyButton = document.getElementById("getProjectHistory") as HTMLButtonElement;
    historyButton.addEventListener('click', async (event) => {
        event.preventDefault();
        getData();
    });
}