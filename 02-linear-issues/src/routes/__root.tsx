import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { HotkeysDevtoolsPanel } from '@tanstack/react-hotkeys-devtools';

import '../styles.css';
import { Header } from '../components/header';
import { ISSUES } from '#/data/issues';

export const Route = createRootRoute({
  loader: () => ISSUES,
  staleTime: Infinity,
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="bg-bg text-text grid h-full min-h-screen w-full grid-cols-[auto_1fr] font-sans">
        <div className="w-0 lg:w-61">
          <div></div>
        </div>
        <div className="lg:py-2 lg:pr-2">
          <main className="bg-surface border-border-panel lg:shadow-panel relative isolate flex min-h-full flex-auto flex-col items-stretch overflow-hidden lg:rounded-xl lg:border-[0.5px]">
            <Header />
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
          {
            name: 'TanStack Hotkeys',
            render: (_el, props) => <HotkeysDevtoolsPanel {...props} />,
          },
        ]}
      />
    </>
  );
}
