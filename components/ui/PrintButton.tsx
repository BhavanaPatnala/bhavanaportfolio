'use client';

/** Saves the résumé as a PDF through the browser's own print pipeline —
 *  no stale binary to keep in sync with this page. */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-cursor="link"
      className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-bone px-5 font-mono text-micro uppercase tracking-[0.14em] text-void transition-colors duration-300 hover:bg-signature"
    >
      Download PDF
      <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-y-0.5">
        ↓
      </span>
    </button>
  );
}
