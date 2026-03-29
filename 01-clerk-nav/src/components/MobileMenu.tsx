import { Dialog } from '@base-ui/react/dialog';
import { Accordion } from '@base-ui/react/accordion';
import styles from './MobileMenu.module.css';
import { MobileAccordionSection } from './MobileAccordionSection';
import { MobileProductsContent } from './MobileProductsContent';
import { MobileDocsContent } from './MobileDocsContent';
import { MobileChangelogContent } from './MobileChangelogContent';
import { MobileCompanyContent } from './MobileCompanyContent';
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
                <MobileAccordionSection
                  value="products"
                  label={LABELS.products}
                  isFirst
                >
                  <MobileProductsContent />
                </MobileAccordionSection>
                <MobileAccordionSection
                  value="docs"
                  label={LABELS.docs}
                  panelClassName={styles.sectionPanelDocs}
                >
                  <MobileDocsContent />
                </MobileAccordionSection>
                <MobileAccordionSection
                  value="changelog"
                  label={LABELS.changelog}
                >
                  <MobileChangelogContent />
                </MobileAccordionSection>
                <MobileAccordionSection value="company" label={LABELS.company}>
                  <MobileCompanyContent />
                </MobileAccordionSection>
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
