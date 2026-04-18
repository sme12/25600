import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/all')({ component: All });

function All() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">All</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Placeholder for the all-issues view.
      </p>
    </section>
  );
}
