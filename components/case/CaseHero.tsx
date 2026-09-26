import Link from 'next/link';
import ProjectMark from '@/components/ui/ProjectMark';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/cn';

const STATUS_LABEL = { live: 'Live', 'in-development': 'In development', documenting: 'Documenting' } as const;

/** The doorway into a project's own room — same dark ground as the rest of
 *  the site, so entering a case study never feels like leaving it. */
export default function CaseHero({ project, tagline }: { project: Project; tagline: string }) {
  return (
    <header className="relative border-b border-glass-border pb-16 pt-[calc(var(--nav-h)+3rem)] md:pb-20 md:pt-[calc(var(--nav-h)+4.5rem)]">
      <div className="shell">
        <Link
          href="/#featured-work"
          data-cursor="link"
          className="tap group inline-flex items-center gap-2 font-mono text-micro uppercase tracking-[0.14em] text-bone-3 transition-colors hover:text-bone"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Work index
        </Link>

        <div className="mt-10 grid gap-y-10 md:mt-14 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-7">
            <p className="eyebrow">
              <span className="metric">{project.index}</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-30" />
              <span>{project.discipline}</span>
            </p>

            <h1 className="mt-6 text-d1 text-bone">{project.title}</h1>
            <p className="mt-4 max-w-prose text-lede text-bone-2">{tagline}</p>
            <p className="mt-6 max-w-prose text-body text-bone-2">{project.standfirst}</p>

            {project.links.length > 0 && (
              <div className="mt-9 flex flex-wrap gap-3">
                {project.links.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    data-cursor="open"
                    className={cn(
                      'group inline-flex h-11 items-center gap-2.5 rounded-full px-5 font-mono text-micro uppercase tracking-[0.14em] transition-colors duration-300',
                      i === 0 ? 'bg-bone text-void hover:bg-signature' : 'glass text-bone hover:border-glass-borderStrong',
                    )}
                  >
                    {link.label}
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="glass aspect-[4/3] p-7 text-bone-3">
              <ProjectMark slug={project.slug} />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <dt className="label">Role</dt>
                <dd className="mt-1.5 text-small text-bone-2">{project.role}</dd>
              </div>
              <div>
                <dt className="label">Year</dt>
                <dd className="mt-1.5 text-small text-bone-2 metric">{project.year}</dd>
              </div>
              <div>
                <dt className="label">Status</dt>
                <dd className="mt-1.5 text-small text-bone-2">{STATUS_LABEL[project.status]}</dd>
              </div>
              <div>
                <dt className="label">Stack</dt>
                <dd className="mt-1.5 text-small text-bone-2">{project.stack.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </div>

        {project.facts.length > 0 && (
          <dl className="mt-16 grid gap-px border-t border-glass-border sm:grid-cols-3 md:mt-20">
            {project.facts.map((fact) => (
              <div key={fact.label} className="border-b border-glass-border py-6 pr-6">
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <span className="metric block font-mono text-d3 leading-none text-bone">{fact.value}</span>
                  <span className="label mt-3 block" aria-hidden>{fact.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
