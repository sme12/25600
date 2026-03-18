import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './ChangelogContent.module.css';
import popupStyles from './Popup.module.css';
import ctaStyles from './CtaButton.module.css';
import { PlayIcon } from './icons';

interface ChangelogContentProps {
  contentLabel: string;
  entries: { date: string; title: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
}

function ChangelogContent({
  contentLabel,
  entries,
  ctaLabel,
  ctaHref,
}: ChangelogContentProps) {
  return (
    <div className={popupStyles.popupInner}>
      <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
      <ul className={styles.dropdownList}>
        {entries.map((entry) => (
          <li key={entry.href}>
            <NavigationMenu.Link
              className={styles.changelogLink}
              render={<a href={entry.href} />}
            >
              <div className={styles.changelogDate}>{entry.date}</div>
              <div className={styles.changelogTitle}>{entry.title}</div>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <div className={styles.ctaButtonWrapper}>
        <a href={ctaHref} className={ctaStyles.ctaButtonDropdown}>
          <span>{ctaLabel}</span>
          <PlayIcon aria-hidden="true" className={ctaStyles.iconExit} />
          <PlayIcon aria-hidden="true" className={ctaStyles.iconEnter} />
        </a>
      </div>
    </div>
  );
}

export { ChangelogContent };
