import Link from 'next/link';
import { projects } from '@/data/projects';

export default function CaseFooterNav({ slug }: { slug: string }) {
  const i = projects.findIndex((p) => p.slug === slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <nav aria-label="Next project" className="shell pb-20 pt-4 md:pb-28">
      <div className="hairline bg-glass-border" />
      <Link href={`/work/${next.slug}`} data-cursor="view" className="group grid items-baseline gap-y-3 py-10 md:grid-cols-12 md:gap-x-8">
        <p className="label md:col-span-3">Next project</p>
        <div className="md:col-span-9">
          <h2 className="flex items-center gap-4 text-d3 text-bone transition-transform duration-500 ease-out group-hover:translate-x-2">
            {next.title}
            <span className="text-signature">→</span>
          </h2>
          <p className="mt-2 text-body text-bone-2">{next.kicker}</p>
        </div>
      </Link>
    </nav>
  );
}
