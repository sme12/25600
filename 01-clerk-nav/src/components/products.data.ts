import type { ReactNode } from 'react';

interface SubItem {
  label: string;
  href: string;
  badge?: string;
}

interface SubSection {
  heading: string;
  items: SubItem[];
}

interface ProductNavItem {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
  tag?: string;
  subSection: SubSection;
}

export type { SubItem, SubSection, ProductNavItem };
