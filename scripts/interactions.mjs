/**
 * Interaction smoke test: preloader, nav, command palette, reduced motion,
 * and link integrity across the home page and all three case studies.
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

// --- Command palette: Ctrl+K opens it, typing narrows results, Escape
// closes it and returns focus to the trigger, and selecting a result
// actually navigates there (a real <Link>/<a>, not a custom router.push
// that would skip Next's own same-page hash scrolling). ---
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2200));
await p.keyboard.down('Control');
await p.keyboard.press('k');
await p.keyboard.up('Control');
await new Promise((r) => setTimeout(r, 250));
check('Ctrl+K opens the command palette', await p.evaluate(() => !!document.querySelector('[role="dialog"][aria-label="Command palette"]')));
check('Command palette input is focused on open', await p.evaluate(() => document.activeElement?.tagName === 'INPUT'));

await p.keyboard.type('civiquex');
await new Promise((r) => setTimeout(r, 200));
const paletteLabels = await p.evaluate(() => [...document.querySelectorAll('[role="dialog"] ul a, [role="dialog"] ul button')].map((el) => el.textContent ?? ''));
check(
  'Filtering the command palette narrows results',
  paletteLabels.length > 0 && paletteLabels.every((l) => l.toLowerCase().includes('civiquex')),
  paletteLabels.join(', '),
);

await p.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 300));
check('Escape closes the command palette', await p.evaluate(() => !document.querySelector('[role="dialog"][aria-label="Command palette"]')));
check('Focus returns to the search trigger after closing', await p.evaluate(() => !!document.activeElement?.textContent?.includes('Search')));

await p.keyboard.down('Control');
await p.keyboard.press('k');
await p.keyboard.up('Control');
await new Promise((r) => setTimeout(r, 250));
await p.keyboard.type('perfos');
await new Promise((r) => setTimeout(r, 200));
await p.evaluate(() => document.querySelector('[role="dialog"] ul a')?.click());
await new Promise((r) => setTimeout(r, 600));
check('Selecting a case study from the command palette navigates there', p.url().includes('/work/perf-os'), p.url());
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

// --- Mobile tier: a touch device must still get the 3D scenes. This is a
// regression guard for a real bug — the tier heuristic used to treat any
// touch device under 768px (i.e. nearly every phone in portrait) as
// low-tier, which meant no canvas ever mounted on most phones at all. A
// genuinely low-end device (very few cores, very little memory) should
// still fall back to the static SVG, so both are checked. ---
p = await b.newPage();
await p.evaluateOnNewDocument((cores, mem) => {
  Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => cores });
  Object.defineProperty(navigator, 'deviceMemory', { get: () => mem });
}, 6, 4);
await p.emulate({
  viewport: { width: 393, height: 851, deviceScaleFactor: 2.75, isMobile: true, hasTouch: true, isLandscape: false },
  userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
});
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2800));
check('A mid-range phone (touch, 6 cores, 4GB) still gets the 3D scene', (await p.evaluate(() => document.querySelectorAll('canvas').length)) > 0);
await p.close();

p = await b.newPage();
await p.evaluateOnNewDocument((cores, mem) => {
  Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => cores });
  Object.defineProperty(navigator, 'deviceMemory', { get: () => mem });
}, 2, 1);
await p.emulate({
  viewport: { width: 393, height: 851, deviceScaleFactor: 2.75, isMobile: true, hasTouch: true, isLandscape: false },
  userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
});
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2800));
check('A genuinely low-end phone (2 cores, 1GB) still falls back to the static SVG', (await p.evaluate(() => document.querySelectorAll('canvas').length)) === 0);
await p.close();

// --- WebGL context loss: a real GPU failure mode (driver reset, too many
// contexts, mobile OS reclaiming memory), not a hypothetical. Without a
// handler the canvas just goes permanently black. Simulated with the real
// WEBGL_lose_context extension, not a mock, across all 6 scenes — each
// should individually fall back to its already-rendered static SVG, and
// the page must stay fully usable once every context is gone. ---
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 2500));
const canvasesBeforeLoss = await p.evaluate(() => document.querySelectorAll('canvas').length);
for (let i = 0; i < canvasesBeforeLoss; i++) {
  await p.evaluate(() => {
    const canvas = document.querySelectorAll('canvas')[0];
    const gl = canvas?.getContext('webgl2') || canvas?.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  });
  await new Promise((r) => setTimeout(r, 500));
}
const canvasesAfterLoss = await p.evaluate(() => document.querySelectorAll('canvas').length);
check(
  'Every scene falls back to its static SVG after its WebGL context is lost',
  canvasesBeforeLoss > 0 && canvasesAfterLoss === 0,
  `${canvasesBeforeLoss} -> ${canvasesAfterLoss}`,
);
const pageUsableAfterLoss = await p.evaluate(
  () => !!document.querySelector('nav[aria-label="Primary"]') && (document.querySelector('main')?.innerText.length ?? 0) > 500,
);
check('Page remains fully navigable and readable with every context lost', pageUsableAfterLoss);
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

// --- SEO: canonical/OG URLs used to point at a dead placeholder domain
// (bhavanap.dev, which doesn't resolve) instead of the real deployed URL —
// a real bug, not a hypothetical, so it gets a permanent regression guard
// rather than just a one-time fix. These always check against the fixed
// production origin (metadataBase), not BASE — canonical URLs are meant to
// stay constant regardless of which host actually served the request; that
// they don't vary is the correct behaviour, not something to assert away. ---
const CANONICAL_ORIGIN = 'https://bhavanaportfolio-ochre.vercel.app';
const homeHtml = await (await fetch(BASE + '/')).text();
check('No references to the dead bhavanap.dev placeholder domain', !homeHtml.includes('bhavanap.dev'));
check(
  'Canonical tag points at the real deployed origin',
  homeHtml.includes(`<link rel="canonical" href="${CANONICAL_ORIGIN}"`),
);

const robotsTxt = await (await fetch(BASE + '/robots.txt')).text();
check('robots.txt resolves and references the real sitemap URL', robotsTxt.includes(`${CANONICAL_ORIGIN}/sitemap.xml`));

const sitemapXml = await (await fetch(BASE + '/sitemap.xml')).text();
const sitemapHasAllRoutes = ['/resume', '/work/perf-os', '/work/ai-violation-detection', '/work/aveniq'].every(
  (route) => sitemapXml.includes(`${CANONICAL_ORIGIN}${route}`),
);
check(
  'sitemap.xml lists the home page and all 4 sub-routes',
  sitemapXml.includes(`<loc>${CANONICAL_ORIGIN}</loc>`) && sitemapHasAllRoutes,
);

// --- Security headers: present on every response, and the CSP doesn't
// silently break the app. A CSP violation doesn't throw or fail
// navigation — Chrome only logs "Refused to..." to the console — so the
// only way to actually catch a breakage is to listen for it directly,
// across every route, not just assume the policy is compatible. ---
const headerRes = await fetch(BASE + '/');
const cspHeader = headerRes.headers.get('content-security-policy');
check('CSP header present', !!cspHeader, cspHeader ? cspHeader.slice(0, 50) + '…' : 'missing');
check('X-Content-Type-Options: nosniff present', headerRes.headers.get('x-content-type-options') === 'nosniff');
check('X-Frame-Options: DENY present', headerRes.headers.get('x-frame-options') === 'DENY');
check('Referrer-Policy present', !!headerRes.headers.get('referrer-policy'));
check('Permissions-Policy present', !!headerRes.headers.get('permissions-policy'));
check('Strict-Transport-Security present', !!headerRes.headers.get('strict-transport-security'));

p = await b.newPage();
const consoleErrors = [];
p.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
p.on('pageerror', (err) => consoleErrors.push(String(err)));
for (const route of ['/', '/resume', '/work/perf-os', '/work/aveniq', '/work/ai-violation-detection']) {
  await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await new Promise((resolve) => setTimeout(resolve, 1500));
}
const cspViolations = consoleErrors.filter((e) => /content security policy|refused to/i.test(e));
check('No CSP violations across all 5 routes', cspViolations.length === 0, cspViolations.slice(0, 3).join(' | '));
await p.close();

// --- Build log: a live GitHub fetch at build time, not a claimed number —
// so the only two acceptable states are "real data rendered" or "quietly
// absent" (GitHub unreachable at build time). An error string, "NaN", or
// "undefined" leaking into the footer would mean the graceful-fallback
// path itself is broken. ---
p = await b.newPage();
await p.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
await new Promise((r) => setTimeout(r, 800));
const footerText = await p.evaluate(() => document.querySelector('footer')?.textContent ?? '');
const hasBuildLog = /Build log — \d+ public repositories/.test(footerText);
const hasBrokenState = /undefined|NaN|\[object Object\]/.test(footerText);
check(
  'Build log shows real data or is gracefully absent, never a broken state',
  !hasBrokenState && (hasBuildLog || !footerText.includes('Build log')),
  hasBuildLog ? 'live data rendered' : 'absent (no data at build time)',
);
await p.close();

await b.close();
console.log(out.join('\n'));
console.log(`\n${out.filter((l) => l.startsWith('PASS')).length}/${out.length} passed`);
