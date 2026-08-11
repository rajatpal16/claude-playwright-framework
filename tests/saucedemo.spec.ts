import {test , expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {InventoryPage} from '../pages/InventoryPage';
import {CartPage} from '../pages/CartPage';
import {CheckoutPage} from '../pages/CheckoutPage';



// test.beforeEach (async({page}) =>{
//    const loginPage = new LoginPage(page);
//    await loginPage.goto();
// })

test ('verify valid login crdentials', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
    await expect(page).toHaveURL(/inventory/);
})

// write invalid login, add to cart, remove from cart, and full checkout tests below
test ('verify the invalid login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('sta_user','s123');
    await expect (loginPage.errorMessage).toHaveText(/do not match/i);
})

test ('Verify Add to Cart', async ({page}) => {
    //const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await page.goto ('https://www.saucedemo.com/inventory.html');
    //await loginPage.login('standard_user','secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);
    await expect(inventoryPage.cartBadge).toHaveText('3');

})

test ('verify sort by price low to high', async({page}) => {
    //const loginPage = new LoginPage(page);
    const inventoryPage =new InventoryPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    //await loginPage.login('standard_user','secret_sauce');
    await inventoryPage.sortBy('lohi');
    const priceText = await inventoryPage.itemPrice.allTextContents();
    console.log(priceText);
    const prices = priceText.map(text => parseFloat(text.replace('$','')));
    const sortedPrice = [...prices].sort((a,b) => a-b);
    expect (prices).toEqual(sortedPrice);

})

test ('Remove product from cart', async({page}) => {
    //const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    //await loginPage.login('standard_user','secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt')
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.removeProduct('Sauce Labs Fleece Jacket');
    await expect(cartPage.productInCart('Sauce Labs Fleece Jacket')).toHaveCount(0);
    await expect (cartPage.badgeCount).toHaveText('2');
    
})

test ('Verify the checkout error code', async({page}) => {
    //const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage =new CartPage(page);
    const checkoutPage =new CheckoutPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    //await loginPage.login('standard_user','secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt')
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.goToCheckOut();
    await expect (page).toHaveURL(/checkout-step/);
    await expect (checkoutPage.pageTitle).toHaveText(/Checkout: Your Information/);
    await checkoutPage.contactinformation('rajat','pal','');
    await checkoutPage.proceedToCheckOut();
    await expect(checkoutPage.checkoutError).toHaveText(/Code is required/i);
    
})
test ('Verify the order confirmation',async ({page}) =>{
    //const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage =new CartPage(page);
    const checkoutPage =new CheckoutPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    //await loginPage.login('standard_user','secret_sauce');
    await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt')
    await inventoryPage.addProductToCart('Sauce Labs Fleece Jacket');
    await inventoryPage.addProductToCart('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.goToCheckOut();
    await checkoutPage.contactinformation('rajat','pal','123');
    await checkoutPage.proceedToCheckOut();
    await expect(page).toHaveURL(/checkout-step/);
    await expect (checkoutPage.totalItemPrice).toHaveText(/Price Total/);
    await checkoutPage.orderCompleted();
    await expect (checkoutPage.pageTitle).toHaveText(/Checkout: Complete!/);
})