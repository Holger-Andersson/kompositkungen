import { getSelectedMaterial } from "./getmaterials";

// Körs vid förändring i inputs. kalkylerar blandningsförhållandet på valt material.
// Uppdaterar övriga blandningsinputs med nytt värde kontinuerligt.
export function MixRatioInputs() {
  const a = document.getElementById("amountA") as HTMLInputElement | null;
  const b = document.getElementById("amountB") as HTMLInputElement | null;
  const c = document.getElementById("amountC") as HTMLInputElement | null;
  const selectMat = document.getElementById("material") as HTMLSelectElement | null;

  if (!a || !b || !c || !selectMat) return;

  function calcWithA() {
    const mat = getSelectedMaterial();
    const ratioA = mat?.ratio?.a;
    const ratioB = mat?.ratio?.b;
    const ratioC = mat?.ratio?.c;

    if (!ratioA || a!.value === "") {
      b!.value = "";
      c!.value = "";
      return;
    }

    const A = Number(a!.value);
    const k = A / ratioA;
    b!.value = String(Math.round(k * ratioB));
    c!.value = ratioC == null ? "" : String(Math.round(k * ratioC));

  }
  function calcWithB() {
    const mat = getSelectedMaterial();
    const ratioA = mat?.ratio?.a;
    const ratioB = mat?.ratio?.b;
    const ratioC = mat?.ratio?.c;

    if (!ratioB || b!.value === "") {
      a!.value = "";
      c!.value = "";
      return;
    }

    const B = Number(b!.value);
    const k = B / ratioB;
    a!.value = String(Math.round(k * ratioA));
    c!.value = ratioC == null ? "" : String(Math.round(k * ratioC));
  }

  a.addEventListener("input", calcWithA);
  b.addEventListener("input", calcWithB);
  selectMat.addEventListener("change", () => {
    if (a.value !== "") calcWithA();
    else if (b.value !== "") calcWithB();
  });
};