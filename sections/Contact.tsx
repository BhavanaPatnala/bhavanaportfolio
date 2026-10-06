import { site } from '@/data/site';

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
  { label: 'LinkedIn', value: 'in/bhavanarao92', href: site.links.linkedin, external: true },
  { label: 'GitHub', value: 'BhavanaPatnala', href: site.links.github, external: true },
] as const;

/**
 * Forward-looking invitation categories, not a record of past events —
 * deliberately distinct from Recognition, which only ever states what has
 * actually happened. Jury/evaluation/mentoring are listed here too because
 * being invited again for something already done is exactly as honest as
 * being invited for the first time; none of these claim a prior occurrence
 * that isn't true.
 */
const inviteReasons = [
  'Hackathon jury',
  'Technical evaluation',
  'Mentoring',
  'Tech talks',
  'Panel discussions',
  'AI product discussions',
  'Engineering workshops',
] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-glass-border bg-void-raised py-section">
      <div className="shell">
        <p className="eyebrow reveal">
          <span className="metric text-bone-4">06</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
          <span>Contact</span>
        </p>

        <h2 className="reveal mt-8 max-w-[600px] text-d2 text-bone">Let&rsquo;s build something meaningful.</h2>

        <p className="reveal mt-6 max-w-prose text-lede text-bone-2" style={{ transitionDelay: '80ms' }}>
          Open to conversations about frontend architecture, performance work, AI-assisted
          tooling and principal engineering roles.
        </p>

        <div className="reveal mt-10" style={{ transitionDelay: '120ms' }}>
          <p className="label text-bone-4">Invite Bhavana for</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {inviteReasons.map((reason) => (
              <li
                key={reason}
                className="glass rounded-full px-4 py-2 font-mono text-micro uppercase tracking-[0.12em] text-bone-2"
              >
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-14 md:mt-16">
          {channels.map((channel, i) => (
            <li key={channel.label} className="reveal border-t border-glass-border" style={{ transitionDelay: `${i * 70}ms` }}>
              <a
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                data-cursor={channel.external ? 'open' : 'link'}
                className="tap group grid items-baseline gap-y-1 py-7 md:grid-cols-12 md:gap-x-8"
              >
                <span className="label text-bone-4 md:col-span-3">{channel.label}</span>
                <span className="flex items-center gap-3 text-d3 text-bone transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-9">
                  <span className="break-all">{channel.value}</span>
                  <span aria-hidden className="text-signature opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
          <li aria-hidden className="border-t border-glass-border" />
        </ul>

        <p className="reveal mt-10 max-w-prose text-small text-bone-4">
          Based in {site.location}.
        </p>
      </div>
    </section>
  );
}
