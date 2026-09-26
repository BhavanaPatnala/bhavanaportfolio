import { cn } from '@/lib/cn';

/** Honest empty state — used wherever material has not been supplied yet,
 *  so the page never invents a fact or shows a broken image. */
export default function Awaiting({
  label = 'Awaiting source material',
  detail,
  className,
  height = 'min-h-[140px]',
}: {
  label?: string;
  detail?: string;
  className?: string;
  height?: string;
}) {
  return (
    <div className={cn('flex flex-col justify-end rounded-lg border border-dashed border-glass-borderStrong p-5', height, className)}>
      <p className="label">{label}</p>
      {detail && <p className="mt-2 max-w-[42ch] text-small text-bone-3">{detail}</p>}
    </div>
  );
}
