import styles from './MobileMenu.module.css';
import ctaStyles from './CtaButton.module.css';
import { changelogEntries } from './changelog.data';
import { PlayIcon } from './icons';
import { LABELS } from './nav.labels';

function MobileChangelogContent() {
  return (
    <>
      <div>
        <div className={styles.sectionHeading}>{LABELS.changelogHeader}</div>
        <ul className={styles.changelogList}>
          {changelogEntries.map((entry) => (
            <li key={entry.href}>
              <a href={entry.href} className={styles.changelogLink}>
                <div className={styles.changelogDate}>{entry.date}</div>
                <div className={styles.changelogTitle}>{entry.title}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.ctaWrapper}>
        <a href="/changelog" className={ctaStyles.ctaButtonDropdown}>
          <span>{LABELS.changelogCta}</span>
          <PlayIcon aria-hidden="true" className={ctaStyles.iconExit} />
          <PlayIcon aria-hidden="true" className={ctaStyles.iconEnter} />
        </a>
      </div>
    </>
  );
}

export { MobileChangelogContent };
