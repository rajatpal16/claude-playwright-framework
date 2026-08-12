import {test, expect } from '@playwright/test';
test('Mocked log in response', async ({ page }) => {
    await page.route('**/api.demoblaze.com/login', async (route) => {
        console.log('INTERCEPTED THE LOGIN REQUEST');
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ errorMessage: 'Wrong password.' })
        });
    });

    await page.goto('https://www.demoblaze.com/');
    await page.getByRole('link', { name: "Log in" }).click();
    await page.locator('#loginusername').fill('test');
    await page.locator('#loginpassword').fill('test123');

    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Log in' }).click();

    const dialog = await dialogPromise;
    console.log('Alert text:', dialog.message());
    expect(dialog.message()).toContain('Wrong password.');
    await dialog.accept();

    console.log('Mocked execution completed');
});