import type { Ref } from 'react';
import ctaStyles from './CtaButton.module.css';
import styles from './ClerkNav.module.css';
import { ClerkLogoIcon } from './ClerkLogoIcon';
import { FrostBackdrop } from './FrostBackdrop';
import { ChevronDownIcon, PlayIcon } from './icons';

const LABELS = {
  homeLink: 'Clerk Home Page',
  mainNav: 'Main',
  products: 'Products',
  docs: 'Docs',
  changelog: 'Changelog',
  company: 'Company',
  pricing: 'Pricing',
  signIn: 'Sign in',
  startBuilding: 'Start building',
  openNav: 'Open navigation',
} as const;

const navItems = [
  { label: LABELS.products, hasDropdown: true },
  { label: LABELS.docs, hasDropdown: true },
  { label: LABELS.changelog, hasDropdown: true },
  { label: LABELS.company, hasDropdown: true },
];

interface ClerkNavProps {
  theme?: 'light' | 'dark';
  ref?: Ref<HTMLElement>;
}

function ClerkNav({ theme = 'light', ref }: ClerkNavProps) {
  return (
    <header ref={ref} className={styles.header} data-theme={theme}>
      <FrostBackdrop />
      <div className={styles.navbar}>
        <a aria-label={LABELS.homeLink} className={styles.logoLink} href="/">
          <ClerkLogoIcon />
          <div aria-hidden="true" className={styles.divider} />
        </a>

        <nav aria-label={LABELS.mainNav} className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navItems.map(({ label, hasDropdown }) => (
              <li key={label} className={styles.navItem}>
                <button className={styles.navButton} type="button">
                  <span className={styles.navItemLabel}>
                    {label}
                    {hasDropdown && <ChevronDownIcon aria-hidden="true" />}
                  </span>
                </button>
              </li>
            ))}
            <li className={styles.navItem}>
              <a className={styles.navLink} href="/pricing">
                <span className={styles.navItemLabel}>{LABELS.pricing}</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <button className={styles.signInButton} type="button">
            <span>{LABELS.signIn}</span>
          </button>
          <a className={ctaStyles.ctaButton} href="/start-building">
            <span>{LABELS.startBuilding}</span>
            <PlayIcon aria-hidden="true" />
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
