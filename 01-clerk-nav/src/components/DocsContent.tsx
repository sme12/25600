import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './DocsContent.module.css';
import popupStyles from './Popup.module.css';
import ctaStyles from './CtaButton.module.css';
import { PlayIcon } from './icons';
import { sdkItems, featuredDocs } from './docs.data';
import { LABELS } from './nav.labels';

interface DocsContentProps {
  contentLabel: string;
}

function DocsContent({ contentLabel }: DocsContentProps) {
  return (
    <div className={styles.grid}>
      {/* Left panel – Top SDKs */}
      <div className={`${styles.leftPanel} ${popupStyles.popupInner}`}>
        <div className={popupStyles.leftInner}>
          <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
          <div className={styles.sdkGrid}>
            {sdkItems.map((item) => (
              <NavigationMenu.Link
                key={item.href}
                className={styles.sdkLink}
                render={<a href={item.href} />}
              >
                <div className={styles.iconWrap}>
                  <span
                    className={`${popupStyles.iconSvg} ${styles.iconSvgChildren}`}
                  >
                    {item.icon}
                  </span>
                </div>
                <span className={styles.sdkLabel}>{item.label}</span>
              </NavigationMenu.Link>
            ))}
          </div>
          <div className={styles.ctaWrapper}>
            <a href="/docs" className={ctaStyles.ctaButtonDropdown}>
              <span>{LABELS.docsCta}</span>
              <PlayIcon aria-hidden="true" className={ctaStyles.iconExit} />
              <PlayIcon aria-hidden="true" className={ctaStyles.iconEnter} />
            </a>
          </div>
        </div>
      </div>

      {/* Right panel – Featured Docs */}
      <div className={popupStyles.rightPanel}>
        <div className={styles.rightInner}>
          <div className={popupStyles.popupContentHeader}>
            {LABELS.featuredDocsHeader}
          </div>
          <div className={styles.featuredList}>
            {featuredDocs.map((doc) => (
              <NavigationMenu.Link
                key={doc.href}
                className={styles.featuredLink}
                render={<a href={doc.href} />}
              >
                {doc.label}
              </NavigationMenu.Link>
            ))}
          </div>
        </div>
        <div className={popupStyles.bottomFade}>
          <div className={popupStyles.twinklePattern} />
        </div>
      </div>
    </div>
  );
}

export { DocsContent };
