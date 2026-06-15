# README

This repository demonstrates a Playwright + TypeScript automation framework using a publicly available Magento 2 demo storefront as the application under test. The purpose is to showcase test architecture, maintainability and engineering practices rather than the underlying website itself.

## To run the test

Within the root directory of the project, run the following commands:
```
cd playwright-magento-framework
npm i
```

To run **every** test:
```
npm test
npx playwright show-report
```

To run API tests:
```
npm run test:api
npx playwright show-report
```

To run the e2e tests:
```
npm run test:e2e
npx playwright show-report
```