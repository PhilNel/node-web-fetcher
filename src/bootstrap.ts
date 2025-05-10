import { isLambdaRuntime } from './runtime/isLambda.js';
import { createFetcherFromEnv } from './fetcher/FetcherFactory.js';
import StaticUrlProvider from './provider/StaticUrlProvider.js';
import { createWriterFromEnv } from './writer/WriterFactory.js';
import { loadConfig } from './config.js';
import { FetchHandler } from './handler/FetchHandler.js';

export function initializeApp(): FetchHandler {
    const config = loadConfig();
    const provider = new StaticUrlProvider();
    const fetcher = createFetcherFromEnv(config.fetcherType);
    const writer = createWriterFromEnv(config.writerType);
    
    const handler = new FetchHandler(provider, fetcher, writer);

    return handler;
}

if (!isLambdaRuntime()) {
  const { config: loadDotenv } = await import('dotenv');
  loadDotenv();
}

export const fetchHandler = await initializeApp();

if (!isLambdaRuntime()) {
  await fetchHandler.handle();
}
