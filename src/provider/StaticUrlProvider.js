class StaticUrlProvider {
    getUrl() {
        // Later this could fetch from env, file, etc.
        return 'https://duckduckgo.com/hiring';
    }
}

module.exports = StaticUrlProvider;
