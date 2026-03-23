import { Dialog } from '@base-ui/react/dialog';
import styles from './MobileMenu.module.css';

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
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { MobileMenu };
