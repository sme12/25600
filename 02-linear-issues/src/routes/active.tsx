import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/active')({ component: Active });

function Active() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Active</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Placeholder for the active-issues view.
      </p>
    </section>
  );
}
