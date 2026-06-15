import { test, expect } from '../../fixtures/test';

test.describe('GraphQL Health', () => {
    test('GraphQL endpoint is available', async ({ request }) => {
        const response = await request.post('/graphql', {
            data: {
                query:
                `
                    query {
                        storeConfig {
                          base_currency_code
                        }
                    }
                `
            }
        });

        expect(response.ok()).toBeTruthy();

        const body = await response.json();

        // Uncomment the following line to log the base currency code retrieved from the API response
        // console.log(body.data.storeConfig.base_currency_code);

        expect(body.errors).toBeUndefined();
        expect(body.data.storeConfig.base_currency_code).toBeTruthy();
    });
});