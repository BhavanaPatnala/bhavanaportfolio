const stages = [
  { side: 'left', label: 'Position', note: 'A claim is generated and committed to.' },
  { side: 'right', label: 'Counter-position', note: 'The strongest available objection is derived.' },
  { side: 'left', label: 'Evidence', note: 'Each side is asked what it is leaning on.' },
  { side: 'right', label: 'Reasoning trace', note: 'The steps between evidence and claim are kept.' },
];

/** Two positions converging on an evaluation, then a single resolved output. */
export default function DebateFlow() {
  return (
    <figure className="mt-10">
      <ol className="relative">
        <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-glass-border md:block" />
        {stages.map((stage, i) => (
          <li
            key={stage.label}
            className={`reveal relative grid md:grid-cols-2 ${i > 0 ? 'mt-4' : ''}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div
              className={
                stage.side === 'left'
                  ? 'border border-glass-border bg-void-raised p-5 md:mr-6'
                  : 'border border-dashed border-glass-borderStrong p-5 md:col-start-2 md:ml-6'
              }
            >
              <p className="label">{stage.side === 'left' ? 'For' : 'Against'}</p>
              <h3 className="mt-3 text-h2 text-bone">{stage.label}</h3>
              <p className="mt-2 text-small text-bone-2">{stage.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="reveal mt-8 flex flex-col items-center">
        <span aria-hidden className="h-8 w-px bg-glass-borderStrong" />
        <div className="w-full max-w-md border border-signature/30 bg-signature/[0.06] p-6 text-center">
          <p className="label text-signature">Evaluation</p>
          <p className="mt-3 text-h1 text-bone">Which position held up</p>
          <p className="mt-2 text-small text-bone-2">
            Criteria, scoring and the shape of the final output are still to be documented.
          </p>
        </div>
      </div>
      <figcaption className="label mt-5">
        Structural schematic. Implementation detail to be added.
      </figcaption>
    </figure>
  );
}
