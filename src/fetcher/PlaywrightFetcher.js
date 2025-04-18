const playwright = require('playwright');

class PlaywrightFetcher {
    async fetchPage(url) {
        const browser = await playwright.chromium.launch();
        const page = await browser.newPage();
        
        await page.goto(url, { waitUntil: 'networkidle' });
        
        const html = await page.content();
        await browser.close();
        
        return html;
    }
}

module.exports = PlaywrightFetcher;
