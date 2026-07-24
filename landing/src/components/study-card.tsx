import { useEffect, useRef } from 'react';
import { GitHubIcon } from '#/components/icons';
import { studies } from '#/data/studies';
import { useMediaQuery } from '#/lib/use-media-query';
import { useTheme } from '#/lib/use-theme';
import { cn } from '#/lib/utils';
import type { Study } from '#/data/studies';

function studyById(id: string): Study {
  const study = studies.find((candidate) => candidate.id === id);
  if (!study) throw new Error(`Missing study: ${id}`);
  return study;
}

const clerk = studyById('01');
const linear = studyById('02');

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

function StatusPill({
  study,
  className,
}: {
  study: Study;
  className?: string;
}) {
  const inProgress = study.status === 'in-progress';
  const label = inProgress ? 'In progress' : study.completed;
  if (!label) return null;

  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold',
        inProgress ? 'bg-amber/[.14] text-amber' : 'bg-muted/[.14] text-muted',
        className
      )}
    >
      {label}
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
          className="inline-flex h-9 items-center gap-[6px] rounded-[10px] bg-[#ededed] px-4 text-[13px] leading-none font-semibold text-[#141414] shadow-[0_2px_10px_rgba(0,0,0,.18)] transition-colors duration-150 hover:bg-white"
        >
          <GitHubIcon size={14} />
          GitHub
        </a>
        <a
          href={live}
          className="inline-flex h-9 items-center gap-[6px] rounded-[10px] bg-accent px-4 text-[13px] leading-none font-semibold text-white shadow-[0_2px_10px_rgba(0,0,0,.18)] transition-colors duration-150 hover:bg-accent-hover"
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
      <DesktopCard study={linear} video="linear-issues" />
    </div>
  );
}

function DesktopCard({ study, video }: { study: Study; video: string }) {
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
        <StatusPill study={study} />
      </div>
    </article>
  );
}

export function MobileCards() {
  return (
    <>
      <MobileCard study={clerk} video="clerk-nav" />
      <MobileCard study={linear} video="linear-issues" />
    </>
  );
}

function MobileCard({ study, video }: { study: Study; video: string }) {
  return (
    <article className="mb-8 overflow-hidden rounded-xl bg-surface shadow-elev">
      <div className="relative h-48 overflow-hidden bg-surface-2">
        <PreviewVideo name={video} />
        <StatusPill
          study={study}
          // Over video the flat tint has no reliable backdrop, so the overlay
          // pill sits on a translucent surface instead (keeps its text color).
          className="absolute top-3 right-3 bg-surface/85 px-[9px] text-[10.5px] backdrop-blur-[2px]"
        />
      </div>
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
