import '../style.css';
import { renderHome } from '../src/main.ts';

export function renderHistory() {
    document.querySelector('#app')!.innerHTML = `
<div class="container">
    <h1>KOMPOSITKUNGEN</h1>
        <button id="switchBack" type="button">Tillbaka</button>
        <form id="displayProject" class="section" action="#" method="#">
    
        <div class="row">

        <label for="projectHistory">Ange projektnummer</label>

        <input type="number" id="projecthistory" placeholder="tex 18922"/>
        <button type="submit" id="getProjectHistory">Hämta</button>
</div>

<section class="history-section">
    <div class="projectCard" id="projectData"></div>

    <div class="label" id="displayProjectnumber></divrrr>

    <div class="label" id=""display></div>

    <div class="label"></div>

    <div class="label"></div>

</section>

</div>

`;

    const switchButton = document.getElementById("switchBack") as HTMLButtonElement;
    if (switchButton) {
        switchButton.addEventListener('click', () => renderHome());
    }
}