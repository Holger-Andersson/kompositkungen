import '../style.css';
import { renderHome } from '../src/main.ts';

export function renderHistory() {
    document.querySelector('#app')!.innerHTML = `
<div class="container">
    <h1>KOMPOSITKUNGEN</h1>
        <h2>Historik</h2>
        <button id="switchBack" type="button">Tillbaka</button>
        <form id="displayProject" class="section" action="#" method="get">
    
        <div class="row">

        <label for="projectNumber">Ange projektnummer</label>

        <input type="number" id="projectNumber" placeholder="tex 18922"/>
        <button type="button" id="getProjectNumber">Hämta</button>
        

</div>
</form>
<section class="history-section">
    <div class="projectCard" id="projectData"></div>

    <div class="label" id="displayProjectNumber"></div>

    <div class="label" id="display"></div>

    <div id="output"></div>


</section>

</div>

`;


    const switchButton = document.getElementById("switchBack") as HTMLButtonElement;
    if (switchButton) {
        switchButton.addEventListener('click', () => renderHome());
    }

    const historyButton = document.getElementById("getProjectNumber") as HTMLButtonElement;
    historyButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const pn = (document.getElementById("projectNumber") as HTMLInputElement).value;
        const displayData = document.getElementById("output")!;
        try {
            const res = await fetch(`http://localhost:1337/dummy/${pn}`);
            const data = await res.json();

            let list = "<ul>";
            for (const [key, value] of Object.entries(data)) {
                list += `<li><strong>${key}:</strong>${value}</li>`;
            }
            list += `</ul>`
            displayData.innerHTML = list;
        } catch (err: any) {
            displayData.textContent = `ERR0Rr`;
        };

    });
}
