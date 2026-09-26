export type Theme = {
  id: string;
  title: string;
  position: string;
  body: string;
};

/**
 * Positions, not publications. Nothing here claims peer-reviewed work.
 * Structured so written pieces can be added later without redesign.
 */
export const themes: Theme[] = [
  {
    id: 'frontend-performance',
    title: 'Frontend performance',
    position: 'Performance is an architecture problem wearing a rendering costume.',
    body: 'By the time a metric moves, the decision that caused it is months old and three refactors away. The useful work is upstream: module boundaries, what gets loaded and when, and whether the structure of the codebase makes the fast path the easy path.',
  },
  {
    id: 'ai-engineering',
    title: 'AI engineering',
    position: 'Let deterministic code decide, and let the model explain.',
    body: 'A model is excellent at turning a structured finding into a sentence a tired engineer will act on, and unreliable as the thing that produced the finding. Keeping that boundary sharp is what made PerfOS trustworthy enough to look at twice.',
  },
  {
    id: 'architecture',
    title: 'Software architecture',
    position: 'A component is a contract you will have to live with for years.',
    body: 'Twelve years on one product teaches you which decisions stay cheap. Most architectural pain is not a wrong abstraction — it is a right abstraction that nobody could find, or one that quietly grew a second responsibility.',
  },
  {
    id: 'human-centered-ai',
    title: 'Human-centred AI',
    position: 'An AI feature that cannot be disagreed with is a liability.',
    body: 'Confidence, provenance and a way to dismiss the output are not polish. They decide whether people keep using the system after it is wrong for the first time.',
  },
  {
    id: 'developer-experience',
    title: 'Developer experience',
    position: 'Tools should report where the decision was made, not where it hurt.',
    body: 'A stack trace points at the symptom. The interesting tooling points at the commit, the module boundary or the import that made the symptom inevitable.',
  },
];
