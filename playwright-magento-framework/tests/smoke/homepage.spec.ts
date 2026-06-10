import { test } from '../../fixtures/test';

test.describe('Homepage', () => {
    test('homepage loads successfully', async ({ homePage }) => {
        await homePage.open();
        await homePage.expectLogoVisible();
    });
});
