import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import { createLogger } from './logger/Logger.js';
import { fetchHandler } from './bootstrap.js';

const log = createLogger('Index');

export const handler = async (
  _event: APIGatewayProxyEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    await fetchHandler.handle();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    log.error({ err }, 'Handler failed');
    const message = err instanceof Error ? err.message : 'An unknown error occurred';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};
