const client = ['Angular 19', 'TypeScript', 'Findings interface'];
const service = ['Node.js', 'Express', 'TypeScript', 'Scanner', 'Detection engine', 'Claude SDK'];

export default function ArchitectureDiagram() {
  return (
    <figure className="mt-10">
      <div className="grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-0">
        <div className="reveal border border-glass-border bg-void-raised p-6 md:p-8">
          <p className="label text-bone-4">Client</p>
          <ul className="mt-5 space-y-2.5">
            {client.map((item) => (
              <li key={item} className="text-h2 text-bone">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-bone-3">
            Renders findings and drives a scan. Shares its types with the service.
          </p>
        </div>

        <div
          className="reveal flex flex-col items-center justify-center gap-3 py-2 md:w-48 md:px-6 md:py-0"
          style={{ transitionDelay: '100ms' }}
        >
          <svg
            aria-hidden
            viewBox="0 0 120 12"
            className="hidden h-3 w-full md:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <line x1="6" y1="6" x2="114" y2="6" vectorEffect="non-scaling-stroke" opacity="0.45" />
            <polyline points="12,2 6,6 12,10" vectorEffect="non-scaling-stroke" />
            <polyline points="108,2 114,6 108,10" vectorEffect="non-scaling-stroke" />
          </svg>
          <svg
            aria-hidden
            viewBox="0 0 12 60"
            className="h-14 w-3 md:hidden"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <line x1="6" y1="6" x2="6" y2="54" vectorEffect="non-scaling-stroke" opacity="0.45" />
            <polyline points="2,12 6,6 10,12" vectorEffect="non-scaling-stroke" />
            <polyline points="2,48 6,54 10,48" vectorEffect="non-scaling-stroke" />
          </svg>
          <p className="text-center font-mono text-micro uppercase leading-relaxed tracking-[0.14em] text-bone">
            23 REST
            <br />
            endpoints
          </p>
        </div>

        <div className="reveal border border-glass-border bg-void-raised p-6 md:p-8" style={{ transitionDelay: '160ms' }}>
          <p className="label text-bone-4">Service</p>
          <ul className="mt-5 space-y-2.5">
            {service.map((item) => (
              <li key={item} className="text-h2 text-bone">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-bone-3">
            Scans the repository, classifies findings, and calls the model only for the explanation
            layer.
          </p>
        </div>
      </div>
      <figcaption className="label mt-5 text-bone-4">
        One language across the boundary — the finding shape is defined once.
      </figcaption>
    </figure>
  );
}
