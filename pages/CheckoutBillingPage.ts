import { Locator, Page, expect, test } from '../fixtures/test';
import { BasePage } from './BasePage';

export class BillingPage extends BasePage {
    get firstPaymentMethod(): Locator {
        return this.page.locator('.payment-methods input[type="radio"]').first();
    }

    get payButton(): Locator {
        return this.page.locator('.payment-methods button[type="submit"]');
    }

    constructor(page: Page) {
        super(page);
    }

    async open() {
        await this.goto('/default/checkout/#payment');
    }

    async completeBillingFields() {
        await this.firstPaymentMethod.check();
    }

    async proceedToSuccess() {
        const payButton = this.payButton;

        await expect(payButton).toBeVisible();
        await payButton.click();

        await this.page.waitForURL(/success/, {
            timeout: 30000
        });

        await expect(this.page).toHaveURL(/success/);
    }
}
