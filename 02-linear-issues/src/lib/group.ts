import type { Issue, WorkflowState } from '#/types';

export interface IssueGroup {
  state: WorkflowState;
  issues: Issue[];
}

export function groupByState(
  issues: Issue[],
  states: WorkflowState[]
): IssueGroup[] {
  const buckets = new Map<string, Issue[]>();
  for (const issue of issues) {
    const bucket = buckets.get(issue.stateId);
    if (bucket) bucket.push(issue);
    else buckets.set(issue.stateId, [issue]);
  }

  return states
    .map((state) => ({ state, issues: buckets.get(state.id) ?? [] }))
    .filter((group) => group.issues.length > 0);
}
