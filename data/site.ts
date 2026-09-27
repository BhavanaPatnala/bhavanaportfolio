/**
 * Single source of identity + external links. Every fact here mirrors the
 * verified data already fact-checked against the résumé in the companion
 * site (D:\Portfolio) — reused rather than re-derived, so nothing drifts.
 */
export const site = {
  name: 'Bhavana P',
  role: 'Principal Software Engineer',
  company: 'Triad Software Private Limited',
  location: 'Chennai, India',
  yearsExperience: 12,
  tagline: 'Building systems, products & intelligent experiences.',
  summary:
    'Principal Software Engineer focused on frontend architecture, performance engineering, AI-powered products and polished user experiences.',
  email: 'bhavanarao92@gmail.com',
  links: {
    github: 'https://github.com/BhavanaPatnala',
    linkedin: 'https://www.linkedin.com/in/bhavanarao92',
    resume: '/resume',
    clariti: 'https://clariti.app/',
    perfOsDemo: 'https://perf-os-six.vercel.app/',
    perfOsRepo: 'https://github.com/BhavanaPatnala/PerfOS',
    civiquexDemo: 'https://civiquex-flax.vercel.app/',
  },
} as const;

export const nav = [
  { n: '01', label: 'Work', href: '/#work' },
  { n: '02', label: 'Experience', href: '/#experience' },
  { n: '03', label: 'Recognition', href: '/#recognition' },
  { n: '04', label: 'AI Lab', href: '/#ai-lab' },
  { n: '05', label: 'About', href: '/#about' },
  { n: '06', label: 'Contact', href: '/#contact' },
] as const;
