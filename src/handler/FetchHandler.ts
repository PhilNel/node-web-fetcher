import { createLogger } from '../logger/Logger.js';
import { Fetcher } from '../fetcher/FetcherFactory.js';
import { Writer } from '../writer/WriterFactory.js';
import StaticUrlProvider from '../provider/StaticUrlProvider.js';

export class FetchHandler {
    private readonly log = createLogger('FetchHandler');

    constructor(
        private provider: StaticUrlProvider,
        private fetcher: Fetcher,
        private writer: Writer,
    ) { }

    async handle(): Promise<void> {
        const url = this.provider.getUrl();
        this.log.info('Fetching', { url });

        const html = await this.fetcher.fetchPage(url);

        await this.writer.write(html);
    }
}
