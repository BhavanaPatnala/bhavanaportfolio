'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

import { useLockBody } from '@/lib/useLockBody';

export type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  meta?: string;
  width?: number;
  height?: number;
  href?: string;
  hrefLabel?: string;
};

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

/**
 * Modal document viewer. Traps focus, restores it on close, closes on Escape or
 * backdrop, and steps through the set with the arrow keys.
 */
export default function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const item = open ? items[index] : null;

  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    const t = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }, 20);
    return () => {
      window.clearTimeout(t);
      restoreRef.current?.focus?.();
    };
  }, [open]);

  const step = useCallback(
    (dir: number) => {
      if (index === null || items.length < 2) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        step(1);
      } else if (e.key === 'ArrowLeft') {
        step(-1);
      } else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables?.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, step]);

  if (!open || !item) return null;

  return (
    <div
      className="overlay-in fixed inset-0 z-[80] flex items-center justify-center bg-void/92 p-4 backdrop-blur-sm md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="flex max-h-full w-full max-w-5xl flex-col"
      >
        <div className="flex items-start justify-between gap-6 pb-4">
          <div className="min-w-0">
            <p className="text-h2 text-bone">{item.title}</p>
            {item.meta && <p className="label mt-1.5 text-bone-4">{item.meta}</p>}
          </div>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="label shrink-0 rounded-sm border border-[rgba(244,240,232,0.16)] px-3 py-2 text-bone transition-colors hover:border-bone"
          >
            Close
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-auto border border-[rgba(244,240,232,0.12)] bg-[#0A0908]">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width ?? 1600}
            height={item.height ?? 1200}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="mx-auto h-auto w-full max-w-full object-contain"
            priority={false}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-2">
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="label rounded-sm border border-[rgba(244,240,232,0.16)] px-3 py-2 text-bone transition-colors hover:border-bone"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="label rounded-sm border border-[rgba(244,240,232,0.16)] px-3 py-2 text-bone transition-colors hover:border-bone"
                >
                  Next
                </button>
                <span className="label ml-2 text-bone-4 metric">
                  {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </>
            )}
          </div>
          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-signature underline-offset-4 hover:underline"
            >
              {item.hrefLabel ?? 'Verify'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
