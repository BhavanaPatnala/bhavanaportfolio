'use client';

import { useState } from 'react';

import ScreenshotFrame from './ScreenshotFrame';
import Lightbox, { type LightboxItem } from '@/components/ui/Lightbox';

type Shot = { id: string; file: string; label: string; caption: string; url: string };

/**
 * Owns the one Lightbox instance for the product tour: each frame is a
 * thumbnail-sized crop, so every one opens full-size on click rather than
 * leaving the crop as the only view of it.
 */
export default function ProductGallery({ shots, dir }: { shots: Shot[]; dir: string }) {
  const [index, setIndex] = useState<number | null>(null);

  const items: LightboxItem[] = shots.map((shot) => ({
    src: `${dir}/${shot.file}`,
    alt: shot.label,
    title: shot.label,
    meta: shot.caption,
  }));

  return (
    <>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <ScreenshotFrame
            key={shot.id}
            src={`${dir}/${shot.file}`}
            alt={shot.label}
            label={shot.label}
            caption={shot.caption}
            url={shot.url}
            onOpen={() => setIndex(i)}
            className={i === 0 ? 'sm:col-span-2' : undefined}
            style={{ transitionDelay: `${(i % 4) * 60}ms` }}
          />
        ))}
      </div>

      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
