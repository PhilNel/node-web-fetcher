import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { fetchAndWrite } from './handler/fetchAndWrite';
import { isLambdaRuntime } from './runtime/isLambda';
import { createLogger } from './logger/Logger';

const log = createLogger('Index');

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
    } catch (err) {
        log.error(err);
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
};

async function runLocal(): Promise<void> {
    const { config: loadDotenv } = await import('dotenv');
    loadDotenv();
    fetchAndWrite().catch(err => {
        log.error(err);
        process.exit(1);
    });
}

// Allow direct CLI execution
if (!isLambdaRuntime() && require.main === module) {
    runLocal();
}