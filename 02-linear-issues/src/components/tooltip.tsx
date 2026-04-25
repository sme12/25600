import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { AnimatePresence, motion } from 'motion/react';
import { Shortcut } from './shortcut';

type TooltipProps = {
  label: string;
  shortcut?: string;
  children: ReactElement;
  open?: boolean;
};

const SIDE = 'bottom' as const;
const TRANSFORM_ORIGIN: Record<typeof SIDE, string> = {
  bottom: 'top center',
};

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <BaseTooltip.Provider delay={600} closeDelay={0}>
      {children}
    </BaseTooltip.Provider>
  );
}

export function Tooltip({ label, shortcut, children, open }: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;

  return (
    <BaseTooltip.Root
      open={isOpen}
      onOpenChange={open === undefined ? setInternalOpen : undefined}
    >
      <BaseTooltip.Trigger render={children} />
      <AnimatePresence>
        {isOpen ? (
          <BaseTooltip.Portal>
            <BaseTooltip.Positioner side={SIDE} sideOffset={4}>
              <BaseTooltip.Popup
                className="border-popover-border bg-popover text-popover-text flex max-w-130 items-center gap-2 rounded-lg border-[0.5px] px-2 py-1.25 text-[11px] wrap-break-word shadow-(--shadow-panel)"
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{
                      type: 'spring',
                      stiffness: 700,
                      damping: 35,
                      mass: 1,
                    }}
                    style={{ transformOrigin: TRANSFORM_ORIGIN[SIDE] }}
                  />
                }
              >
                <div className="font-normal">{label}</div>
                {shortcut ? <Shortcut>{shortcut}</Shortcut> : null}
              </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
          </BaseTooltip.Portal>
        ) : null}
      </AnimatePresence>
    </BaseTooltip.Root>
  );
}
