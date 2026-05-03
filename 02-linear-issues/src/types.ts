export type WorkflowStateType =
  | 'backlog'
  | 'unstarted'
  | 'started'
  | 'completed'
  | 'canceled';

export interface WorkflowState {
  id: string;
  name: string;
  type: WorkflowStateType;
}

export interface User {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  key: string;
}

export interface Issue {
  // Identity
  id: string;
  number: number;
  title: string;
  previousIdentifiers: string[];
  traits: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  addedToProjectAt: string | null;
  addedToTeamAt: string;
  startedAt: string | null;
  completedAt: string | null;

  // Relations
  teamId: string;
  projectId: string;
  stateId: string;
  creatorId: string;
  assigneeId?: string;
  parentId?: string;
  labelIds: string[];
  subscriberIds: string[];

  // Ordering / display
  priority: 0 | 1 | 2 | 3 | 4;
  boardOrder: number;
  sortOrder: number;
  prioritySortOrder: number;
  subIssueSortOrder?: number;

  // Status tracking
  slaType: string;
  timeInStatus: {
    stateUpdatedAt: string;
    accumulatedTimeByState: Record<string, number>;
    accumulatedStateUpdatedAt: string;
  };

  // Misc
  reactionData: object[];
  inheritsSharedAccess: boolean;
}
