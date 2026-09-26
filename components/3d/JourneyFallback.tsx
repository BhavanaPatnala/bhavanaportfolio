/** Static path illustration — the camera never moves without motion, but
 *  the same four-node shape still communicates progression. */
export default function JourneyFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 300" aria-hidden className={className} fill="none">
      <path
        d="M60 220 C 140 200, 180 130, 260 140 S 380 60, 460 80"
        stroke="#F4F0E8"
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {[[60, 220], [190, 165], [330, 110], [460, 80]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" stroke="#E07A4C" strokeOpacity={i === 3 ? 0.8 : 0.4} fill="none" />
          <circle cx={x} cy={y} r="3" fill={i === 3 ? '#E07A4C' : '#F4F0E8'} fillOpacity={i === 3 ? 1 : 0.5} />
        </g>
      ))}
    </svg>
  );
}
