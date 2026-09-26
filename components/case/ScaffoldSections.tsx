import type { ReactNode } from 'react';
import type { ScaffoldSection } from '@/data/projects';
import { CaseSection } from './CaseSection';
import Awaiting from '@/components/ui/Awaiting';

/**
 * Renders the case-study outline. A section with authored copy prints it; a
 * section still waiting on material prints a labelled slot naming exactly what
 * goes there. Adding the copy to the data file is the only edit needed.
 */
export default function ScaffoldSections({
  sections,
  offset = 0,
  inserts = {},
}: {
  sections: ScaffoldSection[];
  offset?: number;
  inserts?: Record<string, ReactNode>;
}) {
  return (
    <>
      {sections.map((section, i) => (
        <CaseSection
          key={section.id}
          id={section.id}
          n={String(i + 1 + offset).padStart(2, '0')}
          label={section.title}
          title={section.title}
        >
          {section.body ? (
            <p className="reveal mt-6 max-w-prose text-lede text-bone-2">{section.body}</p>
          ) : (
            <div className="mt-8">
              <Awaiting label="Awaiting source material" detail={section.awaiting} height="min-h-[132px]" />
            </div>
          )}
          {inserts[section.id]}
        </CaseSection>
      ))}
    </>
  );
}
