/** Static line-art counterpart to LayerStack — same silhouette, no motion. */
export default function LayerStackFallback({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 360" aria-hidden className={className} fill="none">
      <g stroke="#F4F0E8" strokeOpacity="0.22" strokeWidth="1">
        <rect x="160" y="60" width="280" height="150" />
        <rect x="130" y="90" width="280" height="150" />
        <rect x="100" y="120" width="280" height="150" strokeOpacity="0.55" stroke="#E07A4C" />
        <rect x="70" y="150" width="280" height="150" />
        <rect x="40" y="180" width="280" height="150" />
      </g>
    </svg>
  );
}
