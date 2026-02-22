import { useRef } from 'react';
import ctaStyles from './CtaButton.module.css';
import styles from './ClerkNav.module.css';
import { NavMenu } from './NavMenu';
import { ClerkLogoIcon } from './ClerkLogoIcon';
import { FrostBackdrop } from './FrostBackdrop';
import { PlayIcon } from './icons';

const LABELS = {
  homeLink: 'Clerk Home Page',
  mainNav: 'Main',
  signIn: 'Sign in',
  startBuilding: 'Start building',
  openNav: 'Open navigation',
} as const;

interface ClerkNavProps {
  theme?: 'light' | 'dark';
}

function ClerkNav({ theme = 'light' }: ClerkNavProps) {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header ref={headerRef} className={styles.header} data-theme={theme}>
      <FrostBackdrop />
      <div className={styles.navbar}>
        <a aria-label={LABELS.homeLink} className={styles.logoLink} href="/">
          <ClerkLogoIcon />
          <div aria-hidden="true" className={styles.divider} />
        </a>

        <NavMenu portalContainer={headerRef} />

        <div className={styles.actions}>
          <button className={styles.signInButton} type="button">
            <span>{LABELS.signIn}</span>
          </button>
          <a className={ctaStyles.ctaButton} href="/start-building">
            <span>{LABELS.startBuilding}</span>
            <PlayIcon aria-hidden="true" className={ctaStyles.iconExit} />
            <PlayIcon aria-hidden="true" className={ctaStyles.iconEnter} />
          </a>
        </div>

        <button
          className={styles.mobileMenuButton}
          type="button"
          aria-label={LABELS.openNav}
        >
          <div />
        </button>
      </div>
    </header>
  );
}

export default ClerkNav;
