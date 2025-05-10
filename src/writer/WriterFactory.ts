import path from 'path';
import { FileWriter } from './FileWriter.js';
import { S3Writer } from './S3Writer.js';

export interface Writer {
    write(html: string): Promise<void>;
}

export function createWriterFromEnv(writerType: string): Writer {
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
