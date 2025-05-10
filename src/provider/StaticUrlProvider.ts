export default class StaticUrlProvider {
    private url: string;

    constructor() {
        // Later this could fetch from env, file, etc.
        this.url = 'https://duckduckgo.com/hiring';
    }

    getUrl(): string {
        return this.url;
    }
}