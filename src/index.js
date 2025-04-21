if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { createFetcherFromEnv } = require("./fetcher/FetcherFactory");
const StaticUrlProvider = require('./provider/StaticUrlProvider');
const { createWriterFromEnv } = require('./writer/WriterFactory');

async function fetchAndWrite() {
    const provider = new StaticUrlProvider();
    const fetcher = new createFetcherFromEnv();
    const writer = createWriterFromEnv();

    const url = provider.getUrl();
    console.log(`[INFO] Fetching: ${url}`);

    const html = await fetcher.fetchPage(url);
    await writer.write(html);
}

module.exports = {
    handler: async (event, context) => {
        try {
            await fetchAndWrite();
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true }),
            };
        } catch (err) {
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