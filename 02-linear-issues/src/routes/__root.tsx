import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import '../styles.css';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <main className="p-6">
        <nav className="mb-6 flex gap-4 text-sm">
          <Link
            to="/all"
            activeProps={{ className: 'font-semibold underline' }}
          >
            All
          </Link>
          <Link
            to="/active"
            activeProps={{ className: 'font-semibold underline' }}
          >
            Active
          </Link>
          <Link
            to="/backlog"
            activeProps={{ className: 'font-semibold underline' }}
          >
            Backlog
          </Link>
        </nav>
        <Outlet />
      </main>
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
