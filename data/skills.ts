export type TechGroup = 'core' | 'supporting' | 'ai';

export type TechNode = {
  id: string;
  label: string;
  group: TechGroup;
  /** Drives emphasis (dot weight, label weight) — not font size. Kept modest
   *  on purpose: this is a diagram, not a sizing contest between labels. */
  primary?: boolean;
  /** Where it is actually used. Verified against the résumé. */
  context: string;
};

/**
 * Order is display order within each column — most load-bearing first.
 * Deliberately grouped rather than force-scattered: three clear lanes read
 * as a diagram, not a graph dump.
 */
export const techNodes: TechNode[] = [
  { id: 'angular', label: 'Angular', group: 'core', primary: true, context: 'Angular 21 today; 19 in PerfOS; 18 across Clariti' },
  { id: 'typescript', label: 'TypeScript', group: 'core', primary: true, context: 'Client and server, across every current project' },
  { id: 'javascript', label: 'JavaScript', group: 'core', context: 'The layer underneath all of it' },
  { id: 'html', label: 'HTML5', group: 'core', context: 'Semantic structure, since the first production site' },
  { id: 'css', label: 'CSS', group: 'core', context: 'Responsive interfaces for desktop and mobile' },

  { id: 'node', label: 'Node.js', group: 'supporting', context: 'PerfOS backend runtime' },
  { id: 'express', label: 'Express', group: 'supporting', context: '23 REST endpoints in PerfOS' },
  { id: 'jquery', label: 'jQuery', group: 'supporting', context: 'Clariti website' },
  { id: 'wordpress', label: 'WordPress', group: 'supporting', context: 'clariti.app and cadcam-e.com' },
  { id: 'dotnet', label: '.NET', group: 'supporting', context: 'Clariti website stack' },
  { id: 'bootstrap', label: 'Bootstrap', group: 'supporting', context: 'Mobile web delivery' },
  { id: 'stripe', label: 'Stripe API', group: 'supporting', context: 'Clariti subscription module' },

  { id: 'claude', label: 'Claude SDK', group: 'ai', primary: true, context: 'Analysis layer in PerfOS' },
  { id: 'ml', label: 'Machine Learning', group: 'ai', context: 'Supervised learning: regression and classification' },
];

/**
 * Curated cross-column connections only — the technologies that genuinely
 * bridge two lanes. Relationships inside one lane are already communicated
 * by standing in the same column, so they are not drawn again.
 */
export const bridges: [string, string][] = [
  ['typescript', 'node'],
  ['typescript', 'claude'],
  ['javascript', 'jquery'],
];

export const groupLabels: Record<TechGroup, string> = {
  core: 'Core',
  supporting: 'Supporting',
  ai: 'AI / experimentation',
};

/** Practice, not technology. Kept separate so the constellation stays honest. */
export const practice = [
  { label: 'Agile & Scrum', note: 'Certified; applied since 2015' },
  { label: 'Release engineering', note: 'Live deployment of Clariti' },
  { label: 'Code analysis', note: 'Reading systems before changing them' },
  { label: 'Critical bug determination', note: 'Diagnosis, then a recommendation' },
  { label: 'Manual & regression testing', note: 'Productivity raised by 50%' },
  { label: 'User interface design', note: 'From requirement to finished surface' },
  { label: 'Documentation', note: 'Specifications and test plans' },
];
