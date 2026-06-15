import { test } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Search smoke tests', () => {
    test('User can search for a product', async ({ homePage, searchPage }) => {
        await homePage.open();
        await homePage.searchFor(config.searchTerms.configurableProduct);

        await searchPage.expectSearchResultsVisible();
    });
});
