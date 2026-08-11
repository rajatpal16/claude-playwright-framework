import {Page, Locator} from '@playwright/test';
export class InventoryPage{
    readonly page: Page;
    readonly filterBy : Locator;
    readonly cartButton : Locator;
    readonly cartBadge : Locator;
    readonly itemPrice : Locator;

    constructor(page : Page){
        this.page = page;
        this.filterBy = page.locator('[data-test="product-sort-container"]');
        this.cartButton = page.locator('[data-test = "shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test = "shopping-cart-badge"]');
        this.itemPrice = page.locator('.inventory_item_price');
    }
     async sortBy(option: string){
        await this.filterBy.selectOption(option);
    }

    async addProductToCart(productname: string){
        await this.page.locator('.inventory_item',{hasText:productname})
        .getByRole('button',{name:'Add to cart'}).click();
    }

   
    async goToCart(){
        await this.cartButton.click();
    }
}
