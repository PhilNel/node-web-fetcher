const path = require('path');

const PlaywrightFetcher = require('./fetcher/PlaywrightFetcher');
const StaticUrlProvider = require('./provider/StaticUrlProvider');
const FileWriter = require('./writer/FileWriter');

(async () => {
    const provider = new StaticUrlProvider();
    const fetcher = new PlaywrightFetcher();
    const writer = new FileWriter(path.resolve(__dirname, '../rendered.html'));

    const url = provider.getUrl();
    console.log(`[INFO] Fetching: ${url}`);

    const html = await fetcher.fetchPage(url);

    await writer.write(html);
})();
