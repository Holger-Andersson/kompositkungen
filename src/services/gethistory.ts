export async function getData() {

  const pn = (document.getElementById("projectHistory") as HTMLInputElement).value;
  const list = document.getElementById("historyList") as HTMLDivElement;

  try {
    const res = await fetch(`/api/projects/${pn}/history`);
    const data = await res.json();

    list.innerHTML = "";
    for (const item of data) {
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
    </div>
    `
    }
  } catch {
    console.log("err0r");
  }

};