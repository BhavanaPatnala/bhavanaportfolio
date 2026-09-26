'use client';

import dynamic from 'next/dynamic';
import SignalGraphFallback from './SignalGraphFallback';
import { use3DReadiness } from '@/lib/use3DReadiness';
import { useInView } from '@/lib/useInView';
import { cn } from '@/lib/cn';

const SignalGraphCanvas = dynamic(() => import('./SignalGraphCanvas'), { ssr: false });

export default function AiLabScene({ className }: { className?: string }) {
  const { tier, showCanvas } = use3DReadiness();
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn('absolute inset-0 h-full w-full overflow-hidden', className)}>
      <SignalGraphFallback
        className={cn(
          'absolute inset-0 h-full w-full transition-opacity duration-700',
          showCanvas ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showCanvas && tier && <SignalGraphCanvas tier={tier} frameloop={inView ? 'always' : 'never'} />}
    </div>
  );
}
