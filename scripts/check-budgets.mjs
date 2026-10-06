import { readFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const distDir = process.env.BUILD_TARGET === 'qa' ? '.next-qa' : '.next';
const manifestPath = join(distDir, 'app-build-manifest.json');

if (!existsSync(manifestPath)) {
  console.error(`No build manifest at ${manifestPath}. Run the build first.`);
  process.exit(1);
}

const { pages } = JSON.parse(readFileSync(manifestPath, 'utf8'));

// Gzipped JavaScript a visitor downloads to render a route: the shared layout
// chunks plus the route's own chunks, each counted once. Matches the
// definition behind Next's "First Load JS" column.
const gzipKiB = (file) => gzipSync(readFileSync(join(distDir, file))).length / 1024;
const routeJs = (route) => {
  const files = new Set([...(pages['/layout'] ?? []), ...(pages[route] ?? [])]);
  return [...files].filter((f) => f.endsWith('.js')).reduce((sum, f) => sum + gzipKiB(f), 0);
};

// Ceilings sit about 5% above the figures measured when they were set, so
// ordinary changes pass but a genuine weight regression fails the check.
const budgets = [
  { route: '/page', label: 'Home', maxKiB: 135 },
  { route: '/work/perf-os/page', label: 'PerfOS case study', maxKiB: 125 },
  { route: '/work/aveniq/page', label: 'Aveniq case study', maxKiB: 125 },
  { route: '/work/ai-violation-detection/page', label: 'CiviqueX case study', maxKiB: 125 },
  { route: '/resume/page', label: 'Resume', maxKiB: 118 },
];

let failed = 0;
for (const { route, label, maxKiB } of budgets) {
  if (!pages[route]) {
    console.error(`MISSING  ${label}: route ${route} not in manifest`);
    failed += 1;
    continue;
  }
  const size = routeJs(route);
  const ok = size <= maxKiB;
  if (!ok) failed += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${size.toFixed(1)} KiB gzipped JS (budget ${maxKiB} KiB)`);
}

if (failed > 0) {
  console.error(`\n${failed} budget(s) exceeded or missing.`);
  process.exit(1);
}
console.log('\nAll JavaScript budgets met.');
