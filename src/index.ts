import { config as loadDotenv } from 'dotenv';
import { createFetcherFromEnv } from './fetcher/FetcherFactory';
import StaticUrlProvider from './provider/StaticUrlProvider';
import { createWriterFromEnv } from './writer/WriterFactory';

if (process.env.NODE_ENV !== 'production') {
  loadDotenv();
}

async function fetchAndWrite() {
    const provider = new StaticUrlProvider();
    const fetcher = createFetcherFromEnv();
    const writer = createWriterFromEnv();

    const url = provider.getUrl();
    console.log(`[INFO] Fetching: ${url}`);

    const html = await fetcher.fetchPage(url);
    await writer.write(html);
}

module.exports = {
    handler: async (_event: any, _context: any) => {
        try {
            await fetchAndWrite();
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } catch (err: any) {
            console.error('[ERROR]', err);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: err.message }),
            };
        }
    },
};

// Allow direct CLI execution
if (require.main === module) {
    fetchAndWrite().catch(err => {
        console.error('[FATAL]', err);
        process.exit(1);
    });
}