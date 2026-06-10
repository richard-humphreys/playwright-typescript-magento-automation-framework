import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    readonly cartTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItems = page.locator('.cart.item');
        this.cartTitle = page.locator('h1');
    }

    async open() {
        await this.goto('/checkout/cart/');
    }

    async expectCartHasItems() {
        await expect(this.cartItems.first()).toBeVisible();
    }
}
