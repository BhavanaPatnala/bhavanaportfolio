'use client';

import dynamic from 'next/dynamic';

import HeroCoreFallback from './HeroCoreFallback';
import { use3DReadiness } from '@/lib/use3DReadiness';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/cn';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

/**
 * The adaptive entry point. Reduced motion or a genuinely low-tier device
 * never loads the WebGL chunk at all — they get the static line-art core
 * permanently, which is the honest reading of "remove 3D transitions but
 * keep the site fully usable" rather than a degraded, still-animated scene.
 */
export default function HeroScene({ className }: { className?: string }) {
  const { tier, showCanvas, reportContextLost } = use3DReadiness();
  const { ref, inView, hasBeenInView } = useInView<HTMLDivElement>();

  // Always absolutely positioned, filling its nearest positioned ancestor —
  // this component has exactly one use (a full-bleed backdrop), so its own
  // positioning is never left ambiguous with whatever the caller's
  // className happens to also contain. `className` only adds z-index/etc.
  return (
    <div ref={ref} className={cn('absolute inset-0 h-full w-full overflow-hidden', className)}>
      <HeroCoreFallback
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          showCanvas ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showCanvas && tier && hasBeenInView && (
        <HeroCanvas tier={tier} frameloop={inView ? 'always' : 'never'} onContextLost={reportContextLost} />
      )}
    </div>
  );
}
