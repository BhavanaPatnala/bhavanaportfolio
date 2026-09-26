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
    title: 'AI Violation Detection',
    kicker: 'Computer vision / inference system',
    discipline: 'Applied AI',
    year: '2026',
    role: 'Design and engineering',
    status: 'documenting',
    summary:
      'A detection system that reads video frames and flags violations with a confidence signal attached to every call.',
    standfirst:
      'A computer-vision system built to watch a stream and decide, frame by frame, whether something has gone wrong, and to be honest about how sure it is.',
    stack: ['Computer vision', 'AI inference'],
    links: [],
    facts: [],
    documented: false,
  },
  {
    slug: 'ai-debate-system',
    index: '03',
    title: 'AI Debate System',
    kicker: 'Reasoning / multi-agent argumentation',
    discipline: 'AI research experiment',
    year: '2026',
    role: 'Design and engineering',
    status: 'documenting',
    summary:
      'A system where argument and counter-argument are generated, evidenced and then judged. Reasoning made inspectable.',
    standfirst:
      'Most AI answers arrive as a single confident block of text. This experiment breaks the answer apart: a position, an opposing position, the evidence each one leans on, and an evaluation pass that decides which held up.',
    stack: ['AI reasoning', 'Multi-agent flow'],
    links: [],
    facts: [],
    documented: false,
  },
  {
    slug: 'aveniq',
    index: '04',
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
/* Aveniq case study                                                    */
/* ------------------------------------------------------------------ */

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

export const violationDetection: ScaffoldSection[] = [
  { id: 'problem', n: '01', title: 'Problem', body: null, awaiting: 'Problem statement and the conditions the system was built to catch' },
  { id: 'concept', n: '02', title: 'Concept', body: null, awaiting: 'System concept and scope' },
  { id: 'architecture', n: '03', title: 'System architecture', body: null, awaiting: 'Services, data flow and deployment shape' },
  { id: 'model', n: '04', title: 'Model', body: null, awaiting: 'Model family and training or fine-tuning approach' },
  { id: 'vision', n: '05', title: 'Computer-vision pipeline', body: null, awaiting: 'Frame capture, pre-processing, inference and post-processing stages' },
  { id: 'data', n: '06', title: 'Datasets', body: null, awaiting: 'Dataset sources, size and labelling method' },
  { id: 'logic', n: '07', title: 'Detection logic', body: null, awaiting: 'Rules, thresholds and confidence handling' },
  { id: 'results', n: '08', title: 'Results', body: null, awaiting: 'Measured accuracy and evaluation method' },
  { id: 'challenges', n: '09', title: 'Technical challenges', body: null, awaiting: 'The hard parts, and how they were resolved' },
  { id: 'future', n: '10', title: 'Future improvements', body: null, awaiting: 'Planned direction' },
];

export const debateSystem: ScaffoldSection[] = [
  { id: 'problem', n: '01', title: 'Problem', body: null, awaiting: 'The reasoning problem this system addresses' },
  { id: 'concept', n: '02', title: 'Concept', body: null, awaiting: 'How the debate is framed, and what a round consists of' },
  { id: 'architecture', n: '03', title: 'System architecture', body: null, awaiting: 'Services, orchestration and state' },
  { id: 'flow', n: '04', title: 'Debate flow', body: null, awaiting: 'Turn structure and termination conditions' },
  { id: 'argument', n: '05', title: 'Argument generation', body: null, awaiting: 'How a position is constructed' },
  { id: 'counter', n: '06', title: 'Counter-argument', body: null, awaiting: 'How the opposing position is derived' },
  { id: 'evidence', n: '07', title: 'Evidence and reasoning', body: null, awaiting: 'Sourcing, citation and the reasoning trace' },
  { id: 'evaluation', n: '08', title: 'Evaluation', body: null, awaiting: 'Judging criteria and scoring' },
  { id: 'output', n: '09', title: 'Final output', body: null, awaiting: 'What the system returns, and how it is presented' },
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
