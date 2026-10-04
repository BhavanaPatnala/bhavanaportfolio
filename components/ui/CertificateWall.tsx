'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { Certification } from '@/data/certifications';
import Lightbox, { type LightboxItem } from './Lightbox';
import TiltCard from './TiltCard';

/**
 * Each certificate is a physical sheet: a solid card with two sheets stacked
 * behind it in real 3D depth (CSS perspective, no extra WebGL context), a
 * shadow that deepens as the sheet lifts, and the same pointer tilt and light
 * as the project cards. Keyboard focus lifts the sheet exactly as hover does.
 * Reduced motion keeps the stacked depth but drops every movement. Each tile
 * still opens the original document, never a paraphrase of it.
 */
export default function CertificateWall({ items }: { items: Certification[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const viewable = items.filter((c) => c.image);
  const lightboxItems: LightboxItem[] = viewable.map((c) => ({
    src: c.image as string,
    alt: `${c.title} certificate issued by ${c.issuer}`,
    title: c.title,
    meta: [c.issuer, c.detail, c.credentialId && `ID ${c.credentialId}`].filter(Boolean).join('  ·  '),
    width: c.width,
    height: c.height,
    href: c.verifyUrl,
    hrefLabel: 'Verify credential',
  }));

  return (
    <>
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cert, i) => {
          const viewIndex = viewable.findIndex((c) => c.id === cert.id);
          return (
            <li
              key={cert.id}
              className="reveal"
              style={{ transitionDelay: `${(i % 6) * 60}ms`, perspective: '1200px' }}
            >
              <TiltCard className="h-full">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl border border-glass-border bg-void-raised"
                  style={{ transform: 'translateZ(-12px) translate(7px, 7px)', opacity: 0.55 }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl border border-glass-border bg-void-raised"
                  style={{ transform: 'translateZ(-24px) translate(14px, 14px)', opacity: 0.3 }}
                />
                <button
                  type="button"
                  onClick={() => viewIndex >= 0 && setIndex(viewIndex)}
                  disabled={viewIndex < 0}
                  data-cursor={viewIndex >= 0 ? 'view' : undefined}
                  aria-label={`View ${cert.title} certificate`}
                  className="group relative block h-full w-full rounded-xl border border-glass-border bg-void-raised text-left shadow-[0_28px_60px_-28px_rgba(0,0,0,0.85)] transition-[transform,box-shadow] duration-500 ease-out motion-safe:hover:[transform:translateZ(22px)] motion-safe:focus-visible:[transform:translateZ(22px)] hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] focus-visible:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] disabled:cursor-default disabled:hover:[transform:none]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl border-b border-glass-border bg-void-sunken">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover object-top transition-transform duration-[900ms] ease-out motion-safe:group-hover:scale-[1.02]"
                      />
                    ) : (
                      <span className="label absolute bottom-4 left-4 text-bone-4">Document to be added</span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <h3 className="text-body leading-snug text-bone">{cert.title}</h3>
                      <p className="mt-1.5 text-small text-bone-3">
                        {cert.issuedBy ?? cert.issuer}
                        {cert.issuedBy ? ` · via ${cert.issuer}` : ''}
                      </p>
                    </div>
                    <p className="label shrink-0 text-bone-4">{cert.date}</p>
                  </div>
                </button>
              </TiltCard>
            </li>
          );
        })}
      </ul>

      <Lightbox items={lightboxItems} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
