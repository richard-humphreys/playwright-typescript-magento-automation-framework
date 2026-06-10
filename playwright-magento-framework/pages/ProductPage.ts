import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    readonly productTitle: Locator;
    readonly addToCartButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.productTitle = page.locator('h1.page-title');
        this.addToCartButton = page.locator('#product-addtocart-button');
        this.successMessage = page.locator('[data-ui-id="message-success"]');
    }

    async selectConfigurableOptionsIfPresent() {
        const optionGroups = this.page.locator('.swatch-attribute');
        const groupCount = await optionGroups.count();

        if (groupCount === 0) return;

        for (let i = 0; i < groupCount; i++) {
            const group = optionGroups.nth(i);

            const availableOptions = group.locator(
                '.swatch-option:not(.disabled):not([aria-disabled="true"])'
            );

            await expect(availableOptions.first()).toBeVisible();

            const optionCount = await availableOptions.count();

            for (let j = 0; j < optionCount; j++) {
                const option = availableOptions.nth(j);

                await option.scrollIntoViewIfNeeded();
                await option.dispatchEvent('click');
                await this.page.waitForTimeout(300);

                const selected = await option.evaluate((el) =>
                    el.classList.contains('selected') ||
                    el.getAttribute('aria-checked') === 'true'
                );

                if (selected) break;
            }
        }
    }

    async expectProductVisible() {
        await expect(this.productTitle).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
    }

    async addToCart() {
        await this.page.waitForTimeout(1000);
        await this.selectConfigurableOptionsIfPresent();

        await expect(this.addToCartButton).toBeEnabled();
        await this.addToCartButton.click();

        await expect(this.successMessage).toBeVisible();
    }
}
