import { Page, expect } from '@playwright/test';

export class BasePage {
    constructor(protected readonly page: Page) { }

    async goto(path: string = '/') {
        await this.page.goto(path);
    }

    async expectPageTitleToContain(text: string) {
        await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
    }

    async waitForPageReady() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}
