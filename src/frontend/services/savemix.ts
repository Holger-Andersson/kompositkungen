export async function saveData() {

  let project = {
    projectNumber: Number((document.getElementById("project") as HTMLInputElement).value),
    material: (document.getElementById("material") as HTMLSelectElement).value,
    temperature: Number((document.getElementById("temperature") as HTMLInputElement).value),
    comment: (document.getElementById("comment") as HTMLInputElement).value,
    partA: Number((document.getElementById("amountA") as HTMLInputElement).value),
    partB: Number((document.getElementById("amountB") as HTMLInputElement).value),
    partC: Number((document.getElementById("amountC") as HTMLInputElement).value),
  }

  try {
    const res = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    });
    if (res.ok) {
      return true;

    } else {
      const data = await res.json();
      alert(`${data.error}`);
      return false;
    }
  } catch (error) {
    console.error(error, "Kunde inte spara")
  }

};