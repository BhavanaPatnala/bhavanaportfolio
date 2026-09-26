/**
 * The non-WebGL rendering of the core: shown while the 3D chunk loads, and
 * permanently in place of it under reduced motion or on a low-tier device.
 * Same silhouette as the real scene (a faceted core with node points) so the
 * brand identity holds even when the canvas never mounts.
 */
export default function HeroCoreFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 520"
      aria-hidden
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#E07A4C" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#E07A4C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="255" r="230" fill="url(#core-glow)" />
      <g stroke="#F4F0E8" strokeOpacity="0.28" strokeWidth="1">
        <path d="M260 90 L400 170 L400 340 L260 420 L120 340 L120 170 Z" />
        <path d="M260 90 L260 420 M120 170 L400 340 M400 170 L120 340" />
        <path d="M260 170 L330 210 L330 300 L260 340 L190 300 L190 210 Z" strokeOpacity="0.4" />
      </g>
      <g fill="#E07A4C">
        <circle cx="260" cy="90" r="3" />
        <circle cx="400" cy="170" r="3" />
        <circle cx="400" cy="340" r="3" />
        <circle cx="260" cy="420" r="3" />
        <circle cx="120" cy="340" r="3" />
        <circle cx="120" cy="170" r="3" />
        <circle cx="260" cy="255" r="4" />
      </g>
    </svg>
  );
}
