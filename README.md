# Bhavana P — Cinematic Portfolio (Stages 1–4)

The immersive 3D counterpart to the editorial site at `D:\Portfolio`. Built
in stages per the brief's own plan. **Every link in the top nav and footer
now resolves** — Work, Experience, AI Lab, Recognition, About, Contact and
Resume — plus the project index and all three case studies. Still to come:
a dedicated technology-ecosystem section and a GitHub build log.

Live at **https://bhavanaportfolio-ochre.vercel.app/**. Source at
**https://github.com/BhavanaPatnala/bhavanaportfolio** — every push to
`main` redeploys automatically.

```bash
npm install
npm run dev                 # http://localhost:3000 — safe to leave running
npm run build:qa && npm run start:qa   # a separate .next-qa/ build, port 3100
npm run qa:a11y             # axe-core audit, all 6 routes (needs the qa server)
npm run qa:interactions
```

`build`/`start` (plain) and `build:qa`/`start:qa` are deliberately separate:
see "Dev and QA never share a build" below before ever running a production
build while `npm run dev` is also running.

## What's here

**Home page**, in order:
- **Preloader** — short, skippable line-drawing of the brand mark.
- **Navigation** — floating, condenses to a glass pill on scroll.
- **Hero** — an original 3D "architectural core" (wireframe icosahedron
  shell, a counter-rotating inner module, instanced nodes, a restrained
  particle field), composed in a deliberate left-text/right-object split.
- **The Engineer** — ambient layered-panels backdrop behind the intro copy,
  which names the specifics rather than staying abstract: all 12 years at
  Triad Software Private Limited, all of it on Clariti, now as Principal
  Software Engineer.
- **Clariti** — a `position: sticky` scrollytelling section: five
  translucent layers (Interface → Production) separate in 3D as the
  visitor scrolls through a dedicated 300vh spacer, then the pinned intro
  gives way to the résumé-grounded workstream detail in normal flow — all 7
  workstreams from `data/clariti.ts`, including the Contacts module and the
  release work behind the current role.
- **Engineering Journey** — a second sticky section: the camera travels
  along a gentle curve past four waypoints, one per career stage
  (2014 → 2026). Each role card names the company (`role.company` — every
  one of the four is Triad Software Private Limited, which the card didn't
  actually say until this round) and shows two of that stage's real
  `role.work` bullets, not just the one-line summary.
- **Featured Work** — the project index. Each card gets real physical
  depth on hover (perspective tilt tracking the pointer, a light highlight
  that moves with it) and its own abstract mark, linking to a full case
  study.
- **Recognition — "Beyond the code"** — a fifth environment, and the
  emptiest on the site on purpose: a sparse drifting particle field with a
  handful of larger markers, behind three archives — jury/evaluator
  evidence (`data/events.ts`, 36 real photos across 6 events, each in its
  own `EventCarousel`; an event with no photography yet still renders a
  labelled empty plate rather than a broken or invented image), competition
  awards (`data/awards.ts`), and the certificates themselves as a floating
  glass wall opening the original documents in a lightbox. Placed ahead of
  AI Lab so the record of judging other people's work sits right after the
  work itself, rather than after a section about the model.
- **AI Lab** — a sixth 3D vocabulary: a small signal graph (outer nodes
  feeding a central one, a pulse travelling each edge) standing in for the
  section's actual claim — deterministic code decides, the model explains.
  Grounded entirely in verified material: the two AI-relevant editorial
  positions from `data/thinking.ts`, all three real projects (PerfOS's
  Claude SDK analysis layer, CiviqueX, Aveniq), and a footnote citing the
  Coursera/DeepLearning.AI/Stanford Online "Supervised Machine Learning"
  certification with its verify link.
- **About** — the plainest section on the site, by design: after five 3D
  environments, the sixth thing the visitor needs is not another one. Three
  columns from `data/positioning.ts` (what I build / how I think / what I
  bring) rather than a conventional biography paragraph.
- **Contact** — three channels (email, LinkedIn, GitHub) as large tappable
  rows, plus a site-wide footer (stack credit, socials, résumé link).

