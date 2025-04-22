const ChromiumFetcher = require('./ChromiumFetcher');

function createFetcherFromEnv() {
    const fetcherType = process.env.FETCHER_TYPE || 'chromium';

    switch (fetcherType) {
        case 'chromium':
            return new ChromiumFetcher();

        default:
            throw new Error(`Unknown fetcher type: ${fetcherType}`);
    }
}

module.exports = { createFetcherFromEnv };
