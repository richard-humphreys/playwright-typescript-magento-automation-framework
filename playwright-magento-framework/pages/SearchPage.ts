import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
    readonly productItems: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.productItems = page.locator('.product-item');
        this.pageTitle = page.locator('h1');
    }

    async expectSearchResultsVisible() {
        await expect(this.productItems.first()).toBeVisible();
    }

    async openFirstProduct() {
        await this.productItems.first().locator('a.product-item-link').click();
    }
}
