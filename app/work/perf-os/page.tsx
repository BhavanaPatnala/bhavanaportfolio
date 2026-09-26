import type { Metadata } from 'next';

import CaseHero from '@/components/case/CaseHero';
import CaseFooterNav from '@/components/case/CaseFooterNav';
import { CaseProse, CaseSection } from '@/components/case/CaseSection';
import ArchitectureDiagram from '@/components/case/ArchitectureDiagram';
import PipelineDiagram from '@/components/case/PipelineDiagram';
import ProductGallery from '@/components/case/ProductGallery';
import Awaiting from '@/components/ui/Awaiting';
import { perfOs, projectBySlug } from '@/data/projects';
import { site } from '@/data/site';

const SHOT_DIR = '/images/projects/perf-os';
const project = projectBySlug('perf-os')!;

export const metadata: Metadata = {
  title: 'PerfOS — AI-Powered Frontend Performance Platform',
  description:
    'A full-stack platform that scans frontend repositories and classifies findings across six categories, with an Angular 19 client, a Node/Express service over 23 REST endpoints, and Claude SDK analysis.',
  alternates: { canonical: '/work/perf-os' },
};

export default function PerfOsCaseStudy() {
  return (
    <article>
      <CaseHero project={project} tagline="Scan. Analyze. Detect. Surface. Act." />

      <CaseSection n="01" label="Problem" title={perfOs.problem.title}>
        <CaseProse paragraphs={perfOs.problem.body} />
      </CaseSection>

      <CaseSection
        n="02"
        label="Product"
        title="Nine screens, one flow"
        lede="From pasting a repository URL to a demo pull request with tests passed and a pixel diff — the interface end to end."
      >
        <ProductGallery shots={perfOs.interface} dir={SHOT_DIR} />
      </CaseSection>

      <CaseSection
        n="03"
        label="The gap"
        title="Why the existing tools were not enough"
        lede="Three categories of tooling already exist. Each answers a different question from the one an engineer actually has."
      >
        <ul className="mt-10 grid gap-px border-t border-glass-border md:grid-cols-3">
          {perfOs.gap.map((item, i) => (
            <li key={item.title} className="reveal border-b border-glass-border py-6 pr-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <h3 className="text-h2 text-bone">{item.title}</h3>
              <p className="mt-3 text-small text-bone-2">{item.body}</p>
            </li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection
        n="04"
        label="Architecture"
        title="Two runtimes, one language, one contract"
        lede="An Angular 19 client and a Node/Express service, talking over a REST surface deliberately split into many small endpoints rather than one long-running call."
      >
        <ArchitectureDiagram />
      </CaseSection>

      <CaseSection
        n="05"
        label="Scanning"
        title="The repository is the input"
        lede="PerfOS starts where the decisions were made. A frontend repository goes in; the scanner walks the sources and assembles the working set that every later stage reads from."
      >
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="border-t border-glass-border pt-5">
            <p className="label">What it reads</p>
            <p className="mt-3 text-body text-bone-2">Source files and the relationships between them: what imports what, and what nothing imports at all.</p>
          </div>
          <div className="border-t border-glass-border pt-5">
            <p className="label">Implementation detail</p>
            <p className="mt-3 text-body text-bone-2">Traversal and module resolution specifics are documented in the repository rather than paraphrased here.</p>
          </div>
        </div>
      </CaseSection>

      <CaseSection n="06" label="Pipeline" title="Detection, stage by stage" lede="Seven stages between a repository URL and something an engineer can act on.">
        <PipelineDiagram />
      </CaseSection>

      <CaseSection
        n="07"
        label="AI analysis"
        title="The engine decides, the model explains"
        lede="PerfOS uses the Claude SDK as its analysis layer. The boundary I built to is a narrow one, and it is the reason the output is worth reading."
      >
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="reveal glass p-6 md:p-8">
            <p className="label">Deterministic</p>
            <h3 className="mt-4 text-h1 text-bone">Detection</h3>
            <p className="mt-3 text-small text-bone-2">Whether a cycle exists is not a matter of opinion. Classification is code, and it is reproducible across runs.</p>
          </div>
          <div className="reveal rounded-lg border border-signature/25 bg-signature/[0.06] p-6 md:p-8" style={{ transitionDelay: '90ms' }}>
            <p className="label text-signature">Generative</p>
            <h3 className="mt-4 text-h1 text-bone">Explanation</h3>
            <p className="mt-3 text-small text-bone-2">Why a finding matters to the person reading it, in language they will act on. A model that invents a finding is a bug; a model that writes a clearer sentence is the point.</p>
          </div>
        </div>
        <p className="label mt-6">Model configuration and prompt design are documented in the repository.</p>
      </CaseSection>

      <CaseSection n="08" label="Findings" title="Six categories, four described here" lede="Each finding arrives with its category and its location, so it can be dismissed in seconds when it is wrong.">
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {perfOs.categories.map((category, i) => (
            <li key={category.name} className="reveal group relative overflow-hidden rounded-lg border border-glass-border p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-glass-borderStrong md:p-8" style={{ transitionDelay: `${i * 70}ms` }}>
              <span aria-hidden className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-signature transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <p className="label metric">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-h1 text-bone">{category.name}</h3>
              <p className="mt-3 max-w-prose text-small text-bone-2">{category.body}</p>
            </li>
          ))}
        </ul>
        <p className="label mt-6">{perfOs.categoryNote}</p>
      </CaseSection>

      <CaseSection n="09" label="Decisions" title="What I chose, and what it cost" lede="The decisions that shaped the platform, including the ones that made it smaller.">
        <ol className="mt-10">
          {perfOs.decisions.map((decision, i) => (
            <li key={decision.n} className="reveal grid gap-y-3 border-t border-glass-border py-8 md:grid-cols-12 md:gap-x-8" style={{ transitionDelay: `${i * 60}ms` }}>
              <p className="metric label md:col-span-2">{decision.n}</p>
              <div className="md:col-span-10">
                <h3 className="text-h1 text-bone">{decision.title}</h3>
                <p className="mt-3 max-w-prose text-body text-bone-2">{decision.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </CaseSection>

      <CaseSection n="10" label="Performance" title="Measured, not asserted" lede="A platform about performance should not make unmeasured claims about its own. Scan timings and throughput are recorded in the repository; they are not summarised here until they can be reproduced.">
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Awaiting label="Scan timings" detail="Benchmark numbers to be published alongside the method used to produce them." />
          <Awaiting label="Throughput by repository size" detail="To be added once measured across a consistent sample." />
        </div>
      </CaseSection>

      <CaseSection n="11" label="Next" title="Where it goes" lede="The platform is useful today as an audit. The direction is to make it something a team never has to remember to run.">
        <ul className="mt-10">
          {perfOs.future.map((item, i) => (
            <li key={item} className="reveal flex gap-5 border-t border-glass-border py-6" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="metric font-mono text-micro text-bone-4">{String(i + 1).padStart(2, '0')}</span>
              <p className="max-w-prose text-body text-bone-2">{item}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <a href={site.links.perfOsDemo} target="_blank" rel="noopener noreferrer" data-cursor="open" className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-bone px-5 font-mono text-micro uppercase tracking-[0.14em] text-void transition-colors duration-300 hover:bg-signature">
            Live demo <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a href={site.links.perfOsRepo} target="_blank" rel="noopener noreferrer" data-cursor="open" className="glass inline-flex h-11 items-center gap-2.5 rounded-full px-5 font-mono text-micro uppercase tracking-[0.14em] text-bone">
            GitHub
          </a>
        </div>
      </CaseSection>

      <CaseFooterNav slug="perf-os" />
    </article>
  );
}
