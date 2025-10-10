export async function getData() {

  const pn = (document.getElementById("projectHistory") as HTMLInputElement).value;
   const displayData = document.getElementById("output")!;
   try {
    const res = await fetch(`http://localhost:3000/api/projects/${pn}`);
    const data = await res.json();

    console.log(data);
   displayData.textContent = JSON.stringify(data, null, 2);
   } catch {
    console.log("err0r");
   }

};