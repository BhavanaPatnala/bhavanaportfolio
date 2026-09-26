/** Static, already-separated layer illustration — no scroll interaction to
 *  perform under reduced motion, so it simply shows the "exploded" end
 *  state directly rather than an unmoving stack that never resolves. */
export default function ClaritiFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 400" aria-hidden className={className} fill="none">
      <g stroke="#F4F0E8" strokeOpacity="0.24" strokeWidth="1">
        <rect x="280" y="70" width="240" height="150" />
        <rect x="220" y="110" width="240" height="150" />
        <rect x="160" y="150" width="240" height="150" strokeOpacity="0.6" stroke="#E07A4C" />
        <rect x="100" y="190" width="240" height="150" />
        <rect x="40" y="230" width="240" height="150" />
      </g>
    </svg>
  );
}
