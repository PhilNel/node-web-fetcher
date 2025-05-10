import { promises as fs } from 'fs';
import { createLogger } from '../logger/Logger';

const log = createLogger('FileWriter');

export class FileWriter {
    private filePath: string;

    constructor(filePath = 'rendered.html') {
        this.filePath = filePath;
    }

    async write(html: string): Promise<void> {
        await fs.writeFile(this.filePath, html);
        log.info(`HTML written to ${this.filePath}`);
    }
}