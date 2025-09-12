import { getSelectedMaterial } from "./getmaterials";


export function calculateMix() {

  const mat = getSelectedMaterial();
  const amountInput = document.getElementById("amountA") as HTMLInputElement;
  const partA = Number(amountInput.value);
  const resultB = Math.round(partA * (mat.ratio.b / mat.ratio.a));

  if (mat.ratio.c === null) {
    return { resultB, resultC: null };
  } else {
    const resultC = Math.round(partA * (mat.ratio.c! / mat.ratio.a));
    return { resultB, resultC, resultA: partA };
  };

}
export function getInputCalc(){
const a = document.getElementById("amountA") as HTMLInputElement | null;
const b = document.getElementById("amountB") as HTMLInputElement | null;
const c = document.getElementById("amountC") as HTMLInputElement | null;

if (!a || !b || !c) return;

let updating = false;

function copy(from: HTMLInputElement, to1: HTMLInputElement, to2: HTMLInputElement) {
  if (updating) return;
  updating = true;
  to1.value = from.value;
  to2.value = from.value;
  updating = false;
}

a.addEventListener("input", () => copy(a, b, c));
b.addEventListener("input", () => copy(b , a, c));
c.addEventListener("input", () => copy(c, a, b));
}