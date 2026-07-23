import { useRef } from 'react';
import { Loupe } from '#/components/loupe';
import { DESKTOP_MQ, PAGE_GRID_DESKTOP } from '#/lib/constants';
import { useMediaQuery } from '#/lib/use-media-query';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const loupeEnabled = useMediaQuery(
    `${DESKTOP_MQ} and (hover) and (pointer: fine)`
  );

  return (
    <section
      ref={heroRef}
      className="relative px-5 py-12 desktop:z-[5] desktop:mx-auto desktop:h-[300px] desktop:w-[1040px] desktop:px-12 desktop:pt-11 desktop:pb-0"
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

export function HeroCopy() {
  return (
    <>
      <h1 className="text-[48px] leading-[1.20] font-[650] tracking-[-0.045em] text-pretty text-strong desktop:max-w-[640px] desktop:text-[64px] desktop:leading-[1.1]">
        Craft, studied at 25,600<span className="text-accent">%</span>
      </h1>
      <p className="mt-8 text-base leading-6 text-pretty text-muted desktop:mt-6 desktop:max-w-[560px] desktop:text-[15.5px] desktop:leading-[1.6]">
        25,600% is Figma’s maximum zoom. This is a collection of practical
        studies by Vitalii Sazanov: take exceptional UI from people known for
        uncommon care, put it under the loupe, and rebuild it from scratch —
        every detail, note for note.
      </p>
    </>
  );
}
