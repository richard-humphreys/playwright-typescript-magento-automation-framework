import { test, expect } from '../../fixtures/test';

test.describe('Product API tests', () => {
    test('Invalid SKU returns no products', async ({ request }) => {
        const response = await request.post(
            '/graphql',
            {
                data: {
                    query:
                    `
                         query {
                            products(filter: { sku: { eq: "test-sku" } }) {
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

        const body = await response.json();

        // Uncomment the following line to log the products retrieved from the API response
        // console.log('Products from API response:', body.data.products.items);

        expect(body.data.products.items).toHaveLength(0);
    });
});