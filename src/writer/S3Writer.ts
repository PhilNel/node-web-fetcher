import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createLogger } from '../logger/Logger.js';

const log = createLogger('S3Writer');

export class S3Writer {

    private s3: S3Client;
    private bucketName: string;
    private key: string;

    constructor(bucketName: string, key: string = 'rendered.html') {
        this.bucketName = bucketName;
        this.key = key;

        this.s3 = new S3Client({
            region: process.env.AWS_REGION || 'af-south-1'
        });
    }

    async write(html: string): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: this.key,
            Body: html,
            ContentType: 'text/html',
        });

        await this.s3.send(command);
        log.info(`Uploaded HTML to s3://${this.bucketName}/${this.key}`);
    }
}
