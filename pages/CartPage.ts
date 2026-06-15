import { Locator, Page, expect } from '../fixtures/test';
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

    async proceedToCheckout() {
        const checkoutButton = this.page.getByRole('button', {
            name: 'Proceed to Checkout'
        });

        await expect(checkoutButton).toBeVisible({ timeout: 15000 });
        await expect(checkoutButton).toBeEnabled({ timeout: 15000 });

        await checkoutButton.scrollIntoViewIfNeeded();

        const box = await checkoutButton.boundingBox();

        if (!box) {
            throw new Error('Proceed to Checkout button bounding box not found');
        }

        await Promise.all([
            this.page.waitForURL(/\/cart\//, {
                timeout: 30000
            }),
            this.page.mouse.click( // TODO: Investigate why the regular click() method is not working for the Proceed to Checkout button
                box.x + box.width / 2,
                box.y + box.height / 2
            )
        ]);
    }
}
