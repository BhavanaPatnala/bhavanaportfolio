'use client';

import dynamic from 'next/dynamic';
import type { RefObject } from 'react';
import ClaritiFallback from './ClaritiFallback';
import { use3DReadiness } from '@/lib/use3DReadiness';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/cn';

const ClaritiCanvas = dynamic(() => import('./ClaritiCanvas'), { ssr: false });

export default function ClaritiScene({
  className,
  progress,
}: {
  className?: string;
  progress: RefObject<number>;
}) {
  const { tier, showCanvas, reportContextLost } = use3DReadiness();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('absolute inset-0 h-full w-full overflow-hidden', className)}>
      <ClaritiFallback
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          showCanvas ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showCanvas && tier && (
        <ClaritiCanvas
          tier={tier}
          progress={progress}
          frameloop={inView ? 'always' : 'never'}
          onContextLost={reportContextLost}
        />
      )}
    </div>
  );
}