**`/resume`** — a single-page CV built from the same `experience.ts` /
`certifications.ts` / `awards.ts` / `skills.ts` data as the rest of the
site (so it can never drift from what the portfolio itself claims), with
a `PrintButton` that hands off to the browser's own print pipeline rather
than shipping a separate PDF binary to keep in sync. `@media print` in
`globals.css` turns the page into a plain light document for that
moment — hides the fixed nav and footer, drops the dark palette to black
text on white, and marks each `.print-break` block to avoid splitting
across a page boundary.

**Three case studies** at `/work/<slug>` — PerfOS, CiviqueX and Aveniq —
each built from real, verified product screenshots (nine per case study
for PerfOS and CiviqueX, five for Aveniq), with the genuinely-undocumented
parts (system architecture, model training, datasets) left as an honest
`ScaffoldSections` slot naming exactly what belongs there, rather than a
guess. A fourth project, "AI Debate System," was removed entirely this
round — it turned out to be the same project as Aveniq, not a separate one.

## Two scroll-driven sections, one shared mechanic

`lib/scrollProgress.ts` exports `useStickyScrollProgress`, written
specifically for the `tall-spacer > sticky-inner` pattern: progress is 0
exactly when the sticky content starts pinning and 1 exactly when it stops
— not the section's full enter-to-exit transit, which is a different (and
wrong) span for this layout. **This distinction was a real bug caught
during this build**: an earlier, more generic progress formula left the
five Clariti layers already two-thirds separated at the moment the pinned
view first became visible, because it measured the wrong span.

The pinned spacer's height must also be decoupled from whatever content
follows it in the DOM — mixing the two (an early version nested the
detail content *inside* the same tall parent as the pin) meant the pin's
actual duration was governed by the height of the unrelated content below
it, not by the story being told. Each pinned section is now: a dedicated
spacer with its own explicit height → the sticky viewport inside it → the
following content as a **sibling**, not a child.

## Adaptive 3D — verified, not assumed

- `lib/deviceTier.ts` / `lib/use3DReadiness.ts` are shared by every 3D
  scene (Hero, Engineer, Clariti, Journey, AI Lab, Recognition): device
  tier, a real WebGL capability check, and idle-deferred readiness so the
  ~700KB Three.js chunk never competes with first interaction (confirmed:
  this alone took TBT from ~900ms to ~250-560ms on hardware-accelerated
  Chrome).
- **Reduced motion or a genuinely low-tier device never loads the WebGL
  chunk at all** for any of the six 3D sections — confirmed via a real
  browser test checking zero network requests for the chunk and zero
  `<canvas>` elements. Each gets its own static SVG fallback holding the
  same silhouette, so the brand identity survives without motion.
- Every Three.js resource built with `useMemo` is disposed through
  `lib/useDisposable.ts` on unmount or dependency change — R3F only
  auto-disposes what it creates directly from JSX children, not objects
  passed in as props.
- `dpr` is capped by tier (2 / 1.25 / 1), never blindly matching the
  device's real pixel ratio.
- **A real bug, found from a live report: most phones never got the 3D
  scene at all, or got it noticeably slow.** `detectDeviceTier()` used to
  route ANY touch device under 768px straight to `'low'` tier — which is
  nearly every phone in portrait, since `'low'` is exactly the tier that
  skips loading the WebGL chunk entirely. Touch input and a narrow
  viewport were being treated as a proxy for "weak GPU," which they are
  not — a modern phone held in portrait isn't a low-end device. The
  heuristic now only routes to `'low'` for genuinely low-spec hardware
  (`hardwareConcurrency <= 2 && deviceMemory <= 2`, or reduced motion);
  every other touch device is capped at `'medium'` instead of excluded —
  same scene, fewer particles, a tighter DPR ceiling, and (new) MSAA
  antialiasing turned off and `powerPreference: 'low-power'` below `'high'`
  tier, both real costs on mobile tile-based GPUs that plain desktop
  testing never surfaces. Verified two ways: emulating a mid-range phone
  (touch, 6 cores, 4GB) now shows all six canvases with `antialias: false`
  in the actual WebGL context, and a genuinely low-end phone (2 cores,
  1GB) still correctly renders zero canvases and gets the static SVG —
  both are now permanent checks in `interactions.mjs`, not just a one-time
  screenshot.
