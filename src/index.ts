import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { config as loadDotenv } from 'dotenv';
import { createFetcherFromEnv } from './fetcher/FetcherFactory';
import StaticUrlProvider from './provider/StaticUrlProvider';
import { createWriterFromEnv } from './writer/WriterFactory';

if (process.env.NODE_ENV !== 'production') {
    loadDotenv();
}

async function fetchAndWrite(): Promise<void> {
    const provider = new StaticUrlProvider();
    const fetcher = createFetcherFromEnv();
    const writer = createWriterFromEnv();

    const url = provider.getUrl();
    console.log(`[INFO] Fetching: ${url}`);

    const html = await fetcher.fetchPage(url);
    await writer.write(html);
}

export const handler = async (
    _event: APIGatewayProxyEvent,
    _context: Context
): Promise<APIGatewayProxyResult> => {
    try {
        await fetchAndWrite();
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (err: any) {
        console.error('[ERROR]', err);
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
};

// Allow direct CLI execution
if (require.main === module) {
    fetchAndWrite().catch(err => {
        console.error('[FATAL]', err);
        process.exit(1);
    });
}