import type { Issue } from '#/types';

const TEAM_ID = 'team-fellowship';
const PROJECT_ID = 'project-fellowship-of-the-ring';
const CREATOR_ID = 'user-elrond';
const NOW = '2026-05-02T12:00:00.000Z';

type IssueSeed = Pick<Issue, 'number' | 'title' | 'stateId'> & Partial<Issue>;

function makeIssue(seed: IssueSeed): Issue {
  return {
    id: `issue-${String(seed.number).padStart(2, '0')}`,
    previousIdentifiers: [],
    traits: 0,

    createdAt: NOW,
    updatedAt: NOW,
    addedToProjectAt: NOW,
    addedToTeamAt: NOW,
    startedAt: null,
    completedAt: null,

    teamId: TEAM_ID,
    projectId: PROJECT_ID,
    creatorId: CREATOR_ID,
    labelIds: [],
    subscriberIds: [],

    priority: 0,
    boardOrder: seed.number,
    sortOrder: seed.number,
    prioritySortOrder: seed.number,

    slaType: 'all',
    timeInStatus: {
      stateUpdatedAt: NOW,
      accumulatedTimeByState: {},
      accumulatedStateUpdatedAt: NOW,
    },

    reactionData: [],
    inheritsSharedAccess: true,

    ...seed,
  };
}

export const ISSUES: Issue[] = [
  makeIssue({
    number: 1,
    title: 'Destroy the One Ring in the fires of Mount Doom',
    stateId: 'state-in-progress',
    priority: 1,
    assigneeId: 'user-frodo',
    startedAt: NOW,
  }),
  makeIssue({
    number: 2,
    title: 'Council of Elrond: align stakeholders on ring disposal strategy',
    stateId: 'state-done',
    priority: 1,
    assigneeId: 'user-elrond',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 3,
    title: 'Finalize Fellowship headcount at 9',
    stateId: 'state-done',
    priority: 2,
    assigneeId: 'user-gandalf',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 4,
    title: 'Procure provisions, rope, cookware',
    stateId: 'state-done',
    priority: 3,
    assigneeId: 'user-sam',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 5,
    title: '[SPIKE] Caradhras pass — winter feasibility',
    stateId: 'state-canceled',
    priority: 2,
    assigneeId: 'user-aragorn',
  }),
  makeIssue({
    number: 6,
    title: 'Route through Mines of Moria',
    stateId: 'state-done',
    priority: 2,
    assigneeId: 'user-gimli',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 7,
    title: 'INCIDENT: Balrog encounter in Khazad-dûm',
    stateId: 'state-done',
    priority: 1,
    assigneeId: 'user-gandalf',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 8,
    title: 'Secure safe passage + resupply in Lothlórien',
    stateId: 'state-done',
    priority: 3,
    assigneeId: 'user-legolas',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 9,
    title: "Distribute Galadriel's gifts",
    stateId: 'state-done',
    priority: 4,
    assigneeId: 'user-galadriel',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 10,
    title: 'Procure boats for Anduin river travel',
    stateId: 'state-done',
    priority: 3,
    assigneeId: 'user-celeborn',
    startedAt: NOW,
    completedAt: NOW,
  }),
  makeIssue({
    number: 11,
    title: 'DECISION: Minas Tirith detour vs. direct route to Mordor',
    stateId: 'state-backlog',
    priority: 2,
  }),
  makeIssue({
    number: 12,
    title: 'Surveillance: Gollum tailing the party',
    stateId: 'state-todo',
    priority: 3,
    assigneeId: 'user-sam',
  }),
  makeIssue({
    number: 13,
    title: 'INCIDENT: Uruk-hai ambush at Amon Hen',
    stateId: 'state-in-progress',
    priority: 1,
    startedAt: NOW,
  }),
  makeIssue({
    number: 14,
    title: 'Track and rescue Merry & Pippin',
    stateId: 'state-todo',
    priority: 1,
    assigneeId: 'user-aragorn',
  }),
  makeIssue({
    number: 15,
    title: 'Deliver Ring to Mount Doom (solo path)',
    stateId: 'state-in-progress',
    priority: 1,
    assigneeId: 'user-frodo',
    startedAt: NOW,
  }),
];
