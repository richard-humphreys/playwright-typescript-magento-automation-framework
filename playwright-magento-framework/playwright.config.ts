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
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] }
        }
    ]
});
