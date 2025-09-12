import { getSelectedMaterial } from "./getmaterials";


export function calculateMix() {

  const mat = getSelectedMaterial();
  const amountInput = document.getElementById("amountA") as HTMLInputElement;
  const partA = Number(amountInput.value);

  const resultB = Math.round(partA * (mat.ratio.b / mat.ratio.a));

  if (mat.ratio.c == null) {
    return { resultB, resultC: null };
  } else {
    const resultC = Math.round(partA * (mat.ratio.c / mat.ratio.a));
    return { resultB, resultC, resultA: partA };
  };
}
export function getInputCalc() {
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

    if (!ratioA || a.value === "") { b.value = ""; c.value = ""; return; }

    const A = Number(a.value);
    const k = A / ratioA;
    b.value = String(Math.round(k * ratioB));
    c.value = ratioC == null ? "" : String(Math.round(k * ratioC));

  }
  function fromB() {
    const mat = getSelectedMaterial();
    const ratioA = mat?.ratio?.a;
    const ratioC = mat?.ratio?.c;
    if (!ratioA || b.value === "") { a.value = ""; c.value = ""; return; }

    const B = Number(b.value);
    a.value = String(Math.round(B * ratioA));
    c.value = ratioC == null ? "" : String(Math.round(B * ratioC));
  }

  a.addEventListener("input", calcWithA);
  b.addEventListener("input", fromB);
  selectMat.addEventListener("change", () => {
    if (a.value !== "") calcWithA();
    else if (b.value !== "") fromB();
  });
};