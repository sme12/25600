import type { ReactNode } from 'react';

export function Shortcut({ children }: { children: ReactNode }) {
  return (
    <kbd className="border-border text-text-shortcut inline-flex h-4.5 min-w-4.5 items-center justify-center rounded border-[0.5px] p-0.5 font-sans text-[11px] font-[400]">
      {children}
    </kbd>
  );
}
