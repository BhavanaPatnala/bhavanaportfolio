import type { Metadata } from 'next';

import CaseHero from '@/components/case/CaseHero';
import CaseFooterNav from '@/components/case/CaseFooterNav';
import { CaseSection } from '@/components/case/CaseSection';
import ScaffoldSections from '@/components/case/ScaffoldSections';
import DetectionStrip from '@/components/case/DetectionStrip';
import Awaiting from '@/components/ui/Awaiting';
import { projectBySlug, violationDetection } from '@/data/projects';

const project = projectBySlug('ai-violation-detection')!;

export const metadata: Metadata = {
  title: 'AI Violation Detection — computer vision system',
  description:
    'A computer-vision system that reads video frames and flags violations with a confidence value attached to every call. Case study in progress.',
  alternates: { canonical: '/work/ai-violation-detection' },
};

const assetSlots = [
  { label: 'Detection overlay', detail: 'Screenshot of the inference output.' },
  { label: 'System architecture', detail: 'Diagram of services and data flow.' },
  { label: 'Demo video', detail: 'Short capture of the system running.' },
];

export default function ViolationDetectionCaseStudy() {
  return (
    <article>
      <CaseHero project={project} tagline="Frames in, decisions out, confidence attached." />

      <CaseSection
        n="00"
        label="Status"
        title="This case study is being written"
        lede="The system exists; the write-up does not yet. Rather than fill the page with plausible-sounding architecture, every section below names exactly what belongs in it. Each one becomes real copy as the material is supplied."
      >
        <DetectionStrip />
      </CaseSection>

      <ScaffoldSections sections={violationDetection} />

      <CaseSection n="11" label="Assets" title="Material to be added">
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {assetSlots.map((slot) => (
            <Awaiting key={slot.label} label={slot.label} detail={slot.detail} height="aspect-[4/3] min-h-0" />
          ))}
        </div>
        <p className="label mt-6">/public/images/projects/ai-violation-detection/</p>
      </CaseSection>

      <CaseFooterNav slug="ai-violation-detection" />
    </article>
  );
}
