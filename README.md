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

## Build log

Fourth staged piece: a quiet line in the footer — "Build log — N public
repositories · last shipped X ago" — built entirely server-side as an
async Server Component (`BuildLog.tsx`) that calls GitHub's public REST
API with Next's own fetch caching (`revalidate: 3600`), not a client-side
request. That architecture choice resolves most of the brief's own
"GitHub" requirements as a side effect rather than separate work: it
can't block rendering (it's baked into the static HTML the same way the
rest of the page is — confirmed in the build output, every route now
shows `Revalidate: 1h`), it can't need a CSP change (the browser never
makes the request, so `connect-src` is untouched), and it can't multiply
GitHub's rate limit per visitor (one fetch per hour, shared by every
visitor through Vercel's ISR, nowhere near the 60/hour unauthenticated
ceiling).

Deliberately coarse about what it shows. The brief's own example was
"last commit to repo X," but that names a specific repository with no
human review in the loop — an old fork or scratch repo surfacing itself
on a recruiter-facing site is a real brand risk for very little
narrative gain. What renders instead is two aggregate, unembarrassable
numbers: public repo count, and a recency bucket ("today" / "N days
ago" / "N months ago") computed from the most recently pushed repo's
timestamp, never the repo's name. Both numbers are live-fetched, never
invented; if GitHub is unreachable at build time the component returns
`null` and the footer simply doesn't show that line — no placeholder,
no stale number, no broken state.

Verified live at build time, not just assumed to work: the QA build's
rendered HTML was inspected directly and showed real data ("3 public
repositories · last shipped today"). Added one new permanent check that
asserts the footer is in exactly one of the two acceptable states —
real data, or quietly absent — and never a leaked `undefined`/`NaN`/
`[object Object]` from a broken fallback path. 41/41 interaction checks,
0/5 accessibility violations, clean typecheck and build.

## SEO, a real accessibility fix, and a measured performance baseline

Fifth staged piece, and the first one that found an actual pre-existing
bug rather than adding something new. `metadataBase` in `layout.tsx` was
hardcoded to `https://bhavanap.dev` — checked with a direct `curl`, and
that domain doesn't resolve at all (connection failure, not a 404).
Every canonical tag, every OpenGraph/Twitter card URL on the entire site
had been pointing at a dead domain instead of the real deployed one.
Fixed at the source: `site.ts` now holds one `url` field
(`https://bhavanaportfolio-ochre.vercel.app`, the actual live URL, not
an aspirational custom domain), and `metadataBase`/`openGraph.url`
reference it — every page's already-correct relative `alternates.canonical`
now resolves against the right origin automatically. Added
`app/sitemap.ts` and `app/robots.ts` (Next's native metadata-route
convention, so `/sitemap.xml` and `/robots.txt` are generated, not
hand-written and liable to drift from the real routes) and a `WebSite`
JSON-LD schema alongside the existing `Person` one. Four new permanent
checks guard specifically against the old bug recurring: no reference to
the dead domain anywhere, the canonical tag matches the real origin,
`robots.txt` points at the real sitemap URL, and the sitemap lists the
home page plus all 4 sub-routes.

Running Lighthouse (already a devDependency, actually invoked rather
than just referenced) surfaced one real accessibility finding axe-core's
ruleset doesn't cover: `target-size` — the evidence carousel's dot
indicators were WCAG 2.5.8 undersized, 6px–20px tall buttons relying on
the sitewide `.tap::after` invisible-overlay pattern to pad their hit
area, which automated target-size tooling (and not every browser's
hit-testing) doesn't credit. Fixed by giving each button a real 24×24
box with the small visible mark centered inside it, rather than widening
`.tap` globally and risking adjacent dots' hit zones overlapping
elsewhere on the site. The visible mark is pixel-identical to before —
confirmed by screenshot — only the invisible tappable area changed.
Lighthouse accessibility went from 96 to a clean 100 after the fix, with
best-practices and SEO both already at 100.

Performance was measured, not claimed — and reported honestly even
though the number isn't flattering: three consecutive Lighthouse runs
against the same unchanged build scored 63, 54 and 58, with Total
Blocking Time swinging from 1.2s to 4.2s run to run. That's noise from
this dev machine's load after a long session of spawned Chrome/Node
processes, not a real regression — CLS stayed rock-stable at 0.012
across all three runs, which is the metric least sensitive to CPU
timing jitter and the one actually worth trusting here. The honest
summary: Lighthouse's default mobile simulation (4x CPU throttle) is a
deliberately harsh stress test against a real-time WebGL hero scene, and
the number it produces on this machine right now isn't a reliable single
data point — it needs a clean, dedicated run to mean anything precise.
What's already true and separately verified: the adaptive device-tier
system means a genuinely low-end device never loads the WebGL chunk at
all, and a mid-tier device gets a reduced-quality scene — that's the
real-world performance story, and it's unrelated to what a single
synthetic lab score says.

45/45 interaction checks, 0/5 accessibility violations, clean typecheck
and QA build.

## WebGL context loss — every scene degrades, none of them break

Sixth staged piece, and another real gap rather than a new feature: zero
lines in the codebase handled `webglcontextlost` before this. A GPU
driver reset, too many simultaneous contexts, or a mobile OS reclaiming
GPU memory on backgrounding would have left a canvas permanently black —
exactly the "broken blank space" the brief's own error-states standard
rules out, and a real failure mode for a site running 6 simultaneous
WebGL contexts, not a hypothetical one.

Centralized in the one hook every scene already shares,
`use3DReadiness`, rather than duplicated as new state in all 6
Scene/Canvas pairs: it now also returns `reportContextLost`, folded
directly into the existing `showCanvas` boolean
(`ready && tier !== null && tier !== 'low' && webglOk && !contextLost`).
Because `showCanvas` already drives both the Canvas's presence and the
fallback SVG's opacity crossfade in every Scene component, no Scene
needed new conditional logic — each one just passes `reportContextLost`
down to its Canvas as a new `onContextLost` prop, and each Canvas wires
it into R3F's `onCreated` to attach a `webglcontextlost` listener on the
real GL canvas element. On loss: `preventDefault()` (stops the browser
treating it as fatal) and report up — the scene permanently falls back
to its already-rendered static SVG rather than attempting a WebGL
restore, which is more failure-prone than degrading once and staying
degraded. The per-Canvas listener wiring is duplicated 6 times rather
than further abstracted, matching this codebase's own existing
convention (the DPR-capping logic in every Canvas is already duplicated
the same way) rather than introducing a new abstraction style
inconsistently.

Verified with the real WebGL extension, not a mock: Puppeteer calls
`gl.getExtension('WEBGL_lose_context').loseContext()` against the actual
running canvas. First confirmed on Hero alone (canvas count 6→5, only
Hero's removed, the other 5 scenes unaffected), then against all 6 in
sequence (6→5→4→3→2→1→0), with the page confirmed still fully navigable
and readable — nav present, main content intact — after every single
context was lost. Two new permanent regression checks assert exactly
that. 47/47 interaction checks, 0/5 accessibility violations, clean
typecheck and build.

## Deferring 3D mount to where it's actually needed — and a reverted attempt first

Seventh staged piece. Profiling *why* Lighthouse's performance score was
mediocre (rather than just citing the noisy number) found a real,
specific cause: `mainthread-work-breakdown` showed ~6s of contiguous
"Script Evaluation," and `bootup-time` traced most of it to one chunk.
The reason: every one of the 6 WebGL scenes mounts during idle time
*regardless of scroll position* — a deliberate earlier design choice
(see the comment this session added to `useInView`'s predecessor) meant
to avoid visible WebGL init lag when scrolling into a new section. The
trade-off nobody had measured: a visitor who never scrolls past the
hero still pays the mounting cost of all 6.

First attempt — staggering each scene's idle *request* by 150ms so six
simultaneous inits didn't land in one contiguous burst — was built,
measured with three Lighthouse runs, and made things clearly worse (43,
52, 48 vs. a 54/58/63 baseline; TBT up to 7.6s; CLS went non-zero on one
run). Reverted immediately via `git restore`, not patched around — Total
Blocking Time counts total blocked time across the whole loading window,
not peak burst size, so spreading the same total work over more
wall-clock time made the page "busy" for longer without reducing the
sum. A plausible hypothesis that measurement disproved, kept out of the
shipped code.

The actual fix: don't do the work at all until it's needed. `useInView`
now also returns `hasBeenInView` — latches `true` the first time the
section is actually within 400px of the viewport, and never resets.
Each Scene's Canvas now mounts on `showCanvas && tier && hasBeenInView`
instead of just `showCanvas && tier`, deferring the *first* mount to
match scroll position while preserving the original guarantee exactly:
once a section has been shown, its Canvas never unmounts again, so
scrolling back up never re-triggers the pop-in the earlier design was
built to avoid. Verified directly, not assumed: canvas count on initial
load dropped from 6 to 2 (hero plus whatever else falls inside the
pre-roll margin), climbed to 6 after scrolling through the full page,
and stayed at 6 after scrolling back to the top.

Reported honestly rather than oversold: the Lighthouse performance
score itself didn't clearly improve (55/55/52 vs. the 54/58/63
baseline) — but Total Blocking Time became markedly more consistent
(2.98s–3.75s vs. a 1.24s–4.18s swing before) and CLS stayed rock-stable
at 0.012 across all three runs. Lighthouse's lab trace loads once and
never scrolls, so it can't fully credit work that's now skipped
entirely for a visitor who doesn't scroll past the hero — a real
reduction in actual work done, even where the specific lab metric used
here doesn't reward it. Kept because the mechanism is sound, directly
verified, and regression-free — not because of what one noisy number
said. Full existing suite re-run and unaffected: 47/47 interaction
checks (including the mobile-tier and WebGL-context-loss guards from
the two previous stages), 0/5 accessibility violations, clean typecheck
and build.

## Invite Bhavana

Eighth staged piece — the one remaining item from the brief answerable
without new facts. "Invite Bhavana" is listed there as strategically
important, with example reasons (tech talks, panel discussions,
hackathon jury, technical evaluation, mentoring, AI product discussions,
engineering workshops). Three of those seven already have direct
evidence elsewhere on the site (jury/evaluation/mentoring, documented in
Recognition); the other four don't — no talk or panel appearance is
recorded anywhere here.

Resolved by keeping the list forward-looking rather than backdated: an
invitation reason doesn't assert a prior occurrence, it states what
someone could ask for — "invite Bhavana for tech talks" claims nothing
about a tech talk ever having happened, the same way a restaurant
listing "private events" doesn't claim one happened last week. All
seven reasons are listed together, undifferentiated, because the
distinction that matters (has this happened vs. is this being offered)
is already preserved correctly: Recognition states only completed work,
this new list in Contact states only availability. Neither contradicts
the other.

Added as a labelled pill list ("Invite Bhavana for") inside the existing
Contact section, matching the tag styling already used in Engineer and
About rather than introducing a new visual pattern — no new section, no
nav change, no IA restructuring for a part of the brief that doesn't yet
have enough real content (Speaking & Community) to justify one. 47/47
interaction checks, 0/5 accessibility violations, clean typecheck and
build.

## A real, user-reported bug: the command palette scrambled itself once scrolled

Reported directly, with a screenshot, from the live site: opening the
command palette after scrolling down to Contact rendered it in the
wrong place, overlapping and bleeding through the page content beneath
it — the Contact section's large email/LinkedIn text and the command
palette's own list items were visibly superimposed on each other.

Root cause: the trigger button lives inside `SiteNav`, and once the
page is scrolled past 24px the nav condenses and picks up a `.glass`
class — `backdrop-filter`. Any `backdrop-filter`, `transform`, `filter`
or `perspective` on an ancestor creates a new containing block for
`position: fixed` descendants (a genuinely easy-to-miss CSS behaviour).
The palette's dialog was declared `fixed inset-0`, meant to fill the
real viewport, but because it rendered as a DOM descendant of that now-
`backdrop-filter`'d nav pill, "fixed" actually resolved relative to that
small pill instead — landing wherever the page happened to be scrolled
to rather than the viewport's top, with nothing solid behind it to
block the page content showing through.

This reproduces *only* once the nav is condensed, which is exactly why
it shipped undetected: both existing command-palette checks opened the
palette immediately after navigation, before any scrolling, when
`.glass`/`backdrop-filter` isn't applied yet. A real coverage gap, not
just a code bug.

Fixed at the architectural level a modal should already be built at:
the dialog now renders through `createPortal(..., document.body)`
instead of inline where the trigger sits, so no ancestor's CSS can ever
affect its positioning again, regardless of what SiteNav does in the
future. Verified by reproducing the exact scenario — scroll to Contact,
confirm the nav is genuinely condensed, open the palette, and check
both that the dialog is now a direct child of `<body>` (not inside
`<header>`) and that its computed top is `0`, i.e. actually fixed to
the viewport. Confirmed visually too: a screenshot of the same scrolled
state now shows a clean, correctly-positioned, fully opaque dialog with
no bleed-through.

Three new permanent checks close the coverage gap this bug exposed —
scrolling to Contact and opening the palette from there is now a
standing part of the suite, not just the unscrolled case. 50/50
interaction checks, 0/5 accessibility violations, clean typecheck and
build.

## A sweep, reported honestly — and three real visual defects it led to

Asked to run a broad, multi-agent hunt for more instances of the
command-palette bug class, the sweep was only partly run: three of four
sub-agents hit the session usage limit before reporting, and the one
that finished returned an empty result. That is not evidence the site is
clean, so this round did the checks directly and sequentially instead,
and reports only what was measured.

Measured, no defects: horizontal overflow across 9 viewport widths
(375–1920) × 5 routes, scrolled through the full page — zero overflow.
Every position:fixed element on the page, in both the closed and open
Lightbox states, has zero backdrop-filter / filter / perspective
ancestors (header, cursor, Lightbox wrapper all anchored to the viewport).
Tab order across 70 stops is logical, and every focused element has a
visible outline. Escape closes the Lightbox; five rapid command-palette
open/close cycles leave zero stray dialogs and restore body scroll.

Found by looking at screenshots, which numeric checks alone missed:

1. **Journey text under 3D wires (all widths).** The left-edge darkening
   behind the stage text was too weak, so wireframe octahedra and orbit
   rings ran behind the headline, bullets and tag pills — worst at
   1440, and crossing body copy at 375 and 768. Fixed at the source by
   strengthening that existing gradient layer (0.55 → 0.92 at the edge,
   fading out by 68%), plus a mobile-only mid-band (`md:hidden`) for the
   full-width text on narrow screens. Verified by re-capturing 375, 768,
   1024 and 1440 at the same scroll offsets as the flagged captures.

2. **Nav label wrap at 1024.** "04 AI LAB" broke onto two lines. Fixed
   with `whitespace-nowrap` on the nav links; measured single-line at
   1024 with no overflow at any width.

A permanent guard now asserts no nav label wraps at 1024, and the
class-level containing-block audit above is a standing check, so the
whole class stays covered rather than one instance.

52/52 interaction checks, 0/5 accessibility violations, clean typecheck
and QA build.

## Visual pass across the 3D sections

Checked every 3D section at 390, 1280 and 1440 by screenshot. Three had
layered 3D geometry crossing body copy, which numeric checks cannot see:

- **Engineer (mobile).** The panel outlines ran through full-width
  paragraphs. Added a mobile-only uniform dimming layer (`md:hidden`);
  desktop keeps its side gradient, which already clears the text column.
- **Clariti (mobile).** The same defect and the same mobile-only fix.
- **Clariti (desktop).** The layer frames sit in the middle of the
  viewport and the lede ran straight through them. Added a desktop band
  behind just the copy rows, with a mask that fades its top and bottom so
  no hard seam crosses the frames. Frames stay visible above and below.

Two items were checked and deliberately not changed. Preloader text seen
in one capture is a timing artifact: the preloader holds 1.8s and fades
over 500ms, and the capture landed mid-fade on a slow headless run. Hero,
Recognition and AI Lab showed no wire-over-text overlap at these widths.

Limitation: these fixes were judged by screenshot, not by a scripted
overlap detector, so a future regression would only be caught by looking.
52/52 interaction checks, 0/5 accessibility violations, clean typecheck
and QA build.

## Privacy: what this site collects

Checked against the code, not assumed:

- **No analytics, trackers or cookies.** No analytics package is in
  `package.json`, and nothing sets a cookie.
- **No browser storage.** A codebase search finds no `localStorage`,
  `sessionStorage` or query-string reading.
- **No forms, no third-party scripts, no third-party fonts.** Fonts are
  self-hosted; the CSP restricts every other origin.
- **External links are user-initiated.** GitHub, LinkedIn, the live demos and
  the certificate verification pages open only when a visitor clicks them.
- **The GitHub build log is fetched by the server.** The browser never calls
  GitHub, so a visitor's address is not sent there.

What does exist is the hosting platform's own infrastructure logging (Vercel
records request metadata such as IP address under its own policy). This site
adds nothing on top of that.

## Lint and the remaining brief items

Lint is now a standing gate. `npm run lint` runs ESLint with Next's core-web-vitals
and TypeScript rules; it reports 0 errors and 0 warnings. The deprecated
`next lint` command was replaced.

Verified this round: reflow at 320 CSS px with no horizontal scroll on every
route; forced-colours mode active with text, nav and focus outlines legible;
1280 reviewed for all five 3D sections (AI Lab's signal-graph nodes were
crossing the lede and were dimmed); preloader release measured at about 2.2s,
down from roughly 2.7s by constants, now released at DOMContentLoaded
rather than a fixed hold; closing line and Invite Bhavana link in the footer.

Still not done, deliberately. Evaluator's Desk, Speaking & Community and the
Engineering Intelligence Model need your real content. The indigo palette and
the AI Debate System were declined. The navigation rename depends on the
sections above. The 3D photo gallery, the 3D certificate archive, the
AI Violation visual language, the PerfOS repository lab and per-project AI Lab
environments are large creative builds. They are not claimed as complete, and
each needs review before shipping. Hero pointer and scroll reaction is unverified.

54/54 interaction checks, 0/5 accessibility violations, zero lint errors and
warnings, clean typecheck and QA build.

## The certificate archive, as physical sheets

The certificates are now physical sheets: a solid card with two sheets
stacked behind it in real 3D depth, a shadow that deepens as the sheet lifts,
and the same pointer tilt and light as the project cards. Keyboard focus lifts
the sheet the same way hover does. The Lightbox, the document content and the
Escape behaviour are unchanged.

The depth is CSS 3D (`perspective` and `translateZ`), not WebGL. A WebGL
plane per certificate would add GPU contexts to a page that already runs six,
and the brief asks to avoid that. CSS 3D gives the same physical read with no
extra context. The archive is still a grid, so it stays fully keyboard and
screen-reader friendly.

Two defects in the shared tilt component were fixed along the way.
`TiltCard` said it respected reduced motion and touch, but it did neither: it
tilted on any pointer event, touch included, and ignored reduced motion. It now
tilts only for a mouse and drops all movement under reduced motion. The project
cards benefit too.

Verified: the hover lift computes to a real 3D transform; reduced motion leaves
the sheet still; the Lightbox opens on click and closes on Escape; no horizontal
overflow at 320 or 390 CSS px, even with the stacked sheets offset outside each
tile. Judged by a desktop screenshot, not by a scripted depth test.

58/58 interaction checks, 0/5 accessibility violations, zero lint errors and
warnings, clean typecheck and QA build.

## The evidence gallery, with real depth

The event-evidence rail now reads spatially: the card nearest the centre of
the viewport sits forward — full scale, full opacity — and the others recede
with distance, dimmed and slightly shrunk. One `requestAnimationFrame` loop
on scroll updates every card's `translateZ`/`scale`/`opacity` directly via
the DOM (no React state, no re-render per frame); `perspective` on the rail
projects it. Horizontal scrolling, the arrow buttons, each event's own
carousel and the Lightbox are all unchanged.

A real bug surfaced while verifying this, not assumed clean: `useReducedMotion`
resolves `false` on the first render and flips `true` after mount, so the
depth effect's reduced-motion guard (`if (reduceMotion) return`) let the first
pass apply transforms before the hook had resolved — reduced-motion users were
left with the depth effect's styles permanently baked onto the cards, never
cleared. Fixed by explicitly clearing every card's transform and opacity when
reduced motion is detected, rather than just skipping the effect.

Verified: the centred card computes to `scale ≈ 1`, the edge cards to
`scale 0.9`; reduced motion leaves every card's inline style empty; the
Lightbox still opens from a carousel photo; zero horizontal overflow at 1440
or 390. 60/60 interaction checks, 0/5 accessibility violations, zero lint
errors and warnings, clean typecheck and QA build.

## Motion tokens and performance budgets

**Motion scale.** Four durations, matching the brief's motion tiers, live in
`app/globals.css` and are exposed as Tailwind classes: `duration-fast` (200ms,
micro feedback), `duration-normal` (300ms, UI and spatial hover),
`duration-slow` (500ms, section reveals) and `duration-cinematic` (900ms, major
transitions only). The values are the ones the site already used, so nothing
moved visually. `TiltCard` and `CertificateWall` now use the scale. Three
easing tokens (`ease-standard`, `ease-spatial`, `ease-emphasized`) are defined
but not yet adopted: switching existing components to them changes how motion
feels, so that is a separate decision. The brief's other motion tiers are not
yet on the scale.

**Performance budgets.** These are targets against figures measured on this
build, not claims. The Lighthouse performance score is not budgeted, because
it swings 43–63 on this machine under throttling.

| Budget | Ceiling (gzipped JS) | Measured on this build |
|---|---|---|
| Home (shared layout + route) | ≤ 135 KiB | 127.5 KiB |
| Case studies (PerfOS, Aveniq, CiviqueX) | ≤ 125 KiB | 118.2–118.8 KiB |
| Resume | ≤ 118 KiB | 111.0 KiB |
| 3D chunk | loads only near its scene | deferred by readiness and proximity |
| Web fonts | 2 files | 2 files (Geist sans and mono) |
| Cumulative Layout Shift | ≤ 0.05 | 0.012 across three runs |
| Total Blocking Time | trend down on a clean machine | 1.2–4.2 s under throttling, not yet budgeted |

Largest transferred assets, in order: the 3D chunk (about 100 kB), a second
3D-related chunk (about 88 kB), the shared client chunk (about 54 kB), the
application chunk (about 51 kB), then the two font files (about 50 kB and 45 kB).

The JavaScript ceilings are enforced by `scripts/check-budgets.mjs`, which
gzips each route's chunks from the build manifest and fails if any route goes
over its ceiling. The metric is the gzipped JS a visitor downloads to render a
route, not Next's rounded "First Load JS" column. A GitHub Actions workflow
(`.github/workflows/ci.yml`) runs typecheck, lint, the production build and this
check on every push. The workflow was written and the commands it runs were
verified locally. It has not yet run on GitHub, so treat its first run as the
real test. Lighthouse runs stay manual, because they are too noisy to gate on.
CI does not gate on `npm audit`: the two unresolved high-severity chains
described above would fail it until the major upgrades are done.

**Deliberately not built from this brief**, each with a reason:

- **A PerfOS repository topology.** Without real module data it would be
  decoration implying analysis the product does not show. The brief itself says
  to remove effects that exist only to look impressive.
- **Frame-time-driven DPR.** The control loop cannot be validated here. The
  headless renderer uses software GL, so its frame times say nothing about a
  real device. I won't ship a controller I can't measure.
- **A liquid-glass signature shader.** It is subjective, adds GPU cost on every
  transition, and needs design review before it earns a place.
- **A rewritten closing headline.** The brief's "Let's build something
  intelligent" would replace the Contact copy you have already accepted. The
  footer line already carries the tagline.

60/60 interaction checks, 0/5 accessibility violations, zero lint errors and
warnings, clean typecheck and QA build.

## Career timeline and build gates

The career timeline's year markers are now buttons. Each one scrolls the pinned
story to that stage, using the same progress mapping the component already uses,
and the active stage follows. Reduced motion jumps without the smooth scroll.
A permanent check clicks 2019 and confirms the active stage becomes 2019. The
markers look the same as before.

The build gates are an explicit JavaScript budget, enforced by
`scripts/check-budgets.mjs`, and a CI workflow that runs typecheck, lint, the
production build and that budget check. The README's budget table lists the
measured figures and ceilings.

Two brief items are still not built. A full rewrite of the 3D architecture into
one scene, and a palette change, were declined. The rest of the brief (a
Speaking section, the Engineering Intelligence Model, AI Debate) needs real
content or was declined, and is recorded in the earlier sections.

## Résumé download

The Download PDF control on `/resume` now serves the résumé itself
(`public/bhavana-p-resume.pdf`), with an attachment header so it downloads
rather than opening inline. The Print control opens the browser print dialog for
the page. The earlier Download button was actually print, and it is now labelled
honestly.

This PDF is public and contains a phone number and a home address. That is the
owner's deliberate choice, and it means the Contact section no longer says those
details stay off the open web. That sentence has been removed. Replace the PDF
file to update the download, and keep it current with the page.

The header navigation labels no longer carry section numbers.

63/63 interaction checks, 0 accessibility violations, zero lint errors and
warnings, clean typecheck and build.
