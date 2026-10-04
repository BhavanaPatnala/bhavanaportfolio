'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { nav, site } from '@/data/site';
import { projects } from '@/data/projects';

type Command = {
  id: string;
  group: 'Go to' | 'Case studies' | 'Elsewhere';
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
};

const commands: Command[] = [
  ...nav.map((item) => ({
    id: `nav-${item.href}`,
    group: 'Go to' as const,
    label: item.label,
    hint: item.n,
    href: item.href,
  })),
  { id: 'nav-resume', group: 'Go to', label: 'Resume', href: site.links.resume },
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    group: 'Case studies' as const,
    label: p.title,
    hint: p.kicker,
    href: `/work/${p.slug}`,
  })),
  { id: 'ext-github', group: 'Elsewhere', label: 'GitHub', href: site.links.github, external: true },
  { id: 'ext-linkedin', group: 'Elsewhere', label: 'LinkedIn', href: site.links.linkedin, external: true },
  { id: 'ext-clariti', group: 'Elsewhere', label: 'Clariti', hint: 'Product', href: site.links.clariti, external: true },
  { id: 'ext-perfos-demo', group: 'Elsewhere', label: 'PerfOS — live demo', href: site.links.perfOsDemo, external: true },
  { id: 'ext-civiquex-demo', group: 'Elsewhere', label: 'CiviqueX — live demo', href: site.links.civiquexDemo, external: true },
];

const GROUP_ORDER: Command['group'][] = ['Go to', 'Case studies', 'Elsewhere'];

const itemClass =
  'flex w-full items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-bone-2 transition-colors hover:bg-glass-fill hover:text-bone focus-visible:bg-glass-fill focus-visible:text-bone';

/**
 * A keyboard-first index of the whole site — every section, case study and
 * external link, reachable on Ctrl/Cmd+K without touching the mouse. List
 * items are real <Link>/<a> elements rather than an ARIA listbox, matching
 * how SiteNav's own mobile-menu panel is already built — proven, already
 * accessible, and it reuses Next's built-in same-page hash scrolling
 * instead of reimplementing it.
 *
 * The modal itself is portaled to `document.body` rather than rendered
 * inline where the trigger button lives — a real, user-reported bug: the
 * trigger sits inside SiteNav's condensed-state pill, which gets a `.glass`
 * class (`backdrop-filter`) once the page is scrolled. Any `backdrop-filter`
 * (or `transform`/`filter`/`perspective`) on an ancestor creates a new
 * containing block for `position: fixed` descendants, so the "fixed to the
 * viewport" dialog was actually fixed to that small nav pill instead —
 * rendering wherever the page happened to be scrolled to, bleeding through
 * whatever content sat behind it. Reproduces only once `condensed` is true
 * (scrolled past 24px), which is exactly why the original tests — which
 * all opened the palette immediately after navigation, before scrolling —
 * never caught it.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = prevOverflow;
    };
  }, [open]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q))
      : commands;
    return GROUP_ORDER.map((group) => ({ group, items: filtered.filter((c) => c.group === group) })).filter(
      (g) => g.items.length > 0,
    );
  }, [query]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        data-cursor="link"
        aria-haspopup="dialog"
        className="tap hidden items-center gap-1.5 rounded-full border border-glass-border px-3 py-1 font-mono text-micro uppercase tracking-[0.14em] text-bone-3 transition-colors hover:text-bone lg:flex"
      >
        Search
        <span aria-hidden className="rounded border border-glass-border px-1 text-[10px] normal-case text-bone-4">
          ⌘K
        </span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault();
                close();
              }
            }}
          >
          <div aria-hidden className="absolute inset-0 bg-void/80 backdrop-blur-sm" onClick={close} />

          <div data-command-panel className="glass-strong relative w-full max-w-[560px] overflow-hidden rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 border-b border-glass-border px-5 py-4">
              <span aria-hidden className="text-bone-4">
                ⌘
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    listRef.current?.querySelector<HTMLElement>('a,button')?.focus();
                  }
                }}
                placeholder="Jump to a section, case study or link…"
                aria-label="Search"
                className="w-full bg-transparent font-mono text-small text-bone placeholder:text-bone-4 focus:outline-none"
              />
              <span className="hidden shrink-0 font-mono text-[10px] uppercase text-bone-4 sm:inline">Esc</span>
            </div>

            <div
              ref={listRef}
              className="max-h-[50vh] overflow-y-auto p-2"
              onKeyDown={(e) => {
                if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
                e.preventDefault();
                const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a,button'));
                const currentIndex = items.indexOf(document.activeElement as HTMLElement);
                if (e.key === 'ArrowDown') {
                  items[currentIndex + 1]?.focus();
                } else if (currentIndex <= 0) {
                  inputRef.current?.focus();
                } else {
                  items[currentIndex - 1]?.focus();
                }
              }}
            >
              {groups.length === 0 && <p className="px-4 py-6 text-center text-small text-bone-4">No matches.</p>}
              {groups.map(({ group, items }) => (
                <div key={group}>
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone-4">
                    {group}
                  </p>
                  <ul>
                    {items.map((cmd) => {
                      const content = (
                        <>
                          <span className="text-small">{cmd.label}</span>
                          {cmd.hint && (
                            <span className="shrink-0 truncate font-mono text-[10px] uppercase tracking-[0.1em] text-bone-4">
                              {cmd.hint}
                            </span>
                          )}
                        </>
                      );
                      return (
                        <li key={cmd.id}>
                          {cmd.external ? (
                            <a
                              href={cmd.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-cursor="link"
                              onClick={close}
                              className={itemClass}
                            >
                              {content}
                            </a>
                          ) : (
                            <Link href={cmd.href} data-cursor="link" onClick={close} className={itemClass}>
                              {content}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              [data-command-panel] {
                animation: command-palette-in 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
              }
            }
            @keyframes command-palette-in {
              from { opacity: 0; transform: translateY(-8px) scale(0.98); }
              to { opacity: 1; transform: none; }
            }
          `}</style>
          </div>,
          document.body,
        )}
    </>
  );
}
