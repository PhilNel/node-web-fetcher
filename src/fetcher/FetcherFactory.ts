import { ChromiumFetcher } from './ChromiumFetcher.js';

export interface Fetcher {
    fetchPage(url: string): Promise<string>;
}

export function createFetcherFromEnv(fetcherType: string) {
    switch (fetcherType) {
        case 'chromium':
            return new ChromiumFetcher();

        default:
            throw new Error(`Unknown fetcher type: ${fetcherType}`);
    }
}
