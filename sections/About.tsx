import { positioning } from '@/data/positioning';
import { site } from '@/data/site';

/**
 * No 3D backdrop here, deliberately — after five environments, the plainest
 * section on the site is the one making the plainest claim: what the work
 * actually is, stated three ways rather than illustrated once.
 */
export default function About() {
  return (
    <section id="about" className="relative bg-void py-section">
      <div className="shell">
        <p className="eyebrow reveal">
          <span className="metric text-bone-4">05</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
          <span>About</span>
        </p>

        <h2 className="reveal mt-8 max-w-[680px] text-d2 text-bone">
          Twelve years, one product,
          <br />
          four roles.
        </h2>

        <p className="reveal mt-6 max-w-prose text-lede text-bone-2" style={{ transitionDelay: '80ms' }}>
          {site.summary} Based in {site.location}.
        </p>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-glass-border bg-glass-border md:mt-20 md:grid-cols-3">
          {positioning.map((column, ci) => (
            <div key={column.n} className="reveal bg-void p-7 md:p-8" style={{ transitionDelay: `${ci * 90}ms` }}>
              <p className="label text-bone-4">
                {column.n} — {column.title}
              </p>
              <ul className="mt-6 space-y-5">
                {column.items.map((item) => (
                  <li key={item.label} className="border-t border-glass-border pt-4 first:border-t-0 first:pt-0">
                    <p className="text-body text-bone">{item.label}</p>
                    <p className="mt-1.5 text-small text-bone-3">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
