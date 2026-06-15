import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 10000
    },
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: [
        ['html'],
        ['list']
    ],
    use: {
        baseURL: 'https://magento2-demo.magebit.com/',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    projects: [
        {
            name: 'api',
            testMatch: /tests\/api\/.*\.spec\.ts/
        },
        {
            name: 'chromium',
            testMatch: /tests\/(smoke|e2e)\/.*\.spec\.ts/,
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            testMatch: /tests\/(smoke|e2e)\/.*\.spec\.ts/,
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'mobile-chrome',
            testMatch: /tests\/(smoke|e2e)\/.*\.spec\.ts/,
            use: { ...devices['Pixel 5'] }
        }
    ]
});
