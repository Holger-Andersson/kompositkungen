import { Mats } from '../domain/materials.ts';
import { selectElement } from '../main.ts';

export function getSelectedMaterial() {
  const selectedMaterial = (Mats.find(mat => mat.name === selectElement.value));
  return selectedMaterial!;
  };