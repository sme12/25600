import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './CompanyContent.module.css';
import popupStyles from './Popup.module.css';
import { companyLinks } from './company.data';

interface CompanyContentProps {
  contentLabel: string;
}

function CompanyContent({ contentLabel }: CompanyContentProps) {
  return (
    <div className={popupStyles.popupInner}>
      <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
      <ul className={popupStyles.dropdownList}>
        {companyLinks.map((link) => (
          <li key={link.href}>
            <NavigationMenu.Link
              className={`${popupStyles.dropdownLink} ${styles.companyLink}`}
              render={<a href={link.href} />}
            >
              <div className={styles.iconWrap}>{link.icon}</div>
              <div className={popupStyles.dropdownLabel}>{link.label}</div>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { CompanyContent };
