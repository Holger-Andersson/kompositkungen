import { test, expect } from "vitest";
import { validateMixFormData } from "../../src/backend/validate.ts"

test("validates that inputs are the expected number or string", () => {
    expect(
        validateMixFormData({
            projectNumber: 23,
            partA: 21,
            partB: 1234,
            temperature: 35,
            comment: "asd",
            material: "asd1"
        })
    ).toBe(true);
});

test("returns false for invalid types or temp is > 50", () => {
    expect(
        validateMixFormData({
            projectNumber: "hej",
            partA: "på",
            partB: "dig",
            temperature: 55,
            comment: 13,
            material: 37
        } as any)
    ).toBe(false);
});