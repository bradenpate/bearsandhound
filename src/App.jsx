import React, { useEffect, useRef, useState } from 'react';
import content from './content.json';

const asset = name => `/assets/${name}`;
const sections = ['Recipes', 'Books', 'Wine', 'Tools'];
export const recipePath = r => `/recipes/${encodeURIComponent(r.slug)}`;
export const routes = ['/', ...sections.map(s => `/${s.toLowerCase()}`), ...content.recipes.map(recipePath)];
export function getPage(path) {
  let decoded;
  try { decoded = decodeURIComponent(path).replace(/\/+$/, '') || '/'; } catch { return { kind: 'missing', title: 'Page not found' }; }
  if (decoded === '/') return { kind: 'home', title: 'Bears & Hound', description: 'Recipes and more that we love from the kitchen of two bears and their hound.' };
  if (decoded === '/recipes') return { kind: 'recipes', title: 'Recipes | Bears & Hound', description: 'Our favorite recipes from the kitchen of Braden, Isaiah and Harriet.' };
  const category = sections.slice(1).find(s => decoded === `/${s.toLowerCase()}`);
  if (category) return { kind: category.toLowerCase(), title: `${category} | Bears & Hound`, description: `Our favorite ${category.toLowerCase()} from Bears & Hound.` };
  const recipe = content.recipes.find(r => decoded === `/recipes/${r.slug}`);
  if (recipe) return { kind: 'recipe', recipe, title: `${recipe.title} | Bears & Hound`, description: recipe.description };
  return { kind: 'missing', title: 'Page not found | Bears & Hound', description: 'Find your way back to our kitchen.' };
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const nav = useRef(null);
  useEffect(() => {
    function keydown(e) { if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }
    function outside(e) { if (open && !nav.current?.contains(e.target)) setOpen(false); }
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', outside); };
  }, [open]);
  return <header ref={nav} className={`site-header ${open ? 'menu-open' : ''}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <a className="brand" href="/" aria-label="Bears and Hound home"><img src={asset('wordmark.svg')} alt="Bears and Hound" width="284" height="34" /></a>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(v => !v)}>{open ? 'Close' : 'Menu'}</button>
    <nav id="navigation" aria-label="Main navigation" className={open ? 'is-open' : ''}>
      {sections.map((s, i) => <a key={s} className={`nav-${i}`} href={`/${s.toLowerCase()}`} aria-current={path.startsWith(`/${s.toLowerCase()}`) ? 'page' : undefined}>{s}</a>)}
    </nav>
  </header>;
}
function Footer({ home = false }) {
  return <footer className="site-footer"><div className="footer-inner">
    <a href="/" className="footer-brand" aria-label="Bears and Hound home"><img src={asset('wordmark-stacked.svg')} alt="" width="240" height="119" /><img src={asset('bears-white.svg')} alt="" width="186" height="159" /></a>
    <div className="footer-copy"><p>{home ? 'Check back for more recipes, tools, and finds throughout the year.' : 'Recipes we love from the kitchen of two bears and their hound.'}</p>{!home && <p className="signature">– Braden, Isaiah &amp; Harriet</p>}</div>
  </div></footer>;
}
const categoryCards = [
  { title:'Recipes', image:'yj9i2yOrLYXjIF1IELKRochv4.webp', color:'#7d0f4d' },
  { title:'Books', image:'RuocgjJDfYhm4ZJqcnHSbSYOaI.webp', color:'#0f7d79' },
  { title:'Wine', image:'kLNXUl1i7MijoUiYETlcqz3lZIo.webp', color:'#7d7b0f' },
  { title:'Tools', image:'8Z0M4O24ds4wTnOrVOZx5e3Io8.webp', color:'#123e75' },
];
function Categories({ omit }) {
  return <div className="category-grid">{categoryCards.filter(c => c.title.toLowerCase() !== omit).map(c => <a className={`category-card category-${c.title.toLowerCase()}`} key={c.title} href={`/${c.title.toLowerCase()}`}>
    <h2>{c.title.toUpperCase()}</h2><div className="category-image" style={{backgroundColor:c.color}}><img className="texture" src={asset('uPyhEublpcAWJ24ZGr7dVNbBw.webp')} alt="" loading="lazy" /><img className="category-object" src={asset(c.image)} alt="" loading="lazy" /></div>
  </a>)}</div>;
}
function RecipeGrid({ recent = false }) {
  return <div className="recipe-grid">{content.recipes.slice(0,recent ? 6 : undefined).map((r,i) => <a className="recipe-card" href={recipePath(r)} key={r.slug}>
    <img src={asset(r.image)} alt="" width="1240" height="680" loading={recent || i > 2 ? 'lazy' : 'eager'} /><h2>{r.title}</h2>
  </a>)}</div>;
}
const memoryDescriptions = [
  'Isaiah and Harriet on a snowy walk', 'Harriet relaxing beside the Christmas tree', 'A Christmas cuddle with Harriet',
  'Two people at a family celebration', 'Braden and Isaiah dressed for a celebration', 'Harriet relaxing on the lawn',
  'Holding babies with family in the kitchen', 'Isaiah with birthday cakes', 'Braden and Isaiah beside a fountain in Italy',
  'Isaiah at an outdoor restaurant', 'Visiting the Mouth of Truth in Rome', 'Braden and Isaiah outside the Pantheon',
  'Sharing a glass of white wine', 'Fresh pasta being made in a restaurant', 'Braden and Isaiah visiting a sculpture museum',
  'Red wine over dinner together', 'A black and white family group portrait',
];

function Memories() {
  const rail = useRef(null);
  const [position, setPosition] = useState(0);
  function move(direction) {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = (card?.getBoundingClientRect().width || el.clientWidth) + 10;
    const current = Math.round(el.scrollLeft / step);
    const visible = Math.max(1, Math.round(el.clientWidth / step));
    const max = Math.max(0, content.memories.length - visible);
    let target = current + direction;
    if (target > max) target = 0;
    if (target < 0) target = max;
    el.scrollTo({left:target * step, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
    setPosition(target);
  }
  return <section className="memories" aria-labelledby="memories-title" aria-roledescription="carousel">
    <h2 className="section-title" id="memories-title">2025 MEMORIES</h2>
    <div className="memory-wrap"><div className="memory-rail" ref={rail} onScroll={e => { const el = e.currentTarget; const step = (el.firstElementChild?.getBoundingClientRect().width || el.clientWidth) + 10; setPosition(Math.round(el.scrollLeft / step)); }} tabIndex="0" aria-label="2025 photo memories. Scroll to browse." onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault();move(e.key === 'ArrowRight' ? 1 : -1); } }}>
      {content.memories.map((image,i) => <img key={image} src={asset(image)} alt={memoryDescriptions[i] || 'A memory from 2025'} loading="lazy" width="768" height="1024" />)}
    </div><button className="memory-prev" onClick={() => move(-1)} aria-label="Previous memory"><img src={asset('6tTbkXggWgQCAJ4DO2QEdXXmgM.svg')} alt="" /></button><button className="memory-next" onClick={() => move(1)} aria-label="Next memory"><img src={asset('11KSGbIZoRSg4pjdnUoif6MKHI.svg')} alt="" /></button></div>
    <span className="sr-only" aria-live="polite">Showing memories starting at {position + 1} of {content.memories.length}</span>
  </section>;
}
function Home() {
  return <><section className="intro"><img src={asset('ggw3dHTazzqCcvtqJQFjDX8fE.webp')} alt="Two bears cooking with their hound Harriet" width="305" height="292" fetchPriority="high" /><div><h1>Recipes and more that we love from the kitchen of two bears and their hound.</h1><p className="signature">– Braden, Isaiah &amp; Harriet</p></div></section>
    <Categories /><Memories /><section className="recent" aria-labelledby="recent-title"><h2 className="section-title" id="recent-title">RECENT RECIPES</h2><RecipeGrid recent /></section></>;
}
function Collection({ type }) {
  return <><h1 className="sr-only">Our favorite {type}</h1><div className={`collection-grid ${type}`}>
    {content.collections[type].map((item,i) => <a className={`collection-item item-${i}`} href={item.href} key={item.title} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} (opens in a new tab)`}>
      <img src={asset(item.image)} alt={item.title} loading={i < 2 ? 'eager' : 'lazy'} width="1440" height="1080" /><span className="collection-label">{item.title}<span className="sr-only"> (opens in a new tab)</span></span>
    </a>)}
  </div><Categories omit={type} /></>;
}
function Recipe({ recipe:r }) {
  const i = content.recipes.indexOf(r);
  const previous = content.recipes[i - 1];
  const next = content.recipes[i + 1];
  return <article className="recipe-detail" style={{'--recipe-color':r.color}}>
    <div className="recipe-hero"><img src={asset(r.image)} alt={`Illustration of ${r.title}`} width="1240" height="680" fetchPriority="high" /><div className="recipe-summary"><div><h1>{r.title}</h1><p>{r.description}</p></div></div></div>
    <div className="recipe-actions"><a href="#ingredients">Ingredients</a><a href="#method">Jump to method</a><button onClick={() => window.print()}>Print recipe</button></div>
    <div className="recipe-body"><section id="ingredients"><h2>Ingredients</h2><div dangerouslySetInnerHTML={{__html:r.contents[0]}} /></section><section id="method"><h2>Method</h2><div dangerouslySetInnerHTML={{__html:r.contents[1]}} /></section></div>
    <nav className="recipe-pagination" aria-label="More recipes"><div>{previous ? <a href={recipePath(previous)}>‹ {previous.title}</a> : <a href="/recipes">All recipes</a>}</div><div>{next ? <a href={recipePath(next)}>{next.title} ›</a> : <a href="/recipes">All recipes ›</a>}</div></nav>
  </article>;
}
export function App({ path = typeof window !== 'undefined' ? window.location.pathname : '/' }) {
  const page = getPage(path);
  useEffect(() => { document.title = page.title; }, [page.title]);
  return <><Header path={path} /><main id="main" tabIndex="-1">
    {page.kind === 'home' ? <Home /> : page.kind === 'recipes' ? <><h1 className="sr-only">Recipes</h1><RecipeGrid /><Categories omit="recipes" /></> : page.kind === 'recipe' ? <Recipe recipe={page.recipe} /> : page.kind === 'missing' ? <section className="not-found"><h1>That page has left the kitchen.</h1><p>Find a favorite recipe or head back home.</p><a href="/recipes">Browse recipes</a><a href="/">Back home</a></section> : <Collection type={page.kind} />}
  </main><Footer home={page.kind === 'home'} /></>;
}
