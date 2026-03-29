import styles from './MobileMenu.module.css';
import { companyLinks } from './company.data';
import { LABELS } from './nav.labels';

function MobileCompanyContent() {
  return (
    <div>
      <div className={styles.sectionHeading}>{LABELS.companyHeader}</div>
      <ul className={styles.companyList}>
        {companyLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.companyLink}>
              <div className={styles.companyIconWrap}>{link.icon}</div>
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { MobileCompanyContent };
