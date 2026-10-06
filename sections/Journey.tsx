'use client';

import { useEffect, useRef, useState } from 'react';
import JourneyScene from '@/components/3d/JourneyScene';
import { useStickyScrollProgress } from '@/lib/scrollProgress';
import { useReducedMotion } from '@/lib/useMedia';
import { roles } from '@/data/experience';
import { cn } from '@/lib/cn';

const chronological = [...roles].reverse();

/**
 * A cinematic pathway rather than a vertical list: the camera moves along
 * a gentle curve as the visitor scrolls, passing each career stage in
 * order. The movement is a slow lerp toward waypoints already ahead of the
 * camera, never a snap or a spin — nothing here should be disorienting.
 */
export default function Journey() {
  const { ref, progress } = useStickyScrollProgress<HTMLDivElement>();
  const activeStage = useRef(0);
  const [stage, setStage] = useState(0);
  const reduceMotion = useReducedMotion();

  // Scroll so the pinned story lands inside the chosen stage. Progress is
  // measured against the pin's own travel, so the target is the pin's top plus
  // the stage's share of that travel. The small margin keeps the landing inside
  // the stage rather than on its boundary.
  const jumpToStage = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (index / 4 + 0.02) * travel;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const next = Math.min(3, Math.floor((progress.current ?? 0) * 4));
      activeStage.current = next;
      setStage((prev) => (prev === next ? prev : next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  const role = chronological[stage];

  return (
    <section id="experience" className="relative">
      <div ref={ref} id="journey-pin" className="relative" style={{ height: '320vh' }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
          <JourneyScene className="-z-10" progress={progress} activeStage={activeStage} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-[5]"
            style={{
              background:
                'linear-gradient(180deg, rgba(13,12,11,0.35) 0%, transparent 30%, transparent 62%, rgba(13,12,11,0.9) 100%), linear-gradient(90deg, rgba(13,12,11,0.92) 0%, rgba(13,12,11,0.78) 40%, transparent 68%, rgba(13,12,11,0.55) 100%)',
            }}
          />
          {/* On narrow screens the text column spans the full width, so the
              side darkening leaves the right-hand wire crossing body copy.
              A mid-band darkening, mobile only, keeps the scene as atmosphere
              behind the text across the whole width. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-[5] md:hidden"
            style={{
              background:
                'linear-gradient(180deg, transparent 22%, rgba(13,12,11,0.78) 42%, rgba(13,12,11,0.78) 72%, transparent 88%)',
            }}
          />

          <div className="shell relative flex-1">
            <p className="eyebrow pt-section">
              <span className="metric text-bone-4">03</span>
              <span aria-hidden className="h-px w-6 bg-current opacity-30" />
              <span>Engineering journey</span>
            </p>

            <div className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
              <div className="shell grid gap-y-8 md:grid-cols-12 md:items-end md:gap-x-8">
                <div className="md:col-span-7">
                  <p className="metric font-mono text-d3 leading-none text-signature">{role.year}</p>
                  <h3 className="mt-4 text-d2 text-bone">{role.title}</h3>
                  <p className="mt-1.5 text-body text-bone-3">{role.company}</p>
                  <p className="mt-4 max-w-prose text-lede text-bone-2">{role.summary}</p>
                  <ul className="mt-4 max-w-prose space-y-1.5">
                    {role.work.slice(0, 2).map((item) => (
                      <li key={item} className="flex gap-2.5 text-small text-bone-3">
                        <span aria-hidden className="mt-2 h-px w-2.5 shrink-0 bg-signature" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <li key={tech} className="label rounded-full border border-glass-border px-3 py-1.5 text-bone-3">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-5">
                  <ol className="flex items-center gap-3">
                    {chronological.map((r, i) => (
                      <li key={r.id} className="flex flex-1">
                        <button
                          type="button"
                          onClick={() => jumpToStage(i)}
                          aria-current={i === stage ? 'step' : undefined}
                          aria-label={`Go to ${r.year}: ${r.title}`}
                          data-cursor="link"
                          className="tap flex w-full flex-col gap-2 text-left"
                        >
                          <span
                            className={cn(
                              'h-1 rounded-full transition-colors duration-slow',
                              i === stage ? 'bg-signature' : i < stage ? 'bg-bone-3' : 'bg-glass-border',
                            )}
                          />
                          <span
                            className={cn(
                              'label transition-colors duration-slow',
                              i === stage ? 'text-bone' : 'text-bone-4',
                            )}
                          >
                            {r.year}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                  <p className="label mt-4 text-bone-4">Scroll to move along the path</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
