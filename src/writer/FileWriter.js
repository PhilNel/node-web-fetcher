const fs = require('fs').promises;

class FileWriter {

    constructor(filePath = 'rendered.html') {
        this.filePath = filePath;
    }

    async write(html) {
        await fs.writeFile(this.filePath, html);
        console.log(`[INFO] HTML written to ${this.filePath}`);
    }
}

module.exports = FileWriter;
