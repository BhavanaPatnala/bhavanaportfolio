import type { Metadata } from 'next';
import Link from 'next/link';

import { education, roles } from '@/data/experience';
import { certifications } from '@/data/certifications';
import { awards } from '@/data/awards';
import { practice, techNodes } from '@/data/skills';
import { projects } from '@/data/projects';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${site.name} — ${site.role}. ${site.yearsExperience} years of software development: Angular, TypeScript, frontend architecture, performance engineering and AI-assisted tooling.`,
  alternates: { canonical: '/resume' },
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-y-4 border-t border-glass-border py-10 md:grid-cols-12 md:gap-x-8">
      <div className="md:col-span-3">
        <h2 className="label sticky top-[calc(var(--nav-h)+2rem)] text-bone-4">{label}</h2>
      </div>
      <div className="md:col-span-9">{children}</div>
    </div>
  );
}

export default function ResumePage() {
  const core = techNodes.filter((n) => n.group === 'core').map((n) => n.label);
  const supporting = techNodes.filter((n) => n.group === 'supporting').map((n) => n.label);
  const ai = techNodes.filter((n) => n.group === 'ai').map((n) => n.label);
  const flagship = projects[0];

  return (
    <article className="shell bg-void pb-24 pt-[calc(var(--nav-h)+3rem)] md:pt-[calc(var(--nav-h)+4.5rem)]">
      <header className="print-break">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-bone-4">Curriculum vitae</p>
            <h1 className="mt-4 text-d2 text-bone">{site.name}</h1>
            <p className="mt-3 text-lede text-bone-2">{site.role}</p>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <a
              href="/bhavana-p-resume.pdf"
              download="Bhavana-P-Resume.pdf"
              data-cursor="open"
              className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-bone px-5 font-mono text-micro uppercase tracking-[0.14em] text-void transition-colors duration-300 hover:bg-signature"
            >
              Download PDF
              <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <Link
              href="/#work"
              data-cursor="link"
              className="group glass inline-flex h-11 items-center gap-2.5 rounded-full px-5 font-mono text-micro uppercase tracking-[0.14em] text-bone transition-colors hover:border-glass-borderStrong"
            >
              Portfolio
              <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          <li>
            <a href={`mailto:${site.email}`} className="tap link-underline text-small text-bone-2">
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="tap link-underline text-small text-bone-2">
              linkedin.com/in/bhavanarao92
            </a>
          </li>
          <li>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="tap link-underline text-small text-bone-2">
              github.com/BhavanaPatnala
            </a>
          </li>
          <li className="text-small text-bone-3">{site.location}</li>
        </ul>

        <p className="mt-10 max-w-prose text-body text-bone-2">
          Principal Software Engineer with {site.yearsExperience} years in software development,
          across design analysis, coding, debugging, testing and maintenance. Twelve of those years
          on one production business application, working through Scrum, and most recently
          architecting components, owning a module and taking part in live release work. Smart India
          Hackathon evaluator and jury.
        </p>
      </header>

      <div className="mt-16">
        <Row label="Experience">
          <ol className="space-y-12">
            {roles.map((role) => (
              <li key={role.id} className="print-break">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-h1 text-bone">{role.title}</h3>
                  <p className="label text-bone-4">
                    {role.start} — {role.end}
                  </p>
                </div>
                <p className="mt-1.5 text-small text-bone-3">{role.company}</p>
                <ul className="mt-4 space-y-2.5">
                  {role.work.map((item) => (
                    <li key={item} className="flex gap-3 text-small text-bone-2">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-bone-4" />
                      <span className="max-w-prose">{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Row>

        <Row label="Featured project">
          <div className="print-break">
            <h3 className="text-h1 text-bone">{flagship.title}</h3>
            <p className="mt-1.5 text-small text-bone-3">{flagship.kicker}</p>
            <p className="mt-4 max-w-prose text-small text-bone-2">
              Architected and shipped a full-stack performance-auditing platform — Angular 19
              frontend, Node/Express backend with 23 REST endpoints — that scans frontend
              repositories and surfaces six categories of findings, including dead code and
              circular dependencies. Analysis layer built on the Claude SDK.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={site.links.perfOsDemo} target="_blank" rel="noopener noreferrer" className="tap link-underline text-small text-bone-2">
                  Live demo ↗
                </a>
              </li>
              <li>
                <a href={site.links.perfOsRepo} target="_blank" rel="noopener noreferrer" className="tap link-underline text-small text-bone-2">
                  Repository ↗
                </a>
              </li>
              <li className="no-print">
                <Link href="/work/perf-os" className="tap link-underline text-small text-bone-2">
                  Full case study
                </Link>
              </li>
            </ul>
          </div>
        </Row>

        <Row label="Skills">
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="label text-bone-4">Core</dt>
              <dd className="mt-2 text-small text-bone-2">{core.join(' · ')}</dd>
            </div>
            <div>
              <dt className="label text-bone-4">Supporting</dt>
              <dd className="mt-2 text-small text-bone-2">{supporting.join(' · ')}</dd>
            </div>
            <div>
              <dt className="label text-bone-4">AI / experimentation</dt>
              <dd className="mt-2 text-small text-bone-2">{ai.join(' · ')}</dd>
            </div>
            <div>
              <dt className="label text-bone-4">Practice</dt>
              <dd className="mt-2 text-small text-bone-2">{practice.map((p) => p.label).join(' · ')}</dd>
            </div>
          </dl>
        </Row>

        <Row label="Education">
          <div className="print-break">
            <h3 className="text-h1 text-bone">{education.degree}</h3>
            <p className="mt-1.5 text-small text-bone-3">
              {education.institution} — {education.affiliation}
            </p>
            <p className="label mt-3 text-bone-4">
              {education.start} — {education.end} · {education.result}
            </p>
          </div>
        </Row>

        <Row label="Certifications">
          <ul className="space-y-6">
            {certifications.map((cert) => (
              <li key={cert.id} className="print-break">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-h2 text-bone">{cert.title}</h3>
                  <p className="label text-bone-4">{cert.date}</p>
                </div>
                <p className="mt-1.5 text-small text-bone-3">
                  {cert.issuedBy ? `${cert.issuedBy} · via ${cert.issuer}` : cert.issuer}
                  {cert.credentialId ? ` · ID ${cert.credentialId}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Awards">
          <ul className="space-y-5">
            {awards.map((award) => (
              <li key={award.id} className="print-break flex flex-wrap items-baseline gap-x-4">
                {award.placement && <span className="label text-signature">{award.placement}</span>}
                <span className="text-body text-bone">{award.title}</span>
                <span className="text-small text-bone-3">— {award.context}</span>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Recognition">
          <p className="max-w-prose text-small text-bone-2">
            Smart India Hackathon (Indian Ministry of Innovation Cell) evaluator and jury.
            Participated in the Students Outreach Program run by SRM Easwari Engineering College as
            a Smart India Hackathon evaluator.
          </p>
        </Row>

        <div className="hairline bg-glass-border" />
      </div>
    </article>
  );
}
