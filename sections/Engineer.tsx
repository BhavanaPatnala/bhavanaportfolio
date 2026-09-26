import EngineerScene from '@/components/3d/EngineerScene';
import { site } from '@/data/site';
import { roles } from '@/data/experience';

const tags = ['Angular', 'TypeScript', 'Architecture', 'Performance', 'AI', 'Product Engineering'];
const current = roles[0];

/**
 * The introduction, without a conventional biography. A stack of
 * translucent panels sits behind the type — the same "layers" idea Clariti
 * develops properly later, introduced here at ambient scale.
 */
export default function Engineer() {
  return (
    <section id="engineer" className="relative isolate overflow-hidden py-section">
      <EngineerScene className="-z-10 opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            'linear-gradient(90deg, rgba(13,12,11,0.92) 0%, rgba(13,12,11,0.75) 42%, transparent 72%), linear-gradient(180deg, rgba(13,12,11,0.7) 0%, transparent 18%, transparent 82%, rgba(13,12,11,0.7) 100%)',
        }}
      />

      <div className="shell">
        <p className="eyebrow reveal">
          <span className="metric text-bone-4">01</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
          <span>The engineer</span>
        </p>

        <h2 className="reveal mt-8 max-w-[600px] text-d2 text-bone">
          {site.yearsExperience} years
          <br />
          of building
          <br />
          software.
        </h2>

        <div className="reveal mt-10 max-w-prose" style={{ transitionDelay: '120ms' }}>
          <p className="text-lede text-bone-2">{site.summary}</p>
          <p className="mt-5 text-body text-bone-3">
            All {site.yearsExperience} years of it at {current.company} — every one on Clariti,
            a production business application for email, chat, social and documents — most
            recently as {current.title}, architecting its components and owning release work for
            its live deployment.
          </p>
        </div>

        <ul className="reveal mt-8 flex flex-wrap gap-2.5" style={{ transitionDelay: '200ms' }}>
          {tags.map((tag) => (
            <li
              key={tag}
              className="glass rounded-full px-4 py-2 font-mono text-micro uppercase tracking-[0.12em] text-bone-2"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
