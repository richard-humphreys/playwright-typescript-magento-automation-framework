import { Locator, Page, expect } from '../fixtures/test';
import { BasePage } from './BasePage';

export class ShippingPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    get emailField(): Locator {
        return this.page.locator('input#customer-email:visible').first();
    }

    get billingPageButton(): Locator {
        return this.page.locator('button[data-role="opc-continue"]:visible');
    }

    get firstShippingMethod(): Locator {
        return this.page.locator('.table-checkout-shipping-method input[type="radio"]').first();
    }

    get firstNameField(): Locator {
        return this.page.locator('input[name="firstname"]');
    }

    get lastNameField(): Locator {
        return this.page.locator('input[name="lastname"]');
    }

    get streetAddressField(): Locator {
        return this.page.locator('input[name="street[0]"]');
    }

    get cityField(): Locator {
        return this.page.locator('input[name="city"]');
    }

    get regionField(): Locator {
        return this.page.locator('input[name="region"]');
    }

    get postcodeField(): Locator {
        return this.page.locator('input[name="postcode"]');
    }

    get countryField(): Locator {
        return this.page.locator('select[name="country_id"]');
    }

    get telephoneField(): Locator {
        return this.page.locator('input[name="telephone"]');
    }

    async open() {
        await this.goto('/default/checkout/#shipping');
    }

    async completeShippingFields() {
        await expect(this.emailField).toBeVisible({ timeout: 15000 });

        await this.emailField.fill('test@test.com');

        await this.firstNameField.fill('Test');
        await this.lastNameField.fill('User');
        await this.streetAddressField.fill('1 Test Street');
        await this.cityField.fill('Test City');
        await this.countryField.selectOption({ label: 'United Kingdom' });

        await expect(this.regionField).toBeVisible({ timeout: 15000 });
        await this.regionField.fill('Test County');
        await this.postcodeField.fill('SY1 1AA');
        await this.telephoneField.fill('07700000000');

        await this.waitForShippingMethods();
        await this.firstShippingMethod.check();
    }

    async waitForShippingMethods() {
        await expect(this.firstShippingMethod).toBeVisible({ timeout: 30000 });
        await expect(this.firstShippingMethod).toBeEnabled({ timeout: 30000 });
    }

    async proceedToBilling() {
        await this.waitForShippingMethods();

        await expect(this.billingPageButton).toBeVisible({ timeout: 15000 });
        await expect(this.billingPageButton).toBeEnabled({ timeout: 15000 });

        await Promise.all([
            this.page.waitForURL(/#payment/, { timeout: 30000 }),
            this.billingPageButton.click()
        ]);
    }
}
