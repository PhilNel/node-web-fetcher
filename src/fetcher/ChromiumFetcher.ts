import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export class ChromiumFetcher {
    async fetchPage(url: string): Promise<string> {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });

        const html = await page.content();
        await browser.close();

        return html;
    }
}
