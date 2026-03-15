import { useState, useRef } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ProductsContent.module.css';
import popupStyles from './Popup.module.css';
import {
  UserAuthIcon,
  B2BIcon,
  BillingIcon,
  DashedHLine,
  DashedVLine,
} from './icons';
import type { ProductNavItem } from './products.data';
import { EASE_OUT } from './motion-constants';

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
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const previousIndexRef = useRef(-1);

  const activeItem = activeValue
    ? productsNav.find((item) => item.label === activeValue)
    : null;

  return (
    <NavigationMenu.Root
      orientation="vertical"
      onValueChange={(value) => {
        if (value != null) {
          const newIndex = productsNav.findIndex(
            (item) => item.label === value
          );
          setDirection(newIndex > previousIndexRef.current ? 'down' : 'up');
          previousIndexRef.current = newIndex;
          setActiveValue(value);
          setSubmenuOpen(true);
        }
      }}
    >
      <div className={styles.grid} data-submenu-open={submenuOpen}>
        {/* Left panel */}
        <div className={`${styles.leftPanel} ${popupStyles.popupInner}`}>
          <div className={styles.leftInner}>
            <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
            <NavigationMenu.List className={styles.navList}>
              {productsNav.map((item) => (
                <NavigationMenu.Item key={item.label} value={item.label}>
                  <NavigationMenu.Trigger
                    className={styles.navItemLink}
                    render={<a href={item.href} />}
                    nativeButton={false}
                  >
                    <div className={styles.navItemRow}>
                      <div className={styles.iconWrap}>
                        <div className={styles.iconGradient} />
                        <span className={styles.iconSvg}>{item.icon}</span>
                      </div>
                      <div className={styles.navItemText}>
                        <div className={styles.navItemTitle}>
                          {item.label}
                          {item.tag && (
                            <span className={styles.betaBadge}>
                              {item.tag}
                              <span className={styles.betaBadgeBorderTop}>
                                <DashedHLine />
                              </span>
                              <span className={styles.betaBadgeBorderBottom}>
                                <DashedHLine />
                              </span>
                              <span className={styles.betaBadgeBorderLeft}>
                                <DashedVLine />
                              </span>
                              <span className={styles.betaBadgeBorderRight}>
                                <DashedVLine />
                              </span>
                            </span>
                          )}
                        </div>
                        <div className={styles.navItemDesc}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </NavigationMenu.Trigger>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          <div className={styles.rightInner}>
            <AnimatePresence>
              {submenuOpen && (
                <motion.div
                  key="right-panel"
                  style={{ height: '100%' }}
                  initial={{
                    opacity: 0,
                    transform: 'translate3d(-10px, 0, 0)',
                  }}
                  animate={{
                    opacity: 1,
                    transform: 'translate3d(0, 0, 0)',
                    transition: {
                      duration: 0.15,
                      ease: EASE_OUT,
                      delay: 0.15,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transform: 'translate3d(20px, 0, 0)',
                    transition: { duration: 0.15, ease: EASE_OUT },
                  }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {activeItem && (
                      <motion.div
                        key={activeItem.label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.15 },
                        }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.div
                          className={styles.rightContentHeader}
                          initial={{
                            opacity: 0,
                            transform: `translate3d(0, ${direction === 'down' ? '-20px' : '20px'}, 0)`,
                          }}
                          animate={{
                            opacity: 1,
                            transform: 'translate3d(0, 0, 0)',
                          }}
                          transition={{ duration: 0.3, ease: EASE_OUT }}
                          style={{ willChange: 'transform' }}
                        >
                          {activeItem.subSection.heading}
                        </motion.div>

                        <div className={styles.subItemList}>
                          {activeItem.subSection.items.map((sub, i) => (
                            <motion.a
                              key={sub.href}
                              className={styles.subItem}
                              href={sub.href}
                              style={{ willChange: 'transform' }}
                              initial={{
                                opacity: 0,
                                transform: `translate3d(0, ${direction === 'down' ? '-15px' : '15px'}, 0)`,
                              }}
                              animate={{
                                opacity: 1,
                                transform: 'translate3d(0, 0, 0)',
                              }}
                              transition={{
                                duration: 0.3,
                                delay: (i + 1) * 0.02 + 0.05,
                                ease: EASE_OUT,
                              }}
                            >
                              <span className={styles.subItemLabel}>
                                {sub.label}
                              </span>
                              {sub.badge && (
                                <span className={styles.subItemBadge}>
                                  {sub.badge}
                                </span>
                              )}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.bottomFade}>
            <div className={styles.twinklePattern} />
          </div>
        </div>
      </div>
    </NavigationMenu.Root>
  );
}

export { ProductsContent };
