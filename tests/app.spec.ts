import { test, expect } from '@playwright/test'

test("has title", async ({page}) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle(/KOMPOSITKUNGEN/);

});

test("can calculate mix", async ({page}) => {
    await page.goto('http://localhost:3000');

    await page.getByRole("combobox", {name: 'Material' }).selectOption('858')

    await page.getByPlaceholder("Project nummer").fill('1231');

    await page.getByRole("spinbutton", {name: 'A-del'}).fill('100');

    await expect(page.getByPlaceholder("B")).toHaveValue('25');

    await expect(page.getByRole('spinbutton', { name: 'C-del' })).toHaveValue('');

    await page.getByRole('button', {name: 'Submit'}).click();

})

test("can calculate mix 3part", async ({page}) => {
    await page.goto('http://localhost:3000');

    await page.getByRole("combobox", {name: 'Material' }).selectOption('MX1')

    await page.getByPlaceholder("Project nummer").fill('888');

    await page.getByRole("spinbutton", {name: 'B-del'}).fill('100');

    await expect(page.getByRole("spinbutton", {name: 'A-del'})).toHaveValue('330');

    await expect(page.getByRole('spinbutton', { name: 'C-del' })).toHaveValue('2260');

})

test("has history button", async ({page}) => {
    await page.goto('http://localhost:3000');

    await page.getByRole('button', { name: 'Historik'}).click();

    await page.getByPlaceholder("tex 18922").fill('1231');

    await page.click('text=Hämta');

    await expect(page.locator("#output")).toContainText(/"projectNumber":\s*1231/);
});

