import type { ReactNode } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './NavItem.module.css';
import { ChevronDownIcon } from './icons';

interface NavItemProps {
  label: string;
  children?: ReactNode;
}

function NavItem({ label, children }: NavItemProps) {
  return (
    <NavigationMenu.Item value={label} className={styles.navItem}>
      <NavigationMenu.Trigger className={styles.navButton}>
        <span className={styles.navItemLabel}>
          {label}
          <NavigationMenu.Icon className={styles.chevronWrap}>
            <ChevronDownIcon
              className={styles.chevronClosed}
              aria-hidden="true"
            />
            <ChevronDownIcon
              className={styles.chevronOpen}
              aria-hidden="true"
            />
          </NavigationMenu.Icon>
        </span>
      </NavigationMenu.Trigger>
      {children && <NavigationMenu.Content>{children}</NavigationMenu.Content>}
    </NavigationMenu.Item>
  );
}

export { NavItem };
