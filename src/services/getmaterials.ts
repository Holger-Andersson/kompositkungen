import { Mats } from '../domain/materials.ts';

// Hämtar materialdata från aktivt material val i dropdown.

export function getSelectedMaterial() {
  const selectElement = document.getElementById('material') as HTMLSelectElement;
  if (!selectElement) {
    throw new Error('#Material finns inte att hitta');
  }
  return Mats.find(mat => mat.name === selectElement.value)!;
}