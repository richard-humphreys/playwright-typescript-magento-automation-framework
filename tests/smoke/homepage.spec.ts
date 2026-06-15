import { test, expect } from '../../fixtures/test';

test.describe('Homepage smoke tests', () => {
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Home Page|Magento 2 Commerce/i);
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('#search')).toBeVisible();
  });
});
