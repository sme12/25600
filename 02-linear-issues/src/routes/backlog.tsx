import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/backlog')({ component: Backlog });

function Backlog() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Backlog</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Placeholder for the backlog view.
      </p>
    </section>
  );
}
