import {Page, Locator} from '@playwright/test';
export class CartPage{
    readonly page: Page;
    readonly checkOut : Locator;
    readonly cartItemName : Locator;
    readonly badgeCount : Locator;

    
    constructor(page: Page){
        this.page = page;
        this.checkOut = page.getByRole('button',{name:"Checkout"});
        this.cartItemName = page.locator('.inventory_item_name');
        this.badgeCount = page.locator('.shopping_cart_badge');
    }

  
    
    async removeProduct(productname: string){
        await this.page.locator('.cart_item',{hasText:productname})
        .getByRole('button',{name:"Remove"}).click();
    }
    
     productInCart (productname: string){
        return this.page.locator('.cart_item', { hasText: productname });
    }


    async goToCheckOut (){
        await this.checkOut.click();
    }

}