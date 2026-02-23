import type { RefObject } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './NavMenu.module.css';
import { NavItem, navItemStyles } from './NavItem';
import { ChangelogContent } from './ChangelogContent';

const LABELS = {
  products: 'Products',
  productsHeader: 'Products',
  docs: 'Docs',
  docsHeader: 'Featured Docs',
  changelog: 'Changelog',
  changelogHeader: 'Latest Changelog',
  company: 'Company',
  companyHeader: 'Resources',
  pricing: 'Pricing',
} as const;

const changelogEntries = [
  {
    date: 'Feb 20, 2026',
    title: 'Require multi-factor authentication (MFA)',
    href: '/changelog/2026-02-20-require-mfa',
  },
  {
    date: 'Feb 11, 2026',
    title: 'Improved visibility into Stripe account status',
    href: '/changelog/2026-02-11-account-detection',
  },
  {
    date: 'Feb 11, 2026',
    title: 'Share Dashboard Analytics',
    href: '/changelog/2026-02-11-export-dashboard-analytics',
  },
  {
    date: 'Feb 10, 2026',
    title: 'iOS and Android SDKs v1',
    href: '/changelog/2026-02-10-ios-android-sdk-v1',
  },
];

interface NavMenuProps {
  portalContainer?: RefObject<HTMLElement | null>;
}

function NavMenu({ portalContainer }: NavMenuProps) {
  return (
    <NavigationMenu.Root className={styles.desktopNav}>
      <NavigationMenu.List className={styles.navList} data-nav-list>
        <NavItem label={LABELS.products} contentLabel={LABELS.productsHeader}>
          <div />
        </NavItem>
        <NavItem label={LABELS.docs} contentLabel={LABELS.docsHeader}>
          <div />
        </NavItem>
        <NavItem label={LABELS.changelog} contentLabel={LABELS.changelogHeader}>
          <ChangelogContent entries={changelogEntries} />
        </NavItem>
        <NavItem label={LABELS.company} contentLabel={LABELS.companyHeader}>
          <div />
        </NavItem>
        <NavigationMenu.Item className={navItemStyles.navItem}>
          <NavigationMenu.Link
            className={navItemStyles.navLink}
            href="/pricing"
          >
            <span className={navItemStyles.navItemLabel}>{LABELS.pricing}</span>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal container={portalContainer}>
        <NavigationMenu.Positioner
          className={styles.positioner}
          sideOffset={12}
          align="start"
          alignOffset={-12}
        >
          <NavigationMenu.Popup className={styles.popup}>
            <NavigationMenu.Viewport className={styles.popupInner} />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

export { NavMenu };
