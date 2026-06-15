import { test, expect } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Product API tests', () => {
    test('Can retrieve products via GraphQL search', async ({ request }) => {
        const response = await request.post(
            '/graphql',
            {
                data: {
                    query:
                    `
                        query {
                            products(search: "shirt") {
                                items {
                                sku
                                name
                                stock_status

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
        // console.log('Products from API response:', JSON.parse(body).data.products.items);

        expect(JSON.parse(body).data.products.items).toBeDefined();
        expect(JSON.parse(body).data.products.items.length).toBeGreaterThan(0);

        for (const product of JSON.parse(body).data.products.items) {
            expect(product.sku).toBeTruthy();
            expect(product.name).toBeTruthy();
            expect(product.price_range.minimum_price.regular_price.value).toBeGreaterThan(0);
            expect(product.price_range.minimum_price.regular_price.currency).toBe(config.currency);
        }
    });
});