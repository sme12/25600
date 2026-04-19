import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import '../styles.css';
import { Navbar } from '../components/navbar';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="grid grid-cols-[auto_1fr] w-full h-full bg-bg text-text font-sans min-h-screen">
        <div className="w-0 lg:w-61">
          <div></div>
        </div>
        <div className="lg:py-2 lg:pr-2">
          <main className="flex flex-col flex-auto relative overflow-hidden items-stretch bg-surface isolate lg:border-[0.5px] border-border-panel lg:rounded-xl lg:shadow-panel min-h-full">
            <Navbar />
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
