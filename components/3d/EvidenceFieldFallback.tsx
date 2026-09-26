/** Static line-art counterpart to EvidenceField — same sparse silhouette. */
export default function EvidenceFieldFallback({ className }: { className?: string }) {
  const dust = Array.from({ length: 26 }).map((_, i) => {
    const seed = (i * 37) % 100;
    return { x: (seed / 100) * 520, y: ((i * 53) % 100) / 100 * 360, r: (i % 3) + 0.6 };
  });
  const markers: [number, number][] = [[110, 90], [400, 120], [150, 260], [430, 270]];

  return (
    <svg viewBox="0 0 520 360" aria-hidden className={className} fill="none">
      <g fill="#F4F0E8" opacity="0.28">
        {dust.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>
      <g stroke="#E07A4C" strokeOpacity="0.8" strokeWidth="1.1" fill="none">
        {markers.map(([x, y], i) => (
          <rect key={i} x={x - 7} y={y - 7} width="14" height="14" transform={`rotate(45 ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}
