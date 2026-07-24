import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { HeroCopy } from '#/components/hero-copy';
import { Loupe } from '#/components/loupe';
import {
  DESKTOP_MQ,
  HERO_WIDTH,
  PAGE_GRID_DESKTOP,
} from '#/lib/constants';
import { useMediaQuery } from '#/lib/use-media-query';

const HERO_STYLE = {
  '--hero-width': `${HERO_WIDTH}px`,
} as CSSProperties;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const loupeEnabled = useMediaQuery(
    `${DESKTOP_MQ} and (hover) and (pointer: fine)`
  );

  return (
    <section
      ref={heroRef}
      className="relative px-5 py-12 desktop:z-[5] desktop:mx-auto desktop:h-[300px] desktop:w-[var(--hero-width)] desktop:px-12 desktop:pt-11 desktop:pb-0"
      style={HERO_STYLE}
    >
      {PAGE_GRID_DESKTOP && (
        <div
          aria-hidden
          className="bg-grid-hero pointer-events-none absolute inset-0 hidden desktop:block"
        />
      )}
      <div ref={copyRef}>
        <HeroCopy />
      </div>
      {loupeEnabled && <Loupe heroRef={heroRef} copyRef={copyRef} />}
    </section>
  );
}
