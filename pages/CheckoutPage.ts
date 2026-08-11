import {Page, Locator} from '@playwright/test';
export class CheckoutPage {
    readonly page : Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton : Locator;
    readonly finishButton : Locator;
    readonly pageTitle : Locator;
    readonly checkoutError : Locator;
    readonly totalItemPrice : Locator;

    constructor(page : Page){
        this.page = page;
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page. getByPlaceholder('Last Name');
        this.postalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button',{name:"Continue"})
        this.finishButton = page.getByRole('button',{name:"Finish"});
        this.pageTitle = page.locator('.title');
        this.checkoutError = page.locator('[data-test ="error"]');
        this.totalItemPrice = page.locator('[data-test = "total-info-label"]');
    }

    async contactinformation(firstname: string, lastname: string, postalcode: string){
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.postalCode.fill(postalcode);
    }

    async proceedToCheckOut(){
        await this.continueButton.click();
    }

    async orderCompleted(){
        await this.finishButton.click();
    }

    
}