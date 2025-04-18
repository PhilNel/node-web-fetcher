# node-web-fetcher

A modular and headless page renderer built in Node.js using Playwright. It’s designed to render pages using JavaScript and store the full HTML for further parsing.

This component pairs with [perl-web-scraper](https://github.com/PhilNel/perl-web-scraper).

## 🚀 Usage

### Install dependencies:

```bash
npm install
```

### Fetch and save HTML:

```bash
npm run fetch
```

This will:
- Resolve the URL (currently hardcoded to DuckDuckGo’s hiring page)
- Fetch the full page that it will render.
- Save the result to file as rendered.html

##  Dependencies
- playwright – for full page rendering
- Node 18+ (for native ES modules and async/await support)