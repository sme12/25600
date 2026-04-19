import type { ReactElement, ReactNode } from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { Shortcut } from './shortcut';

type TooltipProps = {
  label: string;
  shortcut?: string;
  children: ReactElement;
};

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <BaseTooltip.Provider delay={400} closeDelay={0}>
      {children}
    </BaseTooltip.Provider>
  );
}

export function Tooltip({ label, shortcut, children }: TooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side="bottom" sideOffset={6}>
          <BaseTooltip.Popup className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-surface text-text text-[12px] shadow-(--shadow-panel) data-starting-style:opacity-0 data-ending-style:opacity-0 transition-opacity duration-150">
            <span>{label}</span>
            {shortcut ? <Shortcut>{shortcut}</Shortcut> : null}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
