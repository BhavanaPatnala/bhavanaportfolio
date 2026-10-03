import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const routes = ['', '/resume', '/work/perf-os', '/work/ai-violation-detection', '/work/aveniq'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
