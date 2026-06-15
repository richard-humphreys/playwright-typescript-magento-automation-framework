import { test, expect } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Product API tests', () => {
    test('Product has valid price data', async ({ request }) => {
        const response = await request.post(
            '/graphql',
            {
                data: {
                    query:
                    `
                        query {
                            products(filter: { sku: { eq: "${config.sku}" } }) {
                                items {
                                    sku
                                    price_range {
                                        minimum_price {
                                            regular_price {
                                                value
                                                currency
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `
                }
            }
        );

        expect(response.ok()).toBeTruthy();

        const body = await response.text();

        // Uncomment the following line to log the products retrieved from the API response
        // console.log('Products from API response:', JSON.parse(body).data.products.items[0].price_range.minimum_price.regular_price);

        const product = JSON.parse(body).data.products.items[0];

        expect(product.price_range.minimum_price.regular_price.value).toBeGreaterThan(0);
        expect(product.price_range.minimum_price.regular_price.currency).toBe(config.currency);
    });
});