import { getSelectedMaterial } from "./getmaterials";


export function calculateMix() {

  const mat = getSelectedMaterial();
  const amountInput = document.getElementById("amountA") as HTMLInputElement;
  const amountValue = Number(amountInput.value);
  const resultB = Math.round(amountValue * (mat.ratio.b / mat.ratio.a));

  if (mat.ratio.c === null) {
    return { resultB, resultC: null };;
  } else {
    const resultC = Math.round(amountValue * (mat.ratio.c / mat.ratio.a));
    return { resultB, resultC, amountValue };
  };

}
