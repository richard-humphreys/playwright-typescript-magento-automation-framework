import { test } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Category', () => {
    test('User visits category page and navigates to a product', async ({ categoryPage }) => {
        await categoryPage.goto(config.URLs.womensTops);

        await categoryPage.expectCategoryPageItemsVisible();
        await categoryPage.openFirstProduct();
    });
});
