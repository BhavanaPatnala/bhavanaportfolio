'use client';

/** Opens the browser's print dialog for this page. The downloadable PDF is a
 *  separate, maintained file served by the download link beside it. */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-cursor="link"
      className="group glass inline-flex h-11 items-center gap-2.5 rounded-full px-5 font-mono text-micro uppercase tracking-[0.14em] text-bone transition-colors hover:border-glass-borderStrong"
    >
      Print
    </button>
  );
}
