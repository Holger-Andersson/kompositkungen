import type { MixFormData } from "../frontend/data/materials.interface.ts";

// validation function for MixFormDatad
export function validateMixFormData(formData: MixFormData) {
    const projectNumber = formData.projectNumber;
    const material = formData.material;
    const partA = formData.partA;
    const partB = formData.partB;
    const temperature = formData.temperature;
    const comment = formData.comment;

    // we validate if project number, partA, partB, temperature are numbers > 0
    // and if material has > 0 characters, and material and comment is a string. 
    if (typeof projectNumber === "number" ||
        typeof partA === "number" ||
        typeof partB === "number" ||
        typeof temperature === "number") {
        if (projectNumber > 0 &&
            partA > 0 &&
            partB > 0 &&
            temperature > 0 && temperature <= 50) {
            if (typeof material === "string" || typeof comment === "string") {
                if (material.length > 0) {
                    return true;
                }
            }
        }
    }
    // return false if validation fails
    return false;
    
}