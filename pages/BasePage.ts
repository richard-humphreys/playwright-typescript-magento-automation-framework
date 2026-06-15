import { Page, expect } from '../fixtures/test';

export class BasePage {
    constructor(protected readonly page: Page) { }

    async goto(path: string = '/') {
        await this.page.goto(path);
    }

    async waitForPageReady() {
        await this.page.waitForLoadState('domcontentloaded');
    }
}
