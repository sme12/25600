import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { STATES } from '#/data/states';
import { IssueGroupList } from '#/components/issue-group-list';

export const Route = createFileRoute('/active')({ component: Active });

const ACTIVE_STATES = STATES.filter(
  (s) => s.type === 'unstarted' || s.type === 'started'
);

function Active() {
  const issues = useLoaderData({ from: '__root__' });
  return <IssueGroupList issues={issues} states={ACTIVE_STATES} />;
}
