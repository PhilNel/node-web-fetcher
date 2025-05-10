export interface AppConfig {
    writerType: string;
    fetcherType: string;
    s3Bucket?: string;
    s3Key?: string;
}

export function loadConfig(): AppConfig {
    const fetcherType = process.env.FETCHER_TYPE || 'chromium';

    const writerType = process.env.WRITER_TYPE || 'file';
    if (writerType === 's3' && !process.env.WRITER_S3_BUCKET_NAME) {
        throw new Error('Missing WRITER_S3_BUCKET_NAME for S3 writer');
    }

    return {
        fetcherType: fetcherType,
        writerType: writerType,
        s3Bucket: process.env.WRITER_S3_BUCKET_NAME,
        s3Key: process.env.WRITER_S3_BUCKET_KEY || 'rendered.html',
    };
}
