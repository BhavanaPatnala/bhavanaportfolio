import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function CaseSection({
  id,
  n,
  label,
  title,
  lede,
  children,
  className,
}: {
  id?: string;
  n: string;
  label: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('shell scroll-mt-24 py-16 md:py-24', className)}>
      <div className="reveal hairline bg-glass-border" />
      <div className="mt-10 grid gap-y-8 md:mt-14 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-3">
          <p className="eyebrow reveal sticky top-[calc(var(--nav-h)+2rem)]">
            <span className="metric text-bone-4">{n}</span>
            <span aria-hidden className="h-px w-6 bg-current opacity-30" />
            <span>{label}</span>
          </p>
        </div>
        <div className="md:col-span-9">
          {title && <h2 className="reveal text-d3 text-bone">{title}</h2>}
          {lede && <div className="reveal mt-6 max-w-prose text-lede text-bone-2">{lede}</div>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function CaseProse({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-8 max-w-prose space-y-5">
      {paragraphs.map((p, i) => (
        <p key={i} className="reveal text-body text-bone-2" style={{ transitionDelay: `${i * 60}ms` }}>
          {p}
        </p>
      ))}
    </div>
  );
}
