import Link from 'next/link';
import ProjectMark from '@/components/ui/ProjectMark';
import TiltCard from '@/components/ui/TiltCard';
import { projects } from '@/data/projects';
import { cn } from '@/lib/cn';

const STATUS_LABEL = { live: 'Live', 'in-development': 'In development', documenting: 'Documenting' } as const;

/**
 * The project index. Each card gets real physical depth on hover — never
 * a flat tile — and its own abstract mark, so four very different systems
 * read as four different systems rather than four copies of one template.
 */
export default function FeaturedWork() {
  return (
    <section id="featured-work" className="relative bg-void py-section">
      <div className="shell">
        <p className="eyebrow reveal">
          <span className="metric text-bone-4">04</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
          <span>Featured work</span>
        </p>

        <h2 className="reveal mt-8 max-w-[600px] text-d2 text-bone">
          Things
          <br />I build.
        </h2>

        <p className="reveal mt-6 max-w-prose text-lede text-bone-2" style={{ transitionDelay: '80ms' }}>
          Personal systems, built outside product work. Verified where they can be checked;
          clearly marked where the write-up is still in progress.
        </p>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-cursor="view"
              className={cn('reveal block', project.slug === 'perf-os' && 'md:col-span-2')}
              style={{ transitionDelay: `${(i % 4) * 70}ms` }}
            >
              <TiltCard className="glass group h-full rounded-2xl p-7 md:p-9">
                <div
                  className={cn(
                    'grid gap-8',
                    project.slug === 'perf-os' ? 'md:grid-cols-[1fr_1.1fr] md:items-center' : '',
                  )}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="metric font-mono text-micro text-signature">{project.index}</span>
                      <span
                        className={cn(
                          'label flex items-center gap-1.5',
                          project.status === 'live' ? 'text-bone-2' : 'text-bone-4',
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn('h-1.5 w-1.5 rounded-full', project.status === 'live' ? 'bg-signature' : 'bg-bone-4')}
                        />
                        {STATUS_LABEL[project.status]}
                      </span>
                    </div>

                    <h3 className="mt-5 text-d3 text-bone transition-transform duration-500 ease-out group-hover:translate-x-1">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-body text-bone-2">{project.kicker}</p>
                    <p className="mt-4 max-w-[46ch] text-small text-bone-3">{project.summary}</p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="label rounded-full border border-glass-border px-3 py-1.5 text-bone-3">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.facts.length > 0 && (
                      <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-glass-border pt-6">
                        {project.facts.map((fact) => (
                          <div key={fact.label}>
                            <dt className="sr-only">{fact.label}</dt>
                            <dd>
                              <span className="metric block font-mono text-h2 leading-none text-bone">{fact.value}</span>
                              <span className="label mt-1.5 block" aria-hidden>{fact.label}</span>
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>

                  <div className={cn('text-bone-3', project.slug !== 'perf-os' && 'mt-2 aspect-[4/3]')}>
                    <ProjectMark slug={project.slug} />
                  </div>
                </div>
              </TiltCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
