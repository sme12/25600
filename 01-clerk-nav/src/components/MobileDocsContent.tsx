import styles from './MobileMenu.module.css';
import popupStyles from './Popup.module.css';
import ctaStyles from './CtaButton.module.css';
import { sdkItems, featuredDocs } from './docs.data';
import { PlayIcon } from './icons';
import { LABELS } from './nav.labels';

function MobileDocsContent() {
  return (
    <>
      {/* Top SDKs */}
      <div>
        <div className={styles.sectionHeading}>{LABELS.docsHeader}</div>
        <ul className={styles.sdkGrid}>
          {sdkItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.sdkLink}>
                <div
                  className={`${popupStyles.iconWrap} ${styles.sdkIconWrap}`}
                >
                  <span className={popupStyles.iconSvg}>{item.icon}</span>
                </div>
                <span className={styles.sdkLabel}>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* CTA */}
      <div className={styles.ctaWrapper}>
        <a href="/docs" className={ctaStyles.ctaButtonDropdown}>
          <span>{LABELS.docsCta}</span>
          <PlayIcon aria-hidden="true" className={ctaStyles.iconExit} />
          <PlayIcon aria-hidden="true" className={ctaStyles.iconEnter} />
        </a>
      </div>
      {/* Featured Docs */}
      <div className={styles.featuredDocsSection}>
        <div className={styles.sectionHeading}>{LABELS.featuredDocsHeader}</div>
        <ul className={styles.featuredList}>
          {featuredDocs.map((doc) => (
            <li key={doc.href}>
              <a href={doc.href} className={styles.featuredLink}>
                {doc.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export { MobileDocsContent };
