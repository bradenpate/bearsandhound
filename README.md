# Bears & Hound

Rebuild of [bearsandhound.com](https://bearsandhound.com), migrated from Framer after desktop and 390 × 844 responsive inspection on October 29, 2026.

The site preserves the original wordmarks, Lydian and EB Garamond typography, illustrations, recipe copy, collections and 17 photographs. It contains the homepage, recipe index, 12 recipe detail pages, Books, Wine and Tools. Original recipe slugs, including the accented `ragù` slug, are preserved.

## Develop

Use a current Node.js LTS release.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

## Build and check

```sh
npm run build
npm test
npm run test:sites
```

The build prerenders all 17 public pages plus a not-found page into `dist/client/`. Each recipe's HTML includes its content and Recipe JSON-LD. It also generates canonical links, page descriptions, Open Graph metadata, `sitemap.xml` and `robots.txt`.

`dist/server/index.js` and `dist/.openai/hosting.json` support the bundled Sites runtime. The app can also be served from `dist/client/` on a static host that supports directory index files. Configure that host to serve `404.html` with HTTP 404 for unknown URLs. The included worker retains its SPA fallback for unrecognized browser routes.

No production hosting, repository visibility, custom domain or DNS settings are changed by this rebuild. Point a chosen static host at this repository and its build output when ready to replace the Framer deployment.

## Edit content

- `src/content.json`: recipe text, original asset filenames, collection names and destinations, memory photo order.
- `src/App.jsx`: page components, navigation and carousel behavior.
- `src/styles.css`: responsive layouts, typography and print styles.
- `public/assets/`: optimized local WebP images, original SVG wordmarks and fonts.
- `asset-sources.json`: provenance for the original downloaded assets. PNG/JPEG images are converted to WebP for the app; the original remote URLs are documentation only.

Update recipe ingredient/method HTML together with their structured-data arrays in `content.json`. Perfect Rice uses paragraph-based instructions in the source; the build preserves those instructions and includes them in its schema.

## Corrections and improvements

- A named menu button with expanded state, Escape dismissal and focus return.
- Named home links and product links; meaningful photo descriptions and a skip link.
- One page-level heading per route, followed by semantic section headings.
- Recipe ingredients increased from 16px to 18px, with more line spacing.
- Recipe jump links, print styles and previous/next navigation.
- A manual carousel with buttons, keyboard navigation, native horizontal scrolling and reduced-motion support. It does not move automatically while someone is reading.
- Original images and fonts served locally. Images are resized and converted to WebP, with lazy loading below the initial viewport.
- Unique page metadata and prerendered HTML for crawlers and browsers without JavaScript.
- Shopping destinations retain the original products, with Amazon tracking parameters removed.

See `design-qa.md` for visual comparisons, browser checks and verification limits.
