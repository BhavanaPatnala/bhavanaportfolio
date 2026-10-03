'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { EventPhoto } from '@/data/events';
import { useInView } from '@/lib/useInView';
import { useReducedMotion } from '@/lib/useMedia';
import { cn } from '@/lib/cn';

const AUTO_MS = 4800;
const SWIPE_THRESHOLD = 40;

/**
 * A self-contained carousel for one event's photo archive — crossfades
 * between frames with a slow Ken Burns drift on the active one, autoplays
 * while in view (paused on hover/focus, and never while reduced motion is
 * on), and answers to dots, arrow buttons, swipe and the keyboard alike.
 * Clicking the frame hands off to the shared Lightbox for the full-size view.
 */
export default function EventCarousel({
  photos,
  eventName,
  onOpen,
}: {
  photos: EventPhoto[];
  eventName: string;
  onOpen: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>('0px');
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + photos.length) % photos.length);
    },
    [photos.length],
  );

  useEffect(() => {
    if (reduceMotion || paused || !inView || photos.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % photos.length), AUTO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, inView, photos.length]);

  const multi = photos.length > 1;

  return (
    <div
      ref={ref}
      className="group/carousel relative aspect-[4/3] w-full overflow-hidden border-b border-glass-border bg-void-sunken"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        if (dx > SWIPE_THRESHOLD) go(-1);
        else if (dx < -SWIPE_THRESHOLD) go(1);
        touchStart.current = null;
      }}
    >
      {photos.map((photo, i) => (
        <button
          key={photo.src}
          type="button"
          onClick={() => onOpen(index)}
          data-cursor="explore"
          aria-label={`Open ${eventName} photo ${i + 1} of ${photos.length}`}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
          className={cn(
            'absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-700 ease-out',
            i === index ? 'z-10 opacity-100' : 'z-0 opacity-0',
          )}
        >
          <div key={i === index ? `active-${index}` : i} className={i === index && !reduceMotion ? 'h-full w-full animate-kenburns' : 'h-full w-full'}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 82vw, 440px"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        </button>
      ))}

      <span className="label pointer-events-none absolute bottom-3 right-3 z-20 rounded-full bg-void/80 px-2.5 py-1 text-bone">
        {index + 1} / {photos.length}
      </span>

      {multi && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="tap absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-void/70 text-bone opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="tap absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-void/70 text-bone opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            →
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center pb-1">
            {photos.map((_, i) => (
              // The visible mark stays exactly as small as before — only the
              // button's own box grows to a real 24x24 hit target, since an
              // invisible ::after overlay (the usual .tap pattern) isn't
              // credited by automated target-size checks or every browser's
              // hit-testing, and at 6px tall these dots were measurably
              // under the WCAG 2.5.8 minimum.
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === index}
                className="group flex h-6 w-6 items-center justify-center pointer-events-auto"
              >
                <span
                  aria-hidden
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    i === index ? 'w-5 bg-bone' : 'w-1.5 bg-bone/40 group-hover:bg-bone/70',
                  )}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
