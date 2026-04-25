import { useMemo, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useHotkeys } from '@tanstack/react-hotkeys';

import { readTheme, toggleTheme } from '../lib/theme';
import type { Theme } from '../lib/theme';
import { cn } from '../lib/utils';
import { Tooltip, TooltipProvider } from './tooltip';

const tabBase =
  'inline-flex items-center px-2.5 h-7 rounded-full border-[0.5px] cursor-default';

const tabActive =
  'bg-button-tab-bg text-button-tab-color border-button-tab-border text-[12px] font-medium';

const tabInactive =
  'bg-button-tab-bg-inactive text-button-tab-color-inactive border-button-tab-border-inactive hover:bg-button-tab-bg-hover hover:text-button-tab-color-hover hover:border-button-tab-border-hover text-[12px] font-medium';

const activeProps = { className: cn(tabBase, tabActive) };
const inactiveProps = { className: cn(tabBase, tabInactive) };

const tabs = [
  {
    to: '/all',
    label: 'All issues',
    tooltipLabel: 'Open All issues',
    shortcut: '1',
  },
  {
    to: '/active',
    label: 'Active',
    tooltipLabel: 'Open Active issues',
    shortcut: '2',
  },
  {
    to: '/backlog',
    label: 'Backlog',
    tooltipLabel: 'Open Backlog',
    shortcut: '3',
  },
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
    <div className="flex h-[43.5px] items-center gap-1.5 px-2">
      <TooltipProvider>
        {tabs.map((tab) => (
          <Tooltip
            key={tab.to}
            label={tab.tooltipLabel}
            shortcut={tab.shortcut}
          >
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
        className="text-text-secondary hover:text-text ml-auto text-[12px]"
      >
        {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
      </button>
    </div>
  );
}