- **Each scene's render loop is gated by `lib/useInView.ts`
  (`IntersectionObserver`), not just its mount.** Every 3D section stays
  mounted once ready — cheap, since context creation already happens once
  during idle time — but only actually renders a frame while its section is
  on screen or about to be (`frameloop="always"` vs `"never"` on R3F's
  `Canvas`). Before this, every section's canvas rendered forever once
  mounted, so scrolling past several sections meant several independent
  WebGL render loops all still running in the background, competing for
  the same main thread — this was the actual cause of scroll feeling heavy
  after visiting a few sections, confirmed directly: at the top of the page
  only Hero's and Engineer's canvases produced any WebGL draw calls, and
  scrolled to Recognition only AI Lab's and Recognition's did — the other
  four sat at zero, and scrolling back up restored the original state
  instantly, with no pop or re-initialization.

## Data

`data/site.ts`, `experience.ts`, `clariti.ts`, `skills.ts`, `projects.ts`,
`thinking.ts`, `certifications.ts`, `events.ts`, `awards.ts` and
`positioning.ts` mirror the already fact-checked content from the
companion site verbatim — copied, not re-derived, so nothing drifts.
Certificate images live under `public/images/certificates/`, event photos
under `public/images/events/<slug>/`. Every `alt` text in `events.ts` was
written from actually reading the photo (or, for the two Smart India
Hackathon items that are a certificate and an award email, reading the
document) rather than a generic caption — that reading is also what
corrected `year` from `null` to `'2025'` for Smart India Hackathon (the
certificate itself says "SIH 2025") and filled in `host: 'SRM Easwari
Engineering College'` for two other events where it had been left
unconfirmed (visible on the ID badges in the photos). An event still
awaiting photography keeps its honest empty plate. `roles` for the four
events that still showed "Role to be confirmed" (India AI Impact Summit,
Hack to the Future, Code Clash — Prep2Placements, Talent Hunt — Tarang)
are now Evaluator/Jury, and Students Industry Outreach gained Mentor
alongside its existing Evaluator — both confirmed directly by their owner,
not inferred from the photos.

## The evidence carousel

Each event with photos gets its own `EventCarousel`: crossfades between
frames with a slow Ken Burns drift on the active one, autoplays while the
card is in view (paused on hover/focus, and never at all under reduced
motion), and answers to dot clicks, arrow buttons, swipe and the keyboard.
Clicking the frame opens the same shared `Lightbox` used elsewhere, at
whichever photo the carousel was actually showing — not always frame one.
It reuses `lib/useInView.ts` (the same hook gating the 3D scenes' render
loops, see below) so an off-screen card's timer stops entirely rather than
ticking uselessly in the background.

## CiviqueX — a case study built from a live product, not a placeholder

The "AI Violation Detection" project used to be an honest scaffold with no
material to show. It now has nine real screenshots from the deployed demo
(`https://civiquex-flax.vercel.app/`) and a case study written from
actually reading them — including opening the login screen to confirm the
four demo roles (Citizen, two Authority roles, Admin), and reading the
technical footnote on an incident's "why this result" panel to get the
exact model names right: `coco-ssd@2.2.3 (lite_mobilenet_v2)` for
detection, `civiquex-iou-tracker@1` for tracking, `Tesseract.js v7 (WASM)`
for plate OCR. The site's own honesty about uncertainty is the throughline
of the "Decisions" section — a plate reading that disagrees across frames
ships as "vehicle number could not be reliably determined," not a
best-guess plate number, and every flag cites the specific rule it matched
rather than asserting a verdict. `PipelineDiagram`, previously hardcoded
to PerfOS's own seven stages, now takes a `stages` prop so both case
studies share the one component instead of two near-identical copies.

