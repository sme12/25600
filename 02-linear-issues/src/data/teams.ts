import type { Team } from '#/types';

export const TEAMS: Team[] = [
  { id: 'team-fellowship', name: 'Fellowship', key: 'FEL' },
];

export const TEAMS_BY_ID: Record<string, Team | undefined> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t])
);
