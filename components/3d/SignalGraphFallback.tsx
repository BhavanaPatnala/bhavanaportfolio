/** Static line-art counterpart to SignalGraph — same silhouette, no motion. */
export default function SignalGraphFallback({ className }: { className?: string }) {
  const cx = 260;
  const cy = 220;
  const r = 150;
  const count = 7;
  const outer = Array.from({ length: count }).map((_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.72 };
  });

  return (
    <svg viewBox="0 0 520 440" aria-hidden className={className} fill="none">
      <g stroke="#F4F0E8" strokeOpacity="0.22" strokeWidth="1">
        {outer.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} />
        ))}
      </g>
      <g stroke="#F4F0E8" strokeOpacity="0.5" strokeWidth="1" fill="none">
        {outer.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="7" />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="11" stroke="#E07A4C" strokeOpacity="0.85" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
