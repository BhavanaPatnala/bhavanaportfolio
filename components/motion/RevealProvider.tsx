'use client';

import { useEffect } from 'react';

/**
 * One shared IntersectionObserver for every `.reveal` element, including
 * ones mounted later. Keeps scroll-in animation off the 3D scene's frame
 * budget: sections stay plain markup, no per-section observer instances.
 */
export default function RevealProvider() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const selector = '.reveal';

    if (reduce) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        el.dataset.shown = 'true';
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = 'true';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (el.dataset.shown === 'true') return;
        io.observe(el);
      });
    };

    observe(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(selector)) io.observe(node);
          observe(node);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
