import { materials } from '../data/materials.data.ts';

// Hämtar materialdata från aktivt material val i dropdown.

export function getSelectedMaterial() {
  const selectElement = document.getElementById('material') as HTMLSelectElement;
  if (!selectElement) {
    throw new Error('Materialet hittades inte');
  }
  return materials.find(mat => mat.name === selectElement.value)!;
}