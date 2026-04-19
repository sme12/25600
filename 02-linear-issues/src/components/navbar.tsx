import { useState } from 'react';
import { Link } from '@tanstack/react-router';

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

export function Navbar() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  return (
    <div className="flex items-center gap-1.5 h-[43.5px] px-4 border-b border-border">
      <TooltipProvider>
        <Tooltip label="All" shortcut="1">
          <Link
            to="/all"
            className={tabBase}
            activeProps={activeProps}
            inactiveProps={inactiveProps}
          >
            All
          </Link>
        </Tooltip>
        <Tooltip label="Active" shortcut="2">
          <Link
            to="/active"
            className={tabBase}
            activeProps={activeProps}
            inactiveProps={inactiveProps}
          >
            Active
          </Link>
        </Tooltip>
        <Tooltip label="Backlog" shortcut="3">
          <Link
            to="/backlog"
            className={tabBase}
            activeProps={activeProps}
            inactiveProps={inactiveProps}
          >
            Backlog
          </Link>
        </Tooltip>
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
