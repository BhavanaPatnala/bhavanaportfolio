import type { Config } from 'tailwindcss';

/**
 * Design system: "Core" — the cinematic counterpart to the editorial site.
 * A warm near-black void, bone-white type, restrained copper signature.
 * Every text/background pairing below is contrast-verified against its
 * actual background before being written here, not patched afterward.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0D0C0B',
          raised: '#17150F',
          sunken: '#0A0908',
        },
        bone: {
          DEFAULT: '#F4F0E8',
          2: '#B8B2A4',
          3: '#8F887A',
          // Verified 4.9:1 on --void and 4.58:1 on --void-raised — the
          // original #6E695D (3.58:1) looked right but failed AA anywhere
          // it carried actual text, which given the number of small
          // mono-label call sites across the site was systemic, not a
          // one-off. Fixed at the token, not at each call site.
          4: '#847F73',
        },
        signature: {
          DEFAULT: '#E07A4C',
          soft: '#EBA27F',
          deep: '#C96B3E',
        },
        glass: {
          border: 'rgba(244,240,232,0.10)',
          borderStrong: 'rgba(244,240,232,0.18)',
          fill: 'rgba(244,240,232,0.04)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.14em' }],
        meta: ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.1em' }],
        // Kinetic display scale — deliberately capped so large type stays
        // architectural rather than tipping into oversized/unreadable.
        d1: ['clamp(2.75rem, 8vw, 6.75rem)', { lineHeight: '0.94', letterSpacing: '-0.03em' }],
        d2: ['clamp(2.1rem, 5vw, 4rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        d3: ['clamp(1.6rem, 3.2vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h1: ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        h2: ['clamp(1.25rem, 1.9vw, 1.625rem)', { lineHeight: '1.22', letterSpacing: '-0.01em' }],
        lede: ['clamp(1.0625rem, 1.5vw, 1.375rem)', { lineHeight: '1.55' }],
        body: ['1rem', { lineHeight: '1.65' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        shell: '96rem',
        prose: '62ch',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(6rem, 13vh, 10rem)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
