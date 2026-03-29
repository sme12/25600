import { Dialog } from '@base-ui/react/dialog';
import { Accordion } from '@base-ui/react/accordion';
import styles from './MobileMenu.module.css';
import popupStyles from './Popup.module.css';
import productStyles from './ProductsContent.module.css';
import ctaStyles from './CtaButton.module.css';
import { productsNav } from './products.data';
import { sdkItems, featuredDocs } from './docs.data';
import { changelogEntries } from './changelog.data';
import { companyLinks } from './company.data';
import {
  ChevronDownMobileIcon,
  PlayIcon,
  DashedHLine,
  DashedVLine,
} from './icons';
import { LABELS } from './nav.labels';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  portalContainer: React.RefObject<HTMLElement | null>;
}

function MobileMenu({ open, onOpenChange, portalContainer }: MobileMenuProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={portalContainer.current}>
        <Dialog.Popup
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={styles.popup}
          initialFocus={(interactionType) => interactionType === 'keyboard'}
        >
          <div className={styles.scrollContainer}>
            <nav className={styles.navWrapper}>
              <Accordion.Root className={styles.accordion}>
                {/* Products */}
                <Accordion.Item value="products">
                  <Accordion.Header render={<div />}>
                    <Accordion.Trigger className={styles.sectionTriggerFirst}>
                      <span>{LABELS.products}</span>
                      <ChevronDownMobileIcon className={styles.chevron} />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className={styles.sectionPanel}>
                    <div className={styles.sectionContent}>
                      {/* Product links */}
                      <div>
                        <div className={styles.sectionHeadingProducts}>
                          {LABELS.productsHeader}
                        </div>
                        <ul className={styles.productList}>
                          {productsNav.map((item) => (
                            <li key={item.href}>
                              <a
                                href={item.href}
                                className={styles.productLink}
                              >
                                <div
                                  className={`${productStyles.iconWrap} ${styles.productIconWrap}`}
                                >
                                  <div className={productStyles.iconGradient} />
                                  <span className={productStyles.iconSvg}>
                                    {item.icon}
                                  </span>
                                </div>
                                <div className={styles.productText}>
                                  <div className={styles.productLabel}>
                                    {item.label}
                                    {item.tag && (
                                      <span className={productStyles.betaBadge}>
                                        {item.tag}
                                        <span
                                          className={
                                            productStyles.betaBadgeBorderTop
                                          }
                                        >
                                          <DashedHLine />
                                        </span>
                                        <span
                                          className={
                                            productStyles.betaBadgeBorderBottom
                                          }
                                        >
                                          <DashedHLine />
                                        </span>
                                        <span
                                          className={
                                            productStyles.betaBadgeBorderLeft
                                          }
                                        >
                                          <DashedVLine />
                                        </span>
                                        <span
                                          className={
                                            productStyles.betaBadgeBorderRight
                                          }
                                        >
                                          <DashedVLine />
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                  <div className={styles.productDesc}>
                                    {item.description}
                                  </div>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Sub-sections */}
                      <div className={styles.subSections}>
                        {productsNav.map((item) => (
                          <div key={item.label} className={styles.subSection}>
                            <div className={styles.subSectionHeading}>
                              {item.subSection.heading}
                            </div>
                            <ul className={styles.subItemGrid}>
                              {item.subSection.items.map((sub) => (
                                <li key={sub.href}>
                                  <a
                                    href={sub.href}
                                    className={styles.subItemLink}
                                  >
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                {/* Docs */}
                <Accordion.Item value="docs">
                  <Accordion.Header render={<div />}>
                    <Accordion.Trigger className={styles.sectionTrigger}>
                      <span>{LABELS.docs}</span>
                      <ChevronDownMobileIcon className={styles.chevron} />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className={styles.sectionPanelDocs}>
                    <div className={styles.sectionContent}>
                      {/* Top SDKs */}
                      <div>
                        <div className={styles.sectionHeading}>
                          {LABELS.docsHeader}
                        </div>
                        <ul className={styles.sdkGrid}>
                          {sdkItems.map((item) => (
                            <li key={item.href}>
                              <a href={item.href} className={styles.sdkLink}>
                                <div
                                  className={`${popupStyles.iconWrap} ${styles.sdkIconWrap}`}
                                >
                                  <span className={popupStyles.iconSvg}>
                                    {item.icon}
                                  </span>
                                </div>
                                <span className={styles.sdkLabel}>
                                  {item.label}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* CTA */}
                      <div className={styles.ctaWrapper}>
                        <a href="/docs" className={ctaStyles.ctaButtonDropdown}>
                          <span>{LABELS.docsCta}</span>
                          <PlayIcon
                            aria-hidden="true"
                            className={ctaStyles.iconExit}
                          />
                          <PlayIcon
                            aria-hidden="true"
                            className={ctaStyles.iconEnter}
                          />
                        </a>
                      </div>
                      {/* Featured Docs */}
                      <div className={styles.featuredDocsSection}>
                        <div className={styles.sectionHeading}>
                          {LABELS.featuredDocsHeader}
                        </div>
                        <ul className={styles.featuredList}>
                          {featuredDocs.map((doc) => (
                            <li key={doc.href}>
                              <a
                                href={doc.href}
                                className={styles.featuredLink}
                              >
                                {doc.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                {/* Changelog */}
                <Accordion.Item value="changelog">
                  <Accordion.Header render={<div />}>
                    <Accordion.Trigger className={styles.sectionTrigger}>
                      <span>{LABELS.changelog}</span>
                      <ChevronDownMobileIcon className={styles.chevron} />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className={styles.sectionPanel}>
                    <div className={styles.sectionContent}>
                      <div>
                        <div className={styles.sectionHeading}>
                          {LABELS.changelogHeader}
                        </div>
                        <ul className={styles.changelogList}>
                          {changelogEntries.map((entry) => (
                            <li key={entry.href}>
                              <a
                                href={entry.href}
                                className={styles.changelogLink}
                              >
                                <div className={styles.changelogDate}>
                                  {entry.date}
                                </div>
                                <div className={styles.changelogTitle}>
                                  {entry.title}
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.ctaWrapper}>
                        <a
                          href="/changelog"
                          className={ctaStyles.ctaButtonDropdown}
                        >
                          <span>{LABELS.changelogCta}</span>
                          <PlayIcon
                            aria-hidden="true"
                            className={ctaStyles.iconExit}
                          />
                          <PlayIcon
                            aria-hidden="true"
                            className={ctaStyles.iconEnter}
                          />
                        </a>
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                {/* Company */}
                <Accordion.Item value="company">
                  <Accordion.Header render={<div />}>
                    <Accordion.Trigger className={styles.sectionTrigger}>
                      <span>{LABELS.company}</span>
                      <ChevronDownMobileIcon className={styles.chevron} />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Panel className={styles.sectionPanel}>
                    <div className={styles.sectionContent}>
                      <div>
                        <div className={styles.sectionHeading}>
                          {LABELS.companyHeader}
                        </div>
                        <ul className={styles.companyList}>
                          {companyLinks.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                className={styles.companyLink}
                              >
                                <div className={styles.companyIconWrap}>
                                  {link.icon}
                                </div>
                                <span>{link.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
                <a href="/pricing" className={styles.pricingLink}>
                  {LABELS.pricing}
                </a>
              </Accordion.Root>
            </nav>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { MobileMenu };
