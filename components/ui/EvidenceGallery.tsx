'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { EventRecord } from '@/data/events';
import { useReducedMotion } from '@/lib/useMedia';
import EventCarousel from './EventCarousel';
import Lightbox, { type LightboxItem } from './Lightbox';

/** A horizontally-scrolling archive of jury/evaluator evidence. An event
 *  with no photos yet renders a labelled empty plate — never a broken
 *  image or an invented one. The card nearest the centre of the rail sits
 *  forward in depth; the others recede with distance. */
export default function EvidenceGallery({ events }: { events: EventRecord[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<{ event: string; index: number } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const reduceMotion = useReducedMotion();

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    measure();
    const el = railRef.current;
    if (!el) return;
    el.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (reduceMotion) {
      rail.querySelectorAll<HTMLElement>(':scope > li').forEach((li) => {
        li.style.transform = '';
        li.style.opacity = '';
      });
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = rail.getBoundingClientRect();
      const centre = rect.left + rect.width / 2;
      const half = rect.width / 2;
      rail.querySelectorAll<HTMLElement>(':scope > li').forEach((li) => {
        const r = li.getBoundingClientRect();
        const distance = Math.min(1, Math.abs(r.left + r.width / 2 - centre) / half);
        const depth = 1 - distance;
        li.style.transform = `translateZ(${-70 + 70 * depth}px) scale(${0.9 + 0.1 * depth})`;
        li.style.opacity = String(0.5 + 0.5 * depth);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    rail.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [reduceMotion]);

  const scrollBy = (dir: number) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  const activeEvent = open ? events.find((e) => e.id === open.event) : null;
  const lightboxItems: LightboxItem[] =
    activeEvent?.photos.map((photo) => ({
      src: photo.src,
      alt: photo.alt,
      title: activeEvent.name,
      meta: [activeEvent.host, activeEvent.year].filter(Boolean).join('  ·  '),
      width: photo.width,
      height: photo.height,
    })) ?? [];

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <p className="label text-bone-4">Evidence — {events.length} archives</p>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={edges.start}
            aria-label="Scroll evidence left"
            className="label h-9 w-9 rounded-full border border-glass-borderStrong text-bone transition-colors hover:border-bone disabled:opacity-30 disabled:hover:border-glass-borderStrong"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={edges.end}
            aria-label="Scroll evidence right"
            className="label h-9 w-9 rounded-full border border-glass-borderStrong text-bone transition-colors hover:border-bone disabled:opacity-30 disabled:hover:border-glass-borderStrong"
          >
            →
          </button>
        </div>
      </div>

      <ul
        ref={railRef}
        tabIndex={0}
        aria-label="Event evidence"
        className="mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
        style={{ perspective: '1400px' }}
      >
        {events.map((event) => {
          const hasPhotos = event.photos.length > 0;
          return (
            <li key={event.id} className="w-[82vw] shrink-0 snap-start sm:w-[420px] lg:w-[440px]">
              <article className="glass flex h-full flex-col overflow-hidden rounded-2xl">
                {hasPhotos ? (
                  <EventCarousel
                    photos={event.photos}
                    eventName={event.name}
                    onOpen={(index) => setOpen({ event: event.id, index })}
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full flex-col justify-end border-b border-dashed border-glass-borderStrong p-5">
                    <p className="label text-bone-4">Photographs to be added</p>
                    <p className="mt-2 break-all text-small text-bone-4">{event.folder}/</p>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-body text-bone">{event.name}</h3>
                    {event.year && <p className="label metric text-bone-4">{event.year}</p>}
                  </div>
                  {event.host && <p className="mt-2 text-small text-bone-3">{event.host}</p>}
                  {event.description && <p className="mt-3 text-small text-bone-3">{event.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.roles ? (
                      event.roles.map((role) => (
                        <span
                          key={role}
                          className="label rounded-full border border-glass-borderStrong px-2.5 py-1.5 text-signature"
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="label rounded-full border border-dashed border-glass-borderStrong px-2.5 py-1.5 text-bone-4">
                        Role to be confirmed
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <Lightbox items={lightboxItems} index={open?.index ?? null} onClose={() => setOpen(null)} onIndexChange={(i) => setOpen((prev) => (prev ? { ...prev, index: i } : prev))} />
    </>
  );
}
