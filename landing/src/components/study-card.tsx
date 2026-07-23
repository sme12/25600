import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { GitHubIcon } from '#/components/icons';
import { studies } from '#/data/studies';
import { useMediaQuery } from '#/lib/use-media-query';
import { useTheme } from '#/lib/use-theme';
import { cn } from '#/lib/utils';
import type { Study } from '#/data/studies';

const [clerk, linear] = studies;

function PreviewVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const theme = useTheme();
  const src = `/assets/${name}-${theme}.mp4`;

  useEffect(() => {
    if (reducedMotion) {
      ref.current?.pause();
    } else {
      ref.current?.play().catch(() => {});
    }
  }, [reducedMotion, src]);

  // scale-[1.015] crops the video's outer edge under the rounded border,
  // hiding any baked-in recording border and the sub-pixel seam where the
  // clipped video meets the card border.
  return (
    <video
      ref={ref}
      src={src}
      autoPlay={!reducedMotion}
      loop
      muted
      playsInline
      preload="metadata"
      className="block h-full w-full scale-[1.015] object-cover"
    />
  );
}

function InProgressPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'rounded-full bg-amber/[.14] px-2.5 py-1 text-[11px] leading-none font-semibold text-amber',
        className
      )}
    >
      In progress
    </span>
  );
}

function CardOverlay({ github, live }: { github: string; live: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex translate-y-1.5 items-center justify-center opacity-0 backdrop-blur-none transition-[opacity,transform,backdrop-filter] duration-[280ms] ease-expo group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:backdrop-blur-[4px] group-focus-within:backdrop-saturate-[.95] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:backdrop-blur-[4px] group-hover:backdrop-saturate-[.95]"
      style={{
        background:
          'linear-gradient(180deg, rgba(10,10,12,.42) 0%, rgba(10,10,12,.26) 40%, rgba(10,10,12,.42) 100%)',
      }}
    >
      <div className="flex items-center gap-3">
        <a
          href={github}
          className="inline-flex items-center gap-[7px] rounded-[10px] bg-white px-5 py-3 text-[14.5px] leading-none font-semibold text-[#141414] shadow-[0_2px_10px_rgba(0,0,0,.18)]"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href={live}
          className="inline-flex items-center gap-[7px] rounded-[10px] bg-accent px-5 py-3 text-[14.5px] leading-none font-semibold text-white shadow-[0_2px_12px_rgba(13,153,255,.45)] transition-colors duration-150 hover:bg-accent-hover"
        >
          Live demo →
        </a>
      </div>
    </div>
  );
}

export function DesktopCards() {
  return (
    <div className="mb-4 grid grid-cols-2 gap-4">
      <DesktopCard study={clerk} video="clerk-nav" />
      <DesktopCard study={linear} video="linear-issues" pill />
    </div>
  );
}

function DesktopCard({
  study,
  video,
  pill,
}: {
  study: Study;
  video: string;
  pill?: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
      <div className="relative aspect-video overflow-hidden bg-surface-2">
        <PreviewVideo name={video} />
        <CardOverlay github={study.github} live={study.live} />
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3.5">
        <span className="text-[15px] font-semibold text-text">
          {study.id} — {study.title}
        </span>
        {pill && <InProgressPill />}
      </div>
    </article>
  );
}

export function MobileCards() {
  return (
    <>
      <MobileCard study={clerk} media={<PreviewVideo name="clerk-nav" />} />
      <MobileCard
        study={linear}
        media={
          <div className="relative h-full">
            <PreviewVideo name="linear-issues" />
            <InProgressPill className="absolute top-3 right-3 px-[9px] text-[10.5px]" />
          </div>
        }
      />
    </>
  );
}

function MobileCard({ study, media }: { study: Study; media: ReactNode }) {
  return (
    <article className="mb-8 overflow-hidden rounded-xl bg-surface shadow-elev">
      <div className="h-48 overflow-hidden bg-surface-2">{media}</div>
      <div className="flex h-16 items-center justify-between gap-3 pr-3 pl-[18px]">
        <span className="text-sm font-semibold text-text">
          {study.id} — {study.title}
        </span>
        <div className="flex flex-none items-center gap-2">
          <a
            href={study.github}
            aria-label="View on GitHub"
            className="flex size-[38px] items-center justify-center rounded-full border border-border text-muted"
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href={study.live}
            className="flex h-[38px] items-center gap-1 rounded-full border border-border px-4 text-[13.5px] leading-none font-semibold whitespace-nowrap text-accent"
          >
            Live →
          </a>
        </div>
      </div>
    </article>
  );
}
