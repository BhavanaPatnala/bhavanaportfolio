const frames = [
  { id: '001', box: null },
  { id: '002', box: { x: 22, y: 26, w: 34, h: 52, conf: '0.71' } },
  { id: '003', box: { x: 30, y: 20, w: 40, h: 62, conf: '0.94' } },
  { id: '004', box: { x: 44, y: 24, w: 32, h: 56, conf: '0.88' } },
  { id: '005', box: null },
];

/** Schematic of the inspection surface: frames, a detection, a confidence value. */
export default function DetectionStrip() {
  return (
    <figure className="mt-10">
      <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {frames.map((frame, i) => (
          <li
            key={frame.id}
            className="reveal relative aspect-[4/3] border border-glass-border bg-void-raised"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {[
              'left-0 top-0',
              'right-0 top-0',
              'left-0 bottom-0',
              'right-0 bottom-0',
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={`absolute h-2.5 w-2.5 border-bone-4/40 ${pos} ${
                  pos.includes('left') ? 'border-l' : 'border-r'
                } ${pos.includes('top') ? 'border-t' : 'border-b'}`}
              />
            ))}
            {frame.box && (
              <span
                aria-hidden
                className="absolute border border-signature"
                style={{
                  left: `${frame.box.x}%`,
                  top: `${frame.box.y}%`,
                  width: `${frame.box.w}%`,
                  height: `${frame.box.h}%`,
                }}
              >
                <span className="absolute -top-[15px] left-0 bg-signature px-1 font-mono text-[9px] leading-[15px] tracking-[0.06em] text-void">
                  {frame.box.conf}
                </span>
              </span>
            )}
            <span className="label absolute bottom-2 left-2 text-bone-4">FR {frame.id}</span>
          </li>
        ))}
      </ul>
      <figcaption className="label mt-5">
        Schematic of the inspection surface. Real frames and detections to be added.
      </figcaption>
    </figure>
  );
}
