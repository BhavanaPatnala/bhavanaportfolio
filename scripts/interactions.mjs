/**
 * Interaction smoke test: preloader, nav, hero, reduced motion, and link
 * integrity across the home page and all three case studies.
 *   npm run build:qa && npm run start:qa   (in one terminal — a separate
 *                                            .next-qa/ output, safe to run
 *                                            alongside `npm run dev`)
 *   node scripts/interactions.mjs          (in another)
 */
import puppeteer from 'puppeteer-core';
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:3100';
const out = [];
const check = (name, ok, detail = '') => out.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);

const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=swiftshader'] });

// --- Preloader: visible first, then click-to-skip once hydrated ---
let p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 400)); // hydration
check('Preloader visible on first paint', await p.evaluate(() => document.querySelector('[role="status"]')?.getAttribute('aria-hidden') === 'false'));
await p.mouse.click(700, 450);
await p.waitForFunction(() => !document.querySelector('[role="status"]'), { timeout: 3000 }).catch(() => {});
check('Click skips preloader', await p.evaluate(() => !document.querySelector('[role="status"]')));

await p.close();

// --- Keyboard: skip link is the first tab stop on a clean load. Checked on
// its own fresh page — a prior mouse click elsewhere on the page moves the
// browser's own sequential-focus-navigation starting point, which is a
// platform behaviour (and arguably correct UX), not a defect in the page. ---
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 400));
await p.keyboard.press('Tab');
const first = await p.evaluate(() => document.activeElement?.textContent?.trim());
check('First tab stop is skip link', first === 'Skip to content', first);
await p.close();

// --- Nav condenses once there is something to scroll past ---
p = await b.newPage();
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await p.setViewport({ width: 1440, height: 600 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 400));
await p.evaluate(() => window.scrollTo(0, 200));
await new Promise((r) => setTimeout(r, 300));
const padding = await p.evaluate(() => getComputedStyle(document.querySelector('header')).paddingTop);
check('Nav condenses on scroll', padding === '12px', padding);
await p.close();

// --- Mobile menu: open, escape, focus return ---
p = await b.newPage();
await p.setViewport({ width: 390, height: 844 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2200));
await p.evaluate(() => document.querySelector('button[aria-controls="mobile-menu"]').click());
await new Promise((r) => setTimeout(r, 400));
check('Mobile menu opens', (await p.evaluate(() => getComputedStyle(document.getElementById('mobile-menu')).visibility)) === 'visible');
await p.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 400));
check('Escape closes mobile menu', (await p.evaluate(() => document.getElementById('mobile-menu').getAttribute('aria-hidden'))) === 'true');
check('Focus returns to toggle button', await p.evaluate(() => document.activeElement?.getAttribute('aria-controls') === 'mobile-menu'));
await p.close();

// --- Reduced motion: no WebGL chunk requested, no canvas, content visible ---
p = await b.newPage();
const rmRequests = [];
p.on('request', (r) => { if (/HeroCanvas|three\.js|three-/.test(r.url())) rmRequests.push(r.url()); });
await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 1200));
check('Reduced motion never mounts a canvas', (await p.evaluate(() => document.querySelectorAll('canvas').length)) === 0);
check('Reduced motion never requests the 3D chunk', rmRequests.length === 0, rmRequests.join(','));
check('Reduced motion content fully visible', await p.evaluate(() => [...document.querySelectorAll('.reveal, .fade-up')].every((el) => getComputedStyle(el).opacity === '1')));

// Evidence carousels must not autoplay under reduced motion — wait past one
// full autoplay interval (4.8s, plus margin for this test's own evaluate()
// round trips) and confirm the frame counter never moved.
const recogTop = await p.evaluate(() => document.getElementById('recognition')?.getBoundingClientRect().top ?? 0);
await p.evaluate((y) => window.scrollBy(0, y - 100), recogTop);
await new Promise((r) => setTimeout(r, 6200));
const stillOnFirstFrame = await p.evaluate(() =>
  [...document.querySelectorAll('[aria-label^="Open"][aria-hidden="false"]')].every((btn) =>
    btn.getAttribute('aria-label')?.includes('photo 1 of'),
  ),
);
check('Evidence carousels do not autoplay under reduced motion', stillOnFirstFrame);
await p.close();

// --- Link integrity ---
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 1200));
const hrefs = await p.$$eval('a[href]', (as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
const external = hrefs.filter((h) => h.startsWith('http'));
check('External links present', external.length >= 2, external.join(', '));

const projectLinks = hrefs.filter((h) => h.startsWith('/work/'));
check('Project cards link to all 3 case studies', projectLinks.length === 3, projectLinks.join(', '));
for (const href of projectLinks) {
  const res = await fetch(BASE + href);
  check(`Case study resolves: ${href}`, res.ok, String(res.status));
}

// Every top-nav anchor must resolve to a real section — not a dead anchor.
for (const id of ['work', 'experience', 'ai-lab', 'recognition', 'about', 'contact']) {
  check(`Nav anchor #${id} resolves to a section`, await p.evaluate((elId) => !!document.getElementById(elId), id));
}

// Evidence carousel: under normal motion it autoplays (the counterpart to
// the reduced-motion check above), and a manual dot click overrides it.
const recogTop2 = await p.evaluate(() => document.getElementById('recognition')?.getBoundingClientRect().top ?? 0);
await p.evaluate((y) => window.scrollBy(0, y - 100), recogTop2);
await new Promise((r) => setTimeout(r, 6000));
const advanced = await p.evaluate(() => {
  const btn = document.querySelector('[aria-label^="Open"][aria-hidden="false"]');
  return btn?.getAttribute('aria-label') ?? '';
});
check('Evidence carousel autoplays under normal motion', !advanced.includes('photo 1 of'), advanced);

const dot = await p.$('button[aria-label="Go to photo 1"]');
if (dot) await dot.click();
await new Promise((r) => setTimeout(r, 400));
const afterDotClick = await p.evaluate(() => {
  const btn = document.querySelector('[aria-label^="Open"][aria-hidden="false"]');
  return btn?.getAttribute('aria-label') ?? '';
});
check('Clicking a dot jumps the carousel to that photo', afterDotClick.includes('photo 1 of'), afterDotClick);
await p.close();

// /resume — nav, footer and the resume page's own "Portfolio" link all
// point here; check it's a real, populated route, not the 404 it used to be.
const r = await fetch(BASE + '/resume');
check('/resume resolves', r.ok, String(r.status));

await b.close();
console.log(out.join('\n'));
console.log(`\n${out.filter((l) => l.startsWith('PASS')).length}/${out.length} passed`);
