import { memo } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from './motion-constants';

const TRANSITION = { duration: 0.3, ease: EASE_OUT } as const;

interface BurgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  iconClassName?: string;
}

export const BurgerButton = memo(function BurgerButton({
  isOpen,
  onToggle,
  className,
  iconClassName,
}: BurgerButtonProps) {
  return (
    <button
      className={className}
      type="button"
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      onClick={onToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        className={iconClassName}
      >
        <motion.path
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          animate={{ d: isOpen ? 'M4 4L12 12' : 'M4 4.667L12 4.667' }}
          transition={TRANSITION}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth={1.2}
          strokeLinecap="round"
          animate={{ d: isOpen ? 'M12 4L4 12' : 'M4 11.333L12 11.333' }}
          transition={TRANSITION}
        />
      </svg>
    </button>
  );
});
