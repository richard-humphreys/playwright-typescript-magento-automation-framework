import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly logo: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#search');
        this.logo = page.locator('.logo');
    }

    async open() {
        await this.goto('/');
        await this.waitForPageReady();
    }

    async searchFor(term?: string) {
        const value = term ?? '';
        await this.searchInput.waitFor({ state: 'visible' });
        await this.searchInput.fill(value);
        await this.searchInput.press('Enter');
    }

    async expectLogoVisible() {
        await expect(this.logo).toBeVisible();
    }
}
