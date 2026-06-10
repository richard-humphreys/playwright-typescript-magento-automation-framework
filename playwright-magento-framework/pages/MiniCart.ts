import { Locator, Page, expect } from '@playwright/test';

export class MiniCart {
    readonly cartButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartCounter: Locator;

    constructor(private readonly page: Page) {
        this.cartButton = page.locator('.showcart');
        this.checkoutButton = page.locator('#top-cart-btn-checkout');
        this.cartCounter = page.locator('.counter-number');
    }

    async open() {
        await this.cartButton.click();
    }

    async expectItemCountGreaterThanZero() {
        await expect(this.cartCounter).not.toHaveText('0');
    }

    async proceedToCheckout() {
        await this.open();
        await this.checkoutButton.click();
    }
}
