import { useState } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './ProductsContent.module.css';
import popupStyles from './Popup.module.css';
import { UserAuthIcon, B2BIcon, BillingIcon } from './icons';
import type { ProductNavItem } from './products.data';

const productsNav: ProductNavItem[] = [
  {
    label: 'User Authentication',
    href: '/user-authentication',
    description: 'For effortless sign-up, sign-in, and user profiles',
    icon: <UserAuthIcon />,
    subSection: {
      heading: 'Authentication Components',
      items: [
        { label: '<SignUp />', href: '/components/sign-up' },
        { label: '<SignIn />', href: '/components/sign-in' },
        { label: '<UserButton />', href: '/docs/user-button', badge: 'Docs' },
        {
          label: '<UserProfile />',
          href: '/docs/user-profile',
          badge: 'Docs',
        },
        { label: '<Waitlist />', href: '/docs/waitlist', badge: 'Docs' },
      ],
    },
  },
  {
    label: 'B2B Authentication',
    href: '/organizations',
    description: 'For powering multi-tenant teams and roles',
    icon: <B2BIcon />,
    subSection: {
      heading: 'B2B Authentication Components',
      items: [
        { label: '<CreateOrganization />', href: '/docs/create-organization' },
        {
          label: '<OrganizationSwitcher />',
          href: '/docs/organization-switcher',
        },
        {
          label: '<OrganizationProfile />',
          href: '/docs/organization-profile',
        },
        { label: '<OrganizationList />', href: '/docs/organization-list' },
      ],
    },
  },
  {
    label: 'Billing',
    href: '/billing',
    description: 'For handling subscriptions plans and payments',
    icon: <BillingIcon />,
    tag: 'Beta',
    subSection: {
      heading: 'Billing Components',
      items: [
        { label: '<PricingTable />', href: '/docs/pricing-table' },
        { label: '<CheckoutButton />', href: '/docs/checkout-button' },
      ],
    },
  },
];

function ProductsContent({ contentLabel }: { contentLabel: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex !== null ? productsNav[activeIndex] : null;

  return (
    <div className={styles.grid} data-submenu-open={activeIndex !== null}>
      {/* Left panel */}
      <div className={`${styles.leftPanel} ${popupStyles.popupInner}`}>
        <div className={styles.leftInner}>
          <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
          <div className={styles.navList}>
            {productsNav.map((item, i) => (
              <NavigationMenu.Link
                key={item.label}
                className={styles.navItemLink}
                data-active={activeIndex === i}
                onMouseEnter={() => setActiveIndex(i)}
                render={<a href={item.href} />}
              >
                <div className={styles.navItemRow}>
                  <div className={styles.iconWrap}>
                    <span className={styles.iconSvg}>{item.icon}</span>
                  </div>
                  <div className={styles.navItemText}>
                    <div className={styles.navItemTitle}>
                      {item.label}
                      {item.tag && (
                        <span className={styles.betaBadge}>{item.tag}</span>
                      )}
                    </div>
                    <div className={styles.navItemDesc}>{item.description}</div>
                  </div>
                </div>
              </NavigationMenu.Link>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className={styles.rightPanel}>
        <div className={styles.rightInner}>
          {activeItem && (
            <div
              key={activeIndex}
              className={styles.rightContent}
              data-entering="true"
            >
              <div className={popupStyles.popupContentHeader}>
                {activeItem.subSection.heading}
              </div>
              <div>
                {activeItem.subSection.items.map((sub, i) => (
                  <a
                    key={sub.label}
                    className={`${styles.subItem} ${styles.staggerItem}`}
                    href={sub.href}
                    style={{ animationDelay: `${i * 25}ms` }}
                  >
                    <span className={styles.subItemLabel}>{sub.label}</span>
                    {sub.badge && (
                      <span className={styles.subItemBadge}>{sub.badge}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.bottomFade}>
          <div className={styles.twinklePattern} />
        </div>
      </div>
    </div>
  );
}

export { ProductsContent };
