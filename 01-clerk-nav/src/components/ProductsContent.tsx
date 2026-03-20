import { useState, useRef } from 'react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { motion, AnimatePresence } from 'motion/react';
import styles from './ProductsContent.module.css';
import popupStyles from './Popup.module.css';
import { DashedHLine, DashedVLine } from './icons';
import { productsNav } from './products.data';
import { EASE_OUT } from './motion-constants';
import { useSubmenuKeyboard } from '../hooks/useSubmenuKeyboard';

function ProductsContent({ contentLabel }: { contentLabel: string }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const previousIndexRef = useRef(-1);

  const {
    triggerRef,
    subItemRef,
    handleTriggerFocus,
    handleTriggerKeyDown,
    handleSubItemKeyDown,
    resetSubItemRefs,
  } = useSubmenuKeyboard({
    items: productsNav,
    activeValue,
    setActiveValue,
    setSubmenuOpen,
    setDirection,
    previousIndexRef,
  });

  const activeItem = activeValue
    ? productsNav.find((item) => item.label === activeValue)
    : null;

  return (
    <NavigationMenu.Root
      orientation="vertical"
      value={activeValue}
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
        <div className={`${popupStyles.leftPanel} ${popupStyles.popupInner}`}>
          <div className={popupStyles.leftInner}>
            <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
            <NavigationMenu.List className={styles.navList}>
              {productsNav.map((item, index) => (
                <NavigationMenu.Item key={item.label} value={item.label}>
                  <NavigationMenu.Trigger
                    className={styles.navItemLink}
                    render={<a href={item.href} />}
                    nativeButton={false}
                    ref={triggerRef(index)}
                    onFocus={() => handleTriggerFocus(item.label, index)}
                    onKeyDown={handleTriggerKeyDown}
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
        <div className={popupStyles.rightPanel}>
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
                          {resetSubItemRefs()}
                          {activeItem.subSection.items.map((sub, i) => (
                            <motion.a
                              key={sub.href}
                              className={styles.subItem}
                              href={sub.href}
                              ref={subItemRef(i)}
                              onKeyDown={(e) => handleSubItemKeyDown(e, i)}
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
          <div className={popupStyles.bottomFade}>
            <div className={popupStyles.twinklePattern} />
          </div>
        </div>
      </div>
    </NavigationMenu.Root>
  );
}

export { ProductsContent };
