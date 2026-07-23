import { DesktopCards, MobileCards } from '#/components/study-card';
import { DESKTOP_MQ } from '#/lib/constants';
import { useMediaQuery } from '#/lib/use-media-query';
import { cn } from '#/lib/utils';

function Tile({
  label,
  sub,
  className,
  labelClassName,
  subClassName,
}: {
  label: string;
  sub?: string;
  className?: string;
  labelClassName?: string;
  subClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-dash',
        className
      )}
    >
      <span className={cn('font-semibold text-dim', labelClassName)}>
        {label}
      </span>
      {sub && <span className={cn('text-faint-2', subClassName)}>{sub}</span>}
    </div>
  );
}

export function Studies() {
  const isDesktop = useMediaQuery(DESKTOP_MQ);

  return (
    <section className="mt-2 rounded-t-[20px] bg-surface-2 px-5 pt-8 pb-12 desktop:mx-auto desktop:mt-0 desktop:w-[1040px] desktop:rounded-none desktop:bg-transparent desktop:px-12 desktop:pt-8 desktop:pb-0">
      <h2 className="mb-8 text-2xl leading-8 font-[650] tracking-[-0.03em] text-strong desktop:mb-7 desktop:text-[32px] desktop:leading-normal">
        Studies
      </h2>
      {isDesktop ? (
        <>
          <DesktopCards />
          <div className="grid auto-rows-[202px] grid-cols-3 gap-4">
            <Tile
              label="03 — Yet to study"
              className="gap-1"
              labelClassName="text-[13.5px]"
              subClassName="text-xs"
            />
            <Tile label="04 — Yet to study" labelClassName="text-[13.5px]" />
            <Tile label="05 — Yet to study" labelClassName="text-[13.5px]" />
          </div>
        </>
      ) : (
        <>
          <MobileCards />
          <Tile
            label="03 — Yet to study"
            className="mb-8 h-24 gap-0.5"
            labelClassName="text-[13px] leading-4"
            subClassName="text-[11.5px] leading-4"
          />
          <Tile
            label="04 — Yet to study"
            className="mb-8 h-24"
            labelClassName="text-[13px] leading-4"
          />
          <Tile
            label="05 — Yet to study"
            className="h-24"
            labelClassName="text-[13px] leading-4"
          />
        </>
      )}
    </section>
  );
}
