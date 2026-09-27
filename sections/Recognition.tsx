import RecognitionScene from '@/components/3d/RecognitionScene';
import EvidenceGallery from '@/components/ui/EvidenceGallery';
import CertificateWall from '@/components/ui/CertificateWall';
import { events, evidenceRoles } from '@/data/events';
import { awards } from '@/data/awards';
import { certifications } from '@/data/certifications';

/**
 * "Beyond the code" — the one section not about building software, but
 * about judging it, and about the record of that: jury/evaluator work,
 * competition placements, and the certificates themselves. A sparse
 * particle field stands in for years of scattered evidence rather than
 * one dense system.
 */
export default function Recognition() {
  return (
    <section id="recognition" className="relative isolate overflow-hidden bg-void py-section">
      <RecognitionScene className="-z-10 opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            'linear-gradient(180deg, rgba(13,12,11,0.55) 0%, rgba(13,12,11,0.88) 22%, rgba(13,12,11,0.94) 100%)',
        }}
      />

      <div className="shell">
        <p className="eyebrow reveal">
          <span className="metric text-bone-4">03</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
          <span>Recognition</span>
        </p>

        <h2 className="reveal mt-8 max-w-[620px] text-d2 text-bone">Beyond the code.</h2>

        <p className="reveal mt-6 max-w-prose text-lede text-bone-2" style={{ transitionDelay: '80ms' }}>
          Judging other people&rsquo;s engineering is its own discipline. It means reading an
          unfamiliar system quickly, separating ambition from execution, and being able to defend
          the call afterwards.
        </p>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-glass-border bg-glass-border sm:grid-cols-2 lg:grid-cols-4">
          {evidenceRoles.map((entry, i) => (
            <div key={entry.role} className="reveal bg-void p-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <dt className="text-h2 text-bone">{entry.role}</dt>
              <dd className="mt-3 text-small text-bone-3">{entry.blurb}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 md:mt-20">
          <EvidenceGallery events={events} />
        </div>

        <div className="mt-20 border-t border-glass-border pt-14 md:mt-24 md:pt-16">
          <p className="eyebrow reveal">
            <span aria-hidden className="h-px w-6 bg-current opacity-30" />
            <span>Awards</span>
          </p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-glass-border bg-glass-border sm:grid-cols-2">
            {awards.map((award, i) => (
              <li key={award.id} className="reveal bg-void p-6" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className={award.placement ? 'label text-signature' : 'label text-bone-4'}>
                    {award.placement ?? 'Recognised'}
                  </span>
                </div>
                <h3 className="mt-3 text-h2 leading-snug text-bone">{award.title}</h3>
                <p className="mt-2 text-small text-bone-3">{award.context}</p>
                {award.note && <p className="mt-2 text-small text-bone-4">{award.note}</p>}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 border-t border-glass-border pt-14 md:mt-24 md:pt-16">
          <p className="eyebrow reveal">
            <span aria-hidden className="h-px w-6 bg-current opacity-30" />
            <span>Certificates</span>
          </p>
          <p className="reveal mt-4 max-w-prose text-small text-bone-3">
            Transcribed exactly as issued. Open any tile to read the original document.
          </p>
          <div className="mt-8">
            <CertificateWall items={certifications} />
          </div>
        </div>
      </div>

      {/* The section number settles into place a beat after the eyebrow
          reveals — scoped to this section's own numeral only, so moving
          the section earlier in the page never touches how any other
          section's eyebrow behaves. */}
      <style>{`
        #recognition p.eyebrow[data-shown='true'] .metric {
          animation: recognition-numeral-in 0.6s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes recognition-numeral-in {
          from { opacity: 0; transform: translateY(4px) scale(1.4); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
