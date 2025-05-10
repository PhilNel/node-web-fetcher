import { promises as fs } from 'fs';

export class FileWriter {
    private filePath: string;

    constructor(filePath = 'rendered.html') {
        this.filePath = filePath;
    }

    async write(html: string): Promise<void> {
        await fs.writeFile(this.filePath, html);
        console.log(`[INFO] HTML written to ${this.filePath}`);
    }
}