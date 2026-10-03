'use client';

import dynamic from 'next/dynamic';
import EvidenceFieldFallback from './EvidenceFieldFallback';
import { use3DReadiness } from '@/lib/use3DReadiness';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/cn';

const EvidenceFieldCanvas = dynamic(() => import('./EvidenceFieldCanvas'), { ssr: false });

export default function RecognitionScene({ className }: { className?: string }) {
  const { tier, showCanvas, reportContextLost } = use3DReadiness();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('absolute inset-0 h-full w-full overflow-hidden', className)}>
      <EvidenceFieldFallback
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          showCanvas ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showCanvas && tier && (
        <EvidenceFieldCanvas tier={tier} frameloop={inView ? 'always' : 'never'} onContextLost={reportContextLost} />
      )}
    </div>
  );
}
