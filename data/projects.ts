export type ProjectStatus = 'live' | 'in-development' | 'documenting';

export type Project = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  discipline: string;
  year: string;
  role: string;
  status: ProjectStatus;
  /** One-line summary used on the index card. */
  summary: string;
  /** Longer standfirst used at the top of the case study. */
  standfirst: string;
  stack: string[];
  links: { label: string; href: string; external?: boolean }[];
  /** Verified numbers only. An empty array is fine. */
  facts: { value: string; label: string }[];
  /** Whether the deep case study is authored or awaiting source material. */
  documented: boolean;
};

export const projects: Project[] = [
  {
    slug: 'perf-os',
    index: '01',
    title: 'PerfOS',
    kicker: 'AI-Powered Frontend Performance Platform',
    discipline: 'Full-stack / developer tooling',
    year: '2025',
    role: 'Architecture, frontend, backend',
    status: 'live',
    summary:
      'A full-stack platform that scans frontend repositories and surfaces the regressions a bundle report never shows you.',
    standfirst:
      'Frontend performance work usually starts too late, after the regression ships. PerfOS moves the audit back to the repository: it scans a frontend codebase, classifies what it finds across six categories, and uses the Claude SDK to explain why each finding matters.',
    stack: ['Angular 19', 'Node.js', 'Express', 'TypeScript', 'Claude SDK'],
    links: [
      { label: 'Live demo', href: 'https://perf-os-six.vercel.app/', external: true },
      { label: 'GitHub', href: 'https://github.com/BhavanaPatnala/PerfOS', external: true },
    ],
    facts: [
      { value: '23', label: 'REST endpoints' },
      { value: '6', label: 'Finding categories' },
      { value: '2', label: 'Runtimes, one language' },
    ],
    documented: true,
  },
  {
    slug: 'ai-violation-detection',
    index: '02',
    title: 'CiviqueX',
    kicker: 'Road Safety Evidence & Accountability Platform',
    discipline: 'Applied AI / computer vision',
    year: '2026',
    role: 'Design and engineering',
    status: 'live',
    summary:
      'A citizen records a road-safety issue on video; CiviqueX verifies the evidence frame by frame and routes a confirmed report to the right traffic authority.',
    standfirst:
      'CiviqueX turns a citizen’s phone video into evidence a traffic authority can act on — detecting the vehicle, tracking it across frames, reading the plate, and reporting exactly how confident it is rather than asserting a guess.',
    stack: ['Computer vision', 'TensorFlow.js (coco-ssd)', 'Tesseract.js OCR', 'Object tracking'],
    links: [{ label: 'Live demo', href: 'https://civiquex-flax.vercel.app/', external: true }],
    facts: [
      { value: '10', label: 'Violation categories' },
      { value: '4', label: 'Account roles' },
      { value: '3', label: 'Chained detection models' },
    ],
    documented: true,
  },
  {
    slug: 'aveniq',
    index: '03',
    title: 'Aveniq',
    kicker: 'AI shopping research assistant',
    discipline: 'Applied AI / product',
    year: '2026',
    role: 'Design and engineering',
    status: 'in-development',
    summary:
      'Paste a product link and four AI agents research it, argue about it, and return a buy, maybe or don’t-buy verdict with the evidence attached.',
    standfirst:
      'A product page tells you what it is. It does not tell you whether the reviews hold up, whether the price is actually good, or what an expert would flag. Aveniq sends four AI agents to find out, lets them disagree with each other, and shows the working, not just the verdict.',
    stack: ['AI agents', 'Multi-agent reasoning', 'Evidence retrieval'],
    links: [],
    facts: [
      { value: '4', label: 'AI agents' },
      { value: '5', label: 'Marketplaces (of 1000+)' },
      { value: '3', label: 'Possible verdicts' },
    ],
    documented: true,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* PerfOS case study                                                    */
/* ------------------------------------------------------------------ */

export const perfOs = {
  problem: {
    title: 'The audit happens too late',
    body: [
      'A frontend codebase degrades quietly. A component keeps a subscription open. A module graph grows a cycle. A helper stops being imported but keeps shipping. None of it fails a build, and none of it appears in a review diff. It shows up months later as a slow route and an argument about which release caused it.',
      'The tooling that does exist reports on the artefact: bundle sizes, waterfalls, lab scores. That tells you the page is slow. It does not tell you which decision in the repository made it slow, and it cannot tell you what to do next.',
    ],
  },
  /**
   * The interface, screen by screen. Every caption describes only what the
   * product actually shows — sample numbers belong to the walkthrough
   * repository used in the screenshots, not to a claimed result of my own.
   */
  interface: [
    {
      id: 'connect',
      file: 'connect-repository.png',
      label: 'Connect a repository',
      caption:
        'Paste a GitHub URL and PerfOS pulls the build manifest and runs a full analysis — no config file to write first.',
      url: 'perfos.app',
    },
    {
      id: 'analyzing',
      file: 'analyzing.png',
      label: 'Repositories, tracked over time',
      caption:
        'Each connected repository keeps its own status and open-issue count; analysis runs as a visible, staged process rather than a black box.',
      url: 'perfos.app/repos',
    },
    {
      id: 'overview',
      file: 'repository-overview.png',
      label: 'Repository overview',
      caption:
        'A single score across five dimensions — performance, dependencies, architecture, assets, maintainability — with a Risk Radar that explains what is driving it, not just the number.',
      url: 'perfos.app/repos/overview',
    },
    {
      id: 'waste-ledger',
      file: 'waste-ledger.png',
      label: 'Engineering Waste Ledger',
      caption:
        'Open findings translated into a monthly and annual cost estimate, broken down by category, so the case for fixing something does not have to be made from scratch each time.',
      url: 'perfos.app/repos/waste-ledger',
    },
    {
      id: 'findings-queue',
      file: 'findings-queue.png',
      label: 'Findings queue',
      caption:
        'Every finding ranked by severity with an estimated saving and a one-click path to a demo pull request — the review surface an engineer actually works from.',
      url: 'perfos.app/repos/findings',
    },
    {
      id: 'evidence',
      file: 'evidence.png',
      label: 'Evidence, not assertion',
      caption:
        'A duplicate-asset finding opens into a side-by-side render comparison and a similarity breakdown, so a flagged duplicate can be checked in seconds, not taken on faith.',
      url: 'perfos.app/repos/findings/asset',
    },
    {
      id: 'verification',
      file: 'verification-gate.png',
      label: 'Verification gate',
      caption:
        'A generated fix has to clear five checks — apply, rebuild, full test suite, pixel-diff, PR-ready — before PerfOS will call it verified.',
      url: 'perfos.app/repos/findings/verify',
    },
    {
      id: 'demo-pr',
      file: 'demo-pr.png',
      label: 'The pull request, before it exists',
      caption:
        'A simulated PR preview — bundle before/after, tests passed, pixel diff, the exact commit — so the impact is visible before anything is opened against the real repository.',
      url: 'perfos.app/repos/findings/pr',
    },
    {
      id: 'root-cause',
      file: 'root-cause.png',
      label: 'Root cause, not just a symptom',
      caption:
        'Each finding resolves to a plain-language root cause, the exact files it touches, and a codemod preview — the explanation layer the Claude SDK is responsible for.',
      url: 'perfos.app/repos/findings/detail',
    },
  ],
  gap: [
    {
      title: 'Bundle analysers describe output',
      body: 'They measure what shipped, not the structure that produced it. A treemap cannot see a circular dependency, only its weight.',
    },
    {
      title: 'Lighthouse scores a moment',
      body: 'One run, one environment, one route. Useful as a gate, limited as a map of where the problems live in the source.',
    },
    {
      title: 'Linters lack context',
      body: 'A rule can flag an unused symbol. It cannot weigh whether that symbol matters, or explain the consequence to the person reading the report.',
    },
  ],
  pipeline: [
    { id: 'repo', label: 'Repository', note: 'Frontend codebase as input' },
    { id: 'scan', label: 'Scanner', note: 'Traverse sources, build the working set' },
    { id: 'analysis', label: 'Analysis', note: 'Resolve modules, imports and reachability' },
    { id: 'detect', label: 'Detection engine', note: 'Classify findings into six categories' },
    { id: 'ai', label: 'AI analysis', note: 'Claude SDK explains and prioritises' },
    { id: 'findings', label: 'Findings', note: 'Served over 23 REST endpoints' },
    { id: 'action', label: 'Developer action', note: 'Angular 19 client, reviewable output' },
  ],
  categories: [
    {
      name: 'Dead code',
      body: 'Modules and symbols that are still shipped but no longer reachable from any entry point.',
    },
    {
      name: 'Circular dependencies',
      body: 'Import cycles in the module graph. The structural defect that makes refactoring expensive and bundling unpredictable.',
    },
    {
      name: 'Performance regressions',
      body: 'Patterns in the source that predictably cost runtime, surfaced where the decision was made rather than where it hurts.',
    },
    {
      name: 'Architecture issues',
      body: 'Structural problems in how the codebase is organised: boundaries crossed, layers inverted, responsibilities pooled.',
    },
  ],
  categoryNote:
    'PerfOS classifies findings across six categories. The four described here are the ones documented on this page; the remaining two are covered in the repository.',
  decisions: [
    {
      n: '01',
      title: 'One language across the boundary',
      body: 'TypeScript on the Angular 19 client and on the Node/Express service. The finding shape is defined once, so a change to the detection output surfaces at compile time on both sides instead of at runtime in the browser.',
    },
    {
      n: '02',
      title: 'A REST surface, not a single endpoint',
      body: 'Twenty-three endpoints rather than one monolithic analyse call. Scanning, category retrieval and AI analysis are separately addressable, which keeps slow work off the path of fast reads.',
    },
    {
      n: '03',
      title: 'The engine decides, the model explains',
      body: 'Detection is deterministic code. The Claude SDK is used for the part a rule engine is bad at: describing why a finding matters to the person reading it. A model that invents a finding is a bug. A model that writes a clearer sentence is the point.',
    },
    {
      n: '04',
      title: 'Findings are reviewable, not authoritative',
      body: 'The platform is built to be argued with. Every finding arrives with its category and location so an engineer can dismiss it in seconds when it is wrong.',
    },
  ],
  future: [
    'CI integration, so a verified fix can gate a pull request instead of waiting for someone to run an audit.',
    'Longer trend history: the Genome Timeline tracks a repository run over run today — the direction is more runs, and alerting on the trend itself.',
    'Framework-aware detection beyond the current scope.',
  ],
};

/* ------------------------------------------------------------------ */
/* CiviqueX case study                                                  */
/* ------------------------------------------------------------------ */

export const civiquex = {
  problem: {
    title: 'A complaint is not evidence',
    body: [
      'A citizen sees an illegally parked car blocking a bus stop, a footpath obstruction, or a damaged traffic signal — and has no reliable way to make that report land with the right authority as something they can actually act on, rather than one more unverifiable complaint in a queue.',
      'CiviqueX starts at the capture: a citizen uploads a photo or a short recording, and the platform identifies the incident, verifies the evidence frame by frame, and routes the report to the correct traffic authority automatically — with a confidence score attached to every step, not just a final yes or no.',
    ],
  },
  /**
   * The interface, screen by screen. Every caption describes only what the
   * product actually shows in the supplied screenshots — the demo accounts,
   * the specific incident (Bus Stop Obstruction, Chowdhary Nagar Main Road),
   * and its evidence numbers are the walkthrough's own, not a claimed
   * platform-wide accuracy rate.
   */
  interface: [
    {
      id: 'login',
      file: 'login.png',
      label: 'Sign in, by role',
      caption:
        'Four demo roles show the shape of the system before you touch it — Citizen, Authority (zone-based), Authority (Traffic Police) and Admin — each landing somewhere different after sign-in.',
      url: 'civiquex-flax.vercel.app/login',
    },
    {
      id: 'dashboard',
      file: 'dashboard.png',
      label: 'Capture. We verify. Civic good.',
      caption:
        'The citizen’s home screen: upload a photo or a short recording, and CiviqueX identifies the incident, verifies the evidence and routes it to the right traffic authority automatically — with a running tally of the visitor’s own submissions underneath.',
      url: 'civiquex-flax.vercel.app',
    },
    {
      id: 'category',
      file: 'category-select.png',
      label: 'Ten categories, one first question',
      caption:
        'Reporting starts with what was observed, not a blank text box — from illegal parking and footpath obstruction to a damaged traffic signal or a pothole. The rule engine decides what applies once the evidence is in.',
      url: 'civiquex-flax.vercel.app/report',
    },
    {
      id: 'capture',
      file: 'capture-video.png',
      label: '5–10 seconds is enough',
      caption: 'A short video capture — or a file chosen from the device — is all the pipeline needs to work with.',
      url: 'civiquex-flax.vercel.app/report?mode=video',
    },
    {
      id: 'conflicting',
      file: 'conflicting-readings.png',
      label: 'Told when the evidence disagrees with itself',
      caption:
        'Seven usable plate readings across the tracked vehicle, five-for-five character agreement within each one — and still reported as unresolved, because the readings did not agree on plate length or on belonging to a single vehicle. The honest output is “vehicle number could not be reliably determined,” not a best guess.',
      url: 'civiquex-flax.vercel.app/report',
    },
    {
      id: 'evidence',
      file: 'evidence-review.png',
      label: 'A score, not a verdict',
      caption: 'Every submission gets an evidence score out of 100 and a state — here, Review required at 59.9 — before it ever reaches an authority’s queue.',
      url: 'civiquex-flax.vercel.app/report',
    },
    {
      id: 'detail',
      file: 'incident-detail.png',
      label: 'The full record, one page',
      caption:
        'Location, time, vehicle and evidence state together, with a Verify again option — the same record the reporting citizen and the reviewing authority both see.',
      url: 'civiquex-flax.vercel.app/incidents/[id]',
    },
    {
      id: 'proof',
      file: 'incident-proof.png',
      label: 'Every object the model saw',
      caption:
        'The supporting recording, tagged frame by frame — car, traffic light, person — with unrelated faces and plates automatically blurred before anything leaves the platform, and the exact rule the incident was checked against, cited by number.',
      url: 'civiquex-flax.vercel.app/incidents/[id]',
    },
    {
      id: 'repository',
      file: 'incidents-repository.png',
      label: 'Recurring incidents, correlated',
      caption:
        'The officer’s queue: six incidents in a correlated graph, three of them flagged recurring at the same GN Chetty Road location within the same evening — a hotspot the system surfaces on its own rather than one an officer has to notice by hand.',
      url: 'civiquex-flax.vercel.app/incidents',
    },
  ],
  categories: [
    'Wrong / illegal parking',
    'Footpath obstruction',
    'Bus-stop obstruction',
    'Emergency-access obstruction',
    'School-zone obstruction',
    'Accessible-parking obstruction',
    'Traffic-sign / signal obstruction or damage',
    'Dangerous road obstruction',
    'Potentially hazardous traffic interaction',
    'Pothole / road surface damage',
  ],
  pipeline: [
    { id: 'capture', label: 'Capture', note: 'A citizen records 5–10 seconds of video, or uploads a photo, against one of ten observed categories' },
    { id: 'detect', label: 'Object detection', note: 'coco-ssd@2.2.3 (lite_mobilenet_v2) scans frames for vehicles, signage and people' },
    { id: 'track', label: 'Tracking', note: 'civiquex-iou-tracker@1 follows a vehicle across frames rather than reading each one in isolation' },
    { id: 'ocr', label: 'Plate OCR', note: 'tesseract.js@6 (English, plate charset) reads the plate from every usable frame in the track' },
    { id: 'score', label: 'Evidence scoring', note: 'Frames too small to carry real characters are excluded; agreement across readings produces a 0–100 evidence score and a cited best-evidence frame' },
    { id: 'rule', label: 'Rule match', note: 'The observed context is matched against a specific numbered rule and framed as a potential, not confirmed, violation' },
    { id: 'route', label: 'Routing & review', note: 'The report lands in the correct authority’s queue, triaged by evidence strength alongside any other reports correlated to the same location' },
  ],
  decisions: [
    {
      n: '01',
      title: 'Confidence is a number, not a claim',
      body: 'Every submission carries an evidence score out of 100 and an explicit state — Strong evidence, Review required, Resolved — instead of a binary confirmed/denied. A 59.9 is shown as a 59.9, not rounded up into false certainty.',
    },
    {
      n: '02',
      title: 'A conflicting reading is reported, not hidden',
      body: 'When plate OCR disagrees across frames — different plate lengths, characters that are not plausibly the same glyph — CiviqueX says so directly: “plate-to-vehicle association NOT established,” rather than silently picking the most common reading and asserting it.',
    },
    {
      n: '03',
      title: 'Every flag cites a rule, by number',
      body: 'A finding names the exact rule it matched (for example GCC-BS-01) and states plainly that this is a potential violation, not a confirmed one — final determination is left to the authority whose rule it is.',
    },
    {
      n: '04',
      title: 'Recurring incidents are correlated, not siloed',
      body: 'The incidents repository groups reports at the same location within the same window into a recurring cluster inside a correlated incident graph, so a hotspot is visible to the reviewing officer without anyone having to notice it by hand.',
    },
    {
      n: '05',
      title: 'Privacy is handled before anyone outside the loop sees it',
      body: 'Unrelated faces and plates in a submitted recording are automatically blurred before it is shown outside the reviewing authority — a default, not an option to remember to turn on.',
    },
  ],
};

export const aveniq = {
  problem: {
    title: 'A product page is not a verdict',
    body: [
      'A listing gives you a price, a star rating and a stock photo. It does not tell you whether the reviews behind that rating are trustworthy, whether an expert would flag something the listing leaves out, or whether the same product is meaningfully better or cheaper elsewhere. Working that out means opening a dozen tabs — reviews, forums, comparison sites, expert write-ups — and holding all of it in your head at once.',
      'Aveniq starts from that gap: paste a product link and four AI agents run that research, argue about what it means, and hand back a verdict with the evidence attached rather than a single confident paragraph.',
    ],
  },
  /**
   * The interface, screen by screen. Captions describe only what the product
   * visibly shows. The example walkthrough (a Sony WH-1000XM5 listing) is
   * illustrative — its numbers belong to that one analysis, not to a claimed
   * accuracy rate for Aveniq as a platform.
   */
  interface: [
    {
      id: 'landing',
      file: 'landing.jpg',
      label: 'Paste a link, get an investigation',
      caption:
        'The entry point: drop a product URL from Amazon, Flipkart, Myntra, eBay or Shopify — the product states support for 1,000+ stores — with the four agents introduced up front against what each one exists to do.',
      url: 'aveniq.app',
    },
    {
      id: 'analyzing',
      file: 'analyzing.jpg',
      label: 'The research, visible while it happens',
      caption:
        'Shown here analysing a Sony WH-1000XM5 listing: a live log — product identified, reviews scanned, expert sources checked, marketplaces compared — next to the four agents working in parallel, each with its own status.',
      url: 'aveniq.app/analysis',
    },
    {
      id: 'discussion',
      file: 'expert-discussion.jpg',
      label: 'The agents in discussion',
      caption:
        'The Reviewer challenges the Analyst’s first read; the Researcher verifies the claim against the review data; the Arbiter weighs both before ruling. Disagreement between the agents is shown, not smoothed over.',
      url: 'aveniq.app/analysis/discussion',
    },
    {
      id: 'results',
      file: 'final-results.jpg',
      label: 'A verdict, with a confidence score',
      caption:
        'A recommendation with its confidence score, the highlights and concerns that produced it listed side by side, and the best-priced alternative surfaced without being asked.',
      url: 'aveniq.app/analysis/results',
    },
    {
      id: 'evidence',
      file: 'evidence-analysis.jpg',
      label: 'Every finding traces to a source',
      caption:
        'Sources broken out by type — customer reviews, expert reviews, price comparisons, discussion threads — each finding tagged verified or partially verified with the share of sources that support it, alongside a sentiment breakdown by theme.',
      url: 'aveniq.app/analysis/evidence',
    },
  ],
  agents: [
    {
      name: 'Analyst',
      role: 'Understands the big picture',
      detail: 'Reads the product on value — performance, features, price — and states the first take.',
    },
    {
      name: 'Researcher',
      role: 'Finds and verifies the evidence',
      detail: 'Gathers reviews, expert sources and specifications, and checks claims against them.',
    },
    {
      name: 'Reviewer',
      role: 'Challenges assumptions',
      detail: 'Looks for what the first take missed — recurring complaints, a price that does not hold up.',
    },
    {
      name: 'Arbiter',
      role: 'Brings it together',
      detail: 'Weighs both sides and synthesises the final recommendation and its confidence score.',
    },
  ],
  flow: [
    { id: 'research', label: 'Research', note: 'Reviews, expert sources, prices and specifications gathered' },
    { id: 'analysis', label: 'Analysis', note: 'Each agent forms its own read of the product' },
    { id: 'discussion', label: 'Discussion', note: 'Agents challenge and verify each other’s claims' },
    { id: 'evidence', label: 'Evidence', note: 'Findings tagged verified or partially verified, against their sources' },
    { id: 'complete', label: 'Complete', note: 'A verdict — buy, maybe, or don’t buy — with a confidence score' },
  ],
  interfaceNote:
    'The walkthrough above analyses one example listing. Its findings and figures belong to that example, not to a claimed accuracy rate for Aveniq itself.',
};

/* ------------------------------------------------------------------ */
/* Case-study scaffolds awaiting source material                        */
/* ------------------------------------------------------------------ */

export type ScaffoldSection = {
  id: string;
  n: string;
  title: string;
  /** Authored copy, or null while the section waits for source material. */
  body: string | null;
  awaiting?: string;
};

/** The product, its categories, pipeline and design decisions are
 *  documented above from the supplied screenshots; the implementation
 *  underneath it is not, so this stays a scaffold rather than a guess. */
export const civiquexTechnical: ScaffoldSection[] = [
  { id: 'architecture', n: '06', title: 'System architecture', body: null, awaiting: 'Services, data flow and deployment shape' },
  { id: 'model', n: '07', title: 'Model and training', body: null, awaiting: 'How the detection and tracking models were selected, tuned or fine-tuned' },
  { id: 'dataset', n: '08', title: 'Datasets', body: null, awaiting: 'Dataset sources, size and labelling method' },
  { id: 'challenges', n: '09', title: 'Technical challenges', body: null, awaiting: 'The hard parts, and how they were resolved' },
];

/** The product and its interface are documented above; the implementation
 *  underneath it is not yet, so this stays a scaffold rather than a guess. */
export const aveniqTechnical: ScaffoldSection[] = [
  { id: 'architecture', n: '05', title: 'System architecture', body: null, awaiting: 'Services, orchestration and how the four agents communicate' },
  { id: 'model', n: '06', title: 'Model and prompting', body: null, awaiting: 'Model family and how each agent’s role is enforced' },
  { id: 'retrieval', n: '07', title: 'Evidence retrieval', body: null, awaiting: 'How reviews, expert sources and prices are actually fetched and verified' },
  { id: 'challenges', n: '08', title: 'Technical challenges', body: null, awaiting: 'The hard parts, and how they were resolved' },
  { id: 'future', n: '09', title: 'Future direction', body: null, awaiting: 'Planned direction' },
];
