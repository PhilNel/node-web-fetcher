import { createFetcherFromEnv } from '../fetcher/FetcherFactory';
import StaticUrlProvider from '../provider/StaticUrlProvider';
import { createWriterFromEnv } from '../writer/WriterFactory';
import { loadConfig } from '../config';

export async function fetchAndWrite(): Promise<void> {
  const config = loadConfig();
  const provider = new StaticUrlProvider();
  const fetcher = createFetcherFromEnv(config.fetcherType);
  const writer = createWriterFromEnv(config.writerType);

  const url = provider.getUrl();
  console.log(`[INFO] Fetching: ${url}`);

  const html = await fetcher.fetchPage(url);
  await writer.write(html);
}
