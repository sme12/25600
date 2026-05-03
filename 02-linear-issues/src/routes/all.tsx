import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { STATES } from '#/data/states';
import { IssueGroupList } from '#/components/issue-group-list';

export const Route = createFileRoute('/all')({ component: All });

function All() {
  const issues = useLoaderData({ from: '__root__' });
  return <IssueGroupList issues={issues} states={STATES} />;
}
