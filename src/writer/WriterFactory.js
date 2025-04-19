const path = require('path');

const FileWriter = require('./FileWriter');
const S3Writer = require('./S3Writer');

function createWriterFromEnv() {
    const writerType = process.env.WRITER_TYPE || 'file';

    if (writerType === 's3') {
        const bucketName = process.env.WRITER_S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error('Missing WRITER_S3_BUCKET_NAME environment variable');
        }

        const s3Key = process.env.WRITER_S3_BUCKET_KEY || 'rendered.html';
        return new S3Writer(bucketName, s3Key);
    }

    const outputPath = process.env.OUTPUT_PATH || path.resolve(__dirname, '../../rendered.html');
    return new FileWriter(outputPath);
}

module.exports = { createWriterFromEnv };
