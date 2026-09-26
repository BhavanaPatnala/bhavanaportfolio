import Image from 'next/image';
import { cn } from '@/lib/cn';

type Props = {
  src: string | null;
  alt: string;
  label: string;
  caption: string;
  url?: string;
  className?: string;
  style?: React.CSSProperties;
  onOpen?: () => void;
};

/**
 * Frames a product screenshot in a quiet dark chrome — a thin border and a
 * slightly different shade of the same void, not a jarring light bar that
 * would break the site's own dark ground. When `onOpen` is supplied the
 * frame becomes a button that hands off to a lightbox, so a thumbnail crop
 * is never the only way to see it.
 */
export default function ScreenshotFrame({ src, alt, label, caption, url, className, style, onOpen }: Props) {
  const Wrapper = onOpen ? 'button' : 'div';

  return (
    <figure className={cn('reveal', className)} style={style}>
      <Wrapper
        {...(onOpen
          ? { type: 'button', onClick: onOpen, 'data-cursor': 'explore', 'aria-label': `Open ${label} full size` }
          : {})}
        className={cn(
          'group block w-full overflow-hidden rounded-lg border border-glass-border bg-void-raised text-left transition-[border-color,box-shadow] duration-300',
          onOpen && 'cursor-pointer hover:border-glass-borderStrong hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)]',
        )}
      >
        <div className="flex items-center gap-2 border-b border-glass-border bg-void px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-bone/15" />
            <span className="h-2 w-2 rounded-full bg-bone/15" />
            <span className="h-2 w-2 rounded-full bg-bone/15" />
          </span>
          {url && <span className="ml-2 truncate font-mono text-micro text-bone-4">{url}</span>}
        </div>
        <div className="relative aspect-[16/10] w-full bg-[#0A0908]">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={cn(
                'object-cover object-top',
                onOpen && 'transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]',
              )}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="label">Screenshot to be added</p>
              <p className="max-w-[36ch] text-small text-bone-4">{caption}</p>
            </div>
          )}
        </div>
      </Wrapper>
      <figcaption className="mt-3">
        <p className="text-body text-bone">{label}</p>
        <p className="mt-1 text-small text-bone-3">{caption}</p>
      </figcaption>
    </figure>
  );
}