Sections 06–09 (Architecture, Model, Datasets, Technical Challenges) were
scaffolds — "awaiting source material" — until the project's owner supplied
the real content directly from the codebase. Rather than paste it in
as-received, it's restructured into the same typed, componentised shape
the rest of the page already uses: a stack as pills, the four architecture
decisions as the same hover-card grid section 05 uses, and — the strongest
material — seven engineering challenges each reduced to a title, the
symptom, the fix, and (where one exists) a monospace before → after metric
in the signature colour, so `/api/incidents 6,435ms → 565ms` reads as data,
not as a sentence buried in a paragraph. Two honesty statements carried
through unedited rather than softened: no custom model was trained, and
real-world plate accuracy is unmeasured — both would fall apart under a
single interview follow-up if overstated.

## Dev and QA never share a build

`next dev` and `next build`/`next start` both write to `.next/` by
default. This project runs `npm run dev` continuously in one terminal
while a separate QA cycle (`npm run build && npm run start`) verifies
routes in another — and running a production build against the same
`.next/` the dev server is using corrupts its live module graph: the
browser still holds chunk references that the build just overwrote or
deleted, so the next client-side navigation 404s fetching one of them and
the page loses its styling entirely (this happened for real, on
`/work/aveniq`, mid-session). The fix is structural, not "remember not to
do that": `next.config.mjs` now points `distDir` at `.next-qa/` whenever
`BUILD_TARGET=qa` is set, and `npm run build:qa` / `npm run start:qa`
(both via `cross-env`, so this works the same in PowerShell, cmd or bash)
set it automatically. `npm run build`/`start` are unchanged and still
target plain `.next/` for anyone who genuinely wants a standalone
production server with nothing else running. Verified by actually doing
the thing that used to break: ran `build:qa` with `dev` live on port 3000
the whole time, confirmed `.next/` was untouched and the dev server still
served a correct page afterward, then reproduced the original bug's exact
repro (click the Aveniq card from the home page, a real client-side
navigation) against the dev server and got zero failed requests.

## Six bugs fixed at their source, not at each call site

`bone-4` (`#6E695D`) was designed as a "large/decorative only" faint tone
and then used for small mono labels in 20+ places across the site anyway —
a token misuse, not a handful of typos. The token itself was corrected to
`#847F73` (verified 4.9:1 on `--void`, 4.58:1 on `--void-raised`), so every
current and future use is safe by construction.

`.eyebrow` (the numeral + rule + label row every section header uses) and
`.hairline` (the full-width 1px divider used on Clariti and every
case-study page) were both applied throughout the codebase — six files and
three files respectively — but neither was ever actually defined as a CSS
class, so the divider in each silently collapsed to zero width. axe-core
has no opinion on flex layout or a 0px-tall div, so nothing caught it
across any of the "already verified, 0 violations" sections that used
them. `.overlay-in`, the Lightbox modal's entrance animation, had the same
gap. All three are now defined once in `globals.css` instead of patched at
each of the nine call sites.

And the dev/QA build collision above — a fourth, structural one.

The fifth showed up only on the CiviqueX case study, at mobile width: a
consistent 58px of horizontal overflow, present the instant the page
loaded and unrelated to scroll position. The cause was the CSS grid/flex
default of `min-width: auto` on a flex or grid child — it refuses to
shrink below its content's own minimum width unless told otherwise. Two
places in `ScreenshotFrame`/`PipelineDiagram` (both shared by every case
study) hit it for the first time here because CiviqueX's captions contain
long technical tokens with no space to break on (`lite_mobilenet_v2`,
`civiquex-iou-tracker@1`) — PerfOS and Aveniq's copy happened to never
trigger it. Fixed with `min-w-0` on the flex/grid children plus
`break-words` on the caption text, which benefits all three case studies,
not just the one that first exposed it. Found by bisection — hiding each
`CaseSection` in turn and rechecking `scrollWidth` — after the more
obvious "long single string" theory (the URL chrome bar, which does use
`truncate`) turned out to already be fixed and not the actual cause.

The sixth was the most consequential: most real phones never showed the 3D
scene at all (see "Adaptive 3D" above for the full account) — a device-tier
heuristic conflated touch input and a narrow viewport with weak hardware,
which routed nearly every phone in portrait to the tier that skips loading
the WebGL chunk entirely. Reported live, from an actual phone, not caught
by any desktop-based test in this project up to that point.

