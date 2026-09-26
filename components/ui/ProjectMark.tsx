import { cn } from '@/lib/cn';

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' } as const;

/**
 * One abstract mark per project — each communicates the shape of the
 * system, not a screenshot. Distinct visual grammar per slug so the four
 * cards never blur into interchangeable tiles.
 */
export default function ProjectMark({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden className={cn('h-full w-full', className)} preserveAspectRatio="xMidYMid meet">
      {slug === 'perf-os' && <PerfOsMark />}
      {slug === 'ai-violation-detection' && <ViolationMark />}
      {slug === 'aveniq' && <AveniqMark />}
    </svg>
  );
}

/* Repository -> scan lens -> classified findings */
function PerfOsMark() {
  return (
    <g>
      <rect x="20" y="20" width="60" height="76" rx="2" {...stroke} opacity="0.5" />
      <line x1="32" y1="38" x2="68" y2="38" {...stroke} opacity="0.4" />
      <line x1="32" y1="50" x2="60" y2="50" {...stroke} opacity="0.4" />
      <line x1="32" y1="62" x2="64" y2="62" {...stroke} opacity="0.4" />
      <circle cx="120" cy="58" r="22" stroke="#E07A4C" strokeWidth="1.25" fill="none" vectorEffect="non-scaling-stroke" />
      <line x1="136" y1="74" x2="150" y2="88" stroke="#E07A4C" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
      {[[168, 30], [178, 58], [168, 86]].map(([x, y], i) => (
        <rect key={i} x={x} y={y - 5} width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      ))}
    </g>
  );
}

/* Frame with a detection box and confidence readout */
function ViolationMark() {
  return (
    <g>
      <rect x="24" y="22" width="152" height="96" {...stroke} opacity="0.4" />
      {[[24, 22], [176, 22], [24, 118], [176, 118]].map(([x, y], i) => (
        <g key={i} stroke="currentColor" strokeWidth="1" opacity="0.8">
          <line x1={x - 6} y1={y} x2={x + 6} y2={y} vectorEffect="non-scaling-stroke" />
          <line x1={x} y1={y - 6} x2={x} y2={y + 6} vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      <rect x="72" y="46" width="56" height="56" stroke="#E07A4C" strokeWidth="1.25" fill="none" vectorEffect="non-scaling-stroke" />
      <rect x="72" y="38" width="30" height="10" fill="#E07A4C" />
    </g>
  );
}

/* Four nodes converging on one verdict mark */
function AveniqMark() {
  const nodes: [number, number][] = [[100, 28], [166, 75], [100, 122], [34, 75]];
  return (
    <g>
      {nodes.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2="100" y2="75" {...stroke} opacity="0.4" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" {...stroke} opacity="0.7" />
      ))}
      <rect x="90" y="65" width="20" height="20" transform="rotate(45 100 75)" fill="none" stroke="#E07A4C" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
    </g>
  );
}
