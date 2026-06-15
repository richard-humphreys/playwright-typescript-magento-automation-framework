import { test } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Add to cart smoke tests', () => {
    test('User can add first search result to cart', async ({
        homePage,
        searchPage,
        productPage,
        miniCart,
        cartPage
    }) => {
        await homePage.open();
        await homePage.searchFor(config.searchTerms.configurableProduct);

        await searchPage.expectSearchResultsVisible();
        await searchPage.openFirstProduct();

        await productPage.expectProductVisible();
        await productPage.addToCart();

        await miniCart.expectItemCountGreaterThanZero();

        await cartPage.open();
        await cartPage.expectCartHasItems();
    });
});
