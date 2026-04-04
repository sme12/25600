import styles from './StudyBanner.module.css';
import { PlayIcon } from './icons';

const REPO_URL = 'https://github.com/sme12/25600/tree/main/01-clerk-nav';

const LABELS = {
  disclaimer:
    "A study recreation of Clerk's navbar — not affiliated with Clerk",
  cta: 'View source',
} as const;

function StudyBanner() {
  return (
    <a className={styles.banner} href={REPO_URL}>
      <div aria-hidden="true" className={styles.edgeLeft} />
      <div className={styles.text}>{LABELS.disclaimer}</div>
      <div className={styles.divider} />
      <div className={styles.cta}>
        <span className={styles.ctaLabel}>
          {LABELS.cta}
          <PlayIcon aria-hidden="true" className={styles.iconExit} />
          <PlayIcon aria-hidden="true" className={styles.iconEnter} />
        </span>
      </div>
      <div aria-hidden="true" className={styles.edgeRight} />
    </a>
  );
}

export default StudyBanner;
