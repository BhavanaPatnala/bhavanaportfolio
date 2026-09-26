import Link from 'next/link';
import HeroScene from '@/components/3d/HeroScene';
import { site } from '@/data/site';

/**
 * The opening shot. The 3D core sits as an atmospheric backdrop — never the
 * thing competing for attention — with a vignette guaranteeing the
 * typography in front of it stays legible at every viewport size.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      <HeroScene className="-z-10" />

      {/* Vignette: a left-anchored gradient guarantees the text column stays
          legible regardless of exactly where the object renders — contrast
          for the copy is never left dependent on precisely dodging it. The
          radial glow is atmosphere only, not load-bearing for contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            'radial-gradient(60% 70% at 76% 46%, rgba(224,122,76,0.05) 0%, transparent 60%), linear-gradient(90deg, rgba(13,12,11,0.94) 0%, rgba(13,12,11,0.86) 38%, rgba(13,12,11,0.45) 58%, transparent 78%), linear-gradient(180deg, rgba(13,12,11,0.6) 0%, transparent 20%, transparent 66%, rgba(13,12,11,0.88) 100%)',
        }}
      />

      <div className="shell flex flex-1 flex-col justify-between pb-10 pt-[calc(var(--nav-h)+2.5rem)] md:pb-14">
        <div className="fade-up flex items-center justify-between gap-6 border-b border-glass-border pb-4" style={{ animationDelay: '120ms' }}>
          <p className="label">Portfolio — {site.location}</p>
          <p className="label text-bone-4 metric">2014 → Present</p>
        </div>

        <div className="flex flex-1 flex-col justify-center py-12 md:py-16">
          <h1 id="hero-title" className="max-w-[320px] sm:max-w-[460px] lg:max-w-[620px]">
            <span className="fade-up block font-mono text-meta uppercase tracking-[0.2em] text-bone-3" style={{ animationDelay: '260ms' }}>
              Bhavana P <span className="text-bone-4">/</span> <span className="text-bone">{site.role}</span>
            </span>

            <span className="mt-7 block text-d2 text-bone md:mt-9">
              <span className="kinetic-line"><span style={{ animationDelay: '380ms' }}>Building</span></span>
              <span className="kinetic-line"><span style={{ animationDelay: '440ms' }}>systems,</span></span>
              <span className="kinetic-line"><span style={{ animationDelay: '500ms' }}>products &amp;</span></span>
              <span className="kinetic-line"><span style={{ animationDelay: '560ms' }}>intelligent</span></span>
              <span className="kinetic-line">
                <span style={{ animationDelay: '620ms' }} className="text-signature">experiences.</span>
              </span>
            </span>
          </h1>

          <div className="mt-12 grid gap-y-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-x-8">
            <p className="fade-up max-w-[50ch] text-lede text-bone-2 md:col-span-6 xl:col-span-5" style={{ animationDelay: '760ms' }}>
              {site.summary}
            </p>

            <div className="md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-9">
              <div className="fade-up flex items-baseline gap-3" style={{ animationDelay: '840ms' }}>
                <span className="metric font-mono text-d3 leading-none text-bone">{site.yearsExperience}</span>
                <span className="label">Years software engineering</span>
              </div>

              <div className="fade-up mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '900ms' }}>
                <Link
                  href="/#work"
                  data-cursor="link"
                  className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-bone px-5 font-mono text-micro uppercase tracking-[0.14em] text-void transition-colors duration-300 hover:bg-signature"
                >
                  Explore work
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/resume"
                  data-cursor="link"
                  className="glass inline-flex h-11 items-center gap-2.5 rounded-full px-5 font-mono text-micro uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-glass-borderStrong"
                >
                  View resume
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-up grid gap-y-4 border-t border-glass-border pt-4 md:grid-cols-12" style={{ animationDelay: '1020ms' }}>
          <p className="label hidden sm:block md:col-span-4">{site.company}</p>
          <p className="label hidden text-bone-4 sm:block md:col-span-5">
            Angular · TypeScript · Performance · AI-assisted tooling
          </p>
          <p className="label flex items-center gap-2 text-bone-3 md:col-span-3 md:justify-end">
            Scroll
            <span aria-hidden className="inline-block h-3 w-px animate-pulse bg-signature" />
          </p>
        </div>
      </div>
    </section>
  );
}
