import type { Metadata } from 'next';

import CaseHero from '@/components/case/CaseHero';
import CaseFooterNav from '@/components/case/CaseFooterNav';
import { CaseProse, CaseSection } from '@/components/case/CaseSection';
import ProductGallery from '@/components/case/ProductGallery';
import ScaffoldSections from '@/components/case/ScaffoldSections';
import { aveniq, aveniqTechnical, projectBySlug } from '@/data/projects';

const project = projectBySlug('aveniq')!;
const SHOT_DIR = '/images/projects/aveniq';

export const metadata: Metadata = {
  title: 'Aveniq — AI shopping research assistant',
  description:
    "Paste a product link and four AI agents research it, argue about it, and return a buy, maybe or don't-buy verdict with the evidence attached.",
  alternates: { canonical: '/work/aveniq' },
};

export default function AveniqCaseStudy() {
  return (
    <article>
      <CaseHero project={project} tagline="Four AI agents. Deeper research. A clearer decision." />

      <CaseSection n="01" label="Problem" title={aveniq.problem.title}>
        <CaseProse paragraphs={aveniq.problem.body} />
      </CaseSection>

      <CaseSection
        n="02"
        label="Product"
        title="Five screens, one verdict"
        lede="From a pasted link to a recommendation you can check the working on — the interface end to end."
      >
        <ProductGallery shots={aveniq.interface} dir={SHOT_DIR} />
        <p className="label mt-8">{aveniq.interfaceNote}</p>
      </CaseSection>

      <CaseSection
        n="03"
        label="Agents"
        title="Four agents, one argument"
        lede="Each agent has one job. The verdict comes from what happens when they disagree."
      >
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {aveniq.agents.map((agent, i) => (
            <li
              key={agent.name}
              className="reveal group relative overflow-hidden rounded-lg border border-glass-border p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-glass-borderStrong md:p-8"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signature transition-transform duration-500 ease-out group-hover:scale-y-100"
              />
              <p className="label metric">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-h1 text-bone">{agent.name}</h3>
              <p className="mt-1.5 text-small text-signature">{agent.role}</p>
              <p className="mt-3 max-w-prose text-small text-bone-2">{agent.detail}</p>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection
        n="04"
        label="Flow"
        title="How a verdict gets made"
        lede="Five stages between a pasted link and a recommendation, each one visible while it runs rather than hidden behind a loading spinner."
      >
        <ol className="mt-10">
          {aveniq.flow.map((stage, i) => (
            <li key={stage.id} className="reveal flex gap-5 border-t border-glass-border py-6" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="metric font-mono text-micro text-bone-4">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-h2 text-bone">{stage.label}</h3>
                <p className="mt-1.5 max-w-prose text-small text-bone-2">{stage.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </CaseSection>

      <ScaffoldSections sections={aveniqTechnical} offset={4} />

      <CaseFooterNav slug="aveniq" />
    </article>
  );
}
