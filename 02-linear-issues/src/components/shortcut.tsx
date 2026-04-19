import type { ReactNode } from 'react';

export function Shortcut({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded border border-border bg-bg text-text-secondary text-[11px] font-medium font-sans">
      {children}
    </kbd>
  );
}
