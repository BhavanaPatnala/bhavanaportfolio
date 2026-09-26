'use client';

import dynamic from 'next/dynamic';
import type { RefObject } from 'react';
import JourneyFallback from './JourneyFallback';
import { use3DReadiness } from '@/lib/use3DReadiness';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/cn';

const JourneyCanvas = dynamic(() => import('./JourneyCanvas'), { ssr: false });

export default function JourneyScene({
  className,
  progress,
  activeStage,
}: {
  className?: string;
  progress: RefObject<number>;
  activeStage: RefObject<number>;
}) {
  const { tier, showCanvas } = use3DReadiness();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('absolute inset-0 h-full w-full overflow-hidden', className)}>
      <JourneyFallback
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          showCanvas ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showCanvas && tier && (
        <JourneyCanvas tier={tier} progress={progress} activeStage={activeStage} frameloop={inView ? 'always' : 'never'} />
      )}
    </div>
  );
}
