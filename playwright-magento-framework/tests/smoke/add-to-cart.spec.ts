import { test } from '../../fixtures/test';
import { searchTerms } from '../../utils/testData';

test.describe('Add to cart', () => {
    test('user can add first search result to cart', async ({
        homePage,
        searchPage,
        productPage,
        miniCart,
        cartPage
    }) => {
        await homePage.open();
        await homePage.searchFor(searchTerms.configurableProduct);

        await searchPage.expectSearchResultsVisible();
        await searchPage.openFirstProduct();

        await productPage.expectProductVisible();
        await productPage.addToCart();

        await miniCart.expectItemCountGreaterThanZero();

        await cartPage.open();
        await cartPage.expectCartHasItems();
    });
});
