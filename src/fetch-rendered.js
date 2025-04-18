const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const url = "https://duckduckgo.com/hiring";

    console.log(`[INFO] Visiting ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    await page.waitForTimeout(3000); // Give time for JS to render

    const html = await page.content();
    const outputPath = path.resolve(__dirname, 'rendered.html');

    fs.writeFileSync(outputPath, html);
    console.log(`[INFO] Rendered HTML saved to: ${outputPath}`);

    await browser.close();
})();
