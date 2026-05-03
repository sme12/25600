import type { Issue } from '#/types';

export const PRIORITY_LABEL: Record<Issue['priority'], string> = {
  0: '—',
  1: 'Urgent',
  2: 'High',
  3: 'Medium',
  4: 'Low',
};
