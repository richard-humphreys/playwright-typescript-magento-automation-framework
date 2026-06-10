import { test } from '../../fixtures/test';

test.describe('Category', () => {
    test('user visits category page and navigates to a product', async ({ categoryPage }) => {
        await categoryPage.goto('/women/tops-women.html'); // Configurable path to category page

        await categoryPage.expectCategoryPageItemsVisible();
        await categoryPage.openFirstProduct();
    });
});
