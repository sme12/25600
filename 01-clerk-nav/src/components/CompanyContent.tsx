import type { ReactNode } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './CompanyContent.module.css';
import popupStyles from './Popup.module.css';
import {
  AboutIcon,
  PartnersIcon,
  BlogIcon,
  CareersIcon,
  ContactIcon,
} from './company-icons';

interface CompanyLink {
  label: string;
  href: string;
  icon: ReactNode;
}

const companyLinks: CompanyLink[] = [
  { label: 'About', href: '/company', icon: <AboutIcon /> },
  { label: 'Partnership Program', href: '/creators', icon: <PartnersIcon /> },
  { label: 'Blog', href: '/blog', icon: <BlogIcon /> },
  { label: 'Careers', href: '/careers', icon: <CareersIcon /> },
  { label: 'Contact', href: '/contact', icon: <ContactIcon /> },
];

interface CompanyContentProps {
  contentLabel: string;
}

function CompanyContent({ contentLabel }: CompanyContentProps) {
  return (
    <div className={popupStyles.popupInner}>
      <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
      <ul className={styles.dropdownList}>
        {companyLinks.map((link) => (
          <li key={link.href}>
            <NavigationMenu.Link
              className={styles.companyLink}
              render={<a href={link.href} />}
            >
              <div className={styles.iconWrap}>{link.icon}</div>
              <div className={styles.linkLabel}>{link.label}</div>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { CompanyContent };
