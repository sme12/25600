import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { STATES } from '#/data/states';
import { IssueGroupList } from '#/components/issue-group-list';

export const Route = createFileRoute('/backlog')({ component: Backlog });

const BACKLOG_STATES = STATES.filter((s) => s.type === 'backlog');

function Backlog() {
  const issues = useLoaderData({ from: '__root__' });
  return <IssueGroupList issues={issues} states={BACKLOG_STATES} />;
}
