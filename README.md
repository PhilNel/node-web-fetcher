# node-web-fetcher

A Node.js utility that renders JavaScript-heavy web pages (like DuckDuckGo’s careers page) and stores the resulting HTML for downstream scraping.g.

Designed to run both locally and in AWS Lambda using puppeteer-core and @sparticuz/chromium.

This component pairs with [perl-web-scraper](https://github.com/PhilNel/perl-web-scraper).

## 🛠 Installation

Dependencies are managed using npm and can be installed as follows:

```bash
npm install
```

## 🧪 Usage

Run the full flow:

```bash
npm run fetch
```

This will:
- Resolve the URL (currently hardcoded to DuckDuckGo’s hiring page)
- Fetch the full page that it will render.
- Save the result to file as rendered.html

## 📦 Packaging
To prepare the Lambda zip file:

```bash
make package
```

This will:
- Install production-only dependencies
- Copy all required files into dist/
- Create a zip file that can be uploaded to S3

## 🔧 Dependencies
Runtime:
- `puppeteer-core` – headless browser rendering
- `@sparticuz/chromium` – Lambda-compatible Chromium binary

Dev only:
- `dotenv` – loads local environment variables
- `eslint` - for linting the project source code
