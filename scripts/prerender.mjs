import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
const output = path.join(process.cwd(), 'dist/client');
const template = await readFile(path.join(output, 'index.html'), 'utf8');
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
try {
  const { App, routes, getPage, recipePath } = await server.ssrLoadModule('/src/App.jsx');
  for (const route of [...routes, '/404.html']) {
    const page = getPage(route);
    const canonical = `https://bearsandhound.com${route}`;
    const markup = renderToString(React.createElement(App, { path: route }));
    const metadata = `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:title" content="${escape(page.title)}" /><meta property="og:description" content="${escape(page.description)}" /><meta property="og:type" content="${page.recipe ? 'article' : 'website'}" /><meta property="og:url" content="${escape(canonical)}" />`;
    let schema = '';
    if (page.recipe) {
      const r = page.recipe;
      const method = r.method.length ? r.method : [r.contents[1].replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()];
      const json = { '@context':'https://schema.org', '@type':'Recipe', name:r.title, description:r.description, image:`https://bearsandhound.com/assets/${r.image}`, url:`https://bearsandhound.com${recipePath(r)}`, recipeIngredient:r.ingredients, recipeInstructions:method.map(text => ({'@type':'HowToStep',text})), author:{'@type':'Organization',name:'Bears & Hound'} };
      schema = `<script type="application/ld+json">${JSON.stringify(json).replaceAll('<','\\u003c')}</script>`;
    }
    const html = template.replace(/<title>.*?<\/title>/,`<title>${escape(page.title)}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${escape(page.description)}" />`).replace('</head>',`${metadata}${schema}</head>`).replace('<div id="root"></div>',`<div id="root">${markup}</div>`);
    const filename = route === '/404.html' ? path.join(output,'404.html') : path.join(output,decodeURIComponent(route), 'index.html');
    await mkdir(path.dirname(filename),{recursive:true});
    await writeFile(filename,html);
    // Vite preview and extensionless static hosts resolve /route via /route.html.
    // Directory-index hosts use /route/index.html. Both carry the same page HTML.
    if (route !== '/' && route !== '/404.html') {
      await writeFile(path.join(output, decodeURIComponent(route) + '.html'), html);
    }
  }
  await writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route=>`<url><loc>https://bearsandhound.com${escape(route)}</loc></url>`).join('')}</urlset>`);
  await writeFile(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://bearsandhound.com/sitemap.xml\n');
  await rm(path.join(output,'inspect.html'),{force:true});
  console.log(`Prerendered ${routes.length} pages and a 404 page.`);
} finally { await server.close(); }
