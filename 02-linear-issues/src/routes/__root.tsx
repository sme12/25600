import { useState } from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import '../styles.css';
import { readTheme, toggleTheme } from '../lib/theme';
import type { Theme } from '../lib/theme';
import { cn } from '../lib/utils';

export const Route = createRootRoute({
  component: RootComponent,
});

const tabBase = 'inline-flex items-center px-2.5 h-7 rounded-full';

const tabActive = 'bg-surface-active text-text text-[13px] font-medium';

const tabInactive =
  'text-text-secondary text-[12px] font-medium hover:text-text';

function RootComponent() {
  const [theme, setTheme] = useState<Theme>(() => readTheme());

  return (
    <>
      <div className="grid grid-cols-[auto_1fr] w-full h-full bg-bg text-text font-sans min-h-screen">
        <div className="w-0 lg:w-61">
          <div></div>
        </div>
        <div className="lg:py-2 lg:pr-2">
          <main className="flex flex-col flex-auto relative overflow-hidden items-stretch bg-surface isolate lg:border-[0.5px] border-border-panel lg:rounded-xl lg:shadow-panel min-h-full">
            <div className="flex items-center gap-1.5 h-[43.5px] px-4 border-b border-border">
              <Link
                to="/all"
                className={tabBase}
                activeProps={{ className: cn(tabBase, tabActive) }}
                inactiveProps={{ className: cn(tabBase, tabInactive) }}
              >
                All
              </Link>
              <Link
                to="/active"
                className={tabBase}
                activeProps={{ className: cn(tabBase, tabActive) }}
                inactiveProps={{ className: cn(tabBase, tabInactive) }}
              >
                Active
              </Link>
              <Link
                to="/backlog"
                className={tabBase}
                activeProps={{ className: cn(tabBase, tabActive) }}
                inactiveProps={{ className: cn(tabBase, tabInactive) }}
              >
                Backlog
              </Link>
              <button
                type="button"
                onClick={() => setTheme(toggleTheme(theme))}
                className="ml-auto text-[12px] text-text-secondary hover:text-text"
              >
                {theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
              </button>
            </div>
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
