import { cn } from '@/lib/cn';

/**
 * The personal signature mark — not a corporate logo. A "B" built from two
 * open architectural strokes with a single copper joint, echoing the
 * node-and-line language of the 3D scene. Used in the preloader, nav and
 * footer so the same small drawing threads the whole site together.
 */
export default function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn('h-full w-full', className)} aria-hidden fill="none">
      <path
        d="M9 6v20M9 6h8.5a5 5 0 0 1 0 10H9M9 16h9a5 5 0 0 1 0 10H9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="16" r="1.6" fill="#E07A4C" />
    </svg>
  );
}
