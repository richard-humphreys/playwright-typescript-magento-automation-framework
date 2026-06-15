import { Page, expect, test } from '../fixtures/test';
import { BasePage } from './BasePage';

export class SuccessPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get successMessage(): Locator {
        return this.page.locator('[data-ui-id="page-title-wrapper"]');
    }

    async expectSuccessPageVisible() {
        await expect(this.page).toHaveURL(/success/);

        const e2eScreenshot = await this.page.screenshot({
            path: 'test-results/e2e-final.png',
            fullPage: true
        });

        await test.info().attach('Success Page', {
            body: e2eScreenshot,
            contentType: 'image/png'
        });
    }

    async confirmSuccess() {
        await expect(this.successMessage).toBeVisible({ timeout: 30000 });
        await expect(this.successMessage).toHaveText(/Thank you for your purchase!/);
    }
}
