export interface Study {
  id: string;
  title: string;
  github: string;
  live: string;
  status: 'live' | 'in-progress';
}

export const studies: Study[] = [
  {
    id: '01',
    title: 'Clerk navigation',
    github: 'https://github.com/sme12/25600/tree/main/01-clerk-nav',
    live: 'https://www.25600.design/01-clerk-nav',
    status: 'live',
  },
  {
    id: '02',
    title: 'Linear issues',
    github: 'https://github.com/sme12/25600/tree/main/02-linear-issues',
    live: 'https://www.25600.design/02-linear-issues',
    status: 'in-progress',
  },
];
