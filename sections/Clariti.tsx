'use client';

import { useEffect, useState } from 'react';
import ClaritiScene from '@/components/3d/ClaritiScene';
import { useStickyScrollProgress } from '@/lib/scrollProgress';
import { claritiFacts, workstreams } from '@/data/clariti';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

const LAYER_LABELS = ['Interface', 'Components', 'Architecture', 'Data / Services', 'Production'];

/**
 * The pinned scroll region separates five layers of one production
 * application as the visitor scrolls through it — the complexity made
 * visible rather than described. What follows in normal flow is the
 * résumé-grounded detail: exactly what was built in each of those layers.
 */
export default function Clariti() {
  const { ref, progress } = useStickyScrollProgress<HTMLDivElement>();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const next = Math.min(4, Math.floor((progress.current ?? 0) * 5));
      setStage((prev) => (prev === next ? prev : next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  return (
    <section id="work" className="relative">
      {/* A dedicated spacer, decoupled from whatever content follows it —
          the pinned duration must come from this element's own height, not
          from however tall the detail block below happens to be. Mixing
          the two meant the layers had already finished separating a third
          of the way through the intended scroll story. */}
      <div ref={ref} id="work-pin" className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <ClaritiScene className="-z-10" progress={progress} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[5]"
          style={{
            background:
              'linear-gradient(90deg, rgba(13,12,11,0.9) 0%, rgba(13,12,11,0.55) 46%, transparent 72%), linear-gradient(180deg, rgba(13,12,11,0.7) 0%, transparent 20%, transparent 80%, rgba(13,12,11,0.85) 100%)',
          }}
        />

        <div className="shell flex flex-1 flex-col justify-center py-section">
          <p className="eyebrow">
            <span className="metric text-bone-4">02</span>
            <span aria-hidden className="h-px w-6 bg-current opacity-30" />
            <span>Production scale</span>
          </p>

          <h2 className="mt-8 max-w-[560px] text-d2 text-bone">
            Building at
            <br />
            production
            <br />
            <span className="text-signature">scale.</span>
          </h2>

          <p className="mt-6 max-w-prose text-lede text-bone-2">
            Clariti — a business application for emails, chats, social media and documents,
            built at {site.company}. Twelve years of it in four roles.
          </p>

          <ul className="mt-10 flex flex-wrap gap-2">
            {LAYER_LABELS.map((label, i) => (
              <li
                key={label}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 font-mono text-micro uppercase tracking-[0.12em] transition-all duration-500',
                  i === stage
                    ? 'glass-strong text-bone'
                    : i < stage
                      ? 'text-bone-3'
                      : 'text-bone-4 opacity-50',
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full transition-colors duration-500',
                    i === stage ? 'bg-signature' : i < stage ? 'bg-bone-3' : 'bg-bone-4',
                  )}
                />
                {label}
              </li>
            ))}
          </ul>

          <p className="label mt-6 text-bone-4">Scroll to separate the layers</p>
        </div>
        </div>
      </div>

      {/* Normal-flow detail, after the pinned intro — the verified facts and
          workstreams behind each layer just shown. */}
      <div className="relative bg-void">
        <div className="shell py-section">
          <div className="reveal hairline mb-14 bg-glass-border md:mb-20" />

          <dl className="reveal grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {claritiFacts.map((fact) => (
              <div key={fact.k} className="border-t border-glass-border py-4">
                <dt className="label">{fact.k}</dt>
                <dd className="mt-2 text-small text-bone-2">{fact.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 md:mt-20">
            <p className="label reveal">What I worked on</p>
            <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-glass-border bg-glass-border sm:grid-cols-2 lg:grid-cols-3">
              {workstreams.map((w, i) => (
                <li
                  key={w.id}
                  className="reveal bg-void-raised p-6"
                  style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-h2 text-bone">{w.label}</h3>
                    <span className="label text-bone-4">{w.period}</span>
                  </div>
                  <p className="mt-3 text-small text-bone-2">{w.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {w.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-small text-bone-3">
                        <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-signature" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
