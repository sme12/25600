import { useMemo, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useHotkeys } from '@tanstack/react-hotkeys';

import { readTheme, toggleTheme } from '../lib/theme';
import type { Theme } from '../lib/theme';
import { cn } from '../lib/utils';
import { Tooltip, TooltipProvider } from './tooltip';

const tabBase = 'inline-flex items-center px-2.5 h-7 rounded-full';

const tabActive = 'bg-surface-active text-text text-[13px] font-medium';

const tabInactive =
  'text-text-secondary text-[12px] font-medium hover:text-text';

const activeProps = { className: cn(tabBase, tabActive) };
const inactiveProps = { className: cn(tabBase, tabInactive) };

const tabs = [
  { to: '/all', label: 'All', shortcut: '1' },
  { to: '/active', label: 'Active', shortcut: '2' },
  { to: '/backlog', label: 'Backlog', shortcut: '3' },
] as const;

export function Navbar() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());
  const navigate = useNavigate();

  const hotkeys = useMemo(
    () =>
      tabs.map((tab) => ({
        hotkey: tab.shortcut,
        callback: () => navigate({ to: tab.to }),
      })),
    [navigate]
  );
  useHotkeys(hotkeys);

  return (
    <div className="flex items-center gap-1.5 h-[43.5px] px-4 border-b border-border">
      <TooltipProvider>
        {tabs.map((tab) => (
          <Tooltip key={tab.to} label={tab.label} shortcut={tab.shortcut}>
            <Link
              to={tab.to}
              className={tabBase}
              activeProps={activeProps}
              inactiveProps={inactiveProps}
            >
              {tab.label}
            </Link>
          </Tooltip>
        ))}
      </TooltipProvider>
      <button
        type="button"
        onClick={() => setTheme(toggleTheme(theme))}
        className="ml-auto text-[12px] text-text-secondary hover:text-text"
      >
        {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
      </button>
    </div>
  );
}
