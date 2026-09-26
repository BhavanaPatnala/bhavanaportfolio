'use client';

type Stage = { id: string; label: string; note: string };

/** The audit pipeline, drawn as a travelling signal down a rail — the same
 *  visual idea as the hero's data points, applied to one project's own
 *  process rather than the site as a whole. Generic over `stages` so every
 *  project's pipeline can reuse the same rail rather than a hardcoded copy. */
export default function PipelineDiagram({ stages }: { stages: Stage[] }) {
  return (
    <ol className="relative mt-10">
      <div aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px overflow-hidden bg-glass-border sm:left-[19px]">
        <span className="rail-signal absolute left-0 top-0 block h-16 w-px bg-gradient-to-b from-transparent via-signature to-transparent" />
      </div>

      {stages.map((stage, i) => (
        <li key={stage.id} className="reveal relative flex gap-5 pb-7 last:pb-0 sm:gap-6" style={{ transitionDelay: `${i * 80}ms` }}>
          <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-glass-borderStrong bg-void font-mono text-micro text-bone-3 sm:h-10 sm:w-10">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="group min-w-0 flex-1 border-b border-glass-border pb-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-h1 text-bone transition-colors duration-300 group-hover:text-signature">{stage.label}</h3>
              <p className="label">Stage {i + 1} of {stages.length}</p>
            </div>
            <p className="mt-2 max-w-prose break-words text-small text-bone-2">{stage.note}</p>
          </div>
        </li>
      ))}

      <style>{`
        @keyframes signal-down {
          0% { transform: translateY(-100%); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
        .rail-signal { animation: signal-down 5.5s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rail-signal { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </ol>
  );
}
