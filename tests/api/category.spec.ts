import { test, expect } from '../../fixtures/test';

test.describe('Category GraphQL API', () => {
    test('Can retrieve category tree', async ({ request }) => {
        const response = await request.post('/graphql', {
            data: {
                query:
                `
                query {
                    categoryList {
                        id
                        name
                        level
                        path
                        children {
                            id
                            name
                            level
                            path
                        }
                    }
                }
            `
            }
        });

        expect(response.ok()).toBeTruthy();

        const body = await response.json();

        expect(body.errors).toBeUndefined();
        expect(body.data.categoryList).toBeDefined();
        expect(body.data.categoryList.length).toBeGreaterThan(0);

        const rootCategory = body.data.categoryList[0];

        // Uncomment the following line to log the root category retrieved from the API response
        // console.log('Root category retrieved from API response:', rootCategory);

        expect(rootCategory.id).toBeTruthy();
        expect(rootCategory.name).toBeTruthy();
        expect(rootCategory.level).toBeGreaterThanOrEqual(1);
        expect(rootCategory.path).toBeTruthy();
        expect(Array.isArray(rootCategory.children)).toBeTruthy();
    });
});