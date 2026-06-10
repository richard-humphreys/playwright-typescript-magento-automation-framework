import { test } from '../../fixtures/test';
import { searchTerms } from '../../utils/testData';

test.describe('Search', () => {
    test('user can search for a product', async ({ homePage, searchPage }) => {
        await homePage.open();
        await homePage.searchFor(searchTerms.configurableProduct);

        await searchPage.expectSearchResultsVisible();
    });
});
