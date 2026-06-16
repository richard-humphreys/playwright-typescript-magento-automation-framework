import { chromium } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
import { config } from '../../utils/testData';

type VisualDiffResult = {
    route: string;
    diffPixels: number;
    beforePath: string;
    afterPath: string;
    diffPath: string;
};

const beforeUrl = process.env.BEFORE_URL;
const afterUrl = process.env.AFTER_URL;

if (!beforeUrl || !afterUrl) {
    throw new Error('BEFORE_URL and AFTER_URL are required');
}

const outputDir = 'visual-results';
fs.mkdirSync(outputDir, { recursive: true });

function safeName(route: string) {
    return route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-/, '');
}

async function runVisualRegression() {
    const results: VisualDiffResult[] = [];

    const browser = await chromium.launch();

    for (const route of config.visualRoutes) {
        const page = await browser.newPage({
            viewport: { width: 1440, height: 1200 }
        });

        const beforePath = path.join(outputDir, `${safeName(route)}-before.png`);
        const afterPath = path.join(outputDir, `${safeName(route)}-after.png`);
        const diffPath = path.join(outputDir, `${safeName(route)}-diff.png`);

        await page.goto(new URL(route, beforeUrl).toString(), { waitUntil: 'networkidle' });
        await page.screenshot({ path: beforePath, fullPage: true });

        await page.goto(new URL(route, afterUrl).toString(), { waitUntil: 'networkidle' });
        await page.screenshot({ path: afterPath, fullPage: true });

        const before = PNG.sync.read(fs.readFileSync(beforePath));
        const after = PNG.sync.read(fs.readFileSync(afterPath));

        const { width, height } = before;
        const diff = new PNG({ width, height });

        const diffPixels = pixelmatch(
            before.data,
            after.data,
            diff.data,
            width,
            height,
            { threshold: 0.1 }
        );

        fs.writeFileSync(diffPath, PNG.sync.write(diff));

        if (diffPixels > 0) {
            results.push({
                route,
                diffPixels,
                beforePath,
                afterPath,
                diffPath
            });
        }

        await page.close();
    }

    await browser.close();

    fs.writeFileSync(
        path.join(outputDir, 'visual-diff-report.json'),
        JSON.stringify(results, null, 2)
    );

    if (results.length > 0) {
        process.exitCode = 1;
    }
}

runVisualRegression().catch((error) => {
    console.error(error);
    process.exit(1);
});