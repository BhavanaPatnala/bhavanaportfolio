import Link from 'next/link';
import AiLabScene from '@/components/3d/AiLabScene';
import ProjectMark from '@/components/ui/ProjectMark';
import { themes } from '@/data/thinking';
import { projectBySlug } from '@/data/projects';
import { certifications } from '@/data/certifications';

const STATUS_LABEL = { live: 'Live', 'in-development': 'In development', documenting: 'Documenting' } as const;

const positions = themes.filter((t) => t.id === 'ai-engineering' || t.id === 'human-centered-ai');
const labSlugs = ['perf-os', 'ai-violation-detection', 'ai-debate-system'] as const;
const mlCert = certifications.find((c) => c.id === 'supervised-ml');

/**
 * A distinct environment from the rest of the site: the model, not the
 * product, is the subject. A small signal graph — outer nodes feeding a
 * central one — stands in for the same idea the copy states directly:
 * deterministic code decides, the model explains.
 */
export default function AiLab() {
  return (
    <section id="ai-lab" className="relative isolate overflow-hidden bg-void py-section">
      <AiLabScene className="-z-10 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            'linear-gradient(90deg, rgba(13,12,11,0.92) 0%, rgba(13,12,11,0.72) 45%, transparent 75%), linear-gradient(180deg, rgba(13,12,11,0.7) 0%, transparent 18%, transparent 82%, rgba(13,12,11,0.7) 100%)',
        }}
      />

      <div className="shell">
        <p className="eyebrow reveal">
          <span className="metric text-bone-4">03</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
          <span>AI Lab</span>
        </p>

        <h2 className="reveal mt-8 max-w-[620px] text-d2 text-bone">
          The model explains.
          <br />
          The system decides.
        </h2>

        <p className="reveal mt-6 max-w-prose text-lede text-bone-2" style={{ transitionDelay: '80ms' }}>
          Where AI actually sits in the work: a boundary, not a black box —
          deterministic code produces the finding, the model turns it into
          something a tired engineer will act on.
        </p>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {positions.map((theme, i) => (
            <div
              key={theme.id}
              className="reveal glass rounded-2xl p-7 md:p-8"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <p className="label text-bone-4">{theme.title}</p>
              <p className="mt-4 text-h2 leading-snug text-bone">{theme.position}</p>
              <p className="mt-4 text-small text-bone-3">{theme.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <p className="label reveal text-bone-4">In the lab</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-3">
            {labSlugs.map((slug, i) => {
              const project = projectBySlug(slug);
              if (!project) return null;
              return (
                <li key={slug} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <Link
                    href={`/work/${slug}`}
                    data-cursor="view"
                    className="group glass block h-full rounded-2xl p-6 transition-transform duration-500 ease-out hover:-translate-y-1"
                  >
                    <div className="h-16 w-full text-bone-3">
                      <ProjectMark slug={slug} />
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-3">
                      <h3 className="text-body text-bone transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                        {project.title}
                      </h3>
                      <span
                        className={
                          'label shrink-0 ' + (project.status === 'live' ? 'text-bone-2' : 'text-bone-4')
                        }
                      >
                        {STATUS_LABEL[project.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-small text-bone-3">{project.kicker}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {mlCert && (
          <p className="reveal mt-12 border-t border-glass-border pt-6 font-mono text-micro uppercase tracking-[0.1em] text-bone-4">
            Grounded in — {mlCert.title}, {mlCert.issuedBy ?? mlCert.issuer} · {mlCert.date}
            {mlCert.verifyUrl && (
              <>
                {' '}
                ·{' '}
                <a
                  href={mlCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signature underline-offset-4 hover:underline"
                >
                  Verify
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
