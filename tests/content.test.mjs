import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const data = JSON.parse(readFileSync(new URL('../src/content.json',import.meta.url)));
test('all migrated recipes retain distinct URLs, artwork, ingredients and cooking instructions', () => {
  assert.equal(data.recipes.length,12);
  assert.equal(new Set(data.recipes.map(r => r.slug)).size,12);
  for(const r of data.recipes) {
    assert.ok(r.title && r.description && r.ingredients.length > 0,r.slug);
    assert.ok(r.contents[0].includes('<li>'),r.slug);
    assert.ok(r.contents[1].length > 100,r.slug);
    assert.ok(readFileSync(new URL(`../public/assets/${r.image}`,import.meta.url)).length > 1000,r.image);
    assert.ok(!/<(?:script|iframe)|\son\w+=/i.test(r.contents.join('')),r.slug);
  }
  assert.ok(data.recipes.find(r=>r.slug==='perfect-rice').contents[1].includes('16 minutes'));
});
test('collection cards and memories resolve to local artwork and named external destinations', () => {
  for(const [key,count] of [['books',8],['wine',6],['tools',8]]) {
    assert.equal(data.collections[key].length,count);
    for(const item of data.collections[key]) {
      assert.ok(item.title);
      assert.equal(new URL(item.href).protocol,'https:');
      assert.ok(readFileSync(new URL(`../public/assets/${item.image}`,import.meta.url)).length > 1000);
    }
  }
  assert.equal(data.memories.length,17);
  for(const image of data.memories) assert.ok(readFileSync(new URL(`../public/assets/${image}`,import.meta.url)).length > 1000);
});
test('built recipe pages expose content, unique metadata and Recipe schema without JavaScript', () => {
  assert.ok(existsSync(new URL('../dist/client/index.html',import.meta.url)),'run npm run build before npm test');
  for(const r of data.recipes) {
    const html = readFileSync(new URL(`../dist/client/recipes/${encodeURIComponent(r.slug)}/index.html`,import.meta.url),'utf8');
    assert.ok(html.includes(r.title.replaceAll('&','&amp;')),r.slug);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.name,r.title);
    assert.ok(schema.recipeInstructions.length);
    assert.ok(html.includes('rel="canonical"'));
    const flat = readFileSync(new URL(`../dist/client/recipes/${encodeURIComponent(r.slug)}.html`,import.meta.url),'utf8');
    assert.equal(flat,html,'extensionless and directory-index hosts must receive identical page HTML');
  }
});
