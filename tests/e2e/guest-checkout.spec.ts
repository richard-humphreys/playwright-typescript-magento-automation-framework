import { test } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Guest checkout journey', () => {
    test('Guest user can add a product to cart from the PDP, process to the checkout and purchase the item', async ({
        homePage,
        searchPage,
        productPage,
        miniCart,
        cartPage,
        shippingPage,
        billingPage,
        successPage
    }) => {
        await homePage.open();

        await homePage.searchFor(config.searchTerms.validProduct);

        await searchPage.expectSearchResultsVisible();
        await searchPage.openFirstProduct();

        await productPage.expectProductVisible();
        await productPage.selectConfigurableOptionsIfPresent();
        await productPage.addToCart();

        await miniCart.expectItemCountGreaterThanZero();

        await cartPage.open();
        await cartPage.expectCartHasItems();
        await cartPage.proceedToCheckout();

        await shippingPage.completeShippingFields();
        await shippingPage.proceedToBilling();

        await billingPage.completeBillingFields();
        await billingPage.proceedToSuccess();

        await successPage.confirmSuccess();
    });
});