import { site } from '@/data/site';

const USERNAME = site.links.github.split('/').pop();

type GithubRepo = { pushed_at?: string };
type GithubUser = { public_repos?: number };

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

/**
 * Live GitHub activity, not a claimed one. Deliberately coarse: public repo
 * count and a recency bucket, never a specific repo name — an unreviewed
 * fork or scratch repo surfacing itself here would be a real brand risk for
 * near-zero narrative gain, so the "what" stays unnamed and only the "how
 * recently" shows. Both numbers are live-fetched; neither is ever invented,
 * and the whole thing renders nothing at all rather than a fabricated
 * fallback if GitHub is unreachable.
 */
async function getBuildLog() {
  if (!USERNAME) return null;
  try {
    const headers = { Accept: 'application/vnd.github+json' };
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=1`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as GithubUser;
    const repos = (await reposRes.json()) as GithubRepo[];
    const lastPush = repos[0]?.pushed_at;

    if (typeof user.public_repos !== 'number' || !lastPush) return null;
    return { publicRepos: user.public_repos, lastPush };
  } catch {
    return null;
  }
}

export default async function BuildLog() {
  const log = await getBuildLog();
  if (!log) return null;

  return (
    <a
      href={site.links.github}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="open"
      className="label text-bone-4 transition-colors hover:text-bone"
    >
      Build log — {log.publicRepos} public repositories · last shipped {timeAgo(log.lastPush)}
    </a>
  );
}
