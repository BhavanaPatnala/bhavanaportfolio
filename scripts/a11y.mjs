/**
 * axe-core accessibility audit across every route.
 *   npm run build:qa && npm run start:qa   (in one terminal — a separate
 *                                            .next-qa/ output, safe to run
 *                                            alongside `npm run dev`)
 *   node scripts/a11y.mjs                  (in another)
 */
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:3100';
const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
const routes = ['/', '/resume', '/work/perf-os', '/work/aveniq', '/work/ai-violation-detection', '/work/ai-debate-system'];

const b = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--use-gl=swiftshader'] });
let total = 0;

for (const route of routes) {
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await new Promise((r) => setTimeout(r, route === '/' ? 3000 : 1200));
  await p.evaluate(axe);
  const res = await p.evaluate(async () =>
    window.axe.run(document, { resultTypes: ['violations'], runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } }),
  );
  console.log(`\n=== ${route} — ${res.violations.length} violations`);
  for (const v of res.violations) {
    total++;
    console.log(`  [${v.impact}] ${v.id}: ${v.help}`);
    v.nodes.slice(0, 3).forEach((n) => console.log('     ', n.target.join(' '), '::', n.failureSummary?.split('\n')[1]?.trim().slice(0, 140)));
  }
  await p.close();
}

await b.close();
console.log(`\nTOTAL VIOLATIONS: ${total}`);
