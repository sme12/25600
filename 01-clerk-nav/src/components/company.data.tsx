import type { ReactNode } from 'react';
import {
  AboutIcon,
  PartnersIcon,
  BlogIcon,
  CareersIcon,
  ContactIcon,
} from './company-icons';

export interface CompanyLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export const companyLinks: CompanyLink[] = [
  { label: 'About', href: '/company', icon: <AboutIcon /> },
  { label: 'Partnership Program', href: '/creators', icon: <PartnersIcon /> },
  { label: 'Blog', href: '/blog', icon: <BlogIcon /> },
  { label: 'Careers', href: '/careers', icon: <CareersIcon /> },
  { label: 'Contact', href: '/contact', icon: <ContactIcon /> },
];
