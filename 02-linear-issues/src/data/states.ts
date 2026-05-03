import type { WorkflowState } from '#/types';

export const STATES: WorkflowState[] = [
  { id: 'state-backlog', name: 'Backlog', type: 'backlog' },
  { id: 'state-todo', name: 'Todo', type: 'unstarted' },
  { id: 'state-in-progress', name: 'In Progress', type: 'started' },
  { id: 'state-done', name: 'Done', type: 'completed' },
  { id: 'state-canceled', name: 'Canceled', type: 'canceled' },
];

export const STATES_BY_ID: Record<string, WorkflowState | undefined> =
  Object.fromEntries(STATES.map((s) => [s.id, s]));
