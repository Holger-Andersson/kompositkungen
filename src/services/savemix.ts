export async function saveData() {

  let project = {
    projectNumber: Number((document.getElementById("project") as HTMLInputElement).value),
    material: (document.getElementById("material") as HTMLSelectElement).value,
    temperature: Number((document.getElementById("temperature") as HTMLInputElement).value),
    comment: (document.getElementById("comment") as HTMLInputElement).value,
    partA: (document.getElementById("amountA") as HTMLInputElement).value,
    partB: (document.getElementById("amountB") as HTMLInputElement).value,
    partC: (document.getElementById("amountC") as HTMLInputElement).value,
  }
  console.log(project);
  console.log("då");

  const result = await fetch("http://localhost:3000/form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(project)

  });
  console.log(result);
};