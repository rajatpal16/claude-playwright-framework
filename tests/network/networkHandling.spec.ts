import {test, expect } from '@playwright/test';
test ('Wait for login API response on demoBlaze', async({page}) => {
    await page.goto('https://www.demoblaze.com/');
    await page.getByRole('link',{name:"Log in"}).click();
    const responsePromise = page.waitForResponse(
        response => response.url().includes('api.demoblaze.com/login'));

    await page.locator('#loginusername').fill('test');
    await page.locator('#loginpassword').fill('test123');
    await page.getByRole('button',{name:'Log in'}).click();
    const response = await responsePromise;
    expect (response.status()).toBe(200);
    const body = await response.json();
    console.log('body:', body);
    expect(body.errorMessage).toBe('Wrong password.');


})

test ('Mocked log in response', async ({page}) => {
    await page.route('**/api.demoblaze.com/login', async(route) =>{
        console.log('INTERCEPTED THE LOGIN REQUEST'); 
        await route.fulfill({
            status : 200,
            contentType : 'application/json',
            body: JSON.stringify({ errorMessage: 'Wrong password.'})
        })
    } )
    //demoblaze displaying errror message by alert popup
    page.on('dialog', async (dialog) =>{
        console.log('Alert text:', dialog.message());
        expect (dialog.message()).toContain('Wrong password.');
        await dialog.accept();
    })
    //
    await page.goto('https://www.demoblaze.com/');
    await page.getByRole('link',{name:"Log in"}).click();
    await page.locator('#loginusername').fill('test');
    await page.locator('#loginpassword').fill('test123');
    await page.getByRole('button',{name:'Log in'}).click();
    
    console.log('Mocked execution completed');
})