import type { User } from '#/types';

export const USERS: User[] = [
  { id: 'user-frodo', name: 'Frodo Baggins' },
  { id: 'user-sam', name: 'Samwise Gamgee' },
  { id: 'user-gandalf', name: 'Gandalf the Grey' },
  { id: 'user-aragorn', name: 'Aragorn' },
  { id: 'user-legolas', name: 'Legolas Greenleaf' },
  { id: 'user-gimli', name: 'Gimli son of Glóin' },
  { id: 'user-boromir', name: 'Boromir of Gondor' },
  { id: 'user-merry', name: 'Meriadoc Brandybuck' },
  { id: 'user-pippin', name: 'Peregrin Took' },
  { id: 'user-elrond', name: 'Elrond' },
  { id: 'user-galadriel', name: 'Galadriel' },
  { id: 'user-celeborn', name: 'Celeborn' },
];

export const USERS_BY_ID: Record<string, User | undefined> = Object.fromEntries(
  USERS.map((u) => [u.id, u])
);