## Verified this round

0 accessibility violations (axe-core, WCAG 2A/2AA) across all 5 routes
(`/`, `/resume`, `/work/perf-os`, `/work/aveniq`,
`/work/ai-violation-detection`), 27/27 interaction checks (preloader,
keyboard, nav condensing, mobile menu, reduced motion, link integrity, a
live fetch confirming all 3 case-study routes and `/resume` resolve 200,
all six top-nav anchors resolving to a real section, an evidence carousel
confirmed to autoplay under normal motion and stay frozen under reduced
motion, and — new this round — a simulated mid-range phone getting the 3D
scene while a simulated low-end phone still correctly doesn't), no
horizontal overflow at 390px on the full home page, `/resume`, or any of
the three case studies, the `@media print` stylesheet verified by computed
style (not just a screenshot, which under headless print-media emulation
is a known unreliable proxy), Lighthouse accessibility 100 / CLS ~0
everywhere, performance consistent with this machine's established load
variance.

This round's changes (the mobile device-tier fix, disabling antialiasing
and lowering the DPR ceiling below `'high'` tier) kept that same 0/0
accessibility result, verified two ways beyond the automated checks: a
screenshot of the actual Hero scene rendering correctly on a simulated
mid-range phone (previously it would have shown nothing at all), and
`WebGLRenderingContext.getContextAttributes()` confirming `antialias:
false` and `powerPreference: 'low-power'` are genuinely applied below
`'high'` tier, not just requested. FPS under artificial 4x CPU throttling
(a synthetic stress test, not a claim about any specific real device)
averaged in the 40-50fps range with occasional dips — a large improvement
over the prior state, which was zero rendering at all on most phones, not
a slow one.

All of the above was re-run against the actual live deployment
(`https://bhavanaportfolio-ochre.vercel.app/`), not just the local build —
0 accessibility violations, 27/27 interaction checks including the two
mobile-tier regression guards, zero console or network errors across all
five routes while scrolling the full page, no horizontal overflow at
390px anywhere, and a screenshot confirming the Hero's 3D scene genuinely
renders on a simulated mid-range phone hitting the production URL. A
local build passing is not the same claim as production working — this is
the first round verified directly against the deployed site rather than
`localhost`.

Two testing caveats worth keeping in mind before trusting any QA run here,
both found and fixed this round:
- A prod server from an earlier session was still holding port 3100, so a
  re-verification pass silently audited a stale build (it surfaced as
  nonsensical white-background contrast failures on pages that hadn't been
  touched). Always confirm the port is free — or that the server log
  shows a fresh `Ready in` line — before trusting an audit's result.
