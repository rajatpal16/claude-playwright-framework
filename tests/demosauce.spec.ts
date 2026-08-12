import {test, expect} from '@playwright/test';
// const authfile = 'auth.json';
// test ('Valid login redirects to login page', async({page}) => {
//     await page.goto('https://www.saucedemo.com');
//     //1 enter valid login and passwaord
//     await page.getByPlaceholder('Username').fill('standard_user');
//     await page.getByPlaceholder('Password').fill('secret_sauce');
//     await page.getByRole('button',{name:"Login"}).click();
//     await expect(page).toHaveURL(/inventory/);
//     await expect(page.locator('.title')).toHaveText('Products');
//     await page.context().storageState({path: authfile});
// })
//     //2 enter invalid login and password
//     //test.use({ storageState: authfile });
//     test('Invalid login shows error message',async({page})=>{
//     await page.goto('https://www.saucedemo.com');
//     await page.getByPlaceholder('Username').fill('standard_user1');
//     await page.getByPlaceholder('Password').fill('secret_sauce');
//     await page.getByRole('button',{name:"Login"}).click();
//     await expect (page.locator('//div[contains(@class, "container error")]'))

//     .toHaveText(/do not match/i);
//     })
//     //3Add to cart — log in, add 2–3 products to the cart, assert the cart badge icon shows the correct count
//     test('User can add multiple item to cart',async ({page})=> {
//     await page.goto('https://www.saucedemo.com');
//     await page.getByPlaceholder('Username').fill('standard_user');
//     await page.getByPlaceholder('Password').fill('secret_sauce');
//     await page.getByRole('button',{name:"Login"}).click();
    
//     await page.getByRole('button',{name:"Add to cart"}).nth(0).click();
//     await page.getByRole('button',{name:"Add to cart"}).nth(1).click();
//     await page.getByRole('button',{name:"Add to cart"}).nth(3).click();
//     await page.locator('//div[contains(@id,"shopping_cart")]').click();
//     await expect(page.locator('//span[contains(@class,"cart_badge")]')).toHaveText('3');
//   })
 // 4 Remove from cart
  test ('Remove from cart', async ({page})=>{
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:"Login"}).click();
    await page.getByRole('button',{name:"Add to cart"}).nth(0).click();
    await page.getByRole('button',{name:"Add to cart"}).nth(1).click();
    await page.getByRole('button',{name:"Add to cart"}).nth(3).click();
    await expect(page.locator('//span[contains(@class,"cart_badge")]')).toHaveText('3');
    await page.locator('//a[contains(@class,"cart_link")]').click();
    await page.getByRole('button',{name:'Remove'}).nth(0).click();
    await expect(page.locator('//span[contains(@class,"cart_badge")]')).toHaveText('2');
    
  })
  //5 Full Checkout Flow
  test ('Full Checkout flow ', async ({page})=>{
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:"Login"}).click();
    await page.getByRole('button',{name:"Add to cart"}).nth(0).click();
    await page.getByRole('button',{name:"Add to cart"}).nth(1).click();
    await page.getByRole('button',{name:"Add to cart"}).nth(3).click();
    await page.locator('//a[contains(@class,"cart_link")]').click();
    await page.getByRole('button',{name:'Checkout'}).click();
    await page.getByPlaceholder('First Name').fill('XYZ');
    await page.getByPlaceholder('Last Name').fill('Family');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button',{name:"Continue"}).click();
    await expect(page.locator('//span[@class="title"]')).toHaveText('Checkout: Overview');
    await expect(page.locator('//div[@data-test="total-info-label"]')).toHaveText('Price Total');
    await page.getByRole('button',{name:'Finish'}).click();
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');
    //wait for URL
    await page.waitForURL(/checkout-complete/);
    await expect(page).toHaveURL(/checkout-complete/);
  })