import type { Metadata } from 'next';

import CaseHero from '@/components/case/CaseHero';
import CaseFooterNav from '@/components/case/CaseFooterNav';
import { CaseProse, CaseSection } from '@/components/case/CaseSection';
import PipelineDiagram from '@/components/case/PipelineDiagram';
import ProductGallery from '@/components/case/ProductGallery';
import ScaffoldSections from '@/components/case/ScaffoldSections';
import { civiquex, civiquexTechnical, projectBySlug } from '@/data/projects';
import { site } from '@/data/site';

const project = projectBySlug('ai-violation-detection')!;
const SHOT_DIR = '/images/projects/ai-violation-detection';

export const metadata: Metadata = {
  title: 'CiviqueX — Road Safety Evidence & Accountability Platform',
  description:
    'A citizen records a road-safety issue on video; CiviqueX verifies the evidence frame by frame — object detection, tracking and plate OCR — and routes a confirmed report to the right traffic authority.',
  alternates: { canonical: '/work/ai-violation-detection' },
};

export default function ViolationDetectionCaseStudy() {
  return (
    <article>
      <CaseHero project={project} tagline="Capture. We verify. Civic good." />

      <CaseSection n="01" label="Problem" title={civiquex.problem.title}>
        <CaseProse paragraphs={civiquex.problem.body} />
      </CaseSection>

      <CaseSection
        n="02"
        label="Product"
        title="Nine screens, one report"
        lede="From signing in as a citizen to an officer's correlated incident queue — the interface end to end, from the live demo."
      >
        <ProductGallery shots={civiquex.interface} dir={SHOT_DIR} />
      </CaseSection>

      <CaseSection
        n="03"
        label="Categories"
        title="Ten ways a road can go wrong"
        lede="Reporting starts with what was observed, not a blank text box — the rule engine decides what applies once the evidence is in."
      >
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-glass-border bg-glass-border sm:grid-cols-2">
          {civiquex.categories.map((category, i) => (
            <li
              key={category}
              className="reveal flex items-baseline gap-4 bg-void-raised px-6 py-5"
              style={{ transitionDelay: `${(i % 5) * 60}ms` }}
            >
              <span className="metric font-mono text-micro text-bone-4">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-body text-bone-2">{category}</span>
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection
        n="04"
        label="Pipeline"
        title="From a phone video to a routed report"
        lede="Seven stages between a citizen's upload and an officer's queue, each one visible in the product rather than hidden behind a spinner."
      >
        <PipelineDiagram stages={civiquex.pipeline} />
      </CaseSection>

      <CaseSection
        n="05"
        label="Decisions"
        title="Honest about what it doesn't know"
        lede="The design choice that runs through every screen: a confidence number the system can defend, never a guess dressed up as a fact."
      >
        <ol className="mt-10">
          {civiquex.decisions.map((decision, i) => (
            <li
              key={decision.n}
              className="reveal grid gap-y-3 border-t border-glass-border py-8 md:grid-cols-12 md:gap-x-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <p className="metric label md:col-span-2">{decision.n}</p>
              <div className="md:col-span-10">
                <h3 className="text-h1 text-bone">{decision.title}</h3>
                <p className="mt-3 max-w-prose text-body text-bone-2">{decision.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </CaseSection>

      <ScaffoldSections sections={civiquexTechnical} offset={5} />

      <CaseSection n="10" label="Try it" title="The live demo" lede="Four demo accounts — Citizen, two Authority roles and Admin — are on the sign-in screen; every role sees a different side of the same pipeline.">
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.links.civiquexDemo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-bone px-5 font-mono text-micro uppercase tracking-[0.14em] text-void transition-colors duration-300 hover:bg-signature"
          >
            Live demo <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </CaseSection>

      <CaseFooterNav slug="ai-violation-detection" />
    </article>
  );
}
