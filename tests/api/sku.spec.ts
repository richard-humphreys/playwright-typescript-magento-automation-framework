import { test, expect } from '../../fixtures/test';
import { config } from '../../utils/testData';

test.describe('Product API tests', () => {
    test('Can retrieve products via SKU', async ({ request }) => {
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
                                name
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
        // console.log('Products from API response:', JSON.parse(body).data.products.items[0]);

        const product = JSON.parse(body).data.products.items[0];

        expect(product.sku).toBe('WS12');
        expect(product.name).toBe('Radiant Tee');
    });
});