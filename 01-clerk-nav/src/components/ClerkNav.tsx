import type { Ref } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
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
  { label: LABELS.products },
  { label: LABELS.docs },
  { label: LABELS.changelog },
  { label: LABELS.company },
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

        <NavigationMenu.Root className={styles.desktopNav}>
          <NavigationMenu.List className={styles.navList}>
            {navItems.map(({ label }) => (
              <NavigationMenu.Item key={label} className={styles.navItem}>
                <NavigationMenu.Trigger className={styles.navButton}>
                  <span className={styles.navItemLabel}>
                    {label}
                    <NavigationMenu.Icon>
                      <ChevronDownIcon aria-hidden="true" />
                    </NavigationMenu.Icon>
                  </span>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className={styles.navContent}>
                  {/* Dropdown content will be added later */}
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item className={styles.navItem}>
              <NavigationMenu.Link className={styles.navLink} href="/pricing">
                <span className={styles.navItemLabel}>{LABELS.pricing}</span>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Portal>
            <NavigationMenu.Positioner className={styles.positioner}>
              <NavigationMenu.Popup className={styles.popup}>
                <NavigationMenu.Viewport />
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Root>

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
