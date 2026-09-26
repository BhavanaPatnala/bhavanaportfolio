'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { Certification } from '@/data/certifications';
import Lightbox, { type LightboxItem } from './Lightbox';

/** A floating glass archive of the certificates themselves — each tile
 *  opens the original document, never a paraphrase of it. */
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cert, i) => {
          const viewIndex = viewable.findIndex((c) => c.id === cert.id);
          return (
            <li key={cert.id} className="reveal" style={{ transitionDelay: `${(i % 6) * 60}ms` }}>
              <button
                type="button"
                onClick={() => viewIndex >= 0 && setIndex(viewIndex)}
                disabled={viewIndex < 0}
                data-cursor={viewIndex >= 0 ? 'view' : undefined}
                aria-label={`View ${cert.title} certificate`}
                className="group glass block h-full w-full rounded-xl p-0 text-left transition-transform duration-500 ease-out hover:-translate-y-1 disabled:cursor-default disabled:hover:translate-y-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl border-b border-glass-border bg-void-sunken">
                  {cert.image ? (
                    <Image
                      src={cert.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
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
            </li>
          );
        })}
      </ul>

      <Lightbox items={lightboxItems} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
