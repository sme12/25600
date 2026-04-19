import { type RefObject, useState } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './NavMenu.module.css';
import popupStyles from './Popup.module.css';
import navItemStyles from './NavItem.module.css';
import { NavItem } from './NavItem';
import { ChangelogContent } from './ChangelogContent';
import { DocsContent } from './DocsContent';
import { changelogEntries } from './changelog.data';
import { CompanyContent } from './CompanyContent';
import { ProductsContent } from './ProductsContent';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { LABELS } from './nav.labels';

interface NavMenuProps {
  portalContainer?: RefObject<HTMLElement | null>;
}

const DOCS_ALIGN_OFFSET_CENTER = 96;

function NavMenu({ portalContainer }: NavMenuProps) {
  const [activeValue, setActiveValue] = useState('');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const align = isLg ? 'start' : 'center';
  const alignOffset =
    align === 'start'
      ? -12
      : activeValue === LABELS.docs
        ? DOCS_ALIGN_OFFSET_CENTER
        : 0;

  return (
    <NavigationMenu.Root
      className={styles.desktopNav}
      onValueChange={(value) => setActiveValue(value ?? '')}
    >
      <NavigationMenu.List className={styles.navList} data-nav-list>
        <NavItem label={LABELS.products}>
          <ProductsContent contentLabel={LABELS.productsHeader} />
        </NavItem>
        <NavItem label={LABELS.docs}>
          <DocsContent contentLabel={LABELS.docsHeader} />
        </NavItem>
        <NavItem label={LABELS.changelog}>
          <ChangelogContent
            contentLabel={LABELS.changelogHeader}
            entries={changelogEntries}
            ctaLabel={LABELS.changelogCta}
            ctaHref="/changelog"
          />
        </NavItem>
        <NavItem label={LABELS.company}>
          <CompanyContent contentLabel={LABELS.companyHeader} />
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
          align={align}
          alignOffset={alignOffset}
        >
          <NavigationMenu.Popup className={popupStyles.popup}>
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

export { NavMenu };
