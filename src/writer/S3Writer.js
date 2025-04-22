const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

class S3Writer {
    constructor(bucketName, key = 'rendered.html') {
        this.bucketName = bucketName;
        this.key = key;

        this.s3 = new S3Client({
            region: process.env.AWS_REGION || 'af-south-1'
        });
    }

    async write(html) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: this.key,
            Body: html,
            ContentType: 'text/html',
        });

        await this.s3.send(command);
        console.log(`[INFO] Uploaded HTML to s3://${this.bucketName}/${this.key}`);
    }
}

module.exports = S3Writer;
