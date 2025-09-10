import '../style.css';
import { renderHome } from '../src/main.ts';

export function renderHistory() {
    document.querySelector('#app')!.innerHTML = `
<div class="container">
    <h1>KOMPOSITKUNGEN</h1>
        <h2>Historik</h2>
        <button id="switchBack" type="button">Tillbaka</button>
        <form id="displayProject" class="section" action="#" method="#">
    
        <div class="row">

        <label for="projectHistory">Ange projektnummer</label>

        <input type="number" id="projectNumber" placeholder="tex 18922"/>
        <button type="button" id="getProjectNumber">Hämta</button>

</div>

<section class="history-section">
    <div class="projectCard" id="projectData"></div>

    <div class="label" id="displayProjectnumber></div>

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
  
    const historyButton = document.getElementById("getProjectNumber") as HTMLButtonElement;
    historyButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const projectNumberInput = document.getElementById("projectNumber") as HTMLInputElement;
        const pn = Number(projectNumberInput.value);
        try {
            const data = await fetchByProjectNumber(pn);
            if (!data) {
                console.log("Inget projekt hittades");
                return;
            } 
            console.log("Project:", data);
        } catch (err) {
            console.error(err);
            console.log("Kunde inte hämta projekt");
        }
        

    });

async function fetchByProjectNumber(projectNumber: number) {
  const res = await fetch(`http://localhost:1337/dummy/${projectNumber}`);
  return await res.json();
}

}
