import type { Metadata } from 'next';

import CaseHero from '@/components/case/CaseHero';
import CaseFooterNav from '@/components/case/CaseFooterNav';
import { CaseSection } from '@/components/case/CaseSection';
import ScaffoldSections from '@/components/case/ScaffoldSections';
import DebateFlow from '@/components/case/DebateFlow';
import Awaiting from '@/components/ui/Awaiting';
import { debateSystem, projectBySlug } from '@/data/projects';

const project = projectBySlug('ai-debate-system')!;

export const metadata: Metadata = {
  title: 'AI Debate System — reasoning experiment',
  description:
    'An experiment in making machine reasoning inspectable: a position, a counter-position, the evidence behind each, and an evaluation pass. Case study in progress.',
  alternates: { canonical: '/work/ai-debate-system' },
};

const assetSlots = [
  { label: 'Interface', detail: 'Screenshot of a debate in progress.' },
  { label: 'Architecture diagram', detail: 'Orchestration and state.' },
  { label: 'Repository', detail: 'Source link, once public.' },
];

export default function DebateSystemCaseStudy() {
  return (
    <article>
      <CaseHero project={project} tagline="A position, a counter, and a verdict." />

      <CaseSection
        n="00"
        label="Status"
        title="This case study is being written"
        lede="The structure below is the outline the finished write-up will follow. Nothing is asserted about the implementation until it can be described accurately."
      >
        <DebateFlow />
      </CaseSection>

      <ScaffoldSections sections={debateSystem} />

      <CaseSection n="10" label="Assets" title="Material to be added">
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {assetSlots.map((slot) => (
            <Awaiting key={slot.label} label={slot.label} detail={slot.detail} height="aspect-[4/3] min-h-0" />
          ))}
        </div>
        <p className="label mt-6">/public/images/projects/ai-debate-system/</p>
      </CaseSection>

      <CaseFooterNav slug="ai-debate-system" />
    </article>
  );
}