- One page in `interactions.mjs` never called `page.setViewport(...)`
  (Puppeteer's default is 800×600), which silently broke a scroll-offset
  calculation aimed at Recognition — the carousel was never actually
  scrolled into view, so an autoplay check failed for a reason that had
  nothing to do with autoplay. Every page in the suite now sets an
  explicit viewport.

## Command palette (Ctrl/Cmd+K)

The first piece of a staged pass at making the site feel more like an
engineering instrument and less like a brochure — reachable from anywhere on
the site, no mouse required: every nav section, all three case studies, and
the external links (GitHub, LinkedIn, Clariti, the two live demos), filtered
by typing.

Deliberately built to reuse what's already proven rather than invent new
navigation logic: list items are real `<Link>`/`<a>` elements, the same
mobile-menu pattern already shipped in `SiteNav`, not an ARIA
combobox/listbox with synthetic `router.push` activation. That matters
concretely here — Next's same-page hash scrolling (`/#recognition` etc.) is
built into `<Link>`'s click handling, not into the imperative router API, so
reimplementing activation by hand would have quietly broken jumping to a
section from a case-study page. Keyboard highlighting moves real DOM focus
between items (arrow keys), so the existing global `:focus-visible` ring and
Escape/Enter/click behaviour all come for free instead of being rebuilt.

Verified with 6 new permanent regression checks in `interactions.mjs`
(open via Ctrl+K, input auto-focuses, typing narrows results to only
matching entries, Escape closes and returns focus to the trigger, and
selecting a result actually navigates) — 33/33 total, plus a fresh 0/5
accessibility pass and a build/typecheck pass, before anything shipped.

## Security headers

Second staged piece: the site ships a real `Content-Security-Policy` plus
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy` and `Strict-Transport-Security`, all set in
`next.config.mjs`'s `headers()` — no middleware, so it costs nothing extra
at the edge and applies identically to `next start` and the Vercel
deployment.

The policy itself came from auditing the app, not from a template: grepped
the whole codebase first for `dangerouslySetInnerHTML` (one use — the
static Person JSON-LD in `layout.tsx`, built from `site.ts` with no
user-controllable input, confirmed safe rather than assumed safe), `eval`/
`Function()`/`innerHTML =` (zero), every `target="_blank"` (all already
paired with `rel="noopener noreferrer"`), `<form>` (none exist), and every
image source (all local — `next/image`, no remote `domains`/
`remotePatterns` configured). That audit is what let most directives go to
`'none'`/`'self'`: `frame-src 'none'`, `object-src 'none'`,
`form-action 'none'`, `frame-ancestors 'none'`, `connect-src 'self'` — a
site that actually talked to other origins would need a wider policy, not
a stricter-looking one that happens to break on first load.

`script-src`/`style-src` keep `'unsafe-inline'` deliberately rather than
silently: Next's App Router inlines its own hydration payload on every
static page, and a real nonce-based CSP would mean opting the whole site
out of static prerendering via middleware for that alone. The codebase
also uses inline `style={{transitionDelay}}` props and a few
component-scoped `<style>` keyframe blocks throughout (Recognition, AI
Lab, the command palette) — removing `'unsafe-inline'` without a nonce or
hash allowlist breaks those outright, which is precisely the "blindly
added a CSP that breaks the app" failure mode. Since the earlier audit
found no live injection point for it to protect against, this is a
documented defense-in-depth trade-off, not a current gap.

Verified with 7 new permanent checks: the five custom headers resolve on
a direct fetch of `/`, and — because a CSP violation doesn't throw or
fail navigation, it only logs "Refused to…" to the console — a page with
console listeners attached visits all 5 routes and confirms zero CSP
violations actually fired. 40/40 interaction checks passed, 0/5
accessibility violations, clean typecheck and QA build.

## Dependency audit

Third staged piece. `npm audit` surfaces 7 advisories (1 moderate, 6
high), all on two chains: `braces`/`chokidar`/`micromatch` behind
Tailwind 3's dev-time file watcher, and `postcss` bundled inside Next's
own build pipeline. Both are build-time only — neither ships in the
production bundle, and neither ever processes visitor-supplied input;
`chokidar` walks developer-authored glob patterns from
`tailwind.config.ts`, and `postcss` processes developer-authored CSS.
The actual fix for either (`npm audit fix --force`) is a major-version
jump — Tailwind 3→4 (a full config-system rewrite, from
`tailwind.config.ts` to CSS-native `@theme`) or Next 15→16 — exactly the
"blindly apply a fix that breaks the app" failure mode the CSP work
above already reasoned through, just applied to dependencies instead of
headers. Left as a known, documented, low-real-risk item rather than
force-upgraded.

What was safe to do: `npm update` picked up every patch/minor release
already inside the existing `package.json` ranges (Next 15.5.25→15.5.27,
`@react-three/fiber` 9.7.0→9.8.1, `three`, `@react-three/drei`, and
others) — zero change to `package.json` itself, confirmed by diff, only
`package-lock.json` moved. And a grep across the whole codebase for
actual imports found `gsap` and `framer-motion` both fully unused —
listed in `package.json`, resolved in `node_modules`, `framer-motion`
even named in `next.config.mjs`'s `optimizePackageImports`, but zero
`import` sites anywhere. Both removed; bundle sizes in the build output
were unchanged before and after, confirming they were dev-time dead
weight, never actually shipped to a visitor regardless.

Re-verified after both changes: clean typecheck, clean build, 40/40
interaction checks, 0/5 accessibility violations.
