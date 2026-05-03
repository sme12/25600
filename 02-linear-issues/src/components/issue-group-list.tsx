import type { Issue, WorkflowState } from '#/types';
import { groupByState } from '#/lib/group';
import { PRIORITY_LABEL } from '#/lib/priority';
import { USERS_BY_ID } from '#/data/users';
import { TEAMS_BY_ID } from '#/data/teams';

interface IssueGroupListProps {
  issues: Issue[];
  states: WorkflowState[];
}

export function IssueGroupList({ issues, states }: IssueGroupListProps) {
  const groups = groupByState(issues, states);

  return (
    <>
      {groups.map(({ state, issues: groupIssues }) => (
        <section key={state.id}>
          <h2 className="text-sm font-semibold">{state.name}</h2>
          <ul>
            {groupIssues.map((issue) => {
              const team = TEAMS_BY_ID[issue.teamId];
              return (
                <li key={issue.id}>
                  {team?.key ?? '???'}-{issue.number} · {issue.title} ·{' '}
                  {PRIORITY_LABEL[issue.priority]} ·{' '}
                  {issue.assigneeId
                    ? (USERS_BY_ID[issue.assigneeId]?.name ?? '—')
                    : '—'}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
